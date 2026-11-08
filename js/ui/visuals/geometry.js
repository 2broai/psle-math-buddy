// Geometry, fraction and graph visuals (used by fractions.js, geometry.js and data.js).
// Pure functions: props -> HTML/SVG string (no DOM), so tests can render them in Node.
// Layout uses inline styles so the pictures look right whatever the page CSS is.
//
// fraction  { shape:'circle'|'rect'|'square'|'bar', parts, shaded?=0, shadedIdx?:[i..] (overrides shaded),
//             shaded2?, color2? (a second shaded group after the first, e.g. for addition),
//             unequal?:bool, weights?:[..] (relative part sizes), rows?, cols? (rect/square drawn as a grid),
//             color?='orange', px?, label? }
// fracbars  { rows:[{ parts, shaded, label?, color? }], width?=300 }      aligned fraction strips (comparing)
// solids    { items:[{ solid:'cube'|'cuboid'|'cylinder'|'cone'|'sphere'|'pyramid', color?, label? } | '?'], px?=86 }
// angle     { deg, rot?=0 (direction of the first arm, degrees anticlockwise from →),
//             mark?:'auto'|'right'|'arc'|'none', label?, color? }
// gridshape { rows, cols, cells?:[[r,c]..] | figures?:[{ cells, color?, label? }], color?, cell?=26, key? }
// rectdim   { w, h, top?, right?, bottom?, left? (side labels, '?' shown in orange), grid?:bool, color? }
// bargraph  { title?, bars:[{ label, value }], max, step, horizontal?:bool, axis? (value-axis title),
//             color?, showValues?:bool, missing?:index (bar drawn dashed with '?') }
// lines     { kind:'parallel'|'perpendicular'|'neither', rot?=0, meet?:'cross'|'T'|'L' (perpendicular),
//             skew?=35 (angle for 'neither'), touch?:bool ('neither' segments cross), mark?:bool, label? }
// polygon   { points:[[x,y]..] (0–100 box, y down), labels?:['A','B'..] (vertex letters),
//             rightMarks?:[vertex idx], sideLabels?:[label for side i→i+1], color?, grid?:bool }
// shapepic  { parts:[{ shape:'rect'|'circle'|'oval'|'triangle'|'rightTriangle'|'semicircle'|'quarter',
//             x, y, w, h, rot?, color? }] }   a picture built from shapes in a 200×200 box
import { esc, md } from '../markup.js';
import { COLORS } from './core.js';

const PI = Math.PI;
const r1 = (n) => Math.round(n * 10) / 10;

function hex(c, fallback = '#3b82f6') {
  const h = COLORS[c] || c;
  return typeof h === 'string' && /^#[0-9a-f]{6}$/i.test(h) ? h : fallback;
}
/** t > 0 mixes towards white, t < 0 towards black. */
function shade(c, t) {
  const h = hex(c);
  const rgb = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const target = t > 0 ? 255 : 0;
  const k = Math.abs(t);
  const [r, g, b] = rgb.map((v) => Math.round(v + (target - v) * k));
  return `rgb(${r},${g},${b})`;
}
function svgOpen(vbW, vbH, px, label, minX = 0, minY = 0) {
  const w = Math.round(px);
  const h = Math.round((px * vbH) / vbW);
  return `<svg viewBox="${r1(minX)} ${r1(minY)} ${r1(vbW)} ${r1(vbH)}" width="${w}" height="${h}" style="max-width:100%;height:auto" role="img" aria-label="${esc(label)}">`;
}
const FONT = 'font-family="Fredoka, Nunito, system-ui, sans-serif"';

