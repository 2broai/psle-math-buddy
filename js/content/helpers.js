// Shared helpers for question generators: Singapore names & contexts, number words,
// ordinals, money/time formatting and answer-choice builders.
// Everything here is pure (no DOM) and takes the seeded RNG `R` where randomness is needed.

// ---------------------------------------------------------------- people
export const NAMES = [
  ['Ali', 'm'], ['Mei Ling', 'f'], ['Ravi', 'm'], ['Siti', 'f'], ['Ben', 'm'], ['Priya', 'f'],
  ['Wei Jie', 'm'], ['Aisha', 'f'], ['Ethan', 'm'], ['Chloe', 'f'], ['Arjun', 'm'], ['Hui Min', 'f'],
  ['Farhan', 'm'], ['Nurul', 'f'], ['Jun Hao', 'm'], ['Kavya', 'f'], ['Daniel', 'm'], ['Emma', 'f'],
  ['Haziq', 'm'], ['Xin Yi', 'f'], ['Marcus', 'm'], ['Zara', 'f'], ['Ryan', 'm'], ['Lakshmi', 'f'],
  ['Kai', 'm'], ['Sofia', 'f'], ['Imran', 'm'], ['Jia Hui', 'f'], ['Lucas', 'm'], ['Anya', 'f']
];

function makePerson([name, g]) {
  const m = g === 'm';
  return {
    name,
    g,
    he: m ? 'he' : 'she',
    He: m ? 'He' : 'She',
    him: m ? 'him' : 'her',
    his: m ? 'his' : 'her',
    His: m ? 'His' : 'Her'
  };
}

/** One random person {name, he, him, his, He, His}. */
export function person(R, exclude = []) {
  const ex = new Set(exclude.map((p) => (typeof p === 'string' ? p : p.name)));
  const pool = NAMES.filter(([n]) => !ex.has(n));
  return makePerson(R.pick(pool));
}

/** n distinct people. */
export function people(R, n) {
  return R.sample(NAMES, n).map(makePerson);
}

export const FAMILY = ['Mum', 'Dad', 'Grandma', 'Grandpa', 'Auntie Lin', 'Uncle Raj', 'the teacher'];

// ---------------------------------------------------------------- things
// e = emoji used for pictures. Keep to long-established emoji (render on older iPads).
export const ITEMS = {
  food: [
    { one: 'apple', many: 'apples', e: '🍎' },
    { one: 'orange', many: 'oranges', e: '🍊' },
    { one: 'banana', many: 'bananas', e: '🍌' },
    { one: 'strawberry', many: 'strawberries', e: '🍓' },
    { one: 'pear', many: 'pears', e: '🍐' },
    { one: 'cupcake', many: 'cupcakes', e: '🧁' },
    { one: 'cookie', many: 'cookies', e: '🍪' },
    { one: 'curry puff', many: 'curry puffs', e: '🥟' },
    { one: 'bun', many: 'buns', e: '🍞' },
    { one: 'sweet', many: 'sweets', e: '🍬' },
    { one: 'lollipop', many: 'lollipops', e: '🍭' },
    { one: 'doughnut', many: 'doughnuts', e: '🍩' },
    { one: 'egg', many: 'eggs', e: '🥚' },
    { one: 'carrot', many: 'carrots', e: '🥕' },
    { one: 'cherry', many: 'cherries', e: '🍒' },
    { one: 'ice cream', many: 'ice creams', e: '🍦' }
  ],
  toys: [
    { one: 'balloon', many: 'balloons', e: '🎈' },
    { one: 'toy car', many: 'toy cars', e: '🚗' },
    { one: 'teddy bear', many: 'teddy bears', e: '🧸' },
    { one: 'ball', many: 'balls', e: '⚽' },
    { one: 'sticker', many: 'stickers', e: '⭐' },
    { one: 'kite', many: 'kites', e: '🪁' },
    { one: 'robot', many: 'robots', e: '🤖' },
    { one: 'puzzle piece', many: 'puzzle pieces', e: '🧩' },
    { one: 'toy boat', many: 'toy boats', e: '⛵' },
    { one: 'gift', many: 'gifts', e: '🎁' }
  ],
  school: [
    { one: 'pencil', many: 'pencils', e: '✏️' },
    { one: 'book', many: 'books', e: '📘' },
    { one: 'crayon', many: 'crayons', e: '🖍️' },
    { one: 'eraser', many: 'erasers', e: '🧽' },
    { one: 'ruler', many: 'rulers', e: '📏' },
    { one: 'paper clip', many: 'paper clips', e: '📎' },
    { one: 'notebook', many: 'notebooks', e: '📒' }
  ],
  animals: [
    { one: 'fish', many: 'fish', e: '🐟' },
    { one: 'duck', many: 'ducks', e: '🦆' },
    { one: 'bird', many: 'birds', e: '🐦' },
    { one: 'butterfly', many: 'butterflies', e: '🦋' },
    { one: 'chick', many: 'chicks', e: '🐤' },
    { one: 'cat', many: 'cats', e: '🐱' },
    { one: 'dog', many: 'dogs', e: '🐶' },
    { one: 'rabbit', many: 'rabbits', e: '🐰' },
    { one: 'turtle', many: 'turtles', e: '🐢' },
    { one: 'frog', many: 'frogs', e: '🐸' },
    { one: 'ladybird', many: 'ladybirds', e: '🐞' },
    { one: 'monkey', many: 'monkeys', e: '🐵' }
  ],
  nature: [
    { one: 'flower', many: 'flowers', e: '🌸' },
    { one: 'leaf', many: 'leaves', e: '🍃' },
    { one: 'seashell', many: 'seashells', e: '🐚' },
    { one: 'tree', many: 'trees', e: '🌳' },
    { one: 'mushroom', many: 'mushrooms', e: '🍄' },
    { one: 'star', many: 'stars', e: '🌟' }
  ]
};
export const ALL_ITEMS = Object.values(ITEMS).flat();

