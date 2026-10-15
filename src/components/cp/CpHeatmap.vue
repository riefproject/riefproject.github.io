<template>
  <ActivityHeatmap
    :weeks="heatmapWeeks"
    :months="heatmapMonths"
    :title="isId ? 'Kalender Aktivitas Submisi' : 'Submission Activity Heatmap'"
    :countBadge="`${totalSubmissionsInHeatmap} ${isId ? 'submisi 12 bulan terakhir' : 'submissions in past 12 months'}`"
    :isId="isId"
  />
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue';
import type { HeatmapDay } from './cpUtils';

defineProps<{
  heatmapWeeks: HeatmapDay[][];
  heatmapMonths: Array<{ name: string; percent: number }>;
  totalSubmissionsInHeatmap: number;
  isId?: boolean;
}>();
</script>
