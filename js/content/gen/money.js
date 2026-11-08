// Money (Singapore coins and notes) — P1 unit 16, P2 unit 9, P3 unit 5.
// P1: counting coins up to $1 and notes up to $100 (cents only or dollars only).
// P2: $ and ¢ notation, converting, adding / subtracting money in dollars only or cents only.
// P3: adding / subtracting money in decimal notation, multi-step shopping problems.
import { person, people, numChoices, textChoices, visualChoices, fixedChoices, money, cents, moneySpeech, cap } from '../helpers.js';

const C = cents; // 45 -> "45¢"
const D = (d) => `$${d}`; // 12 -> "$12"
const art = (w) => `${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;
const coinVis = (list) => ({ type: 'money', items: list.map((c) => ({ c })) });
// dollar amounts: 1 is the $1 coin, the rest are notes
const noteVis = (list) => ({ type: 'money', items: list.map((v) => (v === 1 ? { c: 100 } : { n: v })) });
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const dw = (d) => `${d} dollar${d === 1 ? '' : 's'}`;
const cw = (c) => `${c} cent${c === 1 ? '' : 's'}`;

function runTotal(list, fmt) {
  let s = 0;
  return list.map((v) => fmt((s += v))).join(' → ');
}

/** Random handful of coins/notes from `kinds` with total ≤ maxTotal (sorted, largest first). */
function randomSet(R, kinds, maxTotal, minCount, maxCount) {
  for (let t = 0; t < 80; t++) {
    const k = R.int(minCount, maxCount);
    const list = Array.from({ length: k }, () => R.pick(kinds));
    const total = sum(list);
    if (total <= maxTotal && new Set(list).size >= Math.min(2, kinds.length)) return { list: list.sort((a, b) => b - a), total };
  }
  const list = [...kinds].sort((a, b) => b - a).slice(0, 2);
  return { list, total: sum(list) };
}

/** Coins/notes from `kinds` that add up exactly to target. */
function makeSet(R, target, kinds, maxLen = 6) {
  for (let t = 0; t < 60; t++) {
    const out = [];
    let rem = target;
    while (rem > 0 && out.length < maxLen) {
      const opts = kinds.filter((c) => c <= rem);
      if (!opts.length) break;
      const c = R.pick(opts);
      out.push(c);
      rem -= c;
    }
    if (rem === 0) return out.sort((a, b) => b - a);
  }
  const out = [];
  let rem = target;
  for (const c of [...kinds].sort((a, b) => b - a)) {
    while (rem >= c) {
      out.push(c);
      rem -= c;
    }
  }
  return out;
}

/** "Which set makes X?" picture choices: the right set + sets that are one coin/note off. */
function setChoices(R, target, kinds, visFn, count = 3) {
  const list = [{ value: target, visual: visFn(makeSet(R, target, kinds)) }];
  const totals = new Set([target]);
  let guard = 0;
  while (list.length < count && guard++ < 60) {
    const d = R.pick(kinds.filter((k) => k < target)) * (R.chance(0.5) ? 1 : -1);
    const t2 = target + d;
    if (t2 <= 0 || totals.has(t2)) continue;
    totals.add(t2);
    list.push({ value: t2, visual: visFn(makeSet(R, t2, kinds)) });
  }
  return visualChoices(R, list);
}

const CENT_SHOP = [
  { e: '🍎', one: 'apple', many: 'apples' },
  { e: '🍌', one: 'banana', many: 'bananas' },
  { e: '🧃', one: 'packet drink', many: 'packet drinks' },
  { e: '🍞', one: 'bun', many: 'buns' },
  { e: '✏️', one: 'pencil', many: 'pencils' },
  { e: '🧽', one: 'eraser', many: 'erasers' },
  { e: '🍪', one: 'cookie', many: 'cookies' },
  { e: '🍭', one: 'lollipop', many: 'lollipops' },
  { e: '🥚', one: 'egg', many: 'eggs' },
  { e: '📏', one: 'ruler', many: 'rulers' },
  { e: '🍬', one: 'sweet', many: 'sweets' },
  { e: '🍐', one: 'pear', many: 'pears' }
];
const DOLLAR_SHOP = [
  { e: '🧸', one: 'teddy bear', many: 'teddy bears' },
  { e: '⚽', one: 'ball', many: 'balls' },
  { e: '🪁', one: 'kite', many: 'kites' },
  { e: '📘', one: 'storybook', many: 'storybooks' },
  { e: '🧩', one: 'jigsaw puzzle', many: 'jigsaw puzzles' },
  { e: '🚗', one: 'toy car', many: 'toy cars' },
  { e: '🎒', one: 'school bag', many: 'school bags' },
  { e: '👟', one: 'pair of shoes', many: 'pairs of shoes' },
  { e: '🎨', one: 'paint set', many: 'paint sets' },
  { e: '🤖', one: 'robot', many: 'robots' },
  { e: '⌚', one: 'watch', many: 'watches' },
  { e: '🛴', one: 'scooter', many: 'scooters' },
  { e: '🏸', one: 'badminton racket', many: 'badminton rackets' },
  { e: '☂️', one: 'umbrella', many: 'umbrellas' }
];
const DECIMAL_SHOP = [
  { e: '🖊️', one: 'pen', many: 'pens' },
  { e: '📁', one: 'file', many: 'files' },
  { e: '📒', one: 'notebook', many: 'notebooks' },
  { e: '🥪', one: 'sandwich', many: 'sandwiches' },
  { e: '🧃', one: 'box of juice', many: 'boxes of juice' },
  { e: '🍦', one: 'ice cream', many: 'ice creams' },
  { e: '🖍️', one: 'box of crayons', many: 'boxes of crayons' },
  { e: '🧁', one: 'cupcake', many: 'cupcakes' },
  { e: '🍙', one: 'rice ball', many: 'rice balls' },
  { e: '🥤', one: 'cup of bubble tea', many: 'cups of bubble tea' }
];

// ================================================================== P1 unit 16
const p1Coins = {
  id: 'p1.money.coins',
  level: 'P1',
  strand: 'money',
  unit: 16,
  title: 'Count the coins',
  vi: 'Đếm tiền xu (đến $1)',
  icon: '🪙',
  tip: 'Dạy con đếm từ đồng xu giá trị lớn nhất rồi "đếm tiếp" (count on): 50¢ → 70¢ → 80¢ → 85¢. Lỗi hay gặp: đếm số đồng xu thay vì giá trị.',
  gen(R, tier) {
    if (tier === 1) {
      const c = R.pick([5, 10, 10, 20]);
      const k = R.int(2, c === 20 ? 5 : c === 10 ? 9 : 8);
      const total = c * k;
      return {
        prompt: R.pick(['How much money is there?', `Count in ${c}s. How much money is there?`, `How many cents are there?`]),
        visuals: [coinVis(Array(k).fill(c))],
        input: 'choice',
        answer: total,
        choices: numChoices(R, total, { near: [k, total - c, total + c], min: 1, max: 100, step: 5, fmt: C }),
        hint: `Count in ${c}s: ${c}, ${2 * c}, ${3 * c} …`,
        explain: `There are ${k} coins of ${C(c)}: ${runTotal(Array(k).fill(c), C)}. There is ${C(total)}.`
      };
    }
    if (tier === 3 && R.chance(0.35)) {
      const target = R.step(35, 95, 5);
      return {
        prompt: `Which set of coins makes **${C(target)}**?`,
        input: 'choice',
        answer: target,
        choices: setChoices(R, target, [50, 20, 10, 5], coinVis),
        hint: 'Add up each set, starting with the biggest coin.',
        explain: `The right set adds up to ${C(target)}.`
      };
    }
    const kinds = tier === 2 ? R.sample([20, 10, 5], 2) : [50, 20, 10, 5];
    const { list, total } = randomSet(R, kinds, 100, tier === 2 ? 3 : 4, tier === 2 ? 5 : 6);
    return {
      prompt: R.pick(['How much money is there?', 'Count the coins. How much money is there altogether?', 'How many cents are there?']),
      visuals: [coinVis(tier === 3 ? R.shuffle(list) : list)],
      input: 'number',
      answer: total,
      unit: { post: '¢' },
      hint: 'Start with the coin worth the most. Then count on.',
      explain: `${list.map(C).join(' + ')} = ${C(total)}. Count on: ${runTotal(list, C)}.`
    };
  }
};

const p1Notes = {
  id: 'p1.money.notes',
  level: 'P1',
  strand: 'money',
  unit: 16,
  title: 'Count the notes',
  vi: 'Đếm tiền giấy (đến $100)',
  icon: '💵',
  tip: 'Cho con nhận diện màu tờ tiền Singapore: $2 tím, $5 xanh lá, $10 đỏ, $50 xanh dương. Đếm từ tờ lớn nhất rồi đếm tiếp.',
  gen(R, tier) {
    if (tier === 1) {
      const n = R.pick([2, 5, 10]);
      const k = R.int(2, n === 10 ? 6 : 7);
      const total = n * k;
      return {
        prompt: R.pick(['How much money is there?', `Count the $${n} notes. How much money is there?`]),
        visuals: [noteVis(Array(k).fill(n))],
        input: 'choice',
        answer: total,
        choices: numChoices(R, total, { near: [k, total - n, total + n], min: 1, max: 100, fmt: D }),
        hint: `Count in ${n}s: ${n}, ${2 * n}, ${3 * n} …`,
        explain: `There are ${k} notes of $${n}: ${runTotal(Array(k).fill(n), D)}. There is $${total}.`
      };
    }
    if (tier === 3 && R.chance(0.3)) {
      const target = R.int(13, 68);
      return {
        prompt: `Which set makes **$${target}**?`,
        input: 'choice',
        answer: target,
        choices: setChoices(R, target, [50, 10, 5, 2, 1], noteVis),
        hint: 'Add up each set, starting with the note worth the most.',
        explain: `The right set adds up to $${target}.`
      };
    }
    const kinds = tier === 2 ? R.sample([10, 5, 2], 2) : R.sample([50, 10, 5, 2, 1], R.int(3, 4));
    const { list, total } = randomSet(R, kinds, tier === 2 ? 50 : 100, 3, tier === 2 ? 5 : 6);
    return {
      prompt: R.pick(['How much money is there?', 'Count the money. How much is there altogether?']),
      visuals: [noteVis(tier === 3 ? R.shuffle(list) : list)],
      input: 'number',
      answer: total,
      unit: { pre: '$' },
      hint: 'Start with the note worth the most. Then count on.',
      explain: `${list.map(D).join(' + ')} = $${total}. Count on: ${runTotal(list, D)}.`
    };
  }
};

const p1Compare = {
  id: 'p1.money.compare',
  level: 'P1',
  strand: 'money',
  unit: 16,
  title: 'Who has more money?',
  vi: 'So sánh số tiền',
  icon: '⚖️',
  tip: 'Nhiều đồng xu hơn KHÔNG có nghĩa là nhiều tiền hơn. Cho con cộng giá trị từng nhóm trước khi so sánh.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    const useCents = R.chance(0.5);
    const fmt = useCents ? C : D;
    const vis = useCents ? coinVis : noteVis;
    if (tier === 3 && R.chance(0.4)) {
      // trap: more coins but less money
      const big = useCents ? [50, R.pick([10, 20])] : [10, R.pick([5, 2])];
      const small = Array(R.int(3, 5)).fill(useCents ? R.pick([5, 10]) : R.pick([1, 2]));
      if (sum(small) >= sum(big)) small.length = 3;
      const totalBig = sum(big);
      const totalSmall = sum(small);
      return {
        prompt: `${p.name} has more ${useCents ? 'coins' : 'notes and coins'} than ${q.name}. Who has **more money**?`,
        visuals: [{ type: 'text', text: p.name, size: 'lg' }, vis(small), { type: 'text', text: q.name, size: 'lg' }, vis(big)],
        input: 'choice',
        answer: q.name,
        choices: fixedChoices([p.name, q.name]),
        hint: 'Do not just count how many pieces. Add up the value of each set.',
        explain: `${p.name} has ${fmt(totalSmall)}. ${q.name} has ${fmt(totalBig)}. ${q.name} has more money, even with fewer pieces.`
      };
    }
    const kinds = useCents ? [50, 20, 10, 5] : [10, 5, 2];
    const max = useCents ? 100 : 50;
    const A = randomSet(R, kinds, max, 2, 4);
    let B = randomSet(R, kinds, max, 2, 4);
    let guard = 0;
    while (B.total === A.total && guard++ < 20) B = randomSet(R, kinds, max, 2, 4);
    if (B.total === A.total) B = { list: [...A.list, kinds[kinds.length - 1]], total: A.total + kinds[kinds.length - 1] };
    const visuals = [{ type: 'text', text: p.name, size: 'lg' }, vis(A.list), { type: 'text', text: q.name, size: 'lg' }, vis(B.list)];
    const more = A.total > B.total ? p : q;
    const less = more === p ? q : p;
    if (tier === 1 || R.chance(0.35)) {
      const askLess = tier > 1 && R.chance(0.5);
      return {
        prompt: `Who has ${askLess ? '**less**' : '**more**'} money?`,
        visuals,
        input: 'choice',
        answer: askLess ? less.name : more.name,
        choices: fixedChoices([p.name, q.name]),
        hint: 'Count the money in each set first.',
        explain: `${p.name} has ${fmt(A.total)}. ${q.name} has ${fmt(B.total)}. ${more.name} has more money; ${less.name} has less.`
      };
    }
    const diff = Math.abs(A.total - B.total);
    return {
      prompt: `How much **more** money does ${more.name} have than ${less.name}?`,
      visuals,
      input: 'number',
      answer: diff,
      unit: useCents ? { post: '¢' } : { pre: '$' },
      hint: 'Count each set. Then subtract the smaller amount from the bigger amount.',
      explain: `${more.name} has ${fmt(Math.max(A.total, B.total))} and ${less.name} has ${fmt(Math.min(A.total, B.total))}. ${fmt(Math.max(A.total, B.total))} − ${fmt(Math.min(A.total, B.total))} = ${fmt(diff)}.`
    };
  }
};

const EX_TRIPLES = [
  [50, 20, 10, 'c'], [50, 10, 20, 'c'], [100, 10, 50, 'c'], [100, 5, 50, 'c'], [20, 5, 10, 'c'], [50, 5, 20, 'c'],
  [50, 5, 10, 'd'], [100, 10, 50, 'd'], [10, 1, 5, 'd'], [100, 5, 50, 'd'], [50, 2, 10, 'd'], [10, 2, 2, 'x']
].filter((t) => t[3] !== 'x');
const p1Exchange = {
  id: 'p1.money.exchange',
  level: 'P1',
  strand: 'money',
  unit: 16,
  title: 'Changing money',
  vi: 'Đổi tiền (1 tờ lớn = mấy tờ nhỏ)',
  icon: '🔄',
  tip: 'Chơi trò "đổi tiền" với xu thật: một đồng 50¢ đổi được mấy đồng 10¢? Nhắc con: $1 = 100¢.',
  gen(R, tier) {
    if (tier === 1) {
      const [big, small, kind] = R.pick([[50, 10, 'c'], [20, 10, 'c'], [10, 5, 'c'], [20, 5, 'c'], [50, 5, 'c'], [10, 2, 'd'], [10, 5, 'd'], [50, 10, 'd'], [5, 1, 'd']]);
      const n = big / small;
      const f = kind === 'c' ? C : D;
      const bigName = kind === 'c' ? `${C(big)} coin` : `$${big} note`;
      const smallName = kind === 'c' ? `${C(small)} coins` : small === 1 ? '$1 coins' : `$${small} notes`;
      const vis = kind === 'c' ? coinVis : noteVis;
      return {
        prompt: R.pick([`How many ${smallName} make ${f(big)}?`, `A ${bigName} can be changed for how many ${smallName}?`]),
        visuals: [vis([big]), vis([small])],
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { near: [n + 1, n - 1, small, big / 10], min: 1, max: 25 }),
        hint: `Count in ${small}s until you reach ${big}: ${small}, ${small * 2} …`,
        explain: `${Array(n).fill(f(small)).join(' + ')} = ${f(big)}. So ${n} ${kind === 'c' || small === 1 ? 'coins' : 'notes'} of ${f(small)} make ${f(big)}.`
      };
    }
    if (tier === 2) {
      const pairs = [
        [100, 10, 'c'], [100, 20, 'c'], [100, 50, 'c'], [100, 5, 'c'],
        [10, 2, 'd'], [10, 5, 'd'], [50, 10, 'd'], [50, 5, 'd'], [100, 50, 'd'], [100, 10, 'd'], [10, 1, 'd'], [5, 1, 'd']
      ];
      const [big, small, kind] = R.pick(pairs);
      const n = big / small;
      const bigName = kind === 'c' ? (big === 100 ? '$1 coin' : `${C(big)} coin`) : `$${big} note`;
      const smallName = kind === 'c' ? `${C(small)} coins` : small === 1 ? '$1 coins' : `$${small} notes`;
      return {
        prompt: `${kind === 'c' && big === 100 ? '$1 = 100¢. ' : ''}A ${bigName} can be changed for how many ${smallName}?`,
        visuals: [kind === 'c' ? coinVis([big]) : noteVis([big])],
        input: 'number',
        answer: n,
        hint: `Count in ${small}s until you reach ${big}.`,
        explain: `${n} × ${kind === 'c' ? C(small) : D(small)} = ${kind === 'c' ? (big === 100 ? '100¢ = $1' : C(big)) : D(big)}. The answer is ${n}.`
      };
    }
    if (R.chance(0.4)) {
      return {
        prompt: 'Which set of coins has the **same value as $1**?',
        input: 'choice',
        answer: 100,
        choices: setChoices(R, 100, [50, 20, 10, 5], coinVis),
        hint: '$1 = 100¢. Add up each set.',
        explain: 'The right set adds up to 100¢, which is the same as $1.'
      };
    }
    const [big, small, extra, kind] = R.pick(EX_TRIPLES);
    const n = (big - extra) / small;
    const who = person(R);
    const f = kind === 'c' ? C : D;
    const bigName = kind === 'c' ? (big === 100 ? 'a $1 coin' : `a ${C(big)} coin`) : `a $${big} note`;
    const smallName = kind === 'c' ? `${C(small)} coins` : small === 1 ? '$1 coins' : `$${small} notes`;
    const extraName = kind === 'c' ? `one ${C(extra)} coin` : extra === 1 ? 'one $1 coin' : `one $${extra} note`;
    return {
      prompt: `${who.name} changes ${bigName} for some ${smallName} and ${extraName}. How many ${smallName} does ${who.he} get?`,
      visuals: [kind === 'c' ? coinVis([big]) : noteVis([big])],
      input: 'number',
      answer: n,
      hint: `First take away the ${f(extra)}. Then count in ${small}s.`,
      explain: `${f(big)} − ${f(extra)} = ${f(big - extra)}. ${f(big - extra)} is ${n} × ${f(small)}. ${who.name} gets ${n} ${kind === 'c' || small === 1 ? 'coins' : 'notes'} of ${f(small)}.`
    };
  }
};

function shopPrices(R, k, useCents, tier) {
  if (useCents) return R.distinctInts(k, 2, 9).map((x) => x * 5);
  return R.distinctInts(k, 2, tier === 1 ? 20 : 45);
}

const p1Buy = {
  id: 'p1.money.buy',
  level: 'P1',
  strand: 'money',
  unit: 16,
  title: 'Shopping',
  vi: 'Mua hàng: tính tổng tiền, tiền còn lại',
  icon: '🛒',
  tip: 'Đóng vai "bán hàng" ở nhà với giá dán trên đồ vật. Hỏi con: "How much do you pay? How much is left?"',
  gen(R, tier) {
    const useCents = R.chance(0.5);
    const shop = useCents ? CENT_SHOP : DOLLAR_SHOP;
    const k = tier === 1 ? 3 : 4;
    const prices = shopPrices(R, k, useCents, tier);
    const priced = R.sample(shop, k).map((it, i) => ({ ...it, p: prices[i] }));
    const fmt = useCents ? C : D;
    const unit = useCents ? { post: '¢' } : { pre: '$' };
    const visual = { type: 'pricetags', items: priced.map((x) => ({ e: x.e, price: fmt(x.p), name: x.one })) };
    const who = person(R);
    const form = R.pick(tier === 1 ? ['total', 'left'] : tier === 2 ? ['total', 'diff', 'left'] : ['pair', 'cannot', 'diff', 'left']);
    if (form === 'total') {
      const [a, b] = R.sample(priced, 2);
      const t = a.p + b.p;
      return {
        prompt: `${who.name} buys ${art(a.one)} and ${art(b.one)}. How much does ${who.he} pay?`,
        visuals: [visual],
        input: 'number',
        answer: t,
        unit,
        hint: 'Find the two price tags. Add the two prices.',
        explain: `${fmt(a.p)} + ${fmt(b.p)} = ${fmt(t)}. ${who.name} pays ${fmt(t)}.`
      };
    }
    if (form === 'diff') {
      const [a, b] = R.sample(priced, 2).sort((x, y) => y.p - x.p);
      return {
        prompt: `How much **more** does the ${a.one} cost than the ${b.one}?`,
        visuals: [visual],
        input: 'number',
        answer: a.p - b.p,
        unit,
        hint: 'Find the difference: the bigger price minus the smaller price.',
        explain: `${fmt(a.p)} − ${fmt(b.p)} = ${fmt(a.p - b.p)}. The ${a.one} costs ${fmt(a.p - b.p)} more.`
      };
    }
    if (form === 'left') {
      const a = R.pick(priced);
      const has = useCents ? R.step(a.p + 5, 100, 5) : R.pick([10, 20, 50, 100].filter((v) => v > a.p));
      return {
        prompt: `${who.name} has ${fmt(has)}. ${who.He} buys ${art(a.one)}. How much money does ${who.he} have **left**?`,
        visuals: [visual],
        input: 'number',
        answer: has - a.p,
        unit,
        hint: `Take the price of the ${a.one} away from ${fmt(has)}.`,
        explain: `${fmt(has)} − ${fmt(a.p)} = ${fmt(has - a.p)}. ${who.name} has ${fmt(has - a.p)} left.`
      };
    }
    if (form === 'pair') {
      const pairs = [];
      for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) pairs.push([i, j, priced[i].p + priced[j].p]);
      const counts = {};
      pairs.forEach((p) => (counts[p[2]] = (counts[p[2]] || 0) + 1));
      const uniq = pairs.filter((p) => counts[p[2]] === 1);
      const pick = uniq.length ? R.pick(uniq) : pairs[0];
      const others = R.sample(pairs.filter((p) => p !== pick && p[2] !== pick[2]), 3);
      const label = (p) => `${priced[p[0]].e} ${priced[p[0]].one} + ${priced[p[1]].e} ${priced[p[1]].one}`;
      return {
        prompt: `${who.name} spends exactly **${fmt(pick[2])}** on two things. Which two things does ${who.he} buy?`,
        visuals: [visual],
        input: 'choice',
        answer: `${pick[0]}-${pick[1]}`,
        choices: R.shuffle([pick, ...others]).map((p) => ({ value: `${p[0]}-${p[1]}`, label: label(p) })),
        hint: 'Add the prices of each pair. Which pair makes the total?',
        explain: `${fmt(priced[pick[0]].p)} + ${fmt(priced[pick[1]].p)} = ${fmt(pick[2])}. ${who.He} buys the ${priced[pick[0]].one} and the ${priced[pick[1]].one}.`
      };
    }
    const sorted = [...priced].sort((x, y) => x.p - y.p);
    const top = sorted[k - 1];
    const second = sorted[k - 2];
    const has = useCents ? R.step(second.p, top.p - 5, 5) : R.int(second.p, top.p - 1);
    return {
      prompt: `${who.name} has ${fmt(has)}. Which thing **can't** ${who.he} buy?`,
      visuals: [visual],
      input: 'choice',
      answer: top.one,
      choices: R.shuffle(priced).map((x) => ({ value: x.one, label: `${x.e} ${x.one}` })),
      hint: `Look for a price that is more than ${fmt(has)}.`,
      explain: `The ${top.one} costs ${fmt(top.p)}, which is more than ${fmt(has)}. ${who.name} cannot buy it.`
    };
  }
};

