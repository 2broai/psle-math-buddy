// Addition & subtraction — Singapore MOE P1–P3.
// Number bonds, facts within 10 / 20 (Speed Sprint fact skills), make-10 and subtract-from-10
// strategies, adding three numbers, 2- to 4-digit column methods with regrouping, missing digits,
// checking with the inverse operation, and part-whole / comparison word problems with bar models.
import { ALL_ITEMS, person, people, item, plural, cap, textChoices, visualChoices } from '../helpers.js';

// ------------------------------------------------------------------ local helpers
const DIRS = ['down', 'up', 'right'];
const nounFor = (n, it) => (n === 1 ? it.one : it.many);
const eqv = (text) => ({ type: 'equation', text });
const vert = (rows, op, result = '?') => ({ type: 'equation', rows: rows.map(String), op, result: String(result) });
const bondV = (whole, parts, dir = 'down') => ({ type: 'bond', whole, parts, dir });
const tensW = (k) => (k === 1 ? '1 ten' : `${k} tens`);
const hundW = (k) => (k === 1 ? '1 hundred' : `${k} hundreds`);

/** Speech for bare number sentences: "? + 3 = 7" -> "what number plus 3 equals 7". */
function eqSpeak(s) {
  return s
    .replace(/\n/g, '. ')
    .replace(/\?/g, 'what number')
    .replace(/\s\+\s/g, ' plus ')
    .replace(/\s[−-]\s/g, ' minus ')
    .replace(/\s=\s/g, ' equals ');
}

/** Number-input question whose prompt is a bare number sentence. */
function fact(prompt, answer, hint, explain, visuals = []) {
  return { prompt, speak: eqSpeak(prompt), visuals, input: 'number', answer, hint, explain };
}

function carryCount(a, b) {
  let c = 0;
  let carry = 0;
  while (a > 0 || b > 0) {
    const s = (a % 10) + (b % 10) + carry;
    carry = s >= 10 ? 1 : 0;
    c += carry;
    a = Math.floor(a / 10);
    b = Math.floor(b / 10);
  }
  return c;
}

function borrowCount(a, b) {
  let c = 0;
  let borrow = 0;
  while (a > 0 || b > 0) {
    const d = (a % 10) - (b % 10) - borrow;
    borrow = d < 0 ? 1 : 0;
    c += borrow;
    a = Math.floor(a / 10);
    b = Math.floor(b / 10);
  }
  return c;
}

/** a in [aLo,aHi], b in [bLo,bHi] with a + b <= maxSum and ok(number of regroupings). */
function pickAdd(R, [aLo, aHi], [bLo, bHi], ok, maxSum = Infinity) {
  for (let i = 0; i < 800; i++) {
    const a = R.int(aLo, aHi);
    const b = R.int(bLo, bHi);
    if (a + b <= maxSum && ok(carryCount(a, b))) return [a, b];
  }
  return [aLo, bLo];
}

/** a in [aLo,aHi], b in [bLo,bHi] with a - b >= minDiff and ok(number of regroupings). */
function pickSub(R, [aLo, aHi], [bLo, bHi], ok, minDiff = 1) {
  for (let i = 0; i < 800; i++) {
    const a = R.int(aLo, aHi);
    const b = R.int(bLo, bHi);
    if (a - b >= minDiff && ok(borrowCount(a, b))) return [a, b];
  }
  return [aHi, bLo];
}

/** 3-digit number with a zero in the tens place, minus a number that forces regrouping across it. */
function acrossZero3(R) {
  const h = R.int(2, 9);
  const o = R.int(0, 6);
  const a = h * 100 + o;
  const b = R.int(1, h - 1) * 100 + R.int(1, 9) * 10 + R.int(o + 1, 9);
  return [a, b];
}

/** 4-digit number with a zero in the tens place (and often the hundreds place). */
function acrossZero4(R) {
  const th = R.int(3, 9);
  const hu = R.chance(0.5) ? 0 : R.int(1, 9);
  const on = R.int(0, 5);
  const a = th * 1000 + hu * 100 + on;
  const b = R.int(1, th - 1) * 1000 + R.int(0, 9) * 100 + R.int(0, 9) * 10 + R.int(on + 1, 9);
  return [a, b];
}

const PLACE = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'];
const ONE_PLACE = ['one', 'ten', 'hundred', 'thousand', 'ten thousand'];

/** Column-addition walk-through: "Ones: 7 + 5 = 12 → write 2, regroup 1 ten. …" */
function colAddExplain(a, b) {
  const steps = [];
  let x = a;
  let y = b;
  let carry = 0;
  let k = 0;
  while (x > 0 || y > 0 || carry) {
    if (x === 0 && y === 0) {
      steps.push(`${cap(PLACE[k])}: 1.`);
      break;
    }
    const dx = x % 10;
    const dy = y % 10;
    const s = dx + dy + carry;
    steps.push(`${cap(PLACE[k])}: ${dx} + ${dy}${carry ? ' + 1' : ''} = ${s}${s >= 10 ? ` → write ${s % 10}, regroup 1 ${ONE_PLACE[k + 1]}` : ''}.`);
    carry = s >= 10 ? 1 : 0;
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    k++;
  }
  return `${steps.join(' ')} So ${a} + ${b} = ${a + b}.`;
}

/** Column-subtraction walk-through using the regrouped top digits. */
function colSubExplain(a, b) {
  const steps = [];
  let x = a;
  let y = b;
  let borrow = 0;
  let k = 0;
  while (x > 0) {
    const digit = x % 10;
    const dy = y % 10;
    let t = digit - borrow;
    if (t < dy) {
      t += 10;
      borrow = 1;
    } else borrow = 0;
    const isTop = Math.floor(x / 10) === 0;
    if (!(isTop && t === 0 && dy === 0 && k > 0)) {
      steps.push(`${cap(PLACE[k])}${t !== digit ? ' (after regrouping)' : ''}: ${t} − ${dy} = ${t - dy}.`);
    }
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    k++;
  }
  return `${steps.join(' ')} So ${a} − ${b} = ${a - b}. Check: ${a - b} + ${b} = ${a}.`;
}

const ADD_HINT = 'Add the ones first. If the ones make 10 or more, regroup 10 ones as 1 ten.';
const SUB_HINT = 'Subtract the ones first. If there are not enough ones, regroup 1 ten as 10 ones.';

// ------------------------------------------------------------------ word-problem engine
const BIG_NOUNS = [
  { one: 'stamp', many: 'stamps' },
  { one: 'bead', many: 'beads' },
  { one: 'sticker', many: 'stickers' },
  { one: 'marble', many: 'marbles' },
  { one: 'card', many: 'cards' },
  { one: 'paper crane', many: 'paper cranes' },
  { one: 'seashell', many: 'seashells' },
  { one: 'button', many: 'buttons' }
];
const CHILD_PLACES = ['in the school hall', 'at the swimming pool', 'in the library', 'at the playground', 'on the school field', 'at the zoo'];

const COLOURABLE_SMALL = ['balloon', 'toy car', 'pencil', 'crayon', 'sweet', 'lollipop', 'kite', 'sticker', 'notebook', 'flower', 'gift'];
const COLOURABLE_BIG = ['bead', 'marble', 'sticker', 'button', 'card', 'paper crane'];
/** An item that can sensibly be "red" or "green". */
function colourItem(R, biggest) {
  if (biggest > 20) return R.pick(BIG_NOUNS.filter((n) => COLOURABLE_BIG.includes(n.one)));
  return R.pick(ALL_ITEMS.filter((x) => COLOURABLE_SMALL.includes(x.one)));
}

function storyNoun(R, biggest) {
  return biggest <= 20 ? item(R, R.pick(['food', 'toys', 'school'])) : R.pick(BIG_NOUNS);
}

/** Bar model: one bar split into two parts with a total brace. */
function pwModel(a, aText, b, bText, totalText) {
  return {
    type: 'bar',
    rows: [{ label: '', segs: [{ v: a, text: aText, color: 'blue' }, { v: b, text: bText, color: 'orange' }] }],
    total: { text: totalText }
  };
}

/** Bar model: two bars compared, with a difference bracket on the shorter one. */
function cmpModel(nameA, a, aText, nameB, b, bText, diffText, sumText) {
  const v = {
    type: 'bar',
    rows: [
      { label: nameA, segs: [{ v: a, text: aText, color: 'blue' }] },
      { label: nameB, segs: [{ v: b, text: bText, color: 'green' }] }
    ]
  };
  if (a !== b && diffText !== null) v.diff = { text: diffText, short: a > b ? 1 : 0, long: a > b ? 0 : 1 };
  if (sumText) v.sum = { text: sumText };
  return v;
}

/**
 * One-step word problem.
 *  total(x, y)        part + part          increase(x, y)  start x, y more
 *  part(x, y)         whole x, part y      decrease(x, y)  start x, y taken away
 *  diffMore(x, y)     x > y, find difference
 *  findMore(x, y)     base x, the other has y more     findFewer(x, y)  base x, other has y fewer
 *  reverseSmall(x, y) A has x, A has y more than B → B  reverseBig(x, y) B has x, B has y fewer than A → A
 */
function oneStep(R, kind, x, y) {
  const [p, q] = people(R, 2);
  const biggest = kind === 'total' || kind === 'increase' || kind === 'findMore' || kind === 'reverseBig' ? x + y : Math.max(x, y);
  const it = storyNoun(R, biggest);
  const N = (n) => plural(n, it);
  const m = it.many;
  let e1 = it.e || '🔵';
  let e2 = e1;
  let unit = m;
  let prompt;
  let ans;
  let model;
  let hint;
  let explain;
  let names = [p.name, q.name];
  switch (kind) {
    case 'total': {
      ans = x + y;
      const v = R.pick(Math.min(x, y) >= 2 ? [0, 1, 2, 3] : [0, 1, 3]);
      if (v === 0) {
        const c = colourItem(R, x + y);
        prompt = `${p.name} has ${x} red ${nounFor(x, c)} and ${y} blue ${nounFor(y, c)}. How many ${c.many} does ${p.he} have **altogether**?`;
        unit = c.many;
        e1 = c.e || e1;
        e2 = e1;
      } else if (v === 1) prompt = `${p.name} has ${N(x)}. ${q.name} has ${N(y)}. How many ${m} do they have **altogether**?`;
      else if (v === 2) {
        prompt = `There are ${x} boys and ${y} girls ${R.pick(CHILD_PLACES)}. How many children are there **in all**?`;
        unit = 'children';
        e1 = '👦';
        e2 = '👧';
      } else prompt = `${p.name} collected ${N(x)} on Saturday and ${N(y)} on Sunday. How many ${m} did ${p.he} collect **altogether**?`;
      model = pwModel(x, String(x), y, String(y), '?');
      hint = 'Part + part = whole. Put the two parts together.';
      explain = `Whole = part + part: ${x} + ${y} = ${ans}. The answer is ${ans} ${unit}.`;
      break;
    }
    case 'increase': {
      ans = x + y;
      const v = R.pick(x >= 2 && y >= 2 ? [0, 1, 2] : [0, 2]);
      if (v === 0) prompt = `${p.name} had ${N(x)}. ${q.name} gave ${p.him} ${y} more. How many ${m} does ${p.name} have **now**?`;
      else if (v === 1) {
        prompt = `There were ${x} people on an MRT train. At the next station, ${y} more people **boarded** the train. How many people are on the train now?`;
        unit = 'people';
        e1 = '🧍';
        e2 = '🧍';
      } else prompt = `${p.name} had ${N(x)}. ${p.He} bought ${y} more. How many ${m} does ${p.he} have **now**?`;
      model = pwModel(x, String(x), y, String(y), '?');
      hint = 'More were added, so the number gets bigger. Add.';
      explain = `${x} + ${y} = ${ans}. The answer is ${ans} ${unit}.`;
      break;
    }
    case 'part': {
      ans = x - y;
      const v = R.pick(y >= 2 && ans >= 2 ? [0, 1, 2] : [0, 2]);
      if (v === 0) {
        const c = colourItem(R, x);
        prompt = `There are ${plural(x, c)} in a box. ${y} of them are red and the rest are green. How many green ${c.many} are there?`;
        unit = c.many;
        e1 = c.e || e1;
      }
      else if (v === 1) {
        prompt = `There are ${x} children ${R.pick(CHILD_PLACES)}. ${y} of them are boys. How many **girls** are there?`;
        unit = 'girls';
        e1 = '🧒';
      } else prompt = `${p.name} and ${q.name} have ${N(x)} **altogether**. ${p.name} has ${y}. How many ${m} does ${q.name} have?`;
      model = pwModel(y, String(y), ans, '?', String(x));
      hint = 'You know the whole and one part. Whole − part = the other part.';
      explain = `Part = whole − part: ${x} − ${y} = ${ans}. The answer is ${ans} ${unit}.`;
      break;
    }
    case 'decrease': {
      ans = x - y;
      const v = R.pick(y >= 2 ? [0, 1, 2, 3] : [0, 3]);
      if (v === 0) prompt = `${p.name} had ${N(x)}. ${p.He} gave ${y} to ${q.name}. How many ${m} does ${p.name} have **left**?`;
      else if (v === 1) {
        prompt = `There were ${x} passengers on a bus. ${y} passengers **alighted** at the next bus stop. How many passengers were still on the bus?`;
        unit = 'passengers';
        e1 = '🧍';
      } else if (v === 2) {
        prompt = `A baker baked ${x} buns. ${y} buns were sold. How many buns were **left**?`;
        unit = 'buns';
        e1 = '🍞';
      } else prompt = `${p.name} had ${N(x)}. ${p.He} lost ${y} of them. How many ${m} does ${p.he} have **now**?`;
      model = pwModel(ans, '?', y, String(y), String(x));
      hint = 'Some were taken away, so the number gets smaller. Subtract.';
      explain = `${x} − ${y} = ${ans}. The answer is ${ans} ${unit}.`;
      break;
    }
    case 'diffMore': {
      ans = x - y;
      const v = R.int(0, 2);
      if (v === 0) {
        prompt = `${p.name} has ${N(x)}. ${q.name} has ${N(y)}. How many **more** ${m} does ${p.name} have than ${q.name}?`;
        explain = `Difference = ${x} − ${y} = ${ans}. ${p.name} has ${ans} more ${m} than ${q.name}.`;
      } else if (v === 1) {
        prompt = `${q.name} has ${N(y)}. ${p.name} has ${N(x)}. How many **fewer** ${m} does ${q.name} have than ${p.name}?`;
        explain = `Difference = ${x} − ${y} = ${ans}. ${q.name} has ${ans} fewer ${m} than ${p.name}.`;
      } else {
        prompt = `A farmer has ${x} ducks and ${y} hens. How many **more** ducks than hens are there?`;
        names = ['Ducks', 'Hens'];
        unit = 'ducks';
        e1 = '🦆';
        e2 = '🐔';
        explain = `Difference = ${x} − ${y} = ${ans}. There are ${ans} more ducks than hens.`;
      }
      model = cmpModel(names[0], x, String(x), names[1], y, String(y), '?');
      hint = 'Compare the two bars. The difference = bigger number − smaller number.';
      break;
    }
    case 'findMore': {
      ans = x + y;
      prompt = `${q.name} has ${N(x)}. ${p.name} has ${y} **more** ${m} than ${q.name}. How many ${m} does ${p.name} have?`;
      model = cmpModel(p.name, ans, '?', q.name, x, String(x), String(y));
      hint = `${p.name} has more, so ${p.name}'s bar is longer. Add the difference.`;
      explain = `${x} + ${y} = ${ans}. ${p.name} has ${ans} ${m}.`;
      break;
    }
    case 'findFewer': {
      ans = x - y;
      prompt = `${p.name} has ${N(x)}. ${q.name} has ${y} **fewer** ${m} than ${p.name}. How many ${m} does ${q.name} have?`;
      model = cmpModel(p.name, x, String(x), q.name, ans, '?', String(y));
      hint = `${q.name} has fewer, so ${q.name}'s bar is shorter. Subtract the difference.`;
      explain = `${x} − ${y} = ${ans}. ${q.name} has ${ans} ${m}.`;
      break;
    }
    case 'reverseSmall': {
      ans = x - y;
      prompt = `${p.name} has ${N(x)}. ${p.name} has ${y} more ${m} than ${q.name}. How many ${m} does ${q.name} have?`;
      model = cmpModel(p.name, x, String(x), q.name, ans, '?', String(y));
      hint = `Read carefully! Who has more? ${p.name}. So ${q.name} has fewer — subtract.`;
      explain = `${p.name} has more, so ${q.name} has ${y} fewer: ${x} − ${y} = ${ans}. ${q.name} has ${ans} ${m}.`;
      break;
    }
    case 'reverseBig': {
      ans = x + y;
      prompt = `${q.name} has ${N(x)}. ${q.name} has ${y} fewer ${m} than ${p.name}. How many ${m} does ${p.name} have?`;
      model = cmpModel(p.name, ans, '?', q.name, x, String(x), String(y));
      hint = `Read carefully! ${q.name} has fewer, so ${p.name} has more — add.`;
      explain = `${p.name} has ${y} more than ${q.name}: ${x} + ${y} = ${ans}. ${p.name} has ${ans} ${m}.`;
      break;
    }
    default:
      throw new Error(`unknown story kind ${kind}`);
  }
  return { prompt, answer: ans, model, hint, explain, e1, e2, unit, names };
}

