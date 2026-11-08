// Local-first storage: the whole family account lives in localStorage and is synced to the
// cloud (Cloudflare D1) when a parent is signed in.
import { schoolLevelForBirthYear } from '../content/meta.js';

const KEY = 'merli_v4_account';

export const DEFAULT_SETTINGS = {
  dailyGoal: 60, // minutes
  breakEvery: 20, // minutes of practice before a stretch break (0 = off)
  breakLen: 3, // minutes
  maxDaily: 120, // minutes per day (0 = no limit)
  autoRead: true, // read every question aloud
  input: 'auto', // 'auto' | 'choices' (always multiple choice)
  sound: true,
  lifeLang: 'en', // Life Skills cards: 'en' | 'vi'
  region: 'SG', // emergency numbers in Life Skills: 'SG' | 'VN'
  lifeOff: [], // Life Skills topic ids switched off by the parent
  at: 0 // last change time (for merging between devices)
};

export function randomId(prefix = '') {
  const a = crypto.getRandomValues(new Uint8Array(12));
  return prefix + [...a].map((b) => b.toString(36).padStart(2, '0')).join('').slice(0, 16);
}

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function dayKeyOffset(offsetDays, from = new Date()) {
  const d = new Date(from);
  d.setDate(d.getDate() + offsetDays);
  return todayKey(d);
}

export function newChildState() {
  return {
    v: 4,
    stars: 0,
    xp: 0,
    totalQ: 0,
    totalOk: 0,
    totalSec: 0,
    missions: 0,
    skills: {},
    daily: {},
    streak: { cur: 0, best: 0, last: '' },
    stickers: [],
    trophies: [],
    owned: [],
    equip: {},
    sprint: {},
    mistakes: [],
    levelOverride: null,
    life: { seen: {}, log: [] }, // Life Skills: per-card {n, ok, last, box}; recent not-first-try answers
    profileAt: Date.now(),
    settings: { ...DEFAULT_SETTINGS }
  };
}

export function normalizeState(s) {
  const base = newChildState();
  const out = { ...base, ...(s || {}) };
  out.settings = { ...DEFAULT_SETTINGS, ...((s && s.settings) || {}) };
  for (const k of ['skills', 'daily', 'sprint', 'equip']) out[k] = { ...((s && s[k]) || {}) };
  for (const k of ['stickers', 'trophies', 'owned', 'mistakes']) out[k] = Array.isArray(s && s[k]) ? [...s[k]] : [];
  out.streak = { ...base.streak, ...((s && s.streak) || {}) };
  out.settings.lifeOff = Array.isArray(out.settings.lifeOff) ? [...out.settings.lifeOff] : [];
  const life = (s && s.life) || {};
  out.life = { seen: { ...(life.seen || {}) }, log: Array.isArray(life.log) ? [...life.log] : [] };
  return out;
}

export function newChild({ name, avatar, birthYear }) {
  return {
    id: randomId('c'),
    name: name || 'Explorer',
    avatar: avatar || '🦁',
    birthYear: birthYear || null,
    rev: 0,
    dirty: true,
    state: newChildState()
  };
}

function migrateV3() {
  try {
    const raw = localStorage.getItem('merli_edtech_account_v3');
    if (!raw) return null;
    const old = JSON.parse(raw);
    const children = (old.profiles || []).map((p) => {
      const c = newChild({ name: p.childName, avatar: p.avatar });
      c.state.stars = Number(p.state?.stars) || 0;
      c.state.xp = Number(p.state?.xp) || 0;
      return c;
    });
    return children.length ? children : null;
  } catch {
    return null;
  }
}

function freshAccount() {
  return { v: 4, activeChildId: null, children: migrateV3() || [], auth: null, pin: null, queue: [], lastPull: 0 };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshAccount();
    const a = JSON.parse(raw);
    a.children = (a.children || []).map((c) => ({ ...c, state: normalizeState(c.state) }));
    a.queue = Array.isArray(a.queue) ? a.queue : [];
    return { ...freshAccount(), ...a };
  } catch {
    return freshAccount();
  }
}

const listeners = new Set();

export const store = {
  account: load(),

  save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.account));
    } catch (e) {
      // Storage full: drop the oldest queued history first, then retry once.
      this.account.queue = this.account.queue.slice(-500);
      try {
        localStorage.setItem(KEY, JSON.stringify(this.account));
      } catch {
        console.warn('Could not save progress', e);
      }
    }
    listeners.forEach((fn) => fn());
  },

  onChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  get children() {
    return this.account.children;
  },

  child(id) {
    return this.account.children.find((c) => c.id === id) || null;
  },

  active() {
    return this.child(this.account.activeChildId);
  },

  setActive(id) {
    this.account.activeChildId = id;
    this.save();
  },

  addChild(data) {
    const c = newChild(data);
    this.account.children.push(c);
    this.account.activeChildId = c.id;
    this.save();
    return c;
  },

  /** Mark a child as changed (needs upload). */
  touch(child) {
    child.dirty = true;
    this.save();
  },

  removeChild(id) {
    this.account.children = this.account.children.filter((c) => c.id !== id);
    this.account.queue = this.account.queue.filter((a) => a.childId !== id);
    if (this.account.activeChildId === id) this.account.activeChildId = this.account.children[0]?.id || null;
    this.save();
  },

  enqueue(attempt) {
    this.account.queue.push(attempt);
    if (this.account.queue.length > 6000) this.account.queue = this.account.queue.slice(-6000);
  }
};

/** Level the child should practise: parent override, else school level from birth year. */
export function focusLevel(child) {
  if (!child) return 'K';
  if (child.state.levelOverride) return child.state.levelOverride;
  if (!child.birthYear) return 'K';
  return schoolLevelForBirthYear(child.birthYear);
}

export async function sha256Hex(text) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
