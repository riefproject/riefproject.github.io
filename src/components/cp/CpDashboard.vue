<template>
  <div class="cp-dashboard">
    <!-- Header / Live Bar -->
    <DashboardTopbar :lastUpdated="lastUpdated" :isId="isId" />

    <!-- Global Hero Stats -->
    <div class="stats-grid">
      <StatCard
        :label="isId ? 'Total Soal Selesai' : 'Total Problems Solved'"
        :value="totalSolved"
        unit="+"
        variant="emerald"
        :helper="isId ? 'Akumulasi dari 4 platform' : 'Aggregated across 4 platforms'" />

      <StatCard
        :label="isId ? 'Total Submisi' : 'Total Submissions'"
        :value="totalSubmissions"
        unit="+"
        variant="sky"
        :helper="isId ? 'Riwayat percobaan & evaluasi juri' : 'Judged runs & submission history'" />

      <StatCard
        :label="isId ? 'Platform Aktif' : 'Active Platforms'"
        :value="4"
        variant="amber"
        helper="TLX · Codeforces · LeetCode · HackerRank" />

      <StatCard
        :label="isId ? 'Bahasa Utama' : 'Primary Language'"
        :value="primaryLanguage.name"
        variant="purple"
        :helper="`${primaryLanguage.formattedCount} ${isId ? 'submisi ' + primaryLanguage.name : primaryLanguage.name + ' submissions'}`" />
    </div>

    <!-- Submission Activity Heatmap Component -->
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="isId ? 'Kalender Aktivitas Submisi' : 'Submission Activity Heatmap'"
      :countBadge="`${totalSubmissionsInHeatmap} ${isId ? 'submisi 12 bulan terakhir' : 'submissions in past 12 months'}`"
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
          @selectPlatform="activeTab = $event as any" />

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
    <div class="dashboard-crosslink">
      <a href="/development-activity" class="crosslink-btn">
        <ArrowUpRight class="crosslink-ico" :size="16" />
        <span>{{
          isId ? 'Jelajahi Aktivitas Development saya →' : 'Explore my Development Activity →'
        }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '../../composables/useLocale'
import { useCpStats } from '../../composables/useCpStats'
import ActivityHeatmap from '../shared/ActivityHeatmap.vue'
import CpOverviewTab from './CpOverviewTab.vue'
import CpTlxTab from './CpTlxTab.vue'
import CpCodeforcesTab from './CpCodeforcesTab.vue'
import CpLeetcodeTab from './CpLeetcodeTab.vue'
import CpHackerrankTab from './CpHackerrankTab.vue'
import Tabs from '../shared/Tabs.vue'
import ArrowUpRight from '../shared/ArrowUpRight.vue'
import StatCard from '../shared/StatCard.vue'
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

.dashboard-crosslink {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  margin-top: 0.5rem;
}

.crosslink-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--link);
  text-decoration: none;
  transition: all 0.15s;
}

.crosslink-btn:hover {
  text-decoration: underline;
  transform: translateX(2px);
}

.crosslink-ico {
  width: 1rem;
  height: 1rem;
  opacity: 0.8;
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}
</style>
