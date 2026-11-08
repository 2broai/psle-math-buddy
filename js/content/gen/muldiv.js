// Multiplication & division.
// P1 (units 13–14): equal groups, repeated addition, arrays, sharing and grouping within 40.
//                   MOE P1 builds the ideas with "groups of" language — no × or ÷ signs yet.
// P2 (units 3–4):   times tables 2, 3, 4, 5, 10 and related division facts, word problems,
//                   order property, missing factors, equal-unit bar models.
// P3 (units 3–4):   times tables 6–9, related facts, 2-/3-digit × 1-digit, division (with remainder),
//                   "times as many" (unitary) bar models and multi-step word problems.
import { ITEMS, CONTAINERS, person, people, plural, cap, ordinal, numChoices, textChoices, visualChoices } from '../helpers.js';

// ------------------------------------------------------------------ local helpers
const THINGS = [
  ...ITEMS.food.map((x) => ({ ...x, cat: 'food' })),
  ...ITEMS.toys.map((x) => ({ ...x, cat: 'toys' })),
  ...ITEMS.school.map((x) => ({ ...x, cat: 'school' }))
];
const thing = (R) => R.pick(THINGS);
// Containers that make sense for an item (no "a plate of pencils"); flat ones take "on"/"onto".
const FLAT = new Set(['plate', 'tray']);
const inOn = (box) => (FLAT.has(box.one) ? 'on' : 'in');
const intoOnto = (box) => (FLAT.has(box.one) ? 'onto' : 'into');
function holder(R, it, allowFlat = true) {
  const ok = CONTAINERS.filter(
    (c) => (it && it.cat !== 'food' ? ['box', 'bag', 'basket'].includes(c.one) : true) && (allowFlat || !FLAT.has(c.one))
  );
  return R.pick(ok);
}
const KIDS = ['🧒', '👦', '👧'];
const repeatAdd = (n, k) => Array(k).fill(n).join(' + ');
const multiples = (t, k) => Array.from({ length: k }, (_, i) => (i + 1) * t).join(', ');
const nounFor = (n, it) => (n === 1 ? it.one : it.many);
const timesWord = (k) => (k === 2 ? 'twice' : `${k} times`);

/** Equal groups picture: g groups of `per` emojis. */
function groupsVis(emoji, g, per, size) {
  return {
    type: 'objects',
    size: size || (per > 6 || g > 4 ? 'sm' : 'md'),
    groups: Array.from({ length: g }, () => ({ emoji, count: per }))
  };
}
/** Groups picture from a list of counts (may be unequal). */
function countsVis(emoji, counts, size = 'sm') {
  return { type: 'objects', size, groups: counts.map((c) => ({ emoji, count: c })) };
}
/** Bar with k equal units. text: string shown in every unit, or array per unit. */
function unitsRow(label, k, v, text, color = 'blue') {
  return {
    label,
    segs: Array.from({ length: k }, (_, i) => ({ v, text: Array.isArray(text) ? text[i] : text, color }))
  };
}

// Things with a fixed number of legs / wheels / sides … (for "each has n" stories).
const EACH_HAS = [
  { one: 'chicken', many: 'chickens', n: 2, part: 'legs', e: '🐔' },
  { one: 'duck', many: 'ducks', n: 2, part: 'legs', e: '🦆' },
  { one: 'bicycle', many: 'bicycles', n: 2, part: 'wheels', e: '🚲' },
  { one: 'tricycle', many: 'tricycles', n: 3, part: 'wheels', e: null },
  { one: 'stool', many: 'stools', n: 3, part: 'legs', e: null },
  { one: 'triangle', many: 'triangles', n: 3, part: 'sides', e: '🔺' },
  { one: 'dog', many: 'dogs', n: 4, part: 'legs', e: '🐶' },
  { one: 'cat', many: 'cats', n: 4, part: 'legs', e: '🐱' },
  { one: 'cow', many: 'cows', n: 4, part: 'legs', e: '🐮' },
  { one: 'car', many: 'cars', n: 4, part: 'wheels', e: '🚗' },
  { one: 'chair', many: 'chairs', n: 4, part: 'legs', e: '🪑' },
  { one: 'square', many: 'squares', n: 4, part: 'sides', e: '🟦' },
  { one: 'hand', many: 'hands', n: 5, part: 'fingers', e: '✋' },
  { one: 'ant', many: 'ants', n: 6, part: 'legs', e: '🐜' },
  { one: 'spider', many: 'spiders', n: 8, part: 'legs', e: '🕷️' },
  { one: 'octopus', many: 'octopuses', n: 8, part: 'arms', e: '🐙' }
];
const eachHas = (R, ns) => R.pick(EACH_HAS.filter((x) => ns.includes(x.n)));

// Things that come in packs of a fixed size.
const PACKS = {
  2: [
    { pack: 'pair', packs: 'pairs', one: 'sock', many: 'socks', e: '🧦' },
    { pack: 'pair', packs: 'pairs', one: 'shoe', many: 'shoes', e: '👟' },
    { pack: 'pair', packs: 'pairs', one: 'glove', many: 'gloves', e: '🧤' },
    { pack: 'pair', packs: 'pairs', one: 'chopstick', many: 'chopsticks', e: '🥢' }
  ],
  3: [
    { pack: 'pack', packs: 'packs', one: 'yoghurt cup', many: 'yoghurt cups', e: '🥛' },
    { pack: 'set', packs: 'sets', one: 'tennis ball', many: 'tennis balls', e: '🎾' }
  ],
  4: [
    { pack: 'box', packs: 'boxes', one: 'muffin', many: 'muffins', e: '🧁' },
    { pack: 'packet', packs: 'packets', one: 'curry puff', many: 'curry puffs', e: '🥟' }
  ],
  5: [
    { pack: 'bag', packs: 'bags', one: 'orange', many: 'oranges', e: '🍊' },
    { pack: 'packet', packs: 'packets', one: 'sweet', many: 'sweets', e: '🍬' }
  ],
  10: [
    { pack: 'box', packs: 'boxes', one: 'crayon', many: 'crayons', e: '🖍️' },
    { pack: 'tray', packs: 'trays', one: 'egg', many: 'eggs', e: '🥚' },
    { pack: 'pack', packs: 'packs', one: 'pencil', many: 'pencils', e: '✏️' }
  ]
};

const TABLE_HINT = {
  2: 'Double the other number.',
  3: 'Count in 3s: 3, 6, 9, 12 …',
  4: 'Double it, then double again.',
  5: 'Count in 5s — the answer ends in 5 or 0.',
  6: 'Double the 3 times table.',
  7: 'Split 7 into 5 and 2: add the 5s and the 2s.',
  8: 'Double, double and double again.',
  9: 'Times 10, then take away one group.',
  10: 'Put a 0 at the end of the number.'
};

// ------------------------------------------------------------------ fact-skill factories (sprint)
function mulFactsGen(tables, maxN = 10) {
  return (R, tier) => {
    const t = R.pick(tables[tier]);
    const n = R.int(tier === 1 ? 1 : 2, tier === 1 ? Math.min(5, maxN) : maxN);
    const P = n * t;
    const form = tier === 1 ? R.pick(['nt', 'nt', 'tn']) : tier === 2 ? R.pick(['nt', 'tn']) : R.pick(['nt', 'tn', 'missN', 'missT']);
    const facts = `${n} × ${t} = ${P}. Count in ${t}s: ${multiples(t, n)}.`;
    if (form === 'missN') {
      return {
        prompt: `? × ${t} = ${P}`,
        input: 'number',
        answer: n,
        hint: `How many ${t}s make ${P}? Count in ${t}s until you reach ${P}.`,
        explain: `${n} × ${t} = ${P}, so the missing number is ${n}.`
      };
    }
    if (form === 'missT') {
      return {
        prompt: `${n} × ? = ${P}`,
        input: 'number',
        answer: t,
        hint: `${n} groups of what number make ${P}? Try the times tables you know.`,
        explain: `${n} × ${t} = ${P}, so the missing number is ${t}.`
      };
    }
    return {
      prompt: form === 'nt' ? `${n} × ${t} = ?` : `${t} × ${n} = ?`,
      input: 'number',
      answer: P,
      hint: TABLE_HINT[t],
      explain: form === 'nt' ? facts : `${t} × ${n} = ${n} × ${t} = ${P}. Count in ${t}s: ${multiples(t, n)}.`
    };
  };
}

function divFactsGen(tables, maxN = 10) {
  return (R, tier) => {
    const t = R.pick(tables[tier]);
    const n = R.int(tier === 1 ? 1 : 2, tier === 1 ? Math.min(5, maxN) : maxN);
    const P = n * t;
    const form = tier === 3 ? R.pick(['plain', 'plain', 'missP', 'missT']) : R.pick(['plain', 'plain', 'howmany']);
    if (form === 'howmany') {
      return {
        prompt: `How many ${t}s make ${P}?`,
        input: 'number',
        answer: n,
        hint: `Count in ${t}s until you reach ${P}.`,
        explain: `${multiples(t, n)}. ${n} × ${t} = ${P}, so ${n} ${t}s make ${P}. (${P} ÷ ${t} = ${n})`
      };
    }
    if (form === 'missP') {
      return {
        prompt: `? ÷ ${t} = ${n}`,
        input: 'number',
        answer: P,
        hint: `Which number shared into ${t} equal groups gives ${n} in each? Think ${n} × ${t}.`,
        explain: `${n} × ${t} = ${P}, so ${P} ÷ ${t} = ${n}. The missing number is ${P}.`
      };
    }
    if (form === 'missT') {
      return {
        prompt: `${P} ÷ ? = ${n}`,
        input: 'number',
        answer: t,
        hint: `${n} times what number makes ${P}?`,
        explain: `${n} × ${t} = ${P}, so ${P} ÷ ${t} = ${n}. The missing number is ${t}.`
      };
    }
    return {
      prompt: `${P} ÷ ${t} = ?`,
      input: 'number',
      answer: n,
      hint: `Think: what number times ${t} makes ${P}?`,
      explain: `${P} ÷ ${t} = ${n}, because ${n} × ${t} = ${P}.`
    };
  };
}

