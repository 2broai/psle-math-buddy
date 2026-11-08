// Data — P1 unit 10 (picture graphs, scale 1; collecting and sorting data),
// P2 unit 8 (picture graphs with scales; missing data) and P3 unit 7 (bar graphs).
import { NAMES, numChoices, fixedChoices, visualChoices } from '../helpers.js';

// ---------------------------------------------------------------- picture-graph data sets
// Each category: { label (row label / answer choice), q (words used inside questions), icon }.
const childSet = (title, kind, cats) => ({
  title,
  icon: '🙂',
  unit: 'child',
  units: 'children',
  cats,
  count: (c) => `How many children chose **${c.q}**?`,
  extreme: (w) => `Which ${kind} did the **${w}** children choose?`,
  more: (a, b) => `How many **more** children chose ${a.q} than ${b.q}?`,
  fewer: (a, b) => `How many **fewer** children chose ${a.q} than ${b.q}?`,
  both: (a, b) => `How many children chose ${a.q} or ${b.q}?`,
  total: 'How many children are there **in all**?',
  fact: (c, v) => `${v} ${v === 1 ? 'child' : 'children'} chose ${c.q}`,
  moreFact: (a, b, n) => `${n} more children chose ${a.q} than ${b.q}.`
});
const PG_SETS = [
  childSet('Favourite fruits of Class 1A', 'fruit', [
    { label: 'Apple', q: 'apples', icon: '🍎' }, { label: 'Banana', q: 'bananas', icon: '🍌' }, { label: 'Mango', q: 'mangoes', icon: '🥭' },
    { label: 'Grapes', q: 'grapes', icon: '🍇' }, { label: 'Orange', q: 'oranges', icon: '🍊' }, { label: 'Pear', q: 'pears', icon: '🍐' }
  ]),
  childSet('Favourite pets of Class 1B', 'pet', [
    { label: 'Cat', q: 'cats', icon: '🐱' }, { label: 'Dog', q: 'dogs', icon: '🐶' }, { label: 'Rabbit', q: 'rabbits', icon: '🐰' },
    { label: 'Fish', q: 'fish', icon: '🐟' }, { label: 'Hamster', q: 'hamsters', icon: '🐹' }, { label: 'Bird', q: 'birds', icon: '🐦' }
  ]),
  childSet('Favourite drinks at recess', 'drink', [
    { label: 'Milo', q: 'Milo', icon: '🥤' }, { label: 'Juice', q: 'juice', icon: '🧃' }, { label: 'Milk', q: 'milk', icon: '🥛' },
    { label: 'Water', q: 'water', icon: '💧' }, { label: 'Tea', q: 'tea', icon: '🍵' }
  ]),
  childSet('Favourite ice cream flavours', 'flavour', [
    { label: 'Chocolate', q: 'chocolate', icon: '🍫' }, { label: 'Vanilla', q: 'vanilla', icon: '🍦' }, { label: 'Strawberry', q: 'strawberry', icon: '🍓' },
    { label: 'Durian', q: 'durian', icon: '🌰' }, { label: 'Mango', q: 'mango', icon: '🥭' }
  ]),
  {
    title: 'How the children in Class 2C go to school',
    icon: '🙂',
    unit: 'child',
    units: 'children',
    cats: [
      { label: 'Bus', q: 'go to school by bus', icon: '🚌' }, { label: 'MRT', q: 'go to school by MRT', icon: '🚇' },
      { label: 'Car', q: 'go to school by car', icon: '🚗' }, { label: 'Walk', q: 'walk to school', icon: '🚶' },
      { label: 'Bicycle', q: 'cycle to school', icon: '🚲' }
    ],
    count: (c) => `How many children **${c.q}**?`,
    extreme: (w) => `Which way of getting to school do the **${w}** children use?`,
    more: (a, b) => `How many **more** children ${a.q} than ${b.q}?`,
    fewer: (a, b) => `How many **fewer** children ${a.q} than ${b.q}?`,
    both: (a, b) => `How many children ${a.q} or ${b.q}?`,
    total: 'How many children are there in Class 2C?',
    fact: (c, v) => `${v} ${v === 1 ? 'child' : 'children'} ${c.q}`,
    moreFact: (a, b, n) => `${n} more children ${a.q} than ${b.q}.`
  },
  {
    title: 'Animals on a farm',
    icon: '🐾',
    unit: 'animal',
    units: 'animals',
    cats: [
      { label: 'Cows', q: 'cows', icon: '🐄' }, { label: 'Goats', q: 'goats', icon: '🐐' }, { label: 'Ducks', q: 'ducks', icon: '🦆' },
      { label: 'Hens', q: 'hens', icon: '🐔' }, { label: 'Pigs', q: 'pigs', icon: '🐖' }
    ],
    count: (c) => `How many **${c.q}** are there on the farm?`,
    extreme: (w) => `Which animal does the farm have the **${w}** of?`,
    more: (a, b) => `How many **more** ${a.q} than ${b.q} are there?`,
    fewer: (a, b) => `How many **fewer** ${a.q} than ${b.q} are there?`,
    both: (a, b) => `How many ${a.q} and ${b.q} are there **altogether**?`,
    total: 'How many animals are there on the farm **in all**?',
    fact: (c, v) => `there ${v === 1 ? 'is' : 'are'} ${v} ${c.q}`,
    moreFact: (a, b, n) => `There are ${n} more ${a.q} than ${b.q}.`
  },
  {
    title: 'Stickers collected by some children',
    icon: '⭐',
    unit: 'sticker',
    units: 'stickers',
    names: true,
    count: (c) => `How many stickers does **${c.q}** have?`,
    extreme: (w) => `Who has the **${w}** stickers?`,
    more: (a, b) => `How many **more** stickers does ${a.q} have than ${b.q}?`,
    fewer: (a, b) => `How many **fewer** stickers does ${a.q} have than ${b.q}?`,
    both: (a, b) => `How many stickers do ${a.q} and ${b.q} have **altogether**?`,
    total: 'How many stickers do the children have **in all**?',
    fact: (c, v) => `${c.q} has ${v} sticker${v === 1 ? '' : 's'}`,
    moreFact: (a, b, n) => `${a.q} has ${n} more stickers than ${b.q}.`
  },
  {
    title: 'Books read in the holidays',
    icon: '📘',
    unit: 'book',
    units: 'books',
    names: true,
    count: (c) => `How many books did **${c.q}** read?`,
    extreme: (w) => `Who read the **${w}** books?`,
    more: (a, b) => `How many **more** books did ${a.q} read than ${b.q}?`,
    fewer: (a, b) => `How many **fewer** books did ${a.q} read than ${b.q}?`,
    both: (a, b) => `How many books did ${a.q} and ${b.q} read **altogether**?`,
    total: 'How many books did the children read **in all**?',
    fact: (c, v) => `${c.q} read ${v} book${v === 1 ? '' : 's'}`,
    moreFact: (a, b, n) => `${a.q} read ${n} more books than ${b.q}.`
  },
  {
    title: 'Cupcakes sold at a bake sale',
    icon: '🧁',
    unit: 'cupcake',
    units: 'cupcakes',
    cats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((d) => ({ label: d, q: d })),
    ordered: true,
    count: (c) => `How many cupcakes were sold on **${c.q}**?`,
    extreme: (w) => `On which day were the **${w}** cupcakes sold?`,
    more: (a, b) => `How many **more** cupcakes were sold on ${a.q} than on ${b.q}?`,
    fewer: (a, b) => `How many **fewer** cupcakes were sold on ${a.q} than on ${b.q}?`,
    both: (a, b) => `How many cupcakes were sold on ${a.q} and ${b.q} **altogether**?`,
    total: 'How many cupcakes were sold **in all**?',
    fact: (c, v) => `${v} cupcake${v === 1 ? ' was' : 's were'} sold on ${c.q}`,
    moreFact: (a, b, n) => `${n} more cupcakes were sold on ${a.q} than on ${b.q}.`
  }
];

