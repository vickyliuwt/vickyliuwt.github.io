export default function PageHeader({ eyebrow, title, sub }) {
  return (
    <header className="page-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </header>
  )
}

export function PawDivider() {
  return (
    <div className="paw-divider" aria-hidden="true">
      <span>🐾</span><span>🐾</span><span>🐾</span>
    </div>
  )
}
