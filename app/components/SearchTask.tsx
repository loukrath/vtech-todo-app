'use client'

import React, { useState, useEffect } from 'react'

const SearchTask = () => {
  const [searchVal, setSearchVal] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchVal(value)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setTimeoutId(
      setTimeout(() => {
        handleSearch()
      }, 3000)
    )
  }

  const handleSearch = () => {
    console.log('handleSearch: ', searchVal)
  }

  return (
    <input
      value={searchVal}
      type="text"
      placeholder="Type to search..."
      className="input input-bordered w-full bg-white text-black flex-1"
      onChange={handleChange}
    />
  )
}

export default SearchTask
