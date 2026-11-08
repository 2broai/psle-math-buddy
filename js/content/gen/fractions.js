// Fractions — P2 unit 10 (fractions of a whole: equal parts, naming, comparing, adding like fractions)
// and P3 unit 8 (equivalent fractions, simplest form, comparing, adding/subtracting related fractions).
import { numWord, numChoices, textChoices, visualChoices, fixedChoices, gcd, people, cap } from '../helpers.js';

const fr = (n, d) => `[${n}/${d}]`;
const key = (n, d) => `${n}/${d}`;
const FCOLORS = ['orange', 'blue', 'green', 'pink', 'purple', 'teal', 'red'];
const DEN = {
  2: ['half', 'halves'],
  3: ['third', 'thirds'],
  4: ['quarter', 'quarters'],
  5: ['fifth', 'fifths'],
  6: ['sixth', 'sixths'],
  7: ['seventh', 'sevenths'],
  8: ['eighth', 'eighths'],
  9: ['ninth', 'ninths'],
  10: ['tenth', 'tenths'],
  11: ['eleventh', 'elevenths'],
  12: ['twelfth', 'twelfths']
};
const GRID = { 4: [2, 2], 6: [2, 3], 8: [2, 4], 9: [3, 3], 10: [2, 5], 12: [3, 4] };
const SHAPE_WORD = { circle: 'circle', rect: 'rectangle', square: 'square', bar: 'bar' };

/** "three quarters", "one half" */
function fracWords(n, d) {
  if (d === 2 && n === 1) return 'one half';
  const w = DEN[d];
  if (!w) return `${numWord(n)} over ${numWord(d)}`;
  return `${numWord(n)} ${n === 1 ? w[0] : w[1]}`;
}

/** A fraction picture with n of d equal parts shaded. */
function fracPic(R, n, d, opts = {}) {
  const shape = R.pick(opts.kinds || ['circle', 'rect', 'square', 'bar']);
  const v = { type: 'fraction', shape, parts: d, color: opts.color || R.pick(FCOLORS) };
  if ((shape === 'rect' || shape === 'square') && GRID[d] && !opts.unequal && R.chance(0.5)) {
    [v.rows, v.cols] = GRID[d];
  }
  if (opts.scatter && n > 0 && n < d) v.shadedIdx = R.sample([...Array(d).keys()], n);
  else v.shaded = n;
  if (opts.unequal) v.unequal = true;
  return v;
}

/**
 * Fraction answer choices. Distractors that are equal in value to the answer are skipped
 * (they would also be correct), as are improper and zero fractions.
 */
function fracChoices(R, [an, ad], cands, count = 4, maxDen = 12) {
  const val = an / ad;
  const out = [[an, ad]];
  const seen = new Set([key(an, ad)]);
  const ok = (n, d) => Number.isInteger(n) && Number.isInteger(d) && n >= 1 && d >= 2 && n < d && d <= maxDen;
  const tryAdd = (n, d) => {
    if (out.length >= count || !ok(n, d)) return;
    const k = key(n, d);
    if (seen.has(k) || Math.abs(n / d - val) < 1e-9) return;
    seen.add(k);
    out.push([n, d]);
  };
  for (const [n, d] of R.shuffle(cands)) tryAdd(n, d);
  let guard = 0;
  while (out.length < count && guard++ < 200) {
    const d = R.chance(0.6) ? ad : R.pick([3, 4, 5, 6, 8, 10, 12]);
    tryAdd(R.int(1, d - 1), d);
  }
  return R.shuffle(out).map(([n, d]) => ({ value: key(n, d), label: fr(n, d) }));
}

const fracOpt = (n, d) => ({ value: key(n, d), label: fr(n, d) });

// ================================================================ P2 unit 10
const UNEQ_B = [1.6, 0.8, 1.3, 0.6, 1.9, 1, 0.7, 1.5, 0.9, 1.2, 0.65, 1.4];

const equalParts = {
  id: 'p2.frac.equalparts',
  level: 'P2',
  strand: 'fractions',
  unit: 10,
  title: 'Equal parts',
  vi: 'Chia thành các phần bằng nhau',
  icon: '🍰',
  tip: 'Phân số chỉ đúng khi các phần BẰNG NHAU (equal parts). Cắt bánh mì/giấy thật thành 2, 3, 4 phần rồi hỏi con: "Are the parts equal? What is each part called?"',
  gen(R, tier) {
    const ns = tier === 1 ? [2, 4] : tier === 2 ? [2, 3, 4] : [3, 4, 5, 6, 8];
    const form = R.pick(tier === 1 ? ['yesno', 'which', 'yesno', 'howmany'] : ['yesno', 'which', 'howmany', 'name']);
    const n = R.pick(ns);
    const shape = R.pick(['circle', 'rect', 'square']);
    const color = R.pick(FCOLORS);
    if (form === 'yesno') {
      const equal = R.chance(0.5);
      const askShaded = tier > 1 && R.chance(0.5);
      return {
        prompt: askShaded ? `Is the shaded part ${fr(1, n)} of the whole ${SHAPE_WORD[shape]}?` : `Is this ${SHAPE_WORD[shape]} cut into **equal parts**?`,
        visuals: [{ type: 'fraction', shape, parts: n, unequal: !equal, shaded: askShaded ? 1 : 0, color }],
        input: 'choice',
        answer: equal ? 'Yes' : 'No',
        choices: fixedChoices(['Yes', 'No']),
        hint: 'Equal parts are exactly the same size. Compare the parts carefully.',
        explain: equal
          ? `Yes. All ${n} parts are the same size${askShaded ? `, so the shaded part is ${fr(1, n)} of the ${SHAPE_WORD[shape]}` : ''}.`
          : `No. The ${n} parts are not the same size${askShaded ? `, so the shaded part is not ${fr(1, n)}` : ''}.`
      };
    }
    if (form === 'which') {
      const kinds = ['circle', 'rect', 'square'];
      const m = R.pick([2, 3, 4, 5, 6, 8].filter((x) => x !== n));
      const list = [
        { value: 'equal', visual: { type: 'fraction', shape, parts: n, color } },
        { value: 'unequal', visual: { type: 'fraction', shape: R.pick(kinds), parts: n, unequal: true, color } },
        { value: 'other', visual: { type: 'fraction', shape: R.pick(kinds), parts: m, color } }
      ];
      if (tier > 1) list.push({ value: 'unequal2', visual: { type: 'fraction', shape: R.pick(kinds), parts: n, weights: UNEQ_B.slice(0, n), color } });
      const words = tier > 1 && R.chance(0.5);
      return {
        prompt: words ? `Which shape is cut into **${DEN[n][1]}**?` : `Which shape is cut into **${n} equal parts**?`,
        input: 'choice',
        answer: 'equal',
        choices: visualChoices(R, list),
        hint: `Look for ${n} parts that are all the same size.`,
        explain: `The right shape has ${n} parts that are all the same size${words ? ` — these are ${DEN[n][1]}` : ''}.`
      };
    }
    if (form === 'howmany') {
      return {
        prompt: `This ${SHAPE_WORD[shape]} is cut into equal parts. How many equal parts are there?`,
        visuals: [{ type: 'fraction', shape, parts: n, color, shaded: 0 }],
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { min: 2, max: 12, near: [n - 1, n + 1, n * 2] }),
        hint: 'Count every part, one by one.',
        explain: `There are ${n} equal parts. Each part is ${fr(1, n)} of the ${SHAPE_WORD[shape]}.`
      };
    }
    const pool = [2, 3, 4, 5, 6, 8].filter((x) => x !== n).map((x) => DEN[x][0]);
    return {
      prompt: `This ${SHAPE_WORD[shape]} is cut into ${n} equal parts. Each part is one ___ of the ${SHAPE_WORD[shape]}.`,
      speak: `This ${SHAPE_WORD[shape]} is cut into ${n} equal parts. Each part is one what of the ${SHAPE_WORD[shape]}?`,
      visuals: [{ type: 'fraction', shape, parts: n, shaded: 1, color }],
      input: 'choice',
      answer: DEN[n][0],
      choices: textChoices(R, DEN[n][0], pool, 4),
      hint: '2 equal parts are halves, 3 are thirds, 4 are quarters …',
      explain: `${n} equal parts are called ${DEN[n][1]}. Each part is one ${DEN[n][0]}, ${fr(1, n)}.`
    };
  }
};

