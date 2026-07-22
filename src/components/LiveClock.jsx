

import { useState, useEffect, useRef } from 'react'

const LOCAL = (() => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC' }
    catch (e) { return 'UTC' }
})()


const NAMED = [
    ['New York',    'America/New_York'],
    ['Los Angeles', 'America/Los_Angeles'],
    ['London',      'Europe/London'],
    ['Paris',       'Europe/Paris'],
    ['Shanghai',    'Asia/Shanghai'],
    ['Tokyo',       'Asia/Tokyo'],
    ['Sydney',      'Australia/Sydney'],
    ['UTC',         'UTC'],
]
const ZONES = [
    { label: 'My time', value: LOCAL },
    ...NAMED.filter(([, v]) => v !== LOCAL).map(([label, value]) => ({ label, value })),
]

function getParts(date, timeZone) {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone,
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, hourCycle: 'h23',
    })
    const out = {}
    for (const p of dtf.formatToParts(date)) out[p.type] = p.value
    return out // parts
}

function getYMD(date, timeZone) {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    })
    const p = {}
    for (const x of dtf.formatToParts(date)) if (x.type !== 'literal') p[x.type] = x.value
    return { y: +p.year, m: +p.month, d: +p.day }
}

function isoWeek(y, m, d) {
    const dt = new Date(Date.UTC(y, m - 1, d))
    const day = dt.getUTCDay() || 7                 // mon–sun
    dt.setUTCDate(dt.getUTCDate() + 4 - day)        // to thursday
    const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1))
    return Math.ceil((((dt - yearStart) / 86400000) + 1) / 7)
}

function dayOfYear(y, m, d) {
    return Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 86400000) + 1
}

function offsetLabel(date, timeZone) {
    try {
        const s = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' })
            .formatToParts(date).find(p => p.type === 'timeZoneName')?.value
        if (s) return s.replace('GMT', 'UTC')
    } catch (e) { /* no offset */ }
    return ''
}

export default function LiveClock({ variant = 'floating' }) {
    const [now, setNow]   = useState(() => new Date())
    const [zone, setZone] = useState(LOCAL)
    const [h12, setH12]   = useState(false)   // 24h
    const [open, setOpen] = useState(false)   // expanded
    const rootRef = useRef(null)

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        if (variant !== 'floating' || !open) return
        const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false) }
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
        document.addEventListener('mousedown', onDoc)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onDoc)
            document.removeEventListener('keydown', onKey)
        }
    }, [variant, open])

    const parts  = getParts(now, zone)
    const ymd    = getYMD(now, zone)
    const week   = isoWeek(ymd.y, ymd.m, ymd.d)
    const doy    = dayOfYear(ymd.y, ymd.m, ymd.d)
    const offset = offsetLabel(now, zone)

    const hh24     = +parts.hour
    const hourDisp = h12 ? String(((hh24 + 11) % 12) + 1).padStart(2, '0') : parts.hour
    const ampm     = hh24 < 12 ? 'AM' : 'PM'
    const zoneNice = zone.replace(/_/g, ' ')

    // inline
    if (variant === 'inline') {
        return (
            <div className="clock-inline" role="group" aria-label="Current date and time">
                <span className="clock-inline-emoji" aria-hidden="true">🕐</span>
                <span className="clock-inline-date">{parts.weekday}, {parts.month} {ymd.d}, {ymd.y}</span>
                <span className="clock-inline-sep" aria-hidden="true">·</span>
                <time className="clock-inline-time" dateTime={now.toISOString()}>
                    {hourDisp}:{parts.minute}:{parts.second}{h12 ? ' ' + ampm : ''}
                </time>
                <span className="clock-inline-sep" aria-hidden="true">·</span>
                <span className="clock-inline-week">Week {week}</span>
                <span className="clock-inline-sep" aria-hidden="true">·</span>
                <span className="clock-inline-zone">{zoneNice}{offset ? ` (${offset})` : ''}</span>
            </div>
        )
    }

    return (
        <div className={'clock-fx' + (open ? ' open' : '')} ref={rootRef}>
            <button
                className="clock-pill"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                aria-label={open ? 'Hide clock details' : 'Show clock details'}
                title="Live clock — click for date, week & time zones"
            >
                <span className="clock-pill-emoji" aria-hidden="true">🐾</span>
                <time className="clock-pill-time" dateTime={now.toISOString()}>
                    {hourDisp}<span className="clock-colon">:</span>{parts.minute}<span className="clock-colon">:</span>{parts.second}
                </time>
                {h12 && <span className="clock-pill-ampm">{ampm}</span>}
                <span className="clock-pill-wd">{parts.weekday.slice(0, 3)}</span>
            </button>

            {open && (
                <div className="clock-panel" role="dialog" aria-label="Clock details">
                    <div className="clock-panel-top">
                        <div className="clock-tz-wrap">
                            <select
                                className="clock-tz"
                                value={zone}
                                onChange={(e) => setZone(e.target.value)}
                                aria-label="Choose time zone"
                            >
                                {ZONES.map(z => <option key={z.value + z.label} value={z.value}>{z.label}</option>)}
                            </select>
                        </div>
                        {offset && <span className="clock-offset">{offset}</span>}
                    </div>

                    <time className="clock-big" dateTime={now.toISOString()}>
                        <span className="cb-seg">{hourDisp}</span>
                        <span className="cb-colon">:</span>
                        <span className="cb-seg">{parts.minute}</span>
                        <span className="cb-colon">:</span>
                        <span className="cb-seg cb-sec">{parts.second}</span>
                        {h12 && <span className="cb-ampm">{ampm}</span>}
                    </time>

                    <div className="clock-weekday">{parts.weekday}</div>
                    <div className="clock-date">{parts.month} {ymd.d}, {ymd.y}</div>

                    <div className="clock-chips">
                        <span className="clock-chip">🗓️ Week {week}</span>
                        <span className="clock-chip">☀️ Day {doy}</span>
                        <button
                            className="clock-chip clock-toggle"
                            onClick={() => setH12(v => !v)}
                            title="Switch between 12-hour and 24-hour time"
                        >
                            {h12 ? '12h' : '24h'}
                        </button>
                    </div>

                    <div className="clock-zone-name">{zoneNice}</div>
                </div>
            )}
        </div>
    )
}