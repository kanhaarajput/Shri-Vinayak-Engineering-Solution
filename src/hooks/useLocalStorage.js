import { useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@utils/constants'

/**
 * Persists and syncs a value to localStorage.
 *
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, Function]}
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark')
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`useLocalStorage error for key "${key}":`, error)
    }
  }

  // Listen for changes in other tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue)
        } catch {
          setStoredValue(initialValue)
        }
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key, initialValue])

  return [storedValue, setValue]
}
