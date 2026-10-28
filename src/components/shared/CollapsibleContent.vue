<script setup lang="ts">
import { useId } from 'vue'
import '../../styles/collapsible.css'
import type { LocaleText } from '../../types/profile.types'
import { useLocale } from '../../composables/useLocale'

const props = withDefaults(
  defineProps<{
    collapsedHeight?: string
    fadeHeight?: string
    labelSize?: 'sm' | 'base'
    labelMargin?: string
    readMore?: LocaleText
    showLess?: LocaleText
    initialLocale?: 'en' | 'id'
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
const { resolveText } = useLocale(props.initialLocale)
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
