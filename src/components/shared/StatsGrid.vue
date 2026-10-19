<script setup lang="ts">
import StatCard from './StatCard.vue'
import type { StatItem } from '../../types/ui.types'

withDefaults(
  defineProps<{
    items: StatItem[]
    appearance?: 'default' | 'dev' | 'metric'
  }>(),
  { appearance: 'default' }
)
</script>

<template>
  <div class="stats-grid">
    <StatCard
      v-for="(stat, idx) in items"
      :key="idx"
      :label="stat.label"
      :value="stat.value"
      :unit="stat.unit"
      :appearance="appearance"
      :variant="stat.variant"
      :helper="stat.helper" />
  </div>
</template>
