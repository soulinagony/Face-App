import { useEffect } from 'react'
import { useThemeStore } from '../store/themeStore'

export const useTheme = () => {
  const { isDark } = useThemeStore()

  useEffect(() => {
    // Применяем тему к document.documentElement
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [isDark])

  return { isDark }
} 