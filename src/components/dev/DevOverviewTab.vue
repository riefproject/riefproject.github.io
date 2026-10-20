<template>
  <div class="tab-content">
    <StatsGrid appearance="dev" :items="stats" />

    <!-- Combined Heatmap -->
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="copy.heatmapTitle"
      :countBadge="heatmapBadge"
      :getMetrics="devHeatmapMetrics"
      :isId="isId" />

    <!-- Platform Cards -->
    <div class="platform-cards-grid">
      <PlatformCard
        name="GitHub"
        :handle="github?.user?.login || GITHUB_FALLBACK_USERNAME"
        logo="/img/stacks/github-dark.svg"
        logoLight="/img/stacks/github-light.svg"
        :solvedNum="github?.overview?.totalContributions || 0"
        :solvedLabel="copy.contributions"
        :footerText="copy.githubFooter"
        @select="$emit('selectTab', 'github')">
        <MetaRow :label="`${copy.longestStreak}:`">
          <strong>{{ github?.overview?.longestStreak || 0 }} {{ copy.days }}</strong>
        </MetaRow>
        <MetaRow :label="`${copy.prMergedLabel}:`">
          <strong>{{ githubPrMerged }} / {{ github?.prStats?.total || 0 }}</strong>
        </MetaRow>
      </PlatformCard>

      <PlatformCard
        name="GitLab"
        :handle="copy.gitlabHandle"
        logo="/img/stacks/gitlab-dark.svg"
        logoLight="/img/stacks/gitlab-light.svg"
        :solvedNum="gitlabTotalEvents"
        :solvedLabel="copy.events"
        :footerText="copy.gitlabFooter"
        @select="$emit('selectTab', 'gitlab')">
        <MetaRow :label="`${copy.activeDays}:`">
          <strong>{{ gitlab?.stats?.daysActive || 0 }}</strong>
        </MetaRow>
        <MetaRow :label="`${copy.mrMergedLabel}:`">
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
import { GITHUB_FALLBACK_USERNAME } from '../../utils/dev'

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

const copy = computed(() => {
  const id = props.isId
  return {
    totalContributions: id ? 'Total Kontribusi' : 'Total Contributions',
    combinedSources: id ? 'Gabungan GitHub & GitLab' : 'Combined GitHub + GitLab',
    currentStreak: id ? 'Streak Saat Ini' : 'Current Streak',
    currentStreakUnit: id ? ' hari' : ' days',
    activeStreakHelper: id ? 'Hari berturut-turut aktif' : 'Consecutive active days',
    prMerged: id ? 'PR / MR Selesai' : 'PR / MR Merged',
    topLanguage: id ? 'Bahasa Utama' : 'Top Language',
    topLanguageHelper: id ? 'Berdasarkan bytes repo publik' : 'By public repo bytes',
    heatmapTitle: id ? 'Aktivitas Pengembangan' : 'Development Activity',
    contributions: id ? 'kontribusi' : 'contributions',
    events: id ? 'event' : 'events',
    days: id ? 'hari' : 'days',
    longestStreak: id ? 'Streak Terpanjang' : 'Longest Streak',
    prMergedLabel: id ? 'PR Selesai' : 'PR Merged',
    mrMergedLabel: id ? 'MR Selesai' : 'MR Merged',
    activeDays: id ? 'Hari Aktif' : 'Active Days',
    githubFooter: id ? 'Lihat Detail GitHub →' : 'View GitHub Details →',
    gitlabFooter: id ? 'Lihat Detail GitLab →' : 'View GitLab Details →',
    gitlabHandle: id ? 'Workspace perusahaan' : 'Company workspace',
  }
})

const stats = computed<StatItem[]>(() => {
  const { githubPrMerged, gitlabMrMerged } = props
  return [
    {
      label: copy.value.totalContributions,
      value: props.totalContributions,
      unit: '+',
      variant: 'emerald',
      helper: copy.value.combinedSources,
    },
    {
      label: copy.value.currentStreak,
      value: props.currentStreak,
      unit: copy.value.currentStreakUnit,
      variant: 'sky',
      helper: copy.value.activeStreakHelper,
    },
    {
      label: copy.value.prMerged,
      value: props.prMerged,
      variant: 'purple',
      helper: `GitHub ${githubPrMerged} · GitLab ${gitlabMrMerged}`,
    },
    {
      label: copy.value.topLanguage,
      value: props.topLanguage || '—',
      variant: 'amber',
      helper: copy.value.topLanguageHelper,
    },
  ]
})

const heatmapBadge = computed(() => `${props.lastYearContributions} ${copy.value.contributions}`)

defineEmits<{
  (e: 'selectTab', tab: 'github' | 'gitlab'): void
}>()
</script>
