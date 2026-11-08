// Thinking Cap — classic Singapore problem-solving heuristics at child level.
// Every skill uses strand 'thinking' and unit 0 (the challenge pool mixed into daily missions).
// Heuristics: look for a pattern, work backwards, guess and check, draw a model, make a list,
// act it out (queues), before–after, same difference, unitary method, supposition.
import { ALL_ITEMS, ITEMS, people, item, plural, ordinal, numChoices, cap, money, cents } from '../helpers.js';

const nounFor = (n, it) => (n === 1 ? it.one : it.many);
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const aOrAn = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
const rep = (k, n) => Array(k).fill(n).join(' + ');
const CHILD = { one: 'child', many: 'children' };
const STORY_CATS = ['food', 'toys', 'school'];

function eqSpeech(eq) {
  return eq
    .replace(/\s\+\s/g, ' plus ')
    .replace(/\s−\s/g, ' minus ')
    .replace(/\s=\s/g, ' equals ')
    .replace(/\?/g, 'what number');
}

// ====================================================================== K
const kRiddles = {
  id: 'k.think.riddles',
  level: 'K',
  strand: 'thinking',
  unit: 0,
  title: 'Number riddles',
  vi: 'Đố số: "I am a number…"',
  icon: '🕵️',
  tip: 'Đọc chậm từng gợi ý; sau mỗi gợi ý hỏi con "Which numbers can it be now?" để loại trừ dần. Cho con chỉ trên tia số (number line) hoặc dùng ngón tay để thử.',
  gen(R, tier) {
    if (tier === 1) {
      const f = R.pick(['between', 'after', 'before']);
      let ans;
      let prompt;
      let near;
      let hint;
      let explain;
      let marks;
      if (f === 'between') {
        const a = R.int(0, 8);
        ans = a + 1;
        prompt = `I am **more than** ${a} and **less than** ${a + 2}. What number am I?`;
        near = [a, a + 2];
        hint = `Find ${a} and ${a + 2} on the number line. Which number is in between?`;
        explain = `The only number more than ${a} and less than ${a + 2} is ${ans}.`;
        marks = [{ at: a }, { at: a + 2 }];
      } else if (f === 'after') {
        const n = R.int(0, 9);
        ans = n + 1;
        prompt = `When you count, I come **just after** ${n}. What number am I?`;
        near = [n - 1, n, n + 2];
        hint = `Count: … ${n}, and then?`;
        explain = `When we count, ${ans} comes just after ${n}.`;
        marks = [{ at: n }];
      } else {
        const n = R.int(1, 10);
        ans = n - 1;
        prompt = `When you count, I come **just before** ${n}. What number am I?`;
        near = [n + 1, n, n - 2];
        hint = `Count backwards from ${n}. Which number do you say next?`;
        explain = `When we count, ${ans} comes just before ${n}.`;
        marks = [{ at: n }];
      }
      return {
        prompt,
        visuals: [{ type: 'numberline', min: 0, max: 10, marks }],
        input: 'choice',
        answer: ans,
        choices: numChoices(R, ans, { min: 0, max: 11, near }),
        hint,
        explain
      };
    }
    if (tier === 2) {
      const f = R.pick(['more', 'less', 'add', 'take']);
      const k = R.int(1, 3);
      if (f === 'more' || f === 'less') {
        const more = f === 'more';
        const b = more ? R.int(0, 10 - k) : R.int(k, 10);
        const ans = more ? b + k : b - k;
        return {
          prompt: `I am **${k} ${more ? 'more' : 'less'} than** ${b}. What number am I?`,
          input: 'choice',
          answer: ans,
          choices: numChoices(R, ans, { min: 0, max: 13, near: [b, more ? b - k : b + k, ans + 1] }),
          hint: more ? `Start at ${b} and count on ${k}.` : `Start at ${b} and count back ${k}.`,
          explain: `${k} ${more ? 'more' : 'less'} than ${b} is ${ans}. (${b} ${more ? '+' : '−'} ${k} = ${ans})`
        };
      }
      const add = f === 'add';
      const ans = add ? R.int(0, 10 - k) : R.int(k, 10);
      const r = add ? ans + k : ans - k;
      return {
        prompt: `If you **${add ? 'add' : 'take away'} ${k}** ${add ? 'to' : 'from'} me, you get ${r}. What number am I?`,
        input: 'choice',
        answer: ans,
        choices: numChoices(R, ans, { min: 0, max: 13, near: [r, add ? r + k : r - k, ans + 1] }),
        hint: `Work backwards! ${add ? `Count back ${k} from ${r}.` : `Count on ${k} from ${r}.`}`,
        explain: `${ans} ${add ? '+' : '−'} ${k} = ${r}, so I am ${ans}.`
      };
    }
    if (R.chance(0.3)) {
      const k = R.int(1, 9);
      const ans = 10 + k;
      return {
        prompt: `I am **10 and ${k} more**. What number am I?`,
        visuals: R.chance(0.5) ? [{ type: 'tenframe', a: 10, b: k }] : [],
        input: 'choice',
        answer: ans,
        choices: numChoices(R, ans, { min: 1, max: 20, near: [k, ans + 1, ans - 1] }),
        hint: 'Start at 10 and count on.',
        explain: `10 and ${k} make ${ans}.`
      };
    }
    const ans = R.int(2, 18);
    let lo;
    let hi;
    do {
      lo = ans - R.int(1, 2);
      hi = ans + R.int(1, 2);
    } while (hi - lo - 1 < 2);
    const inside = range(lo + 1, hi - 1);
    const others = inside.filter((v) => v !== ans);
    return {
      prompt: `I am **more than** ${lo} and **less than** ${hi}. I am **not** ${others.join(' or ')}. What number am I?`,
      input: 'choice',
      answer: ans,
      choices: numChoices(R, ans, { min: 0, max: 20, near: [...others, lo, hi] }),
      hint: `List the numbers between ${lo} and ${hi}. Cross out the ones it cannot be.`,
      explain: `The numbers between ${lo} and ${hi} are ${inside.join(', ')}. It is not ${others.join(' or ')}, so it is ${ans}.`
    };
  }
};

// --- comparison words shared by the ordering / logic puzzles
const ORDER_CTX = [
  { more: 'taller', less: 'shorter', most: 'tallest', least: 'shortest', second: 'second tallest', third: 'third tallest', line: 'from tallest to shortest' },
  { more: 'older', less: 'younger', most: 'oldest', least: 'youngest', second: 'second oldest', third: 'third oldest', line: 'from oldest to youngest' },
  { more: 'heavier', less: 'lighter', most: 'heaviest', least: 'lightest', second: 'second heaviest', third: 'third heaviest', line: 'from heaviest to lightest' },
  { race: true, line: 'in the order they finished the race' }
];
function clueFor(R, hi, lo, ctx) {
  if (ctx.race) return R.chance(0.5) ? `${hi} finished before ${lo}.` : `${lo} finished after ${hi}.`;
  return R.chance(0.5) ? `${hi} is ${ctx.more} than ${lo}.` : `${lo} is ${ctx.less} than ${hi}.`;
}
/** pos = 0 (most / first), 1 (second), 2 (third), 'last' */
function askAt(ctx, pos) {
  if (ctx.race) {
    if (pos === 'last') return 'Who came **last** in the race?';
    return `Who came **${['first', 'second', 'third'][pos]}** in the race?`;
  }
  if (pos === 'last') return `Who is the **${ctx.least}**?`;
  return `Who is the **${[ctx.most, ctx.second, ctx.third][pos]}**?`;
}
function chainClues(R, order, ctx, shuffle) {
  const clues = [];
  for (let i = 0; i < order.length - 1; i++) clues.push(clueFor(R, order[i].name, order[i + 1].name, ctx));
  return shuffle ? R.shuffle(clues) : clues;
}

const kOrder = {
  id: 'k.think.order',
  level: 'K',
  strand: 'thinking',
  unit: 0,
  title: 'Who is first?',
  vi: 'Suy luận thứ tự (cao nhất, về nhất…)',
  icon: '🏃',
  tip: 'Cho con "diễn" lại bằng đồ chơi hoặc vẽ các bạn đứng thành hàng theo từng gợi ý. Từ vựng: taller/shorter, older/younger, finished before/after.',
  gen(R, tier) {
    const ctx = R.pick(ORDER_CTX);
    if (tier === 1) {
      const [a, b] = people(R, 2);
      const clue = clueFor(R, a.name, b.name, ctx);
      const askMore = R.chance(0.5);
      const ans = askMore ? a.name : b.name;
      const question = ctx.race ? (askMore ? 'Who came **first**?' : 'Who came **second**?') : `Who is **${askMore ? ctx.more : ctx.less}**?`;
      return {
        prompt: `${clue} ${question}`,
        input: 'choice',
        answer: ans,
        choices: R.shuffle([a.name, b.name]).map((v) => ({ value: v, label: v })),
        hint: 'Read the clue again slowly. You can act it out with two toys!',
        explain: ctx.race
          ? `${a.name} finished before ${b.name}, so ${a.name} came first and ${b.name} came second. The answer is ${ans}.`
          : `${a.name} is ${ctx.more} than ${b.name}, so ${b.name} is ${ctx.less}. The answer is ${ans}.`
      };
    }
    const order = people(R, 3);
    const clues = chainClues(R, order, ctx, tier === 3);
    const pos = R.pick([0, 'last']);
    const ans = pos === 'last' ? order[2].name : order[0].name;
    return {
      prompt: `${clues.join(' ')} ${askAt(ctx, pos)}`,
      input: 'choice',
      answer: ans,
      choices: R.shuffle(order.map((p) => p.name)).map((v) => ({ value: v, label: v })),
      hint: `Use one clue at a time. Line them up ${ctx.line}.`,
      explain: `Line them up ${ctx.line}: ${order.map((p) => p.name).join(', ')}. The answer is ${ans}.`
    };
  }
};

const TWO_LEGS = [
  { one: 'bird', many: 'birds', e: '🐦', n: 2 },
  { one: 'chicken', many: 'chickens', e: '🐔', n: 2 },
  { one: 'duck', many: 'ducks', e: '🦆', n: 2 },
  { one: 'penguin', many: 'penguins', e: '🐧', n: 2 }
];
const FOUR_LEGS = [
  { one: 'dog', many: 'dogs', e: '🐶', n: 4 },
  { one: 'cat', many: 'cats', e: '🐱', n: 4 },
  { one: 'cow', many: 'cows', e: '🐮', n: 4 },
  { one: 'rabbit', many: 'rabbits', e: '🐰', n: 4 },
  { one: 'horse', many: 'horses', e: '🐴', n: 4 },
  { one: 'pig', many: 'pigs', e: '🐷', n: 4 }
];
const MANY_LEGS = [
  { one: 'ant', many: 'ants', e: '🐜', n: 6 },
  { one: 'spider', many: 'spiders', e: '🕷️', n: 8 }
];
const TWO_WHEELS = [
  { one: 'bicycle', many: 'bicycles', e: '🚲', n: 2 },
  { one: 'scooter', many: 'scooters', e: '🛴', n: 2 }
];
const FOUR_WHEELS = [
  { one: 'car', many: 'cars', e: '🚗', n: 4 },
  { one: 'taxi', many: 'taxis', e: '🚕', n: 4 }
];

const kLegs = {
  id: 'k.think.legs',
  level: 'K',
  strand: 'thinking',
  unit: 0,
  title: 'How many legs?',
  vi: 'Đếm chân, đếm bánh xe',
  icon: '🐾',
  tip: 'Cho con vẽ từng con vật với các chân của nó rồi đếm, hoặc đếm thêm theo nhóm: "4, 8, 12". Đây là bước đầu của phép nhân (equal groups).',
  gen(R, tier) {
    const wheels = R.chance(0.3);
    const part = wheels ? 'wheels' : 'legs';
    if (tier === 3) {
      const a = R.pick(wheels ? TWO_WHEELS : TWO_LEGS);
      const b = R.pick(wheels ? FOUR_WHEELS : R.chance(0.8) ? FOUR_LEGS : MANY_LEGS);
      let ka;
      let kb;
      do {
        ka = R.int(1, 3);
        kb = R.int(1, b.n > 4 ? 1 : 3);
      } while (ka * a.n + kb * b.n > 20);
      const total = ka * a.n + kb * b.n;
      return {
        prompt: `${cap(aOrAn(a.one))} ${a.one} has ${a.n} ${part}. ${cap(aOrAn(b.one))} ${b.one} has ${b.n} ${part}. How many ${part} do ${plural(ka, a)} and ${plural(kb, b)} have **altogether**?`,
        visuals: [{ type: 'objects', op: '+', groups: [{ emoji: a.e, count: ka, label: `${a.n} ${part} each` }, { emoji: b.e, count: kb, label: `${b.n} ${part} each` }] }],
        input: 'choice',
        answer: total,
        choices: numChoices(R, total, { min: 2, max: 24, near: [ka + kb, total - 2, total + 2, ka * a.n] }),
        hint: `Count the ${part} of the ${a.many} first, then count on the ${part} of the ${b.many}.`,
        explain: `${cap(plural(ka, a))}: ${ka === 1 ? a.n : `${rep(ka, a.n)} = ${ka * a.n}`}. ${cap(plural(kb, b))}: ${kb === 1 ? b.n : `${rep(kb, b.n)} = ${kb * b.n}`}. Altogether: ${ka * a.n} + ${kb * b.n} = ${total} ${part}.`
      };
    }
    let c;
    let k;
    if (tier === 1) {
      if (R.chance(0.65)) {
        c = R.pick(wheels ? TWO_WHEELS : TWO_LEGS);
        k = R.int(2, 4);
      } else {
        c = R.pick(wheels ? FOUR_WHEELS : FOUR_LEGS);
        k = 2;
      }
    } else {
      const pool = wheels ? [...TWO_WHEELS, ...FOUR_WHEELS] : [...TWO_LEGS, ...FOUR_LEGS, ...MANY_LEGS];
      c = R.pick(pool);
      k = c.n === 2 ? R.int(4, 6) : c.n === 4 ? R.int(2, 3) : c.n === 6 ? 2 : R.int(1, 2);
    }
    const total = k * c.n;
    return {
      prompt: R.pick([
        `${cap(aOrAn(c.one))} ${c.one} has ${c.n} ${part}. How many ${part} do ${plural(k, c)} have **altogether**?`,
        `There are ${plural(k, c)}. Each ${c.one} has ${c.n} ${part}. How many ${part} are there **in all**?`
      ]),
      visuals: [{ type: 'objects', groups: [{ emoji: c.e, count: k, label: `${c.n} ${part} each` }] }],
      input: 'choice',
      answer: total,
      choices: numChoices(R, total, { min: 1, max: 24, near: [k, total - c.n, total + c.n, c.n] }),
      hint: `Count in ${c.n}s: one ${c.one}, then the next ${c.one} …`,
      explain: `${rep(k, c.n)} = ${total}. ${cap(plural(k, c))} have ${total} ${part}.`
    };
  }
};