/** Number ranges for 2-step problems by level & tier. */
function twoStepRange(level, tier) {
  if (level === 'P2') return tier === 1 ? [20, 300] : tier === 2 ? [40, 600] : [100, 999];
  return tier === 1 ? [100, 3000] : tier === 2 ? [400, 6000] : [1000, 9999];
}

const BIG_CONTEXTS = [
  { place: 'A bakery', made: 'baked', many: 'buns', gone: 'sold', more: 'baked' },
  { place: 'A toy factory', made: 'made', many: 'toy cars', gone: 'sold', more: 'made' },
  { place: 'A farm', made: 'collected', many: 'eggs', gone: 'sold', more: 'collected' },
  { place: 'A shop', made: 'had', many: 'pencils', gone: 'sold', more: 'received' },
  { place: 'A school', made: 'printed', many: 'worksheets', gone: 'given out', more: 'printed' },
  { place: 'A library', made: 'had', many: 'books', gone: 'borrowed', more: 'bought' }
];

/** Two-step word problem with numbers inside [lo, hi]. */
function twoStep(R, kind, lo, hi) {
  const [p, q] = people(R, 2);
  const it = R.pick(BIG_NOUNS);
  const m = it.many;
  switch (kind) {
    case 'compareTotal': {
      const more = R.chance(0.5);
      const a = R.int(lo, Math.floor(hi / 2.4));
      const d = R.int(Math.max(2, Math.floor(lo / 4)), Math.max(3, more ? Math.floor(a * 0.8) : a - 1));
      const b = more ? a + d : a - d;
      const total = a + b;
      return {
        prompt: `${p.name} has ${a} ${m}. ${q.name} has ${d} ${more ? '**more**' : '**fewer**'} ${m} than ${p.name}. How many ${m} do they have **altogether**?`,
        answer: total,
        model: cmpModel(p.name, a, String(a), q.name, b, '?', String(d), '?'),
        hint: `Step 1: find how many ${m} ${q.name} has. Step 2: add both amounts.`,
        explain: `Step 1: ${q.name} has ${a} ${more ? '+' : '−'} ${d} = ${b} ${m}. Step 2: ${a} + ${b} = ${total}. They have ${total} ${m} altogether.`
      };
    }
    case 'twoTakeaways': {
      const c = R.pick(BIG_CONTEXTS);
      const t = R.int(Math.max(lo * 2, 30), hi);
      const x = R.int(Math.max(1, Math.floor(t / 8)), Math.floor(t / 2));
      const y = R.int(Math.max(1, Math.floor(t / 10)), t - x - 1);
      const left = t - x - y;
      return {
        prompt: `${c.place} ${c.made} ${t} ${c.many}. ${x} ${c.many} were ${c.gone} in the morning and ${y} ${c.many} were ${c.gone} in the afternoon. How many ${c.many} were **left**?`,
        answer: left,
        model: { type: 'bar', rows: [{ label: '', segs: [{ v: x, text: String(x), color: 'blue' }, { v: y, text: String(y), color: 'green' }, { v: left, text: '?', color: 'orange' }] }], total: { text: String(t) } },
        hint: `Step 1: find how many were ${c.gone} altogether. Step 2: subtract from the total.`,
        explain: `Step 1: ${x} + ${y} = ${x + y} were ${c.gone}. Step 2: ${t} − ${x + y} = ${left}. ${left} ${c.many} were left.`
      };
    }
    case 'addThenSub': {
      const a = R.int(lo, Math.floor(hi * 0.6));
      const b = R.int(Math.max(2, Math.floor(lo / 2)), hi - a);
      const c = R.int(Math.max(2, Math.floor(lo / 3)), a + b - 1);
      const ans = a + b - c;
      return {
        prompt: `${p.name} had ${a} ${m}. ${p.He} bought ${b} more. Then ${p.he} gave ${c} ${m} to ${q.name}. How many ${m} does ${p.name} have **now**?`,
        answer: ans,
        hint: 'Step 1: add what was bought. Step 2: subtract what was given away.',
        explain: `Step 1: ${a} + ${b} = ${a + b}. Step 2: ${a + b} − ${c} = ${ans}. ${p.name} has ${ans} ${m} now.`
      };
    }
    case 'totalThenCompare': {
      const total = R.int(Math.max(lo * 2, 20), hi);
      const a = R.int(Math.floor(total / 2) + 1, total - Math.max(1, Math.floor(total / 10)));
      const b = total - a;
      const diff = a - b;
      return {
        prompt: `${p.name} and ${q.name} have ${total} ${m} **altogether**. ${p.name} has ${a} ${m}. How many **more** ${m} does ${p.name} have than ${q.name}?`,
        answer: diff,
        model: cmpModel(p.name, a, String(a), q.name, b, '?', '?', String(total)),
        hint: `Step 1: find how many ${m} ${q.name} has. Step 2: find the difference.`,
        explain: `Step 1: ${q.name} has ${total} − ${a} = ${b}. Step 2: ${a} − ${b} = ${diff}. ${p.name} has ${diff} more ${m} than ${q.name}.`
      };
    }
    case 'subThenAdd': {
      const c = R.pick(BIG_CONTEXTS);
      const t = R.int(Math.max(lo, 20), Math.floor(hi * 0.8));
      const x = R.int(Math.max(1, Math.floor(t / 6)), t - 1);
      const y = R.int(Math.max(2, Math.floor(lo / 2)), hi - (t - x));
      const ans = t - x + y;
      return {
        prompt: `${c.place} had ${t} ${c.many}. ${x} ${c.many} were ${c.gone}. Then it ${c.more} ${y} more. How many ${c.many} does it have **now**?`,
        answer: ans,
        hint: `Step 1: subtract the ${c.many} that were ${c.gone}. Step 2: add the new ones.`,
        explain: `Step 1: ${t} − ${x} = ${t - x}. Step 2: ${t - x} + ${y} = ${ans}. It has ${ans} ${c.many} now.`
      };
    }
    default: {
      // partsCompare
      const total = R.int(Math.max(lo * 2, 20), hi);
      const g = R.int(Math.floor(total / 2) + 1, total - Math.max(1, Math.floor(total / 8)));
      const boys = total - g;
      const diff = g - boys;
      const where = total > 1000 ? 'at a sports carnival' : R.pick(CHILD_PLACES);
      return {
        prompt: `There are ${total} children ${where}. ${g} of them are girls and the rest are boys. How many **more** girls than boys are there?`,
        answer: diff,
        model: cmpModel('Girls', g, String(g), 'Boys', boys, '?', '?'),
        hint: 'Step 1: find the number of boys. Step 2: find the difference.',
        explain: `Step 1: boys = ${total} − ${g} = ${boys}. Step 2: ${g} − ${boys} = ${diff}. There are ${diff} more girls than boys.`
      };
    }
  }
}

// ================================================================== P1 unit 2: number bonds
const bondWithin10 = {
  id: 'p1.bond.within10',
  level: 'P1',
  strand: 'addsub',
  unit: 2,
  title: 'Number bonds to 10',
  vi: 'Tách – gộp số (number bond) trong phạm vi 10',
  icon: '🔗',
  tip: 'Number bond gồm "whole" (số tổng) và 2 "parts" (2 phần). Hỏi con: "Is this the whole or a part?" — biết whole và 1 part thì lấy whole trừ part. Dùng 10 hạt chia 2 tay để chơi.',
  gen(R, tier) {
    const maxW = tier === 1 ? 6 : 10;
    const whole = R.int(tier === 1 ? 2 : 4, maxW);
    const a = R.int(tier === 3 ? 0 : 1, whole - (tier === 3 ? 0 : 1));
    const b = whole - a;
    const dir = tier === 1 ? 'down' : R.pick(DIRS);
    const form = tier === 3 ? R.pick(['part', 'whole', 'three', 'words']) : R.pick(['part', 'part', 'whole', 'words']);
    if (form === 'three' && whole >= 5) {
      const x = R.int(1, whole - 3);
      const y = R.int(1, whole - x - 1);
      const z = whole - x - y;
      return {
        prompt: `${whole} is split into **3 parts**. What is the missing part?`,
        visuals: [bondV(whole, [x, y, '?'], R.pick(['down', 'up']))],
        input: 'number',
        answer: z,
        hint: `Add the parts you know: ${x} + ${y}. How many more to make ${whole}?`,
        explain: `${x} + ${y} = ${x + y}. ${whole} − ${x + y} = ${z}. So ${whole} is made up of ${x}, ${y} and ${z}.`
      };
    }
    if (form === 'whole') {
      return {
        prompt: R.pick([`What is the **whole**?`, `${a} and ${b} make **?**`, 'Complete the number bond.']),
        visuals: [bondV('?', [a, b], dir)],
        input: 'number',
        answer: whole,
        hint: 'The whole is both parts put together. Add the parts.',
        explain: `${a} and ${b} make ${whole}. ${a} + ${b} = ${whole}.`
      };
    }
    if (form === 'words') {
      if (R.chance(0.5) || a === 0) {
        return {
          prompt: `${whole} is made up of ${b} and **?**`,
          visuals: tier === 1 ? [bondV(whole, [b, '?'], dir)] : [],
          input: 'number',
          answer: a,
          hint: `Start at ${b} and count on to ${whole}.`,
          explain: `${whole} is made up of ${b} and ${a}. ${b} + ${a} = ${whole}.`
        };
      }
      const isAre = (n) => (n === 1 ? 'is' : 'are');
      const scenes = [
        () => {
          const it = item(R, 'food');
          return [`There are ${plural(whole, it)}. ${a} ${isAre(a)} on the plate and the rest are in the box. How many ${it.many} are in the box?`, `There ${isAre(b)} ${plural(b, it)} in the box.`];
        },
        () => [`${whole} children are playing. ${a} ${isAre(a)} on the swings and the rest are on the slide. How many children are on the slide?`, `${b} ${b === 1 ? 'child is' : 'children are'} on the slide.`],
        () => [`There are ${whole} birds. ${a} ${isAre(a)} in the tree and the rest are on the ground. How many birds are on the ground?`, `${b} ${b === 1 ? 'bird is' : 'birds are'} on the ground.`]
      ];
      const [text, tail] = R.pick(scenes)();
      return {
        prompt: text,
        visuals: [bondV(whole, [a, '?'], dir)],
        input: 'number',
        answer: b,
        hint: `The whole is ${whole}. One part is ${a}. Find the other part.`,
        explain: `${whole} is made up of ${a} and ${b}. ${tail}`
      };
    }
    const missFirst = R.chance(0.5);
    const known = missFirst ? b : a;
    const ans = missFirst ? a : b;
    return {
      prompt: R.pick(['What is the missing part?', 'Complete the number bond.', `What number goes in the empty circle?`]),
      visuals: [bondV(whole, missFirst ? ['?', b] : [a, '?'], dir)],
      input: 'number',
      answer: ans,
      hint: `The whole is ${whole}. Which number goes with ${known} to make ${whole}?`,
      explain: `${whole} is made up of ${known} and ${ans}. ${whole} − ${known} = ${ans}.`
    };
  }
};

