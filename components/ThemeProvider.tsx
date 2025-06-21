'use client'
import { useEffect, useState } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial: 'light' | 'dark' = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light')
    
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])
  

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition z-50"
      >
        {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      {children}
    </>
  )
}
