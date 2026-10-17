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
        stroke-width="1.75"
        stroke="currentColor"
        class="toggle-icon">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    </span>
    <span
      class="segment"
      :class="{ active: $theme === 'dark' }"
      aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.75"
        stroke="currentColor"
        class="toggle-icon">
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
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
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

.toggle-icon {
  width: 1rem;
  height: 1rem;
  display: block;
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