const p1Change = {
  id: 'p1.money.change',
  level: 'P1',
  strand: 'money',
  unit: 16,
  title: 'Getting change',
  vi: 'Tính tiền thối lại',
  icon: '🧾',
  tip: 'Tiền thối = tiền đưa − giá tiền. Có thể "đếm thêm" từ giá tiền lên tới số tiền đã đưa (cách người bán hàng vẫn làm).',
  gen(R, tier) {
    const who = person(R);
    const useCents = R.chance(0.5);
    const fmt = useCents ? C : D;
    const shop = useCents ? CENT_SHOP : DOLLAR_SHOP;
    const unit = useCents ? { post: '¢' } : { pre: '$' };
    let items;
    let paid;
    if (tier === 1) {
      items = [{ ...R.pick(shop), p: useCents ? R.step(10, 45, 5) : R.int(2, 9) }];
      paid = useCents ? 50 : 10;
    } else if (tier === 2) {
      items = [{ ...R.pick(shop), p: useCents ? R.step(15, 95, 5) : R.int(11, 48) }];
      paid = useCents ? 100 : 50;
    } else {
      const [x, y] = R.sample(shop, 2);
      const a = useCents ? R.step(10, 50, 5) : R.int(5, 45);
      const b = useCents ? R.step(10, 95 - a, 5) : R.int(3, 95 - a);
      items = [{ ...x, p: a }, { ...y, p: b }];
      paid = useCents ? 100 : sum([a, b]) < 50 ? R.pick([50, 100]) : 100;
    }
    const cost = sum(items.map((i) => i.p));
    const change = paid - cost;
    const paidName = useCents ? (paid === 100 ? 'a $1 coin' : `a ${C(paid)} coin`) : `a $${paid} note`;
    const what = items.length === 1 ? `${art(items[0].one)} for ${fmt(items[0].p)}` : `${art(items[0].one)} and ${art(items[1].one)}`;
    const paidVis = useCents ? coinVis([paid]) : noteVis([paid]);
    const cents100 = useCents && paid === 100;
    return {
      prompt: `${who.name} buys ${what}. ${who.He} pays with ${paidName}. How much **change** does ${who.he} get?`,
      visuals: [{ type: 'pricetags', items: items.map((x) => ({ e: x.e, price: fmt(x.p), name: x.one })) }, paidVis],
      input: 'number',
      answer: change,
      unit,
      hint: `${cents100 ? '$1 = 100¢. ' : ''}Change = money paid − cost. You can count on from ${fmt(cost)} to ${fmt(paid)}.`,
      explain: `${items.length > 1 ? `Cost: ${fmt(items[0].p)} + ${fmt(items[1].p)} = ${fmt(cost)}. ` : ''}${cents100 ? '$1 = 100¢. ' : ''}${fmt(paid)} − ${fmt(cost)} = ${fmt(change)}. The change is ${fmt(change)}.`
    };
  }
};

