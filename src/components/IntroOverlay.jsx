import { useEffect, useState } from 'react'
import { PROFILE } from '../constants/profile'

const BASE = import.meta.env.BASE_URL


export default function IntroOverlay() {
  const [text, setText] = useState('')
  const [hide, setHide] = useState(false)
  const full = PROFILE.greeting

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setHide(true); return }

    let i = 0
    const type = setInterval(() => {
      i++
      setText(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(type)
        setTimeout(() => setHide(true), 400)
      }
    }, 45)
    return () => clearInterval(type)
  }, [full])

  return (
    <div className={'intro' + (hide ? ' hide' : '')} onClick={() => setHide(true)}
         style={hide ? { pointerEvents: 'none' } : undefined} aria-hidden={hide}>
      <img src={BASE + 'dog/dog-heart.webp'} alt="" style={{ width: 120, animation: 'bounce 2s ease-in-out infinite', filter: 'drop-shadow(0 8px 16px rgba(214,51,132,0.35))' }} />
      <div className="intro-greeting-js hand" style={{
        fontFamily: 'var(--hand)', fontSize: 'clamp(26px, 6vw, 46px)', color: '#b0185a',
        textShadow: '0 2px 10px rgba(255,255,255,0.6)', minHeight: '1.2em',
      }}>
        {text}<span style={{ animation: 'caret .7s step-end infinite', color: '#d6336c' }}>|</span>
      </div>
      <div className="intro-hint">tap to enter 🐾</div>
    </div>
  )
}
