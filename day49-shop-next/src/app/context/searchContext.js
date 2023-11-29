'use client'
import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')

  const updateSearchValue = (value) => {
    setSearchValue(value)
  }

  return (
    <SearchContext.Provider value={{ searchValue, updateSearchValue }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  return useContext(SearchContext)
}
