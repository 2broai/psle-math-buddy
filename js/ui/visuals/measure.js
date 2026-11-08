// Measurement visuals (money shop, rulers, scales, balances, beakers, calendars, digital clocks, timelines).
// Pure functions: props -> SVG string. Registered through ui/visuals/index.js.
//
// ruler      { len, start = 0, max = 15, object = 'pencil'|'crayon'|'ribbon'|'straw'|'stick'|'caterpillar'|'nail',
//              color?, unit = 'cm' }
//            An object of length `len` drawn above a ruler, starting at mark `start` (may be non-zero).
// scale      { value, max, step, major, unit = 'kg'|'g', item?: emoji on the pan, labelDiv = 1, labelUnit? }
//            Round dial weighing scale. Ticks every `step`, numbers every `major` (shown as value / labelDiv),
//            `labelUnit` printed on the dial (defaults to unit). value must be a multiple of step.
// balance    { left: [item], right: [item], tilt = 'level'|'left'|'right' }
//            Two-pan balance. item = emoji string, or a weight label like '1 kg' / '500 g' (drawn as a weight).
//            tilt names the side that goes DOWN (the heavier side).
// beaker     { value, max, step, major, unit = 'ℓ'|'mℓ', color?, label?, labelDiv = 1, labelUnit? }
//            Measuring container with marks every `step`, numbers every `major`, water up to `value`.
// calendar   { year, month (0–11), highlight: [day numbers], marks: { day: emoji } }
// pricetags  { items: [{ e: emoji, price: '45¢' | '$3.20', name? }] }
// digiclock  { h, m, ampm?: 'a.m.'|'p.m.' }
// timeline   { points: [{ t: number (e.g. minutes since midnight), label }], jumps: [{ from, to, text }] }
//            from / to are indexes into points.
import { esc } from '../markup.js';

