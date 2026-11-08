// Whole numbers (MOE P1–P3): numbers to 10 / 20 / 100 / 1000 / 10 000, ordinal numbers,
// place value, number words, comparing & ordering, number patterns, hundred chart,
// skip counting, number lines, odd & even and digit cards.
import {
  MONTHS,
  ORDINAL_WORDS,
  person,
  people,
  item,
  plural,
  numWord,
  ordinal,
  numChoices,
  textChoices,
  fixedChoices,
  cap
} from '../helpers.js';

// ------------------------------------------------------------------ local helpers
const SIGNS = ['<', '=', '>'];
const signOf = (a, b) => (a < b ? '<' : a > b ? '>' : '=');
const SIGN_WORD = { '<': 'smaller than', '>': 'greater than', '=': 'equal to' };
const SIGN_HINT = 'Work out both sides first. The open side of > or < faces the greater number. = means both sides are the same.';

/** Replace a lone "?" (the unknown) with words for text-to-speech. */
const say = (s) => s.replace(/(^|\s)\?(?=\s|$)/g, '$1what number');

const PLACE = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'];
const PLACE_COL = ['Ones', 'Tens', 'Hundreds', 'Thousands'];
const pow10 = (p) => 10 ** p;
const digitsOf = (n) => String(n).split('').map(Number);
/** "1 ten", "4 tens", "0 ones" */
const placeCount = (count, p) => `${count} ${count === 1 ? PLACE[p].slice(0, -1) : PLACE[p]}`;

/** Random number with exactly `places` digits (leading digit lo..hi). */
function randDigits(R, places, lo = 1, hi = 9) {
  let s = String(R.int(lo, hi));
  for (let i = 1; i < places; i++) s += String(R.int(0, 9));
  return Number(s);
}

/** Describe a number by place: 347 -> "3 hundreds 4 tens 7 ones". */
function placeWords(n, places) {
  const d = String(n).padStart(places, '0').split('').map(Number);
  return d.map((c, i) => placeCount(c, places - 1 - i)).join(' ');
}

/** Expanded-form parts of n (most significant first, zeros skipped): 405 -> [400, 5]. */
function partsOf(n) {
  const d = digitsOf(n);
  return d.map((c, i) => c * pow10(d.length - 1 - i)).filter((v) => v > 0);
}

function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const out = [];
  arr.forEach((x, i) => {
    for (const p of permutations([...arr.slice(0, i), ...arr.slice(i + 1)])) out.push([x, ...p]);
  });
  return out;
}
/** All numbers formed from all the digits (no leading zero), unique. */
function numbersFromDigits(digits) {
  return [...new Set(permutations(digits).filter((p) => p[0] !== 0).map((p) => Number(p.join(''))))];
}

/** Common-mistake neighbours of n used as distractors (reversed digits, ±1, ±10, misplaced zeros). */
function nearNumbers(n) {
  const s = String(n);
  const out = [n + 1, n - 1, n + 10, n - 10];
  if (s.length >= 2) out.push(Number(s.split('').reverse().join('')));
  if (n >= 100) out.push(n + 100, n - 100);
  if (n >= 1000) out.push(n + 1000, n - 1000);
  if (n >= 100 && n % 100 === 0) out.push(n / 10, n + 100);
  if (n >= 1000 && n % 1000 === 0) out.push(n * 10 <= 10000 ? n * 10 : n + 10);
  if (s.length >= 2 && s.slice(1).includes('0')) {
    out.push(Number(s.replace(/0/g, '')) || n + 2);
    const i = s.indexOf('0', 1);
    if (i < s.length - 1) {
      const a = s.split('');
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
      out.push(Number(a.join('')));
    }
  }
  return out.filter((x) => Number.isFinite(x) && x >= 0 && x !== n);
}

/** Sign question: "Which sign goes in the box?  leftText ☐ rightText". */
function signQuestion(left, right, leftText = String(left), rightText = String(right), work = '') {
  const s = signOf(left, right);
  return {
    prompt: 'Which sign goes in the box?',
    speak: `Which sign goes in the box? ${leftText}, box, ${rightText}.`,
    visuals: [{ type: 'equation', text: `${leftText} ☐ ${rightText}` }],
    input: 'choice',
    answer: s,
    choices: fixedChoices(SIGNS),
    hint: SIGN_HINT,
    explain: `${work}${left} is ${SIGN_WORD[s]} ${right}, so ${leftText} ${s} ${rightText}.`
  };
}

/** Choices for "arrange the numbers" questions: correct order + reverse + other orders. */
function orderChoices(R, nums, asc) {
  const correct = [...nums].sort((a, b) => (asc ? a - b : b - a));
  const key = (arr) => arr.join(', ');
  const set = new Set([key(correct), key([...correct].reverse())]);
  let guard = 0;
  while (set.size < 4 && guard++ < 80) set.add(key(R.shuffle(nums)));
  return { answer: key(correct), choices: R.shuffle([...set]).map((k) => ({ value: k, label: k })) };
}

const asNumChoices = (vals) => vals.map((v) => ({ value: v, label: String(v) }));
const ordChoices = (R, k, extra, lo = 1, hi = 20) => {
  const set = new Set([k]);
  for (const v of R.shuffle(extra)) {
    if (set.size >= 4) break;
    if (v >= lo && v <= hi) set.add(v);
  }
  for (let d = 1; set.size < 4 && d < 20; d++) {
    if (k + d <= hi) set.add(k + d);
    if (set.size < 4 && k - d >= lo) set.add(k - d);
  }
  return [...set].sort((a, b) => a - b).map((v) => ({ value: ordinal(v), label: ordinal(v) }));
};

// ------------------------------------------------------------------ P1 unit 1: numbers to 10
const compare10 = {
  id: 'p1.num.compare10',
  level: 'P1',
  strand: 'numbers',
  unit: 1,
  title: 'Compare numbers to 10',
  vi: 'So sánh các số trong phạm vi 10',
  icon: '⚖️',
  tip: 'Trường dùng "greater than" (lớn hơn) và "smaller than" (bé hơn). Xếp hai hàng đồ vật cạnh nhau hoặc nhìn tia số: số càng về bên phải càng lớn. Với dấu > <, "miệng" luôn há về phía số lớn hơn.',
  gen(R, tier) {
    if (tier === 1) {
      const [a, b] = R.distinctInts(2, 1, 10);
      const askG = R.chance(0.5);
      const ans = askG ? Math.max(a, b) : Math.min(a, b);
      const word = askG ? 'greater' : 'smaller';
      const base = {
        input: 'choice',
        answer: ans,
        choices: asNumChoices([a, b]),
        explain: `${Math.max(a, b)} is greater than ${Math.min(a, b)}. The ${word} number is ${ans}.`
      };
      if (R.chance(0.5)) {
        const it = item(R);
        return {
          ...base,
          prompt: `Which number is **${word}**, ${a} or ${b}?`,
          visuals: [{ type: 'objects', stack: true, groups: [{ emoji: it.e, count: a, label: String(a) }, { emoji: it.e, count: b, label: String(b) }] }],
          hint: 'Match the two rows one to one. The longer row shows the greater number.'
        };
      }
      return {
        ...base,
        prompt: `Look at the number line. Which number is **${word}**, ${a} or ${b}?`,
        visuals: [{ type: 'numberline', min: 0, max: 10, marks: [{ at: a, text: String(a) }, { at: b, text: String(b), color: 'purple' }] }],
        hint: 'Numbers get greater as we move to the right on the number line.'
      };
    }
    if (tier === 2) {
      const form = R.pick(['word', 'pair', 'which']);
      if (form === 'word') {
        const [a, b] = R.distinctInts(2, 0, 10);
        const ans = a > b ? 'greater than' : 'smaller than';
        return {
          prompt: `**${a}** is ____ **${b}**.`,
          speak: `${a} is blank ${b}.`,
          input: 'choice',
          answer: ans,
          choices: fixedChoices(['greater than', 'smaller than']),
          hint: `Count up from 0. Which number do you say first, ${a} or ${b}? That one is smaller.`,
          explain: `${a} is ${ans} ${b}.`
        };
      }
      if (form === 'which') {
        const target = R.int(3, 7);
        const askG = R.chance(0.5);
        const good = askG ? R.int(target + 1, 10) : R.int(0, target - 1);
        const badPool = askG ? [target, target - 1, target - 2, target - 3] : [target, target + 1, target + 2, target + 3];
        const bad = R.sample(badPool.filter((v) => v >= 0 && v <= 10), 2);
        return {
          prompt: `Which number is **${askG ? 'greater' : 'smaller'} than ${target}**?`,
          input: 'choice',
          answer: good,
          choices: asNumChoices([good, ...bad].sort((x, y) => x - y)),
          hint: `${askG ? 'Greater' : 'Smaller'} than ${target} means it comes ${askG ? 'after' : 'before'} ${target} when we count. ${target} itself does not count!`,
          explain: `${good} is ${askG ? 'greater' : 'smaller'} than ${target}.`
        };
      }
      const [a, b] = R.distinctInts(2, 0, 10);
      const askG = R.chance(0.5);
      const ans = askG ? Math.max(a, b) : Math.min(a, b);
      return {
        prompt: `Which is **${askG ? 'greater' : 'smaller'}**: ${a} or ${b}?`,
        input: 'choice',
        answer: ans,
        choices: asNumChoices([a, b]),
        hint: 'Think of the number line. The number further to the right is greater.',
        explain: `${Math.max(a, b)} is greater than ${Math.min(a, b)}, so the answer is ${ans}.`
      };
    }
    if (R.chance(0.55)) {
      const a = R.int(0, 10);
      const b = R.chance(0.2) ? a : R.intExcept(0, 10, [a]);
      return signQuestion(a, b);
    }
    const x = R.int(1, 6);
    const y = R.int(1, 10 - x);
    const s = x + y;
    const z = Math.max(0, Math.min(10, s + R.pick([-2, -1, 0, 1, 2])));
    return R.chance(0.5)
      ? signQuestion(s, z, `${x} + ${y}`, String(z), `${x} + ${y} = ${s}. `)
      : signQuestion(z, s, String(z), `${x} + ${y}`, `${x} + ${y} = ${s}. `);
  }
};

const order10 = {
  id: 'p1.num.order10',
  level: 'P1',
  strand: 'numbers',
  unit: 1,
  title: 'Order numbers to 10',
  vi: 'Sắp xếp các số (bé → lớn, lớn → bé)',
  icon: '📶',
  tip: 'Dạy con tìm số bé nhất trước, gạch đi, rồi tìm số bé nhất tiếp theo. Chú ý đọc kỹ đề: "smallest to greatest" hay "greatest to smallest".',
  gen(R, tier) {
    const k = tier === 1 ? 3 : tier === 2 ? R.pick([3, 4]) : 4;
    const nums = R.distinctInts(k, 0, 10);
    if (tier === 3 && R.chance(0.5)) {
      const asc = [...nums].sort((a, b) => a - b);
      const pos = R.int(2, k - 1);
      const fromG = R.chance(0.5);
      const ordered = fromG ? [...asc].reverse() : asc;
      const ans = ordered[pos - 1];
      return {
        prompt: `Arrange the numbers from **${fromG ? 'greatest to smallest' : 'smallest to greatest'}**. Which number is **${ordinal(pos)}**?`,
        visuals: [{ type: 'sequence', items: nums }],
        input: 'choice',
        answer: ans,
        choices: asNumChoices(nums),
        hint: 'First put all the numbers in order. Then count along to the position.',
        explain: `In order: ${ordered.join(', ')}. The ${ordinal(pos)} number is ${ans}.`
      };
    }
    const asc = tier === 1 ? true : R.chance(0.5);
    const { answer, choices } = orderChoices(R, nums, asc);
    return {
      prompt: `Arrange the numbers from **${asc ? 'smallest to greatest' : 'greatest to smallest'}**.`,
      visuals: [{ type: 'sequence', items: nums }],
      input: 'choice',
      answer,
      choices,
      hint: asc ? 'Find the smallest number first, then the next smallest …' : 'Find the greatest number first, then the next greatest …',
      explain: `From ${asc ? 'smallest to greatest' : 'greatest to smallest'}: ${answer}.`
    };
  }
};

// ------------------------------------------------------------------ P1 unit 6: ordinal numbers
const ANIMALS = [
  ['🐶', 'dog'], ['🐱', 'cat'], ['🐰', 'rabbit'], ['🐼', 'panda'], ['🦊', 'fox'], ['🐨', 'koala'],
  ['🐯', 'tiger'], ['🦁', 'lion'], ['🐮', 'cow'], ['🐷', 'pig'], ['🐸', 'frog'], ['🐵', 'monkey'],
  ['🐔', 'hen'], ['🐧', 'penguin'], ['🐻', 'bear'], ['🐭', 'mouse']
];
const KIDS = ['👦', '👧', '🧒', '🧑'];
const idxFrom = (n, pos, fromRight) => (fromRight ? n - pos : pos - 1);

