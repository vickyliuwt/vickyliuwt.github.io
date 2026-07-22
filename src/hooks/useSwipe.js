import { useRef } from 'react'

// swipe
export default function useSwipe(onLeft, onRight, threshold = 45) {
  const start = useRef(null)

  const onTouchStart = (e) => {
    const t = e.touches[0]
    start.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e) => {
    if (!start.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.current.x
    const dy = t.clientY - start.current.y
    start.current = null
    // horizontal only
    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) onLeft && onLeft()
      else onRight && onRight()
    }
  }

  return { onTouchStart, onTouchEnd }
}
