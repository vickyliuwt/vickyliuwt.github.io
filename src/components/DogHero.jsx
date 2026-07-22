
import { useState } from 'react'
import { playBoop } from '../utils/sound'

const BASE = import.meta.env.BASE_URL
const FACES = ['dog-glasses.webp', 'dog-search.webp', 'bingo-wink.png', 'dog-love.webp']
const BARKS = ['Woof 🐾', 'Hehe~ 💗', 'Vicky ', 'Yip yip ', "pawsome!", 'Hire me', ' 💕']

export default function DogHero({ size = 320 }) {
  const [idx, setIdx] = useState(0)
  const [excited, setExcited] = useState(false)
  const [bark, setBark] = useState(null)

  const poke = () => {
    setIdx((i) => (i + 1) % FACES.length)
    setExcited(true)
    setBark(BARKS[Math.floor(Math.random() * BARKS.length)])
    playBoop()
    setTimeout(() => setExcited(false), 700)
    setTimeout(() => setBark(null), 1500)
  }

  return (
    <div style={{ width: size, maxWidth: '100%', position: 'relative' }}>
      {bark && (
        <div style={{
          position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', zIndex: 5,
          background: '#fff', borderRadius: 18, padding: '8px 16px', boxShadow: 'var(--shadow)',
          fontFamily: 'var(--hand)', fontWeight: 700, color: 'var(--rose)', fontSize: 22, whiteSpace: 'nowrap',
          animation: 'pop .25s both',
        }}>{bark}</div>
      )}

      <span className="sparkle" style={{ top: '2%', left: '8%', fontSize: 22 }} aria-hidden="true">✨</span>
      <span className="sparkle" style={{ top: '16%', right: '4%', fontSize: 18, animationDelay: '.8s' }} aria-hidden="true">💗</span>
      <span className="sparkle" style={{ bottom: '10%', left: '4%', fontSize: 20, animationDelay: '1.4s' }} aria-hidden="true">⭐</span>

      <img
        src={BASE + 'dog/' + FACES[idx]}
        alt="Fluffy the dog mascot — click me!"
        onClick={poke}
        role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); poke() } }}
        style={{
          width: '100%', display: 'block', cursor: 'pointer', userSelect: 'none',
          filter: 'drop-shadow(0 12px 16px rgba(180,110,140,0.22))',
          animation: excited ? 'hop .5s ease-in-out' : 'bounce 3.6s ease-in-out infinite',
        }}
        draggable={false}
      />
    </div>
  )
}