const bondTen = {
  id: 'p1.bond.ten',
  level: 'P1',
  strand: 'addsub',
  unit: 2,
  title: 'Ten-friends',
  vi: 'Cặp số cộng lại bằng 10 (ten-friends)',
  icon: '🔟',
  sprint: true,
  tip: 'Thuộc lòng 5 cặp "bạn của 10": 1&9, 2&8, 3&7, 4&6, 5&5 — đây là chìa khóa để tính nhẩm qua 10 ở P1. Chơi giơ ngón tay: bố giơ 3, con giơ phần còn lại.',
  gen(R, tier) {
    const a = R.int(tier === 3 ? 0 : 1, tier === 3 ? 10 : 9);
    const b = 10 - a;
    const forms = tier === 1 ? ['a+?', '?+b'] : tier === 2 ? ['a+?', '?+b', '10=a+?'] : ['a+?', '10-a', '10-?=b', '10=?+b'];
    const form = R.pick(forms);
    let prompt;
    let ans;
    if (form === 'a+?') {
      prompt = `${a} + ? = 10`;
      ans = b;
    } else if (form === '?+b') {
      prompt = `? + ${b} = 10`;
      ans = a;
    } else if (form === '10=a+?') {
      prompt = `10 = ${a} + ?`;
      ans = b;
    } else if (form === '10-a') {
      prompt = `10 − ${a} = ?`;
      ans = b;
    } else if (form === '10-?=b') {
      prompt = `10 − ? = ${b}`;
      ans = a;
    } else {
      prompt = `10 = ? + ${b}`;
      ans = a;
    }
    const known = 10 - ans;
    let visuals = [];
    if (tier === 1) visuals = [{ type: 'tenframe', a: known }];
    else if (tier === 2) visuals = [bondV(10, form === '?+b' ? ['?', b] : [a, '?'], R.pick(DIRS))];
    return fact(prompt, ans, tier === 1 ? 'Count the empty boxes in the ten frame.' : `Which number makes 10 with ${known}?`, `${known} and ${ans} make 10. ${known} + ${ans} = 10.`, visuals);
  }
};

const bondWays = {
  id: 'p1.bond.ways',
  level: 'P1',
  strand: 'addsub',
  unit: 2,
  title: 'Ways to make a number',
  vi: 'Các cách tách một số thành 2 phần',
  icon: '🧩',
  tip: 'Một số có nhiều cách tách: 7 = 1+6 = 2+5 = 3+4… Cho con liệt kê có thứ tự (1 và 6, 2 và 5…) để không bỏ sót — đây là kỹ năng "make a list" sau này.',
  gen(R, tier) {
    const whole = R.int(tier === 1 ? 4 : 5, tier === 1 ? 7 : 10);
    const form = tier === 1 ? 'pair' : tier === 2 ? R.pick(['pair', 'wrongBond']) : R.pick(['notPair', 'wrongBond', 'pair']);
    if (form === 'pair') {
      const a = R.int(1, whole - 1);
      const correct = `${a} and ${whole - a}`;
      const wrong = new Set();
      let guard = 0;
      while (wrong.size < 3 && guard++ < 200) {
        const x = R.int(1, whole);
        const y = R.int(1, whole);
        if (x + y !== whole && Math.abs(x + y - whole) <= 2) wrong.add(`${x} and ${y}`);
      }
      return {
        prompt: `Which pair of numbers makes **${whole}**?`,
        input: 'choice',
        answer: correct,
        choices: R.shuffle([correct, ...wrong]).map((v) => ({ value: v, label: v })),
        hint: 'Add the two numbers in each answer. Which pair adds up to the whole?',
        explain: `${a} + ${whole - a} = ${whole}, so ${a} and ${whole - a} make ${whole}.`
      };
    }
    if (form === 'notPair') {
      const goods = R.sample(Array.from({ length: whole - 1 }, (_, i) => i + 1), 3).map((x) => `${x} and ${whole - x}`);
      let bad;
      for (let i = 0; i < 50 && !bad; i++) {
        const x = R.int(1, whole);
        const y = R.int(1, whole);
        if (x + y !== whole && Math.abs(x + y - whole) <= 1) bad = `${x} and ${y}`;
      }
      bad = bad || `${whole} and 1`;
      const [bx, by] = bad.split(' and ').map(Number);
      return {
        prompt: `Which pair does **not** make ${whole}?`,
        input: 'choice',
        answer: bad,
        choices: R.shuffle([...goods, bad]).map((v) => ({ value: v, label: v })),
        hint: 'Add each pair. Three pairs make the number. One does not!',
        explain: `${bx} + ${by} = ${bx + by}, not ${whole}. The other pairs all make ${whole}.`
      };
    }
    // wrongBond: three correct number bonds and one wrong one
    const bonds = [];
    const used = new Set();
    let guard = 0;
    while (bonds.length < 3 && guard++ < 100) {
      const w = R.int(4, 10);
      const x = R.int(1, w - 1);
      const key = `${w}:${x}+${w - x}`;
      if (!used.has(key)) {
        used.add(key);
        bonds.push({ w, x, y: w - x, key });
      }
    }
    const w = R.int(5, 10);
    const x = R.int(1, w - 2);
    const y = w - x + R.pick([-1, 1]);
    const wrongKey = `${w}:${x}+${y}`;
    const list = [...bonds.map((bd) => ({ value: bd.key, visual: bondV(bd.w, [bd.x, bd.y]) })), { value: wrongKey, visual: bondV(w, [x, y]) }];
    return {
      prompt: 'Which number bond is **wrong**?',
      input: 'choice',
      answer: wrongKey,
      choices: visualChoices(R, list),
      hint: 'Add the two parts of each bond. Do they make the whole?',
      explain: `${x} + ${y} = ${x + y}, not ${w}. So that number bond is wrong.`
    };
  }
};

// ================================================================== P1 unit 3: addition within 10
const addFacts10 = {
  id: 'p1.add.facts10',
  level: 'P1',
  strand: 'addsub',
  unit: 3,
  title: 'Add within 10',
  vi: 'Cộng nhanh trong phạm vi 10',
  icon: '➕',
  sprint: true,
  tip: 'Mục tiêu là nhớ ngay kết quả, không đếm ngón tay. Khuyến khích "count on" từ số lớn hơn: 2 + 7 → "7… 8, 9".',
  gen(R, tier) {
    if (tier === 3 && R.chance(0.45)) {
      if (R.chance(0.5)) {
        const s = R.int(4, 10);
        const a = R.int(1, s - 1);
        const b = s - a;
        const first = R.chance(0.5);
        return fact(first ? `? + ${b} = ${s}` : `${a} + ? = ${s}`, first ? a : b, `Think: what number goes with ${first ? b : a} to make ${s}?`, `${a} + ${b} = ${s}, so the missing number is ${first ? a : b}.`);
      }
      const a = R.int(1, 4);
      const b = R.int(1, 4);
      const c = R.int(1, 10 - a - b);
      return fact(`${a} + ${b} + ${c} = ?`, a + b + c, 'Add two numbers first, then add the third.', `${a} + ${b} = ${a + b}, and ${a + b} + ${c} = ${a + b + c}.`);
    }
    const max = tier === 1 ? 6 : 10;
    const a = R.int(1, max - 1);
    const b = R.int(1, max - a);
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    return fact(
      `${a} + ${b} = ?`,
      a + b,
      `Start with the bigger number, ${big}, and count on ${small}.`,
      `${a} + ${b} = ${a + b}.`,
      tier === 1 ? [{ type: 'tenframe', a, b }] : []
    );
  }
};

const addCountOn = {
  id: 'p1.add.counton',
  level: 'P1',
  strand: 'addsub',
  unit: 3,
  title: 'Count on to add',
  vi: 'Đếm tiếp trên tia số để cộng',
  icon: '🐸',
  tip: 'Đếm tiếp (count on): bắt đầu từ số lớn, nhảy tiếp từng bước. Lỗi hay gặp: đếm luôn cả số bắt đầu ("5, 6, 7" cho 5 + 2). Nhắc con: "Start at 5, then jump: 6, 7".',
  gen(R, tier) {
    const start = R.int(tier === 3 ? 3 : 1, 8);
    const k = R.int(1, Math.min(tier === 1 ? 3 : 4, 10 - start));
    const end = start + k;
    const form = R.pick(['land', 'eq', 'story']);
    let prompt;
    if (form === 'land') prompt = `Start at ${start}. Count on ${k}. Which number do you land on?`;
    else if (form === 'eq') prompt = `Count on to find ${start} + ${k}.`;
    else {
      const an = R.pick([['frog', '🐸', 'hops'], ['rabbit', '🐰', 'hops'], ['kangaroo', '🦘', 'jumps'], ['grasshopper', '🦗', 'jumps']]);
      prompt = `A ${an[0]} is on ${start}. It ${an[2]} ${k} step${k === 1 ? '' : 's'} forward. Which number is it on now?`;
    }
    let visuals = [];
    if (tier === 1) {
      const jumps = Array.from({ length: k }, (_, i) => ({ from: start + i, to: start + i + 1, text: '+1' }));
      visuals = [{ type: 'numberline', min: 0, max: 10, marks: [{ at: start, color: 'orange' }], jumps, hide: [end] }];
    } else if (tier === 2) {
      visuals = [{ type: 'numberline', min: 0, max: 10, marks: [{ at: start, color: 'orange' }], hide: [end] }];
    }
    const steps = Array.from({ length: k }, (_, i) => start + i + 1).join(', ');
    return {
      prompt,
      visuals,
      input: 'number',
      answer: end,
      hint: `Put your finger on ${start}. Jump forward ${k} time${k === 1 ? '' : 's'}.`,
      explain: `Start at ${start} and count on ${k}: ${steps}. ${start} + ${k} = ${end}.`
    };
  }
};

const addSentence = {
  id: 'p1.add.sentence',
  level: 'P1',
  strand: 'addsub',
  unit: 3,
  title: 'Pictures to number sentences',
  vi: 'Viết phép tính (number sentence) từ hình',
  icon: '🖼️',
  tip: 'Cho con nói thành câu trước: "4 red and 3 blue make 7", rồi mới viết "4 + 3 = 7". Dấu "=" nghĩa là "bằng / giống nhau", không phải "ra kết quả".',
  gen(R, tier) {
    const it = item(R);
    const a = R.int(tier === 1 ? 2 : 1, 6);
    const b = R.int(1, Math.min(5, 10 - a));
    const total = a + b;
    const form = tier === 1 ? 'pic' : tier === 2 ? R.pick(['pic', 'story']) : R.pick(['toPic', 'story', 'pic']);
    if (form === 'toPic') {
      const opts = [[a, b]];
      const cands = [[a, b + 1], [a + 1, b], [a, Math.max(1, b - 1)], [a + 2, b], [b + 2, a]];
      for (const c of R.shuffle(cands)) {
        if (opts.length >= 4) break;
        const key = (x) => `${x[0]}+${x[1]}`;
        if (!opts.some((o) => key(o) === key(c)) && !(c[0] === b && c[1] === a) && c[0] + c[1] <= 12) opts.push(c);
      }
      return {
        prompt: `Which picture shows **${a} + ${b} = ${total}**?`,
        input: 'choice',
        answer: `${a}+${b}`,
        choices: visualChoices(R, opts.map(([x, y]) => ({ value: `${x}+${y}`, visual: { type: 'objects', op: '+', size: 'sm', groups: [{ emoji: it.e, count: x }, { emoji: it.e, count: y }] } }))),
        hint: `Look for a group of ${a} and a group of ${b}.`,
        explain: `The right picture has ${a} and ${b}. ${a} + ${b} = ${total}.`
      };
    }
    const correct = `${a} + ${b} = ${total}`;
    const pool = [`${a} + ${b} = ${total + 1}`, `${a + 1} + ${b} = ${total + 1}`, `${a} + ${b + 2} = ${total + 2}`, `${total} + ${b} = ${total + b}`];
    if (form === 'story') {
      const p = person(R);
      const ci = colourItem(R, 10);
      const [x, y] = R.sample(['red', 'blue', 'green', 'yellow'], 2);
      const wrong = [`${a} − ${b} = ${Math.abs(a - b)}`, `${a} + ${b} = ${total + 1}`, `${total} + ${b} = ${total + b}`, `${a + 1} + ${b} = ${total + 1}`].filter((s) => s !== correct);
      return {
        prompt: `${p.name} has ${a} ${x} ${nounFor(a, ci)} and ${b} ${y} ${nounFor(b, ci)}. Which number sentence shows how many ${ci.many} ${p.he} has altogether?`,
        input: 'choice',
        answer: correct,
        choices: textChoices(R, correct, wrong, 4),
        hint: '"Altogether" means we put the two parts together.',
        explain: `We add the parts: ${a} + ${b} = ${total}.`
      };
    }
    return {
      prompt: 'Which number sentence matches the picture?',
      visuals: [{ type: 'objects', op: '+', groups: [{ emoji: it.e, count: a }, { emoji: it.e, count: b }] }],
      input: 'choice',
      answer: correct,
      choices: textChoices(R, correct, pool, 4),
      hint: 'Count each group. Then count them all together.',
      explain: `One group has ${a}. The other group has ${b}. Together they make ${total}: ${a} + ${b} = ${total}.`
    };
  }
};