/** Pick k categories for a set (names are drawn fresh each time). */
function pickCats(R, set, k) {
  if (set.names) return R.sample(NAMES, k).map(([n]) => ({ label: n, q: n }));
  if (set.ordered) {
    const start = R.int(0, set.cats.length - k);
    return set.cats.slice(start, start + k);
  }
  return R.sample(set.cats, k);
}

/** n icons for each category; distinct=true makes all counts different (unique most/fewest). */
function iconCounts(R, k, lo, hi, distinct) {
  if (distinct && hi - lo + 1 >= k) return R.distinctInts(k, lo, hi);
  return Array.from({ length: k }, () => R.int(lo, hi));
}

function pgVisual(set, cats, icons, scale, rowIcons) {
  return {
    type: 'picgraph',
    title: set.title,
    rows: cats.map((c, i) => (rowIcons && c.icon ? { label: c.label, n: icons[i], icon: c.icon } : { label: c.label, n: icons[i] })),
    icon: set.icon,
    scale,
    unit: set.unit,
    units: set.units,
    key: !(rowIcons && cats.every((c) => c.icon))
  };
}

/** Questions on a picture graph. vals = real values (icons × scale). */
function pgQuestion(R, set, cats, icons, scale, form, visual) {
  const vals = icons.map((n) => n * scale);
  const k = cats.length;
  const keyNote = scale > 1 ? ` Each ${set.icon} stands for ${scale}.` : '';
  const readHow = (i) => (scale > 1 ? `${icons[i]} × ${scale} = ${vals[i]}` : `There are ${vals[i]} pictures`);
  const unique = (arr, v) => arr.filter((x) => x === v).length === 1;
  let f = form;
  const maxV = Math.max(...vals);
  const minV = Math.min(...vals);
  if (f === 'extreme' && !(unique(vals, maxV) && unique(vals, minV))) f = 'count';
  if ((f === 'more' || f === 'fewer') && new Set(vals).size < 2) f = 'both';
  if (f === 'extreme') {
    const most = R.chance(0.5);
    const i = vals.indexOf(most ? maxV : minV);
    return {
      prompt: set.extreme(most ? 'most' : 'fewest'),
      visuals: [visual],
      input: 'choice',
      answer: cats[i].label,
      choices: fixedChoices(cats.map((c) => c.label)),
      hint: `Look for the row with the ${most ? 'most' : 'fewest'} pictures.`,
      explain: `The row for ${cats[i].label} has the ${most ? 'most' : 'fewest'} pictures (${icons[i]}). So the answer is ${cats[i].label}.`
    };
  }
  if (f === 'more' || f === 'fewer') {
    let a;
    let b;
    let g = 0;
    do {
      [a, b] = R.sample([...Array(k).keys()], 2);
    } while (vals[a] === vals[b] && g++ < 30);
    if (vals[a] === vals[b]) f = 'both';
    else {
      const [hi, lo] = vals[a] > vals[b] ? [a, b] : [b, a];
      const ask = f === 'more' ? set.more(cats[hi], cats[lo]) : set.fewer(cats[lo], cats[hi]);
      const diff = vals[hi] - vals[lo];
      return {
        prompt: ask,
        visuals: [visual],
        input: 'number',
        answer: diff,
        hint: `Find the two rows. Count each row, then subtract.${keyNote}`,
        explain: `${cats[hi].label}: ${vals[hi]}. ${cats[lo].label}: ${vals[lo]}. ${vals[hi]} − ${vals[lo]} = ${diff}.`
      };
    }
  }
  if (f === 'both') {
    const [a, b] = R.sample([...Array(k).keys()], 2);
    return {
      prompt: set.both(cats[a], cats[b]),
      visuals: [visual],
      input: 'number',
      answer: vals[a] + vals[b],
      hint: `Count the two rows, then add.${keyNote}`,
      explain: `${cats[a].label}: ${vals[a]}. ${cats[b].label}: ${vals[b]}. ${vals[a]} + ${vals[b]} = ${vals[a] + vals[b]}.`
    };
  }
  if (f === 'total') {
    const sum = vals.reduce((x, y) => x + y, 0);
    return {
      prompt: set.total,
      visuals: [visual],
      input: 'number',
      answer: sum,
      hint: `Find the number for every row, then add them all.${keyNote}`,
      explain: `${vals.join(' + ')} = ${sum}.`
    };
  }
  const i = R.int(0, k - 1);
  return {
    prompt: set.count(cats[i]),
    visuals: [visual],
    input: 'number',
    answer: vals[i],
    hint: scale > 1 ? `Count the pictures in the row for ${cats[i].label}. Each ${set.icon} stands for ${scale}.` : `Count the pictures in the row for ${cats[i].label}.`,
    explain: `${readHow(i)}. So ${set.fact(cats[i], vals[i])}.`
  };
}

