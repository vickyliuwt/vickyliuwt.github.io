import { useState } from 'react'

const BASE = import.meta.env.BASE_URL


export default function Icon({ img, emoji, size = 20, alt = '', className = '', style = {} }) {
  const [failed, setFailed] = useState(false)

  if (!img || failed) {
    return (
      <span className={className} style={style} role={alt ? 'img' : undefined}
            aria-label={alt || undefined} aria-hidden={alt ? undefined : 'true'}>{emoji}</span>
    )
  }

  return (
    <img
      src={BASE + 'dog/' + img}
      alt={alt}
      width={size}
      height={size}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain', ...style }}
    />
  )
}
