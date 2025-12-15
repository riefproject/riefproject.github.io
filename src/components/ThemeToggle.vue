<template>
	<button type="button" @click="toggleTheme" class="toggle-btn" :aria-label="ariaLabel">
		<span class="segment" :class="{ active: $theme === 'light' }" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m8.364-8.364l-.707-.707M4.343 4.343l-.707-.707m16.97 0l-.707.707M4.343 19.657l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
				/>
			</svg>
		</span>
		<span class="divider" aria-hidden="true"></span>
		<span class="segment" :class="{ active: $theme === 'dark' }" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
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
	gap: 0.2rem;
	padding: 0.28rem 0.5rem;
	border-radius: 0.85rem;
	border: 1px solid var(--border);
	background: var(--bg-elevated);
	color: var(--text);
	font-weight: 700;
	font-size: 0.8rem;
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
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0.3rem 0.35rem;
	border-radius: 0.65rem;
	color: var(--muted);
	width: 1.9rem;
	height: 1.9rem;
	border: 1px solid transparent;
	line-height: 1.1;
	transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.segment.active {
	background: var(--chip-bg);
	color: var(--accent-strong);
	border-color: var(--border);
	animation: toggle-pop 160ms ease;
}

.icon {
	width: 1rem;
	height: 1rem;
}

.divider {
	width: 1px;
	height: 1.4rem;
	background: var(--border);
	display: inline-block;
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
