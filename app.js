// Merli Math Buddy v3.0 — EdTech Multi-User, Skill Weakness Analytics & Cloudflare D1 Sync

const STORAGE_KEY = 'merli_psle_buddy_en_v3';
const ACCOUNT_KEY = 'merli_edtech_account_v3';

const defaultState = {
  stars: 25,
  xp: 20,
  level: 1,
  dailyDone: 0,
  dailyBonusClaimed: false,
  totalSolved: 0,
  worldSolved: {
    bonds: 0,
    barmodel: 0,
    wordprob: 0,
    patterns: 0,
    moneytime: 0
  },
  skillStats: {},
  equippedHat: '',
  equippedItem: '',
  ownedItems: [],
  topic: 'bonds',
  difficulty: 'starter',
  showHint: false,
  soundOn: true
};

const defaultAccount = {
  parentId: 'local-parent-1',
  parentEmail: '',
  cloudApiUrl: '',
  activeProfileId: 'child-1',
  profiles: [
    {
      id: 'child-1',
      childName: 'Junior',
      avatar: '🦁',
      state: structuredClone(defaultState)
    }
  ]
};

let account = loadAccount();
let state = getActiveProfile().state;
let currentQuestion = null;
let sessionSeconds = 0;
let questionStartTime = Date.now();
let wrongClicksThisQuestion = 0;
const recentSignatures = [];

function normalizeChildState(rawState) {
  return {
    ...structuredClone(defaultState),
    ...(rawState || {}),
    worldSolved: { ...defaultState.worldSolved, ...(rawState?.worldSolved || {}) },
    skillStats: { ...(rawState?.skillStats || {}) }
  };
}

function loadAccount() {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.profiles) && parsed.profiles.length > 0) {
        parsed.profiles = parsed.profiles.map((p) => ({
          ...p,
          state: normalizeChildState(p.state)
        }));
        return { ...defaultAccount, ...parsed };
      }
    }
    // Migrate v2 state if present
    const v2Raw = localStorage.getItem('merli_psle_buddy_en_v2');
    const initialChildState = v2Raw ? normalizeChildState(JSON.parse(v2Raw)) : structuredClone(defaultState);
    const fresh = structuredClone(defaultAccount);
    fresh.profiles[0].state = initialChildState;
    return fresh;
  } catch {
    return structuredClone(defaultAccount);
  }
}

function getActiveProfile() {
  let prof = account.profiles.find((p) => p.id === account.activeProfileId);
  if (!prof) {
    prof = account.profiles[0];
    account.activeProfileId = prof.id;
  }
  return prof;
}

function saveState() {
  try {
    const prof = getActiveProfile();
    prof.state = state;
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota errors
  }
}

// ==================== WEB AUDIO SOUND EFFECTS ====================
let audioCtx = null;
function playSoundFX(type) {
  if (!state.soundOn) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    if (type === 'correct') {
      playTone(523.25, now, 0.11, 'sine', 0.12); // C5
      playTone(659.25, now + 0.1, 0.11, 'sine', 0.12); // E5
      playTone(783.99, now + 0.2, 0.22, 'triangle', 0.15); // G5
    } else if (type === 'wrong') {
      playTone(260, now, 0.14, 'sine', 0.1);
      playTone(220, now + 0.12, 0.18, 'sine', 0.1);
    } else if (type === 'fanfare') {
      playTone(523.25, now, 0.12, 'triangle', 0.14);
      playTone(659.25, now + 0.12, 0.12, 'triangle', 0.14);
      playTone(783.99, now + 0.24, 0.12, 'triangle', 0.14);
      playTone(1046.5, now + 0.36, 0.35, 'triangle', 0.18);
    }
  } catch {
    // ignore audio restrictions
  }
}

function playTone(freq, startTime, duration, waveType, gainVal) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = waveType;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(gainVal, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

// ==================== SHOP & STICKER CATALOGS ====================
const SHOP_ITEMS = [
  { id: 'hat_crown', name: 'AL1 Golden Crown', emoji: '👑', type: 'hat', cost: 15 },
  { id: 'hat_grad', name: 'Junior Scholar Cap', emoji: '🎓', type: 'hat', cost: 20 },
  { id: 'hat_wizard', name: 'Math Wizard Hat', emoji: '🧙', type: 'hat', cost: 25 },
  { id: 'hat_party', name: 'Celebration Hat', emoji: '🥳', type: 'hat', cost: 30 },
  { id: 'item_medal', name: 'Olympiad Gold Medal', emoji: '🥇', type: 'item', cost: 15 },
  { id: 'item_rocket', name: 'Heuristic Rocket', emoji: '🚀', type: 'item', cost: 20 },
  { id: 'item_star', name: 'Superstar Trophy', emoji: '🏆', type: 'item', cost: 25 },
  { id: 'item_wand', name: 'Magic Number Wand', emoji: '🪄', type: 'item', cost: 35 }
];

const STICKER_BOOK = [
  // World 1: Merlion Bay (bonds)
  { id: 's_bonds_1', world: 'bonds', req: 3, emoji: '🦁', title: 'Merlion Splash', worldName: 'Merlion Bay' },
  { id: 's_bonds_2', world: 'bonds', req: 6, emoji: '🥪', title: 'Kaya Toast Master', worldName: 'Merlion Bay' },
  { id: 's_bonds_3', world: 'bonds', req: 9, emoji: '🔟', title: 'Ten-Friends Hero', worldName: 'Merlion Bay' },
  // World 2: Marina Flyer (barmodel)
  { id: 's_bar_1', world: 'barmodel', req: 3, emoji: '🎡', title: 'Singapore Flyer', worldName: 'Marina Flyer' },
  { id: 's_bar_2', world: 'barmodel', req: 6, emoji: '⛵', title: 'Marina Bay Sands', worldName: 'Marina Flyer' },
  { id: 's_bar_3', world: 'barmodel', req: 9, emoji: '📐', title: 'Bar Model Architect', worldName: 'Marina Flyer' },
  // World 3: Gardens by the Bay (wordprob)
  { id: 's_wp_1', world: 'wordprob', req: 3, emoji: '🌳', title: 'Supertree Grove', worldName: 'Gardens by the Bay' },
  { id: 's_wp_2', world: 'wordprob', req: 6, emoji: '🌺', title: 'Vanda Miss Joaquim', worldName: 'Gardens by the Bay' },
  { id: 's_wp_3', world: 'wordprob', req: 9, emoji: '🦋', title: 'Cloud Forest Explorer', worldName: 'Gardens by the Bay' },
  // World 4: Sentosa Island (patterns)
  { id: 's_pat_1', world: 'patterns', req: 3, emoji: ' 케이블', emojiDisplay: '🚠', title: 'Sentosa Cable Car', worldName: 'Sentosa Island' },
  { id: 's_pat_2', world: 'patterns', req: 6, emojiDisplay: '🐉', title: 'Toa Payoh Dragon', worldName: 'Sentosa Island' },
  { id: 's_pat_3', world: 'patterns', req: 9, emojiDisplay: '🧩', title: 'Pattern Detective', worldName: 'Sentosa Island' },
  // World 5: Jewel Changi (moneytime)
  { id: 's_mt_1', world: 'moneytime', req: 3, emojiDisplay: '⛲', title: 'Jewel Rain Vortex', worldName: 'Jewel Changi' },
  { id: 's_mt_2', world: 'moneytime', req: 6, emojiDisplay: '🦀', title: 'Chilli Crab Hawker', worldName: 'Jewel Changi' },
  { id: 's_mt_3', world: 'moneytime', req: 9, emojiDisplay: '🎓', title: 'Future PSLE AL1 Star', worldName: 'Jewel Changi' }
];

const MOE_VOCAB = [
  { en: 'Number bond', desc: 'Whole splits into parts', sample: 'Let us complete the number bond.' },
  { en: 'Altogether', desc: 'Total of all items (+)', sample: 'How many apples are there altogether?' },
  { en: 'More than', desc: 'Greater amount in comparison', sample: 'Mei has 4 more stickers than Ravi.' },
  { en: 'Fewer than', desc: 'Smaller countable amount (-)', sample: 'Ben has 3 fewer marbles than Ali.' },
  { en: 'Left / Remained', desc: 'Amount remaining (-)', sample: 'How many cupcakes are left?' },
  { en: 'Difference', desc: 'Gap between two numbers (-)', sample: 'Find the difference between 14 and 6.' },
  { en: 'Equal parts', desc: 'Same number in each group', sample: 'Split 12 into two equal parts.' },
  { en: 'From the left', desc: 'Ordinal position starting left', sample: 'Which fruit is 3rd from the left?' }
];

// ==================== RANDOM HELPERS ====================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeChoices(correctAnswer, minVal = 1, customDistractors = []) {
  const set = new Set([correctAnswer]);
  customDistractors.forEach((d) => {
    if (d !== correctAnswer && d >= minVal && set.size < 4) set.add(d);
  });
  const offsets = [-1, 1, -2, 2, 3, -3, 10, -10];
  for (const off of offsets) {
    if (set.size >= 4) break;
    const cand = correctAnswer + off;
    if (cand >= minVal) set.add(cand);
  }
  while (set.size < 4) {
    set.add(correctAnswer + set.size + 1);
  }
  return Array.from(set).sort((a, b) => a - b);
}

function makeStringChoices(correctStr, pool) {
  const set = new Set([correctStr]);
  for (const item of pool) {
    if (set.size >= 4) break;
    if (item !== correctStr) set.add(item);
  }
  return Array.from(set).sort(() => Math.random() - 0.5);
}

const SG_NAMES = ['Ali', 'Mei', 'Ravi', 'Siti', 'Ben', 'Lina', 'Wei Ming', 'Priya', 'Noah', 'Chloe'];
const SG_ITEMS = [
  { name: 'kaya buns', singular: 'kaya bun', emoji: '🥯', emoji2: '🥐' },
  { name: 'curry puffs', singular: 'curry puff', emoji: '🥟', emoji2: '🥨' },
  { name: 'stickers', singular: 'sticker', emoji: '⭐', emoji2: '🌟' },
  { name: 'marbles', singular: 'marble', emoji: '🔮', emoji2: '🟢' },
  { name: 'seashells', singular: 'seashell', emoji: '🐚', emoji2: '🪸' },
  { name: 'strawberries', singular: 'strawberry', emoji: '🍓', emoji2: '🍒' },
  { name: 'toy cars', singular: 'toy car', emoji: '🚗', emoji2: '🚙' },
  { name: 'balloons', singular: 'balloon', emoji: '🎈', emoji2: '🟡' },
  { name: 'apples', singular: 'apple', emoji: '🍎', emoji2: '🍏' },
  { name: 'cupcakes', singular: 'cupcake', emoji: '🧁', emoji2: '🍰' }
];

