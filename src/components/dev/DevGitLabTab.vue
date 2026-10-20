<template>
  <div class="tab-content">
    <div class="masked-note">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>{{ copy.maskedNote }}</span>
    </div>

    <StatsGrid appearance="dev" :items="stats" />

    <ActivityHeatmap
      :weeks="gitlabHeatmapWeeks"
      :months="gitlabHeatmapMonths"
      :title="`GitLab ${copy.contributionCalendar}`"
      :countBadge="`${gitlabTotalEvents} ${copy.events}`"
      :getMetrics="devHeatmapMetrics"
      :isId="isId" />

    <LanguageBars
      v-if="gitlabLanguages.length"
      :languages="gitlabLanguages"
      :isId="isId"
      :title-en="copy.languagesTitle"
      :title-id="copy.languagesTitle"
      :subtitle-en="copy.languagesSubtitle"
      :subtitle-id="copy.languagesSubtitle" />
  </div>
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue'
import LanguageBars from '../shared/LanguageBars.vue'
import StatsGrid from '../shared/StatsGrid.vue'
import { devHeatmapMetrics, type HeatmapDay } from '../../utils/heatmap'
import type { DevPlatformProfile, GitLanguage } from '../../types/dev.types'
import type { StatItem } from '../../types/ui.types'
import { computed } from 'vue'

const props = defineProps<{
  gitlab: DevPlatformProfile
  gitlabTotalEvents: number
  gitlabMrOpened: number
  gitlabMrMerged: number
  gitlabHeatmapWeeks: HeatmapDay[][]
  gitlabHeatmapMonths: Array<{ name: string; percent: number }>
  gitlabLanguages: GitLanguage[]
  isId?: boolean
}>()

const copy = computed(() => {
  const id = props.isId
  return {
    maskedNote:
      id ?
        'Aktivitas dari workspace GitLab perusahaan — detail proyek & domain disamarkan demi kerahasiaan.'
      : 'Activity from a company GitLab workspace — project details & domain are masked for confidentiality.',
    contributionCalendar: id ? 'Kalender Kontribusi' : 'Contribution Calendar',
    events: id ? 'event' : 'events',
    languagesTitle: id ? 'Bahasa Pemrograman' : 'Most Used Languages',
    languagesSubtitle:
      id ? 'Dari proyek aktif (detail proyek disamarkan)' : 'From active projects (details masked)',
    totalEvents: id ? 'Total Event' : 'Total Events',
    gitlabActivity: id ? 'Aktivitas di GitLab' : 'GitLab activity',
    activeDays: id ? 'Hari Aktif' : 'Active Days',
    daysWithActivity: id ? 'Hari dengan aktivitas' : 'Days with activity',
    mrOpened: id ? 'MR Dibuka' : 'MR Opened',
    mrMerged: 'MR Merged',
    mergedToMain: id ? 'Digabung ke branch utama' : 'Merged to main branch',
  }
})

const stats = computed<StatItem[]>(() => {
  const { gitlab } = props
  return [
    {
      label: copy.value.totalEvents,
      value: props.gitlabTotalEvents,
      unit: '+',
      variant: 'emerald',
      helper: copy.value.gitlabActivity,
    },
    {
      label: copy.value.activeDays,
      value: gitlab?.stats?.daysActive || 0,
      variant: 'sky',
      helper: copy.value.daysWithActivity,
    },
    {
      label: copy.value.mrOpened,
      value: props.gitlabMrOpened,
      variant: 'amber',
      helper: 'Merge Request',
    },
    {
      label: copy.value.mrMerged,
      value: props.gitlabMrMerged,
      variant: 'purple',
      helper: copy.value.mergedToMain,
    },
  ]
})
</script>
