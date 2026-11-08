// App bootstrap + hash router.
import { store } from './core/store.js';
import { syncNow, scheduleSync, flushOnHide } from './core/sync.js';
import { setSoundEnabled } from './core/sound.js';
import { applyTheme } from './core/theme.js';
import { initPWA, reloadIfPending, bindInstallHints } from './core/pwa.js';
import * as who from './ui/screens/who.js';
import * as home from './ui/screens/home.js';
import * as map from './ui/screens/map.js';
import * as play from './ui/screens/play.js';
import * as sprint from './ui/screens/sprint.js';
import * as rewards from './ui/screens/rewards.js';
import * as parent from './ui/screens/parent.js';

const ROUTES = { who, home, map, play, sprint, rewards, parent };
const KID_ONLY = new Set(['home', 'map', 'play', 'sprint', 'rewards']);
const root = document.getElementById('app');
let current = null;

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  let [name, ...args] = parts;
  if (!ROUTES[name]) name = store.active() ? 'home' : 'who';
  if (KID_ONLY.has(name) && !store.active()) name = 'who';
  if (reloadIfPending(name)) return;
  try {
    current?.unmount?.();
  } catch (e) {
    console.error(e);
  }
  current = ROUTES[name];
  const child = store.active();
  setSoundEnabled(child ? child.state.settings.sound !== false : true);
  document.body.dataset.screen = name;
  root.innerHTML = '';
  window.scrollTo(0, 0);
  try {
    current.mount(root, args);
  } catch (e) {
    console.error(e);
    root.innerHTML = `<main class="center pad"><div class="card"><h2>Oops! Something went wrong.</h2><p class="muted small">${String(e.message).replace(/</g, '&lt;')}</p><a class="btn primary" href="#/home">🏠 Home</a></div></main>`;
  }
}

window.addEventListener('hashchange', route);

// iOS only lets speech start from a user gesture: unlock it on the first tap.
window.addEventListener(
  'pointerdown',
  () => {
    try {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(' ');
        u.volume = 0;
        window.speechSynthesis.speak(u);
      }
    } catch {
      // ignore
    }
  },
  { once: true }
);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushOnHide();
  else scheduleSync(1000);
});
window.addEventListener('online', () => scheduleSync(1000));

// Installable app: service worker, auto-update, install button / iPad instructions.
initPWA(() => {
  if (['who', 'parent'].includes(document.body.dataset.screen)) route();
});
bindInstallHints(root, route);

applyTheme();
route();
if (store.account.auth) syncNow();
