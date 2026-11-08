// Core visual renderers. Each takes a plain props object (from a question generator)
// and returns an HTML/SVG string. Pure functions — no DOM — so tests can run them in Node.
import { esc, md } from '../markup.js';
import { mulberry32 } from '../../core/rng.js';

export const COLORS = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#facc15',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  teal: '#14b8a6',
  brown: '#a16207',
  gray: '#94a3b8',
  black: '#334155',
  white: '#ffffff'
};
export const COLOR_NAMES = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'teal'];

// E-ink mode: colours become distinct black & white patterns (defs injected by core/theme.js).
let INK = false;
export function setInkMode(on) {
  INK = !!on;
}
export function isInkMode() {
  return INK;
}
const INK_FILL = {
  red: 'url(#ink-solid)',
  blue: 'url(#ink-white)',
  green: 'url(#ink-diag)',
  yellow: 'url(#ink-dots)',
  orange: 'url(#ink-hlines)',
  purple: 'url(#ink-cross)',
  pink: 'url(#ink-light)',
  teal: 'url(#ink-dark)',
  brown: 'url(#ink-vlines)',
  gray: 'url(#ink-light)',
  black: '#111',
  white: '#fff'
};
export function col(c, fallback = '#3b82f6') {
  if (INK) return INK_FILL[c] || '#6b6b6b';
  return COLORS[c] || c || fallback;
}

const isMissing = (v) => v === '?' || v === null || v === undefined;

// ---------------------------------------------------------------- objects
function objects({ groups = [], op = null, size = 'md', layout = 'rows', perRow: perRowIn = 5, seed = 7, stack = false }) {
  // stack: groups shown one under another, each on a single row (for one-to-one matching)
  const perRow = stack ? 20 : perRowIn;
  const parts = groups.map((g, gi) => {
    const n = Math.max(0, g.count | 0);
    const emoji = esc(g.emoji || '🔵');
    let inner = '';
    if (layout === 'scatter' && n > 0) {
      const rnd = mulberry32(seed * 31 + gi * 7 + n);
      const colsN = Math.max(3, Math.ceil(Math.sqrt(n * 1.7)));
      const rowsN = Math.ceil((n * 1.7) / colsN) + 1;
      const cells = [];
      for (let i = 0; i < colsN * rowsN; i++) cells.push(i);
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      const spans = cells.slice(0, n).map((cell, i) => {
        const cx = ((cell % colsN) + 0.2 + rnd() * 0.5) / colsN;
        const cy = (Math.floor(cell / colsN) + 0.15 + rnd() * 0.5) / rowsN;
        const crossed = g.cross && i >= n - g.cross;
        return `<span class="obj${crossed ? ' crossed' : ''}" style="left:${(cx * 92).toFixed(1)}%;top:${(cy * 88).toFixed(1)}%">${emoji}</span>`;
      });
      inner = `<div class="obj-scatter" style="width:${Math.min(colsN * 2.6, 22)}em;height:${rowsN * 2.4}em">${spans.join('')}</div>`;
    } else {
      const rowsHtml = [];
      for (let r = 0; r * perRow < n; r++) {
        const cells = [];
        for (let i = r * perRow; i < Math.min(n, (r + 1) * perRow); i++) {
          const crossed = g.cross && i >= n - g.cross;
          cells.push(`<span class="obj${crossed ? ' crossed' : ''}">${emoji}</span>`);
        }
        rowsHtml.push(`<div class="obj-row">${cells.join('')}</div>`);
      }
      inner = rowsHtml.join('') || '<div class="obj-empty">&nbsp;</div>';
    }
    const label = g.label ? `<div class="obj-label">${md(g.label)}</div>` : '';
    return `<div class="obj-group${g.box === false ? ' nobox' : ''}">${inner}${label}</div>`;
  });
  const sep = op ? `<div class="obj-op">${esc(op)}</div>` : '';
  return `<div class="objects size-${esc(size)}${stack ? ' stack' : ''}">${parts.join(sep)}</div>`;
}

// ---------------------------------------------------------------- ten frame
function tenframe({ a = 0, b = 0, cross = 0, colorA = 'red', colorB = 'blue', frames = 0 }) {
  const total = a + b;
  const nf = Math.max(frames, Math.ceil(total / 10), 1);
  const C = 40;
  const out = [];
  for (let f = 0; f < nf; f++) {
    let cells = '';
    for (let i = 0; i < 10; i++) {
      const x = 4 + (i % 5) * C;
      const y = 4 + Math.floor(i / 5) * C;
      cells += `<rect x="${x}" y="${y}" width="${C}" height="${C}" fill="#fff" stroke="#334155" stroke-width="2"/>`;
      const idx = f * 10 + i;
      if (idx < total) {
        const fill = col(idx < a ? colorA : colorB);
        cells += `<circle cx="${x + C / 2}" cy="${y + C / 2}" r="${C * 0.36}" fill="${fill}" stroke="${INK ? '#111' : 'rgba(0,0,0,.25)'}" stroke-width="${INK ? 2.5 : 1.5}"/>`;
        if (idx >= total - cross) {
          cells += `<path d="M${x + 8} ${y + 8} L${x + C - 8} ${y + C - 8} M${x + C - 8} ${y + 8} L${x + 8} ${y + C - 8}" stroke="#111827" stroke-width="4" stroke-linecap="round"/>`;
        }
      }
    }
    out.push(`<svg class="tf" viewBox="0 0 208 88" role="img" aria-label="ten frame">${cells}</svg>`);
  }
  return `<div class="tenframes">${out.join('')}</div>`;
}