const nameFraction = {
  id: 'p2.frac.name',
  level: 'P2',
  strand: 'fractions',
  unit: 10,
  title: 'What fraction is shaded?',
  vi: 'Đọc phân số phần được tô màu',
  icon: '🍕',
  tip: 'Số dưới (denominator) = tổng số phần bằng nhau; số trên (numerator) = số phần được tô. Hỏi con: "How many equal parts altogether? How many are shaded?"',
  gen(R, tier) {
    const dens = tier === 1 ? [2, 3, 4] : tier === 2 ? [3, 4, 5, 6, 8] : [5, 6, 7, 8, 9, 10, 12];
    const d = R.pick(dens);
    const n = tier === 1 ? 1 : R.int(1, d - 1);
    const form = R.pick(tier === 1 ? ['shaded', 'shaded', 'pick'] : ['shaded', 'unshaded', 'pick']);
    if (form === 'pick') {
      const color = R.pick(FCOLORS);
      const list = [{ value: 'right', visual: fracPic(R, n, d, { scatter: tier === 3, color }) }];
      if (d - n !== n) list.push({ value: 'flip', visual: fracPic(R, d - n, d, { color }) });
      const d2 = [d + 1, d - 1, d + 2].find((x) => x >= 2 && x !== d && x > n && x <= 12);
      if (d2) list.push({ value: 'parts', visual: fracPic(R, n, d2, { color }) });
      if (tier >= 2) list.push({ value: 'unequal', visual: fracPic(R, n, d, { kinds: ['circle', 'rect', 'bar'], unequal: true, color }) });
      return {
        prompt: `Which picture shows ${fr(n, d)} shaded?`,
        input: 'choice',
        answer: 'right',
        choices: visualChoices(R, list),
        hint: `${fr(n, d)} means ${n} out of ${d} EQUAL parts are shaded.`,
        explain: `The whole is cut into ${d} equal parts and ${n} ${n === 1 ? 'part is' : 'parts are'} shaded. That shows ${fr(n, d)}.`
      };
    }
    const v = fracPic(R, n, d, { scatter: tier === 3 });
    const shaded = form === 'shaded';
    const an = shaded ? n : d - n;
    const word = SHAPE_WORD[v.shape];
    return {
      prompt: shaded ? `What fraction of the ${word} is **shaded**?` : `What fraction of the ${word} is **not shaded**?`,
      visuals: [v],
      input: 'choice',
      answer: key(an, d),
      choices: fracChoices(R, [an, d], [[d - an, d], [an, d - an], [an + 1, d], [an - 1, d], [an, d + 1]], tier === 1 ? 3 : 4),
      hint: `Count all the equal parts first (that is the bottom number). Then count the ${shaded ? 'shaded' : 'white'} parts.`,
      explain: `There are ${d} equal parts. ${an} ${an === 1 ? 'is' : 'are'} ${shaded ? 'shaded' : 'not shaded'}. So the fraction is ${fr(an, d)}.`
    };
  }
};

const fractionWords = {
  id: 'p2.frac.words',
  level: 'P2',
  strand: 'fractions',
  unit: 10,
  title: 'Fraction words',
  vi: 'Đọc và viết phân số bằng chữ',
  icon: '🔤',
  tip: 'Trường đọc 3/4 là "three quarters", 2/5 là "two fifths", 1/2 là "one half". Cho con đọc to phân số mỗi khi gặp.',
  gen(R, tier) {
    const dens = tier === 1 ? [2, 3, 4] : tier === 2 ? [2, 3, 4, 5, 6, 8] : [5, 6, 7, 8, 9, 10, 12];
    const d = R.pick(dens);
    const n = d === 2 ? 1 : R.int(1, d - 1);
    const form = R.pick(['read', 'write', tier === 1 ? 'read' : 'parts']);
    if (form === 'read') {
      const pool = [];
      for (const [a, b] of [[n, d + 1], [n, d - 1], [n + 1, d], [n - 1, d], [d, n], [n, d + 2]]) {
        if (a >= 1 && b >= 2 && DEN[b] && !(a === n && b === d)) pool.push(fracWords(a, b));
      }
      return {
        prompt: `How do we read ${fr(n, d)} in words?`,
        speak: 'How do we read this fraction in words?',
        visuals: [{ type: 'text', text: fr(n, d), size: 'xl' }],
        input: 'choice',
        answer: fracWords(n, d),
        choices: textChoices(R, fracWords(n, d), [...new Set(pool)], tier === 1 ? 3 : 4),
        hint: `The bottom number ${d} tells us the parts are ${DEN[d][1]}. The top number tells how many.`,
        explain: `${fr(n, d)} is read as "${fracWords(n, d)}".`
      };
    }
    if (form === 'write') {
      return {
        prompt: `Which fraction is **${fracWords(n, d)}**?`,
        input: 'choice',
        answer: key(n, d),
        choices: fracChoices(R, [n, d], [[n, d + 1], [n, d - 1], [n + 1, d], [n - 1, d], [d - n, d]], tier === 1 ? 3 : 4),
        hint: `"${DEN[d][1]}" means the whole has ${d} equal parts. That is the bottom number.`,
        explain: `"${fracWords(n, d)}" is written as ${fr(n, d)}: ${n} out of ${d} equal parts.`
      };
    }
    const askDen = R.chance(0.5);
    return {
      prompt: askDen ? `In the fraction ${fr(n, d)}, how many **equal parts** is the whole divided into?` : `In the fraction ${fr(n, d)}, how many equal parts are **taken**?`,
      speak: askDen ? `In the fraction ${n} over ${d}, how many equal parts is the whole divided into?` : `In the fraction ${n} over ${d}, how many equal parts are taken?`,
      input: 'number',
      answer: askDen ? d : n,
      hint: 'The bottom number (denominator) is the number of equal parts. The top number (numerator) is how many we take.',
      explain: `In ${fr(n, d)}, the whole is divided into ${d} equal parts and ${n} ${n === 1 ? 'part is' : 'parts are'} taken. The answer is ${askDen ? d : n}.`
    };
  }
};

