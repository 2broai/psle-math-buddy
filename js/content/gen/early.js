// Kindergarten (K1–K2) numeracy — MOE Nurturing Early Learners framework.
// Counting, comparing, numbers to 20, shapes, patterns, adding/taking away with pictures,
// measurement words, positions, sorting, coins and days.
import {
  ALL_ITEMS,
  ITEMS,
  DAYS,
  people,
  item,
  plural,
  numWord,
  numChoices,
  textChoices,
  visualChoices,
  fixedChoices,
  cap
} from '../helpers.js';

const seedOf = (R) => R.int(1, 99999);
const nounFor = (n, it) => (n === 1 ? it.one : it.many);

const COUNT_HINT = 'Touch each one as you count: 1, 2, 3 … The last number you say tells how many.';

// ------------------------------------------------------------------ unit 1: counting to 10
const countObjects = {
  id: 'k.count.objects10',
  level: 'K',
  strand: 'numbers',
  unit: 1,
  title: 'Count to 10',
  vi: 'Đếm đồ vật đến 10',
  icon: '🔢',
  tip: 'Cho con chạm tay vào từng hình khi đếm (đếm 1–1) và nói câu trọn vẹn: "There are 7 ducks." Khi hình xếp lộn xộn, nhắc con đánh dấu hình đã đếm.',
  gen(R, tier) {
    const it = item(R);
    if (tier === 3 && R.chance(0.45)) {
      const other = R.pick(ALL_ITEMS.filter((x) => x.e !== it.e));
      const n = R.int(3, 7);
      const m = R.int(2, 10 - n);
      const row = R.shuffle([...Array(n).fill(it.e), ...Array(m).fill(other.e)]);
      return {
        prompt: `How many **${it.many}** are there? Count only the ${it.many}.`,
        visuals: [{ type: 'sequence', items: row }],
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { min: 1, max: 10, near: [n + m, m, n + 1] }),
        hint: `Find each ${it.one} and touch it as you count. Skip the ${other.many}.`,
        explain: `There are ${plural(n, it)}. There are also ${plural(m, other)}, but we only count the ${it.many}.`
      };
    }
    const max = tier === 1 ? 5 : 10;
    const n = R.int(tier === 1 ? 1 : tier === 2 ? 3 : 5, max);
    const layout = tier === 1 ? 'rows' : tier === 2 ? R.pick(['rows', 'scatter']) : 'scatter';
    const prompt = R.pick([
      `How many ${it.many} are there?`,
      `Count the ${it.many}. How many are there?`,
      `How many ${it.many} can you see?`
    ]);
    return {
      prompt,
      visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: n }], layout, seed: seedOf(R), size: 'lg' }],
      input: 'choice',
      answer: n,
      choices: numChoices(R, n, { min: 1, max: max + 2, near: [n - 1, n + 1] }),
      hint: COUNT_HINT,
      explain: `There ${n === 1 ? 'is' : 'are'} ${plural(n, it)}. We count 1 to ${n}.`
    };
  }
};

const countMatch = {
  id: 'k.count.match',
  level: 'K',
  strand: 'numbers',
  unit: 1,
  title: 'Find the right group',
  vi: 'Tìm nhóm có đúng số lượng',
  icon: '🎯',
  tip: 'Kỹ năng nối số với số lượng. Nếu con chọn sai, cùng đếm lại từng nhóm và hỏi "Which box has 6?".',
  gen(R, tier) {
    const max = tier === 1 ? 5 : 10;
    const n = R.int(tier === 1 ? 1 : 3, max);
    const it = item(R);
    const k = tier === 1 ? 2 : 3;
    const counts = new Set([n]);
    let guard = 0;
    while (counts.size < k && guard++ < 50) {
      const d = tier === 3 ? R.pick([-1, 1, -2, 2]) : R.pick([-3, -2, -1, 1, 2, 3]);
      const c = n + d;
      if (c >= 1 && c <= max + 1) counts.add(c);
    }
    const layout = tier === 3 ? 'scatter' : 'rows';
    const list = [...counts].map((c) => ({
      value: c,
      visual: { type: 'objects', groups: [{ emoji: it.e, count: c }], size: 'sm', layout, seed: c * 17 + n }
    }));
    const word = R.chance(0.5) ? `**${n}**` : `**${numWord(n)}**`;
    return {
      prompt: `Which box has ${word} ${nounFor(n, it)}?`,
      input: 'choice',
      answer: n,
      choices: visualChoices(R, list),
      hint: `Count each box carefully. Which one has ${n}?`,
      explain: `The right box has ${plural(n, it)}.`
    };
  }
};

const countDots = {
  id: 'k.count.dots',
  level: 'K',
  strand: 'numbers',
  unit: 1,
  title: 'Dot patterns',
  vi: 'Nhận biết nhanh số chấm (xúc xắc, domino, khung 10)',
  icon: '🎲',
  tip: 'Mục tiêu là nhìn là biết số (subitising), không đếm từng chấm. Chơi xúc xắc thật với con sẽ rất hiệu quả.',
  gen(R, tier) {
    if (tier === 1) {
      const n = R.int(1, 6);
      return {
        prompt: R.pick(['How many dots are on the dice?', 'Look at the dice. How many dots?']),
        visuals: [{ type: 'dots', n }],
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { min: 1, max: 7, near: [n - 1, n + 1] }),
        hint: 'Look at the shape the dots make. Five dots look like an X!',
        explain: `There ${n === 1 ? 'is 1 dot' : `are ${n} dots`} on the dice.`
      };
    }
    if (tier === 2) {
      const a = R.int(1, 5);
      const b = R.int(0, 5);
      return {
        prompt: 'How many dots are there on the domino **altogether**?',
        visuals: [{ type: 'dots', style: 'domino', a, b }],
        input: 'choice',
        answer: a + b,
        choices: numChoices(R, a + b, { min: 1, max: 11, near: [a, b, a + b + 1] }),
        hint: 'Count the dots on one side, then count on with the other side.',
        explain: `${a} dots and ${b} dots make ${a + b} dots.`
      };
    }
    const a = R.int(3, 10);
    const askEmpty = a < 10 && R.chance(0.4);
    const ans = askEmpty ? 10 - a : a;
    return {
      prompt: askEmpty ? 'A ten frame has 10 boxes. How many boxes are **empty**?' : 'How many counters are in the ten frame?',
      visuals: [{ type: 'tenframe', a }],
      input: 'choice',
      answer: ans,
      choices: numChoices(R, ans, { min: 0, max: 10, near: askEmpty ? [a, ans + 1] : [10 - a, ans - 1] }),
      hint: askEmpty ? 'A full ten frame has 10. Count the empty boxes.' : 'The top row has 5 boxes. Count on from 5!',
      explain: askEmpty ? `${a} boxes are filled, so ${10 - a} are empty. ${a} and ${10 - a} make 10.` : `There are ${a} counters.`
    };
  }
};

// ------------------------------------------------------------------ unit 2: more, fewer, same
const compareGroups = {
  id: 'k.compare.more',
  level: 'K',
  strand: 'numbers',
  unit: 2,
  title: 'More or fewer?',
  vi: 'So sánh nhiều hơn / ít hơn / bằng nhau',
  icon: '⚖️',
  tip: 'Dạy con "ghép đôi" từng hình của hai nhóm (one-to-one matching); nhóm còn thừa là nhóm "more". Phân biệt từ "more" và "fewer".',
  gen(R, tier) {
    const max = tier === 1 ? 5 : 10;
    if (tier >= 2 && R.chance(0.35)) {
      const [x, y] = R.sample(ALL_ITEMS, 2);
      const a = R.int(2, max);
      const b = R.intExcept(2, max, [a]);
      const askMore = R.chance(0.5);
      const ans = (askMore ? a > b : a < b) ? x.e : y.e;
      return {
        prompt: `Are there ${askMore ? '**more**' : '**fewer**'} ${x.many} or ${y.many}?`,
        visuals: [{ type: 'objects', stack: true, groups: [{ emoji: x.e, count: a }, { emoji: y.e, count: b }] }],
        input: 'choice',
        answer: ans,
        choices: [
          { value: x.e, label: `${x.e} ${cap(x.many)}` },
          { value: y.e, label: `${y.e} ${cap(y.many)}` }
        ],
        hint: 'Match them up one to one. Which row has some left over?',
        explain: `There are ${plural(a, x)} and ${plural(b, y)}. There are ${askMore ? 'more' : 'fewer'} ${ans === x.e ? x.many : y.many}.`
      };
    }
    const [p, q] = people(R, 2);
    const it = item(R);
    const a = R.int(1, max);
    let b;
    if (tier === 3 && R.chance(0.3)) b = a;
    else b = R.intExcept(1, max, tier === 1 ? [a, a - 1, a + 1] : [a]);
    const askMore = tier === 1 ? true : R.chance(0.5);
    const allowSame = tier === 3;
    let ans;
    if (a === b) ans = 'Same';
    else ans = (askMore ? a > b : a < b) ? p.name : q.name;
    const choices = fixedChoices([p.name, q.name, ...(allowSame ? ['Same'] : [])]);
    const big = a > b ? p.name : q.name;
    const small = a > b ? q.name : p.name;
    return {
      prompt: `Who has ${askMore ? '**more**' : '**fewer**'} ${it.many}?${allowSame ? ' If they have the same number, tap **Same**.' : ''}`,
      visuals: [{ type: 'objects', stack: true, groups: [{ emoji: it.e, count: a, label: p.name }, { emoji: it.e, count: b, label: q.name }] }],
      input: 'choice',
      answer: ans,
      choices,
      hint: 'Match the pictures one to one. Whose row has some left over?',
      explain:
        a === b
          ? `They both have ${plural(a, it)}. They have the same number.`
          : `${p.name} has ${a} and ${q.name} has ${b}. ${big} has more. ${small} has fewer.`
    };
  }
};