// ================================================================ P1 unit 10
const p1PicGraph = {
  id: 'p1.data.picgraph',
  level: 'P1',
  strand: 'data',
  unit: 10,
  title: 'Picture graphs',
  vi: 'Đọc biểu đồ tranh (mỗi hình = 1)',
  icon: '📊',
  tip: 'Dạy con thói quen viết số đếm được ở cuối mỗi hàng trước khi trả lời. Phân biệt "how many more" (trừ) với "altogether / in all" (cộng).',
  gen(R, tier) {
    const set = R.pick(PG_SETS);
    const k = tier === 1 ? 3 : tier === 2 ? 4 : R.int(4, 5);
    const cats = pickCats(R, set, k);
    const form = R.pick(tier === 1 ? ['count', 'extreme', 'count', 'total'] : tier === 2 ? ['count', 'extreme', 'more', 'both'] : ['more', 'fewer', 'total', 'both', 'extreme']);
    const [lo, hi] = tier === 1 ? [1, 6] : tier === 2 ? [2, 8] : [3, 10];
    const icons = iconCounts(R, k, lo, hi, form === 'extreme' || R.chance(0.6));
    const visual = pgVisual(set, cats, icons, 1, R.chance(0.6));
    return pgQuestion(R, set, cats, icons, 1, form, visual);
  }
};

