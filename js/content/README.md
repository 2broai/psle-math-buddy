# Content authoring guide (question generators)

Every question is **generated** from a template with random numbers, names, objects and
pictures, so content never runs out. Each content module in `gen/` exports
`SKILLS = [skill, ...]` (array order = teaching order inside a unit).

Run `node tests/validate.mjs --module=<file>` after every change (must print 0 errors),
and `node tests/validate.mjs --show=<skill id> --n=5` to eyeball sample questions.

## Skill

```js
{
  id: 'p1.add.within10',     // unique, lowercase, dot-separated: <level>.<topic>.<name>
  level: 'P1',               // 'K' | 'P1' | 'P2' | 'P3'
  strand: 'addsub',          // numbers addsub muldiv fractions money time measure geometry data thinking
  unit: 3,                   // chapter number from UNITS in curriculum.js (0 = Thinking Cap pool)
  title: 'Add within 10',    // kid-facing English, ≤ 32 chars
  vi: 'Cộng trong phạm vi 10',               // parent-facing Vietnamese title
  icon: '➕',                                 // emoji for the skill tile
  tip: 'Gợi ý cho bố mẹ (tiếng Việt, 1–3 câu). Có thể trích cụm tiếng Anh trường dùng: "make 10".',
  sprint: true,              // optional — fast facts usable in Speed Sprint (must use input:'number')
  gen(R, tier) { return question; }          // tier 1 = intro, 2 = on-level, 3 = stretch
}
```

`R` is the seeded RNG from `core/rng.js`: `R.int(a,b)`, `R.intExcept(a,b,[..])`, `R.step(a,b,s)`,
`R.pick(arr)`, `R.pickW([[v,w],..])`, `R.shuffle(arr)`, `R.sample(arr,n)`, `R.chance(p)`,
`R.distinctInts(n,a,b)`. **Never use Math.random.**

## Question

```js
{
  prompt: 'There are **8** apples. **5** more are added. How many apples are there now?',
  speak: 'optional plain text for text-to-speech when the automatic reading is wrong (e.g. times)',
  visuals: [ { type: 'objects', groups: [...] } ],   // 0..n pictures shown above the answer area
  input: 'number',            // 'number' (on-screen keypad) or 'choice' (2–6 buttons)
  answer: 13,                 // number for 'number'; for 'choice' must equal exactly one choice.value
  choices: [{ value: 13, label: '13' }],   // 'choice' only. label supports markup; or visual: {...}
  unit: { pre: '$' } | { post: '¢' },     // 'number' only, shown around the answer box
  decimals: 0,                // 'number' only: allowed decimal places (money $3.45 => 2)
  hint: 'A nudge shown after the 1st wrong try — guide, do not give the answer.',
  explain: 'Worked solution shown after solving or after 2 wrong tries. States the answer.',
  explainVisuals: [ ... ]     // optional picture for the solution (e.g. a number bond)
}
```

Markup in prompt / hint / explain / labels: `**keyword**` (highlight), `[3/4]` (stacked fraction), `\n`.
Speech auto-converts `+ − × ÷ =`, `$3.45`, `45¢`, `cm kg ℓ`, `[3/4]`. Provide `speak` for clock times
like "3.05" (use `timeSpeech()` from helpers).

### Rules
* English, Singapore MOE phrasing, short sentences for 6–9 year-olds ("How many … altogether?",
  "How many more … than …?", "What is the missing number?").
* Every tier needs **≥ 2 different question forms**, chosen at random. Variety matters: a child may
  practise 1–2 hours a day.
* Answers must be correct, non-negative, no NaN. Explanations must state the answer.
* Prefer `input:'number'` for calculations (P1+). Use `choice` for K level, comparisons (<, >, =),
  shapes, clocks, vocabulary, "which picture …" questions.
* Numeric choices: `numChoices(R, answer, { near: [common mistakes], min, max })` (sorted ascending).
* Pictures must help but never reveal the answer (the missing part shows "?").
* `objects` pictures: ≤ 20 objects per group. Use `tenframe`, `baseten`, `numberline` for bigger numbers.

## Helpers (`content/helpers.js`)