const kPatterns = {
  id: 'k.think.patterns',
  level: 'K',
  strand: 'thinking',
  unit: 0,
  title: 'Number patterns',
  vi: 'Quy luật dãy số (đếm thêm 2, 5, 10…)',
  icon: '🔢',
  tip: 'Hỏi con: "How does the number change each time?" Viết dấu +2, +5 giữa các số. Đếm cách 2, 5, 10 bằng giọng hát rất dễ nhớ.',
  gen(R, tier) {
    const forms = tier === 1 ? ['repeat2', 'up1'] : tier === 2 ? ['by2', 'down1', 'repeat3'] : ['by5', 'by10', 'down2', 'middle'];
    const f = R.pick(forms);
    let seq;
    let rule;
    let idx = -1;
    if (f === 'repeat2') {
      const [x, y] = R.distinctInts(2, 1, 9);
      seq = [x, y, x, y, x, y];
      rule = `${x}, ${y} repeats again and again`;
    } else if (f === 'repeat3') {
      const [x, y, z] = R.distinctInts(3, 1, 9);
      seq = [x, y, z, x, y, z, x];
      rule = `${x}, ${y}, ${z} repeats again and again`;
    } else if (f === 'up1') {
      const s = R.int(0, 14);
      seq = range(s, s + 4);
      rule = 'the numbers go up by 1';
    } else if (f === 'down1') {
      const s = R.int(6, 20);
      seq = range(s - 4, s).reverse();
      rule = 'the numbers go down by 1';
    } else if (f === 'by2') {
      const s = R.int(0, 8);
      seq = range(0, 4).map((i) => s + 2 * i);
      rule = 'the numbers go up by 2';
    } else if (f === 'by5') {
      const s = R.pick([0, 5, 10, 15]);
      seq = range(0, 4).map((i) => s + 5 * i);
      rule = 'the numbers go up by 5';
    } else if (f === 'by10') {
      const s = R.pick([0, 10, 20]);
      seq = range(0, 4).map((i) => s + 10 * i);
      rule = 'the numbers go up by 10';
    } else if (f === 'down2') {
      const s = R.int(10, 20);
      seq = range(0, 4).map((i) => s - 2 * i);
      rule = 'the numbers go down by 2';
    } else {
      const st = R.pick([2, 5, 10]);
      const s = R.int(0, 3) * st;
      seq = range(0, 4).map((i) => s + st * i);
      idx = R.int(1, 3);
      rule = `the numbers go up by ${st}`;
    }
    if (idx < 0) idx = seq.length - 1;
    const ans = seq[idx];
    const shown = seq.map((v, i) => (i === idx ? '?' : v));
    const last = idx === seq.length - 1;
    return {
      prompt: last ? 'Look for the pattern. What number comes **next**?' : 'Look for the pattern. What is the **missing** number?',
      visuals: [{ type: 'sequence', items: shown }],
      input: 'choice',
      answer: ans,
      choices: numChoices(R, ans, { min: 0, max: Math.max(...seq) + 12, near: [...new Set(seq.filter((v, i) => i !== idx)), ans + 1, ans - 1] }),
      hint: 'Look at how each number changes to the next one. Does it go up, go down, or repeat?',
      explain: `In this pattern ${rule}: ${seq.join(', ')}. The answer is ${ans}.`
    };
  }
};

const kOddOne = {
  id: 'k.think.oddone',
  level: 'K',
  strand: 'thinking',
  unit: 0,
  title: 'Spot the different one',
  vi: 'Tìm cái khác biệt (theo số lượng)',
  icon: '🔍',
  tip: 'Một số có thể biểu diễn nhiều cách: đồ vật, xúc xắc, khung 10, chữ số. Hỏi con "How do you know they are the same?" để con giải thích.',
  gen(R, tier) {
    if (tier === 1) {
      const n = R.int(2, 6);
      const m = R.chance(0.5) ? n + 1 : n - 1;
      const emojis = R.sample(ALL_ITEMS, 4).map((x) => x.e);
      const odd = R.int(0, 3);
      const list = emojis.map((e, i) => ({ value: `${e}${i === odd ? m : n}`, visual: { type: 'objects', size: 'sm', groups: [{ emoji: e, count: i === odd ? m : n }] } }));
      return {
        prompt: R.pick([
          'Three boxes have the **same** number of things. Which box is **different**?',
          'One box does not match the others. Which box has a **different** number of things?',
          'Count carefully! Which box has a **different** number of things?'
        ]),
        input: 'choice',
        answer: `${emojis[odd]}${m}`,
        choices: R.shuffle(list),
        hint: 'Count the things in each box. Which number is not the same?',
        explain: `Three boxes have ${n} things each. The different box has ${m}.`
      };
    }
    if (tier === 2) {
      const n = R.int(3, 6);
      const m = R.chance(0.5) ? n + 1 : n - 1;
      const show = (type, k) => {
        if (type === 'objects') return { type: 'objects', size: 'sm', groups: [{ emoji: R.pick(ALL_ITEMS).e, count: k }] };
        if (type === 'dice') return { type: 'dots', n: k };
        if (type === 'frame') return { type: 'tenframe', a: k };
        return { type: 'text', text: String(k), size: 'xl' };
      };
      const types = R.shuffle(['objects', 'dice', 'frame', 'numeral']);
      const list = types.map((t, i) => ({ value: `${t}-${i === 3 ? m : n}`, visual: show(t, i === 3 ? m : n) }));
      return {
        prompt: R.pick([`Which one does **not** show ${n}?`, `Three of these show ${n}. Which one is **different**?`]),
        input: 'choice',
        answer: `${types[3]}-${m}`,
        choices: R.shuffle(list),
        hint: `Count each picture. Which one is not ${n}?`,
        explain: `The others all show ${n}. The different one shows ${m}.`
      };
    }
    const n = R.int(6, 10);
    const as = R.sample(range(1, Math.floor(n / 2)), 3);
    const good = as.map((a) => (R.chance(0.5) ? [a, n - a] : [n - a, a]));
    let oa;
    let ob;
    do {
      oa = R.int(0, n);
      ob = n - oa + R.pick([-1, 1]);
    } while (ob < 0);
    const labels = [...good.map(([a, b]) => `${a} and ${b}`), `${oa} and ${ob}`];
    return {
      prompt: `Which pair does **not** make ${n}?`,
      input: 'choice',
      answer: `${oa} and ${ob}`,
      choices: R.shuffle(labels).map((v) => ({ value: v, label: v })),
      hint: `Add each pair. Which pair does not make ${n}?`,
      explain: `${good.map(([a, b]) => `${a} + ${b} = ${n}`).join(', ')}. But ${oa} + ${ob} = ${oa + ob}, not ${n}.`
    };
  }
};

// ====================================================================== P1
const p1Backwards = {
  id: 'p1.think.backwards',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Work backwards',
  vi: 'Giải ngược (tìm số ban đầu — "at first")',
  icon: '⏪',
  tip: 'Chiến lược "Work backwards": bắt đầu từ kết quả cuối và LÀM NGƯỢC từng bước (đã cho đi thì cộng lại, đã nhận thêm thì trừ đi). Cẩn thận: thấy chữ "left" không có nghĩa là phải trừ!',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    if (tier === 3) {
      if (R.chance(0.4)) {
        const x = R.int(3, 30);
        const a = R.int(2, 9);
        const b = R.int(2, 9);
        const addFirst = R.chance(0.5);
        const c = addFirst ? x + a - b : x - b + a;
        if (c >= 0 && (addFirst || x - b >= 0)) {
          return {
            prompt: `I think of a number. I ${addFirst ? `add ${a}, then take away ${b}` : `take away ${b}, then add ${a}`}. The answer is ${c}. What number did I think of?`,
            input: 'number',
            answer: x,
            hint: 'Work backwards! Start from the answer and undo each step in reverse order.',
            explain: addFirst
              ? `Undo "take away ${b}": ${c} + ${b} = ${c + b}. Undo "add ${a}": ${c + b} − ${a} = ${x}. My number is ${x}.`
              : `Undo "add ${a}": ${c} − ${a} = ${c - a}. Undo "take away ${b}": ${c - a} + ${b} = ${x}. My number is ${x}.`
          };
        }
      }
      const it = item(R, R.pick(STORY_CATS));
      const a = R.int(2, 9);
      const b = R.int(2, 9);
      const giveFirst = R.chance(0.5);
      const S = giveFirst ? R.int(a + 1, 30) : R.int(Math.max(1, a - b + 1), 30);
      const c = S - a + b;
      const steps = giveFirst
        ? `${p.He} gave ${a} to ${q.name}. Then ${p.he} bought ${b} more.`
        : `${p.He} bought ${b} more. Then ${p.he} gave ${a} to ${q.name}.`;
      return {
        prompt: `${p.name} had some ${it.many}. ${steps} Now ${p.he} has ${plural(c, it)}. How many ${it.many} did ${p.name} have **at first**?`,
        input: 'number',
        answer: S,
        hint: 'Work backwards from the end. Undo the last step first: bought → take away, gave → add back.',
        explain: giveFirst
          ? `Start from ${c}. Undo "bought ${b}": ${c} − ${b} = ${c - b}. Undo "gave ${a}": ${c - b} + ${a} = ${S}. ${p.name} had ${S} ${it.many} at first.`
          : `Start from ${c}. Undo "gave ${a}": ${c} + ${a} = ${c + a}. Undo "bought ${b}": ${c + a} − ${b} = ${S}. ${p.name} had ${S} ${it.many} at first.`
      };
    }
    const max = tier === 1 ? 20 : 40;
    if (tier === 2 && R.chance(0.3)) {
      const add = R.chance(0.5);
      const k = R.int(2, 9);
      const ans = add ? R.int(1, max - k) : R.int(k + 1, max);
      const r = add ? ans + k : ans - k;
      return {
        prompt: `I think of a number. I ${add ? `add ${k}` : `take away ${k}`}. The answer is ${r}. What number did I think of?`,
        input: 'number',
        answer: ans,
        hint: `Work backwards! Do the opposite: ${add ? `take away ${k}` : `add ${k}`}.`,
        explain: `Work backwards: ${r} ${add ? '−' : '+'} ${k} = ${ans}. Check: ${ans} ${add ? '+' : '−'} ${k} = ${r}.`
      };
    }
    const g = R.int(2, tier === 1 ? 8 : 15);
    const showBar = tier === 1 || R.chance(0.5);
    if (R.chance(0.55)) {
      const l = R.int(1, max - g);
      const story = R.pick(['gave', 'ate', 'lost', 'sold']);
      const it = item(R, story === 'ate' || story === 'sold' ? 'food' : R.pick(['toys', 'school']));
      const start = g + l;
      let prompt;
      if (story === 'gave') prompt = `${p.name} gave ${plural(g, it)} to ${q.name}. Now ${p.he} has ${plural(l, it)} left. How many ${it.many} did ${p.name} have **at first**?`;
      else if (story === 'ate') prompt = `${p.name} had a box of ${it.many}. ${p.He} ate ${g} of them and had ${l} left. How many ${it.many} were in the box **at first**?`;
      else if (story === 'lost') prompt = `${p.name} lost ${plural(g, it)}. ${p.He} still has ${l}. How many ${it.many} did ${p.he} have **at first**?`;
      else prompt = `A stall sold ${plural(g, it)} in the morning. It had ${l} left. How many ${it.many} did the stall have **at first**?`;
      return {
        prompt,
        visuals: showBar ? [{ type: 'bar', rows: [{ label: '', segs: [{ v: l, text: String(l), color: 'blue' }, { v: g, text: String(g), color: 'orange' }] }], total: { text: '?' } }] : [],
        input: 'number',
        answer: start,
        hint: 'Work backwards! Some were taken away, so at first there were MORE. Put them back.',
        explain: `Work backwards: put the ${g} back with the ${l} left. ${l} + ${g} = ${start}. There were ${start} ${it.many} at first.`
      };
    }
    const t = R.int(g + 1, max);
    const it = item(R, R.pick(STORY_CATS));
    const start = t - g;
    const story = R.pick(['given', 'bought', 'found']);
    let prompt;
    if (story === 'given') prompt = `${q.name} gave ${p.name} ${plural(g, it)}. Now ${p.name} has ${t} ${it.many}. How many ${it.many} did ${p.name} have **at first**?`;
    else if (story === 'bought') prompt = `${p.name} bought ${g} more ${nounFor(g, it)}. Now ${p.he} has ${t}. How many ${it.many} did ${p.he} have **before**?`;
    else prompt = `${p.name} found ${g} more ${nounFor(g, it)} under the bed. Now ${p.he} has ${t}. How many ${it.many} did ${p.he} have **at first**?`;
    return {
      prompt,
      visuals: showBar ? [{ type: 'bar', rows: [{ label: '', segs: [{ v: start, text: '?', missing: true }, { v: g, text: String(g), color: 'orange' }] }], total: { text: String(t) } }] : [],
      input: 'number',
      answer: start,
      hint: `Work backwards! ${p.name} got ${g} more, so at first ${p.he} had FEWER. Take them away.`,
      explain: `Work backwards: ${t} − ${g} = ${start}. ${p.name} had ${start} ${it.many} at first.`
    };
  }
};

