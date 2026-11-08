#!/usr/bin/env node
// Regenerates the precache list + version in sw.js from the files that make up the app.
// VERSION is a hash of all file contents, so any change ships as a new app version.
//   node tools/build-sw.mjs          rewrite sw.js
//   node tools/build-sw.mjs --check  exit 1 if sw.js is out of date (used by npm test)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = new URL('..', import.meta.url).pathname;
const TOP = ['index.html', 'manifest.json', 'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'img/hero.webp'];

function walk(dir) {
  return readdirSync(join(ROOT, dir)).flatMap((name) => {
    const rel = join(dir, name);
    return statSync(join(ROOT, rel)).isDirectory() ? walk(rel) : [rel];
  });
}

const files = [...TOP, ...walk('css'), ...walk('js').filter((f) => f.endsWith('.js'))].sort();
const hash = createHash('sha256');
for (const f of files) hash.update(f).update(readFileSync(join(ROOT, f)));
const version = `merli-${hash.digest('hex').slice(0, 10)}`;
const assets = ['./', ...files.map((f) => `./${relative('.', f)}`)];
const block = `// @generated-start\nconst VERSION = '${version}';\nconst ASSETS = [\n${assets.map((a) => `  '${a}'`).join(',\n')}\n];\n// @generated-end`;

const swPath = join(ROOT, 'sw.js');
const sw = readFileSync(swPath, 'utf8');
const next = sw.replace(/\/\/ @generated-start[\s\S]*?\/\/ @generated-end/, block);
if (process.argv.includes('--check')) {
  if (next !== sw) {
    console.error('sw.js is out of date — run: npm run build');
    process.exit(1);
  }
  console.log(`sw.js up to date (${version}, ${assets.length} files)`);
} else {
  writeFileSync(swPath, next);
  console.log(`sw.js → ${version}, ${assets.length} files precached`);
}