const compareUnit = {
  id: 'p2.frac.compareunit',
  level: 'P2',
  strand: 'fractions',
  unit: 10,
  title: 'Compare unit fractions',
  vi: 'So sánh phân số có tử số là 1',
  icon: '⚖️',
  tip: 'Mẹo: cùng một cái bánh, chia càng nhiều phần thì mỗi phần càng nhỏ. Vì vậy 1/8 < 1/3. Dùng thanh phân số (fraction bars) để con nhìn thấy.',
  gen(R, tier) {
    const pool = tier === 1 ? [2, 3, 4, 5, 6, 8] : [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
    const form = R.pick(tier === 1 ? ['two', 'two', 'sign'] : tier === 2 ? ['two', 'three', 'sign'] : ['three', 'order', 'sign']);
    const why = 'When a whole is cut into more equal parts, each part is smaller.';
    if (form === 'two') {
      const [a, b] = R.sample(pool, 2);
      const askG = R.chance(0.5);
      const ans = askG ? Math.min(a, b) : Math.max(a, b);
      const showBars = tier === 1 || R.chance(0.4);
      return {
        prompt: `Which is ${askG ? '**greater**' : '**smaller**'}: ${fr(1, a)} or ${fr(1, b)}?`,
        visuals: showBars ? [{ type: 'fracbars', rows: [{ parts: a, shaded: 1, label: fr(1, a) }, { parts: b, shaded: 1, label: fr(1, b), color: 'blue' }] }] : [],
        input: 'choice',
        answer: key(1, ans),
        choices: [fracOpt(1, a), fracOpt(1, b)],
        hint: why,
        explain: `${fr(1, Math.min(a, b))} is greater than ${fr(1, Math.max(a, b))}. ${why} So the answer is ${fr(1, ans)}.`
      };
    }
    if (form === 'sign') {
      const a = R.pick(pool);
      const b = tier === 3 && R.chance(0.15) ? a : R.pick(pool.filter((x) => x !== a));
      const ans = a === b ? '=' : a < b ? '>' : '<';
      return {
        prompt: `Which sign goes in the box?\n${fr(1, a)} ☐ ${fr(1, b)}`,
        input: 'choice',
        answer: ans,
        choices: fixedChoices(['>', '<', '=']),
        hint: `${why} The arrow's open side faces the greater fraction.`,
        explain: a === b ? `They are the same fraction, so ${fr(1, a)} = ${fr(1, b)}.` : `${fr(1, a)} ${ans} ${fr(1, b)}. ${why}`
      };
    }
    const ds = R.sample(pool, 3);
    if (form === 'three') {
      const askG = R.chance(0.5);
      const ans = askG ? Math.min(...ds) : Math.max(...ds);
      return {
        prompt: `Which fraction is the ${askG ? '**greatest**' : '**smallest**'}?`,
        input: 'choice',
        answer: key(1, ans),
        choices: ds.map((x) => fracOpt(1, x)),
        hint: why,
        explain: `${fr(1, ans)} is the ${askG ? 'greatest' : 'smallest'} because the whole is cut into the ${askG ? 'fewest' : 'most'} parts.`
      };
    }
    const asc = [...ds].sort((x, y) => y - x);
    const label = (arr) => arr.map((x) => fr(1, x)).join(', ');
    const wrong1 = [...asc].reverse();
    const wrong2 = [asc[1], asc[0], asc[2]];
    return {
      prompt: 'Arrange the fractions from the **smallest** to the **greatest**.',
      visuals: [{ type: 'text', text: ds.map((x) => fr(1, x)).join('   '), size: 'lg' }],
      input: 'choice',
      answer: label(asc),
      choices: R.shuffle([asc, wrong1, wrong2]).map((arr) => ({ value: label(arr), label: label(arr) })),
      hint: `${why} The smallest fraction has the greatest bottom number.`,
      explain: `From smallest to greatest: ${label(asc)}.`
    };
  }
};

const compareLike = {
  id: 'p2.frac.comparelike',
  level: 'P2',
  strand: 'fractions',
  unit: 10,
  title: 'Compare like fractions',
  vi: 'So sánh phân số cùng mẫu số',
  icon: '📏',
  tip: 'Khi mẫu số giống nhau (like fractions), các phần to bằng nhau — phân số nào có tử số lớn hơn thì lớn hơn: 5/8 > 3/8.',
  gen(R, tier) {
    const d = R.pick(tier === 1 ? [4, 5, 6] : tier === 2 ? [5, 6, 7, 8, 9] : [7, 8, 9, 10, 11, 12]);
    const form = R.pick(tier === 1 ? ['two', 'two', 'sign'] : tier === 2 ? ['two', 'three', 'sign'] : ['three', 'order', 'sign', 'smaller']);
    const why = `The parts are the same size (${DEN[d][1]}), so compare how many parts.`;
    if (form === 'two') {
      const [a, b] = R.sample([...Array(d - 1).keys()].map((x) => x + 1), 2);
      const askG = R.chance(0.5);
      const ans = askG ? Math.max(a, b) : Math.min(a, b);
      return {
        prompt: `Which is ${askG ? '**greater**' : '**smaller**'}: ${fr(a, d)} or ${fr(b, d)}?`,
        visuals: tier === 1 ? [{ type: 'fracbars', rows: [{ parts: d, shaded: a, label: fr(a, d) }, { parts: d, shaded: b, label: fr(b, d), color: 'blue' }] }] : [],
        input: 'choice',
        answer: key(ans, d),
        choices: [fracOpt(a, d), fracOpt(b, d)],
        hint: why,
        explain: `${fr(Math.max(a, b), d)} is greater than ${fr(Math.min(a, b), d)}. ${why} The answer is ${fr(ans, d)}.`
      };
    }
    if (form === 'sign') {
      const a = R.int(1, d - 1);
      const b = tier >= 2 && R.chance(0.15) ? a : R.intExcept(1, d - 1, [a]);
      const ans = a === b ? '=' : a > b ? '>' : '<';
      return {
        prompt: `Which sign goes in the box?\n${fr(a, d)} ☐ ${fr(b, d)}`,
        input: 'choice',
        answer: ans,
        choices: fixedChoices(['>', '<', '=']),
        hint: why,
        explain: `${fr(a, d)} ${ans} ${fr(b, d)} because ${a} ${a === b ? 'is equal to' : a > b ? 'is more than' : 'is less than'} ${b}.`
      };
    }
    const ns = R.distinctInts(form === 'order' ? 3 : 3, 1, d - 1);
    if (form === 'three') {
      const askG = R.chance(0.5);
      const ans = askG ? Math.max(...ns) : Math.min(...ns);
      return {
        prompt: `Which fraction is the ${askG ? '**greatest**' : '**smallest**'}?`,
        input: 'choice',
        answer: key(ans, d),
        choices: ns.map((x) => fracOpt(x, d)),
        hint: why,
        explain: `${fr(ans, d)} has the ${askG ? 'most' : 'fewest'} parts, so it is the ${askG ? 'greatest' : 'smallest'}.`
      };
    }
    if (form === 'smaller') {
      const ref = R.int(3, d - 1);
      const below = R.int(1, ref - 1);
      const others = R.sample([...Array(d - ref).keys()].map((x) => x + ref), Math.min(3, d - ref));
      return {
        prompt: `Which fraction is **smaller than** ${fr(ref, d)}?`,
        input: 'choice',
        answer: key(below, d),
        choices: R.shuffle([below, ...others]).map((x) => fracOpt(x, d)),
        hint: why,
        explain: `${fr(below, d)} is smaller than ${fr(ref, d)} because ${below} is less than ${ref}.`
      };
    }
    const asc = [...ns].sort((x, y) => x - y);
    const label = (arr) => arr.map((x) => fr(x, d)).join(', ');
    const desc = [...asc].reverse();
    const mixed = [asc[1], asc[0], asc[2]];
    const askAsc = R.chance(0.5);
    const right = askAsc ? asc : desc;
    return {
      prompt: `Arrange the fractions from the **${askAsc ? 'smallest' : 'greatest'}** to the **${askAsc ? 'greatest' : 'smallest'}**.`,
      visuals: [{ type: 'text', text: ns.map((x) => fr(x, d)).join('   '), size: 'lg' }],
      input: 'choice',
      answer: label(right),
      choices: R.shuffle([asc, desc, mixed]).map((arr) => ({ value: label(arr), label: label(arr) })),
      hint: why,
      explain: `From ${askAsc ? 'smallest to greatest' : 'greatest to smallest'}: ${label(right)}.`
    };
  }
};

const addLike = {
  id: 'p2.frac.addlike',
  level: 'P2',
  strand: 'fractions',
  unit: 10,
  title: 'Add and subtract fractions',
  vi: 'Cộng, trừ phân số cùng mẫu (trong 1 đơn vị)',
  icon: '➕',
  tip: 'Cùng mẫu số thì chỉ cộng/trừ TỬ SỐ, giữ nguyên mẫu số: 2/7 + 3/7 = 5/7 (không phải 5/14). Vẽ thanh chia 7 phần để con thấy.',
  gen(R, tier) {
    const d = R.pick(tier === 1 ? [3, 4, 5, 6] : tier === 2 ? [4, 5, 6, 7, 8, 9, 10] : [6, 7, 8, 9, 10, 12]);
    const sub = R.chance(tier === 1 ? 0.3 : 0.5);
    let a;
    let b;
    if (!sub) {
      a = R.int(1, d - 2);
      b = R.int(1, d - 1 - a);
    } else {
      a = R.int(2, d - 1);
      b = R.int(1, a - 1);
    }
    const ans = sub ? a - b : a + b;
    const op = sub ? '−' : '+';
    const form = tier === 3 ? R.pick(['story', 'story', 'eq', 'missing']) : R.pick(['eq', 'eq', 'missing']);
    const rule = `The parts are all ${DEN[d][1]}, so we ${sub ? 'subtract' : 'add'} the top numbers and keep the bottom number.`;
    const visuals = tier < 3 ? (sub ? [{ type: 'fraction', shape: 'bar', parts: d, shaded: a, color: 'orange' }] : [{ type: 'fraction', shape: 'bar', parts: d, shaded: a, shaded2: b, color: 'orange', color2: 'blue' }]) : [];
    if (form === 'missing') {
      return {
        prompt: `${fr(a, d)} ${op} ${fr(b, d)} = ${fr('?', d)}`,
        visuals,
        input: 'number',
        answer: ans,
        hint: rule,
        explain: `${a} ${op} ${b} = ${ans}, so ${fr(a, d)} ${op} ${fr(b, d)} = ${fr(ans, d)}.`
      };
    }
    const cands = [[ans + 1, d], [ans - 1, d], [sub ? a + b : Math.abs(a - b), d], ...(sub ? [] : [[a + b, d + d]])];
    if (form === 'eq') {
      return {
        prompt: `${fr(a, d)} ${op} ${fr(b, d)} = ?`,
        visuals,
        input: 'choice',
        answer: key(ans, d),
        choices: fracChoices(R, [ans, d], cands, 4, 24),
        hint: rule,
        explain: `${fr(a, d)} ${op} ${fr(b, d)} = ${fr(ans, d)}. ${rule}`
      };
    }
    const [p, q] = people(R, 2);
    const thing = R.pick(['pizza', 'cake', 'pie', 'loaf of bread', 'watermelon', 'chocolate bar']);
    let prompt;
    let res;
    let how;
    if (sub) {
      prompt = `${p.name} had ${fr(a, d)} of a ${thing}. ${p.He} gave ${fr(b, d)} of the ${thing} to ${q.name}. What fraction of the ${thing} did ${p.name} have **left**?`;
      res = ans;
      how = `${fr(a, d)} − ${fr(b, d)} = ${fr(ans, d)}`;
    } else if (a + b < d - 0 && R.chance(0.4)) {
      prompt = `Mum cut a ${thing} into ${d} equal pieces. ${p.name} ate ${fr(a, d)} of it and ${q.name} ate ${fr(b, d)} of it. What fraction of the ${thing} was **left**?`;
      res = d - a - b;
      how = `They ate ${fr(a, d)} + ${fr(b, d)} = ${fr(a + b, d)}. Left: 1 whole − ${fr(a + b, d)} = ${fr(res, d)}`;
    } else {
      prompt = `${p.name} ate ${fr(a, d)} of a ${thing}. ${q.name} ate ${fr(b, d)} of the same ${thing}. What fraction of the ${thing} did they eat **altogether**?`;
      res = ans;
      how = `${fr(a, d)} + ${fr(b, d)} = ${fr(ans, d)}`;
    }
    return {
      prompt,
      input: 'choice',
      answer: key(res, d),
      choices: fracChoices(R, [res, d], [[res + 1, d], [res - 1, d], [a + b, d], [Math.abs(a - b), d], [a + b, 2 * d]], 4, 24),
      hint: 'Draw a bar cut into equal parts and shade what you know.',
      explain: `${how}. The answer is ${fr(res, d)}.`
    };
  }
};

const makeWhole = {
  id: 'p2.frac.makewhole',
  level: 'P2',
  strand: 'fractions',
  unit: 10,
  title: 'Make 1 whole',
  vi: 'Phân số tạo thành 1 đơn vị',
  icon: '⭕',
  tip: '1 whole = 2/2 = 3/3 = 4/4 … Hỏi con: "3/5 of the bar is shaded. What fraction is left to make 1 whole?" — giống như "bạn của 10" nhưng với phân số.',
  gen(R, tier) {
    const d = R.pick(tier === 1 ? [2, 3, 4, 5] : tier === 2 ? [4, 5, 6, 8] : [6, 7, 8, 9, 10, 12]);
    const n = d === 2 ? 1 : R.int(1, d - 1);
    const form = R.pick(tier === 1 ? ['complement', 'howmany', 'more'] : tier === 2 ? ['complement', 'whole', 'more', 'howmany'] : ['story', 'story', 'complement', 'whole']);
    if (form === 'howmany') {
      return {
        prompt: `How many **${DEN[d][1]}** make 1 whole?`,
        visuals: tier === 1 ? [{ type: 'fraction', shape: R.pick(['circle', 'bar']), parts: d, shaded: d, color: R.pick(FCOLORS) }] : [],
        input: 'number',
        answer: d,
        hint: `How many equal parts is the whole cut into when each part is one ${DEN[d][0]}?`,
        explain: `${d} ${DEN[d][1]} make 1 whole. ${fr(d, d)} = 1.`
      };
    }
    if (form === 'whole') {
      return {
        prompt: `1 whole = ${fr('?', d)}`,
        speak: `One whole equals how many ${DEN[d][1]}?`,
        input: 'number',
        answer: d,
        hint: 'A whole has all its parts. The top number equals the bottom number.',
        explain: `1 whole = ${fr(d, d)}. All ${d} parts make the whole.`
      };
    }
    if (form === 'more') {
      const v = fracPic(R, n, d, { kinds: ['circle', 'rect', 'bar'] });
      return {
        prompt: `${fr(n, d)} of the ${SHAPE_WORD[v.shape]} is shaded. What fraction **more** must be shaded to shade the **whole** ${SHAPE_WORD[v.shape]}?`,
        visuals: [v],
        input: 'choice',
        answer: key(d - n, d),
        choices: fracChoices(R, [d - n, d], [[n, d], [d - n + 1, d], [d - n - 1, d], [1, d]], 4),
        hint: 'Count the parts that are still white.',
        explain: `${d - n} more ${d - n === 1 ? 'part' : 'parts'} must be shaded. ${fr(n, d)} + ${fr(d - n, d)} = ${fr(d, d)} = 1 whole.`
      };
    }
    if (form === 'complement') {
      return {
        prompt: `${fr(n, d)} and ? make **1 whole**.`,
        visuals: tier === 1 ? [{ type: 'fraction', shape: 'bar', parts: d, shaded: n, color: R.pick(FCOLORS) }] : [],
        input: 'choice',
        answer: key(d - n, d),
        choices: fracChoices(R, [d - n, d], [[n, d], [d - n + 1, d], [d - n - 1, d], [1, d], [d - n, d + 1]], 4),
        hint: `1 whole = ${fr(d, d)}. How many more ${DEN[d][1]} do you need?`,
        explain: `${fr(n, d)} + ${fr(d - n, d)} = ${fr(d, d)} = 1 whole.`
      };
    }
    const [p, q] = people(R, 2);
    const thing = R.pick(['bottle of water', 'carton of milk', 'pizza', 'cake', 'jug of juice']);
    if (n * 2 !== d && R.chance(0.4)) {
      const qWins = d - n > n;
      return {
        prompt: `${p.name} drank ${fr(n, d)} of a ${thing}. ${q.name} finished the rest. Who had **more**, ${p.name} or ${q.name}?`,
        input: 'choice',
        answer: qWins ? q.name : p.name,
        choices: fixedChoices([p.name, q.name]),
        hint: `Work out the fraction ${q.name} had first: 1 whole − ${fr(n, d)}.`,
        explain: `${q.name} had ${fr(d - n, d)}. ${fr(Math.max(n, d - n), d)} is more than ${fr(Math.min(n, d - n), d)}, so ${qWins ? q.name : p.name} had more.`
      };
    }
    return {
      prompt: `${p.name} had ${fr(n, d)} of a ${thing}. ${q.name} had the rest. What fraction of the ${thing} did ${q.name} have?`,
      input: 'choice',
      answer: key(d - n, d),
      choices: fracChoices(R, [d - n, d], [[n, d], [d - n + 1, d], [d - n - 1, d], [d - n, d + n]], 4, 24),
      hint: 'The whole thing is 1 whole. Take away the part that is known.',
      explain: `1 whole = ${fr(d, d)}. ${fr(d, d)} − ${fr(n, d)} = ${fr(d - n, d)}. ${q.name} had ${fr(d - n, d)}.`
    };
  }
};

// ================================================================ P3 unit 8
const BASES = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6]];
const multsFor = (d) => [2, 3, 4, 5, 6].filter((m) => d * m <= 12);

