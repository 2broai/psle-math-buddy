// Geometry — P1 unit 5 (2D shapes, pictures made of shapes, patterns, combining shapes),
// P2 unit 12 (sides & corners, 3D solids, patterns), P3 unit 10 (angles),
// unit 11 (perpendicular & parallel lines) and unit 12 (area & perimeter).
import { numChoices, textChoices, visualChoices, fixedChoices, people, ORDINAL_WORDS } from '../helpers.js';

const COLS = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'teal'];

// ================================================================ P1 unit 5
const NAME = {
  rectangle: 'rectangle',
  square: 'square',
  circle: 'circle',
  triangle: 'triangle',
  rightTriangle: 'triangle',
  semicircle: 'half circle',
  quarter: 'quarter circle',
  oval: 'oval',
  pentagon: 'pentagon',
  hexagon: 'hexagon',
  octagon: 'octagon',
  trapezium: 'trapezium',
  diamond: 'diamond'
};
const DESCRIBE = {
  rectangle: 'A rectangle has 4 straight sides and 4 corners. Its opposite sides are the same length.',
  square: 'A square has 4 equal sides and 4 corners.',
  circle: 'A circle is round. It has no straight sides and no corners.',
  triangle: 'A triangle has 3 straight sides and 3 corners.',
  semicircle: 'A half circle has 1 straight side and 1 curved side.',
  quarter: 'A quarter circle has 2 straight sides and 1 curved side.'
};
const P1_SHAPES = ['rectangle', 'square', 'circle', 'triangle', 'semicircle', 'quarter'];

function p1Spec(R, shape, tier) {
  const spec = { shape, color: R.pick(COLS) };
  if (shape === 'triangle' && tier === 3 && R.chance(0.4)) spec.shape = 'rightTriangle';
  if (tier >= 2) {
    if (['triangle', 'rightTriangle', 'semicircle', 'quarter'].includes(spec.shape)) spec.rot = R.pick([0, 90, 180, 270]);
    if (spec.shape === 'rectangle') spec.rot = R.pick([0, 90]);
  }
  if (tier === 3) spec.size = R.pick([0.7, 0.85, 1]);
  return spec;
}

const shapes2d = {
  id: 'p1.geo.shapes2d',
  level: 'P1',
  strand: 'geometry',
  unit: 5,
  title: 'Name the shapes',
  vi: 'Nhận biết hình phẳng (kể cả nửa & phần tư hình tròn)',
  icon: '🔷',
  tip: 'P1 học: rectangle, square, circle, triangle, half circle, quarter circle. Hình xoay ngang/dọc hay đổi màu vẫn là hình đó. Cho con tìm các hình này trong nhà.',
  gen(R, tier) {
    const pool = tier === 1 ? ['rectangle', 'square', 'circle', 'triangle'] : P1_SHAPES;
    const form = R.pick(tier === 1 ? ['which', 'name'] : tier === 2 ? ['which', 'name', 'count'] : ['which', 'name', 'not', 'count']);
    const target = R.pick(pool);
    if (form === 'which') {
      const others = R.sample(pool.filter((s) => s !== target), tier === 1 ? 2 : 3);
      return {
        prompt: `Which shape is a **${NAME[target]}**?`,
        input: 'choice',
        answer: target,
        choices: visualChoices(R, [target, ...others].map((s) => ({ value: s, visual: { type: 'shapes', items: [p1Spec(R, s, tier)] } }))),
        hint: DESCRIBE[target],
        explain: `This is the ${NAME[target]}. ${DESCRIBE[target]}`
      };
    }
    if (form === 'name') {
      return {
        prompt: 'What is the name of this shape?',
        visuals: [{ type: 'shapes', items: [{ ...p1Spec(R, target, tier), size: 1.1 }], px: 120 }],
        input: 'choice',
        answer: NAME[target],
        choices: textChoices(R, NAME[target], pool.filter((s) => s !== target).map((s) => NAME[s]), tier === 1 ? 3 : 4),
        hint: 'Count the straight sides and the corners. Is any side curved?',
        explain: `It is a ${NAME[target]}. ${DESCRIBE[target]}`
      };
    }
    if (form === 'not') {
      const t = R.pick(['triangle', 'rectangle', 'semicircle', 'quarter']);
      const odd = R.pick(P1_SHAPES.filter((s) => s !== t && !(t === 'rectangle' && s === 'square')));
      const list = [0, 1, 2].map((i) => ({ value: `same${i}`, visual: { type: 'shapes', items: [p1Spec(R, t, 3)] } }));
      list.push({ value: 'odd', visual: { type: 'shapes', items: [p1Spec(R, odd, 2)] } });
      return {
        prompt: `Which shape is **not** a ${NAME[t]}?`,
        input: 'choice',
        answer: 'odd',
        choices: visualChoices(R, list),
        hint: `${DESCRIBE[t]} Turning a shape does not change its name.`,
        explain: `Three of them are ${NAME[t]}s (turned or a different size). The odd one is a ${NAME[odd]}.`
      };
    }
    const types = R.sample(pool, 3);
    const tgt = types[0];
    const total = tier === 2 ? R.int(6, 8) : R.int(8, 10);
    const tCount = R.int(1, 4);
    const list = Array(tCount).fill(tgt);
    while (list.length < total) list.push(R.pick(types.slice(1)));
    return {
      prompt: `How many **${NAME[tgt]}s** are there?`,
      visuals: [{ type: 'shapes', items: R.shuffle(list).map((s) => p1Spec(R, s, tier)), px: 52 }],
      input: 'number',
      answer: tCount,
      hint: `${DESCRIBE[tgt]} Look carefully — some shapes are turned or smaller.`,
      explain: `There ${tCount === 1 ? `is 1 ${NAME[tgt]}` : `are ${tCount} ${NAME[tgt]}s`}.`
    };
  }
};

// ---------------------------------------------------------------- pictures made of shapes
const pp = (kind, shape, x, y, w, h, rot = 0) => ({ kind, shape, x, y, w, h, rot });
const PICS = [
  { name: 'house', parts: [pp('square', 'rect', 50, 92, 100, 100), pp('triangle', 'triangle', 38, 34, 124, 58), pp('rectangle', 'rect', 88, 142, 26, 50), pp('square', 'rect', 60, 104, 24, 24), pp('square', 'rect', 118, 104, 24, 24), pp('circle', 'circle', 152, 6, 34, 34)] },
  { name: 'rocket', parts: [pp('rectangle', 'rect', 75, 60, 50, 100), pp('triangle', 'triangle', 75, 14, 50, 46), pp('triangle', 'triangle', 46, 126, 30, 34), pp('triangle', 'triangle', 124, 126, 30, 34), pp('circle', 'circle', 86, 78, 28, 28), pp('half circle', 'semicircle', 80, 160, 40, 20, 180)] },
  { name: 'robot', parts: [pp('square', 'rect', 70, 20, 60, 60), pp('circle', 'circle', 82, 34, 12, 12), pp('circle', 'circle', 106, 34, 12, 12), pp('rectangle', 'rect', 86, 60, 28, 8), pp('rectangle', 'rect', 55, 84, 90, 70), pp('rectangle', 'rect', 22, 92, 33, 14), pp('rectangle', 'rect', 145, 92, 33, 14), pp('rectangle', 'rect', 70, 154, 18, 40), pp('rectangle', 'rect', 112, 154, 18, 40), pp('circle', 'circle', 94, 6, 12, 12)] },
  { name: 'tree', parts: [pp('rectangle', 'rect', 88, 150, 24, 44), pp('triangle', 'triangle', 40, 108, 120, 50), pp('triangle', 'triangle', 52, 70, 96, 50), pp('triangle', 'triangle', 66, 30, 68, 48), pp('circle', 'circle', 92, 16, 16, 16)] },
  { name: 'boat', parts: [pp('half circle', 'semicircle', 30, 110, 140, 70, 180), pp('rectangle', 'rect', 96, 30, 8, 82), pp('triangle', 'rightTriangle', 104, 32, 56, 72), pp('rectangle', 'rect', 72, 24, 24, 14), pp('quarter circle', 'quarter', 0, 0, 50, 50, 90)] },
  { name: 'ice cream', parts: [pp('triangle', 'triangle', 70, 100, 60, 92, 180), pp('circle', 'circle', 66, 50, 68, 68), pp('circle', 'circle', 72, 8, 56, 56), pp('circle', 'circle', 118, 4, 16, 16)] },
  { name: 'car', parts: [pp('rectangle', 'rect', 20, 100, 160, 50), pp('half circle', 'semicircle', 50, 50, 100, 50), pp('circle', 'circle', 38, 130, 40, 40), pp('circle', 'circle', 122, 130, 40, 40), pp('square', 'rect', 86, 66, 28, 28)] },
  { name: 'butterfly', parts: [pp('quarter circle', 'quarter', 34, 46, 60, 60, 270), pp('quarter circle', 'quarter', 106, 46, 60, 60, 0), pp('quarter circle', 'quarter', 44, 106, 50, 50, 180), pp('quarter circle', 'quarter', 106, 106, 50, 50, 90), pp('rectangle', 'rect', 94, 40, 12, 120), pp('circle', 'circle', 82, 24, 12, 12), pp('circle', 'circle', 106, 24, 12, 12)] },
  { name: 'clown', parts: [pp('circle', 'circle', 40, 62, 120, 120), pp('triangle', 'triangle', 62, 6, 76, 60), pp('circle', 'circle', 70, 94, 18, 18), pp('circle', 'circle', 112, 94, 18, 18), pp('circle', 'circle', 90, 116, 20, 20), pp('half circle', 'semicircle', 74, 140, 52, 26, 180)] },
  { name: 'train', parts: [pp('rectangle', 'rect', 10, 90, 92, 58), pp('square', 'rect', 58, 44, 44, 44), pp('rectangle', 'rect', 20, 58, 16, 32), pp('rectangle', 'rect', 108, 96, 84, 52), pp('square', 'rect', 70, 54, 20, 20), pp('square', 'rect', 122, 106, 20, 20), pp('square', 'rect', 156, 106, 20, 20), pp('circle', 'circle', 18, 138, 26, 26), pp('circle', 'circle', 64, 138, 26, 26), pp('circle', 'circle', 118, 138, 26, 26), pp('circle', 'circle', 160, 138, 26, 26)] }
];
const KIND_SHAPE = { square: 'square', rectangle: 'rectangle', triangle: 'triangle', circle: 'circle', 'half circle': 'semicircle', 'quarter circle': 'quarter' };
const KINDS = Object.keys(KIND_SHAPE);