const ordPosition = {
  id: 'p1.ord.position',
  level: 'P1',
  strand: 'numbers',
  unit: 6,
  title: 'Which one is 3rd?',
  vi: 'Tìm vật ở vị trí thứ … (tính từ trái / phải)',
  icon: '🥇',
  tip: 'Luôn hỏi con trước: "Count from the left or from the right?". Cho con đặt ngón tay ở đúng đầu hàng rồi đếm 1st, 2nd, 3rd… Lỗi hay gặp là đếm nhầm phía.',
  gen(R, tier) {
    const n = tier === 1 ? R.int(4, 5) : tier === 2 ? R.int(5, 8) : R.int(7, 10);
    const row = R.sample(ANIMALS, n);
    const fromRight = tier === 1 ? false : R.chance(0.5);
    const side = fromRight ? 'right' : 'left';
    let ansIdx;
    let prompt;
    let explain;
    if (tier === 3 && R.chance(0.35)) {
      const p = R.int(1, n - 2);
      ansIdx = idxFrom(n, p + 1, fromRight);
      prompt = `Which animal is **between** the ${ordinal(p)} and the ${ordinal(p + 2)} animals from the **${side}**?`;
      explain = `Counting from the ${side}, the animal between the ${ordinal(p)} and the ${ordinal(p + 2)} is the ${ordinal(p + 1)} one: the ${row[ansIdx][1]}.`;
    } else {
      const p = R.int(tier === 1 ? 2 : 1, n);
      ansIdx = idxFrom(n, p, fromRight);
      prompt = `Which animal is **${ordinal(p)}** from the **${side}**?`;
      const counted = [];
      for (let k = 1; k <= p; k++) counted.push(`${ordinal(k)} ${row[idxFrom(n, k, fromRight)][1]}`);
      explain =
        p <= 5
          ? `Counting from the ${side}: ${counted.join(', ')}. The ${ordinal(p)} animal from the ${side} is the ${row[ansIdx][1]}.`
          : `Start at the ${side} end and count to ${p}. The ${ordinal(p)} animal from the ${side} is the ${row[ansIdx][1]}.`;
    }
    const opts = new Set([ansIdx]);
    for (const j of [n - 1 - ansIdx, ansIdx - 1, ansIdx + 1, ...R.shuffle([...Array(n).keys()])]) {
      if (opts.size >= 4) break;
      if (j >= 0 && j < n) opts.add(j);
    }
    return {
      prompt,
      visuals: [{ type: 'ordinal', items: row.map((a) => a[0]) }],
      input: 'choice',
      answer: row[ansIdx][0],
      choices: R.shuffle([...opts]).map((j) => ({ value: row[j][0], label: `${row[j][0]} ${row[j][1]}` })),
      hint: `Put your finger on the animal at the ${side.toUpperCase()} end. Count: 1st, 2nd, 3rd …`,
      explain
    };
  }
};

const ordWhichPos = {
  id: 'p1.ord.whichpos',
  level: 'P1',
  strand: 'numbers',
  unit: 6,
  title: 'What position is it?',
  vi: 'Xác định vị trí thứ mấy (1st, 2nd, 3rd…)',
  icon: '🏅',
  tip: 'Nhắc con cách viết tắt: 1st, 2nd, 3rd, rồi 4th, 5th… Với câu hỏi "từ phải sang", có thể dùng mẹo: vị trí từ phải = tổng số − vị trí từ trái + 1.',
  gen(R, tier) {
    const n = tier === 1 ? R.int(4, 6) : tier === 2 ? R.int(5, 8) : R.int(6, 10);
    const row = R.sample(ANIMALS, n);
    const idx = R.int(0, n - 1);
    const [e, name] = row[idx];
    if (tier === 3 && R.chance(0.5)) {
      const fromRight = R.chance(0.5);
      const given = fromRight ? n - idx : idx + 1;
      const other = n - given + 1;
      const side = fromRight ? 'right' : 'left';
      const oside = fromRight ? 'left' : 'right';
      return {
        prompt: `There are ${n} animals in a row. The ${name} is **${ordinal(given)} from the ${side}**. What position is it from the **${oside}**?`,
        visuals: R.chance(0.5) ? [{ type: 'ordinal', items: row.map((a) => a[0]) }] : [],
        input: 'choice',
        answer: ordinal(other),
        choices: ordChoices(R, other, [given, other - 1, other + 1], 1, n + 1),
        hint: `Draw ${n} circles in a row and mark the ${name}. Then count from the other end.`,
        explain: `${n} − ${given} + 1 = ${other}. The ${name} is ${ordinal(other)} from the ${oside}.`
      };
    }
    const fromRight = tier === 1 ? false : R.chance(0.5);
    const side = fromRight ? 'right' : 'left';
    const pos = fromRight ? n - idx : idx + 1;
    const mirror = n - pos + 1;
    return {
      prompt: R.pick([`What position is the ${name} ${e} from the **${side}**?`, `The ${name} ${e} is ____ from the **${side}**.`]),
      speak: `What position is the ${name} from the ${side}?`,
      visuals: [{ type: 'ordinal', items: row.map((a) => a[0]) }],
      input: 'choice',
      answer: ordinal(pos),
      choices: ordChoices(R, pos, [mirror, pos - 1, pos + 1], 1, n),
      hint: `Start at the ${side.toUpperCase()} end and count 1st, 2nd, 3rd … until you reach the ${name}.`,
      explain: `Counting from the ${side}, the ${name} is ${ordinal(pos)}.${mirror !== pos ? ` (From the other side it is ${ordinal(mirror)}.)` : ''}`
    };
  }
};

const ordQueue = {
  id: 'p1.ord.queue',
  level: 'P1',
  strand: 'numbers',
  unit: 6,
  title: 'Queue puzzles',
  vi: 'Bài toán xếp hàng (trước, sau, giữa)',
  icon: '🧍',
  tip: 'Cho con vẽ hàng bằng các vòng tròn nhỏ và tô đậm bạn được hỏi. Lỗi thường gặp: quên đếm chính bạn đó (hoặc đếm thừa). Đây là dạng "Thinking Cap" rất hay gặp ở P1–P2.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    const forms = tier === 1 ? ['inFront', 'position'] : tier === 2 ? ['inFront', 'behind', 'position', 'total'] : ['frontBack', 'otherEnd', 'between'];
    const form = R.pick(forms);
    const queueVis = (n, hl) => ({ type: 'ordinal', ends: ['FRONT', 'BACK'], items: Array.from({ length: n }, (_, i) => KIDS[(i + hl) % KIDS.length]), highlight: hl });
    if (form === 'inFront') {
      const k = R.int(2, tier === 1 ? 6 : 9);
      return {
        prompt: `${p.name} is **${ordinal(k)}** in the queue. How many children are **in front of** ${p.him}?`,
        visuals: tier === 1 ? [queueVis(k + R.int(1, 3), k - 1)] : [],
        input: 'number',
        answer: k - 1,
        hint: `Count only the children before ${p.name}. Do not count ${p.name}!`,
        explain: `${p.name} is ${ordinal(k)}, so ${k - 1} ${k - 1 === 1 ? 'child is' : 'children are'} in front of ${p.him}.`
      };
    }
    if (form === 'position') {
      const m = R.int(1, tier === 1 ? 5 : 8);
      return {
        prompt: `There ${m === 1 ? 'is' : 'are'} **${m}** ${m === 1 ? 'child' : 'children'} in front of ${p.name} in a queue. What is ${p.his} position in the queue?`,
        visuals: tier === 1 ? [queueVis(m + R.int(1, 3), m)] : [],
        input: 'choice',
        answer: ordinal(m + 1),
        choices: ordChoices(R, m + 1, [m, m + 2], 1, 12),
        hint: `Count the children in front, then count ${p.name} too.`,
        explain: `${m} ${m === 1 ? 'child' : 'children'} in front, and then ${p.name}. So ${p.name} is ${ordinal(m + 1)}.`
      };
    }
    if (form === 'behind') {
      const n = R.int(6, 10);
      const k = R.int(2, n - 1);
      return {
        prompt: `${n} children are in a queue. ${p.name} is **${ordinal(k)}** from the front. How many children are **behind** ${p.him}?`,
        input: 'number',
        answer: n - k,
        hint: `${k} children are up to and including ${p.name}. How many are left behind?`,
        explain: `${n} − ${k} = ${n - k}. ${n - k} ${n - k === 1 ? 'child is' : 'children are'} behind ${p.name}.`
      };
    }
    if (form === 'total') {
      const k = R.int(2, 7);
      const b = R.int(1, 6);
      return {
        prompt: `${p.name} is **${ordinal(k)}** in the queue. There ${b === 1 ? 'is' : 'are'} **${b}** ${b === 1 ? 'child' : 'children'} behind ${p.him}. How many children are in the queue?`,
        input: 'number',
        answer: k + b,
        hint: `${p.name} is ${ordinal(k)}, so there are ${k} children up to ${p.name}. Add the ones behind.`,
        explain: `${k} children up to and including ${p.name}, plus ${b} behind: ${k} + ${b} = ${k + b}.`
      };
    }
    if (form === 'frontBack') {
      const a = R.int(2, 8);
      const b = R.int(2, 8);
      return {
        prompt: `${p.name} is **${ordinal(a)} from the front** and **${ordinal(b)} from the back** of a queue. How many children are in the queue?`,
        input: 'number',
        answer: a + b - 1,
        hint: `Draw it! ${p.name} is counted from the front AND from the back. Count ${p.him} only once.`,
        explain: `${a} + ${b} = ${a + b}, but ${p.name} was counted twice. ${a + b} − 1 = ${a + b - 1} children.`
      };
    }
    if (form === 'otherEnd') {
      const n = R.int(6, 12);
      const k = R.int(2, n - 1);
      const other = n - k + 1;
      return {
        prompt: `There are ${n} children in a line. ${p.name} is **${ordinal(k)} from the front**. What is ${p.his} position **from the back**?`,
        input: 'choice',
        answer: ordinal(other),
        choices: ordChoices(R, other, [n - k, k, other + 1], 1, n + 1),
        hint: `How many children are behind ${p.name}? Then count ${p.name} too.`,
        explain: `${n - k} ${n - k === 1 ? 'child is' : 'children are'} behind ${p.name}. ${n - k} + 1 = ${other}, so ${p.he} is ${ordinal(other)} from the back.`
      };
    }
    const a = R.int(1, 5);
    const b = R.int(a + 2, 10);
    return {
      prompt: `${p.name} is **${ordinal(a)}** in a queue. ${q.name} is **${ordinal(b)}** in the same queue. How many children are **between** them?`,
      input: 'number',
      answer: b - a - 1,
      hint: `List the positions between ${ordinal(a)} and ${ordinal(b)}. Do not count ${p.name} or ${q.name}.`,
      explain: `The children between them are ${ordinal(a + 1)} to ${ordinal(b - 1)}. ${b} − ${a} − 1 = ${b - a - 1}.`
    };
  }
};

