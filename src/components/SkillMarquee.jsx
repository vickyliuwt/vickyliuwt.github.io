import { SKILLS } from '../constants/data'

export default function SkillMarquee() {
    return (
        <div className="marquee" aria-label="Tech stack">
            <div className="marquee-track">
                {SKILLS.map((s, i) => <span className="marquee-item" key={'a' + i}>{s}</span>)}
                {/* dup */}
                {SKILLS.map((s, i) => <span className="marquee-item dup" aria-hidden="true" key={'b' + i}>{s}</span>)}
            </div>
        </div>
    )
}