const shapePictures = {
  id: 'p1.geo.pictures',
  level: 'P1',
  strand: 'geometry',
  unit: 5,
  title: 'Shapes in pictures',
  vi: 'Đếm và nhận ra hình trong một bức tranh ghép hình',
  icon: '🏠',
  tip: 'Cho con dùng bút chì đánh dấu từng hình đã đếm. Có thể cắt giấy màu thành hình vuông, tròn, tam giác… để con tự ghép tranh rồi đếm.',
  gen(R, tier) {
    const pic = R.pick(PICS);
    const parts = [];
    pic.parts.forEach((p) => {
      // overlapping parts get different colours so every shape stands out
      const touching = parts.filter((q) => q.x < p.x + p.w && p.x < q.x + q.w && q.y < p.y + p.h && p.y < q.y + q.h).map((q) => q.color);
      const free = COLS.filter((c) => !touching.includes(c));
      parts.push({ ...p, color: R.pick(free.length ? free : COLS) });
    });
    const counts = {};
    parts.forEach((p) => {
      counts[p.kind] = (counts[p.kind] || 0) + 1;
    });
    const kinds = Object.keys(counts);
    const visual = { type: 'shapepic', parts: parts.map(({ kind, ...rest }) => rest) };
    const forms = tier === 1 ? ['count', 'notused', 'count'] : tier === 2 ? ['count', 'notused', 'total'] : ['more', 'total', 'most', 'count'];
    let form = R.pick(forms);
    const maxC = Math.max(...Object.values(counts));
    if (form === 'most' && Object.values(counts).filter((c) => c === maxC).length > 1) form = 'count';
    if (form === 'more' && new Set(Object.values(counts)).size < 2) form = 'total';
    if (form === 'notused') {
      const unused = KINDS.filter((k) => !counts[k]);
      const odd = R.pick(unused);
      const used = R.sample(kinds, Math.min(3, kinds.length));
      return {
        prompt: `Which shape is **not** used to make this ${pic.name}?`,
        visuals: [visual],
        input: 'choice',
        answer: odd,
        choices: visualChoices(R, [odd, ...used].map((k) => ({ value: k, visual: { type: 'shapes', items: [{ shape: KIND_SHAPE[k], color: R.pick(COLS) }] } }))),
        hint: 'Look for each shape in the picture. Which one can you not find?',
        explain: `The ${pic.name} is made of ${kinds.map((k) => `${counts[k]} ${k}${counts[k] === 1 ? '' : 's'}`).join(', ')}. There is no ${odd}.`
      };
    }
    if (form === 'total') {
      const total = parts.length;
      return {
        prompt: `How many shapes are used to make this ${pic.name} **altogether**?`,
        visuals: [visual],
        input: 'number',
        answer: total,
        hint: 'Count each kind of shape, then add them up.',
        explain: `${kinds.map((k) => `${counts[k]} ${k}${counts[k] === 1 ? '' : 's'}`).join(' + ')} = ${total} shapes.`
      };
    }
    if (form === 'most') {
      const best = kinds.find((k) => counts[k] === maxC);
      return {
        prompt: `Which shape is used the **most** to make this ${pic.name}?`,
        visuals: [visual],
        input: 'choice',
        answer: best,
        choices: textChoices(R, best, kinds.filter((k) => k !== best).concat(KINDS.filter((k) => !counts[k])), 4),
        hint: 'Count each kind of shape.',
        explain: `${kinds.map((k) => `${counts[k]} ${k}${counts[k] === 1 ? '' : 's'}`).join(', ')}. The ${best} is used the most.`
      };
    }
    if (form === 'more') {
      const [a, b] = R.sample(kinds.filter((k, i, arr) => arr.some((o) => counts[o] !== counts[k])), 2);
      const [hi, lo] = counts[a] >= counts[b] ? [a, b] : [b, a];
      if (counts[hi] !== counts[lo]) {
        return {
          prompt: `How many **more** ${hi}s than ${lo}s are used to make this ${pic.name}?`,
          visuals: [visual],
          input: 'number',
          answer: counts[hi] - counts[lo],
          hint: `Count the ${hi}s and the ${lo}s. Then find the difference.`,
          explain: `There ${counts[hi] === 1 ? 'is' : 'are'} ${counts[hi]} ${hi}${counts[hi] === 1 ? '' : 's'} and ${counts[lo]} ${lo}${counts[lo] === 1 ? '' : 's'}. ${counts[hi]} − ${counts[lo]} = ${counts[hi] - counts[lo]}.`
        };
      }
    }
    const k = R.pick(kinds);
    return {
      prompt: `How many **${k}s** are used to make this ${pic.name}?`,
      visuals: [visual],
      input: 'number',
      answer: counts[k],
      hint: `Look for every ${k}, big or small. ${DESCRIBE[KIND_SHAPE[k]] || ''}`.trim(),
      explain: `There ${counts[k] === 1 ? `is 1 ${k}` : `are ${counts[k]} ${k}s`} in the ${pic.name}.`
    };
  }
};

// ---------------------------------------------------------------- patterns (shape, size, colour, orientation)
function buildPattern(code, len) {
  const out = [];
  for (let i = 0; i < len; i++) out.push(code[i % code.length]);
  return out;
}
const specKey = (s) => `${s.shape}-${s.color}-${s.size || 1}-${s.rot || 0}`;
const COLOR_WORD = { red: 'red', blue: 'blue', green: 'green', yellow: 'yellow', orange: 'orange', purple: 'purple', pink: 'pink', teal: 'teal' };

