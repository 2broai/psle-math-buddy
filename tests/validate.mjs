#!/usr/bin/env node
// Validates every skill generator: generates N questions per tier and checks the question
// contract (see js/content/README.md), renders every visual, and reports variety.
//
//   node tests/validate.mjs                    all skills
//   node tests/validate.mjs --module=addsub    one content module
//   node tests/validate.mjs --only=p1.         ids starting with a prefix
//   node tests/validate.mjs --n=400            samples per tier (default 150)
//   node tests/validate.mjs --show=p1.add.within10 --n=6   print sample questions
import { UNITS, STRAND_MAP, LEVEL_IDS } from '../js/content/meta.js';
import { VISUALS as CORE_VISUALS } from '../js/ui/visuals/core.js';
import { makeRng, hashStr } from '../js/core/rng.js';
import { md, toSpeech } from '../js/ui/markup.js';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const N = Number(args.n || 150);

// Modules are loaded one by one so a broken module (e.g. mid-edit) cannot break the others.
const MODULE_NAMES = ['early', 'numbers', 'addsub', 'muldiv', 'fractions', 'money', 'time', 'measure', 'geometry', 'data', 'thinking'];
const loadErrors = [];
const REG = { ...CORE_VISUALS };
for (const vm of ['measure', 'geometry']) {
  try {
    const m = await import(`../js/ui/visuals/${vm}.js`);
    Object.assign(REG, m.VISUALS || {});
  } catch (e) {
    loadErrors.push(`ui/visuals/${vm}.js failed to load: ${e.message}`);
  }
}
const VISUAL_TYPES = Object.keys(REG);
function renderVisual(v) {
  const fn = REG[v.type];
  if (!fn) throw new Error(`Unknown visual type: ${v.type}`);
  return `<div class="vis vis-${v.type}">${fn(v)}</div>`;
}
const SKILLS = [];
for (const mod of args.module ? [args.module] : MODULE_NAMES) {
  try {
    const m = await import(`../js/content/gen/${mod}.js`);
    (m.SKILLS || []).forEach((s, i) => SKILLS.push({ ...s, module: mod, seq: i }));
  } catch (e) {
    loadErrors.push(`content/gen/${mod}.js failed to load: ${e.message}`);
  }
}
for (const e of loadErrors) console.log(`⚠️  ${e}`);
const BAD = /undefined|NaN|\[object Object\]|Infinity/;

function checkText(label, s, errs, required = true) {
  if (s === undefined || s === null || s === '') {
    if (required) errs.push(`${label} missing`);
    return;
  }
  if (typeof s !== 'string') {
    errs.push(`${label} is not a string`);
    return;
  }
  if (BAD.test(s)) errs.push(`${label} contains "${s.match(BAD)[0]}": ${s.slice(0, 120)}`);
  if ((s.match(/\*\*/g) || []).length % 2) errs.push(`${label} has unbalanced **: ${s.slice(0, 80)}`);
}

function checkVisual(label, v, errs) {
  if (!v || typeof v !== 'object' || !v.type) {
    errs.push(`${label} is not a visual object`);
    return;
  }
  if (!VISUAL_TYPES.includes(v.type)) {
    errs.push(`${label} unknown visual type "${v.type}"`);
    return;
  }
  try {
    const html = renderVisual(v);
    if (!html || html.length < 20) errs.push(`${label} (${v.type}) rendered empty`);
    else if (BAD.test(html)) errs.push(`${label} (${v.type}) renders "${html.match(BAD)[0]}" from ${JSON.stringify(v).slice(0, 160)}`);
  } catch (e) {
    errs.push(`${label} (${v.type}) render threw: ${e.message}`);
  }
}

