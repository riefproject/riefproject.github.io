<template>
  <SegmentedToggle
    data-lang-toggle-fallback
    :modelValue="activeLang"
    :options="options"
    :aria-label="ariaLabel"
    @update:modelValue="switchLanguage($event)" />
</template>

<script setup lang="ts">
declare global {
  interface Window {
    __applyLanguage?: (lang: string) => void
  }
}

import { useStore } from '@nanostores/vue'
import { computed, watchEffect } from 'vue'
import { lang, switchLanguage } from '../../stores/uiStore'
import SegmentedToggle from '../shared/SegmentedToggle.vue'

const props = defineProps<{
  initialLocale?: 'en' | 'id'
}>()

const options = [
  { value: 'en', label: 'EN' },
  { value: 'id', label: 'ID' },
]

const $lang = useStore(lang)
const activeLang = computed(() => props.initialLocale ?? $lang.value)
const ariaLabel = computed(() =>
  activeLang.value === 'en' ? 'Switch language to Indonesian' : 'Change language to English'
)

watchEffect(() => {
  if (typeof window === 'undefined') return
  window.__applyLanguage?.($lang.value)
})
</script>