`person(R, exclude)` → `{name, he, him, his, He, His}` · `people(R, n)` · `item(R, cat)` → `{one, many, e}`
(cats: food toys school animals nature) · `items(R, n, cat)` · `plural(n, it)` · `PLACES` · `CONTAINERS` ·
`FAMILY` · `numWord(345)` → "three hundred and forty-five" · `ordinal(3)` → "3rd" · `ORDINAL_WORDS` ·
`DAYS` · `MONTHS` · `cents(45)` → "45¢" · `money(345)` → "$3.45" · `moneySpeech(345)` ·
`clockTime(3,5,'p.m.')` → "3.05 p.m." · `timeWords(3,45)` → "quarter to 4" · `timeSpeech(3,5)` ·
`frac(3,4)` → "[3/4]" · `gcd` · `numChoices` · `textChoices(R, answer, pool, n)` ·
`visualChoices(R, [{value, visual}])` · `fixedChoices(['<','=','>'])` · `sumStr([3,4,5])` · `cap` · `listAnd`.

## Visual types

Core (`ui/visuals/core.js`):

| type | props |
|---|---|
| `objects` | `groups:[{emoji, count, label?, cross?, box?}]`, `op?:'+'\|'−'`, `size?:'sm'\|'md'\|'lg'`, `layout?:'rows'\|'scatter'`, `perRow?=5`, `seed?` |
| `tenframe` | `a`, `b?`, `cross?`, `colorA?`, `colorB?`, `frames?` (min number of frames) |
| `bond` | `whole`, `parts:[a,b]` or 3 parts, `dir?:'down'\|'up'\|'right'`, `labels?` — use `'?'` for missing |
| `bar` | `rows:[{label, segs:[{v, text, color, missing?}]}]`, `total?:{text,row}`, `diff?:{text,short,long}`, `sum?:{text}`, `parts?:{text,row,from,to}` — `v` = true value (sets width), `text` = what is shown ('?' allowed) |
| `numberline` | `min,max,step,every?` or `labels:[..]`, `marks:[{at,text,color}]`, `jumps:[{from,to,text}]`, `hide:[values]` |
| `baseten` | `h, t, o` (hundreds flats, tens rods, ones cubes) |
| `pvchart` | `cols:['Hundreds','Tens','Ones']`, `values:[3,'?',5]`, `dots?` |
| `equation` | `text:'8 + 5 = ?'` or vertical `rows:[47,'2?'], op:'+', result:'?'` |
| `shapes` | `items:[{shape, color, rot?, size?, outline?, label?}]`, `labels?` — shapes: circle oval square rectangle triangle rightTriangle semicircle quarter star heart pentagon hexagon octagon diamond trapezium parallelogram kite |
| `sequence` | `items:[number\|string\|shapeSpec\|'?']`, `between?:['+2',..]` |
| `ordinal` | `items:[emoji\|shapeSpec]`, `ends?:['LEFT','RIGHT']`, `numbers?`, `highlight?` |
| `array` | `rows, cols, emoji, boxRows?` |
| `hundredchart` | `start, rows, cols, missing:[..], highlight:[..]` |
| `text` | `text, size?:'xl'\|'lg'` |
| `dots` | `n` (dice, ≤ 12 = two dice) or `style:'domino', a, b` |
| `grid` | `rows, cols, cells:[{r,c,e,label?}]` |
| `clock` | `h, m, digital?, label?` |
| `money` | `items:[{c:5\|10\|20\|50\|100}, {n:2\|5\|10\|50\|100}]` (c = coin in cents, n = note in dollars) |
| `picgraph` | `title, rows:[{label, n, icon?}], icon, scale, unit, units, key?` (n = icons drawn; value = n × scale) |
| `lengths` | `items:[{label, len, color, offset?, e?}]`, `units?`, `unitEmoji?`, `vertical?` |

Measurement (`ui/visuals/measure.js`) and geometry/fractions/graphs (`ui/visuals/geometry.js`)
add more types — see those files.

## Units (teaching order)

See `UNITS` in `curriculum.js`. Each unit belongs to one module:

* **K** → `early.js` (all units 1–12) · thinking → `thinking.js` (unit 0)
* **P1** — numbers.js: 1, 6, 7, 11 · addsub.js: 2, 3, 4, 8, 12 · geometry.js: 5 · measure.js: 9 ·
  data.js: 10 · muldiv.js: 13, 14 · time.js: 15 · money.js: 16
* **P2** — numbers.js: 1 · addsub.js: 2 · muldiv.js: 3, 4 · measure.js: 5, 6, 7 · data.js: 8 ·
  money.js: 9 · fractions.js: 10 · time.js: 11 · geometry.js: 12
* **P3** — numbers.js: 1 · addsub.js: 2 · muldiv.js: 3, 4 · money.js: 5 · measure.js: 6 · data.js: 7 ·
  fractions.js: 8 · time.js: 9 · geometry.js: 10, 11, 12
