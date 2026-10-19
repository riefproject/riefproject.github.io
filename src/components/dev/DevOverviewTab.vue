<template>
  <div class="tab-content">
    <StatsGrid appearance="dev" :items="stats" />

    <!-- Combined Heatmap -->
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="isId ? 'Aktivitas Pengembangan' : 'Development Activity'"
      :countBadge="`${lastYearContributions} ${isId ? 'kontribusi' : 'contributions'}`"
      :getMetrics="devHeatmapMetrics"
      :isId="isId" />

    <!-- Platform Cards -->
    <div class="platform-cards-grid">
      <PlatformCard
        name="GitHub"
        :handle="github?.user?.login || 'riefproject'"
        logo="/img/stacks/github-dark.svg"
        logoLight="/img/stacks/github-light.svg"
        :solvedNum="github?.overview?.totalContributions || 0"
        :solvedLabel="isId ? 'kontribusi' : 'contributions'"
        :footerText="isId ? 'Lihat Detail GitHub →' : 'View GitHub Details →'"
        @select="$emit('selectTab', 'github')">
        <MetaRow :label="`${isId ? 'Streak Terpanjang' : 'Longest Streak'}:`">
          <strong>{{ github?.overview?.longestStreak || 0 }} {{ isId ? 'hari' : 'days' }}</strong>
        </MetaRow>
        <MetaRow label="PR Merged:">
          <strong>{{ githubPrMerged }} / {{ github?.prStats?.total || 0 }}</strong>
        </MetaRow>
      </PlatformCard>

      <PlatformCard
        name="GitLab"
        :handle="isId ? 'Workspace perusahaan' : 'Company workspace'"
        logo="/img/stacks/gitlab-dark.svg"
        logoLight="/img/stacks/gitlab-light.svg"
        :solvedNum="gitlabTotalEvents"
        :solvedLabel="isId ? 'event' : 'events'"
        :footerText="isId ? 'Lihat Detail GitLab →' : 'View GitLab Details →'"
        @select="$emit('selectTab', 'gitlab')">
        <MetaRow :label="`${isId ? 'Hari Aktif' : 'Active Days'}:`">
          <strong>{{ gitlab?.stats?.daysActive || 0 }}</strong>
        </MetaRow>
        <MetaRow label="MR Merged:">
          <strong>{{ gitlabMrMerged }}</strong>
        </MetaRow>
      </PlatformCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue'
import MetaRow from '../shared/MetaRow.vue'
import PlatformCard from '../shared/PlatformCard.vue'
import StatsGrid from '../shared/StatsGrid.vue'
import { devHeatmapMetrics, type HeatmapDay } from '../../utils/heatmap'
import type { DevPlatformProfile } from '../../types/dev.types'
import type { StatItem } from '../../types/ui.types'
import { computed } from 'vue'

const props = defineProps<{
  totalContributions: number
  currentStreak: number
  prMerged: number
  githubPrMerged: number
  gitlabMrMerged: number
  topLanguage?: string
  lastYearContributions: number
  heatmapWeeks: HeatmapDay[][]
  heatmapMonths: Array<{ name: string; percent: number }>
  github: DevPlatformProfile
  gitlab: DevPlatformProfile
  gitlabTotalEvents: number
  isId?: boolean
}>()

const stats = computed<StatItem[]>(() => {
  const { isId, githubPrMerged, gitlabMrMerged } = props
  return [
    {
      label: isId ? 'Total Kontribusi' : 'Total Contributions',
      value: props.totalContributions,
      unit: '+',
      variant: 'emerald',
      helper: isId ? 'Gabungan GitHub & GitLab' : 'Combined GitHub + GitLab',
    },
    {
      label: isId ? 'Streak Saat Ini' : 'Current Streak',
      value: props.currentStreak,
      unit: isId ? ' hari' : ' days',
      variant: 'sky',
      helper: isId ? 'Hari berturut-turut aktif' : 'Consecutive active days',
    },
    {
      label: isId ? 'PR / MR Selesai' : 'PR / MR Merged',
      value: props.prMerged,
      variant: 'purple',
      helper: `GitHub ${githubPrMerged} · GitLab ${gitlabMrMerged}`,
    },
    {
      label: isId ? 'Bahasa Utama' : 'Top Language',
      value: props.topLanguage || '—',
      variant: 'amber',
      helper: isId ? 'Berdasarkan bytes repo publik' : 'By public repo bytes',
    },
  ]
})

defineEmits<{
  (e: 'selectTab', tab: 'github' | 'gitlab'): void
}>()
</script>
