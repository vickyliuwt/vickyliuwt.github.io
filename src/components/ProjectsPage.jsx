import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageHeader from './PageHeader'
import useSwipe from '../hooks/useSwipe'
import { PROJECTS } from '../constants/data'
import { unlock } from '../utils/achievements'

const BASE = import.meta.env.BASE_URL

const SORTS = [
    { key: 'featured', label: 'Default' },
    { key: 'newest',   label: 'Newest' },
    { key: 'oldest',   label: 'Oldest' },
    { key: 'az',       label: 'A–Z' },
]

export default function ProjectsPage() {
    const [active, setActive] = useState([])
    const [query, setQuery] = useState('')       // free-text search
    const [sort, setSort] = useState('featured') // ordering
    const [open, setOpen] = useState(null) // modal
    const [copied, setCopied] = useState(false)

    const tags = useMemo(() => {
        const count = {}
        PROJECTS.forEach((p) => p.tags.forEach((t) => { count[t] = (count[t] || 0) + 1 }))
        return Object.keys(count).sort((a, b) => count[b] - count[a])
    }, [])

    const toggle = (t) => { unlock('filter'); setActive((c) => c.includes(t) ? c.filter((x) => x !== t) : [...c, t]) }

    // filter
    const shown = useMemo(() => {
        const q = query.trim().toLowerCase()
        const list = PROJECTS.filter((p) => {
            const byTag = active.length === 0 || p.tags.some((t) => active.includes(t))
            if (!byTag) return false
            if (!q) return true
            const hay = (p.title + ' ' + p.blurb + ' ' + (p.metric || '') + ' ' + p.tags.join(' ') + ' ' + (p.keywords || '') + ' ' + (p.highlights || []).join(' ')).toLowerCase()
            return hay.includes(q)
        })
        const yr = (p) => parseInt(p.year, 10) || 0
        const indexed = list.map((p, i) => [p, i])
        if (sort === 'newest') indexed.sort((a, b) => (yr(b[0]) - yr(a[0])) || (a[1] - b[1]))
        else if (sort === 'oldest') indexed.sort((a, b) => (yr(a[0]) - yr(b[0])) || (a[1] - b[1]))
        else if (sort === 'az') indexed.sort((a, b) => a[0].title.localeCompare(b[0].title))
        else indexed.sort((a, b) => ((b[0].featured ? 1 : 0) - (a[0].featured ? 1 : 0)) || (a[1] - b[1])) // featured
        return indexed.map(([p]) => p)
    }, [active, query, sort])

    const clearFilters = () => { setActive([]); setQuery('') }
    const hasFilters = active.length > 0 || query.trim() !== ''

    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onTilt = (e) => {
        if (reduce) return
        const el = e.currentTarget, r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5
        el.style.transform = `perspective(720px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`
    }
    const offTilt = (e) => { e.currentTarget.style.transform = '' }

    const browse = (dir) => {
        if (!open) return
        const idx = shown.findIndex((p) => p.title === open.title)
        if (idx < 0) return
        setOpen(shown[(idx + dir + shown.length) % shown.length])
    }

    useEffect(() => {
        if (!open) return
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(null)
            else if (e.key === 'ArrowRight') browse(1)
            else if (e.key === 'ArrowLeft') browse(-1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, shown])

    const hasLink = (p) => p.link && p.link !== '#'

    const swipe = useSwipe(() => browse(1), () => browse(-1))

    const copyLink = async (url) => {
        try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600) }
        catch (e) { /* no-op */ }
    }
    useEffect(() => { setCopied(false) }, [open])

    return (
        <div className="page page-enter">
            <div className="wrap">
                <PageHeader eyebrow="🎾 Selected work" title="Projects" sub="Things I've fetched, built, and shipped. Tap a card for details, or filter by tech." />

                <div className="proj-search-row">
                    <div className="proj-search">
                        <span className="proj-search-ico" aria-hidden="true">🔍</span>
                        <input
                            className="proj-search-input"
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search projects — try “React”, “AWS”, “Kafka”…"
                            aria-label="Search projects"
                        />
                        {query && <button className="proj-search-clear" onClick={() => setQuery('')} aria-label="Clear search">✕</button>}
                    </div>
                </div>

                <div className="filter-bar">
                    <button className={'filter-chip' + (active.length === 0 ? ' on' : '')} onClick={() => setActive([])}>All</button>
                    {tags.map((t) => (
                        <button key={t} className={'filter-chip' + (active.includes(t) ? ' on' : '')} onClick={() => toggle(t)}>{t}</button>
                    ))}
                    {hasFilters && <button className="filter-chip filter-clear" onClick={clearFilters}>Clear ✕</button>}
                    <span className="filter-count">{shown.length} of {PROJECTS.length}</span>
                </div>

                {/* sort off */}
                {/*
                <div className="sort-bar">
                  <span className="sort-label">Sort</span>
                  {SORTS.map((s) => (
                    <button key={s.key} className={'filter-chip sort-chip' + (sort === s.key ? ' on' : '')}
                            onClick={() => setSort(s.key)} aria-pressed={sort === s.key}>{s.label}</button>
                  ))}
                </div>
                */}

                <div className="proj-grid">
                    {shown.map((p) => (
                        <article key={p.title} onMouseMove={onTilt} onMouseLeave={offTilt}
                                 onClick={() => setOpen(p)} onKeyDown={(e) => { if (e.key === 'Enter') setOpen(p) }}
                                 tabIndex={0} role="button" aria-label={'View details for ' + p.title}
                                 className={'card c-' + p.color + ' proj-in tilt proj-card'}>
                            <div className="proj-thumb" aria-hidden="true">
                                {p.image ? <img src={BASE + p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span className="proj-thumb-emoji">{p.emoji}</span>}
                                {p.featured && <span className="proj-featured">★ Featured</span>}
                            </div>
                            <div className="proj-titlerow">
                                <h3 className="proj-title">{p.title}</h3>
                                <span className="proj-year">{p.year}</span>
                            </div>
                            {p.metric && <div className="proj-metric">✦ {p.metric}</div>}
                            <p className="proj-blurb">{p.blurb}</p>
                            <div className="proj-tags">
                                {p.tags.slice(0, 5).map((t, j) => (
                                    <span key={j} className={'pill' + (active.includes(t) ? ' pill-hot' : '')} style={{ '--tile': 'var(--cream-2)', '--tile-ink': 'var(--cocoa)' }}>{t}</span>
                                ))}
                                {p.tags.length > 5 && <span className="pill" style={{ '--tile': 'var(--cream-2)', '--tile-ink': 'var(--cocoa)' }}>+{p.tags.length - 5}</span>}
                            </div>
                            <span className="proj-cta">See details →</span>
                        </article>
                    ))}
                </div>
                {shown.length === 0 && (
                    <div style={{ textAlign: 'center', margin: '40px 0', color: 'var(--cocoa-2)' }}>
                        <div style={{ fontSize: 40, marginBottom: 8 }} aria-hidden="true">🐾</div>
                        <p style={{ margin: '0 0 12px' }}>No projects match{query ? <> “<strong>{query}</strong>”</> : ' that filter'} yet.</p>
                        <button className="btn btn-cream" onClick={clearFilters}>Clear filters</button>
                    </div>
                )}
            </div>

            {/* modal */}
            {open && createPortal((
                <div className="proj-backdrop" onClick={() => setOpen(null)} {...swipe}>
                    {shown.length > 1 && (
                        <button className="art-nav left" onClick={(e) => { e.stopPropagation(); browse(-1) }} aria-label="Previous project">‹</button>
                    )}
                    <div className="proj-modal" role="dialog" aria-label={open.title} onClick={(e) => e.stopPropagation()}>
                        <button className="proj-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
                        {open.image && <img src={BASE + open.image} alt="" className="proj-modal-img" />}
                        <div className="proj-modal-emoji" aria-hidden="true">{open.emoji}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                            <h2 style={{ fontSize: 27 }}>{open.title}</h2>
                            <span style={{ fontFamily: 'var(--display)', fontWeight: 700, color: 'var(--cocoa-2)' }}>{open.year}</span>
                        </div>
                        {open.metric && <div className="proj-metric proj-metric-lg">✦ {open.metric}</div>}
                        <p style={{ fontSize: 16, margin: '10px 0 14px', color: 'var(--cocoa-2)' }}>{open.blurb}</p>
                        {open.highlights && (
                            <ul className="proj-highlights">
                                {open.highlights.map((h, i) => <li key={i}><span aria-hidden="true">🐾</span><span>{h}</span></li>)}
                            </ul>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '16px 0' }}>
                            {open.tags.map((t, j) => <span key={j} className="pill" style={{ '--tile': 'var(--cream-2)', '--tile-ink': 'var(--cocoa)' }}>{t}</span>)}
                        </div>
                        {hasLink(open)
                            ? <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                                <a className="btn btn-pink" href={open.link} target="_blank" rel="noopener noreferrer">View project ↗</a>
                                <button className="btn btn-cream" onClick={() => copyLink(open.link)}>{copied ? 'Copied! ✓' : 'Copy link 🔗'}</button>
                            </div>
                            : <span className="proj-private">🔒 Private project — happy to walk you through the code &amp; architecture.</span>}
                        {shown.length > 1 && <div className="proj-browse">‹ › or ← → to browse · {shown.findIndex((p) => p.title === open.title) + 1} / {shown.length}</div>}
                    </div>
                    {shown.length > 1 && (
                        <button className="art-nav right" onClick={(e) => { e.stopPropagation(); browse(1) }} aria-label="Next project">›</button>
                    )}
                </div>
            ), document.body)}
        </div>
    )
}