<template>
	<button
		type="button"
		@click="toggleLang"
		class="toggle-btn"
		:aria-label="ariaLabel"
	>
		{{ $lang === 'en' ? 'ID' : 'EN' }}
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
	padding: 0.35rem 0.85rem;
	border-radius: 0.75rem;
	border: 1px solid var(--border);
	background: var(--bg-elevated);
	color: var(--text);
	font-weight: 600;
	font-size: 0.85rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;
}

.toggle-btn:hover {
	background: var(--surface-muted);
}
</style>