const p1Patterns = {
  id: 'p1.geo.patterns',
  level: 'P1',
  strand: 'geometry',
  unit: 5,
  title: 'Shape patterns',
  vi: 'Quy luật hình: hình dạng, kích thước, màu, hướng xoay',
  icon: '🔁',
  tip: 'Hỏi con "What is changing?" — hình, màu, kích thước hay hướng? Tìm phần lặp lại (repeating part) rồi đọc to quy luật.',
  gen(R, tier) {
    const kind = tier === 1 ? R.pick(['colour', 'shape']) : tier === 2 ? R.pick(['size', 'shape', 'colour', 'turn']) : R.pick(['both', 'turn4', 'size', 'shape']);
    let code = R.pick(tier === 1 ? ['AB', 'ABC'] : tier === 2 ? ['AB', 'ABC', 'AAB', 'ABB'] : ['ABC', 'AABB', 'ABB', 'AAB']);
    if (kind === 'turn') code = R.pick(['AB', 'AAB', 'ABB']);
    if (kind === 'turn4') code = 'ABCD';
    if (kind === 'size' && code.length > 3) code = 'ABC';
    const letters = [...new Set(code.split(''))];
    const baseShape = R.pick(['circle', 'square', 'triangle', 'rectangle', 'semicircle', 'quarter']);
    const baseColor = R.pick(COLS);
    const colors = R.sample(COLS, letters.length + 1);
    const shapes = R.sample(P1_SHAPES, letters.length + 1);
    const sizes = [1.15, 0.6, 0.85, 0.45];
    const turnShape = R.pick(kind === 'turn4' ? ['quarter', 'rightTriangle', 'semicircle'] : ['triangle', 'semicircle']);
    const rots = kind === 'turn4' ? [0, 90, 180, 270, 45] : [0, 180, 90];
    const specFor = (i) => {
      if (kind === 'colour') return { shape: baseShape, color: colors[i] };
      if (kind === 'shape') return { shape: shapes[i], color: baseColor };
      if (kind === 'size') return { shape: baseShape, color: baseColor, size: sizes[i] };
      if (kind === 'turn' || kind === 'turn4') return { shape: turnShape, color: baseColor, rot: rots[i] };
      return { shape: shapes[i], color: colors[i] };
    };
    const map = Object.fromEntries(letters.map((l, i) => [l, specFor(i)]));
    const len = code.length * 2 + R.int(0, code.length - 1);
    const full = buildPattern(code, len + 1).map((l) => map[l]);
    const middle = tier === 3 && R.chance(0.35);
    const idx = middle ? R.int(code.length, len - 1) : len;
    const ans = full[idx];
    const shown = full.slice(0, middle ? len : len).map((s, i) => (i === idx ? '?' : s));
    const opts = [];
    for (const o of [...letters.map((l, i) => specFor(i)), specFor(letters.length)]) if (!opts.some((u) => specKey(u) === specKey(o))) opts.push(o);
    const describe = (s) => {
      if (kind === 'colour') return COLOR_WORD[s.color];
      if (kind === 'shape') return NAME[s.shape];
      if (kind === 'size') return s.size > 1 ? 'big' : s.size < 0.5 ? 'tiny' : s.size < 0.7 ? 'small' : 'middle-sized';
      if (kind === 'turn' || kind === 'turn4') return `${NAME[s.shape]} turned ${s.rot === 0 ? 'upright' : `${s.rot}°`}`;
      return `${COLOR_WORD[s.color]} ${NAME[s.shape]}`;
    };
    const changing = { colour: 'colour', shape: 'shape', size: 'size', turn: 'direction the shape is facing', turn4: 'direction — it turns a quarter turn each time', both: 'shape and colour' }[kind];
    return {
      prompt: middle ? 'Which shape is **missing** from the pattern?' : 'Which shape comes **next** in the pattern?',
      visuals: [{ type: 'sequence', items: middle ? shown : [...shown.slice(0, len)] }],
      input: 'choice',
      answer: specKey(ans),
      choices: R.shuffle(opts).map((o) => ({ value: specKey(o), visual: { type: 'shapes', items: [o] } })),
      hint: `Look at what changes each time: the ${changing}. Find the part that repeats.`,
      explain:
        kind === 'turn4'
          ? `The shape turns a quarter turn each time, then starts again. The ${middle ? 'missing' : 'next'} one is the ${describe(ans)}.`
          : `The repeating part is: ${code.split('').map((l) => describe(map[l])).join(', ')}. The ${middle ? 'missing' : 'next'} shape is the ${describe(ans)}.`
    };
  }
};

// ---------------------------------------------------------------- combining shapes
const COMBOS = [
  { items: [{ shape: 'semicircle', rot: 0 }, { shape: 'semicircle', rot: 180 }], text: '2 half circles', makes: 'circle', not: ['square', 'triangle', 'rectangle', 'quarter circle'] },
  { items: [{ shape: 'quarter', rot: 0 }, { shape: 'quarter', rot: 270 }], text: '2 quarter circles', makes: 'half circle', not: ['square', 'triangle', 'rectangle', 'circle'] },
  { items: [{ shape: 'quarter', rot: 0 }, { shape: 'quarter', rot: 90 }, { shape: 'quarter', rot: 180 }, { shape: 'quarter', rot: 270 }], text: '4 quarter circles', makes: 'circle', not: ['square', 'triangle', 'rectangle', 'half circle'] },
  { items: [{ shape: 'square' }, { shape: 'square' }], text: '2 squares of the same size', makes: 'rectangle', not: ['circle', 'triangle', 'half circle', 'quarter circle'] },
  { items: [{ shape: 'rightTriangle', rot: 0 }, { shape: 'rightTriangle', rot: 180 }], text: '2 of these triangles', makes: 'square', not: ['circle', 'half circle', 'quarter circle'] }
];
const HOW_MANY = [
  ['How many half circles make 1 circle?', 2, 'Two half circles fit together to make a whole circle.'],
  ['How many quarter circles make 1 circle?', 4, 'Four quarter circles fit together to make a whole circle.'],
  ['How many quarter circles make 1 half circle?', 2, 'Two quarter circles make a half circle.'],
  ['How many squares of the same size can you put side by side to make a rectangle that is 2 squares long?', 2, '2 squares side by side make a rectangle.']
];
const combineShapes = {
  id: 'p1.geo.combine',
  level: 'P1',
  strand: 'geometry',
  unit: 5,
  title: 'Put shapes together',
  vi: 'Ghép hình: 2 nửa hình tròn thành hình tròn…',
  icon: '🧩',
  tip: 'Cắt giấy thành nửa hình tròn, phần tư hình tròn, hình vuông, tam giác vuông và cho con ghép thử. Học bằng tay (concrete) giúp con nhớ lâu.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['makes', 'makes', 'howmany'] : tier === 2 ? ['makes', 'howmany', 'which'] : ['which', 'makes', 'howmany']);
    if (form === 'howmany') {
      const [q, a, why] = R.pick(tier === 1 ? HOW_MANY.slice(0, 2) : HOW_MANY);
      return {
        prompt: q,
        visuals: [{ type: 'shapes', items: [{ shape: 'circle', color: R.pick(COLS) }, { shape: 'semicircle', color: R.pick(COLS) }, { shape: 'quarter', color: R.pick(COLS) }] }],
        input: 'number',
        answer: a,
        hint: 'Imagine cutting a circle into equal pieces.',
        explain: `${why} The answer is ${a}.`
      };
    }
    if (form === 'which') {
      const target = R.pick(['circle', 'rectangle', 'square', 'half circle']);
      const right = COMBOS.find((c) => c.makes === target && c.items.length === 2);
      const wrongPool = [
        [{ shape: 'circle' }, { shape: 'triangle' }],
        [{ shape: 'semicircle' }, { shape: 'square' }],
        [{ shape: 'quarter' }, { shape: 'triangle' }],
        [{ shape: 'rectangle' }, { shape: 'circle' }],
        [{ shape: 'triangle' }, { shape: 'semicircle' }]
      ];
      const color = R.pick(COLS);
      const paint = (arr) => arr.map((s) => ({ ...s, color }));
      const list = [{ value: 'right', visual: { type: 'shapes', items: paint(right.items), px: 52 } }];
      R.sample(wrongPool, 3).forEach((w, i) => list.push({ value: `wrong${i}`, visual: { type: 'shapes', items: paint(w), px: 52 } }));
      return {
        prompt: `Which 2 shapes can be put together to make a **${target}**?`,
        input: 'choice',
        answer: 'right',
        choices: visualChoices(R, list),
        hint: `Imagine sliding the two shapes together. Which pair fits to make a ${target}?`,
        explain: `${right.text.charAt(0).toUpperCase()}${right.text.slice(1)} can be put together to make a ${target}.`
      };
    }
    const c = R.pick(tier === 1 ? COMBOS.slice(0, 4) : COMBOS);
    const color = R.pick(COLS);
    return {
      prompt: `Put ${c.text} together. Which shape can they make?`,
      visuals: [{ type: 'shapes', items: c.items.map((s) => ({ ...s, color })), px: 70 }],
      input: 'choice',
      answer: c.makes,
      choices: textChoices(R, c.makes, c.not, 4),
      hint: 'Imagine sliding the pieces together until the straight sides touch.',
      explain: `${c.text.charAt(0).toUpperCase()}${c.text.slice(1)} fit together to make a ${c.makes}.`
    };
  }
};