const COLLECT_THEMES = [
  [['apple', 'apples', '🍎'], ['banana', 'bananas', '🍌'], ['strawberry', 'strawberries', '🍓'], ['pear', 'pears', '🍐'], ['cherry', 'cherries', '🍒']],
  [['cat', 'cats', '🐱'], ['dog', 'dogs', '🐶'], ['rabbit', 'rabbits', '🐰'], ['frog', 'frogs', '🐸'], ['duck', 'ducks', '🦆']],
  [['ball', 'balls', '⚽'], ['kite', 'kites', '🪁'], ['teddy bear', 'teddy bears', '🧸'], ['robot', 'robots', '🤖'], ['balloon', 'balloons', '🎈']],
  [['car', 'cars', '🚗'], ['bus', 'buses', '🚌'], ['bicycle', 'bicycles', '🚲'], ['boat', 'boats', '⛵'], ['train', 'trains', '🚂']]
];
const p1Collect = {
  id: 'p1.data.collect',
  level: 'P1',
  strand: 'data',
  unit: 10,
  title: 'Sort, count and graph',
  vi: 'Phân loại, đếm và lập biểu đồ tranh',
  icon: '🗂️',
  tip: 'Đổ một nắm đồ chơi/kẹo nhiều loại ra bàn, cho con xếp thành từng hàng theo loại rồi đếm — đó chính là biểu đồ tranh (picture graph) bằng đồ thật.',
  gen(R, tier) {
    const theme = R.pick(COLLECT_THEMES);
    const kinds = R.sample(theme, 3);
    const counts = R.distinctInts(3, tier === 1 ? 1 : 2, tier === 1 ? 5 : tier === 2 ? 6 : 7);
    const row = R.shuffle(kinds.flatMap((kd, i) => Array(counts[i]).fill(kd[2])));
    const visual = { type: 'sequence', items: row };
    const form = R.pick(tier === 1 ? ['count', 'extreme', 'count'] : tier === 2 ? ['count', 'graph', 'more', 'extreme'] : ['graph', 'more', 'total', 'graph']);
    if (form === 'graph') {
      const good = counts.slice();
      const bad1 = counts.slice();
      const j = R.int(0, 2);
      bad1[j] = bad1[j] + (bad1[j] > 1 && R.chance(0.5) ? -1 : 1);
      const bad2 = [counts[1], counts[0], counts[2]];
      const mk = (cs) => ({ type: 'picgraph', rows: kinds.map((kd, i) => ({ label: kd[1].charAt(0).toUpperCase() + kd[1].slice(1), n: cs[i], icon: kd[2] })), key: false });
      return {
        prompt: 'Count the pictures. Which picture graph shows them correctly?',
        visuals: [visual],
        input: 'choice',
        answer: 'right',
        choices: visualChoices(R, [{ value: 'right', visual: mk(good) }, { value: 'wrongA', visual: mk(bad1) }, { value: 'wrongB', visual: mk(bad2) }]),
        hint: 'Count each kind of picture first. Then check every row of each graph.',
        explain: `There are ${kinds.map((kd, i) => `${counts[i]} ${counts[i] === 1 ? kd[0] : kd[1]}`).join(', ')}. The right graph has these numbers in its rows.`
      };
    }
    if (form === 'extreme') {
      const most = R.chance(0.5);
      const i = counts.indexOf(most ? Math.max(...counts) : Math.min(...counts));
      return {
        prompt: `Which picture is there the **${most ? 'most' : 'fewest'}** of?`,
        visuals: [visual],
        input: 'choice',
        answer: kinds[i][2],
        choices: kinds.map((kd) => ({ value: kd[2], label: `${kd[2]} ${kd[1]}` })),
        hint: 'Count each kind of picture. Mark them as you count.',
        explain: `There are ${kinds.map((kd, j) => `${counts[j]} ${counts[j] === 1 ? kd[0] : kd[1]}`).join(', ')}. There are the ${most ? 'most' : 'fewest'} ${kinds[i][1]}.`
      };
    }
    if (form === 'more') {
      const [a, b] = R.sample([0, 1, 2], 2);
      const [hi, lo] = counts[a] > counts[b] ? [a, b] : [b, a];
      return {
        prompt: `How many **more** ${kinds[hi][1]} than ${kinds[lo][1]} are there?`,
        visuals: [visual],
        input: 'number',
        answer: counts[hi] - counts[lo],
        hint: `Count the ${kinds[hi][1]} and the ${kinds[lo][1]}. Then subtract.`,
        explain: `${counts[hi]} ${kinds[hi][1]} − ${counts[lo]} ${kinds[lo][1]} = ${counts[hi] - counts[lo]}.`
      };
    }
    if (form === 'total') {
      const sum = counts.reduce((x, y) => x + y, 0);
      return {
        prompt: 'How many pictures are there **in all**?',
        visuals: [visual],
        input: 'number',
        answer: sum,
        hint: 'Count each kind, then add the three numbers.',
        explain: `${counts.join(' + ')} = ${sum}.`
      };
    }
    const i = R.int(0, 2);
    return {
      prompt: `How many **${kinds[i][1]}** are there?`,
      visuals: [visual],
      input: 'number',
      answer: counts[i],
      hint: `Touch each ${kinds[i][0]} as you count. Skip the other pictures.`,
      explain: `There ${counts[i] === 1 ? `is 1 ${kinds[i][0]}` : `are ${counts[i]} ${kinds[i][1]}`}.`
    };
  }
};