const addMissing = {
  id: 'p1.add.missing',
  level: 'P1',
  strand: 'addsub',
  unit: 3,
  title: 'Missing numbers in adding',
  vi: 'Tìm số còn thiếu trong phép cộng',
  icon: '🔍',
  tip: 'Với "? + 3 = 7" hãy hỏi: "Số nào cộng 3 thì được 7?" — đếm tiếp từ 3 đến 7, hoặc dùng number bond 7 = 3 + 4.',
  gen(R, tier) {
    const s = R.int(tier === 1 ? 3 : 5, 10);
    const a = R.int(1, s - 1);
    const b = s - a;
    const form = tier === 1 ? 'bond' : tier === 2 ? R.pick(['eq1', 'eq2', 'eq3']) : R.pick(['story', 'eq1', 'eq2', 'story']);
    if (form === 'story') {
      const p = person(R);
      const it = item(R, R.pick(['food', 'toys']));
      const v = R.int(0, 1);
      const prompt =
        v === 0
          ? `${p.name} had some ${it.many}. ${p.His} friend gave ${p.him} ${b} more. Now ${p.he} has ${s}. How many ${it.many} did ${p.name} have **at first**?`
          : `${p.name} has ${plural(a, it)}. How many more ${it.many} does ${p.he} need to have ${s}?`;
      const ans = v === 0 ? a : b;
      return {
        prompt,
        visuals: [bondV(s, v === 0 ? ['?', b] : [a, '?'])],
        input: 'number',
        answer: ans,
        hint: `The whole is ${s}. One part is ${v === 0 ? b : a}. Find the missing part.`,
        explain: `${v === 0 ? `? + ${b} = ${s}` : `${a} + ? = ${s}`}. ${s} − ${v === 0 ? b : a} = ${ans}. The answer is ${ans}.`
      };
    }
    let prompt;
    let ans;
    if (form === 'bond' || form === 'eq1') {
      prompt = `${a} + ? = ${s}`;
      ans = b;
    } else if (form === 'eq2') {
      prompt = `? + ${b} = ${s}`;
      ans = a;
    } else {
      prompt = `${s} = ${a} + ?`;
      ans = b;
    }
    const known = s - ans;
    return fact(prompt, ans, `Count on from ${known} until you reach ${s}.`, `${known} + ${ans} = ${s}, so the missing number is ${ans}.`, form === 'bond' ? [bondV(s, [known, '?'])] : []);
  }
};

const addStory10 = {
  id: 'p1.add.story10',
  level: 'P1',
  strand: 'addsub',
  unit: 3,
  title: 'Adding word problems',
  vi: 'Toán có lời văn: phép cộng trong phạm vi 10',
  icon: '📖',
  tip: 'Đọc to cùng con, hỏi "Có thêm vào (more), gộp lại (altogether / in all) hay bớt đi?". Cho con vẽ hình tròn nhỏ thay cho đồ vật.',
  gen(R, tier) {
    if (tier === 3 && R.chance(0.35)) {
      const fruits = R.sample([['apples', '🍎'], ['pears', '🍐'], ['oranges', '🍊'], ['bananas', '🍌'], ['mangoes', '🥭']], 3);
      const a = R.int(1, 4);
      const b = R.int(1, 4);
      const c = R.int(1, Math.max(1, 10 - a - b));
      const who = R.pick(['Mum', 'Dad', 'Grandma', 'Auntie Lin']);
      return {
        prompt: `${who} bought ${a} ${fruits[0][0]}, ${b} ${fruits[1][0]} and ${c} ${fruits[2][0]}. How many fruits did ${who} buy **altogether**?`.replace(/\b1 (apples|pears|oranges|bananas|mangoes)\b/g, (m0, f) => `1 ${f === 'mangoes' ? 'mango' : f.slice(0, -1)}`),
        input: 'number',
        answer: a + b + c,
        hint: 'Add two numbers first, then add the third number.',
        explain: `${a} + ${b} + ${c} = ${a + b + c}. ${who} bought ${a + b + c} fruits.`
      };
    }
    const kind = R.pick(['total', 'increase']);
    const maxT = tier === 1 ? 6 : 10;
    const lo = tier === 1 ? 1 : 2;
    const x = R.int(lo, maxT - lo);
    const y = R.int(lo, maxT - x);
    const s = oneStep(R, kind, x, y);
    const showPic = tier === 1 || (tier === 2 && R.chance(0.6));
    return {
      prompt: s.prompt,
      visuals: showPic ? [{ type: 'objects', op: '+', groups: [{ emoji: s.e1, count: x }, { emoji: s.e2, count: y }] }] : [],
      input: 'number',
      answer: s.answer,
      hint: s.hint,
      explain: s.explain
    };
  }
};

// ================================================================== P1 unit 4: subtraction within 10
const subFacts10 = {
  id: 'p1.sub.facts10',
  level: 'P1',
  strand: 'addsub',
  unit: 4,
  title: 'Subtract within 10',
  vi: 'Trừ nhanh trong phạm vi 10',
  icon: '➖',
  sprint: true,
  tip: 'Dùng phép cộng để trừ: 9 − 4 = ? → nghĩ "4 + ? = 9". Con thuộc number bond thì trừ rất nhanh.',
  gen(R, tier) {
    if (tier === 3 && R.chance(0.45)) {
      const a = R.int(3, 10);
      const b = R.int(1, a - 1);
      const c = a - b;
      const form = R.pick(['a-?', '?-b', '10-?']);
      if (form === 'a-?') return fact(`${a} − ? = ${c}`, b, `Think: ${c} + ? = ${a}.`, `${a} − ${b} = ${c}, so the missing number is ${b}.`);
      if (form === '?-b') return fact(`? − ${b} = ${c}`, a, `Put the parts back together: ${c} + ${b}.`, `${c} + ${b} = ${a}. So ${a} − ${b} = ${c}.`);
      const k = R.int(1, 9);
      return fact(`10 − ? = ${10 - k}`, k, `Which number goes with ${10 - k} to make 10?`, `10 − ${k} = ${10 - k}. The missing number is ${k}.`);
    }
    const max = tier === 1 ? 6 : 10;
    const a = R.int(2, max);
    const b = R.int(1, a - (tier === 1 ? 1 : 0));
    return fact(
      `${a} − ${b} = ?`,
      a - b,
      `Count back ${b} from ${a}, or think: ${b} + ? = ${a}.`,
      `${a} − ${b} = ${a - b}.`,
      tier === 1 ? [{ type: 'tenframe', a, cross: b }] : []
    );
  }
};

const subTakeAway = {
  id: 'p1.sub.takeaway',
  level: 'P1',
  strand: 'addsub',
  unit: 4,
  title: 'Take away and count back',
  vi: 'Bớt đi và đếm lùi trên tia số',
  icon: '🍪',
  tip: 'Hai cách trừ: gạch bớt (cross out) rồi đếm phần còn lại, hoặc đếm lùi (count back) trên tia số. Lỗi hay gặp: đếm cả số bắt đầu khi đếm lùi.',
  gen(R, tier) {
    const a = R.int(tier === 1 ? 3 : 5, 10);
    const b = R.int(1, Math.min(tier === 1 ? 3 : 5, a - 1));
    const c = a - b;
    const form = tier === 1 ? R.pick(['cross', 'cross', 'line']) : tier === 2 ? R.pick(['cross', 'line', 'line']) : R.pick(['line', 'words', 'words']);
    if (form === 'cross') {
      const it = item(R);
      return {
        prompt: R.pick([`Cross out ${b}. ${a} − ${b} = ?`, `There are ${plural(a, it)}. ${b} ${b === 1 ? 'is' : 'are'} taken away. How many ${it.many} are left?`]),
        speak: undefined,
        visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: a, cross: b }] }],
        input: 'number',
        answer: c,
        hint: 'Count only the ones that are NOT crossed out.',
        explain: `${a} take away ${b} leaves ${c}. ${a} − ${b} = ${c}.`
      };
    }
    if (form === 'line') {
      const jumps = Array.from({ length: b }, (_, i) => ({ from: a - i, to: a - i - 1, text: '−1' }));
      return {
        prompt: tier === 1 ? `Count back ${b} from ${a}. Where do you land?` : `Use the number line. ${a} − ${b} = ?`,
        visuals: [{ type: 'numberline', min: 0, max: 10, marks: [{ at: a, color: 'orange' }], jumps: tier === 1 ? jumps : [], hide: [c] }],
        input: 'number',
        answer: c,
        hint: `Start at ${a}. Jump back ${b} time${b === 1 ? '' : 's'}.`,
        explain: `Count back ${b} from ${a}: ${Array.from({ length: b }, (_, i) => a - i - 1).join(', ')}. ${a} − ${b} = ${c}.`
      };
    }
    return {
      prompt: R.pick([`Count back ${b} from ${a}. What number do you get?`, `What is ${b} less than ${a}?`, `Take away ${b} from ${a}. What is left?`]),
      input: 'number',
      answer: c,
      hint: `Say ${a}, then count back ${b}.`,
      explain: `${a} − ${b} = ${c}.`
    };
  }
};

const subCompare = {
  id: 'p1.sub.compare',
  level: 'P1',
  strand: 'addsub',
  unit: 4,
  title: 'How many more? How many fewer?',
  vi: 'So sánh: nhiều hơn / ít hơn bao nhiêu',
  icon: '⚖️',
  tip: '"How many more" KHÔNG phải phép cộng! Ghép đôi từng hình của 2 hàng, phần thừa ra chính là "difference" (hiệu). Hỏi con: "Who has more? How many more?"',
  gen(R, tier) {
    const big = R.int(tier === 1 ? 3 : 4, 10);
    const small = R.int(1, big - 1);
    const d = big - small;
    if (tier === 3 && R.chance(0.5)) {
      const v = R.int(0, 2);
      const prompt = v === 0 ? `What is the **difference** between ${big} and ${small}?` : v === 1 ? `How many more is ${big} than ${small}?` : `${small} is how many less than ${big}?`;
      return {
        prompt,
        input: 'number',
        answer: d,
        hint: 'Difference = bigger number − smaller number.',
        explain: `${big} − ${small} = ${d}.`
      };
    }
    const s = oneStep(R, 'diffMore', big, small);
    const showPic = tier < 3;
    return {
      prompt: s.prompt,
      visuals: showPic ? [{ type: 'objects', stack: true, groups: [{ emoji: s.e1, count: big, label: s.names[0] }, { emoji: s.e2, count: small, label: s.names[1] }] }] : [],
      input: 'number',
      answer: d,
      hint: showPic ? 'Match the two rows one to one. Count the ones with no partner.' : s.hint,
      explain: s.explain
    };
  }
};

const subMissing = {
  id: 'p1.sub.missing',
  level: 'P1',
  strand: 'addsub',
  unit: 4,
  title: 'Missing numbers in subtracting',
  vi: 'Tìm số còn thiếu trong phép trừ',
  icon: '🕵️',
  tip: 'Với "9 − ? = 4" hỏi: "9 là whole, 4 là một part, part kia là mấy?". Vẽ number bond giúp con thấy ngay.',
  gen(R, tier) {
    const a = R.int(tier === 1 ? 4 : 5, 10);
    const b = R.int(1, a - 1);
    const c = a - b;
    const form = tier === 1 ? R.pick(['a-?', 'a-?', '?-b']) : tier === 2 ? R.pick(['a-?', '?-b', 'c=a-?']) : R.pick(['storyGave', 'storyFirst', 'a-?', '?-b']);
    if (form === 'storyGave' || form === 'storyFirst') {
      const p = person(R);
      const it = item(R, R.pick(['food', 'toys']));
      if (form === 'storyGave') {
        return {
          prompt: `${p.name} had ${plural(a, it)}. ${p.He} gave some to ${p.his} sister. Now ${p.he} has ${c} left. How many ${it.many} did ${p.he} give away?`,
          input: 'number',
          answer: b,
          hint: `Whole = ${a}. The part left = ${c}. Find the other part.`,
          explain: `${a} − ? = ${c}. ${a} − ${c} = ${b}. ${p.name} gave away ${b}.`
        };
      }
      return {
        prompt: `${p.name} had some ${it.many}. ${p.He} ate ${b} of them and had ${c} left. How many ${it.many} did ${p.he} have **at first**?`,
        input: 'number',
        answer: a,
        hint: 'Work backwards: put the eaten ones back with the ones left.',
        explain: `${c} + ${b} = ${a}. ${p.name} had ${a} ${it.many} at first.`
      };
    }
    let prompt;
    let ans;
    let vis;
    if (form === 'a-?') {
      prompt = `${a} − ? = ${c}`;
      ans = b;
      vis = bondV(a, ['?', c], R.pick(DIRS));
    } else if (form === '?-b') {
      prompt = `? − ${b} = ${c}`;
      ans = a;
      vis = bondV('?', [b, c], R.pick(DIRS));
    } else {
      prompt = `${c} = ${a} − ?`;
      ans = b;
      vis = bondV(a, [c, '?'], R.pick(DIRS));
    }
    return fact(prompt, ans, form === '?-b' ? `What number take away ${b} leaves ${c}? Add ${c} and ${b}.` : `${a} is the whole and ${c} is one part. Find the other part.`, `${a} − ${b} = ${c}. The missing number is ${ans}.`, tier === 1 ? [vis] : []);
  }
};