const QUEUE_PLACES = ['to buy ice cream', 'at the canteen', 'to board the bus', 'for the slide', 'at the bus stop', 'to buy movie tickets'];
const p1Queue = {
  id: 'p1.think.queue',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Queues and positions',
  vi: 'Bài toán xếp hàng (nhớ đếm cả bạn đó!)',
  icon: '🚶',
  tip: 'Luôn VẼ hàng ra (mỗi bạn một chấm tròn) — lỗi hay gặp nhất là quên đếm chính bạn được nhắc tên. Từ vựng: in front of, behind, from the front/back, between.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    if (tier === 1) {
      if (R.chance(0.65)) {
        const f = R.int(1, 5);
        const b = R.int(1, 5);
        const total = f + b + 1;
        const items = [...Array(f).fill('🧒'), '🙋', ...Array(b).fill('🧒')];
        return {
          prompt: `${p.name} is in a queue ${R.pick(QUEUE_PLACES)}. There ${f === 1 ? 'is' : 'are'} ${plural(f, CHILD)} in front of ${p.him} and ${plural(b, CHILD)} behind ${p.him}. How many children are in the queue?`,
          visuals: [{ type: 'ordinal', items, ends: ['FRONT', 'BACK'], highlight: f }],
          input: 'number',
          answer: total,
          hint: `Draw the queue! Do not forget to count ${p.name} too.`,
          explain: `${f} in front + ${p.name} + ${b} behind: ${f} + 1 + ${b} = ${total} children.`
        };
      }
      const x = R.int(2, 8);
      const n = x + R.int(1, 3);
      const items = Array.from({ length: n }, (_, i) => (i === x - 1 ? '🙋' : '🧒'));
      return {
        prompt: `${p.name} is ${ordinal(x)} in the queue, counting from the front. How many children are **in front of** ${p.him}?`,
        visuals: [{ type: 'ordinal', items, ends: ['FRONT', 'BACK'], highlight: x - 1 }],
        input: 'number',
        answer: x - 1,
        hint: `${p.name} is number ${x}. Count only the children before ${p.him}.`,
        explain: `${p.name} is ${ordinal(x)}, so ${x} − 1 = ${x - 1} ${x - 1 === 1 ? 'child is' : 'children are'} in front of ${p.him}.`
      };
    }
    if (tier === 2) {
      const f = R.pick(['frontback', 'otherend', 'behind']);
      if (f === 'frontback') {
        const x = R.int(2, 9);
        const y = R.int(2, 9);
        const total = x + y - 1;
        return {
          prompt: `${p.name} is ${ordinal(x)} from the front and ${ordinal(y)} from the back of a line. How many children are in the line?`,
          input: 'number',
          answer: total,
          hint: `Draw it! ${p.name} is counted from the front AND from the back. Count ${p.him} only once.`,
          explain: `${x} + ${y} = ${x + y}, but ${p.name} was counted twice. ${x + y} − 1 = ${total} children.`
        };
      }
      if (f === 'otherend') {
        const N = R.int(6, 15);
        const x = R.int(2, N - 1);
        const ans = N - x + 1;
        return {
          prompt: `There are ${N} children in a line. ${p.name} is ${ordinal(x)} from the left. In which position is ${p.he} from the right? (Type the number.)`,
          input: 'number',
          answer: ans,
          hint: `How many children are on ${p.his} right side? Then count ${p.name} too.`,
          explain: `There are ${N} − ${x} = ${N - x} children to the right of ${p.name}. So ${p.he} is ${ordinal(ans)} from the right (${N - x} + 1 = ${ans}).`
        };
      }
      const N = R.int(6, 15);
      const x = R.int(2, N - 1);
      return {
        prompt: `There are ${N} children in a queue. ${p.name} is ${ordinal(x)} from the front. How many children are **behind** ${p.him}?`,
        input: 'number',
        answer: N - x,
        hint: `${p.name} and the children in front of ${p.him} make ${x}. The rest are behind.`,
        explain: `${x} children (including ${p.name}) are at the front part. ${N} − ${x} = ${N - x} children are behind ${p.him}.`
      };
    }
    const f = R.pick(['between', 'mixed', 'total']);
    if (f === 'between') {
      let x;
      let y;
      do {
        x = R.int(1, 15);
        y = R.int(1, 15);
      } while (Math.abs(x - y) < 2);
      const ans = Math.abs(x - y) - 1;
      return {
        prompt: `In a line, ${p.name} is ${ordinal(x)} from the front and ${q.name} is ${ordinal(y)} from the front. How many children are standing **between** them?`,
        input: 'number',
        answer: ans,
        hint: 'Draw the line and number the places. Do not count the two children themselves.',
        explain: `The children between them are in places ${Math.min(x, y) + 1} to ${Math.max(x, y) - 1}. ${Math.max(x, y)} − ${Math.min(x, y)} − 1 = ${ans}.`
      };
    }
    if (f === 'mixed') {
      const N = R.int(8, 15);
      const x = R.int(2, N - 3);
      const posB = R.int(x + 2, N - 1);
      const y = N - posB + 1;
      const ans = posB - x - 1;
      return {
        prompt: `There are ${N} children in a line. ${p.name} is ${ordinal(x)} from the front. ${q.name} is ${ordinal(y)} from the back. How many children are **between** ${p.name} and ${q.name}?`,
        input: 'number',
        answer: ans,
        hint: `First find ${q.name}'s place from the front. Then count the children between them.`,
        explain: `${q.name} is ${ordinal(y)} from the back, so ${N} − ${y} + 1 = ${posB}, which is ${ordinal(posB)} from the front. Between ${ordinal(x)} and ${ordinal(posB)}: ${posB} − ${x} − 1 = ${ans} children.`
      };
    }
    const x = R.int(2, 8);
    const k = R.int(2, 8);
    const total = x + k + 1;
    return {
      prompt: `${p.name} is ${ordinal(x)} from the front of a queue. ${q.name} is at the very back. There are ${plural(k, CHILD)} between them. How many children are in the queue?`,
      input: 'number',
      answer: total,
      hint: `Draw it: ${x} children up to ${p.name}, then the ${k} in between, then ${q.name}.`,
      explain: `${x} (up to and including ${p.name}) + ${k} (between) + 1 (${q.name}) = ${total} children.`
    };
  }
};

const p1Equal = {
  id: 'p1.think.equal',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Make them equal',
  vi: 'Chuyển cho nhau để bằng nhau',
  icon: '🤝',
  tip: 'Mẹo: muốn hai bạn bằng nhau thì chỉ cần cho đi MỘT NỬA phần chênh lệch. Dùng 2 hàng đồ vật thật để con thử chuyển từng cái một.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    const it = item(R, R.pick(STORY_CATS));
    if (tier === 1) {
      if (R.chance(0.7)) {
        const d = R.int(1, 3);
        const b = R.int(1, 6);
        const a = b + 2 * d;
        return {
          prompt: `${p.name} has ${plural(a, it)}. ${q.name} has ${plural(b, it)}. How many ${it.many} must ${p.name} give to ${q.name} so that they both have the **same** number?`,
          visuals: [{ type: 'objects', stack: true, groups: [{ emoji: it.e, count: a, label: p.name }, { emoji: it.e, count: b, label: q.name }] }],
          input: 'number',
          answer: d,
          hint: `Match them up. ${p.name} has some extra. Share the extra equally between them.`,
          explain: `${p.name} has ${a} − ${b} = ${2 * d} more. Half of ${2 * d} is ${d}. After giving ${d}, they both have ${b + d}.`
        };
      }
      const b = R.int(1, 7);
      const a = b + R.int(1, 5);
      return {
        prompt: `${p.name} has ${plural(a, it)}. ${q.name} has ${plural(b, it)}. How many more ${it.many} must Mum give ${q.name} so that ${q.name} has the **same** number as ${p.name}?`,
        visuals: [{ type: 'objects', stack: true, groups: [{ emoji: it.e, count: a, label: p.name }, { emoji: it.e, count: b, label: q.name }] }],
        input: 'number',
        answer: a - b,
        hint: `${p.name} keeps all of ${p.his} ${it.many}. How many more does ${q.name} need to catch up?`,
        explain: `${q.name} needs ${a} − ${b} = ${a - b} more to have ${a}, the same as ${p.name}.`
      };
    }
    if (tier === 2) {
      const f = R.pick(['give', 'get', 'total']);
      if (f === 'get') {
        const b = R.int(5, 20);
        const a = b + R.int(3, 12);
        return {
          prompt: `${p.name} has ${plural(a, it)}. ${q.name} has ${plural(b, it)}. How many more ${it.many} must ${q.name} buy to have as many as ${p.name}?`,
          visuals: [{ type: 'bar', rows: [{ label: p.name, segs: [{ v: a, text: String(a) }] }, { label: q.name, segs: [{ v: b, text: String(b), color: 'orange' }] }], diff: { text: '?', short: 1, long: 0 } }],
          input: 'number',
          answer: a - b,
          hint: `Nobody gives anything away here. ${q.name} just needs to make up the difference.`,
          explain: `The difference is ${a} − ${b} = ${a - b}. ${q.name} must buy ${a - b} more.`
        };
      }
      const d = R.int(2, 8);
      const b = R.int(5, 20);
      const a = b + 2 * d;
      const T = a + b;
      const prompt =
        f === 'give'
          ? `${p.name} has ${plural(a, it)}. ${q.name} has ${plural(b, it)}. How many ${it.many} must ${p.name} give to ${q.name} so that they have the **same** number?`
          : `${p.name} and ${q.name} have ${T} ${it.many} altogether. ${p.name} has ${a}. How many ${it.many} must ${p.name} give to ${q.name} so that they have the **same** number?`;
      return {
        prompt,
        visuals: f === 'give' ? [{ type: 'bar', rows: [{ label: p.name, segs: [{ v: a, text: String(a) }] }, { label: q.name, segs: [{ v: b, text: String(b), color: 'orange' }] }], diff: { text: '?', short: 1, long: 0 } }] : [],
        input: 'number',
        answer: d,
        hint: 'Draw a model. Find the difference, then cut the extra part into 2 equal halves.',
        explain: `${f === 'total' ? `${q.name} has ${T} − ${a} = ${b}. ` : ''}The difference is ${a} − ${b} = ${2 * d}. Half of ${2 * d} is ${d}. ${p.name} gives ${d}, and both have ${b + d}.`
      };
    }
    const d = R.int(2, 9);
    if (R.chance(0.5)) {
      return {
        prompt: `After ${p.name} gives ${q.name} ${plural(d, it)}, they both have the same number. How many more ${it.many} did ${p.name} have than ${q.name} **at first**?`,
        input: 'number',
        answer: 2 * d,
        hint: `Act it out: ${p.name} loses ${d} and ${q.name} gets ${d}. How big was the gap?`,
        explain: `${p.name} went down by ${d} and ${q.name} went up by ${d} to meet in the middle. The gap at first was ${d} + ${d} = ${2 * d}.`
      };
    }
    const e = R.int(d + 1, 20);
    const askP = R.chance(0.6);
    return {
      prompt: `After ${p.name} gives ${plural(d, it)} to ${q.name}, they each have ${e} ${it.many}. How many ${it.many} did ${askP ? p.name : q.name} have **at first**?`,
      input: 'number',
      answer: askP ? e + d : e - d,
      hint: `Work backwards! ${askP ? `${p.name} gave some away, so ${p.he} had more at first.` : `${q.name} received some, so ${q.he} had fewer at first.`}`,
      explain: askP ? `${p.name} had ${e} + ${d} = ${e + d} at first.` : `${q.name} had ${e} − ${d} = ${e - d} at first.`
    };
  }
};

const p1GuessCheck = {
  id: 'p1.think.guesscheck',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Guess and check',
  vi: 'Đoán và thử (tổng – hiệu)',
  icon: '🎯',
  tip: 'Dạy con lập bảng đoán–thử: đoán 2 số có tổng đúng, kiểm tra hiệu, rồi điều chỉnh. Cách nhanh (mô hình): bớt phần hơn đi, chia đôi phần còn lại.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    if (tier === 3 && R.chance(0.4)) {
      if (R.chance(0.5)) {
        const small = R.int(2, 10);
        const s = small * 3;
        const askBig = R.chance(0.5);
        return {
          prompt: `Two numbers add up to ${s}. One number is **double** the other. What is the ${askBig ? '**bigger**' : '**smaller**'} number?`,
          input: 'number',
          answer: askBig ? 2 * small : small,
          hint: 'Guess and check: try a small number, double it, and add the two. Is the total right?',
          explain: `${small} + ${2 * small} = ${s}, and ${2 * small} is double ${small}. The ${askBig ? 'bigger' : 'smaller'} number is ${askBig ? 2 * small : small}.`
        };
      }
      const big = R.int(4, 15);
      const small = R.int(1, big - 1);
      const s = big + small;
      const d = big - small;
      const askBig = R.chance(0.5);
      const ans = askBig ? big : small;
      return {
        prompt: `A pen and a ruler cost $${s} altogether. The pen costs $${d} more than the ruler. How much does the ${askBig ? 'pen' : 'ruler'} cost?`,
        input: 'number',
        unit: { pre: '$' },
        answer: ans,
        hint: `Guess and check: the two prices add up to $${s}. Is the difference $${d}?`,
        explain: `Take away the extra $${d}: $${s} − $${d} = $${s - d}. Share equally: the ruler costs $${small} and the pen costs $${small} + $${d} = $${big}. The ${askBig ? 'pen' : 'ruler'} costs $${ans}.`
      };
    }
    const maxS = tier === 1 ? 10 : tier === 2 ? 20 : 30;
    let big;
    let small;
    do {
      small = R.int(1, maxS - 2);
      big = R.int(small + 1, maxS - small);
    } while (big + small > maxS || big + small < (tier === 1 ? 5 : 9));
    const s = big + small;
    const d = big - small;
    const askBig = R.chance(0.5);
    const ans = askBig ? big : small;
    const it = item(R, R.pick(STORY_CATS));
    const story = tier > 1 && R.chance(0.5);
    const prompt = story
      ? `${p.name} and ${q.name} have ${s} ${it.many} altogether. ${p.name} has ${d} more than ${q.name}. How many ${it.many} does ${askBig ? p.name : q.name} have?`
      : `I am thinking of two numbers. They add up to ${s}. One number is ${d} more than the other. What is the ${askBig ? '**bigger**' : '**smaller**'} number?`;
    return {
      prompt,
      input: 'number',
      answer: ans,
      hint: `Guess and check! Try two numbers that add up to ${s}. Is one of them ${d} more than the other? If not, try again.`,
      explain: `${big} + ${small} = ${s} and ${big} − ${small} = ${d}. ${story ? `${p.name} has ${big} and ${q.name} has ${small}.` : `The ${askBig ? 'bigger' : 'smaller'} number is ${ans}.`}`
    };
  }
};

