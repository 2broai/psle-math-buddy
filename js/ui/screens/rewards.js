// Rewards: sticker album (one sticker per skill star), Merli's shop, trophies.
import { store } from '../../core/store.js';
import { SKILLS } from '../../content/curriculum.js';
import { STRANDS } from '../../content/meta.js';
import { LIFE_TOPICS } from '../../content/life/index.js';
import { SHOP, TROPHIES, stickerFor, petLevel, petTitle } from '../../core/progress.js';
import { kidHeader, mascotHTML } from '../parts.js';
import { esc, on, toast, resetListeners } from '../dom.js';
import { sfx } from '../../core/sound.js';
import { scheduleSync } from '../../core/sync.js';

export function mount(root, [tab = 'stickers']) {
  const child = store.active();
  const s = child.state;
  const lv = petLevel(s.xp);
  const owned = new Set(s.stickers);

  let body = '';
  if (tab === 'stickers') {
    body = STRANDS.map((strand) => {
      const list = SKILLS.filter((k) => k.strand === strand.id);
      if (!list.length) return '';
      const cells = [];
      let got = 0;
      for (const k of list) {
        for (let star = 1; star <= 3; star++) {
          const id = `${k.id}#${star}`;
          const has = owned.has(id);
          if (has) got++;
          cells.push(`<span class="stk ${has ? 'got' : ''}" title="${esc(k.title)} ${'★'.repeat(star)}">${has ? stickerFor(k, star) : '?'}</span>`);
        }
      }
      return `<section class="album card" style="--c:${strand.color}"><h2>${strand.icon} ${esc(strand.name)} <small>${got} / ${list.length * 3}</small></h2><div class="stk-grid">${cells.join('')}</div></section>`;
    }).join('');
    if (LIFE_TOPICS.length) {
      let got = 0;
      const cells = [];
      for (const k of LIFE_TOPICS) {
        for (let star = 1; star <= 3; star++) {
          const has = owned.has(`${k.id}#${star}`);
          if (has) got++;
          cells.push(`<span class="stk ${has ? 'got' : ''}" title="${esc(k.title)} ${'★'.repeat(star)}">${has ? stickerFor(k, star) : '?'}</span>`);
        }
      }
      body += `<section class="album card" style="--c:#16a34a"><h2>🌱 Life Skills <small>${got} / ${LIFE_TOPICS.length * 3}</small></h2><div class="stk-grid">${cells.join('')}</div></section>`;
    }
    body = `<p class="center muted">Earn a sticker for every ★ you get on a skill. Collect them all!</p>${body}`;
  } else if (tab === 'shop') {
    body = `<div class="shop-grid">${SHOP.map((it) => {
      const has = s.owned.includes(it.id);
      const on_ = s.equip[it.slot] === it.id;
      return `<div class="shop-item card ${on_ ? 'equipped' : ''}"><span class="shop-e">${it.e}</span><b>${esc(it.name)}</b>
        <button type="button" class="btn ${has ? (on_ ? 'ghost' : 'primary') : s.stars >= it.cost ? 'primary' : 'disabled'}" data-buy="${it.id}">${has ? (on_ ? 'Take off' : 'Wear') : `⭐ ${it.cost}`}</button></div>`;
    }).join('')}</div>`;
  } else {
    body = `<div class="trophy-grid">${TROPHIES.map((t) => {
      const has = s.trophies.includes(t.id);
      return `<div class="trophy card ${has ? 'got' : ''}"><span class="tr-e">${has ? t.icon : '🔒'}</span><b>${esc(t.name)}</b></div>`;
    }).join('')}</div>`;
  }

  root.innerHTML = `${kidHeader(child, { back: '#/home', title: '🎁 Rewards' })}
  <main class="rewards">
    <section class="card pet-card">${mascotHTML(child, { size: 'xl' })}<div><h2>Merli · Level ${lv.level}</h2><p>${esc(petTitle(lv.level))}</p>
      <div class="xpbar"><i style="width:${Math.round((lv.into / lv.need) * 100)}%"></i></div><small>${lv.into} / ${lv.need} XP to next level</small>
      <p class="big">⭐ <b>${s.stars}</b> stars to spend</p></div></section>
    <nav class="tabs">
      <a class="tab ${tab === 'stickers' ? 'on' : ''}" href="#/rewards/stickers">📒 Stickers (${s.stickers.length})</a>
      <a class="tab ${tab === 'shop' ? 'on' : ''}" href="#/rewards/shop">🛍️ Merli's Shop</a>
      <a class="tab ${tab === 'trophies' ? 'on' : ''}" href="#/rewards/trophies">🏆 Trophies (${s.trophies.length}/${TROPHIES.length})</a>
    </nav>
    ${body}
  </main>`;

  on(root, '[data-buy]', (b) => {
    const it = SHOP.find((x) => x.id === b.dataset.buy);
    if (!it) return;
    if (!s.owned.includes(it.id)) {
      if (s.stars < it.cost) {
        sfx('wrong');
        toast(`You need ${it.cost - s.stars} more ⭐ for the ${esc(it.name)}. Keep practising!`);
        return;
      }
      s.stars -= it.cost;
      s.owned.push(it.id);
      s.equip[it.slot] = it.id;
      sfx('fanfare');
      toast(`Merli loves the ${esc(it.name)}! ${it.e}`);
    } else {
      s.equip[it.slot] = s.equip[it.slot] === it.id ? null : it.id;
      sfx('tap');
    }
    store.touch(child);
    scheduleSync(20000);
    resetListeners(root);
    mount(root, [tab]);
  });
}
