#!/usr/bin/env node
// Validates the Life Skills cards (js/content/life/*.js) against the format in js/content/life/README.md
// and builds every card in both languages and both regions.
//
//   node tests/validate-life.mjs                  all worlds
//   node tests/validate-life.mjs --world=safe     one world
//   node tests/validate-life.mjs --world=safe --show   print the cards
import { LIFE_WORLDS, LIFE_WORLD_MAP, VALUES, REGIONS, VERDICTS } from '../js/content/life/meta.js';
import { buildCard } from '../js/content/life/card.js';
import { makeRng } from '../js/core/rng.js';
import { BACKDROP_IDS, scenePic } from '../js/ui/visuals/scene.js';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const worlds = args.world ? [args.world] : LIFE_WORLDS.map((w) => w.id);

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const LIMITS = { q: 220, choice: 100, why: 200, lesson: 200, title: 28 };
const SOFT = { q: 170, choice: 80, why: 160, lesson: 160 };
const NUM_RE = /(^|[^\d{])(999|995|113|114|115|112|911)(?!\d)/;
const TOKEN_RE = /\{([^}]*)\}/g;
const OK_TOKENS = new Set(['name', 'friend', 'POLICE', 'FIRE', 'AMBULANCE']);
const GENDERED_EN = /\b(he|she|him|her|his|hers|himself|herself)\b/i;
const GENDERED_VI = /(cậu ấy|cô ấy|anh ấy|chị ấy|thằng bé|con bé)/i;

const topicIds = new Set();
const scenarioIds = new Set();
const counts = {};
const tiers = { 1: 0, 2: 0, 3: 0 };
let total = 0;

function checkText(where, field, en, vi, max, soft) {
  for (const [lang, t] of [['en', en], ['vi', vi]]) {
    if (typeof t !== 'string' || !t.trim()) {
      err(where, `${field}.${lang} missing`);
      continue;
    }
    if (t.length > max) err(where, `${field}.${lang} too long (${t.length} > ${max})`);
    else if (soft && t.length > soft) warn(where, `${field}.${lang} long (${t.length})`);
    if (NUM_RE.test(t)) err(where, `${field}.${lang} has a literal emergency number — use {POLICE}/{FIRE}/{AMBULANCE}`);
    for (const m of t.matchAll(TOKEN_RE)) if (!OK_TOKENS.has(m[1])) err(where, `${field}.${lang} unknown placeholder {${m[1]}}`);
  }
  if (typeof en === 'string' && typeof vi === 'string') {
    const toks = (s) => [...new Set([...s.matchAll(TOKEN_RE)].map((m) => m[1]))].sort().join(',');
    if (toks(en) !== toks(vi)) err(where, `${field}: placeholders differ between en (${toks(en)}) and vi (${toks(vi)})`);
    const usesNames = /\{(name|friend)\}/.test(en);
    if (usesNames && GENDERED_EN.test(en)) warn(where, `${field}.en uses a gendered pronoun with a {name} card`);
    if (usesNames && GENDERED_VI.test(vi)) warn(where, `${field}.vi uses a gendered pronoun with a {name} card`);
  }
}

