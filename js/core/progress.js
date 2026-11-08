// Adaptive learning engine: per-skill difficulty tiers & mastery, daily totals, streaks,
// rewards (stars, XP, stickers, trophies) and the Daily Mission planner.
import { SKILLS, getSkill } from '../content/curriculum.js';
import { LEVEL_IDS } from '../content/meta.js';
import { store, todayKey, dayKeyOffset, focusLevel, randomId } from './store.js';
import { makeRng } from './rng.js';
import { numChoices } from '../content/helpers.js';

const EMA = 0.3;
const TIER_VALUE = [0, 60, 80, 100];
export const MAX_Q_SEC = 90; // a single question counts at most 90 s of practice time

// ------------------------------------------------------------------ skill stats
export function statOf(child, id) {
  return child?.state.skills[id] || null;
}
export function tierOf(child, id) {
  return statOf(child, id)?.t || 1;
}
export function starsOf(stat) {
  if (!stat) return 0;
  const m = stat.m || 0;
  return m >= 88 ? 3 : m >= 70 ? 2 : m >= 45 ? 1 : 0;
}
export function accuracy(stat) {
  return stat && stat.n ? Math.round((stat.ok / stat.n) * 100) : null;
}

// ------------------------------------------------------------------ pet levels
export function petLevel(xp) {
  let level = 1;
  let need = 100;
  let rest = xp;
  while (rest >= need) {
    rest -= need;
    level++;
    need += 50;
  }
  return { level, into: rest, need };
}
const TITLES = ['Rookie', 'Counter', 'Number Explorer', 'Bond Builder', 'Bar Model Pro', 'Pattern Detective', 'Problem Solver', 'Maths Ranger', 'Heuristic Hero', 'Number Ninja', 'Maths Wizard', 'Merlion Master', 'PSLE Legend'];
export function petTitle(level) {
  return TITLES[Math.min(TITLES.length - 1, Math.floor((level - 1) / 3))];
}

// ------------------------------------------------------------------ stickers (one per skill per star)
const STICKER_POOLS = {
  numbers: '🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐔🐧🐦🐤🦆🦉🐺🐴🦄🐝🐞🐢🐍🦖🦕🐙🦀🐠🐬🐳🦈🐊🦓🦒🦘🦥🦦🦔',
  addsub: '🍎🍐🍊🍋🍌🍉🍇🍓🍒🍑🥭🍍🥥🥝🍅🥑🥦🌽🥕🥐🍞🥨🧀🥞🧇🍗🍔🍟🍕🥪🌮🍝🍜🍣🍱🥟🍤🍙🍡🍧🍨🍦🧁🍰🎂🍭🍬🍫🍿🍩🍪',
  muldiv: '🌸🌼🌻🌺🌷🌹🍀🍁🍄🌵🌴🌳🌲🐛🦋🐌🐜🪲🦗🕷️🐝🌈☀️🌙⭐️☁️❄️🔥💧🌊',
  fractions: '🍰🧁🍩🍪🍫🍬🍭🍮🥧🍯🧇🥞🍦🍨🍧🎂🍡🥮',
  money: '💎👑💰🪙💍🏆🥇🎖️🏅🎁🎀🧧🔮🗝️',
  time: '🚀🛸🌍🌎🌏🌙🪐⭐🌟💫☄️🌌🔭👩‍🚀🛰️⏰⌚⏳',
  measure: '🚗🚕🚙🚌🏎️🚓🚑🚒🚜🚲🛴🛵🚂🚄✈️🚁⛵🚤🚢🎢🎡🎠',
  geometry: '🐠🐟🐡🐙🦑🦐🦞🦀🐚🐳🐋🐬🦭🐢🪸🏝️⛱️🌊',
  data: '🌱🌿☘️🍀🌾🌵🌴🌳🌲🍃🍂🍁🌻🌷',
  thinking: '🧙🦄🐉🧚🧞🧜🦸🦹🪄🎩🔮🏰🗡️🛡️👸🤴'
};
function poolFor(strand) {
  return [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(STICKER_POOLS[strand] || STICKER_POOLS.numbers)].map((s) => s.segment);
}
export function stickerFor(skill, star) {
  const pool = poolFor(skill.strand);
  const sameStrand = SKILLS.filter((s) => s.strand === skill.strand);
  const idx = sameStrand.indexOf(sameStrand.find((s) => s.id === skill.id));
  return pool[(idx * 3 + star - 1) % pool.length];
}

