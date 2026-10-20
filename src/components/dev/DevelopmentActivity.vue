<template>
  <div class="dev-dashboard">
    <!-- Topbar -->
    <DashboardTopbar :lastUpdated="lastUpdated" :isId="isId" />

    <Tabs v-model="activeTab" :tabs="tabs" :isId="isId" wrap />

    <!-- TAB: OVERVIEW -->
    <DevOverviewTab
      v-if="activeTab === 'overview'"
      :totalContributions="totalContributions"
      :currentStreak="currentStreak"
      :prMerged="prMerged"
      :githubPrMerged="githubPrMerged"
      :gitlabMrMerged="gitlabMrMerged"
      :topLanguage="topLanguage"
      :lastYearContributions="lastYearContributions"
      :heatmapWeeks="heatmapWeeks"
      :heatmapMonths="heatmapMonths"
      :github="github"
      :gitlab="gitlab"
      :gitlabTotalEvents="gitlabTotalEvents"
      :isId="isId"
      @selectTab="activeTab = $event" />

    <!-- TAB: GITHUB -->
    <DevGitHubTab
      v-else-if="activeTab === 'github'"
      :github="github"
      :topLanguage="topLanguage"
      :githubLastYear="githubLastYear"
      :githubHeatmapWeeks="githubHeatmapWeeks"
      :githubHeatmapMonths="githubHeatmapMonths"
      :isId="isId" />

    <!-- TAB: GITLAB -->
    <DevGitLabTab
      v-else-if="activeTab === 'gitlab'"
      :gitlab="gitlab"
      :gitlabTotalEvents="gitlabTotalEvents"
      :gitlabMrOpened="gitlabMrOpened"
      :gitlabMrMerged="gitlabMrMerged"
      :gitlabHeatmapWeeks="gitlabHeatmapWeeks"
      :gitlabHeatmapMonths="gitlabHeatmapMonths"
      :gitlabLanguages="gitlabLanguages"
      :isId="isId" />

    <!-- Cross-link to Competitive Programming -->
    <DashboardCrosslink href="/competitive-programming">
      <span class="crosslink-l1">{{ isId ? 'Jelajahi' : 'Explore my' }}</span>
      <span class="crosslink-l2">{{
        isId ? 'Competitive Programming saya →' : 'Competitive Programming →'
      }}</span>
    </DashboardCrosslink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '../../composables/useLocale'
import { useDevStats } from '../../composables/useDevStats'
import DevOverviewTab from './DevOverviewTab.vue'
import DevGitHubTab from './DevGitHubTab.vue'
import DevGitLabTab from './DevGitLabTab.vue'
import Tabs from '../shared/Tabs.vue'
import DashboardCrosslink from '../shared/DashboardCrosslink.vue'
import DashboardTopbar from '../shared/DashboardTopbar.vue'
import type { DevActivityData } from '../../types/dev.types'

const props = defineProps<{
  initialData?: DevActivityData
}>()

const { isId } = useLocale()

const devData = ref<DevActivityData | null>(props.initialData || null)
const lastUpdated = ref<string>(props.initialData?.meta?.updatedAt || new Date().toISOString())
const activeTab = ref<'overview' | 'github' | 'gitlab'>('overview')

const {
  github,
  gitlab,
  topLanguage,
  githubPrMerged,
  gitlabMrMerged,
  gitlabMrOpened,
  prMerged,
  gitlabTotalEvents,
  totalContributions,
  currentStreak,
  lastYearContributions,
  githubLastYear,
  gitlabLanguages,
  heatmapWeeks,
  githubHeatmapWeeks,
  gitlabHeatmapWeeks,
  heatmapMonths,
  githubHeatmapMonths,
  gitlabHeatmapMonths,
  tabs,
} = useDevStats(devData)
</script>

<style scoped>
.dev-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-width: 0;
  --text-2xl: 1.75rem;
  --text-lg: 1.125rem;
  --text-base: 0.875rem;
  --text-sm: 0.75rem;
  --text-xs: 0.7rem;
}
</style>
