import ImageCard from '../../components/ImageCard'
import '../../components/components.css'

export default {
  title: 'Components/ImageCard',
  component: ImageCard,
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

export const Default = {
  args: {
    src: 'https://picsum.photos/seed/card1/400/300',
    alt: 'A random landscape',
    title: 'Mountain View',
  },
}

export const WithoutTitle = {
  args: {
    src: 'https://picsum.photos/seed/card2/400/300',
    alt: 'A scenic photo',
  },
}

export const LongTitle = {
  args: {
    src: 'https://picsum.photos/seed/card3/400/300',
    alt: 'Photo with long title',
    title: 'This is a very long title that might overflow the card overlay area',
  },
}