// ================================================================== P1 unit 13: multiplication
const p1Groups = {
  id: 'p1.mul.groups',
  level: 'P1',
  strand: 'muldiv',
  unit: 13,
  title: 'Equal groups',
  vi: 'Nhóm bằng nhau (ý nghĩa phép nhân)',
  icon: '🍱',
  tip: 'Ở P1, phép nhân được dạy bằng "groups of": 3 groups of 4 = 3 nhóm, mỗi nhóm 4. Cho con xếp đồ vật thật vào đĩa rồi đếm theo nhóm (4, 8, 12) thay vì đếm từng cái.',
  gen(R, tier) {
    const [gMin, gMax, pMin, pMax] = tier === 1 ? [2, 3, 2, 5] : tier === 2 ? [2, 5, 2, 6] : [3, 5, 4, 8];
    const g = R.int(gMin, gMax);
    const per = R.int(pMin, pMax);
    const total = g * per;
    const it = thing(R);
    const box = holder(R, it);
    let form = R.pick(tier === 1 ? ['story', 'groupsof', 'which'] : tier === 2 ? ['story', 'groupsof', 'which', 'describe'] : ['story', 'describe', 'compare']);
    if (form === 'which' && (g > 4 || per > 5)) form = 'groupsof';
    const near = [g + per, total + per, total - per, g * (per + 1)];
    const numberOrChoice = (ans, extra = {}) =>
      tier === 1
        ? { input: 'choice', answer: ans, choices: numChoices(R, ans, { near: extra.near || near, min: 1, max: 45 }) }
        : { input: 'number', answer: ans };

    if (form === 'story') {
      return {
        prompt: `There are ${g} ${box.many}. Each ${box.one} has ${plural(per, it)}. How many ${it.many} are there **altogether**?`,
        visuals: [groupsVis(it.e, g, per)],
        ...numberOrChoice(total),
        hint: `Count in ${per}s, one ${box.one} at a time: ${per}, ${per * 2} …`,
        explain: `${g} groups of ${per}: ${repeatAdd(per, g)} = ${total}. There are ${plural(total, it)} altogether.`
      };
    }
    if (form === 'groupsof') {
      return {
        prompt: `${g} groups of ${per} = ?`,
        speak: `${g} groups of ${per} make how many?`,
        visuals: [groupsVis(it.e, g, per)],
        ...numberOrChoice(total),
        hint: `There are ${g} groups. Each group has ${per}. Count in ${per}s.`,
        explain: `${g} groups of ${per} = ${repeatAdd(per, g)} = ${total}.`
      };
    }
    if (form === 'which') {
      const opts = [{ value: 'right', visual: groupsVis(it.e, g, per, 'sm') }];
      if (g !== per) opts.push({ value: 'swap', visual: groupsVis(it.e, per, g, 'sm') });
      const uneq = Array(g).fill(per);
      uneq[0] += 1;
      uneq[g - 1] -= 1;
      opts.push({ value: 'unequal', visual: countsVis(it.e, uneq) });
      if (opts.length < 4) opts.push({ value: 'more', visual: groupsVis(it.e, g, per + 1, 'sm') });
      return {
        prompt: `Which picture shows **${g} groups of ${per}**?`,
        input: 'choice',
        answer: 'right',
        choices: visualChoices(R, opts),
        hint: `Look for ${g} groups. Every group must have exactly ${per}.`,
        explain: `${g} groups of ${per} means ${g} equal groups with ${per} in each group: ${repeatAdd(per, g)} = ${total}.`
      };
    }
    if (form === 'describe') {
      const askGroups = R.chance(0.5);
      return {
        prompt: askGroups
          ? `Look at the picture. How many **groups** of ${per} are there?`
          : `There are ${g} equal groups. How many ${it.many} are in **each** group?`,
        visuals: [groupsVis(it.e, g, per)],
        input: 'number',
        answer: askGroups ? g : per,
        hint: askGroups ? 'Count the boxes (groups), not the things inside.' : 'Count the things inside one box.',
        explain: `There are ${g} groups of ${per}. That makes ${total} altogether.`
      };
    }
    // compare (tier 3)
    let g2;
    let p2;
    if (R.chance(0.3) && g !== per) {
      g2 = per;
      p2 = g;
    } else {
      do {
        g2 = R.int(2, 5);
        p2 = R.int(3, 8);
      } while ((g2 === g && p2 === per) || (g2 === per && p2 === g) || g2 * p2 === total);
    }
    const A = `${g} groups of ${per}`;
    const B = `${g2} groups of ${p2}`;
    const ans = total === g2 * p2 ? 'They are the same' : total > g2 * p2 ? A : B;
    return {
      prompt: `Which is **more**: ${A} or ${B}?`,
      input: 'choice',
      answer: ans,
      choices: [A, B, 'They are the same'].map((v) => ({ value: v, label: v })),
      hint: 'Work out each one. Count in equal steps.',
      explain: `${A} = ${total}. ${B} = ${g2 * p2}. ${ans === 'They are the same' ? 'They are the same.' : `${ans} is more.`}`
    };
  }
};

const p1Repeated = {
  id: 'p1.mul.repeated',
  level: 'P1',
  strand: 'muldiv',
  unit: 13,
  title: 'Add the same number',
  vi: 'Cộng lặp lại (đếm nhảy)',
  icon: '🐸',
  tip: 'Cộng lặp lại (repeated addition) là cầu nối sang phép nhân: 5 + 5 + 5 = 3 groups of 5. Cho con "đếm nhảy" (skip count) 5, 10, 15 trên tia số.',
  gen(R, tier) {
    const per = tier === 1 ? R.pick([2, 5, 10]) : tier === 2 ? R.int(2, 6) : R.int(3, 9);
    const kMax = Math.min(tier === 1 ? 4 : 5, Math.floor(40 / per));
    const k = R.int(2, Math.max(2, kMax));
    const total = per * k;
    const form = R.pick(tier === 1 ? ['sum', 'jumps', 'which'] : tier === 2 ? ['sum', 'jumps', 'which', 'howmany'] : ['sum', 'howmany', 'which', 'jumps']);
    if (form === 'sum') {
      return {
        prompt: `${repeatAdd(per, k)} = ?`,
        visuals: tier === 1 ? [groupsVis(thing(R).e, k, per)] : [],
        input: tier === 1 ? 'choice' : 'number',
        answer: total,
        ...(tier === 1 ? { choices: numChoices(R, total, { near: [per + k, total - per, total + per], min: 1, max: 45 }) } : {}),
        hint: `Count on in ${per}s: ${per}, ${per * 2} …`,
        explain: `${repeatAdd(per, k)} = ${total}. That is ${k} groups of ${per}.`
      };
    }
    if (form === 'jumps') {
      const max = total + per;
      const step = per === 2 ? 1 : per;
      const every = per === 2 ? 2 : 1;
      const jumps = Array.from({ length: k }, (_, i) => ({ from: i * per, to: (i + 1) * per, text: k <= 6 ? `+${per}` : '' }));
      return {
        prompt: `A frog starts at 0. It jumps ${per} each time. Where does it land after **${k} jumps**?`,
        visuals: [{ type: 'numberline', min: 0, max, step, every, jumps, hide: [total] }],
        input: tier === 1 ? 'choice' : 'number',
        answer: total,
        ...(tier === 1 ? { choices: numChoices(R, total, { near: [k, total - per, total + per], min: 1, max: 50 }) } : {}),
        hint: `Each jump adds ${per}. Count the jumps: ${per}, ${per * 2} …`,
        explain: `${k} jumps of ${per}: ${repeatAdd(per, k)} = ${total}. The frog lands on ${total}.`
      };
    }
    if (form === 'howmany') {
      return {
        prompt: `${repeatAdd(per, k)} is **how many groups** of ${per}?`,
        input: 'number',
        answer: k,
        hint: `Count how many ${per}s are being added.`,
        explain: `${repeatAdd(per, k)} adds ${per}, ${k} times. So it is ${k} groups of ${per} (= ${total}).`
      };
    }
    // which addition shows k groups of per
    const right = repeatAdd(per, k);
    const pool = [`${k} + ${per}`, repeatAdd(per, k + 1), repeatAdd(per, k - 1 >= 2 ? k - 1 : k + 2)];
    if (k !== per) pool.push(repeatAdd(k, per));
    return {
      prompt: `Which addition shows **${k} groups of ${per}**?`,
      input: 'choice',
      answer: right,
      choices: textChoices(R, right, pool.filter((p) => p !== right), 4),
      hint: `${k} groups of ${per} means we add ${per}, ${k} times.`,
      explain: `${k} groups of ${per} = ${right} = ${total}.${k !== per ? ` (${repeatAdd(k, per)} is ${per} groups of ${k}.)` : ''}`
    };
  }
};

const p1Arrays = {
  id: 'p1.mul.arrays',
  level: 'P1',
  strand: 'muldiv',
  unit: 13,
  title: 'Rows and arrays',
  vi: 'Xếp thành hàng đều (array)',
  icon: '🟦',
  tip: 'Đồ vật xếp thành các hàng đều nhau gọi là array. Đếm theo hàng: 3 rows of 5 = 5, 10, 15. Tìm array quanh nhà: khay trứng, ô cửa sổ, thanh socola.',
  gen(R, tier) {
    const r = R.int(2, tier === 1 ? 3 : tier === 2 ? 5 : 6);
    const c = R.int(2, tier === 1 ? 5 : tier === 2 ? 6 : Math.min(8, Math.floor(40 / r)));
    const total = r * c;
    const it = thing(R);
    const vis = { type: 'array', rows: r, cols: c, emoji: it.e, boxRows: tier < 3 };
    const form = R.pick(tier === 1 ? ['total', 'perrow', 'rows'] : tier === 2 ? ['total', 'describe', 'perrow'] : ['total', 'describe', 'trays']);
    if (form === 'total') {
      return {
        prompt: `There are ${r} rows of ${plural(c, it)}. How many ${it.many} are there?`,
        visuals: [vis],
        input: tier === 1 ? 'choice' : 'number',
        answer: total,
        ...(tier === 1 ? { choices: numChoices(R, total, { near: [r + c, total - c, total + c], min: 1, max: 45 }) } : {}),
        hint: `Count row by row: ${c}, ${c * 2} …`,
        explain: `${r} rows of ${c}: ${repeatAdd(c, r)} = ${total}.`
      };
    }
    if (form === 'perrow' || form === 'rows') {
      const askRows = form === 'rows';
      return {
        prompt: askRows ? `How many **rows** of ${it.many} are there?` : `How many ${it.many} are there in **each row**?`,
        visuals: [vis],
        input: tier === 1 ? 'choice' : 'number',
        answer: askRows ? r : c,
        ...(tier === 1 ? { choices: numChoices(R, askRows ? r : c, { near: [askRows ? c : r, total], min: 1, max: 45 }) } : {}),
        hint: 'A row goes across, from left to right.',
        explain: `There are ${r} rows. Each row has ${c}. ${r} rows of ${c} make ${total}.`
      };
    }
    if (form === 'describe') {
      const right = `${r} rows of ${c}`;
      const pool = [`${r} rows of ${c + 1}`, `${r + 1} rows of ${c}`, `${r} rows of ${r === c ? c - 1 : r}`];
      if (r !== c) pool.push(`${c} rows of ${r}`);
      return {
        prompt: 'Which sentence describes the picture?',
        visuals: [vis],
        input: 'choice',
        answer: right,
        choices: textChoices(R, right, pool.filter((p) => p !== right), 4),
        hint: 'First count the rows (across). Then count how many are in one row.',
        explain: `There are ${r} rows with ${c} in each row: ${right} = ${total}.`
      };
    }
    // trays (tier 3, two-step)
    const rr = R.int(2, 3);
    const cc = R.int(2, 5);
    const trays = R.int(2, Math.max(2, Math.floor(40 / (rr * cc))));
    const per = rr * cc;
    return {
      prompt: `A tray has ${rr} rows of ${cc} cupcakes. How many cupcakes are there on **${trays} trays**?`,
      visuals: [{ type: 'array', rows: rr, cols: cc, emoji: '🧁', boxRows: true }],
      input: 'number',
      answer: per * trays,
      hint: 'First find how many cupcakes are on one tray.',
      explain: `One tray: ${rr} rows of ${cc} = ${per}. ${trays} trays: ${repeatAdd(per, trays)} = ${per * trays}.`
    };
  }
};