// ================================================================== P2 unit 9
function centsSplitWrong(c) {
  // common notation mistakes for an amount in cents
  const d = Math.floor(c / 100);
  const r = c % 100;
  const out = new Set();
  out.add(money(c * 10));
  if (r % 10 === 0 && r) out.add(`$${d}.0${r / 10}`);
  if (r < 10 && r) out.add(`$${d}.${r}0`);
  out.add(`$${c}`);
  if (r) out.add(`$${d}.${String(r).padStart(2, '0').split('').reverse().join('')}`);
  out.add(money(Math.max(1, c - 100)));
  out.delete(money(c));
  return [...out];
}

const p2Notation = {
  id: 'p2.money.notation',
  level: 'P2',
  strand: 'money',
  unit: 9,
  title: 'Dollars and cents',
  vi: 'Ghi tiền dạng $ và ¢, đổi $ ↔ ¢',
  icon: '💲',
  tip: '$1 = 100¢. Khi viết $3.05 phải có số 0: "3 dollars and 5 cents". Lỗi hay gặp: viết $3.5 cho 3 đô 5 xu.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['d2c', 'c2d', 'dc'] : tier === 2 ? ['d2c', 'c2d', 'write', 'dc'] : ['d2c', 'c2d', 'write', 'read']);
    let c;
    if (tier === 1) c = R.int(1, 9) * 100 + (R.chance(0.5) ? 0 : R.step(10, 90, 10));
    else if (tier === 2) c = R.int(1, 9) * 100 + R.int(11, 99);
    else c = R.chance(0.5) ? R.int(1, 15) * 100 + R.int(1, 9) : R.int(10, 25) * 100 + R.step(5, 95, 5);
    const d = Math.floor(c / 100);
    const r = c % 100;
    if (form === 'd2c') {
      return {
        prompt: `${money(c)} = **?** ¢`,
        speak: `${moneySpeech(c)} is how many cents?`,
        input: 'number',
        answer: c,
        unit: { post: '¢' },
        hint: '$1 = 100¢. So each dollar is 100 cents.',
        explain: `${money(c)} is ${dw(d)}${r ? ` and ${cw(r)}` : ''}. ${d} × 100¢${r ? ` + ${r}¢` : ''} = ${c}¢.`
      };
    }
    if (form === 'c2d') {
      return {
        prompt: `Write **${c}¢** in dollars and cents.`,
        input: 'choice',
        answer: money(c),
        choices: textChoices(R, money(c), centsSplitWrong(c), 4),
        hint: '100¢ = $1. The last two digits are the cents.',
        explain: `${c}¢ = ${dw(d)}${r ? ` and ${cw(r)}` : ''} = ${money(c)}.`
      };
    }
    if (form === 'write') {
      return {
        prompt: `How do we write **${dw(d)} and ${cw(r)}**?`,
        input: 'choice',
        answer: money(c),
        choices: textChoices(R, money(c), centsSplitWrong(c), 4),
        hint: 'Dollars go before the dot. Cents always use two digits after the dot.',
        explain: `${cap(dw(d))} and ${cw(r)} is written as ${money(c)}.`
      };
    }
    if (form === 'dc' && r === 0) {
      return {
        prompt: `${money(c)} = **?** ¢`,
        speak: `${moneySpeech(c)} is how many cents?`,
        input: 'number',
        answer: c,
        unit: { post: '¢' },
        hint: '$1 = 100¢. So each dollar is 100 cents.',
        explain: `${money(c)} is ${dw(d)}. ${d} × 100¢ = ${c}¢.`
      };
    }
    if (form === 'dc') {
      const askD = R.chance(0.5);
      return {
        prompt: askD ? `${money(c)} is **?** dollars and ${cw(r)}.` : `${money(c)} is ${dw(d)} and **?** cents.`,
        speak: askD ? `${moneySpeech(c)}. How many dollars?` : `${moneySpeech(c)}. How many cents are there after the ${dw(d)}?`,
        input: 'number',
        answer: askD ? d : r,
        hint: 'The number before the dot tells the dollars. The two digits after the dot tell the cents.',
        explain: `${money(c)} is ${dw(d)} and ${cw(r)}.`
      };
    }
    // read money shown
    const notes = makeSet(R, d, [10, 5, 2, 1], 5);
    const coins = r ? makeSet(R, r, [50, 20, 10, 5], 5) : [];
    const total = sum(notes) * 100 + sum(coins);
    const items = [...notes.map((v) => (v === 1 ? { c: 100 } : { n: v })), ...coins.map((x) => ({ c: x }))];
    const wrong = new Set([money(total + (coins[coins.length - 1] || 5)), money(Math.max(5, total - (coins[0] || 5))), money(sum(notes) * 100 + sum(coins) * 10), money(total + 100)]);
    wrong.delete(money(total));
    return {
      prompt: 'How much money is shown? Write it in dollars and cents.',
      visuals: [{ type: 'money', items }],
      input: 'choice',
      answer: money(total),
      choices: textChoices(R, money(total), [...wrong], 4),
      hint: 'Add the dollars first. Then add the cents.',
      explain: `Dollars: ${notes.map(D).join(' + ')} = $${sum(notes)}.${coins.length ? ` Cents: ${coins.map(C).join(' + ')} = ${sum(coins)}¢.` : ''} Total: ${money(total)}.`
    };
  }
};