const equivalent = {
  id: 'p3.frac.equiv',
  level: 'P3',
  strand: 'fractions',
  unit: 8,
  title: 'Equivalent fractions',
  vi: 'Phân số bằng nhau',
  icon: '🟰',
  tip: 'Nhân (hoặc chia) CẢ tử và mẫu với cùng một số thì được phân số bằng nhau: 2/3 = 4/6 = 8/12. Lỗi hay gặp: cộng cùng một số vào tử và mẫu (sai!).',
  gen(R, tier) {
    const [n, d] = R.pick(tier === 1 ? BASES.filter(([, x]) => x <= 4) : BASES);
    const m = R.pick(tier === 1 ? [2, ...multsFor(d).slice(0, 2)] : multsFor(d));
    const N = n * m;
    const D = d * m;
    const forms = tier === 1 ? ['num', 'num', 'which'] : tier === 2 ? ['num', 'den', 'which'] : ['den', 'which', 'num', ...(d <= 3 ? ['not'] : [])];
    const form = R.pick(forms);
    const explainCore = `${fr(n, d)} = ${fr(N, D)} (multiply the top and bottom by ${m}).`;
    if (form === 'num') {
      return {
        prompt: `Find the missing number.\n${fr(n, d)} = ${fr('?', D)}`,
        speak: `${fracWords(n, d)} equals how many ${DEN[D][1]}?`,
        visuals: tier === 1 ? [{ type: 'fracbars', rows: [{ parts: d, shaded: n, label: fr(n, d) }, { parts: D, shaded: N, label: fr('?', D), color: 'blue' }] }] : [],
        input: 'number',
        answer: N,
        hint: `${d} × ? = ${D}. Multiply the top number by the same number.`,
        explain: `${d} × ${m} = ${D}, so ${n} × ${m} = ${N}. ${explainCore}`
      };
    }
    if (form === 'den') {
      return {
        prompt: `Find the missing number.\n${fr(n, d)} = ${fr(N, '?')}`,
        speak: `${fracWords(n, d)} equals ${N} over what number?`,
        input: 'number',
        answer: D,
        hint: `${n} × ? = ${N}. Multiply the bottom number by the same number.`,
        explain: `${n} × ${m} = ${N}, so ${d} × ${m} = ${D}. ${explainCore}`
      };
    }
    if (form === 'not') {
      const eqs = R.sample(multsFor(d), 3).map((k) => [n * k, d * k]);
      const k = R.pick(multsFor(d));
      let odd = [n * k + 1, d * k];
      if (odd[0] >= odd[1]) odd = [n * k - 1, d * k];
      return {
        prompt: `Which fraction is **not** equal to ${fr(n, d)}?`,
        input: 'choice',
        answer: key(odd[0], odd[1]),
        choices: R.shuffle([...eqs, odd]).map(([a, b]) => fracOpt(a, b)),
        hint: 'For each fraction, check: did we multiply the top and the bottom by the same number?',
        explain: `${eqs.map(([a, b]) => fr(a, b)).join(', ')} are all equal to ${fr(n, d)}. ${fr(odd[0], odd[1])} is not.`
      };
    }
    return {
      prompt: `Which fraction is **equal** to ${fr(n, d)}?`,
      input: 'choice',
      answer: key(N, D),
      choices: fracChoices(R, [N, D], [[n + m, d + m], [n, D], [N - 1, D], [N + 1, D], [n + 1, d + 1]], 4),
      hint: 'Multiply the top and bottom by the same number. Adding the same number does NOT work!',
      explain: explainCore
    };
  }
};