const p1MulWord = {
  id: 'p1.mul.word',
  level: 'P1',
  strand: 'muldiv',
  unit: 13,
  title: 'Groups stories',
  vi: 'Toán đố: nhóm bằng nhau (nhân)',
  icon: '📖',
  tip: 'Hỏi con 2 câu: "How many groups?" và "How many in each group?". Vẽ nhanh các vòng tròn (nhóm) và chấm bên trong để con tự giải.',
  gen(R, tier) {
    const p = person(R);
    const form = R.pick(tier === 3 ? ['each', 'legs', 'twostep', 'twostep'] : ['each', 'legs', 'kids']);
    if (form === 'legs') {
      const a = eachHas(R, tier === 1 ? [2, 4] : [2, 3, 4, 5, 6, 8]);
      const g = R.int(2, Math.min(tier === 1 ? 4 : 6, Math.floor(40 / a.n)));
      const total = g * a.n;
      return {
        prompt: `There are ${g} ${a.many}. Each ${a.one} has ${a.n} ${a.part}. How many ${a.part} are there **altogether**?`,
        visuals: a.e && tier < 3 ? [{ type: 'objects', groups: [{ emoji: a.e, count: g }] }] : [],
        input: tier === 1 ? 'choice' : 'number',
        answer: total,
        ...(tier === 1 ? { choices: numChoices(R, total, { near: [g + a.n, g, total + a.n], min: 1, max: 45 }) } : {}),
        hint: `Each ${a.one} has ${a.n} ${a.part}. Count in ${a.n}s for the ${g} ${a.many}.`,
        explain: `${g} groups of ${a.n}: ${repeatAdd(a.n, g)} = ${total}. There are ${total} ${a.part}.`
      };
    }
    const it = thing(R);
    const box = holder(R, it);
    const g = R.int(2, tier === 1 ? 3 : 5);
    const per = R.int(2, Math.min(tier === 1 ? 5 : 10, Math.floor(40 / g)));
    const total = g * per;
    if (form === 'kids') {
      return {
        prompt: `${g} children each have ${plural(per, it)}. How many ${it.many} do they have **in all**?`,
        visuals: tier === 1 ? [groupsVis(it.e, g, per)] : [],
        input: tier === 1 ? 'choice' : 'number',
        answer: total,
        ...(tier === 1 ? { choices: numChoices(R, total, { near: [g + per, total - per, total + per], min: 1, max: 45 }) } : {}),
        hint: `There are ${g} groups of ${per}.`,
        explain: `${g} groups of ${per} = ${repeatAdd(per, g)} = ${total}. They have ${plural(total, it)} in all.`
      };
    }
    if (form === 'each') {
      const [who, pr] = R.pick([[p.name, p.he], ['Mum', 'she'], ['Dad', 'he'], ['Grandma', 'she']]);
      return {
        prompt: `${who} buys ${g} ${box.many} of ${it.many}. There are ${per} ${it.many} ${inOn(box)} each ${box.one}. How many ${it.many} does ${pr} buy?`,
        visuals: tier === 1 ? [groupsVis(it.e, g, per)] : [],
        input: tier === 1 ? 'choice' : 'number',
        answer: total,
        ...(tier === 1 ? { choices: numChoices(R, total, { near: [g + per, total - per, total + per], min: 1, max: 45 }) } : {}),
        hint: `How many ${box.many}? How many in each ${box.one}? Count in ${per}s.`,
        explain: `${g} groups of ${per} = ${total}. The answer is ${plural(total, it)}.`
      };
    }
    // twostep (tier 3)
    const g2 = R.int(2, 4);
    const per2 = R.int(3, 8);
    const sub = R.chance(0.5);
    const base = g2 * per2;
    const extra = sub ? R.int(1, per2 + 2) : R.int(1, 9);
    const flower = R.pick([
      { one: 'flower', many: 'flowers', box: 'vase', boxes: 'vases' },
      { one: 'cookie', many: 'cookies', box: 'jar', boxes: 'jars' },
      { one: 'marble', many: 'marbles', box: 'bag', boxes: 'bags' },
      { one: 'sticker', many: 'stickers', box: 'page', boxes: 'pages' }
    ]);
    const ans = sub ? base - extra : base + extra;
    return {
      prompt: sub
        ? `${p.name} has ${g2} ${flower.boxes} with ${per2} ${flower.many} in each ${flower.box}. ${p.He} gives away ${extra} ${nounFor(extra, flower)}. How many ${flower.many} does ${p.he} have now?`
        : `There are ${g2} ${flower.boxes} with ${per2} ${flower.many} in each ${flower.box}. There are ${extra} more ${nounFor(extra, flower)} on the table. How many ${flower.many} are there **altogether**?`,
      input: 'number',
      answer: ans,
      hint: `Step 1: find ${g2} groups of ${per2}. Step 2: ${sub ? 'take away' : 'add'} ${extra}.`,
      explain: `${g2} groups of ${per2} = ${base}. ${base} ${sub ? '−' : '+'} ${extra} = ${ans}.`
    };
  }
};

// ================================================================== P1 unit 14: division
const p1Share = {
  id: 'p1.div.share',
  level: 'P1',
  strand: 'muldiv',
  unit: 14,
  title: 'Share equally',
  vi: 'Chia đều (mỗi phần được bao nhiêu)',
  icon: '🍪',
  tip: '"Share equally" là mỗi người được số như nhau. Cho con "phát bài": chia lần lượt từng cái cho mỗi người đến khi hết, rồi đếm phần của một người.',
  gen(R, tier) {
    const [gMin, gMax, eMin, eMax] = tier === 1 ? [2, 3, 2, 4] : tier === 2 ? [2, 5, 2, 5] : [2, 5, 3, 8];
    const g = R.int(gMin, gMax);
    const each = R.int(eMin, eMax);
    const total = g * each;
    const it = thing(R);
    let form = R.pick(tier === 1 ? ['kids', 'boxes', 'which'] : tier === 2 ? ['kids', 'boxes', 'which'] : ['kids', 'boxes', 'two']);
    if (form === 'which' && total > 15) form = 'kids';
    if (form === 'two' && g < 3) form = 'boxes';
    const near = [total - g, total + g, each + 1, each - 1, g];
    const kidE = R.pick(KIDS);
    const picture =
      total <= 20 && tier < 3
        ? [{ type: 'objects', groups: [{ emoji: it.e, count: total, label: `${total} ${it.many}` }, { emoji: kidE, count: g, label: `${g} children`, box: false }] }]
        : [];
    if (form === 'kids') {
      return {
        prompt: `Share ${plural(total, it)} **equally** among ${g} children. How many ${it.many} does each child get?`,
        visuals: picture,
        input: tier === 1 ? 'choice' : 'number',
        answer: each,
        ...(tier === 1 ? { choices: numChoices(R, each, { near, min: 1, max: 20 }) } : {}),
        hint: `Give one ${it.one} to each child, again and again, until none are left.`,
        explain: `${total} shared equally among ${g} children: each child gets ${each}, because ${g} groups of ${each} make ${total}.`
      };
    }
    if (form === 'boxes') {
      const p = person(R);
      const box = holder(R, it);
      return {
        prompt: `${p.name} puts ${plural(total, it)} **equally** ${intoOnto(box)} ${g} ${box.many}. How many ${it.many} are ${inOn(box)} each ${box.one}?`,
        visuals: total <= 20 && tier < 3 ? [{ type: 'objects', groups: [{ emoji: it.e, count: total }] }] : [],
        input: tier === 1 ? 'choice' : 'number',
        answer: each,
        ...(tier === 1 ? { choices: numChoices(R, each, { near, min: 1, max: 20 }) } : {}),
        hint: `There are ${g} ${box.many}. Each ${box.one} gets the same number.`,
        explain: `${g} groups of ${each} make ${total}. So there are ${plural(each, it)} ${inOn(box)} each ${box.one}.`
      };
    }
    if (form === 'which') {
      const uneq = Array(g).fill(each);
      uneq[0] += 1;
      uneq[g - 1] -= 1;
      const opts = [
        { value: 'equal', visual: countsVis(it.e, Array(g).fill(each)) },
        { value: 'unequal', visual: countsVis(it.e, uneq) }
      ];
      if (total % (g + 1) === 0 && g + 1 <= 5) opts.push({ value: 'groups', visual: countsVis(it.e, Array(g + 1).fill(total / (g + 1))) });
      else if (g > 2 && total % (g - 1) === 0) opts.push({ value: 'groups', visual: countsVis(it.e, Array(g - 1).fill(total / (g - 1))) });
      else opts.push({ value: 'more', visual: countsVis(it.e, Array(g).fill(each + 1)) });
      return {
        prompt: `Which picture shows ${plural(total, it)} shared **equally** into ${g} groups?`,
        input: 'choice',
        answer: 'equal',
        choices: visualChoices(R, opts),
        hint: `Check two things: are there ${g} groups? Does every group have the same number?`,
        explain: `${total} shared equally into ${g} groups gives ${each} in each group.`
      };
    }
    // two (tier 3): how many do 2 children get altogether
    const kk = R.int(2, g - 1);
    return {
      prompt: `${g} friends share ${plural(total, it)} equally. How many ${it.many} do **${kk}** of the friends get altogether?`,
      input: 'number',
      answer: each * kk,
      hint: 'First find how many one friend gets.',
      explain: `Each friend gets ${total} shared by ${g} = ${each}. ${kk} friends get ${repeatAdd(each, kk)} = ${each * kk}.`
    };
  }
};

