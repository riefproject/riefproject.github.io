<template>
	<button
		type="button"
		@click="toggleLang"
		class="toggle-btn"
		:aria-label="ariaLabel"
	>
		<span class="segment" :class="{ active: $lang === 'en' }">EN</span>
		<span class="divider">/</span>
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
	gap: 0.3rem;
	padding: 0.35rem 0.6rem;
	border-radius: 0.9rem;
	border: 1px solid var(--border);
	background: var(--bg-elevated);
	color: var(--text);
	font-weight: 700;
	font-size: 0.9rem;
	letter-spacing: 0.02em;
	transition: background 0.2s ease, border 0.2s ease;
}

.toggle-btn:hover {
	background: var(--surface-muted);
}

.segment {
	padding: 0.25rem 0.45rem;
	border-radius: 0.7rem;
	color: var(--muted);
}

.segment.active {
	background: var(--chip-bg);
	color: var(--accent-strong);
	border: 1px solid var(--border);
}

.divider {
	color: var(--muted);
	font-size: 0.9rem;
}
</style>