// ================================================================ P2 unit 12
const SIDES = { triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, octagon: 8, trapezium: 4 };
const RIDDLES = [
  ['I have 3 straight sides and 3 corners. What am I?', 'triangle'],
  ['I have 4 equal sides and 4 corners. What am I?', 'square'],
  ['I have 4 sides and 4 corners. My opposite sides are equal, but not all my sides are equal. What am I?', 'rectangle'],
  ['I have no corners and no straight sides. What am I?', 'circle'],
  ['I have 1 straight side and 1 curved side. What am I?', 'half circle'],
  ['I have 2 straight sides and 1 curved side. What am I?', 'quarter circle'],
  ['I have 6 straight sides and 6 corners. What am I?', 'hexagon'],
  ['I have 5 straight sides and 5 corners. What am I?', 'pentagon']
];
const sidesCorners = {
  id: 'p2.geo.sides',
  level: 'P2',
  strand: 'geometry',
  unit: 12,
  title: 'Sides and corners',
  vi: 'Cạnh và góc của hình phẳng',
  icon: '📐',
  tip: 'Cho con dùng ngón tay men theo từng cạnh (side) và chạm từng góc (corner). Đố vui "I have 4 equal sides…" rất hợp để luyện từ vựng.',
  gen(R, tier) {
    const pool = tier === 1 ? ['triangle', 'square', 'rectangle'] : tier === 2 ? ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon'] : Object.keys(SIDES);
    const form = R.pick(tier === 1 ? ['count', 'riddle', 'which'] : tier === 2 ? ['count', 'corners', 'riddle', 'which'] : ['total', 'compare', 'riddle', 'which', 'corners']);
    const color = R.pick(COLS);
    if (form === 'riddle') {
      const set = tier === 1 ? RIDDLES.slice(0, 4) : RIDDLES;
      const [q, a] = R.pick(set);
      const names = [...new Set(RIDDLES.map((r) => r[1]))].filter((n) => n !== a);
      return {
        prompt: q,
        input: 'choice',
        answer: a,
        choices: textChoices(R, a, names, 4),
        hint: 'Draw the shape in the air with your finger. Count its sides and corners.',
        explain: `The answer is a ${a}.`
      };
    }
    if (form === 'which') {
      const t = R.pick(pool.filter((s) => s !== 'square' && s !== 'rectangle' && s !== 'trapezium').concat(['square']));
      const n = SIDES[t];
      const others = R.sample(Object.keys(SIDES).filter((s) => SIDES[s] !== n), 3).concat(R.chance(0.5) ? ['circle'] : []);
      const list = [t, ...others.slice(0, 3)].map((s) => ({ value: s, visual: { type: 'shapes', items: [{ shape: s, color }] } }));
      return {
        prompt: `Which shape has **${n} sides**?`,
        input: 'choice',
        answer: t,
        choices: visualChoices(R, list),
        hint: 'Count the straight sides of each shape.',
        explain: `The ${NAME[t]} has ${n} sides.`
      };
    }
    if (form === 'total') {
      const [a, b] = R.sample(Object.keys(SIDES).filter((s) => s !== 'trapezium'), 2);
      const na = R.int(1, 3);
      const nb = R.int(1, 3);
      const ans = na * SIDES[a] + nb * SIDES[b];
      return {
        prompt: `How many sides do ${na} ${NAME[a]}${na > 1 ? 's' : ''} and ${nb} ${NAME[b]}${nb > 1 ? 's' : ''} have **altogether**?`,
        visuals: [{ type: 'shapes', items: [...Array(na).fill(a), ...Array(nb).fill(b)].map((s) => ({ shape: s, color })), px: 54 }],
        input: 'number',
        answer: ans,
        hint: `A ${NAME[a]} has ${SIDES[a]} sides and a ${NAME[b]} has ${SIDES[b]} sides.`,
        explain: `${na} × ${SIDES[a]} = ${na * SIDES[a]} and ${nb} × ${SIDES[b]} = ${nb * SIDES[b]}. ${na * SIDES[a]} + ${nb * SIDES[b]} = ${ans} sides.`
      };
    }
    if (form === 'compare') {
      const [a, b] = R.sample(['triangle', 'square', 'pentagon', 'hexagon', 'octagon'], 2);
      const [hi, lo] = SIDES[a] > SIDES[b] ? [a, b] : [b, a];
      return {
        prompt: `How many **more** sides does a ${NAME[hi]} have than a ${NAME[lo]}?`,
        visuals: [{ type: 'shapes', items: [{ shape: hi, color }, { shape: lo, color: R.pick(COLS) }], px: 80 }],
        input: 'number',
        answer: SIDES[hi] - SIDES[lo],
        hint: 'Count the sides of each shape, then subtract.',
        explain: `A ${NAME[hi]} has ${SIDES[hi]} sides and a ${NAME[lo]} has ${SIDES[lo]} sides. ${SIDES[hi]} − ${SIDES[lo]} = ${SIDES[hi] - SIDES[lo]}.`
      };
    }
    const s = R.pick(pool);
    const corners = form === 'corners';
    return {
      prompt: `How many **${corners ? 'corners' : 'sides'}** does this ${NAME[s]} have?`,
      visuals: [{ type: 'shapes', items: [{ shape: s, color, size: 1.15 }], px: 120 }],
      input: 'choice',
      answer: SIDES[s],
      choices: numChoices(R, SIDES[s], { min: 2, max: 10, near: [SIDES[s] - 1, SIDES[s] + 1] }),
      hint: corners ? 'Touch each corner as you count.' : 'Run your finger along each straight side as you count.',
      explain: `A ${NAME[s]} has ${SIDES[s]} sides and ${SIDES[s]} corners.`
    };
  }
};

const SOLIDS = ['cube', 'cuboid', 'cylinder', 'cone', 'sphere'];
const FACES = { cube: 6, cuboid: 6, cylinder: 2, cone: 1, sphere: 0 };
const ROLLS = { cube: false, cuboid: false, cylinder: true, cone: true, sphere: true };
const OBJECTS = [
  ['🎲 a dice', 'cube'], ['🧊 an ice cube', 'cube'], ['📦 a shoe box', 'cuboid'], ['🧱 a brick', 'cuboid'],
  ['📚 a book', 'cuboid'], ['🥫 a tin of soup', 'cylinder'], ['🥁 a drum', 'cylinder'], ['🧻 a toilet roll', 'cylinder'],
  ['🍦 an ice cream cone', 'cone'], ['🥳 a party hat', 'cone'], ['⚽ a football', 'sphere'], ['🍊 an orange', 'sphere'],
  ['🌍 a globe', 'sphere'], ['🏀 a basketball', 'sphere']
];
const SOLID_PROPS = [
  ['I have no flat faces. I can roll in any direction.', 'sphere'],
  ['I have 6 flat faces. All my faces are squares.', 'cube'],
  ['I have 6 flat faces. Some of my faces are rectangles.', 'cuboid'],
  ['I have 2 flat faces that are circles. I can roll and I can stack.', 'cylinder'],
  ['I have 1 flat face that is a circle and a pointed top.', 'cone']
];
const solids3d = {
  id: 'p2.geo.solids',
  level: 'P2',
  strand: 'geometry',
  unit: 12,
  title: '3D shapes',
  vi: 'Hình khối: cube, cuboid, cylinder, cone, sphere',
  icon: '🧊',
  tip: 'Tìm đồ vật thật: hộp sữa (cuboid), lon nước (cylinder), bóng (sphere), xúc xắc (cube), nón sinh nhật (cone). Cho con lăn thử xem khối nào lăn được.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['name', 'which', 'object'] : tier === 2 ? ['name', 'which', 'faces', 'object'] : ['faces', 'prop', 'roll', 'object']);
    const color = R.pick(COLS);
    const t = R.pick(SOLIDS);
    if (form === 'name') {
      return {
        prompt: 'What is the name of this solid?',
        visuals: [{ type: 'solids', items: [{ solid: t, color }], px: 120 }],
        input: 'choice',
        answer: t,
        choices: textChoices(R, t, SOLIDS.filter((s) => s !== t), tier === 1 ? 3 : 4),
        hint: 'Look at its faces. Are they flat or curved? Squares, rectangles or circles?',
        explain: `It is a ${t}.`
      };
    }
    if (form === 'which') {
      return {
        prompt: `Which one is a **${t}**?`,
        input: 'choice',
        answer: t,
        choices: visualChoices(R, [t, ...R.sample(SOLIDS.filter((s) => s !== t), tier === 1 ? 2 : 3)].map((s) => ({ value: s, visual: { type: 'solids', items: [{ solid: s, color: R.pick(COLS) }] } }))),
        hint: 'A cube has square faces; a cuboid has rectangle faces; a cylinder looks like a tin; a cone has a point; a sphere is a ball.',
        explain: `This is the ${t}.`
      };
    }
    if (form === 'faces') {
      return {
        prompt: `How many **flat faces** does a ${t} have?`,
        visuals: [{ type: 'solids', items: [{ solid: t, color }], px: 110 }],
        input: 'number',
        answer: FACES[t],
        hint: 'A face is a flat surface. Curved surfaces are not flat faces.',
        explain: `A ${t} has ${FACES[t]} flat face${FACES[t] === 1 ? '' : 's'}.`
      };
    }
    if (form === 'object') {
      const [obj, solid] = R.pick(OBJECTS);
      const [emoji, ...words] = obj.split(' ');
      const phrase = words.join(' ');
      const Phrase = phrase.charAt(0).toUpperCase() + phrase.slice(1);
      return {
        prompt: `${emoji} ${Phrase} is shaped like a ___.`,
        speak: `${Phrase} is shaped like a what?`,
        input: 'choice',
        answer: solid,
        choices: textChoices(R, solid, SOLIDS.filter((x) => x !== solid), 4),
        hint: 'Imagine holding it. Does it have flat faces, a point, or is it round all over?',
        explain: `${Phrase} is shaped like a ${solid}.`
      };
    }
    if (form === 'prop') {
      const [q, a] = R.pick(SOLID_PROPS);
      return {
        prompt: `${q} Which solid am I?`,
        input: 'choice',
        answer: a,
        choices: visualChoices(R, [a, ...R.sample(SOLIDS.filter((s) => s !== a), 3)].map((s) => ({ value: s, visual: { type: 'solids', items: [{ solid: s, color: R.pick(COLS) }] } }))),
        hint: 'Count the flat faces of each solid.',
        explain: `The answer is the ${a}.`
      };
    }
    const canRoll = R.chance(0.5);
    const right = R.pick(SOLIDS.filter((s) => ROLLS[s] === canRoll));
    const wrong = R.sample(SOLIDS.filter((s) => ROLLS[s] !== canRoll), 2);
    return {
      prompt: `Which solid **${canRoll ? 'can' : 'cannot'}** roll?`,
      input: 'choice',
      answer: right,
      choices: visualChoices(R, [right, ...wrong].map((s) => ({ value: s, visual: { type: 'solids', items: [{ solid: s, color: R.pick(COLS) }] } }))),
      hint: 'A solid can roll if it has a curved surface.',
      explain: canRoll ? `The ${right} has a curved surface, so it can roll.` : `The ${right} has only flat faces, so it cannot roll. It can only slide.`
    };
  }
};

