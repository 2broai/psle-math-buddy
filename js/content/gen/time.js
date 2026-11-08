// Time — P1 unit 15 (o'clock, half past), P2 unit 11 (5 minutes, a.m./p.m., durations, calendar),
// P3 unit 9 (h/min/s conversion, durations, start and end times).
// Singapore textbook format for written times: "3.05 p.m."; every prompt with a time gets a `speak`.
import { person, people, numChoices, textChoices, visualChoices, fixedChoices, clockTime, timeWords, timeSpeech, MONTHS, cap } from '../helpers.js';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const nextH = (h) => (h % 12) + 1;
const prevH = (h) => ((h + 10) % 12) + 1;

/** Speakable version of a sentence with "3.05 p.m.", "2 h 15 min", "20 s". */
function sayTimes(text) {
  return String(text)
    .replace(/\*\*/g, '')
    .replace(/(\d{1,2})\.(\d{2})(\s?(a\.m\.|p\.m\.))?/g, (_, h, m, __, ap) => timeSpeech(Number(h), Number(m), ap))
    .replace(/(\d+)\s?h\b/g, (_, n) => `${n} hour${n === '1' ? '' : 's'}`)
    .replace(/(\d+)\s?min\b/g, (_, n) => `${n} minute${n === '1' ? '' : 's'}`)
    .replace(/(\d+)\s?s\b/g, (_, n) => `${n} second${n === '1' ? '' : 's'}`);
}

/** Minutes since midnight -> "3.05 p.m." (or without a.m./p.m.). */
function fmt12(t, withAmPm = true) {
  const tt = ((t % 1440) + 1440) % 1440;
  const h24 = Math.floor(tt / 60);
  const m = tt % 60;
  const h = h24 % 12 || 12;
  return clockTime(h, m, withAmPm ? (h24 < 12 ? 'a.m.' : 'p.m.') : undefined);
}
/** 12-hour clock without a.m./p.m. from (h, m) + minutes. */
function addMin(h, m, d) {
  const t = ((((h % 12) * 60 + m + d) % 720) + 720) % 720;
  return { h: Math.floor(t / 60) || 12, m: t % 60 };
}
function durText(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}
const clockOf = (h, m, label) => ({ type: 'clock', h, m, ...(label ? { label } : {}) });

// ================================================================== P1 unit 15
const p1OClock = {
  id: 'p1.time.oclock',
  level: 'P1',
  strand: 'time',
  unit: 15,
  title: "O'clock and half past",
  vi: 'Xem giờ đúng và giờ rưỡi',
  icon: '🕒',
  tip: 'Kim ngắn chỉ giờ (hour hand), kim dài chỉ phút (minute hand). Kim dài ở số 12 → "o\'clock"; ở số 6 → "half past". Lúc "half past 3" kim ngắn nằm GIỮA 3 và 4.',
  gen(R, tier) {
    const h = R.int(1, 12);
    if (tier === 3 && R.chance(0.4)) {
      if (R.chance(0.5)) {
        const half = R.chance(0.5);
        const ans = half ? '6' : '12';
        return {
          prompt: `At ${half ? `half past ${h}` : `${h} o'clock`}, where does the **long minute hand** point?`,
          input: 'choice',
          answer: ans,
          choices: textChoices(R, ans, ['12', '6', '3', '9', String(h)].filter((x) => x !== ans), 4).map((c) => ({ value: c.value, label: `to ${c.label}` })),
          hint: "O'clock: the long hand is at the top. Half past: the long hand has gone half way round.",
          explain: half ? `At half past ${h}, the long minute hand points to 6.` : `At ${h} o'clock, the long minute hand points to 12.`
        };
      }
      const ans = `between ${h} and ${nextH(h)}`;
      return {
        prompt: `At **half past ${h}**, where does the **short hour hand** point?`,
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, [`exactly at ${h}`, `between ${prevH(h)} and ${h}`, `exactly at ${nextH(h)}`, 'at 6'], 4),
        hint: 'In half an hour, the hour hand moves half way to the next number.',
        explain: `At half past ${h}, the hour hand has moved half way from ${h} to ${nextH(h)}. It points between ${h} and ${nextH(h)}.`
      };
    }
    const half = tier === 1 ? false : R.chance(tier === 2 ? 0.6 : 0.5);
    const m = half ? 30 : 0;
    const ans = half ? `half past ${h}` : `${h} o'clock`;
    const pool = half
      ? [`half past ${nextH(h)}`, `${h} o'clock`, `${nextH(h)} o'clock`, `half past ${prevH(h)}`, '6 o\'clock']
      : [`${nextH(h)} o'clock`, `${prevH(h)} o'clock`, `half past ${h}`, "12 o'clock"];
    return {
      prompt: R.pick(['What time is it?', 'What time does the clock show?', 'Look at the clock. What time is it?']),
      visuals: [clockOf(h, m)],
      input: 'choice',
      answer: ans,
      choices: textChoices(R, ans, pool.filter((p) => p !== ans), tier === 1 ? 3 : 4),
      hint: half ? 'The long hand points to 6: that means half past. Which number has the short hand just passed?' : "The long hand points to 12: that means o'clock. Now read the short hand.",
      explain: half
        ? `The long minute hand points to 6 and the short hour hand is between ${h} and ${nextH(h)}. It is half past ${h}.`
        : `The long minute hand points to 12 and the short hour hand points to ${h}. It is ${h} o'clock.`
    };
  }
};