// ---------------------------------------------------------------- number bond
function bond({ whole, parts = [], dir = 'down', labels = false }) {
  const n = parts.length || 2;
  let W;
  let P;
  if (dir === 'right') {
    W = [58, 100];
    P = n === 3 ? [[248, 34], [248, 100], [248, 166]] : [[248, 48], [248, 152]];
  } else {
    const wy = dir === 'up' ? 156 : 44;
    const py = dir === 'up' ? 44 : 156;
    W = [160, wy];
    P = n === 3 ? [[60, py], [160, py], [260, py]] : [[78, py], [242, py]];
  }
  const R = 34;
  const node = ([x, y], v, role) => {
    const miss = isMissing(v);
    const txt = miss ? '?' : esc(v);
    const fs = String(txt).length > 3 ? 20 : 28;
    return `<g class="bn ${miss ? 'miss' : ''}"><circle cx="${x}" cy="${y}" r="${R}" fill="${miss ? '#fff7ed' : role === 'w' ? '#dbeafe' : '#fff'}" stroke="${miss ? '#f97316' : '#2563eb'}" stroke-width="4" ${miss ? 'stroke-dasharray="7 5"' : ''}/><text x="${x}" y="${y + fs / 3}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${miss ? '#ea580c' : '#0f172a'}">${txt}</text>${labels ? `<text x="${x}" y="${y + (dir === 'up' && role === 'w' ? 52 : -42)}" text-anchor="middle" font-size="13" fill="#64748b">${role === 'w' ? 'whole' : 'part'}</text>` : ''}</g>`;
  };
  const lines = P.map(([x, y]) => `<line x1="${W[0]}" y1="${W[1]}" x2="${x}" y2="${y}" stroke="#94a3b8" stroke-width="4"/>`).join('');
  const nodes = node(W, whole, 'w') + P.map((p, i) => node(p, parts[i], 'p')).join('');
  return `<svg class="bond" viewBox="0 0 320 200" role="img" aria-label="number bond">${lines}${nodes}</svg>`;
}

// ---------------------------------------------------------------- bar model
function braceH(x1, x2, y, up = true, h = 12) {
  const d = up ? -1 : 1;
  const mid = (x1 + x2) / 2;
  const hh = Math.min(h, Math.max(4, (x2 - x1) / 4));
  return `M${x1} ${y} q0 ${d * hh / 2} ${hh / 2} ${d * hh / 2} L${mid - hh / 2} ${y + (d * hh) / 2} q${hh / 2} 0 ${hh / 2} ${(d * hh) / 2} q0 ${(-d * hh) / 2} ${hh / 2} ${(-d * hh) / 2} L${x2 - hh / 2} ${y + (d * hh) / 2} q${hh / 2} 0 ${hh / 2} ${(-d * hh) / 2}`;
}
function braceV(x, y1, y2, h = 12) {
  const mid = (y1 + y2) / 2;
  const hh = Math.min(h, Math.max(4, (y2 - y1) / 4));
  return `M${x} ${y1} q${hh / 2} 0 ${hh / 2} ${hh / 2} L${x + hh / 2} ${mid - hh / 2} q0 ${hh / 2} ${hh / 2} ${hh / 2} q${-hh / 2} 0 ${-hh / 2} ${hh / 2} L${x + hh / 2} ${y2 - hh / 2} q0 ${hh / 2} ${-hh / 2} ${hh / 2}`;
}
const BAR_FILL = { blue: '#bfdbfe', orange: '#fed7aa', green: '#bbf7d0', purple: '#e9d5ff', pink: '#fbcfe8', yellow: '#fef08a', gray: '#e2e8f0', teal: '#99f6e4' };
const INK_BAR = { blue: '#e3e3e3', orange: '#ffffff', green: '#c9c9c9', purple: '#f1f1f1', pink: '#dadada', yellow: '#f6f6f6', gray: '#e8e8e8', teal: '#bdbdbd' };
const BAR_STROKE = { blue: '#2563eb', orange: '#ea580c', green: '#16a34a', purple: '#9333ea', pink: '#db2777', yellow: '#ca8a04', gray: '#64748b', teal: '#0d9488' };

/**
 * rows: [{ label, segs: [{ v, text, color, missing }] }]
 * total: { text, row = 0 }        brace above a whole row
 * diff:  { text, short = 1, long = 0 }   dashed gap on the shorter row
 * sum:   { text }                  vertical brace on the right spanning all rows
 * parts: { text, row, from, to }   brace below a run of segments (from..to index)
 */