const ORD_WORDS_LIST = ['SINGAPORE', 'MERLION', 'ORCHARD', 'DURIAN', 'SENTOSA', 'RAINBOW', 'ELEPHANT', 'PENCIL', 'NUMBER', 'TIGER', 'PLANET', 'KITCHEN'];
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ordWords = {
  id: 'p1.ord.words',
  level: 'P1',
  strand: 'numbers',
  unit: 6,
  title: 'First, second, third',
  vi: 'Số thứ tự bằng chữ (first, second…)',
  icon: '🔠',
  tip: 'Ghép cặp: 1st = first, 2nd = second, 3rd = third, sau đó thêm "th" (fourth, fifth…). Luyện thêm bằng câu hỏi về tháng trong năm và chữ cái trong một từ.',
  gen(R, tier) {
    const forms = tier === 1 ? ['toWord', 'toShort', 'nextWord'] : tier === 2 ? ['toWord', 'toShort', 'month', 'nextWord'] : ['letter', 'alphabet', 'monthBack', 'month'];
    const form = R.pick(forms);
    if (form === 'toWord' || form === 'toShort') {
      const k = R.int(1, tier === 1 ? 5 : 10);
      if (form === 'toWord') {
        const pool = [ORDINAL_WORDS[k + 1], ORDINAL_WORDS[k - 1], numWord(k), ORDINAL_WORDS[k + 2], k <= 9 ? ORDINAL_WORDS[k + 10] : null].filter((w) => w && w !== 'zeroth');
        return {
          prompt: `How do we write **${ordinal(k)}** in words?`,
          input: 'choice',
          answer: ORDINAL_WORDS[k],
          choices: textChoices(R, ORDINAL_WORDS[k], pool, tier === 1 ? 3 : 4),
          hint: '1st is first, 2nd is second, 3rd is third. From 4th we usually add "th".',
          explain: `${ordinal(k)} is written as "${ORDINAL_WORDS[k]}".`
        };
      }
      return {
        prompt: `Which is the same as **${ORDINAL_WORDS[k]}**?`,
        input: 'choice',
        answer: ordinal(k),
        choices: ordChoices(R, k, [k + 10, k + 1, k - 1], 1, 20),
        hint: `Say the counting number first: ${numWord(k)}. Then think of its position word.`,
        explain: `"${ORDINAL_WORDS[k]}" is written as ${ordinal(k)}.`
      };
    }
    if (form === 'nextWord') {
      const len = R.int(3, 4);
      const start = R.int(1, (tier === 1 ? 6 : 10) - len + 1);
      const words = Array.from({ length: len }, (_, i) => ORDINAL_WORDS[start + i]);
      const idx = R.int(1, len - 1);
      const ans = words[idx];
      const pool = [ORDINAL_WORDS[start + idx + 1], ORDINAL_WORDS[start + idx - 1], numWord(start + idx), ORDINAL_WORDS[start + idx + 2]].filter((w) => w && w !== ans && w !== 'zeroth');
      return {
        prompt: 'Which word is missing?',
        visuals: [{ type: 'sequence', items: words.map((w, i) => (i === idx ? '?' : w)) }],
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, pool, 3),
        hint: 'Say them in order: first, second, third, fourth, fifth …',
        explain: `${words.join(', ')}. The missing word is "${ans}" (${ordinal(start + idx)}).`
      };
    }
    if (form === 'month') {
      const m = R.int(0, tier === 2 ? 9 : 11);
      const k = m + 1;
      const pool = [ORDINAL_WORDS[k + 1], ORDINAL_WORDS[k - 1], ORDINAL_WORDS[k + 2], numWord(k)].filter((w) => w && w !== 'zeroth');
      return {
        prompt: `**${MONTHS[m]}** is the ____ month of the year.`,
        speak: `${MONTHS[m]} is the blank month of the year.`,
        input: 'choice',
        answer: ORDINAL_WORDS[k],
        choices: textChoices(R, ORDINAL_WORDS[k], pool, 4),
        hint: 'Say the months in order: January, February, March …',
        explain: `January is first, February is second … ${MONTHS[m]} is the ${ORDINAL_WORDS[k]} (${ordinal(k)}) month.`
      };
    }
    if (form === 'monthBack') {
      const k = R.int(2, 12);
      const ans = MONTHS[k - 1];
      const pool = [MONTHS[k - 2], MONTHS[k % 12], MONTHS[(k + 1) % 12], MONTHS[(k + 10) % 12]].filter((x) => x !== ans);
      return {
        prompt: `Which month is the **${ORDINAL_WORDS[k]}** month of the year?`,
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, pool, 4),
        hint: 'Count the months on your fingers, starting with January.',
        explain: `The ${ORDINAL_WORDS[k]} month of the year is ${ans}.`
      };
    }
    if (form === 'letter') {
      const word = R.pick(ORD_WORDS_LIST);
      const k = R.int(2, word.length);
      const fromEnd = R.chance(0.3);
      const idx = fromEnd ? word.length - k : k - 1;
      const ans = word[idx];
      const others = [...new Set(word.split('').filter((c) => c !== ans))];
      return {
        prompt: fromEnd
          ? `What is the **${ordinal(k)}** letter from the **end** of the word **${word}**?`
          : `What is the **${ordinal(k)}** letter in the word **${word}**?`,
        visuals: [{ type: 'sequence', items: word.split('') }],
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, others, 4),
        hint: fromEnd ? 'Start at the LAST letter and count backwards.' : 'Point to each letter from the start: 1st, 2nd, 3rd …',
        explain: `Counting from the ${fromEnd ? 'end' : 'start'} of ${word}, the ${ordinal(k)} letter is ${ans}.`
      };
    }
    const k = R.int(2, 12);
    const ans = ALPHA[k - 1];
    return {
      prompt: `What is the **${ordinal(k)}** letter of the alphabet?`,
      input: 'choice',
      answer: ans,
      choices: textChoices(R, ans, [ALPHA[k - 2], ALPHA[k], ALPHA[k + 1], ALPHA[k - 3]].filter(Boolean), 4),
      hint: 'Sing the alphabet song slowly and count the letters on your fingers.',
      explain: `A, B, C … The ${ordinal(k)} letter is ${ans}.`
    };
  }
};

// ------------------------------------------------------------------ P1 unit 7: numbers to 20
const tensOnes20 = {
  id: 'p1.num.tensones20',
  level: 'P1',
  strand: 'numbers',
  unit: 7,
  title: 'Tens and ones to 20',
  vi: 'Chục và đơn vị (số đến 20)',
  icon: '🧱',
  tip: 'Số 11–19 gồm 1 chục (1 ten) và vài đơn vị (ones). Cho con bó 10 que kem thành 1 bó rồi đếm thêm que lẻ. Bẫy thường gặp: viết "1 ten 5 ones" thành 51.',
  gen(R, tier) {
    const k = R.int(1, 9);
    const n = 10 + k;
    if (tier === 1) {
      const form = R.pick(['blocks', 'frame', 'words']);
      if (form === 'blocks') {
        return {
          prompt: 'What number do the blocks show?',
          visuals: [{ type: 'baseten', t: 1, o: k }],
          input: 'number',
          answer: n,
          hint: 'The long rod is 1 ten. Each small cube is 1 one. Count on from 10.',
          explain: `1 ten and ${placeCount(k, 0)} make ${n}.`
        };
      }
      if (form === 'frame') {
        return {
          prompt: 'How many counters are there?',
          visuals: [{ type: 'tenframe', a: 10, b: k }],
          input: 'number',
          answer: n,
          hint: 'One full ten frame is 10. Count on: 11, 12 …',
          explain: `10 and ${k} make ${n}.`
        };
      }
      return {
        prompt: `1 ten and ${placeCount(k, 0)} make ?`,
        speak: `1 ten and ${placeCount(k, 0)} make what number?`,
        visuals: [{ type: 'baseten', t: 1, o: k }],
        input: 'number',
        answer: n,
        hint: '1 ten is 10. Count on the ones.',
        explain: `1 ten and ${placeCount(k, 0)} make ${n}.`
      };
    }
    if (tier === 2) {
      const form = R.pick(['onesMissing', 'tensMissing', 'chart', 'reverse']);
      if (form === 'onesMissing') {
        return {
          prompt: `${n} = 1 ten and ? ones`,
          speak: `${n} equals 1 ten and how many ones?`,
          input: 'number',
          answer: k,
          hint: `${n} is 10 and some more. How many more?`,
          explain: `${n} = 1 ten and ${placeCount(k, 0)}.`
        };
      }
      if (form === 'tensMissing') {
        return {
          prompt: `${n} = ? ten and ${placeCount(k, 0)}`,
          speak: `${n} equals how many tens and ${placeCount(k, 0)}?`,
          input: 'number',
          answer: 1,
          hint: 'How many groups of ten are in this number?',
          explain: `${n} = 1 ten and ${placeCount(k, 0)}.`
        };
      }
      if (form === 'chart') {
        return {
          prompt: 'What number is shown in the place value chart?',
          visuals: [{ type: 'pvchart', cols: ['Tens', 'Ones'], values: [1, k], dots: R.chance(0.5) }],
          input: 'number',
          answer: n,
          hint: 'The tens digit is on the left. The ones digit is on the right.',
          explain: `1 ten and ${placeCount(k, 0)} make ${n}.`
        };
      }
      return {
        prompt: `What number is **1 ten and ${placeCount(k, 0)}**?`,
        input: 'number',
        answer: n,
        hint: 'Start at 10 and count on the ones.',
        explain: `1 ten and ${placeCount(k, 0)} make ${n}.`
      };
    }
    const form = R.pick(['twenty', 'regroup', 'which', 'addten']);
    if (form === 'twenty') {
      const asTens = R.chance(0.5);
      return {
        prompt: asTens ? '2 tens = ?' : '1 ten and 10 ones = ?',
        speak: asTens ? '2 tens equals what number?' : '1 ten and 10 ones equals what number?',
        visuals: [{ type: 'baseten', t: asTens ? 2 : 1, o: asTens ? 0 : 10 }],
        input: 'number',
        answer: 20,
        hint: '10 ones can be grouped into 1 more ten.',
        explain: asTens ? '2 tens = 10 + 10 = 20.' : '10 ones make 1 ten. 1 ten and 1 ten make 2 tens = 20.'
      };
    }
    if (form === 'regroup') {
      return {
        prompt: `${n} ones = ? ten and ${placeCount(k, 0)}`,
        speak: `${n} ones equals how many tens and ${placeCount(k, 0)}?`,
        input: 'number',
        answer: 1,
        hint: 'Group 10 ones together to make 1 ten.',
        explain: `${n} ones = 10 ones and ${k} ones = 1 ten and ${placeCount(k, 0)}.`
      };
    }
    if (form === 'which') {
      const opts = [...new Set([n, Number(`${k}1`), k + 1, k, 100 + k])].filter((v) => v !== n || true);
      const choices = asNumChoices([...new Set(opts)].slice(0, 4).sort((a, b) => a - b));
      return {
        prompt: `Which number has **1 ten and ${placeCount(k, 0)}**?`,
        input: 'choice',
        answer: n,
        choices,
        hint: 'Write the tens digit first, then the ones digit.',
        explain: `1 ten and ${placeCount(k, 0)} is ${n}: the 1 is in the tens place and the ${k} is in the ones place.`
      };
    }
    return {
      prompt: R.chance(0.5) ? `10 + ${k} = ?` : `${k} + 10 = ?`,
      input: 'number',
      answer: n,
      hint: 'Adding 10 to a one-digit number puts a 1 in the tens place.',
      explain: `10 + ${k} = ${n}. That is 1 ten and ${placeCount(k, 0)}.`
    };
  }
};

const compare20 = {
  id: 'p1.num.compare20',
  level: 'P1',
  strand: 'numbers',
  unit: 7,
  title: 'Compare numbers to 20',
  vi: 'So sánh, sắp xếp số đến 20',
  icon: '⚖️',
  tip: 'So sánh hàng chục trước, nếu bằng nhau thì so hàng đơn vị. Dùng tia số 0–20 dán trên tường để con tra cứu.',
  gen(R, tier) {
    if (tier === 1) {
      const [a, b] = R.distinctInts(2, 5, 20);
      const askG = R.chance(0.5);
      const ans = askG ? Math.max(a, b) : Math.min(a, b);
      return {
        prompt: `Which number is **${askG ? 'greater' : 'smaller'}**, ${a} or ${b}?`,
        visuals: [{ type: 'numberline', min: 0, max: 20, every: 5, marks: [{ at: a, text: String(a) }, { at: b, text: String(b), color: 'purple' }] }],
        input: 'choice',
        answer: ans,
        choices: asNumChoices([a, b]),
        hint: 'On the number line, the number further to the right is greater.',
        explain: `${Math.max(a, b)} is greater than ${Math.min(a, b)}. The answer is ${ans}.`
      };
    }
    if (tier === 2) {
      const form = R.pick(['extreme', 'word', 'which']);
      if (form === 'extreme') {
        const nums = R.distinctInts(R.pick([3, 4]), 6, 20);
        const askG = R.chance(0.5);
        const ans = askG ? Math.max(...nums) : Math.min(...nums);
        return {
          prompt: `Which number is the **${askG ? 'greatest' : 'smallest'}**?`,
          visuals: [{ type: 'sequence', items: nums }],
          input: 'choice',
          answer: ans,
          choices: asNumChoices(nums),
          hint: 'Compare the tens first. If the tens are the same, compare the ones.',
          explain: `In order: ${[...nums].sort((x, y) => x - y).join(', ')}. The ${askG ? 'greatest' : 'smallest'} is ${ans}.`
        };
      }
      if (form === 'word') {
        const [a, b] = R.distinctInts(2, 8, 20);
        const ans = a > b ? 'greater than' : 'smaller than';
        return {
          prompt: `**${a}** is ____ **${b}**.`,
          speak: `${a} is blank ${b}.`,
          input: 'choice',
          answer: ans,
          choices: fixedChoices(['greater than', 'smaller than']),
          hint: 'Which number do you say first when you count? It is the smaller one.',
          explain: `${a} is ${ans} ${b}.`
        };
      }
      const target = R.int(12, 17);
      const askG = R.chance(0.5);
      const good = askG ? R.int(target + 1, 20) : R.int(Math.max(8, target - 6), target - 1);
      const badPool = askG ? [target, target - 1, target - 2, target - 5, target - 10] : [target, target + 1, target + 2, target + 3];
      const bad = R.sample(badPool.filter((v) => v >= 0 && v <= 20 && v !== good), 2);
      return {
        prompt: `Which number is **${askG ? 'greater' : 'smaller'} than ${target}**?`,
        input: 'choice',
        answer: good,
        choices: asNumChoices([good, ...bad].sort((x, y) => x - y)),
        hint: `${target} itself is not ${askG ? 'greater' : 'smaller'} than ${target}!`,
        explain: `${good} is ${askG ? 'greater' : 'smaller'} than ${target}.`
      };
    }
    if (R.chance(0.5)) {
      const k = R.int(1, 9);
      const s = 10 + k;
      const z = Math.min(20, Math.max(10, s + R.pick([-2, -1, 0, 1, 2])));
      if (R.chance(0.5)) return signQuestion(s, z, `10 + ${k}`, String(z), `10 + ${k} = ${s}. `);
      return signQuestion(z, s, String(z), `1 ten ${placeCount(k, 0)}`, `1 ten ${placeCount(k, 0)} = ${s}. `);
    }
    const lo = R.int(8, 16);
    const hi = lo + R.pick([2, 3]);
    const inside = [];
    for (let v = lo + 1; v < hi; v++) inside.push(v);
    const good = R.pick(inside);
    const bad = R.sample([lo, hi, lo - 1, hi + 1, lo - 2].filter((v) => v >= 0 && v <= 21), 3);
    return {
      prompt: `Which number is **greater than ${lo}** but **smaller than ${hi}**?`,
      input: 'choice',
      answer: good,
      choices: asNumChoices([good, ...bad].sort((x, y) => x - y)),
      hint: `List the numbers after ${lo} and before ${hi}. ${lo} and ${hi} themselves do not count.`,
      explain: `${good} comes after ${lo} and before ${hi}.`
    };
  }
};