// ------------------------------------------------------------------ trophies
const totalH = (s) => s.totalSec / 3600;
const nSkills = (s, min) => Object.values(s.skills).filter((x) => (x.m || 0) >= min).length;
export const TROPHIES = [
  { id: 'first', icon: '🌱', name: 'First answer', vi: 'Câu trả lời đầu tiên', test: (s) => s.totalQ >= 1 },
  { id: 'q100', icon: '🥉', name: '100 questions', vi: '100 câu hỏi', test: (s) => s.totalQ >= 100 },
  { id: 'q500', icon: '🥈', name: '500 questions', vi: '500 câu hỏi', test: (s) => s.totalQ >= 500 },
  { id: 'q1000', icon: '🥇', name: '1,000 questions', vi: '1.000 câu hỏi', test: (s) => s.totalQ >= 1000 },
  { id: 'q5000', icon: '🏆', name: '5,000 questions', vi: '5.000 câu hỏi', test: (s) => s.totalQ >= 5000 },
  { id: 'q20000', icon: '👑', name: '20,000 questions', vi: '20.000 câu hỏi', test: (s) => s.totalQ >= 20000 },
  { id: 'streak3', icon: '🔥', name: '3 days in a row', vi: 'Học 3 ngày liền', test: (s) => s.streak.best >= 3 },
  { id: 'streak7', icon: '🔥', name: '7 days in a row', vi: 'Học 7 ngày liền', test: (s) => s.streak.best >= 7 },
  { id: 'streak30', icon: '🌋', name: '30 days in a row', vi: 'Học 30 ngày liền', test: (s) => s.streak.best >= 30 },
  { id: 'streak100', icon: '☄️', name: '100 days in a row', vi: 'Học 100 ngày liền', test: (s) => s.streak.best >= 100 },
  { id: 'h1', icon: '⏱️', name: '1 hour of practice', vi: '1 giờ luyện tập', test: (s) => totalH(s) >= 1 },
  { id: 'h10', icon: '⏳', name: '10 hours of practice', vi: '10 giờ luyện tập', test: (s) => totalH(s) >= 10 },
  { id: 'h50', icon: '🕰️', name: '50 hours of practice', vi: '50 giờ luyện tập', test: (s) => totalH(s) >= 50 },
  { id: 'h200', icon: '🗿', name: '200 hours of practice', vi: '200 giờ luyện tập', test: (s) => totalH(s) >= 200 },
  { id: 'star3', icon: '⭐', name: 'First 3-star skill', vi: 'Kỹ năng 3 sao đầu tiên', test: (s) => nSkills(s, 88) >= 1 },
  { id: 'sk10', icon: '🎯', name: '10 skills mastered', vi: 'Thành thạo 10 kỹ năng', test: (s) => nSkills(s, 70) >= 10 },
  { id: 'sk30', icon: '🎯', name: '30 skills mastered', vi: 'Thành thạo 30 kỹ năng', test: (s) => nSkills(s, 70) >= 30 },
  { id: 'sk60', icon: '🧠', name: '60 skills mastered', vi: 'Thành thạo 60 kỹ năng', test: (s) => nSkills(s, 70) >= 60 },
  { id: 'sk100', icon: '🦁', name: '100 skills mastered', vi: 'Thành thạo 100 kỹ năng', test: (s) => nSkills(s, 70) >= 100 },
  { id: 'm10', icon: '🚀', name: '10 missions', vi: '10 nhiệm vụ', test: (s) => s.missions >= 10 },
  { id: 'm100', icon: '🛸', name: '100 missions', vi: '100 nhiệm vụ', test: (s) => s.missions >= 100 },
  { id: 'sp15', icon: '⚡', name: '15 in a sprint', vi: '15 câu trong 1 phút', test: (s) => Object.values(s.sprint).some((v) => v >= 15) },
  { id: 'sp25', icon: '🌩️', name: '25 in a sprint', vi: '25 câu trong 1 phút', test: (s) => Object.values(s.sprint).some((v) => v >= 25) },
  { id: 'sp40', icon: '🚄', name: '40 in a sprint', vi: '40 câu trong 1 phút', test: (s) => Object.values(s.sprint).some((v) => v >= 40) }
];

