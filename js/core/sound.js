// Sound effects (Web Audio, no files) and English text-to-speech.
import { toSpeech } from '../ui/markup.js';

let ctx = null;
let enabled = true;
export function setSoundEnabled(on) {
  enabled = !!on;
}

function tone(freq, start, dur, type = 'sine', gain = 0.12) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.001, start + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(start);
  o.stop(start + dur);
}

export function sfx(kind) {
  if (!enabled) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;
    if (kind === 'correct') {
      tone(523.25, t, 0.1, 'sine');
      tone(659.25, t + 0.09, 0.1, 'sine');
      tone(783.99, t + 0.18, 0.2, 'triangle', 0.14);
    } else if (kind === 'wrong') {
      tone(300, t, 0.12, 'sine', 0.09);
      tone(240, t + 0.11, 0.16, 'sine', 0.09);
    } else if (kind === 'tap') {
      tone(880, t, 0.04, 'sine', 0.05);
    } else if (kind === 'fanfare') {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.11, i === 3 ? 0.4 : 0.12, 'triangle', 0.15));
    } else if (kind === 'tick') {
      tone(1200, t, 0.03, 'square', 0.03);
    } else if (kind === 'level') {
      [392, 523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, t + i * 0.08, 0.18, 'triangle', 0.12));
    }
  } catch {
    // audio not available
  }
}

// ------------------------------------------------------------------ speech
let voice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return null;
  const vs = window.speechSynthesis.getVoices();
  const prefs = [/en-SG/i, /en-GB/i, /en-AU/i, /en-US/i, /^en/i];
  for (const re of prefs) {
    const v = vs.find((x) => re.test(x.lang) && /female|samantha|karen|serena|moira|kate|google/i.test(x.name)) || vs.find((x) => re.test(x.lang));
    if (v) return v;
  }
  return null;
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    voice = pickVoice();
  };
}

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, { rate = 0.92 } = {}) {
  if (!canSpeak() || !text) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(toSpeech(text));
    if (!voice) voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang || 'en-GB';
    u.rate = rate;
    u.pitch = 1.05;
    synth.speak(u);
  } catch {
    // speech not available
  }
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
