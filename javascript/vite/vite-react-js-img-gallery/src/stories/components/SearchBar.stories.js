import SearchBar from '../../components/SearchBar'
import '../../components/components.css'

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {
    onSearch: { action: 'searched' },
  },
}

export const Default = {
  args: {},
}

export const CustomPlaceholder = {
  args: {
    placeholder: 'Find photos by keyword...',
  },
}