const p1WhichClock = {
  id: 'p1.time.whichclock',
  level: 'P1',
  strand: 'time',
  unit: 15,
  title: 'Which clock?',
  vi: 'Chọn đồng hồ đúng giờ',
  icon: '⏰',
  tip: 'Cho con tự xoay kim một đồng hồ đồ chơi theo giờ bố mẹ đọc. Lỗi hay gặp: nhầm kim giờ và kim phút.',
  gen(R, tier) {
    const h = R.int(1, 12);
    const half = tier === 1 ? false : R.chance(0.5);
    const m = half ? 30 : 0;
    const cand = [{ h, m }];
    if (half) cand.push({ h: nextH(h), m: 30 }, { h, m: 0 }, { h: prevH(h), m: 30 }, { h: 6, m: (h * 5) % 60 });
    else cand.push({ h: nextH(h), m: 0 }, { h, m: 30 }, { h: prevH(h), m: 0 });
    if (!half && h !== 12) cand.push({ h: 12, m: (h * 5) % 60 });
    const seen = new Set();
    const list = [];
    for (const t of cand) {
      const key = `${t.h}:${t.m}`;
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ value: key, visual: clockOf(t.h, t.m) });
    }
    const n = tier === 1 ? 3 : 4;
    const chosen = [list[0], ...R.sample(list.slice(1), n - 1)];
    return {
      prompt: `Which clock shows **${half ? `half past ${h}` : `${h} o'clock`}**?`,
      input: 'choice',
      answer: `${h}:${m}`,
      choices: visualChoices(R, chosen),
      hint: half ? 'Half past: the long hand points to 6 and the short hand is just after the hour.' : "O'clock: the long hand points to 12 and the short hand points to the hour.",
      explain: half
        ? `At half past ${h}, the long hand points to 6 and the short hand is between ${h} and ${nextH(h)}.`
        : `At ${h} o'clock, the long hand points to 12 and the short hand points to ${h}.`
    };
  }
};

const DAY_ORDER = [
  ['⏰', 'wake up'],
  ['🥣', 'eat breakfast'],
  ['🏫', 'go to school'],
  ['🍱', 'eat lunch'],
  ['🍽️', 'eat dinner'],
  ['😴', 'go to bed']
];
const HOBBIES = ['reads a book', 'plays the piano', 'draws a picture', 'goes swimming', 'rides a bicycle', 'plays chess', 'bakes cookies', 'waters the plants', 'practises the violin', 'builds with blocks'];
const ABOUT = {
  'about 1 minute': ['washing your hands', 'putting on your shoes', 'drinking a cup of water'],
  'about 1 hour': ['a swimming lesson', 'a long walk in the park', 'baking a cake'],
  'about 1 second': ['blinking your eyes', 'clapping your hands once'],
  'about 1 day': ['a school camp trip', 'a long train ride across a country']
};
const p1Daily = {
  id: 'p1.time.daily',
  level: 'P1',
  strand: 'time',
  unit: 15,
  title: 'Time in my day',
  vi: 'Trình tự sự việc, trước/sau, 1 giờ sau',
  icon: '🌞',
  tip: 'Nói chuyện về lịch sinh hoạt của con bằng tiếng Anh: "I eat breakfast at 7 o\'clock. One hour later, I go to school." Các từ: first, next, then, last, before, after.',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['first', 'before', 'later'] : tier === 2 ? ['first', 'before', 'later', 'long'] : ['first', 'later', 'long', 'before']);
    if (form === 'first') {
      const k = tier === 1 ? 2 : 3;
      const idx = R.sample([0, 1, 2, 3, 4, 5], k).sort((a, b) => a - b);
      const askLast = tier === 3 && R.chance(0.5);
      const ans = DAY_ORDER[askLast ? idx[k - 1] : idx[0]];
      return {
        prompt: `Which do you usually do **${askLast ? 'last' : 'first'}** in a day?`,
        input: 'choice',
        answer: ans[1],
        choices: R.shuffle(idx).map((i) => ({ value: DAY_ORDER[i][1], label: `${DAY_ORDER[i][0]} ${DAY_ORDER[i][1]}` })),
        hint: 'Think about your own day, from morning to night.',
        explain: `In a day we ${DAY_ORDER.filter((_, i) => idx.includes(i)).map((d) => d[1]).join(', then ')}. So "${ans[1]}" comes ${askLast ? 'last' : 'first'}.`
      };
    }
    if (form === 'before') {
      const who = person(R);
      const [a, b] = R.sample(HOBBIES, 2);
      const ta = { h: R.int(2, 6), m: R.pick([0, 30]) };
      let tb = { h: R.int(2, 6), m: R.pick([0, 30]) };
      while (tb.h === ta.h && tb.m === ta.m) tb = { h: R.int(2, 6), m: R.pick([0, 30]) };
      const words = (t) => (t.m ? `half past ${t.h}` : `${t.h} o'clock`);
      const aFirst = ta.h * 60 + ta.m < tb.h * 60 + tb.m;
      const askFirst = R.chance(0.6);
      const ans = askFirst === aFirst ? a : b;
      return {
        prompt: `In the afternoon, ${who.name} ${a} at ${words(ta)}. ${who.He} ${b} at ${words(tb)}. Which does ${who.he} do **${askFirst ? 'first' : 'later'}**?`,
        visuals: [clockOf(ta.h, ta.m, a), clockOf(tb.h, tb.m, b)],
        input: 'choice',
        answer: ans,
        choices: fixedChoices([a, b]),
        hint: 'Which time comes first when we count the hours: 1 o\'clock, half past 1, 2 o\'clock …?',
        explain: `${cap(words(aFirst ? ta : tb))} comes before ${words(aFirst ? tb : ta)}. So ${who.he} ${aFirst ? a : b} first and ${aFirst ? b : a} later.`
      };
    }
    if (form === 'later') {
      const h = R.int(1, 11);
      const kind = tier === 1 ? 'h1' : R.pick(tier === 2 ? ['h1', 'h2', 'ago'] : ['h2', 'half', 'ago', 'h3']);
      let ans;
      let ask;
      let explain;
      if (kind === 'h1' || kind === 'h2' || kind === 'h3') {
        const d = kind === 'h1' ? 1 : kind === 'h2' ? 2 : 3;
        const t = addMin(h, 0, d * 60);
        ans = `${t.h} o'clock`;
        ask = `in **${d} hour${d > 1 ? 's' : ''}**`;
        explain = `Count on ${d} hour${d > 1 ? 's' : ''} from ${h} o'clock: ${Array.from({ length: d }, (_, i) => `${addMin(h, 0, (i + 1) * 60).h} o'clock`).join(', ')}. It will be ${ans}.`;
      } else if (kind === 'half') {
        ans = `half past ${h}`;
        ask = 'in **half an hour**';
        explain = `Half an hour after ${h} o'clock, the long hand moves from 12 to 6. It will be half past ${h}.`;
      } else {
        const t = addMin(h, 0, -60);
        ans = `${t.h} o'clock`;
        ask = null;
        explain = `1 hour before ${h} o'clock was ${ans}.`;
      }
      const pool = [`${nextH(h)} o'clock`, `${prevH(h)} o'clock`, `half past ${h}`, `${addMin(h, 0, 120).h} o'clock`, `${addMin(h, 0, 180).h} o'clock`, `half past ${nextH(h)}`].filter((p) => p !== ans);
      return {
        prompt: ask ? `It is ${h} o'clock now. What time will it be ${ask}?` : `It is ${h} o'clock now. What time was it **1 hour ago**?`,
        visuals: [clockOf(h, 0)],
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, pool, 4),
        hint: 'In 1 hour, the long hand goes all the way round once and the short hand moves to the next number.',
        explain
      };
    }
    const keys = Object.keys(ABOUT);
    const target = R.pick(tier === 2 ? ['about 1 minute', 'about 1 hour'] : keys);
    const ans = R.pick(ABOUT[target]);
    const others = keys.filter((k) => k !== target).map((k) => R.pick(ABOUT[k]));
    return {
      prompt: `Which takes **${target}**?`,
      input: 'choice',
      answer: ans,
      choices: textChoices(R, ans, others, 4),
      hint: 'Imagine doing each one. Is it very quick, or does it take a long time?',
      explain: `${cap(ans)} takes ${target}.`
    };
  }
};

