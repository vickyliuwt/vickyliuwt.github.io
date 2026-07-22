
import { useState, useRef } from 'react'
import { CAPSULES } from '../constants/data'
import { playChime, playBoop } from '../utils/sound'
import { unlock } from '../utils/achievements'

const BASE = import.meta.env.BASE_URL
const FOODS = ['food1.webp', 'food2.webp', 'food3.webp', 'food4.webp', 'food5.webp']
const CAP_IMG = { blue: 'capsule-blue.webp', gold: 'capsule-gold.webp', red: 'capsule-red.webp' }

export default function Gachapon() {
  const [spinning, setSpinning] = useState(false)
  const [prize, setPrize] = useState(null)
  const [draws, setDraws] = useState(0)
  const [collected, setCollected] = useState([])
  const [foods, setFoods] = useState([])
  const fidRef = useRef(0)
  const busyRef = useRef(false)

  const rainFood = () => {
    const batch = Array.from({ length: 12 }, () => {
      const id = fidRef.current++
      return { id, left: Math.random() * 100, img: FOODS[Math.floor(Math.random() * FOODS.length)], dur: 1500 + Math.random() * 1300, size: 26 + Math.random() * 18 }
    })
    setFoods((f) => [...f, ...batch])
    batch.forEach((b) => setTimeout(() => setFoods((f) => f.filter((x) => x.id !== b.id)), b.dur + 100))
  }

  const draw = () => {
    if (busyRef.current) return
    busyRef.current = true
    setSpinning(true); setPrize(null); playBoop()
    setTimeout(() => {
      const pick = CAPSULES[Math.floor(Math.random() * CAPSULES.length)]
      setPrize(pick); setSpinning(false)
      setDraws((d) => d + 1)
      unlock('culturefit')
      setCollected((c) => (c.includes(pick.title) ? c : [...c, pick.title]))
      playChime(); rainFood()
      busyRef.current = false
    }, 1400)
  }

  const uniqueIcons = collected.map((t) => CAPSULES.find((c) => c.title === t)?.icon).filter(Boolean)

  return (
    <section style={{ position: 'relative', textAlign: 'center', padding: '10px 0 40px' }}>
      {foods.map((f) => (
        <img key={f.id} src={BASE + 'dog/' + f.img} alt="" aria-hidden="true" style={{
          position: 'absolute', top: -34, left: f.left + '%', width: f.size, pointerEvents: 'none', zIndex: 3,
          animation: `fallDown ${f.dur}ms linear forwards`, '--op': 0.95,
        }} />
      ))}

      <span className="eyebrow">🎰 Lucky draw</span>
      <h2 className="section-title" style={{ fontSize: 'clamp(26px,5vw,42px)' }}>Spin the capsule machine</h2>
      <p className="section-sub" style={{ margin: '0 auto 20px' }}>Give it a turn to unlock a random little tag about me!</p>

      <img
        src={BASE + 'dog/' + (spinning ? 'gacha-spin.webp' : 'gacha-idle.webp')}
        alt="Capsule toy machine"
        style={{ width: 230, maxWidth: '70%', display: 'block', margin: '0 auto',
                 filter: 'drop-shadow(0 12px 18px rgba(118,75,162,0.22))' }}
      />

      <button className="btn btn-grape" onClick={draw} disabled={spinning} style={{ marginTop: 10 }}>
        {spinning ? 'Turning… 🔄' : 'Turn the knob 🎁'}
      </button>

      {prize && !spinning && (
        <div className="capsule-reveal" key={draws}>
          <img src={BASE + 'dog/' + CAP_IMG[prize.rarity]} alt="" style={{ width: 120, animation: 'bob 2s ease-in-out infinite' }} />
          <div className={'capsule cap-' + prize.rarity} style={{ marginTop: 0 }}>
            <div className="capsule-title">{prize.icon} {prize.title}</div>
            <div className="capsule-text">{prize.text}</div>
            {prize.rarity !== 'blue' && <div className="capsule-rare">{prize.rarity === 'red' ? '★ SUPER RARE ★' : '★ RARE ★'}</div>}
          </div>
        </div>
      )}

      <div className="hand" style={{ marginTop: 18, fontSize: 22, color: 'var(--rose)' }}>Capsules drawn: {draws}</div>
      {uniqueIcons.length > 0 && (
        <div style={{ marginTop: 6, fontSize: 24, letterSpacing: 4 }} aria-label="collected capsules">{uniqueIcons.join(' ')}</div>
      )}
    </section>
  )
}