// ---------------------------------------------------------------- fraction
const UNEQUAL_W = [1, 1.9, 0.7, 1.5, 0.85, 2.2, 1.2, 0.6, 1.7, 1.05, 0.75, 1.35];
function partWeights(n, unequal, weights) {
  if (Array.isArray(weights) && weights.length === n) return weights;
  if (!unequal) return Array(n).fill(1);
  return Array.from({ length: n }, (_, i) => UNEQUAL_W[i % UNEQUAL_W.length]);
}
function sector(cx, cy, r, a0, a1) {
  const p = (a) => [cx + r * Math.sin((a * PI) / 180), cy - r * Math.cos((a * PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${cx} ${cy} L${r1(x0)} ${r1(y0)} A${r} ${r} 0 ${large} 1 ${r1(x1)} ${r1(y1)} Z`;
}
function fraction({
  shape = 'circle',
  parts = 4,
  shaded = 0,
  shadedIdx = null,
  shaded2 = 0,
  color = 'orange',
  color2 = 'blue',
  unequal = false,
  weights = null,
  rows = 0,
  cols = 0,
  px = 0,
  label = ''
}) {
  const n = Math.max(1, parts | 0);
  const set1 = new Set(Array.isArray(shadedIdx) ? shadedIdx : Array.from({ length: Math.min(n, shaded | 0) }, (_, i) => i));
  const k1 = Array.isArray(shadedIdx) ? 0 : Math.min(n, shaded | 0);
  const set2 = new Set(Array.from({ length: Math.max(0, Math.min(n - k1, shaded2 | 0)) }, (_, i) => k1 + i));
  const fillOf = (i) => (set1.has(i) ? hex(color, COLORS.orange) : set2.has(i) ? hex(color2, COLORS.blue) : '#ffffff');
  const stroke = '#334155';
  let svg = '';
  let vbW;
  let vbH;
  if (shape === 'circle') {
    vbW = 120;
    vbH = 120;
    if (n === 1) svg = `<circle cx="60" cy="60" r="54" fill="${fillOf(0)}" stroke="${stroke}" stroke-width="3"/>`;
    else {
      const w = partWeights(n, unequal, weights);
      const tot = w.reduce((a, b) => a + b, 0);
      let acc = 0;
      for (let i = 0; i < n; i++) {
        const a0 = (acc / tot) * 360;
        acc += w[i];
        const a1 = (acc / tot) * 360;
        svg += `<path d="${sector(60, 60, 54, a0, a1)}" fill="${fillOf(i)}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>`;
      }
    }
  } else {
    const [W, H] = shape === 'bar' ? [250, 44] : shape === 'square' ? [120, 120] : [170, 110];
    vbW = W + 10;
    vbH = H + 10;
    const grid = rows > 0 && cols > 0 && rows * cols === n && !unequal;
    if (grid) {
      const cw = W / cols;
      const ch = H / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          svg += `<rect x="${r1(5 + c * cw)}" y="${r1(5 + r * ch)}" width="${r1(cw)}" height="${r1(ch)}" fill="${fillOf(i)}" stroke="${stroke}" stroke-width="2.5"/>`;
        }
      }
    } else {
      const w = partWeights(n, unequal, weights);
      const tot = w.reduce((a, b) => a + b, 0);
      let x = 5;
      for (let i = 0; i < n; i++) {
        const ww = (W * w[i]) / tot;
        svg += `<rect x="${r1(x)}" y="5" width="${r1(ww)}" height="${H}" fill="${fillOf(i)}" stroke="${stroke}" stroke-width="2.5"/>`;
        x += ww;
      }
    }
  }
  const size = px || (shape === 'bar' ? 260 : shape === 'rect' ? 180 : shape === 'square' ? 140 : 150);
  const lab = label ? `<div style="text-align:center;font-weight:800;margin-top:4px">${md(String(label))}</div>` : '';
  return `<div style="display:inline-block;text-align:center">${svgOpen(vbW, vbH, size, 'fraction picture')}${svg}</svg>${lab}</div>`;
}

function fracbars({ rows = [], width = 300 }) {
  const out = rows.map((row) => {
    const n = Math.max(1, row.parts | 0);
    const k = Math.max(0, Math.min(n, row.shaded | 0));
    const H = 34;
    const cw = width / n;
    let cells = '';
    for (let i = 0; i < n; i++) {
      cells += `<rect x="${r1(2 + i * cw)}" y="2" width="${r1(cw)}" height="${H}" fill="${i < k ? hex(row.color || 'orange', COLORS.orange) : '#ffffff'}" stroke="#334155" stroke-width="2"/>`;
    }
    const lab = row.label !== undefined && row.label !== null ? md(String(row.label)) : '';
    return `<div style="display:flex;align-items:center;gap:10px;margin:4px 0"><div style="min-width:46px;text-align:right;font-weight:800;font-size:1.1em">${lab}</div>${svgOpen(width + 4, H + 4, width, 'fraction bar')}${cells}</svg></div>`;
  });
  return `<div style="display:inline-block">${out.join('')}</div>`;
}