// ================================================================== P2 unit 11
function readClockDistractors(h, m) {
  const out = [];
  out.push(clockTime(nextH(h), m));
  if (m) out.push(clockTime(h, m / 5 < 10 ? m / 5 : m));
  if (m && m !== 30) out.push(clockTime(h, 60 - m));
  out.push(clockTime(prevH(h), m));
  if (m) out.push(clockTime(m / 5 === 0 ? 12 : m / 5, (h * 5) % 60));
  return out;
}
const p2FiveMin = {
  id: 'p2.time.fivemin',
  level: 'P2',
  strand: 'time',
  unit: 11,
  title: 'Telling time to 5 minutes',
  vi: 'Xem giờ chính xác đến 5 phút',
  icon: '🕰️',
  tip: 'Đếm kim phút theo bước 5: số 1 = 5 phút, số 2 = 10 phút… Khi đã quá nửa giờ (vd 8.50), kim giờ gần tới số 9 nhưng vẫn là 8 giờ.',
  gen(R, tier) {
    const h = R.int(1, 12);
    const m = tier === 1 ? R.pick([0, 15, 30, 45, 5, 10, 50, 55]) : R.step(5, 55, 5);
    const ans = clockTime(h, m);
    if (tier === 3 && R.chance(0.45)) {
      const cand = [{ h, m }, { h: nextH(h), m }, { h, m: (60 - m) % 60 || 30 }, { h: prevH(h), m }, { h: m / 5 || 12, m: (h * 5) % 60 }];
      const seen = new Set();
      const list = [];
      for (const t of cand) {
        const key = clockTime(t.h, t.m);
        if (seen.has(key)) continue;
        seen.add(key);
        list.push({ value: key, visual: clockOf(t.h, t.m) });
      }
      const chosen = [list[0], ...R.sample(list.slice(1), Math.min(3, list.length - 1))];
      return {
        prompt: `Which clock shows **${ans}**?`,
        speak: `Which clock shows ${timeSpeech(h, m)}?`,
        input: 'choice',
        answer: ans,
        choices: visualChoices(R, chosen),
        hint: `The minute hand should point to ${m / 5 || 12}. The hour hand should be at or just after ${h}.`,
        explain: `At ${ans}, the minute hand points to ${m / 5 || 12} and the hour hand is ${m ? `just after ${h}` : `at ${h}`}.`
      };
    }
    const pool = readClockDistractors(h, m).filter((x) => x !== ans);
    return {
      prompt: R.pick(['What time does the clock show?', 'What time is it?', 'Read the clock. What time is it?']),
      visuals: [clockOf(h, m)],
      input: 'choice',
      answer: ans,
      choices: textChoices(R, ans, pool, 4),
      hint: 'Read the short hand for the hour it has just passed. Count the long hand in 5s: 5, 10, 15 …',
      explain: m
        ? `The hour hand has just passed ${h}. The minute hand points to ${m / 5}, which is ${m} minutes. It is ${ans} (${timeWords(h, m)}).`
        : `The hour hand points to ${h} and the minute hand points to 12. It is ${ans} (${h} o'clock).`
    };
  }
};

function phrase(kind, X, H) {
  if (X === 30) return `half past ${H}`;
  if (X === 15) return `quarter ${kind} ${H}`;
  return `${X} minutes ${kind} ${H}`;
}
function phraseValue(kind, X, H) {
  const base = (H % 12) * 60;
  return (((kind === 'past' ? base + X : base - X) % 720) + 720) % 720;
}
const p2PastTo = {
  id: 'p2.time.pastto',
  level: 'P2',
  strand: 'time',
  unit: 11,
  title: "'Past' and 'to'",
  vi: 'Đọc giờ kiểu "past" và "to"',
  icon: '🗣️',
  tip: 'Nửa đầu giờ dùng "past" (20 minutes past 4 = 4.20), nửa sau dùng "to" giờ kế tiếp (20 minutes to 5 = 4.40). "Quarter" = 15 phút.',
  gen(R, tier) {
    const h = R.int(1, 12);
    const m = tier === 1 ? R.pick([15, 30, 45]) : R.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    const kind = m <= 30 ? 'past' : 'to';
    const X = kind === 'past' ? m : 60 - m;
    const H = kind === 'past' ? h : nextH(h);
    const words = phrase(kind, X, H);
    const value = phraseValue(kind, X, H);
    const form = R.pick(tier === 3 ? ['w2t', 't2w', 'minsto'] : ['w2t', 't2w']);
    if (form === 'w2t') {
      const ans = clockTime(h, m);
      const cands = [[h, (60 - m) % 60 || 30], [nextH(h), m], [prevH(h), m], [nextH(h), (60 - m) % 60 || 30]].map(([a, b]) => clockTime(a, b));
      return {
        prompt: `What time is **${words}**?`,
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, [...new Set(cands)].filter((c) => c !== ans), 4),
        hint: kind === 'past' ? `"Past ${H}" means the hour is ${H}. Add the minutes.` : `"To ${H}" means it is not ${H} yet. Count back ${X} minutes from ${H} o'clock.`,
        explain: `${cap(words)} is ${ans}.`
      };
    }
    if (form === 't2w') {
      const cand = [];
      for (const k of ['past', 'to']) {
        for (const HH of [H, nextH(H), prevH(H)]) {
          if (X === 30 && k === 'to') continue;
          const p = phrase(k, X, HH);
          if (p !== words && phraseValue(k, X, HH) !== value) cand.push(p);
        }
      }
      return {
        prompt: `How do we say **${clockTime(h, m)}** in words?`,
        speak: `How do we say ${timeSpeech(h, m)} in words?`,
        visuals: tier < 3 ? [clockOf(h, m)] : [],
        input: 'choice',
        answer: words,
        choices: textChoices(R, words, [...new Set(cand)], 4),
        hint: m <= 30 ? 'The minute hand is in the first half of the clock, so we say "past".' : 'The minute hand is in the second half of the clock, so we say "to" the next hour.',
        explain: `${clockTime(h, m)} is ${words}.`
      };
    }
    const mm = R.pick([35, 40, 45, 50, 55]);
    return {
      prompt: `It is ${clockTime(h, mm)}. How many minutes is it **to ${nextH(h)} o'clock**?`,
      speak: `It is ${timeSpeech(h, mm)}. How many minutes is it to ${nextH(h)} o'clock?`,
      visuals: [clockOf(h, mm)],
      input: 'number',
      answer: 60 - mm,
      unit: { post: 'min' },
      hint: 'Count on in 5s from the minute hand up to 12.',
      explain: `From ${clockTime(h, mm)} to ${nextH(h)}.00 is ${60 - mm} minutes. It is ${60 - mm} minutes to ${nextH(h)}.`
    };
  }
};