const compareHowMany = {
  id: 'k.compare.howmany',
  level: 'K',
  strand: 'numbers',
  unit: 2,
  title: 'How many more?',
  vi: 'Nhiều hơn bao nhiêu?',
  icon: '➕',
  tip: 'Ghép đôi hai hàng hình rồi đếm phần "thừa ra" — đó là "how many more". Đây là nền móng cho mô hình so sánh (comparison bar model) ở P1.',
  gen(R, tier) {
    const [p, q] = people(R, 2);
    const it = item(R);
    const max = tier === 1 ? 6 : 10;
    const big = R.int(tier === 1 ? 2 : 4, max);
    const small = R.int(Math.max(1, big - (tier === 1 ? 2 : 6)), big - 1);
    const diff = big - small;
    const askFewer = tier === 3 && R.chance(0.5);
    const prompt = askFewer
      ? `${q.name} has ${plural(small, it)}. ${p.name} has ${plural(big, it)}. How many **fewer** ${it.many} does ${q.name} have than ${p.name}?`
      : `${p.name} has ${plural(big, it)}. ${q.name} has ${plural(small, it)}. How many **more** ${it.many} does ${p.name} have than ${q.name}?`;
    return {
      prompt,
      visuals: [{ type: 'objects', stack: true, groups: [{ emoji: it.e, count: big, label: p.name }, { emoji: it.e, count: small, label: q.name }] }],
      input: 'choice',
      answer: diff,
      choices: numChoices(R, diff, { min: 1, max: 12, near: [big, small, diff + 1] }),
      hint: 'Match the two rows one to one. Count the ones with no partner.',
      explain: `Match them up: ${small} pairs, and ${p.name} has ${diff} left over. ${big} − ${small} = ${diff}.`
    };
  }
};

// ------------------------------------------------------------------ unit 3: numbers to 10
const numAfter = {
  id: 'k.num.after',
  level: 'K',
  strand: 'numbers',
  unit: 3,
  title: 'Before, after, between',
  vi: 'Số liền trước, liền sau, ở giữa',
  icon: '↔️',
  tip: 'Dùng tia số: "just after" là bước sang phải 1, "just before" là lùi sang trái 1. Đếm xuôi/ngược với con khi đi cầu thang.',
  gen(R, tier) {
    const max = tier === 3 ? 20 : 10;
    const kind = R.pick(['after', 'before', 'between']);
    let n;
    let ans;
    let prompt;
    let near;
    let seq;
    if (kind === 'after') {
      n = R.int(0, max - 1);
      ans = n + 1;
      prompt = `What number comes **just after** ${n}?`;
      near = [n - 1, n + 2];
      seq = [n, '?'];
    } else if (kind === 'before') {
      n = R.int(1, max);
      ans = n - 1;
      prompt = `What number comes **just before** ${n}?`;
      near = [n + 1, n - 2];
      seq = ['?', n];
    } else {
      n = R.int(0, max - 2);
      ans = n + 1;
      prompt = `What number comes **between** ${n} and ${n + 2}?`;
      near = [n, n + 2, n + 3];
      seq = [n, '?', n + 2];
    }
    const visuals =
      tier === 1
        ? [{ type: 'numberline', min: 0, max: 10, marks: [{ at: kind === 'between' ? n : n, color: 'orange' }] }]
        : tier === 2
          ? [{ type: 'sequence', items: seq }]
          : [];
    return {
      prompt,
      visuals,
      input: 'choice',
      answer: ans,
      choices: numChoices(R, ans, { min: 0, max: max + 1, near }),
      hint: kind === 'before' ? 'Count backwards. Which number do you say just before it?' : 'Count forwards. Which number do you say next?',
      explain:
        kind === 'between'
          ? `${n}, ${ans}, ${n + 2}. The number between ${n} and ${n + 2} is ${ans}.`
          : kind === 'after'
            ? `When we count: ${n}, ${ans}. So ${ans} comes just after ${n}.`
            : `When we count: ${ans}, ${n}. So ${ans} comes just before ${n}.`
    };
  }
};

const numMissing = {
  id: 'k.num.missing',
  level: 'K',
  strand: 'numbers',
  unit: 3,
  title: 'Missing numbers',
  vi: 'Tìm số còn thiếu trong dãy',
  icon: '❓',
  tip: 'Cho con đọc to cả dãy số, khi đến ô "?" con sẽ tự nghe ra số thiếu. Thử cả đếm ngược (count backwards).',
  gen(R, tier) {
    const len = tier === 1 ? 5 : 6;
    const down = tier === 3 && R.chance(0.5);
    const top = tier === 3 ? 20 : 10;
    const start = down ? R.int(len - 1, top) : R.int(tier === 1 ? 0 : 0, top - len + 1);
    const seq = Array.from({ length: len }, (_, i) => (down ? start - i : start + i));
    const idx = R.int(1, len - 1);
    const ans = seq[idx];
    const items = seq.map((v, i) => (i === idx ? '?' : v));
    return {
      prompt: down ? 'We are counting **backwards**. What is the missing number?' : 'What is the missing number?',
      visuals: [{ type: 'sequence', items }],
      input: 'choice',
      answer: ans,
      choices: numChoices(R, ans, { min: 0, max: top + 1, near: [ans + 1, ans - 1, ans + 2] }),
      hint: down ? 'Say the numbers out loud going down: 9, 8, 7 …' : 'Say the numbers out loud. Which number did you skip?',
      explain: `The numbers go ${down ? 'down' : 'up'} by 1: ${seq.join(', ')}. The missing number is ${ans}.`
    };
  }
};

const numGreatest = {
  id: 'k.num.greatest',
  level: 'K',
  strand: 'numbers',
  unit: 3,
  title: 'Greatest and smallest',
  vi: 'Số lớn nhất, bé nhất',
  icon: '🏔️',
  tip: 'Trường dùng từ "greatest" (lớn nhất) và "smallest" (bé nhất). Số nào đếm sau thì lớn hơn.',
  gen(R, tier) {
    const max = tier === 3 ? 20 : 10;
    const k = tier === 1 ? 3 : 4;
    const nums = R.distinctInts(k, tier === 3 ? 5 : tier === 1 ? 1 : 0, max);
    const askG = R.chance(tier === 1 ? 0.7 : 0.55);
    const ans = askG ? Math.max(...nums) : Math.min(...nums);
    const sorted = [...nums].sort((a, b) => a - b);
    if (tier === 1 && R.chance(0.4)) {
      const it = item(R);
      return {
        prompt: askG ? `Which box has the **most** ${it.many}?` : `Which box has the **fewest** ${it.many}?`,
        input: 'choice',
        answer: ans,
        choices: visualChoices(R, nums.map((v) => ({ value: v, visual: { type: 'objects', size: 'sm', groups: [{ emoji: it.e, count: v || 0 }] } }))),
        hint: 'Count each box. Which number is the biggest?',
        explain: `The boxes have ${sorted.join(', ')}. The ${askG ? 'most' : 'fewest'} is ${ans}.`
      };
    }
    return {
      prompt: askG ? 'Look at the number cards. Which number is the **greatest**?' : 'Look at the number cards. Which number is the **smallest**?',
      visuals: [{ type: 'sequence', items: nums }, ...(tier === 1 ? [{ type: 'numberline', min: 0, max: 10 }] : [])],
      input: 'choice',
      answer: ans,
      choices: nums.map((v) => ({ value: v, label: String(v) })),
      hint: askG ? 'The greatest number is the one we count last.' : 'The smallest number is the one we count first.',
      explain: `In order from smallest to greatest: ${sorted.join(', ')}. The ${askG ? 'greatest' : 'smallest'} is ${ans}.`
    };
  }
};