const count20 = {
  id: 'p1.num.count20',
  level: 'P1',
  strand: 'numbers',
  unit: 7,
  title: 'Count on and back to 20',
  vi: 'Đếm xuôi, đếm ngược (bước 1, bước 2) trong phạm vi 20',
  icon: '🔁',
  tip: 'Đếm xuôi/ngược theo 1 và theo 2 bằng tiếng Anh khi đi bộ, lên cầu thang. Đếm theo 2 (two, four, six…) là nền móng cho bảng nhân 2.',
  gen(R, tier) {
    const forms = tier === 1 ? ['up1', 'next'] : tier === 2 ? ['down1', 'up2', 'up1'] : ['down2', 'countOn', 'countBack'];
    const form = R.pick(forms);
    if (form === 'countOn' || form === 'countBack') {
      const on = form === 'countOn';
      const k = R.int(2, 4);
      const s = on ? R.int(6, 20 - k) : R.int(8, 20);
      const ans = on ? s + k : s - k;
      const jumps = [];
      for (let i = 0; i < k; i++) jumps.push(on ? { from: s + i, to: s + i + 1 } : { from: s - i, to: s - i - 1 });
      return {
        prompt: `Start at **${s}**. Count ${on ? 'on' : 'back'} **${k}**. What number do you reach?`,
        input: 'number',
        answer: ans,
        hint: on ? `Say ${s}, then count ${k} more numbers on your fingers.` : `Say ${s}, then count back ${k} numbers on your fingers.`,
        explain: `${s} ${on ? '+' : '−'} ${k} = ${ans}.`,
        explainVisuals: [{ type: 'numberline', min: Math.max(0, Math.min(s, ans) - 2), max: Math.min(20, Math.max(s, ans) + 2), jumps }]
      };
    }
    const step = form === 'up2' || form === 'down2' ? 2 : 1;
    const down = form === 'down1' || form === 'down2';
    const len = 5;
    const span = step * (len - 1);
    const start = down ? R.int(span, 20) : R.int(0, 20 - span);
    const seq = Array.from({ length: len }, (_, i) => (down ? start - i * step : start + i * step));
    const idx = form === 'next' ? len - 1 : R.int(1, len - 1);
    const ans = seq[idx];
    return {
      prompt:
        form === 'next'
          ? 'What number comes next?'
          : `We are counting ${down ? '**backwards**' : '**on**'} by ${step === 2 ? '**2s**' : '1s'}. What is the missing number?`,
      visuals: [{ type: 'sequence', items: seq.map((v, i) => (i === idx ? '?' : v)) }],
      input: 'number',
      answer: ans,
      hint: `The numbers go ${down ? 'down' : 'up'} by ${step} each time.`,
      explain: `${seq.join(', ')}. The missing number is ${ans}.`
    };
  }
};

const TRICKY_TEENS = { 11: 1, 12: 20, 13: 30, 14: 40, 15: 50, 16: 60, 17: 70, 18: 80, 19: 90, 20: 12 };
const words20 = {
  id: 'p1.num.words20',
  level: 'P1',
  strand: 'numbers',
  unit: 7,
  title: 'Number words 11 to 20',
  vi: 'Đọc, viết số 11–20 bằng chữ',
  icon: '🔤',
  tip: 'Chú ý cặp dễ nhầm: thirteen (13) / thirty (30), fourteen (14) / forty (40)… Chữ "-teen" là số từ 13–19. Lưu ý chính tả: forty (không có u), fifteen, eighteen.',
  gen(R, tier) {
    const n = tier === 1 ? R.int(11, 15) : R.int(11, 20);
    const pool = [n + 1, n - 1, n - 10, TRICKY_TEENS[n], n + 2].filter((v) => v >= 0 && v !== n);
    if (tier < 3 && R.chance(0.3)) {
      const it = item(R);
      return {
        prompt: `How many ${it.many} are there? Choose the number word.`,
        visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: n }], perRow: 5 }],
        input: 'choice',
        answer: numWord(n),
        choices: textChoices(R, numWord(n), pool.map(numWord), 4),
        hint: 'Count in fives along the rows, then count on. Then find the word.',
        explain: `There are ${n} ${it.many}. ${n} is written as "${numWord(n)}".`
      };
    }
    if (R.chance(0.5)) {
      return {
        prompt: `How do we write **${n}** in words?`,
        input: 'choice',
        answer: numWord(n),
        choices: textChoices(R, numWord(n), (tier === 3 ? [TRICKY_TEENS[n], ...pool] : pool).map(numWord), 4),
        hint: 'Numbers from 13 to 19 end with "teen".',
        explain: `${n} is written as "${numWord(n)}".`
      };
    }
    if (tier === 1) {
      return {
        prompt: `Which number is **${numWord(n)}**?`,
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { near: pool, min: 0, max: 99 }),
        hint: 'Read the word slowly. Does it end with "teen"?',
        explain: `"${numWord(n)}" is ${n}.`
      };
    }
    return {
      prompt: `Write **${numWord(n)}** as a number.`,
      speak: `Write ${numWord(n)} as a number.`,
      input: 'number',
      answer: n,
      hint: tier === 3 ? '"teen" numbers have a 1 in the tens place. "ty" numbers like thirty end in 0.' : 'Count up from ten: eleven, twelve, thirteen …',
      explain: `"${numWord(n)}" is ${n}.`
    };
  }
};

// ------------------------------------------------------------------ P1 unit 11: numbers to 100
const count100 = {
  id: 'p1.pv.count100',
  level: 'P1',
  strand: 'numbers',
  unit: 11,
  title: 'Count tens and ones',
  vi: 'Đếm chục và đơn vị (đến 100)',
  icon: '🧱',
  tip: 'Đếm các thanh chục trước theo 10 ("10, 20, 30…") rồi đếm tiếp các khối lẻ ("31, 32…"). Có thể dùng que kem buộc bó 10 để con thực hành bằng tay.',
  gen(R, tier) {
    if (tier === 1) {
      const t = R.int(2, 9);
      if (R.chance(0.4)) {
        return {
          prompt: 'How many cubes are there? Count in tens.',
          visuals: [{ type: 'baseten', t }],
          input: 'number',
          answer: t * 10,
          hint: 'Each rod has 10 cubes. Count: 10, 20, 30 …',
          explain: `${placeCount(t, 1)} = ${t * 10}.`
        };
      }
      const o = R.int(1, 5);
      return {
        prompt: R.pick(['What number do the blocks show?', 'How many cubes are there?']),
        visuals: [{ type: 'baseten', t, o }],
        input: 'number',
        answer: t * 10 + o,
        hint: 'Count the tens first: 10, 20 … Then count on the ones.',
        explain: `${placeCount(t, 1)} and ${placeCount(o, 0)} make ${t * 10 + o}.`
      };
    }
    if (tier === 2) {
      const t = R.int(1, 9);
      const o = R.int(0, 9);
      const n = t * 10 + o;
      const form = R.pick(['number', 'number', 'howTens', 'howOnes']);
      if (form === 'howTens' || form === 'howOnes') {
        const tens = form === 'howTens';
        return {
          prompt: `Look at the blocks. How many **${tens ? 'tens' : 'ones'}** are there?`,
          visuals: [{ type: 'baseten', t, o }],
          input: 'number',
          answer: tens ? t : o,
          hint: 'A long rod is 1 ten. A small cube is 1 one.',
          explain: `There ${tens ? (t === 1 ? 'is 1 ten' : `are ${t} tens`) : o === 1 ? 'is 1 one' : `are ${o} ones`}. The number is ${n}.`
        };
      }
      return {
        prompt: 'What number do the blocks show?',
        visuals: [{ type: 'baseten', t, o }],
        input: 'number',
        answer: n,
        hint: 'Count the rods in tens, then count on the small cubes in ones.',
        explain: `${placeCount(t, 1)} and ${placeCount(o, 0)} make ${n}.`
      };
    }
    const form = R.pick(['regroup', 'bundles', 'missingTens']);
    if (form === 'regroup') {
      const t = R.int(1, 7);
      const o = R.int(10, 16);
      const n = t * 10 + o;
      return {
        prompt: 'What number do the blocks show? Be careful with the ones!',
        visuals: [{ type: 'baseten', t, o }],
        input: 'number',
        answer: n,
        hint: 'There are more than 10 ones. 10 ones make 1 more ten!',
        explain: `${o} ones = 1 ten ${placeCount(o - 10, 0)}. So we have ${placeCount(t + 1, 1)} ${placeCount(o - 10, 0)} = ${n}.`
      };
    }
    if (form === 'bundles') {
      const t = R.int(2, 7);
      const o = R.int(10, 15);
      const n = t * 10 + o;
      return {
        prompt: `Ravi has **${t}** bundles of 10 straws and **${o}** loose straws. How many straws does he have?`,
        input: 'number',
        answer: n,
        hint: `Count the bundles in tens: 10, 20 … Then count on ${o} more.`,
        explain: `${t} bundles = ${t * 10}. ${t * 10} + ${o} = ${n}.`
      };
    }
    const t = R.int(2, 9);
    const o = R.int(0, 9);
    const n = t * 10 + o;
    return {
      prompt: `? tens and ${placeCount(o, 0)} make ${n}.`,
      speak: `How many tens and ${placeCount(o, 0)} make ${n}?`,
      input: 'number',
      answer: t,
      hint: `Look at the tens digit of ${n}.`,
      explain: `${n} = ${placeCount(t, 1)} and ${placeCount(o, 0)}.`
    };
  }
};

/**
 * Place value skill factory (digits, values, expanded form, regrouping) for 2, 3 or 4-digit numbers.
 */