const AMPM_ACTS = [
  ['eats breakfast', 6, 8, 'a.m.'],
  ['goes to school', 6, 7, 'a.m.'],
  ['has recess', 9, 10, 'a.m.'],
  ['has a morning swim', 7, 9, 'a.m.'],
  ['eats lunch', 1, 2, 'p.m.'],
  ['takes an afternoon nap', 2, 3, 'p.m.'],
  ['does homework', 3, 5, 'p.m.'],
  ['eats dinner', 6, 8, 'p.m.'],
  ['goes to bed', 8, 10, 'p.m.'],
  ['looks at the stars', 9, 10, 'p.m.'],
  ['watches the sunrise', 6, 7, 'a.m.'],
  ['plays in the park', 4, 6, 'p.m.']
];
const p2AmPm = {
  id: 'p2.time.ampm',
  level: 'P2',
  strand: 'time',
  unit: 11,
  title: 'a.m. and p.m.',
  vi: 'Buổi sáng (a.m.) và chiều tối (p.m.)',
  icon: '🌗',
  tip: 'a.m. = từ nửa đêm đến trưa, p.m. = từ trưa đến nửa đêm. Gắn với sinh hoạt: ăn sáng 7.00 a.m., ăn tối 7.00 p.m.',
  gen(R, tier) {
    const who = person(R);
    const form = R.pick(tier === 1 ? ['blank', 'part'] : tier === 2 ? ['blank', 'part', 'later'] : ['later', 'cross', 'blank']);
    if (form === 'blank') {
      const [act, lo, hi, ap] = R.pick(AMPM_ACTS);
      const t = clockTime(R.int(lo, hi), R.step(0, 55, tier === 1 ? 15 : 5));
      return {
        prompt: `${who.name} ${act} at ${t} ____. Is it a.m. or p.m.?`,
        speak: `${who.name} ${act} at ${sayTimes(t)}. Is it A M or P M?`,
        input: 'choice',
        answer: ap,
        choices: fixedChoices(['a.m.', 'p.m.']),
        hint: 'a.m. is from midnight to noon (morning). p.m. is from noon to midnight (afternoon and night).',
        explain: `${who.name} ${act} in the ${ap === 'a.m.' ? 'morning' : lo >= 6 ? 'evening' : 'afternoon'}, so it is ${t} ${ap}.`
      };
    }
    if (form === 'part') {
      const opts = [
        [R.int(6, 11), 'a.m.', 'in the morning'],
        [R.int(1, 4), 'p.m.', 'in the afternoon'],
        [R.int(8, 11), 'p.m.', 'at night']
      ];
      const [h, ap, part] = R.pick(opts);
      const t = clockTime(h, R.step(0, 55, 5), ap);
      return {
        prompt: `Is **${t}** in the morning, in the afternoon or at night?`,
        speak: `Is ${sayTimes(t)} in the morning, in the afternoon or at night?`,
        input: 'choice',
        answer: part,
        choices: fixedChoices(['in the morning', 'in the afternoon', 'at night']),
        hint: 'a.m. times are in the morning. p.m. times are in the afternoon, evening or night.',
        explain: `${t} is ${part}.`
      };
    }
    if (form === 'later') {
      const a = R.int(6 * 60, 22 * 60);
      let b = R.int(6 * 60, 22 * 60);
      while (Math.abs(a - b) < 30) b = R.int(6 * 60, 22 * 60);
      const ta = fmt12(Math.round(a / 5) * 5);
      const tb = fmt12(Math.round(b / 5) * 5);
      const askLater = R.chance(0.5);
      const ans = (askLater ? a > b : a < b) ? ta : tb;
      return {
        prompt: `Which time is **${askLater ? 'later' : 'earlier'}** in the day: ${ta} or ${tb}?`,
        speak: sayTimes(`Which time is ${askLater ? 'later' : 'earlier'} in the day: ${ta} or ${tb}?`),
        input: 'choice',
        answer: ans,
        choices: fixedChoices([ta, tb]),
        hint: 'All a.m. times come before all p.m. times in the same day.',
        explain:
          (a < 720) === (b < 720)
            ? `Both times are ${a < 720 ? 'a.m.' : 'p.m.'}, so compare the hours and minutes. ${ans} is ${askLater ? 'later' : 'earlier'}.`
            : `${ans} is ${askLater ? 'later' : 'earlier'}. Morning (a.m.) comes before afternoon and night (p.m.).`
      };
    }
    // crossing noon
    const start = R.int(9, 11) * 60 + R.step(0, 30, 30);
    const d = R.int(2, 3) * 60;
    const ans = fmt12(start + d);
    const pool = [fmt12(start + d - 720 < 0 ? start + d + 720 : start + d - 720), fmt12(start + d - 60), fmt12(start + d + 60), clockTime(((Math.floor((start + d) / 60)) % 12) || 12, (start + d) % 60, 'a.m.')];
    return {
      prompt: `What time is it **${d / 60} hours after** ${fmt12(start)}?`,
      speak: sayTimes(`What time is it ${d / 60} hours after ${fmt12(start)}?`),
      input: 'choice',
      answer: ans,
      choices: textChoices(R, ans, [...new Set(pool)].filter((p) => p !== ans), 4),
      hint: 'Count on hour by hour. After 12 noon, the time changes from a.m. to p.m.',
      explain: `Count on ${d / 60} hours from ${fmt12(start)}: ${Array.from({ length: d / 60 }, (_, i) => fmt12(start + (i + 1) * 60)).join(', ')}. It is ${ans}.`
    };
  }
};

