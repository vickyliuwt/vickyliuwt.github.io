import { useEffect, useState, useRef } from 'react'

const BASE = import.meta.env.BASE_URL
const POOL = [ 'food3.webp', 'food4.webp', 'food5.webp', 'dog-pixel.webp', 'bingo-wink.png']
const MAX = 3

export default function FallingItems() {
  const [items, setItems] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const spawn = setInterval(() => {
      setItems((prev) => {
        if (prev.length >= MAX) return prev
        const id = idRef.current++
        const dur = 13000 + Math.random() * 7000
        const item = {
          id,
          img: POOL[Math.floor(Math.random() * POOL.length)],
          left: Math.random() * 100,
          size: 26 + Math.random() * 24,
          dur,
          op: (0.5 + Math.random() * 0.4).toFixed(2),
        }
        setTimeout(() => setItems((p) => p.filter((x) => x.id !== id)), dur + 200)
        return [...prev, item]
      })
    }, 1500)
    return () => clearInterval(spawn)
  }, [])

  return (
    <>
      {items.map((it) => (
        <img
          key={it.id}
          className="falling-item"
          src={BASE + 'dog/' + it.img}
          alt=""
          aria-hidden="true"
          style={{ left: it.left + 'vw', width: it.size, animationDuration: it.dur + 'ms', '--op': it.op }}
        />
      ))}
    </>
  )
}