const PAL = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#facc15',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  teal: '#14b8a6',
  brown: '#a16207'
};
const colr = (c, fallback) => PAL[c] || c || fallback;
const num = (v) => String(+Number(v).toFixed(2));
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const WDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ---------------------------------------------------------------- ruler
function rulerObject(kind, x1, x2, y, h, color) {
  const w = Math.max(8, x2 - x1);
  const mid = y + h / 2;
  switch (kind) {
    case 'pencil': {
      const tip = Math.min(22, w * 0.3);
      const er = Math.min(14, w * 0.15);
      return (
        `<rect x="${x1}" y="${y}" width="${er}" height="${h}" rx="3" fill="#f9a8d4" stroke="#9d174d" stroke-width="1.5"/>` +
        `<rect x="${x1 + er}" y="${y}" width="${Math.max(2, w - er - tip)}" height="${h}" fill="${colr(color, '#facc15')}" stroke="#92400e" stroke-width="1.5"/>` +
        `<line x1="${x1 + er}" y1="${mid}" x2="${x2 - tip}" y2="${mid}" stroke="rgba(0,0,0,.18)" stroke-width="2"/>` +
        `<polygon points="${x2 - tip},${y} ${x2},${mid} ${x2 - tip},${y + h}" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>` +
        `<polygon points="${x2 - tip * 0.35},${mid - h * 0.17} ${x2},${mid} ${x2 - tip * 0.35},${mid + h * 0.17}" fill="#334155"/>`
      );
    }
    case 'crayon': {
      const tip = Math.min(16, w * 0.25);
      const c = colr(color, '#ef4444');
      return (
        `<rect x="${x1}" y="${y + 2}" width="${Math.max(2, w - tip)}" height="${h - 4}" rx="4" fill="${c}" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>` +
        `<rect x="${x1 + (w - tip) * 0.2}" y="${y + 2}" width="${(w - tip) * 0.6}" height="${h - 4}" fill="rgba(255,255,255,.35)"/>` +
        `<polygon points="${x2 - tip},${y + 4} ${x2},${mid} ${x2 - tip},${y + h - 4}" fill="${c}" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>`
      );
    }
    case 'straw': {
      let s = `<rect x="${x1}" y="${y + h * 0.3}" width="${w}" height="${h * 0.4}" rx="3" fill="#fff" stroke="${colr(color, '#ef4444')}" stroke-width="1.5"/>`;
      for (let x = x1 + 6; x < x2 - 3; x += 10) s += `<line x1="${x}" y1="${y + h * 0.3}" x2="${x + 5}" y2="${y + h * 0.7}" stroke="${colr(color, '#ef4444')}" stroke-width="3"/>`;
      return s;
    }
    case 'stick':
      return (
        `<rect x="${x1}" y="${y + h * 0.2}" width="${w}" height="${h * 0.6}" rx="${h * 0.3}" fill="#a16207" stroke="#713f12" stroke-width="1.5"/>` +
        `<ellipse cx="${x1 + w * 0.35}" cy="${mid}" rx="4" ry="2.5" fill="#713f12"/><ellipse cx="${x1 + w * 0.7}" cy="${mid}" rx="3" ry="2" fill="#713f12"/>`
      );
    case 'caterpillar': {
      const r = h / 2;
      let s = '';
      const n = Math.max(2, Math.round(w / (r * 1.4)));
      for (let i = 0; i < n; i++) {
        const cx = x1 + r + (i * (w - 2 * r)) / Math.max(1, n - 1);
        s += `<circle cx="${cx}" cy="${mid}" r="${r}" fill="${i === n - 1 ? '#16a34a' : '#4ade80'}" stroke="#15803d" stroke-width="1.5"/>`;
      }
      s += `<circle cx="${x2 - r * 0.7}" cy="${mid - r * 0.25}" r="2.6" fill="#0f172a"/>`;
      return s;
    }
    case 'nail':
      return (
        `<rect x="${x1}" y="${y + 2}" width="6" height="${h - 4}" rx="2" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>` +
        `<rect x="${x1 + 6}" y="${mid - 4}" width="${Math.max(2, w - 18)}" height="8" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>` +
        `<polygon points="${x2 - 12},${mid - 4} ${x2},${mid} ${x2 - 12},${mid + 4}" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>`
      );
    default: {
      const c = colr(color, '#ec4899');
      return (
        `<rect x="${x1}" y="${y + 3}" width="${w}" height="${h - 6}" rx="4" fill="${c}" stroke="rgba(0,0,0,.3)" stroke-width="1.5"/>` +
        `<rect x="${x1}" y="${mid - 2}" width="${w}" height="4" fill="rgba(255,255,255,.55)"/>`
      );
    }
  }
}

function ruler({ len = 5, start = 0, max = 15, object = 'pencil', color, unit = 'cm' }) {
  const U = Math.max(16, Math.min(42, 600 / (max + 1)));
  const X0 = 40;
  const W = X0 + max * U + 26;
  const OY = 12;
  const OH = 28;
  const RY = 62;
  const RH = 50;
  const x1 = X0 + start * U;
  const x2 = X0 + (start + len) * U;
  let svg = rulerObject(object, x1, x2, OY, OH, color);
  svg += `<line x1="${x1}" y1="${OY + OH + 2}" x2="${x1}" y2="${RY}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  svg += `<line x1="${x2}" y1="${OY + OH + 2}" x2="${x2}" y2="${RY}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  svg += `<rect x="${X0 - 32}" y="${RY}" width="${max * U + 52}" height="${RH}" rx="5" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>`;
  for (let i = 0; i <= max; i++) {
    const x = X0 + i * U;
    svg += `<line x1="${x}" y1="${RY}" x2="${x}" y2="${RY + 18}" stroke="#78350f" stroke-width="2"/>`;
    svg += `<text x="${x}" y="${RY + RH - 10}" text-anchor="middle" font-size="${U < 24 ? 12 : 15}" font-weight="700" fill="#78350f">${i}</text>`;
    if (i < max && U >= 18) {
      const xh = x + U / 2;
      svg += `<line x1="${xh}" y1="${RY}" x2="${xh}" y2="${RY + 10}" stroke="#78350f" stroke-width="1.2"/>`;
    }
  }
  svg += `<text x="${X0 - 27}" y="${RY + 17}" font-size="12" font-weight="800" fill="#92400e">${esc(unit)}</text>`;
  return `<svg class="ruler" viewBox="0 0 ${W} ${RY + RH + 6}" style="width:100%;max-width:${Math.round(Math.min(640, W * 1.1))}px" role="img" aria-label="ruler">${svg}</svg>`;
}