function bar({ rows = [], total = null, diff = null, sum = null, parts = null }) {
  const LABEL_W = rows.some((r) => r.label) ? 92 : 10;
  const W = 330;
  const H = 38;
  const GAP = diff ? 30 : 22;
  const TOP = total ? 44 : 12;
  const rowLen = rows.map((r) => r.segs.reduce((s, g) => s + (Number(g.v) || 0), 0));
  const maxLen = Math.max(1, ...rowLen);
  const k = W / maxLen;
  const segW = (s) => Math.max(18, (Number(s.v) || 0) * k, s.text !== undefined && s.text !== '' ? String(s.text).length * 10 + 12 : 0);
  let svg = '';
  const rowY = rows.map((_, i) => TOP + i * (H + GAP));
  rows.forEach((r, i) => {
    const y = rowY[i];
    svg += `<text x="${LABEL_W - 10}" y="${y + H / 2 + 6}" text-anchor="end" font-size="16" font-weight="700" fill="#334155">${esc(r.label ?? '')}</text>`;
    let x = LABEL_W;
    r.segs.forEach((s) => {
      const w = segW(s);
      const miss = s.missing || s.text === '?';
      const c = s.color || 'blue';
      svg += `<rect x="${x}" y="${y}" width="${w}" height="${H}" rx="3" fill="${miss ? '#fff7ed' : INK ? INK_BAR[c] || '#fff' : BAR_FILL[c] || BAR_FILL.blue}" stroke="${miss ? '#f97316' : INK ? '#111' : BAR_STROKE[c] || BAR_STROKE.blue}" stroke-width="2.5" ${miss ? 'stroke-dasharray="6 4"' : ''}/>`;
      if (s.text !== undefined && s.text !== '') {
        const fs = String(s.text).length > 5 ? 13 : 17;
        svg += `<text x="${x + w / 2}" y="${y + H / 2 + 6}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${miss ? '#ea580c' : '#0f172a'}">${esc(s.text)}</text>`;
      }
      x += w;
    });
  });
  if (total) {
    const i = total.row ?? 0;
    const x2 = LABEL_W + rows[i].segs.reduce((acc, sg) => acc + segW(sg), 0);
    svg += `<path d="${braceH(LABEL_W, x2, rowY[i] - 4, true, 14)}" fill="none" stroke="#475569" stroke-width="2.5"/>`;
    svg += `<text x="${(LABEL_W + x2) / 2}" y="${rowY[i] - 24}" text-anchor="middle" font-size="18" font-weight="800" fill="${total.text === '?' ? '#ea580c' : '#0f172a'}">${esc(total.text)}</text>`;
  }
  if (diff) {
    const s = diff.short ?? 1;
    const l = diff.long ?? 0;
    const drawn = (row) => rows[row].segs.reduce((acc, sg) => acc + segW(sg), 0);
    const xs = LABEL_W + drawn(s);
    const xl = Math.max(xs + 24, LABEL_W + drawn(l));
    const y = rowY[s];
    if (xl > xs) {
      svg += `<rect x="${xs}" y="${y}" width="${xl - xs}" height="${H}" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>`;
      svg += `<path d="${braceH(xs, xl, y + H + 4, false, 12)}" fill="none" stroke="#475569" stroke-width="2.5"/>`;
      svg += `<text x="${(xs + xl) / 2}" y="${y + H + 26}" text-anchor="middle" font-size="16" font-weight="800" fill="${diff.text === '?' ? '#ea580c' : '#0f172a'}">${esc(diff.text)}</text>`;
    }
  }
  if (parts) {
    const i = parts.row ?? 0;
    const segs = rows[i].segs;
    let xa = LABEL_W;
    for (let j = 0; j < parts.from; j++) xa += segW(segs[j]);
    let xb = xa;
    for (let j = parts.from; j <= parts.to; j++) xb += segW(segs[j]);
    const y = rowY[i] + H + 4;
    svg += `<path d="${braceH(xa, xb, y, false, 12)}" fill="none" stroke="#475569" stroke-width="2.5"/>`;
    svg += `<text x="${(xa + xb) / 2}" y="${y + 24}" text-anchor="middle" font-size="16" font-weight="800" fill="${parts.text === '?' ? '#ea580c' : '#0f172a'}">${esc(parts.text)}</text>`;
  }
  let extraW = 0;
  if (sum && rows.length) {
    const x = LABEL_W + Math.max(W, ...rows.map((r) => r.segs.reduce((acc, sg) => acc + segW(sg), 0))) + 8;
    const y1 = rowY[0];
    const y2 = rowY[rows.length - 1] + H;
    svg += `<path d="${braceV(x, y1, y2, 14)}" fill="none" stroke="#475569" stroke-width="2.5"/>`;
    svg += `<text x="${x + 20}" y="${(y1 + y2) / 2 + 6}" font-size="18" font-weight="800" fill="${sum.text === '?' ? '#ea580c' : '#0f172a'}">${esc(sum.text)}</text>`;
    extraW = 70;
  }
  const bottomExtra = diff || parts ? 34 : 8;
  const height = TOP + rows.length * (H + GAP) - GAP + bottomExtra;
  const widest = Math.max(W, ...rows.map((r) => r.segs.reduce((acc, sg) => acc + segW(sg), 0)));
  const width = LABEL_W + widest + 12 + extraW;
  return `<svg class="barmodel" viewBox="0 0 ${width} ${height}" role="img" aria-label="bar model">${svg}</svg>`;
}

