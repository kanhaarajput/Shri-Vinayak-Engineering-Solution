// App-wide constants
export const APP_NAME = 'Shri'
export const APP_VERSION = '1.0.0'

// API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Breakpoints (mirrors Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Animation durations (ms)
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
}

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'app-theme',
  user: 'app-user',
  token: 'app-token',
}

// Pagination defaults
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  pageSizeOptions: [10, 25, 50, 100],
}
