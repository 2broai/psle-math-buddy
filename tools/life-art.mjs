#!/usr/bin/env node
// Life Skills illustrations, drawn with Antigravity's image generator (agy CLI → image-generator subagent).
//
//   node tools/life-art.mjs prompts                 write art/life/prompts/<id>.txt for every card
//   node tools/life-art.mjs status                  which cards have / still need a picture
//   node tools/life-art.mjs generate [--jobs=4] [--batch=6] [--worlds=a,b] [--only=<id or topic prefix>] [--limit=N] [--redo]
//                                                   draw missing pictures with agy (in parallel batches), then import
//   node tools/life-art.mjs import                  pick up drawn pictures → img/life/<id>.webp + js/content/life/art.js
//
// Every prompt shares one style and one main character (art/life/ref/hero-boy.jpg, passed as a reference image),
// so all pictures look like one picture book. Pictures never contain text: speech bubbles are drawn by the app.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { homedir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROMPTS = join(ROOT, 'art/life/prompts');
const RAW = join(ROOT, 'art/life/raw');
const OUT = join(ROOT, 'img/life');
const REF = join(ROOT, 'art/life/ref/hero-boy.jpg');
const MANIFEST = join(ROOT, 'js/content/life/art.js');
// where Antigravity saves generated images: the CLI (agy) and the desktop IDE
const BRAINS = [join(homedir(), '.gemini/antigravity-cli/brain'), join(homedir(), '.gemini/antigravity/brain')];
const SCRATCH = '/tmp/merli-art';
const WORLDS = ['kind', 'feelings', 'school', 'safe', 'sos', 'road', 'healthy', 'citizen', 'online'];
// Topics drawn only with the simple built-in scene pictures (no AI image) — sensitive subjects.
const SKIP_TOPICS = new Set(['life.my-body']);