const numWords = {
  id: 'k.num.words',
  level: 'K',
  strand: 'numbers',
  unit: 3,
  title: 'Number words',
  vi: 'Đọc/viết số bằng chữ tiếng Anh',
  icon: '🔤',
  tip: 'P1 yêu cầu đọc và viết số bằng chữ (one, two, … twenty). Cho con chỉ vào chữ và đọc to; chú ý các cặp dễ nhầm như six/seven, thirteen/thirty.',
  gen(R, tier) {
    const [lo, hi] = tier === 1 ? [0, 7] : tier === 2 ? [0, 10] : [11, 20];
    const n = R.int(lo, hi);
    const pool = [];
    for (let d = -3; d <= 3; d++) if (d && n + d >= 0 && n + d <= 20) pool.push(n + d);
    if (R.chance(0.5)) {
      return {
        prompt: `How do we write **${n}** in words?`,
        input: 'choice',
        answer: numWord(n),
        choices: textChoices(R, numWord(n), pool.map(numWord), tier === 1 ? 3 : 4),
        hint: 'Count up to the number and listen to its name.',
        explain: `${n} is written as "${numWord(n)}".`
      };
    }
    return {
      prompt: `Which number is **${numWord(n)}**?`,
      speak: `Which number is ${numWord(n)}?`,
      visuals: [{ type: 'text', text: numWord(n), size: 'lg' }],
      input: 'choice',
      answer: n,
      choices: numChoices(R, n, { min: 0, max: 20, near: pool, count: tier === 1 ? 3 : 4 }),
      hint: 'Read the word slowly. Which number has that name?',
      explain: `"${numWord(n)}" is the number ${n}.`
    };
  }
};

const numOneMore = {
  id: 'k.num.onemore',
  level: 'K',
  strand: 'numbers',
  unit: 3,
  title: '1 more, 1 less',
  vi: 'Thêm 1, bớt 1',
  icon: '☝️',
  tip: '"1 more" là số liền sau, "1 less" là số liền trước. Dùng đồ vật thật: thêm/bớt 1 cái rồi đếm lại.',
  gen(R, tier) {
    const it = item(R);
    const more = R.chance(0.5);
    if (tier === 1) {
      const n = R.int(2, 9);
      const ans = more ? n + 1 : n - 1;
      return {
        prompt: more ? `There are ${plural(n, it)}. **1 more** comes. How many are there now?` : `There are ${plural(n, it)}. **1** goes away. How many are left?`,
        visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: n, cross: more ? 0 : 1 }, ...(more ? [{ emoji: it.e, count: 1 }] : [])], op: more ? '+' : null }],
        input: 'choice',
        answer: ans,
        choices: numChoices(R, ans, { min: 0, max: 11, near: [n, more ? n + 2 : n - 2] }),
        hint: more ? `Start at ${n} and count on 1 more.` : `Start at ${n} and count back 1.`,
        explain: more ? `1 more than ${n} is ${ans}.` : `1 less than ${n} is ${ans}.`
      };
    }
    const max = tier === 2 ? 10 : 20;
    const k = tier === 3 && R.chance(0.35) ? 2 : 1;
    const n = more ? R.int(0, max - k) : R.int(k, max);
    const ans = more ? n + k : n - k;
    return {
      prompt: `What is **${k} ${more ? 'more' : 'less'}** than ${n}?`,
      visuals: tier === 2 ? [{ type: 'numberline', min: 0, max: 10, marks: [{ at: n }] }] : [],
      input: 'choice',
      answer: ans,
      choices: numChoices(R, ans, { min: 0, max: max + 2, near: [n, more ? n - k : n + k] }),
      hint: more ? `Count on ${k} from ${n}.` : `Count back ${k} from ${n}.`,
      explain: `${k} ${more ? 'more' : 'less'} than ${n} is ${ans}. (${n} ${more ? '+' : '−'} ${k} = ${ans})`
    };
  }
};

// ------------------------------------------------------------------ unit 4: shapes
const SHAPE_LABEL = {
  circle: 'circle',
  square: 'square',
  triangle: 'triangle',
  rectangle: 'rectangle',
  oval: 'oval',
  star: 'star',
  heart: 'heart',
  diamond: 'diamond',
  hexagon: 'hexagon',
  pentagon: 'pentagon',
  semicircle: 'half circle'
};
const SHAPE_SETS = {
  1: ['circle', 'square', 'triangle'],
  2: ['circle', 'square', 'triangle', 'rectangle', 'oval', 'star', 'heart'],
  3: ['circle', 'square', 'triangle', 'rectangle', 'oval', 'star', 'heart', 'diamond', 'hexagon', 'pentagon', 'semicircle']
};
const SHAPE_COLORS = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'teal'];
function shapeSpec(R, shape, tier) {
  let rot = 0;
  if (tier === 3 && (shape === 'triangle' || shape === 'semicircle')) rot = R.pick([0, 0, 90, 180, 270, 20]);
  if (tier === 3 && shape === 'rectangle') rot = R.pick([0, 90]);
  return { shape, color: R.pick(SHAPE_COLORS), rot, size: tier === 3 ? R.pick([0.7, 0.85, 1]) : 1 };
}

const shapeName = {
  id: 'k.shape.name',
  level: 'K',
  strand: 'geometry',
  unit: 4,
  title: 'Name the shape',
  vi: 'Gọi tên hình (circle, square, triangle…)',
  icon: '🔺',
  tip: 'Tìm hình quanh nhà: đồng hồ là "circle", cửa sổ là "rectangle". Hình xoay hay đổi màu vẫn là hình đó.',
  gen(R, tier) {
    const set = SHAPE_SETS[tier];
    const target = R.pick(set);
    if (R.chance(0.5)) {
      const others = R.sample(set.filter((s) => s !== target && !(target === 'square' && s === 'diamond') && !(target === 'diamond' && s === 'square')), tier === 1 ? 2 : 3);
      const list = [target, ...others].map((s) => ({ value: s, visual: { type: 'shapes', items: [shapeSpec(R, s, tier)] } }));
      return {
        prompt: `Which shape is a **${SHAPE_LABEL[target]}**?`,
        input: 'choice',
        answer: target,
        choices: visualChoices(R, list),
        hint: shapeHint(target),
        explain: `This is a ${SHAPE_LABEL[target]}. ${shapeHint(target)}`
      };
    }
    const pool = set.filter((s) => s !== target).map((s) => SHAPE_LABEL[s]);
    return {
      prompt: 'What is the name of this shape?',
      visuals: [{ type: 'shapes', items: [{ ...shapeSpec(R, target, tier), size: 1.2 }], px: 120 }],
      input: 'choice',
      answer: SHAPE_LABEL[target],
      choices: textChoices(R, SHAPE_LABEL[target], pool, tier === 1 ? 3 : 4),
      hint: shapeHint(target),
      explain: `It is a ${SHAPE_LABEL[target]}. ${shapeHint(target)}`
    };
  }
};
function shapeHint(s) {
  return {
    circle: 'A circle is round and has no corners.',
    square: 'A square has 4 sides that are all the same length.',
    triangle: 'A triangle has 3 sides and 3 corners.',
    rectangle: 'A rectangle has 4 sides: 2 long sides and 2 short sides.',
    oval: 'An oval is round like an egg, longer than it is tall.',
    star: 'A star has 5 points.',
    heart: 'A heart looks like a love shape ❤.',
    diamond: 'A diamond has 4 sides and stands on one corner.',
    hexagon: 'A hexagon has 6 sides.',
    pentagon: 'A pentagon has 5 sides.',
    semicircle: 'A half circle is a circle cut in half.'
  }[s];
}

