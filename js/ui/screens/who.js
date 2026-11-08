// "Who is practising?" — profile picker + first-run welcome.
import { store } from '../../core/store.js';
import { schoolYearLabel } from '../../content/meta.js';
import { AVATARS, syncBadge } from '../parts.js';
import { on, esc, toast } from '../dom.js';
import { sfx } from '../../core/sound.js';
import { scheduleSync } from '../../core/sync.js';

function addForm() {
  const year = new Date().getFullYear();
  const years = [];
  for (let y = year - 4; y >= year - 10; y--) years.push(y);
  return `<form class="card add-child" autocomplete="off">
    <h2>Thêm hồ sơ cho bé</h2>
    <label>Tên của bé<input name="name" class="input" maxlength="20" required placeholder="VD: Bin"></label>
    <label>Năm sinh (để tự chọn lớp theo tuổi)
      <select name="birthYear" class="input">${years.map((y) => `<option value="${y}" ${y === year - 6 ? 'selected' : ''}>${y} — ${schoolYearLabel(y)} năm ${year}</option>`).join('')}</select>
    </label>
    <div class="label">Chọn hình đại diện</div>
    <div class="avatar-pick">${AVATARS.map((a, i) => `<label><input type="radio" name="avatar" value="${a}" ${i === 0 ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div>
    <div class="row gap"><button class="btn primary big">Bắt đầu ▶</button></div>
  </form>`;
}

export function mount(root) {
  const kids = store.children;
  if (!kids.length) {
    root.innerHTML = `<main class="who first-run">
      <div class="hero">
        <div class="hero-lion">🦁</div>
        <h1>Merli Maths</h1>
        <p class="lead">Singapore Maths practice from K2 to Primary 3 — thousands of fresh questions every day!</p>
        <p class="muted">Luyện toán theo chương trình MOE Singapore · câu hỏi sinh tự động không bao giờ hết · tự điều chỉnh theo trình độ của bé</p>
      </div>
      ${addForm()}
      <p class="center small">Đã có tài khoản phụ huynh? <a href="#/parent/account">Đăng nhập để tải hồ sơ của bé</a></p>
    </main>`;
  } else {
    root.innerHTML = `<main class="who">
      <h1 class="who-title">Who is practising today?</h1>
      <div class="who-grid">
        ${kids
          .map(
            (c) => `<button type="button" class="who-card" data-id="${c.id}">
            <span class="who-av">${esc(c.avatar)}</span>
            <b>${esc(c.name)}</b>
            <small>⭐ ${c.state.stars} · 🔥 ${c.state.streak.cur || 0}</small>
          </button>`
          )
          .join('')}
        <button type="button" class="who-card add" data-add><span class="who-av">＋</span><b>Thêm bé</b><small>Add a child</small></button>
      </div>
      <div class="who-foot"><a class="btn ghost" href="#/parent">👪 Khu vực phụ huynh</a><div>${syncBadge()}</div></div>
      <div class="add-slot"></div>
    </main>`;
  }

  on(root, '[data-id]', (b) => {
    sfx('tap');
    store.setActive(b.dataset.id);
    location.hash = '#/home';
  });
  on(root, '[data-add]', () => {
    const slot = root.querySelector('.add-slot');
    slot.innerHTML = addForm();
    bindForm(slot.querySelector('form'));
    slot.scrollIntoView({ behavior: 'smooth' });
  });
  const f = root.querySelector('form.add-child');
  if (f) bindForm(f);
}

function bindForm(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    if (!name) return;
    store.addChild({ name, avatar: fd.get('avatar') || '🦁', birthYear: Number(fd.get('birthYear')) });
    scheduleSync(2000);
    sfx('fanfare');
    toast(`Chào ${esc(name)}! 🎉`);
    location.hash = '#/home';
  });
}