function pvSkill({ places, baseten, ...meta }) {
  const cols = PLACE_COL.slice(0, places).reverse();
  const placeNames = PLACE.slice(0, places);
  const rand = (R) => randDigits(R, places);
  /** a number with a digit that appears exactly once and is non-zero -> {n, p, d} */
  function uniqueDigit(R) {
    for (let g = 0; g < 60; g++) {
      const n = rand(R);
      const ds = digitsOf(n);
      const cands = [];
      for (let p = 0; p < places; p++) {
        const d = ds[places - 1 - p];
        if (d !== 0 && ds.filter((x) => x === d).length === 1) cands.push({ p, d });
      }
      if (cands.length) return { n, ...R.pick(cands) };
    }
    const n = Number('123456789'.slice(0, places));
    return { n, p: 0, d: places };
  }
  return {
    ...meta,
    gen(R, tier) {
      if (tier === 1) {
        const forms = baseten ? ['chart', 'blocks', 'compose'] : ['chart', 'chartDots', 'compose'];
        const form = R.pick(forms);
        if (form === 'blocks') {
          const n = places === 3 ? randDigits(R, 3, 1, 5) : rand(R);
          const [h, t, o] = String(n).padStart(3, '0').split('').map(Number);
          return {
            prompt: 'What number do the blocks show?',
            visuals: [{ type: 'baseten', h, t, o }],
            input: 'number',
            answer: n,
            hint: places === 3 ? 'A big square is 100, a rod is 10 and a small cube is 1.' : 'A rod is 10 and a small cube is 1.',
            explain: `${placeWords(n, places)} make ${n}.`
          };
        }
        const n = rand(R);
        if (form === 'compose') {
          return {
            prompt: `${placeWords(n, places)} = ?`,
            speak: `${placeWords(n, places)} equals what number?`,
            input: 'number',
            answer: n,
            hint: `Write one digit for each place, starting with the ${placeNames[places - 1]}.`,
            explain: `${placeWords(n, places)} make ${n}.`
          };
        }
        const dots = form === 'chartDots' && places <= 3;
        return {
          prompt: dots ? 'Count the dots in each column. What number is shown?' : 'What number is shown in the place value chart?',
          visuals: [{ type: 'pvchart', cols, values: digitsOf(n), dots }],
          input: 'number',
          answer: n,
          hint: 'Read the digits from the left to the right.',
          explain: `${placeWords(n, places)} make ${n}.`
        };
      }
      if (tier === 2) {
        const form = R.pick(['value', 'place', 'digitAt', 'expanded']);
        if (form === 'value' || form === 'place') {
          const { n, p, d } = uniqueDigit(R);
          if (form === 'value') {
            return {
              prompt: R.pick([`What is the value of the digit **${d}** in **${n}**?`, `In **${n}**, what does the digit **${d}** stand for?`]),
              input: 'number',
              answer: d * pow10(p),
              hint: `First find the place of the ${d} (from the right: ${placeNames.join(', ')}). The ${d} stands for ${d} of that place.`,
              explain: `In ${n}, the digit ${d} is in the ${PLACE[p]} place, so it stands for ${d * pow10(p)}.`
            };
          }
          return {
            prompt: `In **${n}**, the digit **${d}** is in the ____ place.`,
            speak: `In ${n}, the digit ${d} is in the blank place.`,
            visuals: R.chance(0.4) ? [{ type: 'pvchart', cols, values: digitsOf(n) }] : [],
            input: 'choice',
            answer: PLACE[p],
            choices: [...placeNames].reverse().map((v) => ({ value: v, label: v })),
            hint: `The last digit is in the ones place. Count the places from the right: ${placeNames.join(', ')}.`,
            explain: `In ${n}, the ${d} is in the ${PLACE[p]} place. It stands for ${d * pow10(p)}.`
          };
        }
        const n = rand(R);
        if (form === 'digitAt') {
          const p = R.int(0, places - 1);
          const d = digitsOf(n)[places - 1 - p];
          return {
            prompt: `Which digit is in the **${PLACE[p]}** place in **${n}**?`,
            input: 'number',
            answer: d,
            hint: `Count the places from the right: ${placeNames.join(', ')}.`,
            explain: `${n} = ${placeWords(n, places)}. The digit in the ${PLACE[p]} place is ${d}.`
          };
        }
        let m = n;
        for (let g = 0; g < 30 && partsOf(m).length < 2; g++) m = rand(R);
        const parts = partsOf(m);
        if (parts.length < 2) parts.push(0);
        const hideIdx = R.int(0, parts.length - 1);
        const shown = parts.map((v, i) => (i === hideIdx ? '?' : v));
        const text = `${m} = ${shown.join(' + ')}`;
        return {
          prompt: `What is the missing number?\n${text}`,
          speak: `What is the missing number? ${say(text)}`,
          visuals: [{ type: 'equation', text, size: 'lg' }],
          input: 'number',
          answer: parts[hideIdx],
          hint: `Break ${m} into the value of each digit.`,
          explain: `${m} = ${parts.join(' + ')}. The missing number is ${parts[hideIdx]}.`
        };
      }
      const form = R.pick(['regroup', 'which', 'expandedSum']);
      if (form === 'regroup') {
        const lead = R.int(1, places === 2 ? 7 : 7);
        const p = R.int(0, places - 2);
        const counts = [];
        for (let q = places - 1; q >= 0; q--) {
          if (q === places - 1) counts.push(lead);
          else if (q === p) counts.push(R.int(10, 19));
          else counts.push(R.int(0, 9));
        }
        let total = 0;
        counts.forEach((c, i) => {
          total += c * pow10(places - 1 - i);
        });
        const words = counts.map((c, i) => placeCount(c, places - 1 - i)).join(' ');
        const big = counts[places - 1 - p];
        return {
          prompt: `${words} = ?`,
          speak: `${words} equals what number?`,
          input: 'number',
          answer: total,
          hint: `${big} ${PLACE[p]} is more than 9 ${PLACE[p]}. Regroup 10 ${PLACE[p]} into 1 ${PLACE[p + 1].slice(0, -1)}.`,
          explain: `${big} ${PLACE[p]} = ${big * pow10(p)}. Adding all the parts: ${counts.map((c, i) => c * pow10(places - 1 - i)).filter((v) => v > 0).join(' + ')} = ${total}.`
        };
      }
      if (form === 'which') {
        let n = rand(R);
        if (places >= 3) {
          const ds = digitsOf(n);
          ds[R.int(1, places - 1)] = 0;
          n = Number(ds.join(''));
        }
        const ds = digitsOf(n);
        const desc =
          places === 2
            ? `${placeCount(ds[1], 0)} and ${placeCount(ds[0], 1)}`
            : ds.map((c, i) => placeCount(c, places - 1 - i)).join(', ').replace(/, ([^,]*)$/, ' and $1');
        const alt = new Set([n]);
        for (const v of [Number(String(n).split('').reverse().join('')), Number(String(n).replace(/0/g, '')), ...nearNumbers(n), ds.reduce((a, b) => a + b, 0)]) {
          if (alt.size >= 4) break;
          if (Number.isFinite(v) && v > 0) alt.add(v);
        }
        return {
          prompt: `Which number has **${desc}**?`,
          input: 'choice',
          answer: n,
          choices: asNumChoices([...alt].sort((a, b) => a - b)),
          hint: `Write the digits in place order: ${[...placeNames].reverse().join(', ')}. Use 0 when a place is empty.`,
          explain: `${placeWords(n, places)} is ${n}.`
        };
      }
      let n = rand(R);
      for (let g = 0; g < 30 && partsOf(n).length < Math.min(3, places); g++) n = rand(R);
      const parts = R.shuffle(partsOf(n));
      const text = `${parts.join(' + ')} = ?`;
      return {
        prompt: 'What is the missing number?',
        speak: `What is the missing number? ${say(text)}`,
        visuals: [{ type: 'equation', text, size: 'lg' }],
        input: 'number',
        answer: n,
        hint: 'Put each part in its place: thousands, hundreds, tens, ones. The order of adding does not matter.',
        explain: `${partsOf(n).join(' + ')} = ${n}.`
      };
    }
  };
}

const digit100 = pvSkill({
  places: 2,
  baseten: true,
  id: 'p1.pv.digit100',
  level: 'P1',
  strand: 'numbers',
  unit: 11,
  title: 'Place value: tens and ones',
  vi: 'Giá trị hàng chục, hàng đơn vị',
  icon: '🏠',
  tip: 'Trong 47: chữ số 4 ở hàng chục (tens place) và có giá trị 40; chữ số 7 ở hàng đơn vị, giá trị 7. Hỏi con "What does the 4 stand for?" để kiểm tra con hiểu giá trị, không chỉ đọc chữ số.'
});

/** Number words factory (numeral -> words as choices, words -> numeral typed). */
function wordsSkill({ pick, choiceTier = 0, hint, ...meta }) {
  return {
    ...meta,
    gen(R, tier) {
      const n = pick(R, tier);
      const near = [...new Set(nearNumbers(n))];
      if (R.chance(0.5)) {
        return {
          prompt: `How do we write **${n}** in words?`,
          input: 'choice',
          answer: numWord(n),
          choices: textChoices(R, numWord(n), near.map(numWord), 4),
          hint: hint(n),
          explain: `${n} is written as "${numWord(n)}".`
        };
      }
      if (tier <= choiceTier) {
        return {
          prompt: `Which number is **${numWord(n)}**?`,
          speak: `Which number is ${numWord(n)}?`,
          input: 'choice',
          answer: n,
          choices: numChoices(R, n, { near, min: 0, max: 100000 }),
          hint: hint(n),
          explain: `"${numWord(n)}" is ${n}.`
        };
      }
      return {
        prompt: `Write **${numWord(n)}** as a number.`,
        speak: `Write ${numWord(n)} as a number.`,
        input: 'number',
        answer: n,
        hint: hint(n),
        explain: n < 10000 ? `"${numWord(n)}" is ${n}: ${placeWords(n, String(n).length)}.` : `"${numWord(n)}" is ${n}.`
      };
    }
  };
}

const words100 = wordsSkill({
  id: 'p1.num.words100',
  level: 'P1',
  strand: 'numbers',
  unit: 11,
  title: 'Number words to 100',
  vi: 'Đọc, viết số đến 100 bằng chữ',
  icon: '📝',
  tip: 'Số tròn chục: twenty, thirty, forty, fifty… Số như 47 viết "forty-seven" (có gạch nối). Chú ý: forty không có chữ "u".',
  choiceTier: 1,
  pick(R, tier) {
    if (tier === 1) return R.step(20, 90, 10);
    if (tier === 2) return R.intExcept(21, 99, [30, 40, 50, 60, 70, 80, 90]);
    return R.pick([R.int(11, 19), R.step(20, 90, 10), 100, R.int(21, 99), R.int(41, 99)]);
  },
  hint: (n) => (n % 10 === 0 ? 'Tens numbers end in "-ty": twenty, thirty, forty …' : 'Say the tens word, then the ones word, joined with a hyphen: forty-seven.')
});

/** Compare / order factory for numbers with `digits` digits. */
function compareSkill({ digits, ...meta }) {
  const max = pow10(digits) - 1;
  const rand = (R) => randDigits(R, digits);
  function close(R, n) {
    for (let g = 0; g < 20; g++) {
      const s = String(n).split('');
      if (R.chance(0.5)) {
        const i = R.int(1, digits - 1);
        s[i] = String(R.intExcept(0, 9, [Number(s[i])]));
      } else {
        const i = R.int(0, digits - 2);
        const j = R.int(i + 1, digits - 1);
        [s[i], s[j]] = [s[j], s[i]];
      }
      const v = Number(s.join(''));
      if (s[0] !== '0' && v !== n) return v;
    }
    return n < max ? n + 1 : n - 1;
  }
  return {
    ...meta,
    gen(R, tier) {
      if (tier === 1) {
        const a = rand(R);
        let b = rand(R);
        for (let g = 0; g < 30 && String(b)[0] === String(a)[0]; g++) b = rand(R);
        if (b === a) b = a < max ? a + pow10(digits - 1) <= max ? a + pow10(digits - 1) : a - pow10(digits - 1) : a - 1;
        if (R.chance(0.5)) {
          const askG = R.chance(0.5);
          const ans = askG ? Math.max(a, b) : Math.min(a, b);
          return {
            prompt: `Which number is **${askG ? 'greater' : 'smaller'}**, ${a} or ${b}?`,
            input: 'choice',
            answer: ans,
            choices: asNumChoices([a, b]),
            hint: `Compare the ${PLACE[digits - 1]} digits first.`,
            explain: `${Math.max(a, b)} has more ${PLACE[digits - 1]} than ${Math.min(a, b)}, so ${Math.max(a, b)} is greater and ${Math.min(a, b)} is smaller. The answer is ${ans}.`
          };
        }
        const ans = a > b ? 'greater than' : 'smaller than';
        return {
          prompt: `**${a}** is ____ **${b}**.`,
          speak: `${a} is blank ${b}.`,
          input: 'choice',
          answer: ans,
          choices: fixedChoices(['greater than', 'smaller than']),
          hint: `Compare the ${PLACE[digits - 1]} first.`,
          explain: `${a} is ${ans} ${b}.`
        };
      }
      if (tier === 2) {
        if (R.chance(0.5)) {
          const k = R.pick([3, 4]);
          const base = rand(R);
          const set = new Set([base]);
          for (let g = 0; g < 40 && set.size < k; g++) set.add(close(R, R.pick([...set])));
          const nums = R.shuffle([...set]);
          const askG = R.chance(0.5);
          const ans = askG ? Math.max(...nums) : Math.min(...nums);
          return {
            prompt: `Which number is the **${askG ? 'greatest' : 'smallest'}**?`,
            visuals: [{ type: 'sequence', items: nums }],
            input: 'choice',
            answer: ans,
            choices: asNumChoices(nums),
            hint: 'Compare from the highest place. If those digits are the same, compare the next place.',
            explain: `In order: ${[...nums].sort((x, y) => x - y).join(', ')}. The ${askG ? 'greatest' : 'smallest'} is ${ans}.`
          };
        }
        const a = rand(R);
        return signQuestion(a, close(R, a));
      }
      const form = R.pick(['order', 'signExpr', 'between']);
      if (form === 'order') {
        const ds = R.distinctInts(digits, 1, 9);
        const all = R.shuffle(numbersFromDigits(ds));
        const nums = all.slice(0, Math.min(4, all.length));
        const asc = R.chance(0.5);
        const { answer, choices } = orderChoices(R, nums, asc);
        return {
          prompt: `Arrange the numbers from **${asc ? 'smallest to greatest' : 'greatest to smallest'}**.`,
          visuals: [{ type: 'sequence', items: nums }],
          input: 'choice',
          answer,
          choices,
          hint: 'The digits are the same, so look carefully at which digit is in the highest place.',
          explain: `From ${asc ? 'smallest to greatest' : 'greatest to smallest'}: ${answer}.`
        };
      }
      if (form === 'signExpr') {
        let n = rand(R);
        for (let g = 0; g < 20 && partsOf(n).length < 2; g++) n = rand(R);
        const m = R.chance(0.35) ? n : close(R, n);
        const usePlaceWords = digits <= 3 && R.chance(0.4);
        const exprText = usePlaceWords ? placeWords(n, digits) : R.shuffle(partsOf(n)).join(' + ');
        const work = `${exprText} = ${n}. `;
        return R.chance(0.5) ? signQuestion(n, m, exprText, String(m), work) : signQuestion(m, n, String(m), exprText, work);
      }
      const gap = R.pick([3, 4, 5]) * (digits >= 3 ? R.pick([1, 10]) : 1);
      const lo = R.int(pow10(digits - 1), max - gap - 1);
      const hi = lo + gap;
      const good = R.int(lo + 1, hi - 1);
      const badSet = new Set();
      for (const v of R.shuffle([lo, hi, lo - 1, hi + 1, hi + gap, lo - gap])) {
        if (badSet.size >= 3) break;
        if (v >= 0 && v !== good && (v <= lo || v >= hi)) badSet.add(v);
      }
      return {
        prompt: `Which number is **greater than ${lo}** but **smaller than ${hi}**?`,
        input: 'choice',
        answer: good,
        choices: asNumChoices([good, ...badSet].sort((x, y) => x - y)),
        hint: `The number must come after ${lo} AND before ${hi}. ${lo} and ${hi} themselves do not count.`,
        explain: `${lo} < ${good} < ${hi}, so ${good} is the answer.`
      };
    }
  };
}

