import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ACHIEVEMENTS, unlockedSet, subscribe, count, total, unlock } from '../utils/achievements'
import { playChime } from '../utils/sound'

export default function Achievements() {
  const [got, setGot] = useState(() => unlockedSet())
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const queue = useRef([])
  const showing = useRef(false)

  // welcome
  useEffect(() => {
    const t = setTimeout(() => unlock('welcome'), 1200)
    return () => clearTimeout(t)
  }, [])

  // sync
  useEffect(() => subscribe(setGot), [])

  // pop
  const next = useCallback(() => {
    if (showing.current) return
    const item = queue.current.shift()
    if (!item) return
    showing.current = true
    setToast(item)
    playChime()
    setTimeout(() => {
      setToast(null)
      showing.current = false
      setTimeout(next, 250)
    }, 3200)
  }, [])

  // listen
  useEffect(() => {
    const onWin = (e) => { queue.current.push(e.detail); next() }
    window.addEventListener('achievement', onWin)
    return () => window.removeEventListener('achievement', onWin)
  }, [next])

  // esc
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const done = count()
  const all = total()
  const pct = Math.round((done / all) * 100)

  return (
    <>
      {/* badge */}
      <button className="ach-fab" onClick={() => setOpen((o) => !o)}
              aria-label={`Achievements — ${done} of ${all} unlocked`} title="Achievements">
        <span aria-hidden="true">🏆</span>
        <span className="ach-count">{done}/{all}</span>
      </button>

      {/* panel */}
      {open && (
        <div className="ach-panel" role="dialog" aria-label="Achievements">
          <div className="ach-panel-head">
            <strong>Achievements 🏆</strong>
            <span>{done}/{all}</span>
            <button className="ach-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          <div className="ach-bar" aria-hidden="true"><span style={{ width: pct + '%' }} /></div>
          <div className="ach-list">
            {ACHIEVEMENTS.map((a) => {
              const has = got.has(a.id)
              return (
                <div key={a.id} className={'ach-item' + (has ? ' got' : '')}>
                  <span className="ach-item-icon" aria-hidden="true">{has ? a.icon : '🔒'}</span>
                  <span>
                    <span className="ach-item-title">{has ? a.title : '???'}</span>
                    <span className="ach-item-desc">{a.desc}</span>
                  </span>
                </div>
              )
            })}
          </div>
          <p className="ach-hint">Explore the site to collect them all 🐾</p>
        </div>
      )}

      {/* toast */}
      {toast && createPortal((
        <div className="achievement" role="status" aria-live="polite">
          <span className="achievement-icon" aria-hidden="true">{toast.icon}</span>
          <div>
            <div className="achievement-kicker">Achievement unlocked</div>
            <div className="achievement-title">{toast.title}</div>
            <div className="achievement-desc">{toast.desc}</div>
          </div>
        </div>
      ), document.body)}
    </>
  )
}
