// Parent area (Vietnamese): overview & charts, skill report, history, settings, account, guide.
import { store, todayKey, dayKeyOffset, focusLevel, sha256Hex, DEFAULT_SETTINGS } from '../../core/store.js';
import { SKILLS, getSkill } from '../../content/curriculum.js';
import { LEVELS, STRANDS, UNITS, schoolYearLabel, schoolLevelForBirthYear } from '../../content/meta.js';
import { statOf, starsOf, accuracy, frontierSkills, todayStats, TROPHIES } from '../../core/progress.js';
import { signIn, signUp, signOut, syncNow, changePassword, fetchDay, deleteChildRemote, syncStatus, onSyncStatus } from '../../core/sync.js';
import { parentGate, starsHTML, AVATARS, syncBadge } from '../parts.js';
import { esc, on, toast, modal, fmtMinutes, fmtMinShort, resetListeners } from '../dom.js';
import { md } from '../markup.js';
import { sfx } from '../../core/sound.js';
import { themePref, setThemePref } from '../../core/theme.js';
import { installHintHTML } from '../../core/pwa.js';
import { lifePrefs, worldProgress, LIFE_WORLDS, LIFE_TOPICS, SCENARIO_MAP, getLifeTopic } from '../../core/life.js';
import { buildCard } from '../../content/life/card.js';
import { REGIONS } from '../../content/life/meta.js';

const skillVi = (id) => getSkill(id)?.vi || getLifeTopic(id)?.vi || id;

const TABS = [
  ['overview', '📊 Tổng quan'],
  ['skills', '🎯 Kỹ năng'],
  ['life', '🌱 Kỹ năng sống'],
  ['history', '🗓️ Lịch sử'],
  ['settings', '⚙️ Cài đặt'],
  ['account', '☁️ Tài khoản'],
  ['guide', '📖 Hướng dẫn']
];
const GATE_KEY = 'merli_parent_until';
let unsub = null;

export function unmount() {
  unsub?.();
  unsub = null;
}

export async function mount(root, [tab = 'overview', arg]) {
  const needsGate = store.children.length > 0 && Number(sessionStorage.getItem(GATE_KEY) || 0) < Date.now();
  if (needsGate) {
    root.innerHTML = '<main class="center pad"><p class="muted">🔒</p></main>';
    const ok = await parentGate('Khu vực phụ huynh');
    if (!ok) {
      location.hash = store.active() ? '#/home' : '#/who';
      return;
    }
    sessionStorage.setItem(GATE_KEY, String(Date.now() + 30 * 60000));
  }
  render(root, tab, arg);
  unsub = onSyncStatus(() => {
    const b = root.querySelector('.sync-line');
    if (b) b.innerHTML = syncBadge();
  });
}

function render(root, tab, arg) {
  resetListeners(root);
  const child = store.active() || store.children[0] || null;
  if (child && !store.active()) store.setActive(child.id);
  const kids = store.children;
  const content =
    tab === 'skills' ? skillsTab(child, arg)
    : tab === 'life' ? lifeTab(child)
    : tab === 'history' ? historyTab(child)
    : tab === 'settings' ? settingsTab(child)
    : tab === 'account' ? accountTab()
    : tab === 'guide' ? guideTab()
    : overviewTab(child);
  root.innerHTML = `<div class="parent">
    <header class="parent-top">
      <h1>👪 Phụ huynh</h1>
      <div class="kid-switch">${kids
        .map((c) => `<button type="button" class="ks ${c.id === child?.id ? 'on' : ''}" data-kid="${c.id}" title="${esc(c.name)}"><span>${esc(c.avatar)}</span>${esc(c.name)}</button>`)
        .join('')}<a class="ks add" href="#/who" title="Thêm bé">＋</a></div>
      <a class="btn primary" href="${child ? '#/home' : '#/who'}">🧒 Về chế độ của bé</a>
    </header>
    <nav class="ptabs">${TABS.map(([id, label]) => `<a class="ptab ${id === tab ? 'on' : ''}" href="#/parent/${id}">${label}</a>`).join('')}</nav>
    <div class="sync-line">${syncBadge()}</div>
    <main class="parent-body">${content}</main>
  </div>`;
  on(root, '[data-kid]', (b) => {
    store.setActive(b.dataset.kid);
    render(root, tab, arg);
  });
  bindTab(root, tab, child, arg);
}

// ------------------------------------------------------------------ overview
function niceMax(v) {
  const steps = [15, 30, 60, 90, 120, 180, 240, 300];
  return steps.find((s) => s >= v) || Math.ceil(v / 60) * 60;
}