// ---------------------------------------------------------------- number line
function numberline({ min = 0, max = 10, step = 1, every = 1, labels = null, marks = [], jumps = [], hide = [] }) {
  const W = 620;
  const PAD = 34;
  const Y = jumps.length ? 100 : 60;
  const x = (v) => PAD + ((v - min) / (max - min || 1)) * (W - 2 * PAD);
  const hidden = new Set(hide.map(Number));
  const labelSet = labels ? new Set(labels.map(Number)) : null;
  let svg = `<line x1="${PAD - 18}" y1="${Y}" x2="${W - PAD + 18}" y2="${Y}" stroke="#334155" stroke-width="3"/>`;
  svg += `<path d="M${PAD - 22} ${Y} l10 -7 v14 z M${W - PAD + 22} ${Y} l-10 -7 v14 z" fill="#334155"/>`;
  const count = Math.round((max - min) / step);
  for (let i = 0; i <= count; i++) {
    const v = +(min + i * step).toFixed(4);
    const xx = x(v);
    const isLabel = labelSet ? labelSet.has(v) : i % every === 0;
    svg += `<line x1="${xx}" y1="${Y - (isLabel ? 10 : 6)}" x2="${xx}" y2="${Y + (isLabel ? 10 : 6)}" stroke="#334155" stroke-width="${isLabel ? 2.5 : 1.5}"/>`;
    if (hidden.has(v)) {
      svg += `<rect x="${xx - 15}" y="${Y + 14}" width="30" height="26" rx="6" fill="#fff7ed" stroke="#f97316" stroke-width="2" stroke-dasharray="4 3"/><text x="${xx}" y="${Y + 33}" text-anchor="middle" font-size="17" font-weight="800" fill="#ea580c">?</text>`;
    } else if (isLabel) {
      svg += `<text x="${xx}" y="${Y + 32}" text-anchor="middle" font-size="${count > 30 ? 13 : 16}" font-weight="700" fill="#0f172a">${esc(v)}</text>`;
    }
  }
  jumps.forEach((j) => {
    const x1 = x(j.from);
    const x2 = x(j.to);
    const h = Math.min(60, Math.abs(x2 - x1) * 0.55 + 14);
    const dir = x2 > x1 ? 1 : -1;
    svg += `<path d="M${x1} ${Y - 4} Q${(x1 + x2) / 2} ${Y - h} ${x2} ${Y - 4}" fill="none" stroke="#7c3aed" stroke-width="2.5"/>`;
    svg += `<path d="M${x2} ${Y - 4} l${-dir * 9} -6 l${dir * 1} 10 z" fill="#7c3aed"/>`;
    if (j.text) svg += `<text x="${(x1 + x2) / 2}" y="${Y - h / 2 - 8}" text-anchor="middle" font-size="15" font-weight="800" fill="#6d28d9">${esc(j.text)}</text>`;
  });
  marks.forEach((m) => {
    const xx = x(m.at);
    svg += `<circle cx="${xx}" cy="${Y}" r="7" fill="${INK ? '#111' : col(m.color || 'orange')}" stroke="#fff" stroke-width="2"/>`;
    if (m.text) svg += `<text x="${xx}" y="${Y - 16}" text-anchor="middle" font-size="17" font-weight="800" fill="#c2410c">${esc(m.text)}</text>`;
  });
  return `<svg class="numberline" viewBox="0 0 ${W} ${Y + 48}" role="img" aria-label="number line">${svg}</svg>`;
}