// ==================== WORLD 1: NUMBER BONDS GENERATOR ====================
function generateBondQuestion(diff) {
  const item = pickOne(SG_ITEMS);

  if (diff === 'starter') {
    const mode = pickOne(['find_whole_10', 'find_part_10', 'find_part_under10']);
    if (mode === 'find_whole_10') {
      const p1 = randInt(2, 7);
      const p2 = randInt(2, 10 - p1);
      const whole = p1 + p2;
      return {
        renderType: 'bonds',
        subskill: 'Number Bonds Within 10 (Part + Part = Whole)',
        en: `Look at the Number Bond. <span class="kw-highlight">${p1}</span> and <span class="kw-highlight">${p2}</span> make <span class="kw-highlight">?</span>`,
        speak: `Look at the Number Bond. ${p1} and ${p2} make what number?`,
        hint: `💡 CPA Hint: Put the two Parts (${p1} and ${p2}) together into the Whole circle! Count the objects below.`,
        whole: '?',
        part1: p1,
        part2: p2,
        emoji1: item.emoji,
        emoji2: item.emoji2,
        answer: whole,
        choices: makeChoices(whole, 2, [Math.abs(p1 - p2), whole + 1, whole - 1]),
        explain: `Awesome! ${p1} and ${p2} are the two Parts. Put them together: ${p1} + ${p2} = ${whole}!`,
        dadTip: {
          howToAsk: `Point to the two bottom circles (${p1} and ${p2}) and ask: "When we combine both parts into the top Whole circle, does the number get bigger or smaller?"`,
          psleConnection: `Instant recall of number bonds within 10 eliminates finger-counting and forms the speed foundation for PSLE Paper 1.`,
          englishScript: `${p1} and ${p2} make ${whole} altogether!`
        }
      };
    }

    if (mode === 'find_part_10') {
      const p1 = randInt(1, 9);
      const p2 = 10 - p1;
      return {
        renderType: 'bonds',
        subskill: 'Ten-Friends (Number Bonds of 10)',
        en: `Ten-Friends! <span class="kw-highlight">10</span> can be split into <span class="kw-highlight">${p1}</span> and <span class="kw-highlight">?</span>`,
        speak: `Ten Friends! 10 can be split into ${p1} and what number?`,
        hint: `💡 CPA Hint: Think of your Ten-Friends! How many more do you add to ${p1} to reach a full 10?`,
        whole: 10,
        part1: p1,
        part2: '?',
        emoji1: item.emoji,
        emoji2: item.emoji2,
        answer: p2,
        choices: makeChoices(p2, 1, [10 + p1, p2 + 1, p2 - 1]),
        explain: `Spot on! ${p1} and ${p2} are best friends of 10 (${p1} + ${p2} = 10).`,
        dadTip: {
          howToAsk: `Show 10 fingers and fold down ${p1} fingers: "How many fingers are still standing to make 10?"`,
          psleConnection: `Knowing pairs that make 10 (1&9, 2&8, 3&7, 4&6, 5&5) is the #1 mental math reflex needed for the Make-10 strategy in Primary 1 Term 2.`,
          englishScript: `Ten splits into ${p1} and ${p2}. ${p1} plus ${p2} equals ten!`
        }
      };
    }

    // find_part_under10
    const whole = randInt(6, 9);
    const p1 = randInt(2, whole - 2);
    const p2 = whole - p1;
    return {
      renderType: 'bonds',
      subskill: 'Finding a Missing Part',
      en: `Complete the Number Bond: <span class="kw-highlight">${whole}</span> is made up of <span class="kw-highlight">${p1}</span> and <span class="kw-highlight">?</span>`,
      speak: `Complete the Number Bond. ${whole} is made up of ${p1} and what number?`,
      hint: `💡 CPA Hint: The Whole is ${whole} and one Part is ${p1}. Take ${p1} away from ${whole} (${whole} - ${p1})!`,
      whole,
      part1: p1,
      part2: '?',
      emoji1: item.emoji,
      emoji2: item.emoji2,
      answer: p2,
      choices: makeChoices(p2, 1, [whole + p1, p2 + 1, p2 - 1]),
      explain: `Great job! Whole (${whole}) minus known Part (${p1}) gives the missing Part: ${whole} - ${p1} = ${p2}.`,
      dadTip: {
        howToAsk: `Ask: "Is ${whole} the Whole or a Part?" Since ${whole} is the Whole, we subtract ${p1} instead of adding ${whole} + ${p1}!`,
        psleConnection: `Distinguishing Whole vs. Part prevents the common P1 mistake of blindly adding any two numbers on the page.`,
        englishScript: `${whole} is the whole. ${p1} is one part, so the other part is ${p2}.`
      }
    };
  }

  if (diff === 'core') {
    const mode = pickOne(['make10_split', 'make10_sum', 'sub_from_10']);
    if (mode === 'make10_split') {
      const firstNum = randInt(6, 9);
      const needFor10 = 10 - firstNum;
      const secondNum = randInt(needFor10 + 1, 9);
      const rem = secondNum - needFor10;
      return {
        renderType: 'bonds',
        subskill: 'Make-10 Bridging Strategy',
        en: `Make-10 Strategy! To find <span class="kw-highlight">${firstNum} + ${secondNum}</span>, we split ${secondNum} into <span class="kw-highlight">${needFor10}</span> and <span class="kw-highlight">?</span> so ${firstNum} + ${needFor10} makes 10 first!`,
        speak: `Make 10 Strategy! To find ${firstNum} plus ${secondNum}, we split ${secondNum} into ${needFor10} and what number, so ${firstNum} plus ${needFor10} makes 10 first?`,
        hint: `💡 CPA Hint: Look at the Number Bond for ${secondNum}. Split ${secondNum} into ${needFor10} and what remaining part? (${secondNum} - ${needFor10})`,
        whole: secondNum,
        part1: needFor10,
        part2: '?',
        emoji1: '🟦',
        emoji2: '🟧',
        answer: rem,
        choices: makeChoices(rem, 1, [firstNum + secondNum, secondNum + needFor10]),
        explain: `Brilliant! ${secondNum} splits into ${needFor10} and ${rem}. Then ${firstNum} + ${needFor10} = 10, and 10 + ${rem} = ${firstNum + secondNum}!`,
        dadTip: {
          howToAsk: `Ask: "${firstNum} wants to become 10. It borrows ${needFor10} from ${secondNum}. How much does ${secondNum} have left?"`,
          psleConnection: `This exact decomposition step is taught in every Singapore MOE Primary 1 classroom so students bridge across 10 mentally without counting fingers.`,
          englishScript: `We split ${secondNum} into ${needFor10} and ${rem} to make ten first!`
        }
      };
    }

    if (mode === 'make10_sum') {
      const p1 = randInt(6, 9);
      const p2 = randInt(11 - p1, 9);
      const whole = p1 + p2;
      const need = 10 - p1;
      const rem = p2 - need;
      return {
        renderType: 'bonds',
        subskill: 'Addition Across 10 (Make-10)',
        en: `Use Make-10! <span class="kw-highlight">${p1}</span> and <span class="kw-highlight">${p2}</span> make <span class="kw-highlight">?</span> altogether.`,
        speak: `Use Make 10! ${p1} and ${p2} make how many altogether?`,
        hint: `💡 CPA Hint: Give ${need} from ${p2} to ${p1} to make 10! Then add the remaining ${rem}: 10 + ${rem} = ?`,
        whole: '?',
        part1: p1,
        part2: p2,
        emoji1: item.emoji,
        emoji2: item.emoji2,
        answer: whole,
        choices: makeChoices(whole, 10, [whole - 1, whole + 1, whole + 2]),
        explain: `Super fast! ${p1} + ${p2} = ${p1} + ${need} + ${rem} = 10 + ${rem} = ${whole}!`,
        dadTip: {
          howToAsk: `Encourage your child to say the Make-10 steps out loud instead of counting one by one: "${p1} plus ${need} is 10, plus ${rem} is ${whole}!"`,
          psleConnection: `Mental bridging across 10 scales directly to bridging across 100 and 1,000 in Primary 3–6.`,
          englishScript: `${p1} plus ${need} makes 10, and 10 plus ${rem} is ${whole}!`
        }
      };
    }

    // sub_from_10
    const whole = randInt(12, 17);
    const p1 = randInt(whole - 9, 9);
    const p2 = whole - p1;
    return {
      renderType: 'bonds',
      subskill: 'Subtract-from-10 Strategy (Within 20)',
      en: `Complete the Number Bond within 20: <span class="kw-highlight">${whole}</span> is made up of <span class="kw-highlight">${p1}</span> and <span class="kw-highlight">?</span>`,
      speak: `Complete the Number Bond within 20. ${whole} is made up of ${p1} and what number?`,
      hint: `💡 CPA Hint: Split ${whole} into 10 and ${whole - 10}. First do 10 - ${p1} = ${10 - p1}, then add ${whole - 10}!`,
      whole,
      part1: p1,
      part2: '?',
      emoji1: item.emoji,
      emoji2: item.emoji2,
      answer: p2,
      choices: makeChoices(p2, 2, [p2 - 1, p2 + 1, whole + p1]),
      explain: `Excellent! Using Subtract-from-10: ${whole} - ${p1} = (10 - ${p1}) + ${whole - 10} = ${10 - p1} + ${whole - 10} = ${p2}!`,
      dadTip: {
        howToAsk: `Show the Singapore "Subtract from 10" trick: "${whole} is 10 and ${whole - 10}. Take ${p1} away from 10 first (leaving ${10 - p1}), then add back ${whole - 10}!"`,
        psleConnection: `Subtracting from the ten-group prevents borrowing errors in multi-digit subtraction later on.`,
        englishScript: `Ten minus ${p1} is ${10 - p1}, plus ${whole - 10} gives ${p2}!`
      }
    };
  }

  // Challenge: Equal parts / Doubles / Missing number equation
  const mode = pickOne(['doubles', 'balance_eq']);
  if (mode === 'doubles') {
    const half = randInt(5, 10);
    const whole = half * 2;
    return {
      renderType: 'bonds',
      subskill: 'Thinking Cap: Equal Parts (Doubles)',
      en: `Mystery Bond! Two <span class="kw-highlight">equal parts</span> make a whole of <span class="kw-highlight">${whole}</span>. What number is each part?`,
      speak: `Mystery Bond! Two equal parts make a whole of ${whole}. What number is each part?`,
      hint: `💡 Heuristic Hint: "Equal parts" means both bottom circles have the exact same number (? + ? = ${whole}).`,
      whole,
      part1: '?',
      part2: '?',
      emoji1: '💎',
      emoji2: '💎',
      answer: half,
      choices: makeChoices(half, 2, [half - 1, half + 1, whole - 2]),
      explain: `Brilliant! Two equal parts that make ${whole} are ${half} and ${half} (${half} + ${half} = ${whole})!`,
      dadTip: {
        howToAsk: `Ask: "What number added to itself gives ${whole}?" Remind them they can split 10 into 5+5 and ${whole - 10} into ${(whole - 10) / 2}+${(whole - 10) / 2}!`,
        psleConnection: `Splitting a whole into "equal parts" is the foundation of the Unitary Method (1 unit, 2 units) used in P2–P6 Bar Models.`,
        englishScript: `${whole} split into two equal parts gives ${half} and ${half}.`
      }
    };
  }

  // balance_eq: e.g., 7 + 5 = 10 + ?
  const a = randInt(6, 9);
  const b = randInt(4, 8);
  const sum = a + b;
  const ans = sum - 10;
  return {
    renderType: 'bonds',
    subskill: 'Thinking Cap: Equivalent Number Sentences',
    en: `Balance the Equation! <span class="kw-highlight">${a} + ${b}</span> is the same as <span class="kw-highlight">10 + ?</span>`,
    speak: `Balance the Equation! ${a} plus ${b} is the same as 10 plus what number?`,
    hint: `💡 Heuristic Hint: First find the whole of ${a} + ${b} = ${sum}. Then see that ${sum} is 10 and what number!`,
    whole: sum,
    part1: 10,
    part2: '?',
    emoji1: '🔟',
    emoji2: '🌟',
    answer: ans,
    choices: makeChoices(ans, 1, [sum, a, b]),
    explain: `Genius! ${a} + ${b} = ${sum}, and ${sum} is made up of 10 + ${ans}!`,
    dadTip: {
      howToAsk: `Explain that the "=" sign means both sides have the same Whole (${sum}). If both sides equal ${sum}, then 10 + ? must also equal ${sum}!`,
      psleConnection: `Relational understanding of the "=" sign (as a balance scale rather than "write the answer here") is heavily tested in MOE P1–P3 reasoning items.`,
      englishScript: `Both sides make ${sum}. So ${a} plus ${b} equals 10 plus ${ans}!`
    }
  };
}

