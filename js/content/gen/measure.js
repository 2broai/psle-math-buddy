// Measurement — P1 unit 9 (comparing length, non-standard units), P2 units 5–7 (length m/cm, mass kg/g,
// volume ℓ), P3 unit 6 (km/m, m/cm, kg/g, ℓ/mℓ: reading scales, converting, word problems).
import { person, people, numChoices, textChoices, visualChoices, fixedChoices, cap } from '../helpers.js';

const UNIT_WORD = { km: 'kilometre', m: 'metre', cm: 'centimetre', kg: 'kilogram', g: 'gram', 'ℓ': 'litre', 'mℓ': 'millilitre' };
/** Spoken amount: (3, 'km') -> "3 kilometres" */
const say = (n, u) => `${n} ${UNIT_WORD[u]}${n === 1 ? '' : 's'}`;
const LETTERS = ['A', 'B', 'C', 'D'];
const COLORS = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'teal', 'yellow'];

// ================================================================== P1 unit 9
const THINGS_LEN = ['ribbon', 'rope', 'snake', 'train', 'pencil', 'scarf', 'string'];
const p1LenCompare = {
  id: 'p1.len.compare',
  level: 'P1',
  strand: 'measure',
  unit: 9,
  title: 'Longest and shortest',
  vi: 'So sánh độ dài, chiều cao',
  icon: '📏',
  tip: 'Muốn so độ dài phải đặt thẳng một đầu (start at the same line). Từ vựng: long – longer – longest; tall – taller – tallest; short – shorter – shortest.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['extreme', 'tall'] : tier === 2 ? ['extreme', 'tall', 'second'] : ['trans', 'offset', 'second', 'tall']);
    if (form === 'trans') {
      const thing = R.pick(['ribbon', 'rope', 'pencil', 'snake']);
      const [a, b, c] = R.sample(['red', 'blue', 'green', 'yellow', 'orange', 'purple'], 3);
      const useShorter = R.chance(0.5);
      const s1 = useShorter ? `The ${b} ${thing} is shorter than the ${a} ${thing}.` : `The ${a} ${thing} is longer than the ${b} ${thing}.`;
      const s2 = useShorter ? `The ${c} ${thing} is shorter than the ${b} ${thing}.` : `The ${b} ${thing} is longer than the ${c} ${thing}.`;
      const askLong = R.chance(0.5);
      const ans = askLong ? a : c;
      return {
        prompt: `${s1} ${s2} Which ${thing} is the **${askLong ? 'longest' : 'shortest'}**?`,
        input: 'choice',
        answer: ans,
        choices: R.shuffle([a, b, c]).map((x) => ({ value: x, label: `the ${x} ${thing}` })),
        hint: 'Draw the three of them in order, from the longest to the shortest.',
        explain: `In order from longest to shortest: ${a}, ${b}, ${c}. The ${ans} ${thing} is the ${askLong ? 'longest' : 'shortest'}.`
      };
    }
    if (form === 'tall') {
      const k = tier === 1 ? 3 : 4;
      const kids = people(R, k);
      const hts = R.distinctInts(k, 4, 10);
      const askTall = R.chance(0.5);
      const idx = hts.indexOf(askTall ? Math.max(...hts) : Math.min(...hts));
      return {
        prompt: `Who is the **${askTall ? 'tallest' : 'shortest'}**?`,
        visuals: [{ type: 'lengths', vertical: true, items: kids.map((p, i) => ({ label: p.name, len: hts[i], color: COLORS[i], e: R.pick(['🙂', '😀', '😊']) })) }],
        input: 'choice',
        answer: kids[idx].name,
        choices: kids.map((p) => ({ value: p.name, label: p.name })),
        hint: 'They all stand on the same floor. Compare the tops.',
        explain: `${kids[idx].name} is the ${askTall ? 'tallest' : 'shortest'}.`
      };
    }
    if (form === 'offset') {
      const k = 3;
      let lens;
      let offs;
      let guard = 0;
      do {
        lens = R.distinctInts(k, 3, 9);
        offs = [R.int(0, 4), R.int(0, 4), R.int(0, 4)];
        guard++;
      } while (guard < 50 && (() => {
        const ends = lens.map((l, i) => l + offs[i]);
        const longest = lens.indexOf(Math.max(...lens));
        return ends.indexOf(Math.max(...ends)) === longest || new Set(ends).size < k;
      })());
      const idx = lens.indexOf(Math.max(...lens));
      const thing = R.pick(THINGS_LEN);
      return {
        prompt: `The ${thing}s do not start at the same place. Which ${thing} is the **longest**?`,
        visuals: [{ type: 'lengths', units: true, items: lens.map((l, i) => ({ label: LETTERS[i], len: l, offset: offs[i], color: COLORS[i + 1] })) }],
        input: 'choice',
        answer: LETTERS[idx],
        choices: fixedChoices(LETTERS.slice(0, k)),
        hint: 'Do not just look at the ends. Count the squares on each one.',
        explain: `Count the squares: ${lens.map((l, i) => `${LETTERS[i]} is ${l}`).join(', ')}. ${LETTERS[idx]} is the longest.`
      };
    }
    const k = tier === 1 ? 3 : 4;
    let lens = R.distinctInts(k, tier === 1 ? 2 : 3, tier === 1 ? 12 : 10);
    if (tier === 1) lens = lens.map((v, i) => v + i * 0);
    const thing = R.pick(THINGS_LEN);
    const sorted = [...lens].sort((a, b) => b - a);
    if (form === 'second') {
      const askLong = R.chance(0.5);
      const target = askLong ? sorted[1] : sorted[sorted.length - 2];
      const idx = lens.indexOf(target);
      return {
        prompt: `Which ${thing} is the **second ${askLong ? 'longest' : 'shortest'}**?`,
        visuals: [{ type: 'lengths', items: lens.map((l, i) => ({ label: LETTERS[i], len: l, color: COLORS[i] })) }],
        input: 'choice',
        answer: LETTERS[idx],
        choices: fixedChoices(LETTERS.slice(0, k)),
        hint: `First find the ${askLong ? 'longest' : 'shortest'} one. Then find the next one.`,
        explain: `From longest to shortest: ${sorted.map((v) => LETTERS[lens.indexOf(v)]).join(', ')}. The second ${askLong ? 'longest' : 'shortest'} is ${LETTERS[idx]}.`
      };
    }
    const askLong = R.chance(0.5);
    const idx = lens.indexOf(askLong ? sorted[0] : sorted[sorted.length - 1]);
    return {
      prompt: `Which ${thing} is the **${askLong ? 'longest' : 'shortest'}**?`,
      visuals: [{ type: 'lengths', items: lens.map((l, i) => ({ label: LETTERS[i], len: l, color: COLORS[i] })) }],
      input: 'choice',
      answer: LETTERS[idx],
      choices: fixedChoices(LETTERS.slice(0, k)),
      hint: 'They start at the same line. Look at where each one ends.',
      explain: `${thing === 'ribbon' ? 'Ribbon' : cap(thing)} ${LETTERS[idx]} is the ${askLong ? 'longest' : 'shortest'}.`
    };
  }
};

