// Life Skills session: "What would you do?" cards. Tap a choice → kind explanation for that choice;
// not the best one → try again; best one → the lesson. Cards can be switched between English and Vietnamese.
import { store } from '../../core/store.js';
import { buildLifeSession, recordLifeAnswer, lifePrefs, LIFE_WORLD_MAP, getLifeTopic } from '../../core/life.js';
import { buildCard, artUrl } from '../../content/life/card.js';
import { scenePic } from '../visuals/scene.js';
import { speak, speakQueue, stopSpeaking, sfx } from '../../core/sound.js';
import { checkLimits, addPracticeSeconds, mascotHTML } from '../parts.js';
import { esc, on, toast, confetti, modal } from '../dom.js';
import { scheduleSync, syncNow } from '../../core/sync.js';
import { makeRng } from '../../core/rng.js';

const T = {
  en: {
    daily: "🌱 Today's stories",
    best: ['Great choice!', 'Yes — well done!', 'That’s the best way!', 'Super choice!', 'You got it!'],
    ok: 'Good thinking — but there is an even better choice.',
    no: 'Hmm, not the best idea.',
    again: 'Try again!',
    reveal: 'Here is the best choice:',
    remember: 'Remember',
    next: 'Next ▶',
    finish: 'Finish ▶',
    read: 'Read aloud',
    readChoice: 'Read this choice',
    doneHead: 'Story time done! 🌱',
    doneBody: (a, b) => `You made <b>${a}</b> great choices on the first try, out of <b>${b}</b>.`,
    learned: 'Today you learned',
    more: 'More stories 📖',
    worlds: 'Life Skills 🌱',
    home: '🏠 Home',
    stopQ: 'Stop now?',
    stopBody: 'Your answers so far are saved.',
    keep: 'Keep going',
    stop: 'Stop',
    empty: 'No stories here yet.'
  },
  vi: {
    daily: '🌱 Câu chuyện hôm nay',
    best: ['Lựa chọn tuyệt vời!', 'Đúng rồi, giỏi quá!', 'Đó là cách tốt nhất!', 'Con chọn rất hay!', 'Chính xác!'],
    ok: 'Cũng được đấy — nhưng còn cách tốt hơn nữa.',
    no: 'Ồ, cách này chưa ổn.',
    again: 'Con thử lại nhé!',
    reveal: 'Cách tốt nhất là:',
    remember: 'Con nhớ nhé',
    next: 'Tiếp ▶',
    finish: 'Xong ▶',
    read: 'Đọc to',
    readChoice: 'Đọc lựa chọn này',
    doneHead: 'Xong giờ kể chuyện! 🌱',
    doneBody: (a, b) => `Con chọn đúng ngay lần đầu <b>${a}</b> trên <b>${b}</b> câu chuyện.`,
    learned: 'Hôm nay con đã học',
    more: 'Thêm câu chuyện 📖',
    worlds: 'Kỹ năng sống 🌱',
    home: '🏠 Trang chính',
    stopQ: 'Dừng lại nhé?',
    stopBody: 'Các câu con đã trả lời đều được lưu.',
    keep: 'Chơi tiếp',
    stop: 'Dừng',
    empty: 'Chưa có câu chuyện nào ở đây.'
  }
};
const pick = (a) => a[Math.floor(Math.random() * a.length)];

let alive = false;
let keyHandler = null;

export function unmount() {
  alive = false;
  stopSpeaking();
  if (keyHandler) document.removeEventListener('keydown', keyHandler);
  keyHandler = null;
}