const shapeCount = {
  id: 'k.shape.count',
  level: 'K',
  strand: 'geometry',
  unit: 4,
  title: 'Count the shapes',
  vi: 'Đếm số hình cùng loại',
  icon: '🔵',
  tip: 'Nhắc con: dù to/nhỏ, xoay hay khác màu, hình tam giác vẫn là "triangle". Dùng ngón tay đánh dấu hình đã đếm.',
  gen(R, tier) {
    const set = SHAPE_SETS[Math.min(tier + 1, 3)].filter((s) => s !== 'diamond');
    const types = R.sample(set, tier === 1 ? 2 : tier === 2 ? 3 : 4);
    const target = types[0];
    const total = tier === 1 ? R.int(4, 6) : tier === 2 ? R.int(6, 8) : R.int(8, 10);
    const tCount = R.int(1, Math.min(5, total - (types.length - 1)));
    const list = Array(tCount).fill(target);
    while (list.length < total) list.push(R.pick(types.slice(1)));
    const itemsArr = R.shuffle(list).map((s) => shapeSpec(R, s, tier));
    if (tier === 3 && R.chance(0.3)) {
      const four = itemsArr.filter((x) => ['square', 'rectangle'].includes(x.shape)).length;
      if (four > 0 && itemsArr.some((x) => !['square', 'rectangle'].includes(x.shape))) {
        return {
          prompt: 'How many shapes have **4 sides**?',
          visuals: [{ type: 'shapes', items: itemsArr, px: 52 }],
          input: 'choice',
          answer: four,
          choices: numChoices(R, four, { min: 0, max: 10, near: [four + 1, four - 1] }),
          hint: 'Squares and rectangles have 4 sides. Count them.',
          explain: `Squares and rectangles have 4 sides. There ${four === 1 ? 'is 1 shape' : `are ${four} shapes`} with 4 sides.`
        };
      }
    }
    const name = SHAPE_LABEL[target];
    return {
      prompt: `How many **${name}s** are there?`,
      visuals: [{ type: 'shapes', items: itemsArr, px: 52 }],
      input: 'choice',
      answer: tCount,
      choices: numChoices(R, tCount, { min: 1, max: 10, near: [tCount + 1, tCount - 1, total] }),
      hint: `Look for every ${name}, big or small. ${shapeHint(target)}`,
      explain: `There ${tCount === 1 ? `is 1 ${name}` : `are ${tCount} ${name}s`}.`
    };
  }
};

const SIDES = { triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, diamond: 4, octagon: 8 };
const shapeSides = {
  id: 'k.shape.sides',
  level: 'K',
  strand: 'geometry',
  unit: 4,
  title: 'Sides and corners',
  vi: 'Đếm cạnh và góc của hình',
  icon: '📐',
  tip: 'Cho con dùng ngón tay men theo từng cạnh (side) và chạm vào từng góc (corner) để đếm.',
  gen(R, tier) {
    if (tier === 3 && R.chance(0.3)) {
      const target = R.pick(['circle', 'oval']);
      const others = R.sample(['triangle', 'square', 'rectangle', 'pentagon', 'hexagon'], 3);
      const list = [target, ...others].map((s) => ({ value: s, visual: { type: 'shapes', items: [shapeSpec(R, s, 2)] } }));
      return {
        prompt: 'Which shape has **no corners**?',
        input: 'choice',
        answer: target,
        choices: visualChoices(R, list),
        hint: 'A corner is a pointy part where two sides meet.',
        explain: `The ${target} is round, so it has no corners.`
      };
    }
    const pool = tier === 1 ? ['triangle', 'square'] : tier === 2 ? ['triangle', 'square', 'rectangle', 'pentagon'] : ['pentagon', 'hexagon', 'octagon', 'diamond', 'rectangle'];
    const s = R.pick(pool);
    const askCorners = tier > 1 && R.chance(0.4);
    const n = SIDES[s];
    const label = s === 'diamond' ? 'diamond' : s;
    return {
      prompt: `How many **${askCorners ? 'corners' : 'sides'}** does this ${label} have?`,
      visuals: [{ type: 'shapes', items: [{ shape: s, color: R.pick(SHAPE_COLORS), size: 1.2 }], px: 120 }],
      input: 'choice',
      answer: n,
      choices: numChoices(R, n, { min: 2, max: 9, near: [n - 1, n + 1] }),
      hint: askCorners ? 'Touch each pointy corner as you count.' : 'Run your finger along each straight side as you count.',
      explain: `A ${label} has ${n} sides and ${n} corners.`
    };
  }
};

// ------------------------------------------------------------------ unit 5: patterns
const PATTERNS = { 1: ['AB'], 2: ['AAB', 'ABB', 'ABC'], 3: ['AABB', 'ABCC', 'ABAC', 'AABC'] };
function buildPattern(code, len) {
  const out = [];
  for (let i = 0; i < len; i++) out.push(code[i % code.length]);
  return out;
}
const patternNext = {
  id: 'k.pattern.next',
  level: 'K',
  strand: 'geometry',
  unit: 5,
  title: 'What comes next?',
  vi: 'Quy luật lặp lại (AB, AAB, ABC…)',
  icon: '🔁',
  tip: 'Cho con đọc to quy luật thành "nhịp": "apple, banana, apple, banana…". Tìm "nhóm lặp lại" (repeating part) rồi đoán tiếp.',
  gen(R, tier) {
    const code = R.pick(PATTERNS[tier]);
    const letters = [...new Set(code.split(''))];
    const its = R.sample(ALL_ITEMS, letters.length + 1);
    const map = Object.fromEntries(letters.map((l, i) => [l, its[i]]));
    const len = code.length * (tier === 1 ? 3 : 2) + R.int(0, code.length - 1);
    const full = buildPattern(code, len + 1).map((l) => map[l]);
    const middle = tier === 3 && R.chance(0.4);
    const idx = middle ? R.int(Math.max(2, code.length), len - 2) : len;
    const ans = full[idx];
    const shown = full.slice(0, middle ? len : len + 1).map((x, i) => (i === idx ? '?' : x.e));
    const unitNames = code.split('').map((l) => map[l].one);
    const pool = [...letters.map((l) => map[l].e), its[letters.length].e];
    return {
      prompt: middle ? 'Which picture is **missing** in the pattern?' : 'What comes **next** in the pattern?',
      visuals: [{ type: 'sequence', items: shown }],
      input: 'choice',
      answer: ans.e,
      choices: R.shuffle([...new Set(pool)]).map((e) => ({ value: e, label: e })),
      hint: `Say the pattern out loud: ${unitNames.join(', ')}, ${unitNames.join(', ')} …`,
      explain: `The part that repeats is: ${unitNames.join(', ')}. So the ${middle ? 'missing' : 'next'} picture is the ${ans.one}.`
    };
  }
};

const COLOR_WORD = { red: 'red', blue: 'blue', green: 'green', yellow: 'yellow', orange: 'orange', purple: 'purple', pink: 'pink', teal: 'teal' };
const patternShapes = {
  id: 'k.pattern.shapes',
  level: 'K',
  strand: 'geometry',
  unit: 5,
  title: 'Shape and colour patterns',
  vi: 'Quy luật hình & màu sắc',
  icon: '🟥',
  tip: 'Quy luật có thể theo màu, theo hình, hoặc theo kích thước. Hỏi con: "What is changing? The colour or the shape?"',
  gen(R, tier) {
    const kind = tier === 1 ? 'color' : tier === 2 ? R.pick(['shape', 'color']) : R.pick(['both', 'size', 'shape']);
    const code = tier === 1 ? 'AB' : R.pick(tier === 2 ? ['AB', 'ABC', 'AAB', 'ABB'] : ['ABC', 'AABB', 'ABB', 'AAB']);
    const letters = [...new Set(code.split(''))];
    const baseShape = R.pick(['circle', 'square', 'triangle', 'star', 'heart']);
    const baseColor = R.pick(SHAPE_COLORS);
    const colors = R.sample(SHAPE_COLORS, letters.length + 1);
    const shapesL = R.sample(['circle', 'square', 'triangle', 'star', 'heart', 'diamond'], letters.length + 1);
    const sizes = [1.15, 0.6, 0.85, 0.45];
    const specFor = (i) => {
      if (kind === 'color') return { shape: baseShape, color: colors[i] };
      if (kind === 'shape') return { shape: shapesL[i], color: baseColor };
      if (kind === 'size') return { shape: baseShape, color: baseColor, size: sizes[i] };
      return { shape: shapesL[i], color: colors[i] };
    };
    const map = Object.fromEntries(letters.map((l, i) => [l, specFor(i)]));
    const len = code.length * 2 + R.int(0, code.length - 1);
    const full = buildPattern(code, len + 1).map((l) => map[l]);
    const ans = full[len];
    const key = (s) => `${s.shape}-${s.color}-${s.size || 1}`;
    const opts = [...letters.map((l, i) => specFor(i)), specFor(letters.length)];
    const uniq = [];
    for (const o of opts) if (!uniq.some((u) => key(u) === key(o))) uniq.push(o);
    const describe = (s) => (kind === 'color' ? COLOR_WORD[s.color] : kind === 'size' ? (s.size > 1 ? 'big' : s.size < 0.5 ? 'tiny' : s.size < 0.7 ? 'small' : 'middle-sized') : kind === 'shape' ? s.shape : `${COLOR_WORD[s.color]} ${s.shape}`);
    return {
      prompt: 'What comes **next** in the pattern?',
      visuals: [{ type: 'sequence', items: full.slice(0, len) }],
      input: 'choice',
      answer: key(ans),
      choices: R.shuffle(uniq).map((o) => ({ value: key(o), visual: { type: 'shapes', items: [o] } })),
      hint: `Look at what changes each time: the ${kind === 'both' ? 'shape and colour' : kind === 'color' ? 'colour' : kind}. Say it out loud!`,
      explain: `The pattern repeats: ${code.split('').map((l) => describe(map[l])).join(', ')}. Next comes ${describe(ans)}.`
    };
  }
};