const NS_UNITS = [
  { e: '📎', one: 'paper clip', many: 'paper clips' },
  { e: '🟩', one: 'cube', many: 'cubes' },
  { e: '🖍️', one: 'crayon', many: 'crayons' },
  { e: '🧱', one: 'block', many: 'blocks' }
];
const NS_THINGS = [
  { e: '✏️', one: 'pencil' }, { e: '🎀', one: 'ribbon' }, { e: '🥄', one: 'spoon' }, { e: '👟', one: 'shoe' },
  { e: '🚂', one: 'toy train' }, { e: '🧣', one: 'scarf' }, { e: '📘', one: 'book' }, { e: '🪥', one: 'toothbrush' }
];
const p1LenUnits = {
  id: 'p1.len.units',
  level: 'P1',
  strand: 'measure',
  unit: 9,
  title: 'Measure with paper clips',
  vi: 'Đo độ dài bằng đơn vị tự chọn (kẹp giấy, khối)',
  icon: '📎',
  tip: 'Cho con đo đồ vật thật bằng kẹp giấy hoặc bút chì, xếp sát nhau không chừa khe. Đơn vị càng dài thì số đếm được càng ít.',
  gen(R, tier) {
    const u = R.pick(NS_UNITS);
    const form = R.pick(tier === 1 ? ['count'] : tier === 2 ? ['count', 'diff', 'total'] : ['diff', 'span', 'which', 'total']);
    if (form === 'count') {
      const t = R.pick(NS_THINGS);
      const n = R.int(tier === 1 ? 2 : 4, tier === 1 ? 7 : 11);
      return {
        prompt: `How many ${u.many} long is the ${t.one}?`,
        visuals: [{ type: 'lengths', unitEmoji: u.e, items: [{ label: t.e, len: n, color: R.pick(COLORS) }] }],
        input: tier === 1 ? 'choice' : 'number',
        answer: n,
        ...(tier === 1 ? { choices: numChoices(R, n, { min: 1, max: 12, near: [n - 1, n + 1] }) } : { unit: { post: u.many } }),
        hint: `Count the ${u.many} under the ${t.one}, from one end to the other.`,
        explain: `The ${t.one} is ${n} ${n === 1 ? u.one : u.many} long.`
      };
    }
    if (form === 'diff' || form === 'total') {
      const [t1, t2] = R.sample(NS_THINGS, 2);
      const a = R.int(4, 10);
      const b = R.intExcept(2, 9, [a]);
      const big = Math.max(a, b);
      const small = Math.min(a, b);
      const visuals = [{ type: 'lengths', unitEmoji: u.e, items: [{ label: t1.e, len: a, color: 'blue' }, { label: t2.e, len: b, color: 'orange' }] }];
      if (form === 'total') {
        return {
          prompt: `The ${t1.one} is ${a} ${u.many} long. The ${t2.one} is ${b} ${u.many} long. They are placed end to end. How many ${u.many} long are they **altogether**?`,
          visuals: tier === 3 ? [] : visuals,
          input: 'number',
          answer: a + b,
          unit: { post: u.many },
          hint: 'End to end means we join the two lengths: add.',
          explain: `${a} + ${b} = ${a + b}. Together they are ${a + b} ${u.many} long.`
        };
      }
      const longer = a > b ? t1 : t2;
      const shorter = a > b ? t2 : t1;
      return {
        prompt: `How many ${u.many} **longer** is the ${longer.one} than the ${shorter.one}?`,
        visuals,
        input: 'number',
        answer: big - small,
        unit: { post: u.many },
        hint: 'Count each length. Then find the difference.',
        explain: `The ${longer.one} is ${big} ${u.many} long and the ${shorter.one} is ${small} ${u.many} long. ${big} − ${small} = ${big - small}.`
      };
    }
    if (form === 'which') {
      const t = R.sample(NS_THINGS, 3);
      const lens = R.distinctInts(3, 3, 12);
      const askLong = R.chance(0.5);
      const idx = lens.indexOf(askLong ? Math.max(...lens) : Math.min(...lens));
      return {
        prompt: `The ${t[0].one} is ${lens[0]} ${u.many} long. The ${t[1].one} is ${lens[1]} ${u.many} long. The ${t[2].one} is ${lens[2]} ${u.many} long. Which is the **${askLong ? 'longest' : 'shortest'}**?`,
        input: 'choice',
        answer: t[idx].one,
        choices: t.map((x) => ({ value: x.one, label: `${x.e} ${x.one}` })),
        hint: `They are all measured with the same unit, so just compare the numbers.`,
        explain: `${lens[idx]} is the ${askLong ? 'greatest' : 'smallest'} number, so the ${t[idx].one} is the ${askLong ? 'longest' : 'shortest'}.`
      };
    }
    const kid = person(R);
    const adult = R.pick(['Dad', 'Mum', 'Grandpa', 'Uncle Raj']);
    const many = R.int(7, 10);
    const few = R.int(4, many - 2);
    const thing = R.pick(['table', 'bed', 'desk', 'sofa', 'door']);
    return {
      prompt: `${kid.name} measures the ${thing} with ${kid.his} hand span: it is ${many} spans long. ${adult} measures the same ${thing} with ${adult === 'Mum' ? 'her' : 'his'} hand span: it is ${few} spans long. Whose hand span is **longer**?`,
      input: 'choice',
      answer: adult,
      choices: fixedChoices([kid.name, adult, 'They are the same']),
      hint: 'The same table needs fewer spans when each span is longer.',
      explain: `${adult} needs fewer spans (${few}) than ${kid.name} (${many}), so ${adult}'s hand span is longer.`
    };
  }
};

// ================================================================== P2 unit 5 — length
const RULER_OBJ = ['pencil', 'crayon', 'ribbon', 'straw', 'stick', 'caterpillar', 'nail'];
const p2Ruler = {
  id: 'p2.len.ruler',
  level: 'P2',
  strand: 'measure',
  unit: 5,
  title: 'Measure with a ruler',
  vi: 'Đọc độ dài trên thước (cm)',
  icon: '📐',
  tip: 'Đặt vật bắt đầu ở vạch 0. Nếu vật không bắt đầu ở 0 thì lấy số cuối trừ số đầu (11 − 3 = 8 cm) — đây là lỗi rất hay gặp.',
  gen(R, tier) {
    const obj = R.pick(RULER_OBJ);
    if (tier === 1) {
      const len = R.int(3, 14);
      return {
        prompt: `How long is the ${obj}?`,
        visuals: [{ type: 'ruler', len, start: 0, max: 15, object: obj, color: R.pick(COLORS) }],
        input: 'number',
        answer: len,
        unit: { post: 'cm' },
        hint: 'The ${obj} starts at 0. Read the number where it ends.'.replace('${obj}', obj),
        explain: `The ${obj} starts at 0 cm and ends at ${len} cm. It is ${len} cm long.`
      };
    }
    if (tier === 2 || R.chance(0.35)) {
      const start = R.int(1, 6);
      const len = R.int(3, 15 - start);
      return {
        prompt: `How long is the ${obj}? Look carefully where it starts!`,
        visuals: [{ type: 'ruler', len, start, max: 15, object: obj, color: R.pick(COLORS) }],
        input: 'number',
        answer: len,
        unit: { post: 'cm' },
        hint: `It does not start at 0. Count the centimetre spaces from ${start} to the end, or subtract.`,
        explain: `It starts at ${start} cm and ends at ${start + len} cm. ${start + len} − ${start} = ${len}. The ${obj} is ${len} cm long.`
      };
    }
    if (R.chance(0.5)) {
      const [o1, o2] = R.sample(RULER_OBJ, 2);
      const a = R.int(5, 14);
      const b = R.intExcept(3, 13, [a]);
      const s2 = R.int(0, Math.max(0, 15 - b));
      const [lo, so] = a > b ? [o1, o2] : [o2, o1];
      return {
        prompt: `How much **longer** is the ${lo} than the ${so}?`,
        visuals: [
          { type: 'ruler', len: a, start: 0, max: 15, object: o1, color: R.pick(COLORS) },
          { type: 'ruler', len: b, start: s2, max: 15, object: o2, color: R.pick(COLORS) }
        ],
        input: 'number',
        answer: Math.abs(a - b),
        unit: { post: 'cm' },
        hint: 'Measure each one first (check where each starts). Then subtract.',
        explain: `The ${o1} is ${a} cm. The ${o2} is ${s2 + b} − ${s2} = ${b} cm. ${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)} cm.`
      };
    }
    const start = R.int(0, 5);
    const len = R.int(3, 15 - start);
    const more = R.int(2, 9);
    const who = person(R);
    return {
      prompt: `${who.name}'s ribbon is ${more} cm longer than this ${obj}. How long is ${who.name}'s ribbon?`,
      visuals: [{ type: 'ruler', len, start, max: 15, object: obj, color: R.pick(COLORS) }],
      input: 'number',
      answer: len + more,
      unit: { post: 'cm' },
      hint: `Step 1: measure the ${obj}. Step 2: add ${more} cm.`,
      explain: `The ${obj} is ${len} cm long. ${len} + ${more} = ${len + more} cm.`
    };
  }
};

