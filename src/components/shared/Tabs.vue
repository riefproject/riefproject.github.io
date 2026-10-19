<script setup lang="ts">
import TabItemRow from './TabItem.vue'
import type { TabItem } from '../../types/ui.types'

withDefaults(
  defineProps<{
    modelValue: string
    tabs: TabItem[]
    isId?: boolean
    ariaLabel?: string
    wrap?: boolean
  }>(),
  {
    isId: false,
    ariaLabel: 'Navigation tabs',
    wrap: false,
  }
)

defineEmits<{
  (e: 'update:modelValue', key: string): void
}>()
</script>

<template>
  <div class="tabs-nav" :class="{ 'tabs-nav--wrap': wrap }" role="tablist" :aria-label="ariaLabel">
    <TabItemRow
      v-for="tab in tabs"
      :key="tab.key"
      :item="tab"
      :active="modelValue === tab.key"
      :isId="isId"
      @select="$emit('update:modelValue', tab.key)" />
  </div>
</template>

<style scoped>
.tabs-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs-nav::-webkit-scrollbar {
  display: none;
}

@media (max-width: 640px) {
  .tabs-nav--wrap {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
    border-bottom: none;
    gap: 0.5rem;
  }
}
</style>
