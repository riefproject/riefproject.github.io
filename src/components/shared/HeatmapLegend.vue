<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isId?: boolean
}>()

const copy = computed(() =>
  props.isId ? { less: 'Sedikit', more: 'Banyak' } : { less: 'Less', more: 'More' }
)
</script>

<template>
  <div class="heatmap-legend">
    <span class="legend-label">{{ copy.less }}</span>
    <span class="heat-box lvl-0"></span>
    <span class="heat-box lvl-1"></span>
    <span class="heat-box lvl-2"></span>
    <span class="heat-box lvl-3"></span>
    <span class="heat-box lvl-4"></span>
    <span class="legend-label">{{ copy.more }}</span>
  </div>
</template>

<style scoped>
.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--type-sm);
  color: var(--muted);
}

.heat-box {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-xs);
}

.heat-box.lvl-0 {
  background: var(--heatmap-0);
}
.heat-box.lvl-1 {
  background: var(--heatmap-1);
}
.heat-box.lvl-2 {
  background: var(--heatmap-2);
}
.heat-box.lvl-3 {
  background: var(--heatmap-3);
}
.heat-box.lvl-4 {
  background: var(--heatmap-4);
}
</style>