// ---------------------------------------------------------------- dial scale
function scale({ value = 0, max = 5, step = 1, major = 1, unit = 'kg', item = '', labelDiv = 1, labelUnit }) {
  const n = Math.max(1, Math.round(max / step));
  const cx = 120;
  const cy = 160;
  const r = 78;
  let svg = '';
  svg += '<rect x="108" y="56" width="24" height="22" fill="#94a3b8" stroke="#475569" stroke-width="2"/>';
  svg += '<path d="M34 46 Q120 70 206 46 L198 58 Q120 80 42 58 Z" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>';
  if (item) svg += `<text x="120" y="44" text-anchor="middle" font-size="40">${esc(item)}</text>`;
  svg += '<rect x="22" y="76" width="196" height="172" rx="26" fill="#e0f2fe" stroke="#0369a1" stroke-width="3"/>';
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#0369a1" stroke-width="3"/>`;
  for (let i = 0; i < n; i++) {
    const v = i * step;
    const a = (i / n) * 2 * Math.PI;
    const ratio = v / major;
    const isMajor = Math.abs(ratio - Math.round(ratio)) < 1e-6;
    const r1 = isMajor ? r - 15 : r - 8;
    svg += `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + (r - 2) * Math.sin(a)).toFixed(1)}" y2="${(cy - (r - 2) * Math.cos(a)).toFixed(1)}" stroke="#0f172a" stroke-width="${isMajor ? 2.5 : 1.2}"/>`;
    if (isMajor) {
      const lr = r - 29;
      const label = num(v / labelDiv);
      svg += `<text x="${(cx + lr * Math.sin(a)).toFixed(1)}" y="${(cy - lr * Math.cos(a) + 5).toFixed(1)}" text-anchor="middle" font-size="${label.length > 3 ? 11 : 14}" font-weight="700" fill="#0f172a">${label}</text>`;
    }
  }
  const pa = (value / max) * 360;
  svg += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r + 12}" stroke="#dc2626" stroke-width="4" stroke-linecap="round" transform="rotate(${pa.toFixed(2)} ${cx} ${cy})"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="7" fill="#dc2626"/>`;
  svg += `<text x="${cx}" y="${cy + 36}" text-anchor="middle" font-size="16" font-weight="800" fill="#0369a1">${esc(labelUnit || unit)}</text>`;
  return `<svg class="scale" viewBox="0 0 240 254" style="width:100%;max-width:250px" role="img" aria-label="weighing scale">${svg}</svg>`;
}

