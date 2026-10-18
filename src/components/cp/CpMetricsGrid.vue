<template>
  <div class="spotlight-metrics-grid">
    <div v-for="(metric, idx) in metrics" :key="idx" class="spotlight-metric">
      <span class="metric-label">{{ metric.label }}</span>
      <span class="metric-val" :class="metric.variant ? `metric-val-${metric.variant}` : ''">{{ metric.value }}</span>
      <span v-if="metric.subHtml" class="metric-sub" v-html="metric.subHtml"></span>
      <span v-else-if="metric.sub" class="metric-sub">{{ metric.sub }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CpMetric } from './cpTypes';

defineProps<{ metrics: CpMetric[] }>();
</script>
