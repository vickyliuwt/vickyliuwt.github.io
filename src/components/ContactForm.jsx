import { useState, useEffect } from 'react'
import { PROFILE, CONTACT_CONFIG } from '../constants/profile'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// draft
function readDraft(key) {
  if (!key) return {}
  try { return JSON.parse(localStorage.getItem('cform.' + key) || '{}') } catch (e) { return {} }
}
function writeDraft(key, data) {
  if (!key) return
  try { localStorage.setItem('cform.' + key, JSON.stringify(data)) } catch (e) { /* blocked */ }
}
function clearDraft(key) {
  if (!key) return
  try { localStorage.removeItem('cform.' + key) } catch (e) { /* blocked */ }
}

export default function ContactForm({ storageKey = null }) {
  const saved = readDraft(storageKey)
  const [name, setName] = useState(saved.name || '')
  const [from, setFrom] = useState(saved.from || '')
  const [msg, setMsg] = useState(saved.msg || '')
  const [hp, setHp] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // status
  const [error, setError] = useState('')

  // persist
  useEffect(() => {
    if (!storageKey) return
    if (name || from || msg) writeDraft(storageKey, { name, from, msg })
    else clearDraft(storageKey)
  }, [name, from, msg, storageKey])

  const canSend = msg.trim().length > 0 && status !== 'sending'

  // mailto fallback
  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Hello from ${name || 'a recruiter'} 🐾`)
    const body = encodeURIComponent(`${msg}\n\n— ${name}${from ? ' (' + from + ')' : ''}`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }

  const submit = async (e) => {
    if (e) e.preventDefault()
    if (!msg.trim()) return
    setError('')

    const useWeb3 = CONTACT_CONFIG.hasWeb3Forms
    const useFormspree = CONTACT_CONFIG.hasFormspree

    // no service
    if (!useWeb3 && !useFormspree) {
      mailtoFallback()
      return
    }

    if (from && !EMAIL_RE.test(from)) {
      setStatus('error')
      setError('That email looks a little off — mind double-checking it?')
      return
    }
    if (hp) { // bot
      setStatus('ok')
      return
    }

    setStatus('sending')
    try {
      let res
      if (useWeb3) {
        res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: CONTACT_CONFIG.web3formsKey,
            name: name || 'Anonymous friend',
            email: from || PROFILE.email,
            replyto: from || '',
            from_name: name || 'Portfolio visitor',
            subject: `🐾 Portfolio message from ${name || 'a visitor'}`,
            message: msg,
            botcheck: hp,
          }),
        })
      } else {
        res = await fetch(`https://formspree.io/f/${CONTACT_CONFIG.formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: name || 'Anonymous friend',
            email: from,
            message: msg,
            _gotcha: hp,
            _replyto: from,
            _subject: `🐾 Portfolio message from ${name || 'a visitor'}`,
          }),
        })
      }
      const data = await res.json().catch(() => null)
      const ok = res.ok && (data ? data.success !== false : true)
      if (ok) {
        setStatus('ok')
        setName(''); setFrom(''); setMsg('')
        clearDraft(storageKey)
      } else {
        setStatus('error')
        setError(
          (data && (data.message || (data.errors && data.errors[0] && data.errors[0].message))) ||
            'Something went wrong sending that. Please try again, or email me directly.'
        )
      }
    } catch (err) {
      setStatus('error')
      setError('Network hiccup — please try again in a moment, or email me directly.')
    }
  }

  if (status === 'ok') {
    return (
      <div className="cform cform-done" role="status" aria-live="polite">
          <div className="cform-done-emoji" aria-hidden="true">
              <img src={`${import.meta.env.BASE_URL}dog/dog-heart.webp`} alt="" width={56} height={56} style={{ display: 'block', margin: '0 auto' }} />
          </div>
          <p className="cform-done-title">Message sent — thank you!</p>
        <p className="cform-done-sub">I'll get back to you soon! 🐾</p>
        <button className="btn btn-ghost" type="button" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="cform" onSubmit={submit} noValidate>
      <div className="cform-row">
        <input
          className="cform-in"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your name"
          autoComplete="name"
        />
        <input
          className="cform-in"
          type="email"
          placeholder="Email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          aria-label="Your email"
          autoComplete="email"
        />
      </div>
      <textarea
        className="cform-in cform-area"
        placeholder="Whether it's a project, a job opportunity, or just to say hi... I'd love to hear from you"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        aria-label="Message"
      />

      {/* honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {status === 'error' && (
        <p className="cform-status cform-status-err" role="alert">{error}</p>
      )}

      <button className="btn btn-pink" type="submit" disabled={!canSend}>
        {status === 'sending' ? 'Sending…' : 'Send message 💌'}
      </button>

      {!CONTACT_CONFIG.hasWeb3Forms && !CONTACT_CONFIG.hasFormspree && (
        <p style={{ margin: '8px 0 0', fontSize: 12.5, color: 'var(--cocoa-2)', textAlign: 'center' }}>
          Opens your email app 📮
        </p>
      )}
    </form>
  )
}