const p1Balance = {
  id: 'p1.think.balance',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Balance the sides',
  vi: 'Hai vế bằng nhau (dấu = như cái cân)',
  icon: '⚖️',
  tip: 'Dấu "=" nghĩa là hai bên CÂN BẰNG, không phải "viết đáp số vào đây". Cho con tính vế không có ô trống trước, rồi tìm số làm vế kia bằng.',
  gen(R, tier) {
    let eq;
    let ans;
    let total;
    if (tier === 1) {
      const s = R.int(4, 10);
      const a = R.int(1, s - 1);
      const b = s - a;
      const c = R.intExcept(1, s - 1, [a, b]);
      ans = s - c;
      total = s;
      eq = R.chance(0.5) ? `${a} + ${b} = ? + ${c}` : `? + ${c} = ${a} + ${b}`;
    } else if (tier === 2) {
      const f = R.pick(['ten', 'plus', 'minus']);
      if (f === 'ten') {
        const a = R.int(5, 9);
        const b = R.int(11 - a, 9);
        ans = a + b - 10;
        total = a + b;
        eq = `${a} + ${b} = 10 + ?`;
      } else if (f === 'plus') {
        const s = R.int(10, 20);
        const a = R.int(2, s - 2);
        const b = s - a;
        const c = R.intExcept(1, s - 1, [a, b]);
        ans = s - c;
        total = s;
        eq = `${a} + ${b} = ${c} + ?`;
      } else {
        const d = R.int(1, 9);
        const a = R.int(d + 1, 20);
        const b = a - d;
        const c = R.intExcept(d + 1, 20, [a]);
        ans = c - d;
        total = d;
        eq = `${a} − ${b} = ${c} − ?`;
      }
    } else {
      const f = R.pick(['plus', 'minus', 'sub']);
      if (f === 'plus') {
        const b = R.int(2, 10);
        const c = R.int(2, 10);
        const a = R.intExcept(1, b + c - 1, [b, c]);
        ans = b + c - a;
        total = b + c;
        eq = `${a} + ? = ${b} + ${c}`;
      } else if (f === 'minus') {
        const d = R.int(1, 8);
        const b = R.int(d + 1, 15);
        const c = b - d;
        const a = R.int(d + 1, 20);
        ans = a - d;
        total = d;
        eq = `${a} − ? = ${b} − ${c}`;
      } else {
        const a = R.int(2, 6);
        const b = R.int(2, 7);
        const c = R.int(1, 20 - a - b);
        ans = a + b + c;
        total = b + c;
        eq = `? − ${a} = ${b} + ${c}`;
      }
    }
    const known = eq.split(' = ').find((side) => !side.includes('?'));
    return {
      prompt: `**Balance it!** Both sides of = must be equal. What is the missing number?\n${eq}`,
      speak: `Balance it! Both sides must be equal. What is the missing number? ${eqSpeech(eq)}`,
      visuals: [{ type: 'equation', text: eq }],
      input: 'number',
      answer: ans,
      hint: `Work out the side with no box first: ${known} = ? Then make the other side the same.`,
      explain: `${known} = ${total}. So the other side must also make ${total}. The missing number is ${ans}: ${eq.replace('?', String(ans))}.`
    };
  }
};

const FRUITS = [
  ['🍎', 'apple'], ['🍌', 'banana'], ['🍇', 'grapes'], ['🍓', 'strawberry'], ['🍊', 'orange'],
  ['🍐', 'pear'], ['🍒', 'cherries'], ['🍉', 'watermelon'], ['🍋', 'lemon'], ['🥕', 'carrot']
];
const p1Picture = {
  id: 'p1.think.picture',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Picture puzzles',
  vi: 'Câu đố hình (mỗi hình là một số)',
  icon: '🍎',
  tip: 'Giải câu có MỘT hình chưa biết trước (ví dụ 🍎 + 🍎 = 8 → 🍎 = 4), rồi dùng kết quả cho dòng tiếp theo. Đây là mầm của đại số sau này.',
  gen(R, tier) {
    const [X, Y, Z] = R.sample(FRUITS, 3);
    const lines = [];
    const said = [];
    let ans;
    let target;
    let explain;
    let hint = '';
    const add = (txt, sp) => {
      lines.push(txt);
      said.push(sp);
    };
    if (tier === 1) {
      if (R.chance(0.5)) {
        const x = R.int(1, 10);
        add(`${X[0]} + ${X[0]} = ${2 * x}`, `${X[1]} plus ${X[1]} equals ${2 * x}`);
        ans = x;
        target = X;
        explain = `${x} + ${x} = ${2 * x}, so ${X[0]} = ${x}.`;
      } else {
        const k = R.int(1, 9);
        const x = R.int(1, 10);
        add(`${X[0]} + ${k} = ${x + k}`, `${X[1]} plus ${k} equals ${x + k}`);
        ans = x;
        target = X;
        explain = `${x + k} − ${k} = ${x}, so ${X[0]} = ${x}.`;
      }
    } else if (tier === 2) {
      const f = R.pick(['double', 'triple', 'pair']);
      if (f === 'triple') {
        const x = R.int(1, 6);
        add(`${X[0]} + ${X[0]} + ${X[0]} = ${3 * x}`, `${X[1]} plus ${X[1]} plus ${X[1]} equals ${3 * x}`);
        ans = x;
        target = X;
        explain = `${x} + ${x} + ${x} = ${3 * x}, so ${X[0]} = ${x}.`;
      } else if (f === 'double') {
        const x = R.int(1, 9);
        const y = R.int(1, 10);
        add(`${X[0]} + ${X[0]} = ${2 * x}`, `${X[1]} plus ${X[1]} equals ${2 * x}`);
        add(`${X[0]} + ${Y[0]} = ${x + y}`, `${X[1]} plus ${Y[1]} equals ${x + y}`);
        ans = y;
        target = Y;
        explain = `${X[0]} + ${X[0]} = ${2 * x}, so ${X[0]} = ${x}. Then ${x} + ${Y[0]} = ${x + y}, so ${Y[0]} = ${y}.`;
      } else {
        const x = R.int(1, 10);
        const y = R.int(1, 9);
        add(`${Y[0]} + ${Y[0]} = ${2 * y}`, `${Y[1]} plus ${Y[1]} equals ${2 * y}`);
        add(`${X[0]} + ${Y[0]} = ${x + y}`, `${X[1]} plus ${Y[1]} equals ${x + y}`);
        ans = x;
        target = X;
        explain = `${Y[0]} + ${Y[0]} = ${2 * y}, so ${Y[0]} = ${y}. Then ${X[0]} + ${y} = ${x + y}, so ${X[0]} = ${x}.`;
      }
    } else {
      const f = R.pick(['chain', 'sumdiff', 'twoplus']);
      if (f === 'chain') {
        const x = R.int(1, 6);
        const y = R.int(1, 9);
        const z = R.int(1, 9);
        add(`${X[0]} + ${X[0]} + ${X[0]} = ${3 * x}`, `${X[1]} plus ${X[1]} plus ${X[1]} equals ${3 * x}`);
        add(`${X[0]} + ${Y[0]} = ${x + y}`, `${X[1]} plus ${Y[1]} equals ${x + y}`);
        add(`${Y[0]} + ${Z[0]} = ${y + z}`, `${Y[1]} plus ${Z[1]} equals ${y + z}`);
        ans = z;
        target = Z;
        explain = `${X[0]} = ${3 * x} ÷ 3 = ${x}. Then ${Y[0]} = ${x + y} − ${x} = ${y}. Then ${Z[0]} = ${y + z} − ${y} = ${z}.`;
      } else if (f === 'sumdiff') {
        const y = R.int(1, 8);
        const x = y + R.int(1, 8);
        add(`${X[0]} + ${Y[0]} = ${x + y}`, `${X[1]} plus ${Y[1]} equals ${x + y}`);
        add(`${X[0]} − ${Y[0]} = ${x - y}`, `${X[1]} minus ${Y[1]} equals ${x - y}`);
        ans = x;
        target = X;
        explain = `Guess and check: ${x} + ${y} = ${x + y} and ${x} − ${y} = ${x - y}. So ${X[0]} = ${x} and ${Y[0]} = ${y}.`;
        hint = `Guess and check: try two numbers that add up to ${x + y}. Is their difference ${x - y}?`;
      } else {
        const x = R.int(1, 8);
        const y = R.int(1, 9);
        add(`${X[0]} + ${X[0]} = ${2 * x}`, `${X[1]} plus ${X[1]} equals ${2 * x}`);
        add(`${X[0]} + ${X[0]} + ${Y[0]} = ${2 * x + y}`, `${X[1]} plus ${X[1]} plus ${Y[1]} equals ${2 * x + y}`);
        ans = y;
        target = Y;
        explain = `${X[0]} + ${X[0]} is ${2 * x}. So ${2 * x} + ${Y[0]} = ${2 * x + y}, and ${Y[0]} = ${y}.`;
      }
    }
    return {
      prompt: `Each picture stands for a number. What number is ${target[0]}?`,
      speak: `Each picture stands for a number. ${said.join('. ')}. What number is the ${target[1]}?`,
      visuals: [{ type: 'text', text: lines.join('\n'), size: 'lg' }],
      input: 'number',
      answer: ans,
      hint: hint || (lines.length > 1 ? 'Start with the line that has only ONE kind of picture. Then use that number in the next line.' : 'Think: which number makes this true? Try a few numbers.'),
      explain
    };
  }
};

function squaresIn(r, c) {
  let t = 0;
  for (let k = 1; k <= Math.min(r, c); k++) t += (r - k + 1) * (c - k + 1);
  return t;
}
function squaresBreakdown(r, c) {
  const parts = [];
  for (let k = 1; k <= Math.min(r, c); k++) {
    const n = (r - k + 1) * (c - k + 1);
    parts.push(k === 1 ? `${n} small` : `${n} of size ${k} by ${k}`);
  }
  return parts.join(' + ');
}
const p1Figures = {
  id: 'p1.think.figures',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Count all the shapes',
  vi: 'Đếm hình (kể cả hình lớn ghép từ hình nhỏ)',
  icon: '🔲',
  tip: 'Đếm có hệ thống (make a list): trước hết đếm hình nhỏ, rồi hình ghép từ 2 phần, 3 phần… Nhắc con: hình lớn bao ngoài cũng được tính!',
  gen(R, tier) {
    const configs =
      tier === 1
        ? [{ k: 'small', r: R.int(2, 3), c: R.int(2, 4) }, { k: 'squares', r: 2, c: 2 }, { k: 'strip', n: R.int(2, 3) }]
        : tier === 2
          ? [{ k: 'squares', r: 2, c: 2 }, { k: 'squares', r: 2, c: 3 }, { k: 'strip', n: R.int(3, 4) }, { k: 'small', r: 3, c: R.int(3, 5) }]
          : [{ k: 'squares', r: 3, c: 3 }, { k: 'squares', r: 2, c: 4 }, { k: 'squares', r: 3, c: 4 }, { k: 'strip', n: 5 }, { k: 'squares', r: 2, c: 3 }];
    const cfg = R.pick(configs);
    if (cfg.k === 'strip') {
      const n = cfg.n;
      const ans = (n * (n + 1)) / 2;
      const runs = range(1, n).map((len) => `${n - len + 1} made of ${len} part${len > 1 ? 's' : ''}`);
      return {
        prompt: R.pick([
          'How many rectangles can you find in this shape? Count big and small ones.',
          'Count **all** the rectangles in this long bar, big and small.'
        ]),
        visuals: [{ type: 'bar', rows: [{ label: '', segs: Array.from({ length: n }, () => ({ v: 1, text: '', color: 'gray' })) }] }],
        input: 'number',
        answer: ans,
        hint: 'Make a list: count rectangles made of 1 part, then 2 parts joined, then 3 parts …',
        explain: `${runs.join(', ')}. Altogether ${range(1, n).reverse().join(' + ')} = ${ans} rectangles.`
      };
    }
    const { r, c } = cfg;
    if (cfg.k === 'small') {
      return {
        prompt: R.pick(['How many small squares are there in this grid?', 'Count the small squares in this grid.']),
        visuals: [{ type: 'grid', rows: r, cols: c, cells: [] }],
        input: 'number',
        answer: r * c,
        hint: `Count one row, then count the rows.`,
        explain: `There are ${r} rows of ${c} squares: ${rep(r, c)} = ${r * c} small squares.`
      };
    }
    const ans = squaresIn(r, c);
    return {
      prompt: R.pick([
        'How many squares can you find? Count big and small squares.',
        'Count **all** the squares in this grid, big and small.',
        'Look carefully! How many squares are there altogether?'
      ]),
      visuals: [{ type: 'grid', rows: r, cols: c, cells: [] }],
      input: 'number',
      answer: ans,
      hint: `Count the small squares first. Then look for bigger squares made of 4 small squares${Math.min(r, c) >= 3 ? ', and then 9 small squares' : ''}.`,
      explain: `${squaresBreakdown(r, c)} = ${ans} squares altogether.`
    };
  }
};