const SIZE_FACTS = [
  ['the length of a pencil', 15, 'cm'], ['the height of a door', 2, 'm'], ['the length of a bus', 12, 'm'],
  ['the length of an eraser', 4, 'cm'], ['the height of a classroom', 3, 'm'], ['the length of a swimming pool', 25, 'm'],
  ['the width of a storybook', 20, 'cm'], ['the length of a bed', 2, 'm'], ['the height of a cup', 10, 'cm'],
  ['the length of your finger', 6, 'cm'], ['the height of a tall tree', 9, 'm'], ['the length of a spoon', 15, 'cm'],
  ['the length of a running track', 400, 'm'], ['the length of a shoe', 20, 'cm'], ['the height of a flagpole', 10, 'm'],
  ['the length of a toothbrush', 18, 'cm'], ['the length of a car', 4, 'm'], ['the width of a mobile phone', 7, 'cm']
];
const ABOUT_1M = ['a guitar', 'an umbrella', 'a broom', 'a school desk'];
const NOT_1M = ['a paper clip', 'a bus', 'an eraser', 'a swimming pool', 'a teaspoon', 'a coin', 'an aeroplane'];
const p2LenCompare = {
  id: 'p2.len.compare',
  level: 'P2',
  strand: 'measure',
  unit: 5,
  title: 'Metres and centimetres',
  vi: 'So sánh độ dài, chọn đơn vị m hay cm',
  icon: '📏',
  tip: 'Cho con "cảm nhận" độ dài: 1 cm ≈ bề ngang ngón tay út, 1 m ≈ một bước chân dài của người lớn. Đồ vật nhỏ đo bằng cm, đồ vật lớn/quãng đường đo bằng m.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['cmp2', 'unit'] : tier === 2 ? ['cmp2', 'extreme3', 'unit'] : ['extreme3', 'unit', 'about1m', 'cmp2']);
    if (form === 'unit') {
      const [what, n, u] = R.pick(SIZE_FACTS);
      return {
        prompt: `${cap(what)} is about ${n} ____. Which unit is correct?`,
        speak: `${cap(what)} is about ${n} blank. Which unit is correct: centimetres or metres?`,
        input: 'choice',
        answer: u,
        choices: fixedChoices(['cm', 'm']),
        hint: 'Small things are measured in centimetres (cm). Big things and long distances are measured in metres (m).',
        explain: `${cap(what)} is about ${n} ${u === 'cm' ? 'centimetres (cm)' : 'metres (m)'}.`
      };
    }
    if (form === 'about1m') {
      const ans = R.pick(ABOUT_1M);
      return {
        prompt: 'Which of these is **about 1 m** long?',
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, R.sample(NOT_1M, 3), 4),
        hint: '1 m is about as long as a big step of an adult, or 100 cm.',
        explain: `${cap(ans)} is about 1 m long.`
      };
    }
    const u = tier === 1 ? 'cm' : R.pick(['cm', 'm']);
    if (form === 'cmp2') {
      let a;
      let b;
      if (tier === 3) {
        const d = R.distinctInts(2, 1, 9);
        a = d[0] * 100 + (R.chance(0.5) ? 5 : 50) + (R.chance(0.5) ? 0 : d[1]);
        b = d[0] * 100 + (R.chance(0.5) ? 50 : 5) + d[1];
        if (a === b) b += 10;
      } else {
        const [x, y] = R.distinctInts(2, 1, 9);
        a = x * 10 + y;
        b = y * 10 + x;
      }
      const askLong = R.chance(0.5);
      const ans = (askLong ? a > b : a < b) ? `${a} ${u}` : `${b} ${u}`;
      return {
        prompt: `Which is **${askLong ? 'longer' : 'shorter'}**: ${a} ${u} or ${b} ${u}?`,
        input: 'choice',
        answer: ans,
        choices: fixedChoices([`${a} ${u}`, `${b} ${u}`]),
        hint: 'Compare the hundreds first, then the tens, then the ones.',
        explain: `${Math.max(a, b)} ${u} is longer than ${Math.min(a, b)} ${u}. The answer is ${ans}.`
      };
    }
    const thing = u === 'cm' ? R.pick(['ribbon', 'piece of string', 'straw', 'paper strip']) : R.pick(['rope', 'path', 'fence', 'garden hose']);
    const vals = tier === 3 ? R.distinctInts(3, 101, 499) : R.distinctInts(3, 12, 98);
    const askLong = R.chance(0.5);
    const idx = vals.indexOf(askLong ? Math.max(...vals) : Math.min(...vals));
    return {
      prompt: `${vals.map((v, i) => `${cap(thing)} ${LETTERS[i]} is ${v} ${u} long.`).join(' ')} Which ${thing} is the **${askLong ? 'longest' : 'shortest'}**?`,
      input: 'choice',
      answer: LETTERS[idx],
      choices: fixedChoices(LETTERS.slice(0, 3)),
      hint: 'They use the same unit, so compare the numbers.',
      explain: `In order: ${[...vals].sort((x, y) => y - x).map((v) => `${LETTERS[vals.indexOf(v)]} (${v} ${u})`).join(', ')}. ${cap(thing)} ${LETTERS[idx]} is the ${askLong ? 'longest' : 'shortest'}.`
    };
  }
};

const p2LenWord = {
  id: 'p2.len.word',
  level: 'P2',
  strand: 'measure',
  unit: 5,
  title: 'Length stories',
  vi: 'Toán có lời văn về độ dài',
  icon: '🧵',
  tip: 'Vẽ sơ đồ đoạn thẳng (bar model) cho mỗi bài: biết tổng hay biết phần? "longer/shorter than" là so sánh hai đoạn.',
  gen(R, tier) {
    const u = R.pick(['cm', 'm']);
    const who = person(R);
    const forms = tier === 1 ? ['total', 'cut'] : tier === 2 ? ['total', 'cut', 'compare', 'more'] : ['twostep', 'shorter2', 'compare', 'more'];
    const form = R.pick(forms);
    const hi = tier === 1 ? 60 : 450;
    if (form === 'total') {
      const a = R.int(12, hi);
      const b = R.int(10, hi);
      const thing = R.pick(['ribbons', 'ropes', 'pieces of string', 'paths']);
      return {
        prompt: `Two ${thing} are ${a} ${u} and ${b} ${u} long. What is their **total length**?`,
        visuals: tier === 2 ? [{ type: 'bar', rows: [{ label: '', segs: [{ v: a, text: `${a} ${u}`, color: 'blue' }, { v: b, text: `${b} ${u}`, color: 'orange' }] }], total: { text: '?' } }] : [],
        input: 'number',
        answer: a + b,
        unit: { post: u },
        hint: 'Total length means add the two lengths.',
        explain: `${a} ${u} + ${b} ${u} = ${a + b} ${u}.`
      };
    }
    if (form === 'cut') {
      const whole = R.int(30, tier === 1 ? 99 : 900);
      const cut = R.int(5, whole - 5);
      const thing = R.pick(['rope', 'ribbon', 'piece of cloth', 'roll of tape']);
      return {
        prompt: `${who.name} had a ${thing} ${whole} ${u} long. ${who.He} cut off ${cut} ${u}. How long is the ${thing} **now**?`,
        visuals: tier === 2 ? [{ type: 'bar', rows: [{ label: '', segs: [{ v: cut, text: `${cut} ${u}`, color: 'gray' }, { v: whole - cut, text: '?', missing: true }] }], total: { text: `${whole} ${u}` } }] : [],
        input: 'number',
        answer: whole - cut,
        unit: { post: u },
        hint: 'Cutting off makes it shorter: subtract.',
        explain: `${whole} ${u} − ${cut} ${u} = ${whole - cut} ${u}.`
      };
    }
    if (form === 'compare') {
      const [p, q] = people(R, 2);
      const useHeight = u === 'cm' && R.chance(0.5);
      const a = useHeight ? R.int(110, 140) : R.int(20, hi);
      const b = useHeight ? R.intExcept(105, a - 2, []) : R.int(10, a - 3);
      return {
        prompt: useHeight
          ? `${p.name} is ${a} cm tall. ${q.name} is ${b} cm tall. How much **taller** is ${p.name} than ${q.name}?`
          : `${p.name}'s kite string is ${a} ${u} long. ${q.name}'s kite string is ${b} ${u} long. How much **longer** is ${p.name}'s string?`,
        visuals: [{ type: 'bar', rows: [{ label: p.name, segs: [{ v: a, text: `${a} ${useHeight ? 'cm' : u}`, color: 'blue' }] }, { label: q.name, segs: [{ v: b, text: `${b} ${useHeight ? 'cm' : u}`, color: 'orange' }] }], diff: { text: '?', short: 1, long: 0 } }],
        input: 'number',
        answer: a - b,
        unit: { post: useHeight ? 'cm' : u },
        hint: '"How much taller / longer" means find the difference.',
        explain: `${a} − ${b} = ${a - b}. The difference is ${a - b} ${useHeight ? 'cm' : u}.`
      };
    }
    if (form === 'more') {
      const a = R.int(15, hi - 50);
      const d = R.int(5, 50);
      const longer = R.chance(0.6);
      const b = longer ? a + d : a - d;
      if (b <= 0) return p2LenWord.gen(R, tier);
      return {
        prompt: `A red ribbon is ${a} ${u} long. A blue ribbon is ${d} ${u} **${longer ? 'longer' : 'shorter'}** than the red ribbon. How long is the blue ribbon?`,
        visuals: [{ type: 'bar', rows: [{ label: 'Red', segs: [{ v: a, text: `${a} ${u}`, color: 'pink' }] }, { label: 'Blue', segs: [{ v: b, text: '?', color: 'blue', missing: true }] }], diff: { text: `${d} ${u}`, short: longer ? 0 : 1, long: longer ? 1 : 0 } }],
        input: 'number',
        answer: b,
        unit: { post: u },
        hint: longer ? 'Longer than → add the difference.' : 'Shorter than → subtract the difference.',
        explain: `${a} ${longer ? '+' : '−'} ${d} = ${b}. The blue ribbon is ${b} ${u} long.`
      };
    }
    if (form === 'twostep') {
      const a = R.int(15, 200);
      const d = R.int(5, 60);
      const b = a + d;
      return {
        prompt: `Rope A is ${a} ${u} long. Rope B is ${d} ${u} longer than Rope A. What is the **total length** of the two ropes?`,
        visuals: [{ type: 'bar', rows: [{ label: 'A', segs: [{ v: a, text: `${a} ${u}`, color: 'blue' }] }, { label: 'B', segs: [{ v: a, text: `${a} ${u}`, color: 'blue' }, { v: d, text: `${d} ${u}`, color: 'orange' }] }], sum: { text: '?' } }],
        input: 'number',
        answer: a + b,
        unit: { post: u },
        hint: 'Step 1: find the length of Rope B. Step 2: add both ropes.',
        explain: `Rope B: ${a} + ${d} = ${b} ${u}. Total: ${a} + ${b} = ${a + b} ${u}.`
      };
    }
    const a = R.int(60, 400);
    const d = R.int(5, 50);
    const b = a - d;
    return {
      prompt: `Path A is ${a} ${u} long. Path B is ${d} ${u} shorter than Path A. What is the **total length** of both paths?`,
      visuals: [{ type: 'bar', rows: [{ label: 'A', segs: [{ v: a, text: `${a} ${u}`, color: 'green' }] }, { label: 'B', segs: [{ v: b, text: '?', color: 'green', missing: true }] }], diff: { text: `${d} ${u}`, short: 1, long: 0 }, sum: { text: '?' } }],
      input: 'number',
      answer: a + b,
      unit: { post: u },
      hint: 'Step 1: find the length of Path B. Step 2: add both paths.',
      explain: `Path B: ${a} − ${d} = ${b} ${u}. Total: ${a} + ${b} = ${a + b} ${u}.`
    };
  }
};

