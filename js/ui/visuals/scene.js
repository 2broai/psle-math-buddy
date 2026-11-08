// Illustrated situation pictures for Life Skills cards: a drawn backdrop (SVG) + figures standing in it
// (emoji), speech / thought bubbles and a "You" tag. Pure string builders — no DOM — so tests can render them.
//
//   pic = { bg: 'mall', cast: [{ e, you, say, think, flip, size, x, up, screen }], props: ['🍭' | { e, x, y, size }] }
//   (say is already a plain string here — card.js picks the language and fills placeholders)

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ------------------------------------------------------------------ drawing kit (viewBox 160 × 90)
const R = (x, y, w, h, fill, rx = 0, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const E = (e, x, y, s, extra = '') => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" ${extra}>${e}</text>`;
const L = (x1, y1, x2, y2, stroke, w = 1, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
const C = (cx, cy, r, fill, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;
const P = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`;
const sky = (top = '#bfe3ff', bottom = '#eaf6ff') => {
  const id = `sky${(top + bottom).replace(/[^0-9a-f]/gi, '')}`;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>${R(0, 0, 160, 90, `url(#${id})`)}`;
};
const wall = (c) => R(0, 0, 160, 90, c);
const floor = (y, c, line = 'rgba(0,0,0,.08)') => R(0, y, 160, 90 - y, c) + L(0, y, 160, y, line, 0.8);
const tiles = (y, c1, c2, step = 16) => {
  let s = R(0, y, 160, 90 - y, c1);
  for (let x = 0; x <= 160; x += step) s += L(x, y, x + (x - 80) * 0.35, 90, c2, 0.5);
  for (let yy = y + 6; yy < 90; yy += 8) s += L(0, yy, 160, yy, c2, 0.5);
  return s;
};
const win = (x, y, w, h, inner = '#bfe3ff', content = '') =>
  R(x - 1.5, y - 1.5, w + 3, h + 3, '#ffffff', 1.5) + R(x, y, w, h, inner, 1) + content + L(x + w / 2, y, x + w / 2, y + h, '#ffffff', 1.2) + L(x, y + h / 2, x + w, y + h / 2, '#ffffff', 1.2);
const grass = (y, c = '#a7e8a0') => R(0, y, 160, 90 - y, c) + L(0, y, 160, y, 'rgba(0,0,0,.06)', 0.8);
const shopfront = (x, w, color, sign, goods) =>
  R(x, 12, w, 44, '#ffffff', 1.5) + R(x, 12, w, 9, color, 1.5) + E(sign, x + w / 2, 19.5, 6.5) + R(x + 3, 24, w - 6, 26, '#e0f2fe', 1) + goods.map((g, i) => E(g, x + 3 + ((i + 0.5) * (w - 6)) / goods.length, 42, 9)).join('');
const shelf = (x, y, w, goods) => R(x, y, w, 2, '#a16207') + goods.map((g, i) => E(g, x + ((i + 0.5) * w) / goods.length, y - 0.6, 7)).join('');
const books = (x, y, w, h) => {
  const cols = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316', '#14b8a6'];
  let s = '';
  for (let i = 0, bx = x; bx < x + w - 2; i++) {
    const bw = 2.2 + ((i * 7) % 3);
    s += R(bx, y + ((i * 5) % 3), bw, h - ((i * 5) % 3), cols[i % cols.length], 0.4);
    bx += bw + 0.4;
  }
  return s;
};

// Each backdrop: svg (inner markup), floor = where feet stand (0–1 of the height), props = zone for loose props.
const BG = {
  home: {
    floor: 0.93,
    svg: () => wall('#fdf0d5') + R(0, 0, 160, 6, '#f6e2b8') + win(108, 12, 36, 26) + R(14, 14, 22, 15, '#fff', 1) + E('🖼️', 25, 27, 12) + floor(62, '#e6c79c') + E('🛋️', 42, 66, 30) + E('🪴', 150, 66, 14) + E('📺', 92, 52, 14),
    props: [70, 140, 74]
  },
  kitchen: {
    floor: 0.93,
    svg: () => {
      let s = wall('#e6f4fb');
      for (let x = 0; x < 160; x += 8) s += L(x, 30, x, 46, '#cfe6f3', 0.5);
      s += L(0, 38, 160, 38, '#cfe6f3', 0.5);
      s += R(118, 8, 30, 56, '#f8fafc', 2, 'stroke="#cbd5e1" stroke-width="0.8"') + L(121, 30, 121, 38, '#94a3b8', 1.2);
      s += R(0, 46, 112, 14, '#cbd5e1') + R(0, 44, 112, 3, '#94a3b8') + E('🍳', 30, 44, 12) + E('🫖', 56, 44, 11) + E('🔪', 80, 44, 8) + R(20, 50, 22, 8, '#475569', 1);
      return s + tiles(62, '#eef2f7', '#d5dde8');
    },
    props: [20, 100, 44]
  },
  bedroom: {
    floor: 0.93,
    svg: () => wall('#ece6fb') + win(18, 10, 32, 24, '#1e3a8a', E('🌙', 26, 22, 8) + E('⭐', 42, 30, 5)) + floor(62, '#d9c3a3') + E('🛏️', 118, 68, 40) + E('🧸', 70, 64, 11) + E('💡', 80, 14, 9),
    props: [60, 100, 74]
  },
  bathroom: {
    floor: 0.93,
    svg: () => {
      let s = wall('#d8f5ee');
      for (let x = 0; x < 160; x += 10) s += L(x, 0, x, 62, '#bfe9df', 0.5);
      for (let y = 10; y < 62; y += 10) s += L(0, y, 160, y, '#bfe9df', 0.5);
      s += R(26, 8, 26, 20, '#e0f2fe', 2, 'stroke="#94a3b8" stroke-width="1"') + R(22, 36, 34, 7, '#ffffff', 3, 'stroke="#cbd5e1" stroke-width="0.8"') + E('🚰', 39, 36, 9) + E('🧼', 52, 35, 6) + E('🪥', 26, 35, 6);
      return s + tiles(62, '#f1f5f9', '#dbe3ea', 12) + E('🚽', 132, 70, 26);
    },
    props: [60, 110, 74]
  },
  door: {
    floor: 0.93,
    svg: () => wall('#fbefd2') + R(96, 8, 38, 56, '#9a5b2c', 1.5) + R(100, 12, 30, 22, '#b06a35', 1) + R(100, 38, 30, 22, '#b06a35', 1) + C(126, 38, 1.8, '#facc15') + C(115, 18, 1.4, '#1f2937') + floor(64, '#e3c599') + E('👟', 76, 64, 8) + E('🧥', 150, 34, 12),
    props: [20, 80, 74]
  },
  window: {
    floor: 0.93,
    svg: () => wall('#eef2f7') + R(16, 6, 128, 50, '#bfe3ff', 2) + E('🏢', 38, 52, 30) + E('🏬', 74, 52, 22) + E('🏢', 108, 52, 26) + E('☁️', 126, 18, 12) + R(14, 54, 132, 4, '#ffffff', 1) + L(16, 6, 16, 56, '#fff', 2) + L(144, 6, 144, 56, '#fff', 2) + L(80, 6, 80, 56, '#fff', 2) + floor(62, '#d6dde6'),
    props: [30, 130, 74]
  },
  classroom: {
    floor: 0.93,
    svg: () =>
      wall('#fdf6c9') + R(32, 6, 96, 32, '#ffffff', 2, 'stroke="#64748b" stroke-width="1.5"') + `<text x="44" y="22" font-size="8" fill="#2563eb" font-family="sans-serif">A B C</text><text x="84" y="30" font-size="8" fill="#16a34a" font-family="sans-serif">1 + 2 = 3</text>` + E('🕒', 146, 16, 10) + E('📚', 14, 40, 11) + floor(56, '#dfe6ee') + R(8, 60, 40, 4, '#c08a50', 1) + R(112, 60, 40, 4, '#c08a50', 1) + L(12, 64, 12, 74, '#92400e', 1.2) + L(44, 64, 44, 74, '#92400e', 1.2) + L(116, 64, 116, 74, '#92400e', 1.2) + L(148, 64, 148, 74, '#92400e', 1.2),
    props: [60, 100, 58]
  },
  canteen: {
    floor: 0.93,
    svg: () => {
      let s = wall('#ffeedd');
      const stalls = [['#ef4444', '🍜'], ['#f59e0b', '🍛'], ['#10b981', '🥪'], ['#3b82f6', '🧃']];
      stalls.forEach(([c, e], i) => {
        const x = 4 + i * 39;
        s += R(x, 6, 35, 9, c, 1.5) + E(e, x + 17.5, 13.5, 7) + R(x, 15, 35, 26, '#fff7ed', 1) + R(x, 37, 35, 8, '#cbd5e1', 1);
      });
      return s + floor(56, '#e5e7eb') + R(52, 62, 56, 4, '#94a3b8', 1) + E('🍱', 66, 62, 8) + E('🥤', 92, 62, 7);
    },
    props: [20, 140, 74]
  },
  schoolyard: {
    floor: 0.93,
    svg: () => sky() + E('🏫', 128, 54, 40) + E('🌳', 18, 58, 30) + grass(52, '#9fe39a') + `<ellipse cx="80" cy="74" rx="44" ry="8" fill="none" stroke="#ffffff" stroke-width="1"/>`,
    props: [50, 110, 76]
  },
  schoolgate: {
    floor: 0.93,
    svg: () => {
      let s = sky() + E('🏫', 80, 44, 36) + R(0, 46, 160, 3, '#64748b');
      for (let x = 2; x < 160; x += 6) if (x < 62 || x > 98) s += L(x, 30, x, 48, '#64748b', 1);
      s += R(56, 22, 48, 6, '#2563eb', 1) + `<text x="80" y="27" font-size="4.6" fill="#fff" text-anchor="middle" font-family="sans-serif">PRIMARY SCHOOL</text>`;
      return s + floor(50, '#d6d3d1') + E('🚌', 140, 64, 22, 'transform="translate(280 0) scale(-1 1)"');
    },
    props: [20, 120, 76]
  },
  playground: {
    floor: 0.93,
    svg: () => sky() + E('☀️', 146, 16, 12) + grass(56, '#a7e8a0') + E('🛝', 122, 64, 36) + L(14, 22, 20, 62, '#ef4444', 2) + L(50, 22, 44, 62, '#ef4444', 2) + L(14, 22, 50, 22, '#ef4444', 2) + L(26, 22, 26, 44, '#334155', 0.6) + L(38, 22, 38, 44, '#334155', 0.6) + R(24, 44, 16, 2.5, '#f59e0b', 1),
    props: [60, 100, 78]
  },
  park: {
    floor: 0.93,
    svg: () => sky() + E('☁️', 40, 16, 12) + grass(54, '#a7e8a0') + P('M60 90 Q80 66 100 54 L112 54 Q96 70 92 90 Z', '#f1e5c8') + E('🌳', 16, 60, 34) + E('🌳', 146, 58, 28) + E('🌼', 48, 80, 6) + E('🌷', 128, 82, 6),
    props: [30, 130, 80]
  },
  street: {
    floor: 0.93,
    svg: () => sky() + shopfront(4, 48, '#f97316', '🍞', ['🥐', '🍰']) + shopfront(56, 48, '#8b5cf6', '🧸', ['🪀', '🎈']) + shopfront(108, 48, '#10b981', '🛒', ['🍎', '🥛']) + floor(58, '#e5e7eb') + R(0, 86, 160, 4, '#64748b'),
    props: [20, 140, 78]
  },
  road: {
    floor: 0.95,
    svg: () => {
      let s = sky() + E('🏢', 30, 34, 26) + E('🏬', 128, 34, 24) + R(0, 34, 160, 8, '#d6d3d1') + R(0, 42, 160, 30, '#4b5563');
      for (let x = 60; x < 104; x += 7) s += R(x, 43, 4, 28, '#f8fafc');
      s += L(0, 57, 54, 57, '#facc15', 0.8, 'stroke-dasharray="4 3"') + L(108, 57, 160, 57, '#facc15', 0.8, 'stroke-dasharray="4 3"');
      return s + R(0, 72, 160, 18, '#e5e7eb') + R(0, 72, 160, 1.5, '#9ca3af') + E('🚦', 50, 68, 18) + E('🚗', 136, 62, 16, 'transform="translate(272 0) scale(-1 1)"');
    },
    props: [110, 150, 54]
  },
  carpark: {
    floor: 0.93,
    svg: () => {
      let s = R(0, 0, 160, 90, '#cbd5e1') + R(0, 0, 160, 10, '#94a3b8') + R(36, 10, 6, 40, '#e5e7eb') + R(118, 10, 6, 40, '#e5e7eb') + R(0, 46, 160, 44, '#9ca3af');
      for (let x = 10; x < 160; x += 30) s += L(x, 48, x - 6, 66, '#f8fafc', 1);
      return s + E('🚙', 26, 62, 22) + E('🚗', 86, 62, 22) + E('🚐', 144, 62, 22) + L(0, 70, 160, 70, '#f8fafc', 0.5, 'stroke-dasharray="3 3"');
    },
    props: [40, 120, 82]
  },
  car: {
    floor: 0.98,
    svg: () =>
      R(0, 0, 160, 90, '#334155') + P('M18 6 H142 Q150 6 148 16 L140 40 H20 L12 16 Q10 6 18 6 Z', '#bfe3ff') + E('🛣️', 80, 38, 22) + R(0, 40, 160, 6, '#1f2937') + R(8, 46, 66, 44, '#64748b', 6) + R(86, 46, 66, 44, '#64748b', 6) + R(14, 50, 54, 10, '#94a3b8', 4) + R(92, 50, 54, 10, '#94a3b8', 4),
    props: [70, 90, 30]
  },
  busstop: {
    floor: 0.93,
    svg: () => sky() + E('🏢', 140, 40, 24) + R(8, 14, 70, 4, '#475569', 1) + R(10, 18, 2, 40, '#475569') + R(74, 18, 2, 40, '#475569') + R(14, 20, 56, 22, 'rgba(191,227,255,.6)', 1) + E('🚏', 92, 58, 16) + floor(58, '#e5e7eb') + R(0, 84, 160, 6, '#64748b') + E('🚌', 140, 74, 22, 'transform="translate(280 0) scale(-1 1)"'),
    props: [30, 70, 76]
  },
  bus: {
    floor: 0.95,
    svg: () => {
      let s = R(0, 0, 160, 90, '#e2e8f0') + R(0, 0, 160, 5, '#cbd5e1');
      for (let x = 6; x < 160; x += 38) s += R(x, 10, 32, 22, '#bfe3ff', 2) + E('🌳', x + 22, 30, 9);
      s += L(40, 5, 40, 80, '#facc15', 1.8) + L(118, 5, 118, 80, '#facc15', 1.8);
      return s + R(4, 46, 30, 18, '#3b82f6', 4) + R(126, 46, 30, 18, '#3b82f6', 4) + floor(66, '#94a3b8');
    },
    props: [50, 110, 52]
  },
  mrt: {
    floor: 0.93,
    svg: () => {
      let s = wall('#e2e8f0') + R(0, 0, 160, 6, '#94a3b8') + R(4, 12, 152, 40, '#f8fafc', 4, 'stroke="#94a3b8" stroke-width="1"') + R(4, 34, 152, 3, '#dc2626');
      for (let x = 12; x < 150; x += 36) s += R(x, 16, 24, 14, '#bfe3ff', 1.5);
      s += R(62, 16, 16, 34, '#cbd5e1', 1) + R(80, 16, 16, 34, '#cbd5e1', 1);
      return s + floor(52, '#d1d5db') + R(0, 58, 160, 2.2, '#facc15') + `<text x="146" y="10" font-size="5" fill="#334155" font-family="sans-serif" text-anchor="middle">MRT</text>`;
    },
    props: [20, 140, 76]
  },
  lift: {
    floor: 0.93,
    svg: () => wall('#e8ecf1') + R(44, 8, 72, 56, '#64748b', 2) + R(48, 12, 31, 52, '#cbd5e1') + R(81, 12, 31, 52, '#cbd5e1') + L(80, 12, 80, 64, '#475569', 1) + R(122, 30, 10, 18, '#f8fafc', 2, 'stroke="#94a3b8" stroke-width="0.6"') + `<text x="127" y="38" font-size="5" text-anchor="middle">▲</text><text x="127" y="46" font-size="5" text-anchor="middle">▼</text>` + R(60, 2, 40, 5, '#0f172a', 1) + `<text x="80" y="6.2" font-size="4" fill="#22c55e" text-anchor="middle" font-family="monospace">12</text>` + floor(64, '#d1d5db'),
    props: [10, 40, 74]
  },
  escalator: {
    floor: 0.93,
    svg: () => {
      let s = wall('#eef2ff') + P('M40 84 L118 20 L134 20 L134 30 L58 90 L40 90 Z', '#94a3b8');
      for (let i = 0; i < 10; i++) s += L(46 + i * 8, 86 - i * 6.5, 58 + i * 8, 86 - i * 6.5, '#e2e8f0', 0.8);
      s += P('M36 80 L116 14', 'none', 'stroke="#0f172a" stroke-width="2.2"') + P('M54 88 L134 22', 'none', 'stroke="#0f172a" stroke-width="2.2"');
      return s + floor(84, '#e2e8f0') + R(36, 84, 26, 2, '#facc15') + E('🏬', 146, 40, 16);
    },
    props: [6, 30, 70]
  },
  mall: {
    floor: 0.93,
    svg: () => wall('#f5f3ff') + shopfront(2, 50, '#ec4899', '👗', ['👗', '👟']) + shopfront(55, 50, '#f59e0b', '🧸', ['🧸', '🪁']) + shopfront(108, 50, '#06b6d4', '🍦', ['🍦', '🧁']) + tiles(58, '#f8fafc', '#e2e8f0', 20) + E('🪴', 52, 66, 10),
    props: [20, 140, 78]
  },
  supermarket: {
    floor: 0.93,
    svg: () => wall('#f0fdf4') + R(4, 6, 70, 52, '#fef3c7', 1) + shelf(6, 20, 66, ['🥫', '🥫', '🍪', '🍪']) + shelf(6, 36, 66, ['🍎', '🍌', '🥕', '🍅']) + shelf(6, 52, 66, ['🥛', '🧃', '🥛', '🧃']) + R(86, 6, 70, 52, '#fef3c7', 1) + shelf(88, 20, 66, ['🍞', '🥐', '🍞', '🧀']) + shelf(88, 36, 66, ['🍫', '🍬', '🍭', '🍫']) + shelf(88, 52, 66, ['🧴', '🧻', '🧴', '🧽']) + tiles(58, '#f1f5f9', '#e2e8f0', 20) + E('🛒', 146, 80, 14),
    props: [40, 120, 80]
  },
  hawker: {
    floor: 0.93,
    svg: () => {
      let s = wall('#fff7e6') + R(0, 0, 160, 5, '#b45309');
      [['#ef4444', '🍜'], ['#16a34a', '🍗'], ['#2563eb', '🥤'], ['#a855f7', '🍢']].forEach(([c, e], i) => {
        const x = 4 + i * 39;
        s += R(x, 8, 35, 8, c, 1) + E(e, x + 17.5, 15, 6.5) + R(x, 16, 35, 22, '#fde68a', 1) + E('🍲', x + 17.5, 32, 9);
      });
      s += floor(44, '#d6d3d1') + C(40, 60, 13, '#f8fafc', 'stroke="#94a3b8" stroke-width="0.8"') + C(120, 60, 13, '#f8fafc', 'stroke="#94a3b8" stroke-width="0.8"') + E('🍜', 40, 63, 8) + E('🍛', 120, 63, 8);
      return s;
    },
    props: [60, 100, 62]
  },
  library: {
    floor: 0.93,
    svg: () => {
      let s = wall('#fbf7ef');
      for (let y = 8; y < 60; y += 13) s += R(4, y + 10, 64, 2, '#92400e') + books(5, y, 62, 10) + R(92, y + 10, 64, 2, '#92400e') + books(93, y, 62, 10);
      return s + R(72, 10, 16, 10, '#ffffff', 1.5, 'stroke="#94a3b8" stroke-width="0.6"') + E('🤫', 80, 18.5, 7) + floor(62, '#c7b299');
    },
    props: [70, 90, 60]
  },
  clinic: {
    floor: 0.93,
    svg: () => wall('#eff8ff') + R(110, 10, 22, 22, '#ffffff', 2, 'stroke="#ef4444" stroke-width="1"') + R(118.5, 14, 5, 14, '#ef4444') + R(114, 18.5, 14, 5, '#ef4444') + R(10, 44, 56, 10, '#f8fafc', 2, 'stroke="#94a3b8" stroke-width="0.8"') + R(10, 38, 14, 7, '#e0f2fe', 3) + floor(62, '#e2e8f0') + E('🩺', 146, 34, 11) + E('🪴', 150, 66, 12),
    props: [40, 120, 50]
  },
  party: {
    floor: 0.93,
    svg: () => {
      let s = wall('#fde7f3');
      const cols = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'];
      for (let i = 0; i < 16; i++) s += P(`M${i * 10} 4 L${i * 10 + 10} 4 L${i * 10 + 5} 12 Z`, cols[i % 5]);
      s += L(0, 4, 160, 4, '#475569', 0.6) + E('🎈', 12, 40, 16) + E('🎈', 150, 36, 16) + R(52, 50, 56, 4, '#c08a50', 1) + E('🎂', 80, 50, 14) + E('🎁', 104, 50, 9);
      return s + floor(62, '#e9d5ff');
    },
    props: [56, 104, 50]
  },
  pool: {
    floor: 0.95,
    svg: () => {
      let s = sky() + E('☀️', 146, 14, 12) + R(0, 30, 160, 10, '#f5e6c8') + R(0, 40, 160, 34, '#38bdf8');
      for (let y = 46; y < 72; y += 7) s += P(`M0 ${y} Q10 ${y - 2} 20 ${y} T40 ${y} T60 ${y} T80 ${y} T100 ${y} T120 ${y} T140 ${y} T160 ${y}`, 'none', 'stroke="#e0f7ff" stroke-width="0.8"');
      return s + R(0, 74, 160, 16, '#f5e6c8') + R(0, 74, 160, 1.5, '#e2c792') + E('🛟', 14, 72, 10) + E('🪜', 150, 42, 10);
    },
    props: [30, 130, 58]
  },
  beach: {
    floor: 0.93,
    svg: () => {
      let s = sky() + E('☀️', 24, 16, 14) + R(0, 34, 160, 22, '#38bdf8');
      for (let x = 0; x < 160; x += 20) s += P(`M${x} 56 Q${x + 5} 52 ${x + 10} 56 T${x + 20} 56`, '#e0f7ff');
      return s + R(0, 56, 160, 34, '#fbe3a8') + E('🌴', 146, 58, 30) + E('⛱️', 22, 64, 18) + E('🐚', 60, 84, 6);
    },
    props: [30, 130, 46]
  },
  storm: {
    floor: 0.93,
    svg: () => {
      let s = sky('#5b6b80', '#9aa7b8');
      for (let i = 0; i < 26; i++) s += L(6 + i * 6.3, 20 + ((i * 11) % 20), 2 + i * 6.3, 28 + ((i * 11) % 20), '#dbeafe', 0.7);
      s += E('⛈️', 34, 22, 22) + E('🌩️', 120, 20, 22) + E('🌳', 140, 60, 30);
      return s + grass(56, '#7c9a7a') + `<ellipse cx="50" cy="76" rx="16" ry="3" fill="#9fb3c8"/><ellipse cx="104" cy="82" rx="12" ry="2.5" fill="#9fb3c8"/>`;
    },
    props: [60, 110, 30]
  },
  tablet: {
    floor: 0.93,
    screen: { x: 92, y: 10, w: 60, h: 46 },
    svg: () => wall('#eef2ff') + floor(64, '#ddd6fe') + E('🛋️', 34, 70, 26) + R(86, 5, 72, 56, '#111827', 5) + R(92, 10, 60, 46, '#ffffff', 2) + C(122, 58, 1.4, '#374151'),
    props: [10, 60, 30]
  },
  fire: {
    floor: 0.93,
    svg: () =>
      wall('#e7dccb') + win(16, 12, 30, 22) + floor(62, '#cdb592') + E('🛋️', 120, 66, 26) + E('🔥', 146, 66, 18) + `<g opacity=".72"><ellipse cx="40" cy="6" rx="40" ry="10" fill="#6b7280"/><ellipse cx="100" cy="4" rx="50" ry="12" fill="#4b5563"/><ellipse cx="150" cy="16" rx="26" ry="14" fill="#6b7280"/><ellipse cx="80" cy="18" rx="44" ry="7" fill="#9ca3af"/></g>`,
    props: [30, 100, 30]
  },
  voiddeck: {
    floor: 0.93,
    svg: () => {
      let s = sky() + grass(40, '#a7e8a0') + E('🌳', 60, 44, 20) + E('🌳', 110, 46, 18) + R(0, 0, 160, 12, '#e5e7eb') + R(0, 12, 160, 2, '#cbd5e1');
      for (const x of [10, 80, 146]) s += R(x - 4, 14, 8, 50, '#f1f5f9', 0, 'stroke="#cbd5e1" stroke-width="0.6"');
      s += floor(60, '#d6d3d1') + R(30, 64, 28, 4, '#a8a29e', 1) + R(100, 64, 28, 4, '#a8a29e', 1);
      for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) s += R(132 + i * 6, 22 + j * 6, 5, 5, '#94a3b8', 0.6);
      return s;
    },
    props: [30, 130, 78]
  }
};

export const BACKDROP_IDS = Object.keys(BG);

// ------------------------------------------------------------------ composer
const SPREAD = { 1: [50], 2: [30, 70], 3: [20, 50, 80], 4: [14, 38, 62, 86] };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/** Render a situation picture. youLabel = "You" / "Con". */
export function scenePic(pic, { youLabel = 'You', label = '' } = {}) {
  const bg = BG[pic?.bg] || BG.home;
  const cast = (pic?.cast || []).slice(0, 4);
  const onStage = cast.filter((c) => !c.screen);
  const onScreen = cast.filter((c) => c.screen);
  const pos = SPREAD[onStage.length] || [];
  const floorPct = (1 - bg.floor) * 100;
  let k = 0;
  const fig = (c, left, bottom, cls = '') => {
    const bubble = c.say ? `<span class="sp-bubble say">${esc(c.say)}</span>` : c.think ? `<span class="sp-bubble think">${esc(c.think)}</span>` : '';
    return `<span class="sp-fig sz-${['s', 'm', 'l'].includes(c.size) ? c.size : 'm'}${c.you ? ' is-you' : ''}${cls}" style="left:${left}%;bottom:${bottom}%">${bubble}<span class="sp-e${c.flip ? ' flip' : ''}">${esc(c.e)}</span>${c.you ? `<span class="sp-you">${esc(youLabel)}</span>` : ''}</span>`;
  };
  const stage = onStage
    .map((c) => {
      const x = clamp(Number.isFinite(c.x) ? c.x : pos[k], 6, 94);
      k++;
      return fig(c, x, floorPct + clamp(Number(c.up) || 0, 0, 60));
    })
    .join('');
  let screen = '';
  if (onScreen.length && bg.screen) {
    const sc = bg.screen;
    const sp = SPREAD[onScreen.length] || [];
    screen = onScreen
      .map((c, i) => {
        const fx = Number.isFinite(c.x) ? c.x : sp[i];
        const left = ((sc.x + (sc.w * clamp(fx, 10, 90)) / 100) / 160) * 100;
        const bottom = ((90 - (sc.y + sc.h)) / 90) * 100 + 2;
        return fig({ ...c, size: c.size || 's' }, left, bottom, ' on-screen');
      })
      .join('');
  }
  const [px1, px2, py] = bg.props;
  const props = (pic?.props || []).slice(0, 3);
  const propHTML = props
    .map((p, i) => {
      const o = typeof p === 'string' ? { e: p } : p;
      const x = Number.isFinite(o.x) ? o.x : ((px1 + ((i + 0.5) * (px2 - px1)) / props.length) / 160) * 100;
      const y = Number.isFinite(o.y) ? o.y : (py / 90) * 100;
      return `<span class="sp-prop sz-${['s', 'm', 'l'].includes(o.size) ? o.size : 's'}" style="left:${clamp(x, 3, 97)}%;top:${clamp(y, 3, 97)}%">${esc(o.e)}</span>`;
    })
    .join('');
  return `<figure class="scene-pic bg-${esc(pic?.bg || 'home')}" role="img" aria-label="${esc(label)}"><svg class="sp-bg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bg.svg()}</svg>${propHTML}${stage}${screen}</figure>`;
}
