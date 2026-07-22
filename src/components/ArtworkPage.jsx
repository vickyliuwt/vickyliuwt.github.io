import { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import PageHeader from './PageHeader'
import useSwipe from '../hooks/useSwipe'
import { ARTWORKS, ART_CATEGORIES } from '../constants/data'

const BASE = import.meta.env.BASE_URL

const CAT_EMOJI = { All: '🎨', Drawing: '✏️', Painting: '🖌️', Animation: '🎬', Modeling: '🧊', Design: '✨' }

export default function ArtworkPage() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null) // open index

  const filtered = useMemo(
    () => (cat === 'All' ? ARTWORKS : ARTWORKS.filter((a) => a.category === cat)),
    [cat]
  )

  // present cats
  const cats = useMemo(() => {
    const present = new Set(ARTWORKS.map((a) => a.category))
    return ART_CATEGORIES.filter((c) => c === 'All' || present.has(c))
  }, [])

  // keyboard
  useEffect(() => {
    if (open == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      else if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % filtered.length)
      else if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + filtered.length) % filtered.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered])

  const art = open != null ? filtered[open] : null

  const swipe = useSwipe(
    () => setOpen((i) => (i + 1) % filtered.length),
    () => setOpen((i) => (i - 1 + filtered.length) % filtered.length)
  )

  return (
    <div className="page page-enter dotty">
      <div className="wrap">
        <PageHeader eyebrow="🎨 Made with paws & love" title="Artwork"
          sub="From my animation & design background click a piece to enlarge." />

        {/* filter off */}
        {/*
        <div className="filter-bar">
          {cats.map((c) => (
            <button key={c} className={'filter-chip' + (cat === c ? ' on' : '')}
                    onClick={() => { setCat(c); setOpen(null) }} aria-pressed={cat === c}>
              {CAT_EMOJI[c] || '🎨'} {c}
            </button>
          ))}
          <span className="filter-count">{filtered.length} piece{filtered.length === 1 ? '' : 's'}</span>
        </div>
        */}

        <div className="art-grid">
          {filtered.map((a, i) => (
            <button key={a.img || a.drive || i} onClick={() => setOpen(i)} className={'polaroid c-' + a.color}>
              <span className="tape" aria-hidden="true" />
              <Thumb art={a} />
              <div className="cap">
                <span className="art-badge">{a.category}</span>
                {a.title}<small>{a.medium} · {a.year}{a.size ? ' · ' + a.size : ''}</small>
              </div>
            </button>
          ))}
        </div>
        {filtered.length === 0 && <p style={{ textAlign: 'center', margin: '30px 0', color: 'var(--cocoa-2)' }}>Nothing here yet 🐾</p>}
      </div>

      {/* lightbox */}
      {art && createPortal((
        <div className="art-backdrop" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={art.title}
             {...swipe}>
          {filtered.length > 1 && (
            <button className="art-nav left" onClick={(e) => { e.stopPropagation(); setOpen((i) => (i - 1 + filtered.length) % filtered.length) }} aria-label="Previous">‹</button>
          )}
          <div onClick={(e) => e.stopPropagation()} className="card art-lightbox">
            <div className={'c-' + art.color}><Thumb art={art} big /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, gap: 10, flexWrap: 'wrap' }}>
              <div>
                <span className="art-badge">{art.category}</span>
                <h3 style={{ fontSize: 24 }}>{art.title}</h3>
                <span style={{ color: 'var(--cocoa-2)' }}>{art.medium} · {art.year}{art.size ? ' · ' + art.size : ''}</span>
              </div>
              <button className="btn btn-pink" onClick={() => setOpen(null)}>Close ✕</button>
            </div>
            {filtered.length > 1 && <div className="proj-browse">← → to browse · {open + 1} / {filtered.length}</div>}
          </div>
          {filtered.length > 1 && (
            <button className="art-nav right" onClick={(e) => { e.stopPropagation(); setOpen((i) => (i + 1) % filtered.length) }} aria-label="Next">›</button>
          )}
        </div>
      ), document.body)}
    </div>
  )
}

/* thumbnail */
function Thumb({ art, big }) {
    const isYT = !!art.youtube
    const isDrive = !!art.drive

    // big
    if ((isYT || isDrive) && big) {
        const src = isYT
            ? `https://www.youtube.com/embed/${art.youtube}?autoplay=1&rel=0`
            : `https://drive.google.com/file/d/${art.drive}/preview`
        return (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 16, overflow: 'hidden', background: 'var(--tile)' }}>
                <iframe src={src} title={art.title} allow="autoplay; encrypted-media" allowFullScreen
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
            </div>
        )
    }

    // grid
    if (isYT || isDrive) {
        const thumb = isYT
            ? `https://img.youtube.com/vi/${art.youtube}/hqdefault.jpg`
            : (art.img ? BASE + art.img : `https://drive.google.com/thumbnail?id=${art.drive}&sz=w800`)
        return (
            <div style={{ position: 'relative' }}>
                <img src={thumb} alt={art.title} loading="lazy" decoding="async"
                     style={{ width: '100%', borderRadius: 16, display: 'block', background: 'var(--tile)' }} />
                <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>▶</span>
        </span>
            </div>
        )
    }

    if (art.video) {
        return <video src={BASE + art.video} muted loop autoPlay playsInline
                      style={{ width: '100%', borderRadius: 16, display: 'block', background: 'var(--tile)' }} />
    }
    if (art.img) {
        return <img src={BASE + art.img} alt={art.title} loading="lazy" decoding="async"
                    style={{ width: '100%', borderRadius: 16, display: 'block', background: 'var(--tile)' }} />
    }
    return (
        <div style={{ width: '100%', aspectRatio: big ? '4 / 3' : '1 / 1', borderRadius: 16, background: 'var(--tile)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: big ? 90 : 58 }} aria-hidden="true">{art.emoji}</div>
    )
}