// ==================== WORLD 2: BAR MODEL GENERATOR ====================
function generateBarModelQuestion(diff) {
  const name1 = pickOne(SG_NAMES);
  let name2 = pickOne(SG_NAMES);
  while (name2 === name1) name2 = pickOne(SG_NAMES);
  const item = pickOne(SG_ITEMS);

  if (diff === 'starter') {
    const mode = pickOne(['pw_whole', 'pw_part']);
    if (mode === 'pw_whole') {
      const a = randInt(4, 9);
      const b = randInt(3, 8);
      const total = a + b;
      return {
        renderType: 'barmodel',
        modelType: 'part-whole',
        subskill: 'Part-Whole Bar Model (Finding Whole)',
        en: `Look at the <span class="kw-highlight">Part-Whole Bar Model</span>. ${name1} has <span class="kw-highlight">${a}</span> ${item.name} and ${name2} has <span class="kw-highlight">${b}</span> ${item.name}. How many ${item.name} do they have <span class="kw-highlight">altogether</span>?`,
        speak: `Look at the Part-Whole Bar Model. ${name1} has ${a} ${item.name} and ${name2} has ${b} ${item.name}. How many ${item.name} do they have altogether?`,
        hint: `💡 CPA Hint: The top bracket (?) covers the whole bar (${a} and ${b}). Join both parts together!`,
        total: '?',
        partA: { label: `${name1} (${a})`, val: a, color: 'blue' },
        partB: { label: `${name2} (${b})`, val: b, color: 'orange' },
        answer: total,
        choices: makeChoices(total, 2, [Math.abs(a - b), total - 1, total + 1]),
        explain: `Well done! Joining the two parts (${a} and ${b}) gives the Whole bar: ${a} + ${b} = ${total}.`,
        dadTip: {
          howToAsk: `Point to the top bracket labeled "?" and ask: "Does this bracket cover just one part, or both parts together?"`,
          psleConnection: `The Part-Whole Bar Model is the foundation of Singapore Math problem solving from Primary 1 to Primary 6.`,
          englishScript: `To find the whole bar, we add the two parts: ${a} plus ${b} equals ${total}.`
        }
      };
    }

    // pw_part
    const total = randInt(11, 18);
    const a = randInt(5, 10);
    const b = total - a;
    return {
      renderType: 'barmodel',
      modelType: 'part-whole',
      subskill: 'Part-Whole Bar Model (Finding Missing Part)',
      en: `There are <span class="kw-highlight">${total}</span> ${item.name} in a basket <span class="kw-highlight">in all</span>. <span class="kw-highlight">${a}</span> are red and the rest are blue. How many blue ${item.name} are there?`,
      speak: `There are ${total} ${item.name} in a basket in all. ${a} are red and the rest are blue. How many blue ${item.name} are there?`,
      hint: `💡 CPA Hint: The Whole bar is ${total}. Cut away the known blue part (${a}) to find the missing yellow part (${total} - ${a})!`,
      total,
      partA: { label: `Red (${a})`, val: a, color: 'blue' },
      partB: { label: `Blue (?)`, val: '?', color: 'missing' },
      answer: b,
      choices: makeChoices(b, 1, [total + a, b - 1, b + 1]),
      explain: `Sharp eyes! We already know the Whole (${total}), so we subtract the known part: ${total} - ${a} = ${b}!`,
      dadTip: {
        howToAsk: `Point out that even though the question says "in all", ${total} is already the Whole bar. To find a smaller piece of the bar, we must subtract!`,
        psleConnection: `Visualizing Whole - Part = Part on a bar model prevents students from falling for keyword traps like adding whenever they see "in all".`,
        englishScript: `The whole bar is ${total}. Subtract the part of ${a} to get ${b}.`
      }
    };
  }

  if (diff === 'core') {
    const mode = pickOne(['comp_more', 'comp_fewer', 'comp_diff']);
    if (mode === 'comp_more') {
      const base = randInt(6, 12);
      const diffVal = randInt(3, 7);
      const ans = base + diffVal;
      return {
        renderType: 'barmodel',
        modelType: 'comparison',
        subskill: 'Comparison Bar Model ("More Than")',
        en: `Comparison Bar Model: ${name1} has <span class="kw-highlight">${base}</span> ${item.name}. ${name2} has <span class="kw-highlight">${diffVal} more</span> ${item.name} than ${name1}. How many ${item.name} does ${name2} have?`,
        speak: `Comparison Bar Model. ${name1} has ${base} ${item.name}. ${name2} has ${diffVal} more ${item.name} than ${name1}. How many ${item.name} does ${name2} have?`,
        hint: `💡 CPA Hint: Look at ${name2}'s bar. It has an equal part of ${base} PLUS an extra difference part of ${diffVal}!`,
        rowA: { name: name1, val: base, color: 'blue' },
        rowB: { name: name2, baseVal: base, diffVal: `+ ${diffVal} more`, totalLabel: '?', isLonger: true },
        answer: ans,
        choices: makeChoices(ans, 2, [Math.abs(base - diffVal), ans - 1, ans + 1]),
        explain: `Fantastic! ${name2}'s bar is longer than ${name1}'s bar by ${diffVal}, so ${base} + ${diffVal} = ${ans}.`,
        dadTip: {
          howToAsk: `Cover the "+ ${diffVal} more" dotted box with your finger: "Up to this line, ${name2} has the same as ${name1} (${base}). Now add the extra ${diffVal}!"`,
          psleConnection: `Aligning two comparison bars on the left and marking the "difference bracket" is the exact technique used for PSLE Paper 2 comparison problems.`,
          englishScript: `${name2} has a longer bar: ${base} plus ${diffVal} equals ${ans}.`
        }
      };
    }

    if (mode === 'comp_fewer') {
      const topVal = randInt(11, 18);
      const diffVal = randInt(3, 7);
      const ans = topVal - diffVal;
      return {
        renderType: 'barmodel',
        modelType: 'comparison-fewer',
        subskill: 'Comparison Bar Model ("Fewer Than")',
        en: `Comparison Bar Model: ${name1} has <span class="kw-highlight">${topVal}</span> ${item.name}. ${name2} has <span class="kw-highlight">${diffVal} fewer</span> ${item.name} than ${name1}. How many ${item.name} does ${name2} have?`,
        speak: `Comparison Bar Model. ${name1} has ${topVal} ${item.name}. ${name2} has ${diffVal} fewer ${item.name} than ${name1}. How many ${item.name} does ${name2} have?`,
        hint: `💡 CPA Hint: ${name2}'s green bar is shorter than ${name1}'s bar (${topVal}) by ${diffVal}. Subtract ${diffVal} from ${topVal}!`,
        rowA: { name: name1, val: topVal, color: 'blue' },
        rowB: { name: name2, val: '?', diffVal: `${diffVal} fewer` },
        answer: ans,
        choices: makeChoices(ans, 2, [topVal + diffVal, ans - 1, ans + 1]),
        explain: `Excellent! Since ${name2}'s bar is shorter by ${diffVal}, we subtract: ${topVal} - ${diffVal} = ${ans}.`,
        dadTip: {
          howToAsk: `Ask: "Whose bar is shorter? How much shorter?" Seeing the shorter green bar makes it clear we must subtract ${diffVal} from ${topVal}.`,
          psleConnection: `Comparison bars train children to focus on which quantity is larger/smaller rather than guessing operations.`,
          englishScript: `${name2} has a shorter bar: ${topVal} minus ${diffVal} gives ${ans}.`
        }
      };
    }

    // comp_diff: Find how many more
    const topVal = randInt(11, 17);
    const botVal = randInt(5, topVal - 3);
    const diffVal = topVal - botVal;
    return {
      renderType: 'barmodel',
      modelType: 'comparison-fewer',
      subskill: 'Comparison Bar Model (Finding the Difference)',
      en: `${name1} has <span class="kw-highlight">${topVal}</span> ${item.name}. ${name2} has <span class="kw-highlight">${botVal}</span> ${item.name}. <span class="kw-highlight">How many more</span> ${item.name} does ${name1} have than ${name2}?`,
      speak: `${name1} has ${topVal} ${item.name}. ${name2} has ${botVal} ${item.name}. How many more ${item.name} does ${name1} have than ${name2}?`,
      hint: `💡 CPA Hint: "How many more" asks for the DIFFERENCE (the dotted gap between ${topVal} and ${botVal}). Subtract ${topVal} - ${botVal}!`,
      rowA: { name: name1, val: topVal, color: 'blue' },
      rowB: { name: name2, val: botVal, diffVal: '? more' },
      answer: diffVal,
      choices: makeChoices(diffVal, 1, [topVal + botVal, diffVal + 1, diffVal - 1]),
      explain: `Spot on! "How many more" means finding the difference gap between the two bars: ${topVal} - ${botVal} = ${diffVal}!`,
      dadTip: {
        howToAsk: `Many P1 children see the word "more" in "How many more..." and mistakenly add ${topVal} + ${botVal}! Point to the dotted gap on the bar model to show we are finding the difference (${topVal} - ${botVal}).`,
        psleConnection: `Understanding that "How many more / fewer" means Difference (Large - Small) is one of the most important concepts in Primary 1 & 2.`,
        englishScript: `To find how many more, we find the difference: ${topVal} minus ${botVal} equals ${diffVal}.`
      }
    };
  }

  // Challenge: Reverse comparison OR Equal transfer
  const mode = pickOne(['reverse_more', 'equal_transfer']);
  if (mode === 'reverse_more') {
    const bigVal = randInt(12, 18);
    const diffVal = randInt(3, 6);
    const smallVal = bigVal - diffVal;
    return {
      renderType: 'barmodel',
      modelType: 'comparison-fewer',
      subskill: 'Thinking Cap: Reverse Comparison Trap!',
      en: `Careful Reading! ${name1} has <span class="kw-highlight">${bigVal}</span> ${item.name}. ${name1} has <span class="kw-highlight">${diffVal} more</span> ${item.name} than ${name2}. How many ${item.name} does <span class="kw-highlight">${name2}</span> have?`,
      speak: `Careful Reading! ${name1} has ${bigVal} ${item.name}. ${name1} has ${diffVal} more ${item.name} than ${name2}. How many ${item.name} does ${name2} have?`,
      hint: `💡 Heuristic Hint: If ${name1} (${bigVal}) has MORE than ${name2}, then ${name2} has FEWER than ${name1}! Look at ${name2}'s shorter green bar!`,
      rowA: { name: name1, val: bigVal, color: 'blue' },
      rowB: { name: name2, val: '?', diffVal: `${diffVal} fewer` },
      answer: smallVal,
      choices: makeChoices(smallVal, 2, [bigVal + diffVal, smallVal - 1, smallVal + 1]),
      explain: `Superstar! Even though the question says "${diffVal} more", ${name1} is the one with more, so ${name2} has a shorter bar: ${bigVal} - ${diffVal} = ${smallVal}!`,
      dadTip: {
        howToAsk: `Ask your child first: "Who has more — ${name1} or ${name2}?" (${name1}). "So should ${name2}'s bar be longer or shorter than ${bigVal}?" (Shorter -> Subtract!).`,
        psleConnection: `Reverse comparison word problems ("A has 5 more than B, find B") are a favorite MOE exam filter to separate visual thinkers from keyword guessers.`,
        englishScript: `Since ${name1} has more, ${name2} has fewer: ${bigVal} minus ${diffVal} equals ${smallVal}.`
      }
    };
  }

  // equal_transfer: A has more than B, how many to give so both are equal?
  const small = randInt(4, 8);
  const transfer = randInt(1, 4);
  const big = small + transfer * 2;
  return {
    renderType: 'barmodel',
    modelType: 'comparison',
    subskill: 'PSLE Heuristic Seed: Internal Transfer (Make Equal)',
    en: `PSLE Thinking Cap! ${name2} has <span class="kw-highlight">${big}</span> ${item.name} and ${name1} has <span class="kw-highlight">${small}</span> ${item.name}. How many ${item.name} must ${name2} <span class="kw-highlight">give</span> to ${name1} so that both of them have an <span class="kw-highlight">equal</span> number?`,
    speak: `PSLE Thinking Cap! ${name2} has ${big} ${item.name} and ${name1} has ${small} ${item.name}. How many ${item.name} must ${name2} give to ${name1} so that both of them have an equal number?`,
    hint: `💡 Heuristic Hint: ${name2} has ${transfer * 2} more than ${name1}. Split that extra difference (${transfer * 2}) into two equal halves and give ONE half to ${name1}!`,
    rowA: { name: name1, val: small, color: 'blue' },
    rowB: { name: name2, baseVal: small, diffVal: `+ ${transfer * 2} extra`, totalLabel: big, isLonger: true },
    answer: transfer,
    choices: makeChoices(transfer, 1, [transfer * 2, big - small + 1, small]),
    explain: `PSLE Genius! The difference is ${big} - ${small} = ${transfer * 2}. We share half of the difference (${transfer}) with ${name1} so both end up with ${small + transfer}!`,
    dadTip: {
      howToAsk: `Highlight why giving ALL ${transfer * 2} extra items wouldn't work! Point to the "+ ${transfer * 2} extra" box on ${name2}'s bar: "We cut the extra part (${transfer * 2}) in half, and move ${transfer} down to ${name1}'s bar!"`,
      psleConnection: `Rule of Internal Transfer: Transfer Amount = Difference ÷ 2. Mastering this visually on a Bar Model is worth 3 to 4 marks in P4–P6 Paper 2!`,
      englishScript: `The difference is ${transfer * 2}. Half of ${transfer * 2} is ${transfer}, so ${name2} gives ${transfer} to ${name1}!`
    }
  };
}

