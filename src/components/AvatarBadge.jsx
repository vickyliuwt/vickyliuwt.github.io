import { useState, useRef, useEffect } from 'react'
import { PROFILE } from '../constants/profile'
import { PROJECTS } from '../constants/data'
import ContactForm from './ContactForm'

const BASE = import.meta.env.BASE_URL

export default function AvatarBadge() {
    const [wig, setWig] = useState(false)
    const [open, setOpen] = useState(false)
    const badgeRef = useRef(null)
    const panelRef = useRef(null)

    const onClick = () => {
        setWig(true)
        setTimeout(() => setWig(false), 600)
        setOpen((o) => !o)
    }

    // close
    useEffect(() => {
        if (!open) return
        const onDown = (e) => {
            if (badgeRef.current && badgeRef.current.contains(e.target)) return
            if (panelRef.current && panelRef.current.contains(e.target)) return
            setOpen(false)
        }
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
        document.addEventListener('mousedown', onDown)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onDown)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    return (
        <>
            <button ref={badgeRef} className={"avatar-badge" + (wig ? " wig" : "")} onClick={onClick}
                    aria-expanded={open} aria-label="Say hello">
        <span className="avatar-wrap">
          <img className="avatar-dog" src={BASE + 'dog/dog-heart.webp'} alt="" />
        </span>
                <span className="avatar-info">
          <span className="avatar-name">{PROFILE.name}</span>
          <span className="avatar-stats"><span>🐾 {PROJECTS.length}+</span><span>💗 ∞</span></span>
        </span>
            </button>

            {open && (
                <div ref={panelRef} className="ach-panel" style={{ left: 16, right: 'auto', bottom: 120, width: 'min(460px, calc(100vw - 32px))' }} role="dialog" aria-label="Say hello">
                    <div className="ach-panel-head">
                        <strong>Say hello 🐾</strong>
                        <button className="ach-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
                    </div>

                    <div style={{ padding: '16px 18px' }}>
                        <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--cocoa-2)' }}>
                            {PROFILE.tagline}
                        </p>

                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                            <a className="btn btn-cream" href={`mailto:${PROFILE.email}`}>Say hello </a>
                            <a className="btn btn-cream" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            {PROFILE.hasLinkedIn && <a className="btn btn-cream" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                        </div>

                        <div style={{ fontSize: 13, color: 'var(--cocoa-2)', marginBottom: 14 }}>
                            {PROFILE.email} · {PROFILE.location}
                        </div>

                        <ContactForm storageKey="sayhello" />
                    </div>
                </div>
            )}
        </>
    )
}