// ------------------------------------------------------------------ units 6–7: adding / taking away
const addPictures = {
  id: 'k.add.pictures',
  level: 'K',
  strand: 'addsub',
  unit: 6,
  title: 'Add with pictures',
  vi: 'Cộng bằng hình ảnh',
  icon: '🧮',
  tip: 'Khuyến khích "đếm tiếp" (count on) từ số lớn hơn thay vì đếm lại từ 1: "5… 6, 7, 8".',
  gen(R, tier) {
    const max = tier === 1 ? 5 : 10;
    const a = R.int(1, max - 1);
    const b = R.int(1, max - a);
    const it = item(R);
    const total = a + b;
    if (tier === 3 && R.chance(0.5)) {
      return {
        prompt: `${a} + ${b} = ?`,
        visuals: [{ type: 'tenframe', a, b }],
        input: 'choice',
        answer: total,
        choices: numChoices(R, total, { min: 1, max: 11, near: [total + 1, total - 1, Math.abs(a - b)] }),
        hint: `There are ${a} red counters. Count on the ${b} blue ones.`,
        explain: `${a} and ${b} make ${total}. ${a} + ${b} = ${total}.`
      };
    }
    const it2 = R.chance(0.3) ? R.pick(ALL_ITEMS.filter((x) => x.e !== it.e)) : it;
    const same = it2 === it;
    const prompt = same
      ? R.pick([`How many ${it.many} are there **altogether**?`, `${a} ${nounFor(a, it)} and ${b} more. How many ${it.many} **in all**?`, `Add the two groups. How many ${it.many} are there?`])
      : `How many things are there **altogether**?`;
    return {
      prompt,
      visuals: [{ type: 'objects', op: '+', groups: [{ emoji: it.e, count: a }, { emoji: it2.e, count: b }] }],
      input: 'choice',
      answer: total,
      choices: numChoices(R, total, { min: 1, max: 11, near: [total + 1, total - 1, a, b] }),
      hint: `Start with ${Math.max(a, b)} and count on ${Math.min(a, b)} more.`,
      explain: `${a} and ${b} make ${total}. ${a} + ${b} = ${total}.`
    };
  }
};

const ADD_STORIES = [
  (p, it, a, b) => `${p.name} has ${plural(a, it)}. ${p.His} friend gives ${p.him} ${b} more. How many ${it.many} does ${p.name} have now?`,
  (p, it, a, b) => `There are ${plural(a, it)} on the table. Mum puts ${b} more on the table. How many ${it.many} are on the table now?`,
  (p, it, a, b) => `${p.name} has ${a} red ${nounFor(a, it)} and ${b} blue ${nounFor(b, it)}. How many ${it.many} does ${p.he} have **altogether**?`,
  (p, it, a, b) => `${p.name} finds ${plural(a, it)} in the morning and ${plural(b, it)} in the afternoon. How many ${it.many} does ${p.he} find **in all**?`
];
const ANIMAL_STORIES = [
  (an, a, b) => `${cap(plural(a, an))} ${a === 1 ? 'is' : 'are'} in the pond. ${b} more ${nounFor(b, an)} come${b === 1 ? 's' : ''} along. How many ${an.many} are there now?`,
  (an, a, b) => `${cap(plural(a, an))} ${a === 1 ? 'is' : 'are'} playing. Then ${b} more ${nounFor(b, an)} join${b === 1 ? 's' : ''} in. How many ${an.many} are playing now?`
];
const addStory = {
  id: 'k.add.story',
  level: 'K',
  strand: 'addsub',
  unit: 6,
  title: 'Adding stories',
  vi: 'Bài toán có lời văn: phép cộng',
  icon: '📖',
  tip: 'Đọc chậm câu chuyện, hỏi con: "Có thêm vào hay bớt đi?" (more joined → add). Cho con kể lại câu chuyện bằng lời của mình.',
  gen(R, tier) {
    const max = tier === 1 ? 5 : 10;
    const a = R.int(1, max - 1);
    const b = R.int(1, max - a);
    const total = a + b;
    let prompt;
    let it;
    if (R.chance(0.35)) {
      it = R.pick(ITEMS.animals);
      prompt = R.pick(ANIMAL_STORIES)(it, a, b);
    } else {
      it = item(R, R.pick(['food', 'toys', 'school']));
      prompt = R.pick(ADD_STORIES)(people(R, 1)[0], it, a, b);
    }
    const visuals = tier === 3 ? [] : [{ type: 'objects', op: '+', groups: [{ emoji: it.e, count: a }, { emoji: it.e, count: b }] }];
    return {
      prompt,
      visuals,
      input: 'choice',
      answer: total,
      choices: numChoices(R, total, { min: 1, max: 11, near: [total + 1, total - 1, Math.abs(a - b)] }),
      hint: `Some more came, so we add. Start at ${a} and count on ${b}.`,
      explain: `${a} + ${b} = ${total}. There are ${plural(total, it)} now.`
    };
  }
};

const subPictures = {
  id: 'k.sub.pictures',
  level: 'K',
  strand: 'addsub',
  unit: 7,
  title: 'Take away with pictures',
  vi: 'Trừ bằng hình ảnh (gạch bớt)',
  icon: '✖️',
  tip: 'Cho con dùng đồ vật thật: lấy ra rồi đếm phần "còn lại" (left). Gạch chéo hình bị bớt đi trên giấy cũng rất tốt.',
  gen(R, tier) {
    const max = tier === 1 ? 5 : 10;
    const total = R.int(2, max);
    const gone = R.int(1, total - 1);
    const left = total - gone;
    const it = item(R);
    if (tier === 3 && R.chance(0.5)) {
      return {
        prompt: `${total} − ${gone} = ?`,
        visuals: [{ type: 'tenframe', a: total, cross: gone }],
        input: 'choice',
        answer: left,
        choices: numChoices(R, left, { min: 0, max: 10, near: [left + 1, left - 1, total + gone > 10 ? total : total + gone] }),
        hint: `${gone} counters are crossed out. Count the ones that are left.`,
        explain: `${total} take away ${gone} leaves ${left}. ${total} − ${gone} = ${left}.`
      };
    }
    const prompt = R.pick([
      `There are ${plural(total, it)}. ${gone} ${gone === 1 ? 'is' : 'are'} taken away. How many ${it.many} are **left**?`,
      `Cross out ${gone}. How many ${it.many} are **left**?`,
      `${total} ${nounFor(total, it)}, take away ${gone}. How many are left?`
    ]);
    return {
      prompt,
      visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: total, cross: gone }] }],
      input: 'choice',
      answer: left,
      choices: numChoices(R, left, { min: 0, max: 11, near: [left + 1, left - 1, gone] }),
      hint: 'Count only the pictures that are NOT crossed out.',
      explain: `${total} take away ${gone} leaves ${left}. ${total} − ${gone} = ${left}.`
    };
  }
};

const SUB_STORIES = [
  (p, it, t, g) => `${p.name} has ${plural(t, it)}. ${p.He} gives ${g} to ${p.his} sister. How many ${it.many} does ${p.name} have **left**?`,
  (p, it, t, g) => `There are ${plural(t, it)} on a plate. ${p.name} eats ${g}. How many ${it.many} are **left**?`,
  (p, it, t, g) => `${p.name} had ${plural(t, it)}. ${p.He} lost ${g}. How many ${it.many} does ${p.he} have now?`
];
const ANIMAL_SUB = [
  (an, t, g) => `${cap(plural(t, an))} ${t === 1 ? 'is' : 'are'} in the garden. ${g} ${nounFor(g, an)} ${g === 1 ? 'goes' : 'go'} away. How many ${an.many} are **left**?`,
  (an, t, g) => `${cap(plural(t, an))} ${t === 1 ? 'is' : 'are'} at the pond. ${g} ${nounFor(g, an)} ${g === 1 ? 'runs' : 'run'} off. How many ${an.many} are still at the pond?`
];
const subStory = {
  id: 'k.sub.story',
  level: 'K',
  strand: 'addsub',
  unit: 7,
  title: 'Taking away stories',
  vi: 'Bài toán có lời văn: phép trừ',
  icon: '📕',
  tip: 'Các từ "left", "gave away", "ate", "flew away" thường là bớt đi. Nhưng hãy để con HÌNH DUNG câu chuyện thay vì chỉ bắt từ khóa.',
  gen(R, tier) {
    const max = tier === 1 ? 5 : 10;
    const total = R.int(2, max);
    const gone = R.int(1, total - 1);
    const left = total - gone;
    let it;
    let prompt;
    if (R.chance(0.4)) {
      it = R.pick(ITEMS.animals);
      prompt = R.pick(ANIMAL_SUB)(it, total, gone);
    } else {
      it = item(R, R.pick(['food', 'toys']));
      prompt = R.pick(SUB_STORIES)(people(R, 1)[0], it, total, gone);
    }
    const visuals = tier === 3 ? [] : [{ type: 'objects', groups: [{ emoji: it.e, count: total, cross: gone }] }];
    return {
      prompt,
      visuals,
      input: 'choice',
      answer: left,
      choices: numChoices(R, left, { min: 0, max: 11, near: [total + gone > 10 ? left + 2 : total + gone, left + 1, gone] }),
      hint: `Start with ${total}. Take away ${gone}. Count back or cross them out.`,
      explain: `${total} − ${gone} = ${left}. ${cap(plural(left, it))} ${left === 1 ? 'is' : 'are'} left.`
    };
  }
};

