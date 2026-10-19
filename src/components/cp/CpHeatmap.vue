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
import type { CpHeatmapDay } from '../../types/cp.types';

defineProps<{
  heatmapWeeks: CpHeatmapDay[][];
  heatmapMonths: Array<{ name: string; percent: number }>;
  totalSubmissionsInHeatmap: number;
  isId?: boolean;
}>();
</script>
