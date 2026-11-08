// Tiny text markup used by question prompts, hints, explanations and labels.
//   **word**   -> highlighted keyword
//   [3/4]      -> stacked fraction
//   \n         -> line break
// Everything else is HTML-escaped. Pure functions (no DOM) so they run in Node tests too.

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function fracHTML(n, d) {
  return `<span class="frac"><span class="frac-n">${esc(n)}</span><span class="frac-d">${esc(d)}</span></span>`;
}

export function md(text) {
  let s = esc(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<b class="kw">$1</b>');
  s = s.replace(/\[(\d+|\?)\/(\d+|\?)\]/g, (_, n, d) => fracHTML(n, d));
  s = s.replace(/\n/g, '<br>');
  return s;
}

const FRAC_DEN = {
  2: ['half', 'halves'],
  3: ['third', 'thirds'],
  4: ['quarter', 'quarters'],
  5: ['fifth', 'fifths'],
  6: ['sixth', 'sixths'],
  7: ['seventh', 'sevenths'],
  8: ['eighth', 'eighths'],
  9: ['ninth', 'ninths'],
  10: ['tenth', 'tenths'],
  11: ['eleventh', 'elevenths'],
  12: ['twelfth', 'twelfths']
};

export function fracSpeech(n, d) {
  if (n === '?' || d === '?') return 'what fraction';
  const nn = Number(n);
  const dd = Number(d);
  const w = FRAC_DEN[dd];
  if (!w) return `${n} over ${d}`;
  if (nn === 1) return dd === 2 ? 'one half' : `one ${w[0]}`;
  return `${n} ${w[1]}`;
}

/** Convert prompt text to something a speech engine reads naturally. */
export function toSpeech(text) {
  let s = String(text ?? '');
  s = s.replace(/\*\*/g, '');
  s = s.replace(/\[(\d+|\?)\/(\d+|\?)\]/g, (_, n, d) => fracSpeech(n, d));
  // money
  s = s.replace(/\$(\d+)\.(\d{2})/g, (_, d, c) => `${d} dollars ${Number(c)} cents`);
  s = s.replace(/\$(\d+)/g, (_, d) => (d === '1' ? '1 dollar' : `${d} dollars`));
  s = s.replace(/(\d+)¢/g, '$1 cents');
  // units (only directly after a number)
  s = s.replace(/(\d)\s?km\b/g, '$1 kilometres');
  s = s.replace(/(\d)\s?cm\b/g, '$1 centimetres');
  s = s.replace(/(\d)\s?kg\b/g, '$1 kilograms');
  s = s.replace(/(\d)\s?mℓ/g, '$1 millilitres');
  s = s.replace(/(\d)\s?ℓ/g, '$1 litres');
  s = s.replace(/(\d)\s?m\b/g, '$1 metres');
  s = s.replace(/(\d)\s?g\b/g, '$1 grams');
  s = s.replace(/ℓ/g, 'litres');
  // operators
  s = s.replace(/\s\+\s/g, ' plus ');
  s = s.replace(/\s[−-]\s/g, ' minus ');
  s = s.replace(/\s×\s/g, ' times ');
  s = s.replace(/\s÷\s/g, ' divided by ');
  s = s.replace(/=\s*\?/g, 'equals what number');
  s = s.replace(/\s=\s/g, ' equals ');
  s = s.replace(/\s>\s/g, ' is greater than ');
  s = s.replace(/\s<\s/g, ' is less than ');
  s = s.replace(/(^|\s)\?(\s)/g, '$1what number$2');
  s = s.replace(/_{2,}|☐/g, ' blank ');
  s = s.replace(/\n/g, '. ');
  return s.replace(/\s{2,}/g, ' ').trim();
}