const p2Patterns = {
  id: 'p2.geo.patterns',
  level: 'P2',
  strand: 'geometry',
  unit: 12,
  title: 'Patterns with 2D and 3D shapes',
  vi: 'Quy luật với hình phẳng, hình khối và hình xoay',
  icon: '🔄',
  tip: 'Với câu "What is the 15th shape?", dạy con viết số thứ tự dưới từng nhóm lặp (1, 2, 3 | 4, 5, 6 …) — đây là cách giải quy luật ở các lớp trên.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['solid', 'turn2'] : tier === 2 ? ['solid', 'turn4', 'turn2'] : ['nth', 'turn4', 'solid', 'nth']);
    if (form === 'solid') {
      const code = R.pick(tier === 1 ? ['AB', 'ABC'] : ['AAB', 'ABB', 'ABC', 'AABB']);
      const letters = [...new Set(code.split(''))];
      const sols = R.sample(SOLIDS, letters.length + 1);
      const color = R.pick(COLS);
      const map = Object.fromEntries(letters.map((l, i) => [l, sols[i]]));
      const len = code.length * 2 + R.int(0, code.length - 1);
      const full = buildPattern(code, len + 1).map((l) => map[l]);
      const middle = tier === 3 && R.chance(0.5);
      const idx = middle ? R.int(1, len - 1) : len;
      const items = full.slice(0, middle ? len : len + 1).map((s, i) => (i === idx ? '?' : { solid: s, color }));
      return {
        prompt: middle ? 'Which solid is **missing** from the pattern?' : 'Which solid comes **next** in the pattern?',
        visuals: [{ type: 'solids', items, px: 56 }],
        input: 'choice',
        answer: full[idx],
        choices: visualChoices(R, sols.map((s) => ({ value: s, visual: { type: 'solids', items: [{ solid: s, color }] } }))),
        hint: 'Say the names out loud. Find the part that repeats.',
        explain: `The repeating part is: ${code.split('').map((l) => map[l]).join(', ')}. The answer is the ${full[idx]}.`
      };
    }
    if (form === 'turn2' || form === 'turn4') {
      const shape = R.pick(form === 'turn2' ? ['semicircle', 'triangle', 'quarter'] : ['quarter', 'rightTriangle', 'semicircle']);
      const color = R.pick(COLS);
      const steps = form === 'turn2' ? [0, 180] : [0, 90, 180, 270];
      const start = R.int(0, steps.length - 1);
      const len = form === 'turn2' ? R.int(4, 6) : R.int(5, 7);
      const seq = Array.from({ length: len + 1 }, (_, i) => steps[(start + i) % steps.length]);
      const ans = seq[len];
      const opts = form === 'turn2' ? [0, 90, 180, 270] : [0, 90, 180, 270];
      return {
        prompt: 'The shape turns in a pattern. Which shape comes **next**?',
        visuals: [{ type: 'sequence', items: seq.slice(0, len).map((r) => ({ shape, color, rot: r })) }],
        input: 'choice',
        answer: `rot${ans}`,
        choices: R.shuffle(opts).map((r) => ({ value: `rot${r}`, visual: { type: 'shapes', items: [{ shape, color, rot: r }] } })),
        hint: form === 'turn2' ? 'The shape flips between two positions.' : 'The shape makes a quarter turn each time, like the hands of a clock.',
        explain: form === 'turn2' ? 'The shape turns a half turn each time, so it goes back and forth between two positions.' : 'The shape turns a quarter turn clockwise each time. After 4 quarter turns it is back where it started.'
      };
    }
    const code = R.pick(['ABC', 'AAB', 'ABB', 'ABCD']);
    const letters = [...new Set(code.split(''))];
    const shapes = R.sample(['circle', 'square', 'triangle', 'star', 'heart', 'rectangle'], letters.length + 1);
    const colors = R.sample(COLS, letters.length + 1);
    const map = Object.fromEntries(letters.map((l, i) => [l, { shape: shapes[i], color: colors[i] }]));
    const shownLen = code.length * 2;
    const nth = R.int(shownLen + 3, 20);
    const ansLetter = code[(nth - 1) % code.length];
    const ans = map[ansLetter];
    return {
      prompt: `The pattern repeats. What is the **${ORDINAL_WORDS[nth] || `${nth}th`}** shape?`,
      visuals: [{ type: 'sequence', items: buildPattern(code, shownLen).map((l) => map[l]) }],
      input: 'choice',
      answer: ans.shape,
      choices: R.shuffle([...letters.map((l) => map[l]), { shape: shapes[letters.length], color: colors[letters.length] }]).map((s) => ({ value: s.shape, visual: { type: 'shapes', items: [s] } })),
      hint: `The repeating part has ${code.length} shapes. Count on in groups of ${code.length}.`,
      explain: `The pattern repeats every ${code.length} shapes. ${nth} = ${Math.floor((nth - 1) / code.length)} groups of ${code.length} and ${((nth - 1) % code.length) + 1} more, so the ${ORDINAL_WORDS[nth] || `${nth}th`} shape is the same as shape number ${((nth - 1) % code.length) + 1}: the ${NAME[ans.shape] || ans.shape}.`
    };
  }
};

// ================================================================ P3 unit 10 — angles
const POLYS = [
  { name: 'rectangle', pts: [[10, 25], [90, 25], [90, 75], [10, 75]], right: 4 },
  { name: 'square', pts: [[20, 20], [80, 20], [80, 80], [20, 80]], right: 4 },
  { name: 'triangle', pts: [[15, 15], [15, 85], [85, 85]], right: 1 },
  { name: 'shape', pts: [[10, 20], [60, 20], [90, 80], [10, 80]], right: 2 },
  { name: 'shape', pts: [[20, 45], [50, 10], [80, 45], [80, 90], [20, 90]], right: 2 },
  { name: 'shape', pts: [[10, 10], [60, 20], [80, 80], [10, 80]], right: 1 },
  { name: 'triangle', pts: [[50, 10], [90, 85], [10, 85]], right: 0 },
  { name: 'shape', pts: [[30, 20], [95, 20], [70, 80], [5, 80]], right: 0 },
  { name: 'shape', pts: [[10, 10], [90, 10], [90, 50], [50, 50], [50, 90], [10, 90]], right: 5 }
];
const rightAngleWord = (deg) => (deg < 90 ? 'smaller than a right angle' : deg > 90 ? 'greater than a right angle' : 'a right angle');