// ------------------------------------------------------------------ shop
export const SHOP = [
  { id: 'cap', e: '🧢', name: 'Cap', slot: 'hat', cost: 20 },
  { id: 'bow', e: '🎀', name: 'Bow', slot: 'hat', cost: 30 },
  { id: 'grad', e: '🎓', name: 'Scholar cap', slot: 'hat', cost: 60 },
  { id: 'tophat', e: '🎩', name: 'Magic top hat', slot: 'hat', cost: 120 },
  { id: 'crown', e: '👑', name: 'Golden crown', slot: 'hat', cost: 300 },
  { id: 'glasses', e: '👓', name: 'Smart glasses', slot: 'face', cost: 25 },
  { id: 'shades', e: '🕶️', name: 'Cool shades', slot: 'face', cost: 50 },
  { id: 'goggles', e: '🥽', name: 'Science goggles', slot: 'face', cost: 90 },
  { id: 'balloon', e: '🎈', name: 'Balloon', slot: 'hand', cost: 15 },
  { id: 'ball', e: '⚽', name: 'Football', slot: 'hand', cost: 35 },
  { id: 'kite', e: '🪁', name: 'Kite', slot: 'hand', cost: 45 },
  { id: 'guitar', e: '🎸', name: 'Guitar', slot: 'hand', cost: 80 },
  { id: 'wand', e: '🪄', name: 'Magic wand', slot: 'hand', cost: 150 },
  { id: 'telescope', e: '🔭', name: 'Telescope', slot: 'hand', cost: 200 },
  { id: 'trophy', e: '🏆', name: 'Trophy', slot: 'hand', cost: 400 },
  { id: 'bg-sky', e: '🌤️', name: 'Sunny sky', slot: 'bg', cost: 40, bg: 'linear-gradient(160deg,#bae6fd,#e0f2fe 60%,#fef9c3)' },
  { id: 'bg-sea', e: '🌊', name: 'Ocean', slot: 'bg', cost: 70, bg: 'linear-gradient(160deg,#67e8f9,#a5f3fc 55%,#ecfeff)' },
  { id: 'bg-forest', e: '🌳', name: 'Rainforest', slot: 'bg', cost: 110, bg: 'linear-gradient(160deg,#86efac,#bbf7d0 55%,#f0fdf4)' },
  { id: 'bg-sunset', e: '🌅', name: 'Sunset', slot: 'bg', cost: 160, bg: 'linear-gradient(160deg,#fdba74,#fecaca 50%,#fde68a)' },
  { id: 'bg-candy', e: '🍭', name: 'Candy land', slot: 'bg', cost: 220, bg: 'linear-gradient(160deg,#f9a8d4,#e9d5ff 55%,#fbcfe8)' },
  { id: 'bg-space', e: '🌌', name: 'Outer space', slot: 'bg', cost: 350, bg: 'linear-gradient(160deg,#312e81,#4c1d95 55%,#1e1b4b)' },
  { id: 'pet-tiger', e: '🐯', name: 'Tiger friend', slot: 'buddy', cost: 250 },
  { id: 'pet-panda', e: '🐼', name: 'Panda friend', slot: 'buddy', cost: 250 },
  { id: 'pet-unicorn', e: '🦄', name: 'Unicorn friend', slot: 'buddy', cost: 500 },
  { id: 'pet-dragon', e: '🐲', name: 'Dragon friend', slot: 'buddy', cost: 800 }
];

// ------------------------------------------------------------------ recording an answer
function plainText(s) {
  return String(s || '')
    .replace(/\*\*/g, '')
    .replace(/\[(\d+|\?)\/(\d+|\?)\]/g, '$1/$2')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 220);
}

function bumpStreak(state, day) {
  const st = state.streak;
  if (st.last === day) return false;
  st.cur = st.last === dayKeyOffset(-1) ? st.cur + 1 : 1;
  st.best = Math.max(st.best, st.cur);
  st.last = day;
  return st.cur > 1;
}

/**
 * Record one answered question.
 * ok = correct on the first try. tries = number of taps/submissions.
 * Returns {stars, xp, events[]} where events describe unlocks to celebrate.
 */