// ---------------------------------------------------------------- two-pan balance
const WEIGHT_RE = /^\d+\s?(kg|g)$/;
function panItems(list, cx, baseY) {
  let svg = '';
  const perRow = 4;
  list.forEach((it, i) => {
    const row = Math.floor(i / perRow);
    const inRow = Math.min(perRow, list.length - row * perRow);
    const col = i % perRow;
    const isW = WEIGHT_RE.test(String(it));
    const step = isW ? 46 : 32;
    const x = cx - ((inRow - 1) * step) / 2 + col * step;
    const y = baseY - row * 30;
    if (isW) {
      svg += `<path d="M${x - 18} ${y} L${x - 13} ${y - 24} L${x + 13} ${y - 24} L${x + 18} ${y} Z" fill="#64748b" stroke="#334155" stroke-width="1.5"/><text x="${x}" y="${y - 7}" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">${esc(it)}</text>`;
    } else {
      svg += `<text x="${x}" y="${y - 3}" text-anchor="middle" font-size="27">${esc(it)}</text>`;
    }
  });
  return svg;
}
function balance({ left = [], right = [], tilt = 'level' }) {
  const angle = tilt === 'left' ? -9 : tilt === 'right' ? 9 : 0;
  const CX = 200;
  const CY = 74;
  const L = 130;
  const rad = (angle * Math.PI) / 180;
  const lx = CX - L * Math.cos(rad);
  const ly = CY - L * Math.sin(rad);
  const rx = CX + L * Math.cos(rad);
  const ry = CY + L * Math.sin(rad);
  const pan = (x, y) =>
    `<line x1="${x}" y1="${y}" x2="${x - 52}" y2="${y + 46}" stroke="#64748b" stroke-width="1.5"/><line x1="${x}" y1="${y}" x2="${x + 52}" y2="${y + 46}" stroke="#64748b" stroke-width="1.5"/><path d="M${x - 62} ${y + 46} Q${x} ${y + 66} ${x + 62} ${y + 46} Z" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>`;
  let svg = '';
  svg += `<rect x="${CX - 70}" y="214" width="140" height="14" rx="5" fill="#94a3b8" stroke="#475569" stroke-width="2"/>`;
  svg += `<rect x="${CX - 7}" y="${CY}" width="14" height="${214 - CY}" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>`;
  svg += `<line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="#334155" stroke-width="7" stroke-linecap="round"/>`;
  svg += `<polygon points="${CX - 13},${CY + 16} ${CX},${CY - 6} ${CX + 13},${CY + 16}" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>`;
  svg += pan(lx, ly) + pan(rx, ry);
  svg += panItems(left, lx, ly + 48);
  svg += panItems(right, rx, ry + 48);
  return `<svg class="balance" viewBox="0 -24 400 256" style="width:100%;max-width:420px" role="img" aria-label="balance">${svg}</svg>`;
}

// ---------------------------------------------------------------- measuring beaker
function beaker({ value = 0, max = 5, step = 1, major = 1, unit = 'ℓ', color = '#60a5fa', label = '', labelDiv = 1, labelUnit }) {
  const X = 50;
  const W = 116;
  const TOP = 34;
  const BOT = 262;
  const topMark = TOP + 22;
  const y = (v) => BOT - (v / max) * (BOT - topMark);
  const n = Math.max(1, Math.round(max / step));
  let svg = '';
  const wy = y(value);
  if (value > 0) {
    svg += `<rect x="${X + 3}" y="${wy.toFixed(1)}" width="${W - 6}" height="${(BOT - wy - 3).toFixed(1)}" fill="${colr(color, '#60a5fa')}" opacity=".7"/>`;
    svg += `<path d="M${X + 3} ${wy.toFixed(1)} q${W / 8} -5 ${W / 4} 0 t${W / 4} 0 t${W / 4} 0 t${W / 4 - 6} 0" fill="none" stroke="#1d4ed8" stroke-width="2"/>`;
  }
  svg += `<path d="M${X - 10} ${TOP - 6} L${X} ${TOP} L${X} ${BOT - 12} Q${X} ${BOT} ${X + 12} ${BOT} L${X + W - 12} ${BOT} Q${X + W} ${BOT} ${X + W} ${BOT - 12} L${X + W} ${TOP - 6}" fill="rgba(224,242,254,.35)" stroke="#334155" stroke-width="3" stroke-linejoin="round"/>`;
  const uLab = labelUnit || unit;
  for (let i = 1; i <= n; i++) {
    const v = i * step;
    const yy = y(v).toFixed(1);
    const ratio = v / major;
    const isMajor = Math.abs(ratio - Math.round(ratio)) < 1e-6;
    svg += `<line x1="${X + W - (isMajor ? 30 : 16)}" y1="${yy}" x2="${X + W}" y2="${yy}" stroke="#0f172a" stroke-width="${isMajor ? 2.5 : 1.5}"/>`;
    if (isMajor) svg += `<text x="${X + W + 8}" y="${(+yy + 5).toFixed(1)}" font-size="14" font-weight="700" fill="#0f172a">${num(v / labelDiv)} ${esc(uLab)}</text>`;
  }
  const h = label ? 300 : 276;
  if (label) svg += `<text x="${X + W / 2}" y="292" text-anchor="middle" font-size="20" font-weight="800" fill="#0f172a">${esc(label)}</text>`;
  return `<svg class="beaker" viewBox="0 0 270 ${h}" style="width:100%;max-width:210px" role="img" aria-label="measuring container">${svg}</svg>`;
}