/** Random countable item {one, many, e}. cat: 'food' | 'toys' | ... | undefined (any). */
export function item(R, cat) {
  return R.pick(cat ? ITEMS[cat] : ALL_ITEMS);
}

/** n distinct items (optionally from one category). */
export function items(R, n, cat) {
  return R.sample(cat ? ITEMS[cat] : ALL_ITEMS, n);
}

export const PLACES = [
  'at the hawker centre', 'at the void deck', 'in the school canteen', 'at the playground',
  'at East Coast Park', 'at the zoo', 'at the library', 'at the supermarket', 'on Sentosa',
  'at the Botanic Gardens', 'at the community centre', 'at the bookshop', 'at the beach',
  'at the bird park', 'at the pasar malam'
];

export const CONTAINERS = [
  { one: 'box', many: 'boxes', e: '📦' },
  { one: 'bag', many: 'bags', e: '👜' },
  { one: 'basket', many: 'baskets', e: '🧺' },
  { one: 'plate', many: 'plates', e: '🍽️' },
  { one: 'jar', many: 'jars', e: '🫙' },
  { one: 'tray', many: 'trays', e: '🟫' },
  { one: 'packet', many: 'packets', e: '🛍️' }
];

// ---------------------------------------------------------------- words
/** "1 apple" / "3 apples" */
export function plural(n, it) {
  return `${n} ${n === 1 ? it.one : it.many}`;
}

export function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** ['a','b','c'] -> "a, b and c" */
export function listAnd(arr) {
  if (arr.length <= 1) return arr.join('');
  return `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`;
}

const ONES = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/** British-style number words used in Singapore schools: 345 -> "three hundred and forty-five". */
export function numWord(n) {
  if (n < 0) return `minus ${numWord(-n)}`;
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '');
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    return `${ONES[h]} hundred${r ? ` and ${numWord(r)}` : ''}`;
  }
  if (n < 1000000) {
    const t = Math.floor(n / 1000);
    const r = n % 1000;
    return `${numWord(t)} thousand${r ? (r < 100 ? ` and ${numWord(r)}` : ` ${numWord(r)}`) : ''}`;
  }
  return String(n);
}

