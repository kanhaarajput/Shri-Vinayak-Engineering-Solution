import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility to merge Tailwind CSS classes without conflicts.
 * Combines clsx (conditional classes) + tailwind-merge (dedup).
 *
 * @param {...(string|boolean|null|undefined|object)} inputs - Class names or conditions
 * @returns {string} Merged class string
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', 'text-sm')
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
