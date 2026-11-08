// Curriculum registry: every skill from every content module, in learning order.
import { SKILLS as early } from './gen/early.js';
import { SKILLS as numbers } from './gen/numbers.js';
import { SKILLS as addsub } from './gen/addsub.js';
import { SKILLS as muldiv } from './gen/muldiv.js';
import { SKILLS as fractions } from './gen/fractions.js';
import { SKILLS as money } from './gen/money.js';
import { SKILLS as time } from './gen/time.js';
import { SKILLS as measure } from './gen/measure.js';
import { SKILLS as geometry } from './gen/geometry.js';
import { SKILLS as data } from './gen/data.js';
import { SKILLS as thinking } from './gen/thinking.js';

import { LEVEL_IDS } from './meta.js';

export * from './meta.js';

const MODULES = { early, numbers, addsub, muldiv, fractions, money, time, measure, geometry, data, thinking };

export const SKILLS = Object.entries(MODULES).flatMap(([mod, list]) =>
  list.map((s, i) => ({ ...s, module: mod, seq: i }))
);

// Learning order: level, then unit, then position inside its module file.
const levelRank = (l) => LEVEL_IDS.indexOf(l);
SKILLS.sort((a, b) => levelRank(a.level) - levelRank(b.level) || (a.unit || 0) - (b.unit || 0) || a.seq - b.seq);
SKILLS.forEach((s, i) => {
  s.order = i;
});

export const SKILL_MAP = new Map(SKILLS.map((s) => [s.id, s]));

export function getSkill(id) {
  return SKILL_MAP.get(id);
}

export function skillsFor({ level, strand, unit } = {}) {
  return SKILLS.filter(
    (s) => (!level || s.level === level) && (!strand || s.strand === strand) && (unit === undefined || s.unit === unit)
  );
}

