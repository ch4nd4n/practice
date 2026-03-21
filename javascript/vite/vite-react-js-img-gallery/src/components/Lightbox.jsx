import { useEffect } from 'react'

export default function Lightbox({ src, alt, title, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        {onPrev && (
          <button className="lightbox__nav lightbox__nav--prev" onClick={onPrev}>
            &#8249;
          </button>
        )}
        <img src={src} alt={alt || title || ''} className="lightbox__img" />
        {onNext && (
          <button className="lightbox__nav lightbox__nav--next" onClick={onNext}>
            &#8250;
          </button>
        )}
        <button className="lightbox__close" onClick={onClose}>
          &times;
        </button>
        {title && <div className="lightbox__title">{title}</div>}
      </div>
    </div>
  )
}
