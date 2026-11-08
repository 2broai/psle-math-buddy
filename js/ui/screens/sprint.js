// Speed Sprint: 60 seconds of fast facts on the number pad. Builds fluency (no finger counting!).
import { store, focusLevel } from '../../core/store.js';
import { SKILLS, getSkill } from '../../content/curriculum.js';
import { LEVEL_IDS } from '../../content/meta.js';
import { makeQuestion, recordAnswer, TROPHIES } from '../../core/progress.js';
import { kidHeader, checkLimits, addPracticeSeconds } from '../parts.js';
import { md, esc } from '../markup.js';
import { sfx, stopSpeaking } from '../../core/sound.js';
import { on, toast, confetti } from '../dom.js';
import { scheduleSync, syncNow } from '../../core/sync.js';
import { makeRng } from '../../core/rng.js';

const DURATION = 60;
let alive = false;
let timers = [];
let keyHandler = null;

export function unmount() {
  alive = false;
  timers.forEach((t) => clearTimeout(t) || clearInterval(t));
  timers = [];
  stopSpeaking();
  if (keyHandler) document.removeEventListener('keydown', keyHandler);
  keyHandler = null;
}

export function mount(root, [skillId]) {
  alive = true;
  const child = store.active();
  if (skillId && getSkill(skillId)?.sprint) return runSprint(root, child, getSkill(skillId));
  const li = LEVEL_IDS.indexOf(focusLevel(child));
  const list = SKILLS.filter((s) => s.sprint && LEVEL_IDS.indexOf(s.level) <= li + 1);
  const byLevel = LEVEL_IDS.map((lv) => [lv, list.filter((s) => s.level === lv)]).filter(([, l]) => l.length);
  root.innerHTML = `${kidHeader(child, { back: '#/home', title: '⚡ Speed Sprint' })}
  <main class="sprint-pick">
    <p class="lead center">Answer as many as you can in <b>1 minute</b>. Beat your best score!</p>
    ${
      byLevel.length
        ? byLevel
            .map(
              ([lv, l]) => `<h2>${lv === 'K' ? 'K2' : lv}</h2><div class="sprint-grid">${l
                .map(
                  (s) => `<a class="sprint-card" href="#/sprint/${encodeURIComponent(s.id)}"><span class="sc-icon">${s.icon}</span><b>${esc(s.title)}</b><small>Best: ${child.state.sprint[s.id] || 0}</small></a>`
                )
                .join('')}</div>`
            )
            .join('')
        : '<p class="center muted">Sprints unlock soon!</p>'
    }
  </main>`;
}

