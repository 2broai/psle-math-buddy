// Shared UI parts: kid top bar, mascot, stars, parent gate, break & daily-limit overlays.
import { store, todayKey, sha256Hex, focusLevel } from '../core/store.js';
import { petLevel, SHOP, todayStats } from '../core/progress.js';
import { syncStatus } from '../core/sync.js';
import { el, modal, on, esc, $ } from './dom.js';
import { sfx } from '../core/sound.js';

export const AVATARS = ['🦁', '🐼', '🦊', '🐰', '🐯', '🦄', '🐨', '🐸', '🐵', '🐧', '🐶', '🐱', '🦖', '🐙'];

export function starsHTML(n, max = 3) {
  let s = '';
  for (let i = 1; i <= max; i++) s += `<span class="st ${i <= n ? 'on' : ''}">${i <= n ? '★' : '☆'}</span>`;
  return `<span class="stars" aria-label="${n} of ${max} stars">${s}</span>`;
}

export function mascotHTML(child, { size = 'md', mood = '' } = {}) {
  const eq = child?.state.equip || {};
  const item = (slot) => SHOP.find((x) => x.id === eq[slot]);
  const bg = item('bg')?.bg || '';
  return `<div class="mascot size-${size} ${mood}" style="${bg ? `background:${bg}` : ''}">
    <span class="m-body">🦁</span>
    ${item('hat') ? `<span class="m-hat">${item('hat').e}</span>` : ''}
    ${item('face') ? `<span class="m-face">${item('face').e}</span>` : ''}
    ${item('hand') ? `<span class="m-hand">${item('hand').e}</span>` : ''}
    ${item('buddy') ? `<span class="m-buddy">${item('buddy').e}</span>` : ''}
  </div>`;
}

export function kidHeader(child, { back = null, title = '' } = {}) {
  const s = child.state;
  const lv = petLevel(s.xp);
  const sync = store.account.auth ? `<span class="sync-dot ${syncStatus.state}" title="${esc(syncStatus.message || 'Cloud')}"></span>` : '';
  return `<header class="kid-top">
    ${back ? `<a class="top-btn" href="${back}" aria-label="Back">⬅</a>` : `<a class="who-btn" href="#/who" title="Switch player"><span class="av">${esc(child.avatar)}</span><span class="nm">${esc(child.name)}</span>${sync}</a>`}
    ${title ? `<h1 class="top-title">${title}</h1>` : '<span class="flex1"></span>'}
    <div class="top-stats">
      <span class="pill streak" title="Days in a row">🔥 ${s.streak.last === todayKey() || s.streak.last ? s.streak.cur : 0}</span>
      <span class="pill stars-pill" title="Stars">⭐ <b>${s.stars}</b></span>
      <span class="pill lvl" title="Merli level">Lv ${lv.level}</span>
      <a class="top-btn" href="#/rewards" title="Rewards">🎁</a>
      <a class="top-btn parent-btn" href="#/parent" title="Parents">👪</a>
    </div>
  </header>`;
}

export function ringHTML(frac, label, sub = '') {
  const p = Math.max(0, Math.min(1, frac));
  const C = 2 * Math.PI * 42;
  return `<div class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" class="ring-bg"/>${p > 0 ? `<circle cx="50" cy="50" r="42" class="ring-fg" stroke-dasharray="${(C * p).toFixed(1)} ${C.toFixed(1)}"/>` : ''}</svg><div class="ring-label"><b>${label}</b>${sub ? `<small>${sub}</small>` : ''}</div></div>`;
}

// ------------------------------------------------------------------ parent gate
/** Resolves true when an adult passes the gate (PIN if set, otherwise a sum children can't do yet). */
export function parentGate(reason = 'Phụ huynh xác nhận') {
  return new Promise((resolve) => {
    const acc = store.account;
    if (acc.pin) {
      let entered = '';
      const m = modal(
        `<h2>🔒 ${esc(reason)}</h2><p class="muted">Nhập mã PIN phụ huynh (4 số)</p>
        <div class="pin-dots">${'<i></i>'.repeat(4)}</div>
        <div class="numpad small">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((k) => (k === '' ? '<span></span>' : `<button type="button" data-k="${k}">${k}</button>`)).join('')}</div>
        <p class="pin-err" hidden>Sai mã PIN</p>
        <button type="button" class="btn ghost" data-close>Huỷ</button>`,
        { onClose: () => resolve(false) }
      );
      const dots = () => m.root.querySelectorAll('.pin-dots i').forEach((d, i) => d.classList.toggle('on', i < entered.length));
      on(m.root, '[data-k]', async (b) => {
        const k = b.dataset.k;
        if (k === '⌫') entered = entered.slice(0, -1);
        else if (entered.length < 4) entered += k;
        dots();
        if (entered.length === 4) {
          const h = await sha256Hex(`merli-pin:${entered}`);
          if (h === acc.pin) {
            resolve(true);
            m.root.closest('.modal-back').remove();
          } else {
            entered = '';
            dots();
            m.root.querySelector('.pin-err').hidden = false;
            sfx('wrong');
          }
        }
      });
      return;
    }
    const a = 12 + Math.floor(Math.random() * 30);
    const b = 13 + Math.floor(Math.random() * 30);
    const m = modal(
      `<h2>👪 ${esc(reason)}</h2><p class="muted">Dành cho bố mẹ: ${a} + ${b} = ?</p>
      <form class="gate-form"><input type="number" inputmode="numeric" class="input" required autofocus aria-label="Answer"><button class="btn primary">OK</button></form>
      <p class="pin-err" hidden>Chưa đúng, thử lại nhé</p>
      <p class="muted small">Mẹo: đặt mã PIN trong Cài đặt để vào nhanh hơn.</p>
      <button type="button" class="btn ghost" data-close>Huỷ</button>`,
      { onClose: () => resolve(false) }
    );
    const form = m.root.querySelector('form');
    form.querySelector('input').focus();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (Number(form.querySelector('input').value) === a + b) {
        resolve(true);
        m.root.closest('.modal-back').remove();
      } else {
        m.root.querySelector('.pin-err').hidden = false;
        sfx('wrong');
      }
    });
  });
}