const p1Group = {
  id: 'p1.div.group',
  level: 'P1',
  strand: 'muldiv',
  unit: 14,
  title: 'Put into groups',
  vi: 'Chia theo nhóm (có bao nhiêu nhóm)',
  icon: '🧺',
  tip: 'Chia nhóm (grouping): biết mỗi nhóm có mấy, hỏi có mấy nhóm. Cho con khoanh tròn từng nhóm trên hình rồi đếm số vòng tròn.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['items', 'teams'] : tier === 2 ? ['items', 'teams', 'boxes'] : ['boxes', 'legs', 'teams']);
    if (form === 'legs') {
      const a = eachHas(R, [2, 3, 4, 5, 6, 8]);
      const g = R.int(2, Math.min(8, Math.floor(40 / a.n)));
      const total = g * a.n;
      return {
        prompt: `There are ${total} ${a.part} altogether. Each ${a.one} has ${a.n} ${a.part}. How many ${a.many} are there?`,
        input: 'number',
        answer: g,
        hint: `Make groups of ${a.n}. Count in ${a.n}s up to ${total}.`,
        explain: `${total} in groups of ${a.n}: ${multiples(a.n, g)}. That is ${g} groups, so there are ${g} ${a.many}.`
      };
    }
    const per = tier === 1 ? R.int(2, 4) : tier === 2 ? R.int(2, 5) : R.int(3, 8);
    const g = R.int(2, Math.min(tier === 1 ? 4 : 6, Math.floor(40 / per)));
    const total = per * g;
    const near = [total - per, per, g + 1, g - 1];
    if (form === 'items') {
      const it = thing(R);
      return {
        prompt: `Put ${plural(total, it)} into groups of ${per}. How many **groups** are there?`,
        visuals: total <= 20 ? [{ type: 'objects', groups: [{ emoji: it.e, count: total }], perRow: tier === 1 ? per : 5 }] : [],
        input: tier === 1 ? 'choice' : 'number',
        answer: g,
        ...(tier === 1 ? { choices: numChoices(R, g, { near, min: 1, max: 20 }) } : {}),
        hint: `Circle ${per} at a time. Count the circles.`,
        explain: `${total} in groups of ${per}: ${multiples(per, g)}. There are ${g} groups.`
      };
    }
    if (form === 'teams') {
      return {
        prompt: `There are ${total} children. They form teams of ${per}. How many teams are there?`,
        visuals: total <= 20 && tier < 3 ? [{ type: 'objects', groups: [{ emoji: R.pick(KIDS), count: total }], perRow: tier === 1 ? per : 5 }] : [],
        input: tier === 1 ? 'choice' : 'number',
        answer: g,
        ...(tier === 1 ? { choices: numChoices(R, g, { near, min: 1, max: 20 }) } : {}),
        hint: `Each team has ${per} children. Count in ${per}s until you reach ${total}.`,
        explain: `${multiples(per, g)}. ${g} teams of ${per} make ${total}.`
      };
    }
    const p = person(R);
    const it = thing(R);
    const box = holder(R, it);
    return {
      prompt: `${p.name} has ${plural(total, it)}. ${p.He} puts ${per} ${it.many} ${inOn(box)} each ${box.one}. How many ${box.many} does ${p.he} need?`,
      input: 'number',
      answer: g,
      hint: `Each ${box.one} takes ${per}. How many ${per}s make ${total}?`,
      explain: `${g} groups of ${per} make ${total}, so ${p.he} needs ${g} ${box.many}.`
    };
  }
};

const p1DivWord = {
  id: 'p1.div.word',
  level: 'P1',
  strand: 'muldiv',
  unit: 14,
  title: 'Sharing or grouping?',
  vi: 'Toán đố: chia đều hay chia nhóm',
  icon: '📚',
  tip: 'Phân biệt 2 kiểu: biết số nhóm → tìm mỗi nhóm (sharing); biết mỗi nhóm → tìm số nhóm (grouping). Hỏi con: "Do we know how many groups, or how many in each group?"',
  gen(R, tier) {
    const p = person(R);
    const it = thing(R);
    const box = holder(R, it);
    const g = R.int(2, tier === 1 ? 3 : 5);
    const per = R.int(2, Math.min(tier === 1 ? 5 : 8, Math.floor(40 / g)));
    const total = g * per;
    const kinds = tier === 3 ? ['share', 'group', 'mul', 'mul'] : ['share', 'group'];
    const kind = R.pick(kinds);
    const pic = tier === 1 && total <= 20 ? [{ type: 'objects', groups: [{ emoji: it.e, count: total }] }] : [];
    if (kind === 'share') {
      return {
        prompt: `${p.name} has ${plural(total, it)}. ${p.He} shares them equally among ${g} friends. How many ${it.many} does each friend get?`,
        visuals: pic,
        input: tier === 1 ? 'choice' : 'number',
        answer: per,
        ...(tier === 1 ? { choices: numChoices(R, per, { near: [g, total - g, per + 1], min: 1, max: 20 }) } : {}),
        hint: `We know there are ${g} friends (groups). Share one by one.`,
        explain: `${g} groups of ${per} make ${total}. Each friend gets ${plural(per, it)}.`
      };
    }
    if (kind === 'group') {
      return {
        prompt: `${p.name} has ${plural(total, it)}. ${p.He} puts ${per} ${inOn(box)} each ${box.one}. How many ${box.many} does ${p.he} fill?`,
        visuals: pic,
        input: tier === 1 ? 'choice' : 'number',
        answer: g,
        ...(tier === 1 ? { choices: numChoices(R, g, { near: [per, total - per, g + 1], min: 1, max: 20 }) } : {}),
        hint: `We know each ${box.one} has ${per}. Count in ${per}s to ${total}.`,
        explain: `${multiples(per, g)}. ${g} ${box.many} of ${per} make ${total}.`
      };
    }
    return {
      prompt: `Each ${box.one} has ${plural(per, it)}. How many ${it.many} are there ${inOn(box)} ${g} ${box.many}?`,
      input: 'number',
      answer: total,
      hint: 'Read carefully: do we know the total, or do we need to find it?',
      explain: `We need the total: ${g} groups of ${per} = ${repeatAdd(per, g)} = ${total}.`
    };
  }
};

// ================================================================== P2 unit 3: 2, 5, 10
const p2Facts2510 = {
  id: 'p2.mul.table2510',
  level: 'P2',
  strand: 'muldiv',
  unit: 3,
  title: 'Times tables 2, 5, 10',
  vi: 'Bảng nhân 2, 5, 10',
  icon: '⚡',
  tip: 'Học bảng nhân 2, 5, 10 bằng đếm nhảy: 5, 10, 15… Mẹo: ×10 thêm số 0 vào cuối; ×5 bằng một nửa ×10; ×2 là gấp đôi. Luyện Speed Sprint 1–2 phút mỗi ngày.',
  sprint: true,
  gen: mulFactsGen({ 1: [2, 10], 2: [2, 5, 10], 3: [2, 5, 10] })
};

const p2Div2510 = {
  id: 'p2.div.table2510',
  level: 'P2',
  strand: 'muldiv',
  unit: 3,
  title: 'Divide by 2, 5, 10',
  vi: 'Chia cho 2, 5, 10',
  icon: '➗',
  tip: 'Chia là phép ngược của nhân: 35 ÷ 5 = ? → nghĩ "mấy lần 5 bằng 35?" (7 × 5 = 35). Luyện song song bảng nhân và bảng chia.',
  sprint: true,
  gen: divFactsGen({ 1: [2, 10], 2: [2, 5, 10], 3: [2, 5, 10] })
};

const p2Skip = {
  id: 'p2.mul.skip',
  level: 'P2',
  strand: 'muldiv',
  unit: 3,
  title: 'Count in 2s, 5s and 10s',
  vi: 'Đếm nhảy 2, 5, 10',
  icon: '🦘',
  tip: 'Đếm nhảy (skip counting) là chìa khóa để thuộc bảng nhân. Đếm khi leo cầu thang: 2, 4, 6, 8… hoặc đếm tiền xu 5¢, 10¢.',
  gen(R, tier) {
    const t = R.pick([2, 5, 10]);
    const form = R.pick(tier === 1 ? ['seq', 'which'] : tier === 2 ? ['seq', 'jumps', 'which'] : ['back', 'nth', 'offset']);
    if (form === 'seq' || form === 'back') {
      const down = form === 'back';
      const len = 5;
      const startK = down ? R.int(6, 12) : R.int(tier === 1 ? 0 : 1, tier === 1 ? 3 : 8);
      const seq = Array.from({ length: len }, (_, i) => (down ? (startK - i) * t : (startK + i) * t));
      const idx = R.int(1, len - 1);
      const ans = seq[idx];
      return {
        prompt: down ? `Count back in ${t}s. What is the missing number?` : `Count in ${t}s. What is the missing number?`,
        visuals: [{ type: 'sequence', items: seq.map((v, i) => (i === idx ? '?' : v)) }],
        input: tier === 1 ? 'choice' : 'number',
        answer: ans,
        ...(tier === 1 ? { choices: numChoices(R, ans, { near: [ans + 1, ans - 1, ans + t], min: 0, max: 130, step: 1 }) } : {}),
        hint: `Each number is ${t} ${down ? 'less' : 'more'} than the one before.`,
        explain: `The numbers go ${down ? 'down' : 'up'} by ${t}: ${seq.join(', ')}. The missing number is ${ans}.`
      };
    }
    if (form === 'which') {
      const m = t * R.int(2, 10);
      const offs = t === 2 ? [1, -1, 3] : t === 5 ? [1, -1, 2, 3, -2] : [1, -1, 5, 2, -5];
      const bad = R.sample(offs, 3).map((o) => m + o);
      const opts = R.shuffle([m, ...bad]);
      return {
        prompt: `We count in ${t}s: ${multiples(t, 3)} … Which of these numbers will we say?`,
        input: 'choice',
        answer: m,
        choices: opts.map((v) => ({ value: v, label: String(v) })),
        hint: t === 2 ? 'Counting in 2s gives even numbers.' : t === 5 ? 'Counting in 5s gives numbers ending in 5 or 0.' : 'Counting in 10s gives numbers ending in 0.',
        explain: `${m} = ${m / t} × ${t}, so we say ${m} when we count in ${t}s.`
      };
    }
    if (form === 'jumps') {
      const k = R.int(3, t === 10 ? 9 : 8);
      const P = k * t;
      const step = t === 2 ? 1 : t;
      const every = t === 2 ? 2 : 1;
      return {
        prompt: `Each jump is ${t}. How many jumps are there from 0 to ${P}?`,
        visuals: [{ type: 'numberline', min: 0, max: P, step, every, jumps: Array.from({ length: k }, (_, i) => ({ from: i * t, to: (i + 1) * t })) }],
        input: 'number',
        answer: k,
        hint: 'Count the jumps (the curved arrows).',
        explain: `${multiples(t, k)}. That is ${k} jumps, so ${k} × ${t} = ${P}.`
      };
    }
    if (form === 'nth') {
      const k = R.int(6, 12);
      return {
        prompt: `Count in ${t}s: ${multiples(t, 3)} … What is the **${ordinal(k)}** number?`,
        input: 'number',
        answer: k * t,
        hint: `The 1st number is ${t}, the 2nd is ${2 * t}. The ${ordinal(k)} number is ${k} groups of ${t}.`,
        explain: `The ${ordinal(k)} number is ${k} × ${t} = ${k * t}.`
      };
    }
    // offset pattern (tier 3)
    const start = R.int(1, t === 2 ? 1 : t - 1) + (t === 2 ? R.int(0, 5) * 2 : R.int(0, 3) * t);
    const seq = Array.from({ length: 5 }, (_, i) => start + i * t);
    return {
      prompt: 'What is the next number in the pattern?',
      visuals: [{ type: 'sequence', items: [...seq.slice(0, 4), '?'] }],
      input: 'number',
      answer: seq[4],
      hint: 'Find how much the numbers go up by each time.',
      explain: `The numbers go up by ${t} each time: ${seq.join(', ')}. The next number is ${seq[4]}.`
    };
  }
};