// ------------------------------------------------------------------ unit 8: numbers to 20
const countTo20 = {
  id: 'k.count.to20',
  level: 'K',
  strand: 'numbers',
  unit: 8,
  title: 'Count to 20',
  vi: 'Đếm đến 20 (gom nhóm 10)',
  icon: '🔟',
  tip: 'Dạy con gom 10 trước rồi đếm tiếp: "10, 11, 12…". Khung 10 (ten frame) giúp con thấy ngay 1 khung đầy = 10.',
  gen(R, tier) {
    const n = tier === 1 ? R.int(11, 14) : R.int(11, 20);
    const it = item(R);
    let visuals;
    if ((tier === 2 && R.chance(0.5)) || (tier === 1 && R.chance(0.5))) visuals = [{ type: 'tenframe', a: n }];
    else visuals = [{ type: 'objects', groups: [{ emoji: it.e, count: n }], perRow: tier === 3 ? 4 : R.pick([5, 10]), layout: tier === 3 && R.chance(0.5) ? 'scatter' : 'rows', seed: seedOf(R) }];
    const isFrame = visuals[0].type === 'tenframe';
    return {
      prompt: isFrame ? 'How many counters are there?' : `How many ${it.many} are there?`,
      visuals,
      input: 'choice',
      answer: n,
      choices: numChoices(R, n, { min: 10, max: 21, near: [n - 1, n + 1, n - 10 + 10 === n ? n + 10 : n] }),
      hint: isFrame ? 'One full ten frame is 10. Count on from 10.' : 'Count 10 first, then count on.',
      explain: `${n} is 10 and ${n - 10}. There are ${n}.`
    };
  }
};

const numTeens = {
  id: 'k.num.teens',
  level: 'K',
  strand: 'numbers',
  unit: 8,
  title: '10 and some more',
  vi: 'Số từ 11–20 là 10 và mấy',
  icon: '🧱',
  tip: 'Số 11–19 = "10 and some more". Ví dụ 14 = 10 và 4. Đây là nền tảng của giá trị hàng (tens & ones) ở P1.',
  gen(R, tier) {
    const k = R.int(1, 9);
    const n = 10 + k;
    if (tier === 1 && R.chance(0.5)) {
      const it = item(R);
      return {
        prompt: `There are 10 ${it.many} in the box and ${k} more outside. How many ${it.many} are there altogether?`,
        visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: 10, label: '10 in the box', perRow: 5 }, { emoji: it.e, count: k, label: `${k} more`, box: false }] }],
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { min: 1, max: 20, near: [k, n + 1, n - 1] }),
        hint: 'Start at 10 and count on the ones outside.',
        explain: `10 and ${k} make ${n}.`
      };
    }
    if (tier === 1) {
      return {
        prompt: `10 and ${k} make **?**`,
        visuals: [{ type: 'tenframe', a: 10, b: k }],
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { min: 1, max: 20, near: [k, n + 1, n - 1] }),
        hint: 'One full ten frame is 10. Count on the blue ones: 11, 12 …',
        explain: `10 and ${k} make ${n}.`
      };
    }
    if (tier === 2) {
      const askPart = R.chance(0.5);
      return {
        prompt: askPart ? `${n} is 10 and **?**` : `10 and ${k} make **?**`,
        visuals: [{ type: 'bond', whole: askPart ? n : '?', parts: [10, askPart ? '?' : k] }],
        input: 'choice',
        answer: askPart ? k : n,
        choices: askPart ? numChoices(R, k, { min: 0, max: 10, near: [k + 1, k - 1, n] }) : numChoices(R, n, { min: 10, max: 20, near: [n + 1, n - 1] }),
        hint: `Think of ${n} as one ten and some ones.`,
        explain: `${n} = 10 + ${k}.`
      };
    }
    const it = item(R);
    return {
      prompt: `${cap(it.many)} come in packs of 10. Mum buys 1 pack and ${k} loose ${nounFor(k, it)}. How many ${it.many} does she buy?`,
      visuals: [{ type: 'objects', groups: [{ emoji: it.e, count: 10, label: 'pack of 10', perRow: 5 }, { emoji: it.e, count: k, label: 'loose', box: false }] }],
      input: 'choice',
      answer: n,
      choices: numChoices(R, n, { min: 1, max: 20, near: [k + 1, n + 1, n - 1] }),
      hint: 'A pack is 10. Count on the loose ones.',
      explain: `10 and ${k} make ${n}.`
    };
  }
};

// ------------------------------------------------------------------ unit 9: measurement words
const LENGTH_THINGS = [
  { one: 'ribbon', many: 'ribbons' },
  { one: 'pencil', many: 'pencils' },
  { one: 'snake', many: 'snakes' },
  { one: 'rope', many: 'ropes' },
  { one: 'train', many: 'trains' },
  { one: 'crayon', many: 'crayons' }
];
const measureLength = {
  id: 'k.measure.length',
  level: 'K',
  strand: 'measure',
  unit: 9,
  title: 'Long and short, tall',
  vi: 'Dài/ngắn, cao/thấp',
  icon: '📏',
  tip: 'Khi so độ dài phải đặt thẳng hàng một đầu (line up the ends). Từ vựng: long/longer/longest, short/shorter/shortest, tall/taller/tallest.',
  gen(R, tier) {
    const k = tier === 1 ? 2 : tier === 2 ? 3 : 4;
    const labels = ['A', 'B', 'C', 'D'].slice(0, k);
    const lens = R.distinctInts(k, tier === 3 ? 4 : 2, tier === 3 ? 9 : 10);
    if (tier === 1) {
      lens[0] = R.int(2, 4);
      lens[1] = lens[0] + R.int(3, 5);
      if (R.chance(0.5)) lens.reverse();
    }
    const colors = R.sample(['red', 'blue', 'green', 'orange', 'purple', 'pink', 'teal', 'yellow'], k);
    const vertical = R.chance(0.4);
    const thing = R.pick(LENGTH_THINGS);
    const wantBig = R.chance(0.5);
    const idx = lens.indexOf(wantBig ? Math.max(...lens) : Math.min(...lens));
    const sup = k === 2;
    const word = vertical ? (wantBig ? (sup ? 'taller' : 'tallest') : sup ? 'shorter' : 'shortest') : wantBig ? (sup ? 'longer' : 'longest') : sup ? 'shorter' : 'shortest';
    const prompt = vertical ? `Which tower is the **${word}**?` : `Which ${thing.one} is the **${word}**?`;
    return {
      prompt,
      visuals: [{ type: 'lengths', vertical, items: labels.map((l, i) => ({ label: l, len: lens[i], color: colors[i] })) }],
      input: 'choice',
      answer: labels[idx],
      choices: fixedChoices(labels),
      hint: vertical ? 'All the towers start from the floor. Look at the tops.' : 'All the ends on the left are lined up. Look at the right ends.',
      explain: `${labels[idx]} is the ${word}.`
    };
  }
};

