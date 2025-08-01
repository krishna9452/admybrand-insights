'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark'
    if (stored) {
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  )
}
