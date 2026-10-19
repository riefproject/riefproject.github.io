import { atom } from 'nanostores';

export type Locale = 'en' | 'id';
export type Theme = 'light' | 'dark';

const THEME_KEY = 'portfolio-theme';
const LANG_KEY = 'portfolio-lang';

declare global {
  interface Window {
    __applyLanguage?: (lang: Locale) => void;
  }
}

const normalizeLang = (value: unknown): Locale => {
  if (typeof value !== 'string') return 'en';
  const normalized = value.toLowerCase();
  if (normalized === 'id' || normalized === 'in' || normalized.startsWith('id-')) {
    return 'id';
  }
  return 'en';
};

const hasStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
};

const readStorage = (key: string, fallback: string): string => {
  if (!hasStorage()) return fallback;
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key: string, value: string): void => {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore quota errors
  }
};

// Always start with SSR-compatible state to prevent Vue hydration mismatches.
export const lang = atom<Locale>('en');
export const theme = atom<Theme>('light');

if (typeof window !== 'undefined') {
  // Sync with client-side storage after a tick to allow hydration to complete
  setTimeout(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const actualTheme = readStorage(THEME_KEY, prefersDark ? 'dark' : 'light');
    theme.set(actualTheme === 'dark' ? 'dark' : 'light');

    const actualLang = normalizeLang(readStorage(LANG_KEY, 'en'));
    if (actualLang !== 'en') lang.set(actualLang);
  }, 0);
}

export const setLang = (newLang: string): void => {
  const normalized = normalizeLang(newLang);
  lang.set(normalized);
  writeStorage(LANG_KEY, normalized);
  if (typeof window !== 'undefined') {
    window.__applyLanguage?.(normalized);
    window.dispatchEvent(new CustomEvent('portfolio:lang-change', { detail: normalized }));
  }
};

export const setTheme = (newTheme: Theme): void => {
  theme.set(newTheme);
  writeStorage(THEME_KEY, newTheme);
};

export const toggleTheme = (): void => {
  const next: Theme = theme.get() === 'light' ? 'dark' : 'light';
  setTheme(next);
};
