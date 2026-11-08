// Learning map: level tabs → world tiles (strands) → units → skills with stars.
import { store, focusLevel } from '../../core/store.js';
import { SKILLS } from '../../content/curriculum.js';
import { LEVELS, STRANDS, STRAND_MAP, UNITS } from '../../content/meta.js';
import { statOf, starsOf, frontierSkills } from '../../core/progress.js';
import { kidHeader, starsHTML } from '../parts.js';
import { esc } from '../dom.js';

export function mount(root, [levelArg, strandArg]) {
  const child = store.active();
  const focus = focusLevel(child);
  const level = LEVELS.some((l) => l.id === levelArg) ? levelArg : focus;
  const frontier = new Set(frontierSkills(child, 4).map((s) => s.id));
  const skills = SKILLS.filter((s) => s.level === level);
  const mastered = skills.filter((s) => starsOf(statOf(child, s.id)) >= 2).length;
  const levelName = LEVELS.find((l) => l.id === level).name;
  const strand = STRAND_MAP[strandArg];

  const tabs = `<nav class="level-tabs" aria-label="Levels">
    ${LEVELS.map((l) => `<a class="level-tab ${l.id === level ? 'on' : ''}" href="#/map/${l.id}" style="--c:${l.color}">${l.id === 'K' ? 'K2' : l.id}${l.id === focus ? ' ⭐' : ''}</a>`).join('')}
  </nav>`;

  let body;
  if (!strand) {
    body = `<p class="map-sub">${esc(levelName)} · <b>${mastered}</b> of ${skills.length} skills mastered</p>
    <div class="world-grid">${STRANDS.map((st) => {
      const list = skills.filter((s) => s.strand === st.id);
      if (!list.length) return '';
      const got = list.reduce((n, s) => n + starsOf(statOf(child, s.id)), 0);
      const pct = Math.round((got / (list.length * 3)) * 100);
      const now = list.some((s) => frontier.has(s.id));
      return `<a class="world-tile${now ? ' now' : ''}" href="#/map/${level}/${st.id}" style="--c:${st.color}">
        <span class="wt-icon">${st.icon}</span><b>${esc(st.name)}</b>
        <small>${list.length} skills · ${got}★</small>
        <span class="wt-bar"><i style="width:${pct}%"></i></span>${now ? '<span class="now-tag">now</span>' : ''}</a>`;
    }).join('')}</div>`;
  } else {
    const list = skills.filter((s) => s.strand === strand.id);
    const units = [...new Set(list.map((s) => s.unit))].sort((a, b) => a - b);
    body = `<section class="world card" style="--c:${strand.color}">
      <header class="world-head"><span class="w-icon">${strand.icon}</span><div><h2>${esc(strand.name)}</h2><small>${esc(levelName)}</small></div>
      <a class="btn small" href="#/map/${level}">All worlds</a></header>
      ${units
        .map(
          (u) => `<div class="unit"><h3>${u === 0 ? '🧠 ' : ''}${esc(UNITS[level][u] || '')}</h3><div class="skill-chips">
          ${list
            .filter((s) => s.unit === u)
            .map((s) => {
              const st = statOf(child, s.id);
              const now = frontier.has(s.id);
              return `<a class="skill-chip big${now ? ' now' : ''}${st?.n ? '' : ' new'}" href="#/play/skill/${encodeURIComponent(s.id)}">
                <span class="sc-icon">${s.icon}</span><span class="sc-name">${esc(s.title)}</span>${starsHTML(starsOf(st))}${now ? '<span class="now-tag">now</span>' : ''}</a>`;
            })
            .join('')}
        </div></div>`
        )
        .join('')}
    </section>`;
  }

  root.innerHTML = `${kidHeader(child, { back: strand ? `#/map/${level}` : '#/home', title: strand ? `${strand.icon} ${esc(strand.name)}` : '🗺️ Learning Map' })}
  <main class="map">${tabs}${body}</main>`;
}