const p2Count = {
  id: 'p2.money.count',
  level: 'P2',
  strand: 'money',
  unit: 9,
  title: 'Notes and coins',
  vi: 'Đếm tiền giấy và tiền xu ($ và ¢)',
  icon: '💰',
  tip: 'Đếm phần đô-la (tiền giấy, xu $1) trước, rồi đếm phần xu. Viết kết quả dạng $7.75.',
  gen(R, tier) {
    if (tier === 1) {
      const { list, total } = randomSet(R, R.sample([10, 5, 2, 1], 3), 60, 3, 6);
      return {
        prompt: R.pick(['How much money is there?', 'Count the notes and coins. How much money is there?']),
        visuals: [noteVis(list)],
        input: 'number',
        answer: total,
        unit: { pre: '$' },
        hint: 'Start with the note worth the most. Then count on.',
        explain: `${list.map(D).join(' + ')} = $${total}.`
      };
    }
    const dl = randomSet(R, [10, 5, 2, 1], 30, 1, 3).list;
    const cl = randomSet(R, [50, 20, 10, 5], 95, 2, 4).list;
    const total = sum(dl) * 100 + sum(cl);
    const items = [...dl.map((v) => (v === 1 ? { c: 100 } : { n: v })), ...cl.map((x) => ({ c: x }))];
    const explain = `Dollars: ${dl.map(D).join(' + ')} = $${sum(dl)}. Cents: ${cl.map(C).join(' + ')} = ${sum(cl)}¢. Total: ${money(total)}.`;
    if (tier === 2) {
      const wrong = [money(total + cl[cl.length - 1]), money(total - cl[0]), money(total + 100), money(total - 100 > 0 ? total - 100 : total + 200), money(sum(dl) * 100 + sum(cl) * 10)];
      return {
        prompt: 'How much money is there?',
        visuals: [{ type: 'money', items }],
        input: 'choice',
        answer: money(total),
        choices: textChoices(R, money(total), wrong.filter((w) => w !== money(total)), 4),
        hint: 'Count the dollars first. Then count the cents.',
        explain
      };
    }
    return {
      prompt: 'How much money is there? Write your answer in dollars.',
      visuals: [{ type: 'money', items }],
      input: 'number',
      answer: Number((total / 100).toFixed(2)),
      decimals: 2,
      unit: { pre: '$' },
      hint: 'Count the dollars first, then the cents. Put the cents after the dot.',
      explain
    };
  }
};