const args = Object.fromEntries(
  process.argv.slice(3).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const cmd = process.argv[2] || 'status';

// ------------------------------------------------------------------ prompt text
const STYLE =
  "Children's picture-book illustration: flat colours, clean dark outlines, soft warm pastel palette, gentle, friendly and calm. Wide landscape 16:9. Absolutely NO text anywhere in the picture: no letters, words, numbers, signs with writing, labels or speech bubbles.";
const HERO =
  'The main character is the 6-year-old boy from the reference image (short black hair with a small fringe, yellow T-shirt with a small striped pocket, light-blue shorts, red socks, white sneakers). Keep his face, hair and clothes exactly the same as in the reference.';
const SAFE =
  'Keep it gentle for young children: nothing frightening, no blood or injuries shown in detail, no one in real danger on screen. Unknown or "tricky" grown-ups look ordinary and friendly, not scary. Show the moment BEFORE anyone decides what to do — do not show the answer.';

const BG = {
  home: 'a cosy living room in a Singapore HDB flat',
  kitchen: 'a home kitchen with a stove',
  bedroom: "a child's bedroom",
  bathroom: 'a home bathroom with a sink',
  door: 'the inside of the front door of a flat',
  window: 'a high-rise flat with a big window / balcony and city view',
  classroom: 'a bright primary-school classroom with a whiteboard and desks',
  canteen: 'a Singapore primary-school canteen with food stalls and long tables',
  schoolyard: 'a school field / playground at recess',
  schoolgate: 'outside a primary-school gate at pick-up time',
  playground: 'a neighbourhood playground with a slide and swings',
  park: 'a green park with trees and a path',
  street: 'a pavement in front of small shops',
  road: 'a road with a zebra crossing and traffic lights',
  carpark: 'a car park with parked cars',
  car: 'inside a family car (back seat)',
  busstop: 'a bus stop on a pavement',
  bus: 'inside a public bus',
  mrt: 'an MRT train station platform with a yellow safety line',
  lift: 'a lift lobby in a block of flats',
  escalator: 'an escalator in a shopping mall',
  mall: 'inside a shopping mall',
  supermarket: 'a supermarket aisle',
  hawker: 'a Singapore hawker centre',
  library: 'a library with bookshelves',
  clinic: "a doctor's clinic",
  party: "a child's birthday party at home",
  pool: 'a swimming pool',
  beach: 'a beach by the sea',
  storm: 'outdoors under dark stormy clouds with rain',
  tablet: 'at home, using a tablet computer',
  fire: 'a room at home with smoke in the air',
  voiddeck: 'the open ground floor (void deck) of a Singapore HDB block'
};

const WHO = {
  '🧒': 'a child', '👦': 'a boy', '👧': 'a girl', '👶': 'a baby', '🧑': 'a grown-up', '👩': 'a woman', '👨': 'a man', '🧔': 'a man with a beard',
  '👵': 'a grandmother', '👴': 'a grandfather', '🧓': 'an older grown-up', '🧑‍🏫': 'a teacher', '👩‍🏫': 'a female teacher', '👨‍🏫': 'a male teacher',
  '👩‍🍳': 'a canteen / stall cook', '🧑‍🍳': 'a cook', '🧑‍⚕️': 'a doctor or nurse', '👩‍⚕️': 'a doctor', '👮': 'a police officer', '🧑‍🚒': 'a firefighter',
  '🏃': 'a child running', '🚴': 'a child on a bicycle', '🙋': 'a child raising a hand', '👤': 'an unknown person shown only as a grey silhouette',
  '🤖': 'a friendly cartoon robot', '👻': 'a cartoon ghost from a show', '🐕': 'a dog', '🐈': 'a cat', '🐝': 'a bee',
  '⚽': 'a football', '🚗': 'a car', '🚙': 'a car', '🚌': 'a bus', '🚲': 'a bicycle', '🛵': 'a motorbike', '🛴': 'a kick scooter',
  '📱': 'a mobile phone', '📲': 'a phone showing a message', '📺': 'a TV', '🎮': 'a video game', '🎬': 'a video', '🛋️': 'a sofa',
  '🍰': 'a slice of cake', '📖': 'a book', '🎁': 'a present', '🏷️': 'a price tag', '🏆': 'a trophy', '📩': 'a message notification',
  '💎': 'a shiny gem prize in a game', '🎉': 'a celebration pop-up', '🧾': 'a receipt', '📍': 'a location pin', '⚠️': 'a warning pop-up', '⏰': 'an alarm clock / timer',
  '❓': 'a question mark', '😂': 'a laughing face'
};
const MOOD = {
  '❓': 'looking unsure', '😟': 'looking worried', '😨': 'looking scared', '😰': 'looking anxious', '😢': 'looking sad', '😭': 'crying', '😡': 'looking angry',
  '😠': 'looking cross', '😤': 'looking frustrated', '🤔': 'thinking hard', '😳': 'looking embarrassed', '😊': 'smiling', '😃': 'looking excited', '🥺': 'looking pleading',
  '😮': 'looking surprised', '🤢': 'feeling sick', '🥵': 'feeling very hot', '😴': 'looking sleepy', '😕': 'looking confused'
};
const where = (i, n, c) => {
  if (c.screen) return 'shown on the tablet screen';
  if (Number.isFinite(c.x)) return c.x < 35 ? 'on the left' : c.x > 65 ? 'on the right' : 'in the middle';
  return (
    { 1: ['in the middle'], 2: ['on the left', 'on the right'], 3: ['on the left', 'in the middle', 'on the right'], 4: ['far left', 'left of centre', 'right of centre', 'far right'] }[n] ||
    []
  )[i] || '';
};
const plain = (s) =>
  String(s || '')
    .replace(/\{name\}/g, 'a classmate')
    .replace(/\{friend\}/g, 'his friend')
    .replace(/\{(POLICE|FIRE|AMBULANCE)\}/g, 'the emergency number')
    .replace(/\*\*/g, '');

export function promptFor(sc, topic) {
  const pic = sc.pic || { bg: 'home', cast: [{ e: '🧒', you: true }] };
  const onStage = pic.cast.filter((c) => !c.screen);
  const people = pic.cast.map((c, i) => {
    const idx = c.screen ? -1 : onStage.indexOf(c);
    const who = c.you ? 'THE MAIN CHARACTER (the boy from the reference image)' : WHO[c.e] || `a ${c.e}`;
    const bits = [`- ${who}, ${where(idx, onStage.length, c)}`];
    if (c.think) bits.push(MOOD[c.think] || `thinking about ${c.think}`);
    if (c.say?.en) bits.push(`saying something like "${plain(c.say.en)}" (do NOT write the words)`);
    if (c.up) bits.push('placed higher up in the scene');
    if (c.size === 'l') bits.push('large in the picture');
    return bits.join(', ');
  });
  const props = (pic.props || []).map((p) => (typeof p === 'string' ? p : p.e)).map((e) => WHO[e] || e);
  const place = sc.region === 'VN' ? ' Set in Vietnam.' : sc.region === 'SG' ? ' Set in Singapore.' : ' Set in a modern Southeast-Asian city like Singapore.';
  return [
    STYLE,
    HERO,
    `Setting: ${BG[pic.bg] || pic.bg}.${place}`,
    `Situation (topic "${topic.title}"): ${plain(sc.q.en)}`,
    `People and things in the picture:\n${people.join('\n')}${props.length ? `\n- also visible: ${props.join(', ')}` : ''}`,
    'Composition: the main character fully visible and clearly the focus; faces show the feelings described; keep the top fifth of the picture calm and simple (the app adds speech bubbles there).',
    SAFE
  ].join('\n\n');
}

// ------------------------------------------------------------------ data
async function loadCards() {
  const out = [];
  for (const w of WORLDS) {
    const m = await import(join(ROOT, `js/content/life/${w}.js`));
    for (const t of m.TOPICS) for (const s of t.scenarios) out.push({ sc: { ...s, topic: t.id, world: w }, topic: t });
  }
  return out;
}
const imgName = (id) => `life_${id.replace(/-/g, '_')}`;
const hasImage = (id) => existsSync(join(OUT, `${id}.webp`));

function findDrawn() {
  // newest drawn file per card id, from every agy conversation folder
  const found = new Map();
  for (const BRAIN of BRAINS.filter((b) => existsSync(b)))
  for (const conv of readdirSync(BRAIN)) {
    const dir = join(BRAIN, conv);
    let files;
    try {
      files = readdirSync(dir);
    } catch {
      continue;
    }
    for (const f of files) {
      const m = /^life_([a-z0-9_]+?)_(\d{13})\.(jpg|jpeg|png|webp)$/.exec(f);
      if (!m) continue;
      const id = m[1].replace(/_/g, '-');
      const ts = Number(m[2]);
      if (!found.has(id) || found.get(id).ts < ts) found.set(id, { path: join(dir, f), ts });
    }
  }
  return found;
}

function writeManifest() {
  const entries = existsSync(OUT)
    ? readdirSync(OUT)
        .filter((f) => f.endsWith('.webp'))
        .sort()
        .map((f) => [f.replace(/\.webp$/, ''), createHash('sha1').update(readFileSync(join(OUT, f))).digest('hex').slice(0, 8)])
    : [];
  writeFileSync(
    MANIFEST,
    `// Generated by tools/life-art.mjs — which Life Skills cards have a drawn picture (img/life/<id>.webp) and its version.\nexport const ART = {\n${entries.map(([id, h]) => `  '${id}': '${h}'`).join(',\n')}\n};\n`
  );
  return entries.length;
}

function importDrawn({ quiet = false } = {}) {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(RAW, { recursive: true });
  let n = 0;
  for (const [id, { path, ts }] of findDrawn()) {
    const raw = join(RAW, `${id}.${path.split('.').pop()}`);
    const target = join(OUT, `${id}.webp`);
    const fresh = !existsSync(raw) || statSync(raw).mtimeMs < ts || !existsSync(target);
    if (!fresh) continue;
    copyFileSync(path, raw);
    execFileSync('cwebp', ['-quiet', '-q', '72', '-resize', '1024', '0', raw, '-o', target]);
    n++;
  }
  const total = writeManifest();
  if (!quiet) console.log(`imported ${n} new picture(s); ${total} cards have pictures`);
  return n;
}

function runAgy(batch) {
  mkdirSync(SCRATCH, { recursive: true });
  const list = batch
    .map((b, i) => `IMAGE ${i + 1}\nname: ${imgName(b.sc.id)}\nreference image (pass it as an input image): ${REF}\nprompt:\n${b.prompt}`)
    .join('\n\n-----\n\n');
  const task = `Use the image-generator subagent to create the ${batch.length} images below, ONE AT A TIME, waiting for each to finish before starting the next.
Rules: use exactly the given image name for each; always pass the reference image as an input image so the main character looks the same; one image per item (no extra variants); do not write any other files.
When all are done, reply with one line per image: <name> <saved path>.

${list}`;
  return new Promise((resolve) => {
    const p = spawn('agy', ['-p', task, '--model', 'gemini-3.8-flash-medium', '--add-dir', dirname(REF), '--add-dir', SCRATCH, '--print-timeout', '1500s'], { cwd: SCRATCH, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (out += d));
    p.on('close', (code) => resolve({ code, out }));
  });
}

// ------------------------------------------------------------------ commands
const cards = await loadCards();
const onlyWorlds = args.worlds ? new Set(String(args.worlds).split(',')) : null;
const wanted = cards.filter(
  ({ sc }) => !SKIP_TOPICS.has(sc.topic) && (!onlyWorlds || onlyWorlds.has(sc.world)) && (!args.only || sc.id.startsWith(args.only) || sc.topic.startsWith(args.only))
);

if (cmd === 'prompts') {
  mkdirSync(PROMPTS, { recursive: true });
  for (const { sc, topic } of wanted) writeFileSync(join(PROMPTS, `${sc.id}.txt`), `# ${sc.id} — ${topic.title} (${topic.vi})\n# image name: ${imgName(sc.id)}\n\n${promptFor(sc, topic)}\n`);
  console.log(`wrote ${wanted.length} prompts to art/life/prompts/ (skipped topics: ${[...SKIP_TOPICS].join(', ')})`);
} else if (cmd === 'status') {
  const have = wanted.filter(({ sc }) => hasImage(sc.id)).length;
  console.log(`${have}/${wanted.length} cards have pictures (${cards.length - wanted.length} use the built-in scene on purpose)`);
  const missing = wanted.filter(({ sc }) => !hasImage(sc.id)).map(({ sc }) => sc.id);
  if (args.list) console.log(missing.join('\n'));
} else if (cmd === 'import') {
  importDrawn();
} else if (cmd === 'generate') {
  importDrawn({ quiet: true });
  const jobs = Number(args.jobs || 4);
  const size = Number(args.batch || 6);
  let todo = wanted.filter(({ sc }) => args.redo || !hasImage(sc.id)).map(({ sc, topic }) => ({ sc, prompt: promptFor(sc, topic) }));
  if (args.limit) todo = todo.slice(0, Number(args.limit));
  const batches = [];
  for (let i = 0; i < todo.length; i += size) batches.push(todo.slice(i, i + size));
  console.log(`${todo.length} pictures to draw in ${batches.length} batches, ${jobs} at a time`);
  let next = 0;
  let done = 0;
  const worker = async () => {
    while (next < batches.length) {
      const b = batches[next++];
      const t0 = Date.now();
      const r = await runAgy(b);
      const got = importDrawn({ quiet: true });
      done += b.length;
      const ok = b.filter(({ sc }) => hasImage(sc.id)).length;
      console.log(`[${new Date().toLocaleTimeString()}] batch ${b[0].sc.id}…: ${ok}/${b.length} drawn in ${Math.round((Date.now() - t0) / 1000)}s (exit ${r.code}, +${got} imported) — ${done}/${todo.length}`);
      if (ok < b.length) console.log(`   missing: ${b.filter(({ sc }) => !hasImage(sc.id)).map(({ sc }) => sc.id).join(', ')}\n   agy: ${r.out.trim().split('\n').slice(-3).join(' | ').slice(0, 400)}`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(jobs, batches.length) }, worker));
  importDrawn();
} else if (cmd === 'ide-prompt') {
  // a paste-ready request for the Antigravity IDE agent (uses the IDE's own account / image quota)
  const missing = wanted.filter(({ sc }) => !hasImage(sc.id)).map(({ sc }) => sc.id);
  const file = join(ROOT, 'art/life/IDE-PROMPT.md');
  writeFileSync(
    file,
    `Use your image generation tool to draw the ${missing.length} pictures listed below, ONE AT A TIME (wait for each to finish).

For each id:
1. Read the prompt file ${PROMPTS}/<id>.txt and use its text as the image prompt.
2. Pass this reference image as an input image every time, so the main character always looks the same: ${REF}
3. Name the image exactly life_<id with "-" replaced by "_"> (for example id lost-mall → life_lost_mall).
4. One image per id, no extra variants, no other files.

If you hit a quota limit, stop and tell me how many were finished.

Ids:
${missing.join('\n')}
`
  );
  console.log(`${missing.length} missing → art/life/IDE-PROMPT.md (after drawing, run: node tools/life-art.mjs import)`);
} else if (cmd === 'sheet') {
  // contact sheets for eyeballing every picture (tests/out/art-sheet-N.jpg)
  console.log(execFileSync('python3', [join(ROOT, 'tools/art-sheet.py')]).toString().trim());
} else {
  console.log('usage: node tools/life-art.mjs prompts | status [--list] | generate [--jobs=4 --batch=6 --only=… --limit=N --redo] | import');
}
