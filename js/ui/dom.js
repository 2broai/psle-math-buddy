// Small DOM helpers shared by the screens.
import { esc } from './markup.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/** Delegated click handling: on(root, '[data-act]', (el, ev) => ...) */
export function on(root, selector, handler, type = 'click') {
  root.addEventListener(type, (ev) => {
    const t = ev.target.closest(selector);
    if (t && root.contains(t)) handler(t, ev);
  });
}

let toastTimer = null;
export function toast(msg, ms = 2600) {
  let t = $('#toast');
  if (!t) {
    t = el('<div id="toast" role="status" aria-live="polite"></div>');
    document.body.appendChild(t);
  }
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

export function confetti(n = 70) {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.theme === 'ink') return;
  const box = el('<div class="confetti" aria-hidden="true"></div>');
  const colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = `${Math.random() * 0.4}s`;
    p.style.animationDuration = `${1.6 + Math.random() * 1.4}s`;
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3400);
}

/** Modal dialog. Returns {close, root}. content = html string. */
export function modal(content, { onClose, wide = false, dismissable = true } = {}) {
  const wrap = el(`<div class="modal-back"><div class="modal${wide ? ' wide' : ''}" role="dialog" aria-modal="true">${content}</div></div>`);
  const close = () => {
    wrap.remove();
    document.removeEventListener('keydown', onKey);
    onClose?.();
  };
  const onKey = (e) => {
    if (e.key === 'Escape' && dismissable) close();
  };
  if (dismissable) {
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) close();
    });
  }
  document.addEventListener('keydown', onKey);
  document.body.appendChild(wrap);
  on(wrap, '[data-close]', close);
  return { close, root: wrap.querySelector('.modal') };
}

export function fmtMinutes(sec) {
  const m = Math.round(sec / 60);
  if (m < 60) return `${m} phút`;
  return `${Math.floor(m / 60)} giờ ${m % 60 ? `${m % 60} phút` : ''}`.trim();
}

export function fmtMinShort(sec) {
  const m = Math.round(sec / 60);
  return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, '0') : ''}`;
}

export { esc };
