<template>
  <button
    type="button"
    @click="toggleTheme"
    class="toggle-btn"
    :aria-label="ariaLabel">
    <span
      class="segment"
      :class="{ active: $theme === 'light' }"
      aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    </span>
    <span class="divider" aria-hidden="true"></span>
    <span
      class="segment"
      :class="{ active: $theme === 'dark' }"
      aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useStore } from "@nanostores/vue";
import { theme, toggleTheme } from "../stores/uiStore.js";
import { watchEffect, computed } from "vue";

const $theme = useStore(theme);
const ariaLabel = computed(() =>
  $theme.value === "dark" ? "Switch to light mode" : "Switch to dark mode"
);

watchEffect(() => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if ($theme.value === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
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
  transition: background 0.2s ease, border 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
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
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;
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
