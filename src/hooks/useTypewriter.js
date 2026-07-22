import { useEffect, useState } from 'react'

export default function useTypewriter(words, { type = 90, del = 45, hold = 1400 } = {}) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    let t

    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      setDeleting(false)
      setI((v) => (v + 1) % words.length)
    } else {
      t = setTimeout(() => {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }, deleting ? del : type)
    }
    return () => clearTimeout(t)
  }, [text, deleting, i, words, type, del, hold])

  return text
}