// ---------------------------------------------------------------- base ten blocks
function baseten({ h = 0, t = 0, o = 0 }) {
  const U = 8;
  let x = 6;
  let svg = '';
  const top = 6;
  for (let i = 0; i < h; i++) {
    svg += `<rect x="${x}" y="${top}" width="${U * 10}" height="${U * 10}" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.5"/>`;
    for (let k = 1; k < 10; k++) {
      svg += `<line x1="${x + k * U}" y1="${top}" x2="${x + k * U}" y2="${top + U * 10}" stroke="#60a5fa" stroke-width=".8"/><line x1="${x}" y1="${top + k * U}" x2="${x + U * 10}" y2="${top + k * U}" stroke="#60a5fa" stroke-width=".8"/>`;
    }
    x += U * 10 + 10;
  }
  if (h && (t || o)) x += 8;
  for (let i = 0; i < t; i++) {
    svg += `<rect x="${x}" y="${top}" width="${U}" height="${U * 10}" fill="#bbf7d0" stroke="#15803d" stroke-width="1.5"/>`;
    for (let k = 1; k < 10; k++) svg += `<line x1="${x}" y1="${top + k * U}" x2="${x + U}" y2="${top + k * U}" stroke="#15803d" stroke-width=".8"/>`;
    x += U + 7;
  }
  if (t && o) x += 10;
  for (let i = 0; i < o; i++) {
    const cx = x + Math.floor(i / 5) * (U + 6);
    const cy = top + U * 10 - (i % 5) * (U + 6) - U;
    svg += `<rect x="${cx}" y="${cy}" width="${U}" height="${U}" fill="#fed7aa" stroke="#c2410c" stroke-width="1.5"/>`;
  }
  if (o) x += Math.ceil(o / 5) * (U + 6);
  const width = Math.max(40, x + 6);
  return `<svg class="baseten" viewBox="0 0 ${width} ${U * 10 + 12}" style="max-width:${Math.min(100, width / 5.2)}%" role="img" aria-label="${h} hundreds ${t} tens ${o} ones">${svg}</svg>`;
}

// ---------------------------------------------------------------- place value chart
function pvchart({ cols = ['Tens', 'Ones'], values = [], dots = false }) {
  const head = cols.map((c) => `<th>${esc(c)}</th>`).join('');
  const body = values
    .map((v) => {
      if (isMissing(v)) return '<td class="miss">?</td>';
      if (dots) {
        const n = Number(v) || 0;
        return `<td class="dots">${'<span class="pv-dot"></span>'.repeat(n) || '&nbsp;'}</td>`;
      }
      return `<td>${esc(v)}</td>`;
    })
    .join('');
  return `<table class="pvchart"><thead><tr>${head}</tr></thead><tbody><tr>${body}</tr></tbody></table>`;
}

// ---------------------------------------------------------------- equation
function eqText(t) {
  return esc(t).replace(/\?|☐/g, '<span class="qbox">?</span>');
}
function equation({ text, rows = null, op = '+', result = '?', size = 'xl' }) {
  if (text !== undefined && !rows) return `<div class="eq eq-${esc(size)}">${eqText(text)}</div>`;
  const strs = rows.map(String);
  const res = String(result);
  const len = Math.max(...strs.map((s) => s.length), res.length);
  const cell = (ch) => (ch === '?' ? '<span class="vcell q">?</span>' : `<span class="vcell">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`);
  const line = (s, opCh = ' ') => `<div class="vrow"><span class="vcell op">${opCh === ' ' ? '&nbsp;' : esc(opCh)}</span>${s.padStart(len, ' ').split('').map(cell).join('')}</div>`;
  const body = strs.map((s, i) => line(s, i === strs.length - 1 ? op : ' ')).join('');
  return `<div class="vert">${body}<div class="vline"></div>${line(res)}</div>`;
}

// ---------------------------------------------------------------- shapes
const PI = Math.PI;
function poly(n, r = 42, cx = 50, cy = 52, rot = -90) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = ((rot + (360 / n) * i) * PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}
function starPts(cx = 50, cy = 52, R1 = 44, R2 = 19) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? R2 : R1;
    const a = ((-90 + 36 * i) * PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}
