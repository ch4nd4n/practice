import { useState } from 'react'

export default function SearchBar({ onSearch, placeholder = 'Search images...' }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      {query && (
        <button type="button" className="search-bar__clear" onClick={handleClear}>
          &times;
        </button>
      )}
      <button type="submit" className="search-bar__submit">
        Search
      </button>
    </form>
  )
}
