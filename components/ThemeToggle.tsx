'use client'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-900 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-800 transition text-sm"
    >
      {theme === 'dark' ? '☀' : '🌙'}
    </button>
  )
}
