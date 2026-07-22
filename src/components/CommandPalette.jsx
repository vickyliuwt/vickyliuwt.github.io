
import { useState, useEffect, useRef, useMemo } from 'react'
import { NAV_PAGES } from '../constants/data'
import { PROFILE } from '../constants/profile'
import { unlock } from '../utils/achievements'

const BASE = import.meta.env.BASE_URL

export default function CommandPalette({ go }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)

  const actions = useMemo(() => {
    const nav = NAV_PAGES.map((p) => ({
      icon: p.emoji, label: 'Go to ' + p.label, hint: 'Page', keys: p.label,
      run: () => go(p.key),
    }))
    const extra = [
      { icon: '🌗', label: 'Toggle day / night', hint: 'Theme', keys: 'theme dark light night day mode',
        run: () => window.dispatchEvent(new Event('toggle-theme')) },
      { icon: '💬', label: 'Ask me a question', hint: 'Chat', keys: 'ask chat recruiter question',
        run: () => { go('home'); setTimeout(() => document.querySelector('.ask')?.scrollIntoView({ behavior: 'smooth' }), 350) } },
      { icon: '📄', label: 'Open my resume', hint: 'Resume', keys: 'resume cv download',
        run: () => { unlock('resume'); if (PROFILE.resume) window.open(BASE + PROFILE.resume, '_blank', 'noopener') } },
      { icon: '✉️', label: 'Copy my email', hint: PROFILE.email, keys: 'email copy contact',
        run: async () => { try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); unlock('connect'); setTimeout(() => setCopied(false), 1500) } catch (e) { window.location.href = 'mailto:' + PROFILE.email } } },
      { icon: '🐙', label: 'Open GitHub', hint: 'GitHub', keys: 'github code repo',
        run: () => { unlock('connect'); window.open(PROFILE.github, '_blank', 'noopener') } },
      ...(PROFILE.hasLinkedIn ? [{ icon: '💼', label: 'Open LinkedIn', hint: 'LinkedIn', keys: 'linkedin',
        run: () => { unlock('connect'); window.open(PROFILE.linkedin, '_blank', 'noopener') } }] : []),
    ]
    return [...nav, ...extra]
  }, [go])

  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return actions
    return actions.filter((a) => (a.label + ' ' + a.keys).toLowerCase().includes(t))
  }, [q, actions])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      else if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('open-palette', onOpen) }
  }, [])

  useEffect(() => {
    if (open) { unlock('palette'); setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 20) }
  }, [open])

  useEffect(() => { setSel(0) }, [q])

  const runAt = (i) => { const a = results[i]; if (!a) return; a.run(); if (a.label !== 'Copy my email') setOpen(false) }

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(results.length - 1, s + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); runAt(sel) }
  }

  if (!open) return null
  return (
    <div className="cmdk-backdrop" onClick={() => setOpen(false)}>
      <div className="cmdk" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-search">
          <span aria-hidden="true">🔍</span>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onListKey}
                 placeholder="Jump to a section, copy email, open resume…" aria-label="Search commands" />
          <kbd>esc</kbd>
        </div>
        <div className="cmdk-list">
          {results.length === 0 && <div className="cmdk-empty">No matches 🐾</div>}
          {results.map((a, i) => (
            <button key={a.label} className={'cmdk-item' + (i === sel ? ' on' : '')}
                    onMouseEnter={() => setSel(i)} onClick={() => runAt(i)}>
              <span className="cmdk-icon">{a.icon}</span>
              <span className="cmdk-label">{a.label}</span>
              <span className="cmdk-hint">{a.label === 'Copy my email' && copied ? 'Copied! ✓' : a.hint}</span>
            </button>
          ))}
        </div>
        <div className="cmdk-foot"><kbd>↑</kbd><kbd>↓</kbd> to navigate · <kbd>↵</kbd> to select · <kbd>⌘K</kbd> to toggle</div>
      </div>
    </div>
  )
}
