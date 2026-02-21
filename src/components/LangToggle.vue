<template>
	<button
		type="button"
		@click="toggleLang"
		data-lang-toggle-fallback
		class="toggle-btn"
		:aria-label="ariaLabel"
	>
		<span class="segment" :class="{ active: $lang === 'en' }">EN</span>
		<span class="divider" aria-hidden="true"></span>
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
	gap: 0.25rem;
	padding: 0.28rem 0.5rem;
	border-radius: 0.85rem;
	border: 1px solid var(--border);
	background: var(--bg-elevated);
	color: var(--text);
	font-weight: 700;
	font-size: 0.85rem;
	letter-spacing: 0.02em;
	transition: background 0.2s ease, border 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
	line-height: 1.2;
}

.toggle-btn:hover {
	background: var(--surface-muted);
	transform: translateY(-1px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

.toggle-btn:active {
	transform: translateY(0);
	box-shadow: none;
}

.segment {
	padding: 0.22rem 0.38rem;
	border-radius: 0.65rem;
	color: var(--muted);
	line-height: 1.1;
	transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.segment.active {
	background: var(--chip-bg);
	color: var(--accent-strong);
	border: 1px solid var(--border);
	animation: toggle-pop 160ms ease;
}

.divider {
	display: inline-block;
	width: 1px;
	height: 1.4rem;
	background: var(--border);
	margin: 0 0.12rem;
	border-radius: 999px;
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