const HEAVY_PAIRS = [
  ['🐘 elephant', '🐭 mouse'], ['🚗 car', '🚲 bicycle'], ['🍉 watermelon', '🍇 grape'], ['🪨 rock', '🍃 leaf'],
  ['🐄 cow', '🐔 hen'], ['📚 pile of books', '🪶 feather'], ['🎃 pumpkin', '🍓 strawberry'], ['🐋 whale', '🐟 fish'],
  ['🏠 house', '⛺ tent'], ['🚌 bus', '🛴 scooter'], ['🐻 bear', '🐿️ squirrel'], ['🧳 suitcase', '🎈 balloon']
];
const BIG_PAIRS = [
  ['🦒 giraffe', '🐜 ant'], ['🌳 tree', '🌷 flower'], ['🐋 whale', '🐠 fish'], ['🚢 ship', '🛶 canoe'],
  ['☀️ sun', '⭐ star sticker'], ['🏢 building', '🏠 house'], ['🐘 elephant', '🐶 dog']
];
const measureSize = {
  id: 'k.measure.size',
  level: 'K',
  strand: 'measure',
  unit: 9,
  title: 'Big, small, heavy, light',
  vi: 'To/nhỏ, nặng/nhẹ',
  icon: '🐘',
  tip: 'Cho con cầm 2 đồ vật thật, mỗi tay một cái để cảm nhận "heavier/lighter". Từ so sánh: bigger, biggest, smaller, smallest.',
  gen(R, tier) {
    const mode = R.pick(['size-shapes', 'heavy', tier > 1 ? 'big' : 'heavy']);
    if (mode === 'size-shapes') {
      const k = tier === 1 ? 2 : tier === 2 ? 3 : 4;
      const labels = ['A', 'B', 'C', 'D'].slice(0, k);
      const pool = tier === 3 ? [0.45, 0.6, 0.75, 0.9, 1.1] : [0.4, 0.75, 1.15];
      const sizes = R.sample(pool, k);
      const shape = R.pick(['circle', 'star', 'heart', 'square', 'triangle']);
      const color = R.pick(SHAPE_COLORS);
      const wantBig = R.chance(0.5);
      const idx = sizes.indexOf(wantBig ? Math.max(...sizes) : Math.min(...sizes));
      const word = k === 2 ? (wantBig ? 'bigger' : 'smaller') : wantBig ? 'biggest' : 'smallest';
      return {
        prompt: `Which ${SHAPE_LABEL[shape]} is the **${word}**?`,
        visuals: [{ type: 'shapes', items: sizes.map((s) => ({ shape, color, size: s })), labels, px: 84 }],
        input: 'choice',
        answer: labels[idx],
        choices: fixedChoices(labels),
        hint: wantBig ? 'Which one takes up the most space?' : 'Which one takes up the least space?',
        explain: `${shape === 'circle' ? 'Circle' : cap(SHAPE_LABEL[shape])} ${labels[idx]} is the ${word}.`
      };
    }
    const pairs = mode === 'heavy' ? HEAVY_PAIRS : BIG_PAIRS;
    const [heavy, light] = R.pick(pairs);
    const wantHeavy = R.chance(0.5);
    const word = mode === 'heavy' ? (wantHeavy ? 'heavier' : 'lighter') : wantHeavy ? 'bigger' : 'smaller';
    const ans = wantHeavy ? heavy : light;
    return {
      prompt: `Which is **${word}**?`,
      input: 'choice',
      answer: ans,
      choices: R.shuffle([heavy, light]).map((v) => ({ value: v, label: v })),
      hint: mode === 'heavy' ? 'Imagine holding both. Which one would be hard to lift?' : 'Imagine them side by side. Which one takes more space?',
      explain: `A ${heavy.split(' ').slice(1).join(' ')} is ${mode === 'heavy' ? 'heavier' : 'bigger'} than a ${light.split(' ').slice(1).join(' ')}. The answer is ${ans}.`
    };
  }
};

// ------------------------------------------------------------------ unit 10: positions
const positionGrid = {
  id: 'k.position.grid',
  level: 'K',
  strand: 'geometry',
  unit: 10,
  title: 'Above, below, left, right',
  vi: 'Vị trí: trên, dưới, trái, phải',
  icon: '🧭',
  tip: 'Dùng đồ chơi trên kệ để chơi "What is above the teddy bear?". Bên trái/phải tính theo người nhìn. Từ vựng: above, below, left, right, between, next to.',
  gen(R, tier) {
    const dirs = tier === 1 ? ['above', 'below'] : tier === 2 ? ['above', 'below', 'left of', 'right of'] : ['left of', 'right of', 'between', 'above', 'below'];
    const dir = R.pick(dirs);
    const pool = R.sample([...ITEMS.animals, ...ITEMS.toys, ...ITEMS.food].filter((x) => x.e.length <= 2), 9);
    const rows = 3;
    const cols = 3;
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ r, c, it: pool[r * cols + c] });
    const at = (r, c) => cells.find((x) => x.r === r && x.c === c);
    let ref;
    let ans;
    let ref2;
    if (dir === 'above') {
      ref = at(R.int(1, 2), R.int(0, 2));
      ans = at(ref.r - 1, ref.c);
    } else if (dir === 'below') {
      ref = at(R.int(0, 1), R.int(0, 2));
      ans = at(ref.r + 1, ref.c);
    } else if (dir === 'left of') {
      ref = at(R.int(0, 2), R.int(1, 2));
      ans = at(ref.r, ref.c - 1);
    } else if (dir === 'right of') {
      ref = at(R.int(0, 2), R.int(0, 1));
      ans = at(ref.r, ref.c + 1);
    } else {
      const vertical = R.chance(0.5);
      const line = R.int(0, 2);
      ans = vertical ? at(1, line) : at(line, 1);
      ref = vertical ? at(0, line) : at(line, 0);
      ref2 = vertical ? at(2, line) : at(line, 2);
    }
    const prompt =
      dir === 'between'
        ? `What is **between** the ${ref.it.one} and the ${ref2.it.one}?`
        : `What is **${dir === 'left of' ? 'to the left of' : dir === 'right of' ? 'to the right of' : dir}** the ${ref.it.one}?`;
    const neighbours = cells.filter((x) => x !== ans && x !== ref && x !== ref2);
    const opts = [ans, ...R.sample(neighbours, 3)];
    return {
      prompt,
      visuals: [{ type: 'grid', rows, cols, cells: cells.map((x) => ({ r: x.r, c: x.c, e: x.it.e })) }],
      input: 'choice',
      answer: ans.it.e,
      choices: R.shuffle(opts).map((x) => ({ value: x.it.e, label: `${x.it.e} ${x.it.one}` })),
      hint: dir.includes('left') || dir.includes('right') ? 'Left is the side of the hand you hold up when you make an L with your thumb and finger.' : `Find the ${ref.it.one} first. Then look ${dir === 'between' ? 'in the middle' : dir === 'above' ? 'up' : 'down'}.`,
      explain: `The ${ans.it.one} is ${dir === 'between' ? `between the ${ref.it.one} and the ${ref2.it.one}` : `${dir === 'left of' ? 'to the left of' : dir === 'right of' ? 'to the right of' : dir} the ${ref.it.one}`}.`
    };
  }
};

// ------------------------------------------------------------------ unit 11: sorting
const CATS = {
  fruits: [['🍎', 'apple'], ['🍌', 'banana'], ['🍇', 'grapes'], ['🍓', 'strawberry'], ['🍊', 'orange'], ['🍐', 'pear'], ['🍉', 'watermelon']],
  vegetables: [['🥕', 'carrot'], ['🥦', 'broccoli'], ['🌽', 'corn'], ['🍆', 'brinjal'], ['🥔', 'potato'], ['🥒', 'cucumber']],
  animals: [['🐶', 'dog'], ['🐱', 'cat'], ['🐰', 'rabbit'], ['🐵', 'monkey'], ['🐯', 'tiger'], ['🐮', 'cow']],
  vehicles: [['🚗', 'car'], ['🚌', 'bus'], ['🚲', 'bicycle'], ['✈️', 'aeroplane'], ['🚂', 'train'], ['⛵', 'boat']],
  clothes: [['👕', 'T-shirt'], ['🧢', 'cap'], ['👟', 'shoe'], ['🧦', 'socks'], ['👗', 'dress']],
  sea: [['🐟', 'fish'], ['🐙', 'octopus'], ['🦀', 'crab'], ['🐬', 'dolphin'], ['🐳', 'whale']],
  school: [['✏️', 'pencil'], ['📏', 'ruler'], ['📘', 'book'], ['🖍️', 'crayon'], ['🎒', 'school bag']]
};
const FAR = [['fruits', 'vehicles'], ['animals', 'clothes'], ['vehicles', 'fruits'], ['school', 'animals'], ['clothes', 'sea'], ['animals', 'school']];
const NEAR = [['fruits', 'vegetables'], ['vegetables', 'fruits'], ['sea', 'animals'], ['animals', 'sea'], ['school', 'clothes']];
const sortOdd = {
  id: 'k.sort.odd',
  level: 'K',
  strand: 'geometry',
  unit: 11,
  title: 'Odd one out',
  vi: 'Tìm vật không cùng nhóm (phân loại)',
  icon: '🧐',
  tip: 'Sau khi con chọn, hỏi "Why?" để con giải thích nhóm chung (They are all fruits). Kỹ năng phân loại là nền tảng của tư duy logic.',
  gen(R, tier) {
    if (tier === 3 && R.chance(0.5)) {
      const fourSided = R.sample(['square', 'rectangle', 'diamond', 'trapezium'], 3);
      const odd = R.pick(['triangle', 'circle', 'pentagon', 'hexagon']);
      const color = R.pick(SHAPE_COLORS);
      const list = [...fourSided, odd].map((s) => ({ value: s, visual: { type: 'shapes', items: [{ shape: s, color }] } }));
      return {
        prompt: 'Which shape does **not** belong?',
        input: 'choice',
        answer: odd,
        choices: visualChoices(R, list),
        hint: 'Count the sides of each shape.',
        explain: `The other shapes all have 4 sides. The ${odd} does not, so it does not belong.`
      };
    }
    if (tier === 2 && R.chance(0.4)) {
      const shape = R.pick(['circle', 'square', 'triangle', 'star', 'heart']);
      const [c1, c2] = R.sample(SHAPE_COLORS, 2);
      const list = [0, 1, 2].map((i) => ({ value: `same${i}`, visual: { type: 'shapes', items: [{ shape, color: c1 }] } }));
      list.push({ value: 'odd', visual: { type: 'shapes', items: [{ shape, color: c2 }] } });
      return {
        prompt: 'Which one is **different**?',
        input: 'choice',
        answer: 'odd',
        choices: visualChoices(R, list),
        hint: 'Look at the colours.',
        explain: `Three of them are ${c1}. The ${c2} one is different.`
      };
    }
    const [catA, catB] = R.pick(tier === 1 ? FAR : R.chance(0.5) ? NEAR : FAR);
    const same = R.sample(CATS[catA], 3);
    const odd = R.pick(CATS[catB]);
    const opts = R.shuffle([...same, odd]);
    return {
      prompt: 'Which one does **not** belong?',
      input: 'choice',
      answer: odd[0],
      choices: opts.map(([e, n]) => ({ value: e, label: `${e} ${n}` })),
      hint: `Three of them belong to the same group. What group is it?`,
      explain: `The ${same.map((x) => x[1]).join(', ')} are all ${catA === 'sea' ? 'sea animals' : catA === 'school' ? 'school things' : catA}. The ${odd[1]} is not, so it does not belong.`
    };
  }
};

