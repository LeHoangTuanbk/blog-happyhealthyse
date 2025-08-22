'use client'

import { useState } from 'react'
import headerNavLinks from '@/shared/config/navigation'

export const useNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  const navLinks = headerNavLinks.filter((link) => link.href !== '/')
  
  return {
    navLinks,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  }
}