const EVENTS = ['A birthday party', 'A concert', 'A swimming lesson', 'A school fun fair', 'A football match', 'A movie', 'An art class', 'A piano lesson', 'A puppet show', 'A science workshop'];
const TASKS = ['her homework', 'reading a story', 'a jigsaw puzzle', 'cleaning the room', 'a drawing', 'watering the garden', 'baking muffins'];
const p2Duration = {
  id: 'p2.time.duration',
  level: 'P2',
  strand: 'time',
  unit: 11,
  title: 'How long does it take?',
  vi: 'Tính khoảng thời gian (giờ, phút)',
  icon: '⏳',
  tip: 'Dùng "tia thời gian" (timeline): đếm từ giờ bắt đầu tới giờ tròn kế tiếp, rồi đếm tiếp tới giờ kết thúc. 1 h = 60 min.',
  gen(R, tier) {
    if (tier === 1) {
      const h1 = R.int(1, 8);
      const d = R.int(1, 4);
      const h2 = h1 + d;
      const ev = R.pick(EVENTS);
      return {
        prompt: `${ev} starts at ${h1} o'clock and ends at ${h2} o'clock. How many hours does it last?`,
        visuals: [clockOf(h1, 0, 'Start'), clockOf(h2, 0, 'End')],
        input: 'number',
        answer: d,
        unit: { post: 'h' },
        hint: `Count the hours from ${h1} o'clock to ${h2} o'clock.`,
        explain: `From ${h1} o'clock to ${h2} o'clock is ${d} hour${d > 1 ? 's' : ''}.`
      };
    }
    const who = person(R);
    const task = R.pick(TASKS).replace('her ', `${who.his} `);
    if (tier === 2) {
      const h = R.int(1, 11);
      const m1 = R.step(0, 40, 5);
      const m2 = R.step(m1 + 10, 55, 5);
      const prompt = `${who.name} started ${task} at ${clockTime(h, m1)}. ${who.He} finished at ${clockTime(h, m2)}. How many minutes did ${who.he} take?`;
      return {
        prompt,
        speak: sayTimes(prompt),
        visuals: [clockOf(h, m1, 'Start'), clockOf(h, m2, 'End')],
        input: 'number',
        answer: m2 - m1,
        unit: { post: 'min' },
        hint: 'Count the minute hand in 5s from the start to the end.',
        explain: `From ${clockTime(h, m1)} to ${clockTime(h, m2)} is ${m2 - m1} minutes.`
      };
    }
    if (R.chance(0.35)) {
      const h1 = R.int(1, 9);
      const d = R.pick([90, 150, 120, 210, 75, 105]);
      const end = addMin(h1, 0, d);
      const ev = R.pick(EVENTS);
      const ans = durText(d);
      const pool = [durText(d + 30), durText(Math.max(30, d - 30)), durText(d + 60), durText(Math.max(15, d - 60)), durText(d + 15)].filter((p) => p !== ans);
      const prompt = `${ev} starts at ${clockTime(h1, 0)} and ends at ${clockTime(end.h, end.m)}. How long does it last?`;
      return {
        prompt,
        speak: sayTimes(prompt),
        visuals: [clockOf(h1, 0, 'Start'), clockOf(end.h, end.m, 'End')],
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, pool, 4),
        hint: 'Count the whole hours first, then the extra minutes.',
        explain: `From ${clockTime(h1, 0)} to ${clockTime(end.h, end.m)} is ${ans}.`
      };
    }
    const h = R.int(1, 10);
    const m1 = R.step(30, 55, 5);
    const m2 = R.step(5, 30, 5);
    const d = 60 - m1 + m2;
    const prompt = `${who.name} started ${task} at ${clockTime(h, m1)}. ${who.He} finished at ${clockTime(nextH(h), m2)}. How many minutes did ${who.he} take?`;
    return {
      prompt,
      speak: sayTimes(prompt),
      visuals: [clockOf(h, m1, 'Start'), clockOf(nextH(h), m2, 'End')],
      input: 'number',
      answer: d,
      unit: { post: 'min' },
      hint: `First count from ${clockTime(h, m1)} to ${nextH(h)} o'clock. Then count on to ${clockTime(nextH(h), m2)}.`,
      explain: `${clockTime(h, m1)} → ${clockTime(nextH(h), 0)} is ${60 - m1} min. ${clockTime(nextH(h), 0)} → ${clockTime(nextH(h), m2)} is ${m2} min. ${60 - m1} + ${m2} = ${d} min.`,
      explainVisuals: [{ type: 'timeline', points: [{ t: 0, label: clockTime(h, m1) }, { t: 60 - m1, label: clockTime(nextH(h), 0) }, { t: d, label: clockTime(nextH(h), m2) }], jumps: [{ from: 0, to: 1, text: `${60 - m1} min` }, { from: 1, to: 2, text: `${m2} min` }] }]
    };
  }
};