// ---------------------------------------------------------------- calendar
function calendar({ year = 2027, month = 0, highlight = [], marks = {} }) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const CW = 50;
  const CH = 38;
  const X = 6;
  const HEAD = 70;
  const hl = new Set(highlight);
  let svg = `<text x="${X + (7 * CW) / 2}" y="28" text-anchor="middle" font-size="22" font-weight="800" fill="#0f172a">${MONTHS[month]} ${year}</text>`;
  WDAYS.forEach((d, i) => {
    svg += `<rect x="${X + i * CW}" y="${HEAD - 28}" width="${CW}" height="26" fill="${i === 0 ? '#fee2e2' : '#e0f2fe'}" stroke="#94a3b8" stroke-width="1"/>`;
    svg += `<text x="${X + i * CW + CW / 2}" y="${HEAD - 10}" text-anchor="middle" font-size="13" font-weight="800" fill="${i === 0 ? '#b91c1c' : '#0f172a'}">${d}</text>`;
  });
  const rows = Math.ceil((first + days) / 7);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < 7; c++) {
      svg += `<rect x="${X + c * CW}" y="${HEAD + r * CH}" width="${CW}" height="${CH}" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>`;
    }
  }
  for (let d = 1; d <= days; d++) {
    const idx = first + d - 1;
    const c = idx % 7;
    const r = Math.floor(idx / 7);
    const x = X + c * CW;
    const yy = HEAD + r * CH;
    if (hl.has(d)) svg += `<rect x="${x + 2}" y="${yy + 2}" width="${CW - 4}" height="${CH - 4}" rx="6" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>`;
    svg += `<text x="${x + CW / 2}" y="${yy + 25}" text-anchor="middle" font-size="16" font-weight="700" fill="${c === 0 ? '#b91c1c' : '#0f172a'}">${d}</text>`;
    if (marks[d]) svg += `<text x="${x + CW - 9}" y="${yy + 14}" text-anchor="middle" font-size="12">${esc(marks[d])}</text>`;
  }
  return `<svg class="calendar" viewBox="0 0 ${X * 2 + 7 * CW} ${HEAD + rows * CH + 6}" style="width:100%;max-width:380px" role="img" aria-label="calendar">${svg}</svg>`;
}

// ---------------------------------------------------------------- price tags
function pricetags({ items = [] }) {
  const CW = 112;
  let svg = '';
  items.forEach((it, i) => {
    const x = 6 + i * (CW + 10);
    svg += `<rect x="${x}" y="4" width="${CW}" height="132" rx="14" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>`;
    svg += `<text x="${x + CW / 2}" y="${it.name ? 54 : 62}" text-anchor="middle" font-size="44">${esc(it.e || '🎁')}</text>`;
    if (it.name) svg += `<text x="${x + CW / 2}" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">${esc(it.name)}</text>`;
    svg += `<path d="M${x + 22} 92 L${x + CW - 14} 92 L${x + CW - 14} 126 L${x + 22} 126 L${x + 10} 109 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>`;
    svg += `<circle cx="${x + 22}" cy="109" r="3.5" fill="#fff" stroke="#ca8a04" stroke-width="1.5"/>`;
    svg += `<text x="${x + CW / 2 + 6}" y="116" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">${esc(it.price)}</text>`;
  });
  const W = Math.max(130, 6 + items.length * (CW + 10));
  return `<svg class="pricetags" viewBox="0 0 ${W} 142" style="width:100%;max-width:${Math.min(620, W * 1.15)}px" role="img" aria-label="price tags">${svg}</svg>`;
}