function dailyChart(child, days = 14) {
  const goal = child.state.settings.dailyGoal || 60;
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const key = dayKeyOffset(-i);
    const d = child.state.daily[key];
    data.push({ key, min: Math.round((d?.sec || 0) / 60), q: d?.q || 0, ok: d?.ok || 0 });
  }
  const maxV = niceMax(Math.max(goal, ...data.map((d) => d.min), 15));
  const W = 660;
  const H = 230;
  const L = 40;
  const B = 30;
  const T = 16;
  const Rm = 96;
  const pw = W - L - Rm;
  const ph = H - T - B;
  const band = pw / days;
  const bw = Math.min(24, band * 0.62);
  const y = (v) => T + ph - (v / maxV) * ph;
  let svg = '';
  for (const g of [0, maxV / 2, maxV]) {
    svg += `<line x1="${L}" x2="${L + pw}" y1="${y(g)}" y2="${y(g)}" class="grid"/><text x="${L - 8}" y="${y(g) + 4}" class="tick" text-anchor="end">${g}</text>`;
  }
  const maxIdx = data.reduce((m, d, i) => (d.min > data[m].min ? i : m), 0);
  data.forEach((d, i) => {
    const x = L + i * band + (band - bw) / 2;
    const base = y(0);
    const h = base - y(d.min);
    const isToday = i === days - 1;
    if (h > 0) {
      const r = Math.min(4, h, bw / 2);
      const y0 = base - h;
      svg += `<path d="M${x} ${base}V${y0 + r}Q${x} ${y0} ${x + r} ${y0}H${x + bw - r}Q${x + bw} ${y0} ${x + bw} ${y0 + r}V${base}Z" class="bar${isToday ? ' today' : ''}"/>`;
    }
    if ((isToday || i === maxIdx) && d.min > 0) svg += `<text x="${x + bw / 2}" y="${y(d.min) - 6}" class="val" text-anchor="middle">${d.min}′</text>`;
    const [, mm, dd] = d.key.split('-');
    if (isToday || i % 2 === (days - 1) % 2) svg += `<text x="${x + bw / 2}" y="${H - 10}" class="tick" text-anchor="middle">${isToday ? 'Hôm nay' : `${Number(dd)}/${Number(mm)}`}</text>`;
    svg += `<rect x="${L + i * band}" y="${T}" width="${band}" height="${ph}" class="hit"><title>${Number(dd)}/${Number(mm)}: ${d.min} phút · ${d.q} câu${d.q ? ` · đúng ${Math.round((d.ok / d.q) * 100)}%` : ''}</title></rect>`;
  });
  svg += `<line x1="${L}" x2="${L + pw}" y1="${y(goal)}" y2="${y(goal)}" class="goal"/><text x="${L + pw + 6}" y="${y(goal) + 4}" class="goal-label">Mục tiêu ${goal}′</text>`;
  const total = data.reduce((s, d) => s + d.min, 0);
  const daysMet = data.filter((d) => d.min >= goal).length;
  const table = `<details class="chart-table"><summary>Xem dạng bảng</summary><table class="tbl"><thead><tr><th>Ngày</th><th>Phút</th><th>Số câu</th><th>Đúng lần đầu</th></tr></thead><tbody>${data
    .map((d) => `<tr><td>${d.key}</td><td>${d.min}</td><td>${d.q}</td><td>${d.q ? `${Math.round((d.ok / d.q) * 100)}%` : '–'}</td></tr>`)
    .join('')}</tbody></table></details>`;
  return `<figure class="chart"><figcaption><b>Số phút luyện tập mỗi ngày</b> <span class="muted">· 14 ngày qua: ${total} phút, đạt mục tiêu ${daysMet}/14 ngày</span></figcaption>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ số phút luyện tập 14 ngày qua, tổng ${total} phút">${svg}</svg>${table}</figure>`;
}

function kpi(label, value, sub = '') {
  return `<div class="kpi"><span class="kpi-label">${label}</span><b class="kpi-value">${value}</b>${sub ? `<small>${sub}</small>` : ''}</div>`;
}

function overviewTab(child) {
  if (!child) return `<div class="card"><h2>Chưa có hồ sơ của bé</h2><p>Hãy <a href="#/who">tạo hồ sơ</a> hoặc <a href="#/parent/account">đăng nhập</a> để tải hồ sơ đã có.</p></div>`;
  const s = child.state;
  const t = todayStats(child);
  const goal = s.settings.dailyGoal;
  const level = focusLevel(child);
  const levelSkills = SKILLS.filter((k) => k.level === level && k.unit !== 0);
  const mastered = levelSkills.filter((k) => starsOf(statOf(child, k.id)) >= 2).length;
  const pct = levelSkills.length ? Math.round((mastered / levelSkills.length) * 100) : 0;
  const nextLevel = LEVELS[LEVELS.findIndex((l) => l.id === level) + 1];
  const frontier = frontierSkills(child, 4);
  const weak = SKILLS.map((k) => ({ k, st: statOf(child, k.id) }))
    .filter(({ st }) => st && st.n >= 4 && accuracy(st) < 70)
    .sort((a, b) => accuracy(a.st) - accuracy(b.st))
    .slice(0, 5);
  const mistakes = s.mistakes.slice(-10).reverse();
  const sy = child.birthYear ? schoolYearLabel(child.birthYear) : '?';
  return `${installHintHTML()}
  <section class="kpis">
    ${kpi('Hôm nay', `${Math.round(t.sec / 60)} phút`, `mục tiêu ${goal} phút`)}
    ${kpi('Số câu hôm nay', t.q, `${t.m || 0} nhiệm vụ`)}
    ${kpi('Đúng ngay lần đầu', t.q ? `${Math.round((t.ok / t.q) * 100)}%` : '–', 'hôm nay')}
    ${kpi('Chuỗi ngày học', `🔥 ${s.streak.cur || 0}`, `kỷ lục ${s.streak.best || 0} ngày`)}
  </section>
  <section class="card">${dailyChart(child)}</section>
  <section class="grid2">
    <div class="card">
      <h2>🎓 Trình độ</h2>
      <p>Năm học của bé: <b>${esc(sy)}</b> · Đang luyện: <b>${esc(LEVELS.find((l) => l.id === level)?.vi || level)}</b>${s.levelOverride ? ' <span class="tag">chọn tay</span>' : ''}</p>
      <div class="meter"><i style="width:${pct}%"></i></div>
      <p class="small">${mastered}/${levelSkills.length} kỹ năng đạt ★★ (${pct}%).${pct >= 80 && nextLevel ? ` Bé đã thạo phần lớn — hệ thống sẽ tự đưa dần nội dung <b>${nextLevel.id}</b> vào nhiệm vụ; anh/chị cũng có thể chuyển hẳn trong <a href="#/parent/settings">Cài đặt</a>.` : ''}</p>
      <p class="small muted">Tổng cộng: ${s.totalQ} câu · ${fmtMinutes(s.totalSec)} · ${s.stickers.length} sticker · ${s.trophies.length}/${TROPHIES.length} cúp</p>
    </div>
    <div class="card">
      <h2>📚 Bé đang học</h2>
      ${frontier.map((k) => skillLine(child, k)).join('') || '<p class="muted">—</p>'}
    </div>
  </section>
  <section class="grid2">
    <div class="card">
      <h2>⚠️ Cần luyện thêm</h2>
      ${weak.length ? weak.map(({ k }) => skillLine(child, k, true)).join('') : '<p class="muted">Chưa có kỹ năng nào đáng lo (cần ≥ 4 câu và đúng < 70% mới hiện ở đây). 👍</p>'}
    </div>
    <div class="card">
      <h2>❌ Lỗi sai gần đây</h2>
      ${
        mistakes.length
          ? `<ul class="mistakes">${mistakes
              .map((m) => `<li><small>${new Date(m.ts).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })} · ${esc(skillVi(m.skill))}</small><div>${esc(m.q)}</div><div>${m.fixed ? `Lần đầu bé trả lời <b class="bad">${esc(m.given)}</b>, sau đó tự sửa đúng <b class="good">${esc(m.answer)}</b> 👍` : `Bé trả lời <b class="bad">${esc(m.given)}</b> → đúng là <b class="good">${esc(m.answer)}</b>`}</div></li>`)
              .join('')}</ul><a class="btn" href="#/play/review">🔁 Cho bé luyện lại các lỗi sai</a>`
          : '<p class="muted">Chưa có lỗi sai nào.</p>'
      }
    </div>
  </section>`;
}

