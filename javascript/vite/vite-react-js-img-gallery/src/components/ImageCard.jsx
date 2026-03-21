import { useState } from 'react'

export default function ImageCard({ src, alt, title, onClick }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="image-card" onClick={onClick} role="button" tabIndex={0}>
      {!loaded && <div className="image-card__placeholder">Loading...</div>}
      <img
        src={src}
        alt={alt || title || ''}
        className={`image-card__img ${loaded ? 'image-card__img--visible' : ''}`}
        onLoad={() => setLoaded(true)}
      />
      {title && <div className="image-card__title">{title}</div>}
    </div>
  )
}