const p2AfterBefore = {
  id: 'p2.time.afterbefore',
  level: 'P2',
  strand: 'time',
  unit: 11,
  title: 'Time after and before',
  vi: 'Tìm giờ sau/trước một khoảng thời gian',
  icon: '⏩',
  tip: 'Hỏi con trong đời sống: "We leave at 4.15. The drive takes 30 minutes. What time do we arrive?". Khi quá 60 phút thì sang giờ mới.',
  gen(R, tier) {
    const who = person(R);
    let h;
    let m;
    let d;
    let before = false;
    let story = R.chance(0.5);
    if (tier === 1) {
      h = R.int(1, 10);
      m = R.pick([0, 30]);
      d = R.int(1, 3) * 60;
    } else if (tier === 2) {
      h = R.int(1, 11);
      m = R.step(0, 35, 5);
      d = R.step(10, 55 - m, 5);
    } else {
      h = R.int(1, 11);
      before = R.chance(0.45);
      if (before) {
        m = R.step(0, 20, 5);
        d = R.step(m + 5, 45, 5);
      } else {
        m = R.step(30, 55, 5);
        d = R.step(65 - m, 50, 5);
      }
    }
    const t = addMin(h, m, before ? -d : d);
    const ans = clockTime(t.h, t.m);
    const dText = d % 60 === 0 ? `${d / 60} hour${d > 60 ? 's' : ''}` : `${d} minutes`;
    let prompt;
    if (!story || tier === 1) {
      prompt = `What time is it **${dText} ${before ? 'before' : 'after'}** ${clockTime(h, m)}?`;
    } else if (before) {
      prompt = `The bus arrived at ${clockTime(h, m)}. The trip took ${dText}. What time did the bus leave?`;
    } else {
      prompt = `${who.name} started ${R.pick(['reading', 'swimming', 'painting', 'playing football', 'practising the piano'])} at ${clockTime(h, m)}. ${who.He} did it for ${dText}. What time did ${who.he} stop?`;
    }
    const wrong = [addMin(t.h, t.m, 5), addMin(t.h, t.m, -5), addMin(t.h, t.m, 60), addMin(t.h, t.m, -60), addMin(h, m, before ? d : -d), addMin(t.h, t.m, 10)].map((x) => clockTime(x.h, x.m));
    return {
      prompt,
      speak: sayTimes(prompt),
      visuals: [clockOf(h, m)],
      input: 'choice',
      answer: ans,
      choices: textChoices(R, ans, [...new Set(wrong)].filter((w) => w !== ans), 4),
      hint: before ? `Count back ${dText} from ${clockTime(h, m)}.` : `Count on ${dText} from ${clockTime(h, m)}. 60 minutes make 1 hour.`,
      explain: `${dText} ${before ? 'before' : 'after'} ${clockTime(h, m)} is ${ans}.`
    };
  }
};

const p2Calendar = {
  id: 'p2.time.calendar',
  level: 'P2',
  strand: 'time',
  unit: 11,
  title: 'Reading a calendar',
  vi: 'Đọc lịch: thứ, ngày, tháng',
  icon: '📆',
  tip: 'Treo lịch ở nhà, mỗi sáng hỏi: "What is the date today? What day is it?". Một tuần 7 ngày: cùng một thứ thì ngày cách nhau 7.',
  gen(R, tier) {
    const year = R.pick([2026, 2027, 2028]);
    const month = R.int(0, 11);
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const mName = MONTHS[month];
    const cal = (extra = {}) => ({ type: 'calendar', year, month, ...extra });
    const dateOf = (wd, nth) => 1 + ((wd - first + 7) % 7) + 7 * (nth - 1);
    const form = R.pick(tier === 1 ? ['dayof', 'ndays', 'monthafter'] : tier === 2 ? ['count', 'firstday', 'plus7', 'dayof'] : ['nth', 'until', 'fewest', 'count', 'months']);
    if (form === 'dayof') {
      const d = R.int(1, days);
      const ans = WEEKDAYS[(first + d - 1) % 7];
      return {
        prompt: `Look at the calendar. What day of the week is **${d} ${mName}**?`,
        visuals: [cal()],
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, WEEKDAYS.filter((w) => w !== ans), 4),
        hint: `Find ${d} on the calendar. Look up to the top of its column.`,
        explain: `${d} ${mName} ${year} is a ${ans}.`
      };
    }
    if (form === 'ndays') {
      return {
        prompt: `How many days are there in ${mName} ${year}?`,
        visuals: [cal()],
        input: 'choice',
        answer: days,
        choices: numChoices(R, days, { near: [28, 29, 30, 31].filter((x) => x !== days), min: 28, max: 31 }),
        hint: 'Look at the last date of the month.',
        explain: `The last date is ${days}, so ${mName} ${year} has ${days} days.`
      };
    }
    if (form === 'monthafter') {
      const before = R.chance(0.5);
      const ans = MONTHS[(month + (before ? 11 : 1)) % 12];
      return {
        prompt: `Which month comes **${before ? 'just before' : 'just after'}** ${mName}?`,
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, [MONTHS[(month + 2) % 12], MONTHS[(month + 10) % 12], mName, MONTHS[(month + (before ? 1 : 11)) % 12]].filter((x) => x !== ans), 4),
        hint: 'Say the months in order: January, February, March …',
        explain: `The months go ${MONTHS[(month + 11) % 12]}, ${mName}, ${MONTHS[(month + 1) % 12]}. The answer is ${ans}.`
      };
    }
    if (form === 'count') {
      const wd = R.int(0, 6);
      let n = 0;
      for (let d = 1; d <= days; d++) if ((first + d - 1) % 7 === wd) n++;
      return {
        prompt: `How many **${WEEKDAYS[wd]}s** are there in this month?`,
        visuals: [cal()],
        input: 'choice',
        answer: n,
        choices: numChoices(R, n, { near: [3, 4, 5, 6].filter((x) => x !== n), min: 3, max: 6 }),
        hint: `Count the dates in the ${WEEKDAYS[wd]} column.`,
        explain: `There are ${n} ${WEEKDAYS[wd]}s in ${mName} ${year}.`
      };
    }
    if (form === 'firstday') {
      const wd = R.int(0, 6);
      const ans = dateOf(wd, 1);
      return {
        prompt: `What is the date of the **first ${WEEKDAYS[wd]}** in ${mName}?`,
        visuals: [cal()],
        input: 'number',
        answer: ans,
        hint: `Look down the ${WEEKDAYS[wd]} column for the first date.`,
        explain: `The first ${WEEKDAYS[wd]} is ${ans} ${mName}.`
      };
    }
    if (form === 'plus7') {
      const d = R.int(1, days - 7);
      const ans = WEEKDAYS[(first + d - 1) % 7];
      return {
        prompt: `${d} ${mName} is a ${ans}. What day of the week is **${d + 7} ${mName}**?`,
        visuals: [cal({ highlight: [d] })],
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, WEEKDAYS.filter((w) => w !== ans), 4),
        hint: 'One week later is 7 days later. It is the same day of the week!',
        explain: `${d + 7} is 7 days after ${d}, so it is also a ${ans}.`
      };
    }
    if (form === 'nth') {
      const wd = R.int(0, 6);
      const nth = R.int(2, 4);
      const ans = dateOf(wd, nth);
      const who = person(R);
      return {
        prompt: `${who.name}'s swimming test is on the **${['', 'first', 'second', 'third', 'fourth'][nth]} ${WEEKDAYS[wd]}** of ${mName}. What is the date?`,
        visuals: [cal()],
        input: 'number',
        answer: ans,
        hint: `Find the first ${WEEKDAYS[wd]}. Each next ${WEEKDAYS[wd]} is 7 days later.`,
        explain: `The first ${WEEKDAYS[wd]} is ${dateOf(wd, 1)}. Add 7 for each week: the ${['', 'first', 'second', 'third', 'fourth'][nth]} ${WEEKDAYS[wd]} is ${ans} ${mName}.`
      };
    }
    if (form === 'until') {
      const who = person(R);
      const today = R.int(1, days - 3);
      const bday = R.int(today + 2, days);
      return {
        prompt: `Today is ${today} ${mName}. ${who.name}'s birthday is on ${bday} ${mName}. How many more days until ${who.his} birthday?`,
        visuals: [cal({ highlight: [today], marks: { [bday]: '🎂' } })],
        input: 'number',
        answer: bday - today,
        unit: { post: 'days' },
        hint: `Count on from ${today} to ${bday}, or subtract.`,
        explain: `${bday} − ${today} = ${bday - today}. The birthday is in ${bday - today} days.`
      };
    }
    if (form === 'fewest') {
      return {
        prompt: 'Which month has the **fewest** days?',
        input: 'choice',
        answer: 'February',
        choices: textChoices(R, 'February', R.sample(MONTHS.filter((x) => x !== 'February'), 3), 4),
        hint: 'Most months have 30 or 31 days. One month has only 28 or 29 days.',
        explain: 'February has only 28 days (29 days in a leap year). It has the fewest days.'
      };
    }
    if (R.chance(0.5)) {
      return {
        prompt: 'How many months are there in **one year**?',
        input: 'choice',
        answer: 12,
        choices: numChoices(R, 12, { near: [7, 10, 30, 52], min: 5, max: 60 }),
        hint: 'Say the months: January, February … December.',
        explain: 'There are 12 months in a year.'
      };
    }
    const w = R.int(2, 4);
    return {
      prompt: `How many days are there in **${w} weeks**?`,
      input: 'number',
      answer: 7 * w,
      unit: { post: 'days' },
      hint: 'One week has 7 days.',
      explain: `${w} × 7 = ${7 * w} days.`
    };
  }
};

