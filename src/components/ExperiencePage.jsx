import PageHeader, { PawDivider } from './PageHeader'
import { EXPERIENCES, EDUCATION, REAL_ESTATE_PROJECTS, FILM_CREDITS, AWARDS } from '../constants/data'

export default function ExperiencePage() {
  return (
    <div className="page page-enter dotty">
      <div className="wrap">
        <PageHeader eyebrow=" Where I've been" title="Experience" sub="The teams I've worked with and what I shipped." />

        <div className="timeline stagger">
          {EXPERIENCES.map((e, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-marker"><span className={'tl-dot' + (e.current ? ' current' : '')} aria-hidden="true">{e.emoji}</span></div>
              <article className={'card c-' + e.color} style={{ margin: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                  <h3 style={{ fontSize: 22 }}>{e.company}</h3>
                  <span className="tl-period">
                    {e.period}
                  </span>
                </div>
                <div style={{ margin: '6px 0 12px' }}>
                  <span className="role-pill">{e.role}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 7, margin: 0, padding: 0 }}>
                  {e.points.map((p, j) => (
                    <li key={j} style={{ display: 'flex', gap: 9, fontSize: 15.5 }}><span aria-hidden="true">🐾</span><span>{p}</span></li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>

        <PawDivider />
        <h2 className="section-title" style={{ fontSize: 30, margin: '4px 0 16px' }}>🎓 Education</h2>
        <div className="stagger" style={{ display: 'grid', gap: 18 }}>
          {EDUCATION.map((e, i) => (
            <article key={i} className={'card c-' + e.color} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'start' }}>
              <div style={{ width: 58, height: 58, borderRadius: 18, background: 'var(--tile)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }} aria-hidden="true">{e.emoji}</div>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 21 }}>{e.school}</h3>
                  <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 14, color: 'var(--cocoa-2)' }}>{e.period}</span>
                </div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, color: 'var(--tile-ink)', margin: '2px 0 8px', fontSize: 16 }}>{e.degree} · {e.location}</div>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 7 }}>
                  {e.points.map((p, j) => (
                    <li key={j} style={{ display: 'flex', gap: 9, fontSize: 15 }}><span aria-hidden="true">📚</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <PawDivider />
        <h2 className="section-title" style={{ fontSize: 30, margin: '4px 0 16px' }}>🏡 Real Estate Projects</h2>
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {REAL_ESTATE_PROJECTS.map((p, i) => (
            <article key={i} className={'card c-' + p.color} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 34 }} aria-hidden="true">{p.emoji}</div>
              <h3 style={{ fontSize: 18 }}>{p.name}</h3>
              <div style={{ fontSize: 14, color: 'var(--cocoa-2)' }}>{p.location}</div>
              <span className="pill" style={{ '--tile': 'var(--cream-2)', '--tile-ink': 'var(--cocoa)', alignSelf: 'flex-start', marginTop: 2 }}>{p.role}</span>
              {p.link
                ? <a className="btn btn-cream" href={p.link} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start', marginTop: 8, padding: '6px 14px', fontSize: 13 }}>View ↗</a>
                : <span className="proj-private" style={{ marginTop: 8, fontSize: 12.5, padding: '8px 12px' }}>🔒 Private client project</span>}
            </article>
          ))}
        </div>

        <PawDivider />
        <h2 className="section-title" style={{ fontSize: 30, margin: '4px 0 16px' }}>🎬 Animated Film</h2>
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {FILM_CREDITS.map((f, i) => (
            <article key={i} className={'card c-' + f.color} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 34 }} aria-hidden="true">{f.emoji}</div>
              <h3 style={{ fontSize: 18 }}>{f.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {f.roles.map((r, j) => (
                  <span key={j} className="pill" style={{ '--tile': 'var(--cream-2)', '--tile-ink': 'var(--cocoa)' }}>{r}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <PawDivider />
        <h2 className="section-title" style={{ fontSize: 30, margin: '4px 0 16px' }}>🏆 Awards &amp; Achievements</h2>
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(262px, 1fr))', gap: 16 }}>
          {AWARDS.map((a, i) => (
            <article key={i} className={'card c-' + a.color} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }} aria-hidden="true">{a.emoji}</span>
                <h3 style={{ fontSize: 17 }}>{a.title}</h3>
              </div>
              <ul className="award-scroll" style={{ listStyle: 'none', display: 'grid', gap: 6, margin: 0, padding: 0 }}>
                {a.items.map((it, j) => (
                  <li key={j} style={{ display: 'flex', gap: 8, fontSize: 14.5, lineHeight: 1.45 }}><span aria-hidden="true">🏅</span><span>{it}</span></li>
                ))}
              </ul>
              {a.link && (
                <a className="btn btn-cream" href={a.link} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start', marginTop: 2, padding: '6px 14px', fontSize: 13 }}>Watch the film ↗</a>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
