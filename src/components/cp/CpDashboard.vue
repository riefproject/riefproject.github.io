<template>
  <div class="cp-dashboard">
    <!-- Header / Live Bar -->
    <DashboardTopbar :lastUpdated="lastUpdated" :isId="isId" />

    <!-- Global Hero Stats -->
    <div class="stats-grid">
      <StatCard
        :label="copy.totalSolved"
        :value="totalSolved"
        unit="+"
        variant="emerald"
        :helper="copy.totalSolvedHelper" />

      <StatCard
        :label="copy.totalSubmissions"
        :value="totalSubmissions"
        unit="+"
        variant="sky"
        :helper="copy.totalSubmissionsHelper" />

      <StatCard
        :label="copy.activePlatforms"
        :value="4"
        variant="amber"
        helper="TLX · Codeforces · LeetCode · HackerRank" />

      <StatCard
        :label="copy.primaryLanguage"
        :value="primaryLanguage.name"
        variant="purple"
        :helper="languageHelper" />
    </div>

    <!-- Submission Activity Heatmap Component -->
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="copy.heatmapTitle"
      :countBadge="heatmapBadge"
      :getMetrics="cpHeatmapMetrics"
      :isId="isId" />

    <!-- Tab System -->
    <section class="tabs-section">
      <Tabs v-model="activeTab" :tabs="tabs" :isId="isId" wrap />

      <!-- Active Tab Content -->
      <div class="tab-content-area">
        <CpOverviewTab
          v-if="activeTab === 'overview'"
          :cpData="cpData"
          :totalTlxSolved="totalTlxSolved"
          :totalCfSolved="totalCfSolved"
          :totalLcSolved="totalLcSolved"
          :totalHrSolved="totalHrSolved"
          :isId="isId"
          :locale="locale"
          @selectPlatform="activeTab = $event" />

        <CpTlxTab
          v-else-if="activeTab === 'tlx'"
          :cpData="cpData"
          :totalTlxSolved="totalTlxSolved"
          :isId="isId" />

        <CpCodeforcesTab
          v-else-if="activeTab === 'codeforces'"
          :cpData="cpData"
          :totalCfSolved="totalCfSolved"
          :isId="isId" />

        <CpLeetcodeTab
          v-else-if="activeTab === 'leetcode'"
          :cpData="cpData"
          :totalLcSolved="totalLcSolved"
          :isId="isId" />

        <CpHackerrankTab
          v-else-if="activeTab === 'hackerrank'"
          :cpData="cpData"
          :totalHrSolved="totalHrSolved"
          :isId="isId" />
      </div>
    </section>

    <!-- Cross-link to Development Activity -->
    <DashboardCrosslink href="/development-activity">
      {{ copy.developmentCrosslink }}
    </DashboardCrosslink>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocale } from '../../composables/useLocale'
import { useCpStats } from '../../composables/useCpStats'
import ActivityHeatmap from '../shared/ActivityHeatmap.vue'
import CpOverviewTab from './CpOverviewTab.vue'
import CpTlxTab from './CpTlxTab.vue'
import CpCodeforcesTab from './CpCodeforcesTab.vue'
import CpLeetcodeTab from './CpLeetcodeTab.vue'
import CpHackerrankTab from './CpHackerrankTab.vue'
import Tabs from '../shared/Tabs.vue'
import StatCard from '../shared/StatCard.vue'
import DashboardCrosslink from '../shared/DashboardCrosslink.vue'
import DashboardTopbar from '../shared/DashboardTopbar.vue'
import { cpHeatmapMetrics } from '../../utils/cp/stats'
import type { CpData } from '../../types/cp.types'

const props = defineProps<{
  initialData?: CpData
}>()

const { isId, locale } = useLocale()

const cpData = ref<CpData | null>(props.initialData || null)
const lastUpdated = ref<string>(props.initialData?.meta?.updatedAt || new Date().toISOString())

const activeTab = ref<'overview' | 'tlx' | 'codeforces' | 'leetcode' | 'hackerrank'>('overview')

const {
  totalSolved,
  totalSubmissions,
  totalTlxSolved,
  totalCfSolved,
  totalLcSolved,
  totalHrSolved,
  primaryLanguage,
  tabs,
  heatmapWeeks,
  heatmapMonths,
  totalSubmissionsInHeatmap,
} = useCpStats(cpData)

const copy = computed(() => {
  const id = isId.value
  return {
    totalSolved: id ? 'Total Soal Selesai' : 'Total Problems Solved',
    totalSolvedHelper: id ? 'Akumulasi dari 4 platform' : 'Aggregated across 4 platforms',
    totalSubmissions: id ? 'Total Submisi' : 'Total Submissions',
    totalSubmissionsHelper:
      id ? 'Riwayat percobaan & evaluasi juri' : 'Judged runs & submission history',
    activePlatforms: id ? 'Platform Aktif' : 'Active Platforms',
    primaryLanguage: id ? 'Bahasa Utama' : 'Primary Language',
    heatmapTitle: id ? 'Kalender Aktivitas Submisi' : 'Submission Activity Heatmap',
    developmentCrosslink:
      id ? 'Jelajahi Aktivitas Development saya →' : 'Explore my Development Activity →',
  }
})

const languageHelper = computed(() =>
  isId.value ?
    `${primaryLanguage.value.formattedCount} submisi ${primaryLanguage.value.name}`
  : `${primaryLanguage.value.formattedCount} ${primaryLanguage.value.name} submissions`
)

const heatmapBadge = computed(
  () =>
    `${totalSubmissionsInHeatmap.value} ${
      isId.value ? 'submisi 12 bulan terakhir' : 'submissions in past 12 months'
    }`
)
</script>

<style scoped>
.cp-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  --text-2xl: 1.75rem;
  --text-lg: 1.125rem;
  --text-base: 0.875rem;
  --text-sm: 0.75rem;
  --text-xs: 0.7rem;
}

/* Stats Grid Container */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }
}

/* Tab Navigation */
.tabs-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 0.5rem;
}
</style>