const p2Order = {
  id: 'p2.mul.order',
  level: 'P2',
  strand: 'muldiv',
  unit: 3,
  title: 'Arrays and missing numbers',
  vi: 'Mảng, đổi chỗ thừa số, thừa số còn thiếu',
  icon: '🔄',
  tip: '4 × 3 = 3 × 4 (đổi chỗ vẫn bằng nhau). Xoay một mảng (array) để con thấy rõ. Thừa số còn thiếu "5 × ? = 40": đếm nhảy 5 đến 40 và đếm số bước.',
  gen(R, tier) {
    const t = R.pick([2, 5, 10]);
    const n = R.int(2, 10);
    const P = n * t;
    const form = R.pick(tier === 1 ? ['array', 'swap'] : tier === 2 ? ['array', 'swap', 'missing'] : ['missing', 'same', 'swap', 'array']);
    if (form === 'array') {
      let R2;
      let C2;
      if (t === 10 || R.chance(0.5)) {
        R2 = R.int(2, 5);
        C2 = t;
      } else {
        R2 = t;
        C2 = R.int(2, 8);
      }
      const total = R2 * C2;
      const it = thing(R);
      return {
        prompt: `There are ${R2} rows of ${C2} ${it.many}. ${R2} × ${C2} = ?`,
        visuals: [{ type: 'array', rows: R2, cols: C2, emoji: it.e, boxRows: true }],
        input: 'number',
        answer: total,
        hint: `Count in ${C2}s, one row at a time.`,
        explain: `${R2} rows of ${C2}: ${R2} × ${C2} = ${total}. Also ${C2} × ${R2} = ${total}.`
      };
    }
    if (form === 'swap') {
      return {
        prompt: `${n} × ${t} = ${P}. So ${t} × ${n} = ?`,
        input: 'number',
        answer: P,
        hint: 'Changing the order of the numbers we multiply does not change the answer.',
        explain: `${t} × ${n} = ${n} × ${t} = ${P}.`
      };
    }
    if (form === 'missing') {
      const left = R.chance(0.5);
      return {
        prompt: left ? `? × ${t} = ${P}` : `${t} × ? = ${P}`,
        input: 'number',
        answer: n,
        hint: `Count in ${t}s until you reach ${P}. How many steps?`,
        explain: `${n} × ${t} = ${P}, so the missing number is ${n}.`
      };
    }
    // same (tier 3): which is the same as n × t
    let a = n;
    let b = t;
    if (a === b) a = a === 10 ? 9 : a + 1;
    const val = a * b;
    const right = `${b} × ${a}`;
    const cands = [
      [`${a} + ${b}`, a + b],
      [`${a} × ${a}`, a * a],
      [`${b} × ${b}`, b * b],
      [`${a} + ${a}`, a + a],
      [`${b} + ${b}`, b + b],
      [`${a + 1} × ${b}`, (a + 1) * b],
      [`${a} × ${b + 1}`, a * (b + 1)]
    ].filter(([s, v]) => v !== val && s !== right);
    const pool = R.sample(cands, 3).map(([s]) => s);
    return {
      prompt: `Which is the **same** as ${a} × ${b}?`,
      input: 'choice',
      answer: right,
      choices: textChoices(R, right, pool, 4),
      hint: 'Work out the value of each one, or remember the order rule.',
      explain: `${a} × ${b} = ${val} and ${right} = ${val}. They are the same.`
    };
  }
};

const p2Word2510 = {
  id: 'p2.mul.word2510',
  level: 'P2',
  strand: 'muldiv',
  unit: 3,
  title: 'Stories with 2, 5, 10',
  vi: 'Toán đố nhân, chia với 2, 5, 10',
  icon: '🧩',
  tip: 'Cho con vẽ nhóm hoặc thanh (bar model) với các ô bằng nhau. Đừng chỉ bắt từ khóa: hỏi "Do we know the total?" để chọn nhân hay chia.',
  gen(R, tier) {
    const t = R.pick([2, 5, 10]);
    const n = R.int(2, 10);
    const P = n * t;
    const p = person(R);
    const pk = R.pick(PACKS[t]);
    const kind = R.pick(tier === 3 ? ['twostep', 'twostep', 'money', 'div'] : tier === 2 ? ['mul', 'div', 'money', 'share'] : ['mul', 'div', 'mul']);
    if (kind === 'mul') {
      return {
        prompt: `There are ${t} ${pk.many} in a ${pk.pack}. How many ${pk.many} are there in ${n} ${pk.packs}?`,
        visuals: tier === 1 && P <= 40 ? [groupsVis(pk.e, n, t, 'sm')] : [],
        input: 'number',
        answer: P,
        hint: `${n} ${pk.packs} of ${t}. Count in ${t}s.`,
        explain: `${n} × ${t} = ${P}. There are ${P} ${pk.many}.`
      };
    }
    if (kind === 'div') {
      return {
        prompt: `${p.name} has ${P} ${pk.many}. ${p.He} puts them into ${pk.packs} of ${t}. How many ${pk.packs} can ${p.he} make?`,
        input: 'number',
        answer: n,
        hint: `How many ${t}s make ${P}?`,
        explain: `${P} ÷ ${t} = ${n}. ${p.He} can make ${n} ${pk.packs}.`
      };
    }
    if (kind === 'share') {
      const it = thing(R);
      return {
        prompt: `${P} ${it.many} are shared equally among ${t} children. How many ${it.many} does each child get?`,
        input: 'number',
        answer: n,
        hint: `Share ${P} into ${t} equal groups. Think: ? × ${t} = ${P}.`,
        explain: `${P} ÷ ${t} = ${n}. Each child gets ${plural(n, it)}.`
      };
    }
    if (kind === 'money') {
      const saving = R.pick([2, 5, 10]);
      const weeks = R.int(2, 10);
      const ask = tier === 3 && R.chance(0.5) ? 'weeks' : 'total';
      if (ask === 'weeks') {
        return {
          prompt: `${p.name} saves $${saving} every week. How many weeks does ${p.he} take to save $${saving * weeks}?`,
          input: 'number',
          answer: weeks,
          hint: `How many $${saving}s make $${saving * weeks}?`,
          explain: `$${saving * weeks} ÷ $${saving} = ${weeks}. ${p.He} takes ${weeks} weeks.`
        };
      }
      return {
        prompt: `${p.name} saves $${saving} every week. How much money does ${p.he} save in ${weeks} weeks?`,
        input: 'number',
        unit: { pre: '$' },
        answer: saving * weeks,
        hint: `Count in ${saving}s for ${weeks} weeks.`,
        explain: `${weeks} × $${saving} = $${saving * weeks}.`
      };
    }
    // twostep (tier 3)
    const extra = R.int(1, t === 10 ? 9 : 4);
    const sub = R.chance(0.5);
    const ans = sub ? P - extra : P + extra;
    return {
      prompt: sub
        ? `${p.name} buys ${n} ${pk.packs} of ${pk.many}. There are ${t} in each ${pk.pack}. ${p.He} gives away ${extra}. How many ${pk.many} does ${p.he} have left?`
        : `${p.name} has ${n} ${pk.packs} of ${pk.many} with ${t} in each ${pk.pack}, and ${extra} loose ${nounFor(extra, pk)}. How many ${pk.many} does ${p.he} have?`,
      input: 'number',
      answer: ans,
      hint: `Step 1: ${n} × ${t}. Step 2: ${sub ? 'subtract' : 'add'} ${extra}.`,
      explain: `${n} × ${t} = ${P}. ${P} ${sub ? '−' : '+'} ${extra} = ${ans}.`
    };
  }
};

// ================================================================== P2 unit 4: 3, 4
const p2Facts34 = {
  id: 'p2.mul.table34',
  level: 'P2',
  strand: 'muldiv',
  unit: 4,
  title: 'Times tables 3 and 4',
  vi: 'Bảng nhân 3, 4',
  icon: '⚡',
  tip: 'Mẹo bảng 4: gấp đôi bảng 2 (4 × 7 = gấp đôi 2 × 7 = 14 → 28). Bảng 3: đếm theo nhịp 3, 6, 9, 12… Ôn lại 2 phút mỗi ngày.',
  sprint: true,
  gen: mulFactsGen({ 1: [3, 4], 2: [3, 4], 3: [3, 4] })
};

const p2Div34 = {
  id: 'p2.div.table34',
  level: 'P2',
  strand: 'muldiv',
  unit: 4,
  title: 'Divide by 3 and 4',
  vi: 'Chia cho 3, 4',
  icon: '➗',
  tip: '24 ÷ 4 = ? → "mấy lần 4 bằng 24?". Nếu con quên, cho con đếm nhảy 4, 8, 12, 16, 20, 24 và đếm số bước.',
  sprint: true,
  gen: divFactsGen({ 1: [3, 4], 2: [3, 4], 3: [3, 4] })
};

