import { NAV_PAGES } from '../constants/data'
import Icon from './Icon'

export default function Nav({ page, go }) {
    return (
        <nav className="nav" aria-label="Main">
            {NAV_PAGES.map((p) => (
                <button
                    key={p.key}
                    data-nav={p.key}
                    className={'nav-btn' + (page === p.key ? ' active' : '')}
                    onClick={() => go(p.key)}
                    aria-current={page === p.key ? 'page' : undefined}
                >
                    <Icon img={p.icon} emoji={p.emoji} size={20} className="em" />
                    <span className="lbl">{p.label}</span>
                </button>
            ))}
            <button className="nav-btn nav-search" onClick={() => window.dispatchEvent(new Event('open-palette'))}
                    aria-label="Open search" title="Search">
                <Icon img="search-icon.png" emoji="🐾" size={20} className="em" />
            </button>
        </nav>
    )
}