const subFamily = {
  id: 'p1.sub.family',
  level: 'P1',
  strand: 'addsub',
  unit: 4,
  title: 'Fact families',
  vi: 'Họ phép tính (3 + 4 = 7, 7 − 4 = 3…)',
  icon: '👨‍👩‍👧',
  tip: 'Ba số 3, 4, 7 tạo thành 4 phép tính: 3 + 4 = 7, 4 + 3 = 7, 7 − 3 = 4, 7 − 4 = 3. Hiểu điều này giúp con dùng phép cộng để làm phép trừ.',
  gen(R, tier) {
    const whole = R.int(tier === 1 ? 4 : 5, 10);
    let a = R.int(1, whole - 1);
    if (a * 2 === whole) a = a === 1 ? 2 : a - 1;
    const b = whole - a;
    const family = [`${a} + ${b} = ${whole}`, `${b} + ${a} = ${whole}`, `${whole} − ${a} = ${b}`, `${whole} − ${b} = ${a}`];
    const form = tier === 1 ? 'complete' : tier === 2 ? R.pick(['complete', 'belongs']) : R.pick(['notBelong', 'belongs', 'complete']);
    if (form === 'complete') {
      const v = R.int(0, 2);
      if (v === 0) return fact(`${a} + ${b} = ${whole}. So ${whole} − ${b} = ?`, a, `Use the addition fact you already know.`, `${a} + ${b} = ${whole}, so ${whole} − ${b} = ${a}.`, [bondV(whole, [a, b])]);
      if (v === 1) return fact(`${whole} − ${a} = ${b}. So ${a} + ? = ${whole}`, b, `The same three numbers are in the family: ${a}, ${b} and ${whole}.`, `${a} + ${b} = ${whole}. The missing number is ${b}.`, [bondV(whole, [a, b])]);
      return fact(`${a} + ${b} = ${whole}. So ${whole} − ? = ${b}`, a, `The family has ${a}, ${b} and ${whole}.`, `${whole} − ${a} = ${b}. The missing number is ${a}.`, [bondV(whole, [a, b])]);
    }
    const outsiders = [`${whole} − ${a} = ${b + 1}`, `${a} + ${whole} = ${a + whole}`, `${whole} + ${b} = ${whole + b}`, `${a} + ${b} = ${whole + 1}`];
    if (a !== 2 * b && b !== 2 * a) outsiders.push(`${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)}`);
    if (form === 'belongs') {
      const correct = R.pick(family.slice(2));
      return {
        prompt: `${a}, ${b} and ${whole} make a **fact family**. Which number sentence belongs to this family?`,
        visuals: [bondV(whole, [a, b])],
        input: 'choice',
        answer: correct,
        choices: textChoices(R, correct, outsiders, 4),
        hint: `A family sentence uses only ${a}, ${b} and ${whole} — and it must be true.`,
        explain: `${correct} is true and uses only ${a}, ${b} and ${whole}. The whole family: ${family.join(', ')}.`
      };
    }
    const odd = R.pick(outsiders);
    return {
      prompt: `Which number sentence does **not** belong to the fact family of ${a}, ${b} and ${whole}?`,
      input: 'choice',
      answer: odd,
      choices: R.shuffle([...R.sample(family, 3), odd]).map((v) => ({ value: v, label: v })),
      hint: `Check each sentence: does it use only ${a}, ${b} and ${whole}, and is it true?`,
      explain: `${odd} does not belong. The fact family is: ${family.join(', ')}.`
    };
  }
};

const subStory10 = {
  id: 'p1.sub.story10',
  level: 'P1',
  strand: 'addsub',
  unit: 4,
  title: 'Subtracting word problems',
  vi: 'Toán có lời văn: phép trừ trong phạm vi 10',
  icon: '📕',
  tip: 'Có 3 kiểu bài trừ: bớt đi (left), tìm phần còn lại (the rest), so sánh (how many more/fewer). Cho con kể lại câu chuyện và vẽ sơ đồ trước khi tính.',
  gen(R, tier) {
    const kinds = tier === 1 ? ['decrease'] : tier === 2 ? ['decrease', 'part', 'diffMore'] : ['decrease', 'part', 'diffMore', 'findFewer'];
    const kind = R.pick(kinds);
    const x = R.int(tier === 1 ? 3 : 4, 10);
    const y = R.int(1, x - 1);
    const s = oneStep(R, kind, x, y);
    let visuals = [];
    if (tier < 3) {
      if (kind === 'decrease') visuals = [{ type: 'objects', groups: [{ emoji: s.e1, count: x, cross: y }] }];
      else if (kind === 'part') visuals = [bondV(x, [y, '?'])];
      else if (kind === 'diffMore') visuals = [{ type: 'objects', stack: true, groups: [{ emoji: s.e1, count: x, label: s.names[0] }, { emoji: s.e2, count: y, label: s.names[1] }] }];
    } else if (kind === 'findFewer') visuals = [s.model];
    return { prompt: s.prompt, visuals, input: 'number', answer: s.answer, hint: s.hint, explain: s.explain };
  }
};

// ================================================================== P1 unit 8: within 20
const bondWithin20 = {
  id: 'p1.bond.within20',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Number bonds to 20',
  vi: 'Number bond trong phạm vi 20',
  icon: '🔗',
  tip: 'Số 11–19 luôn tách được thành "10 và mấy" (14 = 10 + 4). Đây là bước đệm cho cách tính "make 10" và "subtract from 10".',
  gen(R, tier) {
    const dir = R.pick(DIRS);
    if (tier === 1) {
      const k = R.int(1, 9);
      const n = 10 + k;
      const form = R.int(0, 2);
      if (form === 0) return fact(`10 + ${k} = ?`, n, '1 ten and some ones.', `10 and ${k} make ${n}.`, [bondV('?', [10, k], dir)]);
      if (form === 1) return { prompt: `${n} is made up of 10 and **?**`, visuals: [bondV(n, [10, '?'], dir)], input: 'number', answer: k, hint: `${n} has 1 ten and some ones. Look at the ones digit.`, explain: `${n} = 10 + ${k}.` };
      return { prompt: 'Complete the number bond.', visuals: [bondV(n, ['?', k], dir)], input: 'number', answer: 10, hint: `Which number goes with ${k} to make ${n}?`, explain: `${n} = 10 + ${k}. The missing part is 10.` };
    }
    if (tier === 2) {
      const n = R.int(11, 18);
      const a = R.int(n - 9, 9);
      const b = n - a;
      const missFirst = R.chance(0.5);
      if (R.chance(0.5)) return { prompt: 'What is the missing part?', visuals: [bondV(n, missFirst ? ['?', b] : [a, '?'], dir)], input: 'number', answer: missFirst ? a : b, hint: `Which number goes with ${missFirst ? b : a} to make ${n}?`, explain: `${a} + ${b} = ${n}. The missing part is ${missFirst ? a : b}.` };
      return fact(missFirst ? `${n} = ? + ${b}` : `${n} = ${a} + ?`, missFirst ? a : b, `Count on from ${missFirst ? b : a} to ${n}.`, `${a} + ${b} = ${n}.`);
    }
    const n = R.int(12, 20);
    const x = R.int(2, Math.min(9, n - 3));
    const y = R.int(1, Math.min(9, n - x - 1));
    const z = n - x - y;
    if (z <= 0 || z > 10 || R.chance(0.4)) {
      const k = R.int(1, 9);
      const a = R.int(1, Math.min(9, 19 - k - 1));
      const m = 10 + k;
      if (m - a > 0) return { prompt: `${m} is made up of ${a} and **?**`, input: 'number', answer: m - a, hint: `${m} − ${a} = ?`, explain: `${a} + ${m - a} = ${m}. The missing part is ${m - a}.` };
    }
    return {
      prompt: `${n} is split into **3 parts**. What is the missing part?`,
      visuals: [bondV(n, [x, y, '?'], R.pick(['down', 'up']))],
      input: 'number',
      answer: z,
      hint: `Add the two parts you know first: ${x} + ${y}.`,
      explain: `${x} + ${y} = ${x + y}. ${n} − ${x + y} = ${z}. The missing part is ${z}.`
    };
  }
};

const addMake10 = {
  id: 'p1.add.make10',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Make 10 to add',
  vi: 'Cộng qua 10 bằng cách "tạo 10" (make 10)',
  icon: '🧱',
  tip: 'Cách Singapore dạy 8 + 5: tách 5 thành 2 và 3, 8 + 2 = 10, 10 + 3 = 13. Cho con nói to từng bước. Đây là kỹ năng then chốt của cả P1.',
  gen(R, tier) {
    const a = R.int(tier === 1 ? 8 : 6, 9);
    const need = 10 - a;
    const b = R.int(need + 1, 9);
    const rest = b - need;
    const sum = a + b;
    const steps = `${a} + ${need} = 10, then 10 + ${rest} = ${sum}`;
    if (tier === 1) {
      if (R.chance(0.5)) {
        return {
          prompt: `Make 10 first!\n${a} + ${b} = ${a} + ${need} + ?`,
          speak: `Make 10 first! ${a} plus ${b} equals ${a} plus ${need} plus what number?`,
          visuals: [bondV(b, [need, '?'])],
          input: 'number',
          answer: rest,
          hint: `Split ${b} into ${need} and another part.`,
          explain: `${b} = ${need} + ${rest}. So ${a} + ${b} = ${a} + ${need} + ${rest}. ${steps}.`
        };
      }
      return fact(`${a} + ${b} = 10 + ?`, rest, `${a} needs ${need} to make 10. What is left of ${b}?`, `${a} + ${need} = 10. ${b} − ${need} = ${rest}. So ${a} + ${b} = 10 + ${rest} = ${sum}.`, [bondV(b, [need, '?'])]);
    }
    if (tier === 3 && R.chance(0.45)) {
      const correct = `${a} + ${need} + ${rest}`;
      const cands = [`${a} + ${need} + ${b}`, `${a} + ${need + 1} + ${rest}`, `${a} + ${need} + ${rest + 1}`, `${a - 1} + ${need} + ${rest}`].filter((s) => s !== correct);
      return {
        prompt: `Which shows the **make 10** way to work out ${a} + ${b}?`,
        speak: `Which shows the make 10 way to work out ${a} plus ${b}?`,
        input: 'choice',
        answer: correct,
        choices: textChoices(R, correct, cands, 4),
        hint: `${a} needs ${need} more to make 10. Split ${b} into ${need} and the rest.`,
        explain: `${b} = ${need} + ${rest}, so ${a} + ${b} = ${correct}: ${steps}.`
      };
    }
    const swap = R.chance(0.35);
    return fact(
      swap ? `${b} + ${a} = ?` : `${a} + ${b} = ?`,
      sum,
      `Make 10 first: ${a} needs ${need} more.`,
      `Split ${b} into ${need} and ${rest}. ${steps}.`,
      tier === 2 && R.chance(0.6) ? [bondV(b, [need, rest])] : []
    );
  }
};

const subFrom10 = {
  id: 'p1.sub.from10',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Subtract from 10',
  vi: 'Trừ qua 10 bằng cách "trừ từ 10"',
  icon: '🧮',
  tip: 'Với 14 − 6: tách 14 thành 10 và 4, lấy 10 − 6 = 4, rồi 4 + 4 = 8. Cách khác: trừ dần về 10 (14 − 4 = 10, 10 − 2 = 8). Cho con chọn cách mình thích.',
  gen(R, tier) {
    const ones = R.int(1, 8);
    const n = 10 + ones;
    const s = R.int(ones + 1, 9);
    const ans = n - s;
    const rest = 10 - s;
    const steps = `10 − ${s} = ${rest}, then ${rest} + ${ones} = ${ans}`;
    if (tier === 1) {
      if (R.chance(0.5)) {
        return {
          prompt: `${n} − ${s}: split ${n} into 10 and ${ones}.\nFirst, 10 − ${s} = ?`,
          speak: `${n} minus ${s}. Split ${n} into 10 and ${ones}. First, 10 minus ${s} equals what number?`,
          visuals: [bondV(n, [10, ones])],
          input: 'number',
          answer: rest,
          hint: `Take ${s} away from the 10.`,
          explain: `10 − ${s} = ${rest}. Then ${rest} + ${ones} = ${ans}, so ${n} − ${s} = ${ans}.`
        };
      }
      return {
        prompt: `${n} − ${s}: 10 − ${s} = ${rest}.\nThen ${rest} + ${ones} = ?`,
        speak: `${n} minus ${s}. 10 minus ${s} equals ${rest}. Then ${rest} plus ${ones} equals what number?`,
        visuals: [bondV(n, [10, ones])],
        input: 'number',
        answer: ans,
        hint: `Add back the ${ones} ones that were not used.`,
        explain: `${steps}. So ${n} − ${s} = ${ans}.`
      };
    }
    if (tier === 3 && R.chance(0.5)) {
      if (R.chance(0.5)) {
        const correct = `10 − ${s} = ${rest}, ${rest} + ${ones} = ${ans}`;
        const wrong = [`10 − ${s} = ${rest}, ${rest} − ${ones} = ${Math.abs(rest - ones)}`, `${n} − ${ones} = 10, 10 + ${s - ones} = ${10 + s - ones}`, `10 + ${s} = ${10 + s}, ${10 + s} − ${ones} = ${10 + s - ones}`].filter((w) => w !== correct);
        return {
          prompt: `Which shows the **subtract from 10** way to work out ${n} − ${s}?`,
          speak: `Which shows the subtract from 10 way to work out ${n} minus ${s}?`,
          input: 'choice',
          answer: correct,
          choices: textChoices(R, correct, wrong, 4),
          hint: `Split ${n} into 10 and ${ones}. Take ${s} from the 10.`,
          explain: `${steps}. So ${n} − ${s} = ${ans}.`
        };
      }
      return {
        prompt: `Count back to 10 first!\n${n} − ${s}: take away ${ones} to get 10. Then take away **?** more.`,
        speak: `Count back to 10 first! ${n} minus ${s}. Take away ${ones} to get 10. Then take away how many more?`,
        input: 'number',
        answer: s - ones,
        hint: `${s} = ${ones} + ?`,
        explain: `${s} = ${ones} + ${s - ones}. ${n} − ${ones} = 10, then 10 − ${s - ones} = ${ans}.`
      };
    }
    return fact(`${n} − ${s} = ?`, ans, `Split ${n} into 10 and ${ones}. Subtract ${s} from 10 first.`, `${steps}. So ${n} − ${s} = ${ans}.`, tier === 2 && R.chance(0.6) ? [bondV(n, [10, ones])] : []);
  }
};