/** 1 -> "1st", 22 -> "22nd" */
export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const ORDINAL_WORDS = [
  'zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
  'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
  'nineteenth', 'twentieth'
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// ---------------------------------------------------------------- money & time
/** 45 -> "45¢" */
export function cents(c) {
  return `${c}¢`;
}

/** cents -> "$3.45" / "$3" (Singapore P2+ notation). */
export function money(c) {
  if (c % 100 === 0) return `$${c / 100}`;
  return `$${Math.floor(c / 100)}.${String(c % 100).padStart(2, '0')}`;
}

/** Spoken form of cents: 345 -> "3 dollars 45 cents". */
export function moneySpeech(c) {
  const d = Math.floor(c / 100);
  const r = c % 100;
  const parts = [];
  if (d) parts.push(d === 1 ? '1 dollar' : `${d} dollars`);
  if (r) parts.push(`${r} cents`);
  return parts.join(' ') || '0 cents';
}

/** Singapore textbook time format: (3, 5) -> "3.05", with optional "a.m."/"p.m.". */
export function clockTime(h, m, ampm) {
  return `${h}.${String(m).padStart(2, '0')}${ampm ? ` ${ampm}` : ''}`;
}

/** Natural spoken time: "3 o'clock", "half past 3", "20 minutes past 3", "quarter to 4". */
export function timeWords(h, m) {
  const next = (h % 12) + 1;
  if (m === 0) return `${h} o'clock`;
  if (m === 30) return `half past ${h}`;
  if (m === 15) return `quarter past ${h}`;
  if (m === 45) return `quarter to ${next}`;
  if (m < 30) return `${m} minute${m === 1 ? '' : 's'} past ${h}`;
  return `${60 - m} minutes to ${next}`;
}

/** Spoken digital time: (3, 5) -> "3 oh 5", (3, 0) -> "3 o'clock". */
export function timeSpeech(h, m, ampm) {
  const tail = ampm ? ` ${ampm === 'a.m.' ? 'A M' : 'P M'}` : '';
  if (m === 0) return `${h} o'clock${tail}`;
  return `${h} ${m < 10 ? `oh ${m}` : m}${tail}`;
}

// ---------------------------------------------------------------- fractions
/** Markup for a stacked fraction in prompts / labels: frac(3,4) -> "[3/4]". */
export function frac(n, d) {
  return `[${n}/${d}]`;
}

export function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

// ---------------------------------------------------------------- choices
/**
 * Numeric answer choices: always contains `answer`, values unique, within [min, max].
 * near: preferred distractors (common mistakes) — used first.
 * Returns [{value, label}] sorted ascending (kid-friendly) unless sort:false.
 */
export function numChoices(R, answer, opts = {}) {
  const {
    near = [],
    count = 4,
    min = 0,
    max = 1e7,
    step = 1,
    fmt = (v) => String(v),
    sort = true
  } = opts;
  let spread = opts.spread ?? Math.max(3, count);
  const set = new Set([answer]);
  for (const d of R.shuffle(near)) {
    if (set.size >= count) break;
    if (Number.isFinite(d) && d >= min && d <= max && d !== answer) set.add(d);
  }
  let guard = 0;
  while (set.size < count && guard++ < 120) {
    const d = answer + R.int(1, spread) * step * (R.chance(0.5) ? 1 : -1);
    if (d >= min && d <= max) set.add(d);
    if (guard % 30 === 0) spread += 2;
  }
  for (let k = 1; set.size < count && k < 10000; k++) {
    if (answer + k * step <= max) set.add(answer + k * step);
    if (set.size < count && answer - k * step >= min) set.add(answer - k * step);
  }
  let vals = [...set];
  vals = sort ? vals.sort((a, b) => a - b) : R.shuffle(vals);
  return vals.map((v) => ({ value: v, label: fmt(v) }));
}

/** Text choices: answer + distinct distractors from pool, shuffled. */
export function textChoices(R, answer, pool, count = 4) {
  const set = new Set([String(answer)]);
  for (const p of R.shuffle(pool)) {
    if (set.size >= count) break;
    set.add(String(p));
  }
  return R.shuffle([...set]).map((v) => ({ value: v, label: v }));
}

/** Choices that are pictures: list of {value, visual} (must include the answer); shuffled. */
export function visualChoices(R, list) {
  return R.shuffle(list).map((c) => ({ value: c.value, visual: c.visual, label: c.label }));
}

/** Fixed-order choices from labels (e.g. ['<', '=', '>']). */
export function fixedChoices(labels) {
  return labels.map((v) => ({ value: v, label: v }));
}

/** "3 + 4 + 5" */
export function sumStr(arr, op = '+') {
  return arr.join(` ${op} `);
}
