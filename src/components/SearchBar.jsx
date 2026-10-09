import { useEffect, useRef } from "react";

import Button from "./Button";

const SearchBar = ({search, setSearch}) => {

  const searchInputRef = useRef(null)

  useEffect(() => {
  const handleKeyDown = (e) => {

    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault()
      searchInputRef.current?.focus()
    }

    if (e.key === 'Escape' && search) {
      setSearch('')
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}, [search, setSearch])

  return (
    
      <div className="search-wrapper">
      <input
        ref={searchInputRef}
        className="search-bar"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes..."
      />

      {search && (
        <Button
          type="button"
          className="clear-search"
          onClick={() => setSearch('')}
        >
          Clear
        </Button>
      )}
    </div>
    
)

}

export default SearchBar
