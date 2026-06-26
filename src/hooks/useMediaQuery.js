import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@utils/constants'

/**
 * Returns true when the viewport matches the given media query string.
 *
 * @param {string} query  - e.g. '(max-width: 768px)'  or  'sm' | 'md' | 'lg' | 'xl' | '2xl'
 * @returns {boolean}
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isTablet = useMediaQuery('md')   // ≥ 768px
 */
export function useMediaQuery(query) {
  // Support shorthand breakpoint names
  const resolvedQuery =
    typeof query === 'string' && BREAKPOINTS[query]
      ? `(min-width: ${BREAKPOINTS[query]}px)`
      : query

  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(resolvedQuery).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(resolvedQuery)
    const handler = (e) => setMatches(e.matches)

    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [resolvedQuery])

  return matches
}
