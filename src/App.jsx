import { useState, useCallback, useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Icon from './components/Icon'
import IntroOverlay from './components/IntroOverlay'
import FallingItems from './components/FallingItems'
import AvatarBadge from './components/AvatarBadge'
import CommandPalette from './components/CommandPalette'
import ShortcutsHelp from './components/ShortcutsHelp'
// import Achievements from './components/Achievements'  // off
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import ExperiencePage from './components/ExperiencePage'
import ProjectsPage from './components/ProjectsPage'
import ResumePage from './components/ResumePage'
import ArtworkPage from './components/ArtworkPage'
import AboutPage from './components/AboutPage'
import LiveClock from './components/LiveClock'
import { isSoundEnabled, setSoundEnabled, playPop, playClick, startBgMusic, stopBgMusic } from './utils/sound'
import { unlock } from './utils/achievements'
import { NAV_PAGES } from './constants/data'


const PAGES = {
  home: HomePage, experience: ExperiencePage, projects: ProjectsPage, resume: ResumePage,
  artwork: ArtworkPage, about: AboutPage,
}

// routes
const VALID_PAGES = Object.keys(PAGES)

// route
function pageFromHash() {
  if (typeof window === 'undefined') return 'home'
  const h = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase()
  return VALID_PAGES.includes(h) ? h : 'home'
}

const BASE = import.meta.env.BASE_URL

const BLOBS = [
  { bg: 'radial-gradient(circle, #f6ccd4, transparent 70%)', top: '-6%', left: '-4%', size: 380, d: '0s' },
  { bg: 'radial-gradient(circle, #ffd1dc, transparent 70%)', top: '8%',  left: '70%', size: 420, d: '3s' },
  { bg: 'radial-gradient(circle, #f6ccd4, transparent 70%)', top: '68%', left: '78%', size: 360, d: '6s' },
  { bg: 'radial-gradient(circle, #f9e7e6, transparent 70%)', top: '72%', left: '-6%', size: 340, d: '9s' },
]

const FLOATIES = [
  { img: 'food5.webp',      top: '20%', left: '5%',  d: '0s',   s: 40 },
  { img: 'dog-pixel.webp',  top: '74%', left: '12%', d: '1.5s', s: 40 },
  { img: 'food3.webp',      top: '28%', left: '92%', d: '0.8s', s: 34 },
  { img: 'bingo-wink.png',top: '82%', left: '88%', d: '2.2s', s: 40 },
  { img: 'dog-love.webp',   top: '14%', left: '46%', d: '3s',   s: 34 },
]

// burst images
const POP_IMGS = [
  'heart-icon.png', 'dog-heart.webp', 'dog-love.webp', 'dog-pixel.webp',
  'dog-glasses.webp', 'dog-search.webp',
  'food1.webp', 'food2.webp', 'food3.webp', 'food4.webp', 'food5.webp',
]

export default function App() {
  const [page, setPage] = useState(pageFromHash)
  const [paws, setPaws] = useState([])   // cursor trail
  const [pops, setPops] = useState([])   // click bursts
  const [sound, setSound] = useState(() => isSoundEnabled())
  const [music, setMusic] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [progress, setProgress] = useState(0)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
    } catch (e) { return 'day' }
  })
  const [party, setParty] = useState([])
  const idRef = useRef(0)
  const lastRef = useRef(0)
  const visitedRef = useRef(new Set(['home']))

  // navigate
  const applyPage = useCallback((target, { push = true, scroll = true } = {}) => {
    if (!VALID_PAGES.includes(target)) target = 'home'
    setPage(target)
    visitedRef.current.add(target)
    if (visitedRef.current.size >= NAV_PAGES.length) unlock('explorer')
    if (push) {
      // url
      const url = target === 'home'
        ? window.location.pathname + window.location.search
        : '#' + target
      try { window.history.pushState({ page: target }, '', url) } catch (e) { /* noop */ }
    }
    if (scroll) window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const go = useCallback((target) => {
    if (target === page) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    applyPage(target)
  }, [page, applyPage])

  // back/forward
  useEffect(() => {
    const onPop = () => {
      const raw = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase()
      if (raw === '') applyPage('home', { push: false })
      else if (VALID_PAGES.includes(raw)) applyPage(raw, { push: false })
      // ignore
    }
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('hashchange', onPop)
    }
  }, [applyPage])

  // tab title
  useEffect(() => {
    const titles = {
      home: 'Weiting Liu · Software Developer 🐾',
      experience: 'Experience · Weiting Liu 🐾',
      projects: 'Projects · Weiting Liu 🐾',
      resume: 'Resume · Weiting Liu 🐾',
      artwork: 'Artwork · Weiting Liu 🐾',
      about: 'About · Weiting Liu 🐾',
    }
    document.title = titles[page] || titles.home
  }, [page])

  const reduce = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // paw trail
  useEffect(() => {
    if (reduce()) return
    const onMove = (e) => {
      const now = Date.now()
      if (now - lastRef.current < 240) return
      lastRef.current = now
      const id = idRef.current++
      const rot = (Math.random() * 50 - 25).toFixed(0)
      setPaws((p) => [...p.slice(-4), { id, x: e.clientX, y: e.clientY, rot }])
      setTimeout(() => setPaws((p) => p.filter((x) => x.id !== id)), 1100)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // click effect
  useEffect(() => {
    const onClick = (e) => {
      playClick()   // sfx
      if (reduce()) return
      const img = POP_IMGS[Math.floor(Math.random() * POP_IMGS.length)] // one image
      const n = 5
      const batch = Array.from({ length: n }, () => {
        const id = idRef.current++
        return {
          id,
          x: e.clientX + (Math.random() * 60 - 30),
          y: e.clientY + (Math.random() * 20 - 10),
          img,
          s: 22 + Math.random() * 16,
        }
      })
      setPops((p) => [...p, ...batch])
      batch.forEach((b) => setTimeout(() => setPops((p) => p.filter((x) => x.id !== b.id)), 900))
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  // top
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 320)
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!els.length) return
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [page])

  const toggleSound = () => { const v = !sound; setSound(v); setSoundEnabled(v) }

  // theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'night' ? '#241a2a' : '#f6ccd4')
    try { localStorage.setItem('theme', theme) } catch (e) { /* noop */ }
  }, [theme])
  const toggleTheme = () => setTheme((t) => (t === 'day' ? 'night' : 'day'))

  // command
  useEffect(() => {
    const h = () => toggleTheme()
    window.addEventListener('toggle-theme', h)
    return () => window.removeEventListener('toggle-theme', h)
  }, [])

  // shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '?') return
      const el = document.activeElement
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
      if (typing) return
      e.preventDefault()
      setShowHelp((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // konami
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let pos = 0
    const imgs = ['dog-love.webp','dog-pixel.webp','food1.webp','food3.webp','bingo-wink.png']
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0)
      if (pos === seq.length) {
        pos = 0
        const drops = Array.from({ length: 36 }, (_, i) => ({
          id: 'party' + Date.now() + i,
          left: Math.random() * 96,
          img: imgs[Math.floor(Math.random() * imgs.length)],
          delay: Math.random() * 1.2,
          size: 26 + Math.random() * 30,
        }))
        setParty(drops)
        unlock('konami')
        setTimeout(() => setParty([]), 5000)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const ActivePage = PAGES[page]

  return (
    <>
      <IntroOverlay />
      <div className="scroll-progress" style={{ width: progress + '%' }} aria-hidden="true" />
      <CommandPalette go={go} />
      <ShortcutsHelp open={showHelp} onClose={() => setShowHelp(false)} />
      {/* achievements off */}
      {/* <Achievements /> */}
      <AvatarBadge />
        <LiveClock />
      <FallingItems />

      {BLOBS.map((b, i) => (
        <div key={i} className="blob" style={{ top: b.top, left: b.left, width: b.size, height: b.size, background: b.bg, animationDelay: b.d }} />
      ))}

      {FLOATIES.map((f, i) => (
        <img key={i} className="floaty" src={BASE + 'dog/' + f.img} alt="" aria-hidden="true" style={{ top: f.top, left: f.left, animationDelay: f.d, width: f.s }} />
      ))}

      {paws.map((p) => (
        <span key={p.id} className="paw-trail" aria-hidden="true" style={{ left: p.x, top: p.y, '--rot': p.rot + 'deg' }}>🐾</span>
      ))}

      {pops.map((p) => (
        <img key={p.id} className="click-pop" src={BASE + 'dog/' + p.img} alt="" aria-hidden="true" onError={(e) => { e.currentTarget.style.display = 'none' }} style={{ left: p.x, top: p.y, width: p.s }} />
      ))}

      {party.map((d) => (
        <img key={d.id} className="party-drop" src={BASE + 'dog/' + d.img} alt="" aria-hidden="true"
             style={{ left: d.left + 'vw', width: d.size, animationDelay: d.delay + 's' }} />
      ))}

      <Nav page={page} go={go} />

      <a href="#main" className="skip-link">Skip to content</a>

      <main id="main" key={page} style={{ position: 'relative', zIndex: 1 }}>
        <ActivePage go={go} />
      </main>

      <Footer go={go} />

      <div className="fab-group">
        <button className="fab" onClick={toggleTheme}
                aria-label={theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'} title="Day / night">
          {theme === 'day' ? '🌙' : '☀️'}
        </button>
        <button className={'fab' + (sound ? ' on' : '')} onClick={toggleSound}
                aria-label={sound ? 'Turn sound off' : 'Turn sound on'} title="Cute sounds">
          {sound ? '🔊' : '🔈'}
        </button>
        <button className={'fab' + (music ? ' on' : '')} title="Background music"
                aria-label={music ? 'Turn music off' : 'Turn music on'}
                onClick={() => { const v = !music; setMusic(v); v ? startBgMusic() : stopBgMusic() }}>
          <Icon img={music ? 'music-on.png' : 'music-off.png'} emoji={music ? '🎵' : '🎶'} size={22} />
        </button>
        <button className="fab fab-help" onClick={() => setShowHelp(true)}
                aria-label="Keyboard shortcuts" title="Keyboard shortcuts (press ?)">⌨️</button>
        {showTop && (
          <button className="fab fab-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  aria-label="Back to top" title="Back to top">
            <svg className="ring" viewBox="0 0 44 44" width="100%" height="100%" aria-hidden="true">
              <circle className="ring-bg" cx="22" cy="22" r="19" />
              <circle className="ring-fg" cx="22" cy="22" r="19"
                      style={{ strokeDasharray: 119.4, strokeDashoffset: 119.4 * (1 - progress / 100) }} />
            </svg>
            <span className="fab-top-icon">🐾</span>
          </button>
        )}
      </div>


    </>
  )
}