// ================================================================== P2 unit 6 — mass
const KG_ITEMS = [['🍉', 'watermelon'], ['🍍', 'pineapple'], ['🎃', 'pumpkin'], ['📦', 'parcel'], ['🥔', 'bag of potatoes'], ['🍚', 'bag of rice']];
const G_ITEMS = [['🍎', 'apple'], ['🍌', 'bunch of bananas'], ['🥚', 'tray of eggs'], ['🧈', 'block of butter'], ['🍞', 'loaf of bread'], ['🍫', 'bar of chocolate'], ['🍇', 'bunch of grapes'], ['🥕', 'bag of carrots']];
const p2MassScale = {
  id: 'p2.mass.scale',
  level: 'P2',
  strand: 'measure',
  unit: 6,
  title: 'Read the scale',
  vi: 'Đọc cân đồng hồ (kg, g)',
  icon: '⚖️',
  tip: 'Trước khi đọc kim, hỏi con: "Mỗi vạch nhỏ là bao nhiêu?" (vd 2 số cách nhau 100 g và có 2 vạch → mỗi vạch 50 g).',
  gen(R, tier) {
    if (tier === 3 && R.chance(0.4)) {
      const [x, y] = R.sample(KG_ITEMS, 2);
      const a = R.int(2, 9);
      const b = R.intExcept(1, 9, [a]);
      const [hv, lt] = a > b ? [x, y] : [y, x];
      return {
        prompt: `How much **heavier** is the ${hv[1]} than the ${lt[1]}?`,
        visuals: [
          { type: 'scale', value: a, max: 10, step: 1, major: 2, unit: 'kg', item: x[0] },
          { type: 'scale', value: b, max: 10, step: 1, major: 2, unit: 'kg', item: y[0] }
        ],
        input: 'number',
        answer: Math.abs(a - b),
        unit: { post: 'kg' },
        hint: 'Read each scale first. Then find the difference.',
        explain: `The ${x[1]} is ${a} kg and the ${y[1]} is ${b} kg. ${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)} kg.`
      };
    }
    let cfg;
    if (tier === 1) cfg = { max: 5, step: 1, major: 1, unit: 'kg', value: R.int(1, 4) };
    else if (tier === 2) cfg = R.chance(0.5) ? { max: 1000, step: 100, major: 100, unit: 'g', value: R.step(100, 900, 100) } : { max: 10, step: 1, major: 2, unit: 'kg', value: R.int(1, 9) };
    else cfg = R.chance(0.5) ? { max: 500, step: 50, major: 100, unit: 'g', value: R.step(50, 450, 50) } : { max: 200, step: 10, major: 50, unit: 'g', value: R.step(10, 190, 10) };
    const it = cfg.unit === 'kg' ? R.pick(KG_ITEMS) : R.pick(G_ITEMS);
    const perTick = cfg.step;
    return {
      prompt: `What is the mass of the ${it[1]}?`,
      visuals: [{ type: 'scale', ...cfg, item: it[0] }],
      input: 'number',
      answer: cfg.value,
      unit: { post: cfg.unit },
      hint: `Each small mark on this scale is ${perTick} ${cfg.unit}. Find the number just before the pointer and count on.`,
      explain: `The pointer points to ${cfg.value} ${cfg.unit}. The mass of the ${it[1]} is ${cfg.value} ${cfg.unit}.`
    };
  }
};

const BAL = [['🍍', 'pineapple'], ['🍎', 'apple'], ['🍌', 'banana'], ['🥥', 'coconut'], ['🍐', 'pear'], ['🥭', 'mango'], ['🍋', 'lemon'], ['🍊', 'orange'], ['🧸', 'teddy bear'], ['📘', 'book'], ['⚽', 'ball'], ['🥚', 'egg']];
const p2MassBalance = {
  id: 'p2.mass.balance',
  level: 'P2',
  strand: 'measure',
  unit: 6,
  title: 'Balance scales',
  vi: 'Cân thăng bằng: nặng hơn, nhẹ hơn',
  icon: '🪀',
  tip: 'Bên nào thấp xuống là bên NẶNG hơn. Cân thăng bằng nghĩa là hai bên nặng bằng nhau. Cho con chơi cân đĩa đồ chơi nếu có.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['heavier', 'cubes'] : tier === 2 ? ['heavier', 'cubes', 'weights'] : ['trans', 'twoof', 'weights']);
    if (form === 'heavier') {
      const [a, b] = R.sample(BAL, 2);
      const leftHeavy = R.chance(0.5);
      const askHeavy = tier === 1 ? true : R.chance(0.5);
      const ans = askHeavy === leftHeavy ? a[1] : b[1];
      return {
        prompt: `Which is **${askHeavy ? 'heavier' : 'lighter'}**?`,
        visuals: [{ type: 'balance', left: [a[0]], right: [b[0]], tilt: leftHeavy ? 'left' : 'right' }],
        input: 'choice',
        answer: ans,
        choices: [a, b].map(([e, n]) => ({ value: n, label: `${e} ${n}` })),
        hint: 'The heavier side goes down. The lighter side goes up.',
        explain: `The ${leftHeavy ? a[1] : b[1]} side is lower, so the ${leftHeavy ? a[1] : b[1]} is heavier and the ${leftHeavy ? b[1] : a[1]} is lighter.`
      };
    }
    if (form === 'cubes') {
      const t = R.pick(BAL);
      const n = R.int(2, tier === 1 ? 6 : 8);
      return {
        prompt: `The scale is balanced. The mass of the ${t[1]} is the same as how many cubes?`,
        visuals: [{ type: 'balance', left: [t[0]], right: Array(n).fill('🟦'), tilt: 'level' }],
        input: tier === 1 ? 'choice' : 'number',
        answer: n,
        ...(tier === 1 ? { choices: numChoices(R, n, { min: 1, max: 10, near: [n + 1, n - 1] }) } : { unit: { post: 'cubes' } }),
        hint: 'The scale is level, so both sides have the same mass. Count the cubes.',
        explain: `The scale is balanced, so the ${t[1]} has the same mass as ${n} cubes.`
      };
    }
    if (form === 'weights') {
      const useKg = R.chance(0.5);
      const t = useKg ? R.pick(KG_ITEMS) : R.pick(G_ITEMS);
      const pool = useKg ? [1, 2, 5] : [100, 200, 500];
      const k = R.int(2, tier === 2 ? 3 : 4);
      const ws = Array.from({ length: k }, () => R.pick(pool)).sort((x, y) => y - x);
      const total = ws.reduce((s, v) => s + v, 0);
      const u = useKg ? 'kg' : 'g';
      return {
        prompt: `The scale is balanced. What is the mass of the ${t[1]}?`,
        visuals: [{ type: 'balance', left: [t[0]], right: ws.map((w) => `${w} ${u}`), tilt: 'level' }],
        input: 'number',
        answer: total,
        unit: { post: u },
        hint: 'The scale is level, so the mass is the same as all the weights together.',
        explain: `${ws.map((w) => `${w} ${u}`).join(' + ')} = ${total} ${u}. The ${t[1]} has a mass of ${total} ${u}.`
      };
    }
    if (form === 'trans') {
      const [a, b, c] = R.sample(BAL, 3);
      const askHeavy = R.chance(0.5);
      const ans = askHeavy ? a : c;
      return {
        prompt: `Look at the two balances. Which is the **${askHeavy ? 'heaviest' : 'lightest'}**?`,
        visuals: [
          { type: 'balance', left: [a[0]], right: [b[0]], tilt: 'left' },
          { type: 'balance', left: [c[0]], right: [b[0]], tilt: 'right' }
        ],
        input: 'choice',
        answer: ans[1],
        choices: R.shuffle([a, b, c]).map(([e, n]) => ({ value: n, label: `${e} ${n}` })),
        hint: 'Find which thing is in both pictures. Compare the others with it.',
        explain: `The ${a[1]} is heavier than the ${b[1]}. The ${b[1]} is heavier than the ${c[1]}. So the ${a[1]} is the heaviest and the ${c[1]} is the lightest.`
      };
    }
    const t = R.pick(BAL);
    const per = R.int(2, 4);
    const n = 2 * per;
    return {
      prompt: `The scale is balanced. How many cubes have the same mass as **1** ${t[1]}?`,
      visuals: [{ type: 'balance', left: [t[0], t[0]], right: Array(n).fill('🟦'), tilt: 'level' }],
      input: 'number',
      answer: per,
      unit: { post: 'cubes' },
      hint: `2 of them balance ${n} cubes. Share the cubes equally between the 2.`,
      explain: `2 ${t[1]}s = ${n} cubes, so 1 ${t[1]} = ${n} ÷ 2 = ${per} cubes.`
    };
  }
};

