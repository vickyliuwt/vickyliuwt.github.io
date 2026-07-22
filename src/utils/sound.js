
let ctx = null
const BASE = import.meta.env.BASE_URL

// remember sound
function readPref(key) {
  try { return localStorage.getItem(key) === '1' } catch (e) { return false }
}
function writePref(key, v) {
  try { localStorage.setItem(key, v ? '1' : '0') } catch (e) { /* blocked */ }
}

let enabled = readPref('sound')

function ensureCtx() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)() } catch (e) { ctx = null }
  }
  return ctx
}

export function isSoundEnabled() { return enabled }

export function setSoundEnabled(v) {
  enabled = v
  writePref('sound', v)
  if (v) ensureCtx()
}

function tone(freq, dur, { type = 'sine', vol = 0.16, when = 0 } = {}) {
  if (!enabled) return
  const ac = ensureCtx()
  if (!ac) return
  const t = ac.currentTime + when
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gain); gain.connect(ac.destination)
  osc.start(t); osc.stop(t + dur + 0.02)
}

export function playBoop() {
  tone(523.25, 0.12, { type: 'sine', vol: 0.18 })
  tone(783.99, 0.14, { type: 'sine', vol: 0.14, when: 0.09 })
}

export function playPop() {
  tone(660, 0.09, { type: 'triangle', vol: 0.13 })
}

export function playChime() {
  ;[523, 659, 784, 1046].forEach((f, i) => tone(f, 0.12, { type: 'sine', vol: 0.12, when: i * 0.06 }))
}


export function playClick() {
  if (!enabled) return
  try {
    const a = new Audio(BASE + 'click-sound.mp3')
    a.volume = 0.35
    a.play().catch(() => {})
  } catch (e) { /* skip */ }
}


let bgm = null
export function startBgMusic() {
  try {
    if (!bgm) { bgm = new Audio(BASE + 'background-music.mp3'); bgm.loop = true; bgm.volume = 0.22 }
    bgm.play().catch(() => {})
  } catch (e) { /* ignore */ }
}
export function stopBgMusic() { if (bgm) bgm.pause() }
export function isBgMusicPlaying() { return !!(bgm && !bgm.paused) }