export function mount(root, [scope = 'daily']) {
  alive = true;
  const child = store.active();
  const R = makeRng();
  const prefs = lifePrefs(child);
  let lang = prefs.lang;
  const plan = buildLifeSession(child, scope, getLifeTopic(scope) ? 8 : 6, R);
  const titleFor = () => {
    const tp = getLifeTopic(scope);
    const w = LIFE_WORLD_MAP[scope];
    if (tp) return `${tp.icon} ${lang === 'vi' ? tp.vi : tp.title}`;
    if (w) return `${w.icon} ${lang === 'vi' ? w.vi : w.name}`;
    return T[lang].daily;
  };
  if (!plan.length) {
    root.innerHTML = `<main class="center pad"><div class="card"><h2>${esc(T[lang].empty)}</h2><a class="btn primary" href="#/life">${esc(T[lang].worlds)}</a></div></main>`;
    return;
  }

  const S = { i: 0, firstOk: 0, answered: 0, stars: 0, events: [], lessons: [], done: false };
  // Fetch this session's pictures now so the whole session also works if the connection drops.
  for (const sc of plan) {
    const u = artUrl(sc.id);
    if (u) fetch(u).catch(() => {});
  }
  root.innerHTML = `<div class="play story mode-life">
    <header class="play-top">
      <button type="button" class="top-btn" data-exit aria-label="Stop">✖</button>
      <span class="play-title"></span>
      <div class="pbar" role="progressbar" aria-label="Progress"><i></i></div>
      <span class="pill stars-pill">⭐ <b data-stars>${child.state.stars}</b></span>
    </header>
    <main class="play-main"><section class="qcard story-card" aria-live="polite"></section></main>
  </div>`;
  const qcard = root.querySelector('.qcard');
  const bar = root.querySelector('.pbar i');
  const starsEl = root.querySelector('[data-stars]');
  const titleEl = root.querySelector('.play-title');

  // current card state
  let sc = null; // scenario
  let card = null;
  let tried = []; // indexes (in card.choices) tapped so far, in order
  let state = 'ask'; // 'ask' | 'done'
  let solved = false;
  let firstSrc = null;
  let t0 = 0;
  let loading = false;
  let praise = '';

  function progress() {
    bar.style.width = `${Math.round((S.i / plan.length) * 100)}%`;
    starsEl.textContent = child.state.stars;
    titleEl.textContent = titleFor();
  }

  function verdictLine(c) {
    const t = T[lang];
    if (c.v === 'best') return `<b>🌟 ${esc(praise)}</b> `;
    // "Try again!" only while the child can still pick; not once the best choice has been shown
    const again = state === 'done' ? '' : ` ${t.again}`;
    if (c.v === 'ok') return `<b>🙂 ${esc(t.ok + again)}</b> `;
    return `<b>✋ ${esc(t.no + again)}</b> `;
  }

  // Drawn picture (with speech bubbles on top) when there is one; the built-in scene picture otherwise
  // (and as a fallback if the drawn one cannot load, e.g. offline before it was ever cached).
  function pictureHTML() {
    const you = lang === 'vi' ? 'Con' : 'You';
    const svg = card.pic ? scenePic(card.pic, { youLabel: you, label: card.prompt }) : `<div class="scene-emoji" aria-hidden="true">${esc(card.scene)}</div>`;
    if (!card.img) return `<div class="scene has-pic">${svg}</div>`;
    const stage = (card.pic?.cast || []).filter((c) => !c.screen);
    const sides = { left: [], right: [] };
    for (const c of card.pic?.cast || []) {
      if (!c.say) continue;
      const i = stage.indexOf(c);
      const side = c.screen ? 'right' : Number.isFinite(c.x) ? (c.x < 50 ? 'left' : 'right') : i < stage.length / 2 - 0.01 ? 'left' : stage.length === 1 ? 'left' : 'right';
      sides[side].push(`<span class="sa-bubble">${c.e ? `<span class="sa-who">${esc(c.e)}</span> ` : ''}${esc(c.say)}</span>`);
    }
    const bubbles = ['left', 'right'].map((k) => (sides[k].length ? `<div class="sa-col ${k}">${sides[k].join('')}</div>` : '')).join('');
    return `<div class="scene has-pic has-art"><figure class="scene-art" role="img" aria-label="${esc(card.prompt)}"><img src="${card.img}" alt="" decoding="async" onerror="this.closest('.scene').classList.add('art-failed')">${bubbles}</figure>${svg}</div>`;
  }

  function render() {
    const t = T[lang];
    const w = LIFE_WORLD_MAP[card.world];
    const tp = getLifeTopic(card.topic);
    const shown = new Set(tried);
    if (state === 'done') shown.add(card.best);
    qcard.className = `qcard story-card${state === 'done' ? ' answered' : ''}`;
    qcard.style.setProperty('--c', w.color);
    qcard.innerHTML = `<div class="q-meta">
        <span class="q-skill" style="--c:${w.color}">${tp.icon} ${esc(lang === 'vi' ? tp.vi : tp.title)}</span>
        <div class="lang-toggle small" role="group" aria-label="Language">
          <button type="button" data-lang="en" class="${lang === 'en' ? 'on' : ''}" aria-pressed="${lang === 'en'}">EN</button>
          <button type="button" data-lang="vi" class="${lang === 'vi' ? 'on' : ''}" aria-pressed="${lang === 'vi'}">VI</button>
        </div>
        <button type="button" class="read-btn" data-read aria-label="${esc(t.read)}">🔊</button>
      </div>
      ${pictureHTML()}
      <div class="q-prompt">${esc(card.prompt)}</div>
      <div class="s-choices">${card.choices
        .map((c, i) => {
          const open = shown.has(i);
          const cls = open ? ` v-${c.v}` : '';
          const isBestRevealed = state === 'done' && i === card.best && !tried.includes(i);
          return `<div class="s-opt${cls}${isBestRevealed ? ' revealed' : ''}">
            <button type="button" class="s-choice" data-i="${i}" ${open || state === 'done' ? 'disabled' : ''}>
              <span class="s-e" aria-hidden="true">${c.e}</span><span class="s-t">${esc(c.text)}</span>
              ${open ? `<span class="s-mark" aria-hidden="true">${c.v === 'best' ? '✅' : c.v === 'ok' ? '🙂' : '✋'}</span>` : ''}
            </button>
            <button type="button" class="s-say" data-say="${i}" aria-label="${esc(t.readChoice)}">🔊</button>
            ${open ? `<div class="s-why">${isBestRevealed ? `<b>👉 ${esc(t.reveal)}</b> ` : verdictLine(c)}${esc(c.why)}</div>` : ''}
          </div>`;
        })
        .join('')}
      ${
        state === 'done'
          ? `<div class="q-feedback"><div class="fb ${solved ? 'ok' : 'miss'} lesson"><div class="fb-head"><span class="fb-icon">💡</span><b>${esc(t.remember)}</b></div>
              <p class="explain">${esc(card.lesson)}</p>
              <button type="button" class="btn primary big" data-next>${S.i >= plan.length ? esc(t.finish) : esc(t.next)}</button></div></div>`
          : ''
      }</div>`;
  }

  function readCard() {
    if (state === 'done') {
      speak(`${card.choices[card.best].whySay}. ${card.lessonSay}`, { lang, raw: true });
      return;
    }
    const opts = [...qcard.querySelectorAll('.s-opt')];
    speakQueue([card.say, ...card.choices.map((c, i) => `${i + 1}. ${c.say}`)], {
      lang,
      raw: true,
      onStart: (k) => opts.forEach((o, j) => o.classList.toggle('reading', j === k - 1)),
      onEnd: () => opts.forEach((o) => o.classList.remove('reading'))
    });
  }

  async function next() {
    if (!alive || loading || S.done) return;
    stopSpeaking();
    if (S.i >= plan.length) return finish();
    loading = true;
    const ok = await checkLimits(child);
    loading = false;
    if (!alive) return;
    if (!ok) {
      location.hash = '#/home';
      return;
    }
    sc = plan[S.i];
    card = buildCard(sc, { lang, region: prefs.region, R });
    if (window.__MERLI_DEBUG) window.__card = card;
    tried = [];
    state = 'ask';
    solved = false;
    firstSrc = null;
    t0 = performance.now();
    progress();
    render();
    window.scrollTo({ top: 0 });
    qcard.scrollTop = 0;
    if (child.state.settings.autoRead) readCard();
  }

  function celebrate(events) {
    for (const e of events) {
      if (e.type === 'sticker') toast(`🎉 New sticker! <b>${e.emoji}</b> ${esc(e.skill)} ${'★'.repeat(e.star)}`, 3200);
      else if (e.type === 'levelUp') {
        sfx('level');
        toast(`🦁 Merli reached <b>level ${e.level}</b>!`, 3000);
      } else if (e.type === 'trophy') toast(`🏆 Trophy: <b>${e.icon} ${esc(e.name)}</b>`, 3400);
      else if (e.type === 'streak') toast(`🔥 ${e.days} days in a row!`, 2600);
    }
  }

  function complete(ok) {
    state = 'done';
    const ms = performance.now() - t0;
    const res = recordLifeAnswer(child, card, { ok, solved, tries: tried.length, ms, firstSrc });
    addPracticeSeconds(child, Math.min(90, ms / 1000));
    S.i++;
    S.answered++;
    if (ok) S.firstOk++;
    S.stars += res.stars;
    S.events.push(...res.events);
    S.lessons.push({ sc, names: card.names });
    celebrate(res.events);
    scheduleSync(45000);
    progress();
    render();
    qcard.querySelector('.q-feedback')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    qcard.querySelector('[data-next]')?.focus({ preventScroll: true });
  }

  function choose(i) {
    if (state !== 'ask' || tried.includes(i)) return;
    stopSpeaking();
    const c = card.choices[i];
    tried.push(i);
    if (firstSrc === null) firstSrc = c.src;
    if (c.v === 'best') {
      solved = true;
      praise = pick(T[lang].best);
      sfx('correct');
      if (tried.length === 1) confetti(40);
      complete(tried.length === 1);
      speak(`${praise} ${c.whySay}. ${card.lessonSay}`, { lang, raw: true });
      return;
    }
    sfx('wrong');
    const left = card.choices.filter((x, k) => !tried.includes(k) && x.v !== 'best').length;
    if (left === 0) {
      // only the best choice is left: show it rather than make the child tap it
      complete(false);
      speak(`${c.whySay}. ${T[lang].reveal} ${card.choices[card.best].say}. ${card.choices[card.best].whySay}`, { lang, raw: true });
      return;
    }
    render();
    qcard.querySelectorAll('.s-opt')[i]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    speak(`${c.whySay}. ${c.v === 'ok' ? T[lang].ok : T[lang].no} ${T[lang].again}`, { lang, raw: true });
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l;
    child.state.settings.lifeLang = l;
    child.state.settings.at = Date.now();
    store.touch(child);
    if (card) card = buildCard(sc, { lang, region: prefs.region, names: card.names, order: card.order });
    if (S.done) finish(true);
    else {
      progress();
      render();
      if (child.state.settings.autoRead) readCard();
    }
  }

  function finish(again = false) {
    if (S.done && !again) return;
    const first = !S.done;
    S.done = true;
    stopSpeaking();
    let bonus = 0;
    if (first) {
      if (S.answered >= 5) {
        bonus = 5; // finishing a whole session
        child.state.stars += bonus;
        store.touch(child);
      }
      S.bonus = bonus;
      syncNow();
      sfx('fanfare');
      confetti(90);
    }
    const t = T[lang];
    const lessons = S.lessons.map((x) => buildCard(x.sc, { lang, region: prefs.region, names: x.names }).lesson);
    const pct = S.answered ? Math.round((S.firstOk / S.answered) * 100) : 0;
    root.querySelector('.play-main').innerHTML = `<section class="card summary story-summary">
      ${mascotHTML(child, { size: 'lg', mood: 'dance' })}
      <h1>${esc(t.doneHead)}</h1>
      <p class="big">${t.doneBody(S.firstOk, S.answered)} (${pct}%)</p>
      <p class="earned">+${S.stars + (S.bonus || 0)} ⭐</p>
      <div class="learned"><h3>💡 ${esc(t.learned)}</h3><ul>${[...new Set(lessons)].map((l) => `<li>${esc(l)}</li>`).join('')}</ul></div>
      <div class="row gap wrap center">
        <a class="btn primary big" href="#/story/${encodeURIComponent(scope)}/${Date.now()}">${esc(t.more)}</a>
        <a class="btn" href="#/life">${esc(t.worlds)}</a>
        <a class="btn ghost" href="#/home">${esc(t.home)}</a>
      </div>
    </section>`;
    bar.style.width = '100%';
    starsEl.textContent = child.state.stars;
    titleEl.textContent = titleFor();
  }

  // ------------------------------------------------------------------ events
  on(root, '.s-choice', (b) => choose(Number(b.dataset.i)));
  on(root, '[data-say]', (b) => {
    const c = card?.choices[Number(b.dataset.say)];
    if (!c) return;
    const open = tried.includes(Number(b.dataset.say)) || (state === 'done' && Number(b.dataset.say) === card.best);
    speak(open ? `${c.say}. ${c.whySay}` : c.say, { lang, raw: true });
  });
  on(root, '[data-lang]', (b) => setLang(b.dataset.lang));
  on(root, '[data-next]', () => next());
  on(root, '[data-read]', () => readCard());
  on(root, '[data-exit]', () => {
    if (S.done) {
      location.hash = '#/life';
      return;
    }
    const t = T[lang];
    modal(`<h2>${esc(t.stopQ)}</h2><p>${esc(t.stopBody)}</p><div class="row gap"><button type="button" class="btn" data-close>${esc(t.keep)}</button><a class="btn primary" href="#/life" data-close>${esc(t.stop)}</a></div>`);
  });
  keyHandler = (e) => {
    if (document.querySelector('.modal-back')) return;
    if (state === 'done' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      next();
    } else if (state === 'ask' && /^[1-4]$/.test(e.key)) choose(Number(e.key) - 1);
  };
  document.addEventListener('keydown', keyHandler);

  progress();
  next();
}
