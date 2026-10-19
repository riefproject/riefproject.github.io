<template>
  <div class="metrics-grid">
    <StatCard
      v-for="(metric, idx) in metrics"
      :key="idx"
      :label="metric.label"
      :value="metric.value"
      :helper="metric.sub"
      appearance="metric">
      <template v-if="metric.subHighlight" #helper>
        {{ metric.subPrefix }}
        <span class="capitalize font-medium">{{ metric.subHighlight }}</span>
      </template>
    </StatCard>
  </div>
</template>

<script setup lang="ts">
import StatCard from '../shared/StatCard.vue'
import type { CpMetric } from '../../types/cp.types'

defineProps<{ metrics: CpMetric[] }>()
</script>

<style scoped>
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 640px) {
  .metrics-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