export const SHAPE_NAMES = [
  'circle', 'oval', 'square', 'rectangle', 'triangle', 'rightTriangle', 'semicircle', 'quarter',
  'star', 'heart', 'pentagon', 'hexagon', 'octagon', 'diamond', 'trapezium', 'parallelogram', 'kite'
];
function shapeBody(shape, fill, stroke) {
  const a = `fill="${fill}" stroke="${stroke}" stroke-width="3.5" stroke-linejoin="round"`;
  switch (shape) {
    case 'circle': return `<circle cx="50" cy="50" r="40" ${a}/>`;
    case 'oval': return `<ellipse cx="50" cy="50" rx="45" ry="27" ${a}/>`;
    case 'square': return `<rect x="13" y="13" width="74" height="74" ${a}/>`;
    case 'rectangle': return `<rect x="5" y="27" width="90" height="46" ${a}/>`;
    case 'triangle': return `<polygon points="50,9 93,86 7,86" ${a}/>`;
    case 'rightTriangle': return `<polygon points="14,10 14,88 88,88" ${a}/>`;
    case 'semicircle': return `<path d="M7 70 A43 43 0 0 1 93 70 Z" ${a}/>`;
    case 'quarter': return `<path d="M14 88 L14 14 A74 74 0 0 1 88 88 Z" ${a}/>`;
    case 'star': return `<polygon points="${starPts()}" ${a}/>`;
    case 'heart': return `<path d="M50 88 C20 66 6 50 10 32 C14 14 36 10 50 28 C64 10 86 14 90 32 C94 50 80 66 50 88 Z" ${a}/>`;
    case 'pentagon': return `<polygon points="${poly(5, 43, 50, 54)}" ${a}/>`;
    case 'hexagon': return `<polygon points="${poly(6, 43, 50, 50, 0)}" ${a}/>`;
    case 'octagon': return `<polygon points="${poly(8, 43, 50, 50, 22.5)}" ${a}/>`;
    case 'diamond': return `<polygon points="50,5 88,50 50,95 12,50" ${a}/>`;
    case 'trapezium': return `<polygon points="28,24 72,24 94,78 6,78" ${a}/>`;
    case 'parallelogram': return `<polygon points="30,24 95,24 70,78 5,78" ${a}/>`;
    case 'kite': return `<polygon points="50,5 80,38 50,95 20,38" ${a}/>`;
    default: return `<circle cx="50" cy="50" r="40" ${a}/>`;
  }
}
/** Single shape as an SVG string. spec: {shape, color, rot, size, outline} */
export function shapeSVG(spec, px = 64) {
  const { shape = 'circle', color = 'blue', rot = 0, size = 1, outline = false } = spec || {};
  const fill = outline ? '#ffffff' : col(color);
  const stroke = outline || INK ? '#111' : 'rgba(15,23,42,.55)';
  const s = Math.max(0.3, Math.min(1.3, size));
  const tr = `translate(50 50) rotate(${rot}) scale(${s}) translate(-50 -50)`;
  return `<svg class="shape" viewBox="-6 -6 112 112" width="${px}" height="${px}" role="img" aria-label="${esc(shape)}"><g transform="${tr}">${shapeBody(shape, fill, stroke)}</g></svg>`;
}
function shapes({ items = [], labels = null, px = 64 }) {
  const cells = items.map((it, i) => {
    const lab = labels ? labels[i] : it.label;
    return `<div class="shape-cell">${shapeSVG(it, it.px || px)}${lab !== undefined && lab !== null ? `<div class="shape-label">${md(String(lab))}</div>` : ''}</div>`;
  });
  return `<div class="shapes-row">${cells.join('')}</div>`;
}

// ---------------------------------------------------------------- sequence / pattern
function tile(v) {
  if (isMissing(v)) return '<div class="tile miss">?</div>';
  if (typeof v === 'object') return `<div class="tile shape">${shapeSVG(v, 48)}</div>`;
  return `<div class="tile">${esc(v)}</div>`;
}
function sequence({ items = [], between = null }) {
  if (!between) return `<div class="seq">${items.map(tile).join('')}</div>`;
  const out = [];
  items.forEach((v, i) => {
    out.push(tile(v));
    if (i < items.length - 1) out.push(`<div class="seq-gap">${esc(between[i] ?? '')}</div>`);
  });
  return `<div class="seq">${out.join('')}</div>`;
}

// ---------------------------------------------------------------- ordinal row
function ordinal({ items = [], ends = ['LEFT', 'RIGHT'], numbers = false, highlight = -1 }) {
  const tiles = items
    .map((e, i) => `<div class="tile${i === highlight ? ' hl' : ''}">${typeof e === 'object' ? shapeSVG(e, 44) : esc(e)}${numbers ? `<small>${i + 1}</small>` : ''}</div>`)
    .join('');
  return `<div class="ordinal"><div class="ord-ends"><span>⬅ ${esc(ends[0])}</span><span>${esc(ends[1])} ➡</span></div><div class="seq">${tiles}</div></div>`;
}

// ---------------------------------------------------------------- array
function array({ rows = 2, cols = 3, emoji = '🔵', boxRows = false }) {
  const r = [];
  for (let i = 0; i < rows; i++) r.push(`<div class="arr-row${boxRows ? ' boxed' : ''}">${`<span>${esc(emoji)}</span>`.repeat(cols)}</div>`);
  return `<div class="array">${r.join('')}</div>`;
}

// ---------------------------------------------------------------- hundred chart
function hundredchart({ start = 1, rows = 10, cols = 10, missing = [], highlight = [] }) {
  const miss = new Set(missing);
  const hl = new Set(highlight);
  let html = '<table class="hchart"><tbody>';
  for (let r = 0; r < rows; r++) {
    html += '<tr>';
    for (let c = 0; c < cols; c++) {
      const v = start + r * cols + c;
      if (miss.has(v)) html += '<td class="miss">?</td>';
      else html += `<td${hl.has(v) ? ' class="hl"' : ''}>${v}</td>`;
    }
    html += '</tr>';
  }
  return `${html}</tbody></table>`;
}

// ---------------------------------------------------------------- big text
function text({ text: t = '', size = 'xl' }) {
  return `<div class="vtext vtext-${esc(size)}">${md(t)}</div>`;
}