// ==================== WORLD 3: 50+ VISUAL WORD PROBLEMS GENERATOR ====================
function generateWordProblemQuestion(diff) {
  const name1 = pickOne(SG_NAMES);
  let name2 = pickOne(SG_NAMES);
  while (name2 === name1) name2 = pickOne(SG_NAMES);
  const item = pickOne(SG_ITEMS);

  if (diff === 'starter') {
    const mode = pickOne(['join_in', 'take_away', 'combine_two']);
    if (mode === 'join_in') {
      const a = randInt(4, 8);
      const b = randInt(2, 10 - a + 2);
      const ans = a + b;
      return {
        renderType: 'wordprob',
        subskill: 'Change-Increase Story ("More Joined")',
        en: `There were <span class="kw-highlight">${a}</span> ${item.name} on the table. Mum put <span class="kw-highlight">${b} more</span> ${item.name} on the table. How many ${item.name} are there <span class="kw-highlight">now</span>?`,
        speak: `There were ${a} ${item.name} on the table. Mum put ${b} more ${item.name} on the table. How many ${item.name} are there now?`,
        hint: `💡 CPA Hint: Start with ${a}, then add ${b} more (${a} + ${b}).`,
        emojiGroupA: { count: a, icon: item.emoji, label: `At first: ${a}` },
        emojiGroupB: { count: b, icon: item.emoji2, label: `Added: + ${b}` },
        answer: ans,
        choices: makeChoices(ans, 2, [Math.abs(a - b), ans - 1, ans + 1]),
        explain: `Correct! ${a} at first plus ${b} more makes ${a} + ${b} = ${ans} ${item.name} now.`,
        dadTip: {
          howToAsk: `Have your child identify the story timeline: "How many at first? (${a}). Did we put more in or take away? (Put ${b} more in -> Add!)."`,
          psleConnection: `Tracking "At First → Change → In the End" is the core framework for all Singapore word problems.`,
          englishScript: `${a} at first, plus ${b} more, makes ${ans} ${item.name} now.`
        }
      };
    }

    if (mode === 'take_away') {
      const total = randInt(9, 15);
      const ate = randInt(3, 6);
      const left = total - ate;
      return {
        renderType: 'wordprob',
        subskill: 'Change-Decrease Story ("How Many Are Left")',
        en: `${name1} had <span class="kw-highlight">${total}</span> ${item.name}. ${name1} gave <span class="kw-highlight">${ate}</span> ${item.name} to ${name2}. How many ${item.name} does ${name1} have <span class="kw-highlight">left</span>?`,
        speak: `${name1} had ${total} ${item.name}. ${name1} gave ${ate} ${item.name} to ${name2}. How many ${item.name} does ${name1} have left?`,
        hint: `💡 CPA Hint: Giving away ${ate} means the number gets smaller. Subtract ${total} - ${ate}!`,
        emojiGroupA: { count: Math.min(left, 10), icon: item.emoji, label: `Left: ?` },
        emojiGroupB: { count: ate, icon: item.emoji2, label: `Gave away: - ${ate}` },
        answer: left,
        choices: makeChoices(left, 1, [total + ate, left - 1, left + 1]),
        explain: `Spot on! Starting with ${total} and giving away ${ate} leaves ${total} - ${ate} = ${left} ${item.name}.`,
        dadTip: {
          howToAsk: `Ask: "When ${name1} gives ${ate} away, does ${name1} end up with more or fewer than ${total}?"`,
          psleConnection: `Builds clear operational sense for subtraction ("left", "remained", "gave away").`,
          englishScript: `${total} minus ${ate} leaves ${left} ${item.name}.`
        }
      };
    }

    // combine_two
    const a = randInt(5, 8);
    const b = randInt(4, 7);
    const ans = a + b;
    return {
      renderType: 'wordprob',
      subskill: 'Part-Whole Story ("Altogether")',
      en: `${name1} collected <span class="kw-highlight">${a}</span> ${item.name} on Saturday and <span class="kw-highlight">${b}</span> ${item.name} on Sunday. How many ${item.name} did ${name1} collect <span class="kw-highlight">altogether</span>?`,
      speak: `${name1} collected ${a} ${item.name} on Saturday and ${b} ${item.name} on Sunday. How many ${item.name} did ${name1} collect altogether?`,
      hint: `💡 CPA Hint: Combine Saturday's part (${a}) and Sunday's part (${b}) using Make-10!`,
      emojiGroupA: { count: a, icon: item.emoji, label: `Saturday: ${a}` },
      emojiGroupB: { count: b, icon: item.emoji2, label: `Sunday: ${b}` },
      answer: ans,
      choices: makeChoices(ans, 2, [Math.abs(a - b), ans - 1, ans + 1]),
      explain: `Great job! ${a} + ${b} = ${ans} ${item.name} altogether.`,
      dadTip: {
        howToAsk: `Practice the Make-10 mental strategy together when adding ${a} and ${b}!`,
        psleConnection: `Connects everyday reading comprehension with Part-Whole addition.`,
        englishScript: `${a} plus ${b} equals ${ans} altogether.`
      }
    };
  }

  if (diff === 'core') {
    const mode = pickOne(['three_groups_make10', 'missing_change', 'two_step_simple']);
    if (mode === 'three_groups_make10') {
      const p1 = randInt(3, 7);
      const p2 = 10 - p1;
      const p3 = randInt(3, 8);
      const ans = 10 + p3;
      return {
        renderType: 'wordprob',
        subskill: 'Adding 3 Numbers by Making 10 First',
        en: `At the Hawker Centre, Dad bought <span class="kw-highlight">${p1}</span> chicken satays, <span class="kw-highlight">${p2}</span> beef satays, and <span class="kw-highlight">${p3}</span> mutton satays. How many satays did Dad buy <span class="kw-highlight">in all</span>?`,
        speak: `At the Hawker Centre, Dad bought ${p1} chicken satays, ${p2} beef satays, and ${p3} mutton satays. How many satays did Dad buy in all?`,
        hint: `💡 CPA Hint: Spot the Ten-Friends first! ${p1} and ${p2} make 10! Then just add ${p3} to 10!`,
        emojiGroupA: { count: 10, icon: '🍢', label: `Ten-Friends: ${p1} + ${p2} = 10` },
        emojiGroupB: { count: p3, icon: '🍡', label: `Plus ${p3} more` },
        answer: ans,
        choices: makeChoices(ans, 10, [ans - 1, ans + 1, p1 + p3]),
        explain: `Smart grouping! Pair the Ten-Friends (${p1} + ${p2} = 10) first, then 10 + ${p3} = ${ans}!`,
        dadTip: {
          howToAsk: `Ask: "Which two numbers are best friends that make 10 right away?" (${p1} and ${p2}).`,
          psleConnection: `Associative grouping (pairing numbers that make 10 or 100 first) is a key Paper 1 speed technique.`,
          englishScript: `${p1} and ${p2} make 10, and 10 plus ${p3} is ${ans}!`
        }
      };
    }

    if (mode === 'missing_change') {
      const start = randInt(5, 9);
      const end = randInt(12, 17);
      const added = end - start;
      return {
        renderType: 'wordprob',
        subskill: 'Finding the Missing Change ("How Many More Needed")',
        en: `${name1} wants to collect <span class="kw-highlight">${end}</span> ${item.name} to win a prize. ${name1} already has <span class="kw-highlight">${start}</span> ${item.name}. <span class="kw-highlight">How many more</span> ${item.name} does ${name1} need?`,
        speak: `${name1} wants to collect ${end} ${item.name} to win a prize. ${name1} already has ${start} ${item.name}. How many more ${item.name} does ${name1} need?`,
        hint: `💡 CPA Hint: The goal Whole is ${end}, and ${name1} already has ${start}. Subtract ${end} - ${start}!`,
        emojiGroupA: { count: start, icon: item.emoji, label: `Already has: ${start}` },
        emojiGroupB: { count: added, icon: '❓', label: `Needs: ? (Goal = ${end})` },
        answer: added,
        choices: makeChoices(added, 1, [end + start, added - 1, added + 1]),
        explain: `Well done! Goal (${end}) minus what ${name1} already has (${start}) gives ${end} - ${start} = ${added} more needed.`,
        dadTip: {
          howToAsk: `Ask: "What is the total goal?" (${end}). "Since ${name1} already has ${start} of them, how do we find the missing part?"`,
          psleConnection: `Translating "${start} + ? = ${end}" into "${end} - ${start} = ?" builds early algebraic thinking.`,
          englishScript: `Target ${end} minus ${start} already collected equals ${added} more needed.`
        }
      };
    }

    // two_step_simple
    const start = randInt(8, 12);
    const lost = randInt(2, 4);
    const bought = randInt(3, 6);
    const ans = start - lost + bought;
    return {
      renderType: 'wordprob',
      subskill: '2-Step Story Sum (Take Away Then Add)',
      en: `There were <span class="kw-highlight">${start}</span> passengers on an MRT train car. <span class="kw-highlight">${lost}</span> passengers alighted at Orchard, and <span class="kw-highlight">${bought}</span> new passengers boarded. How many passengers are there <span class="kw-highlight">now</span>?`,
      speak: `There were ${start} passengers on an MRT train car. ${lost} passengers alighted at Orchard, and ${bought} new passengers boarded. How many passengers are there now?`,
      hint: `💡 CPA Hint: Step 1: ${start} - ${lost} = ${start - lost} (alighted means got off). Step 2: Add ${bought} who boarded!`,
      emojiGroupA: { count: start - lost, icon: '🚆', label: `After ${lost} alighted: ${start - lost}` },
      emojiGroupB: { count: bought, icon: '🙋', label: `Boarded: + ${bought}` },
      answer: ans,
      choices: makeChoices(ans, 2, [start + lost + bought, start - lost, ans + 1]),
      explain: `Awesome 2-step solving! Step 1: ${start} - ${lost} = ${start - lost}. Step 2: ${start - lost} + ${bought} = ${ans} passengers!`,
      dadTip: {
        howToAsk: `Explain the Singapore MRT vocabulary words: "Alighted" means got off the train (-), and "Boarded" means got on the train (+)!`,
        psleConnection: `"Passengers boarding and alighting an MRT/bus" is one of Singapore's most iconic word problem contexts from P1 to P4!`,
        englishScript: `First ${start} minus ${lost} is ${start - lost}, then plus ${bought} equals ${ans}.`
      }
    };
  }

  // Challenge: Working Backwards OR Queue Problem OR Equal Sharing
  const mode = pickOne(['queue_problem', 'working_backwards', 'equal_groups']);
  if (mode === 'queue_problem') {
    const front = randInt(3, 7);
    const behind = randInt(2, 6);
    const ans = front + 1 + behind;
    return {
      renderType: 'wordprob',
      subskill: 'PSLE Thinking Cap: Queue Heuristic (Include the Person!)',
      en: `Thinking Cap! ${name1} stands in a queue to buy ice cream. There are <span class="kw-highlight">${front}</span> children in front of ${name1} and <span class="kw-highlight">${behind}</span> children behind ${name1}. How many children are in the queue <span class="kw-highlight">altogether</span>?`,
      speak: `Thinking Cap! ${name1} stands in a queue to buy ice cream. There are ${front} children in front of ${name1} and ${behind} children behind ${name1}. How many children are in the queue altogether?`,
      hint: `💡 Heuristic Hint: Draw a diagram! Count the ${front} in front + ${name1} (1 person!) + the ${behind} behind!`,
      emojiGroupA: { count: front, icon: '🧒', label: `In front (${front})` },
      emojiGroupB: { count: 1, icon: `🙋‍♂️ + ${behind}🧒`, label: `${name1} (1) + Behind (${behind})` },
      answer: ans,
      choices: makeChoices(ans, 3, [front + behind, ans + 1, ans - 2]),
      explain: `Brilliant! Do not forget to count ${name1}! ${front} (in front) + 1 (${name1}) + ${behind} (behind) = ${ans} children in the queue!`,
      dadTip: {
        howToAsk: `If your child says ${front + behind}, ask: "Who is standing between the ${front} children in front and the ${behind} children behind? Did we count ${name1}?"`,
        psleConnection: `Queue / Ordinal position problems train students to sketch a quick diagram rather than blindly adding the two numbers in the text.`,
        englishScript: `${front} in front, plus 1 for ${name1}, plus ${behind} behind makes ${ans} children!`
      }
    };
  }

  if (mode === 'working_backwards') {
    const ate = randInt(3, 6);
    const left = randInt(5, 9);
    const atFirst = ate + left;
    return {
      renderType: 'wordprob',
      subskill: 'PSLE Heuristic Seed: Working Backwards ("At First")',
      en: `Working Backwards! After eating <span class="kw-highlight">${ate}</span> ${item.name}, ${name1} still had <span class="kw-highlight">${left}</span> ${item.name} <span class="kw-highlight">left</span>. How many ${item.name} did ${name1} have <span class="kw-highlight">at first</span>?`,
      speak: `Working Backwards! After eating ${ate} ${item.name}, ${name1} still had ${left} ${item.name} left. How many ${item.name} did ${name1} have at first?`,
      hint: `💡 Heuristic Hint: Warning — do not subtract just because you see "eating" and "left"! Put the ${ate} eaten ones BACK with the ${left} left to find how many at first!`,
      emojiGroupA: { count: ate, icon: item.emoji, label: `Eaten: ${ate}` },
      emojiGroupB: { count: left, icon: item.emoji2, label: `Still left: ${left}` },
      answer: atFirst,
      choices: makeChoices(atFirst, 2, [Math.abs(left - ate), atFirst - 1, atFirst + 1]),
      explain: `Heuristic Master! To find the Whole "at first", we work backwards by putting the eaten part (${ate}) and remaining part (${left}) back together: ${ate} + ${left} = ${atFirst}!`,
      dadTip: {
        howToAsk: `Ask: "Did ${name1} have MORE or FEWER than ${left} before eating any?" Since "at first" is the Whole before eating, we add ${ate} + ${left}!`,
        psleConnection: `"Find how many at first" is the Primary 1 entry point to the famous Working Backwards heuristic tested in P3–P6.`,
        englishScript: `Work backwards! Put the ${ate} eaten back with the ${left} left to get ${atFirst} at first.`
      }
    };
  }

  // equal_groups (early multiplication/division seed)
  const groups = randInt(2, 4);
  const perGroup = randInt(2, 5);
  const total = groups * perGroup;
  return {
    renderType: 'wordprob',
    subskill: 'PSLE Seed: Equal Groups (Repeated Addition)',
    en: `Equal Groups! There are <span class="kw-highlight">${groups}</span> plates. Each plate has <span class="kw-highlight">${perGroup}</span> ${item.name}. How many ${item.name} are there <span class="kw-highlight">altogether</span>?`,
    speak: `Equal Groups! There are ${groups} plates. Each plate has ${perGroup} ${item.name}. How many ${item.name} are there altogether?`,
    hint: `💡 CPA Hint: There are ${groups} equal groups of ${perGroup}. Add ${perGroup} repeated ${groups} times!`,
    emojiGroupA: { count: perGroup, icon: item.emoji, label: `1 plate = ${perGroup}` },
    emojiGroupB: { count: groups, icon: '🍽️', label: `${groups} equal plates` },
    answer: total,
    choices: makeChoices(total, 2, [groups + perGroup, total - perGroup, total + 1]),
    explain: `Superstar! ${groups} groups of ${perGroup} (${Array(groups).fill(perGroup).join(' + ')}) = ${total} ${item.name} altogether!`,
    dadTip: {
      howToAsk: `Watch out for the common trap where children just add ${groups} + ${perGroup} = ${groups + perGroup}! Have them count ${perGroup} for each of the ${groups} plates.`,
      psleConnection: `Understanding "Equal Groups" in P1–P2 is the direct bridge to Multiplication, Division, and Ratio.`,
      englishScript: `${groups} equal groups of ${perGroup} make ${total} altogether!`
    }
  };
}

