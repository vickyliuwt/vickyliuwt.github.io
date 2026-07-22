
import { useEffect, useRef, useState } from 'react'
import { SKILL_LEVELS } from '../constants/data'

export default function SkillBars() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (!('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setShow(true); io.disconnect() } })
    }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div className="skillbars" ref={ref}>
      {SKILL_LEVELS.map((s) => (
        <div className="skillbar" key={s.stack}>
          <div className="skillbar-top">
            <span className="skillbar-name">{s.stack}</span>
            <span className="skillbar-pct">{s.pct}%</span>
          </div>
          <div className="skillbar-track">
            <div className="skillbar-fill" style={{ width: show ? s.pct + '%' : '0%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
