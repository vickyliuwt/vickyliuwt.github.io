import PageHeader, { PawDivider } from './PageHeader'
import { PROFILE } from '../constants/profile'
import { SKILLS, STATS, BIO, TESTIMONIALS } from '../constants/data'
import AnimatedNumber from './AnimatedNumber'
import SkillBars from './SkillBars'
import SkillRadar from './SkillRadar'
import ContactForm from './ContactForm'
import Testimonials from './Testimonials'
import { downloadVCard } from '../utils/vcard'

const BASE = import.meta.env.BASE_URL

export default function AboutPage() {
  const facts = [
    { icon: '📍', label: PROFILE.location },
    { icon: '🎓', label: '4.0 GPA · M.S. CS @ Northeastern' },
    { icon: '🎨', label: 'B.F.A. Animation @ SCAD' },
  ]

  return (
    <div className="page page-enter">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <PageHeader eyebrow="🐶 Get to know me" title="About" sub="An engineer's rigor with an artist's eye." />

        {/* intro */}
        <div className="card stagger about-card" style={{ padding: 30 }}>
          <div className="about-hero">
            <div className="about-photo-frame">
              <img src={BASE + 'me.jpg'} alt={PROFILE.name} className="about-photo" loading="lazy" />
            </div>
            <div>
              {PROFILE.openToWork && (
                <div className="otw" style={{ marginBottom: 14 }}><span className="dotlive" aria-hidden="true" /> Open to work</div>
              )}
              {BIO.map((para, i) => (
                <p key={i} className="about-para" style={{ marginTop: i ? 14 : 0 }}>{para}</p>
              ))}
              <div className="about-facts">
                {facts.map((f, i) => (
                  <span key={i} className="about-fact"><span aria-hidden="true">{f.icon}</span> {f.label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="about-stats">
            {STATS.map((s, i) => (
              <div key={i} className="about-stat">
                <div className="about-stat-num"><AnimatedNumber value={s.num} /></div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <h3 className="about-h">My toolbox 🧰</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SKILLS.map((s, i) => {
              const colors = ['peach', 'mint', 'sky', 'pink', 'sun', 'caramel']
              return <span key={i} className={'pill c-' + colors[i % colors.length]}>{s}</span>
            })}
          </div>

          <h3 className="about-h">Proficiency 📊</h3>
          <div className="prof-grid">
            <SkillBars />
            <SkillRadar />
          </div>
        </div>

        {/* testimonials */}
        {TESTIMONIALS.length > 0 && (
          <>
            <PawDivider />
            <h2 className="section-title center-title" style={{ fontSize: 28 }}>💬 Kind words</h2>
            <Testimonials />
          </>
        )}

        <PawDivider />

        {/* contact */}
        <div className="card contact-card" style={{ textAlign: 'center', padding: 30 }}>
          <img src={BASE + 'dog/dog-love.webp'} alt="" width="76" height="76" loading="lazy" style={{ display: 'block', margin: '0 auto 6px' }} />
          <h3 style={{ fontSize: 26 }}>Say hello 🐾</h3>
          <p style={{ margin: '8px 0 20px' }}>{PROFILE.tagline}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-pink" href={`mailto:${PROFILE.email}`}>Email </a>
            <button className="btn btn-cream" onClick={downloadVCard} title="Save my contact card">Save contact 📇</button>
            <a className="btn btn-cream" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            {PROFILE.hasLinkedIn && (
              <a className="btn btn-cream" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            )}
          </div>
          <div style={{ marginTop: 18, color: 'var(--cocoa-2)', fontSize: 14 }}>
            {PROFILE.email} · {PROFILE.location}
          </div>
          <div style={{ marginTop: 20 }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