// ---------------------------------------------------------------- 3D solids
function solidBody(solid, color) {
  const base = hex(color, COLORS.blue);
  const light = shade(base, 0.4);
  const dark = shade(base, -0.25);
  const S = 'stroke="#1e293b" stroke-width="2.2" stroke-linejoin="round"';
  const D = 'stroke="#1e293b" stroke-width="1.6" stroke-dasharray="4 3" fill="none"';
  switch (solid) {
    case 'cube':
      return `<polygon points="18,40 62,40 62,84 18,84" fill="${base}" ${S}/><polygon points="18,40 36,22 80,22 62,40" fill="${light}" ${S}/><polygon points="62,40 80,22 80,66 62,84" fill="${dark}" ${S}/>`;
    case 'cuboid':
      return `<polygon points="6,48 68,48 68,84 6,84" fill="${base}" ${S}/><polygon points="6,48 26,32 88,32 68,48" fill="${light}" ${S}/><polygon points="68,48 88,32 88,68 68,84" fill="${dark}" ${S}/>`;
    case 'cylinder':
      return `<path d="M22 26 L22 78 A28 9 0 0 0 78 78 L78 26 Z" fill="${base}" ${S}/><path d="M22 78 A28 9 0 0 1 78 78" ${D}/><ellipse cx="50" cy="26" rx="28" ry="9" fill="${light}" ${S}/>`;
    case 'cone':
      return `<path d="M18 78 L50 12 L82 78 A32 9 0 0 1 18 78 Z" fill="${base}" ${S}/><path d="M18 78 A32 9 0 0 1 82 78" ${D}/>`;
    case 'sphere':
      return `<circle cx="50" cy="50" r="36" fill="${base}" ${S}/><path d="M14 50 A36 11 0 0 0 86 50" fill="none" stroke="#1e293b" stroke-width="1.6"/><path d="M14 50 A36 11 0 0 1 86 50" ${D}/><ellipse cx="37" cy="35" rx="9" ry="6" fill="rgba(255,255,255,.55)"/>`;
    case 'pyramid':
      return `<polygon points="14,80 64,80 50,14" fill="${base}" ${S}/><polygon points="64,80 86,64 50,14" fill="${dark}" ${S}/><path d="M14 80 L36 64 L86 64 M36 64 L50 14" ${D}/>`;
    default:
      return `<circle cx="50" cy="50" r="36" fill="${base}" ${S}/>`;
  }
}
function solids({ items = [], px = 86 }) {
  const cells = items.map((it) => {
    if (it === '?' || it === null || it === undefined) {
      return `<div style="display:flex;flex-direction:column;align-items:center"><div style="width:${px}px;height:${px}px;border:3px dashed #f97316;border-radius:14px;background:#fff7ed;display:flex;align-items:center;justify-content:center;font-size:${Math.round(px / 2.6)}px;font-weight:800;color:#ea580c">?</div></div>`;
    }
    const lab = it.label !== undefined && it.label !== null ? `<div style="font-weight:800;margin-top:2px">${md(String(it.label))}</div>` : '';
    return `<div style="display:flex;flex-direction:column;align-items:center">${svgOpen(100, 100, it.px || px, it.solid || 'solid')}${solidBody(it.solid, it.color || 'blue')}</svg>${lab}</div>`;
  });
  return `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:flex-end">${cells.join('')}</div>`;
}

