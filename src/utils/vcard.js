import { PROFILE } from '../constants/profile'

function esc(v = '') {
    return String(v)
        .replace(/\\/g, '\\\\')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;')
        .replace(/\n/g, '\\n')
}

export function buildVCard() {
    const [first, ...rest] = PROFILE.name.split(' ')
    const last = rest.join(' ')
    const title = (PROFILE.titles && PROFILE.titles[0]) || 'Software Developer'
    const website = PROFILE.website || 'https://vickyliuwt.github.io/'

    const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${esc(last)};${esc(first)};;;`,
        `FN:${esc(PROFILE.name)}`,
        'NICKNAME:Vicky',
        `TITLE:${esc(title)}`,
        `EMAIL;TYPE=INTERNET,PREF:${esc(PROFILE.email)}`,
        PROFILE.phone ? `TEL;TYPE=CELL:${esc(PROFILE.phone)}` : '',
        PROFILE.location ? `ADR;TYPE=WORK:;;;${esc(PROFILE.location)};;;` : '',
        `item1.URL:${esc(website)}`,
        'item1.X-ABLabel:Personal Website',
        PROFILE.github ? `item2.URL:${esc(PROFILE.github)}` : '',
        PROFILE.github ? 'item2.X-ABLabel:GitHub' : '',
        PROFILE.hasLinkedIn && PROFILE.linkedin ? `item3.URL:${esc(PROFILE.linkedin)}` : '',
        PROFILE.hasLinkedIn && PROFILE.linkedin ? 'item3.X-ABLabel:LinkedIn' : '',
        PROFILE.valueProp ? `NOTE:${esc(PROFILE.valueProp)}` : '',
        `REV:${new Date().toISOString()}`,
        'END:VCARD',
    ].filter(Boolean)

    return lines.join('\r\n')
}

export function downloadVCard() {
    try {
        const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${PROFILE.name.replace(/\s+/g, '_')}.vcf`
        document.body.appendChild(a)
        a.click()
        a.remove()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (e) {
        /* fallback */
        window.location.href = 'mailto:' + PROFILE.email
    }
}