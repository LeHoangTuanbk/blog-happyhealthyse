'use client'

import { useState } from 'react'
import siteMetadata from '@/shared/config/site'

export const useSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const searchConfig = siteMetadata.search
  const isSearchEnabled = searchConfig && 
    (searchConfig.provider === 'algolia' || searchConfig.provider === 'kbar')
  
  const openSearch = () => {
    setIsSearchOpen(true)
  }
  
  const closeSearch = () => {
    setIsSearchOpen(false)
  }
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return {
    isSearchOpen,
    isSearchEnabled,
    searchProvider: searchConfig?.provider,
    openSearch,
    closeSearch,
    toggleSearch
  }
}