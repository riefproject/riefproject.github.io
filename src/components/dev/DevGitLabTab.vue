<template>
  <div class="tab-content">
    <div class="masked-note">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>
        {{
          isId ?
            'Aktivitas dari workspace GitLab perusahaan — detail proyek & domain disamarkan demi kerahasiaan.'
          : 'Activity from a company GitLab workspace — project details & domain are masked for confidentiality.'
        }}
      </span>
    </div>

    <StatsGrid appearance="dev" :items="stats" />

    <ActivityHeatmap
      :weeks="gitlabHeatmapWeeks"
      :months="gitlabHeatmapMonths"
      :title="`GitLab ${isId ? 'Kalender Kontribusi' : 'Contribution Calendar'}`"
      :countBadge="`${gitlabTotalEvents} ${isId ? 'event' : 'events'}`"
      :getMetrics="devHeatmapMetrics"
      :isId="isId" />

    <LanguageBars
      v-if="gitlabLanguages.length"
      :languages="gitlabLanguages"
      :isId="isId"
      :titleEn="'Most Used Languages'"
      :titleId="'Bahasa Pemrograman'"
      :subtitleEn="'From active projects (details masked)'"
      :subtitleId="'Dari proyek aktif (detail proyek disamarkan)'" />
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

const stats = computed<StatItem[]>(() => {
  const { isId, gitlab } = props
  return [
    {
      label: isId ? 'Total Event' : 'Total Events',
      value: props.gitlabTotalEvents,
      unit: '+',
      variant: 'emerald',
      helper: isId ? 'Aktivitas di GitLab' : 'GitLab activity',
    },
    {
      label: isId ? 'Hari Aktif' : 'Active Days',
      value: gitlab?.stats?.daysActive || 0,
      variant: 'sky',
      helper: isId ? 'Hari dengan aktivitas' : 'Days with activity',
    },
    {
      label: isId ? 'MR Dibuka' : 'MR Opened',
      value: props.gitlabMrOpened,
      variant: 'amber',
      helper: 'Merge Request',
    },
    {
      label: isId ? 'MR Merged' : 'MR Merged',
      value: props.gitlabMrMerged,
      variant: 'purple',
      helper: isId ? 'Digabung ke branch utama' : 'Merged to main branch',
    },
  ]
})
</script>