const MASS_FACTS = [
  ['an egg', 60, 'g'], ['an apple', 200, 'g'], ['a watermelon', 4, 'kg'], ['a bag of rice', 5, 'kg'], ['a pencil', 10, 'g'],
  ['a school bag', 3, 'kg'], ['a cat', 4, 'kg'], ['a coin', 6, 'g'], ['a dictionary', 1, 'kg'], ['a banana', 120, 'g'],
  ['a bicycle', 12, 'kg'], ['a strawberry', 15, 'g'], ['a small dog', 8, 'kg'], ['a chocolate bar', 50, 'g']
];
const p2MassWord = {
  id: 'p2.mass.word',
  level: 'P2',
  strand: 'measure',
  unit: 6,
  title: 'Mass stories',
  vi: 'Toán có lời văn về khối lượng (kg, g)',
  icon: '🛍️',
  tip: 'Vật nhẹ (quả trứng, cây bút) đo bằng gam (g); vật nặng (bao gạo, con mèo) đo bằng kilôgam (kg). Bài toán: xác định cộng hay trừ bằng sơ đồ.',
  gen(R, tier) {
    const who = person(R);
    const form = R.pick(tier === 1 ? ['unit', 'diff', 'total'] : tier === 2 ? ['diff', 'total', 'left', 'unit'] : ['two', 'times', 'left', 'diff']);
    if (form === 'unit') {
      const [what, n, u] = R.pick(MASS_FACTS);
      return {
        prompt: `The mass of ${what} is about ${n} ____. Which unit is correct?`,
        speak: `The mass of ${what} is about ${n} blank. Which unit is correct: grams or kilograms?`,
        input: 'choice',
        answer: u,
        choices: fixedChoices(['g', 'kg']),
        hint: 'Light things are measured in grams (g). Heavy things are measured in kilograms (kg).',
        explain: `The mass of ${what} is about ${n} ${u === 'g' ? 'grams (g)' : 'kilograms (kg)'}.`
      };
    }
    const useKg = R.chance(0.5);
    const u = useKg ? 'kg' : 'g';
    if (form === 'diff') {
      const a = useKg ? R.int(8, 60) : R.step(300, 950, 50);
      const b = useKg ? R.int(2, a - 2) : R.step(100, a - 50, 50);
      const [x, y] = useKg ? R.sample(['bag of rice', 'bag of sugar', 'box of books', 'sack of flour', 'basket of durians'], 2) : R.sample(['packet of nuts', 'box of biscuits', 'bag of sweets', 'jar of jam', 'packet of noodles'], 2);
      return {
        prompt: `A ${x} has a mass of ${a} ${u}. A ${y} has a mass of ${b} ${u}. How much **heavier** is the ${x}?`,
        visuals: tier > 1 ? [{ type: 'bar', rows: [{ label: x.split(' ').pop(), segs: [{ v: a, text: `${a} ${u}`, color: 'purple' }] }, { label: y.split(' ').pop(), segs: [{ v: b, text: `${b} ${u}`, color: 'teal' }] }], diff: { text: '?', short: 1, long: 0 } }] : [],
        input: 'number',
        answer: a - b,
        unit: { post: u },
        hint: '"How much heavier" means find the difference.',
        explain: `${a} ${u} − ${b} ${u} = ${a - b} ${u}.`
      };
    }
    if (form === 'total') {
      const a = useKg ? R.int(2, 40) : R.step(100, 500, 50);
      const b = useKg ? R.int(2, 40) : R.step(100, 450, 50);
      return {
        prompt: `${who.name} packs a box of ${a} ${u} and a bag of ${b} ${u}. What is their **total mass**?`,
        input: 'number',
        answer: a + b,
        unit: { post: u },
        hint: 'Total mass means add.',
        explain: `${a} ${u} + ${b} ${u} = ${a + b} ${u}.`
      };
    }
    if (form === 'left') {
      const whole = useKg ? R.int(10, 50) : R.step(500, 1000, 50);
      const used = useKg ? R.int(2, whole - 2) : R.step(100, whole - 100, 50);
      const what = useKg ? R.pick(['rice', 'sand', 'soil', 'flour']) : R.pick(['flour', 'sugar', 'butter', 'cheese']);
      return {
        prompt: `${who.name}'s ${R.pick(['mum', 'dad', 'grandma'])} had ${whole} ${u} of ${what}. ${R.pick(['She', 'He'])} used ${used} ${u}. How much ${what} is **left**?`,
        input: 'number',
        answer: whole - used,
        unit: { post: u },
        hint: 'Used means taken away: subtract.',
        explain: `${whole} ${u} − ${used} ${u} = ${whole - used} ${u}.`
      };
    }
    if (form === 'times') {
      const each = R.int(2, 5);
      const n = R.int(2, 5);
      const box = R.int(1, 3);
      return {
        prompt: `A box has ${n} bags of oranges. Each bag has a mass of ${each} kg. The empty box has a mass of ${box} kg. What is the total mass of the box with the bags?`,
        input: 'number',
        answer: n * each + box,
        unit: { post: 'kg' },
        hint: 'Step 1: find the mass of all the bags. Step 2: add the mass of the box.',
        explain: `${n} × ${each} kg = ${n * each} kg. ${n * each} kg + ${box} kg = ${n * each + box} kg.`
      };
    }
    const [p, q] = people(R, 2);
    const a = R.int(20, 35);
    const d = R.int(3, 9);
    const lighter = R.chance(0.5);
    const b = lighter ? a - d : a + d;
    return {
      prompt: `${p.name}'s mass is ${a} kg. ${q.name} is ${d} kg ${lighter ? 'lighter' : 'heavier'} than ${p.name}. What is their **total mass**?`,
      visuals: [{ type: 'bar', rows: [{ label: p.name, segs: [{ v: a, text: `${a} kg`, color: 'blue' }] }, { label: q.name, segs: [{ v: b, text: '?', color: 'orange', missing: true }] }], diff: { text: `${d} kg`, short: lighter ? 1 : 0, long: lighter ? 0 : 1 }, sum: { text: '?' } }],
      input: 'number',
      answer: a + b,
      unit: { post: 'kg' },
      hint: `Step 1: find ${q.name}'s mass. Step 2: add both masses.`,
      explain: `${q.name}: ${a} ${lighter ? '−' : '+'} ${d} = ${b} kg. Total: ${a} + ${b} = ${a + b} kg.`
    };
  }
};

