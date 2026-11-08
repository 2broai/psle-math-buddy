// Install-as-app support (PWA): service worker registration, safe auto-update, and
// "Add to Home Screen" help — a real install button on Chrome/Android/desktop, instructions on iPad/iPhone.

let deferredPrompt = null;
let pendingReload = false;
const DISMISS_KEY = 'merli_install_hint_closed';

export function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export function isIOS() {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function canPromptInstall() {
  return !!deferredPrompt;
}

export async function promptInstall() {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice.catch(() => ({ outcome: 'dismissed' }));
  deferredPrompt = null;
  return choice.outcome === 'accepted';
}

/** True when a new version was installed while the child was busy; reload at the next safe moment. */
export function reloadIfPending(screen) {
  if (pendingReload && !['play', 'sprint', 'story'].includes(screen)) {
    pendingReload = false;
    location.reload();
    return true;
  }
  return false;
}

export function initPWA(onChange) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    onChange?.();
  });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    onChange?.();
  });
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
  let hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker
    .register('./sw.js')
    .then((reg) => {
      // Home-screen apps are resumed, not reloaded: look for a new version whenever the app comes back.
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update().catch(() => {});
      });
    })
    .catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController) {
      hadController = true; // first install — nothing old to replace; later changes are real updates
      return;
    }
    if (['play', 'sprint', 'story'].includes(document.body.dataset.screen)) pendingReload = true;
    else location.reload();
  });
}

/** Install hint card for parents (who screen / parent area). force = show even if dismissed. */
export function installHintHTML({ force = false } = {}) {
  if (isStandalone()) return force ? '<div class="install-hint ok">✅ Đang chạy như ứng dụng (đã cài trên màn hình chính).</div>' : '';
  if (!force && localStorage.getItem(DISMISS_KEY)) return '';
  const close = force ? '' : '<button type="button" class="ih-close" data-install-close aria-label="Đóng">✕</button>';
  if (canPromptInstall()) {
    return `<div class="install-hint">${close}<div class="ih-icon">📲</div><div><b>Cài Merli Maths như một ứng dụng</b><p>Mở nhanh từ màn hình chính, toàn màn hình, dùng được cả khi mất mạng.</p>
      <button type="button" class="btn primary" data-install>Cài ứng dụng</button></div></div>`;
  }
  if (isIOS()) {
    return `<div class="install-hint">${close}<div class="ih-icon">📲</div><div><b>Cài thành ứng dụng trên iPad / iPhone</b>
      <ol><li>Mở trang này bằng <b>Safari</b>.</li><li>Bấm nút <b>Chia sẻ</b> <span class="ios-share" aria-hidden="true">⬆︎</span> (góc trên bên phải trên iPad).</li><li>Chọn <b>Thêm vào MH chính</b> (Add to Home Screen) → <b>Thêm</b>.</li></ol>
      <p class="small">⚠️ App trên màn hình chính có bộ nhớ riêng, tách khỏi Safari: hãy <b>tạo / đăng nhập tài khoản phụ huynh</b> để tiến độ của bé tự đồng bộ sang app.</p></div></div>`;
  }
  return force
    ? `<div class="install-hint"><div class="ih-icon">📲</div><div><b>Cài thành ứng dụng</b><p>Trên Chrome / Edge: bấm biểu tượng cài đặt ⊕ trên thanh địa chỉ, hoặc menu ⋮ → <b>Cài đặt ứng dụng / Thêm vào màn hình chính</b>.</p></div></div>`
    : '';
}

export function bindInstallHints(root, rerender) {
  root.addEventListener('click', async (e) => {
    if (e.target.closest('[data-install]')) {
      await promptInstall();
      rerender?.();
    } else if (e.target.closest('[data-install-close]')) {
      localStorage.setItem(DISMISS_KEY, '1');
      e.target.closest('.install-hint')?.remove();
    }
  });
}