const SIMPLE = BASES.concat([[2, 7], [3, 7], [3, 8], [5, 8], [2, 9], [4, 9]]);
const simplest = {
  id: 'p3.frac.simplest',
  level: 'P3',
  strand: 'fractions',
  unit: 8,
  title: 'Simplest form',
  vi: 'Rút gọn phân số về dạng tối giản',
  icon: '✂️',
  tip: 'Chia cả tử và mẫu cho cùng một số đến khi không chia tiếp được nữa (simplest form). Gợi ý con thử chia cho 2, 3, 5.',
  gen(R, tier) {
    const [n, d] = R.pick(tier === 1 ? BASES.filter(([, x]) => x <= 4) : BASES);
    const m = tier === 1 ? 2 : R.pick(multsFor(d));
    const N = n * m;
    const D = d * m;
    const form = R.pick(tier === 1 ? ['express', 'express', 'which'] : tier === 2 ? ['express', 'which', 'num'] : ['express', 'which', 'den', 'num']);
    const explain = `${N} and ${D} can both be divided by ${m}. ${fr(N, D)} = ${fr(n, d)}, and ${fr(n, d)} cannot be simplified any more.`;
    if (form === 'express') {
      const opts = new Map([[key(n, d), [n, d]]]);
      const add = (a, b) => {
        if (opts.size >= 4 || !(a >= 1 && b >= 2 && a < b && b <= 12)) return;
        if (!opts.has(key(a, b)) && !(a === N && b === D)) opts.set(key(a, b), [a, b]);
      };
      for (const k of [2, 3, 4, 6].filter((x) => m % x === 0 && x !== m)) add(N / k, D / k);
      add(n, D);
      add(n + 1, d);
      add(Math.max(1, n - 1), d);
      add(n, d + 1);
      add(N, D + 1);
      let g = 0;
      while (opts.size < 4 && g++ < 50) add(R.int(1, d), R.int(d + 1, 12));
      return {
        prompt: `Express ${fr(N, D)} in its **simplest form**.`,
        input: 'choice',
        answer: key(n, d),
        choices: R.shuffle([...opts.values()]).map(([a, b]) => fracOpt(a, b)),
        hint: `Find a number that divides both ${N} and ${D}. Keep dividing until you cannot.`,
        explain
      };
    }
    if (form === 'which') {
      const [sn, sd] = R.pick(SIMPLE);
      const nots = [];
      let g = 0;
      while (nots.length < 3 && g++ < 60) {
        const [a, b] = R.pick(BASES);
        const k = R.pick(multsFor(b));
        const f = [a * k, b * k];
        if (!nots.some(([x, y]) => x === f[0] && y === f[1])) nots.push(f);
      }
      return {
        prompt: 'Which fraction is in its **simplest form**?',
        input: 'choice',
        answer: key(sn, sd),
        choices: R.shuffle([[sn, sd], ...nots]).map(([a, b]) => fracOpt(a, b)),
        hint: 'A fraction is in simplest form when no number (except 1) divides both the top and the bottom.',
        explain: `${fr(sn, sd)} is in its simplest form: no number other than 1 divides both ${sn} and ${sd}. The others can be simplified, e.g. ${fr(nots[0][0], nots[0][1])} = ${fr(nots[0][0] / gcd(nots[0][0], nots[0][1]), nots[0][1] / gcd(nots[0][0], nots[0][1]))}.`
      };
    }
    if (form === 'num') {
      return {
        prompt: `Write in simplest form.\n${fr(N, D)} = ${fr('?', d)}`,
        speak: `Write ${N} over ${D} in simplest form. It equals how many ${DEN[d][1]}?`,
        input: 'number',
        answer: n,
        hint: `${D} ÷ ? = ${d}. Divide the top by the same number.`,
        explain
      };
    }
    return {
      prompt: `Write in simplest form.\n${fr(N, D)} = ${fr(n, '?')}`,
      speak: `Write ${N} over ${D} in simplest form. It equals ${n} over what number?`,
      input: 'number',
      answer: d,
      hint: `${N} ÷ ? = ${n}. Divide the bottom by the same number.`,
      explain
    };
  }
};