const addFacts20 = {
  id: 'p1.add.facts20',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Add within 20',
  vi: 'Cộng nhanh trong phạm vi 20',
  icon: '⚡',
  sprint: true,
  tip: 'Mục tiêu P1: cộng trong phạm vi 20 không cần đếm ngón tay. Nếu con chậm, quay lại luyện "ten-friends" và "make 10".',
  gen(R, tier) {
    if (tier === 1) {
      if (R.chance(0.4)) {
        const k = R.int(1, 9);
        return R.chance(0.5) ? fact(`10 + ${k} = ?`, 10 + k, '1 ten and some ones.', `10 + ${k} = ${10 + k}.`) : fact(`${k} + 10 = ?`, 10 + k, '1 ten and some ones.', `${k} + 10 = ${10 + k}.`);
      }
      const o = R.int(1, 8);
      const b = R.int(1, 9 - o);
      return fact(`${10 + o} + ${b} = ?`, 10 + o + b, `Add the ones: ${o} + ${b}. Keep the ten.`, `${o} + ${b} = ${o + b}, so ${10 + o} + ${b} = ${10 + o + b}.`);
    }
    if (tier === 3 && R.chance(0.35)) {
      const s = R.int(11, 18);
      const a = R.int(s - 9, 9);
      const b = s - a;
      return R.chance(0.5)
        ? fact(`${a} + ? = ${s}`, b, `Count on from ${a} to ${s}, or think ${s} − ${a}.`, `${a} + ${b} = ${s}. The missing number is ${b}.`)
        : fact(`? + ${b} = ${s}`, a, `Think ${s} − ${b}.`, `${a} + ${b} = ${s}. The missing number is ${a}.`);
    }
    const a = R.int(2, 9);
    const b = R.int(Math.max(2, 11 - a), 9);
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    const need = 10 - big;
    return fact(`${a} + ${b} = ?`, a + b, `Make 10: ${big} needs ${need} more.`, `${big} + ${need} = 10, 10 + ${small - need} = ${a + b}. So ${a} + ${b} = ${a + b}.`);
  }
};

const subFacts20 = {
  id: 'p1.sub.facts20',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Subtract within 20',
  vi: 'Trừ nhanh trong phạm vi 20',
  icon: '⚡',
  sprint: true,
  tip: 'Với phép trừ qua 10 (13 − 5), con có thể "trừ từ 10" hoặc nghĩ phép cộng "5 + ? = 13". Luyện mỗi ngày vài phút sẽ nhanh dần.',
  gen(R, tier) {
    if (tier === 1) {
      const form = R.int(0, 2);
      const o = R.int(1, 9);
      const n = 10 + o;
      if (form === 0) {
        const b = R.int(1, o);
        return fact(`${n} − ${b} = ?`, n - b, `Subtract the ones: ${o} − ${b}. Keep the ten.`, `${o} − ${b} = ${o - b}, so ${n} − ${b} = ${n - b}.`);
      }
      if (form === 1) return fact(`${n} − 10 = ?`, o, 'Take away the ten. What is left?', `${n} = 10 + ${o}, so ${n} − 10 = ${o}.`);
      return fact(`${n} − ${o} = ?`, 10, 'Take away all the ones.', `${n} − ${o} = 10.`);
    }
    const o = R.int(1, 8);
    const n = 10 + o;
    const s = R.int(o + 1, 9);
    const d = n - s;
    if (tier === 3 && R.chance(0.4)) {
      return R.chance(0.5)
        ? fact(`${n} − ? = ${d}`, s, `Think: ${d} + ? = ${n}.`, `${n} − ${s} = ${d}. The missing number is ${s}.`)
        : fact(`? − ${s} = ${d}`, n, `Put the parts back together: ${d} + ${s}.`, `${d} + ${s} = ${n}. So ${n} − ${s} = ${d}.`);
    }
    return fact(`${n} − ${s} = ?`, d, `Subtract from 10: 10 − ${s}, then add ${o}.`, `10 − ${s} = ${10 - s}, ${10 - s} + ${o} = ${d}. So ${n} − ${s} = ${d}.`);
  }
};

const addDoubles = {
  id: 'p1.add.doubles',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Doubles and near doubles',
  vi: 'Cộng số giống nhau (doubles) và gần giống',
  icon: '👯',
  sprint: true,
  tip: 'Thuộc "doubles" (6 + 6 = 12) giúp tính nhanh "near doubles": 6 + 7 = 6 + 6 + 1 = 13. Gợi ý: hai bàn tay, hộp trứng 2 hàng 6 quả…',
  gen(R, tier) {
    if (tier === 3) {
      const n = R.int(3, 9);
      const up = R.chance(0.6);
      const m = up ? n + 1 : n - 1;
      const swap = R.chance(0.5);
      return fact(swap ? `${m} + ${n} = ?` : `${n} + ${m} = ?`, n + m, `Use a double you know: ${n} + ${n} = ${n * 2}.`, `${n} + ${n} = ${n * 2}, ${up ? 'plus' : 'minus'} 1 is ${n + m}. So ${n} + ${m} = ${n + m}.`);
    }
    const n = tier === 1 ? R.int(1, 5) : R.int(5, 10);
    const f = R.int(0, 9);
    if (f < 3) return fact(`Double ${n} = ?`, n * 2, `Double means add the number to itself: ${n} + ${n}.`, `Double ${n} is ${n} + ${n} = ${n * 2}.`);
    if (f < 5) return fact(`${n * 2} = ${n} + ?`, n, `${n * 2} is a double. Which number added to itself makes ${n * 2}?`, `${n} + ${n} = ${n * 2}. The missing number is ${n}.`);
    return fact(`${n} + ${n} = ?`, n * 2, tier === 1 ? 'Show the same number on both hands.' : 'It is a double. Do you remember it?', `${n} + ${n} = ${n * 2}.`, tier === 1 ? [{ type: 'tenframe', a: n, b: n }] : []);
  }
};

const addThree = {
  id: 'p1.add.three',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Add three numbers',
  vi: 'Cộng ba số (tìm cặp "ten-friends" trước)',
  icon: '3️⃣',
  tip: 'Khi cộng 3 số, tìm 2 số cộng lại bằng 10 trước: 4 + 7 + 6 → 4 + 6 = 10, 10 + 7 = 17. Thứ tự cộng không làm thay đổi kết quả.',
  gen(R, tier) {
    if (tier === 1) {
      const a = R.int(1, 5);
      const b = R.int(1, 4);
      const c = R.int(1, Math.max(1, 10 - a - b));
      return fact(`${a} + ${b} + ${c} = ?`, a + b + c, 'Add the first two numbers, then add the third.', `${a} + ${b} = ${a + b}, ${a + b} + ${c} = ${a + b + c}.`);
    }
    let x = R.int(1, 9);
    if (x === 5) x = R.pick([4, 6]);
    const y = 10 - x;
    const z = R.intExcept(1, 9, [x, y]);
    const order = R.shuffle([x, y, z]);
    if (tier === 3 && R.chance(0.35)) {
      const correct = `${x} + ${y}`;
      const pool = [`${x} + ${z}`, `${y} + ${z}`];
      return {
        prompt: `To work out ${order.join(' + ')}, which two numbers should you add **first** to make 10?`,
        speak: `To work out ${order.join(' plus ')}, which two numbers should you add first to make 10?`,
        input: 'choice',
        answer: correct,
        choices: R.shuffle([correct, ...pool]).map((v) => ({ value: v, label: v })),
        hint: 'Look for ten-friends: 1 & 9, 2 & 8, 3 & 7, 4 & 6.',
        explain: `${x} + ${y} = 10, then 10 + ${z} = ${10 + z}.`
      };
    }
    if (tier === 3 && R.chance(0.4)) {
      const who = R.pick(['Dad', 'Mum', 'Uncle Raj', 'Grandpa']);
      return {
        prompt: `At the hawker centre, ${who} bought ${order[0]} chicken satay, ${order[1]} beef satay and ${order[2]} mutton satay. How many sticks of satay did ${who} buy **in all**?`,
        input: 'number',
        answer: 10 + z,
        hint: 'Find two numbers that make 10 first.',
        explain: `${x} + ${y} = 10, then 10 + ${z} = ${10 + z}. ${who} bought ${10 + z} sticks of satay.`
      };
    }
    return fact(`${order.join(' + ')} = ?`, 10 + z, 'Look for two numbers that make 10 first.', `${x} + ${y} = 10, then 10 + ${z} = ${10 + z}.`);
  }
};

const wordWithin20 = {
  id: 'p1.word.within20',
  level: 'P1',
  strand: 'addsub',
  unit: 8,
  title: 'Word problems within 20',
  vi: 'Toán có lời văn trong phạm vi 20 (mô hình thanh)',
  icon: '📊',
  tip: 'Dạy con vẽ "bar model": một thanh chia 2 phần (part-whole) hoặc 2 thanh so sánh (comparison). Đừng dạy "thấy chữ more là cộng" — đọc kỹ ai nhiều hơn.',
  gen(R, tier) {
    const kinds = tier === 1 ? ['total', 'part', 'increase', 'decrease'] : tier === 2 ? ['diffMore', 'findMore', 'findFewer', 'part', 'decrease'] : ['reverseSmall', 'reverseBig', 'findMore', 'findFewer', 'diffMore', 'part'];
    const kind = R.pick(kinds);
    let x;
    let y;
    if (kind === 'total' || kind === 'increase' || kind === 'findMore' || kind === 'reverseBig') {
      x = R.int(3, 14);
      y = R.int(2, Math.min(9, 20 - x));
    } else {
      x = R.int(8, 20);
      y = R.int(2, Math.min(9, x - 2));
    }
    const s = oneStep(R, kind, x, y);
    const showModel = tier < 3 || R.chance(0.5);
    return { prompt: s.prompt, visuals: showModel ? [s.model] : [], input: 'number', answer: s.answer, hint: s.hint, explain: s.explain };
  }
};

// ================================================================== P1 unit 12: within 100
const addTens = {
  id: 'p1.add.tens',
  level: 'P1',
  strand: 'addsub',
  unit: 12,
  title: 'Add and subtract tens',
  vi: 'Cộng, trừ số tròn chục',
  icon: '🔟',
  sprint: true,
  tip: '30 + 40 nghĩ là "3 tens + 4 tens = 7 tens = 70". Với 56 + 20 chỉ thay đổi hàng chục: 5 tens + 2 tens = 7 tens → 76.',
  gen(R, tier) {
    if (tier === 1) {
      const a = R.int(1, 8);
      const b = R.int(1, 9 - a);
      if (R.chance(0.5)) return fact(`${a * 10} + ${b * 10} = ?`, (a + b) * 10, `${tensW(a)} + ${tensW(b)} = ? tens`, `${tensW(a)} + ${tensW(b)} = ${tensW(a + b)} = ${(a + b) * 10}.`);
      const big = a + b;
      return fact(`${big * 10} − ${b * 10} = ?`, a * 10, `${tensW(big)} − ${tensW(b)} = ? tens`, `${tensW(big)} − ${tensW(b)} = ${tensW(a)} = ${a * 10}.`);
    }
    if (tier === 2) {
      const n = R.int(11, 89);
      const t = n % 10 === 0 ? n / 10 : Math.floor(n / 10);
      if (R.chance(0.5)) {
        const k = R.int(1, Math.max(1, 9 - Math.floor(n / 10)));
        const ans = n + k * 10;
        if (ans <= 99) return fact(`${n} + ${k * 10} = ?`, ans, 'Only the tens change. Add the tens.', `${tensW(Math.floor(n / 10))} + ${tensW(k)} = ${tensW(Math.floor(ans / 10))}. ${n} + ${k * 10} = ${ans}.`);
      }
      const k = R.int(1, Math.max(1, t - 1));
      return fact(`${n} − ${k * 10} = ?`, n - k * 10, 'Only the tens change. Subtract the tens.', `${tensW(Math.floor(n / 10))} − ${tensW(k)} = ${tensW(Math.floor((n - k * 10) / 10))}. ${n} − ${k * 10} = ${n - k * 10}.`);
    }
    const form = R.int(0, 2);
    if (form === 0) {
      const k = R.int(1, 9);
      return fact(`100 − ${k * 10} = ?`, 100 - k * 10, '100 is 10 tens.', `10 tens − ${tensW(k)} = ${tensW(10 - k)} = ${100 - k * 10}.`);
    }
    if (form === 1) {
      const a = R.int(1, 9);
      return fact(`${a * 10} + ? = 100`, 100 - a * 10, 'Tens-friends of 100: 30 and 70, 40 and 60 …', `${a * 10} + ${100 - a * 10} = 100.`);
    }
    const n = R.int(21, 99);
    const k = R.int(1, Math.floor(n / 10) - 1 || 1);
    return R.chance(0.5) && n + k * 10 <= 100
      ? fact(`${n} + ${k * 10} = ?`, n + k * 10, 'Add the tens.', `${n} + ${k * 10} = ${n + k * 10}.`)
      : fact(`${n} − ${k * 10} = ?`, n - k * 10, 'Subtract the tens.', `${n} − ${k * 10} = ${n - k * 10}.`);
  }
};

const add2d = {
  id: 'p1.add.2digit',
  level: 'P1',
  strand: 'addsub',
  unit: 12,
  title: 'Add within 100',
  vi: 'Cộng có nhớ / không nhớ trong phạm vi 100',
  icon: '➕',
  tip: 'Đặt tính thẳng cột: hàng đơn vị (ones) thẳng hàng đơn vị. Cộng từ hàng đơn vị trước; nếu ≥ 10 thì "regroup" (nhớ 1 sang hàng chục).',
  gen(R, tier) {
    let a;
    let b;
    if (tier === 1) {
      if (R.chance(0.5)) [a, b] = pickAdd(R, [11, 89], [1, 9], (c) => c === 0, 99);
      else [a, b] = pickAdd(R, [10, 70], [10, 30], (c) => c === 0, 99);
    } else if (tier === 2) {
      if (R.chance(0.5)) [a, b] = pickAdd(R, [10, 80], [10, 80], (c) => c === 0, 99);
      else [a, b] = pickAdd(R, [11, 89], [2, 9], (c) => c === 1, 100);
    } else [a, b] = pickAdd(R, [15, 85], [12, 85], (c) => c >= 1, 100);
    const sum = a + b;
    const form = tier === 1 ? R.pick(['vert', 'horiz', 'blocks']) : R.pick(['vert', 'vert', 'horiz', 'sumOf', 'moreThan']);
    const explain = colAddExplain(a, b);
    if (form === 'vert') return { prompt: R.pick(['Add.', 'Work out the sum.', 'Find the answer.']), visuals: [vert([a, b], '+')], input: 'number', answer: sum, hint: ADD_HINT, explain };
    if (form === 'blocks') {
      return {
        prompt: `${a} + ${b} = ?`,
        speak: eqSpeak(`${a} + ${b} = ?`),
        visuals: [{ type: 'baseten', t: Math.floor(a / 10), o: a % 10 }, { type: 'baseten', t: Math.floor(b / 10), o: b % 10 }],
        input: 'number',
        answer: sum,
        hint: 'Count all the tens rods, then all the ones cubes.',
        explain
      };
    }
    if (form === 'sumOf') return { prompt: `What is the **sum** of ${a} and ${b}?`, input: 'number', answer: sum, hint: '"Sum" means add.', explain };
    if (form === 'moreThan') return { prompt: `What is ${b} **more than** ${a}?`, input: 'number', answer: sum, hint: `${b} more than ${a} means ${a} + ${b}.`, explain };
    return fact(`${a} + ${b} = ?`, sum, ADD_HINT, explain);
  }
};