for (const wid of worlds) {
  if (!LIFE_WORLD_MAP[wid]) {
    err(wid, 'unknown world');
    continue;
  }
  let mod;
  try {
    mod = await import(`../js/content/life/${wid}.js`);
  } catch (e) {
    err(`${wid}.js`, `failed to load: ${e.message}`);
    continue;
  }
  const topics = mod.TOPICS;
  if (!Array.isArray(topics)) {
    err(`${wid}.js`, 'must export TOPICS array');
    continue;
  }
  counts[wid] = { topics: topics.length, cards: 0 };
  for (const t of topics) {
    const tw = `${wid}/${t.id}`;
    if (!/^life\.[a-z0-9-]+$/.test(t.id || '')) err(tw, 'topic id must be life.<slug> (lowercase, digits, dashes)');
    if (topicIds.has(t.id)) err(tw, 'duplicate topic id');
    topicIds.add(t.id);
    if (t.world !== wid) err(tw, `world must be '${wid}'`);
    for (const f of ['icon', 'title', 'vi', 'goal']) if (typeof t[f] !== 'string' || !t[f].trim()) err(tw, `missing ${f}`);
    if (t.title && t.title.length > LIMITS.title) warn(tw, `title long (${t.title.length})`);
    if (!Array.isArray(t.talk) || t.talk.length < 2 || t.talk.length > 4) err(tw, 'talk must have 2–4 questions');
    if (!Array.isArray(t.scenarios) || !t.scenarios.length) {
      err(tw, 'no scenarios');
      continue;
    }
    if (t.scenarios.length < 5) warn(tw, `only ${t.scenarios.length} scenarios (aim for 5–8)`);
    for (const s of t.scenarios) {
      const w = `${tw}/${s.id}`;
      total++;
      counts[wid].cards++;
      if (!/^[a-z0-9-]+$/.test(s.id || '')) err(w, 'scenario id must be lowercase slug');
      if (scenarioIds.has(s.id)) err(w, 'duplicate scenario id');
      scenarioIds.add(s.id);
      if (![1, 2, 3].includes(s.tier)) err(w, 'tier must be 1, 2 or 3');
      else tiers[s.tier]++;
      if (typeof s.scene !== 'string' || !s.scene.trim()) err(w, 'scene emoji missing');
      if (s.region && !REGIONS[s.region]) err(w, `bad region ${s.region}`);
      if (s.value && !VALUES[s.value]) err(w, `bad value ${s.value}`);
      if (!s.pic) warn(w, 'no pic (illustration) yet');
      else {
        const pw = `${w}/pic`;
        if (!BACKDROP_IDS.includes(s.pic.bg)) err(pw, `unknown bg '${s.pic.bg}'`);
        const cast = s.pic.cast;
        if (!Array.isArray(cast) || cast.length < 1 || cast.length > 4) err(pw, 'cast must have 1–4 figures');
        else {
          cast.forEach((c, i) => {
            if (typeof c.e !== 'string' || !c.e.trim()) err(`${pw}#${i + 1}`, 'figure emoji (e) missing');
            if (c.say !== undefined) checkText(`${pw}#${i + 1}`, 'say', c.say?.en, c.say?.vi, 40);
            if (c.screen && s.pic.bg !== 'tablet') err(`${pw}#${i + 1}`, "screen:true only works with bg 'tablet'");
            if (c.x !== undefined && !(c.x >= 0 && c.x <= 100)) err(`${pw}#${i + 1}`, 'x must be 0–100');
            if (c.up !== undefined && !(c.up >= 0 && c.up <= 60)) err(`${pw}#${i + 1}`, 'up must be 0–60');
            if (c.size !== undefined && !['s', 'm', 'l'].includes(c.size)) err(`${pw}#${i + 1}`, "size must be 's', 'm' or 'l'");
          });
          if (!cast.some((c) => c.you)) warn(pw, 'no figure marked you:true');
        }
        if (s.pic.props && (!Array.isArray(s.pic.props) || s.pic.props.length > 3)) err(pw, 'props must be an array of at most 3');
      }
      checkText(w, 'q', s.q?.en, s.q?.vi, LIMITS.q, SOFT.q);
      checkText(w, 'lesson', s.lesson?.en, s.lesson?.vi, LIMITS.lesson, SOFT.lesson);
      if (!Array.isArray(s.choices) || s.choices.length < 2 || s.choices.length > 4) {
        err(w, 'choices must be 2–4');
        continue;
      }
      const v = s.choices.map((c) => c.v);
      if (v.filter((x) => x === 'best').length !== 1) err(w, 'exactly one choice must be best');
      if (v.filter((x) => x === 'ok').length > 1) err(w, 'at most one ok choice');
      if (v.some((x) => !VERDICTS.includes(x))) err(w, `bad verdict in ${v.join(',')}`);
      const seen = new Set();
      s.choices.forEach((c, i) => {
        const cw = `${w}#${i + 1}`;
        if (typeof c.e !== 'string' || !c.e.trim()) err(cw, 'choice emoji (e) missing');
        checkText(cw, 'choice', c.en, c.vi, LIMITS.choice, SOFT.choice);
        checkText(cw, 'why', c.why?.en, c.why?.vi, LIMITS.why, SOFT.why);
        if (seen.has(c.en)) err(cw, 'duplicate choice text');
        seen.add(c.en);
      });
      // Build in every language × region; nothing may be left unfilled.
      for (const lang of ['en', 'vi'])
        for (const region of Object.keys(REGIONS)) {
          try {
            const card = buildCard({ ...s, topic: t.id, world: wid }, { lang, region, R: makeRng(7) });
            const all = [card.prompt, card.lesson, ...card.choices.flatMap((c) => [c.text, c.why])].join(' ');
            if (/[{}]/.test(all)) err(w, `unfilled placeholder in ${lang}/${region}`);
            if (card.best < 0) err(w, 'built card has no best choice');
            if (card.pic) {
              scenePic(card.pic, { youLabel: lang === 'vi' ? 'Con' : 'You', label: card.prompt });
              if (card.pic.cast.some((c) => c.say && /[{}]/.test(c.say))) err(w, `unfilled placeholder in picture (${lang})`);
            }
            if (args.show && region === 'SG') {
              console.log(`\n[${lang}] ${t.id} · ${s.id} · tier ${s.tier}${s.region ? ' · ' + s.region : ''}${s.value ? ' · ' + s.value : ''}  ${s.scene}`);
              console.log(`  ${card.prompt}`);
              card.choices.forEach((c) => console.log(`   ${c.v === 'best' ? '✅' : c.v === 'ok' ? '🟡' : '❌'} ${c.e} ${c.text}\n        → ${c.why}`));
              console.log(`  💡 ${card.lesson}`);
            }
          } catch (e) {
            err(w, `buildCard failed (${lang}/${region}): ${e.message}`);
          }
        }
    }
  }
}

console.log('\nLife Skills cards per world:');
for (const [w, c] of Object.entries(counts)) console.log(`  ${w.padEnd(9)} ${String(c.topics).padStart(2)} topics  ${String(c.cards).padStart(3)} cards`);
console.log(`  tiers: 1=${tiers[1]}  2=${tiers[2]}  3=${tiers[3]}`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 60)) console.log('  ⚠ ' + w);
  if (warnings.length > 60) console.log(`  … and ${warnings.length - 60} more`);
}
if (errors.length) {
  console.log(`\n${errors.length} error(s):`);
  for (const e of errors.slice(0, 120)) console.log('  ✗ ' + e);
  process.exit(1);
}
console.log(`\n${total} cards checked, 0 errors.`);