// ================================================================== P3 unit 9
const p3Convert = {
  id: 'p3.time.convert',
  level: 'P3',
  strand: 'time',
  unit: 9,
  title: 'Hours, minutes, seconds',
  vi: 'Đổi đơn vị: giờ ↔ phút ↔ giây',
  icon: '⏱️',
  tip: '1 h = 60 min, 1 min = 60 s. Đổi "2 h 15 min" ra phút: 2 × 60 + 15. Ngược lại 150 min = 2 h 30 min (bớt dần từng 60).',
  gen(R, tier) {
    const form = R.pick(tier === 1 ? ['h2m', 'm2s', 'm2h'] : tier === 2 ? ['hm2m', 'ms2s', 'h2m'] : ['m2hm', 's2ms', 'cmp', 'hm2m']);
    let prompt;
    let speak;
    let ans;
    let unit;
    let hint;
    let explain;
    if (form === 'h2m') {
      const k = R.int(2, 6);
      prompt = `${k} h = **?** min`;
      speak = `${k} hours equals how many minutes?`;
      ans = k * 60;
      unit = { post: 'min' };
      hint = '1 h = 60 min.';
      explain = `${k} × 60 min = ${ans} min.`;
    } else if (form === 'm2s') {
      const k = R.int(2, 6);
      prompt = `${k} min = **?** s`;
      speak = `${k} minutes equals how many seconds?`;
      ans = k * 60;
      unit = { post: 's' };
      hint = '1 min = 60 s.';
      explain = `${k} × 60 s = ${ans} s.`;
    } else if (form === 'm2h') {
      const k = R.int(2, 5);
      prompt = `${k * 60} min = **?** h`;
      speak = `${k * 60} minutes equals how many hours?`;
      ans = k;
      unit = { post: 'h' };
      hint = 'Every 60 min makes 1 h.';
      explain = `${k * 60} ÷ 60 = ${k}. So ${k * 60} min = ${k} h.`;
    } else if (form === 'hm2m') {
      const h = R.int(1, 4);
      const m = R.step(5, 55, 5);
      prompt = `${h} h ${m} min = **?** min`;
      speak = `${h} hour${h > 1 ? 's' : ''} ${m} minutes equals how many minutes?`;
      ans = h * 60 + m;
      unit = { post: 'min' };
      hint = 'Change the hours to minutes first, then add the minutes.';
      explain = `${h} h = ${h * 60} min. ${h * 60} + ${m} = ${ans} min.`;
    } else if (form === 'ms2s') {
      const mn = R.int(1, 4);
      const s = R.step(5, 55, 5);
      prompt = `${mn} min ${s} s = **?** s`;
      speak = `${mn} minute${mn > 1 ? 's' : ''} ${s} seconds equals how many seconds?`;
      ans = mn * 60 + s;
      unit = { post: 's' };
      hint = 'Change the minutes to seconds first, then add the seconds.';
      explain = `${mn} min = ${mn * 60} s. ${mn * 60} + ${s} = ${ans} s.`;
    } else if (form === 'm2hm') {
      const h = R.int(1, 4);
      const m = R.step(5, 55, 5);
      const total = h * 60 + m;
      const askH = R.chance(0.4);
      prompt = askH ? `${total} min = **?** h ${m} min` : `${total} min = ${h} h **?** min`;
      speak = askH ? `${total} minutes equals how many hours and ${m} minutes?` : `${total} minutes equals ${h} hour${h > 1 ? 's' : ''} and how many minutes?`;
      ans = askH ? h : m;
      unit = { post: askH ? 'h' : 'min' };
      hint = 'Take away 60 min for each hour.';
      explain = `${total} min = ${h * 60} min + ${m} min = ${h} h ${m} min.`;
    } else if (form === 's2ms') {
      const mn = R.int(1, 4);
      const s = R.step(5, 55, 5);
      const total = mn * 60 + s;
      prompt = `${total} s = ${mn} min **?** s`;
      speak = `${total} seconds equals ${mn} minute${mn > 1 ? 's' : ''} and how many seconds?`;
      ans = s;
      unit = { post: 's' };
      hint = 'Take away 60 s for each minute.';
      explain = `${total} s = ${mn * 60} s + ${s} s = ${mn} min ${s} s.`;
    } else {
      const h = 1;
      const m = R.step(5, 55, 5);
      let other = h * 60 + m + R.pick([-15, -10, -5, 5, 10, 15]);
      if (other === h * 60 + m) other += 5;
      const a = `${h} h ${m} min`;
      const b = `${other} min`;
      const longer = h * 60 + m > other ? a : b;
      return {
        prompt: `Which is **longer**: ${a} or ${b}?`,
        speak: sayTimes(`Which is longer: ${a} or ${b}?`),
        input: 'choice',
        answer: longer,
        choices: fixedChoices([a, b]),
        hint: 'Change both to minutes before you compare.',
        explain: `${a} = ${h * 60 + m} min. ${h * 60 + m} min is ${h * 60 + m > other ? 'more' : 'less'} than ${other} min, so ${longer} is longer.`
      };
    }
    return { prompt, speak, input: 'number', answer: ans, unit, hint, explain };
  }
};

