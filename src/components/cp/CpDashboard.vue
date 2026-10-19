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
        :helper="isId ? 'Akumulasi dari 4 platform' : 'Aggregated across 4 platforms'"
      />

      <StatCard
        :label="isId ? 'Total Submisi' : 'Total Submissions'"
        :value="totalSubmissions"
        unit="+"
        variant="sky"
        :helper="isId ? 'Riwayat percobaan & evaluasi juri' : 'Judged runs & submission history'"
      />

      <StatCard
        :label="isId ? 'Platform Aktif' : 'Active Platforms'"
        :value="4"
        variant="amber"
        helper="TLX · Codeforces · LeetCode · HackerRank"
      />

      <StatCard
        :label="isId ? 'Bahasa Utama' : 'Primary Language'"
        :value="primaryLanguage.name"
        variant="purple"
        :helper="`${primaryLanguage.formattedCount} ${isId ? 'submisi ' + primaryLanguage.name : primaryLanguage.name + ' submissions'}`"
      />
    </div>



    <!-- Submission Activity Heatmap Component -->
    <CpHeatmap
      :heatmapWeeks="heatmapWeeks"
      :heatmapMonths="heatmapMonths"
      :totalSubmissionsInHeatmap="totalSubmissionsInHeatmap"
      :isId="isId"
    />

    <!-- Tab System -->
    <section class="tabs-section">
      <NavTabs v-model="activeTab" :tabs="tabs" :isId="isId" />

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
          @selectPlatform="activeTab = $event as any"
        />

        <CpTlxTab
          v-else-if="activeTab === 'tlx'"
          :cpData="cpData"
          :totalTlxSolved="totalTlxSolved"
          :isId="isId"
        />

        <CpCodeforcesTab
          v-else-if="activeTab === 'codeforces'"
          :cpData="cpData"
          :totalCfSolved="totalCfSolved"
          :isId="isId"
        />

        <CpLeetcodeTab
          v-else-if="activeTab === 'leetcode'"
          :cpData="cpData"
          :totalLcSolved="totalLcSolved"
          :isId="isId"
        />

        <CpHackerrankTab
          v-else-if="activeTab === 'hackerrank'"
          :cpData="cpData"
          :totalHrSolved="totalHrSolved"
          :isId="isId"
        />
      </div>
    </section>

    <!-- Cross-link to Development Activity -->
    <div class="dashboard-crosslink">
      <a href="/development-activity" class="crosslink-btn">
        <svg class="crosslink-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        <span>{{ isId ? 'Jelajahi Aktivitas Development saya →' : 'Explore my Development Activity →' }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocale } from '../../composables/useLocale';
import CpHeatmap from './CpHeatmap.vue';
import CpOverviewTab from './CpOverviewTab.vue';
import CpTlxTab from './CpTlxTab.vue';
import CpCodeforcesTab from './CpCodeforcesTab.vue';
import CpLeetcodeTab from './CpLeetcodeTab.vue';
import CpHackerrankTab from './CpHackerrankTab.vue';
import NavTabs from '../shared/NavTabs.vue';
import StatCard from '../shared/StatCard.vue';
import DashboardTopbar from '../shared/DashboardTopbar.vue';
import { buildCpHeatmap, getPrimaryLanguage } from '../../utils/cp/stats';
import { buildMonths, toWeeks } from '../../utils/heatmap';

const props = defineProps<{
  initialData?: any;
}>();

const { isId, locale } = useLocale();

const cpData = ref<any>(props.initialData || null);
const lastUpdated = ref<string>(props.initialData?.meta?.updatedAt || new Date().toISOString());

const activeTab = ref<'overview' | 'tlx' | 'codeforces' | 'leetcode' | 'hackerrank'>('overview');

// Solved Counts
const totalSolved = computed(() => cpData.value?.overview?.totalSolved || 754);
const totalSubmissions = computed(() => cpData.value?.overview?.totalSubmissions || 1528);
const totalTlxSolved = computed(() => cpData.value?.platforms?.tlx?.totalSolved || 437);
const totalCfSolved = computed(() => cpData.value?.platforms?.codeforces?.totalSolved || 68);
const totalLcSolved = computed(() => cpData.value?.platforms?.leetcode?.totalSolved || 102);
const totalHrSolved = computed(() => cpData.value?.platforms?.hackerrank?.totalSolved || 147);

const primaryLanguage = computed(() => getPrimaryLanguage(cpData.value));



const tabs = computed(() => [
  {
    key: 'overview',
    labelEn: 'All Overview',
    labelId: 'Ringkasan Utama',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    count: `${totalSolved.value}+`,
  },
  {
    key: 'tlx',
    labelEn: 'TLX (TOKI)',
    labelId: 'TLX (TOKI)',
    logo: '/img/tlx/tlx.webp',
    count: totalTlxSolved.value,
  },
  {
    key: 'codeforces',
    labelEn: 'Codeforces',
    labelId: 'Codeforces',
    logo: '/img/codeforces/codeforces.webp',
    count: totalCfSolved.value,
  },
  {
    key: 'leetcode',
    labelEn: 'LeetCode',
    labelId: 'LeetCode',
    logo: '/img/leetcode/leetcode.webp',
    count: totalLcSolved.value,
  },
  {
    key: 'hackerrank',
    labelEn: 'HackerRank',
    labelId: 'HackerRank',
    logo: '/img/hackerrank/HackerRank.webp',
    count: `${totalHrSolved.value}+`,
  },
]);

// Heatmap Calculation
const heatmapData = computed(() =>
  buildCpHeatmap(cpData.value?.overview?.heatmap || {}),
);

const heatmapWeeks = computed(() => toWeeks(heatmapData.value));

const totalSubmissionsInHeatmap = computed(() => {
  return heatmapData.value.reduce((acc, d) => acc + d.tries, 0);
});

const heatmapMonths = computed(() => buildMonths(heatmapWeeks.value));
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
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}

@media (max-width: 640px) {
  .tabs-nav {
    flex-wrap: wrap !important;
    justify-content: center !important;
    overflow-x: visible !important;
    border-bottom: none !important;
    gap: 0.5rem !important;
  }
  
  .tab-btn {
    border: 1px solid var(--border) !important;
    border-radius: var(--radius-md) !important;
    padding: 0.5rem 0.85rem !important;
    font-size: 0.8rem !important;
    width: auto !important;
    flex-grow: 1 !important;
    justify-content: center !important;
  }

  :root.light .tab-btn {
    background: #ffffff !important;
    border-color: #d1d5db !important;
  }

  :root.light .tab-btn.active {
    background: #f3f4f6 !important;
    border-color: #cbd5e1 !important;
    color: #111827 !important;
  }

  .platform-handles-bar {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }

  .platform-handle-chip {
    padding: 0.6rem 0.4rem !important;
  }
}

@media (max-width: 480px) {
  .dashboard-topbar {
    flex-direction: column !important;
    gap: 0.75rem !important;
    align-items: stretch !important;
    text-align: center !important;
  }

  .live-indicator {
    justify-content: center !important;
  }
}
</style>