// ------------------------------------------------------------------ breaks & daily limit
const brkKey = (child) => `merli_brk_${child.id}`;
function brkState(child) {
  try {
    return JSON.parse(localStorage.getItem(brkKey(child))) || { since: 0, until: 0 };
  } catch {
    return { since: 0, until: 0 };
  }
}
export function addPracticeSeconds(child, sec) {
  const b = brkState(child);
  b.since = (b.since || 0) + sec;
  localStorage.setItem(brkKey(child), JSON.stringify(b));
}

const STRETCH = [
  ['🤸', 'Do 10 star jumps!'],
  ['💧', 'Drink some water.'],
  ['👀', 'Look out of the window at something far away.'],
  ['🙆', 'Stretch your arms up high to the sky!'],
  ['🦩', 'Stand on one leg like a flamingo. Count to 10!'],
  ['🌀', 'Roll your shoulders 5 times.'],
  ['🐸', 'Hop like a frog 5 times!']
];

/**
 * Called before each question. Resolves when the child may continue
 * (immediately, after a stretch break, or after a parent override of the daily limit).
 */
export function checkLimits(child) {
  return new Promise((resolve) => {
    const set = child.state.settings;
    const today = todayStats(child);
    const overrideKey = `merli_more_${child.id}_${todayKey()}`;
    if (set.maxDaily > 0 && today.sec >= set.maxDaily * 60 && !localStorage.getItem(overrideKey)) {
      sfx('fanfare');
      const m = modal(
        `<div class="center">${mascotHTML(child, { size: 'lg', mood: 'happy' })}
        <h2>Super work today, ${esc(child.name)}! 🌟</h2>
        <p>You practised for <b>${Math.round(today.sec / 60)} minutes</b>. Your brain needs rest to grow strong. See you tomorrow!</p>
        <div class="row gap"><a class="btn primary" href="#/home" data-close>🏠 Home</a><button type="button" class="btn ghost" data-more>👪 Parent: allow more today</button></div></div>`,
        { dismissable: false, onClose: () => resolve(false) }
      );
      on(m.root, '[data-more]', async () => {
        if (await parentGate('Cho phép học thêm hôm nay')) {
          localStorage.setItem(overrideKey, '1');
          m.root.closest('.modal-back').remove();
          resolve(true);
        }
      });
      return;
    }
    const b = brkState(child);
    const now = Date.now();
    if (set.breakEvery > 0 && (b.until > now || b.since >= set.breakEvery * 60)) {
      if (!(b.until > now)) {
        b.until = now + set.breakLen * 60000;
        b.since = 0;
        localStorage.setItem(brkKey(child), JSON.stringify(b));
      }
      const [icon, text] = STRETCH[Math.floor(Math.random() * STRETCH.length)];
      sfx('fanfare');
      const m = modal(
        `<div class="center brk">${mascotHTML(child, { size: 'lg', mood: 'dance' })}
        <h2>Stretch break! ${icon}</h2>
        <p class="big">${esc(text)}</p>
        <div class="brk-timer" aria-live="polite">--:--</div>
        <button type="button" class="btn primary" data-go disabled>Let's continue ▶</button>
        <button type="button" class="btn ghost small" data-skip>👪 Parent: skip break</button></div>`,
        { dismissable: false }
      );
      const btn = m.root.querySelector('[data-go]');
      const tEl = m.root.querySelector('.brk-timer');
      const tick = () => {
        const left = Math.max(0, b.until - Date.now());
        tEl.textContent = `${Math.floor(left / 60000)}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
        if (left <= 0) {
          btn.disabled = false;
          tEl.textContent = 'Ready!';
          clearInterval(iv);
        }
      };
      const iv = setInterval(tick, 500);
      tick();
      const done = () => {
        clearInterval(iv);
        const s = brkState(child);
        s.until = 0;
        s.since = 0;
        localStorage.setItem(brkKey(child), JSON.stringify(s));
        m.root.closest('.modal-back').remove();
        resolve(true);
      };
      btn.addEventListener('click', done);
      on(m.root, '[data-skip]', async () => {
        if (await parentGate('Bỏ qua giờ nghỉ')) done();
      });
      return;
    }
    resolve(true);
  });
}

export function levelBadge(child) {
  const lv = focusLevel(child);
  return `<span class="lvl-badge lvl-${lv}">${lv === 'K' ? 'K2' : lv}</span>`;
}

export function syncBadge() {
  if (!store.account.auth) return '<span class="muted small">Chưa đăng nhập — tiến độ chỉ lưu trên máy này</span>';
  return `<span class="small">☁️ ${esc(store.account.auth.email)} · <span class="sync-${syncStatus.state}">${esc(syncStatus.message || 'Sẵn sàng')}</span></span>`;
}

export { el, $ };
