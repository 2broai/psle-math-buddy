// Cloud sync with the Cloudflare Worker API. Everything works offline; when a parent is signed in,
// child profiles + progress are uploaded (optimistic revisions, merged on conflict) and every
// answered question is appended to the history table.
import { API_BASE } from '../config.js';
import { store, normalizeState } from './store.js';

const listeners = new Set();
export const syncStatus = { state: 'idle', message: '', at: 0 };
function setStatus(state, message = '') {
  Object.assign(syncStatus, { state, message, at: Date.now() });
  listeners.forEach((fn) => fn(syncStatus));
}
export function onSyncStatus(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function call(path, { method = 'GET', body, auth = true, keepalive = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = store.account.auth?.token;
  if (auth && token) headers.Authorization = `Bearer ${token}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  let res;
  try {
    res = await fetch(API_BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined, signal: ctrl.signal, keepalive });
  } catch {
    throw new ApiError(0, 'Không kết nối được máy chủ (offline?)');
  } finally {
    clearTimeout(timer);
  }
  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) {
    if (res.status === 401 && auth && store.account.auth) {
      store.account.auth = null;
      store.save();
    }
    throw new ApiError(res.status, data.error || `Lỗi máy chủ (${res.status})`);
  }
  return data;
}

// ------------------------------------------------------------------ merging two copies of a child
function mergeMaxMap(a = {}, b = {}) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] || 0, v || 0);
  return out;
}

export function mergeChild(local, server) {
  const L = normalizeState(local.state);
  const S = normalizeState(server.state);
  const leader = (S.totalQ || 0) > (L.totalQ || 0) ? S : L;
  const out = normalizeState(leader);
  // skills: the copy with more attempts wins per skill
  out.skills = { ...L.skills };
  for (const [id, sv] of Object.entries(S.skills)) {
    const lv = out.skills[id];
    if (!lv || (sv.n || 0) > (lv.n || 0) || ((sv.n || 0) === (lv.n || 0) && (sv.last || 0) > (lv.last || 0))) out.skills[id] = sv;
  }
  // daily totals: max per field per day
  out.daily = { ...L.daily };
  for (const [day, sv] of Object.entries(S.daily)) {
    const lv = out.daily[day];
    out.daily[day] = lv ? { sec: Math.max(lv.sec || 0, sv.sec || 0), q: Math.max(lv.q || 0, sv.q || 0), ok: Math.max(lv.ok || 0, sv.ok || 0), m: Math.max(lv.m || 0, sv.m || 0) } : sv;
  }
  out.stickers = [...new Set([...L.stickers, ...S.stickers])];
  out.trophies = [...new Set([...L.trophies, ...S.trophies])];
  out.owned = [...new Set([...L.owned, ...S.owned])];
  out.sprint = mergeMaxMap(L.sprint, S.sprint);
  const seen = new Set();
  out.mistakes = [...L.mistakes, ...S.mistakes]
    .filter((m) => (seen.has(m.id) ? false : seen.add(m.id)))
    .sort((a, b) => a.ts - b.ts)
    .slice(-150);
  out.streak = (S.streak.last || '') > (L.streak.last || '') ? { ...S.streak } : { ...L.streak };
  out.streak.best = Math.max(L.streak.best || 0, S.streak.best || 0);
  // settings & profile: newest change wins
  out.settings = (S.settings.at || 0) > (L.settings.at || 0) ? S.settings : L.settings;
  const profileFromServer = (S.profileAt || 0) > (L.profileAt || 0);
  out.levelOverride = profileFromServer ? S.levelOverride : L.levelOverride;
  out.profileAt = Math.max(S.profileAt || 0, L.profileAt || 0);
  return {
    ...local,
    name: profileFromServer ? server.name : local.name,
    avatar: profileFromServer ? server.avatar : local.avatar,
    birthYear: profileFromServer ? server.birthYear : local.birthYear,
    rev: server.rev,
    state: out
  };
}

// ------------------------------------------------------------------ auth
function adoptServerChildren(children) {
  const acc = store.account;
  const serverIds = new Set(children.map((c) => c.id));
  for (const sc of children) {
    const i = acc.children.findIndex((c) => c.id === sc.id);
    const server = { id: sc.id, name: sc.name, avatar: sc.avatar, birthYear: sc.birthYear, rev: sc.rev, state: normalizeState(sc.state), dirty: false };
    if (i < 0) acc.children.push(server);
    else if (sc.rev !== acc.children[i].rev) {
      acc.children[i] = acc.children[i].dirty ? { ...mergeChild(acc.children[i], server), dirty: true } : server;
    }
  }
  // children that were synced before but no longer exist on the server were deleted elsewhere
  acc.children = acc.children.filter((c) => serverIds.has(c.id) || !c.rev);
  for (const c of acc.children) if (!serverIds.has(c.id)) c.dirty = true;
  if (!acc.children.some((c) => c.id === acc.activeChildId)) acc.activeChildId = acc.children[0]?.id || null;
}

export async function signIn(email, password) {
  const data = await call('/api/auth/login', { method: 'POST', body: { email, password }, auth: false });
  store.account.auth = { token: data.token, email: data.parent.email, name: data.parent.name, parentId: data.parent.id };
  adoptServerChildren(data.children || []);
  store.account.lastPull = Date.now();
  store.save();
  await syncNow();
  return data;
}

export async function signUp(email, password, name) {
  const data = await call('/api/auth/register', { method: 'POST', body: { email, password, name }, auth: false });
  store.account.auth = { token: data.token, email: data.parent.email, name: data.parent.name, parentId: data.parent.id };
  for (const c of store.account.children) {
    c.dirty = true;
    c.rev = 0;
  }
  store.save();
  await syncNow();
  return data;
}

export async function signOut() {
  try {
    await call('/api/auth/logout', { method: 'POST' });
  } catch {
    // ignore — token is dropped locally anyway
  }
  store.account.auth = null;
  store.save();
  setStatus('idle', '');
}

export async function changePassword(oldPassword, newPassword) {
  return call('/api/auth/password', { method: 'POST', body: { oldPassword, newPassword } });
}

export async function deleteChildRemote(id) {
  if (!store.account.auth) return;
  try {
    await call(`/api/children/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (e) {
    if (e.status !== 404) throw e;
  }
}

export async function fetchHistory(childId, from, to) {
  return call(`/api/children/${encodeURIComponent(childId)}/history?from=${from}&to=${to}`);
}

export async function fetchDay(childId, day) {
  return call(`/api/children/${encodeURIComponent(childId)}/day?day=${day}`);
}

// ------------------------------------------------------------------ push / pull
async function pushChild(child) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const body = { name: child.name, avatar: child.avatar, birthYear: child.birthYear, state: child.state, baseRev: child.rev || 0 };
    const res = await call(`/api/children/${encodeURIComponent(child.id)}`, { method: 'PUT', body });
    if (res.ok) {
      child.rev = res.rev;
      child.dirty = false;
      return;
    }
    if (res.conflict && res.server) {
      const merged = mergeChild(child, { ...res.server, state: normalizeState(res.server.state) });
      Object.assign(child, merged);
      continue;
    }
    throw new ApiError(500, 'Unexpected sync response');
  }
}