// ---------------------------------------------------------------- angle
function angle({ deg = 90, rot = 0, mark = 'auto', len = 80, label = '', color = 'blue' }) {
  const at = (a, r) => [r * Math.cos((a * PI) / 180), -r * Math.sin((a * PI) / 180)];
  const [x1, y1] = at(rot, len);
  const [x2, y2] = at(rot + deg, len);
  const xs = [0, x1, x2];
  const ys = [0, y1, y2];
  let minX = Math.min(...xs) - 16;
  let maxX = Math.max(...xs) + 16;
  let minY = Math.min(...ys) - 16;
  let maxY = Math.max(...ys) + 16;
  if (maxX - minX < 90) {
    const c = (maxX + minX) / 2;
    minX = c - 45;
    maxX = c + 45;
  }
  if (maxY - minY < 90) {
    const c = (maxY + minY) / 2;
    minY = c - 45;
    maxY = c + 45;
  }
  const ink = shade(color, -0.45);
  let svg = '';
  const isRight = Math.abs(deg - 90) < 0.01;
  if (mark === 'right' || (mark === 'auto' && isRight)) {
    const s = 15;
    const [ax, ay] = at(rot, s);
    const [bx, by] = at(rot + 90, s);
    svg += `<path d="M${r1(ax)} ${r1(ay)} L${r1(ax + bx)} ${r1(ay + by)} L${r1(bx)} ${r1(by)}" fill="none" stroke="#dc2626" stroke-width="2.5"/>`;
  } else if (mark === 'arc' || mark === 'auto') {
    const r = 22;
    const [ax, ay] = at(rot, r);
    const [bx, by] = at(rot + deg, r);
    svg += `<path d="M${r1(ax)} ${r1(ay)} A${r} ${r} 0 ${deg > 180 ? 1 : 0} 0 ${r1(bx)} ${r1(by)}" fill="none" stroke="#dc2626" stroke-width="2.5"/>`;
  }
  svg += `<line x1="0" y1="0" x2="${r1(x1)}" y2="${r1(y1)}" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  svg += `<line x1="0" y1="0" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  svg += `<circle cx="0" cy="0" r="4.5" fill="${ink}"/>`;
  const w = maxX - minX;
  const h = maxY - minY;
  const lab = label ? `<div style="text-align:center;font-weight:800">${md(String(label))}</div>` : '';
  return `<div style="display:inline-block;text-align:center">${svgOpen(w, h, Math.min(200, w * 1.15), 'angle', minX, minY)}${svg}</svg>${lab}</div>`;
}

// ---------------------------------------------------------------- figures on a square grid
function gridshape({ rows = 6, cols = 8, cells = null, figures = null, color = 'blue', cell = 26, key = '' }) {
  const figs = figures || [{ cells: cells || [], color, label: '' }];
  const P = 4;
  const W = cols * cell;
  const H = rows * cell;
  let svg = `<rect x="${P}" y="${P}" width="${W}" height="${H}" fill="#ffffff"/>`;
  figs.forEach((f) => {
    const fill = shade(f.color || color, 0.5);
    (f.cells || []).forEach(([r, c]) => {
      svg += `<rect x="${P + c * cell}" y="${P + r * cell}" width="${cell}" height="${cell}" fill="${fill}"/>`;
    });
  });
  for (let r = 0; r <= rows; r++) svg += `<line x1="${P}" y1="${P + r * cell}" x2="${P + W}" y2="${P + r * cell}" stroke="#cbd5e1" stroke-width="1"/>`;
  for (let c = 0; c <= cols; c++) svg += `<line x1="${P + c * cell}" y1="${P}" x2="${P + c * cell}" y2="${P + H}" stroke="#cbd5e1" stroke-width="1"/>`;
  figs.forEach((f) => {
    const list = f.cells || [];
    const set = new Set(list.map(([r, c]) => `${r},${c}`));
    const ink = shade(f.color || color, -0.35);
    const edge = (xa, ya, xb, yb) => `<line x1="${xa}" y1="${ya}" x2="${xb}" y2="${yb}" stroke="${ink}" stroke-width="3" stroke-linecap="square"/>`;
    list.forEach(([r, c]) => {
      const x = P + c * cell;
      const y = P + r * cell;
      if (!set.has(`${r - 1},${c}`)) svg += edge(x, y, x + cell, y);
      if (!set.has(`${r + 1},${c}`)) svg += edge(x, y + cell, x + cell, y + cell);
      if (!set.has(`${r},${c - 1}`)) svg += edge(x, y, x, y + cell);
      if (!set.has(`${r},${c + 1}`)) svg += edge(x + cell, y, x + cell, y + cell);
    });
    if (f.label && list.length) {
      const [lr, lc] = list[0];
      svg += `<text x="${P + lc * cell + cell / 2}" y="${P + lr * cell + cell / 2 + 6}" text-anchor="middle" font-size="17" font-weight="800" fill="${ink}" ${FONT}>${esc(f.label)}</text>`;
    }
  });
  const k = key ? `<div style="text-align:center;font-weight:700;color:#475569;margin-top:4px">${md(String(key))}</div>` : '';
  return `<div style="display:inline-block">${svgOpen(W + 2 * P, H + 2 * P, Math.min(420, (W + 2 * P) * 1.1), 'figure on a grid')}${svg}</svg>${k}</div>`;
}