const angles = {
  id: 'p3.geo.angles',
  level: 'P3',
  strand: 'geometry',
  unit: 10,
  title: 'Angles and right angles',
  vi: 'Góc, góc vuông, so sánh với góc vuông',
  icon: '📐',
  tip: 'Gấp một tờ giấy 2 lần để có "thước góc vuông" (right-angle tester). Cho con đặt vào các góc bàn, sách, cửa để kiểm tra lớn hơn/nhỏ hơn góc vuông.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['right', 'compare', 'vertices'] : tier === 2 ? ['right', 'compare', 'largest', 'count'] : ['count', 'clock', 'turn', 'largest', 'compare']);
    if (form === 'right') {
      const wrong = R.sample([30, 40, 50, 60, 120, 130, 140, 150, 160], 3);
      const list = [90, ...wrong].map((d, i) => ({ value: i === 0 ? 'right' : `a${d}`, visual: { type: 'angle', deg: d, rot: R.pick([0, 15, 30, 60, 90, 120, 180, 200]), mark: 'none', len: 60 } }));
      return {
        prompt: 'Which angle is a **right angle**?',
        input: 'choice',
        answer: 'right',
        choices: visualChoices(R, list),
        hint: 'A right angle looks like the corner of a book or a square. Use the corner of a piece of paper to check.',
        explain: 'The right angle makes a square corner, like the corner of a book. The other angles are smaller or greater than a right angle.'
      };
    }
    if (form === 'compare') {
      const deg = tier === 1 ? R.pick([45, 90, 135, 30, 150]) : R.pick([60, 70, 80, 90, 100, 110, 120, 140]);
      const ans = rightAngleWord(deg);
      return {
        prompt: 'Is this angle **smaller than**, **equal to** or **greater than** a right angle?',
        visuals: [{ type: 'angle', deg, rot: R.pick([0, 20, 45, 90, 160, 200]), mark: 'arc' }],
        input: 'choice',
        answer: ans,
        choices: fixedChoices(['smaller than a right angle', 'a right angle', 'greater than a right angle']),
        hint: 'Imagine a square corner on top of the angle. Is the opening smaller or wider?',
        explain: `This angle is ${ans}.`
      };
    }
    if (form === 'largest') {
      const degs = R.sample([25, 45, 70, 90, 115, 140, 165], 3).sort((a, b) => a - b);
      const askBig = R.chance(0.5);
      const pick = askBig ? degs[2] : degs[0];
      return {
        prompt: `Which angle is the **${askBig ? 'largest' : 'smallest'}**?`,
        input: 'choice',
        answer: `a${pick}`,
        choices: visualChoices(R, degs.map((d) => ({ value: `a${d}`, visual: { type: 'angle', deg: d, rot: R.pick([0, 30, 90, 150, 210]), mark: 'arc', len: 60 } }))),
        hint: 'Look at how wide the opening between the two arms is. The length of the arms does not matter.',
        explain: `The ${askBig ? 'largest' : 'smallest'} angle has the ${askBig ? 'widest' : 'narrowest'} opening between its arms.`
      };
    }
    if (form === 'vertices') {
      const n = R.pick([3, 4, 5, 6]);
      const shape = { 3: 'triangle', 4: R.pick(['square', 'rectangle', 'trapezium', 'diamond']), 5: 'pentagon', 6: 'hexagon' }[n];
      return {
        prompt: 'How many **angles** does this shape have inside it?',
        visuals: [{ type: 'shapes', items: [{ shape, color: R.pick(COLS), size: 1.1 }], px: 130 }],
        input: 'number',
        answer: n,
        hint: 'There is an angle at every corner where two sides meet.',
        explain: `This shape has ${n} corners, so it has ${n} angles.`
      };
    }
    if (form === 'count') {
      const p = R.pick(POLYS);
      return {
        prompt: `How many **right angles** are there inside this ${p.name}?`,
        visuals: [{ type: 'polygon', points: p.pts, grid: true, color: R.pick(COLS) }],
        input: 'number',
        answer: p.right,
        hint: 'Check every corner. Use the grid lines: a right angle is a square corner.',
        explain: `This ${p.name} has ${p.right} right angle${p.right === 1 ? '' : 's'}.`
      };
    }
    if (form === 'clock') {
      const right = R.pick([3, 9]);
      const wrong = R.sample([12, 1, 2, 4, 5, 6, 7, 8, 10, 11], 3);
      return {
        prompt: 'At which time do the hands of the clock make a **right angle**?',
        input: 'choice',
        answer: `${right}:00`,
        choices: visualChoices(R, [right, ...wrong].map((h) => ({ value: `${h}:00`, visual: { type: 'clock', h, m: 0 } }))),
        hint: 'A right angle is a quarter turn. The minute hand points to 12.',
        explain: `At ${right} o'clock the hands make a square corner — a right angle.`
      };
    }
    const turns = [['a quarter turn', 1], ['a half turn', 2], ['three quarter turns', 3], ['a full turn', 4]];
    const [w, n] = R.pick(turns);
    return {
      prompt: `How many right angles make **${w}**?`,
      input: 'number',
      answer: n,
      hint: 'One right angle is a quarter turn. Turn your body and count!',
      explain: `${w.charAt(0).toUpperCase() + w.slice(1)} is ${n} right angle${n === 1 ? '' : 's'}.`
    };
  }
};

// ================================================================ P3 unit 11 — lines
const LINE_FIGS = [
  { name: 'rectangle ABCD', pts: [[10, 25], [90, 25], [90, 75], [10, 75]], labels: ['A', 'B', 'C', 'D'], par: 2, perp: 4, ask: [['parallel', 'AD', 'BC', ['AB', 'CD']], ['parallel', 'AB', 'CD', ['AD', 'BC']]] },
  { name: 'figure ABCD', pts: [[10, 20], [60, 20], [90, 80], [10, 80]], labels: ['A', 'B', 'C', 'D'], par: 1, perp: 2, ask: [['parallel', 'AB', 'CD', ['AD', 'BC']], ['perpendicular', 'BC', null, null]] },
  { name: 'triangle ABC', pts: [[15, 15], [15, 85], [85, 85]], labels: ['A', 'B', 'C'], par: 0, perp: 1, ask: [['perpendicular', 'AB', 'BC', ['AC']], ['perpendicular', 'BC', 'AB', ['AC']]] },
  { name: 'square PQRS', pts: [[20, 20], [80, 20], [80, 80], [20, 80]], labels: ['P', 'Q', 'R', 'S'], par: 2, perp: 4, ask: [['parallel', 'PQ', 'RS', ['PS', 'QR']], ['parallel', 'QR', 'PS', ['PQ', 'RS']]] },
  { name: 'figure ABCDE', pts: [[20, 45], [50, 10], [80, 45], [80, 90], [20, 90]], labels: ['A', 'B', 'C', 'D', 'E'], par: 1, perp: 2, ask: [['parallel', 'AE', 'CD', ['AB', 'DE', 'BC']]] },
  { name: 'figure KLMN', pts: [[30, 20], [95, 20], [70, 80], [5, 80]], labels: ['K', 'L', 'M', 'N'], par: 2, perp: 0, ask: [['parallel', 'KL', 'MN', ['LM', 'KN']], ['parallel', 'LM', 'KN', ['KL', 'MN']]] },
  { name: 'triangle XYZ', pts: [[50, 10], [90, 85], [10, 85]], labels: ['X', 'Y', 'Z'], par: 0, perp: 0, ask: [] }
];
const spell = (s) => s.replace(/\b([A-Z])([A-Z])\b/g, '$1 $2');

const linesSkill = {
  id: 'p3.geo.lines',
  level: 'P3',
  strand: 'geometry',
  unit: 11,
  title: 'Parallel and perpendicular',
  vi: 'Đường thẳng song song và vuông góc',
  icon: '⏸️',
  tip: 'Song song (parallel) = như 2 đường ray tàu, không bao giờ gặp nhau. Vuông góc (perpendicular) = gặp nhau tạo góc vuông, như chữ "L" hoặc "T".',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['classify', 'pickPar', 'pickPerp'] : tier === 2 ? ['classify', 'pickPar', 'pickPerp', 'figure'] : ['figure', 'countPar', 'countPerp', 'classify']);
    const rot = R.pick([0, 15, 30, 45, 60, 90, 120, 150]);
    const neither = () => ({ type: 'lines', kind: 'neither', rot: R.pick([0, 20, 40, 70, 100]), skew: R.pick([30, 40, 55, 125, 140]), touch: R.chance(0.5) });
    if (form === 'classify') {
      const kind = R.pick(['parallel', 'perpendicular', 'neither']);
      const v = kind === 'neither' ? neither() : { type: 'lines', kind, rot, meet: R.pick(['cross', 'T', 'L']) };
      const ans = kind === 'parallel' ? 'Parallel' : kind === 'perpendicular' ? 'Perpendicular' : 'Neither';
      return {
        prompt: 'Are these two lines **parallel**, **perpendicular** or **neither**?',
        visuals: [v],
        input: 'choice',
        answer: ans,
        choices: fixedChoices(['Parallel', 'Perpendicular', 'Neither']),
        hint: 'Parallel lines never meet. Perpendicular lines meet at a right angle.',
        explain: kind === 'parallel' ? 'The lines are always the same distance apart and never meet, so they are parallel.' : kind === 'perpendicular' ? 'The lines meet at a right angle, so they are perpendicular.' : 'The lines are not parallel and they do not meet at a right angle, so they are neither.'
      };
    }
    if (form === 'pickPar' || form === 'pickPerp') {
      const want = form === 'pickPar' ? 'parallel' : 'perpendicular';
      const other = want === 'parallel' ? 'perpendicular' : 'parallel';
      const list = [
        { value: want, visual: { type: 'lines', kind: want, rot, meet: R.pick(['cross', 'T', 'L']) } },
        { value: other, visual: { type: 'lines', kind: other, rot: R.pick([0, 30, 60, 90]), meet: R.pick(['cross', 'T', 'L']) } },
        { value: 'neither1', visual: neither() }
      ];
      if (tier > 1) list.push({ value: 'neither2', visual: neither() });
      return {
        prompt: `Which pair of lines is **${want}**?`,
        input: 'choice',
        answer: want,
        choices: visualChoices(R, list),
        hint: want === 'parallel' ? 'Parallel lines are like train tracks: they never meet.' : 'Perpendicular lines meet at a right angle (a square corner).',
        explain: want === 'parallel' ? 'These two lines never meet and stay the same distance apart, so they are parallel.' : 'These two lines meet at a right angle, so they are perpendicular.'
      };
    }
    if (form === 'countPar' || form === 'countPerp') {
      const f = R.pick(LINE_FIGS);
      const par = form === 'countPar';
      const ans = par ? f.par : f.perp;
      return {
        prompt: `How many pairs of **${par ? 'parallel' : 'perpendicular'}** lines does ${f.name} have?`,
        speak: `How many pairs of ${par ? 'parallel' : 'perpendicular'} lines does ${spell(f.name)} have?`,
        visuals: [{ type: 'polygon', points: f.pts, labels: f.labels, grid: true, color: R.pick(COLS) }],
        input: 'number',
        answer: ans,
        hint: par ? 'Look for sides that go in the same direction and never meet.' : 'Look at each corner. Is it a right angle?',
        explain: `${f.name.charAt(0).toUpperCase() + f.name.slice(1)} has ${ans} pair${ans === 1 ? '' : 's'} of ${par ? 'parallel' : 'perpendicular'} lines.`
      };
    }
    const figs = LINE_FIGS.filter((f) => f.ask.some((a) => a[1] && a[2]));
    const f = R.pick(figs);
    const [kind, ref, ans, wrong] = R.pick(f.ask.filter((a) => a[2]));
    return {
      prompt: `Look at ${f.name}. Which line is **${kind}** to ${ref}?`,
      speak: `Look at ${spell(f.name)}. Which line is ${kind} to ${spell(ref)}?`,
      visuals: [{ type: 'polygon', points: f.pts, labels: f.labels, grid: true, color: R.pick(COLS) }],
      input: 'choice',
      answer: ans,
      choices: R.shuffle([ans, ...wrong]).map((x) => ({ value: x, label: x })),
      hint: kind === 'parallel' ? `Find the side that goes in the same direction as ${ref} and never meets it.` : `Find the side that meets ${ref} at a right angle.`,
      explain: `${ans} is ${kind} to ${ref}.`
    };
  }
};