// ================================================================== P2 unit 7 — volume
const p2VolBeaker = {
  id: 'p2.vol.beaker',
  level: 'P2',
  strand: 'measure',
  unit: 7,
  title: 'How much water?',
  vi: 'Đọc thể tích nước trong bình (lít)',
  icon: '🧪',
  tip: 'Nhìn mặt nước ngang tầm mắt. Hỏi con mỗi vạch là bao nhiêu lít trước khi đọc. 1 hộp sữa lớn ≈ 1 lít (1 ℓ).',
  gen(R, tier) {
    const liquid = R.pick([['water', '#60a5fa'], ['orange juice', '#fb923c'], ['milk', '#e2e8f0'], ['apple juice', '#facc15'], ['soup', '#f87171'], ['soya bean milk', '#fde68a']]);
    if (tier === 1) {
      const max = R.pick([5, 6]);
      if (R.chance(0.35)) {
        const [a, b] = R.distinctInts(2, 1, max - 1);
        const askMore = R.chance(0.5);
        const ans = (askMore ? a > b : a < b) ? 'A' : 'B';
        return {
          prompt: `Which jug has **${askMore ? 'more' : 'less'}** ${liquid[0]}?`,
          visuals: [
            { type: 'beaker', value: a, max, step: 1, major: 1, unit: 'ℓ', color: liquid[1], label: 'A' },
            { type: 'beaker', value: b, max, step: 1, major: 1, unit: 'ℓ', color: liquid[1], label: 'B' }
          ],
          input: 'choice',
          answer: ans,
          choices: fixedChoices(['A', 'B']),
          hint: 'Both jugs have the same marks. Which one is filled higher?',
          explain: `Jug A has ${a} ℓ and jug B has ${b} ℓ. Jug ${ans} has ${askMore ? 'more' : 'less'}.`
        };
      }
      const v = R.int(1, max - 1);
      return {
        prompt: `How much ${liquid[0]} is in the jug?`,
        visuals: [{ type: 'beaker', value: v, max, step: 1, major: 1, unit: 'ℓ', color: liquid[1] }],
        input: 'number',
        answer: v,
        unit: { post: 'ℓ' },
        hint: 'Look at the top of the liquid. Which mark is it next to?',
        explain: `The ${liquid[0]} is at the ${v} ℓ mark. There ${v === 1 ? 'is 1 litre' : `are ${v} litres`} of ${liquid[0]}.`
      };
    }
    const form = R.pick(tier === 2 ? ['read', 'most'] : ['diff', 'fill', 'most']);
    if (form === 'read') {
      const v = R.int(1, 9);
      return {
        prompt: `How much ${liquid[0]} is in the container?`,
        visuals: [{ type: 'beaker', value: v, max: 10, step: 1, major: 2, unit: 'ℓ', color: liquid[1] }],
        input: 'number',
        answer: v,
        unit: { post: 'ℓ' },
        hint: 'Only some marks have numbers. Each small mark is 1 ℓ.',
        explain: `The ${liquid[0]} is at the ${v} ℓ mark. There ${v === 1 ? 'is 1 litre' : `are ${v} litres`} of ${liquid[0]}.`
      };
    }
    if (form === 'most') {
      const vals = R.distinctInts(3, 1, 9);
      const askMost = R.chance(0.5);
      const idx = vals.indexOf(askMost ? Math.max(...vals) : Math.min(...vals));
      return {
        prompt: `Which container has the **${askMost ? 'most' : 'least'}** water?`,
        input: 'choice',
        answer: LETTERS[idx],
        choices: vals.map((v, i) => ({ value: LETTERS[i], visual: { type: 'beaker', value: v, max: 10, step: 1, major: 2, unit: 'ℓ', label: LETTERS[i] } })),
        hint: 'All the containers have the same marks. Compare the water levels.',
        explain: `Container ${LETTERS[idx]} has ${vals[idx]} ℓ, the ${askMost ? 'most' : 'least'}.`
      };
    }
    if (form === 'diff') {
      const [a, b] = R.distinctInts(2, 1, 10);
      const big = a > b ? 'A' : 'B';
      const small = big === 'A' ? 'B' : 'A';
      return {
        prompt: `How much more water is in container ${big} than in container ${small}?`,
        visuals: [
          { type: 'beaker', value: a, max: 10, step: 1, major: 2, unit: 'ℓ', label: 'A' },
          { type: 'beaker', value: b, max: 10, step: 1, major: 2, unit: 'ℓ', label: 'B' }
        ],
        input: 'number',
        answer: Math.abs(a - b),
        unit: { post: 'ℓ' },
        hint: 'Read both containers. Then find the difference.',
        explain: `A has ${a} ℓ and B has ${b} ℓ. ${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)} ℓ.`
      };
    }
    const v = R.int(1, 8);
    return {
      prompt: 'How much more water is needed to fill the container up to the **10 ℓ** mark?',
      visuals: [{ type: 'beaker', value: v, max: 10, step: 1, major: 2, unit: 'ℓ' }],
      input: 'number',
      answer: 10 - v,
      unit: { post: 'ℓ' },
      hint: 'Read how much water there is now. How many more litres to reach 10?',
      explain: `There is ${v} ℓ now. ${10} − ${v} = ${10 - v} ℓ more is needed.`
    };
  }
};

const VOL_FACTS_1L = ['a carton of milk', 'a big bottle of water'];
const VOL_NOT_1L = ['a teacup', 'a bathtub', 'a swimming pool', 'a spoon', 'a fish tank'];
const p2VolWord = {
  id: 'p2.vol.word',
  level: 'P2',
  strand: 'measure',
  unit: 7,
  title: 'Litre stories',
  vi: 'Toán có lời văn về thể tích (lít)',
  icon: '🪣',
  tip: 'Chơi rót nước bằng chai 1 lít và các cốc ở nhà. Bài "mỗi chai 2 ℓ, 4 chai" là phép nhân; "đổ đầy xô 10 ℓ bằng ca 2 ℓ" là phép chia.',
  gen(R, tier) {
    const who = person(R);
    const form = R.pick(tier === 1 ? ['used', 'total', 'about'] : tier === 2 ? ['used', 'more', 'times', 'share'] : ['twostep', 'times', 'share', 'more']);
    if (form === 'about') {
      const ans = R.pick(VOL_FACTS_1L);
      return {
        prompt: 'Which of these holds **about 1 litre**?',
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, R.sample(VOL_NOT_1L, 3), 4),
        hint: 'Think of the big milk cartons at the supermarket.',
        explain: `${cap(ans)} holds about 1 litre.`
      };
    }
    if (form === 'used') {
      const whole = R.int(tier === 1 ? 10 : 30, tier === 1 ? 50 : 200);
      const used = R.int(3, whole - 3);
      return {
        prompt: `A tank had ${whole} ℓ of water. ${who.name} used ${used} ℓ to water the plants. How much water is **left** in the tank?`,
        input: 'number',
        answer: whole - used,
        unit: { post: 'ℓ' },
        hint: 'Used means taken away: subtract.',
        explain: `${whole} ℓ − ${used} ℓ = ${whole - used} ℓ.`
      };
    }
    if (form === 'total') {
      const a = R.int(2, 30);
      const b = R.int(2, 30);
      return {
        prompt: `A pail has ${a} ℓ of water. A basin has ${b} ℓ of water. How much water is there **altogether**?`,
        input: 'number',
        answer: a + b,
        unit: { post: 'ℓ' },
        hint: 'Altogether means add.',
        explain: `${a} ℓ + ${b} ℓ = ${a + b} ℓ.`
      };
    }
    if (form === 'more') {
      const a = R.int(2, 40);
      const d = R.int(2, 20);
      return {
        prompt: `Jug A holds ${a} ℓ of juice. Jug B holds ${d} ℓ **more** than Jug A. How much juice does Jug B hold?`,
        visuals: [{ type: 'bar', rows: [{ label: 'Jug A', segs: [{ v: a, text: `${a} ℓ`, color: 'orange' }] }, { label: 'Jug B', segs: [{ v: a + d, text: '?', color: 'yellow', missing: true }] }], diff: { text: `${d} ℓ`, short: 0, long: 1 } }],
        input: 'number',
        answer: a + d,
        unit: { post: 'ℓ' },
        hint: 'More than → add the difference.',
        explain: `${a} + ${d} = ${a + d} ℓ.`
      };
    }
    if (form === 'times') {
      const each = R.pick([2, 3, 4, 5, 10]);
      const n = R.int(2, 9);
      return {
        prompt: `Each bottle holds ${each} ℓ of water. How much water is there in ${n} bottles?`,
        input: 'number',
        answer: each * n,
        unit: { post: 'ℓ' },
        hint: `${n} groups of ${each} ℓ: multiply.`,
        explain: `${n} × ${each} ℓ = ${each * n} ℓ.`
      };
    }
    if (form === 'share') {
      const each = R.pick([2, 3, 4, 5]);
      const n = R.int(2, 9);
      return {
        prompt: `A pail holds ${each * n} ℓ of water. How many ${each}-litre jugs of water are needed to fill it?`,
        speak: `A pail holds ${each * n} litres of water. How many ${each} litre jugs of water are needed to fill it?`,
        input: 'number',
        answer: n,
        unit: { post: 'jugs' },
        hint: `How many groups of ${each} ℓ make ${each * n} ℓ? Divide.`,
        explain: `${each * n} ÷ ${each} = ${n}. ${n} jugs are needed.`
      };
    }
    const tank = R.int(10, 40);
    const n = R.int(2, 4);
    const each = R.int(2, 5);
    return {
      prompt: `A fish tank has ${tank} ℓ of water. ${who.name} pours in ${n} jugs of water. Each jug holds ${each} ℓ. How much water is in the tank now?`,
      input: 'number',
      answer: tank + n * each,
      unit: { post: 'ℓ' },
      hint: 'Step 1: find how much water the jugs hold. Step 2: add it to the tank.',
      explain: `${n} × ${each} ℓ = ${n * each} ℓ. ${tank} ℓ + ${n * each} ℓ = ${tank + n * each} ℓ.`
    };
  }
};