function skillLine(child, k, practise = false) {
  const st = statOf(child, k.id);
  return `<div class="skill-line">
    <div><b>${k.icon} ${esc(k.vi)}</b> <span class="muted small">${esc(k.title)} · ${k.level}</span> ${starsHTML(starsOf(st))}
    <div class="small muted">${st ? `${st.n} câu · đúng ${accuracy(st)}% · mức ${st.t}/3` : 'chưa làm'}</div>
    <details><summary class="small">Gợi ý cho bố mẹ</summary><p class="small">${esc(k.tip)}</p></details></div>
    ${practise ? `<a class="btn small" href="#/play/skill/${encodeURIComponent(k.id)}">Luyện ngay</a>` : ''}
  </div>`;
}

// ------------------------------------------------------------------ skills
function skillsTab(child, levelArg) {
  if (!child) return '<p class="muted">Chưa có hồ sơ.</p>';
  const level = LEVELS.some((l) => l.id === levelArg) ? levelArg : focusLevel(child);
  const rows = STRANDS.map((strand) => {
    const list = SKILLS.filter((k) => k.level === level && k.strand === strand.id);
    if (!list.length) return '';
    return `<tr class="strand-row"><th colspan="7">${strand.icon} ${esc(strand.vi)} <span class="muted">· ${esc(strand.name)}</span></th></tr>${list
      .map((k) => {
        const st = statOf(child, k.id);
        const avg = st && st.n ? `${Math.round(st.ms / st.n / 1000)}s` : '–';
        const last = st?.last ? new Date(st.last).toLocaleDateString('vi-VN') : '–';
        return `<tr><td><b>${k.icon} ${esc(k.vi)}</b><div class="small muted">${esc(k.title)} · ${esc(UNITS[k.level][k.unit] || '')}</div><details><summary class="small">Gợi ý</summary><p class="small">${esc(k.tip)}</p></details></td>
          <td>${starsHTML(starsOf(st))}</td><td class="num">${st ? `${st.t}/3` : '–'}</td><td class="num">${st?.n || 0}</td><td class="num">${st ? `${accuracy(st)}%` : '–'}</td><td class="num">${avg}</td><td class="num">${last}</td></tr>`;
      })
      .join('')}`;
  }).join('');
  const total = SKILLS.filter((k) => k.level === level).length;
  return `<nav class="level-tabs">${LEVELS.map((l) => `<a class="level-tab ${l.id === level ? 'on' : ''}" style="--c:${l.color}" href="#/parent/skills/${l.id}">${esc(l.vi)}</a>`).join('')}</nav>
  <p class="small muted">${total} kỹ năng. ★ = 45+ điểm thành thạo, ★★ = 70+ (đã thạo), ★★★ = 88+ (rất vững). "Mức" = độ khó hiện tại (1–3) tự tăng khi bé làm đúng 3 câu liên tiếp và giảm khi sai 2 câu liền.</p>
  <div class="table-wrap"><table class="tbl skills-tbl"><thead><tr><th>Kỹ năng</th><th>Sao</th><th>Mức</th><th>Số câu</th><th>Đúng lần đầu</th><th>TB/câu</th><th>Lần cuối</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

// ------------------------------------------------------------------ history
function historyTab(child) {
  if (!child) return '<p class="muted">Chưa có hồ sơ.</p>';
  const days = Object.entries(child.state.daily)
    .filter(([, d]) => d.q > 0)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 120);
  const cloud = !!store.account.auth;
  return `<div class="card">
    <h2>🗓️ Lịch sử luyện tập của ${esc(child.name)}</h2>
    ${cloud ? '<p class="small muted">Bấm "Chi tiết" để xem từng câu bé đã làm trong ngày (lưu trên đám mây).</p>' : '<p class="small">💡 <a href="#/parent/account">Đăng nhập</a> để lưu chi tiết từng câu hỏi lên đám mây và xem trên nhiều thiết bị.</p>'}
    ${
      days.length
        ? `<div class="table-wrap"><table class="tbl"><thead><tr><th>Ngày</th><th>Thời gian</th><th>Số câu</th><th>Đúng lần đầu</th><th>Nhiệm vụ</th>${cloud ? '<th></th>' : ''}</tr></thead><tbody>${days
            .map(
              ([k, d]) => `<tr><td>${new Date(`${k}T12:00:00`).toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' })}</td><td class="num">${fmtMinShort(d.sec)}</td><td class="num">${d.q}</td><td class="num">${Math.round((d.ok / d.q) * 100)}%</td><td class="num">${d.m || 0}</td>${cloud ? `<td><button type="button" class="btn small" data-day="${k}">Chi tiết</button></td>` : ''}</tr>`
            )
            .join('')}</tbody></table></div>`
        : '<p class="muted">Chưa có buổi học nào.</p>'
    }
  </div>`;
}