const compare100 = compareSkill({
  digits: 2,
  id: 'p1.num.compare100',
  level: 'P1',
  strand: 'numbers',
  unit: 11,
  title: 'Compare numbers to 100',
  vi: 'So sánh, sắp xếp số đến 100',
  icon: '🔍',
  tip: 'So sánh hàng chục trước: 58 và 85 có hàng chục 5 < 8 nên 58 < 85. Nếu hàng chục bằng nhau mới so hàng đơn vị. Đây là thói quen cần có cho mọi số lớn hơn sau này.'
});

/** Number pattern factory: missing terms, "k more / less than n", find the rule. */
function patternSkill({ max, steps, moreLess, downFrom = 2, ...meta }) {
  const ruleLabel = (s) => (s > 0 ? `Add ${s}` : `Subtract ${-s}`);
  function makeSeq(R, step, len, cross) {
    const span = Math.abs(step) * (len - 1);
    let start;
    if (cross && Math.abs(step) < max / 10) {
      const unit = Math.abs(step) * 10;
      const b = R.step(unit, Math.max(unit, max - unit), unit);
      start = step > 0 ? b - Math.abs(step) * R.int(1, len - 2) : b + Math.abs(step) * R.int(1, len - 2);
      start = Math.max(step > 0 ? 0 : span, Math.min(start, step > 0 ? max - span : max));
    } else {
      start = step > 0 ? R.int(0, Math.max(0, max - span)) : R.int(span, max);
      if (Math.abs(step) >= 5 && R.chance(0.6)) start = Math.round(start / Math.abs(step)) * Math.abs(step);
      start = Math.max(step > 0 ? 0 : span, Math.min(start, step > 0 ? max - span : max));
    }
    return Array.from({ length: len }, (_, i) => start + i * step);
  }
  return {
    ...meta,
    gen(R, tier) {
      const forms = tier === 1 ? ['missing', 'moreLess'] : tier === 2 ? ['missing', 'moreLess', 'rule'] : ['missing', 'missingFirst', 'rule', 'moreLess'];
      const form = R.pick(forms);
      if (form === 'moreLess') {
        const k = R.pick(moreLess[tier]);
        const more = R.chance(0.5);
        const n = more ? R.int(0, max - k) : R.int(k, max);
        const ans = more ? n + k : n - k;
        return {
          prompt: `What is **${k} ${more ? 'more' : 'less'}** than ${n}?`,
          input: 'number',
          answer: ans,
          hint: `${k} ${more ? 'more' : 'less'} means ${more ? 'add' : 'subtract'} ${k}. Which digit changes?`,
          explain: `${n} ${more ? '+' : '−'} ${k} = ${ans}.`
        };
      }
      let step = R.pick(steps[tier]);
      if (tier >= downFrom && R.chance(0.45)) step = -step;
      const len = 5;
      const seq = makeSeq(R, step, len, tier === 3);
      if (form === 'rule') {
        const a = Math.abs(step);
        const pool = [-step, ...steps[3].filter((s) => s !== a), ...steps[2].filter((s) => s !== a), a * 2, a === 1 ? 2 : Math.max(1, a / 2)];
        const labels = new Set([ruleLabel(step)]);
        for (const s of R.shuffle(pool)) {
          if (labels.size >= 4) break;
          if (Number.isInteger(s) && s !== 0) labels.add(ruleLabel(s));
        }
        return {
          prompt: 'What is the **rule** of this number pattern?',
          visuals: [{ type: 'sequence', items: seq }],
          input: 'choice',
          answer: ruleLabel(step),
          choices: R.shuffle([...labels]).map((v) => ({ value: v, label: v })),
          hint: 'Find the difference between two numbers next to each other. Are the numbers going up or down?',
          explain: `${seq[0]} → ${seq[1]} → ${seq[2]}: the numbers go ${step > 0 ? 'up' : 'down'} by ${Math.abs(step)} each time. The rule is "${ruleLabel(step)}".`
        };
      }
      const idx = form === 'missingFirst' ? 0 : R.int(1, len - 1);
      const ans = seq[idx];
      return {
        prompt: form === 'missingFirst' ? 'What is the **first** number in the pattern?' : 'What is the missing number in the pattern?',
        visuals: [{ type: 'sequence', items: seq.map((v, i) => (i === idx ? '?' : v)) }],
        input: 'number',
        answer: ans,
        hint: form === 'missingFirst' ? 'Find the rule, then work backwards from the second number.' : 'Find the rule first: how much does it go up or down each time?',
        explain: `The numbers go ${step > 0 ? 'up' : 'down'} by ${Math.abs(step)} each time: ${seq.join(', ')}. The missing number is ${ans}.`
      };
    }
  };
}

const pattern100 = patternSkill({
  max: 100,
  steps: { 1: [1, 10], 2: [2, 5, 10, 1], 3: [2, 5, 10, 3] },
  moreLess: { 1: [1, 10], 2: [1, 2, 10], 3: [10, 20, 5] },
  downFrom: 2,
  id: 'p1.num.pattern100',
  level: 'P1',
  strand: 'numbers',
  unit: 11,
  title: 'Number patterns to 100',
  vi: 'Quy luật dãy số (cộng/trừ 1, 2, 5, 10)',
  icon: '🔢',
  tip: 'Dạy con tìm "rule" bằng cách viết khoảng cách (+2, +2…) giữa các số. "10 more" chỉ làm thay đổi chữ số hàng chục: 34 → 44.'
});

const hundredChart = {
  id: 'p1.num.hundredchart',
  level: 'P1',
  strand: 'numbers',
  unit: 11,
  title: 'Hundred chart',
  vi: 'Bảng 100 ô: số còn thiếu, hơn/kém 10',
  icon: '💯',
  tip: 'Trên bảng 100: sang phải +1, sang trái −1, xuống dưới +10, lên trên −10. In một bảng 1–100 dán tường để con chơi "nhảy ô".',
  gen(R, tier) {
    const rowOf = (v) => Math.floor((v - 1) / 10);
    if (tier === 1) {
      const r0 = R.int(0, 8);
      const start = r0 * 10 + 1;
      const v = R.int(start + 1, start + 18);
      return {
        prompt: 'What is the missing number in the hundred chart?',
        visuals: [{ type: 'hundredchart', start, rows: 2, cols: 10, missing: [v] }],
        input: 'number',
        answer: v,
        hint: 'Look at the numbers just before and just after the box.',
        explain: `The number after ${v - 1} is ${v}.`
      };
    }
    if (tier === 2) {
      const dirs = [
        ['below', 10, 'just **below**', '10 more'],
        ['above', -10, 'just **above**', '10 less'],
        ['right', 1, 'just to the **right of**', '1 more'],
        ['left', -1, 'just to the **left of**', '1 less']
      ];
      const [, delta, phrase, meaning] = R.pick(dirs);
      let ref = R.int(12, 89);
      if (Math.abs(delta) === 1 && ((delta === 1 && ref % 10 === 0) || (delta === -1 && ref % 10 === 1))) ref += delta === 1 ? -1 : 1;
      const ans = ref + delta;
      const r1 = Math.min(rowOf(ref), rowOf(ans));
      const startRow = Math.max(0, Math.min(r1 - (R.chance(0.5) ? 1 : 0), 7));
      const rows = Math.max(rowOf(ref), rowOf(ans)) - startRow + 1 + (startRow + 3 <= 9 ? 1 : 0);
      return {
        prompt: `On the hundred chart, which number is ${phrase} ${ref}?`,
        visuals: [{ type: 'hundredchart', start: startRow * 10 + 1, rows: Math.min(rows, 10 - startRow), cols: 10, missing: [ans], highlight: [ref] }],
        input: 'number',
        answer: ans,
        hint: `Moving ${phrase.replace(/\*\*/g, '').replace('just ', '')} means ${meaning}.`,
        explain: `${meaning === '10 more' || meaning === '1 more' ? `${ref} + ${Math.abs(delta)}` : `${ref} − ${Math.abs(delta)}`} = ${ans}.`
      };
    }
    if (R.chance(0.5)) {
      const down = R.int(1, 3);
      const right = R.int(-2, 2);
      let start = R.int(11, 69);
      const col = ((start - 1) % 10) + right;
      if (col < 0 || col > 9) start -= right;
      const ans = start + down * 10 + right;
      const moves = [`**${down}** ${down === 1 ? 'square' : 'squares'} down`];
      if (right) moves.push(`**${Math.abs(right)}** ${Math.abs(right) === 1 ? 'square' : 'squares'} to the ${right > 0 ? 'right' : 'left'}`);
      const r0 = Math.max(0, Math.min(rowOf(start), 6));
      return {
        prompt: `Start at **${start}** on the hundred chart. Move ${moves.join(' and ')}. Where do you land?`,
        visuals: [{ type: 'hundredchart', start: r0 * 10 + 1, rows: 4, cols: 10, highlight: [start] }],
        input: 'number',
        answer: ans,
        hint: 'Each square down adds 10. Each square right adds 1, each square left takes away 1.',
        explain: `${start} + ${down * 10}${right ? ` ${right > 0 ? '+' : '−'} ${Math.abs(right)}` : ''} = ${ans}.`
      };
    }
    const n = R.int(12, 88);
    const t = R.pick([10, -10]);
    const o = R.pick([1, -1, 2, -2]);
    const ans = n + t + o;
    const desc = `${Math.abs(t)} ${t > 0 ? 'more' : 'less'} and ${Math.abs(o)} ${o > 0 ? 'more' : 'less'}`;
    return {
      prompt: `What number is **${desc}** than ${n}?`,
      input: 'number',
      answer: ans,
      hint: 'Do one step at a time: first the tens, then the ones.',
      explain: `${n} ${t > 0 ? '+' : '−'} 10 = ${n + t}, then ${n + t} ${o > 0 ? '+' : '−'} ${Math.abs(o)} = ${ans}.`
    };
  }
};