const sub2d = {
  id: 'p1.sub.2digit',
  level: 'P1',
  strand: 'addsub',
  unit: 12,
  title: 'Subtract within 100',
  vi: 'Trừ có nhớ / không nhớ trong phạm vi 100',
  icon: '➖',
  tip: 'Trừ từ hàng đơn vị. Nếu số trên nhỏ hơn số dưới thì đổi 1 chục thành 10 đơn vị (regroup). Kiểm tra lại bằng phép cộng.',
  gen(R, tier) {
    let a;
    let b;
    if (tier === 1) {
      if (R.chance(0.5)) [a, b] = pickSub(R, [21, 99], [1, 9], (c) => c === 0, 1);
      else [a, b] = pickSub(R, [30, 99], [10, 60], (c) => c === 0, 5);
    } else if (tier === 2) {
      if (R.chance(0.5)) [a, b] = pickSub(R, [30, 99], [11, 60], (c) => c === 0, 5);
      else [a, b] = pickSub(R, [21, 99], [2, 9], (c) => c === 1, 3);
    } else if (R.chance(0.12)) {
      a = 100;
      b = R.int(11, 89);
    } else [a, b] = pickSub(R, [31, 99], [12, 79], (c) => c >= 1, 5);
    const d = a - b;
    const form = tier === 1 ? R.pick(['vert', 'horiz', 'blocks']) : R.pick(['vert', 'vert', 'horiz', 'diff', 'from', 'less']);
    const explain = colSubExplain(a, b);
    if (form === 'vert') return { prompt: R.pick(['Subtract.', 'Work out the difference.', 'Find the answer.']), visuals: [vert([a, b], '−')], input: 'number', answer: d, hint: SUB_HINT, explain };
    if (form === 'blocks') {
      return {
        prompt: `${a} − ${b} = ?`,
        speak: eqSpeak(`${a} − ${b} = ?`),
        visuals: [{ type: 'baseten', t: Math.floor(a / 10), o: a % 10 }],
        input: 'number',
        answer: d,
        hint: `Take away ${Math.floor(b / 10)} tens and ${b % 10} ones from the blocks.`,
        explain
      };
    }
    if (form === 'diff') return { prompt: `What is the **difference** between ${a} and ${b}?`, input: 'number', answer: d, hint: 'Difference means bigger number − smaller number.', explain };
    if (form === 'from') return { prompt: `**Subtract** ${b} from ${a}.`, input: 'number', answer: d, hint: `Start with ${a}, take away ${b}.`, explain };
    if (form === 'less') return { prompt: `What is ${b} **less than** ${a}?`, input: 'number', answer: d, hint: `${b} less than ${a} means ${a} − ${b}.`, explain };
    return fact(`${a} − ${b} = ?`, d, SUB_HINT, explain);
  }
};

const wordWithin100 = {
  id: 'p1.word.within100',
  level: 'P1',
  strand: 'addsub',
  unit: 12,
  title: 'Word problems within 100',
  vi: 'Toán có lời văn trong phạm vi 100',
  icon: '📝',
  tip: 'Quy trình 4 bước: đọc – vẽ mô hình thanh – viết phép tính – trả lời bằng câu đầy đủ (kèm đơn vị). Luôn hỏi con "Does your answer make sense?"',
  gen(R, tier) {
    const kinds = tier === 1 ? ['total', 'increase', 'decrease', 'part'] : tier === 2 ? ['total', 'part', 'diffMore', 'findMore', 'findFewer'] : ['diffMore', 'findMore', 'findFewer', 'reverseSmall', 'reverseBig', 'part'];
    const kind = R.pick(kinds);
    const ok = tier === 1 ? (c) => c === 0 : () => true;
    let x;
    let y;
    if (kind === 'total' || kind === 'increase' || kind === 'findMore' || kind === 'reverseBig') [x, y] = pickAdd(R, [12, 75], [5, 45], ok, 100);
    else [x, y] = pickSub(R, [25, 99], [5, 60], tier === 1 ? (c) => c === 0 : () => true, 3);
    const s = oneStep(R, kind, x, y);
    const showModel = tier < 3 || R.chance(0.5);
    return { prompt: s.prompt, visuals: showModel ? [s.model] : [], input: 'number', answer: s.answer, hint: s.hint, explain: s.explain };
  }
};

// ================================================================== P2 unit 2: within 1000
const add3d = {
  id: 'p2.add.3digit',
  level: 'P2',
  strand: 'addsub',
  unit: 2,
  title: 'Add within 1000',
  vi: 'Cộng số có 3 chữ số (có nhớ)',
  icon: '➕',
  tip: 'Đặt tính thẳng cột theo hàng trăm – chục – đơn vị. Nhắc con ghi số nhớ nhỏ phía trên cột kế tiếp để không quên.',
  gen(R, tier) {
    let a;
    let b;
    if (tier === 1) [a, b] = pickAdd(R, [100, 899], [11, 399], (c) => c === 0, 999);
    else if (tier === 2) [a, b] = pickAdd(R, [100, 799], [100, 499], (c) => c === 1, 999);
    else [a, b] = pickAdd(R, [150, 799], [150, 799], (c) => c >= 2, 999);
    const sum = a + b;
    const explain = colAddExplain(a, b);
    const form = R.pick(['vert', 'vert', 'horiz', 'sumOf', 'moreThan']);
    if (form === 'vert') return { prompt: R.pick(['Add.', 'Work out the sum.']), visuals: [vert([a, b], '+')], input: 'number', answer: sum, hint: ADD_HINT, explain };
    if (form === 'sumOf') return { prompt: `Find the **sum** of ${a} and ${b}.`, input: 'number', answer: sum, hint: 'Sum means add. Line up the digits by place value.', explain };
    if (form === 'moreThan') return { prompt: `What number is ${b} **more than** ${a}?`, input: 'number', answer: sum, hint: `${b} more than ${a} means ${a} + ${b}.`, explain };
    return fact(`${a} + ${b} = ?`, sum, ADD_HINT, explain);
  }
};

const sub3d = {
  id: 'p2.sub.3digit',
  level: 'P2',
  strand: 'addsub',
  unit: 2,
  title: 'Subtract within 1000',
  vi: 'Trừ số có 3 chữ số (có nhớ, qua số 0)',
  icon: '➖',
  tip: 'Khó nhất là trừ qua số 0 (ví dụ 503 − 267): phải đổi 1 trăm thành 10 chục, rồi 1 chục thành 10 đơn vị. Cho con dùng que tính/khối để thấy.',
  gen(R, tier) {
    let a;
    let b;
    if (tier === 1) [a, b] = pickSub(R, [200, 999], [11, 499], (c) => c === 0, 10);
    else if (tier === 2) [a, b] = pickSub(R, [200, 999], [100, 699], (c) => c === 1, 10);
    else if (R.chance(0.5)) [a, b] = acrossZero3(R);
    else [a, b] = pickSub(R, [300, 999], [111, 799], (c) => c === 2, 10);
    const d = a - b;
    const explain = colSubExplain(a, b);
    const form = R.pick(['vert', 'vert', 'horiz', 'diff', 'from']);
    if (form === 'vert') return { prompt: R.pick(['Subtract.', 'Work out the difference.']), visuals: [vert([a, b], '−')], input: 'number', answer: d, hint: SUB_HINT, explain };
    if (form === 'diff') return { prompt: `Find the **difference** between ${a} and ${b}.`, input: 'number', answer: d, hint: 'Difference means the bigger number − the smaller number.', explain };
    if (form === 'from') return { prompt: `**Subtract** ${b} from ${a}.`, input: 'number', answer: d, hint: `Start with ${a}, then take away ${b}.`, explain };
    return fact(`${a} − ${b} = ?`, d, SUB_HINT, explain);
  }
};

const missingDigits = {
  id: 'p2.missing.digits',
  level: 'P2',
  strand: 'addsub',
  unit: 2,
  title: 'Missing digits',
  vi: 'Tìm chữ số bị che trong phép tính cột',
  icon: '🔎',
  tip: 'Làm từng cột từ hàng đơn vị, nhớ để ý số nhớ (regroup). Sau khi tìm được, cho con thay vào và tính lại để kiểm tra.',
  gen(R, tier) {
    const op = tier === 1 ? '+' : tier === 2 ? R.pick(['+', '+', '−']) : R.pick(['+', '−', '−']);
    let a;
    let b;
    if (op === '+') {
      if (tier === 1) [a, b] = pickAdd(R, [10, 89], [10, 89], (c) => c === 0, 99);
      else [a, b] = pickAdd(R, [100, 799], [10, 599], (c) => c >= 1, 999);
    } else if (tier === 2) [a, b] = pickSub(R, [100, 999], [10, 599], (c) => c >= 1, 10);
    else [a, b] = pickSub(R, [300, 999], [100, 799], (c) => c >= 1, 10);
    const c = op === '+' ? a + b : a - b;
    const rows = [String(a), String(b), String(c)];
    const which = R.int(0, 2);
    const s = rows[which];
    const pos = R.int(0, s.length - 1);
    const digit = Number(s[pos]);
    rows[which] = s.slice(0, pos) + '?' + s.slice(pos + 1);
    return {
      prompt: 'What is the **missing digit**?',
      speak: 'What is the missing digit?',
      visuals: [vert([rows[0], rows[1]], op, rows[2])],
      input: 'number',
      answer: digit,
      hint: 'Work one column at a time, starting from the ones. Remember any regrouping!',
      explain: `${a} ${op} ${b} = ${c}. The missing digit is ${digit}.`
    };
  }
};

const mental1000 = {
  id: 'p2.mental.1000',
  level: 'P2',
  strand: 'addsub',
  unit: 2,
  title: 'Mental maths to 1000',
  vi: 'Tính nhẩm: cộng trừ đơn vị, chục, trăm',
  icon: '🧠',
  sprint: true,
  tip: 'Tính nhẩm theo hàng: 345 + 200 chỉ đổi hàng trăm; 452 + 30 chỉ đổi hàng chục. Khi vượt qua chục/trăm (468 + 7) thì "make 10" như P1.',
  gen(R, tier) {
    const n = R.int(101, 899);
    const H = Math.floor(n / 100);
    const T = Math.floor(n / 10) % 10;
    const O = n % 10;
    if (tier === 1) {
      const form = R.int(0, 2);
      if (form === 0 && H <= 8) {
        const k = R.int(1, 9 - H);
        return fact(`${n} + ${k * 100} = ?`, n + k * 100, 'Only the hundreds change.', `${hundW(H)} + ${hundW(k)} = ${hundW(H + k)}. ${n} + ${k * 100} = ${n + k * 100}.`);
      }
      if (form === 1 && H >= 2) {
        const k = R.int(1, H - 1);
        return fact(`${n} − ${k * 100} = ?`, n - k * 100, 'Only the hundreds change.', `${n} − ${k * 100} = ${n - k * 100}.`);
      }
      if (O <= 8 && (O === 0 || R.chance(0.5))) {
        const k = R.int(1, 9 - O);
        return fact(`${n} + ${k} = ?`, n + k, 'Only the ones change.', `${n} + ${k} = ${n + k}.`);
      }
      const k = R.int(1, O);
      return fact(`${n} − ${k} = ?`, n - k, 'Only the ones change.', `${n} − ${k} = ${n - k}.`);
    }
    if (tier === 2) {
      const form = R.int(0, 3);
      if (form === 0 && T <= 8) {
        const k = R.int(1, 9 - T);
        return fact(`${n} + ${k * 10} = ?`, n + k * 10, 'Only the tens change.', `${tensW(T)} + ${tensW(k)} = ${tensW(T + k)}. ${n} + ${k * 10} = ${n + k * 10}.`);
      }
      if (form === 1 && T >= 1) {
        const k = R.int(1, T);
        return fact(`${n} − ${k * 10} = ?`, n - k * 10, 'Only the tens change.', `${n} − ${k * 10} = ${n - k * 10}.`);
      }
      if (form === 2 && O >= 2) {
        const k = R.int(10 - O, 9);
        return fact(`${n} + ${k} = ?`, n + k, `Make the next ten first: ${n} + ${10 - O} = ${n + 10 - O}.`, `${n} + ${10 - O} = ${n + 10 - O}, then + ${k - (10 - O)} = ${n + k}.`);
      }
      const k = R.int(O + 1, 9);
      return fact(`${n} − ${k} = ?`, n - k, `Subtract back to the ten first: ${n} − ${O} = ${n - O}.`, `${n} − ${O} = ${n - O}, then − ${k - O} = ${n - k}.`);
    }
    if (R.chance(0.5)) {
      const k = R.int(Math.max(1, 10 - T), 9);
      if (n + k * 10 <= 999) return fact(`${n} + ${k * 10} = ?`, n + k * 10, 'Add the tens. You will cross a hundred!', `${n} + ${k * 10} = ${n + k * 10}.`);
    }
    if (H >= 2 && T < 9) {
      const k = R.int(T + 1, 9);
      return fact(`${n} − ${k * 10} = ?`, n - k * 10, 'Subtract the tens. You will need to regroup a hundred.', `${n} − ${k * 10} = ${n - k * 10}.`);
    }
    const h = R.int(2, 9) * 100;
    const k = R.int(1, 9) * 10 + R.int(0, 1) * 5;
    return fact(`${h} − ${k} = ?`, h - k, `Think: ${k} + ? = ${h}.`, `${h} − ${k} = ${h - k}.`);
  }
};

