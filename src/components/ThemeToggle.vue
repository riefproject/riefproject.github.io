<template>
	<button type="button" @click="toggleTheme" class="toggle-btn" :aria-label="ariaLabel">
		<span class="segment" :class="{ active: $theme === 'light' }">
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m8.364-8.364l-.707-.707M4.343 4.343l-.707-.707m16.97 0l-.707.707M4.343 19.657l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
				/>
			</svg>
			<span>Light</span>
		</span>
		<span class="divider">/</span>
		<span class="segment" :class="{ active: $theme === 'dark' }">
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
			<span>Dark</span>
		</span>
	</button>
</template>

<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { theme, toggleTheme } from '../stores/uiStore.js';
import { watchEffect, computed } from 'vue';

const $theme = useStore(theme);
const ariaLabel = computed(() => ($theme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'));

watchEffect(() => {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	if ($theme.value === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
});
</script>

<style scoped>
.toggle-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
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
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	padding: 0.25rem 0.45rem;
	border-radius: 0.7rem;
	color: var(--muted);
}

.segment.active {
	background: var(--chip-bg);
	color: var(--accent-strong);
	border: 1px solid var(--border);
}

.icon {
	width: 1rem;
	height: 1rem;
}

.divider {
	color: var(--muted);
	font-size: 0.9rem;
}
</style>