// ================================================================ P3 unit 12 — area & perimeter
function hasHole(set, rows, cols) {
  const seen = new Set();
  const stack = [[-1, -1]];
  while (stack.length) {
    const [r, c] = stack.pop();
    const k = `${r},${c}`;
    if (seen.has(k) || r < -1 || c < -1 || r > rows || c > cols || set.has(k)) continue;
    seen.add(k);
    stack.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (!set.has(`${r},${c}`) && !seen.has(`${r},${c}`)) return true;
  return false;
}
/** Random connected figure of k unit squares (no holes) inside rows × cols. */
function polyomino(R, k, rows, cols) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const cells = [[R.int(1, rows - 2), R.int(1, cols - 2)]];
    const set = new Set([cells[0].join(',')]);
    let guard = 0;
    while (cells.length < k && guard++ < 600) {
      const [r, c] = R.pick(cells);
      const [dr, dc] = R.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
      const nr = r + dr;
      const nc = c + dc;
      const kk = `${nr},${nc}`;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || set.has(kk)) continue;
      set.add(kk);
      cells.push([nr, nc]);
    }
    if (cells.length === k && !hasHole(set, rows, cols)) return cells;
  }
  const out = [];
  for (let i = 0; i < k; i++) out.push([Math.floor(i / 3), i % 3]);
  return out;
}
function perimeterOf(cells) {
  const set = new Set(cells.map((x) => x.join(',')));
  let p = 0;
  for (const [r, c] of cells) for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!set.has(`${r + dr},${c + dc}`)) p++;
  return p;
}
function rectCells(w, h, r0 = 0, c0 = 0) {
  const out = [];
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) out.push([r0 + r, c0 + c]);
  return out;
}
const say = (s) =>
  s
    .replace(/\b1 cm²/g, '1 square centimetre')
    .replace(/\b1 m²/g, '1 square metre')
    .replace(/(\d+) ?cm²/g, '$1 square centimetres')
    .replace(/(\d+) ?m²/g, '$1 square metres')
    .replace(/cm²/g, 'square centimetres')
    .replace(/m²/g, 'square metres');

const area = {
  id: 'p3.geo.area',
  level: 'P3',
  strand: 'geometry',
  unit: 12,
  title: 'Area',
  vi: 'Diện tích (đếm ô vuông, cm², m²)',
  icon: '🟩',
  tip: 'Diện tích = số ô vuông phủ kín hình. Với hình chữ nhật: area = length × breadth. Nhắc con ghi đơn vị cm² hoặc m² (không phải cm).',
  gen(R, tier) {
    const unit = tier === 3 && R.chance(0.5) ? 'm' : 'cm';
    const sq = `${unit}²`;
    const form = R.pick(tier === 1 ? ['gridRect', 'gridFig', 'gridFig'] : tier === 2 ? ['gridFig', 'compare', 'rect'] : ['rect', 'square', 'missing', 'story', 'compare']);
    if (form === 'gridRect' || form === 'gridFig') {
      const rows = 6;
      const cols = 9;
      let cells;
      if (form === 'gridRect') {
        const w = R.int(2, 6);
        const h = R.int(2, 4);
        cells = rectCells(w, h, R.int(0, rows - h), R.int(0, cols - w));
      } else cells = polyomino(R, tier === 1 ? R.int(5, 9) : R.int(8, 14), rows, cols);
      const n = cells.length;
      const prompt = `Each small square is 1 ${sq}. What is the **area** of the shaded figure?`;
      return {
        prompt,
        speak: say(prompt),
        visuals: [{ type: 'gridshape', rows, cols, cells, color: R.pick(COLS) }],
        input: 'number',
        answer: n,
        unit: { post: sq },
        hint: 'Count the shaded squares. Mark each one as you count.',
        explain: `There are ${n} shaded squares, so the area is ${n} ${sq}.`
      };
    }
    if (form === 'compare') {
      const labels = ['A', 'B', 'C'];
      let areas;
      let figs;
      let g = 0;
      do {
        figs = labels.map((l, i) => ({ cells: polyomino(R, R.int(5, 11), 6, 4).map(([r, c]) => [r, c + i * 5]), color: COLS[(i * 3) % COLS.length], label: l }));
        areas = figs.map((f) => f.cells.length);
      } while (new Set(areas).size < 3 && g++ < 30);
      if (new Set(areas).size < 3) {
        figs = labels.map((l, i) => ({ cells: rectCells(2, 2 + i, 0, i * 5), color: COLS[i], label: l }));
        areas = figs.map((f) => f.cells.length);
      }
      const askBig = R.chance(0.5);
      const target = askBig ? Math.max(...areas) : Math.min(...areas);
      const ans = labels[areas.indexOf(target)];
      return {
        prompt: `Which figure has the **${askBig ? 'largest' : 'smallest'}** area?`,
        visuals: [{ type: 'gridshape', rows: 6, cols: 14, figures: figs, cell: 22 }],
        input: 'choice',
        answer: ans,
        choices: fixedChoices(labels),
        hint: 'Count the squares in each figure.',
        explain: `Figure A has ${areas[0]} squares, B has ${areas[1]} and C has ${areas[2]}. Figure ${ans} has the ${askBig ? 'largest' : 'smallest'} area.`
      };
    }
    if (form === 'rect' || form === 'square') {
      const isSq = form === 'square';
      const l = isSq ? R.int(3, 10) : R.int(tier === 3 ? 6 : 3, tier === 3 ? 12 : 9);
      const b = isSq ? l : R.intExcept(2, Math.min(9, l), [l]);
      const prompt = isSq
        ? `A square has sides of ${l} ${unit}. What is its **area**?`
        : `The rectangle is ${l} ${unit} long and ${b} ${unit} wide. What is its **area**?`;
      return {
        prompt,
        speak: say(prompt),
        visuals: [{ type: 'rectdim', w: l, h: b, top: `${l} ${unit}`, left: `${b} ${unit}`, grid: tier < 3, color: R.pick(COLS) }],
        input: 'number',
        answer: l * b,
        unit: { post: sq },
        hint: 'Area of a rectangle = length × breadth.',
        explain: `Area = ${l} ${unit} × ${b} ${unit} = ${l * b} ${sq}.`
      };
    }
    if (form === 'missing') {
      const l = R.int(4, 12);
      const b = R.int(2, 9);
      const A = l * b;
      const prompt = `The area of a rectangle is ${A} ${sq}. Its length is ${l} ${unit}. What is its breadth?`;
      return {
        prompt,
        speak: say(prompt),
        visuals: [{ type: 'rectdim', w: l, h: b, top: `${l} ${unit}`, left: '?', color: R.pick(COLS) }],
        input: 'number',
        answer: b,
        unit: { post: unit },
        hint: `Length × breadth = area. ${l} × ? = ${A}.`,
        explain: `${l} × ${b} = ${A}, so the breadth is ${A} ÷ ${l} = ${b} ${unit}.`
      };
    }
    const [p] = people(R, 1);
    const l = R.int(3, 9);
    const b = R.int(2, 6);
    const ctx = R.pick([
      `${p.name} covers a rectangular board ${l} cm long and ${b} cm wide with square stickers. Each sticker is 1 cm by 1 cm. How many stickers does ${p.he} need?`,
      `A rectangular garden is ${l} m long and ${b} m wide. What is the area of the garden?`,
      `${p.name} wants to tile a rectangular floor ${l} m long and ${b} m wide. Each square tile is 1 m by 1 m. How many tiles does ${p.he} need?`
    ]);
    const isArea = ctx.includes('area of');
    return {
      prompt: ctx,
      speak: say(ctx),
      visuals: [],
      input: 'number',
      answer: l * b,
      unit: isArea ? { post: 'm²' } : undefined,
      hint: 'Draw the rectangle. How many squares fit along the length? How many rows are there?',
      explain: `${l} × ${b} = ${l * b}. ${isArea ? `The area is ${l * b} m².` : `${l * b} squares are needed.`}`
    };
  }
};