const SIBS = ['brother', 'sister', 'cousin'];
const p1Age = {
  id: 'p1.think.age',
  level: 'P1',
  strand: 'thinking',
  unit: 0,
  title: 'Age puzzles',
  vi: 'Bài toán tuổi',
  icon: '🎂',
  tip: 'Điều quan trọng: hai người luôn cách nhau một số tuổi KHÔNG ĐỔI theo thời gian (cùng lớn thêm mỗi năm). Vẽ dòng thời gian (timeline) giúp con hình dung "in 3 years", "2 years ago".',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    const sib = R.pick(SIBS);
    const years = { post: 'years old' };
    if (tier === 1) {
      const f = R.pick(['older', 'younger', 'future', 'past']);
      const a = R.int(4, 9);
      const d = R.int(1, Math.min(5, a - 1));
      if (f === 'older') return { prompt: `${p.name} is ${a} years old. ${p.His} ${sib} is ${d} years older. How old is ${p.his} ${sib}?`, input: 'number', unit: years, answer: a + d, hint: 'Older means more years.', explain: `${a} + ${d} = ${a + d}. ${p.His} ${sib} is ${a + d} years old.` };
      if (f === 'younger') return { prompt: `${p.name} is ${a} years old. ${p.His} ${sib} is ${d} years younger. How old is ${p.his} ${sib}?`, input: 'number', unit: years, answer: a - d, hint: 'Younger means fewer years.', explain: `${a} − ${d} = ${a - d}. ${p.His} ${sib} is ${a - d} years old.` };
      if (f === 'future') return { prompt: `${p.name} is ${a} years old now. How old will ${p.he} be in ${d} years?`, input: 'number', unit: years, answer: a + d, hint: 'Every year you get 1 year older. Count on.', explain: `${a} + ${d} = ${a + d}. ${p.He} will be ${a + d} years old.` };
      return { prompt: `${p.name} is ${a} years old now. How old was ${p.he} ${d} year${d > 1 ? 's' : ''} ago?`, input: 'number', unit: years, answer: a - d, hint: 'Years ago, you were younger. Count back.', explain: `${a} − ${d} = ${a - d}. ${p.He} was ${a - d} years old.` };
    }
    if (tier === 2) {
      const f = R.pick(['infuture', 'ago', 'sibfuture']);
      const k = R.int(2, 6);
      if (f === 'infuture') {
        const now = R.int(4, 12);
        return { prompt: `In ${k} years, ${p.name} will be ${now + k} years old. How old is ${p.he} now?`, input: 'number', unit: years, answer: now, hint: 'Work backwards on a timeline: go back from the future to now.', explain: `${now + k} − ${k} = ${now}. ${p.name} is ${now} years old now.` };
      }
      if (f === 'ago') {
        const then = R.int(2, 9);
        return { prompt: `${k} years ago, ${p.name} was ${then} years old. How old is ${p.he} now?`, input: 'number', unit: years, answer: then + k, hint: 'Draw a timeline. Count forward from then to now.', explain: `${then} + ${k} = ${then + k}. ${p.name} is ${then + k} years old now.` };
      }
      const a = R.int(4, 10);
      const d = R.int(1, 5);
      return { prompt: `${p.name} is ${a} years old. ${p.His} ${sib} is ${d} years older. How old will ${p.his} ${sib} be in ${k} years?`, input: 'number', unit: years, answer: a + d + k, hint: `First find the ${sib}'s age now. Then add ${k} years.`, explain: `Now: ${a} + ${d} = ${a + d}. In ${k} years: ${a + d} + ${k} = ${a + d + k}.` };
    }
    const f = R.pick(['when', 'diff', 'sum']);
    if (f === 'when') {
      const a = R.int(3, 8);
      const d = R.int(2, 6);
      const a2 = R.int(a + 2, a + 9);
      return {
        prompt: `${p.name} is ${a} years old and ${p.his} ${sib} is ${a + d}. When ${p.name} is ${a2}, how old will ${p.his} ${sib} be?`,
        input: 'number',
        unit: years,
        answer: a2 + d,
        hint: `The ${sib} is always the same number of years older than ${p.name}. How many?`,
        explain: `The ${sib} is always ${a + d} − ${a} = ${d} years older. When ${p.name} is ${a2}, the ${sib} is ${a2} + ${d} = ${a2 + d}.`
      };
    }
    if (f === 'diff') {
      const b = R.int(3, 9);
      const a = b + R.int(1, 6);
      const k = R.int(2, 10);
      return {
        prompt: `${p.name} is ${a} years old and ${q.name} is ${b}. In ${k} years, how many years older than ${q.name} will ${p.name} be?`,
        input: 'number',
        unit: { post: 'years' },
        answer: a - b,
        hint: 'Both of them get older by the same number of years. Does the difference change?',
        explain: `They both grow ${k} years older, so the difference stays the same: ${a} − ${b} = ${a - b} years.`
      };
    }
    const a = R.int(3, 10);
    const d = R.int(1, 6);
    return {
      prompt: `${p.name}'s ${sib} is ${d} years older than ${p.name}. Their ages add up to ${2 * a + d}. How old is ${p.name}?`,
      input: 'number',
      unit: years,
      answer: a,
      hint: `Guess and check: guess ${p.name}'s age, add ${d} for the ${sib}, then check the total.`,
      explain: `${p.name} is ${a} and the ${sib} is ${a} + ${d} = ${a + d}. Check: ${a} + ${a + d} = ${2 * a + d}.`
    };
  }
};

// ====================================================================== P2
const p2BeforeAfter = {
  id: 'p2.think.beforeafter',
  level: 'P2',
  strand: 'thinking',
  unit: 0,
  title: 'Before and after',
  vi: 'Trước – sau (vẽ mô hình trước và sau khi thay đổi)',
  icon: '🔄',
  tip: 'Vẽ HAI mô hình: "Before" và "After". Khi A cho B một số, A giảm và B tăng — chênh lệch thay đổi GẤP ĐÔI số đã cho. Hỏi con: "Who has more now? By how much?"',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    const it = item(R, R.pick(STORY_CATS));
    if (tier === 1) {
      if (R.chance(0.5)) {
        const g = R.int(2, 8);
        return {
          prompt: `${p.name} and ${q.name} had the same number of ${it.many}. Then ${p.name} gave ${q.name} ${g}. How many more ${it.many} does ${q.name} have than ${p.name} now?`,
          input: 'number',
          answer: 2 * g,
          hint: `Draw two equal bars. ${p.name}'s bar gets ${g} shorter and ${q.name}'s bar gets ${g} longer.`,
          explain: `${p.name} has ${g} fewer than before and ${q.name} has ${g} more than before. The difference is ${g} + ${g} = ${2 * g}.`
        };
      }
      const a = R.int(10, 40);
      const b = R.int(2, a - 2);
      return {
        prompt: `${p.name} had ${plural(a, it)}. After giving some to ${q.name}, ${p.he} had ${b} left. How many ${it.many} did ${p.he} give away?`,
        visuals: [{ type: 'bar', rows: [{ label: p.name, segs: [{ v: b, text: String(b) }, { v: a - b, text: '?', missing: true }] }], total: { text: String(a) } }],
        input: 'number',
        answer: a - b,
        hint: 'Before: the whole bar. After: the part left. The part given away is the rest.',
        explain: `${a} − ${b} = ${a - b}. ${p.name} gave away ${a - b} ${it.many}.`
      };
    }
    if (tier === 2) {
      const g = R.int(2, 10);
      if (R.chance(0.5)) {
        const q0 = R.int(2, 20);
        const a = q0 + 2 * g;
        return {
          prompt: `${p.name} had ${plural(a, it)}. ${p.He} gave ${g} to ${q.name}. Now they both have the same number. How many ${it.many} did ${q.name} have **at first**?`,
          input: 'number',
          answer: q0,
          hint: `First find how many ${p.name} has after giving. That is also what ${q.name} has now.`,
          explain: `After: ${p.name} has ${a} − ${g} = ${a - g}, so ${q.name} also has ${a - g}. Before receiving ${g}, ${q.name} had ${a - g} − ${g} = ${q0}.`
        };
      }
      const d = 2 * g + R.int(1, 10);
      return {
        prompt: `${p.name} had ${d} more ${it.many} than ${q.name}. Then ${p.name} gave ${q.name} ${g} ${it.many}. How many more ${it.many} does ${p.name} have than ${q.name} now?`,
        input: 'number',
        answer: d - 2 * g,
        hint: `Careful! When ${p.name} gives ${g}, ${p.he} loses ${g} AND ${q.name} gains ${g}.`,
        explain: `The gap gets smaller by ${g} + ${g} = ${2 * g}. ${d} − ${2 * g} = ${d - 2 * g}.`
      };
    }
    const f = R.pick(['givekmore', 'twice', 'total']);
    if (f === 'givekmore') {
      const x = R.int(1, 10);
      const k = R.int(1, 8);
      const b = R.int(3, 20);
      const a = b + k + 2 * x;
      return {
        prompt: `${p.name} had ${plural(a, it)} and ${q.name} had ${b}. How many ${it.many} must ${p.name} give ${q.name} so that ${p.name} has ${k} more than ${q.name}?`,
        input: 'number',
        answer: x,
        hint: `Find the difference now. It must shrink to ${k}. Each ${it.one} given changes the difference by 2.`,
        explain: `Difference now: ${a} − ${b} = ${a - b}. It must become ${k}: ${a - b} − ${k} = ${2 * x}. Half of ${2 * x} is ${x}. Check: ${a - x} − ${b + x} = ${k}.`
      };
    }
    if (f === 'twice') {
      const g = R.int(3, 15);
      return {
        prompt: `${p.name} had twice as many ${it.many} as ${q.name}. After ${p.name} gave away ${g} ${it.many}, they had the same number. How many ${it.many} did ${p.name} have **at first**?`,
        input: 'number',
        answer: 2 * g,
        hint: `Draw a model: ${p.name} has 2 units, ${q.name} has 1 unit. Giving away ${g} leaves 1 unit.`,
        explain: `${p.name}'s 2 units − ${g} = 1 unit, so 1 unit = ${g}. ${p.name} had 2 × ${g} = ${2 * g} at first.`
      };
    }
    const e = R.int(6, 25);
    const g = R.int(2, e - 1);
    return {
      prompt: `${p.name} and ${q.name} had ${2 * e} ${it.many} altogether. After ${p.name} gave ${q.name} ${g}, they had the same number. How many ${it.many} did ${p.name} have **at first**?`,
      input: 'number',
      answer: e + g,
      hint: 'The total does not change when they give to each other. Find how many each has at the end.',
      explain: `At the end each has ${2 * e} ÷ 2 = ${e}. ${p.name} gave away ${g}, so at first ${p.he} had ${e} + ${g} = ${e + g}.`
    };
  }
};

const LEG_PAIRS = [
  { a: { one: 'chicken', many: 'chickens', n: 2 }, b: { one: 'rabbit', many: 'rabbits', n: 4 }, part: 'legs', intro: (T) => `There are ${T} chickens and rabbits on a farm.` },
  { a: { one: 'duck', many: 'ducks', n: 2 }, b: { one: 'goat', many: 'goats', n: 4 }, part: 'legs', intro: (T) => `There are ${T} ducks and goats in a field.` },
  { a: { one: 'bird', many: 'birds', n: 2 }, b: { one: 'cat', many: 'cats', n: 4 }, part: 'legs', intro: (T) => `There are ${T} birds and cats in a garden.` },
  { a: { one: 'bicycle', many: 'bicycles', n: 2 }, b: { one: 'tricycle', many: 'tricycles', n: 3 }, part: 'wheels', intro: (T) => `There are ${T} bicycles and tricycles in a shop.` },
  { a: { one: 'bicycle', many: 'bicycles', n: 2 }, b: { one: 'car', many: 'cars', n: 4 }, part: 'wheels', intro: (T) => `There are ${T} bicycles and cars in a car park.` },
  { a: { one: 'stool', many: 'stools', n: 3 }, b: { one: 'chair', many: 'chairs', n: 4 }, part: 'legs', intro: (T) => `There are ${T} stools and chairs in a classroom.` }
];
function legsQuestion(R, T, extraCtx) {
  const pr = R.pick(LEG_PAIRS);
  const x = R.int(1, T - 1);
  const L = pr.a.n * (T - x) + pr.b.n * x;
  const askB = R.chance(0.6);
  const ask = askB ? pr.b : pr.a;
  const ans = askB ? x : T - x;
  const allA = T * pr.a.n;
  const step = pr.b.n - pr.a.n;
  return {
    prompt: `${pr.intro(T)} They have ${L} ${pr.part} altogether. How many ${ask.many} are there?${extraCtx || ''}`,
    input: 'number',
    answer: ans,
    hint: `Guess and check with a table, or suppose all ${T} are ${pr.a.many}. How many ${pr.part} is that? Each ${pr.b.one} adds ${step} more.`,
    explain: `Suppose all ${T} are ${pr.a.many}: ${T} × ${pr.a.n} = ${allA} ${pr.part}. We need ${L} − ${allA} = ${L - allA} more. Each ${pr.b.one} has ${step} more ${pr.part}, so there are ${L - allA} ÷ ${step} = ${x} ${pr.b.many} and ${T - x} ${pr.a.many}. Check: ${T - x} × ${pr.a.n} + ${x} × ${pr.b.n} = ${L}.`
  };
}
const p2Legs = {
  id: 'p2.think.legs',
  level: 'P2',
  strand: 'thinking',
  unit: 0,
  title: 'Chickens and rabbits',
  vi: 'Gà và thỏ (đoán–thử / giả sử)',
  icon: '🐔',
  tip: 'Lập bảng đoán–thử: số gà, số thỏ, tổng chân; mỗi lần đổi 1 gà thành 1 thỏ thì tăng 2 chân. Đây là bài "Guess and check" kinh điển, P5–P6 sẽ học thành cách "Supposition".',
  gen(R, tier) {
    const T = tier === 1 ? R.int(3, 5) : tier === 2 ? R.int(5, 8) : R.int(8, 12);
    return legsQuestion(R, T, '');
  }
};