export function recordAnswer(child, { skill, tier, ok, solved = true, tries, ms, mode, q, given, firstGiven = null, answer, adapt = true }) {
  const s = child.state;
  const day = todayKey();
  const events = [];
  const sec = Math.min(MAX_Q_SEC, Math.max(0, ms / 1000));

  const st = s.skills[skill] || (s.skills[skill] = { t: 1, s: 0, w: 0, n: 0, ok: 0, ms: 0, m: 0, last: 0, best: 1 });
  const starsBefore = starsOf(st);
  st.n++;
  st.ms += Math.round(sec * 1000);
  st.last = Date.now();
  if (ok) st.ok++;
  st.m = Math.round(st.m * (1 - EMA) + (ok ? TIER_VALUE[tier] || 60 : 0) * EMA);
  if (adapt) {
    if (ok && st.n === 3 && st.ok === 3 && st.t === 1) {
      // Fast track: a child who gets the first 3 questions right already knows the basics.
      st.t = 3;
      st.s = 0;
      st.w = 0;
      st.m = Math.max(st.m, 55);
      events.push({ type: 'tierUp', tier: 3 });
    } else if (ok) {
      st.s++;
      st.w = 0;
      if (st.s >= 3 && st.t < 3) {
        st.t++;
        st.s = 0;
        events.push({ type: 'tierUp', tier: st.t });
      }
    } else {
      st.s = 0;
      st.w++;
      if (st.w >= 2 && st.t > 1) {
        st.t--;
        st.w = 0;
      }
    }
  }
  st.best = Math.max(st.best || 1, st.t);

  // totals
  s.totalQ++;
  if (ok) s.totalOk++;
  s.totalSec += sec;
  const d = s.daily[day] || (s.daily[day] = { sec: 0, q: 0, ok: 0, m: 0 });
  d.sec += sec;
  d.q++;
  if (ok) d.ok++;
  if (bumpStreak(s, day)) events.push({ type: 'streak', days: s.streak.cur });

  // rewards
  const stars = ok ? tier : solved ? 1 : 0;
  const xp = ok ? 10 + 5 * tier : solved ? 5 : 2;
  const lvBefore = petLevel(s.xp).level;
  s.stars += stars;
  s.xp += xp;
  const lvAfter = petLevel(s.xp).level;
  if (lvAfter > lvBefore) events.push({ type: 'levelUp', level: lvAfter });

  // stickers for new skill stars
  const starsAfter = starsOf(st);
  const sk = getSkill(skill);
  if (sk && starsAfter > starsBefore) {
    for (let k = starsBefore + 1; k <= starsAfter; k++) {
      const id = `${skill}#${k}`;
      if (!s.stickers.includes(id)) {
        s.stickers.push(id);
        events.push({ type: 'sticker', id, emoji: stickerFor(sk, k), skill: sk.title, star: k });
      }
    }
  }
  // trophies
  for (const t of TROPHIES) {
    if (!s.trophies.includes(t.id) && t.test(s)) {
      s.trophies.push(t.id);
      events.push({ type: 'trophy', id: t.id, icon: t.icon, name: t.name });
    }
  }
  // mistakes log
  if (!ok) {
    s.mistakes.push({ id: randomId('m'), ts: Date.now(), skill, q: plainText(q), given: plainText(firstGiven ?? given).slice(0, 40), answer: plainText(answer).slice(0, 40), fixed: !!solved });
    if (s.mistakes.length > 150) s.mistakes = s.mistakes.slice(-150);
  }
  // history for the cloud
  store.enqueue({
    id: randomId('a'),
    childId: child.id,
    ts: Date.now(),
    day,
    skill,
    tier,
    ok: ok ? 1 : 0,
    tries,
    ms: Math.round(sec * 1000),
    mode,
    q: plainText(q),
    given: plainText(firstGiven && firstGiven !== given ? `${firstGiven} → ${given}` : given).slice(0, 60),
    answer: plainText(answer).slice(0, 40)
  });
  store.touch(child);
  return { stars, xp, events };
}

export function recordMissionDone(child) {
  const s = child.state;
  s.missions++;
  const d = s.daily[todayKey()] || (s.daily[todayKey()] = { sec: 0, q: 0, ok: 0, m: 0 });
  d.m = (d.m || 0) + 1;
  const bonus = 10;
  s.stars += bonus;
  const events = [];
  for (const t of TROPHIES) {
    if (!s.trophies.includes(t.id) && t.test(s)) {
      s.trophies.push(t.id);
      events.push({ type: 'trophy', id: t.id, icon: t.icon, name: t.name });
    }
  }
  store.touch(child);
  return { bonus, events };
}

export function todayStats(child) {
  return child?.state.daily[todayKey()] || { sec: 0, q: 0, ok: 0, m: 0 };
}

// ------------------------------------------------------------------ question factory
export function makeQuestion(child, skillId, R = makeRng()) {
  const skill = getSkill(skillId);
  if (!skill) throw new Error(`Unknown skill ${skillId}`);
  const tier = tierOf(child, skillId);
  let q;
  try {
    q = skill.gen(R, tier);
  } catch (e) {
    console.error('Generator failed', skillId, tier, e);
    q = skill.gen(makeRng(), 1);
  }
  q = { ...q, skill: skillId, tier, uid: randomId('q') };
  // Parent setting: always multiple choice (helps younger children who cannot type yet).
  if (q.input === 'number' && child?.state.settings.input === 'choices') {
    // Work in integer units of the last decimal place to avoid floating-point duplicates.
    const dec = q.decimals || 0;
    const scale = 10 ** dec;
    const A = Math.round(q.answer * scale);
    const show = (v) => (v / scale).toFixed(dec);
    const ch = numChoices(R, A, { near: [A + 1, A - 1, A + 10, A - 10, A + 2], min: 0 });
    q = {
      ...q,
      input: 'choice',
      choices: ch.map((c) => ({ value: show(c.value), label: `${q.unit?.pre || ''}${show(c.value)}${q.unit?.post || ''}` })),
      answer: show(A)
    };
  }
  return q;
}