// ================================================================ P2 unit 8
const p2Scale = {
  id: 'p2.data.scale',
  level: 'P2',
  strand: 'data',
  unit: 8,
  title: 'Picture graphs with scales',
  vi: 'Biểu đồ tranh có tỉ lệ (mỗi hình = 2, 5, 10)',
  icon: '📈',
  tip: 'Luôn đọc "key" trước: "Each 🙂 stands for 5 children". Nhắc con nhân số hình với 5 (đếm nhảy 5, 10, 15…) chứ không đếm số hình.',
  gen(R, tier) {
    const set = R.pick(PG_SETS);
    const scale = tier === 1 ? 2 : tier === 2 ? R.pick([2, 5]) : R.pick([5, 10]);
    const k = tier === 1 ? 3 : 4;
    const cats = pickCats(R, set, k);
    const form = R.pick(tier === 1 ? ['count', 'count', 'extreme', 'both'] : tier === 2 ? ['count', 'more', 'both', 'total', 'extreme'] : ['more', 'fewer', 'total', 'icons', 'count']);
    const icons = iconCounts(R, k, 1, tier === 3 ? 8 : 6, form === 'extreme' || R.chance(0.6));
    const visual = pgVisual(set, cats, icons, scale, false);
    if (form === 'icons') {
      const target = scale * R.int(2, 9);
      return {
        prompt: `Look at the key of the picture graph. How many ${set.icon} are needed to show **${target} ${set.units}**?`,
        visuals: [visual],
        input: 'number',
        answer: target / scale,
        hint: `Each ${set.icon} stands for ${scale}. Count in ${scale}s until you reach ${target}.`,
        explain: `${target} ÷ ${scale} = ${target / scale}. ${target / scale} ${set.icon} are needed.`
      };
    }
    return pgQuestion(R, set, cats, icons, scale, form, visual);
  }
};

const p2Missing = {
  id: 'p2.data.missing',
  level: 'P2',
  strand: 'data',
  unit: 8,
  title: 'Picture graph puzzles',
  vi: 'Biểu đồ tranh: tìm dữ liệu còn thiếu, tìm tỉ lệ',
  icon: '🧩',
  tip: 'Dạng bài suy luận: biết tổng → tìm hàng bị thiếu; biết một hàng → tìm mỗi hình bằng bao nhiêu. Khuyến khích con viết phép tính ra giấy.',
  gen(R, tier) {
    const set = R.pick(PG_SETS);
    const scale = tier === 1 ? 2 : R.pick(tier === 2 ? [2, 5] : [5, 10]);
    const k = tier === 1 ? 3 : 4;
    const cats = pickCats(R, set, k);
    const icons = iconCounts(R, k, 1, 6, true);
    const vals = icons.map((n) => n * scale);
    const form = R.pick(tier === 1 ? ['missingRow', 'moreThan'] : tier === 2 ? ['missingRow', 'findScale', 'moreThan'] : ['findScale', 'twoStep', 'missingRow']);
    const m = R.int(0, k - 1);
    if (form === 'missingRow') {
      const shown = icons.map((n, i) => (i === m ? 0 : n));
      const total = vals.reduce((a, b) => a + b, 0);
      const visual = pgVisual(set, cats, shown, scale, false);
      visual.rows[m] = { label: `${cats[m].label} (?)`, n: 0 };
      const askIcons = R.chance(0.5);
      return {
        prompt: `The picture graph shows ${total} ${set.units} in all. The row for **${cats[m].label}** is empty. ${askIcons ? `How many ${set.icon} should be drawn in that row?` : `How many ${set.units} are there for ${cats[m].label}?`}`,
        visuals: [visual],
        input: 'number',
        answer: askIcons ? icons[m] : vals[m],
        hint: `Find the total of the rows you can see. Then subtract it from ${total}.`,
        explain: `The other rows show ${vals.filter((_, i) => i !== m).join(' + ')} = ${total - vals[m]}. ${total} − ${total - vals[m]} = ${vals[m]}${askIcons ? `. ${vals[m]} ÷ ${scale} = ${icons[m]} pictures` : ''}.`
      };
    }
    if (form === 'findScale' || form === 'twoStep') {
      const visual = pgVisual(set, cats, icons, scale, false);
      visual.key = false;
      const other = (m + 1) % k;
      const twoStep = form === 'twoStep';
      return {
        prompt: twoStep
          ? `Each ${set.icon} stands for the same number of ${set.units}. The row for ${cats[m].label} stands for ${vals[m]} ${set.units}. How many ${set.units} are there for **${cats[other].label}**?`
          : `Each ${set.icon} stands for the same number of ${set.units}. The row for ${cats[m].label} stands for ${vals[m]} ${set.units}. How many ${set.units} does each ${set.icon} stand for?`,
        visuals: [visual],
        input: 'number',
        answer: twoStep ? vals[other] : scale,
        hint: `There ${icons[m] === 1 ? 'is 1 picture' : `are ${icons[m]} pictures`} for ${cats[m].label}. ${icons[m]} × ? = ${vals[m]}.`,
        explain: `${vals[m]} ÷ ${icons[m]} = ${scale}, so each ${set.icon} stands for ${scale}.${twoStep ? ` ${cats[other].label} has ${icons[other]} pictures: ${icons[other]} × ${scale} = ${vals[other]}.` : ''}`
      };
    }
    const base = (m + 1) % k;
    const extraIcons = R.int(1, 3);
    const extra = extraIcons * scale;
    const shown = icons.map((n, i) => (i === m ? 0 : n));
    const visual = pgVisual(set, cats, shown, scale, false);
    visual.rows[m] = { label: `${cats[m].label} (?)`, n: 0 };
    return {
      prompt: `The row for **${cats[m].label}** is not drawn yet. ${set.moreFact(cats[m], cats[base], extra)} How many ${set.icon} should be drawn for ${cats[m].label}?`,
      visuals: [visual],
      input: 'number',
      answer: icons[base] + extraIcons,
      hint: `First find the number for ${cats[base].label}. Then add ${extra}. Then change it into pictures.`,
      explain: `${cats[base].label}: ${icons[base]} × ${scale} = ${vals[base]}. ${vals[base]} + ${extra} = ${vals[base] + extra}. ${vals[base] + extra} ÷ ${scale} = ${icons[base] + extraIcons} pictures.`
    };
  }
};