const p2Growing = {
  id: 'p2.think.growing',
  level: 'P2',
  strand: 'thinking',
  unit: 0,
  title: 'Growing patterns',
  vi: 'Quy luật tăng dần (tìm số hạng thứ n)',
  icon: '📈',
  tip: 'Cho con viết tiếp dãy số (make a list) cho tới vị trí cần tìm, sau đó mới nhận ra quy tắc nhanh: số đầu + (n − 1) × bước nhảy.',
  gen(R, tier) {
    if (tier === 3) {
      if (R.chance(0.35)) {
        const n = R.int(5, 10);
        const ans = 3 * n + 1;
        return {
          prompt: `Squares are made with sticks in a row. 1 square needs 4 sticks, 2 squares in a row need 7 sticks, and 3 squares need 10 sticks. How many sticks are needed for ${n} squares in a row?`,
          input: 'number',
          answer: ans,
          hint: 'Look for a pattern: 4, 7, 10 … How many more sticks for each new square?',
          explain: `Each new square needs 3 more sticks: ${range(1, n).map((i) => 3 * i + 1).join(', ')}. ${n} squares need ${ans} sticks.`
        };
      }
      const a = R.int(2, 5);
      const d = R.int(2, 4);
      const n = R.int(6, 10);
      const val = a + (n - 1) * d;
      const groups = [1, 2, 3].map((i) => ({ emoji: '🔵', count: a + (i - 1) * d, label: `Figure ${i}` }));
      if (R.chance(0.4)) {
        return {
          prompt: `Look at the pattern of dots. Figure 1 has ${a} dots, Figure 2 has ${a + d} and Figure 3 has ${a + 2 * d}. Which figure has ${val} dots?`,
          visuals: [{ type: 'objects', size: 'sm', groups }],
          input: 'number',
          answer: n,
          hint: `How many dots are added each time? Keep adding until you reach ${val}.`,
          explain: `Add ${d} each time: ${range(1, n).map((i) => a + (i - 1) * d).join(', ')}. Figure ${n} has ${val} dots.`
        };
      }
      return {
        prompt: `Look at the pattern of dots. How many dots will Figure ${n} have?`,
        visuals: [{ type: 'objects', size: 'sm', groups }],
        input: 'number',
        answer: val,
        hint: 'How many dots are added from one figure to the next? Make a list.',
        explain: `Each figure has ${d} more dots: ${range(1, n).map((i) => a + (i - 1) * d).join(', ')}. Figure ${n} has ${val} dots.`
      };
    }
    const d = R.pick([2, 3, 4, 5, 10]);
    const s = R.int(1, 10);
    const n = tier === 1 ? R.pick([5, 6]) : R.int(7, 10);
    const terms = range(1, Math.max(n, 4)).map((i) => s + (i - 1) * d);
    const ans = terms[n - 1];
    return {
      prompt: `Look at the number pattern. What is the **${ordinal(n)}** number?`,
      visuals: [{ type: 'sequence', items: [...terms.slice(0, 4), '…'] }],
      input: 'number',
      answer: ans,
      hint: `Find the rule: how much is added each time? Then keep going until the ${ordinal(n)} number.`,
      explain: `The rule is "add ${d}": ${terms.slice(0, n).join(', ')}. The ${ordinal(n)} number is ${ans}.`
    };
  }
};

const THINGS = ['book', 'toy', 'drink', 'snack', 'pencil case'];
const p2Backwards = {
  id: 'p2.think.backwards',
  level: 'P2',
  strand: 'thinking',
  unit: 0,
  title: 'Work backwards (2 steps)',
  vi: 'Giải ngược nhiều bước',
  icon: '↩️',
  tip: 'Viết các bước thành sơ đồ mũi tên (start → −5 → +8 → 20), rồi đi NGƯỢC từ cuối: đổi + thành −, × thành ÷. Luôn thử lại (check) bằng cách đi xuôi.',
  gen(R, tier) {
    const [p] = people(R, 1);
    if (tier === 1) {
      if (R.chance(0.5)) {
        let x;
        let a;
        let b;
        do {
          x = R.int(2, 30);
          a = R.int(2, 9);
          b = R.int(2, 9);
        } while (x + a - b < 0);
        const c = x + a - b;
        return {
          prompt: `I think of a number. I add ${a}, then I take away ${b}. The answer is ${c}. What is my number?`,
          input: 'number',
          answer: x,
          hint: 'Work backwards from the answer: undo "take away" first, then undo "add".',
          explain: `${c} + ${b} = ${c + b}. ${c + b} − ${a} = ${x}. My number is ${x}. Check: ${x} + ${a} − ${b} = ${c}.`
        };
      }
      const x = R.int(10, 40);
      const a = R.int(2, Math.min(9, x - 1));
      const b = R.int(2, 10);
      const c = x - a + b;
      const thing = R.pick(THINGS);
      return {
        prompt: `${p.name} had some money. ${p.He} spent $${a} on ${aOrAn(thing)} ${thing}. Then Grandma gave ${p.him} $${b}. Now ${p.he} has $${c}. How much money did ${p.he} have at first?`,
        input: 'number',
        unit: { pre: '$' },
        answer: x,
        hint: 'Work backwards: undo the last step first. Grandma gave money → take it away. Spent money → add it back.',
        explain: `$${c} − $${b} = $${c - b}. $${c - b} + $${a} = $${x}. ${p.name} had $${x} at first.`
      };
    }
    if (tier === 2) {
      const f = R.pick(['muladd', 'halfadd', 'submul']);
      if (f === 'muladd') {
        const m = R.pick([2, 5, 10]);
        const x = R.int(2, 10);
        const a = R.int(1, 9);
        const c = m * x + a;
        return {
          prompt: `I think of a number. I multiply it by ${m}, then add ${a}. The answer is ${c}. What is my number?`,
          input: 'number',
          answer: x,
          hint: 'Work backwards: undo "add" by taking away, then undo "multiply" by dividing.',
          explain: `${c} − ${a} = ${c - a}. ${c - a} ÷ ${m} = ${x}. My number is ${x}. Check: ${x} × ${m} + ${a} = ${c}.`
        };
      }
      if (f === 'halfadd') {
        const h = R.int(2, 15);
        const a = R.int(1, 9);
        const c = h + a;
        return {
          prompt: `I think of a number. I take half of it, then add ${a}. The answer is ${c}. What is my number?`,
          input: 'number',
          answer: 2 * h,
          hint: 'Work backwards: undo "add", then undo "half" by doubling.',
          explain: `${c} − ${a} = ${h}. Double ${h}: ${h} × 2 = ${2 * h}. My number is ${2 * h}.`
        };
      }
      const a = R.int(1, 9);
      const x = R.int(a + 1, a + 10);
      const c = (x - a) * 2;
      return {
        prompt: `I think of a number. I take away ${a}, then multiply by 2. The answer is ${c}. What is my number?`,
        input: 'number',
        answer: x,
        hint: 'Work backwards: undo "multiply by 2" first by dividing by 2. Then undo "take away".',
        explain: `${c} ÷ 2 = ${c / 2}. ${c / 2} + ${a} = ${x}. My number is ${x}.`
      };
    }
    if (R.chance(0.5)) {
      const it = item(R, R.pick(['toys', 'school']));
      let S;
      let a;
      let b;
      let c;
      do {
        S = R.int(10, 40);
        a = R.int(2, 9);
        b = R.int(2, 9);
        c = R.int(2, 9);
      } while (S - a < 0 || S - a + b - c < 1);
      const F = S - a + b - c;
      return {
        prompt: `${p.name} had some ${it.many}. ${p.He} gave ${a} to a friend. Then ${p.his} brother gave ${p.him} ${b}. Then ${p.he} lost ${c}. Now ${p.he} has ${F}. How many ${it.many} did ${p.he} have at first?`,
        input: 'number',
        answer: S,
        hint: 'Work backwards from the end. Undo "lost" first, then "was given", then "gave".',
        explain: `${F} + ${c} = ${F + c}. ${F + c} − ${b} = ${F + c - b}. ${F + c - b} + ${a} = ${S}. ${p.name} had ${S} at first.`
      };
    }
    const a = R.int(2, 9);
    const left = R.int(2, 12);
    const S = 2 * (a + left);
    const thing = R.pick(THINGS);
    return {
      prompt: `${p.name} spent half of ${p.his} money on ${aOrAn(thing)} ${thing}. Then ${p.he} spent $${a} on lunch. ${p.He} had $${left} left. How much money did ${p.he} have at first?`,
      input: 'number',
      unit: { pre: '$' },
      answer: S,
      hint: 'Work backwards: add back the lunch money first. That amount is the half that was left.',
      explain: `$${left} + $${a} = $${left + a}. That is half of the money, so at first ${p.he} had $${left + a} × 2 = $${S}.`
    };
  }
};

const LOGIC_CTX = [
  ...ORDER_CTX,
  { stickers: true, line: 'from the most stickers to the fewest' }
];
function logicClue(R, hi, lo, ctx) {
  if (ctx.stickers) return R.chance(0.5) ? `${hi} has more stickers than ${lo}.` : `${lo} has fewer stickers than ${hi}.`;
  return clueFor(R, hi, lo, ctx);
}
function logicAsk(ctx, pos) {
  if (ctx.stickers) {
    if (pos === 'last') return 'Who has the **fewest** stickers?';
    return pos === 0 ? 'Who has the **most** stickers?' : `Who has the **${['', 'second', 'third'][pos]} most** stickers?`;
  }
  return askAt(ctx, pos);
}
const p2Logic = {
  id: 'p2.think.logic',
  level: 'P2',
  strand: 'thinking',
  unit: 0,
  title: 'Logic puzzles',
  vi: 'Suy luận logic từ các gợi ý',
  icon: '🧩',
  tip: 'Cho con vẽ một cột/hàng và đặt tên từng bạn vào theo từng gợi ý. Mỗi gợi ý chỉ so sánh 2 bạn — ghép lại sẽ thành thứ tự đầy đủ.',
  gen(R, tier) {
    const ctx = R.pick(LOGIC_CTX);
    const n = tier === 1 ? 3 : 4;
    const order = people(R, n);
    const clues = [];
    for (let i = 0; i < n - 1; i++) clues.push(logicClue(R, order[i].name, order[i + 1].name, ctx));
    const shown = tier === 2 && R.chance(0.4) ? clues : R.shuffle(clues);
    const positions = tier === 1 ? [0, 1, 'last'] : tier === 2 ? [0, 1, 'last'] : [1, 2, 'last', 0];
    const pos = R.pick(positions);
    const idx = pos === 'last' ? n - 1 : pos;
    const ans = order[idx].name;
    let question = logicAsk(ctx, pos);
    if (n === 3 && pos === 1) question = ctx.race ? 'Who came **second** in the race?' : ctx.stickers ? 'Who is in the **middle** (not the most, not the fewest)?' : `Who is the **${ctx.second}**?`;
    return {
      prompt: `${shown.join(' ')} ${question}`,
      input: 'choice',
      answer: ans,
      choices: R.shuffle(order.map((x) => x.name)).map((v) => ({ value: v, label: v })),
      hint: `Draw a line and put the names on it ${ctx.line}. Use one clue at a time.`,
      explain: `${cap(ctx.line)}: ${order.map((x) => x.name).join(', ')}. The answer is ${ans}.`
    };
  }
};

function fewestCoins(amount, coins) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let v = 1; v <= amount; v++) for (const c of coins) if (c <= v && dp[v - c] + 1 < dp[v]) dp[v] = dp[v - c] + 1;
  return dp[amount];
}
function greedyCoins(amount, coins) {
  const out = [];
  let left = amount;
  for (const c of [...coins].sort((a, b) => b - a)) {
    while (left >= c) {
      out.push(c);
      left -= c;
    }
  }
  return left === 0 ? out : null;
}
function waysToMake(amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) for (let v = c; v <= amount; v++) dp[v] += dp[v - c];
  return dp[amount];
}
function twoDigitNumbers(digits) {
  const out = [];
  for (const a of digits) for (const b of digits) if (a !== b && a !== 0) out.push(a * 10 + b);
  return [...new Set(out)].sort((x, y) => x - y);
}
const p2List = {
  id: 'p2.think.list',
  level: 'P2',
  strand: 'thinking',
  unit: 0,
  title: 'Make a list',
  vi: 'Liệt kê có hệ thống (bắt tay, phối đồ, đồng xu)',
  icon: '📝',
  tip: 'Chiến lược "Make a systematic list": liệt kê theo thứ tự cố định (ví dụ cố định áo thứ nhất, ghép với từng quần…) để không sót, không trùng.',
  gen(R, tier) {
    const [p] = people(R, 1);
    const forms = tier === 1 ? ['outfits', 'meals', 'hands'] : tier === 2 ? ['hands', 'twodigit', 'outfits'] : ['coins', 'ways', 'twodigit0', 'fourcards'];
    const f = R.pick(forms);
    if (f === 'outfits' || f === 'meals') {
      const s = R.int(2, tier === 1 ? 3 : 4);
      const t = R.int(2, tier === 1 ? 3 : 4);
      const prompt =
        f === 'outfits'
          ? `${p.name} has ${s} T-shirts and ${t} pairs of shorts. How many different outfits of 1 T-shirt and 1 pair of shorts can ${p.he} make?`
          : `A stall sells ${s} kinds of noodles and ${t} kinds of drinks. How many different meals of 1 noodle dish and 1 drink can you choose?`;
      return {
        prompt,
        input: 'number',
        answer: s * t,
        hint: 'Make a list: take the first one and match it with every choice of the other. Then the next one …',
        explain: `Each of the ${s} ${f === 'outfits' ? 'T-shirts' : 'noodle dishes'} can go with ${t} ${f === 'outfits' ? 'pairs of shorts' : 'drinks'}: ${rep(s, t)} = ${s * t}.`
      };
    }
    if (f === 'hands') {
      const n = tier === 1 ? R.int(3, 4) : R.int(4, 6);
      const ans = (n * (n - 1)) / 2;
      return {
        prompt: `${n} friends meet at a party. Each friend shakes hands with every other friend **once**. How many handshakes are there?`,
        input: 'number',
        answer: ans,
        hint: 'Make a list. The 1st friend shakes hands with everyone else. The 2nd friend has already shaken hands with the 1st …',
        explain: `1st friend: ${n - 1} handshakes, 2nd: ${n - 2} new ones, and so on. ${range(1, n - 1).reverse().join(' + ')} = ${ans} handshakes.`
      };
    }
    if (f === 'twodigit' || f === 'twodigit0' || f === 'fourcards') {
      let digits;
      if (f === 'twodigit') digits = R.distinctInts(3, 1, 9);
      else if (f === 'twodigit0') digits = [0, ...R.distinctInts(2, 1, 9)];
      else digits = R.distinctInts(4, 1, 9);
      const nums = twoDigitNumbers(digits);
      const cards = R.shuffle(digits);
      return {
        prompt: `How many different 2-digit numbers can you make with the digit cards ${cards.slice(0, -1).join(', ')} and ${cards[cards.length - 1]}? Each card can be used only once in a number.`,
        input: 'number',
        answer: nums.length,
        hint: `Make a list. Start with each card in the tens place in turn.${digits.includes(0) ? ' Careful: 0 cannot be in the tens place!' : ''}`,
        explain: `The numbers are ${nums.join(', ')}. There are ${nums.length} of them.`
      };
    }
    if (f === 'coins') {
      const amount = R.int(7, 19) * 5;
      const coins = [5, 10, 20, 50];
      const ans = fewestCoins(amount, coins);
      const greedy = greedyCoins(amount, coins);
      const list = greedy && greedy.length === ans ? greedy.map((c) => `${c}¢`).join(' + ') : '';
      return {
        prompt: `What is the **fewest** number of coins needed to make ${cents(amount)}? You can use 5¢, 10¢, 20¢ and 50¢ coins.`,
        input: 'number',
        answer: ans,
        hint: 'Use the biggest coin you can first, then the next biggest …',
        explain: list ? `${list} = ${cents(amount)}. That is ${ans} coins.` : `You need at least ${ans} coins.`
      };
    }
    const pair = R.pick([[5, 10], [10, 20], [5, 20]]);
    const amount = R.int(4, 10) * pair[0];
    const ways = waysToMake(amount, pair);
    const combos = [];
    for (let k = 0; k * pair[1] <= amount; k++) {
      const rest = amount - k * pair[1];
      if (rest % pair[0] === 0) combos.push(`${k} × ${pair[1]}¢ and ${rest / pair[0]} × ${pair[0]}¢`);
    }
    return {
      prompt: `How many different ways can you make ${cents(amount)} using only ${pair[0]}¢ and ${pair[1]}¢ coins? (You do not have to use both kinds.)`,
      input: 'number',
      answer: ways,
      hint: `Make a list: use 0 coins of ${pair[1]}¢, then 1, then 2 … and fill up the rest with ${pair[0]}¢ coins.`,
      explain: `${combos.join('; ')}. There are ${ways} ways.`
    };
  }
};

