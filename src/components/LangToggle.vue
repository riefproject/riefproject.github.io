<template>
	<button
		type="button"
		@click="toggleLang"
		data-lang-toggle-fallback
		class="toggle-btn"
		:aria-label="ariaLabel"
	>
		<span class="segment" :class="{ active: $lang === 'en' }">EN</span>
		<span class="segment" :class="{ active: $lang === 'id' }">ID</span>
	</button>
</template>

<script setup lang="ts">
declare global {
	interface Window {
		__applyLanguage?: (lang: string) => void;
	}
}

import { useStore } from '@nanostores/vue';
import { lang, setLang } from '../stores/uiStore.js';
import { computed, watchEffect } from 'vue';

const $lang = useStore(lang);
const ariaLabel = computed(() =>
	$lang.value === 'en' ? 'Switch language to Indonesian' : 'Change language to English',
);

const toggleLang = () => {
	setLang($lang.value === 'en' ? 'id' : 'en');
};

watchEffect(() => {
	if (typeof window === 'undefined') return;
	window.__applyLanguage?.($lang.value);
});
</script>

<style scoped>
.toggle-btn {
	display: inline-flex;
	align-items: center;
	gap: 2px;
	padding: 3px;
	border-radius: 999px;
	border: 1px solid var(--border);
	background: var(--bg-soft);
	color: var(--text);
	cursor: pointer;
	font-weight: 700;
	font-size: 0.75rem;
	letter-spacing: 0.02em;
	transition: border-color 0.2s ease, background 0.2s ease;
	line-height: 1;
}

.toggle-btn:hover {
	border-color: var(--border-hover, var(--muted));
}

.segment {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.75rem;
	height: 1.75rem;
	border-radius: 999px;
	color: var(--muted);
	border: none;
	transition: all 0.2s ease;
	user-select: none;
}

.segment:hover {
	color: var(--text);
}

.segment.active {
	background: var(--surface);
	color: var(--accent);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	border: none;
	animation: toggle-pop 160ms ease;
}

@keyframes toggle-pop {
	0% {
		transform: scale(0.92);
	}
	70% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(1);
	}
}
</style>
