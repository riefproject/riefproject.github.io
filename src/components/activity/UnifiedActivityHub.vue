<template>
  <div class="activity-hub">
    <Tabs
      v-model="heatmapFilter"
      :tabs="filterTabs"
      :isId="isId"
      :ariaLabel="activityFilterLabel" />

    <!-- Clean Activity Heatmap (identical to /competitive-programming style) -->
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="heatmapTitle"
      :countBadge="heatmapCountBadge"
      :isId="isId"
      :getMetrics="resolveUnifiedMetrics" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '../../composables/useLocale'
import { useCpStats } from '../../composables/useCpStats'
import { useDevStats } from '../../composables/useDevStats'
import ActivityHeatmap from '../shared/ActivityHeatmap.vue'
import Tabs from '../shared/Tabs.vue'
import {
  buildHeatmapDays,
  mergeActivityHeatmaps,
  toWeeks,
  buildMonths,
  type HeatmapDay,
  type HeatmapTooltipMetric,
} from '../../utils/heatmap'
import type { CpData } from '../../types/cp.types'
import type { DevActivityData } from '../../types/dev.types'

const props = defineProps<{
  initialDevData?: DevActivityData | null
  initialCpData?: CpData | null
}>()

const { isId } = useLocale()

const heatmapFilter = ref<'all' | 'dev' | 'cp'>('all')
const activityFilterLabel = computed(() => (isId.value ? 'Filter aktivitas' : 'Activity filters'))

const devData = computed(() => props.initialDevData ?? null)
const cpData = computed(() => props.initialCpData ?? null)

const { totalContributions: devTotalContributions } = useDevStats(devData)
const { totalSolved: totalCpSolved } = useCpStats(cpData)

const totalAll = computed(() => devTotalContributions.value + totalCpSolved.value)

const filterTabs = computed(() => [
  {
    key: 'all' as const,
    labelEn: 'All Overview',
    labelId: 'Semua Overview',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    count: `${totalAll.value}+`,
  },
  {
    key: 'dev' as const,
    labelEn: 'Development',
    labelId: 'Development',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    count: `${devTotalContributions.value}+`,
  },
  {
    key: 'cp' as const,
    labelEn: 'Competitive Programming',
    labelId: 'Competitive Programming',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    count: `${totalCpSolved.value}+`,
  },
])

// Heatmap Title & Count Badge
const heatmapTitle = computed(() => {
  if (heatmapFilter.value === 'dev') {
    return isId.value ? 'Kalender Aktivitas Development' : 'Development Activity Calendar'
  }
  if (heatmapFilter.value === 'cp') {
    return isId.value ? 'Kalender Aktivitas Submisi CP' : 'CP Submission Activity Calendar'
  }
  return isId.value ? 'Kalender Aktivitas' : 'Activity Calendar'
})

const heatmapCountBadge = computed(() => {
  return `${activeDaysCount.value} ${isId.value ? 'hari aktif' : 'active days'}`
})

// Unified Heatmap construction
const unifiedMap = computed(() =>
  mergeActivityHeatmaps(
    props.initialDevData?.platforms?.github?.overview?.heatmap || {},
    props.initialDevData?.platforms?.gitlab?.heatmap || {},
    props.initialCpData?.overview?.heatmap || {},
    heatmapFilter.value
  )
)

const heatmapDays = computed(() =>
  buildHeatmapDays(unifiedMap.value, (entry) => ({
    count: entry?.count || 0,
    github: entry?.github,
    gitlab: entry?.gitlab,
    ac: entry?.ac,
    tries: entry?.tries,
  }))
)

const heatmapWeeks = computed(() => toWeeks(heatmapDays.value))
const heatmapMonths = computed(() => buildMonths(heatmapWeeks.value))
const activeDaysCount = computed(() => heatmapDays.value.filter((d) => d.count > 0).length)

const resolveUnifiedMetrics = (day: HeatmapDay, isIdState: boolean): HeatmapTooltipMetric[] => {
  const metrics: HeatmapTooltipMetric[] = []
  if (day.github && day.github > 0) {
    metrics.push({
      value: day.github,
      label: 'GitHub',
      logo: '/img/stacks/github-dark.svg',
      logoLight: '/img/stacks/github-light.svg',
      color: 'slate',
    })
  }
  if (day.gitlab && day.gitlab > 0) {
    metrics.push({
      value: day.gitlab,
      label: 'GitLab',
      logo: '/img/stacks/gitlab-dark.svg',
      logoLight: '/img/stacks/gitlab-light.svg',
      color: 'orange',
    })
  }
  if (day.ac && day.ac > 0) {
    metrics.push({
      value: day.ac,
      label: 'AC',
      color: 'emerald',
    })
  }
  if (day.tries && day.tries > 0) {
    metrics.push({
      value: day.tries,
      label: 'Tries',
      color: 'amber',
    })
  }
  if (metrics.length === 0) {
    return [
      {
        value: isIdState ? 'Tidak ada aktivitas' : 'No activity',
        color: 'slate',
      },
    ]
  }
  return metrics
}
</script>

<style scoped>
.activity-hub {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
}
</style>
