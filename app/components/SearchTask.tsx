'use client'

import React, { useState, useCallback, useMemo } from 'react'

const SearchTask = ({ submitted }: { submitted?: (keyword: string) => void }) => {
  const [searchVal, setSearchVal] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchVal(value)

    if (timeoutId) clearTimeout(timeoutId)

    setTimeoutId(setTimeout(() => {
      submitted?.(value)
    }, 500))
  }, [submitted, timeoutId])


  return useMemo (() => (
    <input
      value={searchVal}
      type="text"
      placeholder="Type to search..."
      className="input input-bordered w-full bg-white text-black flex-1"
      onChange={handleChange}
    />
  ),[searchVal, handleChange]);
}

export default SearchTask
