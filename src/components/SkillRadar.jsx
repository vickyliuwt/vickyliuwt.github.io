
import { useEffect, useRef, useState } from 'react'
import { SKILL_LEVELS } from '../constants/data'

const SIZE = 260          // viewbox
const CX = SIZE / 2
const CY = SIZE / 2 + 6
const R = 84              // radius
const RINGS = 4

// axis point
function pt(i, radius, n) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)]
}

export default function SkillRadar() {
  const data = SKILL_LEVELS
  const n = data.length
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (!('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setShow(true); io.disconnect() } })
    }, { threshold: 0.35 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // rings
  const rings = Array.from({ length: RINGS }, (_, r) => {
    const radius = (R * (r + 1)) / RINGS
    return Array.from({ length: n }, (_, i) => pt(i, radius, n).join(',')).join(' ')
  })

  // data shape
  const dataPts = data.map((s, i) => pt(i, (R * s.pct) / 100, n).join(',')).join(' ')

  return (
    <div className="radar" ref={ref}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Skill proficiency radar chart" className="radar-svg">
        {/* grid */}
        <g className="radar-grid">
          {rings.map((pts, i) => <polygon key={i} points={pts} />)}
          {data.map((_, i) => {
            const [x, y] = pt(i, R, n)
            return <line key={i} x1={CX} y1={CY} x2={x} y2={y} />
          })}
        </g>

        {/* data */}
        <g className={'radar-shape' + (show ? ' in' : '')} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <polygon points={dataPts} />
          {data.map((s, i) => {
            const [x, y] = pt(i, (R * s.pct) / 100, n)
            return <circle key={i} cx={x} cy={y} r={3.5} />
          })}
        </g>

        {/* labels */}
        <g className="radar-labels">
          {data.map((s, i) => {
            const [x, y] = pt(i, R + 20, n)
            const anchor = Math.abs(x - CX) < 6 ? 'middle' : x > CX ? 'start' : 'end'
            return (
              <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle">
                {s.stack.split(' / ')[0]}
              </text>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
