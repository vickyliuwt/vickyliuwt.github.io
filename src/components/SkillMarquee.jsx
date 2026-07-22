
import { SKILLS } from '../constants/data'

export default function SkillMarquee() {
  const row = [...SKILLS, ...SKILLS] // loop
  return (
    <div className="marquee" aria-label="Tech stack">
      <div className="marquee-track">
        {row.map((s, i) => <span className="marquee-item" key={i}>{s}</span>)}
      </div>
    </div>
  )
}
