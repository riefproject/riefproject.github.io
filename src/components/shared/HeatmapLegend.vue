<script setup lang="ts">
defineProps<{
  isId?: boolean
}>()
</script>

<template>
  <div class="heatmap-legend">
    <span class="legend-label">{{ isId ? 'Sedikit' : 'Less' }}</span>
    <span class="heat-box lvl-0"></span>
    <span class="heat-box lvl-1"></span>
    <span class="heat-box lvl-2"></span>
    <span class="heat-box lvl-3"></span>
    <span class="heat-box lvl-4"></span>
    <span class="legend-label">{{ isId ? 'Banyak' : 'More' }}</span>
  </div>
</template>

<style scoped>
.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--text-sm);
  color: var(--muted);
}

.heat-box {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-xs);
}

.heat-box.lvl-0 {
  background: var(--bg-elevated);
}
.heat-box.lvl-1 {
  background: #064e3b;
}
.heat-box.lvl-2 {
  background: #047857;
}
.heat-box.lvl-3 {
  background: #10b981;
}
.heat-box.lvl-4 {
  background: #34d399;
}
</style>
