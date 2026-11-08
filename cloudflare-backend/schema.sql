-- Merli Math Buddy v4 — Cloudflare D1 (SQLite) schema.
-- Apply: npx wrangler d1 execute merli-math-db --remote --file=./schema.sql

-- Parent accounts (login). Passwords: PBKDF2-SHA256 with a per-user random salt.
CREATE TABLE IF NOT EXISTS parents (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  pw_hash TEXT NOT NULL,
  pw_salt TEXT NOT NULL,
  pw_iter INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

-- Login sessions. Only the SHA-256 of the bearer token is stored.
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_sessions_parent ON sessions(parent_id);

-- Child profiles. state_json holds progress (skills, stars, stickers, daily totals, settings).
-- rev is bumped on every write (optimistic concurrency between devices).
CREATE TABLE IF NOT EXISTS children (
  id TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🦁',
  birth_year INTEGER,
  state_json TEXT NOT NULL DEFAULT '{}',
  rev INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_children_parent ON children(parent_id);

-- Every answered question (history). id is generated on the device, so re-sending is harmless.
CREATE TABLE IF NOT EXISTS attempts (
  id TEXT PRIMARY KEY,
  child_id TEXT NOT NULL,
  ts INTEGER NOT NULL,
  day TEXT NOT NULL,
  skill TEXT NOT NULL,
  tier INTEGER NOT NULL,
  ok INTEGER NOT NULL,
  tries INTEGER NOT NULL,
  ms INTEGER NOT NULL,
  mode TEXT,
  q TEXT,
  given TEXT,
  answer TEXT
);
CREATE INDEX IF NOT EXISTS idx_attempts_child_day ON attempts(child_id, day);

-- Failed logins / registrations, for rate limiting.
CREATE TABLE IF NOT EXISTS auth_events (
  key TEXT NOT NULL,
  kind TEXT NOT NULL,
  ts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_auth_events ON auth_events(key, kind, ts);
