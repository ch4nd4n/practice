import ImageGallery from '../../components/ImageGallery'
import '../../components/components.css'

const sampleImages = [
  { id: 1, src: 'https://picsum.photos/seed/g1/400/300', alt: 'Mountain lake', title: 'Mountain Lake' },
  { id: 2, src: 'https://picsum.photos/seed/g2/400/300', alt: 'Forest trail', title: 'Forest Trail' },
  { id: 3, src: 'https://picsum.photos/seed/g3/400/300', alt: 'Ocean sunset', title: 'Ocean Sunset' },
  { id: 4, src: 'https://picsum.photos/seed/g4/400/300', alt: 'City skyline', title: 'City Skyline' },
  { id: 5, src: 'https://picsum.photos/seed/g5/400/300', alt: 'Desert dunes', title: 'Desert Dunes' },
  { id: 6, src: 'https://picsum.photos/seed/g6/400/300', alt: 'Snowy peaks', title: 'Snowy Peaks' },
]

export default {
  title: 'Components/ImageGallery',
  component: ImageGallery,
}

export const ThreeColumns = {
  args: {
    images: sampleImages,
    columns: 3,
  },
}

export const TwoColumns = {
  args: {
    images: sampleImages,
    columns: 2,
  },
}

export const FourColumns = {
  args: {
    images: sampleImages,
    columns: 4,
  },
}

export const Empty = {
  args: {
    images: [],
    columns: 3,
  },
}

export const SingleImage = {
  args: {
    images: [sampleImages[0]],
    columns: 3,
  },
}
