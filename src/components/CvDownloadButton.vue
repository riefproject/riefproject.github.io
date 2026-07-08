<template>
  <div class="cv-download-wrapper" ref="wrapper">
    <button
      class="btn ghost cv-trigger"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      aria-haspopup="true">
      <span>{{ label }}</span>
      <svg
        class="chevron"
        :class="{ 'is-open': isOpen }"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <Transition name="fade">
      <div v-if="isOpen" class="cv-dropdown">
        <a
          href="/pdf/cv-arief-en.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="cv-item">
          <span class="lang-code">EN</span>
          <span class="lang-label">English Version</span>
        </a>
        <a
          href="/pdf/cv-arief-in.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="cv-item">
          <span class="lang-code">ID</span>
          <span class="lang-label">Versi Indonesia</span>
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useStore } from "@nanostores/vue";
import { lang as currentLang } from "../stores/uiStore";

const lang = useStore(currentLang);
const isOpen = ref(false);
const wrapper = ref<HTMLElement | null>(null);

const label = computed(() => {
  return lang.value === "id" ? "Unduh CV" : "Download CV";
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (e: MouseEvent) => {
  if (wrapper.value && !wrapper.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
.cv-download-wrapper {
  position: relative;
  display: inline-block;
  width: auto;
}

.cv-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.chevron {
  transition: transform 0.2s ease;
}

.chevron.is-open {
  transform: rotate(180deg);
}

.cv-dropdown {
  position: absolute;
  top: 100%; /* Show below the button */
  left: 0;
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cv-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  color: var(--text-main);
  text-decoration: none;
  font-size: 0.9rem;
  background: transparent !important;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

/* Keep dropdown items flat across states */
.cv-item:visited,
.cv-item:focus,
.cv-item:focus-visible {
  background: transparent !important;
  outline: none;
}

@media (hover: hover) {
  .cv-item:hover {
    background: transparent !important;
    transform: translateX(4px);
  }
}

.cv-item:active {
  background: transparent !important;
  transform: translateX(2px);
}

.lang-code {
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.125rem 0;
  color: var(--text-main);
  transition: all 0.2s ease;
}

.cv-item:hover .lang-code {
  background: transparent;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
