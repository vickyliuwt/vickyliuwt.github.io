
import PageHeader, { PawDivider } from './PageHeader'
import { PROFILE } from '../constants/profile'
import { EXPERIENCES, EDUCATION, SKILLS, PROJECTS } from '../constants/data'
import { downloadVCard } from '../utils/vcard'

const BASE = import.meta.env.BASE_URL

export default function ResumePage() {
  const resumeUrl = PROFILE.resume ? BASE + PROFILE.resume : null
  return (
    <div className="page page-enter">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <PageHeader eyebrow="📄 The one-pager" title="Resume" sub="Read it here, download the PDF, or print it — whatever's easiest." />

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 22 }}>
          {resumeUrl
            ? <a className="btn btn-pink" href={resumeUrl} target="_blank" rel="noopener noreferrer">Download PDF ⬇️</a>
            : <span className="pill c-sun">Add <code>PROFILE.resume</code> in profile.js to enable PDF download</span>}
          <button className="btn btn-cream" onClick={() => window.print()}>Print 🖨️</button>
            <button className="btn btn-cream" onClick={downloadVCard} title="Save my contact card">
                Save contact <img src={BASE + 'dog/view-icon.png'} alt="" style={{ width: 18, height: 18, verticalAlign: '-3px' }} />
            </button>
            <a className="btn btn-cream" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub <img src={BASE + 'dog/github.svg'} alt="" style={{ width: 18, height: 18, verticalAlign: '-3px' }} />
            </a>
            {PROFILE.hasLinkedIn && (
                <a className="btn btn-cream" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn <img src={BASE + 'dog/linkedin.png'} alt="" style={{ width: 18, height: 18, verticalAlign: '-3px' }} />
                </a>
            )}

        </div>

        {resumeUrl && (
          <div className="resume-embed">
            <object data={resumeUrl} type="application/pdf" width="100%" height="560">
              <p style={{ padding: 20 }}>Your browser can't show the PDF inline — <a href={resumeUrl} target="_blank" rel="noopener noreferrer">open it here ↗</a></p>
            </object>
          </div>
        )}

        <div className="card resume-doc" style={{ padding: 30 }}>
          <h2 style={{ fontSize: 30, marginBottom: 2 }}>{PROFILE.name}</h2>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 700, color: 'var(--tile-ink)', fontSize: 16 }}>{(PROFILE.titles && PROFILE.titles[0]) || 'Software Developer'}</div>
          <div style={{ color: 'var(--cocoa-2)', fontSize: 14, margin: '6px 0 4px' }}>{PROFILE.email} · {PROFILE.phone} · {PROFILE.location}</div>
          <div style={{ color: 'var(--cocoa-2)', fontSize: 14 }}>{PROFILE.github}{PROFILE.hasLinkedIn ? ' · ' + PROFILE.linkedin : ''}</div>

          <h3 className="resume-h">Experience</h3>
          {EXPERIENCES.map((e, i) => (
            <div key={i} className="resume-item">
              <div className="resume-item-top"><strong>{e.role} — {e.company}</strong><span>{e.period}</span></div>
              <ul>{e.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
            </div>
          ))}

          <h3 className="resume-h">Selected Projects</h3>
          {PROJECTS.map((p, i) => (
            <div key={i} className="resume-item">
              <div className="resume-item-top"><strong>{p.title}{p.metric ? ` — ${p.metric}` : ''}</strong><span>{p.year}</span></div>
              <div style={{ color: 'var(--cocoa-2)', fontSize: 14 }}>{p.blurb}</div>
              <div style={{ color: 'var(--tile-ink)', fontSize: 13, marginTop: 2 }}>{p.tags.join(' · ')}</div>
            </div>
          ))}

          <h3 className="resume-h">Education</h3>
          {EDUCATION.map((e, i) => (
            <div key={i} className="resume-item">
              <div className="resume-item-top"><strong>{e.degree} — {e.school}</strong><span>{e.period}</span></div>
              <div style={{ color: 'var(--cocoa-2)', fontSize: 14 }}>{e.points[0]}</div>
            </div>
          ))}

          <h3 className="resume-h">Skills</h3>
          <div style={{ fontSize: 15 }}>{SKILLS.join(' · ')}</div>
        </div>
      </div>
    </div>
  )
}