// ------------------------------------------------------------------ mission planning
function interleave(list) {
  const out = [...list];
  for (let i = 1; i < out.length; i++) {
    if (out[i] === out[i - 1]) {
      const j = out.findIndex((x, k) => k > i && x !== out[i - 1] && x !== out[i + 1]);
      if (j > 0) [out[i], out[j]] = [out[j], out[i]];
    }
  }
  return out;
}

/** The skills the child is currently learning (first not-yet-mastered skills in teaching order). */
export function frontierSkills(child, max = 4) {
  const level = focusLevel(child);
  const li = LEVEL_IDS.indexOf(level);
  const st = (s) => statOf(child, s.id);
  for (let k = li; k < LEVEL_IDS.length; k++) {
    const pending = SKILLS.filter((s) => s.level === LEVEL_IDS[k] && s.unit !== 0 && starsOf(st(s)) < 2);
    if (pending.length) {
      const started = pending.filter((s) => st(s)?.n > 0);
      const fresh = pending.filter((s) => !(st(s)?.n > 0));
      const list = [...started.slice(0, 3)];
      for (const f of fresh) if (list.length < max && list.filter((x) => !(st(x)?.n > 0)).length < 3) list.push(f);
      return list.sort((a, b) => a.order - b.order).slice(0, max);
    }
  }
  return SKILLS.filter((s) => s.level === level && s.unit !== 0).slice(-max);
}

export function buildMission(child, size = 12, R = makeRng()) {
  const level = focusLevel(child);
  const li = LEVEL_IDS.indexOf(level);
  const st = (s) => statOf(child, s.id);
  const active = frontierSkills(child, 4);
  const activeIds = new Set(active.map((s) => s.id));
  const practised = SKILLS.filter((s) => st(s)?.n > 0 && s.unit !== 0 && !activeIds.has(s.id) && LEVEL_IDS.indexOf(s.level) <= li + 1);
  const review = practised
    .filter((s) => starsOf(st(s)) >= 1)
    .sort((a, b) => (st(a).last || 0) - (st(b).last || 0))
    .slice(0, 6);
  const weak = practised
    .filter((s) => st(s).n >= 4 && accuracy(st(s)) < 70)
    .sort((a, b) => accuracy(st(a)) - accuracy(st(b)))
    .slice(0, 3);
  const thinking = SKILLS.filter((s) => s.unit === 0 && LEVEL_IDS.indexOf(s.level) <= li && LEVEL_IDS.indexOf(s.level) >= li - 1);
  const plan = [];
  const nReview = Math.min(review.length ? 3 : 0, size);
  const nWeak = Math.min(weak.length ? 2 : 0, size - nReview);
  const nThink = thinking.length ? 1 : 0;
  for (let i = 0; i < nReview; i++) plan.push(R.pick(review).id);
  for (let i = 0; i < nWeak; i++) plan.push(weak[i % weak.length].id);
  for (let i = 0; i < nThink; i++) plan.push(R.pick(thinking).id);
  let k = 0;
  const pool = active.length ? active : SKILLS.filter((s) => s.level === level && s.unit !== 0);
  while (plan.length < size) plan.push(pool[k++ % pool.length].id);
  return interleave(R.shuffle(plan));
}

export function challengeSet(child, size = 8, R = makeRng()) {
  const li = LEVEL_IDS.indexOf(focusLevel(child));
  let pool = SKILLS.filter((s) => s.unit === 0 && s.level === LEVEL_IDS[li]);
  if (pool.length < 3) pool = SKILLS.filter((s) => s.unit === 0 && LEVEL_IDS.indexOf(s.level) <= li);
  if (!pool.length) return [];
  return interleave(Array.from({ length: size }, () => R.pick(pool).id));
}

export function reviewSet(child, size = 10, R = makeRng()) {
  const ids = [...new Set(child.state.mistakes.slice(-30).map((m) => m.skill))].filter((id) => getSkill(id));
  if (!ids.length) return [];
  return interleave(Array.from({ length: size }, () => R.pick(ids)));
}

export function skillSet(skillId, size = 10) {
  return Array.from({ length: size }, () => skillId);
}