// ================================================================== P3 unit 6
const CONV = [
  { big: 'km', small: 'm', f: 1000 },
  { big: 'm', small: 'cm', f: 100 },
  { big: 'kg', small: 'g', f: 1000 },
  { big: 'ℓ', small: 'mℓ', f: 1000 }
];
const p3Convert = {
  id: 'p3.measure.convert',
  level: 'P3',
  strand: 'measure',
  unit: 6,
  title: 'Converting units',
  vi: 'Đổi đơn vị: km–m, m–cm, kg–g, ℓ–mℓ',
  icon: '🔁',
  tip: 'Học thuộc: 1 km = 1000 m, 1 m = 100 cm, 1 kg = 1000 g, 1 ℓ = 1000 mℓ. Cẩn thận số 0: 2 m 5 cm = 205 cm (không phải 25 cm).',
  gen(R, tier) {
    const c = R.pick(CONV);
    const small3 = c.f === 1000;
    const form = R.pick(tier === 1 ? ['b2s', 's2b'] : tier === 2 ? ['comp2s', 'b2s', 'split'] : ['split', 'compare', 'comp2s']);
    if (form === 'b2s') {
      const k = R.int(2, 9);
      return {
        prompt: `${k} ${c.big} = **?** ${c.small}`,
        speak: `${say(k, c.big)} equals how many ${UNIT_WORD[c.small]}s?`,
        input: 'number',
        answer: k * c.f,
        unit: { post: c.small },
        hint: `1 ${c.big} = ${c.f} ${c.small}.`,
        explain: `${k} × ${c.f} = ${k * c.f}. So ${k} ${c.big} = ${k * c.f} ${c.small}.`
      };
    }
    if (form === 's2b') {
      const k = R.int(2, 9);
      return {
        prompt: `${k * c.f} ${c.small} = **?** ${c.big}`,
        speak: `${say(k * c.f, c.small)} equals how many ${UNIT_WORD[c.big]}s?`,
        input: 'number',
        answer: k,
        unit: { post: c.big },
        hint: `Every ${c.f} ${c.small} makes 1 ${c.big}.`,
        explain: `${k * c.f} ÷ ${c.f} = ${k}. So ${k * c.f} ${c.small} = ${k} ${c.big}.`
      };
    }
    const big = R.int(1, 9);
    const small = tier === 3 && R.chance(0.5) ? R.int(1, 9) * (small3 ? R.pick([1, 10]) : 1) : R.int(small3 ? 11 : 11, c.f - 1);
    const total = big * c.f + small;
    if (form === 'comp2s') {
      return {
        prompt: `${big} ${c.big} ${small} ${c.small} = **?** ${c.small}`,
        speak: `${say(big, c.big)} ${say(small, c.small)} equals how many ${UNIT_WORD[c.small]}s?`,
        input: 'number',
        answer: total,
        unit: { post: c.small },
        hint: `Change ${big} ${c.big} to ${c.small} first, then add ${small} ${c.small}.`,
        explain: `${big} ${c.big} = ${big * c.f} ${c.small}. ${big * c.f} + ${small} = ${total} ${c.small}.`
      };
    }
    if (form === 'split') {
      const askBig = R.chance(0.4);
      return {
        prompt: askBig ? `${total} ${c.small} = **?** ${c.big} ${small} ${c.small}` : `${total} ${c.small} = ${big} ${c.big} **?** ${c.small}`,
        speak: askBig
          ? `${say(total, c.small)} equals how many ${UNIT_WORD[c.big]}s and ${say(small, c.small)}?`
          : `${say(total, c.small)} equals ${say(big, c.big)} and how many ${UNIT_WORD[c.small]}s?`,
        input: 'number',
        answer: askBig ? big : small,
        unit: { post: askBig ? c.big : c.small },
        hint: `Each ${c.f} ${c.small} makes 1 ${c.big}. What is left over stays in ${c.small}.`,
        explain: `${total} ${c.small} = ${big * c.f} ${c.small} + ${small} ${c.small} = ${big} ${c.big} ${small} ${c.small}.`
      };
    }
    let other = total + R.pick([-1, 1]) * R.pick(small3 ? [10, 40, 90, 100, 450] : [5, 10, 30]);
    if (other <= 0 || other === total) other = total + 10;
    const a = `${big} ${c.big} ${small} ${c.small}`;
    const b = `${other} ${c.small}`;
    const word = { km: ['longer', 'shorter'], m: ['longer', 'shorter'], kg: ['heavier', 'lighter'], 'ℓ': ['more', 'less'] }[c.big];
    const askMore = R.chance(0.5);
    const ans = (askMore ? total > other : total < other) ? a : b;
    return {
      prompt: `Which is **${askMore ? word[0] : word[1]}**: ${a} or ${b}?`,
      speak: `Which is ${askMore ? word[0] : word[1]}: ${say(big, c.big)} ${say(small, c.small)}, or ${say(other, c.small)}?`,
      input: 'choice',
      answer: ans,
      choices: fixedChoices([a, b]),
      hint: `Change both to ${c.small} before you compare.`,
      explain: `${a} = ${total} ${c.small}. ${total} ${c.small} is ${total > other ? 'more' : 'less'} than ${other} ${c.small}. The answer is ${ans}.`
    };
  }
};