const skipCount = {
  id: 'p1.num.skipcount',
  level: 'P1',
  strand: 'numbers',
  unit: 11,
  title: 'Count in 2s, 5s and 10s',
  vi: 'Đếm cách 2, cách 5, cách 10',
  icon: '🖐️',
  tip: 'Đếm theo nhóm nhanh hơn đếm từng cái: đôi tất đếm 2, bàn tay đếm 5, bó que đếm 10. Đây là bước chuẩn bị trực tiếp cho phép nhân (Multiplication) cuối năm P1.',
  gen(R, tier) {
    if (tier === 1) {
      const n = R.int(2, 9);
      if (R.chance(0.5)) {
        const it = item(R, 'food');
        return {
          prompt: `Each row has 10 ${it.many}. How many ${it.many} are there? Count in tens.`,
          visuals: [{ type: 'array', rows: n, cols: 10, emoji: it.e }],
          input: 'number',
          answer: n * 10,
          hint: 'Count the rows: 10, 20, 30 …',
          explain: `${n} tens = ${Array.from({ length: n }, (_, i) => (i + 1) * 10).join(', ')}. There are ${n * 10}.`
        };
      }
      return {
        prompt: `There are **${n}** bundles of 10 sticks. How many sticks are there?`,
        visuals: [{ type: 'baseten', t: n }],
        input: 'number',
        answer: n * 10,
        hint: 'Count in tens: 10, 20, 30 …',
        explain: `${n} bundles of 10 = ${n * 10} sticks.`
      };
    }
    if (tier === 2) {
      const form = R.pick(['hands', 'socks', 'packets']);
      if (form === 'hands') {
        const n = R.int(2, 10);
        return {
          prompt: 'How many fingers are there? Count in **fives**.',
          visuals: [{ type: 'objects', groups: [{ emoji: '🖐️', count: n }] }],
          input: 'number',
          answer: n * 5,
          hint: 'Each hand has 5 fingers. Count: 5, 10, 15 …',
          explain: `${n} hands: ${Array.from({ length: n }, (_, i) => (i + 1) * 5).join(', ')}. There are ${n * 5} fingers.`
        };
      }
      if (form === 'socks') {
        const n = R.int(3, 10);
        return {
          prompt: `There are **${n}** pairs of socks. How many socks are there? Count in **twos**.`,
          visuals: [{ type: 'objects', groups: [{ emoji: '🧦', count: n }] }],
          input: 'number',
          answer: n * 2,
          hint: 'A pair is 2. Count: 2, 4, 6 …',
          explain: `${n} pairs: ${Array.from({ length: n }, (_, i) => (i + 1) * 2).join(', ')}. There are ${n * 2} socks.`
        };
      }
      const n = R.int(2, 8);
      const it = item(R, 'food');
      return {
        prompt: `Each packet has 5 ${it.many}. There are **${n}** packets. How many ${it.many} are there?`,
        visuals: [{ type: 'array', rows: n, cols: 5, emoji: it.e, boxRows: true }],
        input: 'number',
        answer: n * 5,
        hint: 'Count in fives: 5, 10, 15 …',
        explain: `${n} fives = ${n * 5}.`
      };
    }
    const form = R.pick(['seq', 'mixed', 'offset']);
    if (form === 'mixed') {
      const a = R.int(1, 5);
      const b = R.int(1, 6);
      return {
        prompt: `Mum buys **${a}** ${a === 1 ? 'pack' : 'packs'} of 10 eggs and **${b}** ${b === 1 ? 'pack' : 'packs'} of 5 eggs. How many eggs does she buy?`,
        input: 'number',
        answer: a * 10 + b * 5,
        hint: 'Count the tens first, then count on in fives.',
        explain: `${a} tens = ${a * 10}. Then count on ${b} fives: ${a * 10 + b * 5}.`
      };
    }
    if (form === 'offset') {
      const s = R.int(1, 9);
      const seq = Array.from({ length: 5 }, (_, i) => s + i * 10);
      const idx = R.int(2, 4);
      return {
        prompt: 'Count in tens. What is the missing number?',
        visuals: [{ type: 'sequence', items: seq.map((v, i) => (i === idx ? '?' : v)) }],
        input: 'number',
        answer: seq[idx],
        hint: 'Adding 10 changes only the tens digit.',
        explain: `${seq.join(', ')}. The missing number is ${seq[idx]}.`
      };
    }
    const step = R.pick([2, 5, 10]);
    const start = step * R.int(1, step === 10 ? 4 : 8);
    const seq = Array.from({ length: 5 }, (_, i) => start + i * step);
    const idx = R.int(1, 4);
    return {
      prompt: `Count in **${step === 2 ? 'twos' : step === 5 ? 'fives' : 'tens'}**. What is the missing number?`,
      visuals: [{ type: 'sequence', items: seq.map((v, i) => (i === idx ? '?' : v)) }],
      input: 'number',
      answer: seq[idx],
      hint: `Add ${step} each time.`,
      explain: `${seq.join(', ')}. The missing number is ${seq[idx]}.`
    };
  }
};

// ------------------------------------------------------------------ P2 unit 1: numbers to 1000
const hto = pvSkill({
  places: 3,
  baseten: true,
  id: 'p2.pv.hto',
  level: 'P2',
  strand: 'numbers',
  unit: 1,
  title: 'Hundreds, tens and ones',
  vi: 'Giá trị hàng trăm, chục, đơn vị',
  icon: '🏗️',
  tip: 'Trong 586: 5 ở hàng trăm (giá trị 500), 8 ở hàng chục (80), 6 ở hàng đơn vị (6) → 586 = 500 + 80 + 6. Chữ số 0 giữ chỗ: 407 có 0 chục.'
});

const words1000 = wordsSkill({
  id: 'p2.num.words1000',
  level: 'P2',
  strand: 'numbers',
  unit: 1,
  title: 'Number words to 1000',
  vi: 'Đọc, viết số đến 1000 bằng chữ',
  icon: '📝',
  tip: 'Tiếng Anh kiểu Singapore có chữ "and" sau hàng trăm: 345 = "three hundred and forty-five", 405 = "four hundred and five". Hay nhầm: 405 với 450.',
  choiceTier: 0,
  pick(R, tier) {
    if (tier === 1) return R.pick([R.step(100, 900, 100), R.step(110, 990, 10)]);
    if (tier === 2) return R.int(101, 999);
    const h = R.int(1, 9);
    return R.pick([h * 100 + R.int(1, 9), h * 100 + R.step(10, 90, 10), h * 100 + R.int(11, 19), 1000]);
  },
  hint: (n) => (n === 1000 ? '10 hundreds make one thousand.' : 'Say the hundreds first, then "and", then the tens and ones.')
});

const compare1000 = compareSkill({
  digits: 3,
  id: 'p2.num.compare1000',
  level: 'P2',
  strand: 'numbers',
  unit: 1,
  title: 'Compare numbers to 1000',
  vi: 'So sánh, sắp xếp số đến 1000 (dấu > <)',
  icon: '🔍',
  tip: 'So sánh lần lượt hàng trăm → chục → đơn vị. Với dấu > và <: đầu nhọn chỉ về số bé hơn. Cho con đọc to: "472 is greater than 427".'
});

const pattern1000 = patternSkill({
  max: 1000,
  steps: { 1: [10, 100], 2: [10, 100, 5, 50], 3: [10, 100, 50, 25] },
  moreLess: { 1: [10, 100], 2: [10, 100, 1], 3: [100, 10, 200, 50] },
  downFrom: 2,
  id: 'p2.num.pattern1000',
  level: 'P2',
  strand: 'numbers',
  unit: 1,
  title: 'Number patterns to 1000',
  vi: 'Dãy số quy luật đến 1000 (±10, ±100)',
  icon: '🪜',
  tip: '"100 more" chỉ thay đổi chữ số hàng trăm (345 → 445), "10 less" thay đổi hàng chục (600 → 590 — chú ý mượn). Cho con dự đoán chữ số nào thay đổi trước khi tính.'
});

/** Number line reading factory. configs[tier] = [(R) => ({min, max, step, labels})]. */
function numberlineSkill({ configs, ...meta }) {
  return {
    ...meta,
    gen(R, tier) {
      if (tier === 3 && R.chance(0.3)) {
        const c = R.pick(configs[3])(R);
        const mid = (c.min + c.max) / 2;
        if (Number.isInteger(mid)) {
          return {
            prompt: `What number is **halfway** between ${c.min} and ${c.max}?`,
            visuals: [{ type: 'numberline', min: c.min, max: c.max, step: (c.max - c.min) / 10, labels: [c.min, c.max], hide: [mid] }],
            input: 'number',
            answer: mid,
            hint: 'Halfway is the middle mark. There are the same number of steps on each side.',
            explain: `From ${c.min} to ${c.max} is ${c.max - c.min}. Half of that is ${(c.max - c.min) / 2}. ${c.min} + ${(c.max - c.min) / 2} = ${mid}.`
          };
        }
      }
      const c = R.pick(configs[tier])(R);
      const ticks = [];
      for (let v = c.min; v <= c.max; v += c.step) ticks.push(v);
      const labelSet = new Set(c.labels);
      const cand = ticks.filter((v) => !labelSet.has(v));
      const ans = R.pick(cand.length ? cand : ticks);
      const dot = R.chance(0.35);
      const below = Math.max(...c.labels.filter((v) => v < ans));
      const steps = Math.round((ans - below) / c.step);
      return {
        prompt: dot ? 'What number is shown by the **dot** on the number line?' : 'What number should be in the box on the number line?',
        visuals: [{ type: 'numberline', min: c.min, max: c.max, step: c.step, labels: c.labels, ...(dot ? { marks: [{ at: ans, text: '?' }] } : { hide: [ans] }) }],
        input: 'number',
        answer: ans,
        hint: 'First work out how much each small step is worth. Count the steps between two labelled numbers.',
        explain: `Each small step is ${c.step}. From ${below}, count on ${steps} ${steps === 1 ? 'step' : 'steps'}: ${below} + ${steps * c.step} = ${ans}.`
      };
    }
  };
}

const numberline1000 = numberlineSkill({
  id: 'p2.num.numberline',
  level: 'P2',
  strand: 'numbers',
  unit: 1,
  title: 'Number lines to 1000',
  vi: 'Đọc số trên tia số (đến 1000)',
  icon: '📏',
  tip: 'Bước quan trọng nhất: tìm xem mỗi vạch nhỏ có giá trị bao nhiêu (đếm số khoảng giữa hai số đã cho). Sau đó đếm tiếp từ số gần nhất.',
  configs: {
    1: [
      (R) => {
        const a = R.step(100, 800, 100);
        return { min: a, max: a + 100, step: 10, labels: [a, a + 100] };
      },
      (R) => ({ min: 0, max: 1000, step: 100, labels: [0, 500, 1000] })
    ],
    2: [
      (R) => {
        const a = R.step(0, 900, 100);
        return { min: a, max: a + 100, step: 10, labels: [a, a + 50, a + 100] };
      },
      (R) => {
        const a = R.step(100, 950, 10);
        return { min: a, max: a + 50, step: 5, labels: [a, a + 50] };
      },
      () => ({ min: 0, max: 1000, step: 100, labels: [0, 1000] })
    ],
    3: [
      (R) => {
        const a = R.step(100, 500, 100);
        return { min: a, max: a + 500, step: 50, labels: [a, a + 500] };
      },
      (R) => {
        const a = R.step(100, 960, 20);
        return { min: a, max: a + 40, step: 4, labels: [a, a + 40] };
      },
      (R) => {
        const a = R.step(100, 800, 100);
        return { min: a, max: a + 200, step: 20, labels: [a, a + 200] };
      }
    ]
  }
});

const oddEven = {
  id: 'p2.num.oddeven',
  level: 'P2',
  strand: 'numbers',
  unit: 1,
  title: 'Odd and even numbers',
  vi: 'Số chẵn (even) và số lẻ (odd)',
  icon: '👯',
  tip: 'Số chẵn chia được thành từng cặp không thừa; chỉ cần nhìn chữ số hàng đơn vị: 0, 2, 4, 6, 8 là chẵn (even); 1, 3, 5, 7, 9 là lẻ (odd).',
  gen(R, tier) {
    if (tier === 1) {
      const n = R.int(4, 15);
      const it = item(R);
      const even = n % 2 === 0;
      if (R.chance(0.6)) {
        return {
          prompt: `Put the ${it.many} into pairs. Is **${n}** an odd or even number?`,
          visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: n }], perRow: 2 }],
          input: 'choice',
          answer: even ? 'Even' : 'Odd',
          choices: fixedChoices(['Odd', 'Even']),
          hint: 'If every one has a partner, the number is even. If one is left over, it is odd.',
          explain: even ? `${n} ${it.many} make ${n / 2} pairs with none left over, so ${n} is even.` : `${n} ${it.many} make ${(n - 1) / 2} pairs with 1 left over, so ${n} is odd.`
        };
      }
      const nn = R.int(10, 99);
      return {
        prompt: `Is **${nn}** an odd or even number?`,
        input: 'choice',
        answer: nn % 2 === 0 ? 'Even' : 'Odd',
        choices: fixedChoices(['Odd', 'Even']),
        hint: 'Look at the ones digit only. 0, 2, 4, 6, 8 are even.',
        explain: `The ones digit of ${nn} is ${nn % 10}, so ${nn} is ${nn % 2 === 0 ? 'even' : 'odd'}.`
      };
    }
    if (tier === 2) {
      const form = R.pick(['which', 'which', 'big']);
      if (form === 'big') {
        const n = R.int(100, 999);
        return {
          prompt: `Is **${n}** an odd or even number?`,
          input: 'choice',
          answer: n % 2 === 0 ? 'Even' : 'Odd',
          choices: fixedChoices(['Odd', 'Even']),
          hint: 'Only the ones digit decides if a number is odd or even.',
          explain: `The ones digit of ${n} is ${n % 10}, so ${n} is ${n % 2 === 0 ? 'even' : 'odd'}.`
        };
      }
      const wantEven = R.chance(0.5);
      const good = R.int(10, 499) * 2 + (wantEven ? 0 : 1);
      const bad = [];
      while (bad.length < 3) {
        const v = R.int(10, 499) * 2 + (wantEven ? 1 : 0);
        if (!bad.includes(v)) bad.push(v);
      }
      return {
        prompt: `Which number is **${wantEven ? 'even' : 'odd'}**?`,
        input: 'choice',
        answer: good,
        choices: asNumChoices([good, ...bad].sort((a, b) => a - b)),
        hint: `Look at the ones digits. ${wantEven ? 'Even numbers end in 0, 2, 4, 6 or 8.' : 'Odd numbers end in 1, 3, 5, 7 or 9.'}`,
        explain: `${good} ends in ${good % 10}, so it is ${wantEven ? 'even' : 'odd'}.`
      };
    }
    const form = R.pick(['next', 'count', 'greatest']);
    if (form === 'next') {
      const wantEven = R.chance(0.5);
      const after = R.chance(0.5);
      const n = R.int(20, 990);
      let ans = after ? n + 1 : n - 1;
      while ((ans % 2 === 0) !== wantEven) ans += after ? 1 : -1;
      return {
        prompt: `What is the ${after ? 'next' : 'previous'} **${wantEven ? 'even' : 'odd'}** number ${after ? 'after' : 'before'} ${n}?`,
        input: 'number',
        answer: ans,
        hint: `${wantEven ? 'Even' : 'Odd'} numbers go up in twos. Count ${after ? 'on' : 'back'} from ${n}.`,
        explain: `Counting ${after ? 'on' : 'back'} from ${n}, the ${after ? 'next' : 'previous'} ${wantEven ? 'even' : 'odd'} number is ${ans}.`
      };
    }
    if (form === 'count') {
      const t = R.int(1, 9) * 10 + R.pick([0, 100, 200, 300]);
      const wantOdd = R.chance(0.5);
      return {
        prompt: `How many **${wantOdd ? 'odd' : 'even'}** numbers are there between ${t} and ${t + 10}?`,
        input: 'number',
        answer: wantOdd ? 5 : 4,
        hint: `List the numbers between ${t} and ${t + 10}. Do not count ${t} or ${t + 10}.`,
        explain: wantOdd
          ? `${[1, 3, 5, 7, 9].map((d) => t + d).join(', ')}: there are 5 odd numbers.`
          : `${[2, 4, 6, 8].map((d) => t + d).join(', ')}: there are 4 even numbers.`
      };
    }
    const wantOdd = R.chance(0.5);
    const below = R.step(200, 1000, 100);
    const greatest = R.chance(0.5);
    let ans;
    if (greatest) {
      ans = below - 1;
      if ((ans % 2 === 1) !== wantOdd) ans -= 1;
    } else {
      ans = below + 1;
      if ((ans % 2 === 1) !== wantOdd) ans += 1;
    }
    return {
      prompt: greatest
        ? `What is the **greatest ${wantOdd ? 'odd' : 'even'}** number that is smaller than ${below}?`
        : `What is the **smallest ${wantOdd ? 'odd' : 'even'}** number that is greater than ${below}?`,
      input: 'number',
      answer: ans,
      hint: `Start at ${below} and count ${greatest ? 'back' : 'on'} one at a time. Check the ones digit.`,
      explain: `${greatest ? 'Counting back' : 'Counting on'} from ${below}: ${ans} is the first ${wantOdd ? 'odd' : 'even'} number.`
    };
  }
};