// ==================== WORLD 4: PATTERNS, SHAPES & ORDINALS GENERATOR ====================
function generatePatternsQuestion(diff) {
  if (diff === 'starter') {
    const mode = pickOne(['num_seq_up', 'shape_repeat', 'ordinal_left']);
    if (mode === 'num_seq_up') {
      const step = pickOne([1, 2]);
      const start = randInt(1, 8);
      const seq = [start, start + step, start + step * 2, start + step * 3, '?'];
      const ans = start + step * 4;
      return {
        renderType: 'patterns',
        patternType: 'sequence',
        subskill: `Number Pattern (+${step} Each Step)`,
        en: `Find the missing number in the pattern: <span class="kw-highlight">${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, ?</span>`,
        speak: `Find the missing number in the pattern: ${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, what comes next?`,
        hint: `💡 Pattern Hint: Look at how much the number grows each step: +${step} every time! Add ${step} to ${start + step * 3}.`,
        sequence: seq,
        answer: ans,
        choices: makeChoices(ans, 1, [ans - 1, ans + 1, ans + step]),
        explain: `Awesome! The rule of this pattern is "Add ${step}" (+${step}) each time: ${start + step * 3} + ${step} = ${ans}!`,
        dadTip: {
          howToAsk: `Teach your child to always find the "Step Rule" first: "Are the numbers going up or down? By how many each jump?"`,
          psleConnection: `Finding the constant difference between terms is the first step in solving PSLE Number Pattern questions.`,
          englishScript: `The pattern increases by ${step} each time, so the next number is ${ans}.`
        }
      };
    }

    if (mode === 'shape_repeat') {
      const pair = pickOne([
        ['🔴', '🟦'],
        ['🔺', '⭐'],
        ['🟩', '🔶'],
        ['🦁', '🌴']
      ]);
      const seq = [pair[0], pair[1], pair[0], pair[1], pair[0], '?'];
      const ans = pair[1];
      return {
        renderType: 'patterns',
        patternType: 'sequence',
        subskill: 'Repeating Shape Pattern (ABAB)',
        en: `Look at the repeating pattern below. Which shape comes next in the <span class="kw-highlight">?</span> box?`,
        speak: `Look at the repeating pattern below. Which shape comes next in the question mark box?`,
        hint: `💡 Pattern Hint: Say the pattern aloud in pairs: "${pair[0]}, ${pair[1]} | ${pair[0]}, ${pair[1]} | ${pair[0]}, ...?"`,
        sequence: seq,
        answer: ans,
        choices: makeStringChoices(ans, [pair[0], pair[1], '🟣', '⬢']),
        explain: `Spot on! The repeating unit is (${pair[0]}, ${pair[1]}), so after ${pair[0]} comes ${pair[1]}!`,
        dadTip: {
          howToAsk: `Have your child draw a vertical line after each repeating group of (${pair[0]} ${pair[1]}) to isolate the "Repeating Unit".`,
          psleConnection: `Identifying the "Repeating Group" is how P4–P6 students solve questions like "What is the 99th shape in this pattern?"`,
          englishScript: `The repeating unit is ${pair[0]} then ${pair[1]}. So ${pair[1]} comes next!`
        }
      };
    }

    // ordinal_left
    const animals = ['🐶', '🐱', '🐰', '🐼', '🦊', '🐨'];
    const posIdx = randInt(1, 4); // 2nd to 5th
    const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
    const ans = animals[posIdx];
    return {
      renderType: 'patterns',
      patternType: 'ordinal',
      subskill: 'Ordinal Numbers (From the Left)',
      en: `Look at the animals in a row. Which animal is <span class="kw-highlight">${ordinals[posIdx]} from the left</span>?`,
      speak: `Look at the animals in a row. Which animal is ${ordinals[posIdx]} from the left?`,
      hint: `💡 CPA Hint: Start at the LEFT label and count: 1st, 2nd, 3rd... until you reach ${ordinals[posIdx]}!`,
      items: animals,
      answer: ans,
      choices: makeStringChoices(ans, animals),
      explain: `Great counting! Counting from the left: 1st is ${animals[0]}, and ${ordinals[posIdx]} from the left is ${ans}!`,
      dadTip: {
        howToAsk: `Always ask your child to check the direction word first: "Are we counting from the LEFT or from the RIGHT?"`,
        psleConnection: `Ordinal position questions ("3rd from the left" vs "2nd from the right") are a staple of Singapore P1 assessments.`,
        englishScript: `Counting from the left, the ${ordinals[posIdx]} animal is ${ans}!`
      }
    };
  }

  if (diff === 'core') {
    const mode = pickOne(['num_seq_down', 'ordinal_right', 'abc_pattern']);
    if (mode === 'num_seq_down') {
      const step = pickOne([2, 3]);
      const start = randInt(14, 20);
      const seq = [start, start - step, start - step * 2, '?', start - step * 4];
      const ans = start - step * 3;
      return {
        renderType: 'patterns',
        patternType: 'sequence',
        subskill: `Decreasing Number Pattern (-${step} Each Step)`,
        en: `Find the missing number in the pattern: <span class="kw-highlight">${start}, ${start - step}, ${start - step * 2}, ?, ${start - step * 4}</span>`,
        speak: `Find the missing number in the pattern: ${start}, ${start - step}, ${start - step * 2}, question mark, ${start - step * 4}.`,
        hint: `💡 Pattern Hint: The numbers are counting BACKWARDS by ${step} (-${step}) each step! Subtract ${step} from ${start - step * 2}.`,
        sequence: seq,
        answer: ans,
        choices: makeChoices(ans, 1, [start - step * 2 + step, ans - 1, ans + 1]),
        explain: `Awesome! The numbers decrease by ${step} each time: ${start - step * 2} - ${step} = ${ans}!`,
        dadTip: {
          howToAsk: `Point out that the numbers are shrinking! Ask: "How much smaller does it get from ${start} to ${start - step}?" (-${step}).`,
          psleConnection: `Builds flexibility with backward skip-counting and missing middle terms.`,
          englishScript: `Subtract ${step} each step: ${start - step * 2} minus ${step} equals ${ans}.`
        }
      };
    }

    // ordinal_right
    const fruits = ['🍎', '🍐', '🍊', '🍋', '🍇', '🍉'];
    const rightPos = randInt(1, 3); // 2nd, 3rd, or 4th from right
    const ordinals = ['1st', '2nd', '3rd', '4th'];
    const actualIdx = fruits.length - 1 - rightPos;
    const ans = fruits[actualIdx];
    return {
      renderType: 'patterns',
      patternType: 'ordinal',
      subskill: 'Ordinal Numbers (From the RIGHT)',
      en: `Read carefully! Which fruit is <span class="kw-highlight">${ordinals[rightPos]} from the RIGHT</span>?`,
      speak: `Read carefully! Which fruit is ${ordinals[rightPos]} from the right?`,
      hint: `💡 CPA Hint: Start from the RIGHT side (${fruits[fruits.length - 1]} is 1st from the right) and count backwards toward the left!`,
      items: fruits,
      answer: ans,
      choices: makeStringChoices(ans, fruits),
      explain: `Sharp reading! Starting from the RIGHT end (${fruits[fruits.length - 1]} is 1st), the ${ordinals[rightPos]} fruit from the right is ${ans}!`,
      dadTip: {
        howToAsk: `Have your child put their right index finger on ${fruits[fruits.length - 1]} and say "1st from the right", then move leftward!`,
        psleConnection: `Checking "from the left" vs "from the right" builds the careful reading precision needed to avoid careless losses in Paper 1.`,
        englishScript: `Start at the right end! The ${ordinals[rightPos]} fruit from the right is ${ans}.`
      }
    };
  }

  // Challenge: Growing Step Pattern (+1, +2, +3, +4)
  const start = randInt(1, 4);
  const seq = [start, start + 1, start + 3, start + 6, '?'];
  const ans = start + 10;
  return {
    renderType: 'patterns',
    patternType: 'sequence',
    subskill: 'PSLE Thinking Cap: Growing Step Pattern (+1, +2, +3, +4)',
    en: `PSLE Pattern Detective! Look at how the jumps grow: <span class="kw-highlight">${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?</span>`,
    speak: `PSLE Pattern Detective! Look at how the jumps grow: ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, what comes next?`,
    hint: `💡 Heuristic Hint: Check the jumps between numbers: +1, then +2, then +3... so the next jump must be +4! (${seq[3]} + 4)`,
    sequence: seq,
    answer: ans,
    choices: makeChoices(ans, 2, [seq[3] + 3, ans - 1, ans + 1]),
    explain: `Pattern Genius! The jumps grow by 1 each time (+1, +2, +3, +4), so ${seq[3]} + 4 = ${ans}!`,
    dadTip: {
      howToAsk: `Show your child how to write the "jump bridges" (+1, +2, +3) between consecutive numbers. They will immediately spot that the next jump is +4!`,
      psleConnection: `Triangular / growing-difference sequences (+1, +2, +3, +4...) appear in almost every P3–P6 Math Olympiad and PSLE Paper 1!`,
      englishScript: `The jumps are plus 1, plus 2, plus 3, so next is plus 4: ${seq[3]} plus 4 is ${ans}!`
    }
  };
}

// ==================== WORLD 5: SINGAPORE MONEY, TIME & GRAPHS GENERATOR ====================
function generateMoneyTimeQuestion(diff) {
  if (diff === 'starter') {
    const mode = pickOne(['count_coins', 'tell_time_oclock', 'pic_graph_total']);
    if (mode === 'count_coins') {
      const c20Count = randInt(1, 3);
      const c10Count = randInt(1, 3);
      const totalCents = c20Count * 20 + c10Count * 10;
      const coins = [...Array(c20Count).fill('20¢'), ...Array(c10Count).fill('10¢')];
      return {
        renderType: 'moneytime',
        mtType: 'coins',
        subskill: 'Counting Singapore Coins (Cents)',
        en: `Count the Singapore coins below. How many <span class="kw-highlight">cents (¢)</span> are there <span class="kw-highlight">altogether</span>?`,
        speak: `Count the Singapore coins below. How many cents are there altogether?`,
        hint: `💡 CPA Hint: Count the bigger 20¢ coins first (${c20Count * 20}¢), then count on by 10s for each 10¢ coin!`,
        coins,
        answer: `${totalCents}¢`,
        choices: makeStringChoices(`${totalCents}¢`, [
          `${totalCents - 10}¢`,
          `${totalCents + 10}¢`,
          `${totalCents + 20}¢`,
          `${(c20Count + c10Count) * 10}¢`
        ]),
        explain: `Well done! ${c20Count} twenty-cent coin(s) (${c20Count * 20}¢) + ${c10Count} ten-cent coin(s) (${c10Count * 10}¢) = ${totalCents}¢!`,
        dadTip: {
          howToAsk: `Remind your child that 1 twenty-cent coin equals TWO ten-cent coins, rather than counting every coin as "1"!`,
          psleConnection: `Distinguishing between the number of coins (quantity) and the value of coins (denomination) is a key P1–P5 heuristic seed!`,
          englishScript: `Count the value starting from the largest coin: that makes ${totalCents} cents!`
        }
      };
    }

    if (mode === 'tell_time_oclock') {
      const hour = randInt(1, 11);
      return {
        renderType: 'moneytime',
        mtType: 'clock',
        subskill: 'Telling Time to the Hour (o\'clock)',
        en: `Look at the clock face. The minute hand points to 12 and the hour hand points to <span class="kw-highlight">${hour}</span>. What time is it?`,
        speak: `Look at the clock face. The minute hand points to 12 and the hour hand points to ${hour}. What time is it?`,
        hint: `💡 CPA Hint: When the long minute hand points straight up to 12, we read the short hour hand as "o'clock"!`,
        hour,
        minute: 0,
        answer: `${hour} o'clock`,
        choices: makeStringChoices(`${hour} o'clock`, [
          `${(hour % 12) + 1} o'clock`,
          `12 o'clock`,
          `Half past ${hour}`
        ]),
        explain: `Spot on! Long hand on 12 and short hand on ${hour} shows ${hour} o'clock!`,
        dadTip: {
          howToAsk: `Help your child remember: "Short hand = Hour (short word), Long hand = Minute (long word)!"`,
          psleConnection: `Builds familiarity with analog clock faces before learning durations and timelines in P2–P4.`,
          englishScript: `The short hour hand points to ${hour}, so it is ${hour} o'clock.`
        }
      };
    }

    // pic_graph_total
    const a = randInt(2, 5);
    const b = randInt(3, 6);
    const c = randInt(2, 4);
    const ans = a + b + c;
    return {
      renderType: 'moneytime',
      mtType: 'graph',
      subskill: 'Reading Picture Graphs (Total)',
      en: `Look at the Picture Graph of favourite fruits in Primary 1A. How many children chose their favourite fruit <span class="kw-highlight">altogether</span>?`,
      speak: `Look at the Picture Graph of favourite fruits in Primary 1 A. How many children chose their favourite fruit altogether?`,
      hint: `💡 CPA Hint: Count the fruit icons in all 3 rows and add them together (${a} + ${b} + ${c})!`,
      rows: [
        { label: `Apple (${a})`, icon: '🍎', count: a },
        { label: `Mango (${b})`, icon: '🥭', count: b },
        { label: `Grape (${c})`, icon: '🍇', count: c }
      ],
      answer: ans,
      choices: makeChoices(ans, 3, [a + b, ans - 1, ans + 1]),
      explain: `Great graph reading! ${a} + ${b} + ${c} = ${ans} children altogether!`,
      dadTip: {
        howToAsk: `Teach the MOE habit of writing the count number at the end of each row on a Picture Graph before solving the question!`,
        psleConnection: `Annotating bar/picture graph values before calculating prevents careless reading mistakes in Data Analysis questions.`,
        englishScript: `Write the count for each row first: ${a} plus ${b} plus ${c} equals ${ans}.`
      }
    };
  }

  if (diff === 'core') {
    const mode = pickOne(['count_dollars', 'pic_graph_compare']);
    if (mode === 'count_dollars') {
      const n5 = randInt(1, 2);
      const n2 = randInt(1, 3);
      const total = n5 * 5 + n2 * 2;
      const notes = [...Array(n5).fill(5), ...Array(n2).fill(2)];
      return {
        renderType: 'moneytime',
        mtType: 'notes',
        subskill: 'Counting Singapore Dollar Notes ($2, $5, $10)',
        en: `Count the Singapore dollar notes in Dad's wallet. How many <span class="kw-highlight">dollars ($)</span> are there altogether?`,
        speak: `Count the Singapore dollar notes in Dad's wallet. How many dollars are there altogether?`,
        hint: `💡 CPA Hint: Add the green $5 note(s) (${n5 * 5}) and the purple $2 note(s) (${n2 * 2})!`,
        notes,
        answer: `$${total}`,
        choices: makeStringChoices(`$${total}`, [
          `$${total - 2}`,
          `$${total + 2}`,
          `$${total + 5}`,
          `$${n5 + n2}`
        ]),
        explain: `Awesome! $${n5 * 5} (from $5 notes) + $${n2 * 2} (from $2 notes) = $${total}!`,
        dadTip: {
          howToAsk: `Show real Singapore notes if you have them handy — kids love recognizing the purple $2 note and green $5 note!`,
          psleConnection: `Real-world money arithmetic is tested across all primary levels.`,
          englishScript: `${n5 * 5} dollars plus ${n2 * 2} dollars makes ${total} dollars!`
        }
      };
    }

    // pic_graph_compare
    const a = randInt(6, 9);
    const b = randInt(2, 5);
    const diffVal = a - b;
    return {
      renderType: 'moneytime',
      mtType: 'graph',
      subskill: 'Reading Picture Graphs ("How Many More")',
      en: `Look at the Picture Graph. <span class="kw-highlight">How many more</span> stars did Ali win than Ben?`,
      speak: `Look at the Picture Graph. How many more stars did Ali win than Ben?`,
      hint: `💡 CPA Hint: Compare Ali's row (${a}) and Ben's row (${b}). Find the difference: ${a} - ${b}!`,
      rows: [
        { label: `Ali (${a})`, icon: '⭐', count: a },
        { label: `Ben (${b})`, icon: '⭐', count: b }
      ],
      answer: diffVal,
      choices: makeChoices(diffVal, 1, [a + b, diffVal + 1, diffVal - 1]),
      explain: `Spot on! Ali has ${a} stars and Ben has ${b} stars, so Ali won ${a} - ${b} = ${diffVal} more stars!`,
      dadTip: {
        howToAsk: `Have your child pair up Ali's stars and Ben's stars one-to-one vertically, then count how many extra stars Ali has sticking out!`,
        psleConnection: `A horizontal Picture Graph is literally a Comparison Bar Model made of discrete icons!`,
        englishScript: `Ali has ${a} and Ben has ${b}. The difference is ${a} minus ${b}, which is ${diffVal}.`
      }
    };
  }

  // Challenge: Shopping Change / Make $1 (100 cents)
  const itemPrice = pickOne([60, 70, 80, 50]);
  const change = 100 - itemPrice;
  return {
    renderType: 'moneytime',
    mtType: 'coins',
    subskill: 'PSLE Seed: Making $1 (100¢) & Finding Change',
    en: `Hawker Challenge! A sticker book costs <span class="kw-highlight">${itemPrice}¢</span>. Mei pays the shopkeeper <span class="kw-highlight">$1 (100¢)</span>. How much <span class="kw-highlight">change</span> should she receive?`,
    speak: `Hawker Challenge! A sticker book costs ${itemPrice} cents. Mei pays the shopkeeper 1 dollar, which is 100 cents. How much change should she receive?`,
    hint: `💡 CPA Hint: $1 is equal to 100¢! Think of Ten-Friends scaled up by 10: ${itemPrice}¢ + ? = 100¢!`,
    coins: ['50¢', '50¢'],
    answer: `${change}¢`,
    choices: makeStringChoices(`${change}¢`, [
      `${change - 10}¢`,
      `${change + 10}¢`,
      `${itemPrice}¢`,
      `50¢`
    ]),
    explain: `Money Master! Since $1 = 100¢, her change is 100¢ - ${itemPrice}¢ = ${change}¢!`,
    dadTip: {
      howToAsk: `Connect this directly to Number Bonds of 10! Ask: "If 10 - ${itemPrice / 10} = ${change / 10}, then what is 100¢ - ${itemPrice}¢?" (${change}¢!).`,
      psleConnection: `Knowing that $1 = 100¢ and using Ten-Friends to make 100 (e.g., 60 + 40 = 100) is the foundation of decimal money calculations in P3–P6.`,
      englishScript: `One dollar is 100 cents. 100 cents minus ${itemPrice} cents gives ${change} cents change!`
    }
  };
}