const RELATED = [[2, 4], [2, 6], [2, 8], [2, 10], [2, 12], [3, 6], [3, 9], [3, 12], [4, 8], [4, 12], [5, 10], [6, 12]];
function relatedPair(R, tier) {
  const pool = tier === 1 ? [[2, 4], [2, 6], [2, 8], [3, 6], [4, 8]] : RELATED;
  return R.pick(pool);
}

const compareRelated = {
  id: 'p3.frac.compare',
  level: 'P3',
  strand: 'fractions',
  unit: 8,
  title: 'Compare fractions',
  vi: 'So sánh phân số khác mẫu',
  icon: '🔍',
  tip: 'Đổi về cùng mẫu số rồi so sánh tử số: 2/3 = 4/6 < 5/6. Nếu cùng tử số thì mẫu nhỏ hơn → phân số lớn hơn (3/5 > 3/8).',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['two', 'two', 'samenum'] : tier === 2 ? ['two', 'sign', 'three', 'samenum'] : ['three', 'order', 'sign', 'two']);
    if (form === 'samenum') {
      const a = R.int(1, 4);
      const [b1, b2] = R.sample([3, 4, 5, 6, 7, 8, 9, 10, 12].filter((x) => x > a), 2);
      const askG = R.chance(0.5);
      const ans = askG ? Math.min(b1, b2) : Math.max(b1, b2);
      return {
        prompt: `Which is ${askG ? '**greater**' : '**smaller**'}: ${fr(a, b1)} or ${fr(a, b2)}?`,
        input: 'choice',
        answer: key(a, ans),
        choices: [fracOpt(a, b1), fracOpt(a, b2)],
        hint: 'Both have the same number of parts. Which fraction has bigger parts?',
        explain: `Both fractions have ${a} part${a === 1 ? '' : 's'}. ${cap(DEN[Math.min(b1, b2)][1])} are bigger than ${DEN[Math.max(b1, b2)][1]}, so ${fr(a, Math.min(b1, b2))} > ${fr(a, Math.max(b1, b2))}. The answer is ${fr(a, ans)}.`
      };
    }
    if (form === 'two' || form === 'sign') {
      const [d1, d2] = relatedPair(R, tier);
      const k = d2 / d1;
      const a = R.int(1, d1 - 1);
      let b = R.int(1, d2 - 1);
      const allowEq = form === 'sign' && R.chance(0.2);
      if (allowEq) b = a * k;
      else if (b === a * k) b = b === d2 - 1 ? b - 1 : b + 1;
      const v1 = a * k;
      const first = R.chance(0.5);
      const [fa, fb] = first ? [[a, d1], [b, d2]] : [[b, d2], [a, d1]];
      const conv = `${fr(a, d1)} = ${fr(v1, d2)}`;
      if (form === 'sign') {
        const va = fa[0] / fa[1];
        const vb = fb[0] / fb[1];
        const ans = Math.abs(va - vb) < 1e-9 ? '=' : va > vb ? '>' : '<';
        return {
          prompt: `Which sign goes in the box?\n${fr(fa[0], fa[1])} ☐ ${fr(fb[0], fb[1])}`,
          input: 'choice',
          answer: ans,
          choices: fixedChoices(['>', '<', '=']),
          hint: `Change ${fr(a, d1)} into ${DEN[d2][1]} first.`,
          explain: `${conv}. Compare ${fr(v1, d2)} and ${fr(b, d2)}: ${fr(fa[0], fa[1])} ${ans} ${fr(fb[0], fb[1])}.`
        };
      }
      const askG = R.chance(0.5);
      const big = v1 > b ? [a, d1] : [b, d2];
      const small = v1 > b ? [b, d2] : [a, d1];
      const ans = askG ? big : small;
      return {
        prompt: `Which is ${askG ? '**greater**' : '**smaller**'}: ${fr(fa[0], fa[1])} or ${fr(fb[0], fb[1])}?`,
        visuals: tier === 1 ? [{ type: 'fracbars', rows: [{ parts: fa[1], shaded: fa[0], label: fr(fa[0], fa[1]) }, { parts: fb[1], shaded: fb[0], label: fr(fb[0], fb[1]), color: 'blue' }] }] : [],
        input: 'choice',
        answer: key(ans[0], ans[1]),
        choices: [fracOpt(fa[0], fa[1]), fracOpt(fb[0], fb[1])],
        hint: `Change ${fr(a, d1)} into ${DEN[d2][1]} so both fractions have the same bottom number.`,
        explain: `${conv}. ${fr(Math.max(v1, b), d2)} > ${fr(Math.min(v1, b), d2)}, so ${fr(big[0], big[1])} is greater. The answer is ${fr(ans[0], ans[1])}.`
      };
    }
    const L = R.pick([6, 8, 10, 12]);
    const divs = [2, 3, 4, 5, 6, 8, 10, 12].filter((x) => L % x === 0 && x <= L);
    let fracs;
    let g = 0;
    do {
      fracs = [];
      const used = new Set();
      let h = 0;
      while (fracs.length < 3 && h++ < 40) {
        const dd = R.pick(divs);
        const nn = R.int(1, dd - 1);
        const v = (nn * L) / dd;
        if (gcd(nn, dd) !== 1 || used.has(v)) continue;
        used.add(v);
        fracs.push([nn, dd]);
      }
    } while (fracs.length < 3 && g++ < 20);
    if (fracs.length < 3) fracs = [[1, 2], [1, 3], [5, 6]];
    const LL = fracs.reduce((acc, [, dd]) => (acc * dd) / gcd(acc, dd), 1);
    const conv = fracs.filter(([, b]) => b !== LL).map(([a, b]) => `${fr(a, b)} = ${fr((a * LL) / b, LL)}`).join(', ') || 'They already have the same bottom number';
    const byVal = [...fracs].sort((x, y) => x[0] / x[1] - y[0] / y[1]);
    if (form === 'three') {
      const askG = R.chance(0.5);
      const ans = askG ? byVal[2] : byVal[0];
      return {
        prompt: `Which fraction is the ${askG ? '**greatest**' : '**smallest**'}?`,
        input: 'choice',
        answer: key(ans[0], ans[1]),
        choices: fracs.map(([a, b]) => fracOpt(a, b)),
        hint: `Change all the fractions into ${DEN[LL] ? DEN[LL][1] : `parts out of ${LL}`}.`,
        explain: `${conv}. The ${askG ? 'greatest' : 'smallest'} is ${fr(ans[0], ans[1])}.`
      };
    }
    const label = (arr) => arr.map(([a, b]) => fr(a, b)).join(', ');
    const asc = byVal;
    const wrongA = [...byVal].reverse();
    const wrongB = [byVal[1], byVal[0], byVal[2]];
    return {
      prompt: 'Arrange the fractions from the **smallest** to the **greatest**.',
      visuals: [{ type: 'text', text: fracs.map(([a, b]) => fr(a, b)).join('   '), size: 'lg' }],
      input: 'choice',
      answer: label(asc),
      choices: R.shuffle([asc, wrongA, wrongB]).map((arr) => ({ value: label(arr), label: label(arr) })),
      hint: `Change all the fractions to the same bottom number (${LL}) first.`,
      explain: `${conv}. From smallest to greatest: ${label(asc)}.`
    };
  }
};

