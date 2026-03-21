import Lightbox from '../../components/Lightbox'
import '../../components/components.css'

export default {
  title: 'Components/Lightbox',
  component: Lightbox,
  argTypes: {
    onClose: { action: 'closed' },
    onPrev: { action: 'prev' },
    onNext: { action: 'next' },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {
  args: {
    src: 'https://picsum.photos/seed/lb1/800/600',
    alt: 'Lightbox image',
    title: 'Beautiful Landscape',
  },
}

export const WithoutNavigation = {
  args: {
    src: 'https://picsum.photos/seed/lb2/800/600',
    alt: 'Single image',
    title: 'Single Image View',
    onPrev: undefined,
    onNext: undefined,
  },
}

export const WithoutTitle = {
  args: {
    src: 'https://picsum.photos/seed/lb3/800/600',
    alt: 'No title image',
  },
}