// ---------------------------------------------------------------- digital clock
function digiclock({ h = 12, m = 0, ampm = '' }) {
  const t = `${h}:${String(m).padStart(2, '0')}`;
  let svg = '<rect x="4" y="4" width="232" height="92" rx="16" fill="#0f172a" stroke="#334155" stroke-width="4"/>';
  svg += `<text x="${ampm ? 104 : 120}" y="68" text-anchor="middle" font-size="48" font-weight="700" font-family="ui-monospace, Menlo, monospace" fill="#4ade80">${t}</text>`;
  if (ampm) svg += `<text x="200" y="66" text-anchor="middle" font-size="18" font-weight="800" fill="#4ade80">${esc(ampm)}</text>`;
  return `<svg class="digiclock" viewBox="0 0 240 100" style="width:100%;max-width:240px" role="img" aria-label="digital clock ${t}">${svg}</svg>`;
}

// ---------------------------------------------------------------- timeline
function timeline({ points = [], jumps = [] }) {
  const W = 640;
  const PAD = 70;
  const Y = 96;
  const ts = points.map((p) => Number(p.t) || 0);
  const tmin = ts.length ? Math.min(...ts) : 0;
  const tmax = ts.length ? Math.max(...ts) : 1;
  const x = (t) => PAD + ((t - tmin) / (tmax - tmin || 1)) * (W - 2 * PAD);
  let svg = `<line x1="${PAD - 30}" y1="${Y}" x2="${W - PAD + 30}" y2="${Y}" stroke="#334155" stroke-width="3"/>`;
  jumps.forEach((j) => {
    const a = points[j.from];
    const b = points[j.to];
    if (!a || !b) return;
    const x1 = x(a.t);
    const x2 = x(b.t);
    const hgt = Math.min(64, Math.abs(x2 - x1) * 0.45 + 18);
    svg += `<path d="M${x1.toFixed(1)} ${Y - 6} Q${((x1 + x2) / 2).toFixed(1)} ${Y - hgt} ${x2.toFixed(1)} ${Y - 6}" fill="none" stroke="#7c3aed" stroke-width="2.5"/>`;
    svg += `<path d="M${x2.toFixed(1)} ${Y - 6} l-9 -6 l1 10 z" fill="#7c3aed"/>`;
    if (j.text) svg += `<text x="${((x1 + x2) / 2).toFixed(1)}" y="${(Y - hgt / 2 - 10).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="800" fill="#6d28d9">${esc(j.text)}</text>`;
  });
  points.forEach((p) => {
    const xx = x(p.t);
    svg += `<circle cx="${xx.toFixed(1)}" cy="${Y}" r="7" fill="#f97316" stroke="#fff" stroke-width="2"/>`;
    svg += `<text x="${xx.toFixed(1)}" y="${Y + 30}" text-anchor="middle" font-size="15" font-weight="800" fill="#0f172a">${esc(p.label ?? '')}</text>`;
  });
  return `<svg class="timeline" viewBox="0 0 ${W} ${Y + 44}" style="width:100%;max-width:640px" role="img" aria-label="timeline">${svg}</svg>`;
}

export const VISUALS = {
  ruler,
  scale,
  balance,
  beaker,
  calendar,
  pricetags,
  digiclock,
  timeline
};