const addRelated = {
  id: 'p3.frac.addrelated',
  level: 'P3',
  strand: 'fractions',
  unit: 8,
  title: 'Add and subtract fractions',
  vi: 'Cộng, trừ phân số có mẫu liên quan',
  icon: '🧩',
  tip: 'Đổi phân số có mẫu nhỏ sang mẫu lớn trước: 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Cuối cùng nhớ rút gọn (simplest form).',
  gen(R, tier) {
    let d1;
    let d2;
    let a;
    let b;
    let sub;
    let top;
    let g = 0;
    do {
      [d1, d2] = relatedPair(R, tier);
      const k = d2 / d1;
      sub = R.chance(0.5);
      a = R.int(1, d1 - 1);
      b = R.int(1, d2 - 1);
      top = sub ? a * k - b : a * k + b;
      if (sub && top <= 0) {
        top = b - a * k;
        if (top > 0) sub = 'rev';
      }
    } while ((top <= 0 || top >= d2) && g++ < 60);
    if (top <= 0 || top >= d2) {
      [d1, d2, a, b, sub] = [2, 4, 1, 1, false];
      top = 3;
    }
    const k = d2 / d1;
    const gg = gcd(top, d2);
    const [rn, rd] = [top / gg, d2 / gg];
    const first = sub === 'rev' ? [b, d2] : [a, d1];
    const second = sub === 'rev' ? [a, d1] : [b, d2];
    const op = sub ? '−' : '+';
    const swap = !sub && R.chance(0.5);
    const [x, y] = swap ? [second, first] : [first, second];
    const expr = `${fr(x[0], x[1])} ${op} ${fr(y[0], y[1])}`;
    const steps = `${fr(a, d1)} = ${fr(a * k, d2)}. ${sub === 'rev' ? `${fr(b, d2)} − ${fr(a * k, d2)}` : swap ? `${fr(b, d2)} + ${fr(a * k, d2)}` : `${fr(a * k, d2)} ${op} ${fr(b, d2)}`} = ${fr(top, d2)}${gg > 1 ? ` = ${fr(rn, rd)}` : ''}`;
    const form = tier === 1 ? R.pick(['missing', 'missing', 'eq']) : tier === 2 ? R.pick(['missing', 'eq', 'eq']) : R.pick(['eq', 'story', 'story']);
    if (form === 'missing') {
      return {
        prompt: `${expr} = ${fr('?', d2)}`,
        visuals: tier === 1 ? [{ type: 'fracbars', rows: [{ parts: x[1], shaded: x[0], label: fr(x[0], x[1]) }, { parts: y[1], shaded: y[0], label: fr(y[0], y[1]), color: 'blue' }] }] : [],
        input: 'number',
        answer: top,
        hint: `Change ${fr(a, d1)} into ${DEN[d2][1]} first: ${fr(a, d1)} = ${fr('?', d2)}.`,
        explain: `${steps}. The missing number is ${top}.`
      };
    }
    const cands = [[x[0] + y[0], x[1] + y[1]], [sub ? Math.abs(a - b) : a + b, d2], [rn + 1, rd], [Math.max(1, rn - 1), rd], [top, d2 + 1]];
    if (form === 'eq') {
      return {
        prompt: `${expr} = ?\nGive your answer in its simplest form.`,
        input: 'choice',
        answer: key(rn, rd),
        choices: fracChoices(R, [rn, rd], cands, 4, 24),
        hint: `Make the bottom numbers the same: change ${fr(a, d1)} into ${DEN[d2][1]}.`,
        explain: `${steps}. The answer is ${fr(rn, rd)}.`
      };
    }
    const [p] = people(R, 1);
    const job = R.pick([
      { thing: 'wall', did: 'painted', pre: 'painted' },
      { thing: 'storybook', did: 'read', pre: 'read' },
      { thing: 'garden', did: 'weeded', pre: 'weeded' },
      { thing: 'puzzle', did: 'completed', pre: 'completed' }
    ]);
    let prompt;
    let ans;
    let how;
    if (!sub) {
      if (R.chance(0.5) && rn < rd) {
        const left = rd - rn;
        prompt = `${p.name} ${job.did} ${fr(a, d1)} of a ${job.thing} on Monday and ${fr(b, d2)} of it on Tuesday. What fraction of the ${job.thing} was **not** ${job.pre} yet?`;
        ans = [left, rd];
        how = `${steps} was ${job.pre}. 1 − ${fr(rn, rd)} = ${fr(left, rd)} was not ${job.pre}`;
      } else {
        prompt = `${p.name} ${job.did} ${fr(a, d1)} of a ${job.thing} on Monday and ${fr(b, d2)} of it on Tuesday. What fraction of the ${job.thing} did ${p.he} finish in the 2 days?`;
        ans = [rn, rd];
        how = steps;
      }
    } else {
      const thing = R.pick(['cake', 'pizza', 'bottle of juice', 'packet of flour']);
      const [hasN, hasD] = sub === 'rev' ? [b, d2] : [a, d1];
      const [useN, useD] = sub === 'rev' ? [a, d1] : [b, d2];
      prompt = `${p.name} had ${fr(hasN, hasD)} of a ${thing}. ${p.He} used ${fr(useN, useD)} of the ${thing}. What fraction of the ${thing} was **left**?`;
      ans = [rn, rd];
      how = steps;
    }
    return {
      prompt: `${prompt} Give your answer in its simplest form.`,
      input: 'choice',
      answer: key(ans[0], ans[1]),
      choices: fracChoices(R, ans, [...cands, [rn, rd], [rd - rn, rd]], 4, 24),
      hint: 'Draw a bar model. Change both fractions to the same bottom number first.',
      explain: `${how}. The answer is ${fr(ans[0], ans[1])}.`
    };
  }
};

export const SKILLS = [
  equalParts,
  nameFraction,
  fractionWords,
  compareUnit,
  compareLike,
  addLike,
  makeWhole,
  equivalent,
  simplest,
  compareRelated,
  addRelated
];
