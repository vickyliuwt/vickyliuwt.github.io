
import { useState, useRef, useEffect, useCallback } from 'react'
import { CHAT } from '../constants/data'
import { playPop } from '../utils/sound'
import { unlock } from '../utils/achievements'

const BASE = import.meta.env.BASE_URL

const KEYWORDS = {
  about:        ['who', 'yourself', 'introduce', 'about you'],
  experience:   ['experience', 'work', 'job', 'intern', 'career', 'company', 'worked'],
  projects:     ['project', 'built', 'build', 'ship', 'app', 'portfolio work'],
  skills:       ['skill', 'stack', 'tech', 'language', 'framework', 'tool'],
  education:    ['school', 'university', 'degree', 'study', 'education', 'gpa'],
  teamwork:     ['team', 'collaborate', 'agile', 'communication', 'teamwork'],
  conflict:     ['conflict', 'disagree', 'disagreement', 'argument'],
  failure:      ['fail', 'failure', 'mistake', 'wrong', 'weakness'],
  leadership:   ['lead', 'leader', 'led', 'mentor', 'initiative'],
  whyhire:      ['why', 'hire', 'strength', 'good fit', 'value'],
  availability: ['available', 'availability', 'open to', 'relocat', 'remote', 'start'],
  frontend:     ['frontend', 'front-end', 'react', 'css', 'ui'],
  backend:      ['backend', 'back-end', 'api', 'server', 'node', 'python', 'go'],
  data:         ['database', 'data', 'sql', 'postgres', 'redis', 'mongo'],
  contact:      ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'phone'],
}

function matchKey(q) {
  const t = q.toLowerCase()
  for (const [key, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => t.includes(w))) return key
  }
  return 'fallback'
}

export default function AskMe() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [phase, setPhase] = useState('idle')       // phase
  const [stream, setStream] = useState('')
  const bodyRef = useRef(null)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [messages, stream, phase])

  const answerFor = (key) => CHAT.responses[key] || CHAT.responses.fallback

  const send = useCallback((text, key) => {
    if (phase !== 'idle') return
    playPop()
    const resolved = key || matchKey(text)
    unlock('recruiter')
    if (['teamwork', 'conflict', 'failure', 'leadership'].includes(resolved)) unlock('behavioral')
    if (resolved === 'whyhire') unlock('closer')
    if (resolved === 'contact') unlock('connect')
    setMessages((m) => [...m, { role: 'user', text }])
    setPhase('thinking')
    const answer = answerFor(resolved)
    const think = setTimeout(() => {
      setPhase('streaming'); setStream('')
      let i = 0
      const iv = setInterval(() => {
        i++
        setStream(answer.slice(0, i))
        if (i >= answer.length) {
          clearInterval(iv)
          setMessages((m) => [...m, { role: 'bot', text: answer }])
          setStream(''); setPhase('idle')
        }
      }, 16)
      timers.current.push(iv)
    }, 850)
    timers.current.push(think)
  }, [phase])

  const onSubmit = () => { const t = input.trim(); if (t) { setInput(''); send(t, null) } }
  const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => {
    const q = CHAT.questions.find((x) => x.label === m.text); return q?.key
  }).filter(Boolean))
  const pills = CHAT.questions.filter((q) => !asked.has(q.key))

  const Avatar = () => <img src={BASE + 'dog/bingo-wink.png'} alt="" className="chat-avatar" />

  return (
    <section className="ask reveal" style={{ padding: '20px 0 30px' }}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <span className="eyebrow">💬 Interview me</span>
        <h2 className="section-title" style={{ fontSize: 'clamp(26px,5vw,42px)' }}>Ask me anything</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>Recruiters — tap a question or type your own. I'll answer!</p>
      </div>

      <div className="chat-window">
        <div className="chat-body" ref={bodyRef}>
          {messages.length === 0 && phase === 'idle' && (
            <div className="chat-hello"><Avatar /><div className="bubble bot">Hi! Ask me about my experience, projects, or how I work. 🐾</div></div>
          )}
          {messages.map((m, i) => (
            m.role === 'user'
              ? <div key={i} className="bubble user">{m.text}</div>
              : <div key={i} className="chat-row"><Avatar /><div className="bubble bot">{m.text}</div></div>
          ))}
          {phase === 'thinking' && (
            <div className="chat-row"><Avatar /><div className="bubble bot"><span className="dot" /><span className="dot" /><span className="dot" /></div></div>
          )}
          {phase === 'streaming' && (
            <div className="chat-row"><Avatar /><div className="bubble bot">{stream}<span className="chat-caret">|</span></div></div>
          )}
        </div>

        {pills.length > 0 && phase === 'idle' && (
          <div className="chat-pills">
            {pills.map((q) => (
              <button key={q.key} className="chat-pill" onClick={() => send(q.label, q.key)}>{q.label}</button>
            ))}
          </div>
        )}

        <div className="chat-input-row">
          <input
            className="chat-input" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
            placeholder={phase === 'idle' ? 'Type a question…' : 'Thinking…'} disabled={phase !== 'idle'}
            aria-label="Ask a question"
          />
          <button className="chat-send" onClick={onSubmit} disabled={phase !== 'idle' || !input.trim()} aria-label="Send">➤</button>
        </div>
      </div>
    </section>
  )
}