// ====================================================================== P3
const p3Unitary = {
  id: 'p3.think.unitary',
  level: 'P3',
  strand: 'thinking',
  unit: 0,
  title: 'Units and models',
  vi: 'Phương pháp đơn vị (vẽ mô hình "units")',
  icon: '🟦',
  tip: 'Vẽ mô hình: người ít hơn là 1 unit, "3 times as many" là 3 units bằng nhau. Tìm 1 unit trước (tổng ÷ số units hoặc hiệu ÷ số units chênh), rồi mới tìm đáp số.',
  gen(R, tier) {
    const [p, q, r3] = people(R, 3);
    const it = item(R, R.pick(STORY_CATS));
    const unitBar = (k) => Array.from({ length: k }, () => ({ v: 1, text: '' }));
    if (tier <= 2) {
      const k = tier === 1 ? 2 : R.int(3, 5);
      const u = R.int(tier === 1 ? 3 : 2, tier === 1 ? 15 : 12);
      const times = k === 2 ? 'twice' : `${k} times`;
      const useTotal = R.chance(0.6);
      const askP = R.chance(0.5);
      const ans = askP ? k * u : u;
      const rows = [{ label: p.name, segs: unitBar(k) }, { label: q.name, segs: unitBar(1).map((s) => ({ ...s, color: 'orange' })) }];
      if (useTotal) {
        const T = (k + 1) * u;
        return {
          prompt: `${p.name} has ${times} as many ${it.many} as ${q.name}. They have ${T} ${it.many} altogether. How many ${it.many} does ${askP ? p.name : q.name} have?`,
          visuals: [{ type: 'bar', rows, sum: { text: String(T) } }],
          input: 'number',
          answer: ans,
          hint: `Draw a model: ${p.name} has ${k} units, ${q.name} has 1 unit. How many units altogether?`,
          explain: `${k + 1} units = ${T}. 1 unit = ${T} ÷ ${k + 1} = ${u}. ${q.name} has ${u}${askP ? ` and ${p.name} has ${k} × ${u} = ${k * u}` : ''}.`
        };
      }
      const D = (k - 1) * u;
      return {
        prompt: `${p.name} has ${times} as many ${it.many} as ${q.name}. ${p.name} has ${D} more ${it.many} than ${q.name}. How many ${it.many} does ${askP ? p.name : q.name} have?`,
        visuals: [{ type: 'bar', rows, diff: { text: String(D), short: 1, long: 0 } }],
        input: 'number',
        answer: ans,
        hint: `Draw a model. ${p.name}'s bar is ${k - 1} unit${k - 1 > 1 ? 's' : ''} longer than ${q.name}'s bar.`,
        explain: `${k - 1 === 1 ? `The difference is 1 unit, so 1 unit = ${D}.` : `${k - 1} units = ${D}. 1 unit = ${D} ÷ ${k - 1} = ${u}.`} ${q.name} has ${u}${askP ? ` and ${p.name} has ${k} × ${u} = ${k * u}` : ''}.`
      };
    }
    const f = R.pick(['three', 'transfer', 'ribbon']);
    if (f === 'three') {
      const u = R.int(3, 12);
      const e = R.int(2, 15);
      const T = 4 * u + e;
      return {
        prompt: `${p.name} has twice as many ${it.many} as ${q.name}. ${r3.name} has ${e} more ${it.many} than ${q.name}. They have ${T} ${it.many} altogether. How many ${it.many} does ${r3.name} have?`,
        input: 'number',
        answer: u + e,
        hint: `Draw a model: ${q.name} = 1 unit, ${p.name} = 2 units, ${r3.name} = 1 unit and ${e} more.`,
        explain: `4 units + ${e} = ${T}. 4 units = ${T - e}. 1 unit = ${u}. ${r3.name} has ${u} + ${e} = ${u + e}.`
      };
    }
    if (f === 'transfer') {
      const g = R.int(3, 15);
      return {
        prompt: `${p.name} has 3 times as many ${it.many} as ${q.name}. If ${p.name} gives ${q.name} ${g} ${it.many}, they will have the same number. How many ${it.many} does ${p.name} have?`,
        input: 'number',
        answer: 3 * g,
        hint: `Draw a model: ${p.name} 3 units, ${q.name} 1 unit. The difference is 2 units. To be equal, ${p.name} gives half of the difference.`,
        explain: `The difference is 2 units. ${p.name} gives half of it, which is 1 unit, so 1 unit = ${g}. ${p.name} has 3 × ${g} = ${3 * g}.`
      };
    }
    const k = R.int(2, 4);
    const u = R.int(4, 20);
    const T = (k + 1) * u;
    const askLong = R.chance(0.6);
    return {
      prompt: `A ribbon ${T} cm long is cut into 2 pieces. The longer piece is ${k === 2 ? 'twice' : `${k} times`} as long as the shorter piece. How long is the ${askLong ? 'longer' : 'shorter'} piece?`,
      input: 'number',
      unit: { post: 'cm' },
      answer: askLong ? k * u : u,
      hint: `Draw a model: shorter piece = 1 unit, longer piece = ${k} units.`,
      explain: `${k + 1} units = ${T} cm. 1 unit = ${u} cm. The longer piece is ${k} × ${u} = ${k * u} cm and the shorter piece is ${u} cm.`
    };
  }
};

const p3SameDiff = {
  id: 'p3.think.samediff',
  level: 'P3',
  strand: 'thinking',
  unit: 0,
  title: 'Same difference',
  vi: 'Hiệu không đổi (tuổi, cùng thêm/bớt)',
  icon: '↕️',
  tip: 'Khi cả hai cùng thêm (hoặc cùng bớt) một lượng như nhau, HIỆU KHÔNG ĐỔI. Bài tuổi luôn dùng ý này: bố luôn hơn con đúng bấy nhiêu tuổi.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    if (tier === 1) {
      const a = R.int(5, 10);
      const D = R.int(24, 36);
      if (R.chance(0.6)) {
        const k = R.int(2, 10);
        return {
          prompt: `${p.name} is ${a} years old. ${p.His} father is ${a + D} years old. How old will ${p.his} father be when ${p.name} is ${a + k}?`,
          input: 'number',
          unit: { post: 'years old' },
          answer: a + D + k,
          hint: `How many years from now until ${p.name} is ${a + k}? Father also gets that many years older.`,
          explain: `${a + k} − ${a} = ${k} years later. Father will be ${a + D} + ${k} = ${a + D + k}. (He is always ${D} years older.)`
        };
      }
      return {
        prompt: `${p.name} is ${a} years old. ${p.His} mother is ${a + D} years old. How old was ${p.his} mother when ${p.name} was born?`,
        input: 'number',
        unit: { post: 'years old' },
        answer: D,
        hint: `When ${p.name} was born, ${p.he} was 0 years old. Go back ${a} years for both.`,
        explain: `Go back ${a} years: ${a + D} − ${a} = ${D}. ${p.His} mother was ${D} years old.`
      };
    }
    if (tier === 2) {
      const f = R.pick(['both', 'number', 'sibling']);
      if (f === 'both') {
        const y = R.int(10, 40);
        const x = y + R.int(5, 25);
        const k = R.int(4, 15);
        const buy = R.chance(0.5);
        return {
          prompt: `${p.name} has ${x} stickers and ${q.name} has ${y} stickers. Each of them ${buy ? `buys ${k} more` : `gives away ${k}`} stickers. How many more stickers does ${p.name} have than ${q.name} now?`,
          input: 'number',
          answer: x - y,
          hint: 'They both change by the same amount. Does the difference change?',
          explain: `The difference stays the same: ${x} − ${y} = ${x - y}. (Now: ${buy ? x + k : x - k} − ${buy ? y + k : y - k} = ${x - y}.)`
        };
      }
      if (f === 'number') {
        const d = R.int(5, 30);
        const k = R.int(3, 20);
        return {
          prompt: `The difference between two numbers is ${d}. If ${k} is added to each number, what is the difference now?`,
          input: 'number',
          answer: d,
          hint: 'Try it with two numbers you choose. Add the same amount to both.',
          explain: `Adding ${k} to both numbers moves them together, so the difference stays ${d}.`
        };
      }
      const a = R.int(6, 12);
      const d = R.int(2, 6);
      const later = a - d + R.int(3, 8);
      return {
        prompt: `${p.name} is ${a} years old and ${p.his} sister is ${a - d}. How old will ${p.name} be when ${p.his} sister is ${later}?`,
        input: 'number',
        unit: { post: 'years old' },
        answer: later + d,
        hint: `${p.name} is always ${d} years older than ${p.his} sister.`,
        explain: `${p.name} is always ${a} − ${a - d} = ${d} years older. ${later} + ${d} = ${later + d}.`
      };
    }
    if (R.chance(0.55)) {
      const m = R.pick([3, 4, 5]);
      const F = R.int(m === 3 ? 12 : m === 4 ? 8 : 7, m === 3 ? 17 : m === 4 ? 12 : 9);
      const D = (m - 1) * F;
      const c = R.int(Math.max(2, F - 8), F - 1);
      const M = c + D;
      return {
        prompt: `Mum is ${M} years old and ${p.name} is ${c}. In how many years will Mum be ${m} times as old as ${p.name}?`,
        input: 'number',
        unit: { post: 'years' },
        answer: F - c,
        hint: `The age difference (${M} − ${c}) never changes. Draw a model: ${p.name} 1 unit, Mum ${m} units. The difference is ${m - 1} units.`,
        explain: `Difference = ${M} − ${c} = ${D}. ${m - 1} units = ${D}, so 1 unit = ${F}: ${p.name} will be ${F}. That is ${F} − ${c} = ${F - c} years from now (Mum: ${F * m}).`
      };
    }
    const m = R.pick([2, 3]);
    const b = R.int(2, 15);
    const D = (m - 1) * b;
    const g = R.int(2, 15);
    const y = b + g;
    const x = y + D;
    return {
      prompt: `${p.name} has ${x} marbles and ${q.name} has ${y} marbles. They each give away the same number of marbles. Then ${p.name} has ${m === 2 ? 'twice' : '3 times'} as many marbles as ${q.name}. How many marbles did each of them give away?`,
      input: 'number',
      answer: g,
      hint: `The difference ${x} − ${y} stays the same. At the end, ${p.name} has ${m} units and ${q.name} 1 unit.`,
      explain: `Difference = ${x} − ${y} = ${D} = ${m - 1} unit${m > 2 ? 's' : ''}, so 1 unit = ${b}. ${q.name} ends with ${b}, so each gave away ${y} − ${b} = ${g}.`
    };
  }
};