const perimeter = {
  id: 'p3.geo.perimeter',
  level: 'P3',
  strand: 'geometry',
  unit: 12,
  title: 'Perimeter',
  vi: 'Chu vi (đếm cạnh ô, hình chữ nhật, hình vuông)',
  icon: '🔲',
  tip: 'Chu vi (perimeter) = tổng độ dài đường bao quanh hình. Cho con dùng ngón tay đi một vòng quanh hình và đếm. Phân biệt rõ với diện tích (area).',
  gen(R, tier) {
    const unit = R.pick(['cm', 'm']);
    const form = R.pick(tier === 1 ? ['gridRect', 'sides', 'gridFig'] : tier === 2 ? ['gridFig', 'rect', 'square', 'sides'] : ['missing', 'story', 'compare', 'rect']);
    if (form === 'gridRect' || form === 'gridFig') {
      const rows = 6;
      const cols = 9;
      const cells = form === 'gridRect' ? (() => {
        const w = R.int(2, 6);
        const h = R.int(1, 4);
        return rectCells(w, h, R.int(0, rows - h), R.int(0, cols - w));
      })() : polyomino(R, tier === 1 ? R.int(4, 7) : R.int(6, 12), rows, cols);
      const P = perimeterOf(cells);
      return {
        prompt: 'Each side of a small square is 1 cm. What is the **perimeter** of the shaded figure?',
        visuals: [{ type: 'gridshape', rows, cols, cells, color: R.pick(COLS) }],
        input: 'number',
        answer: P,
        unit: { post: 'cm' },
        hint: 'Go around the outside of the figure and count every side of 1 cm. Do not count the inside lines.',
        explain: `Going around the figure, there are ${P} sides of 1 cm. The perimeter is ${P} cm.`
      };
    }
    if (form === 'sides') {
      const n = R.pick([3, 4, 5]);
      const lens = Array.from({ length: n }, () => R.int(2, 12));
      const pts = { 3: [[50, 8], [92, 88], [8, 80]], 4: [[12, 18], [80, 10], [90, 85], [6, 75]], 5: [[50, 6], [94, 38], [78, 92], [22, 92], [6, 38]] }[n];
      const P = lens.reduce((a, b) => a + b, 0);
      return {
        prompt: 'What is the **perimeter** of this figure?',
        visuals: [{ type: 'polygon', points: pts, sideLabels: lens.map((x) => `${x} ${unit}`), color: R.pick(COLS) }],
        input: 'number',
        answer: P,
        unit: { post: unit },
        hint: 'Add up the lengths of all the sides.',
        explain: `${lens.join(' + ')} = ${P}. The perimeter is ${P} ${unit}.`
      };
    }
    if (form === 'rect' || form === 'square') {
      const isSq = form === 'square';
      const l = R.int(3, tier === 3 ? 25 : 12);
      const b = isSq ? l : R.intExcept(2, Math.max(3, l - 1), [l]);
      const P = 2 * (l + b);
      return {
        prompt: isSq ? `A square has sides of ${l} ${unit}. What is its **perimeter**?` : `A rectangle is ${l} ${unit} long and ${b} ${unit} wide. What is its **perimeter**?`,
        visuals: [{ type: 'rectdim', w: l, h: b, top: `${l} ${unit}`, left: `${b} ${unit}`, color: R.pick(COLS) }],
        input: 'number',
        answer: P,
        unit: { post: unit },
        hint: isSq ? 'A square has 4 equal sides.' : 'A rectangle has 2 lengths and 2 breadths.',
        explain: isSq ? `4 × ${l} = ${P}. The perimeter is ${P} ${unit}.` : `${l} + ${b} + ${l} + ${b} = ${P}. The perimeter is ${P} ${unit}.`
      };
    }
    if (form === 'missing') {
      if (R.chance(0.5)) {
        const s = R.int(3, 15);
        return {
          prompt: `The perimeter of a square is ${4 * s} ${unit}. What is the length of one side?`,
          visuals: [{ type: 'rectdim', w: 4, h: 4, top: '?', color: R.pick(COLS) }],
          input: 'number',
          answer: s,
          unit: { post: unit },
          hint: 'A square has 4 equal sides. Share the perimeter equally among 4 sides.',
          explain: `${4 * s} ÷ 4 = ${s}. Each side is ${s} ${unit}.`
        };
      }
      const l = R.int(5, 15);
      const b = R.int(2, l - 1);
      const P = 2 * (l + b);
      return {
        prompt: `The perimeter of a rectangle is ${P} ${unit}. Its length is ${l} ${unit}. What is its breadth?`,
        visuals: [{ type: 'rectdim', w: l, h: b, top: `${l} ${unit}`, left: '?', color: R.pick(COLS) }],
        input: 'number',
        answer: b,
        unit: { post: unit },
        hint: `Length + breadth is half of the perimeter: ${P} ÷ 2 = ${P / 2}.`,
        explain: `${P} ÷ 2 = ${P / 2}. ${P / 2} − ${l} = ${b}. The breadth is ${b} ${unit}.`
      };
    }
    if (form === 'compare') {
      let a;
      let b;
      let g = 0;
      do {
        const k = R.int(5, 8);
        a = polyomino(R, k, 6, 5);
        b = polyomino(R, k, 6, 5).map(([r, c]) => [r, c + 6]);
      } while (perimeterOf(a) === perimeterOf(b) && g++ < 30);
      if (perimeterOf(a) === perimeterOf(b)) {
        a = rectCells(3, 2);
        b = rectCells(6, 1, 0, 6);
      }
      const pa = perimeterOf(a);
      const pb = perimeterOf(b);
      const askLong = R.chance(0.5);
      const ans = (askLong ? pa > pb : pa < pb) ? 'A' : 'B';
      return {
        prompt: `Each side of a small square is 1 cm. Which figure has the **${askLong ? 'longer' : 'shorter'}** perimeter?`,
        visuals: [{ type: 'gridshape', rows: 6, cols: 11, figures: [{ cells: a, color: 'blue', label: 'A' }, { cells: b, color: 'orange', label: 'B' }], cell: 24 }],
        input: 'choice',
        answer: ans,
        choices: fixedChoices(['A', 'B']),
        hint: 'Count the 1-cm sides around the outside of each figure.',
        explain: `Figure A has a perimeter of ${pa} cm and Figure B has ${pb} cm. Figure ${ans} has the ${askLong ? 'longer' : 'shorter'} perimeter.`
      };
    }
    const [p] = people(R, 1);
    const l = R.int(6, 30);
    const b = R.int(3, l - 1);
    const sqr = R.chance(0.35);
    const P = sqr ? 4 * l : 2 * (l + b);
    const prompt = sqr
      ? `${p.name} walks once around a square field. Each side of the field is ${l} m. How far does ${p.he} walk?`
      : R.pick([
          `A rectangular garden is ${l} m long and ${b} m wide. How many metres of fencing are needed to go around it?`,
          `${p.name} sticks ribbon around the edge of a rectangular card ${l} cm long and ${b} cm wide. How much ribbon does ${p.he} need?`
        ]);
    const u = prompt.includes(' cm ') ? 'cm' : 'm';
    return {
      prompt,
      input: 'number',
      answer: P,
      unit: { post: u },
      hint: 'Going all the way around is the perimeter. Add up all the sides.',
      explain: sqr ? `4 × ${l} = ${P}. ${p.He} walks ${P} m.` : `${l} + ${b} + ${l} + ${b} = ${P}. The answer is ${P} ${u}.`
    };
  }
};

export const SKILLS = [shapes2d, shapePictures, p1Patterns, combineShapes, sidesCorners, solids3d, p2Patterns, angles, linesSkill, area, perimeter];
