
import { useEffect, useState } from 'react'
import { PROFILE } from '../constants/profile'

export default function GitHubRepos({ count = 6 }) {
  const user = PROFILE.githubUser
  const isPlaceholder = !user || user === 'your-username'
  const [state, setState] = useState(isPlaceholder ? 'setup' : 'loading')
  const [repos, setRepos] = useState([])

  useEffect(() => {
    if (isPlaceholder) return
    let alive = true
    fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`)
      .then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.json() })
      .then((data) => {
        if (!alive) return
        const top = (Array.isArray(data) ? data : [])
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, count)
        setRepos(top); setState(top.length ? 'ok' : 'empty')
      })
      .catch(() => { if (alive) setState('error') })
    return () => { alive = false }
  }, [user, isPlaceholder, count])

  if (state === 'setup') return null // setup shown
  if (state === 'loading') return <p className="ghcal-note">Loading top repositories…</p>
  if (state === 'error') return <p className="ghcal-note">Couldn't load repos right now — browse them on <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></p>
  if (state === 'empty') return null

  return (
    <div className="repos">
      {repos.map((r) => (
        <a key={r.id} className="repo-card" href={r.html_url} target="_blank" rel="noopener noreferrer">
          <div className="repo-top">
            <span className="repo-name">📦 {r.name}</span>
            <span className="repo-star">★ {r.stargazers_count}</span>
          </div>
          <p className="repo-desc">{r.description || 'No description'}</p>
          <div className="repo-foot">
            {r.language && <span className="repo-lang">{r.language}</span>}
            {typeof r.forks_count === 'number' && <span className="repo-fork">⑂ {r.forks_count}</span>}
          </div>
        </a>
      ))}
    </div>
  )
}
