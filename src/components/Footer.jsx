import { NAV_PAGES } from '../constants/data'
import { PROFILE } from '../constants/profile'
import LiveClock from './LiveClock'

export default function Footer({ go }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="footer-name">🐾 {PROFILE.name}</span>
          <span className="footer-tag">{PROFILE.tagline}</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {NAV_PAGES.map((p) => (
            <button key={p.key} onClick={() => go(p.key)}>{p.label}</button>
          ))}
        </nav>
        <div className="footer-social">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub </a>
          {PROFILE.hasLinkedIn && <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
          <a href={`mailto:${PROFILE.email}`}>Email ↗</a>
        </div>
      </div>
        <div className="footer-clock-row">
            <LiveClock variant="inline" />
        </div>
      <div className="footer-base">© {PROFILE.year} {PROFILE.name}{PROFILE.footerNote && PROFILE.footerNote.trim() ? ` · ${PROFILE.footerNote.trim()}` : ''}</div>
    </footer>
  )
}
