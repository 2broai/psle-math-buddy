// Practice session runner: Daily Mission, single-skill practice, Thinking Cap, Fix my mistakes.
import { store } from '../../core/store.js';
import { makeQuestion, recordAnswer, recordMissionDone, buildMission, challengeSet, reviewSet, skillSet } from '../../core/progress.js';
import { getSkill } from '../../content/curriculum.js';
import { STRAND_MAP } from '../../content/meta.js';
import { renderVisual, renderVisuals } from '../visuals/index.js';
import { md, esc } from '../markup.js';
import { speak, stopSpeaking, sfx } from '../../core/sound.js';
import { checkLimits, addPracticeSeconds, mascotHTML } from '../parts.js';
import { on, toast, confetti, modal } from '../dom.js';
import { scheduleSync, syncNow } from '../../core/sync.js';
import { makeRng } from '../../core/rng.js';

const PRAISE = ['Correct!', 'Brilliant!', 'Well done!', 'Super!', 'Awesome!', 'You got it!', 'Fantastic!', 'Great thinking!', 'Excellent!', 'Spot on!', 'Wonderful!', 'Yes!'];
const TRY_AGAIN = ['Almost! Try again.', 'Not quite — have another go!', 'Good try! Look again.', 'Hmm, check once more!'];
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const plain = (s) => String(s ?? '').replace(/\*\*/g, '').replace(/\[(\d+|\?)\/(\d+|\?)\]/g, '$1/$2');

let alive = false;
let timers = [];
let keyHandler = null;

export function unmount() {
  alive = false;
  timers.forEach(clearTimeout);
  timers = [];
  stopSpeaking();
  if (keyHandler) document.removeEventListener('keydown', keyHandler);
  keyHandler = null;
}

function answerLabel(q) {
  if (q.input === 'choice') {
    const c = q.choices.find((x) => String(x.value) === String(q.answer));
    return plain(c?.label ?? c?.value ?? q.answer);
  }
  return `${q.unit?.pre || ''}${q.answer}${q.unit?.post || ''}`;
}