// ------------------------------------------------------------------ unit 12: coins & days
const COINS = [5, 10, 20, 50, 100];
const coinName = (c) => (c === 100 ? '$1' : `${c}¢`);
const moneyCoins = {
  id: 'k.money.coins',
  level: 'K',
  strand: 'money',
  unit: 12,
  title: 'Singapore coins',
  vi: 'Nhận biết đồng xu Singapore',
  icon: '🪙',
  tip: 'Cho con cầm và phân loại xu thật: 5¢, 10¢, 20¢, 50¢, $1. Xu to hơn không phải lúc nào cũng giá trị hơn (5¢ màu vàng!).',
  gen(R, tier) {
    if (tier >= 2 && R.chance(0.35)) {
      const a = R.pick([5, 10, 20]);
      const b = R.pick(tier === 2 ? [5, 10] : [5, 10, 20]);
      const t = a + b;
      return {
        prompt: 'How much money is there **altogether**?',
        visuals: [{ type: 'money', items: [{ c: a }, { c: b }] }],
        input: 'choice',
        answer: `${t}¢`,
        choices: textChoices(R, `${t}¢`, [`${t + 5}¢`, `${t - 5}¢`, `${a}¢`, `${t + 10}¢`].filter((x) => x !== `${t}¢` && parseInt(x, 10) > 0), 4),
        hint: `Start with ${Math.max(a, b)}¢ and count on ${Math.min(a, b)}¢.`,
        explain: `${a}¢ and ${b}¢ make ${t}¢.`
      };
    }
    const mode = tier === 3 ? R.pick(['most', 'name', 'which']) : R.pick(['name', 'which']);
    if (mode === 'most') {
      const set = R.sample(COINS, 3);
      const best = Math.max(...set);
      const least = R.chance(0.4);
      const ans = least ? Math.min(...set) : best;
      return {
        prompt: `Which coin is worth the **${least ? 'least' : 'most'}**?`,
        input: 'choice',
        answer: ans,
        choices: visualChoices(R, set.map((c) => ({ value: c, visual: { type: 'money', items: [{ c }] } }))),
        hint: 'Read the number on each coin. 100¢ is the same as $1.',
        explain: `${coinName(ans)} is worth the ${least ? 'least' : 'most'}.`
      };
    }
    const target = R.pick(tier === 1 ? [5, 10, 20, 50] : COINS);
    if (mode === 'which') {
      const set = [target, ...R.sample(COINS.filter((c) => c !== target), tier === 1 ? 2 : 3)];
      return {
        prompt: `Which coin is **${coinName(target)}**?`,
        input: 'choice',
        answer: target,
        choices: visualChoices(R, set.map((c) => ({ value: c, visual: { type: 'money', items: [{ c }] } }))),
        hint: 'Look at the number written on each coin.',
        explain: `This coin is ${coinName(target)}.`
      };
    }
    return {
      prompt: 'How much is this coin worth?',
      visuals: [{ type: 'money', items: [{ c: target }] }],
      input: 'choice',
      answer: coinName(target),
      choices: textChoices(R, coinName(target), COINS.filter((c) => c !== target).map(coinName), tier === 1 ? 3 : 4),
      hint: 'Read the number on the coin. ¢ means cents.',
      explain: `It is a ${coinName(target)} coin${target === 100 ? ' (one dollar = 100 cents)' : ''}.`
    };
  }
};

const DAY_NIGHT = [
  ['When do we eat **breakfast**?', 'In the morning', ['At night', 'In the afternoon']],
  ['When do we see the **moon and stars**?', 'At night', ['In the morning', 'At noon']],
  ['When do we go to **bed**?', 'At night', ['In the morning', 'At lunchtime']],
  ['When does the **sun rise**?', 'In the morning', ['At night', 'In the evening']],
  ['When do we eat **dinner**?', 'In the evening', ['In the morning', 'At breakfast time']]
];
const timeDays = {
  id: 'k.time.days',
  level: 'K',
  strand: 'time',
  unit: 12,
  title: 'Days of the week',
  vi: 'Các ngày trong tuần, sáng/tối',
  icon: '📅',
  tip: 'Hát bài "Days of the week" và hỏi con mỗi sáng: "Today is Monday. What day is tomorrow?". Một tuần có 7 ngày.',
  gen(R, tier) {
    if (tier === 1 && R.chance(0.35)) {
      const [q, a, wrong] = R.pick(DAY_NIGHT);
      return {
        prompt: q,
        input: 'choice',
        answer: a,
        choices: textChoices(R, a, wrong, 3),
        hint: 'Think about your own day. What do you do when you wake up?',
        explain: `${a}.`
      };
    }
    const i = R.int(0, 6);
    const forms = tier === 1 ? ['after', 'before'] : tier === 2 ? ['after', 'before', 'tomorrow', 'yesterday'] : ['tomorrow', 'yesterday', 'twoafter', 'week'];
    const form = R.pick(forms);
    let prompt;
    let ans;
    if (form === 'week') {
      return {
        prompt: 'How many days are there in **one week**?',
        input: 'choice',
        answer: 7,
        choices: numChoices(R, 7, { near: [5, 6, 10, 12], min: 4, max: 12 }),
        hint: 'Count them: Monday, Tuesday, Wednesday …',
        explain: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday. There are 7 days in a week.'
      };
    }
    if (form === 'after') {
      prompt = `Which day comes **after** ${DAYS[i]}?`;
      ans = DAYS[(i + 1) % 7];
    } else if (form === 'before') {
      prompt = `Which day comes **before** ${DAYS[i]}?`;
      ans = DAYS[(i + 6) % 7];
    } else if (form === 'tomorrow') {
      prompt = `Today is ${DAYS[i]}. What day will it be **tomorrow**?`;
      ans = DAYS[(i + 1) % 7];
    } else if (form === 'yesterday') {
      prompt = `Today is ${DAYS[i]}. What day was it **yesterday**?`;
      ans = DAYS[(i + 6) % 7];
    } else {
      prompt = `Today is ${DAYS[i]}. What day will it be in **2 days**?`;
      ans = DAYS[(i + 2) % 7];
    }
    const pool = DAYS.filter((d) => d !== ans);
    return {
      prompt,
      input: 'choice',
      answer: ans,
      choices: textChoices(R, ans, [DAYS[i], DAYS[(i + 1) % 7], DAYS[(i + 6) % 7], DAYS[(i + 2) % 7], ...pool].filter((d) => d !== ans), 4),
      hint: 'Say the days in order: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.',
      explain: `The answer is ${ans}. Days in order: ${DAYS.join(', ')}.`
    };
  }
};

export const SKILLS = [
  countObjects,
  countMatch,
  countDots,
  compareGroups,
  compareHowMany,
  numAfter,
  numMissing,
  numGreatest,
  numWords,
  numOneMore,
  shapeName,
  shapeCount,
  shapeSides,
  patternNext,
  patternShapes,
  addPictures,
  addStory,
  subPictures,
  subStory,
  countTo20,
  numTeens,
  measureLength,
  measureSize,
  positionGrid,
  sortOdd,
  moneyCoins,
  timeDays
];
