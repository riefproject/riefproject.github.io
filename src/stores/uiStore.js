import { atom } from 'nanostores';

const THEME_KEY = 'portfolio-theme';
const LANG_KEY = 'portfolio-lang';

const normalizeLang = (value) => {
	if (typeof value !== 'string') return 'en';
	const normalized = value.toLowerCase();
	if (normalized === 'id' || normalized === 'in' || normalized.startsWith('id-')) {
		return 'id';
	}
	return 'en';
};

const hasStorage = () => {
	try {
		return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
	} catch {
		return false;
	}
};

const readStorage = (key, fallback) => {
	if (!hasStorage()) return fallback;
	try {
		return window.localStorage.getItem(key) ?? fallback;
	} catch {
		return fallback;
	}
};

const writeStorage = (key, value) => {
	if (!hasStorage()) return;
	try {
		window.localStorage.setItem(key, value);
	} catch {
		// ignore quota errors
	}
};

// Always start with SSR-compatible state to prevent Vue hydration mismatches.
const initialLang = 'en';
const initialTheme = 'light';

export const lang = atom(initialLang);
export const theme = atom(initialTheme);

if (typeof window !== 'undefined') {
	// Sync with client-side storage after a tick to allow hydration to complete
	setTimeout(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const actualTheme = readStorage(THEME_KEY, prefersDark ? 'dark' : 'light');
		if (actualTheme !== 'light') theme.set(actualTheme);
		
		const actualLang = normalizeLang(readStorage(LANG_KEY, 'en'));
		if (actualLang !== 'en') lang.set(actualLang);
	}, 0);
}

export function setLang(newLang) {
	const normalized = normalizeLang(newLang);
	lang.set(normalized);
	writeStorage(LANG_KEY, normalized);
	if (typeof window !== 'undefined') {
		window.__applyLanguage?.(normalized);
		window.dispatchEvent(new CustomEvent('portfolio:lang-change', { detail: normalized }));
	}
}

export function setTheme(newTheme) {
	theme.set(newTheme);
	writeStorage(THEME_KEY, newTheme);
}
export function toggleTheme() {
	const next = theme.get() === 'light' ? 'dark' : 'light';
	setTheme(next);
}