// ==================== MASTER QUESTION DISPATCHER ====================
function createFreshQuestion() {
  for (let attempt = 0; attempt < 12; attempt++) {
    let q;
    if (state.topic === 'bonds') q = generateBondQuestion(state.difficulty);
    else if (state.topic === 'barmodel') q = generateBarModelQuestion(state.difficulty);
    else if (state.topic === 'wordprob') q = generateWordProblemQuestion(state.difficulty);
    else if (state.topic === 'patterns') q = generatePatternsQuestion(state.difficulty);
    else q = generateMoneyTimeQuestion(state.difficulty);

    const sig = `${state.topic}:${q.en}`;
    if (!recentSignatures.includes(sig) || attempt === 11) {
      recentSignatures.push(sig);
      if (recentSignatures.length > 18) recentSignatures.shift();
      return q;
    }
  }
}

// ==================== SPEECH SYNTHESIS HELPER ====================
function speakEnglish(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/<[^>]*>/g, '');
  const utter = new SpeechSynthesisUtterance(cleanText);
  utter.lang = 'en-SG';
  utter.rate = 0.92;
  utter.pitch = 1.05;
  window.speechSynthesis.speak(utter);
}

// ==================== RENDER & UI LOGIC ====================
function getUnlockedStickerCount() {
  return STICKER_BOOK.filter((s) => (state.worldSolved[s.world] || 0) >= s.req).length;
}

function updateHeaderAndPetUI() {
  const activeProf = getActiveProfile();
  const avatarEl = document.getElementById('activeProfileAvatar');
  const nameEl = document.getElementById('activeProfileName');
  if (avatarEl) avatarEl.textContent = activeProf.avatar || '🦁';
  if (nameEl) nameEl.textContent = activeProf.childName || 'Junior';

  document.getElementById('starCount').textContent = state.stars;
  document.getElementById('shopStarBalance').textContent = state.stars;

  const unlockedStickers = getUnlockedStickerCount();
  document.getElementById('stickerCountLabel').textContent = `${unlockedStickers}/15`;

  // World solved badges on Adventure Map
  ['bonds', 'barmodel', 'wordprob', 'patterns', 'moneytime'].forEach((w) => {
    const el = document.getElementById(`prog-${w}`);
    if (el) {
      const cnt = state.worldSolved[w] || 0;
      const worldStickers = Math.min(3, Math.floor(cnt / 3));
      el.textContent = `${cnt} solved • ${'🌟'.repeat(worldStickers)}${'⚪'.repeat(3 - worldStickers)}`;
    }
  });

  // Level & XP
  const titles = [
    'P1 Rookie',
    'Number Bond Explorer',
    'Bar Model Builder',
    'Heuristic Detective',
    'PSLE AL1 Scholar'
  ];
  const titleIdx = Math.min(state.level - 1, titles.length - 1);
  document.getElementById('petLevelBadge').textContent = `Level ${state.level} • ${titles[titleIdx]}`;
  document.getElementById('xpText').textContent = `${state.xp} / 100 XP`;
  document.getElementById('xpFill').style.width = `${Math.min(100, state.xp)}%`;
  document.getElementById('xpProgressBar').setAttribute('aria-valuenow', state.xp);

  // Equipped accessories
  document.getElementById('petHatDisplay').textContent = state.equippedHat || '';
  document.getElementById('petItemDisplay').textContent = state.equippedItem || '';

  // Sound toggle button
  const soundBtn = document.getElementById('toggleSoundBtn');
  if (soundBtn) {
    soundBtn.textContent = state.soundOn ? '🔔 Sound FX: ON' : '🔕 Sound FX: OFF';
  }

  // Daily 5 dots
  const dots = document.querySelectorAll('#dailyDotsContainer .quest-dot');
  dots.forEach((dot, idx) => {
    if (idx < state.dailyDone) {
      dot.classList.add('done');
      dot.textContent = '✓';
    } else {
      dot.classList.remove('done');
      dot.textContent = String(idx + 1);
    }
  });
}

function triggerPetBounce(speechText, moodText = '🤩 Awesome!') {
  const charEl = document.getElementById('petCharacter');
  const bubbleEl = document.getElementById('petSpeechBubble');
  const moodEl = document.getElementById('petMoodText');
  if (speechText) bubbleEl.textContent = `"${speechText}"`;
  if (moodText) moodEl.textContent = moodText;
  charEl.classList.remove('bounce');
  void charEl.offsetWidth;
  charEl.classList.add('bounce');
  setTimeout(() => charEl.classList.remove('bounce'), 500);
}

function recordSkillAttempt(isFirstTryCorrect, timeSpentMs) {
  if (!currentQuestion) return;
  const key = currentQuestion.subskill || 'General P1 Skill';
  if (!state.skillStats) state.skillStats = {};
  if (!state.skillStats[key]) {
    state.skillStats[key] = {
      world: state.topic,
      difficulty: state.difficulty,
      attempts: 0,
      firstTryCorrect: 0,
      totalTimeMs: 0
    };
  }
  const entry = state.skillStats[key];
  entry.attempts += 1;
  if (isFirstTryCorrect) entry.firstTryCorrect += 1;
  entry.totalTimeMs += Math.min(timeSpentMs, 60000);
}

function awardProgress(starsEarned, xpEarned) {
  const prevWorldSolved = state.worldSolved[state.topic] || 0;
  const newWorldSolved = prevWorldSolved + 1;
  state.worldSolved[state.topic] = newWorldSolved;
  state.totalSolved += 1;

  state.stars += starsEarned;
  state.xp += xpEarned;

  let specialAnnouncement = null;

  // Check if a new sticker was just unlocked (at 3, 6, or 9 solved in this world)
  if (newWorldSolved === 3 || newWorldSolved === 6 || newWorldSolved === 9) {
    const newSticker = STICKER_BOOK.find((s) => s.world === state.topic && s.req === newWorldSolved);
    if (newSticker) {
      playSoundFX('fanfare');
      specialAnnouncement = `NEW STICKER UNLOCKED: ${newSticker.emojiDisplay || newSticker.emoji} ${newSticker.title}! Check your Sticker Book!`;
    }
  }

  // Check Daily Quest 5-question bonus chest
  if (state.dailyDone < 5) {
    state.dailyDone += 1;
    if (state.dailyDone === 5 && !state.dailyBonusClaimed) {
      state.dailyBonusClaimed = true;
      state.stars += 15;
      playSoundFX('fanfare');
      specialAnnouncement = `🎉 DAILY QUEST COMPLETE! You won the Bonus Chest (+15 ⭐)!`;
    }
  }

  // Check Level Up
  if (state.xp >= 100) {
    state.xp -= 100;
    state.level += 1;
    playSoundFX('fanfare');
    if (!specialAnnouncement) {
      specialAnnouncement = `Hooray! Merli leveled up to Level ${state.level}! 🎉`;
    }
  }

  saveState();
  updateHeaderAndPetUI();
  triggerBackgroundCloudSync();

  if (specialAnnouncement) {
    triggerPetBounce(specialAnnouncement, '🥳 Superstar!');
  }
}

// ==================== PARENT ANALYTICS & WEAKNESS ENGINE ====================
function renderParentAnalyticsDashboard() {
  const activeProf = getActiveProfile();
  document.getElementById('reportChildName').textContent = `${activeProf.avatar} ${activeProf.childName}`;

  const statsEntries = Object.entries(state.skillStats || {});
  let totalAtt = 0;
  let totalFirstCorrect = 0;
  let totalMs = 0;

  statsEntries.forEach(([, st]) => {
    totalAtt += st.attempts || 0;
    totalFirstCorrect += st.firstTryCorrect || 0;
    totalMs += st.totalTimeMs || 0;
  });

  const accPct = totalAtt > 0 ? Math.round((totalFirstCorrect / totalAtt) * 100) : null;
  const avgSec = totalAtt > 0 ? (totalMs / totalAtt / 1000).toFixed(1) : null;

  document.getElementById('kpiAccuracy').textContent = accPct !== null ? `${accPct}%` : '--%';
  document.getElementById('kpiTotalSolved').textContent = state.totalSolved || 0;
  document.getElementById('kpiTotalAttemptsSub').textContent = `${totalAtt} tracked skill attempts`;
  document.getElementById('kpiAvgSpeed').textContent = avgSec !== null ? `${avgSec}s` : '--s';
  document.getElementById('kpiStickers').textContent = `${getUnlockedStickerCount()} / 15`;

  // Weakness Radar
  const radarContainer = document.getElementById('weaknessListContainer');
  radarContainer.innerHTML = '';

  const weakSkills = statsEntries
    .map(([name, st]) => ({
      name,
      ...st,
      acc: st.attempts > 0 ? Math.round((st.firstTryCorrect / st.attempts) * 100) : 100,
      avgS: st.attempts > 0 ? st.totalTimeMs / st.attempts / 1000 : 0
    }))
    .filter((item) => item.acc < 80 || item.avgS > 18)
    .sort((a, b) => a.acc - b.acc);

  if (statsEntries.length === 0) {
    radarContainer.innerHTML = `
      <p style="font-size: 0.88rem; color: #7c2d12;">
        No diagnostic data yet for <strong>${activeProf.childName}</strong>. Have your child solve 3–5 questions in Kid's Adventure to generate real-time weakness diagnostics!
      </p>
    `;
  } else if (weakSkills.length === 0) {
    radarContainer.innerHTML = `
      <p style="font-size: 0.88rem; color: #166534; font-weight: 700;">
        🌟 Outstanding! ${activeProf.childName} has ≥ 80% first-try accuracy across all practiced skills. Try switching difficulty to "🚀 Core" or "🏆 Challenge (PSLE Seeds)"!
      </p>
    `;
  } else {
    weakSkills.forEach((ws) => {
      const div = document.createElement('div');
      div.className = 'weakness-item';
      div.innerHTML = `
        <div>
          <strong>⚠️ ${ws.name}</strong>
          <div style="font-size: 0.78rem; color: #7c2d12;">
            First-Try Accuracy: <strong>${ws.acc}%</strong> (${ws.firstTryCorrect}/${ws.attempts}) • Avg Speed: <strong>${ws.avgS.toFixed(1)}s</strong>
          </div>
        </div>
        <button type="button" class="btn-outline-sm" data-world="${ws.world}" data-diff="${ws.difficulty || 'starter'}">
          🎯 Coach &amp; Practice Now
        </button>
      `;
      div.querySelector('button').addEventListener('click', () => {
        jumpToWorldPractice(ws.world, ws.difficulty || 'starter');
      });
      radarContainer.appendChild(div);
    });
  }

  // Skill Breakdown Table
  const tbody = document.getElementById('skillTableBody');
  tbody.innerHTML = '';

  const worldNames = {
    bonds: '🌊 Merlion Bay',
    barmodel: '🎡 Marina Flyer',
    wordprob: '🌳 Gardens by the Bay',
    patterns: '🦖 Sentosa Island',
    moneytime: '✈️ Jewel Changi'
  };

  if (statsEntries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: #64748b; padding: 1.2rem;">
          Solve questions in Kid's Adventure to populate the skill mastery table.
        </td>
      </tr>
    `;
    return;
  }

  statsEntries.forEach(([subskillName, st]) => {
    const acc = st.attempts > 0 ? Math.round((st.firstTryCorrect / st.attempts) * 100) : 0;
    const avgS = st.attempts > 0 ? (st.totalTimeMs / st.attempts / 1000).toFixed(1) : '0.0';
    let badgeClass = 'status-mastered';
    let badgeText = '🟢 Mastered (AL1)';
    if (acc < 65) {
      badgeClass = 'status-weak';
      badgeText = '🔴 Needs Coaching';
    } else if (acc < 85) {
      badgeClass = 'status-developing';
      badgeText = '🟡 Developing';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${subskillName}</strong></td>
      <td>${worldNames[st.world] || st.world}</td>
      <td>${st.attempts}</td>
      <td><strong>${acc}%</strong> (${st.firstTryCorrect}/${st.attempts})</td>
      <td>${avgS}s</td>
      <td><span class="status-pill ${badgeClass}">${badgeText}</span></td>
      <td>
        <button type="button" class="btn-outline-sm" style="padding: 0.22rem 0.55rem; font-size: 0.76rem;">
          Practice ➡️
        </button>
      </td>
    `;
    tr.querySelector('button').addEventListener('click', () => {
      jumpToWorldPractice(st.world, st.difficulty || 'starter');
    });
    tbody.appendChild(tr);
  });
}