export function validateQuestion(q) {
  const errs = [];
  if (!q || typeof q !== 'object') return ['generator did not return an object'];
  checkText('prompt', q.prompt, errs);
  if (typeof q.prompt === 'string' && q.prompt.length > 320) errs.push(`prompt too long (${q.prompt.length} chars)`);
  checkText('hint', q.hint, errs);
  checkText('explain', q.explain, errs);
  if (q.speak !== undefined) checkText('speak', q.speak, errs);
  if (q.visuals !== undefined && !Array.isArray(q.visuals)) errs.push('visuals must be an array');
  (q.visuals || []).forEach((v, i) => checkVisual(`visuals[${i}]`, v, errs));
  (q.explainVisuals || []).forEach((v, i) => checkVisual(`explainVisuals[${i}]`, v, errs));

  if (q.input === 'choice') {
    if (!Array.isArray(q.choices) || q.choices.length < 2 || q.choices.length > 6) {
      errs.push(`choice input needs 2–6 choices (got ${q.choices?.length})`);
    } else {
      const vals = q.choices.map((c) => String(c.value));
      if (new Set(vals).size !== vals.length) errs.push(`duplicate choice values: ${vals.join(' | ')}`);
      const matches = vals.filter((v) => v === String(q.answer)).length;
      if (matches !== 1) errs.push(`answer ${JSON.stringify(q.answer)} matches ${matches} choices: ${vals.join(' | ')}`);
      const labels = q.choices.filter((c) => !c.visual).map((c) => String(c.label ?? c.value));
      if (new Set(labels).size !== labels.length) errs.push(`duplicate choice labels: ${labels.join(' | ')}`);
      q.choices.forEach((c, i) => {
        if (c.value === undefined || c.value === null || c.value === '') errs.push(`choices[${i}] has no value`);
        if (c.label !== undefined) checkText(`choices[${i}].label`, String(c.label), errs);
        if (c.visual) checkVisual(`choices[${i}].visual`, c.visual, errs);
      });
    }
  } else if (q.input === 'number') {
    const a = q.answer;
    if (typeof a !== 'number' || !Number.isFinite(a)) errs.push(`number answer is not a finite number: ${JSON.stringify(a)}`);
    else {
      if (a < 0) errs.push(`negative answer ${a}`);
      const dec = q.decimals || 0;
      const places = (String(a).split('.')[1] || '').length;
      if (places > dec) errs.push(`answer ${a} has ${places} decimal places but decimals=${dec}`);
      if (Math.abs(a) >= 1e7) errs.push(`answer too large: ${a}`);
    }
    if (q.choices) errs.push('number input must not have choices');
  } else {
    errs.push(`input must be "choice" or "number" (got ${JSON.stringify(q.input)})`);
  }
  const sp = toSpeech(q.speak || q.prompt || '');
  if (BAD.test(sp)) errs.push('speech text contains a bad token');
  try {
    md(q.prompt);
  } catch {
    errs.push('markup render failed');
  }
  return errs;
}

function showSamples(id) {
  const s = SKILLS.find((k) => k.id === id);
  if (!s) {
    console.log(`No skill ${id}`);
    process.exit(1);
  }
  const n = Number(args.n || 4);
  console.log(`${s.id} — ${s.title} (${s.level} unit ${s.unit}, ${s.strand})`);
  for (const tier of [1, 2, 3]) {
    console.log(`\n=== tier ${tier} ===`);
    for (let i = 0; i < n; i++) {
      const q = s.gen(makeRng(hashStr(s.id) + tier * 100003 + i * 7919 + Number(args.seed || 0)), tier);
      const ch = q.choices ? ` [${q.choices.map((c) => (c.visual ? `<${c.visual.type}>${c.value}` : c.label ?? c.value)).join(' | ')}]` : '';
      const unit = q.unit ? ` unit=${JSON.stringify(q.unit)}` : '';
      console.log(`• ${q.prompt}\n    → answer: ${q.answer} (${q.input})${ch}${unit}\n    visuals: ${(q.visuals || []).map((v) => v.type).join(', ') || '-'}\n    hint: ${q.hint}\n    explain: ${q.explain}`);
      const errs = validateQuestion(q);
      if (errs.length) console.log(`    ❌ ${errs.join('; ')}`);
    }
  }
}

if (args.show) {
  showSamples(args.show);
  process.exit(0);
}

