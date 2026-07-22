import { TESTIMONIALS } from '../constants/data'

export default function Testimonials() {
  if (!TESTIMONIALS.length) return null
  return (
    <div className="tmls">
      {TESTIMONIALS.map((t, i) => (
        <figure key={i} className="tml">
          <div className="tml-mark" aria-hidden="true">{t.emoji}</div>
          <blockquote className="tml-quote">“{t.quote}”</blockquote>
          <figcaption className="tml-by"><strong>{t.name}</strong><span>{t.role}</span></figcaption>
        </figure>
      ))}
    </div>
  )
}