// ---------------------------------------------------------------- rectangle with labelled sides
function rectdim({ w = 6, h = 4, top, right, bottom, left, grid = false, color = 'teal' }) {
  const scale = Math.min(230 / w, 130 / h);
  const RW = w * scale;
  const RH = h * scale;
  const PL = 70;
  const PT = 34;
  let svg = `<rect x="${PL}" y="${PT}" width="${r1(RW)}" height="${r1(RH)}" fill="${shade(color, 0.6)}" stroke="${shade(color, -0.35)}" stroke-width="3"/>`;
  if (grid) {
    for (let i = 1; i < w; i++) svg += `<line x1="${r1(PL + i * scale)}" y1="${PT}" x2="${r1(PL + i * scale)}" y2="${r1(PT + RH)}" stroke="${shade(color, -0.1)}" stroke-width="1"/>`;
    for (let j = 1; j < h; j++) svg += `<line x1="${PL}" y1="${r1(PT + j * scale)}" x2="${r1(PL + RW)}" y2="${r1(PT + j * scale)}" stroke="${shade(color, -0.1)}" stroke-width="1"/>`;
  }
  const txt = (x, y, t, anchor = 'middle') =>
    `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" font-size="17" font-weight="800" fill="${t === '?' ? '#ea580c' : '#0f172a'}" ${FONT}>${esc(t)}</text>`;
  if (top !== undefined && top !== null) svg += txt(PL + RW / 2, PT - 10, String(top));
  if (bottom !== undefined && bottom !== null) svg += txt(PL + RW / 2, PT + RH + 24, String(bottom));
  if (left !== undefined && left !== null) svg += txt(PL - 10, PT + RH / 2 + 6, String(left), 'end');
  if (right !== undefined && right !== null) svg += txt(PL + RW + 10, PT + RH / 2 + 6, String(right), 'start');
  const vbW = PL + RW + 80;
  const vbH = PT + RH + 36;
  return svgOpen(vbW, vbH, Math.min(400, vbW * 1.05), 'rectangle') + svg + '</svg>';
}

