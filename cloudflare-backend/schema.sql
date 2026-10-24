-- Cloudflare D1 (SQLite) Database Schema for Merli Math Buddy EdTech Platform
-- Run: npx wrangler d1 execute merli-math-db --file=./cloudflare-backend/schema.sql

CREATE TABLE IF NOT EXISTS parents (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS children (
  id TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL,
  child_name TEXT NOT NULL,
  avatar TEXT DEFAULT '🦁',
  entry_year INTEGER DEFAULT 2027,
  stars INTEGER DEFAULT 25,
  xp INTEGER DEFAULT 20,
  level INTEGER DEFAULT 1,
  total_solved INTEGER DEFAULT 0,
  state_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id)
);

CREATE TABLE IF NOT EXISTS attempt_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  child_id TEXT NOT NULL,
  world TEXT NOT NULL,
  subskill TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  is_first_try_correct INTEGER NOT NULL,
  time_spent_ms INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (child_id) REFERENCES children(id)
);

CREATE INDEX IF NOT EXISTS idx_children_parent ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_attempts_child ON attempt_logs(child_id, created_at DESC);