export function mount(root, [modeIn = 'mission', arg]) {
  alive = true;
  const child = store.active();
  const R = makeRng();
  let mode = modeIn;
  let plan;
  let title;
  if (mode === 'skill') {
    const sk = getSkill(arg);
    if (!sk) {
      location.hash = '#/map';
      return;
    }
    plan = skillSet(arg, 10);
    title = `${sk.icon} ${sk.title}`;
  } else if (mode === 'challenge') {
    plan = challengeSet(child, 8, R);
    title = '🧠 Thinking Cap';
  } else if (mode === 'review') {
    plan = reviewSet(child, 10, R);
    title = '🔁 Fix my mistakes';
  } else {
    mode = 'mission';
    plan = buildMission(child, 12, R);
    title = '🚀 Mission';
  }
  if (!plan.length) {
    root.innerHTML = `<main class="center pad"><div class="card"><h2>${mode === 'review' ? 'No mistakes to fix — great job! 🌟' : 'Nothing here yet.'}</h2><a class="btn primary" href="#/home">🏠 Home</a></div></main>`;
    return;
  }

  const S = { i: 0, firstOk: 0, answered: 0, stars: 0, run: 0, events: [], retries: 0 };
  root.innerHTML = `<div class="play mode-${mode}">
    <header class="play-top">
      <button type="button" class="top-btn" data-exit aria-label="Stop">✖</button>
      <span class="play-title">${esc(title)}</span>
      <div class="pbar" role="progressbar" aria-label="Progress"><i></i></div>
      <span class="pill stars-pill">⭐ <b data-stars>${child.state.stars}</b></span>
    </header>
    <main class="play-main"><section class="qcard" aria-live="polite"></section></main>
  </div>`;
  const qcard = root.querySelector('.qcard');
  const bar = root.querySelector('.pbar i');
  const starsEl = root.querySelector('[data-stars]');

  let q = null;
  let tries = 0;
  let t0 = 0;
  let locked = true;
  let typed = '';
  let maxTries = 2;
  let firstGiven = null;

  const later = (fn, ms) => timers.push(setTimeout(() => alive && fn(), ms));

  function progress() {
    bar.style.width = `${Math.round((S.i / plan.length) * 100)}%`;
    starsEl.textContent = child.state.stars;
  }

  function answerUI() {
    if (q.input === 'choice') {
      const vis = q.choices.some((c) => c.visual);
      return `<div class="choices ${vis ? 'vis' : ''} n${q.choices.length}">${q.choices
        .map((c, i) => {
          const lab = c.label ?? (c.visual ? undefined : c.value);
          return `<button type="button" class="choice" data-i="${i}">${c.visual ? renderVisual(c.visual) : ''}${lab !== undefined ? `<span class="c-label">${md(String(lab))}</span>` : ''}</button>`;
        })
        .join('')}</div>`;
    }
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', q.decimals ? '.' : '', '0', '⌫'];
    return `<div class="num-entry">
      <div class="num-display">${q.unit?.pre ? `<span class="unit">${esc(q.unit.pre)}</span>` : ''}<span class="num-val"></span><span class="caret"></span>${q.unit?.post ? `<span class="unit">${esc(q.unit.post)}</span>` : ''}</div>
      <div class="numpad">${keys.map((k) => (k === '' ? '<span></span>' : `<button type="button" data-k="${k}" aria-label="${k === '⌫' ? 'Delete' : k}">${k}</button>`)).join('')}
      <button type="button" class="np-ok" data-ok>✓ Check</button></div>
    </div>`;
  }

  function render() {
    const sk = getSkill(q.skill);
    const strand = STRAND_MAP[sk.strand];
    qcard.className = `qcard ${q.input === 'number' ? 'is-num' : 'is-choice'}${q.visuals?.length ? ' has-vis' : ''}${q.choices?.some((c) => c.visual) ? ' vis-choices' : ''}`;
    qcard.innerHTML = `<div class="q-meta">
        <span class="q-skill" style="--c:${strand.color}">${sk.icon} ${esc(sk.title)}</span>
        <span class="q-tier" title="Difficulty">${'●'.repeat(q.tier)}${'○'.repeat(3 - q.tier)}</span>
        <button type="button" class="read-btn" data-read aria-label="Read the question aloud">🔊</button>
      </div>
      <div class="q-prompt">${md(q.prompt)}</div>
      ${q.visuals?.length ? `<div class="q-visuals">${renderVisuals(q.visuals)}</div>` : ''}
      <div class="q-hint" hidden></div>
      <div class="q-answer">${answerUI()}<div class="q-feedback" hidden></div></div>`;
  }

  let autoTimer = null;
  let loading = false;
  async function next() {
    if (!alive || loading || S.done) return;
    clearTimeout(autoTimer);
    if (S.i >= plan.length) return finish();
    loading = true;
    const ok = await checkLimits(child);
    loading = false;
    if (!alive) return;
    if (!ok) {
      location.hash = '#/home';
      return;
    }
    q = makeQuestion(child, plan[S.i], R);
    if (window.__MERLI_DEBUG) window.__q = q;
    tries = 0;
    typed = '';
    firstGiven = null;
    locked = false;
    maxTries = q.input === 'choice' && q.choices.length <= 2 ? 1 : 2;
    t0 = performance.now();
    progress();
    render();
    qcard.scrollTop = 0;
    window.scrollTo({ top: 0 });
    if (child.state.settings.autoRead) speak(q.speak || q.prompt);
  }

  // Feedback is shown in place (inside the answer area) so it never covers the question.
  function showSheet(html, { auto = 0 } = {}) {
    const fb = qcard.querySelector('.q-feedback');
    fb.innerHTML = html;
    fb.hidden = false;
    qcard.classList.add('answered');
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    fb.querySelector('[data-next]')?.focus({ preventScroll: true });
    clearTimeout(autoTimer);
    if (auto) {
      const forQ = q;
      autoTimer = setTimeout(() => alive && q === forQ && qcard.classList.contains('answered') && next(), auto);
    }
  }

  function celebrate(events) {
    for (const e of events) {
      if (e.type === 'sticker') toast(`🎉 New sticker! <b>${e.emoji}</b> ${esc(e.skill)} ${'★'.repeat(e.star)}`, 3200);
      else if (e.type === 'levelUp') {
        sfx('level');
        toast(`🦁 Merli reached <b>level ${e.level}</b>!`, 3000);
      } else if (e.type === 'tierUp') toast(`💪 Harder questions unlocked! (level ${e.tier})`, 2400);
      else if (e.type === 'trophy') toast(`🏆 Trophy: <b>${e.icon} ${esc(e.name)}</b>`, 3400);
      else if (e.type === 'streak') toast(`🔥 ${e.days} days in a row!`, 2600);
    }
  }

  function submit(givenValue, givenLabel, btn) {
    if (locked || !q) return;
    tries++;
    const correct = q.input === 'choice' ? String(givenValue) === String(q.answer) : givenValue !== '' && Math.abs(Number(givenValue) - Number(q.answer)) < 1e-9;
    const ms = performance.now() - t0;
    if (correct) {
      locked = true;
      const first = tries === 1;
      const res = recordAnswer(child, { skill: q.skill, tier: q.tier, ok: first, solved: true, tries, ms, mode, q: q.prompt, given: givenLabel, firstGiven, answer: answerLabel(q) });
      addPracticeSeconds(child, Math.min(90, ms / 1000));
      S.answered++;
      S.i++;
      if (first) S.firstOk++;
      S.stars += res.stars;
      S.events.push(...res.events);
      S.run = first ? S.run + 1 : 0;
      let bonus = '';
      if (S.run > 0 && S.run % 5 === 0) {
        child.state.stars += 3;
        S.stars += 3;
        store.touch(child);
        confetti(60);
        bonus = `<div class="bonus">🔥 ${S.run} in a row! +3 ⭐</div>`;
      }
      sfx('correct');
      btn?.classList.add('right');
      qcard.querySelector('.num-display')?.classList.add('right');
      progress();
      celebrate(res.events);
      scheduleSync(45000);
      const explain = first ? '' : `<p class="explain">${md(q.explain)}</p>`;
      showSheet(
        `<div class="fb ok"><div class="fb-head"><span class="fb-icon">🎉</span><b>${pick(PRAISE)}</b><span class="fb-stars">+${res.stars} ⭐</span></div>${bonus}${explain}
        <button type="button" class="btn primary big" data-next>Next ▶</button></div>`,
        { auto: first && !bonus && !res.events.length ? 1500 : 0 }
      );
      return;
    }
    sfx('wrong');
    if (firstGiven === null) firstGiven = givenLabel;
    if (tries < maxTries) {
      if (btn) {
        btn.classList.add('wrong');
        btn.disabled = true;
      } else {
        const d = qcard.querySelector('.num-display');
        d.classList.remove('shake');
        void d.offsetWidth;
        d.classList.add('shake');
        typed = '';
        updateTyped();
      }
      const hint = qcard.querySelector('.q-hint');
      hint.innerHTML = `<b>${pick(TRY_AGAIN)}</b> 💡 ${md(q.hint)}`;
      hint.hidden = false;
      if (child.state.settings.autoRead) speak(`${plain(q.hint)}`);
      return;
    }
    // second miss: show the answer and the worked solution
    locked = true;
    const res = recordAnswer(child, { skill: q.skill, tier: q.tier, ok: false, solved: false, tries, ms, mode, q: q.prompt, given: givenLabel, firstGiven, answer: answerLabel(q) });
    addPracticeSeconds(child, Math.min(90, ms / 1000));
    S.answered++;
    S.i++;
    S.run = 0;
    S.events.push(...res.events);
    if (btn) btn.classList.add('wrong');
    if (q.input === 'choice') {
      const idx = q.choices.findIndex((c) => String(c.value) === String(q.answer));
      qcard.querySelector(`.choice[data-i="${idx}"]`)?.classList.add('right');
    }
    if (S.retries < 3) {
      plan.splice(Math.min(plan.length, S.i + 2), 0, q.skill);
      S.retries++;
    }
    progress();
    scheduleSync(45000);
    const ev = q.explainVisuals?.length ? `<div class="q-visuals small">${renderVisuals(q.explainVisuals)}</div>` : '';
    showSheet(`<div class="fb miss"><div class="fb-head"><span class="fb-icon">💡</span><b>The answer is ${md(answerLabel(q))}</b></div>
      <p class="explain">${md(q.explain)}</p>${ev}
      <p class="muted small">We'll try a similar one soon!</p>
      <button type="button" class="btn primary big" data-next>Got it ▶</button></div>`);
    if (child.state.settings.autoRead) speak(plain(q.explain));
  }

  function updateTyped() {
    const v = qcard.querySelector('.num-val');
    if (v) v.textContent = typed;
  }

  function key(k) {
    if (locked || !q || q.input !== 'number') return;
    if (k === '⌫') typed = typed.slice(0, -1);
    else if (k === '.') {
      if (q.decimals && !typed.includes('.')) typed = (typed || '0') + '.';
    } else if (/^\d$/.test(k) && typed.replace('.', '').length < 8) {
      typed = typed === '0' ? k : typed + k;
    }
    sfx('tap');
    updateTyped();
  }

  function finish() {
    if (S.done) return;
    S.done = true;
    clearTimeout(autoTimer);
    let bonus = 0;
    if (mode === 'mission') {
      const r = recordMissionDone(child);
      bonus = r.bonus;
      S.events.push(...r.events);
    }
    syncNow();
    sfx('fanfare');
    confetti(110);
    const stickers = S.events.filter((e) => e.type === 'sticker');
    const trophies = S.events.filter((e) => e.type === 'trophy');
    const pct = S.answered ? Math.round((S.firstOk / S.answered) * 100) : 0;
    const head = mode === 'mission' ? 'Mission complete! 🚀' : mode === 'challenge' ? 'Thinking Cap done! 🧠' : 'Great practice! 🌟';
    const again = mode === 'skill' ? `#/play/skill/${encodeURIComponent(arg)}/${Date.now()}` : `#/play/${mode}/${Date.now()}`;
    root.querySelector('.play-main').innerHTML = `<section class="card summary">
      ${mascotHTML(child, { size: 'lg', mood: 'dance' })}
      <h1>${head}</h1>
      <p class="big">You got <b>${S.firstOk}</b> of <b>${S.answered}</b> right on the first try (${pct}%).</p>
      <p class="earned">+${S.stars + bonus} ⭐ ${bonus ? `<small>(includes mission bonus +${bonus})</small>` : ''}</p>
      ${stickers.length ? `<div class="new-stickers"><h3>New stickers</h3>${stickers.map((s) => `<span class="sticker-new" title="${esc(s.skill)}">${s.emoji}</span>`).join('')}</div>` : ''}
      ${trophies.length ? `<div class="new-trophies"><h3>New trophies</h3>${trophies.map((t) => `<span class="trophy-new">${t.icon} ${esc(t.name)}</span>`).join('')}</div>` : ''}
      <div class="row gap wrap center">
        <a class="btn primary big" href="${again}">${mode === 'mission' ? 'Next mission 🚀' : 'Play again 🔁'}</a>
        <a class="btn" href="#/sprint">⚡ Speed Sprint</a>
        <a class="btn ghost" href="#/home">🏠 Home</a>
      </div>
    </section>`;
    bar.style.width = '100%';
    starsEl.textContent = child.state.stars;
  }

  // ------------------------------------------------------------------ events
  on(root, '.choice', (b) => {
    if (locked || b.disabled) return;
    const c = q.choices[Number(b.dataset.i)];
    submit(c.value, plain(c.label ?? c.value), b);
  });
  on(root, '[data-k]', (b) => key(b.dataset.k));
  on(root, '[data-ok]', () => {
    if (typed !== '' && typed !== '.') submit(typed, `${q.unit?.pre || ''}${typed}${q.unit?.post || ''}`, null);
  });
  on(root, '[data-next]', () => next());
  on(root, '[data-read]', () => speak(q.speak || q.prompt));
  on(root, '[data-exit]', () => {
    if (S.i >= plan.length) {
      location.hash = '#/home';
      return;
    }
    const m = modal(`<h2>Stop now?</h2><p>Your answers so far are saved.</p><div class="row gap"><button type="button" class="btn" data-close>Keep going</button><a class="btn primary" href="#/home" data-close>Stop</a></div>`);
    void m;
  });
  keyHandler = (e) => {
    if (document.querySelector('.modal-back')) return;
    if (qcard.classList.contains('answered') && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      next();
      return;
    }
    if (!q || locked) return;
    if (q.input === 'number') {
      if (/^\d$/.test(e.key)) key(e.key);
      else if (e.key === 'Backspace') key('⌫');
      else if (e.key === '.' || e.key === ',') key('.');
      else if (e.key === 'Enter') root.querySelector('[data-ok]')?.click();
    } else if (/^[1-6]$/.test(e.key)) {
      root.querySelector(`.choice[data-i="${Number(e.key) - 1}"]`)?.click();
    }
  };
  document.addEventListener('keydown', keyHandler);

  next();
}
