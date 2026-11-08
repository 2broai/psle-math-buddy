/**
 * Merli Math Buddy v4 — Cloudflare Worker API (free tier) backed by D1.
 *
 * Auth:   POST /api/auth/register  {email, password, name}
 *         POST /api/auth/login     {email, password}
 *         POST /api/auth/logout
 *         POST /api/auth/password  {oldPassword, newPassword}
 * Data:   GET  /api/me                              parent + children (with state)
 *         PUT  /api/children/:id                    create / update a child (optimistic rev)
 *         DELETE /api/children/:id
 *         POST /api/children/:id/attempts           {attempts:[...]} append history (idempotent)
 *         GET  /api/children/:id/history?from&to     per-day totals
 *         GET  /api/children/:id/day?day=YYYY-MM-DD  every attempt of one day
 *
 * Bearer tokens are random 256-bit values; only their SHA-256 is stored.
 * Passwords use PBKDF2-SHA256 (100k iterations, per-user salt).
 */

const PBKDF2_ITER = 100000;
const SESSION_DAYS = 365;
const MAX_STATE_BYTES = 400_000;
const MAX_ATTEMPTS_PER_CALL = 300;

const enc = new TextEncoder();

// ------------------------------------------------------------------ utils
function b64(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}
function unb64(str) {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}
function b64url(bytes) {
  return b64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function sha256Hex(text) {
  const d = await crypto.subtle.digest('SHA-256', enc.encode(text));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
async function pbkdf2(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return new Uint8Array(bits);
}
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a[i] ^ b[i];
  return r === 0;
}
function uuid() {
  return crypto.randomUUID();
}
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const ID_RE = /^[A-Za-z0-9_-]{6,64}$/;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// ------------------------------------------------------------------ CORS & responses
function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const h = { Vary: 'Origin' };
  if (origin && allowed.includes(origin)) {
    h['Access-Control-Allow-Origin'] = origin;
    h['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    h['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    h['Access-Control-Max-Age'] = '86400';
  }
  return h;
}
function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors }
  });
}
async function readJson(request) {
  const len = Number(request.headers.get('Content-Length') || 0);
  if (len > MAX_STATE_BYTES + 50_000) throw new HttpError(413, 'Request too large');
  const text = await request.text();
  if (text.length > MAX_STATE_BYTES + 50_000) throw new HttpError(413, 'Request too large');
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new HttpError(400, 'Invalid JSON');
  }
}

// ------------------------------------------------------------------ rate limiting
async function tooMany(env, key, kind, limit, windowMs) {
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM auth_events WHERE key = ? AND kind = ? AND ts > ?')
    .bind(key, kind, Date.now() - windowMs)
    .first();
  return (row?.n || 0) >= limit;
}
async function recordEvent(env, key, kind) {
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare('INSERT INTO auth_events (key, kind, ts) VALUES (?, ?, ?)').bind(key, kind, now),
    env.DB.prepare('DELETE FROM auth_events WHERE ts < ?').bind(now - 2 * 86400000)
  ]);
}

// ------------------------------------------------------------------ sessions
async function createSession(env, parentId, request) {
  const token = b64url(crypto.getRandomValues(new Uint8Array(32)));
  const now = Date.now();
  await env.DB.prepare('INSERT INTO sessions (token_hash, parent_id, created_at, expires_at, user_agent) VALUES (?, ?, ?, ?, ?)')
    .bind(await sha256Hex(token), parentId, now, now + SESSION_DAYS * 86400000, str(request.headers.get('User-Agent'), 160))
    .run();
  return token;
}
async function requireParent(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const m = auth.match(/^Bearer\s+([A-Za-z0-9_-]{20,100})$/);
  if (!m) throw new HttpError(401, 'Please sign in');
  const tokenHash = await sha256Hex(m[1]);
  const row = await env.DB.prepare(
    'SELECT p.id, p.email, p.name, s.expires_at FROM sessions s JOIN parents p ON p.id = s.parent_id WHERE s.token_hash = ?'
  )
    .bind(tokenHash)
    .first();
  if (!row || row.expires_at < Date.now()) throw new HttpError(401, 'Session expired — please sign in again');
  return { id: row.id, email: row.email, name: row.name, tokenHash };
}