const p2Word34 = {
  id: 'p2.mul.word34',
  level: 'P2',
  strand: 'muldiv',
  unit: 4,
  title: 'Stories with 3 and 4',
  vi: 'Toán đố nhân chia với 3, 4 (có bài 2 bước)',
  icon: '🚲',
  tip: 'Bài 2 bước: hỏi con "What do we find first?". Viết từng phép tính trên một dòng. Ví dụ: tìm tổng số chân trước, rồi mới cộng/trừ.',
  gen(R, tier) {
    const t = R.pick([3, 4]);
    const n = R.int(2, 10);
    const P = n * t;
    const p = person(R);
    const kind = R.pick(tier === 1 ? ['legs', 'pack', 'share'] : tier === 2 ? ['legs', 'pack', 'share', 'legsback'] : ['mixlegs', 'giveaway', 'groupsleft', 'legsback']);
    if (kind === 'legs') {
      const a = eachHas(R, [t]);
      return {
        prompt: `Each ${a.one} has ${t} ${a.part}. How many ${a.part} do ${n} ${a.many} have?`,
        visuals: tier === 1 && a.e ? [{ type: 'objects', groups: [{ emoji: a.e, count: n }] }] : [],
        input: 'number',
        answer: P,
        hint: `${n} groups of ${t}.`,
        explain: `${n} × ${t} = ${P}. They have ${P} ${a.part}.`
      };
    }
    if (kind === 'legsback') {
      const a = eachHas(R, [t]);
      return {
        prompt: `There are ${P} ${a.part} altogether. Each ${a.one} has ${t} ${a.part}. How many ${a.many} are there?`,
        input: 'number',
        answer: n,
        hint: `How many ${t}s make ${P}?`,
        explain: `${P} ÷ ${t} = ${n}. There are ${n} ${a.many}.`
      };
    }
    if (kind === 'pack') {
      const pk = R.pick(PACKS[t]);
      return {
        prompt: `A ${pk.pack} has ${t} ${pk.many}. ${p.name} buys ${n} ${pk.packs}. How many ${pk.many} does ${p.he} buy?`,
        visuals: tier === 1 && P <= 40 ? [groupsVis(pk.e, n, t, 'sm')] : [],
        input: 'number',
        answer: P,
        hint: `Count in ${t}s ${n} times.`,
        explain: `${n} × ${t} = ${P}.`
      };
    }
    if (kind === 'share') {
      const it = thing(R);
      return {
        prompt: `${p.name} shares ${P} ${it.many} equally among ${t} friends. How many ${it.many} does each friend get?`,
        input: 'number',
        answer: n,
        hint: `Think: ? × ${t} = ${P}.`,
        explain: `${P} ÷ ${t} = ${n}. Each friend gets ${plural(n, it)}.`
      };
    }
    if (kind === 'mixlegs') {
      const [aOne, bOne] = R.pick([['car', 'tricycle'], ['chair', 'stool'], ['square', 'triangle']]);
      const a = EACH_HAS.find((x) => x.one === aOne);
      const b = EACH_HAS.find((x) => x.one === bOne);
      const na = R.int(2, 8);
      const nb = R.int(2, 8);
      return {
        prompt: `There are ${na} ${a.many} and ${nb} ${b.many}. Each ${a.one} has 4 ${a.part} and each ${b.one} has 3 ${b.part}. How many ${a.part} are there **altogether**?`,
        input: 'number',
        answer: na * 4 + nb * 3,
        hint: `Step 1: ${na} × 4. Step 2: ${nb} × 3. Step 3: add.`,
        explain: `${na} × 4 = ${na * 4}. ${nb} × 3 = ${nb * 3}. ${na * 4} + ${nb * 3} = ${na * 4 + nb * 3}.`
      };
    }
    if (kind === 'giveaway') {
      const it = thing(R);
      const k = R.int(2, 8);
      const have = k * t + R.int(1, 20);
      return {
        prompt: `${p.name} has ${plural(have, it)}. ${p.He} gives ${t} ${it.many} to each of ${k} friends. How many ${it.many} does ${p.he} have left?`,
        input: 'number',
        answer: have - k * t,
        hint: `Step 1: how many does ${p.he} give away? (${k} × ${t}). Step 2: subtract.`,
        explain: `${k} × ${t} = ${k * t}. ${have} − ${k * t} = ${have - k * t}.`
      };
    }
    // groupsleft
    const total = P;
    const go = R.int(1, n - 1);
    return {
      prompt: `${total} children form groups of ${t}. ${go} ${go === 1 ? 'group goes' : 'groups go'} to the library. How many children are **not** in the library?`,
      input: 'number',
      answer: total - go * t,
      hint: `Find the number of children in ${go} ${go === 1 ? 'group' : 'groups'} first.`,
      explain: `${go} × ${t} = ${go * t} children went to the library. ${total} − ${go * t} = ${total - go * t}.`
    };
  }
};

const p2Units = {
  id: 'p2.mul.units',
  level: 'P2',
  strand: 'muldiv',
  unit: 4,
  title: 'Equal units (bar model)',
  vi: 'Mô hình thanh: các phần bằng nhau',
  icon: '📊',
  tip: 'Trong bar model, các ô (units) bằng nhau. Biết 1 unit → nhân để tìm tổng; biết tổng → chia để tìm 1 unit. Cho con tự vẽ thanh, chia ô và đánh dấu "?".',
  gen(R, tier) {
    const u = R.pick([2, 3, 4, 5, 10]);
    const k = R.int(2, tier === 1 ? 5 : 8);
    const T = u * k;
    const form = R.pick(tier === 1 ? ['total', 'one'] : tier === 2 ? ['total', 'one', 'story'] : ['some', 'story', 'one']);
    const p = person(R);
    if (form === 'total') {
      return {
        prompt: `Each unit stands for ${u}. What is the **total** of ${k} units?`,
        visuals: [{ type: 'bar', rows: [unitsRow('', k, u, String(u))], total: { text: '?' } }],
        input: 'number',
        answer: T,
        hint: `${k} units of ${u}: count in ${u}s.`,
        explain: `${k} × ${u} = ${T}. The total is ${T}.`
      };
    }
    if (form === 'one') {
      return {
        prompt: `The total is ${T}. There are ${k} equal units. What is the value of **1 unit**?`,
        visuals: [{ type: 'bar', rows: [unitsRow('', k, u, ['?', ...Array(k - 1).fill('')])], total: { text: String(T) } }],
        input: 'number',
        answer: u,
        hint: `Share ${T} equally into ${k} units.`,
        explain: `${T} ÷ ${k} = ${u}. 1 unit is ${u}.`
      };
    }
    if (form === 'story') {
      const pk = thing(R);
      const box = holder(R, pk);
      const askTotal = R.chance(0.5);
      return askTotal
        ? {
            prompt: `${p.name} has ${k} ${box.many}. There are ${u} ${pk.many} ${inOn(box)} each ${box.one}. How many ${pk.many} does ${p.he} have?`,
            visuals: [{ type: 'bar', rows: [unitsRow(p.name, k, u, String(u), 'orange')], total: { text: '?' } }],
            input: 'number',
            answer: T,
            hint: 'Each unit is one box. Add up all the units.',
            explain: `${k} × ${u} = ${T}. ${p.He} has ${T} ${pk.many}.`
          }
        : {
            prompt: `${p.name} packs ${T} ${pk.many} equally ${intoOnto(box)} ${k} ${box.many}. How many ${pk.many} are ${inOn(box)} each ${box.one}?`,
            visuals: [{ type: 'bar', rows: [unitsRow(p.name, k, u, ['?', ...Array(k - 1).fill('')], 'orange')], total: { text: String(T) } }],
            input: 'number',
            answer: u,
            hint: `The whole bar is ${T}. It has ${k} equal units.`,
            explain: `${T} ÷ ${k} = ${u}. There are ${u} ${pk.many} ${inOn(box)} each ${box.one}.`
          };
    }
    // some (tier 3): k units = T, find m units
    const m = R.intExcept(2, k + 3, [k]);
    return {
      prompt: `${k} equal units make ${T}. What is the value of **${m} units**?`,
      visuals: [{ type: 'bar', rows: [unitsRow('', k, u, '')], total: { text: String(T) } }],
      input: 'number',
      answer: u * m,
      hint: 'Find the value of 1 unit first.',
      explain: `1 unit = ${T} ÷ ${k} = ${u}. ${m} units = ${m} × ${u} = ${u * m}.`
    };
  }
};

// ================================================================== P3 unit 3: 6, 7, 8, 9
const p3Facts6789 = {
  id: 'p3.mul.table6789',
  level: 'P3',
  strand: 'muldiv',
  unit: 3,
  title: 'Times tables 6 to 9',
  vi: 'Bảng nhân 6, 7, 8, 9',
  icon: '⚡',
  tip: 'Mẹo bảng 9: 9 × 7 = 70 − 7 = 63 (tổng hai chữ số luôn bằng 9). Bảng 6 và 8 dùng gấp đôi: 6 × 7 = gấp đôi 3 × 7. Luyện Speed Sprint vài phút mỗi ngày.',
  sprint: true,
  gen: mulFactsGen({ 1: [6, 7, 8, 9], 2: [6, 7, 8, 9], 3: [6, 7, 8, 9] })
};

const p3Div6789 = {
  id: 'p3.div.table6789',
  level: 'P3',
  strand: 'muldiv',
  unit: 3,
  title: 'Divide by 6 to 9',
  vi: 'Chia cho 6, 7, 8, 9',
  icon: '➗',
  tip: 'Khi chia, nghĩ ngược lại phép nhân: 56 ÷ 8 = ? ↔ ? × 8 = 56. Thuộc bảng nhân 6–9 là chia nhanh.',
  sprint: true,
  gen: divFactsGen({ 1: [6, 7, 8, 9], 2: [6, 7, 8, 9], 3: [6, 7, 8, 9] })
};

const p3Related = {
  id: 'p3.mul.related',
  level: 'P3',
  strand: 'muldiv',
  unit: 3,
  title: 'Related facts and tricks',
  vi: 'Họ phép tính & mẹo nhân nhanh',
  icon: '🔗',
  tip: '7 × 8 = 56 nên 8 × 7 = 56, 56 ÷ 7 = 8, 56 ÷ 8 = 7 (fact family). Dùng phép đã biết để suy ra phép mới: 9 × 6 = 10 × 6 − 6.',
  gen(R, tier) {
    const a = R.int(6, 9);
    const b = R.int(2, 10);
    const P = a * b;
    const form = R.pick(tier === 1 ? ['swap', 'div'] : tier === 2 ? ['div', 'family', 'swap'] : ['nine', 'double', 'plusone', 'family']);
    if (form === 'swap') {
      return {
        prompt: `${a} × ${b} = ${P}. What is ${b} × ${a}?`,
        input: 'number',
        answer: P,
        hint: 'Does the order of multiplying change the answer?',
        explain: `${b} × ${a} = ${a} × ${b} = ${P}.`
      };
    }
    if (form === 'div') {
      const byA = R.chance(0.5);
      return {
        prompt: `${a} × ${b} = ${P}. What is ${P} ÷ ${byA ? a : b}?`,
        input: 'number',
        answer: byA ? b : a,
        hint: 'Division undoes multiplication. Use the fact you are given.',
        explain: `${a} × ${b} = ${P}, so ${P} ÷ ${byA ? a : b} = ${byA ? b : a}.`
      };
    }
    if (form === 'family') {
      let x = a;
      let y = b;
      if (x === y) y = y === 10 ? 9 : y + 1;
      const Q = x * y;
      const right = `${Q} ÷ ${y} = ${x}`;
      const wrong = [`${Q} ÷ ${x} = ${x}`, `${x} ÷ ${y} = ${Q}`, `${Q} − ${x} = ${y}`, `${Q} ÷ ${y} = ${x + 1}`].filter((s) => s !== right);
      return {
        prompt: `Which division fact is related to ${x} × ${y} = ${Q}?`,
        input: 'choice',
        answer: right,
        choices: textChoices(R, right, wrong, 4),
        hint: 'The three numbers stay the same in a fact family. The biggest number is divided.',
        explain: `${x} × ${y} = ${Q}, so ${Q} ÷ ${y} = ${x} and ${Q} ÷ ${x} = ${y}.`
      };
    }
    if (form === 'nine') {
      const n = R.int(3, 10);
      return {
        prompt: `9 × ${n} = 10 × ${n} − ?`,
        input: 'number',
        answer: n,
        hint: `9 groups of ${n} is one group less than 10 groups of ${n}.`,
        explain: `10 × ${n} = ${10 * n}. Take away one ${n}: ${10 * n} − ${n} = ${9 * n}. The missing number is ${n}.`
      };
    }
    if (form === 'double') {
      const half = R.pick([3, 4]);
      const n = R.int(3, 10);
      return {
        prompt: `${half} × ${n} = ${half * n}. Use this to find ${half * 2} × ${n}.`,
        input: 'number',
        answer: half * 2 * n,
        hint: `${half * 2} is double ${half}, so the answer is double ${half * n}.`,
        explain: `${half * 2} × ${n} = double ${half} × ${n} = ${half * n} + ${half * n} = ${half * 2 * n}.`
      };
    }
    // plusone: a × (b+1) = a × b + a
    const n = R.int(4, 9);
    return {
      prompt: `${a} × ${n} = ${a * n}. What is ${a} × ${n + 1}?`,
      input: 'number',
      answer: a * (n + 1),
      hint: `${a} × ${n + 1} is one more group of ${a}.`,
      explain: `${a} × ${n + 1} = ${a * n} + ${a} = ${a * (n + 1)}.`
    };
  }
};

