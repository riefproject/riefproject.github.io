<template>
  <SegmentedToggle
    data-lang-toggle-fallback
    :modelValue="$lang"
    :options="options"
    :aria-label="ariaLabel"
    @update:modelValue="setLang($event)"
  />
</template>

<script setup lang="ts">
declare global {
  interface Window {
    __applyLanguage?: (lang: string) => void;
  }
}

import { useStore } from '@nanostores/vue';
import { computed, watchEffect } from 'vue';
import { lang, setLang } from '../stores/uiStore.js';
import SegmentedToggle from './shared/SegmentedToggle.vue';

const options = [
  { value: 'en', label: 'EN' },
  { value: 'id', label: 'ID' },
];

const $lang = useStore(lang);
const ariaLabel = computed(() =>
  $lang.value === 'en' ? 'Switch language to Indonesian' : 'Change language to English',
);

watchEffect(() => {
  if (typeof window === 'undefined') return;
  window.__applyLanguage?.($lang.value);
});
</script>
