// Life Skills engine: which cards to show (spaced repetition), recording answers, progress summaries.
import { SCENARIOS, SCENARIO_MAP, LIFE_TOPICS, LIFE_WORLDS, LIFE_WORLD_MAP, getLifeTopic } from '../content/life/index.js';
import { LEVEL_IDS } from '../content/meta.js';
import { focusLevel, randomId } from './store.js';
import { recordAnswer, starsOf, statOf } from './progress.js';
import { makeRng } from './rng.js';

const DAY = 86400000;
// After a miss a card comes back the next session (~10 h); each first-try success pushes it further away.
const BOX_DAYS = [0.4, 3, 8, 21, 60];

export function lifePrefs(child) {
  const st = child.state.settings;
  return { lang: st.lifeLang === 'vi' ? 'vi' : 'en', region: st.region === 'VN' ? 'VN' : 'SG', off: new Set(st.lifeOff || []) };
}

/** K2 children get tier 1–2 cards in mixed sessions; tier 3 ("tricky") from P1. */
function maxTier(child) {
  return LEVEL_IDS.indexOf(focusLevel(child)) <= 0 ? 2 : 3;
}

export const seenOf = (child, id) => child.state.life.seen[id];

/** Cards the child may get for a scope: 'daily' | world id | topic id. */
export function cardsFor(child, scope = 'daily') {
  const { region, off } = lifePrefs(child);
  const topicScope = getLifeTopic(scope);
  const worldScope = LIFE_WORLD_MAP[scope];
  const limit = topicScope ? 3 : maxTier(child);
  return SCENARIOS.filter(
    (s) =>
      (!s.region || s.region === region) &&
      s.tier <= limit &&
      (topicScope ? s.topic === scope : !off.has(s.topic)) &&
      (!worldScope || s.world === scope)
  );
}

function isDue(rec, now) {
  return now - (rec.last || 0) >= BOX_DAYS[Math.min(rec.box || 0, BOX_DAYS.length - 1)] * DAY;
}

/** Order a list so the same topic never comes twice in a row (when avoidable). */
function spread(list) {
  const out = [...list];
  for (let i = 1; i < out.length; i++) {
    if (out[i].topic === out[i - 1].topic) {
      const j = out.findIndex((x, k) => k > i && x.topic !== out[i - 1].topic);
      if (j > 0) [out[i], out[j]] = [out[j], out[i]];
    }
  }
  return out;
}

/** Pick new cards round-robin across topics (topics with the fewest seen cards first), easiest first inside a topic. */
function pickFresh(child, fresh, n, R) {
  const byTopic = new Map();
  for (const s of fresh) {
    if (!byTopic.has(s.topic)) byTopic.set(s.topic, []);
    byTopic.get(s.topic).push(s);
  }
  for (const list of byTopic.values()) {
    R.shuffle(list).sort((a, b) => a.tier - b.tier);
  }
  const seenCount = (t) => SCENARIOS.filter((s) => s.topic === t && seenOf(child, s.id)).length;
  const topics = R.shuffle([...byTopic.keys()]).sort((a, b) => seenCount(a) - seenCount(b));
  const out = [];
  while (out.length < n && topics.some((t) => byTopic.get(t).length)) {
    for (const t of topics) {
      const list = byTopic.get(t);
      if (list.length && out.length < n) out.push(list.shift());
    }
  }
  return out;
}

/** Build a session: up to 2 cards to revisit (missed first), then new cards, then the longest-unseen ones. */
export function buildLifeSession(child, scope = 'daily', size = 6, R = makeRng()) {
  const pool = cardsFor(child, scope);
  if (!pool.length) return [];
  const now = Date.now();
  const rec = (s) => seenOf(child, s.id);
  const due = R.shuffle(pool.filter((s) => rec(s) && isDue(rec(s), now))).sort((a, b) => (rec(a).box || 0) - (rec(b).box || 0));
  const fresh = pool.filter((s) => !rec(s));
  const rest = pool.filter((s) => rec(s) && !isDue(rec(s), now)).sort((a, b) => (rec(a).last || 0) - (rec(b).last || 0));
  const n = Math.min(size, pool.length);
  const plan = due.slice(0, Math.min(2, n));
  plan.push(...pickFresh(child, fresh, n - plan.length, R));
  for (const s of [...due.slice(plan.filter((x) => due.includes(x)).length), ...rest]) {
    if (plan.length >= n) break;
    if (!plan.includes(s)) plan.push(s);
  }
  return getLifeTopic(scope) ? plan : spread(plan);
}

/**
 * Record one card. firstSrc / finalSrc = index (in the scenario file) of the first and last tapped choice.
 * ok = best choice on the first tap; solved = the child found the best choice (not revealed).
 */
export function recordLifeAnswer(child, card, { ok, solved, tries, ms, firstSrc }) {
  const life = child.state.life;
  const r = life.seen[card.id] || (life.seen[card.id] = { n: 0, ok: 0, last: 0, box: 0 });
  r.n++;
  if (ok) r.ok++;
  r.last = Date.now();
  r.box = ok ? Math.min((r.box || 0) + 1, BOX_DAYS.length - 1) : 0;
  if (!ok) {
    life.log.push({ id: randomId('l'), ts: Date.now(), card: card.id, first: firstSrc, solved: !!solved, names: card.names });
    if (life.log.length > 60) life.log = life.log.slice(-60);
  }
  const first = card.choices.find((c) => c.src === firstSrc);
  const best = card.choices[card.best];
  return recordAnswer(child, {
    skill: card.topic,
    tier: card.tier,
    ok,
    solved,
    tries,
    ms,
    mode: 'life',
    q: card.prompt,
    given: (ok ? best : first)?.text || '',
    firstGiven: ok ? null : first?.text,
    answer: best.text,
    adapt: false,
    logMistake: false
  });
}

// ------------------------------------------------------------------ progress summaries
export function topicProgress(child, topic) {
  const { region } = lifePrefs(child);
  const cards = topic.scenarios.filter((s) => !s.region || s.region === region);
  const seen = cards.filter((s) => seenOf(child, s.id));
  const firstTry = seen.filter((s) => (seenOf(child, s.id).ok || 0) > 0).length;
  return { total: cards.length, seen: seen.length, firstTry, stars: starsOf(statOf(child, topic.id)) };
}

export function worldProgress(child, worldId) {
  const topics = LIFE_TOPICS.filter((t) => t.world === worldId);
  const sum = { total: 0, seen: 0, firstTry: 0, stars: 0, topics: topics.length };
  for (const t of topics) {
    const p = topicProgress(child, t);
    sum.total += p.total;
    sum.seen += p.seen;
    sum.firstTry += p.firstTry;
    sum.stars += p.stars;
  }
  return sum;
}

export function lifeTotals(child) {
  const { region } = lifePrefs(child);
  const all = SCENARIOS.filter((s) => !s.region || s.region === region);
  const seen = all.filter((s) => seenOf(child, s.id)).length;
  return { total: all.length, seen };
}

export { LIFE_WORLDS, LIFE_WORLD_MAP, LIFE_TOPICS, SCENARIO_MAP, getLifeTopic };