// ================================================================ P3 unit 7 — bar graphs
const BG_SETS = [
  {
    title: 'Books borrowed from the library',
    axis: 'Number of books',
    units: 'books',
    cats: () => [['Mon', 'Monday'], ['Tue', 'Tuesday'], ['Wed', 'Wednesday'], ['Thu', 'Thursday'], ['Fri', 'Friday']],
    read: (c) => `How many books were borrowed on **${c}**?`,
    extreme: (w) => `On which day were the **${w}** books borrowed?`,
    more: (a, b) => `How many **more** books were borrowed on ${a} than on ${b}?`,
    both: (a, b) => `How many books were borrowed on ${a} and ${b} **altogether**?`,
    total: (n) => `How many books were borrowed in the ${n} days?`,
    which: (v) => `On which day were **${v}** books borrowed?`,
    target: (c, t) => `The librarian hoped to lend out ${t} books on ${c}. How many more books needed to be borrowed on ${c} to reach that number?`
  },
  {
    title: 'Cups of drinks sold at the canteen',
    axis: 'Number of cups',
    units: 'cups',
    price: [1, 2],
    cats: () => [['Milo', 'Milo'], ['Juice', 'juice'], ['Milk', 'milk'], ['Tea', 'tea'], ['Soya', 'soya bean milk']],
    read: (c) => `How many cups of **${c}** were sold?`,
    extreme: (w) => `Which drink sold the **${w}** cups?`,
    more: (a, b) => `How many **more** cups of ${a} than ${b} were sold?`,
    both: (a, b) => `How many cups of ${a} and ${b} were sold **altogether**?`,
    total: () => 'How many cups of drinks were sold **in all**?',
    which: (v) => `Which drink sold exactly **${v}** cups?`,
    money: (c, p) => `Each cup of ${c} costs $${p}. How much money was collected from selling ${c}?`,
    target: (c, t) => `The canteen wanted to sell ${t} cups of ${c}. How many more cups of ${c} did it need to sell?`
  },
  {
    title: 'Visitors to the Bird Park',
    axis: 'Number of visitors',
    units: 'visitors',
    price: [5, 10],
    cats: () => [['Week 1', 'Week 1'], ['Week 2', 'Week 2'], ['Week 3', 'Week 3'], ['Week 4', 'Week 4']],
    read: (c) => `How many visitors were there in **${c}**?`,
    extreme: (w) => `In which week were there the **${w}** visitors?`,
    more: (a, b) => `How many **more** visitors were there in ${a} than in ${b}?`,
    both: (a, b) => `How many visitors were there in ${a} and ${b} **altogether**?`,
    total: () => 'How many visitors were there in the 4 weeks?',
    which: (v) => `In which week were there **${v}** visitors?`,
    money: (c, p) => `Each ticket costs $${p}. How much money did the Bird Park collect from the visitors in ${c}?`,
    target: (c, t) => `The Bird Park hoped for ${t} visitors in ${c}. How many more visitors were needed to reach that number?`
  },
  {
    title: 'Stickers collected by some pupils',
    axis: 'Number of stickers',
    units: 'stickers',
    cats: (R) => R.sample(NAMES, 4).map(([n]) => [n, n]),
    read: (c) => `How many stickers did **${c}** collect?`,
    extreme: (w) => `Who collected the **${w}** stickers?`,
    more: (a, b) => `How many **more** stickers did ${a} collect than ${b}?`,
    both: (a, b) => `How many stickers did ${a} and ${b} collect **altogether**?`,
    total: () => 'How many stickers did the pupils collect **in all**?',
    which: (v) => `Who collected **${v}** stickers?`,
    target: (c, t) => `${c} wants to collect ${t} stickers. How many more stickers does ${c} need?`
  },
  {
    title: 'Favourite sports of P3 pupils',
    axis: 'Number of pupils',
    units: 'pupils',
    horizontal: true,
    cats: () => [['Football', 'football'], ['Swimming', 'swimming'], ['Badminton', 'badminton'], ['Basketball', 'basketball'], ['Running', 'running']],
    read: (c) => `How many pupils chose **${c}**?`,
    extreme: (w) => `Which sport did the **${w}** pupils choose?`,
    more: (a, b) => `How many **more** pupils chose ${a} than ${b}?`,
    both: (a, b) => `How many pupils chose ${a} or ${b}?`,
    total: () => 'How many pupils are there **in all**?',
    which: (v) => `Which sport did **${v}** pupils choose?`,
    target: (c, t) => `The school hoped that ${t} pupils would choose ${c}. How many more pupils needed to choose ${c} to reach that number?`
  }
];

