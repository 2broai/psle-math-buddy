/**
 * Cloudflare Worker API + D1 Database for Merli Math Buddy EdTech Platform
 * Free Tier: 100,000 requests/day + 5GB D1 SQLite storage
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  });
}

async function hashPassword(password, salt = 'merli-sg-moe-salt') {
  const enc = new TextEncoder();
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(`${salt}:${password}`));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === '/api/health') {
        return jsonResponse({ ok: true, service: 'merli-math-cloudflare-worker' });
      }

      // 1. Register Parent + Initial Child Profile
      if (path === '/api/auth/register' && request.method === 'POST') {
        const body = await request.json();
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        const parentName = (body.parentName || 'Parent').trim();
        const childName = (body.childName || 'Junior Explorer').trim();
        const childAvatar = body.childAvatar || '🦁';
        const initialState = body.initialState || {};

        if (!email || password.length < 4) {
          return jsonResponse({ error: 'Please provide a valid email and a password (min 4 chars).' }, 400);
        }

        const existing = await env.DB.prepare('SELECT id FROM parents WHERE email = ?').bind(email).first();
        if (existing) {
          return jsonResponse({ error: 'Email is already registered. Please sign in instead.' }, 409);
        }

        const parentId = crypto.randomUUID();
        const childId = crypto.randomUUID();
        const now = Date.now();
        const pwHash = await hashPassword(password);

        await env.DB.batch([
          env.DB.prepare(
            'INSERT INTO parents (id, email, password_hash, parent_name, created_at) VALUES (?, ?, ?, ?, ?)'
          ).bind(parentId, email, pwHash, parentName, now),
          env.DB.prepare(
            `INSERT INTO children (id, parent_id, child_name, avatar, entry_year, stars, xp, level, total_solved, state_json, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(
            childId,
            parentId,
            childName,
            childAvatar,
            2027,
            initialState.stars ?? 25,
            initialState.xp ?? 20,
            initialState.level ?? 1,
            initialState.totalSolved ?? 0,
            JSON.stringify(initialState),
            now
          )
        ]);

        return jsonResponse({
          ok: true,
          parent: { id: parentId, email, parentName },
          children: [
            {
              id: childId,
              childName,
              avatar: childAvatar,
              state: initialState
            }
          ]
        });
      }

      // 2. Login Parent & Fetch All Child Profiles
      if (path === '/api/auth/login' && request.method === 'POST') {
        const body = await request.json();
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        const pwHash = await hashPassword(password);

        const parent = await env.DB.prepare(
          'SELECT id, email, parent_name FROM parents WHERE email = ? AND password_hash = ?'
        )
          .bind(email, pwHash)
          .first();

        if (!parent) {
          return jsonResponse({ error: 'Invalid email or password.' }, 401);
        }

        const childrenRows = await env.DB.prepare(
          'SELECT id, child_name, avatar, entry_year, state_json, updated_at FROM children WHERE parent_id = ? ORDER BY updated_at DESC'
        )
          .bind(parent.id)
          .all();

        const children = (childrenRows.results || []).map((row) => ({
          id: row.id,
          childName: row.child_name,
          avatar: row.avatar,
          entryYear: row.entry_year,
          state: JSON.parse(row.state_json || '{}')
        }));

        return jsonResponse({
          ok: true,
          parent: { id: parent.id, email: parent.email, parentName: parent.parent_name },
          children
        });
      }

      // 3. Sync Active Child Profile & Attempt Logs to Cloudflare D1
      if (path === '/api/sync' && request.method === 'POST') {
        const body = await request.json();
        const { parentId, childId, childName, avatar, state, newAttempts } = body;
        if (!parentId || !childId || !state) {
          return jsonResponse({ error: 'Missing required sync fields.' }, 400);
        }

        const now = Date.now();
        const statements = [
          env.DB.prepare(
            `INSERT INTO children (id, parent_id, child_name, avatar, entry_year, stars, xp, level, total_solved, state_json, updated_at)
             VALUES (?, ?, ?, ?, 2027, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET
               child_name = excluded.child_name,
               avatar = excluded.avatar,
               stars = excluded.stars,
               xp = excluded.xp,
               level = excluded.level,
               total_solved = excluded.total_solved,
               state_json = excluded.state_json,
               updated_at = excluded.updated_at`
          ).bind(
            childId,
            parentId,
            childName || 'Junior Explorer',
            avatar || '🦁',
            state.stars ?? 25,
            state.xp ?? 20,
            state.level ?? 1,
            state.totalSolved ?? 0,
            JSON.stringify(state),
            now
          )
        ];

        if (Array.isArray(newAttempts)) {
          for (const att of newAttempts.slice(0, 25)) {
            statements.push(
              env.DB.prepare(
                `INSERT INTO attempt_logs (child_id, world, subskill, difficulty, is_first_try_correct, time_spent_ms, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`
              ).bind(
                childId,
                att.world || 'bonds',
                att.subskill || 'General',
                att.difficulty || 'starter',
                att.isFirstTryCorrect ? 1 : 0,
                att.timeSpentMs || 0,
                att.timestamp || now
              )
            );
          }
        }

        await env.DB.batch(statements);
        return jsonResponse({ ok: true, syncedAt: now });
      }

      return jsonResponse({ error: 'Route not found' }, 404);
    } catch (err) {
      return jsonResponse({ error: err.message || 'Internal Server Error' }, 500);
    }
  }
};