// ================================================================== P3 unit 4: algorithms & problems
const p3MulVertical = {
  id: 'p3.mul.vertical',
  level: 'P3',
  strand: 'muldiv',
  unit: 4,
  title: 'Multiply big numbers',
  vi: 'Nhân số có 2–3 chữ số với số có 1 chữ số',
  icon: '✖️',
  tip: 'Đặt tính theo cột: nhân hàng đơn vị trước, nhớ (regroup) sang hàng chục. Khuyến khích ước lượng trước: 48 × 3 khoảng 50 × 3 = 150 để tự kiểm tra.',
  gen(R, tier) {
    let a;
    let m;
    if (tier === 1) {
      m = R.int(2, 4);
      const tens = R.int(1, Math.floor(9 / m));
      const ones = R.int(0, Math.floor(9 / m));
      a = tens * 10 + ones;
      if (a < 11) a = 11;
    } else if (tier === 2) {
      m = R.int(2, 9);
      const tens = R.int(1, 9);
      const ones = R.int(Math.ceil(10 / m), 9);
      a = tens * 10 + ones;
    } else {
      m = R.int(2, 9);
      a = R.int(101, 999);
    }
    const P = a * m;
    const form = tier === 3 ? R.pick(['vertical', 'horizontal', 'digit']) : R.pick(['vertical', 'horizontal', 'vertical']);
    if (form === 'digit') {
      const s = String(a);
      const pos = R.int(0, s.length - 1);
      const digit = Number(s[pos]);
      const shown = s.slice(0, pos) + '?' + s.slice(pos + 1);
      return {
        prompt: 'Find the missing digit.',
        visuals: [{ type: 'equation', rows: [shown, String(m)], op: '×', result: String(P) }],
        input: 'number',
        answer: digit,
        hint: `Divide ${P} by ${m} to find the first number, or try digits one by one.`,
        explain: `${P} ÷ ${m} = ${a}, so the missing digit is ${digit}. Check: ${a} × ${m} = ${P}.`
      };
    }
    const tens = Math.floor(a / 10) * 10;
    const ones = a % 10;
    return {
      prompt: form === 'vertical' ? `Multiply: ${a} × ${m} = ?` : `${a} × ${m} = ?`,
      visuals: form === 'vertical' ? [{ type: 'equation', rows: [String(a), String(m)], op: '×', result: '?' }] : [],
      input: 'number',
      answer: P,
      hint: `Multiply the ones first: ${ones} × ${m}. Then the tens${a >= 100 ? ' and hundreds' : ''}. Remember to regroup.`,
      explain:
        a < 100
          ? `${a} × ${m} = ${tens} × ${m} + ${ones} × ${m} = ${tens * m} + ${ones * m} = ${P}.`
          : `${a} × ${m} = ${P}. (${Math.floor(a / 100) * 100} × ${m} = ${Math.floor(a / 100) * 100 * m}, ${a % 100} × ${m} = ${(a % 100) * m}, total ${P}.)`
    };
  }
};

const p3DivLong = {
  id: 'p3.div.long',
  level: 'P3',
  strand: 'muldiv',
  unit: 4,
  title: 'Divide big numbers',
  vi: 'Chia số có 2–3 chữ số cho số có 1 chữ số',
  icon: '➗',
  tip: 'Chia từ hàng cao nhất: 84 ÷ 4 → 8 chục ÷ 4 = 2 chục; 4 đơn vị ÷ 4 = 1 → 21. Luôn kiểm tra lại bằng phép nhân: 21 × 4 = 84.',
  gen(R, tier) {
    let d;
    let q;
    if (tier === 1) {
      d = R.int(2, 4);
      const qt = R.int(1, Math.floor(9 / d));
      const qo = R.int(1, Math.floor(9 / d));
      q = qt * 10 + qo;
    } else if (tier === 2) {
      d = R.int(2, 9);
      q = R.int(11, Math.max(11, Math.floor(99 / d)));
    } else {
      d = R.int(2, 9);
      q = R.int(Math.max(12, Math.ceil(100 / d)), Math.floor(999 / d));
    }
    const T = q * d;
    const form = R.pick(tier === 1 ? ['plain', 'check'] : tier === 2 ? ['plain', 'word', 'check'] : ['plain', 'word', 'word']);
    if (form === 'check') {
      return {
        prompt: `${q} × ${d} = ${T}. So ${T} ÷ ${d} = ?`,
        input: 'number',
        answer: q,
        hint: 'Division undoes multiplication.',
        explain: `${T} ÷ ${d} = ${q}, because ${q} × ${d} = ${T}.`
      };
    }
    if (form === 'word') {
      const p = person(R);
      const ctx = R.pick([
        { s: `${T} stickers are shared equally among ${d} children. How many stickers does each child get?` },
        { s: `${p.name} packs ${T} eggs equally into ${d} trays. How many eggs are on each tray?` },
        { s: `A ribbon ${T} cm long is cut into ${d} equal pieces. How long is each piece?`, unit: { post: 'cm' } },
        { s: `${d} friends share $${T} equally. How much money does each friend get?`, unit: { pre: '$' } }
      ]);
      return {
        prompt: ctx.s,
        input: 'number',
        answer: q,
        ...(ctx.unit ? { unit: ctx.unit } : {}),
        hint: `Share ${T} into ${d} equal parts: ${T} ÷ ${d}.`,
        explain: `${T} ÷ ${d} = ${q}. Check: ${q} × ${d} = ${T}.`
      };
    }
    return {
      prompt: `${T} ÷ ${d} = ?`,
      input: 'number',
      answer: q,
      hint: `Start with the biggest place value. How many ${d}s are in ${String(T)[0]}${T >= 100 ? ' hundreds' : ' tens'}?`,
      explain: `${T} ÷ ${d} = ${q}. Check: ${q} × ${d} = ${T}.`
    };
  }
};

const p3Remainder = {
  id: 'p3.div.remainder',
  level: 'P3',
  strand: 'muldiv',
  unit: 4,
  title: 'Division with remainder',
  vi: 'Phép chia có dư',
  icon: '🍰',
  tip: 'Số dư (remainder) luôn nhỏ hơn số chia. Bài toán thực tế: "cần ít nhất bao nhiêu xe" thì phải làm tròn LÊN; "được bao nhiêu hộp đầy" thì bỏ phần dư.',
  gen(R, tier) {
    const d = tier === 1 ? R.int(2, 5) : R.int(3, 9);
    const q = tier === 1 ? R.int(2, 9) : tier === 2 ? R.int(4, 15) : R.int(12, 99);
    const r = R.int(1, d - 1);
    const T = q * d + r;
    const form = R.pick(tier === 1 ? ['rem', 'quot', 'remblank'] : tier === 2 ? ['rem', 'quot', 'full', 'left'] : ['full', 'left', 'needed', 'needed', 'quot']);
    const why = `${T} ÷ ${d} = ${q} R ${r}, because ${q} × ${d} = ${q * d} and ${T} − ${q * d} = ${r}.`;
    if (form === 'rem') {
      return {
        prompt: `What is the **remainder** when ${T} is divided by ${d}?`,
        input: 'number',
        answer: r,
        hint: `Find the biggest multiple of ${d} that is not more than ${T}.`,
        explain: why
      };
    }
    if (form === 'quot') {
      return {
        prompt: `${T} ÷ ${d} = ? R ${r}`,
        speak: `${T} divided by ${d} equals what number, remainder ${r}?`,
        input: 'number',
        answer: q,
        hint: `How many whole groups of ${d} fit into ${T}?`,
        explain: why
      };
    }
    if (form === 'remblank') {
      return {
        prompt: `${T} ÷ ${d} = ${q} R ?`,
        speak: `${T} divided by ${d} equals ${q}, remainder what number?`,
        input: 'number',
        answer: r,
        hint: `${q} × ${d} = ${q * d}. How many are left from ${T}?`,
        explain: why
      };
    }
    const it = thing(R);
    const box = holder(R, it, false);
    if (form === 'full') {
      return {
        prompt: `${T} ${it.many} are packed into ${box.many} of ${d}. How many ${box.many} are **full**?`,
        input: 'number',
        answer: q,
        hint: `${T} ÷ ${d}. The leftover ${it.many} cannot fill a ${box.one}.`,
        explain: `${why} So ${q} ${box.many} are full.`
      };
    }
    if (form === 'left') {
      return {
        prompt: `${T} ${it.many} are packed into ${box.many} of ${d}. How many ${it.many} are **left over**?`,
        input: 'number',
        answer: r,
        hint: `Fill as many ${box.many} as you can. What is left?`,
        explain: `${why} ${r} ${nounFor(r, it)} ${r === 1 ? 'is' : 'are'} left over.`
      };
    }
    // needed: round up
    return {
      prompt: `${T} children are going on a trip. Each van can carry ${d} children. What is the **least** number of vans needed?`,
      input: 'number',
      answer: q + 1,
      hint: `${T} ÷ ${d} leaves some children. They still need a van!`,
      explain: `${why} ${q} vans carry ${q * d} children. The other ${r} need 1 more van, so ${q + 1} vans are needed.`
    };
  }
};

