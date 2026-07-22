import { useEffect } from 'react'
import { createPortal } from 'react-dom'

/* shortcuts */

const SHORTCUTS = [
  { keys: ['⌘', 'K'],  alt: ['Ctrl', 'K'], label: 'Open the command palette' },
  { keys: ['?'],                            label: 'Show / hide this cheat-sheet' },
  { keys: ['←', '→'],                       label: 'Browse projects & artwork in a lightbox' },
  { keys: ['Esc'],                          label: 'Close any popup' },
  { keys: ['🌙 / ☀️'],                      label: 'Day / night — the floating button, bottom-right' },
]

export default function ShortcutsHelp({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal((
    <div className="help-backdrop" onClick={onClose}>
      <div className="help-card" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts"
           onClick={(e) => e.stopPropagation()}>
        <button className="proj-close" onClick={onClose} aria-label="Close">✕</button>
        <span className="eyebrow">⌨️ Power-user tips</span>
        <h2 style={{ fontSize: 26, margin: '4px 0 14px' }}>Keyboard shortcuts</h2>

        <ul className="help-list">
          {SHORTCUTS.map((s, i) => (
            <li key={i}>
              <span className="help-keys">
                {s.keys.map((k, j) => <kbd key={j}>{k}</kbd>)}
                {s.alt && <span className="help-or">or {s.alt.map((k, j) => <kbd key={j}>{k}</kbd>)}</span>}
              </span>
              <span className="help-label">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="help-secret">
          <span aria-hidden="true">🐾</span>
          <div>
            <strong>Secret:</strong> type <kbd>↑</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>↓</kbd>
            <kbd>←</kbd><kbd>→</kbd><kbd>←</kbd><kbd>→</kbd><kbd>B</kbd><kbd>A</kbd> for a puppy party!
          </div>
        </div>
      </div>
    </div>
  ), document.body)
}
