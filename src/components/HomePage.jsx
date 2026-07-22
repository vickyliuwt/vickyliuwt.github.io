import { useState, useRef } from 'react'
import DogHero from './DogHero'
import AskMe from './AskMe'
import Gachapon from './Gachapon'
import SkillMarquee from './SkillMarquee'
import AnimatedNumber from './AnimatedNumber'
import useTypewriter from '../hooks/useTypewriter'
import useParallax from '../hooks/useParallax'
import { PROFILE } from '../constants/profile'
import { TYPEWRITER_TITLES, STATS } from '../constants/data'
import { playChime } from '../utils/sound'
import { unlock } from '../utils/achievements'
import { downloadVCard } from '../utils/vcard'

const BASE = import.meta.env.BASE_URL

const TREAT_MSGS = [
  'Give Bingo a treat! 🦴',
  'Yum! One more? 💕',
  "She's so happy! 🐾",
  'Best friends now! 💗',
  'Tail going crazy! 🎾',
]

// cs treats
const CS_TREATS = [
  "def treat(): return joy   # O(1) happiness",
  "git commit -m 'fed Bingo' ✅",
  "Fun fact: the first computer bug was a real moth (1947) 🦋",
  "npm install treats  →  0 vulnerabilities 💗",
  "Cache hit! Treat served in O(1) ⚡",
  "01110100 01110010 01100101 01100001 01110100 = 'treat'",
  "Recursion base case reached: just one more treat 🐾",
  "sudo give-treat  →  permission granted 🎾",
]

export default function HomePage({ go }) {
  const typed = useTypewriter(TYPEWRITER_TITLES)
  const par = useParallax()
  const [treats, setTreats] = useState(0)
  const [bones, setBones] = useState([])
  const [csTreat, setCsTreat] = useState('')
  const bidRef = useRef(0)

  const giveTreat = () => {
    setCsTreat(CS_TREATS[treats % CS_TREATS.length])
    setTreats((t) => t + 1)
    unlock('treats')
    playChime()
    const batch = Array.from({ length: 4 }, () => {
      const id = bidRef.current++
      return { id, left: 20 + Math.random() * 60, e: Math.random() < 0.5 ? '🦴' : '💗' }
    })
    setBones((b) => [...b, ...batch])
    batch.forEach((b) => setTimeout(() => setBones((p) => p.filter((x) => x.id !== b.id)), 1000))
  }

  const treatLabel = TREAT_MSGS[Math.min(treats, TREAT_MSGS.length - 1)]

  return (
    <>
    <div className="page page-enter" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh', paddingTop: 90, position: 'relative' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>


        <div className="stagger" style={{ position: 'relative', zIndex: 2 }}>
          {PROFILE.openToWork && (
            <div className="otw"><span className="dotlive" aria-hidden="true" /> Open to work</div>
          )}
          <span className="eyebrow">🐾 Hello, I'm</span>
          <h1 className="shimmer-name" style={{ fontSize: 'clamp(44px, 9vw, 78px)', fontWeight: 800, margin: '4px 0 2px' }}>
            {PROFILE.name}
          </h1>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(20px, 4.5vw, 30px)', color: 'var(--pink-ink)', minHeight: '1.4em' }}>
            {typed}
            <span style={{ animation: 'caret 1s steps(1) infinite', color: 'var(--caramel-d)' }}>|</span>
          </div>
          <p style={{ fontSize: 18, margin: '16px 0 8px', maxWidth: 420 }}>{PROFILE.tagline}</p>
          {PROFILE.valueProp && <p className="value-prop">{PROFILE.valueProp}</p>}
          <p style={{ fontSize: 15, color: 'var(--cocoa-2)', opacity: .8, marginBottom: 10 }}>{PROFILE.educationLine}</p>
          {PROFILE.availability && (
            <p className="avail-line" style={{ marginBottom: 24 }}>
              <span aria-hidden="true">📍</span> {PROFILE.availability}
            </p>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-pink" onClick={() => go('experience')}>See my work 🎾</button>
            <button className="btn btn-cream" onClick={() => go('artwork')}>My artwork 🎨</button>
            {PROFILE.resume && (
              <a className="btn btn-cream" href={BASE + PROFILE.resume} target="_blank" rel="noopener noreferrer" onClick={() => unlock('resume')}>Resume 📄</a>
            )}
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap', fontFamily: 'var(--display)', fontWeight: 700 }}>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" onClick={() => unlock('connect')} style={{ color: 'var(--cocoa)', textDecoration: 'none' }}>GitHub ↗</a>
            {PROFILE.hasLinkedIn && (
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => unlock('connect')} style={{ color: 'var(--cocoa)', textDecoration: 'none' }}>LinkedIn ↗</a>
            )}
            <a href={`mailto:${PROFILE.email}`} onClick={() => unlock('connect')} style={{ color: 'var(--cocoa)', textDecoration: 'none' }}>Email ↗</a>
            <button onClick={downloadVCard} title="Save my contact card"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cocoa)', fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'inherit', padding: 0 }}>Save contact ↓</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <button className="treat-btn" onClick={giveTreat}>{treatLabel}</button>
            <span className="hand" style={{ fontSize: 22, color: 'var(--rose)' }}>
              Treats: {treats} {'💗'.repeat(Math.min(treats, 5))}
            </span>
          </div>
          {csTreat && (
            <div className="cs-treat" key={treats}>
              <span aria-hidden="true">🦴💻</span>
              <code>{csTreat}</code>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            background: 'var(--bubble)', borderRadius: 22, padding: '10px 20px', boxShadow: 'var(--shadow)',
            fontFamily: 'var(--hand)', fontWeight: 700, color: 'var(--bubble-ink)', fontSize: 24,
            position: 'relative', marginBottom: 6, animation: 'pop .5s .3s both',
          }}>
            {PROFILE.greeting}
            <span style={{ position: 'absolute', bottom: -9, left: 40, width: 18, height: 18, background: 'var(--bubble)', transform: 'rotate(45deg)', borderRadius: 3 }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%', transform: `translate(${par.x * 16}px, ${par.y * 16}px)`, transition: 'transform .15s ease-out' }}>
            <div className="glow" />
            <span className="sparkle" style={{ top: '4%', left: '12%', fontSize: 24 }} aria-hidden="true">✨</span>
            <span className="sparkle" style={{ top: '20%', right: '8%', fontSize: 18, animationDelay: '.8s' }} aria-hidden="true">⭐</span>
            <span className="sparkle" style={{ bottom: '12%', left: '6%', fontSize: 20, animationDelay: '1.4s' }} aria-hidden="true">✨</span>
            <DogHero size={330} />
            {bones.map((b) => (
              <span key={b.id} aria-hidden="true" style={{ position: 'absolute', bottom: '18%', left: b.left + '%', fontSize: 26, pointerEvents: 'none', animation: 'popUp 1s ease-out forwards' }}>{b.e}</span>
            ))}
          </div>
        </div>

      </div>
      <div className="scroll-hint" aria-hidden="true"><span>Scroll</span><span className="chev">⌄</span></div>
    </div>

    <div className="wrap" style={{ padding: '0 20px 6px' }}>
      <div className="stats-band reveal">
        {STATS.map((s, i) => (
          <div className="stat-cell" key={i}>
            <div className="stat-num"><AnimatedNumber value={s.num} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    <SkillMarquee />

    <div className="wrap" style={{ padding: '0 20px 10px' }}>
      <AskMe />
    </div>

    <div className="wrap" style={{ padding: '0 20px 40px' }}>
      <Gachapon />
    </div>
    </>
  )
}