// ------------------------------------------------------------------ settings
function opt(v, label, cur) {
  return `<option value="${v}" ${String(v) === String(cur) ? 'selected' : ''}>${label}</option>`;
}
function themeCard() {
  const t = themePref();
  const o = (v, label, desc) => `<label class="check theme-opt"><input type="radio" name="theme" value="${v}" ${t === v ? 'checked' : ''}> <span><b>${label}</b><br><small class="muted">${desc}</small></span></label>`;
  return `<form class="card settings-form" data-form="theme">
    <h2>🖥️ Giao diện trên thiết bị này</h2>
    ${o('auto', 'Tự động', 'Màu sắc trên iPad/điện thoại; tự chuyển đen trắng nếu máy là màn hình e-ink.')}
    ${o('color', 'Màu sắc', 'Sinh động, có hiệu ứng — hợp với iPad.')}
    ${o('ink', 'Đen trắng (e-ink, dịu mắt)', 'Nền trắng chữ đen, không hiệu ứng chuyển động; màu được thay bằng hoa văn kẻ/chấm. Dùng cho máy đọc sách e-ink (Boox…) hoặc khi muốn đỡ chói.')}
  </form>`;
}
function settingsTab(child) {
  const pinSet = !!store.account.pin;
  if (!child) return `${themeCard()}<div class="card"><p>Chưa có hồ sơ. <a href="#/who">Tạo hồ sơ cho bé</a></p></div>`;
  const s = child.state.settings;
  const year = new Date().getFullYear();
  const years = [];
  for (let y = year - 3; y >= year - 11; y--) years.push(y);
  const auto = child.birthYear ? schoolLevelForBirthYear(child.birthYear) : 'K';
  return `${themeCard()}<form class="card settings-form" data-form="profile">
    <h2>🧒 Hồ sơ của bé</h2>
    <label>Tên<input class="input" name="name" maxlength="20" value="${esc(child.name)}" required></label>
    <label>Năm sinh<select class="input" name="birthYear">${years.map((y) => opt(y, `${y} — năm nay học ${schoolYearLabel(y)}`, child.birthYear)).join('')}</select></label>
    <label>Trình độ luyện tập<select class="input" name="levelOverride">
      ${opt('', `Tự động theo tuổi (hiện tại: ${auto === 'K' ? 'K2' : auto})`, child.state.levelOverride || '')}
      ${LEVELS.map((l) => opt(l.id, `${l.vi} — chọn tay`, child.state.levelOverride || '')).join('')}
    </select><small class="muted">Năm học Singapore bắt đầu tháng 1: trẻ vào P1 vào năm tròn 7 tuổi. Có thể chọn trước P1 để bé học trước chương trình.</small></label>
    <div class="label">Hình đại diện</div>
    <div class="avatar-pick">${AVATARS.map((a) => `<label><input type="radio" name="avatar" value="${a}" ${a === child.avatar ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div>
    <button class="btn primary">Lưu hồ sơ</button>
  </form>
  <form class="card settings-form" data-form="learning">
    <h2>⏱️ Thời gian & cách học</h2>
    <label>Mục tiêu mỗi ngày<select class="input" name="dailyGoal">${[15, 30, 45, 60, 75, 90, 120].map((v) => opt(v, `${v} phút`, s.dailyGoal)).join('')}</select></label>
    <label>Nhắc nghỉ giải lao sau mỗi<select class="input" name="breakEvery">${[0, 15, 20, 25, 30, 40, 50].map((v) => opt(v, v ? `${v} phút học` : 'Tắt nhắc nghỉ', s.breakEvery)).join('')}</select></label>
    <label>Thời gian nghỉ<select class="input" name="breakLen">${[1, 2, 3, 5, 10].map((v) => opt(v, `${v} phút`, s.breakLen)).join('')}</select></label>
    <label>Giới hạn tối đa mỗi ngày<select class="input" name="maxDaily">${[0, 30, 45, 60, 90, 120, 150, 180].map((v) => opt(v, v ? `${v} phút` : 'Không giới hạn', s.maxDaily)).join('')}</select></label>
    <label>Cách trả lời<select class="input" name="input">${opt('auto', 'Tự động (gõ số khi phù hợp — khuyên dùng)', s.input)}${opt('choices', 'Luôn chọn đáp án (cho bé chưa quen gõ số)', s.input)}</select></label>
    <label class="check"><input type="checkbox" name="autoRead" ${s.autoRead ? 'checked' : ''}> Tự đọc to câu hỏi (tiếng Anh) — nên bật cho bé chưa đọc thạo</label>
    <label class="check"><input type="checkbox" name="sound" ${s.sound ? 'checked' : ''}> Âm thanh hiệu ứng</label>
    <button class="btn primary">Lưu cài đặt</button>
    <p class="small muted">Gợi ý cho bé 6 tuổi: 20 phút học → nghỉ 3 phút; chia 1–2 giờ thành 2–3 buổi trong ngày sẽ hiệu quả hơn ngồi liền.</p>
  </form>
  <form class="card settings-form" data-form="pin">
    <h2>🔒 Mã PIN phụ huynh</h2>
    <p class="small">${pinSet ? 'Đã đặt PIN. Bé cần PIN để vào khu vực phụ huynh, bỏ qua giờ nghỉ hoặc học quá giới hạn.' : 'Chưa đặt PIN — hiện đang dùng câu hỏi cộng 2 số để chặn bé.'}</p>
    <label>PIN mới (4 số)<input class="input" name="pin" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="••••"></label>
    <div class="row gap"><button class="btn primary">Lưu PIN</button>${pinSet ? '<button type="button" class="btn ghost" data-clearpin>Bỏ PIN</button>' : ''}</div>
  </form>
  <div class="card danger-zone"><h2>🗑️ Xoá hồ sơ</h2><p class="small">Xoá hồ sơ <b>${esc(child.name)}</b> và toàn bộ tiến độ trên máy này${store.account.auth ? ' và trên đám mây' : ''}.</p><button type="button" class="btn danger" data-delchild>Xoá hồ sơ ${esc(child.name)}</button></div>`;
}

// ------------------------------------------------------------------ account
function accountTab() {
  const a = store.account.auth;
  const backup = `<div class="card"><h2>💾 Sao lưu thủ công</h2><p class="small">Tải file sao lưu toàn bộ hồ sơ trên máy này, hoặc khôi phục từ file (dùng khi không có mạng).</p>
    <div class="row gap wrap"><button type="button" class="btn" data-export>⬇️ Tải file sao lưu</button><label class="btn">⬆️ Khôi phục từ file<input type="file" accept="application/json" data-import hidden></label></div></div>`;
  if (a) {
    return `<div class="card"><h2>☁️ Đã đăng nhập</h2>
      <p>Tài khoản: <b>${esc(a.email)}</b></p>
      <p class="small">Mọi câu bé làm được lưu lên Cloudflare và đồng bộ giữa các thiết bị (iPad, điện thoại, máy tính) đăng nhập cùng tài khoản.</p>
      <p class="small">Trạng thái: <span class="sync-${syncStatus.state}">${esc(syncStatus.message || 'Sẵn sàng')}</span> · Đang chờ gửi: ${store.account.queue.length} câu</p>
      <div class="row gap wrap"><button type="button" class="btn primary" data-syncnow>🔄 Đồng bộ ngay</button><button type="button" class="btn ghost" data-logout>Đăng xuất</button></div>
    </div>
    <form class="card settings-form" data-form="password"><h2>🔑 Đổi mật khẩu</h2>
      <label>Mật khẩu hiện tại<input class="input" type="password" name="old" autocomplete="current-password" required></label>
      <label>Mật khẩu mới (≥ 6 ký tự)<input class="input" type="password" name="new" autocomplete="new-password" minlength="6" required></label>
      <button class="btn primary">Đổi mật khẩu</button></form>${backup}`;
  }
  return `<div class="grid2">
    <form class="card settings-form" data-form="login"><h2>Đăng nhập</h2>
      <label>Email<input class="input" type="email" name="email" autocomplete="username" required></label>
      <label>Mật khẩu<input class="input" type="password" name="password" autocomplete="current-password" required></label>
      <button class="btn primary">Đăng nhập</button><p class="form-err" hidden></p></form>
    <form class="card settings-form" data-form="register"><h2>Tạo tài khoản phụ huynh</h2>
      <label>Tên phụ huynh<input class="input" name="name" maxlength="60" placeholder="VD: Bố Bin"></label>
      <label>Email<input class="input" type="email" name="email" autocomplete="username" required></label>
      <label>Mật khẩu (≥ 6 ký tự)<input class="input" type="password" name="password" autocomplete="new-password" minlength="6" required></label>
      <label>Nhập lại mật khẩu<input class="input" type="password" name="password2" autocomplete="new-password" minlength="6" required></label>
      <button class="btn primary">Tạo tài khoản</button><p class="form-err" hidden></p>
      <p class="small muted">Hồ sơ đang có trên máy này sẽ được tải lên tài khoản mới.</p></form>
  </div>
  <div class="card"><h2>Vì sao nên đăng nhập?</h2><ul class="small">
    <li>Lưu <b>lịch sử từng câu</b> bé làm (đúng/sai, thời gian) lên đám mây — không mất khi xoá trình duyệt.</li>
    <li>Dùng chung trên <b>nhiều thiết bị</b>: bé học trên iPad, bố mẹ xem báo cáo trên điện thoại.</li>
    <li>Hoàn toàn miễn phí (GitHub Pages + Cloudflare). Mật khẩu được mã hoá (PBKDF2), không lưu dạng gốc.</li></ul></div>${backup}`;
}

// ------------------------------------------------------------------ life skills
function lifeTab(child) {
  if (!child) return `<div class="card"><p>Chưa có hồ sơ. <a href="#/who">Tạo hồ sơ cho bé</a></p></div>`;
  const prefs = lifePrefs(child);
  const L = child.state.life;
  const seenIds = Object.keys(L.seen).filter((id) => SCENARIO_MAP.has(id));
  const total = [...SCENARIO_MAP.values()].filter((sc) => !sc.region || sc.region === prefs.region).length;
  const firstTry = seenIds.filter((id) => (L.seen[id].ok || 0) > 0).length;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const today = seenIds.filter((id) => (L.seen[id].last || 0) >= start.getTime()).length;
  const log = L.log.filter((e) => SCENARIO_MAP.has(e.card)).slice(-12).reverse();
  const numbers = (r) => `${REGIONS[r].vi}: cảnh sát ${REGIONS[r].POLICE}, cứu hoả ${REGIONS[r].FIRE}, cấp cứu ${REGIONS[r].AMBULANCE}`;

  const worlds = LIFE_WORLDS.map((w) => {
    const p = worldProgress(child, w.id);
    if (!p.total) return '';
    const pct = Math.round((p.seen / p.total) * 100);
    return `<div class="skill-line"><div><b>${w.icon} ${esc(w.vi)}</b> <span class="muted small">${esc(w.blurbVi)}</span>
      <div class="meter"><i style="width:${pct}%"></i></div>
      <div class="small muted">${p.seen}/${p.total} câu chuyện · đúng ngay lần đầu ${p.seen ? Math.round((p.firstTry / p.seen) * 100) : 0}% · ${p.stars}★</div></div></div>`;
  }).join('');

  const talkItems = log.map((e) => {
    const sc = SCENARIO_MAP.get(e.card);
    const card = buildCard(sc, { lang: 'vi', region: prefs.region, names: e.names });
    const first = card.choices.find((c) => c.src === e.first);
    const best = card.choices[card.best];
    const tp = getLifeTopic(sc.topic);
    return `<li><small>${new Date(e.ts).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })} · ${tp.icon} ${esc(tp.vi)}</small>
      <div>${esc(card.prompt)}</div>
      <div>Bé chọn: <b class="bad">${first?.v === 'ok' ? '🙂' : '✋'} ${esc(first?.text || '?')}</b>${e.solved ? ' → sau đó tự tìm ra cách tốt nhất 👍' : ''}</div>
      <div>Cách tốt nhất: <b class="good">✅ ${esc(best.text)}</b></div>
      <div class="small">💡 ${esc(card.lesson)}</div>
      <div class="small muted">Hỏi con: “${esc(tp.talk[0])}”</div></li>`;
  }).join('');

  const guideByWorld = LIFE_WORLDS.map((w) => {
    const topics = LIFE_TOPICS.filter((t) => t.world === w.id);
    if (!topics.length) return '';
    return `<details><summary><b>${w.icon} ${esc(w.vi)}</b> <span class="muted small">(${topics.length} chủ đề)</span></summary>${topics
      .map((t) => `<div class="talk-topic"><b>${t.icon} ${esc(t.vi)}</b><p class="small">🎯 ${esc(t.goal)}</p><ul class="small">${t.talk.map((q) => `<li>${esc(q)}</li>`).join('')}</ul></div>`)
      .join('')}</details>`;
  }).join('');

  const topicChecks = LIFE_WORLDS.map((w) => {
    const topics = LIFE_TOPICS.filter((t) => t.world === w.id);
    if (!topics.length) return '';
    return `<fieldset class="topic-set"><legend>${w.icon} ${esc(w.vi)}</legend>${topics
      .map((t) => `<label class="check"><input type="checkbox" name="topic" value="${t.id}" ${prefs.off.has(t.id) ? '' : 'checked'}> ${t.icon} ${esc(t.vi)}</label>`)
      .join('')}</fieldset>`;
  }).join('');

  return `<section class="kpis">
    ${kpi('Đã khám phá', `${seenIds.length}/${total}`, 'câu chuyện')}
    ${kpi('Chọn đúng ngay', seenIds.length ? `${Math.round((firstTry / seenIds.length) * 100)}%` : '–', 'lần đầu')}
    ${kpi('Hôm nay', today, 'câu chuyện')}
  </section>
  <section class="grid2">
    <div class="card"><h2>🌱 Tiến độ theo chủ đề lớn</h2>${worlds || '<p class="muted">Chưa có nội dung.</p>'}</div>
    <div class="card"><h2>💬 Nên trò chuyện với con</h2>
      <p class="small muted">Những tình huống bé chưa chọn đúng ngay lần đầu. Đây là cơ hội nói chuyện, không phải lỗi để trách — hỏi con "Vì sao con chọn vậy?" trước khi giải thích.</p>
      ${talkItems ? `<ul class="mistakes">${talkItems}</ul>` : '<p class="muted">Chưa có — bé chọn đúng hết hoặc chưa chơi. 👍</p>'}
    </div>
  </section>
  <section class="card guide"><h2>🗣️ Gợi ý câu hỏi trò chuyện theo chủ đề</h2>
    <p class="small">Mỗi chủ đề có mục tiêu và vài câu hỏi mở để bố mẹ nói chuyện với con (lúc ăn tối, trên đường đi học…). Trẻ nhớ quy tắc an toàn tốt nhất khi được <b>tập nói ra và đóng vai</b> nhiều lần.</p>
    ${guideByWorld}
  </section>
  <form class="card settings-form" data-form="life">
    <h2>⚙️ Cài đặt Kỹ năng sống</h2>
    <label>Ngôn ngữ mặc định của thẻ tình huống<select class="input" name="lifeLang">${opt('en', 'English (như ở trường)', prefs.lang)}${opt('vi', 'Tiếng Việt (dễ hiểu hơn cho bé nhỏ)', prefs.lang)}</select>
      <small class="muted">Bé có thể bấm EN/VI trên từng thẻ để đổi bất cứ lúc nào.</small></label>
    <label>Gia đình đang sống ở<select class="input" name="region">${opt('SG', numbers('SG'), prefs.region)}${opt('VN', numbers('VN'), prefs.region)}</select>
      <small class="muted">Quyết định số điện thoại khẩn cấp bé được dạy, và một số tình huống chỉ có ở Singapore (hawker centre…) hoặc Việt Nam (xe máy…).</small></label>
    <div class="label">Chủ đề được bật</div>
    <p class="small muted">Tắt chủ đề nào thì chủ đề đó không xuất hiện trong "Câu chuyện hôm nay". Chủ đề <b>an toàn cơ thể</b> được viết nhẹ nhàng, đúng mực theo khuyến nghị giáo dục an toàn cho trẻ — nên để bật và cùng con trò chuyện.</p>
    ${topicChecks}
    <button class="btn primary">Lưu cài đặt</button>
  </form>`;
}

// ------------------------------------------------------------------ guide
function guideTab() {
  const counts = LEVELS.map((l) => `${l.id === 'K' ? 'K2' : l.id}: ${SKILLS.filter((k) => k.level === l.id).length}`).join(' · ');
  return `<div class="card guide">
  <h2>📖 Cách dùng Merli Maths</h2>
  <p>Ngân hàng câu hỏi được <b>sinh tự động</b> từ ${SKILLS.length} kỹ năng theo chương trình MOE Singapore (${counts}). Mỗi kỹ năng có 3 mức độ, số liệu – tên người – đồ vật – hình minh hoạ thay đổi mỗi lần, nên bé luyện bao lâu cũng không hết câu.</p>
  <h3>Gợi ý lịch học 1–2 giờ/ngày (chia 2–3 buổi)</h3>
  <ol>
    <li><b>Khởi động 5 phút — ⚡ Speed Sprint</b>: 2–3 lượt 1 phút (bảng cộng/trừ, sau này là bảng cửu chương). Giúp bé tính nhẩm nhanh, không đếm ngón tay.</li>
    <li><b>20–30 phút — 🚀 Today's Mission</b>: mỗi nhiệm vụ 12 câu do hệ thống chọn: kỹ năng đang học + ôn kỹ năng cũ + luyện điểm yếu + 1 câu tư duy. Làm 2–4 nhiệm vụ.</li>
    <li><b>Nghỉ giải lao</b> (app tự nhắc theo cài đặt).</li>
    <li><b>15–20 phút — 🗺️ Learning Map</b>: chọn chủ đề bé thích hoặc chủ đề trên lớp đang học.</li>
    <li><b>10 phút — 🧠 Thinking Cap</b> (bài toán tư duy kiểu Singapore: vẽ sơ đồ, làm ngược, thử và kiểm tra) và <b>🔁 Fix my mistakes</b>.</li>
  </ol>
  <h3>Hệ thống tự điều chỉnh thế nào?</h3>
  <ul>
    <li>Mỗi kỹ năng có <b>mức 1–3</b>: đúng ngay 3 câu liên tiếp → lên mức; sai 2 câu liền → xuống mức.</li>
    <li><b>Sao</b> (★ ★★ ★★★) thể hiện độ thành thạo. Khi bé đạt ★★ một kỹ năng, nhiệm vụ sẽ chuyển sang kỹ năng tiếp theo theo thứ tự sách giáo khoa và đưa kỹ năng cũ vào phần ôn tập.</li>
    <li>Sai lần 1 → bé được gợi ý; sai lần 2 → xem lời giải từng bước, và một câu tương tự sẽ quay lại sau vài câu.</li>
    <li>Trình độ tự lên lớp theo năm sinh (tháng 1 hằng năm). Bố mẹ có thể chọn học vượt trong Cài đặt.</li>
  </ul>
  <h3>Mẹo đồng hành cùng con</h3>
  <ul>
    <li>Ngồi cùng con 10 phút đầu mỗi tuần để xem con làm thế nào; khen <b>nỗ lực</b> ("You tried hard!") hơn là khen thông minh.</li>
    <li>Ở trường Singapore, bé học bằng tiếng Anh: hãy để app đọc to câu hỏi và khuyến khích con nói lại bằng tiếng Anh ("3 and 4 make 7").</li>
    <li>Mô hình thanh (bar model) là "vũ khí" giải toán có lời văn đến tận PSLE — khi con bí, gợi ý con vẽ thanh ra giấy.</li>
    <li>Xem tab <b>Tổng quan</b> mỗi tối: phần "Cần luyện thêm" và "Lỗi sai gần đây" cho biết nên giúp con chỗ nào.</li>
  </ul>
  <h3>Lộ trình MOE: K2 → P6 (PSLE)</h3>
  <ul>
    <li><b>K2 → P1–P2</b>: số đến 1000, number bonds, cộng trừ, bảng nhân 2-3-4-5-10, tiền, giờ, đo lường, bar model cơ bản.</li>
    <li><b>P3–P4</b>: bảng nhân 6–9, phân số, diện tích–chu vi, góc; bài toán nhiều bước, "units" (phương pháp đơn vị).</li>
    <li><b>P5–P6</b>: phân số – tỉ số – phần trăm, PSLE: Paper 1 (không máy tính) & Paper 2 (bài toán heuristics). Nền móng P1 (tính nhẩm nhanh + bar model) quyết định rất nhiều.</li>
  </ul>
  <h3>🌱 Kỹ năng sống & Công dân</h3>
  <p>Ô <b>🌱 Life Skills</b> trên màn hình của bé: các tình huống "Nếu là con, con sẽ làm gì?" về tử tế – trung thực, cảm xúc, chuẩn bị vào P1, an toàn bản thân, xử lý khẩn cấp (cháy, bị thương, đuối nước…), giao thông, sống khoẻ, công dân tốt và an toàn trên mạng — bám theo 6 giá trị CCE của MOE Singapore (Tôn trọng, Trách nhiệm, Kiên cường, Chính trực, Quan tâm, Hoà hợp). Bé chọn → được giải thích vì sao lựa chọn đó tốt/chưa tốt → thử lại → nhận một câu "ghi nhớ". Mỗi ngày nên chơi <b>1 lượt "Câu chuyện hôm nay" (~5 phút)</b>; thẻ bé chọn sai sẽ tự quay lại vào hôm sau, thẻ đã chọn đúng quay lại sau vài ngày–vài tuần để nhớ lâu. Thẻ có cả tiếng Anh và tiếng Việt; xem tab <b>🌱 Kỹ năng sống</b> để biết nên trò chuyện với con điều gì.</p>
  <h3>🖤 Máy đọc sách e-ink (đen trắng)</h3>
  <p>Trên máy e-ink chạy Android (Boox, Bigme, Meebook…), mở trang bằng Chrome rồi chọn <b>Cài đặt → Giao diện → Đen trắng (e-ink)</b>. Mọi hình minh hoạ chuyển sang hoa văn đen trắng dễ nhìn, không có hiệu ứng chuyển động gây nháy màn hình. (Trình duyệt có sẵn của Kindle/Kobo quá cũ nên không chạy được.)</p>
  <h3>📱 Cài như ứng dụng (iPad, điện thoại, máy tính)</h3>
  ${installHintHTML({ force: true })}
  <p class="small">App chạy toàn màn hình, mở nhanh từ màn hình chính và vẫn dùng được khi mất mạng; tiến độ tự đồng bộ lên đám mây khi có mạng lại. Mỗi lần có bản mới, app tự cập nhật khi bé quay lại màn hình chính (không làm gián đoạn bài đang làm).</p>
  </div>`;
}

// ------------------------------------------------------------------ bindings
function bindTab(root, tab, child, arg) {
  if (tab === 'life' && child) {
    const f = root.querySelector('form[data-form="life"]');
    f?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(f);
      const s = child.state.settings;
      s.lifeLang = fd.get('lifeLang') === 'vi' ? 'vi' : 'en';
      s.region = fd.get('region') === 'VN' ? 'VN' : 'SG';
      const on_ = new Set(fd.getAll('topic'));
      s.lifeOff = LIFE_TOPICS.filter((t) => !on_.has(t.id)).map((t) => t.id);
      s.at = Date.now();
      store.touch(child);
      syncNow();
      toast('Đã lưu cài đặt Kỹ năng sống ✅');
      render(root, tab, arg);
    });
  }
  if (tab === 'history') {
    on(root, '[data-day]', async (b) => {
      b.disabled = true;
      try {
        const res = await fetchDay(child.id, b.dataset.day);
        const rows = (res.attempts || [])
          .map(
            (x) => `<tr class="${x.ok ? '' : 'miss'}"><td>${new Date(x.ts).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</td><td>${esc(skillVi(x.skill))}<div class="small muted">${esc(x.q || '')}</div></td><td>${x.ok ? '✅' : x.given === x.answer ? '🟡' : '❌'} ${esc(x.given || '')}</td><td>${esc(x.answer || '')}</td><td class="num">${Math.round(x.ms / 1000)}s</td></tr>`
          )
          .join('');
        modal(`<h2>Chi tiết ngày ${esc(b.dataset.day)}</h2><p class="small muted">✅ đúng ngay · 🟡 đúng sau khi sửa · ❌ sai</p><div class="table-wrap"><table class="tbl"><thead><tr><th>Giờ</th><th>Câu hỏi</th><th>Bé trả lời</th><th>Đáp án</th><th>Thời gian</th></tr></thead><tbody>${rows || '<tr><td colspan="5">Chưa có dữ liệu trên đám mây cho ngày này.</td></tr>'}</tbody></table></div><button type="button" class="btn" data-close>Đóng</button>`, { wide: true });
      } catch (e) {
        toast(esc(e.message));
      } finally {
        b.disabled = false;
      }
    });
  }
  if (tab === 'settings') {
    root.querySelector('form[data-form="theme"]')?.addEventListener('change', (e) => {
      if (e.target.name !== 'theme') return;
      setThemePref(e.target.value);
      toast(e.target.value === 'ink' ? 'Đã chuyển sang đen trắng (e-ink) 🖤' : 'Đã đổi giao diện ✅');
      render(root, tab, arg);
    });
  }
  if (tab === 'settings' && child) {
    const forms = Object.fromEntries([...root.querySelectorAll('form[data-form]')].map((f) => [f.dataset.form, f]));
    forms.profile?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(forms.profile);
      child.name = String(fd.get('name') || child.name).trim().slice(0, 20);
      child.birthYear = Number(fd.get('birthYear')) || child.birthYear;
      child.avatar = fd.get('avatar') || child.avatar;
      child.state.levelOverride = fd.get('levelOverride') || null;
      child.state.profileAt = Date.now();
      store.touch(child);
      syncNow();
      toast('Đã lưu hồ sơ ✅');
      render(root, tab, arg);
    });
    forms.learning?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(forms.learning);
      const s = child.state.settings;
      for (const k of ['dailyGoal', 'breakEvery', 'breakLen', 'maxDaily']) s[k] = Number(fd.get(k));
      s.input = fd.get('input') === 'choices' ? 'choices' : 'auto';
      s.autoRead = !!fd.get('autoRead');
      s.sound = !!fd.get('sound');
      s.at = Date.now();
      store.touch(child);
      syncNow();
      toast('Đã lưu cài đặt ✅');
    });
    forms.pin?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pin = String(new FormData(forms.pin).get('pin') || '');
      if (!/^\d{4}$/.test(pin)) {
        toast('PIN cần đúng 4 chữ số');
        return;
      }
      store.account.pin = await sha256Hex(`merli-pin:${pin}`);
      store.save();
      toast('Đã đặt PIN 🔒');
      render(root, tab, arg);
    });
    on(root, '[data-clearpin]', () => {
      store.account.pin = null;
      store.save();
      toast('Đã bỏ PIN');
      render(root, tab, arg);
    });
    on(root, '[data-delchild]', () => {
      const m = modal(`<h2>Xoá hồ sơ ${esc(child.name)}?</h2><p>Gõ tên của bé để xác nhận. Không thể hoàn tác.</p><input class="input" data-confirm><div class="row gap"><button type="button" class="btn" data-close>Huỷ</button><button type="button" class="btn danger" data-really>Xoá</button></div>`);
      on(m.root, '[data-really]', async () => {
        if (m.root.querySelector('[data-confirm]').value.trim() !== child.name) {
          toast('Tên chưa khớp');
          return;
        }
        try {
          await deleteChildRemote(child.id);
        } catch (e) {
          toast(`Không xoá được trên đám mây: ${esc(e.message)}`);
          return;
        }
        store.removeChild(child.id);
        m.close();
        toast('Đã xoá hồ sơ');
        location.hash = store.children.length ? '#/parent/overview' : '#/who';
      });
    });
  }
  if (tab === 'account') {
    const forms = Object.fromEntries([...root.querySelectorAll('form[data-form]')].map((f) => [f.dataset.form, f]));
    const showErr = (f, msg) => {
      const p = f.querySelector('.form-err');
      if (p) {
        p.textContent = msg;
        p.hidden = false;
      } else toast(esc(msg));
    };
    forms.login?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(forms.login);
      const btn = forms.login.querySelector('button');
      btn.disabled = true;
      try {
        await signIn(String(fd.get('email')).trim(), String(fd.get('password')));
        sfx('fanfare');
        toast('Đăng nhập thành công ☁️');
        sessionStorage.setItem(GATE_KEY, String(Date.now() + 30 * 60000));
        location.hash = store.children.length ? '#/parent/overview' : '#/who';
      } catch (err) {
        showErr(forms.login, err.message);
      } finally {
        btn.disabled = false;
      }
    });
    forms.register?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(forms.register);
      if (fd.get('password') !== fd.get('password2')) {
        showErr(forms.register, 'Hai mật khẩu chưa khớp');
        return;
      }
      const btn = forms.register.querySelector('button');
      btn.disabled = true;
      try {
        await signUp(String(fd.get('email')).trim(), String(fd.get('password')), String(fd.get('name') || '').trim());
        sfx('fanfare');
        toast('Đã tạo tài khoản ☁️');
        sessionStorage.setItem(GATE_KEY, String(Date.now() + 30 * 60000));
        location.hash = store.children.length ? '#/parent/overview' : '#/who';
      } catch (err) {
        showErr(forms.register, err.message);
      } finally {
        btn.disabled = false;
      }
    });
    forms.password?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(forms.password);
      try {
        await changePassword(String(fd.get('old')), String(fd.get('new')));
        toast('Đã đổi mật khẩu ✅');
        forms.password.reset();
      } catch (err) {
        toast(esc(err.message));
      }
    });
    on(root, '[data-syncnow]', async () => {
      store.account.lastPull = 0;
      await syncNow();
      toast(esc(syncStatus.message || 'Xong'));
      render(root, tab, arg);
    });
    on(root, '[data-logout]', async () => {
      await signOut();
      toast('Đã đăng xuất. Tiến độ vẫn được giữ trên máy này.');
      render(root, tab, arg);
    });
  }
  on(root, '[data-export]', () => {
    const blob = new Blob([JSON.stringify({ app: 'merli-maths', v: 4, exportedAt: new Date().toISOString(), children: store.children }, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `merli-maths-backup-${todayKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  root.querySelector('[data-import]')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data.app !== 'merli-maths' || !Array.isArray(data.children)) throw new Error('File không đúng định dạng');
      for (const c of data.children) {
        const i = store.children.findIndex((x) => x.id === c.id);
        const merged = { ...c, dirty: true };
        if (i >= 0) store.account.children[i] = merged;
        else store.account.children.push(merged);
      }
      if (!store.active()) store.account.activeChildId = store.children[0]?.id || null;
      store.save();
      syncNow();
      toast('Đã khôi phục ✅');
      render(root, tab, arg);
    } catch (err) {
      toast(esc(err.message));
    }
  });
  void DEFAULT_SETTINGS;
  void md;
}
