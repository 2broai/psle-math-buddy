// Kid hub: today's progress, big activity tiles, what I'm learning now.
import { store, focusLevel } from '../../core/store.js';
import { todayStats, frontierSkills, statOf, starsOf, petLevel, petTitle } from '../../core/progress.js';
import { STRAND_MAP, LEVELS } from '../../content/meta.js';
import { kidHeader, mascotHTML, ringHTML, starsHTML } from '../parts.js';
import { esc, on } from '../dom.js';
import { speak, sfx } from '../../core/sound.js';

const CHEERS = [
  'Ready for a maths adventure?',
  'Every question makes your brain stronger!',
  "Let's make ten together!",
  'Mistakes help us learn. Keep trying!',
  'You are a Singapore Maths superstar!',
  'Draw a model when the story is tricky!',
  'Count on from the bigger number!'
];

export function mount(root) {
  const child = store.active();
  const s = child.state;
  const today = todayStats(child);
  const goal = s.settings.dailyGoal || 60;
  const mins = Math.round(today.sec / 60);
  const lv = petLevel(s.xp);
  const level = focusLevel(child);
  const levelName = LEVELS.find((l) => l.id === level)?.name || level;
  const frontier = frontierSkills(child, 4);
  const hasMistakes = s.mistakes.length > 0;
  const cheer = mins >= goal ? `Wow! You reached today's goal of ${goal} minutes! 🏆` : CHEERS[Math.floor(Math.random() * CHEERS.length)];

  root.innerHTML = `${kidHeader(child)}
  <main class="home">
    <section class="home-hero card">
      <div class="hero-left">
        ${mascotHTML(child, { size: 'lg' })}
        <div class="bubble">${esc(cheer)}</div>
      </div>
      <div class="hero-right">
        ${ringHTML(today.sec / (goal * 60), `${mins}<small>/${goal}</small>`, 'minutes today')}
        <div class="today-facts">
          <span>✅ <b>${today.q}</b> questions</span>
          <span>🚀 <b>${today.m || 0}</b> missions</span>
          <span>🦁 Merli Lv ${lv.level} · ${esc(petTitle(lv.level))}</span>
          <span class="muted">${esc(levelName)}</span>
        </div>
      </div>
    </section>

    <section class="tiles">
      <a class="tile-big t-mission" href="#/play/mission">
        <span class="t-icon">🚀</span><b>Today's Mission</b><small>Mission ${(today.m || 0) + 1} · 12 questions picked just for you</small>
      </a>
      <a class="tile-big t-map" href="#/map"><span class="t-icon">🗺️</span><b>Learning Map</b><small>Choose any topic</small></a>
      <a class="tile-big t-life" href="#/life"><span class="t-icon">🌱</span><b>Life Skills</b><small>What would you do? · Be kind, brave & safe</small></a>
      <a class="tile-big t-sprint" href="#/sprint"><span class="t-icon">⚡</span><b>Speed Sprint</b><small>How many in 1 minute?</small></a>
      <a class="tile-big t-think" href="#/play/challenge"><span class="t-icon">🧠</span><b>Thinking Cap</b><small>Puzzles for clever minds</small></a>
      ${hasMistakes ? `<a class="tile-big t-review" href="#/play/review"><span class="t-icon">🔁</span><b>Fix my mistakes</b><small>Try similar questions again</small></a>` : ''}
      <a class="tile-big t-rewards${hasMistakes ? '' : ' wide'}" href="#/rewards"><span class="t-icon">🎁</span><b>Rewards</b><small>${s.stickers.length} stickers · ⭐ ${s.stars}</small></a>
    </section>

    <section class="card now-learning">
      <h2>📚 Learning now</h2>
      <div class="skill-chips">
        ${frontier
          .map((k) => {
            const st = statOf(child, k.id);
            const strand = STRAND_MAP[k.strand];
            return `<a class="skill-chip" href="#/play/skill/${encodeURIComponent(k.id)}" style="--c:${strand.color}">
              <span class="sc-icon">${k.icon}</span><span class="sc-name">${esc(k.title)}</span>${starsHTML(starsOf(st))}</a>`;
          })
          .join('')}
      </div>
    </section>
  </main>`;

  on(root, '.mascot', () => {
    sfx('tap');
    const msg = CHEERS[Math.floor(Math.random() * CHEERS.length)];
    root.querySelector('.bubble').textContent = msg;
    speak(msg);
    const m = root.querySelector('.mascot');
    m.classList.remove('bounce');
    void m.offsetWidth;
    m.classList.add('bounce');
  });
}
