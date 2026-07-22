
import { useEffect, useRef, useState } from 'react'

export default function AnimatedNumber({ value, duration = 1200 }) {
  const match = String(value).match(/^(\D*)([\d.]+)(\D*)$/)
  const [disp, setDisp] = useState(match ? match[1] + '0' + match[3] : value)
  const raf = useRef(0)

  useEffect(() => {
    if (!match) { setDisp(value); return }
    const [, pre, num, suf] = match
    const target = parseFloat(num)
    const decimals = (num.split('.')[1] || '').length
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = (target * eased).toFixed(decimals)
      setDisp(pre + cur + suf)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [value, duration]) // eslint-disable-line

  return <>{disp}</>
}