const p3Read = {
  id: 'p3.measure.read',
  level: 'P3',
  strand: 'measure',
  unit: 6,
  title: 'Read scales and jugs',
  vi: 'Đọc cân (kg, g) và bình đo (ℓ, mℓ)',
  icon: '🥛',
  tip: 'Tìm giá trị mỗi vạch nhỏ trước: giữa 1 kg và 2 kg có 10 khoảng → mỗi vạch 100 g. Kết quả có thể viết "1 kg 300 g" hoặc "1300 g".',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['beakerml', 'scaleg'] : tier === 2 ? ['beakerml', 'scalekg', 'scaleg'] : ['scalekgpart', 'beakerl', 'scalekg']);
    if (form === 'beakerml') {
      const step = tier === 1 ? 100 : 50;
      const v = R.step(step, 1000 - step, step);
      return {
        prompt: 'How much water is in the beaker?',
        visuals: [{ type: 'beaker', value: v, max: 1000, step, major: 200, unit: 'mℓ' }],
        input: 'number',
        answer: v,
        unit: { post: 'mℓ' },
        hint: `Each small mark is ${step} mℓ. Count on from the number just below the water.`,
        explain: `The water is at ${v} mℓ.`
      };
    }
    if (form === 'beakerl') {
      const v = R.step(100, 1900, 100);
      const askMl = R.chance(0.5);
      const L = Math.floor(v / 1000);
      const ml = v % 1000;
      return {
        prompt: askMl || L === 0 ? 'How much water is in the beaker? Give your answer in mℓ.' : `How much water is in the beaker? It is ${L} ℓ **?** mℓ.`,
        speak: askMl || L === 0 ? 'How much water is in the beaker? Give your answer in millilitres.' : `How much water is in the beaker? It is ${say(L, 'ℓ')} and how many millilitres?`,
        visuals: [{ type: 'beaker', value: v, max: 2000, step: 100, major: 500, unit: 'mℓ' }],
        input: 'number',
        answer: askMl || L === 0 ? v : ml,
        unit: { post: 'mℓ' },
        hint: 'Each small mark is 100 mℓ. 1000 mℓ = 1 ℓ.',
        explain: `The water is at ${v} mℓ${L ? ` = ${L} ℓ ${ml} mℓ` : ''}.`
      };
    }
    if (form === 'scaleg') {
      const it = R.pick(G_ITEMS);
      const v = R.step(20, 480, 20);
      return {
        prompt: `What is the mass of the ${it[1]}?`,
        visuals: [{ type: 'scale', value: v, max: 500, step: 20, major: 100, unit: 'g', item: it[0] }],
        input: 'number',
        answer: v,
        unit: { post: 'g' },
        hint: 'There are 5 small spaces between 0 and 100 g, so each small mark is 20 g.',
        explain: `The pointer is at ${v} g.`
      };
    }
    const it = R.pick(KG_ITEMS);
    const max = R.pick([3000, 5000]);
    const v = R.step(100, max - 100, 100);
    const kgPart = Math.floor(v / 1000);
    const gPart = v % 1000;
    const scaleVis = { type: 'scale', value: v, max, step: 100, major: 1000, unit: 'g', labelDiv: 1000, labelUnit: 'kg', item: it[0] };
    if (form === 'scalekgpart' && kgPart > 0 && gPart > 0) {
      return {
        prompt: `The mass of the ${it[1]} is ${kgPart} kg **?** g.`,
        speak: `The mass of the ${it[1]} is ${say(kgPart, 'kg')} and how many grams?`,
        visuals: [scaleVis],
        input: 'number',
        answer: gPart,
        unit: { post: 'g' },
        hint: 'There are 10 small spaces between two kg numbers, so each small mark is 100 g.',
        explain: `The pointer is ${gPart / 100} small marks after ${kgPart} kg: ${kgPart} kg ${gPart} g.`
      };
    }
    return {
      prompt: `What is the mass of the ${it[1]} in grams?`,
      visuals: [scaleVis],
      input: 'number',
      answer: v,
      unit: { post: 'g' },
      hint: 'Each small mark is 100 g. 1 kg = 1000 g.',
      explain: `The pointer shows ${kgPart ? `${kgPart} kg ${gPart} g` : `${gPart} g`} = ${v} g.`
    };
  }
};

const p3Word = {
  id: 'p3.measure.word',
  level: 'P3',
  strand: 'measure',
  unit: 6,
  title: 'Measurement stories',
  vi: 'Bài toán đo lường nhiều bước, đổi đơn vị',
  icon: '🧭',
  tip: 'Đổi tất cả về CÙNG một đơn vị nhỏ (cm, g, mℓ, m) trước khi tính, rồi mới đổi lại nếu đề yêu cầu.',
  gen(R, tier) {
    const who = person(R);
    const form = R.pick(tier === 1 ? ['ribbon', 'flour', 'juice'] : tier === 2 ? ['ribbon', 'flour', 'juice', 'walk'] : ['cups', 'apples', 'walk', 'ribbon2']);
    if (form === 'ribbon') {
      const m = R.int(2, 5);
      const cut = R.int(15, 95);
      return {
        prompt: `A ribbon is ${m} m long. ${who.name} cuts off ${cut} cm. How long is the ribbon left? Give your answer in cm.`,
        input: 'number',
        answer: m * 100 - cut,
        unit: { post: 'cm' },
        hint: `Change ${m} m to cm first (1 m = 100 cm).`,
        explain: `${m} m = ${m * 100} cm. ${m * 100} − ${cut} = ${m * 100 - cut} cm.`
      };
    }
    if (form === 'flour') {
      const kg = R.int(1, 4);
      const used = R.step(150, 950, 50);
      return {
        prompt: `A bag of flour has a mass of ${kg} kg. ${who.name}'s mum uses ${used} g to bake bread. How much flour is left? Give your answer in g.`,
        input: 'number',
        answer: kg * 1000 - used,
        unit: { post: 'g' },
        hint: 'Change kg to g first (1 kg = 1000 g).',
        explain: `${kg} kg = ${kg * 1000} g. ${kg * 1000} − ${used} = ${kg * 1000 - used} g.`
      };
    }
    if (form === 'juice') {
      const L = R.int(1, 2);
      const ml = R.step(100, 900, 100);
      const pour = R.step(150, L * 1000 + ml - 100, 50);
      return {
        prompt: `A jug has ${L} ℓ ${ml} mℓ of juice. ${who.name} pours ${pour} mℓ into a glass. How much juice is left in the jug? Give your answer in mℓ.`,
        input: 'number',
        answer: L * 1000 + ml - pour,
        unit: { post: 'mℓ' },
        hint: 'Change everything to mℓ first (1 ℓ = 1000 mℓ).',
        explain: `${L} ℓ ${ml} mℓ = ${L * 1000 + ml} mℓ. ${L * 1000 + ml} − ${pour} = ${L * 1000 + ml - pour} mℓ.`
      };
    }
    if (form === 'walk') {
      const km = R.int(1, 3);
      const m1 = R.step(50, 950, 50);
      const m2 = R.step(200, 950, 50);
      const a = km * 1000 + m1;
      return {
        prompt: `From ${who.name}'s home to the library is ${km} km ${m1} m. From the library to the school is ${m2} m. ${who.name} walks from home to the library, then to the school. How far does ${who.he} walk? Give your answer in m.`,
        input: 'number',
        answer: a + m2,
        unit: { post: 'm' },
        hint: 'Change km to m first (1 km = 1000 m). Then add.',
        explain: `${km} km ${m1} m = ${a} m. ${a} + ${m2} = ${a + m2} m.`
      };
    }
    if (form === 'cups') {
      const each = R.pick([150, 200, 250, 300]);
      const n = R.int(3, 6);
      const L = R.int(2, 3);
      const left = L * 1000 - n * each;
      return {
        prompt: `A bottle has ${L} ℓ of water. ${who.name} fills ${n} cups with ${each} mℓ of water each. How much water is left in the bottle? Give your answer in mℓ.`,
        input: 'number',
        answer: left,
        unit: { post: 'mℓ' },
        hint: 'Step 1: find how much water went into the cups. Step 2: subtract from the bottle (1 ℓ = 1000 mℓ).',
        explain: `${n} × ${each} mℓ = ${n * each} mℓ. ${L} ℓ = ${L * 1000} mℓ. ${L * 1000} − ${n * each} = ${left} mℓ.`
      };
    }
    if (form === 'apples') {
      const n = R.int(4, 8);
      const each = R.pick([100, 120, 150, 200, 250]);
      const box = R.step(100, 400, 50);
      return {
        prompt: `A box has ${n} apples. Each apple has a mass of ${each} g. The empty box has a mass of ${box} g. What is the total mass of the box of apples? Give your answer in g.`,
        input: 'number',
        answer: n * each + box,
        unit: { post: 'g' },
        hint: 'Step 1: find the mass of all the apples. Step 2: add the box.',
        explain: `${n} × ${each} g = ${n * each} g. ${n * each} + ${box} = ${n * each + box} g.`
      };
    }
    const m = R.int(3, 6);
    const p1c = R.int(40, 95);
    const p2c = R.int(40, 95);
    return {
      prompt: `${who.name} has a rope ${m} m long. ${who.He} cuts off two pieces: one is ${p1c} cm and the other is ${p2c} cm. How much rope is left? Give your answer in cm.`,
      input: 'number',
      answer: m * 100 - p1c - p2c,
      unit: { post: 'cm' },
      hint: `Change ${m} m to cm. Then take away both pieces.`,
      explain: `${m} m = ${m * 100} cm. ${p1c} + ${p2c} = ${p1c + p2c} cm. ${m * 100} − ${p1c + p2c} = ${m * 100 - p1c - p2c} cm.`
    };
  }
};

export const SKILLS = [
  p1LenCompare,
  p1LenUnits,
  p2Ruler,
  p2LenCompare,
  p2LenWord,
  p2MassScale,
  p2MassBalance,
  p2MassWord,
  p2VolBeaker,
  p2VolWord,
  p3Convert,
  p3Read,
  p3Word
];
