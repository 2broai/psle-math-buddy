// Seedable random number generator + helpers used by every question generator.
// Generators receive an `R` object (never call Math.random directly) so questions
// are reproducible in tests: makeRng(123) always yields the same sequence.

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const s = seed == null ? (Math.random() * 4294967296) >>> 0 : seed >>> 0;
  const next = mulberry32(s);

  const R = {
    seed: s,
    next,
    /** Integer in [min, max] inclusive. */
    int(min, max) {
      if (max < min) [min, max] = [max, min];
      return min + Math.floor(next() * (max - min + 1));
    },
    /** Integer in [min, max] that is not in `exclude`. Falls back to min..max scan. */
    intExcept(min, max, exclude = []) {
      const ex = new Set(exclude);
      for (let i = 0; i < 40; i++) {
        const v = R.int(min, max);
        if (!ex.has(v)) return v;
      }
      for (let v = min; v <= max; v++) if (!ex.has(v)) return v;
      return min;
    },
    /** Multiple of `step` in [min, max]. */
    step(min, max, step) {
      const lo = Math.ceil(min / step);
      const hi = Math.floor(max / step);
      return R.int(lo, hi) * step;
    },
    pick(arr) {
      return arr[Math.floor(next() * arr.length)];
    },
    /** Pick using weights: pickW([['a', 3], ['b', 1]]) */
    pickW(pairs) {
      const total = pairs.reduce((s, p) => s + p[1], 0);
      let r = next() * total;
      for (const [v, w] of pairs) {
        r -= w;
        if (r < 0) return v;
      }
      return pairs[pairs.length - 1][0];
    },
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    /** n distinct elements from arr (order random). */
    sample(arr, n) {
      return R.shuffle(arr).slice(0, n);
    },
    chance(p) {
      return next() < p;
    },
    /** n distinct integers in [min, max]. */
    distinctInts(n, min, max) {
      const set = new Set();
      let guard = 0;
      while (set.size < n && guard++ < 500) set.add(R.int(min, max));
      return [...set];
    }
  };
  return R;
}

/** Small string hash (FNV-1a) used to derive per-skill seeds in tests. */
export function hashStr(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}
