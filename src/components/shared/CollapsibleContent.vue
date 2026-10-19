<script setup lang="ts">
import { useId } from 'vue'
import type { LocaleText } from '../../types/profile.types'
import { useLocale } from '../../composables/useLocale'

withDefaults(
  defineProps<{
    collapsedHeight?: string
    fadeHeight?: string
    labelSize?: 'sm' | 'base'
    labelMargin?: string
    readMore?: LocaleText
    showLess?: LocaleText
  }>(),
  {
    collapsedHeight: '120px',
    fadeHeight: '3rem',
    labelSize: 'sm',
    labelMargin: '0.25rem',
    readMore: () => ({ en: 'Read details', id: 'Baca selengkapnya' }),
    showLess: () => ({ en: 'Show less', id: 'Tampilkan lebih sedikit' }),
  }
)

const toggleId = `collapsible-${useId()}`
const { resolveText } = useLocale()
</script>

<template>
  <div class="collapsible">
    <input :id="toggleId" type="checkbox" class="collapsible__toggle" />
    <div class="collapsible__body" :style="{ '--collapsed-height': collapsedHeight }">
      <slot />
      <div class="collapsible__fade" :style="{ height: fadeHeight }" aria-hidden="true"></div>
    </div>
    <label
      :for="toggleId"
      class="collapsible__label"
      :class="{ 'collapsible__label--base': labelSize === 'base' }"
      :style="{ marginTop: labelMargin }">
      <span class="read-more">{{ resolveText(readMore) }}</span>
      <span class="show-less">{{ resolveText(showLess) }}</span>
    </label>
  </div>
</template>

<style scoped>
.collapsible {
  position: relative;
}

.collapsible__toggle {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.collapsible__body {
  position: relative;
  overflow: hidden;
  max-height: var(--collapsed-height);
  transition: max-height 0.5s ease-in-out;
}

.collapsible__toggle:checked ~ .collapsible__body {
  max-height: 3000px;
}

.collapsible__fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  background: linear-gradient(to top, var(--bg-soft), transparent);
  transition:
    opacity 0.3s,
    background 0.2s ease;
}

.collapsible__toggle:checked ~ .collapsible__body .collapsible__fade {
  opacity: 0;
}

.collapsible__label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
}

.collapsible__label--base {
  font-size: 1rem;
}

.collapsible__label:hover {
  text-decoration: underline;
}

.collapsible__toggle:checked ~ .collapsible__label .read-more {
  display: none;
}

.collapsible__toggle:not(:checked) ~ .collapsible__label .show-less {
  display: none;
}
</style>