// ---------------------------------------------------------------- dice / domino dots
const PIPS = { 0: [], 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
function face(n, x0, color = '#0f172a') {
  const pos = PIPS[n] || [];
  return pos.map((p) => `<circle cx="${x0 + 18 + (p % 3) * 22}" cy="${18 + Math.floor(p / 3) * 22}" r="7.5" fill="${color}"/>`).join('');
}
function dots({ n = 0, style = 'dice', a = 0, b = 0 }) {
  if (style === 'domino') {
    return `<svg class="dice" viewBox="0 0 170 86" role="img" aria-label="domino"><rect x="2" y="2" width="166" height="82" rx="12" fill="#fff" stroke="#334155" stroke-width="3"/><line x1="85" y1="8" x2="85" y2="78" stroke="#334155" stroke-width="3"/>${face(a, 5)}${face(b, 90)}</svg>`;
  }
  const faces = n > 6 ? [6, n - 6] : [n];
  return faces
    .map((k) => `<svg class="dice" viewBox="0 0 84 84" role="img" aria-label="dice ${k}"><rect x="2" y="2" width="80" height="80" rx="14" fill="#fff" stroke="#334155" stroke-width="3"/>${face(k, 0, '#dc2626')}</svg>`)
    .join('');
}

// ---------------------------------------------------------------- position grid
function grid({ rows = 3, cols = 3, cells = [] }) {
  const map = new Map(cells.map((c) => [`${c.r},${c.c}`, c]));
  let html = '<table class="pgrid"><tbody>';
  for (let r = 0; r < rows; r++) {
    html += '<tr>';
    for (let c = 0; c < cols; c++) {
      const cell = map.get(`${r},${c}`);
      html += `<td>${cell ? `${esc(cell.e || '')}${cell.label ? `<small>${esc(cell.label)}</small>` : ''}` : ''}</td>`;
    }
    html += '</tr>';
  }
  return `${html}</tbody></table>`;
}

// ---------------------------------------------------------------- analog clock
function clock({ h = 12, m = 0, digital = false, label = '' }) {
  let svg = '<circle cx="100" cy="100" r="94" fill="#fff" stroke="#2563eb" stroke-width="7"/>';
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 * PI) / 180;
    const big = i % 5 === 0;
    const r1 = big ? 78 : 83;
    svg += `<line x1="${100 + r1 * Math.sin(a)}" y1="${100 - r1 * Math.cos(a)}" x2="${100 + 88 * Math.sin(a)}" y2="${100 - 88 * Math.cos(a)}" stroke="#334155" stroke-width="${big ? 3 : 1.2}"/>`;
  }
  for (let n = 1; n <= 12; n++) {
    const a = (n * 30 * PI) / 180;
    svg += `<text x="${100 + 64 * Math.sin(a)}" y="${100 - 64 * Math.cos(a) + 7}" text-anchor="middle" font-size="19" font-weight="700" fill="#0f172a">${n}</text>`;
  }
  const ha = ((h % 12) + m / 60) * 30;
  const ma = m * 6;
  svg += `<line x1="100" y1="100" x2="100" y2="50" stroke="#dc2626" stroke-width="8" stroke-linecap="round" transform="rotate(${ha} 100 100)"/>`;
  svg += `<line x1="100" y1="100" x2="100" y2="28" stroke="#16a34a" stroke-width="5" stroke-linecap="round" transform="rotate(${ma} 100 100)"/>`;
  svg += '<circle cx="100" cy="100" r="7" fill="#0f172a"/>';
  const dig = digital ? `<div class="digital">${h}:${String(m).padStart(2, '0')}</div>` : '';
  const lab = label ? `<div class="clock-label">${md(label)}</div>` : '';
  return `<div class="clock-wrap"><svg class="clock" viewBox="0 0 200 200" role="img" aria-label="clock">${svg}</svg>${dig}${lab}</div>`;
}

// ---------------------------------------------------------------- Singapore money
const COIN = {
  5: { r: 21, fill: '#e8c25a', ring: '#b8912a', t: '5¢' },
  10: { r: 23, fill: '#d6dbe1', ring: '#8d96a3', t: '10¢' },
  20: { r: 26, fill: '#d6dbe1', ring: '#8d96a3', t: '20¢' },
  50: { r: 29, fill: '#d6dbe1', ring: '#8d96a3', t: '50¢' },
  100: { r: 30, fill: '#ecc94b', ring: '#a0802a', t: '$1' }
};
const NOTE = {
  2: { fill: '#c4b5fd', ink: '#5b21b6' },
  5: { fill: '#86efac', ink: '#166534' },
  10: { fill: '#fca5a5', ink: '#991b1b' },
  50: { fill: '#93c5fd', ink: '#1e40af' },
  100: { fill: '#fdba74', ink: '#9a3412' }
};
function moneyVis({ items = [] }) {
  const out = items.map((it) => {
    if (it.c) {
      const c = COIN[it.c] || COIN[10];
      const s = c.r * 2 + 6;
      return `<svg class="coin" viewBox="0 0 ${s} ${s}" width="${s * 1.25}" height="${s * 1.25}" role="img" aria-label="${c.t} coin"><circle cx="${s / 2}" cy="${s / 2}" r="${c.r}" fill="${c.fill}" stroke="${c.ring}" stroke-width="3"/><circle cx="${s / 2}" cy="${s / 2}" r="${c.r - 6}" fill="none" stroke="${c.ring}" stroke-width="1" opacity=".6"/><text x="${s / 2}" y="${s / 2 + 6}" text-anchor="middle" font-size="${c.r > 25 ? 17 : 15}" font-weight="800" fill="#1f2937">${c.t}</text></svg>`;
    }
    const n = NOTE[it.n] || NOTE[2];
    return `<svg class="note" viewBox="0 0 130 64" role="img" aria-label="$${it.n} note"><rect x="2" y="2" width="126" height="60" rx="6" fill="${n.fill}" stroke="${n.ink}" stroke-width="2.5"/><circle cx="96" cy="32" r="18" fill="rgba(255,255,255,.45)"/><text x="12" y="20" font-size="9" font-weight="700" fill="${n.ink}">SINGAPORE</text><text x="12" y="50" font-size="24" font-weight="800" fill="${n.ink}">$${it.n}</text><text x="96" y="39" text-anchor="middle" font-size="18" font-weight="800" fill="${n.ink}">${it.n}</text></svg>`;
  });
  return `<div class="money-row">${out.join('')}</div>`;
}