// ------------------------------------------------------------------ children
function childOut(row) {
  let state = {};
  try {
    state = JSON.parse(row.state_json || '{}');
  } catch {
    state = {};
  }
  return {
    id: row.id,
    name: row.name,
    avatar: row.avatar,
    birthYear: row.birth_year,
    rev: row.rev,
    updatedAt: row.updated_at,
    state
  };
}
async function listChildren(env, parentId) {
  const rows = await env.DB.prepare(
    'SELECT id, name, avatar, birth_year, state_json, rev, updated_at FROM children WHERE parent_id = ? AND deleted = 0 ORDER BY created_at'
  )
    .bind(parentId)
    .all();
  return (rows.results || []).map(childOut);
}
async function ownChild(env, parentId, childId) {
  if (!ID_RE.test(childId)) throw new HttpError(400, 'Bad child id');
  const row = await env.DB.prepare('SELECT id, parent_id, deleted FROM children WHERE id = ?').bind(childId).first();
  if (!row || row.deleted) throw new HttpError(404, 'Child not found');
  if (row.parent_id !== parentId) throw new HttpError(404, 'Child not found');
  return row;
}

// ------------------------------------------------------------------ handlers
async function register(request, env) {
  const body = await readJson(request);
  const email = str(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  const name = str(body.name, 60) || email.split('@')[0];
  if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Email không hợp lệ / Invalid email');
  if (password.length < 6 || password.length > 200) throw new HttpError(400, 'Mật khẩu cần ít nhất 6 ký tự / Password needs 6+ characters');
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  if (await tooMany(env, ip, 'register', 10, 3600000)) throw new HttpError(429, 'Too many sign-ups, try again later');
  const exists = await env.DB.prepare('SELECT id FROM parents WHERE email = ?').bind(email).first();
  if (exists) throw new HttpError(409, 'Email này đã có tài khoản — hãy đăng nhập / Email already registered');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITER);
  const id = uuid();
  await env.DB.prepare('INSERT INTO parents (id, email, name, pw_hash, pw_salt, pw_iter, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(id, email, name, b64(hash), b64(salt), PBKDF2_ITER, Date.now())
    .run();
  await recordEvent(env, ip, 'register');
  const token = await createSession(env, id, request);
  return { token, parent: { id, email, name }, children: [] };
}

async function login(request, env) {
  const body = await readJson(request);
  const email = str(body.email, 254).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  if ((await tooMany(env, email, 'fail', 8, 900000)) || (await tooMany(env, ip, 'fail', 40, 900000))) {
    throw new HttpError(429, 'Sai mật khẩu quá nhiều lần, thử lại sau 15 phút / Too many attempts');
  }
  const p = await env.DB.prepare('SELECT id, email, name, pw_hash, pw_salt, pw_iter FROM parents WHERE email = ?').bind(email).first();
  let ok = false;
  if (p) {
    const hash = await pbkdf2(password, unb64(p.pw_salt), p.pw_iter);
    ok = safeEqual(hash, unb64(p.pw_hash));
  } else {
    await pbkdf2(password, new Uint8Array(16), PBKDF2_ITER); // same timing whether or not the email exists
  }
  if (!ok) {
    await recordEvent(env, email, 'fail');
    await recordEvent(env, ip, 'fail');
    throw new HttpError(401, 'Sai email hoặc mật khẩu / Wrong email or password');
  }
  await env.DB.prepare('DELETE FROM auth_events WHERE key = ? AND kind = ?').bind(email, 'fail').run();
  const token = await createSession(env, p.id, request);
  return { token, parent: { id: p.id, email: p.email, name: p.name }, children: await listChildren(env, p.id) };
}

async function changePassword(request, env, parent) {
  const body = await readJson(request);
  const oldPw = typeof body.oldPassword === 'string' ? body.oldPassword : '';
  const newPw = typeof body.newPassword === 'string' ? body.newPassword : '';
  if (newPw.length < 6 || newPw.length > 200) throw new HttpError(400, 'Mật khẩu mới cần ít nhất 6 ký tự');
  const p = await env.DB.prepare('SELECT pw_hash, pw_salt, pw_iter FROM parents WHERE id = ?').bind(parent.id).first();
  const hash = await pbkdf2(oldPw, unb64(p.pw_salt), p.pw_iter);
  if (!safeEqual(hash, unb64(p.pw_hash))) throw new HttpError(401, 'Mật khẩu cũ không đúng');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const nh = await pbkdf2(newPw, salt, PBKDF2_ITER);
  await env.DB.batch([
    env.DB.prepare('UPDATE parents SET pw_hash = ?, pw_salt = ?, pw_iter = ? WHERE id = ?').bind(b64(nh), b64(salt), PBKDF2_ITER, parent.id),
    env.DB.prepare('DELETE FROM sessions WHERE parent_id = ? AND token_hash != ?').bind(parent.id, parent.tokenHash)
  ]);
  return { ok: true };
}

async function putChild(request, env, parent, childId) {
  if (!ID_RE.test(childId)) throw new HttpError(400, 'Bad child id');
  const body = await readJson(request);
  const name = str(body.name, 40) || 'Explorer';
  const avatar = str(body.avatar, 16) || '🦁';
  const by = Number(body.birthYear);
  const birthYear = Number.isInteger(by) && by >= 2005 && by <= 2035 ? by : null;
  const stateJson = JSON.stringify(body.state && typeof body.state === 'object' ? body.state : {});
  if (stateJson.length > MAX_STATE_BYTES) throw new HttpError(413, 'Progress data too large');
  const baseRev = Number(body.baseRev) || 0;
  const now = Date.now();
  const row = await env.DB.prepare('SELECT parent_id, rev, deleted FROM children WHERE id = ?').bind(childId).first();
  if (row && row.parent_id !== parent.id) throw new HttpError(404, 'Child not found');
  if (!row) {
    await env.DB.prepare(
      'INSERT INTO children (id, parent_id, name, avatar, birth_year, state_json, rev, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)'
    )
      .bind(childId, parent.id, name, avatar, birthYear, stateJson, now, now)
      .run();
    return { ok: true, rev: 1, updatedAt: now };
  }
  if (row.deleted) throw new HttpError(410, 'Child was deleted');
  if (baseRev !== row.rev) {
    const cur = await env.DB.prepare('SELECT id, name, avatar, birth_year, state_json, rev, updated_at FROM children WHERE id = ?').bind(childId).first();
    return { conflict: true, server: childOut(cur) };
  }
  const res = await env.DB.prepare(
    'UPDATE children SET name = ?, avatar = ?, birth_year = ?, state_json = ?, rev = rev + 1, updated_at = ? WHERE id = ? AND rev = ?'
  )
    .bind(name, avatar, birthYear, stateJson, now, childId, baseRev)
    .run();
  if (!res.meta || res.meta.changes !== 1) {
    const cur = await env.DB.prepare('SELECT id, name, avatar, birth_year, state_json, rev, updated_at FROM children WHERE id = ?').bind(childId).first();
    return { conflict: true, server: childOut(cur) };
  }
  return { ok: true, rev: baseRev + 1, updatedAt: now };
}

async function addAttempts(request, env, parent, childId) {
  await ownChild(env, parent.id, childId);
  const body = await readJson(request);
  const list = Array.isArray(body.attempts) ? body.attempts.slice(0, MAX_ATTEMPTS_PER_CALL) : [];
  const stmts = [];
  for (const a of list) {
    const id = str(a.id, 64);
    const day = str(a.day, 10);
    if (!ID_RE.test(id) || !DAY_RE.test(day)) continue;
    stmts.push(
      env.DB.prepare(
        'INSERT OR IGNORE INTO attempts (id, child_id, ts, day, skill, tier, ok, tries, ms, mode, q, given, answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        id,
        childId,
        Number(a.ts) || Date.now(),
        day,
        str(a.skill, 64) || 'unknown',
        Math.min(3, Math.max(1, Number(a.tier) || 1)),
        a.ok ? 1 : 0,
        Math.min(9, Math.max(1, Number(a.tries) || 1)),
        Math.min(600000, Math.max(0, Number(a.ms) || 0)),
        str(a.mode, 16) || null,
        str(a.q, 240) || null,
        str(a.given, 60) || null,
        str(a.answer, 60) || null
      )
    );
  }
  for (let i = 0; i < stmts.length; i += 50) await env.DB.batch(stmts.slice(i, i + 50));
  return { ok: true, saved: stmts.length };
}

async function history(url, env, parent, childId) {
  await ownChild(env, parent.id, childId);
  const to = DAY_RE.test(url.searchParams.get('to') || '') ? url.searchParams.get('to') : '9999-12-31';
  const from = DAY_RE.test(url.searchParams.get('from') || '') ? url.searchParams.get('from') : '0000-01-01';
  const rows = await env.DB.prepare(
    'SELECT day, COUNT(*) AS n, SUM(ok) AS ok, SUM(ms) AS ms FROM attempts WHERE child_id = ? AND day BETWEEN ? AND ? GROUP BY day ORDER BY day'
  )
    .bind(childId, from, to)
    .all();
  return { days: rows.results || [] };
}

async function dayDetail(url, env, parent, childId) {
  await ownChild(env, parent.id, childId);
  const day = url.searchParams.get('day') || '';
  if (!DAY_RE.test(day)) throw new HttpError(400, 'Bad day');
  const rows = await env.DB.prepare(
    'SELECT ts, skill, tier, ok, tries, ms, mode, q, given, answer FROM attempts WHERE child_id = ? AND day = ? ORDER BY ts LIMIT 2000'
  )
    .bind(childId, day)
    .all();
  return { day, attempts: rows.results || [] };
}

// ------------------------------------------------------------------ router
async function route(request, env, url) {
  const path = url.pathname.replace(/\/+$/, '');
  const method = request.method;
  if (path === '/api/health') return { ok: true, service: 'merli-math-api', version: 4 };
  if (path === '/api/auth/register' && method === 'POST') return register(request, env);
  if (path === '/api/auth/login' && method === 'POST') return login(request, env);

  const parent = await requireParent(request, env);
  if (path === '/api/auth/logout' && method === 'POST') {
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(parent.tokenHash).run();
    return { ok: true };
  }
  if (path === '/api/auth/password' && method === 'POST') return changePassword(request, env, parent);
  if (path === '/api/me' && method === 'GET') {
    return { parent: { id: parent.id, email: parent.email, name: parent.name }, children: await listChildren(env, parent.id) };
  }
  const m = path.match(/^\/api\/children\/([^/]+)(?:\/(attempts|history|day))?$/);
  if (m) {
    const [, childId, sub] = m;
    if (!sub && method === 'PUT') return putChild(request, env, parent, childId);
    if (!sub && method === 'DELETE') {
      await ownChild(env, parent.id, childId);
      await env.DB.prepare('UPDATE children SET deleted = 1, updated_at = ? WHERE id = ?').bind(Date.now(), childId).run();
      return { ok: true };
    }
    if (sub === 'attempts' && method === 'POST') return addAttempts(request, env, parent, childId);
    if (sub === 'history' && method === 'GET') return history(url, env, parent, childId);
    if (sub === 'day' && method === 'GET') return dayDetail(url, env, parent, childId);
  }
  throw new HttpError(404, 'Not found');
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const url = new URL(request.url);
    try {
      const data = await route(request, env, url);
      return json(data, 200, cors);
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message }, err.status, cors);
      console.error('Unhandled error', url.pathname, err && err.stack);
      return json({ error: 'Server error, please try again' }, 500, cors);
    }
  }
};
