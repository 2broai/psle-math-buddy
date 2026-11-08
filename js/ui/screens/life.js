// Life Skills hub: today's stories, language switch, worlds → topics.
import { store } from '../../core/store.js';
import { lifePrefs, worldProgress, topicProgress, lifeTotals, LIFE_WORLDS, LIFE_WORLD_MAP, LIFE_TOPICS } from '../../core/life.js';
import { kidHeader, mascotHTML, starsHTML } from '../parts.js';
import { esc, on, resetListeners } from '../dom.js';
import { speak, sfx } from '../../core/sound.js';

const T = {
  en: {
    title: '🌱 Life Skills',
    bubble: 'What would you do? Let’s practise being kind, brave and safe!',
    hero: '<b>This is you!</b> Look for the boy in the yellow T-shirt in every story.',
    today: "Today's stories",
    todaySub: '6 stories · about 5 minutes',
    done: (a, b) => `${a} of ${b} stories explored`,
    stories: (a, b) => `${a}/${b} stories`,
    playAll: 'Play this world ▶',
    worlds: 'All worlds',
    off: 'Switched off by your grown-up'
  },
  vi: {
    title: '🌱 Kỹ năng sống',
    bubble: 'Nếu là con, con sẽ làm gì? Cùng tập tử tế, dũng cảm và an toàn nhé!',
    hero: '<b>Bạn nhỏ áo vàng chính là con!</b> Hãy tìm bạn ấy trong mỗi câu chuyện.',
    today: 'Câu chuyện hôm nay',
    todaySub: '6 câu chuyện · khoảng 5 phút',
    done: (a, b) => `Đã khám phá ${a}/${b} câu chuyện`,
    stories: (a, b) => `${a}/${b} chuyện`,
    playAll: 'Chơi cả thế giới này ▶',
    worlds: 'Tất cả thế giới',
    off: 'Bố mẹ đã tắt chủ đề này'
  }
};

export function mount(root, [worldArg]) {
  const child = store.active();
  const { lang, off } = lifePrefs(child);
  const t = T[lang];
  const world = LIFE_WORLD_MAP[worldArg];
  const wName = (w) => (lang === 'vi' ? w.vi : w.name);
  const langSwitch = `<div class="lang-toggle" role="group" aria-label="Language">
    <button type="button" data-lang="en" class="${lang === 'en' ? 'on' : ''}" aria-pressed="${lang === 'en'}">English</button>
    <button type="button" data-lang="vi" class="${lang === 'vi' ? 'on' : ''}" aria-pressed="${lang === 'vi'}">Tiếng Việt</button></div>`;

  let body;
  if (!world) {
    const tot = lifeTotals(child);
    body = `<section class="life-hero card">
        <div class="hero-left">${mascotHTML(child, { size: 'lg' })}<div class="bubble">${esc(t.bubble)}</div></div>
        <div class="life-hero-right">
          <a class="tile-big t-life life-go" href="#/story/daily/${Date.now()}"><span class="t-icon">📖</span><b>${esc(t.today)}</b><small>${esc(t.todaySub)}</small></a>
          <div class="hero-intro"><img src="img/hero.webp" alt=""><p>${t.hero}</p></div>
          <p class="muted small">${esc(t.done(tot.seen, tot.total))}</p>
          ${langSwitch}
        </div>
      </section>
      <div class="world-grid">${LIFE_WORLDS.map((w) => {
        const p = worldProgress(child, w.id);
        if (!p.total) return '';
        const pct = Math.round((p.seen / p.total) * 100);
        return `<a class="world-tile" href="#/life/${w.id}" style="--c:${w.color}">
          <span class="wt-icon">${w.icon}</span><b>${esc(wName(w))}</b>
          <small>${esc(t.stories(p.seen, p.total))} · ${p.stars}★</small>
          <span class="wt-bar"><i style="width:${pct}%"></i></span></a>`;
      }).join('')}</div>`;
  } else {
    const topics = LIFE_TOPICS.filter((x) => x.world === world.id);
    body = `<section class="world card" style="--c:${world.color}">
      <header class="world-head"><span class="w-icon">${world.icon}</span><div><h2>${esc(wName(world))}</h2><small>${esc(lang === 'vi' ? world.blurbVi : world.blurb)}</small></div>
      <a class="btn small" href="#/life">${esc(t.worlds)}</a></header>
      <div class="skill-chips">${topics
        .map((x) => {
          const p = topicProgress(child, x);
          const isOff = off.has(x.id);
          return `<a class="skill-chip big${p.seen ? '' : ' new'}${isOff ? ' off' : ''}" href="#/story/${encodeURIComponent(x.id)}/${Date.now()}" ${isOff ? `title="${esc(t.off)}"` : ''}>
            <span class="sc-icon">${x.icon}</span><span class="sc-name">${esc(lang === 'vi' ? x.vi : x.title)}<small class="muted"> · ${p.seen}/${p.total}</small></span>${starsHTML(p.stars)}</a>`;
        })
        .join('')}</div>
      <div class="row center"><a class="btn primary big" href="#/story/${world.id}/${Date.now()}">${esc(t.playAll)}</a></div>
    </section>`;
  }

  root.innerHTML = `${kidHeader(child, { back: world ? '#/life' : '#/home', title: world ? `${world.icon} ${esc(wName(world))}` : t.title })}
  <main class="map life">${body}</main>`;

  on(root, '[data-lang]', (b) => {
    const s = child.state.settings;
    if (s.lifeLang === b.dataset.lang) return;
    s.lifeLang = b.dataset.lang;
    s.at = Date.now();
    store.touch(child);
    sfx('tap');
    resetListeners(root);
    mount(root, [worldArg]);
  });
  on(root, '.mascot', () => speak(t.bubble, { lang, raw: true }));
}