function runSprint(root, child, skill) {
  const R = makeRng();
  let score = 0;
  let wrong = 0;
  let left = DURATION;
  let q = null;
  let typed = '';
  let tries = 0;
  let t0 = 0;
  let running = false;
  const best = child.state.sprint[skill.id] || 0;
  root.innerHTML = `<div class="play sprint">
    <header class="play-top"><a class="top-btn" href="#/sprint" aria-label="Back">✖</a><span class="play-title">⚡ ${esc(skill.title)}</span>
      <span class="pill">⏱️ <b data-left>${DURATION}</b>s</span><span class="pill stars-pill">✅ <b data-score>0</b></span></header>
    <main class="play-main"><section class="qcard sprint-card-main">
      <div class="sprint-ready center"><p class="big">Best: <b>${best}</b></p><button type="button" class="btn primary huge" data-start>Ready? GO! ⚡</button></div>
    </section></main>
  </div>`;
  const card = root.querySelector('.qcard');
  const leftEl = root.querySelector('[data-left]');
  const scoreEl = root.querySelector('[data-score]');

  function newQ() {
    q = makeQuestion({ ...child, state: { ...child.state, settings: { ...child.state.settings, input: 'auto' } } }, skill.id, R);
    typed = '';
    tries = 0;
    t0 = performance.now();
    card.innerHTML = `<div class="q-prompt sprint-prompt">${md(q.prompt)}</div>
      <div class="num-entry"><div class="num-display">${q.unit?.pre ? `<span class="unit">${esc(q.unit.pre)}</span>` : ''}<span class="num-val"></span><span class="caret"></span>${q.unit?.post ? `<span class="unit">${esc(q.unit.post)}</span>` : ''}</div>
      <div class="numpad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((k) => (k === '' ? '<span></span>' : `<button type="button" data-k="${k}">${k}</button>`)).join('')}<button type="button" class="np-ok" data-ok>✓</button></div></div>`;
  }

  function check(final) {
    const want = String(q.answer);
    if (typed === want) {
      score++;
      sfx('tick');
      const ms = performance.now() - t0;
      recordAnswer(child, { skill: skill.id, tier: q.tier, ok: tries === 0, solved: true, tries: tries + 1, ms, mode: 'sprint', q: q.prompt, given: typed, answer: want, adapt: false });
      addPracticeSeconds(child, Math.min(90, ms / 1000));
      scoreEl.textContent = score;
      newQ();
      return;
    }
    if (!final && typed.length < want.length) return;
    tries++;
    sfx('wrong');
    const d = card.querySelector('.num-display');
    d.classList.remove('shake');
    void d.offsetWidth;
    d.classList.add('shake');
    if (tries >= 2) {
      wrong++;
      recordAnswer(child, { skill: skill.id, tier: q.tier, ok: false, solved: false, tries, ms: performance.now() - t0, mode: 'sprint', q: q.prompt, given: typed, answer: want, adapt: false });
      card.querySelector('.num-val').textContent = want;
      d.classList.add('reveal');
      running = false;
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          running = left > 0;
          if (running) newQ();
        }, 900)
      );
      return;
    }
    typed = '';
    card.querySelector('.num-val').textContent = '';
  }

  function key(k) {
    if (!running || !q) return;
    if (k === '⌫') typed = typed.slice(0, -1);
    else if (/^\d$/.test(k) && typed.length < 7) typed += k;
    card.querySelector('.num-val').textContent = typed;
    if (/^\d$/.test(k)) check(false);
  }

  function end() {
    running = false;
    const isBest = score > best;
    if (isBest) child.state.sprint[skill.id] = score;
    child.state.stars += score;
    const newTrophies = TROPHIES.filter((t) => !child.state.trophies.includes(t.id) && t.test(child.state));
    newTrophies.forEach((t) => child.state.trophies.push(t.id));
    store.touch(child);
    syncNow();
    sfx('fanfare');
    if (isBest) confetti(90);
    card.innerHTML = `<div class="center sprint-end">
      <h1>${isBest ? '🏆 New best!' : "⏱️ Time's up!"}</h1>
      <p class="huge-num">${score}</p><p>correct in 1 minute${wrong ? ` · ${wrong} missed` : ''}</p>
      <p class="earned">+${score} ⭐</p>
      ${newTrophies.map((t) => `<p class="trophy-new">${t.icon} ${esc(t.name)}</p>`).join('')}
      <div class="row gap wrap center"><a class="btn primary big" href="#/sprint/${encodeURIComponent(skill.id)}/${Date.now()}">Again ⚡</a><a class="btn" href="#/sprint">Other sprints</a><a class="btn ghost" href="#/home">🏠 Home</a></div>
    </div>`;
    scheduleSync(5000);
  }

  async function start() {
    const ok = await checkLimits(child);
    if (!alive) return;
    if (!ok) {
      location.hash = '#/home';
      return;
    }
    running = true;
    newQ();
    const iv = setInterval(() => {
      if (!alive) return clearInterval(iv);
      left--;
      leftEl.textContent = left;
      if (left <= 10) sfx('tick');
      if (left <= 0) {
        clearInterval(iv);
        end();
      }
    }, 1000);
    timers.push(iv);
  }

  on(root, '[data-start]', start);
  on(root, '[data-k]', (b) => key(b.dataset.k));
  on(root, '[data-ok]', () => running && typed && check(true));
  keyHandler = (e) => {
    if (/^\d$/.test(e.key)) key(e.key);
    else if (e.key === 'Backspace') key('⌫');
    else if (e.key === 'Enter') {
      if (!running && root.querySelector('[data-start]')) start();
      else if (running && typed) check(true);
    }
  };
  document.addEventListener('keydown', keyHandler);
  void toast;
}
