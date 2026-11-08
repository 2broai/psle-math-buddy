// Registry of every Life Skills topic and scenario.
import { TOPICS as kind } from './kind.js';
import { TOPICS as feelings } from './feelings.js';
import { TOPICS as school } from './school.js';
import { TOPICS as safe } from './safe.js';
import { TOPICS as sos } from './sos.js';
import { TOPICS as road } from './road.js';
import { TOPICS as healthy } from './healthy.js';
import { TOPICS as citizen } from './citizen.js';
import { TOPICS as online } from './online.js';

export * from './meta.js';

export const LIFE_TOPICS = [...kind, ...feelings, ...school, ...safe, ...sos, ...road, ...healthy, ...citizen, ...online].map((t, i) => ({
  ...t,
  strand: 'life',
  order: i
}));
export const LIFE_TOPIC_MAP = new Map(LIFE_TOPICS.map((t) => [t.id, t]));
export const SCENARIOS = LIFE_TOPICS.flatMap((t) => t.scenarios.map((s) => ({ ...s, topic: t.id, world: t.world })));
export const SCENARIO_MAP = new Map(SCENARIOS.map((s) => [s.id, s]));

export function getLifeTopic(id) {
  return LIFE_TOPIC_MAP.get(id);
}
export const isLifeId = (id) => typeof id === 'string' && id.startsWith('life.');
