import { useState, useEffect } from 'react'

export default function useParallax() {
  const [p, setP] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const mm = window.matchMedia
    if (mm && (mm('(prefers-reduced-motion: reduce)').matches || mm('(hover: none)').matches)) return
    let raf = 0, tx = 0, ty = 0
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; setP({ x: tx, y: ty }) })
    }
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return p
}
