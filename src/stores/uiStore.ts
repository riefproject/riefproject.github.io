import { atom } from 'nanostores'
import { localeFromPath } from '../utils/routing'

export type Locale = 'en' | 'id'
export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio-theme'

const hasStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

const readStorage = (key: string, fallback: string): string => {
  if (!hasStorage()) return fallback
  try {
    return window.localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

const writeStorage = (key: string, value: string): void => {
  if (!hasStorage()) return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // ignore quota errors
  }
}

// The URL is the source of truth for the locale. Keep the SSR default stable,
// then hydrate to the path-based locale on the client.
export const lang = atom<Locale>(typeof window !== 'undefined' ? localeFromPath(window.location.pathname) : 'en')
export const theme = atom<Theme>('light')

if (typeof window !== 'undefined') {
  // Sync with client-side storage after a tick to allow hydration to complete
  setTimeout(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const actualTheme = readStorage(THEME_STORAGE_KEY, prefersDark ? 'dark' : 'light')
    theme.set(actualTheme === 'dark' ? 'dark' : 'light')

    const pathLang = localeFromPath(window.location.pathname)
    if (pathLang !== lang.get()) lang.set(pathLang)
  }, 0)
}

export const setTheme = (newTheme: Theme): void => {
  theme.set(newTheme)
  writeStorage(THEME_STORAGE_KEY, newTheme)
}