// ---------------------------------------------------------------- bar graph
function bargraph({ title = '', bars = [], max = 10, step = 1, horizontal = false, axis = '', color = 'blue', showValues = false, missing = -1 }) {
  const st = step > 0 ? step : 1;
  const mx = Math.max(st, max);
  const ticks = Math.round(mx / st);
  const fill = shade(color, 0.25);
  const ink = shade(color, -0.35);
  let svg = '';
  let vbW;
  let vbH;
  const val = (b) => Math.max(0, Number(b.value) || 0);
  if (!horizontal) {
    const L = axis ? 62 : 46;
    const T = 14;
    const CH = 200;
    const BW = 42;
    const G = 22;
    const CW = bars.length * (BW + G) + G;
    const y = (v) => T + CH - (v / mx) * CH;
    for (let i = 0; i <= ticks; i++) {
      const v = i * st;
      svg += `<line x1="${L}" y1="${r1(y(v))}" x2="${L + CW}" y2="${r1(y(v))}" stroke="${i === 0 ? '#334155' : '#e2e8f0'}" stroke-width="${i === 0 ? 2.5 : 1}"/>`;
      svg += `<text x="${L - 6}" y="${r1(y(v) + 5)}" text-anchor="end" font-size="13" font-weight="700" fill="#334155" ${FONT}>${v}</text>`;
    }
    svg += `<line x1="${L}" y1="${T - 6}" x2="${L}" y2="${T + CH}" stroke="#334155" stroke-width="2.5"/>`;
    bars.forEach((b, i) => {
      const x = L + G + i * (BW + G);
      const v = val(b);
      if (i === missing) {
        svg += `<rect x="${x}" y="${r1(y(mx * 0.5))}" width="${BW}" height="${r1(CH * 0.5)}" fill="#fff7ed" stroke="#f97316" stroke-width="2" stroke-dasharray="5 4"/><text x="${x + BW / 2}" y="${r1(y(mx * 0.25) + 6)}" text-anchor="middle" font-size="20" font-weight="800" fill="#ea580c" ${FONT}>?</text>`;
      } else {
        svg += `<rect x="${x}" y="${r1(y(v))}" width="${BW}" height="${r1((v / mx) * CH)}" fill="${fill}" stroke="${ink}" stroke-width="2"/>`;
        if (showValues) svg += `<text x="${x + BW / 2}" y="${r1(y(v) - 5)}" text-anchor="middle" font-size="13" font-weight="800" fill="${ink}" ${FONT}>${v}</text>`;
      }
      svg += `<text x="${x + BW / 2}" y="${T + CH + 19}" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a" ${FONT}>${esc(b.label)}</text>`;
    });
    if (axis) svg += `<text x="14" y="${T + CH / 2}" text-anchor="middle" font-size="13" font-weight="700" fill="#475569" transform="rotate(-90 14 ${T + CH / 2})" ${FONT}>${esc(axis)}</text>`;
    vbW = L + CW + 8;
    vbH = T + CH + 30;
  } else {
    const L = 92;
    const T = 8;
    const CW = 300;
    const BH = 28;
    const G = 14;
    const CH = bars.length * (BH + G) + G;
    const x = (v) => L + (v / mx) * CW;
    for (let i = 0; i <= ticks; i++) {
      const v = i * st;
      svg += `<line x1="${r1(x(v))}" y1="${T}" x2="${r1(x(v))}" y2="${T + CH}" stroke="${i === 0 ? '#334155' : '#e2e8f0'}" stroke-width="${i === 0 ? 2.5 : 1}"/>`;
      svg += `<text x="${r1(x(v))}" y="${T + CH + 17}" text-anchor="middle" font-size="12" font-weight="700" fill="#334155" ${FONT}>${v}</text>`;
    }
    svg += `<line x1="${L}" y1="${T + CH}" x2="${L + CW + 6}" y2="${T + CH}" stroke="#334155" stroke-width="2.5"/>`;
    bars.forEach((b, i) => {
      const yy = T + G + i * (BH + G);
      const v = val(b);
      if (i === missing) {
        svg += `<rect x="${L}" y="${yy}" width="${CW * 0.5}" height="${BH}" fill="#fff7ed" stroke="#f97316" stroke-width="2" stroke-dasharray="5 4"/><text x="${L + CW * 0.25}" y="${yy + BH / 2 + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="#ea580c" ${FONT}>?</text>`;
      } else {
        svg += `<rect x="${L}" y="${yy}" width="${r1((v / mx) * CW)}" height="${BH}" fill="${fill}" stroke="${ink}" stroke-width="2"/>`;
        if (showValues) svg += `<text x="${r1(x(v) + 6)}" y="${yy + BH / 2 + 5}" font-size="13" font-weight="800" fill="${ink}" ${FONT}>${v}</text>`;
      }
      svg += `<text x="${L - 8}" y="${yy + BH / 2 + 5}" text-anchor="end" font-size="13" font-weight="800" fill="#0f172a" ${FONT}>${esc(b.label)}</text>`;
    });
    if (axis) svg += `<text x="${L + CW / 2}" y="${T + CH + 36}" text-anchor="middle" font-size="13" font-weight="700" fill="#475569" ${FONT}>${esc(axis)}</text>`;
    vbW = L + CW + 30;
    vbH = T + CH + (axis ? 44 : 26);
  }
  const t = title ? `<div style="text-align:center;font-weight:800;margin-bottom:4px">${md(String(title))}</div>` : '';
  return `<div style="display:inline-block;max-width:100%">${t}${svgOpen(vbW, vbH, Math.min(520, vbW * 1.05), 'bar graph')}${svg}</svg></div>`;
}