const ACTIVITIES3 = ['A movie', 'A concert', 'A cooking class', 'A school excursion', 'A badminton match', 'A magic show', 'A boat ride', 'A museum tour'];
const p3Duration = {
  id: 'p3.time.duration',
  level: 'P3',
  strand: 'time',
  unit: 9,
  title: 'Start, end and duration',
  vi: 'Giờ bắt đầu, kết thúc, khoảng thời gian',
  icon: '🎬',
  tip: 'Vẽ timeline: đi từ giờ bắt đầu tới giờ tròn, rồi cộng từng giờ, rồi phần phút còn lại. Tìm giờ bắt đầu = "đi ngược" (work backwards) từ giờ kết thúc.',
  gen(R, tier) {
    const ev = R.pick(ACTIVITIES3);
    const form = R.pick(tier === 1 ? ['dur', 'end'] : tier === 2 ? ['dur', 'end', 'durmin'] : ['start', 'dur', 'end']);
    let start;
    let d;
    if (tier === 1) {
      start = R.int(8, 18) * 60 + R.pick([0, 30]);
      d = R.pick([60, 90, 120, 150, 180]);
    } else if (tier === 2) {
      start = R.int(8, 19) * 60 + R.step(5, 55, 5);
      d = R.step(35, 170, 5);
    } else {
      start = R.int(10, 11) * 60 + R.step(5, 55, 5);
      d = R.step(70, 200, 5);
    }
    const end = start + d;
    const S = fmt12(start);
    const E = fmt12(end);
    const nextHour = Math.ceil(start / 60) * 60;
    const tl = {
      type: 'timeline',
      points: nextHour > start && nextHour < end ? [{ t: start, label: S }, { t: nextHour, label: fmt12(nextHour) }, { t: end, label: E }] : [{ t: start, label: S }, { t: end, label: E }],
      jumps: nextHour > start && nextHour < end ? [{ from: 0, to: 1, text: durText(nextHour - start) }, { from: 1, to: 2, text: durText(end - nextHour) }] : [{ from: 0, to: 1, text: durText(d) }]
    };
    if (form === 'durmin') {
      const prompt = `${ev} started at ${S} and ended at ${E}. How many minutes did it last?`;
      return {
        prompt,
        speak: sayTimes(prompt),
        input: 'number',
        answer: d,
        unit: { post: 'min' },
        hint: 'Count to the next full hour first. Then count on to the end time.',
        explain: `From ${S} to ${E} is ${durText(d)} = ${d} min.`,
        explainVisuals: [tl]
      };
    }
    if (form === 'dur') {
      const ans = durText(d);
      const pool = [durText(d + 10), durText(d - 10), durText(d + 60), durText(Math.max(5, d - 60)), durText(d + 20)].filter((p) => p !== ans);
      const prompt = `${ev} started at ${S} and ended at ${E}. How long did it last?`;
      return {
        prompt,
        speak: sayTimes(prompt),
        input: 'choice',
        answer: ans,
        choices: textChoices(R, ans, [...new Set(pool)], 4),
        hint: 'Count to the next full hour first. Then count on to the end time.',
        explain: `From ${S} to ${E} is ${ans}.`,
        explainVisuals: [tl]
      };
    }
    if (form === 'end') {
      const pool = [fmt12(end + 10), fmt12(end - 10), fmt12(end + 60), fmt12(end - 60), fmt12(end + 720)].filter((p) => p !== E);
      const prompt = `${ev} starts at ${S}. It lasts ${durText(d)}. When does it end?`;
      return {
        prompt,
        speak: sayTimes(prompt),
        input: 'choice',
        answer: E,
        choices: textChoices(R, E, [...new Set(pool)], 4),
        hint: `Add the hours first, then the minutes. Check if you pass 12 noon (a.m. → p.m.).`,
        explain: `${S} + ${durText(d)} = ${E}.`,
        explainVisuals: [tl]
      };
    }
    const pool = [fmt12(start + 10), fmt12(start - 10), fmt12(start + 60), fmt12(start - 60), fmt12(start + 720)].filter((p) => p !== S);
    const prompt = `${ev} lasts ${durText(d)}. It ends at ${E}. What time does it start?`;
    return {
      prompt,
      speak: sayTimes(prompt),
      input: 'choice',
      answer: S,
      choices: textChoices(R, S, [...new Set(pool)], 4),
      hint: `Work backwards: count back ${durText(d)} from ${E}.`,
      explain: `Count back ${durText(d)} from ${E}: it starts at ${S}.`,
      explainVisuals: [tl]
    };
  }
};

/** "… 9.00 a.m.." -> "… 9.00 a.m." in every text field of a question. */
function tidy(q) {
  const fix = (t) => (typeof t === 'string' ? t.replace(/([ap]\.m\.)\./g, '$1') : t);
  for (const k of ['prompt', 'speak', 'hint', 'explain']) if (q[k] !== undefined) q[k] = fix(q[k]);
  return q;
}

export const SKILLS = [p1OClock, p1WhichClock, p1Daily, p2FiveMin, p2PastTo, p2AmPm, p2Duration, p2AfterBefore, p2Calendar, p3Convert, p3Duration].map(
  (s) => ({ ...s, gen: (R, tier) => tidy(s.gen(R, tier)) })
);