/** Digit cards factory: make the greatest / smallest number (with conditions) from n cards. */
function digitCardsSkill({ n, ...meta }) {
  return {
    ...meta,
    gen(R, tier) {
      for (let g = 0; g < 80; g++) {
        const withZero = tier > 1 && R.chance(0.5);
        const digits = R.shuffle(withZero ? [0, ...R.distinctInts(n - 1, 1, 9)] : R.distinctInts(n, 1, 9));
        const all = numbersFromDigits(digits);
        const kinds = tier === 1 ? ['greatest', 'smallest'] : tier === 2 ? ['greatest', 'smallest', 'smallest'] : ['greatestOdd', 'smallestEven', 'greatestBelow', 'smallestAbove'];
        const kind = tier === 1 ? (R.chance(0.7) ? 'greatest' : 'smallest') : R.pick(kinds);
        let pool = all;
        let desc;
        let pickMax = true;
        let why;
        if (kind === 'greatest') {
          desc = `the **greatest** ${n}-digit number`;
          why = 'Put the greatest digit in the highest place, then the next greatest, and so on.';
        } else if (kind === 'smallest') {
          desc = `the **smallest** ${n}-digit number`;
          pickMax = false;
          why = withZero ? 'Put the smallest digit first — but a number cannot start with 0, so 0 goes second.' : 'Put the smallest digit in the highest place.';
        } else if (kind === 'greatestOdd') {
          desc = `the **greatest odd** ${n}-digit number`;
          pool = all.filter((v) => v % 2 === 1);
          why = 'An odd number must end with an odd digit. Save the smallest odd digit for the ones place, then make the rest as great as possible.';
        } else if (kind === 'smallestEven') {
          desc = `the **smallest even** ${n}-digit number`;
          pool = all.filter((v) => v % 2 === 0);
          pickMax = false;
          why = 'An even number must end with an even digit. Make the front as small as possible.';
        } else {
          const lo = Math.min(...all);
          const hi = Math.max(...all);
          const unit = pow10(n - 1);
          const cands = [];
          for (let t = unit * 2; t < hi; t += unit) if (t > lo) cands.push(t);
          if (!cands.length) continue;
          const T = R.pick(cands);
          if (kind === 'greatestBelow') {
            desc = `the **greatest** number that is **smaller than ${T}**`;
            pool = all.filter((v) => v < T);
            why = `The first digit must be smaller than ${String(T)[0]}. Use the greatest such digit, then the greatest digits after it.`;
          } else {
            desc = `the **smallest** number that is **greater than ${T}**`;
            pool = all.filter((v) => v > T);
            pickMax = false;
            why = `The first digit must be at least ${String(T)[0]}. Choose the smallest one that works, then the smallest digits after it.`;
          }
        }
        if (!pool.length) continue;
        const ans = pickMax ? Math.max(...pool) : Math.min(...pool);
        return {
          prompt: `Use **all** the digit cards to make ${desc}.`,
          visuals: [{ type: 'sequence', items: digits }],
          input: 'number',
          answer: ans,
          hint: why,
          explain: `The answer is ${ans}. ${why}`
        };
      }
      return {
        prompt: `Use all the digit cards to make the **greatest** ${n}-digit number.`,
        visuals: [{ type: 'sequence', items: [1, 2, 3, 4].slice(0, n) }],
        input: 'number',
        answer: Number('4321'.slice(4 - n)),
        hint: 'Put the greatest digit in the highest place.',
        explain: `The answer is ${Number('4321'.slice(4 - n))}.`
      };
    }
  };
}

const digitCards3 = digitCardsSkill({
  n: 3,
  id: 'p2.num.digitcards',
  level: 'P2',
  strand: 'numbers',
  unit: 1,
  title: 'Make numbers from digit cards',
  vi: 'Lập số lớn nhất / bé nhất từ thẻ số',
  icon: '🃏',
  tip: 'Số lớn nhất: xếp chữ số từ lớn đến bé. Số bé nhất: từ bé đến lớn, nhưng chữ số 0 không được đứng đầu. Cho con xếp thẻ giấy thật để thử nhiều cách.'
});

// ------------------------------------------------------------------ P3 unit 1: numbers to 10 000
const thousands = pvSkill({
  places: 4,
  baseten: false,
  id: 'p3.pv.thousands',
  level: 'P3',
  strand: 'numbers',
  unit: 1,
  title: 'Thousands place value',
  vi: 'Giá trị hàng nghìn, trăm, chục, đơn vị',
  icon: '🏙️',
  tip: '4628 = 4 thousands 6 hundreds 2 tens 8 ones = 4000 + 600 + 20 + 8. Dạng khó: "3 thousands 14 hundreds" — nhắc con 10 trăm = 1 nghìn.'
});

const words10000 = wordsSkill({
  id: 'p3.num.words10000',
  level: 'P3',
  strand: 'numbers',
  unit: 1,
  title: 'Number words to 10 000',
  vi: 'Đọc, viết số đến 10 000 bằng chữ',
  icon: '📝',
  tip: 'Đọc theo cụm: "four thousand / six hundred and twenty-eight". Với số có 0 ở giữa như 3085: "three thousand and eighty-five". Viết số từ chữ: đặt 0 vào hàng bị thiếu.',
  choiceTier: 0,
  pick(R, tier) {
    if (tier === 1) return R.pick([R.step(1000, 9000, 1000), R.step(1100, 9900, 100)]);
    if (tier === 2) return R.int(1001, 9999);
    const t = R.int(1, 9) * 1000;
    return R.pick([t + R.int(1, 99), t + R.step(100, 900, 100) + R.int(1, 9), t + R.step(10, 90, 10), 10000, t + R.int(101, 999)]);
  },
  hint: (n) => (n === 10000 ? '10 thousands make ten thousand.' : 'Say the thousands, then the hundreds, then "and" before the tens and ones.')
});

const compare10000 = compareSkill({
  digits: 4,
  id: 'p3.num.compare10000',
  level: 'P3',
  strand: 'numbers',
  unit: 1,
  title: 'Compare numbers to 10 000',
  vi: 'So sánh, sắp xếp số đến 10 000',
  icon: '🔍',
  tip: 'Viết hai số thẳng hàng theo cột (nghìn – trăm – chục – đơn vị) rồi so sánh từ trái sang phải. Với các số có cùng chữ số (7243, 7432…) cần đặc biệt cẩn thận.'
});

const pattern10000 = patternSkill({
  max: 10000,
  steps: { 1: [100, 1000], 2: [10, 100, 1000], 3: [50, 250, 500, 1000, 100] },
  moreLess: { 1: [1000, 100], 2: [1000, 100, 10], 3: [1000, 100, 2000, 500] },
  downFrom: 2,
  id: 'p3.num.pattern10000',
  level: 'P3',
  strand: 'numbers',
  unit: 1,
  title: 'Number patterns to 10 000',
  vi: 'Dãy số quy luật đến 10 000 (±100, ±1000)',
  icon: '🪜',
  tip: '"1000 more than 4520" chỉ đổi chữ số hàng nghìn → 5520. Cẩn thận khi qua mốc: 100 less than 7003 = 6903. Cho con nói trước: "Which digit will change?"'
});

const numberline10000 = numberlineSkill({
  id: 'p3.num.numberline',
  level: 'P3',
  strand: 'numbers',
  unit: 1,
  title: 'Number lines to 10 000',
  vi: 'Đọc số trên tia số (đến 10 000)',
  icon: '📏',
  tip: 'Như lớp 2: tìm giá trị mỗi vạch nhỏ trước (lấy hiệu hai số đã cho chia cho số khoảng). Các vạch có thể là 10, 20, 50, 100, 250 hay 1000.',
  configs: {
    1: [
      (R) => {
        const a = R.step(1000, 8000, 1000);
        return { min: a, max: a + 1000, step: 100, labels: [a, a + 1000] };
      },
      () => ({ min: 0, max: 10000, step: 1000, labels: [0, 5000, 10000] })
    ],
    2: [
      (R) => {
        const a = R.step(1000, 9500, 500);
        return { min: a, max: Math.min(10000, a + 500), step: 50, labels: [a, Math.min(10000, a + 500)] };
      },
      () => ({ min: 0, max: 10000, step: 1000, labels: [0, 10000] }),
      (R) => {
        const a = R.step(1000, 9000, 1000);
        return { min: a, max: a + 1000, step: 100, labels: [a, a + 500, a + 1000] };
      }
    ],
    3: [
      (R) => {
        const a = R.step(1000, 7000, 1000);
        return { min: a, max: a + 2500, step: 250, labels: [a, a + 2500] };
      },
      (R) => {
        const a = R.step(1000, 9800, 100);
        return { min: a, max: a + 200, step: 20, labels: [a, a + 200] };
      },
      (R) => {
        const a = R.step(1000, 9000, 1000);
        return { min: a, max: a + 1000, step: 100, labels: [a, a + 1000] };
      }
    ]
  }
});

const digitCards4 = digitCardsSkill({
  n: 4,
  id: 'p3.num.digitcards',
  level: 'P3',
  strand: 'numbers',
  unit: 1,
  title: 'Make 4-digit numbers',
  vi: 'Lập số có 4 chữ số từ thẻ số',
  icon: '🃏',
  tip: 'Dạng có điều kiện (số lẻ lớn nhất, số chẵn bé nhất, lớn nhất nhưng nhỏ hơn 5000…) rèn tư duy hệ thống. Hướng dẫn con quyết định chữ số hàng đơn vị/hàng nghìn trước, rồi mới xếp các chữ số còn lại.'
});

// keep imported helpers referenced (some are only used in a subset of skills)
void plural;
void cap;

export const SKILLS = [
  compare10,
  order10,
  ordPosition,
  ordWhichPos,
  ordQueue,
  ordWords,
  tensOnes20,
  compare20,
  count20,
  words20,
  count100,
  digit100,
  words100,
  compare100,
  pattern100,
  hundredChart,
  skipCount,
  hto,
  words1000,
  compare1000,
  pattern1000,
  numberline1000,
  oddEven,
  digitCards3,
  thousands,
  words10000,
  compare10000,
  pattern10000,
  numberline10000,
  digitCards4
];
