// Display theme: full colour, or black & white "e-ink" (paper-like, no animation, colours shown
// as hatch/dot patterns so colour-based questions still work on grayscale e-readers).
import { setInkMode } from '../ui/visuals/core.js';

const KEY = 'merli_theme'; // 'auto' | 'color' | 'ink'

export function themePref() {
  try {
    return localStorage.getItem(KEY) || 'auto';
  } catch {
    return 'auto';
  }
}

export function isInk() {
  const p = themePref();
  if (p === 'ink') return true;
  if (p === 'color') return false;
  return !!(window.matchMedia && (matchMedia('(monochrome)').matches || matchMedia('(update: slow)').matches));
}

const DEFS = `<svg id="ink-defs" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>
<pattern id="ink-solid" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#111"/></pattern>
<pattern id="ink-white" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/></pattern>
<pattern id="ink-diag" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#fff"/><rect width="3" height="8" fill="#111"/></pattern>
<pattern id="ink-cross" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#fff"/><rect width="2" height="8" fill="#111"/><rect width="8" height="2" fill="#111"/></pattern>
<pattern id="ink-dots" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><circle cx="4" cy="4" r="2.1" fill="#111"/></pattern>
<pattern id="ink-hlines" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect y="2.75" width="8" height="2.5" fill="#111"/></pattern>
<pattern id="ink-vlines" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect x="2.75" width="2.5" height="8" fill="#111"/></pattern>
<pattern id="ink-light" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#cfcfcf"/></pattern>
<pattern id="ink-dark" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#6b6b6b"/></pattern>
</defs></svg>`;

export function applyTheme() {
  const ink = isInk();
  document.documentElement.dataset.theme = ink ? 'ink' : 'color';
  setInkMode(ink);
  if (ink && !document.getElementById('ink-defs')) document.body.insertAdjacentHTML('afterbegin', DEFS);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = ink ? '#ffffff' : '#2563eb';
}

export function setThemePref(p) {
  try {
    localStorage.setItem(KEY, p);
  } catch {
    // ignore
  }
  applyTheme();
}
