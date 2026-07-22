/* badges */

const KEY = 'vicky.ach.v1'

// list
export const ACHIEVEMENTS = [
  { id: 'welcome',    icon: '🐾', title: 'Welcome!',       desc: 'You found my portfolio.' },
  { id: 'explorer',   icon: '🧭', title: 'Explorer',       desc: 'Visited every page.' },
  { id: 'treats',     icon: '🦴', title: 'Treat Buddy',    desc: 'Fed the pup a snack.' },
  { id: 'recruiter',  icon: '💬', title: 'Curious',        desc: 'Asked me a question.' },
  { id: 'behavioral', icon: '🤝', title: 'Deep Dive',      desc: 'Asked how I work.' },
  { id: 'closer',     icon: '⭐', title: 'The Big One',     desc: 'Asked why to hire me.' },
  { id: 'filter',     icon: '🔎', title: 'Sorter',         desc: 'Filtered my projects.' },
  { id: 'resume',     icon: '📄', title: 'Homework Done',  desc: 'Opened my resume.' },
  { id: 'connect',    icon: '📬', title: 'Let\u2019s Talk', desc: 'Reached out to me.' },
  { id: 'palette',    icon: '⌨️', title: 'Power User',     desc: 'Opened the palette.' },
  { id: 'culturefit', icon: '🎰', title: 'Lucky Spin',     desc: 'Turned the capsule knob.' },
  { id: 'konami',     icon: '🎉', title: 'Secret Code',    desc: 'Found the puppy party.' },
]

const IDS = new Set(ACHIEVEMENTS.map((a) => a.id))
const listeners = new Set()

function load() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) }
  catch (e) { return new Set() }
}
function save(got) {
  try { localStorage.setItem(KEY, JSON.stringify([...got])) } catch (e) { /* blocked */ }
}

let got = load()

// getters
export function unlockedSet() { return new Set(got) }
export function isUnlocked(id) { return got.has(id) }
export function count() { return got.size }
export function total() { return ACHIEVEMENTS.length }

// watch
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }

// award
export function unlock(id) {
  if (!IDS.has(id) || got.has(id)) return
  got.add(id)
  save(got)
  const meta = ACHIEVEMENTS.find((a) => a.id === id)
  try { window.dispatchEvent(new CustomEvent('achievement', { detail: meta })) } catch (e) { /* noop */ }
  listeners.forEach((fn) => { try { fn(new Set(got)) } catch (e) { /* noop */ } })
}

// wipe
export function resetAchievements() {
  got = new Set()
  save(got)
  listeners.forEach((fn) => fn(new Set(got)))
}
