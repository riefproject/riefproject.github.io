<template>
	<button
		type="button"
		@click="toggleTheme"
		class="toggle-btn"
		aria-label="Toggle dark mode"
	>
		<svg
			v-if="$theme === 'dark'"
			xmlns="http://www.w3.org/2000/svg"
			class="icon"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m8.364-8.364l-.707-.707M4.343 4.343l-.707-.707m16.97 0l-.707.707M4.343 19.657l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
			/>
		</svg>
		<svg
			v-else
			xmlns="http://www.w3.org/2000/svg"
			class="icon"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	</button>
</template>

<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { theme, toggleTheme } from '../stores/uiStore.js';
import { watchEffect } from 'vue';

const $theme = useStore(theme);

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
	padding: 0.45rem;
	border-radius: 0.75rem;
	border: 1px solid var(--border);
	background: var(--bg-elevated);
	color: var(--text);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;
}

.toggle-btn:hover {
	background: var(--surface-muted);
}

.icon {
	width: 1.25rem;
	height: 1.25rem;
}
</style>