function jumpToWorldPractice(world, difficulty) {
  state.topic = world;
  state.difficulty = difficulty;
  saveState();

  document.getElementById('difficultySelect').value = difficulty;
  document.querySelectorAll('.island-tab').forEach((t) => {
    const active = t.dataset.topic === world;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  // Switch back to Kid View
  document.getElementById('tabKidBtn').click();
  loadQuestion();
}

// ==================== MULTI-USER & CLOUDFLARE SYNC LOGIC ====================
function renderAccountModal() {
  const listEl = document.getElementById('profilesListGrid');
  listEl.innerHTML = '';

  account.profiles.forEach((prof) => {
    const isActive = prof.id === account.activeProfileId;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `profile-card-btn ${isActive ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="profile-card-emoji">${prof.avatar || '🦁'}</span>
      <div>
        <strong>${prof.childName} ${isActive ? '✓' : ''}</strong>
        <div style="font-size: 0.75rem; color: #475569;">
          ⭐ ${prof.state?.stars ?? 25} • 🏆 ${prof.state?.totalSolved ?? 0} solved
        </div>
      </div>
    `;
    btn.addEventListener('click', () => {
      account.activeProfileId = prof.id;
      state = prof.state;
      saveState();
      updateHeaderAndPetUI();
      renderAccountModal();
      renderParentAnalyticsDashboard();
      loadQuestion();
    });
    listEl.appendChild(btn);
  });

  document.getElementById('cloudEmailInput').value = account.parentEmail || '';
  document.getElementById('cloudApiUrlInput').value = account.cloudApiUrl || '';
}

async function triggerBackgroundCloudSync() {
  if (!account.cloudApiUrl || !account.parentId) return;
  const activeProf = getActiveProfile();
  try {
    await fetch(`${account.cloudApiUrl.replace(/\/$/, '')}/api/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parentId: account.parentId,
        childId: activeProf.id,
        childName: activeProf.childName,
        avatar: activeProf.avatar,
        state: activeProf.state
      })
    });
  } catch {
    // offline-first resilience
  }
}

// ==================== VISUAL WORKSPACE RENDERERS ====================
function renderNumberBondWorkspace(q, revealedAnswer = null) {
  const wholeVal = q.whole === '?' ? (revealedAnswer ?? '?') : q.whole;
  const p1Val = q.part1 === '?' ? (revealedAnswer ?? '?') : q.part1;
  const p2Val = q.part2 === '?' ? (revealedAnswer ?? '?') : q.part2;

  const isWholeMissing = q.whole === '?' && revealedAnswer === null;
  const isP1Missing = q.part1 === '?' && revealedAnswer === null;
  const isP2Missing = q.part2 === '?' && revealedAnswer === null;

  const count1 = typeof q.part1 === 'number' ? q.part1 : q.answer;
  const count2 = typeof q.part2 === 'number' ? q.part2 : q.answer;

  return `
    <div class="nb-diagram">
      <div class="nb-svg-wrapper">
        <svg class="nb-lines" viewBox="0 0 320 195" aria-hidden="true">
          <line x1="160" y1="55" x2="67" y2="145" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
          <line x1="160" y1="55" x2="253" y2="145" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
        </svg>

        <div class="nb-node nb-node-whole ${isWholeMissing ? 'nb-missing' : ''}">
          <span class="nb-role-label">Whole</span>
          <span class="nb-val">${wholeVal}</span>
        </div>

        <div class="nb-node nb-node-part1 ${isP1Missing ? 'nb-missing' : ''}">
          <span class="nb-role-label">Part</span>
          <span class="nb-val">${p1Val}</span>
        </div>

        <div class="nb-node nb-node-part2 ${isP2Missing ? 'nb-missing' : ''}">
          <span class="nb-role-label">Part</span>
          <span class="nb-val">${p2Val}</span>
        </div>
      </div>

      <div class="nb-counters-tray" aria-label="Concrete visual counters">
        <div class="counter-group" title="Part 1 Counters">
          ${q.emoji1.repeat(Math.min(count1, 10))}
        </div>
        <div class="counter-group" title="Part 2 Counters">
          ${q.emoji2.repeat(Math.min(count2, 10))}
        </div>
      </div>
    </div>
  `;
}

function renderBarModelWorkspace(q, revealedAnswer = null) {
  if (q.modelType === 'part-whole') {
    const totalDisplay = q.total === '?' ? (revealedAnswer ?? '?') : q.total;
    const partBVal = q.partB.val === '?' ? (revealedAnswer ?? '?') : q.partB.val;
    const isPartBMissing = q.partB.val === '?' && revealedAnswer === null;

    return `
      <div class="bm-container">
        <div class="bm-total-bracket">
          Whole / Total: <strong>${totalDisplay}</strong>
        </div>
        <div class="bm-row">
          <span class="bm-row-label">Bar Model:</span>
          <div class="bm-track">
            <div class="bm-segment bm-seg-${q.partA.color}" style="flex: 55;">
              <span class="bm-seg-title">${q.partA.label}</span>
              <span class="bm-seg-val">${q.partA.val}</span>
            </div>
            <div class="bm-segment ${isPartBMissing ? 'bm-seg-missing' : 'bm-seg-orange'}" style="flex: 45;">
              <span class="bm-seg-title">${q.partB.label}</span>
              <span class="bm-seg-val">${partBVal}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (q.modelType === 'comparison') {
    const totalB = q.rowB.totalLabel === '?' ? (revealedAnswer ?? '?') : q.rowB.totalLabel;
    return `
      <div class="bm-container">
        <div class="bm-row">
          <span class="bm-row-label">${q.rowA.name}:</span>
          <div class="bm-track">
            <div class="bm-segment bm-seg-blue" style="flex: 62;">
              <span class="bm-seg-val">${q.rowA.val}</span>
            </div>
            <div style="flex: 38;"></div>
          </div>
        </div>
        <div class="bm-row">
          <span class="bm-row-label">${q.rowB.name} (${totalB}):</span>
          <div class="bm-track">
            <div class="bm-segment bm-seg-blue" style="flex: 62;">
              <span class="bm-seg-title">Same (${q.rowB.baseVal})</span>
              <span class="bm-seg-val">${q.rowB.baseVal}</span>
            </div>
            <div class="bm-segment bm-seg-diff" style="flex: 38;">
              <span class="bm-seg-title">Difference</span>
              <span class="bm-seg-val">${q.rowB.diffVal}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // comparison-fewer
  const samVal = q.rowB.val === '?' ? (revealedAnswer ?? '?') : q.rowB.val;
  const diffDisplay = q.rowB.diffVal.includes('?') && revealedAnswer !== null
    ? `${revealedAnswer} more`
    : q.rowB.diffVal;
  return `
    <div class="bm-container">
      <div class="bm-row">
        <span class="bm-row-label">${q.rowA.name}:</span>
        <div class="bm-track">
          <div class="bm-segment bm-seg-blue" style="flex: 100;">
            <span class="bm-seg-title">Longer bar</span>
            <span class="bm-seg-val">${q.rowA.val}</span>
          </div>
        </div>
      </div>
      <div class="bm-row">
        <span class="bm-row-label">${q.rowB.name}:</span>
        <div class="bm-track">
          <div class="bm-segment bm-seg-green" style="flex: 62;">
            <span class="bm-seg-title">${q.rowB.name}</span>
            <span class="bm-seg-val">${samVal}</span>
          </div>
          <div class="bm-segment bm-seg-diff" style="flex: 38;">
            <span class="bm-seg-title">Difference</span>
            <span class="bm-seg-val">${diffDisplay}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderWordProbWorkspace(q) {
  return `
    <div class="nb-counters-tray" style="width: 100%; max-width: 560px; justify-content: space-around; padding: 1.1rem;">
      <div style="text-align: center;">
        <div style="font-weight: 800; font-size: 0.85rem; color: #334155; margin-bottom: 0.4rem;">
          ${q.emojiGroupA.label}
        </div>
        <div class="counter-group" style="font-size: 1.6rem;">
          ${q.emojiGroupA.icon.repeat(Math.min(q.emojiGroupA.count, 12))}
        </div>
      </div>

      <div style="text-align: center;">
        <div style="font-weight: 800; font-size: 0.85rem; color: #334155; margin-bottom: 0.4rem;">
          ${q.emojiGroupB.label}
        </div>
        <div class="counter-group" style="font-size: 1.6rem;">
          ${q.emojiGroupB.count <= 10 && q.emojiGroupB.icon.length <= 2
            ? q.emojiGroupB.icon.repeat(q.emojiGroupB.count)
            : q.emojiGroupB.icon}
        </div>
      </div>
    </div>
  `;
}

function renderPatternsWorkspace(q, revealedAnswer = null) {
  if (q.patternType === 'ordinal') {
    return `
      <div style="width: 100%; max-width: 540px; display: flex; flex-direction: column; align-items: center; gap: 0.85rem;">
        <div class="ordinal-banner">
          <span>⬅️ LEFT</span>
          <span>RIGHT ➡️</span>
        </div>
        <div class="pattern-seq-row">
          ${q.items
            .map(
              (item) => `
            <div class="pattern-tile">
              <span>${item}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="pattern-seq-row">
      ${q.sequence
        .map((val) => {
          const isMiss = val === '?' && revealedAnswer === null;
          const display = val === '?' ? (revealedAnswer ?? '?') : val;
          return `
            <div class="pattern-tile ${isMiss ? 'missing' : ''}">
              <span>${display}</span>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderMoneyTimeWorkspace(q) {
  if (q.mtType === 'coins') {
    return `
      <div class="money-tray">
        ${q.coins
          .map(
            (c) => `
          <div class="sg-coin ${c === '50¢' ? 'silver' : ''}">
            <small>SG Coin</small>
            <strong>${c}</strong>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  if (q.mtType === 'notes') {
    return `
      <div class="money-tray">
        ${q.notes
          .map(
            (n) => `
          <div class="sg-note sg-note-${n}">
            <small style="font-size: 0.65rem; opacity: 0.9;">SINGAPORE</small>
            <strong style="font-size: 1.35rem;">$${n}</strong>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  if (q.mtType === 'clock') {
    const hourAngle = (q.hour % 12) * 30;
    return `
      <div style="text-align: center;">
        <svg width="165" height="165" viewBox="0 0 160 160" aria-label="Analog clock showing ${q.hour} o'clock">
          <circle cx="80" cy="80" r="72" fill="#ffffff" stroke="#2563eb" stroke-width="6" />
          <text x="80" y="26" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="15" fill="#0f172a">12</text>
          <text x="136" y="85" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="15" fill="#0f172a">3</text>
          <text x="80" y="144" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="15" fill="#0f172a">6</text>
          <text x="24" y="85" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="15" fill="#0f172a">9</text>
          <!-- Minute hand pointing to 12 -->
          <line x1="80" y1="80" x2="80" y2="30" stroke="#16a34a" stroke-width="4" stroke-linecap="round" />
          <!-- Hour hand -->
          <line x1="80" y1="80" x2="80" y2="44" stroke="#dc2626" stroke-width="6" stroke-linecap="round" transform="rotate(${hourAngle} 80 80)" />
          <circle cx="80" cy="80" r="5" fill="#0f172a" />
        </svg>
      </div>
    `;
  }

  // Picture Graph
  return `
    <div class="pic-graph-box">
      ${q.rows
        .map(
          (r) => `
        <div class="pic-graph-row">
          <span class="pic-graph-label">${r.label}</span>
          <span class="pic-graph-icons">${r.icon.repeat(r.count)}</span>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}

// ==================== LOAD ACTIVE QUESTION ====================
function loadQuestion() {
  currentQuestion = createFreshQuestion();
  questionStartTime = Date.now();
  wrongClicksThisQuestion = 0;

  const worldLabels = {
    bonds: '🌊 Merlion Bay • Number Bonds',
    barmodel: '🎡 Marina Flyer • Bar Models',
    wordprob: '🌳 Gardens by the Bay • Word Problems',
    patterns: '🦖 Sentosa Island • Patterns & Ordinals',
    moneytime: '✈️ Jewel Changi • Money, Time & Graphs'
  };
  document.getElementById('questionTopicBadge').textContent = worldLabels[state.topic];
  document.getElementById('questionSubskillBadge').textContent = currentQuestion.subskill;

  // Prompt & Hint
  document.getElementById('questionTextEn').innerHTML = currentQuestion.en;
  const hintEl = document.getElementById('questionHintText');
  hintEl.textContent = currentQuestion.hint;
  hintEl.hidden = !state.showHint;

  // Render Workspace
  renderWorkspaceState(null);

  // Render Choices
  const grid = document.getElementById('choicesGrid');
  grid.innerHTML = '';
  currentQuestion.choices.forEach((choiceVal) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = choiceVal;
    btn.addEventListener('click', () => handleChoiceClick(choiceVal, btn));
    grid.appendChild(btn);
  });

  // Hide feedback banner
  document.getElementById('feedbackBanner').hidden = true;
}

function renderWorkspaceState(revealedAnswer) {
  const ws = document.getElementById('visualWorkspace');
  if (currentQuestion.renderType === 'bonds') {
    ws.innerHTML = renderNumberBondWorkspace(currentQuestion, revealedAnswer);
  } else if (currentQuestion.renderType === 'barmodel') {
    ws.innerHTML = renderBarModelWorkspace(currentQuestion, revealedAnswer);
  } else if (currentQuestion.renderType === 'wordprob') {
    ws.innerHTML = renderWordProbWorkspace(currentQuestion, revealedAnswer);
  } else if (currentQuestion.renderType === 'patterns') {
    ws.innerHTML = renderPatternsWorkspace(currentQuestion, revealedAnswer);
  } else {
    ws.innerHTML = renderMoneyTimeWorkspace(currentQuestion, revealedAnswer);
  }
}

function handleChoiceClick(selectedVal, btnEl) {
  const banner = document.getElementById('feedbackBanner');
  const iconEl = document.getElementById('feedbackIcon');
  const titleEl = document.getElementById('feedbackTitle');
  const explainEl = document.getElementById('feedbackExplain');

  if (selectedVal === currentQuestion.answer) {
    playSoundFX('correct');
    btnEl.classList.add('correct');
    document.querySelectorAll('#choicesGrid .choice-btn').forEach((b) => {
      b.disabled = true;
    });

    const elapsedMs = Date.now() - questionStartTime;
    recordSkillAttempt(wrongClicksThisQuestion === 0, elapsedMs);

    renderWorkspaceState(currentQuestion.answer);

    banner.hidden = false;
    banner.className = 'feedback-banner is-correct';
    iconEl.textContent = '🎉';
    titleEl.textContent = 'Correct! You earned +5 ⭐ and +20 XP!';
    explainEl.textContent = currentQuestion.explain;

    triggerPetBounce('Awesome job! You solved it like a Singapore Math champion! +5 ⭐', '🤩 Proud');
    awardProgress(5, 20);
  } else {
    wrongClicksThisQuestion += 1;
    playSoundFX('wrong');
    btnEl.classList.add('wrong');
    btnEl.disabled = true;

    banner.hidden = false;
    banner.className = 'feedback-banner is-wrong';
    iconEl.textContent = '💡';
    titleEl.textContent = 'Almost! Let us check the diagram together:';
    explainEl.textContent = currentQuestion.hint;
    triggerPetBounce('No worries! Check the hint and try another choice!', '💪 Keep going!');
  }
}

// ==================== DIALOGS & LIGHT DISMISS FALLBACK ====================
function setupDialogFallbacks() {
  // Mandatory fallback for browsers without native <dialog closedby="any"> support
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    document.querySelectorAll('dialog[closedby="any"]').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      });
    });
  }
}

function openDadTipModal() {
  if (!currentQuestion) return;
  const tip = currentQuestion.dadTip;
  document.getElementById('dadTipHowToAsk').textContent = tip.howToAsk;
  document.getElementById('dadTipPsleConnection').textContent = tip.psleConnection;
  document.getElementById('dadTipEnglishScript').textContent = `"${tip.englishScript}"`;

  document.getElementById('dadTipDialog').showModal();
}

function renderStickerBookModal() {
  const grid = document.getElementById('stickerBookGrid');
  const unlockedCount = getUnlockedStickerCount();
  document.getElementById('stickerModalCount').textContent = `${unlockedCount} / 15`;
  grid.innerHTML = '';

  STICKER_BOOK.forEach((s) => {
    const solvedInWorld = state.worldSolved[s.world] || 0;
    const isUnlocked = solvedInWorld >= s.req;
    const card = document.createElement('div');
    card.className = `sticker-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    const icon = s.emojiDisplay || s.emoji;
    card.innerHTML = `
      <span class="sticker-emoji">${isUnlocked ? icon : '🔒'}</span>
      <strong class="sticker-title">${s.title}</strong>
      <span class="sticker-sub">${s.worldName} (${Math.min(solvedInWorld, s.req)}/${s.req} solved)</span>
    `;
    grid.appendChild(card);
  });
}

function renderShopModal() {
  const grid = document.getElementById('shopItemsGrid');
  document.getElementById('shopStarBalance').textContent = state.stars;
  grid.innerHTML = '';

  SHOP_ITEMS.forEach((item) => {
    const owned = state.ownedItems.includes(item.id);
    const isEquipped =
      (item.type === 'hat' && state.equippedHat === item.emoji) ||
      (item.type === 'item' && state.equippedItem === item.emoji);

    const card = document.createElement('div');
    card.className = 'shop-item-card';

    let btnLabel = `Redeem (${item.cost} ⭐)`;
    if (owned) {
      btnLabel = isEquipped ? 'Equipped ✓' : 'Equip';
    }

    card.innerHTML = `
      <div class="shop-item-info">
        <span class="shop-emoji">${item.emoji}</span>
        <div>
          <strong>${item.name}</strong>
          <div style="font-size: 0.78rem; color: #64748b;">${item.type === 'hat' ? 'Headgear' : 'Badge'}</div>
        </div>
      </div>
      <button type="button" class="shop-buy-btn ${isEquipped ? 'equipped' : ''}">
        ${btnLabel}
      </button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      if (!owned) {
        if (state.stars < item.cost) {
          alert(`You need ${item.cost - state.stars} more ⭐ to unlock ${item.name}!`);
          return;
        }
        state.stars -= item.cost;
        state.ownedItems.push(item.id);
        playSoundFX('fanfare');
      }

      if (item.type === 'hat') {
        state.equippedHat = isEquipped ? '' : item.emoji;
      } else {
        state.equippedItem = isEquipped ? '' : item.emoji;
      }

      saveState();
      updateHeaderAndPetUI();
      renderShopModal();
      triggerPetBounce(`Thank you! I love wearing the ${item.name}!`, '🥰 Happy');
    });

    grid.appendChild(card);
  });
}

function renderVocabCards() {
  const grid = document.getElementById('vocabGrid');
  grid.innerHTML = '';
  MOE_VOCAB.forEach((v) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vocab-chip';
    btn.innerHTML = `
      <div>
        <strong>${v.en}</strong>
        <span>${v.desc}</span>
      </div>
      <span aria-hidden="true">🔊</span>
    `;
    btn.addEventListener('click', () => {
      speakEnglish(`${v.en}. ${v.sample}`);
    });
    grid.appendChild(btn);
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  setupDialogFallbacks();
  updateHeaderAndPetUI();
  renderVocabCards();

  // Difficulty Selector
  const diffSelect = document.getElementById('difficultySelect');
  diffSelect.value = state.difficulty;
  diffSelect.addEventListener('change', (e) => {
    state.difficulty = e.target.value;
    saveState();
    loadQuestion();
  });

  // Sound FX Toggle
  document.getElementById('toggleSoundBtn').addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    saveState();
    updateHeaderAndPetUI();
    if (state.soundOn) playSoundFX('correct');
  });

  // Mode Switcher (Kid vs Parent Analytics)
  const tabKidBtn = document.getElementById('tabKidBtn');
  const tabDadBtn = document.getElementById('tabDadBtn');
  const kidView = document.getElementById('kidView');
  const dadView = document.getElementById('dadView');

  tabKidBtn.addEventListener('click', () => {
    tabKidBtn.classList.add('active');
    tabDadBtn.classList.remove('active');
    kidView.hidden = false;
    dadView.hidden = true;
  });

  tabDadBtn.addEventListener('click', () => {
    tabDadBtn.classList.add('active');
    tabKidBtn.classList.remove('active');
    dadView.hidden = false;
    kidView.hidden = true;
    renderParentAnalyticsDashboard();
  });

  // 5 Island Tabs on Adventure Map
  document.querySelectorAll('.island-tab').forEach((tab) => {
    if (tab.dataset.topic === state.topic) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    } else {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    }

    tab.addEventListener('click', () => {
      document.querySelectorAll('.island-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      state.topic = tab.dataset.topic;
      saveState();
      loadQuestion();
    });
  });

  // Action Buttons
  document.getElementById('speakQuestionBtn').addEventListener('click', () => {
    if (currentQuestion) speakEnglish(currentQuestion.speak);
  });

  document.getElementById('toggleHintBtn').addEventListener('click', () => {
    state.showHint = !state.showHint;
    document.getElementById('questionHintText').hidden = !state.showHint;
    saveState();
  });

  document.getElementById('skipQuestionBtn').addEventListener('click', () => {
    loadQuestion();
  });

  document.getElementById('openDadTipBtn').addEventListener('click', openDadTipModal);

  document.getElementById('speakDadScriptBtn').addEventListener('click', () => {
    if (currentQuestion) speakEnglish(currentQuestion.dadTip.englishScript);
  });

  document.getElementById('nextQuestionBtn').addEventListener('click', () => {
    loadQuestion();
  });

  // Pet Quick Actions
  document.getElementById('quickFeedBtn').addEventListener('click', () => {
    if (state.stars < 5) {
      triggerPetBounce('Solve 1 more question to earn 5 ⭐ for yummy Kaya Toast!', '😋 Hungry');
      return;
    }
    state.stars -= 5;
    state.xp = Math.min(100, state.xp + 15);
    playSoundFX('correct');
    saveState();
    updateHeaderAndPetUI();
    triggerPetBounce('Yum! Crispy Singapore Kaya Toast! +15 XP!', '😋 Super Full');
  });

  document.getElementById('petTalkBtn').addEventListener('click', () => {
    const cheers = [
      'You are a Singapore Math superstar! Let us make ten together!',
      'Bar models make big problems super easy!',
      'Every 3 questions unlocks a shiny new Singapore sticker!'
    ];
    const msg = cheers[Math.floor(Math.random() * cheers.length)];
    triggerPetBounce(msg, '🦁 Cheering!');
    speakEnglish(msg);
  });

  // Sticker Book Modal Opener
  document.getElementById('openStickerBookBtn').addEventListener('click', () => {
    renderStickerBookModal();
    document.getElementById('stickerDialog').showModal();
  });

  // Shop Modal Openers
  const openShop = () => {
    renderShopModal();
    document.getElementById('petShopDialog').showModal();
  };
  document.getElementById('openPetShopBtn').addEventListener('click', openShop);
  document.getElementById('openPetShopMiniBtn').addEventListener('click', openShop);

  // Account & Multi-Profile Modal Openers
  const openAccount = () => {
    renderAccountModal();
    document.getElementById('accountDialog').showModal();
  };
  document.getElementById('openAccountBtn').addEventListener('click', openAccount);
  document.getElementById('openAccountFromReportBtn').addEventListener('click', openAccount);

  // Add Student Profile
  document.getElementById('addProfileBtn').addEventListener('click', () => {
    const nameInput = document.getElementById('newProfileNameInput');
    const avatarSelect = document.getElementById('newProfileAvatar');
    const name = nameInput.value.trim();
    if (!name) return;

    const newId = `child-${Date.now()}`;
    const newProf = {
      id: newId,
      childName: name,
      avatar: avatarSelect.value || '🦁',
      state: structuredClone(defaultState)
    };
    account.profiles.push(newProf);
    account.activeProfileId = newId;
    state = newProf.state;
    nameInput.value = '';
    saveState();
    updateHeaderAndPetUI();
    renderAccountModal();
    renderParentAnalyticsDashboard();
    loadQuestion();
    playSoundFX('fanfare');
  });

  // Cloud Sign In / Sync Button
  document.getElementById('cloudLoginBtn').addEventListener('click', async () => {
    const email = document.getElementById('cloudEmailInput').value.trim().toLowerCase();
    const password = document.getElementById('cloudPasswordInput').value;
    const apiUrl = document.getElementById('cloudApiUrlInput').value.trim();
    const statusEl = document.getElementById('cloudStatusMsg');

    if (!email || password.length < 4) {
      statusEl.textContent = '⚠️ Enter a valid email & password (min 4 chars).';
      return;
    }

    account.parentEmail = email;
    account.cloudApiUrl = apiUrl;
    saveState();

    if (apiUrl) {
      statusEl.textContent = '⏳ Connecting to Cloudflare D1 Worker...';
      try {
        const base = apiUrl.replace(/\/$/, '');
        let res = await fetch(`${base}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (res.status === 401) {
          const activeProf = getActiveProfile();
          res = await fetch(`${base}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
              parentName: email.split('@')[0],
              childName: activeProf.childName,
              childAvatar: activeProf.avatar,
              initialState: activeProf.state
            })
          });
        }
        const data = await res.json();
        if (data.ok && data.parent) {
          account.parentId = data.parent.id;
          if (Array.isArray(data.children) && data.children.length > 0) {
            account.profiles = data.children.map((c) => ({
              id: c.id,
              childName: c.childName,
              avatar: c.avatar || '🦁',
              state: normalizeChildState(c.state)
            }));
            account.activeProfileId = account.profiles[0].id;
            state = account.profiles[0].state;
          }
          saveState();
          updateHeaderAndPetUI();
          renderAccountModal();
          statusEl.textContent = `✅ Synced with Cloudflare D1 (${email})!`;
          playSoundFX('fanfare');
          return;
        }
      } catch {
        statusEl.textContent = `✅ Saved locally for ${email} (Cloudflare endpoint offline).`;
        return;
      }
    }

    statusEl.textContent = `✅ Account (${email}) saved & active!`;
    playSoundFX('correct');
  });

  // Instant Transfer Code (Export / Import)
  document.getElementById('exportSyncCodeBtn').addEventListener('click', () => {
    saveState();
    const code = btoa(encodeURIComponent(JSON.stringify(account)));
    const input = document.getElementById('syncCodeInput');
    input.value = code;
    input.select();
    navigator.clipboard?.writeText(code);
    document.getElementById('cloudStatusMsg').textContent = '📋 Transfer Code copied to clipboard!';
  });

  document.getElementById('importSyncCodeBtn').addEventListener('click', () => {
    const code = document.getElementById('syncCodeInput').value.trim();
    if (!code) return;
    try {
      const parsed = JSON.parse(decodeURIComponent(atob(code)));
      if (Array.isArray(parsed.profiles) && parsed.profiles.length > 0) {
        account = parsed;
        state = getActiveProfile().state;
        saveState();
        updateHeaderAndPetUI();
        renderAccountModal();
        renderParentAnalyticsDashboard();
        loadQuestion();
        playSoundFX('fanfare');
        document.getElementById('cloudStatusMsg').textContent = '🎉 Profiles & analytics restored!';
      }
    } catch {
      alert('Invalid Transfer Code. Please copy the full code and try again.');
    }
  });

  // 15-Minute Habit Session Timer
  setInterval(() => {
    sessionSeconds += 1;
    const mins = String(Math.floor(sessionSeconds / 60)).padStart(2, '0');
    const secs = String(sessionSeconds % 60).padStart(2, '0');
    document.getElementById('sessionTimer').textContent = `⏱️ ${mins}:${secs}`;
  }, 1000);

  // Load first fresh question
  loadQuestion();
});