const ids = new Set();
let failures = 0;
const report = [];
const filtered = SKILLS.filter((s) => (!args.only || s.id.startsWith(args.only)) && (!args.module || s.module === args.module));
for (const s of filtered) {
  const sErr = [];
  if (ids.has(s.id)) sErr.push('duplicate skill id');
  ids.add(s.id);
  if (!/^[a-z0-9]+(\.[a-z0-9_]+)+$/.test(s.id)) sErr.push(`bad id format "${s.id}" (use e.g. p1.add.within10)`);
  if (!LEVEL_IDS.includes(s.level)) sErr.push(`bad level ${s.level}`);
  if (!STRAND_MAP[s.strand]) sErr.push(`bad strand ${s.strand}`);
  if (!(UNITS[s.level] && s.unit in UNITS[s.level])) sErr.push(`unit ${s.unit} is not defined for level ${s.level}`);
  for (const k of ['title', 'vi', 'icon', 'tip']) if (!s[k] || typeof s[k] !== 'string') sErr.push(`missing ${k}`);
  if (s.title && s.title.length > 32) sErr.push(`title longer than 32 chars: ${s.title}`);
  if (typeof s.gen !== 'function') sErr.push('gen is not a function');
  const distinct = {};
  if (typeof s.gen === 'function') {
    for (const tier of [1, 2, 3]) {
      const seen = new Set();
      let bad = 0;
      for (let i = 0; i < N; i++) {
        const R = makeRng(hashStr(s.id) + tier * 100003 + i * 7919);
        let q;
        try {
          q = s.gen(R, tier);
        } catch (e) {
          bad++;
          if (bad <= 3) sErr.push(`tier ${tier} #${i} threw: ${String(e.stack).split('\n').slice(0, 3).join(' | ')}`);
          continue;
        }
        const errs = validateQuestion(q);
        if (s.sprint && q.input !== 'number') errs.push('sprint skills must use number input');
        if (errs.length) {
          bad++;
          if (bad <= 3) sErr.push(`tier ${tier} #${i}: ${errs.join('; ')}  ⟵ "${String(q?.prompt).slice(0, 90)}"`);
        }
        seen.add(JSON.stringify([q?.prompt, q?.visuals, q?.answer]));
      }
      if (bad > 3) sErr.push(`tier ${tier}: ${bad} of ${N} samples failed`);
      distinct[tier] = seen.size;
    }
  }
  const lowVariety = Object.entries(distinct)
    .filter(([, n]) => n < Math.min(12, N / 4))
    .map(([t, n]) => `t${t}:${n}`);
  if (sErr.length) failures++;
  report.push({ s, errs: sErr, distinct, lowVariety });
}

for (const r of report) {
  const status = r.errs.length ? '❌' : r.lowVariety.length ? '⚠️ ' : '✅';
  const d = r.distinct;
  console.log(`${status} ${r.s.id.padEnd(36)} ${r.s.level.padEnd(3)} u${String(r.s.unit).padEnd(3)} variety ${d[1]}/${d[2]}/${d[3]}${r.lowVariety.length ? `  (low: ${r.lowVariety.join(',')})` : ''}`);
  for (const e of r.errs.slice(0, 8)) console.log(`      - ${e}`);
}

const byLevel = {};
for (const s of filtered) {
  byLevel[s.level] = byLevel[s.level] || {};
  byLevel[s.level][s.strand] = (byLevel[s.level][s.strand] || 0) + 1;
}
console.log('\nSkills per level/strand:');
for (const [lv, m] of Object.entries(byLevel)) {
  const total = Object.values(m).reduce((a, b) => a + b, 0);
  console.log(`  ${lv.padEnd(3)} ${String(total).padStart(3)}  ${Object.entries(m).map(([k, v]) => `${k}:${v}`).join('  ')}`);
}
const ownLoadError = loadErrors.some((e) => args.module && e.includes(`/${args.module}.js`));
if (ownLoadError) failures++;
console.log(`\n${filtered.length} skills checked, ${failures} with errors (N=${N} samples per tier).`);
process.exit(failures ? 1 : 0);