async function pushAttempts(keepalive = false) {
  const acc = store.account;
  while (acc.queue.length) {
    const childId = acc.queue[0].childId;
    const batch = acc.queue.filter((a) => a.childId === childId).slice(0, 300);
    const child = store.child(childId);
    if (!child) {
      acc.queue = acc.queue.filter((a) => a.childId !== childId);
      continue;
    }
    if (!child.rev) await pushChild(child);
    try {
      await call(`/api/children/${encodeURIComponent(childId)}/attempts`, {
        method: 'POST',
        body: { attempts: batch.map(({ childId: _c, ...rest }) => rest) },
        keepalive
      });
    } catch (e) {
      if (e.status === 404 || e.status === 410) {
        acc.queue = acc.queue.filter((a) => a.childId !== childId);
        continue;
      }
      throw e;
    }
    const sent = new Set(batch.map((a) => a.id));
    acc.queue = acc.queue.filter((a) => !sent.has(a.id));
  }
}

let syncing = null;
export function syncNow() {
  if (!store.account.auth) return Promise.resolve();
  if (syncing) return syncing;
  syncing = (async () => {
    setStatus('syncing', 'Đang đồng bộ…');
    try {
      if (Date.now() - (store.account.lastPull || 0) > 5 * 60000) {
        const me = await call('/api/me');
        adoptServerChildren(me.children || []);
        store.account.lastPull = Date.now();
      }
      for (const c of store.account.children) if (c.dirty || !c.rev) await pushChild(c);
      await pushAttempts();
      store.save();
      setStatus('ok', 'Đã lưu lên đám mây');
    } catch (e) {
      store.save();
      setStatus(e.status === 0 ? 'offline' : 'error', e.message);
    } finally {
      syncing = null;
    }
  })();
  return syncing;
}

let timer = null;
/** Debounced background sync after progress changes. */
export function scheduleSync(delayMs = 15000) {
  if (!store.account.auth) return;
  clearTimeout(timer);
  timer = setTimeout(() => syncNow(), delayMs);
}

/** Best effort when the tab is being hidden/closed. */
export function flushOnHide() {
  if (!store.account.auth || !store.account.queue.length) return;
  pushAttempts(true).catch(() => {});
}