// ---------------------------------------------------------------- pairs of lines
function lines({ kind = 'parallel', rot = 0, meet = 'cross', skew = 35, touch = false, mark = false, len = 110, label = '' }) {
  const dir = (a) => [Math.cos((a * PI) / 180), -Math.sin((a * PI) / 180)];
  const u = dir(rot);
  const v = dir(rot + 90);
  const half = len / 2;
  const seg = (cx, cy, d, a, b) => [cx + d[0] * a, cy + d[1] * a, cx + d[0] * b, cy + d[1] * b];
  let s1;
  let s2;
  let corner = null;
  if (kind === 'parallel') {
    s1 = seg(-v[0] * 22 - u[0] * 8, -v[1] * 22 - u[1] * 8, u, -half, half);
    s2 = seg(v[0] * 22 + u[0] * 8, v[1] * 22 + u[1] * 8, u, -half, half);
  } else if (kind === 'perpendicular') {
    if (meet === 'L') {
      s1 = seg(-u[0] * 30 - v[0] * 30, -u[1] * 30 - v[1] * 30, u, 0, len * 0.8);
      s2 = seg(-u[0] * 30 - v[0] * 30, -u[1] * 30 - v[1] * 30, v, 0, len * 0.8);
      corner = [-u[0] * 30 - v[0] * 30, -u[1] * 30 - v[1] * 30];
    } else if (meet === 'T') {
      s1 = seg(-v[0] * 30, -v[1] * 30, u, -half, half);
      s2 = seg(-v[0] * 30, -v[1] * 30, v, 0, len * 0.75);
      corner = [-v[0] * 30, -v[1] * 30];
    } else {
      s1 = seg(0, 0, u, -half, half);
      s2 = seg(0, 0, v, -half, half);
      corner = [0, 0];
    }
  } else {
    const w = dir(rot + skew);
    s1 = seg(0, touch ? 0 : -22, u, -half, half);
    s2 = seg(touch ? 0 : 6, touch ? 0 : 24, w, -half * (touch ? 1 : 0.8), half * (touch ? 1 : 0.8));
  }
  const L = (s, c) => `<line x1="${r1(s[0])}" y1="${r1(s[1])}" x2="${r1(s[2])}" y2="${r1(s[3])}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
  let svg = L(s1, '#2563eb') + L(s2, '#db2777');
  if (mark && corner) {
    const s = 12;
    const [cx, cy] = corner;
    const sgn = meet === 'cross' ? 1 : 1;
    svg += `<path d="M${r1(cx + u[0] * s * sgn)} ${r1(cy + u[1] * s * sgn)} L${r1(cx + (u[0] + v[0]) * s)} ${r1(cy + (u[1] + v[1]) * s)} L${r1(cx + v[0] * s)} ${r1(cy + v[1] * s)}" fill="none" stroke="#dc2626" stroke-width="2.5"/>`;
  }
  const lab = label ? `<div style="text-align:center;font-weight:800">${md(String(label))}</div>` : '';
  return `<div style="display:inline-block;text-align:center">${svgOpen(160, 160, 150, 'two lines', -80, -80)}${svg}</svg>${lab}</div>`;
}

// ---------------------------------------------------------------- labelled polygon
function polygon({ points = [], labels = null, rightMarks = [], sideLabels = null, color = 'teal', grid = false }) {
  const S = 2;
  const PAD = 30;
  const pts = points.map(([x, y]) => [PAD + x * S, PAD + y * S]);
  const n = pts.length;
  const cx = pts.reduce((a, p) => a + p[0], 0) / Math.max(1, n);
  const cy = pts.reduce((a, p) => a + p[1], 0) / Math.max(1, n);
  let svg = '';
  if (grid) {
    for (let i = 0; i <= 10; i++) {
      svg += `<line x1="${PAD + i * 20}" y1="${PAD}" x2="${PAD + i * 20}" y2="${PAD + 200}" stroke="#e2e8f0" stroke-width="1"/>`;
      svg += `<line x1="${PAD}" y1="${PAD + i * 20}" x2="${PAD + 200}" y2="${PAD + i * 20}" stroke="#e2e8f0" stroke-width="1"/>`;
    }
  }
  svg += `<polygon points="${pts.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ')}" fill="${shade(color, 0.6)}" stroke="${shade(color, -0.4)}" stroke-width="3" stroke-linejoin="round"/>`;
  const norm = (dx, dy) => {
    const l = Math.hypot(dx, dy) || 1;
    return [dx / l, dy / l];
  };
  (rightMarks || []).forEach((i) => {
    const p = pts[i];
    const a = pts[(i - 1 + n) % n];
    const b = pts[(i + 1) % n];
    if (!p || !a || !b) return;
    const [ux, uy] = norm(a[0] - p[0], a[1] - p[1]);
    const [vx, vy] = norm(b[0] - p[0], b[1] - p[1]);
    const s = 13;
    svg += `<path d="M${r1(p[0] + ux * s)} ${r1(p[1] + uy * s)} L${r1(p[0] + (ux + vx) * s)} ${r1(p[1] + (uy + vy) * s)} L${r1(p[0] + vx * s)} ${r1(p[1] + vy * s)}" fill="none" stroke="#dc2626" stroke-width="2.5"/>`;
  });
  if (labels) {
    pts.forEach((p, i) => {
      if (!labels[i]) return;
      const [dx, dy] = norm(p[0] - cx, p[1] - cy);
      svg += `<text x="${r1(p[0] + dx * 16)}" y="${r1(p[1] + dy * 16 + 6)}" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a" ${FONT}>${esc(labels[i])}</text>`;
    });
  }
  if (sideLabels) {
    pts.forEach((p, i) => {
      const t = sideLabels[i];
      if (t === undefined || t === null || t === '') return;
      const q = pts[(i + 1) % n];
      const mx = (p[0] + q[0]) / 2;
      const my = (p[1] + q[1]) / 2;
      const [dx, dy] = norm(mx - cx, my - cy);
      svg += `<text x="${r1(mx + dx * 20)}" y="${r1(my + dy * 20 + 6)}" text-anchor="middle" font-size="15" font-weight="800" fill="${t === '?' ? '#ea580c' : '#0f172a'}" ${FONT}>${esc(t)}</text>`;
    });
  }
  return svgOpen(260, 260, 240, 'shape') + svg + '</svg>';
}