const inverseCheck = {
  id: 'p2.check.inverse',
  level: 'P2',
  strand: 'addsub',
  unit: 2,
  title: 'Check with the inverse',
  vi: 'Kiểm tra bằng phép tính ngược',
  icon: '✅',
  tip: 'Cộng và trừ là phép ngược nhau: kiểm tra 532 − 178 = 354 bằng 354 + 178 = 532. Tập thói quen tự kiểm tra giúp giảm lỗi bất cẩn trong bài thi.',
  gen(R, tier) {
    const [a, b] = pickSub(R, [300, 999], [101, 599], (c) => c >= (tier === 1 ? 0 : 1), 20);
    const c = a - b;
    const p = person(R);
    const forms = tier === 1 ? ['whichSub', 'whichAdd'] : tier === 2 ? ['whichSub', 'whichAdd', 'missFirst', 'missAdd'] : ['isCorrect', 'missFirst', 'missMid', 'missAdd', 'whichSub'];
    const form = R.pick(forms);
    if (form === 'whichSub') {
      const correct = `${c} + ${b} = ${a}`;
      const wrong = [`${a} + ${b} = ${a + b}`, `${Math.max(c, b)} − ${Math.min(c, b)} = ${Math.abs(c - b)}`, `${a} + ${c} = ${a + c}`].filter((w) => w !== correct);
      return {
        prompt: `${p.name} worked out ${a} − ${b} = ${c}. Which number sentence can ${p.he} use to **check** ${p.his} answer?`,
        input: 'choice',
        answer: correct,
        choices: textChoices(R, correct, wrong, 4),
        hint: 'To check subtraction, add the answer and the number you took away.',
        explain: `${c} + ${b} = ${a}. We get back the number we started with, so the answer is correct.`
      };
    }
    if (form === 'whichAdd') {
      const s = a;
      const x = b;
      const y = c;
      const correct = `${s} − ${y} = ${x}`;
      const wrong = [`${s} + ${y} = ${s + y}`, `${x} + ${y} = ${s}`, `${Math.max(x, y)} − ${Math.min(x, y)} = ${Math.abs(x - y)}`];
      return {
        prompt: `${p.name} worked out ${x} + ${y} = ${s}. Which number sentence can ${p.he} use to **check** ${p.his} answer?`,
        input: 'choice',
        answer: correct,
        choices: textChoices(R, correct, wrong, 4),
        hint: 'To check addition, subtract one part from the answer.',
        explain: `${s} − ${y} = ${x}. We get back the other part, so the answer is correct.`
      };
    }
    if (form === 'missFirst') return fact(`? − ${b} = ${c}`, a, `Work backwards with the inverse: ${c} + ${b}.`, `${c} + ${b} = ${a}. So ${a} − ${b} = ${c}.`);
    if (form === 'missMid') return fact(`${a} − ? = ${c}`, b, `Think: ${a} − ${c} = ?`, `${a} − ${c} = ${b}. So ${a} − ${b} = ${c}.`);
    if (form === 'missAdd') return fact(`? + ${b} = ${a}`, c, `Use the inverse: ${a} − ${b}.`, `${a} − ${b} = ${c}. So ${c} + ${b} = ${a}.`);
    const right = R.chance(0.5);
    const shown = right ? c : c + R.pick([-10, 10, -1, 1, 100]);
    const okShown = shown > 0 ? shown : c + 10;
    const isRight = okShown === c;
    return {
      prompt: `${p.name} says ${a} − ${b} = ${okShown}. Is ${p.he} correct? Use addition to check.`,
      input: 'choice',
      answer: isRight ? 'Yes' : 'No',
      choices: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }],
      hint: `Add ${okShown} + ${b}. Do you get ${a}?`,
      explain: isRight ? `${okShown} + ${b} = ${a}, so ${p.he} is correct.` : `${okShown} + ${b} = ${okShown + b}, not ${a}. So ${p.he} is not correct. The correct answer is ${c}.`
    };
  }
};

const word2stepP2 = {
  id: 'p2.word.2step',
  level: 'P2',
  strand: 'addsub',
  unit: 2,
  title: '2-step word problems',
  vi: 'Toán có lời văn 2 bước (phạm vi 1000)',
  icon: '🪜',
  tip: 'Bài 2 bước: hỏi con "What do we need to find first?". Vẽ mô hình thanh và ghi "Step 1, Step 2" rõ ràng — đây là cách trình bày được chấm điểm ở trường.',
  gen(R, tier) {
    const [lo, hi] = twoStepRange('P2', tier);
    if (tier === 1 && R.chance(0.4)) {
      const kind = R.pick(['total', 'part', 'diffMore', 'findMore', 'findFewer']);
      let x;
      let y;
      if (kind === 'total' || kind === 'findMore') [x, y] = pickAdd(R, [lo, Math.floor(hi * 0.6)], [lo, Math.floor(hi * 0.4)], () => true, 999);
      else [x, y] = pickSub(R, [Math.floor(hi * 0.4), hi], [lo, Math.floor(hi * 0.4)], () => true, 10);
      const s = oneStep(R, kind, x, y);
      return { prompt: s.prompt, visuals: [s.model], input: 'number', answer: s.answer, hint: s.hint, explain: s.explain };
    }
    const kind = R.pick(['compareTotal', 'twoTakeaways', 'addThenSub', 'totalThenCompare', 'subThenAdd', 'partsCompare']);
    const s = twoStep(R, kind, lo, hi);
    const showModel = s.model && (tier < 3 || R.chance(0.5));
    return { prompt: s.prompt, visuals: showModel ? [s.model] : [], input: 'number', answer: s.answer, hint: s.hint, explain: s.explain };
  }
};

// ================================================================== P3 unit 2: within 10 000
const add4d = {
  id: 'p3.add.4digit',
  level: 'P3',
  strand: 'addsub',
  unit: 2,
  title: 'Add within 10 000',
  vi: 'Cộng số có 4 chữ số',
  icon: '➕',
  tip: 'Giống cộng 3 chữ số, thêm hàng nghìn (thousands). Nhắc con ước lượng trước (khoảng bao nhiêu?) để tự phát hiện kết quả vô lý.',
  gen(R, tier) {
    let a;
    let b;
    if (tier === 1) [a, b] = pickAdd(R, [1000, 7999], [100, 1999], (c) => c <= 1, 9999);
    else if (tier === 2) [a, b] = pickAdd(R, [1000, 6999], [1000, 3999], (c) => c >= 1 && c <= 2, 9999);
    else [a, b] = pickAdd(R, [1500, 6999], [1500, 4999], (c) => c >= 3, 9999);
    const sum = a + b;
    const explain = colAddExplain(a, b);
    const form = R.pick(['vert', 'vert', 'horiz', 'sumOf']);
    if (form === 'vert') return { prompt: R.pick(['Add.', 'Work out the sum.']), visuals: [vert([a, b], '+')], input: 'number', answer: sum, hint: ADD_HINT, explain };
    if (form === 'sumOf') return { prompt: `Find the **sum** of ${a} and ${b}.`, input: 'number', answer: sum, hint: 'Line up the thousands, hundreds, tens and ones.', explain };
    return fact(`${a} + ${b} = ?`, sum, ADD_HINT, explain);
  }
};

const sub4d = {
  id: 'p3.sub.4digit',
  level: 'P3',
  strand: 'addsub',
  unit: 2,
  title: 'Subtract within 10 000',
  vi: 'Trừ số có 4 chữ số (qua nhiều số 0)',
  icon: '➖',
  tip: 'Với 5003 − 2468, đổi 5 nghìn thành 4 nghìn 9 trăm 9 chục 10 đơn vị. Luôn kiểm tra bằng phép cộng ngược.',
  gen(R, tier) {
    let a;
    let b;
    if (tier === 1) [a, b] = pickSub(R, [2000, 9999], [100, 1999], (c) => c <= 1, 50);
    else if (tier === 2) [a, b] = pickSub(R, [3000, 9999], [1000, 5999], (c) => c === 2, 50);
    else if (R.chance(0.5)) [a, b] = acrossZero4(R);
    else [a, b] = pickSub(R, [3000, 9999], [1111, 6999], (c) => c >= 3, 50);
    const d = a - b;
    const explain = colSubExplain(a, b);
    const form = R.pick(['vert', 'vert', 'horiz', 'diff']);
    if (form === 'vert') return { prompt: R.pick(['Subtract.', 'Work out the difference.']), visuals: [vert([a, b], '−')], input: 'number', answer: d, hint: SUB_HINT, explain };
    if (form === 'diff') return { prompt: `Find the **difference** between ${a} and ${b}.`, input: 'number', answer: d, hint: 'Bigger number − smaller number. Regroup when needed.', explain };
    return fact(`${a} − ${b} = ?`, d, SUB_HINT, explain);
  }
};

const mental10000 = {
  id: 'p3.mental.10000',
  level: 'P3',
  strand: 'addsub',
  unit: 2,
  title: 'Mental maths to 10 000',
  vi: 'Tính nhẩm với nghìn, trăm, chục',
  icon: '🧠',
  sprint: true,
  tip: 'Nhìn vào hàng thay đổi: 3456 + 2000 chỉ đổi hàng nghìn. Khi vượt nghìn (4800 + 500), tách 500 = 200 + 300 để "làm tròn nghìn" trước.',
  gen(R, tier) {
    const n = R.int(1001, 8999);
    const Th = Math.floor(n / 1000);
    const Hu = Math.floor(n / 100) % 10;
    const Te = Math.floor(n / 10) % 10;
    if (tier === 1) {
      if (R.chance(0.5) && Th <= 8) {
        const k = R.int(1, 9 - Th);
        return fact(`${n} + ${k * 1000} = ?`, n + k * 1000, 'Only the thousands change.', `${n} + ${k * 1000} = ${n + k * 1000}.`);
      }
      const k = R.int(1, Th);
      return n - k * 1000 > 0 ? fact(`${n} − ${k * 1000} = ?`, n - k * 1000, 'Only the thousands change.', `${n} − ${k * 1000} = ${n - k * 1000}.`) : fact(`${n} + 1000 = ?`, n + 1000, 'Only the thousands change.', `${n} + 1000 = ${n + 1000}.`);
    }
    if (tier === 2) {
      if (R.chance(0.5) && Hu <= 8) {
        const k = R.int(1, 9 - Hu);
        return fact(`${n} + ${k * 100} = ?`, n + k * 100, 'Only the hundreds change.', `${n} + ${k * 100} = ${n + k * 100}.`);
      }
      if (Hu >= 1) {
        const k = R.int(1, Hu);
        return fact(`${n} − ${k * 100} = ?`, n - k * 100, 'Only the hundreds change.', `${n} − ${k * 100} = ${n - k * 100}.`);
      }
      const k = R.int(1, Math.max(1, 9 - Te));
      return fact(`${n} + ${k * 10} = ?`, n + k * 10, 'Only the tens change.', `${n} + ${k * 10} = ${n + k * 10}.`);
    }
    if (R.chance(0.5)) {
      const k = R.int(Math.max(1, 10 - Hu), 9);
      if (n + k * 100 <= 9999) return fact(`${n} + ${k * 100} = ?`, n + k * 100, 'You will cross a thousand. Make the next thousand first.', `${n} + ${k * 100} = ${n + k * 100}.`);
    }
    if (Hu < 9 && Th >= 2) {
      const k = R.int(Hu + 1, 9);
      return fact(`${n} − ${k * 100} = ?`, n - k * 100, 'Subtract the hundreds. Regroup a thousand.', `${n} − ${k * 100} = ${n - k * 100}.`);
    }
    const t = R.int(2, 9) * 1000;
    const k = R.int(1, 9) * 100 + R.pick([0, 50]);
    return fact(`${t} − ${k} = ?`, t - k, `Think: ${k} + ? = ${t}.`, `${t} − ${k} = ${t - k}.`);
  }
};

const word2stepP3 = {
  id: 'p3.word.2step',
  level: 'P3',
  strand: 'addsub',
  unit: 2,
  title: '2-step word problems',
  vi: 'Toán có lời văn 2 bước (phạm vi 10 000)',
  icon: '🪜',
  tip: 'Với số lớn, mô hình thanh càng quan trọng: vẽ, ghi số đã biết, đánh dấu "?" chỗ cần tìm. Đọc lại câu hỏi cuối để chắc tìm đúng thứ được hỏi.',
  gen(R, tier) {
    const [lo, hi] = twoStepRange('P3', tier);
    const kind = R.pick(['compareTotal', 'twoTakeaways', 'addThenSub', 'totalThenCompare', 'subThenAdd', 'partsCompare']);
    const s = twoStep(R, kind, lo, hi);
    const showModel = s.model && (tier < 3 || R.chance(0.4));
    return { prompt: s.prompt, visuals: showModel ? [s.model] : [], input: 'number', answer: s.answer, hint: s.hint, explain: s.explain };
  }
};

export const SKILLS = [
  // P1 unit 2 — number bonds
  bondWithin10,
  bondTen,
  bondWays,
  // P1 unit 3 — addition within 10
  addFacts10,
  addCountOn,
  addSentence,
  addMissing,
  addStory10,
  // P1 unit 4 — subtraction within 10
  subFacts10,
  subTakeAway,
  subCompare,
  subMissing,
  subFamily,
  subStory10,
  // P1 unit 8 — within 20
  bondWithin20,
  addMake10,
  subFrom10,
  addFacts20,
  subFacts20,
  addDoubles,
  addThree,
  wordWithin20,
  // P1 unit 12 — within 100
  addTens,
  add2d,
  sub2d,
  wordWithin100,
  // P2 unit 2 — within 1000
  add3d,
  sub3d,
  missingDigits,
  mental1000,
  inverseCheck,
  word2stepP2,
  // P3 unit 2 — within 10 000
  add4d,
  sub4d,
  mental10000,
  word2stepP3
];
