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

const initialLang = normalizeLang(readStorage(LANG_KEY, 'en'));
const prefersDark =
	typeof window !== 'undefined' && typeof window.matchMedia === 'function'
		? window.matchMedia('(prefers-color-scheme: dark)').matches
		: false;
const initialTheme = readStorage(THEME_KEY, prefersDark ? 'dark' : 'light');

export const lang = atom(initialLang);
export function setLang(newLang) {
	const normalized = normalizeLang(newLang);
	lang.set(normalized);
	writeStorage(LANG_KEY, normalized);
	if (typeof window !== 'undefined') {
		window.__applyLanguage?.(normalized);
		window.dispatchEvent(new CustomEvent('portfolio:lang-change', { detail: normalized }));
	}
}

export const theme = atom(initialTheme);
export function setTheme(newTheme) {
	theme.set(newTheme);
	writeStorage(THEME_KEY, newTheme);
}
export function toggleTheme() {
	const next = theme.get() === 'light' ? 'dark' : 'light';
	setTheme(next);
}
