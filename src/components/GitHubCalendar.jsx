
import { useEffect, useState } from 'react'
import { PROFILE } from '../constants/profile'

export default function GitHubCalendar() {
  const user = PROFILE.githubUser
  const isPlaceholder = !user || user === 'your-username'
  const [state, setState] = useState(isPlaceholder ? 'setup' : 'loading')
  const [days, setDays] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (isPlaceholder) return
    let alive = true
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`)
      .then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.json() })
      .then((data) => {
        if (!alive) return
        const contribs = data.contributions || []
        setDays(contribs)
        setTotal(contribs.reduce((s, d) => s + (d.count || 0), 0))
        setState('ok')
      })
      .catch(() => { if (alive) setState('error') })
    return () => { alive = false }
  }, [user, isPlaceholder])

  // pad
  const pad = days.length ? new Date(days[0].date).getDay() : 0

  // hide
  if (state === 'error') return null

  return (
    <div className="ghcal">
      <div className="ghcal-head">
        <h3 className="lab-title" style={{ margin: 0 }}>Days I code 🐾</h3>
        {state === 'ok' && <span className="ghcal-total">{total.toLocaleString()} contributions in the last year</span>}
      </div>

      {state === 'setup' && (
        <p className="ghcal-note">Set your GitHub handle in <code>profile.js</code> (<code>githubUser</code>) to show your live contribution graph here.</p>
      )}
      {state === 'loading' && <p className="ghcal-note">Loading GitHub activity…</p>}

      {state === 'ok' && (
        <div className="ghcal-scroll">
          <div className="ghcal-grid">
            {Array.from({ length: pad }).map((_, i) => <span key={'p' + i} className="ghcal-cell empty" />)}
            {days.map((d) => (
              <span key={d.date} className={'ghcal-cell lvl-' + (d.level || 0)} title={`${d.date}: ${d.count} contributions`} />
            ))}
          </div>
        </div>
      )}
      {state === 'ok' && (
        <div className="ghcal-legend">Less {[0, 1, 2, 3, 4].map((l) => <span key={l} className={'ghcal-cell lvl-' + l} />)} More</div>
      )}
    </div>
  )
}