// ---------------------------------------------------------------- picture made of shapes
function picPart({ shape = 'rect', x = 0, y = 0, w = 40, h = 40, rot = 0, color = 'blue' }) {
  const fill = hex(color, COLORS.blue);
  const a = `fill="${fill}" stroke="rgba(15,23,42,.7)" stroke-width="2.5" stroke-linejoin="round"`;
  let body;
  switch (shape) {
    case 'circle':
    case 'oval':
      body = `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w / 2}" ry="${h / 2}" ${a}/>`;
      break;
    case 'triangle':
      body = `<polygon points="${x + w / 2},${y} ${x + w},${y + h} ${x},${y + h}" ${a}/>`;
      break;
    case 'rightTriangle':
      body = `<polygon points="${x},${y} ${x},${y + h} ${x + w},${y + h}" ${a}/>`;
      break;
    case 'semicircle':
      body = `<path d="M${x} ${y + h} A${w / 2} ${h} 0 0 1 ${x + w} ${y + h} Z" ${a}/>`;
      break;
    case 'quarter':
      body = `<path d="M${x} ${y + h} L${x} ${y} A${w} ${h} 0 0 1 ${x + w} ${y + h} Z" ${a}/>`;
      break;
    default:
      body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${a}/>`;
  }
  return rot ? `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">${body}</g>` : body;
}
function shapepic({ parts = [] }) {
  return svgOpen(200, 200, 220, 'picture made of shapes') + parts.map(picPart).join('') + '</svg>';
}

export const VISUALS = { fraction, fracbars, solids, angle, gridshape, rectdim, bargraph, lines, polygon, shapepic };
