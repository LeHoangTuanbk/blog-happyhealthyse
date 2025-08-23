'use client'

import { useTheme as useNextTheme } from 'next-themes'

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }
}