const COIN_PAIRS = [
  { lo: 20, hi: 50, kind: 'coin', fmt: (v) => (v < 100 ? cents(v) : money(v)), name: (c) => `${c}¢` },
  { lo: 10, hi: 20, kind: 'coin', fmt: (v) => (v < 100 ? cents(v) : money(v)), name: (c) => `${c}¢` },
  { lo: 2, hi: 5, kind: 'note', fmt: (v) => `$${v}`, name: (c) => `$${c}` },
  { lo: 5, hi: 10, kind: 'note', fmt: (v) => `$${v}`, name: (c) => `$${c}` }
];
const p3Suppose = {
  id: 'p3.think.suppose',
  level: 'P3',
  strand: 'thinking',
  unit: 0,
  title: 'Suppose and check',
  vi: 'Phương pháp giả sử, thừa – thiếu',
  icon: '💭',
  tip: '"Supposition": giả sử tất cả đều là loại rẻ hơn/ít chân hơn, tính phần thiếu, rồi chia cho phần chênh lệch mỗi cái. Luôn kiểm tra lại đáp án bằng cách tính xuôi.',
  gen(R, tier) {
    const [p] = people(R, 1);
    if (tier === 1) return legsQuestion(R, R.int(10, 20), '');
    if (tier === 2) {
      const cp = R.pick(COIN_PAIRS);
      const T = R.int(5, 12);
      const x = R.int(1, T - 1);
      const V = cp.lo * (T - x) + cp.hi * x;
      const askHi = R.chance(0.6);
      const ans = askHi ? x : T - x;
      const unitWord = cp.kind === 'coin' ? 'coins' : 'notes';
      return {
        prompt: `${p.name} has ${T} ${unitWord}. Some are ${cp.name(cp.lo)} ${unitWord} and the rest are ${cp.name(cp.hi)} ${unitWord}. Altogether they are worth ${cp.fmt(V)}. How many ${cp.name(askHi ? cp.hi : cp.lo)} ${unitWord} are there?`,
        input: 'number',
        answer: ans,
        hint: `Suppose all ${T} are ${cp.name(cp.lo)} ${unitWord}. How much is that? Each ${cp.name(cp.hi)} adds ${cp.name(cp.hi - cp.lo)} more.`,
        explain: `Suppose all ${T} are ${cp.name(cp.lo)} ${unitWord}: ${T} × ${cp.name(cp.lo)} = ${cp.fmt(T * cp.lo)}. That is ${cp.fmt(V - T * cp.lo)} short of ${cp.fmt(V)}. Each ${cp.name(cp.hi)} ${cp.kind} adds ${cp.name(cp.hi - cp.lo)} more, so there are ${cp.fmt(V - T * cp.lo)} ÷ ${cp.name(cp.hi - cp.lo)} = ${x} ${cp.name(cp.hi)} ${unitWord} and ${T - x} ${cp.name(cp.lo)} ${unitWord}.`
      };
    }
    if (R.chance(0.5)) {
      const Q = R.pick([10, 12, 15, 20]);
      const r = R.int(2, 5);
      const w = R.int(1, 2);
      const minC = Math.ceil((w * Q) / (r + w));
      const c = R.int(Math.max(minC, 1), Q - 1);
      const S = r * c - w * (Q - c);
      const askRight = R.chance(0.65);
      return {
        prompt: `A quiz has ${Q} questions. You get ${r} points for each correct answer and lose ${w} point${w > 1 ? 's' : ''} for each wrong answer. ${p.name} answered all the questions and scored ${S} points. How many questions did ${p.he} answer ${askRight ? 'correctly' : 'wrongly'}?`,
        input: 'number',
        answer: askRight ? c : Q - c,
        hint: `Suppose all ${Q} answers were correct. How many points is that? Each wrong answer takes away ${r} + ${w} points from that.`,
        explain: `All correct: ${Q} × ${r} = ${Q * r}. ${p.name} scored ${Q * r - S} fewer. Each wrong answer costs ${r} + ${w} = ${r + w}, so wrong = ${Q * r - S} ÷ ${r + w} = ${Q - c} and correct = ${c}. Check: ${c} × ${r} − ${Q - c} × ${w} = ${S}.`
      };
    }
    const n = R.int(3, 12);
    const a = R.int(2, 6);
    const b = a + R.int(1, 2);
    const e = R.int(1, Math.min(12, (b - a) * n - 1));
    const s = (b - a) * n - e;
    const total = a * n + e;
    const askFriends = R.chance(0.6);
    return {
      prompt: `If ${p.name} gives each friend ${a} sweets, ${p.he} will have ${e} sweet${e > 1 ? 's' : ''} left. If ${p.he} gives each friend ${b} sweets, ${p.he} will be short of ${s} sweet${s > 1 ? 's' : ''}. How many ${askFriends ? 'friends does ' + p.name + ' have' : 'sweets does ' + p.name + ' have'}?`,
      input: 'number',
      answer: askFriends ? n : total,
      hint: `The two ways differ by ${e} + ${s} sweets. Each friend gets ${b - a} more in the second way.`,
      explain: `Difference: ${e} + ${s} = ${e + s} sweets. Each friend gets ${b - a} more, so there are ${e + s} ÷ ${b - a} = ${n} friends. Sweets: ${n} × ${a} + ${e} = ${total}.`
    };
  }
};

const p3Patterns = {
  id: 'p3.think.patterns',
  level: 'P3',
  strand: 'thinking',
  unit: 0,
  title: 'Pattern detective',
  vi: 'Quy luật: tìm hình/số ở vị trí thứ n',
  icon: '🔎',
  tip: 'Với quy luật lặp lại: tìm "nhóm lặp" (ví dụ 3 hình), rồi chia vị trí cho 3 và xem số dư. Với dãy cộng đều: số thứ n = số đầu + (n − 1) × bước nhảy.',
  gen(R, tier) {
    if (tier === 1 || (tier === 3 && R.chance(0.3))) {
      const code = R.pick(tier === 1 ? ['AB', 'ABC', 'ABCD'] : ['AAB', 'ABB', 'AABC', 'ABCC']);
      const letters = [...new Set(code.split(''))];
      const its = R.sample(ALL_ITEMS, letters.length + 1);
      const map = Object.fromEntries(letters.map((l, i) => [l, its[i]]));
      const L = code.length;
      const shown = range(0, L * 2 - 1).map((i) => map[code[i % L]].e);
      if (tier === 1) {
        const n = R.int(10, 40);
        const ans = map[code[(n - 1) % L]];
        const rem = n % L;
        return {
          prompt: `The pictures repeat in this pattern. What is the **${ordinal(n)}** picture?`,
          visuals: [{ type: 'sequence', items: [...shown, '…'] }],
          input: 'choice',
          answer: ans.e,
          choices: R.shuffle([...letters.map((l) => map[l].e), its[letters.length].e]).map((e) => ({ value: e, label: e })),
          hint: `The repeating group has ${L} pictures. Divide ${n} by ${L} and look at the remainder.`,
          explain: `The group of ${L} repeats. ${n} ÷ ${L} = ${Math.floor(n / L)} remainder ${rem}. ${rem === 0 ? `Remainder 0 means the last picture of the group` : `Remainder ${rem} means picture number ${rem} of the group`}: the ${ans.one}.`
        };
      }
      const target = R.pick(letters);
      const N = R.int(12, 30);
      const perGroup = code.split('').filter((l) => l === target).length;
      const full = Math.floor(N / L);
      const restCount = code.slice(0, N % L).split('').filter((l) => l === target).length;
      const ans = full * perGroup + restCount;
      return {
        prompt: `The pictures repeat in this pattern. How many ${map[target].e} are there in the first ${N} pictures?`,
        speak: `The pictures repeat in this pattern. How many ${map[target].many} are there in the first ${N} pictures?`,
        visuals: [{ type: 'sequence', items: [...shown, '…'] }],
        input: 'number',
        answer: ans,
        hint: `Each group of ${L} pictures has ${perGroup} ${map[target].e}. How many full groups are there in ${N} pictures?`,
        explain: `${N} ÷ ${L} = ${full} full groups, remainder ${N % L}. ${full} × ${perGroup} = ${full * perGroup}, plus ${restCount} in the leftover pictures = ${ans}.`
      };
    }
    const d = R.int(2, 9);
    const s = R.int(1, 20);
    const terms = range(1, 4).map((i) => s + (i - 1) * d);
    if (tier === 2) {
      const n = R.int(12, 40);
      const ans = s + (n - 1) * d;
      return {
        prompt: `Look at the number pattern: ${terms.join(', ')}, … What is the **${ordinal(n)}** number?`,
        visuals: [{ type: 'sequence', items: [...terms, '…'] }],
        input: 'number',
        answer: ans,
        hint: `Each number is ${d} more than the one before. From the 1st to the ${ordinal(n)} number, how many jumps of ${d} are there?`,
        explain: `There are ${n} − 1 = ${n - 1} jumps of ${d}. ${s} + ${n - 1} × ${d} = ${s} + ${(n - 1) * d} = ${ans}.`
      };
    }
    const n = R.int(12, 30);
    const v = s + (n - 1) * d;
    if (R.chance(0.5)) {
      return {
        prompt: `Look at the number pattern: ${terms.join(', ')}, … In which position is the number ${v}? (Type the position, e.g. 5 for 5th.)`,
        visuals: [{ type: 'sequence', items: [...terms, '…'] }],
        input: 'number',
        answer: n,
        hint: `How many jumps of ${d} from ${s} to ${v}? The position is one more than the number of jumps.`,
        explain: `${v} − ${s} = ${v - s}. ${v - s} ÷ ${d} = ${n - 1} jumps. Position = ${n - 1} + 1 = ${n}. ${v} is the ${ordinal(n)} number.`
      };
    }
    return {
      prompt: `How many numbers are there in this list? ${terms.join(', ')}, …, ${v}`,
      input: 'number',
      answer: n,
      hint: `The numbers go up by ${d}. Count the jumps from ${s} to ${v}, then add 1.`,
      explain: `${v} − ${s} = ${v - s}. ${v - s} ÷ ${d} = ${n - 1} jumps, so there are ${n - 1} + 1 = ${n} numbers.`
    };
  }
};

function polyomino(R, n) {
  const cells = [[0, 0]];
  const has = (r, c) => cells.some(([a, b]) => a === r && b === c);
  let guard = 0;
  while (cells.length < n && guard++ < 500) {
    const [r, c] = R.pick(cells);
    const [dr, dc] = R.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    const nr = r + dr;
    const nc = c + dc;
    if (!has(nr, nc)) cells.push([nr, nc]);
  }
  const minR = Math.min(...cells.map((x) => x[0]));
  const minC = Math.min(...cells.map((x) => x[1]));
  const norm = cells.map(([r, c]) => [r - minR, c - minC]);
  const rows = Math.max(...norm.map((x) => x[0])) + 1;
  const cols = Math.max(...norm.map((x) => x[1])) + 1;
  let shared = 0;
  for (const [r, c] of norm) {
    if (norm.some(([a, b]) => a === r + 1 && b === c)) shared++;
    if (norm.some(([a, b]) => a === r && b === c + 1)) shared++;
  }
  return { cells: norm, rows, cols, edges: 4 * norm.length - 2 * shared };
}
const p3Squares = {
  id: 'p3.think.squares',
  level: 'P3',
  strand: 'thinking',
  unit: 0,
  title: 'Square puzzles',
  vi: 'Đố vui chu vi, diện tích ghép từ hình vuông',
  icon: '🟨',
  tip: 'Chu vi = tổng độ dài đường bao NGOÀI. Khi ghép hai hình vuông, cạnh chung nằm bên trong nên không tính. Cho con tô màu đường bao rồi đếm từng cạnh.',
  gen(R, tier) {
    if (tier === 1) {
      const n = R.int(2, 5);
      const s = R.int(2, 6);
      const askP = R.chance(0.6);
      const ans = askP ? 2 * (n * s + s) : n * s * s;
      return {
        prompt: `A rectangle is made of ${n} squares in a row. Each square has sides of ${s} cm. What is the ${askP ? '**perimeter**' : '**area**'} of the rectangle?`,
        visuals: [{ type: 'grid', rows: 1, cols: n, cells: range(0, n - 1).map((c) => ({ r: 0, c, e: '🟦' })) }],
        input: 'number',
        unit: { post: askP ? 'cm' : 'cm²' },
        answer: ans,
        hint: askP ? `The rectangle is ${n} × ${s} cm long and ${s} cm wide. Add all 4 sides.` : `Each square has an area of ${s} × ${s} cm². How many squares are there?`,
        explain: askP
          ? `Length = ${n} × ${s} = ${n * s} cm, width = ${s} cm. Perimeter = ${n * s} + ${s} + ${n * s} + ${s} = ${ans} cm.`
          : `Each square: ${s} × ${s} = ${s * s} cm². ${n} squares: ${n} × ${s * s} = ${ans} cm².`
      };
    }
    if (tier === 2) {
      const f = R.pick(['cut2', 'cut4', 'join2']);
      const s = R.int(2, 6) * 2;
      if (f === 'cut2') {
        return {
          prompt: `A square of side ${s} cm is cut into 2 equal rectangles. What is the perimeter of **one** rectangle?`,
          visuals: [{ type: 'grid', rows: 2, cols: 2, cells: [{ r: 0, c: 0, e: '🟦' }, { r: 0, c: 1, e: '🟦' }, { r: 1, c: 0, e: '🟨' }, { r: 1, c: 1, e: '🟨' }] }],
          input: 'number',
          unit: { post: 'cm' },
          answer: 3 * s,
          hint: `Each rectangle is ${s} cm long. How wide is it?`,
          explain: `Each rectangle is ${s} cm by ${s / 2} cm. Perimeter = ${s} + ${s / 2} + ${s} + ${s / 2} = ${3 * s} cm.`
        };
      }
      if (f === 'cut4') {
        return {
          prompt: `A square of side ${s} cm is cut into 4 equal smaller squares. What is the perimeter of **one** small square?`,
          visuals: [{ type: 'grid', rows: 2, cols: 2, cells: [{ r: 0, c: 0, e: '🟦' }, { r: 0, c: 1, e: '🟨' }, { r: 1, c: 0, e: '🟩' }, { r: 1, c: 1, e: '🟥' }] }],
          input: 'number',
          unit: { post: 'cm' },
          answer: 2 * s,
          hint: 'How long is one side of a small square?',
          explain: `Each small square has sides of ${s} ÷ 2 = ${s / 2} cm. Perimeter = 4 × ${s / 2} = ${2 * s} cm.`
        };
      }
      const t = s / 2 + R.int(0, 3);
      return {
        prompt: `Two squares, each with sides of ${t} cm, are put side by side to make a rectangle. What is the perimeter of the rectangle?`,
        visuals: [{ type: 'grid', rows: 1, cols: 2, cells: [{ r: 0, c: 0, e: '🟦' }, { r: 0, c: 1, e: '🟦' }] }],
        input: 'number',
        unit: { post: 'cm' },
        answer: 6 * t,
        hint: 'The side where the squares touch is inside. It is not part of the perimeter.',
        explain: `The rectangle is ${2 * t} cm by ${t} cm. Perimeter = ${2 * t} + ${t} + ${2 * t} + ${t} = ${6 * t} cm.`
      };
    }
    const n = R.int(4, 6); // ≤ 6 squares: a figure can never enclose a hole
    const shape = polyomino(R, n);
    const s = R.pick([1, 1, 2, 3]);
    const askP = R.chance(0.65);
    const ans = askP ? shape.edges * s : n * s * s;
    return {
      prompt: `This figure is made of ${n} squares. Each square has sides of ${s} cm. What is the ${askP ? '**perimeter**' : '**area**'} of the figure?`,
      visuals: [{ type: 'grid', rows: shape.rows, cols: shape.cols, cells: shape.cells.map(([r, c]) => ({ r, c, e: '🟦' })) }],
      input: 'number',
      unit: { post: askP ? 'cm' : 'cm²' },
      answer: ans,
      hint: askP ? 'Count the outside edges of the blue squares only. Edges shared by two squares are inside.' : `Each square has an area of ${s} × ${s} cm².`,
      explain: askP
        ? `There are ${shape.edges} outside edges, each ${s} cm. Perimeter = ${shape.edges} × ${s} = ${ans} cm.`
        : `${n} squares × ${s * s} cm² = ${ans} cm².`
    };
  }
};

export const SKILLS = [
  kRiddles,
  kOrder,
  kLegs,
  kPatterns,
  kOddOne,
  p1Backwards,
  p1Queue,
  p1Equal,
  p1GuessCheck,
  p1Balance,
  p1Picture,
  p1Figures,
  p1Age,
  p2BeforeAfter,
  p2Legs,
  p2Growing,
  p2Backwards,
  p2Logic,
  p2List,
  p3Unitary,
  p3SameDiff,
  p3Suppose,
  p3Patterns,
  p3Squares
];