const p3TimesAsMany = {
  id: 'p3.mul.timesasmany',
  level: 'P3',
  strand: 'muldiv',
  unit: 4,
  title: '"Times as many" models',
  vi: 'Mô hình "gấp … lần" (phương pháp đơn vị)',
  icon: '📏',
  tip: '"Ben has 3 times as many as Ali": thanh của Ali là 1 unit, của Ben là 3 units. Luôn tìm 1 unit trước (unitary method) — kỹ năng then chốt cho các bài toán PSLE.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    const it = thing(R);
    const k = R.int(2, tier === 1 ? 4 : 5);
    const u = R.int(tier === 1 ? 2 : 3, tier === 3 ? 25 : 12);
    const big = k * u;
    const form = R.pick(tier === 1 ? ['big', 'big', 'small'] : tier === 2 ? ['big', 'total', 'diff', 'small'] : ['fromTotal', 'fromDiff', 'total', 'diff']);
    const rows = (bigText, smallText, unitText = '') => [
      unitsRow(q.name, k, u, [bigText ?? unitText, ...Array(k - 1).fill(unitText)], 'orange'),
      { label: p.name, segs: [{ v: u, text: smallText, color: 'blue' }] }
    ];
    if (form === 'big') {
      return {
        prompt: `${p.name} has ${plural(u, it)}. ${q.name} has ${timesWord(k)} as many ${it.many} as ${p.name}. How many ${it.many} does ${q.name} have?`,
        visuals: [{ type: 'bar', rows: rows('', String(u)), total: { text: '?', row: 0 } }],
        input: 'number',
        answer: big,
        hint: `${p.name}'s bar is 1 unit. ${q.name}'s bar is ${k} units.`,
        explain: `1 unit = ${u}. ${k} units = ${k} × ${u} = ${big}. ${q.name} has ${big} ${it.many}.`
      };
    }
    if (form === 'small') {
      return {
        prompt: `${q.name} has ${plural(big, it)}. ${q.name} has ${timesWord(k)} as many ${it.many} as ${p.name}. How many ${it.many} does ${p.name} have?`,
        visuals: [{ type: 'bar', rows: rows('', '?'), total: { text: String(big), row: 0 } }],
        input: 'number',
        answer: u,
        hint: `${q.name}'s ${big} is ${k} units. Find 1 unit.`,
        explain: `${k} units = ${big}. 1 unit = ${big} ÷ ${k} = ${u}. ${p.name} has ${u} ${it.many}.`
      };
    }
    if (form === 'total') {
      return {
        prompt: `${p.name} has ${plural(u, it)}. ${q.name} has ${timesWord(k)} as many as ${p.name}. How many ${it.many} do they have **altogether**?`,
        visuals: [{ type: 'bar', rows: rows('', String(u)), sum: { text: '?' } }],
        input: 'number',
        answer: big + u,
        hint: `Count all the units: ${k} + 1 = ${k + 1} units.`,
        explain: `${k + 1} units = ${k + 1} × ${u} = ${big + u}. They have ${big + u} ${it.many} altogether.`
      };
    }
    if (form === 'diff') {
      return {
        prompt: `${p.name} has ${plural(u, it)}. ${q.name} has ${timesWord(k)} as many as ${p.name}. How many **more** ${it.many} does ${q.name} have than ${p.name}?`,
        visuals: [{ type: 'bar', rows: rows('', String(u)), diff: { text: '?', short: 1, long: 0 } }],
        input: 'number',
        answer: big - u,
        hint: `The difference is ${k} − 1 = ${k - 1} units.`,
        explain: `${k - 1} units = ${k - 1} × ${u} = ${big - u}. ${q.name} has ${big - u} more.`
      };
    }
    if (form === 'fromTotal') {
      const T = big + u;
      const askBig = R.chance(0.4);
      return {
        prompt: `${q.name} has ${timesWord(k)} as many ${it.many} as ${p.name}. They have ${T} ${it.many} altogether. How many ${it.many} does ${askBig ? q.name : p.name} have?`,
        visuals: [{ type: 'bar', rows: rows('', ''), sum: { text: String(T) } }],
        input: 'number',
        answer: askBig ? big : u,
        hint: `There are ${k + 1} equal units in all. Find 1 unit first.`,
        explain: `${k + 1} units = ${T}. 1 unit = ${T} ÷ ${k + 1} = ${u}.${askBig ? ` ${q.name} has ${k} units = ${big}.` : ` ${p.name} has ${u}.`}`
      };
    }
    // fromDiff
    const D = big - u;
    const askBig = R.chance(0.5);
    return {
      prompt: `${q.name} has ${timesWord(k)} as many ${it.many} as ${p.name}. ${q.name} has ${D} more ${it.many} than ${p.name}. How many ${it.many} does ${askBig ? q.name : p.name} have?`,
      visuals: [{ type: 'bar', rows: rows('', ''), diff: { text: String(D), short: 1, long: 0 } }],
      input: 'number',
      answer: askBig ? big : u,
      hint: `The difference is ${k - 1} units. Find 1 unit first.`,
      explain: `${k - 1} units = ${D}. 1 unit = ${D} ÷ ${k - 1} = ${u}.${askBig ? ` ${q.name} has ${k} × ${u} = ${big}.` : ` ${p.name} has ${u}.`}`
    };
  }
};

const p3MultiStep = {
  id: 'p3.muldiv.word',
  level: 'P3',
  strand: 'muldiv',
  unit: 4,
  title: 'Multi-step word problems',
  vi: 'Toán đố nhiều bước (4 phép tính)',
  icon: '🧠',
  tip: 'Đọc từng câu, gạch chân số liệu, vẽ mô hình. Hỏi "What do we find first?". Viết từng bước một phép tính, ghi rõ đơn vị.',
  gen(R, tier) {
    const p = person(R);
    if (tier === 1) {
      const form = R.pick(['mul', 'div']);
      const d = R.int(3, 9);
      const n = R.int(12, 40);
      if (form === 'mul') {
        const it = thing(R);
        return {
          prompt: `A box holds ${d} ${it.many}. How many ${it.many} are there in ${n} boxes?`,
          input: 'number',
          answer: n * d,
          hint: `${n} groups of ${d}.`,
          explain: `${n} × ${d} = ${n * d}.`
        };
      }
      return {
        prompt: `${n * d} children are put into ${d} equal teams. How many children are in each team?`,
        input: 'number',
        answer: n,
        hint: `Share ${n * d} into ${d} equal teams.`,
        explain: `${n * d} ÷ ${d} = ${n}.`
      };
    }
    const form = R.pick(tier === 2 ? ['sell', 'share', 'change', 'chairs'] : ['sell', 'share', 'change', 'bags', 'chairs']);
    if (form === 'sell') {
      const d = R.int(4, 9);
      const boxes = R.int(10, tier === 2 ? 20 : 60);
      const T = boxes * d + R.int(0, d - 1);
      const s = R.int(2, boxes - 2);
      return {
        prompt: `A box holds ${d} cupcakes. Mum bakes ${T} cupcakes. She sells ${s} boxes of cupcakes. How many cupcakes are left?`,
        input: 'number',
        answer: T - s * d,
        hint: `Step 1: how many cupcakes are in ${s} boxes? Step 2: subtract from ${T}.`,
        explain: `${s} × ${d} = ${s * d}. ${T} − ${s * d} = ${T - s * d}.`
      };
    }
    if (form === 'share') {
      const friends = R.int(2, 6);
      const each = R.int(3, tier === 2 ? 12 : 25);
      const total = friends * each;
      const divs = [];
      for (let k = 2; k <= 9; k++) if (total % k === 0 && total / k >= 3 && k !== friends) divs.push(k);
      const packets = divs.length ? R.pick(divs) : friends;
      const per = total / packets;
      return {
        prompt: `${p.name} buys ${packets} packets of sweets with ${per} sweets in each packet. ${p.He} shares all the sweets equally among ${friends} friends. How many sweets does each friend get?`,
        input: 'number',
        answer: each,
        hint: 'Step 1: find the total number of sweets. Step 2: share them equally.',
        explain: `${packets} × ${per} = ${total} sweets. ${total} ÷ ${friends} = ${each}. Each friend gets ${each} sweets.`
      };
    }
    if (form === 'change') {
      const price = R.int(2, 9);
      const n = R.int(2, 9);
      const cost = price * n;
      const note = [10, 50, 100].find((v) => v > cost) || 100;
      return {
        prompt: `Each ticket costs $${price}. ${p.name} buys ${n} tickets. ${p.He} pays with a $${note} note. How much change does ${p.he} get?`,
        input: 'number',
        unit: { pre: '$' },
        answer: note - cost,
        hint: 'Step 1: find the cost of all the tickets. Step 2: subtract from what was paid.',
        explain: `${n} × $${price} = $${cost}. $${note} − $${cost} = $${note - cost}.`
      };
    }
    if (form === 'chairs') {
      const r = R.int(5, 12);
      const c = R.int(6, 12);
      const x = R.int(5, r * c - 10);
      return {
        prompt: `In a hall, there are ${r} rows of chairs with ${c} chairs in each row. ${x} chairs are taken away. How many chairs are left?`,
        input: 'number',
        answer: r * c - x,
        hint: `Step 1: ${r} × ${c}. Step 2: take away ${x}.`,
        explain: `${r} × ${c} = ${r * c}. ${r * c} − ${x} = ${r * c - x}.`
      };
    }
    // bags (tier 3): T packed equally into k bags, buy m bags
    const k = R.int(3, 9);
    const per = R.int(6, 15);
    const T = k * per;
    const m = R.int(2, k - 1);
    return {
      prompt: `${T} oranges are packed equally into ${k} bags. ${p.name} buys ${m} bags. How many oranges does ${p.he} buy?`,
      input: 'number',
      answer: per * m,
      hint: 'Step 1: find how many oranges are in 1 bag.',
      explain: `${T} ÷ ${k} = ${per} in each bag. ${m} × ${per} = ${per * m}.`
    };
  }
};

export const SKILLS = [
  // P1 unit 13
  p1Groups,
  p1Repeated,
  p1Arrays,
  p1MulWord,
  // P1 unit 14
  p1Share,
  p1Group,
  p1DivWord,
  // P2 unit 3
  p2Facts2510,
  p2Div2510,
  p2Skip,
  p2Order,
  p2Word2510,
  // P2 unit 4
  p2Facts34,
  p2Div34,
  p2Word34,
  p2Units,
  // P3 unit 3
  p3Facts6789,
  p3Div6789,
  p3Related,
  // P3 unit 4
  p3MulVertical,
  p3DivLong,
  p3Remainder,
  p3TimesAsMany,
  p3MultiStep
];
