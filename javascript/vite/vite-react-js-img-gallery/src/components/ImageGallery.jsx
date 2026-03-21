import { useState, useMemo } from 'react'
import ImageCard from './ImageCard'
import Lightbox from './Lightbox'
import SearchBar from './SearchBar'

export default function ImageGallery({ images = [], columns = 3 }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)

  const filtered = useMemo(() => {
    if (!query) return images
    const q = query.toLowerCase()
    return images.filter(
      (img) =>
        img.title?.toLowerCase().includes(q) ||
        img.alt?.toLowerCase().includes(q)
    )
  }, [images, query])

  const handlePrev = () => {
    setSelectedIndex((i) => (i > 0 ? i - 1 : filtered.length - 1))
  }

  const handleNext = () => {
    setSelectedIndex((i) => (i < filtered.length - 1 ? i + 1 : 0))
  }

  return (
    <div className="image-gallery">
      <SearchBar onSearch={setQuery} />
      {filtered.length === 0 ? (
        <p className="image-gallery__empty">No images found.</p>
      ) : (
        <div
          className="image-gallery__grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {filtered.map((img, i) => (
            <ImageCard
              key={img.id || i}
              src={img.src}
              alt={img.alt}
              title={img.title}
              onClick={() => setSelectedIndex(i)}
            />
          ))}
        </div>
      )}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <Lightbox
          src={filtered[selectedIndex].src}
          alt={filtered[selectedIndex].alt}
          title={filtered[selectedIndex].title}
          onClose={() => setSelectedIndex(null)}
          onPrev={filtered.length > 1 ? handlePrev : undefined}
          onNext={filtered.length > 1 ? handleNext : undefined}
        />
      )}
    </div>
  )
}
