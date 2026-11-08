// Turns a scenario (see README.md) into a ready-to-show card for one language and region.
// Pure functions — no DOM — so the validator can build every card in Node.
import { REGIONS } from './meta.js';
import { NAMES } from '../helpers.js';
import { ART } from './art.js';

/** URL of the drawn picture for a card (null if it has none yet). */
export const artUrl = (id) => (ART[id] ? `img/life/${id}.webp?v=${ART[id]}` : null);

const TOKEN = /\{(name|friend|POLICE|FIRE|AMBULANCE)\}/g;

/** Fill placeholders. Returns { show, say } — `say` spells phone numbers digit by digit for speech. */
export function fill(text, ctx) {
  const nums = REGIONS[ctx.region] || REGIONS.SG;
  const show = String(text ?? '').replace(TOKEN, (_, k) => (k === 'name' || k === 'friend' ? ctx[k] : nums[k]));
  const say = String(text ?? '')
    .replace(TOKEN, (_, k) => (k === 'name' || k === 'friend' ? ctx[k] : nums[k].split('').join(' ')))
    .replace(/\*\*/g, '')
    .replace(/\n/g, '. ');
  return { show, say };
}

/** Two different child names for {name} and {friend}. R = seeded rng from core/rng.js (or anything with .sample). */
export function pickNames(R) {
  const [a, b] = R.sample(NAMES, 2);
  return { name: a[0], friend: b[0] };
}

/**
 * Build a card. Choices are shuffled; `best` is the index of the best choice after shuffling.
 *   lang: 'en' | 'vi', region: 'SG' | 'VN'
 *   names / order: pass the previous card's values to rebuild the same card in another language.
 */
export function buildCard(sc, { lang = 'en', region = 'SG', R, names, order: fixedOrder } = {}) {
  const ctx = { region, ...(names || (R ? pickNames(R) : { name: 'Ali', friend: 'Mei Ling' })) };
  const L = (o) => (o && (o[lang] ?? o.en)) || '';
  const order = fixedOrder || (R ? R.shuffle(sc.choices.map((_, i) => i)) : sc.choices.map((_, i) => i));
  const choices = order.map((i) => {
    const c = sc.choices[i];
    const text = fill(L(c), ctx);
    const why = fill(L(c.why), ctx);
    return { src: i, e: c.e, v: c.v, text: text.show, say: text.say, why: why.show, whySay: why.say };
  });
  const q = fill(L(sc.q), ctx);
  const pic = sc.pic
    ? {
        bg: sc.pic.bg,
        props: sc.pic.props || [],
        cast: (sc.pic.cast || []).map((c) => ({ ...c, say: c.say ? fill(L(c.say), ctx).show : undefined }))
      }
    : null;
  const lesson = fill(L(sc.lesson), ctx);
  return {
    id: sc.id,
    topic: sc.topic,
    world: sc.world,
    tier: sc.tier,
    scene: sc.scene,
    pic,
    img: artUrl(sc.id),
    lang,
    region,
    names: { name: ctx.name, friend: ctx.friend },
    order,
    prompt: q.show,
    say: q.say,
    choices,
    best: choices.findIndex((c) => c.v === 'best'),
    lesson: lesson.show,
    lessonSay: lesson.say
  };
}