/** A bar graph data set with values that suit the tier's scale. */
function barData(R, tier) {
  const set = R.pick(BG_SETS);
  let cats = set.cats(R);
  const k = tier === 1 ? Math.min(4, cats.length) : cats.length;
  if (cats.length > k) {
    const start = R.int(0, cats.length - k);
    cats = cats.slice(start, start + k);
  }
  const step = tier === 1 ? R.pick([2, 5]) : tier === 2 ? 10 : R.pick([20, 25, 50]);
  const unitV = tier === 1 ? step : tier === 2 ? 5 : step === 25 ? 25 : step / 2;
  const maxUnits = Math.floor((step * 10) / unitV);
  let vals;
  let g = 0;
  do {
    vals = cats.map(() => R.int(1, maxUnits) * unitV);
  } while (new Set(vals).size < Math.min(cats.length, 3) && g++ < 30);
  const max = Math.ceil(Math.max(...vals) / step) * step + (R.chance(0.5) ? step : 0);
  const visual = { type: 'bargraph', title: set.title, bars: cats.map((c, i) => ({ label: c[0], value: vals[i] })), max, step, horizontal: !!set.horizontal, axis: set.axis, color: R.pick(['blue', 'green', 'orange', 'purple', 'teal']) };
  return { set, cats, vals, step, visual };
}

const p3BarGraph = {
  id: 'p3.data.bargraph',
  level: 'P3',
  strand: 'data',
  unit: 7,
  title: 'Bar graphs',
  vi: 'Đọc biểu đồ cột',
  icon: '📊',
  tip: 'Dùng thước kẻ đặt ngang từ đỉnh cột sang trục số để đọc giá trị. Kiểm tra mỗi vạch chia là bao nhiêu (scale) trước khi đọc.',
  gen(R, tier) {
    const { set, cats, vals, step, visual } = barData(R, tier);
    const k = cats.length;
    const form = R.pick(tier === 1 ? ['read', 'read', 'extreme', 'more'] : tier === 2 ? ['read', 'more', 'both', 'which', 'extreme'] : ['read', 'more', 'total', 'which', 'both']);
    const scaleNote = `Each line on the scale is ${step}.`;
    const unique = (v) => vals.filter((x) => x === v).length === 1;
    if (form === 'extreme' && unique(Math.max(...vals)) && unique(Math.min(...vals))) {
      const most = R.chance(0.5);
      const i = vals.indexOf(most ? Math.max(...vals) : Math.min(...vals));
      return {
        prompt: set.extreme(most ? 'most' : 'fewest'),
        visuals: [visual],
        input: 'choice',
        answer: cats[i][0],
        choices: fixedChoices(cats.map((c) => c[0])),
        hint: `Look for the ${most ? 'longest' : 'shortest'} bar.`,
        explain: `The bar for ${cats[i][0]} is the ${most ? 'longest' : 'shortest'} (${vals[i]}).`
      };
    }
    if (form === 'which') {
      const cand = [...Array(k).keys()].filter((i) => unique(vals[i]));
      if (cand.length) {
        const i = R.pick(cand);
        return {
          prompt: set.which(vals[i]),
          visuals: [visual],
          input: 'choice',
          answer: cats[i][0],
          choices: fixedChoices(cats.map((c) => c[0])),
          hint: `Find ${vals[i]} on the scale, then look across to the bar that ends there. ${scaleNote}`,
          explain: `The bar for ${cats[i][0]} ends at ${vals[i]}.`
        };
      }
    }
    if (form === 'more') {
      const [a, b] = R.sample([...Array(k).keys()], 2);
      if (vals[a] !== vals[b]) {
        const [hi, lo] = vals[a] > vals[b] ? [a, b] : [b, a];
        return {
          prompt: set.more(cats[hi][1], cats[lo][1]),
          visuals: [visual],
          input: 'number',
          answer: vals[hi] - vals[lo],
          hint: `Read both bars first. ${scaleNote}`,
          explain: `${cats[hi][0]}: ${vals[hi]}. ${cats[lo][0]}: ${vals[lo]}. ${vals[hi]} − ${vals[lo]} = ${vals[hi] - vals[lo]}.`
        };
      }
    }
    if (form === 'both') {
      const [a, b] = R.sample([...Array(k).keys()], 2);
      return {
        prompt: set.both(cats[a][1], cats[b][1]),
        visuals: [visual],
        input: 'number',
        answer: vals[a] + vals[b],
        hint: `Read both bars, then add. ${scaleNote}`,
        explain: `${vals[a]} + ${vals[b]} = ${vals[a] + vals[b]}.`
      };
    }
    if (form === 'total') {
      const sum = vals.reduce((x, y) => x + y, 0);
      return {
        prompt: set.total(k),
        visuals: [visual],
        input: 'number',
        answer: sum,
        hint: `Read every bar, then add them all. ${scaleNote}`,
        explain: `${vals.join(' + ')} = ${sum}.`
      };
    }
    const i = R.int(0, k - 1);
    return {
      prompt: set.read(cats[i][1]),
      visuals: [visual],
      input: 'number',
      answer: vals[i],
      hint: `Find the end of the bar for ${cats[i][0]} and look across to the scale. ${scaleNote}`,
      explain: `The bar for ${cats[i][0]} ends at ${vals[i]}. The answer is ${vals[i]}.`
    };
  }
};