const BIG_ITEMS = [
  ['a bicycle helmet', 'helmet'], ['a toy robot', 'robot'], ['a set of story books', 'story books'], ['a watch', 'watch'],
  ['a pair of shoes', 'shoes'], ['a school bag', 'bag'], ['a scooter', 'scooter'], ['a paint set', 'paint set'],
  ['a football', 'football'], ['a toy train', 'toy train'], ['a doll', 'doll'], ['a board game', 'board game']
];
const SMALL_ITEMS = [
  ['a pencil', 'pencil'], ['an eraser', 'eraser'], ['a packet drink', 'drink'], ['a curry puff', 'curry puff'],
  ['an apple', 'apple'], ['a bun', 'bun'], ['a sticker sheet', 'sticker sheet'], ['a lollipop', 'lollipop']
];
const p2Word = {
  id: 'p2.money.word',
  level: 'P2',
  strand: 'money',
  unit: 9,
  title: 'Money stories',
  vi: 'Toán có lời văn về tiền ($ hoặc ¢)',
  icon: '🏪',
  tip: 'Cho con vẽ sơ đồ đoạn thẳng (bar model): phần đã tiêu, phần còn lại, tổng số tiền. Hỏi: "What do we know? What do we need to find?"',
  gen(R, tier) {
    const who = person(R);
    const useCents = R.chance(0.35);
    const fmt = useCents ? C : D;
    const unit = useCents ? { post: '¢' } : { pre: '$' };
    const pool = useCents ? SMALL_ITEMS : BIG_ITEMS;
    const [A, B] = R.sample(pool, 2);
    const lo = useCents ? 15 : 12;
    const hi = useCents ? 60 : 95;
    const forms = tier === 1 ? ['total', 'left'] : tier === 2 ? ['total', 'left', 'diff', 'need'] : ['twostep', 'times', 'need', 'diff'];
    const form = R.pick(forms);
    if (form === 'total') {
      const a = useCents ? R.step(lo, 50, 5) : R.int(lo, 60);
      const b = useCents ? R.step(lo, 45, 5) : R.int(lo, 60);
      return {
        prompt: `${cap(A[0])} costs ${fmt(a)}. ${cap(B[0])} costs ${fmt(b)}. How much do they cost **altogether**?`,
        visuals: tier === 2 ? [{ type: 'bar', rows: [{ label: '', segs: [{ v: a, text: fmt(a), color: 'blue' }, { v: b, text: fmt(b), color: 'orange' }] }], total: { text: '?' } }] : [],
        input: 'number',
        answer: a + b,
        unit,
        hint: 'Altogether means add.',
        explain: `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}.`
      };
    }
    if (form === 'left') {
      const has = useCents ? R.pick([80, 90, 95]) : R.pick([50, 100]);
      const a = useCents ? R.step(lo, has - 10, 5) : R.int(lo, has - 5);
      return {
        prompt: `${who.name} has ${fmt(has)}. ${who.He} buys ${A[0]} for ${fmt(a)}. How much money does ${who.he} have **left**?`,
        visuals: tier === 2 ? [{ type: 'bar', rows: [{ label: '', segs: [{ v: a, text: fmt(a), color: 'blue' }, { v: has - a, text: '?', color: 'orange', missing: true }] }], total: { text: fmt(has) } }] : [],
        input: 'number',
        answer: has - a,
        unit,
        hint: `Take away what ${who.he} spent from what ${who.he} had.`,
        explain: `${fmt(has)} − ${fmt(a)} = ${fmt(has - a)}. ${who.name} has ${fmt(has - a)} left.`
      };
    }
    if (form === 'diff') {
      const a = useCents ? R.step(30, hi + 30, 5) : R.int(30, hi);
      const b = useCents ? R.step(lo, a - 5, 5) : R.int(lo, a - 3);
      return {
        prompt: `${cap(A[0])} costs ${fmt(a)}. ${cap(B[0])} costs ${fmt(b)}. How much **more** does the ${A[1]} cost than the ${B[1]}?`,
        visuals: [{ type: 'bar', rows: [{ label: A[1], segs: [{ v: a, text: fmt(a), color: 'blue' }] }, { label: B[1], segs: [{ v: b, text: fmt(b), color: 'orange' }] }], diff: { text: '?', short: 1, long: 0 } }],
        input: 'number',
        answer: a - b,
        unit,
        hint: '"How much more" means find the difference: subtract.',
        explain: `${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}. The ${A[1]} costs ${fmt(a - b)} more.`
      };
    }
    if (form === 'need') {
      const price = useCents ? R.step(50, 95, 5) : R.int(40, 99);
      const has = useCents ? R.step(10, price - 5, 5) : R.int(10, price - 4);
      return {
        prompt: `${who.name} wants to buy ${A[0]} that costs ${fmt(price)}. ${who.He} has ${fmt(has)}. How much **more** money does ${who.he} need?`,
        visuals: tier === 2 ? [{ type: 'bar', rows: [{ label: '', segs: [{ v: has, text: fmt(has), color: 'green' }, { v: price - has, text: '?', missing: true }] }], total: { text: fmt(price) } }] : [],
        input: 'number',
        answer: price - has,
        unit,
        hint: 'Find the gap between what the thing costs and what you have.',
        explain: `${fmt(price)} − ${fmt(has)} = ${fmt(price - has)}. ${who.name} needs ${fmt(price - has)} more.`
      };
    }
    if (form === 'times') {
      const each = useCents ? R.pick([5, 10, 20]) : R.pick([2, 3, 4, 5, 10]);
      const n = R.int(2, useCents ? 5 : 9);
      const it = useCents ? R.pick(['pencils', 'erasers', 'sweets', 'stickers']) : R.pick(['books', 'toy cars', 'cartons of milk', 'boxes of tissue']);
      const total = each * n;
      const pay = useCents ? 100 : total <= 10 ? 10 : total <= 50 ? 50 : 100;
      const askChange = R.chance(0.5) && pay > total;
      return {
        prompt: `Each of the ${it} costs ${fmt(each)}. ${who.name} buys ${n} ${it}.${askChange ? ` ${who.He} pays with ${useCents ? 'a $1 coin' : `a $${pay} note`}. How much change does ${who.he} get?` : ` How much does ${who.he} pay?`}`,
        input: 'number',
        answer: askChange ? pay - total : total,
        unit,
        hint: askChange ? `First find the cost of ${n} ${it}. Then subtract from the money paid.` : `${n} groups of ${fmt(each)}: multiply.`,
        explain: askChange
          ? `${n} × ${fmt(each)} = ${fmt(total)}. ${useCents ? '$1 = 100¢. ' : ''}${fmt(pay)} − ${fmt(total)} = ${fmt(pay - total)} change.`
          : `${n} × ${fmt(each)} = ${fmt(total)}.`
      };
    }
    // twostep
    const has = useCents ? 95 : R.pick([50, 100]);
    const a = useCents ? R.step(15, 45, 5) : R.int(10, Math.floor(has / 2) - 2);
    const b = useCents ? R.step(10, has - a - 10, 5) : R.int(5, has - a - 3);
    return {
      prompt: `${who.name} has ${fmt(has)}. ${who.He} buys ${A[0]} for ${fmt(a)} and ${B[0]} for ${fmt(b)}. How much money does ${who.he} have left?`,
      visuals: [{ type: 'bar', rows: [{ label: '', segs: [{ v: a, text: fmt(a), color: 'blue' }, { v: b, text: fmt(b), color: 'purple' }, { v: has - a - b, text: '?', missing: true }] }], total: { text: fmt(has) } }],
      input: 'number',
      answer: has - a - b,
      unit,
      hint: 'Step 1: find how much was spent. Step 2: subtract from what was there at first.',
      explain: `Spent: ${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}. Left: ${fmt(has)} − ${fmt(a + b)} = ${fmt(has - a - b)}.`
    };
  }
};