// ---------------------------------------------------------------- picture graph
function picgraph({ title = '', rows = [], icon = '⭐', scale = 1, unit = 'child', units = 'children', key = true }) {
  const body = rows
    .map((r) => `<tr><th>${esc(r.label)}</th><td>${`<span>${esc(r.icon || icon)}</span>`.repeat(Math.max(0, r.n | 0))}</td></tr>`)
    .join('');
  const k = key ? `<div class="pg-key">Each ${esc(icon)} stands for ${scale} ${esc(scale === 1 ? unit : units)}.</div>` : '';
  return `<div class="picgraph">${title ? `<div class="pg-title">${md(title)}</div>` : ''}<table><tbody>${body}</tbody></table>${k}</div>`;
}

// ---------------------------------------------------------------- lengths / heights
function lengths({ items = [], units = false, unitEmoji = null, vertical = false }) {
  const maxLen = Math.max(1, ...items.map((i) => (i.len || 0) + (i.offset || 0)));
  if (vertical) {
    const U = Math.min(26, 220 / maxLen);
    const H = maxLen * U + 10;
    const BW = 46;
    let svg = '';
    items.forEach((it, i) => {
      const x = 20 + i * (BW + 34);
      const h = it.len * U;
      svg += `<rect x="${x}" y="${H - h}" width="${BW}" height="${h}" rx="4" fill="${col(it.color || 'blue')}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`;
      if (units) for (let k = 1; k < it.len; k++) svg += `<line x1="${x}" y1="${H - k * U}" x2="${x + BW}" y2="${H - k * U}" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>`;
      if (it.e) svg += `<text x="${x + BW / 2}" y="${H - h - 6}" text-anchor="middle" font-size="22">${esc(it.e)}</text>`;
      svg += `<text x="${x + BW / 2}" y="${H + 24}" text-anchor="middle" font-size="17" font-weight="800" fill="#0f172a">${esc(it.label ?? '')}</text>`;
    });
    const W = 20 + items.length * (BW + 34);
    return `<svg class="lengths" viewBox="0 -30 ${W} ${H + 64}" role="img" aria-label="heights">${svg}<line x1="6" y1="${H}" x2="${W}" y2="${H}" stroke="#334155" stroke-width="3"/></svg>`;
  }
  const U = Math.min(40, 470 / maxLen);
  const LW = 60;
  const RH = unitEmoji ? 64 : 44;
  let svg = '';
  items.forEach((it, i) => {
    const y = 8 + i * RH;
    const x0 = LW + (it.offset || 0) * U;
    const w = it.len * U;
    svg += `<text x="${LW - 12}" y="${y + 21}" text-anchor="end" font-size="17" font-weight="800" fill="#0f172a">${esc(it.label ?? '')}</text>`;
    svg += `<rect x="${x0}" y="${y + 4}" width="${w}" height="24" rx="12" fill="${col(it.color || 'blue')}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`;
    if (units) for (let k = 1; k < it.len; k++) svg += `<line x1="${x0 + k * U}" y1="${y + 4}" x2="${x0 + k * U}" y2="${y + 28}" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>`;
    if (unitEmoji) for (let k = 0; k < it.len; k++) svg += `<text x="${x0 + k * U + U / 2}" y="${y + 52}" text-anchor="middle" font-size="${Math.min(22, U * 0.8)}">${esc(unitEmoji)}</text>`;
  });
  const W = LW + maxLen * U + 16;
  return `<svg class="lengths" viewBox="0 0 ${W} ${items.length * RH + 12}" role="img" aria-label="lengths">${svg}</svg>`;
}

export const VISUALS = {
  objects,
  tenframe,
  bond,
  bar,
  numberline,
  baseten,
  pvchart,
  equation,
  shapes,
  sequence,
  ordinal,
  array,
  hundredchart,
  text,
  dots,
  grid,
  clock,
  money: moneyVis,
  picgraph,
  lengths
};