const p3BarProblems = {
  id: 'p3.data.problems',
  level: 'P3',
  strand: 'data',
  unit: 7,
  title: 'Bar graph problems',
  vi: 'Bài toán từ biểu đồ cột (thiếu cột, tính tiền, mục tiêu)',
  icon: '🧮',
  tip: 'Bài 2 bước: đọc số liệu từ biểu đồ trước, sau đó mới tính. Khuyến khích con ghi giá trị lên đầu mỗi cột.',
  gen(R, tier) {
    const { set, cats, vals, step, visual } = barData(R, tier);
    const k = cats.length;
    const forms = ['missing', 'target', 'range'];
    if (set.money) forms.push('money');
    if (tier >= 2) forms.push('pair');
    const form = R.pick(tier === 1 ? ['missing', 'target', 'range'] : forms);
    const scaleNote = `Each line on the scale is ${step}.`;
    if (form === 'missing') {
      const m = R.int(0, k - 1);
      const total = vals.reduce((x, y) => x + y, 0);
      const v = { ...visual, missing: m };
      return {
        prompt: `The total number of ${set.units} is ${total}. The bar for **${cats[m][0]}** is missing. What number should the bar for ${cats[m][0]} show?`,
        visuals: [v],
        input: 'number',
        answer: vals[m],
        hint: `Add the bars you can see. Then subtract from ${total}. ${scaleNote}`,
        explain: `${vals.filter((_, i) => i !== m).join(' + ')} = ${total - vals[m]}. ${total} − ${total - vals[m]} = ${vals[m]}.`
      };
    }
    if (form === 'money') {
      const i = R.int(0, k - 1);
      const p = R.pick(set.price);
      return {
        prompt: set.money(cats[i][1], p),
        visuals: [visual],
        input: 'number',
        answer: vals[i] * p,
        unit: { pre: '$' },
        hint: `First read the bar for ${cats[i][0]}. Then multiply by $${p}.`,
        explain: `${cats[i][0]}: ${vals[i]}. ${vals[i]} × $${p} = $${vals[i] * p}.`
      };
    }
    if (form === 'range') {
      const hi = Math.max(...vals);
      const lo = Math.min(...vals);
      if (hi !== lo) {
        return {
          prompt: `What is the difference between the **greatest** and the **smallest** number of ${set.units} shown in the graph?`,
          visuals: [visual],
          input: 'number',
          answer: hi - lo,
          hint: `Find the longest bar and the shortest bar. ${scaleNote}`,
          explain: `Greatest: ${hi}. Smallest: ${lo}. ${hi} − ${lo} = ${hi - lo}.`
        };
      }
    }
    if (form === 'pair') {
      const pairs = [];
      for (let a = 0; a < k; a++) for (let b = a + 1; b < k; b++) pairs.push([a, b]);
      const sums = pairs.map(([a, b]) => vals[a] + vals[b]);
      const okPairs = pairs.filter((_, i) => sums.filter((s) => s === sums[i]).length === 1);
      if (okPairs.length >= 3) {
        const right = R.pick(okPairs);
        const target = vals[right[0]] + vals[right[1]];
        const lab = ([a, b]) => `${cats[a][0]} and ${cats[b][0]}`;
        const wrong = R.sample(pairs.filter((p) => p !== right), 3);
        return {
          prompt: `Which two bars add up to **${target}** ${set.units}?`,
          visuals: [visual],
          input: 'choice',
          answer: lab(right),
          choices: R.shuffle([right, ...wrong]).map((p) => ({ value: lab(p), label: lab(p) })),
          hint: `Read every bar first. Then try adding pairs. ${scaleNote}`,
          explain: `${cats[right[0]][0]} (${vals[right[0]]}) + ${cats[right[1]][0]} (${vals[right[1]]}) = ${target}.`
        };
      }
    }
    const i = R.int(0, k - 1);
    const inc = step === 25 ? 25 : step >= 10 ? step / 2 : step;
    const t = vals[i] + R.int(1, 6) * inc;
    return {
      prompt: set.target(cats[i][1], t),
      visuals: [visual],
      input: 'number',
      answer: t - vals[i],
      hint: `Read the bar for ${cats[i][0]}. How many more to reach ${t}? ${scaleNote}`,
      explain: `${cats[i][0]}: ${vals[i]}. ${t} − ${vals[i]} = ${t - vals[i]}.`
    };
  }
};

export const SKILLS = [p1PicGraph, p1Collect, p2Scale, p2Missing, p3BarGraph, p3BarProblems];