// ================================================================== P3 unit 5
const two = (c) => (c / 100).toFixed(2);
const dec = (c) => Number((c / 100).toFixed(2));

const p3Decimal = {
  id: 'p3.money.decimal',
  level: 'P3',
  strand: 'money',
  unit: 5,
  title: 'Add and subtract money',
  vi: 'Cộng trừ tiền dạng thập phân ($12.45)',
  icon: '🧮',
  tip: 'Viết thẳng cột, dấu chấm thẳng hàng; có thể đổi hết ra xu (¢) để tính rồi đổi lại. Kiểm tra: $20 − $13.65, cộng ngược lại phải ra $20.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['add', 'add', 'convert'] : tier === 2 ? ['add', 'sub', 'convert'] : ['sub', 'missing', 'sub3', 'convert']);
    if (form === 'convert') {
      const c = tier === 1 ? R.int(1, 20) * 100 + R.step(5, 95, 5) : R.int(10, 99) * 100 + R.int(1, 9);
      if (R.chance(0.5)) {
        return {
          prompt: `${money(c)} = **?** ¢`,
          speak: `${moneySpeech(c)} is how many cents?`,
          input: 'number',
          answer: c,
          unit: { post: '¢' },
          hint: '$1 = 100¢.',
          explain: `${money(c)} = ${Math.floor(c / 100)} × 100¢ + ${c % 100}¢ = ${c}¢.`
        };
      }
      return {
        prompt: `${c}¢ = **$?**`,
        speak: `${c} cents is how many dollars?`,
        input: 'number',
        answer: dec(c),
        decimals: 2,
        unit: { pre: '$' },
        hint: '100¢ = $1. The last two digits become the cents after the dot.',
        explain: `${c}¢ = ${money(c)}.`
      };
    }
    if (form === 'add') {
      let a;
      let b;
      if (tier === 1) {
        a = R.int(1, 15) * 100 + R.step(10, 40, 5);
        b = R.int(1, 15) * 100 + R.step(5, 50, 5);
      } else {
        a = R.int(2, 40) * 100 + R.step(35, 95, 5);
        b = R.int(1, 30) * 100 + R.step(25, 95, 5);
      }
      return {
        prompt: `${money(a)} + ${money(b)} = **?**`,
        visuals: [{ type: 'equation', rows: [two(a), two(b)], op: '+', result: '?' }],
        input: 'number',
        answer: dec(a + b),
        decimals: 2,
        unit: { pre: '$' },
        hint: 'Line up the dots. Add the cents first, then the dollars. 100¢ makes $1.',
        explain: `${money(a)} + ${money(b)} = ${money(a + b)}.`
      };
    }
    if (form === 'sub') {
      const a = tier === 3 && R.chance(0.5) ? R.pick([10, 20, 50, 100]) * 100 : R.int(10, 60) * 100 + R.step(5, 95, 5);
      const b = R.int(1, Math.floor(a / 100) - 1) * 100 + R.step(5, 95, 5);
      return {
        prompt: `${money(a)} − ${money(b)} = **?**`,
        visuals: [{ type: 'equation', rows: [two(a), two(b)], op: '−', result: '?' }],
        input: 'number',
        answer: dec(a - b),
        decimals: 2,
        unit: { pre: '$' },
        hint: 'Line up the dots. Subtract the cents first. Regroup $1 as 100¢ if needed.',
        explain: `${money(a)} − ${money(b)} = ${money(a - b)}. Check: ${money(a - b)} + ${money(b)} = ${money(a)}.`
      };
    }
    if (form === 'missing') {
      const total = R.pick([10, 20, 50]) * 100;
      const a = R.int(1, total / 100 - 1) * 100 + R.step(5, 95, 5);
      return {
        prompt: `${money(a)} + **?** = ${money(total)}`,
        speak: `${moneySpeech(a)} plus what makes ${moneySpeech(total)}?`,
        input: 'number',
        answer: dec(total - a),
        decimals: 2,
        unit: { pre: '$' },
        hint: 'Find the missing part: whole − part.',
        explain: `${money(total)} − ${money(a)} = ${money(total - a)}.`
      };
    }
    const a = R.int(2, 20) * 100 + R.step(5, 95, 5);
    const b = R.int(1, 15) * 100 + R.step(5, 95, 5);
    const c = Math.floor(R.int(100, a + b - 5) / 5) * 5;
    return {
      prompt: `${money(a)} + ${money(b)} − ${money(c)} = **?**`,
      input: 'number',
      answer: dec(a + b - c),
      decimals: 2,
      unit: { pre: '$' },
      hint: 'Work from left to right: add first, then subtract.',
      explain: `${money(a)} + ${money(b)} = ${money(a + b)}. ${money(a + b)} − ${money(c)} = ${money(a + b - c)}.`
    };
  }
};

