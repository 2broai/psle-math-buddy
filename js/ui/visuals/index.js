// Visual registry. Each module exports VISUALS = { typeName: (props) => htmlString }.
// Strand-specific visuals live in their own files so they can be developed independently.
import { VISUALS as CORE } from './core.js';
import { VISUALS as MEASURE } from './measure.js';
import { VISUALS as GEOMETRY } from './geometry.js';

const REG = { ...CORE, ...MEASURE, ...GEOMETRY };

export const VISUAL_TYPES = Object.keys(REG);

export function renderVisual(v) {
  if (!v || !v.type) return '';
  const fn = REG[v.type];
  if (!fn) throw new Error(`Unknown visual type: ${v.type}`);
  return `<div class="vis vis-${v.type}">${fn(v)}</div>`;
}

export function renderVisuals(list) {
  return (list || []).map(renderVisual).join('');
}