const p3Shopping = {
  id: 'p3.money.shopping',
  level: 'P3',
  strand: 'money',
  unit: 5,
  title: 'Shopping problems',
  vi: 'Bài toán mua sắm nhiều bước',
  icon: '🛍️',
  tip: 'Bài nhiều bước: gạch chân từng dữ kiện, giải từng bước (Step 1, Step 2) và ghi đơn vị $. Ước lượng trước để kiểm tra đáp án có hợp lý không.',
  gen(R, tier) {
    const who = person(R);
    const its = R.sample(DECIMAL_SHOP, 4).map((it) => ({ ...it, p: R.int(1, tier === 1 ? 4 : 8) * 100 + R.step(5, 95, 5) }));
    const visual = { type: 'pricetags', items: its.map((x) => ({ e: x.e, price: money(x.p), name: x.one })) };
    const [A, B] = its;
    const form = R.pick(tier === 1 ? ['two', 'change'] : tier === 2 ? ['qty', 'change', 'need'] : ['qtychange', 'compare', 'need']);
    if (form === 'two') {
      return {
        prompt: `${who.name} buys ${art(A.one)} and ${art(B.one)}. How much does ${who.he} pay?`,
        visuals: [visual],
        input: 'number',
        answer: dec(A.p + B.p),
        decimals: 2,
        unit: { pre: '$' },
        hint: 'Add the two prices. Line up the dots.',
        explain: `${money(A.p)} + ${money(B.p)} = ${money(A.p + B.p)}.`
      };
    }
    if (form === 'change') {
      const cost = A.p + B.p;
      const pay = cost < 1000 ? 1000 : cost < 2000 ? 2000 : 5000;
      return {
        prompt: `${who.name} buys ${art(A.one)} and ${art(B.one)}. ${who.He} pays with a ${money(pay)} note. How much change does ${who.he} get?`,
        visuals: [visual],
        input: 'number',
        answer: dec(pay - cost),
        decimals: 2,
        unit: { pre: '$' },
        hint: 'Step 1: find the total cost. Step 2: subtract it from the money paid.',
        explain: `Step 1: ${money(A.p)} + ${money(B.p)} = ${money(cost)}. Step 2: ${money(pay)} − ${money(cost)} = ${money(pay - cost)}.`
      };
    }
    if (form === 'qty') {
      const n = R.int(2, 4);
      const cost = n * A.p + B.p;
      return {
        prompt: `${who.name} buys ${n} ${A.many} and ${art(B.one)}. How much does ${who.he} pay?`,
        visuals: [visual],
        input: 'number',
        answer: dec(cost),
        decimals: 2,
        unit: { pre: '$' },
        hint: `Step 1: find the cost of ${n} ${A.many}. Step 2: add the ${B.one}.`,
        explain: `${n} × ${money(A.p)} = ${money(n * A.p)}. ${money(n * A.p)} + ${money(B.p)} = ${money(cost)}.`
      };
    }
    if (form === 'need') {
      const cost = A.p + B.p;
      const has = R.int(1, Math.floor(cost / 100)) * 100 - R.pick([0, 50]);
      const hasC = Math.max(100, Math.min(has, cost - 5));
      return {
        prompt: `${who.name} has ${money(hasC)}. ${who.He} wants to buy ${art(A.one)} and ${art(B.one)}. How much more money does ${who.he} need?`,
        visuals: [visual],
        input: 'number',
        answer: dec(cost - hasC),
        decimals: 2,
        unit: { pre: '$' },
        hint: 'Step 1: find the total cost. Step 2: find how much is still missing.',
        explain: `Total cost: ${money(A.p)} + ${money(B.p)} = ${money(cost)}. Needed: ${money(cost)} − ${money(hasC)} = ${money(cost - hasC)}.`
      };
    }
    if (form === 'qtychange') {
      const n = R.int(2, 3);
      const m = R.int(2, 3);
      const cost = n * A.p + m * B.p;
      const pay = cost < 2000 ? 2000 : cost < 5000 ? 5000 : 10000;
      return {
        prompt: `${who.name} buys ${n} ${A.many} and ${m} ${B.many}. ${who.He} pays with a ${money(pay)} note. How much change does ${who.he} get?`,
        visuals: [visual],
        input: 'number',
        answer: dec(pay - cost),
        decimals: 2,
        unit: { pre: '$' },
        hint: 'Find the cost of each kind, add them, then subtract from the money paid.',
        explain: `${n} × ${money(A.p)} = ${money(n * A.p)}. ${m} × ${money(B.p)} = ${money(m * B.p)}. Total ${money(cost)}. Change: ${money(pay)} − ${money(cost)} = ${money(pay - cost)}.`
      };
    }
    // compare
    let n = 3;
    let m = 2;
    if (n * A.p === m * B.p) n = 4;
    const [big, bigN, small, smallN] = n * A.p > m * B.p ? [A, n, B, m] : [B, m, A, n];
    const diff = bigN * big.p - smallN * small.p;
    return {
      prompt: `How much more do ${bigN} ${big.many} cost than ${smallN} ${small.many}?`,
      visuals: [visual],
      input: 'number',
      answer: dec(diff),
      decimals: 2,
      unit: { pre: '$' },
      hint: 'Find the cost of each group first. Then find the difference.',
      explain: `${bigN} × ${money(big.p)} = ${money(bigN * big.p)}. ${smallN} × ${money(small.p)} = ${money(smallN * small.p)}. Difference: ${money(diff)}.`
    };
  }
};

export const SKILLS = [p1Coins, p1Notes, p1Compare, p1Exchange, p1Buy, p1Change, p2Notation, p2Count, p2Word, p3Decimal, p3Shopping];
