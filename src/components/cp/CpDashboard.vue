<template>
  <div class="cp-dashboard">
    <!-- Header / Live Bar -->
    <div class="dashboard-topbar">
      <div class="live-indicator">
        <span class="pulse-dot"></span>
        <span class="live-text">
          {{ isId ? 'Terakhir Disinkronkan' : 'Last Synced' }}
        </span>
        <span class="updated-time" v-if="lastUpdated">
          • {{ formatRelativeTime(lastUpdated, isId) }}
        </span>
      </div>
    </div>

    <!-- Global Hero Stats -->
    <div class="stats-grid">
      <!-- Card 1: Total Problems Solved -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Total Soal Selesai' : 'Total Problems Solved' }}</span>
        <div class="stat-value val-emerald">
          {{ totalSolved }}<span class="stat-unit">+</span>
        </div>
        <span class="stat-helper">{{ isId ? 'Akumulasi dari 4 platform' : 'Aggregated across 4 platforms' }}</span>
      </div>

      <!-- Card 2: Total Submissions -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Total Submisi' : 'Total Submissions' }}</span>
        <div class="stat-value val-sky">
          {{ totalSubmissions }}<span class="stat-unit">+</span>
        </div>
        <span class="stat-helper">{{ isId ? 'Riwayat percobaan & evaluasi juri' : 'Judged runs & submission history' }}</span>
      </div>

      <!-- Card 3: Active Platforms -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Platform Aktif' : 'Active Platforms' }}</span>
        <div class="stat-value val-amber">4</div>
        <span class="stat-helper">TLX · Codeforces · LeetCode · HackerRank</span>
      </div>

      <!-- Card 4: Primary Language -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Bahasa Utama' : 'Primary Language' }}</span>
        <div class="stat-value val-purple">{{ primaryLanguage.name }}</div>
        <span class="stat-helper">{{ primaryLanguage.formattedCount }} {{ isId ? `submisi ${primaryLanguage.name}` : `${primaryLanguage.name} submissions` }}</span>
      </div>
    </div>

    <!-- Platform Quick Links Bar with Real Logos -->
    <div class="platform-handles-bar">
      <a
        v-for="p in platformPills"
        :key="p.key"
        :href="p.url"
        target="_blank"
        rel="noopener noreferrer"
        class="platform-handle-chip"
      >
        <img :src="p.logo" :alt="p.name" class="chip-logo-img" />
        <span class="chip-platform">{{ p.name }}:</span>
        <span class="chip-handle">@{{ p.handle }}</span>
        <svg class="w-3.5 h-3.5 opacity-60 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
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
      <div class="tabs-nav" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.key"
          @click="activeTab = tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
        >
          <img v-if="tab.logo" :src="tab.logo" :alt="tab.key" class="tab-logo-img" />
          <span v-else-if="tab.icon" class="tab-icon" v-html="tab.icon"></span>
          <span class="tab-name">{{ isId ? tab.labelId : tab.labelEn }}</span>
          <span v-if="tab.count" class="tab-badge">{{ tab.count }}</span>
        </button>
      </div>

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
import { useStore } from '@nanostores/vue';
import { lang } from '../../stores/uiStore.js';
import CpHeatmap from './CpHeatmap.vue';
import CpOverviewTab from './CpOverviewTab.vue';
import CpTlxTab from './CpTlxTab.vue';
import CpCodeforcesTab from './CpCodeforcesTab.vue';
import CpLeetcodeTab from './CpLeetcodeTab.vue';
import CpHackerrankTab from './CpHackerrankTab.vue';
import type { HeatmapDay } from './cpUtils';
import { formatRelativeTime, cleanLanguage } from './cpUtils';

const props = defineProps<{
  initialData?: any;
}>();

const $lang = useStore(lang);
const isId = computed(() => $lang.value === 'id');
const locale = computed(() => (isId.value ? 'id' : 'en'));

const cpData = ref<any>(props.initialData || null);
const lastUpdated = ref<string>(props.initialData?.meta?.updatedAt || new Date().toISOString());

const activeTab = ref<'overview' | 'tlx' | 'codeforces' | 'leetcode' | 'hackerrank'>('overview');

// Solved Counts
const totalSolved = computed(() => cpData.value?.overview?.totalSolved || 640);
const totalSubmissions = computed(() => cpData.value?.overview?.totalSubmissions || 1528);
const totalTlxSolved = computed(() => cpData.value?.platforms?.tlx?.totalSolved || 371);
const totalCfSolved = computed(() => cpData.value?.platforms?.codeforces?.totalSolved || 50);
const totalLcSolved = computed(() => cpData.value?.platforms?.leetcode?.totalSolved || 59);
const totalHrSolved = computed(() => cpData.value?.platforms?.hackerrank?.totalSolved || 138);

const primaryLanguage = computed(() => {
  const overviewTop = cpData.value?.overview?.topLanguage;
  if (overviewTop?.name && overviewTop?.count) {
    const name = overviewTop.name;
    const count = Number(overviewTop.count);
    const formattedCount = count >= 1000 ? `${Math.floor(count / 1000)}K+` : `${count}+`;
    return { name, count, formattedCount };
  }

  const counts: Record<string, number> = {};

  // TLX
  const tlxLangs = cpData.value?.platforms?.tlx?.languages || {};
  Object.entries(tlxLangs).forEach(([l, cnt]) => {
    const cleaned = cleanLanguage(l);
    counts[cleaned] = (counts[cleaned] || 0) + Number(cnt || 0);
  });

  // Codeforces
  const cfLangs = cpData.value?.platforms?.codeforces?.languages;
  if (cfLangs && Object.keys(cfLangs).length > 0) {
    Object.entries(cfLangs).forEach(([l, cnt]) => {
      const cleaned = cleanLanguage(l);
      counts[cleaned] = (counts[cleaned] || 0) + Number(cnt || 0);
    });
  } else {
    const cfSubs = Number(cpData.value?.platforms?.codeforces?.totalSubmissions) || 0;
    counts['C++20'] = (counts['C++20'] || 0) + cfSubs;
  }

  // LeetCode
  (cpData.value?.platforms?.leetcode?.recentSolved || []).forEach((s: any) => {
    if (s.language) {
      const cleaned = cleanLanguage(s.language);
      counts[cleaned] = (counts[cleaned] || 0) + 1;
    }
  });

  // HackerRank
  (cpData.value?.platforms?.hackerrank?.recentSolved || []).forEach((s: any) => {
    if (s.language) {
      const cleaned = cleanLanguage(s.language);
      counts[cleaned] = (counts[cleaned] || 0) + 1;
    }
  });

  let maxLang = 'C++20';
  let maxCount = 0;
  Object.entries(counts).forEach(([l, cnt]) => {
    if (cnt > maxCount) {
      maxCount = cnt;
      maxLang = l;
    }
  });

  if (maxCount <= 0) {
    maxCount = 1137;
    maxLang = 'C++20';
  }

  const formattedCount = maxCount >= 1000 ? `${Math.floor(maxCount / 1000)}K+` : `${maxCount}+`;
  return {
    name: maxLang,
    count: maxCount,
    formattedCount,
  };
});

const platformPills = computed(() => [
  { key: 'tlx', name: 'TLX', handle: cpData.value?.platforms?.tlx?.handle || 'aycaaa', logo: '/img/tlx/tlx.webp', url: 'https://tlx.toki.id/profiles/aycaaa' },
  { key: 'codeforces', name: 'Codeforces', handle: cpData.value?.platforms?.codeforces?.handle || 'feeera', logo: '/img/codeforces/codeforces.webp', url: 'https://codeforces.com/profile/feeera' },
  { key: 'leetcode', name: 'LeetCode', handle: cpData.value?.platforms?.leetcode?.handle || 'fsaree', logo: '/img/leetcode/leetcode.webp', url: 'https://leetcode.com/u/fsaree' },
  { key: 'hackerrank', name: 'HackerRank', handle: cpData.value?.platforms?.hackerrank?.handle || 'areee', logo: '/img/hackerrank/HackerRank.webp', url: 'https://www.hackerrank.com/profile/areee' },
]);

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
const heatmapData = computed(() => {
  const map = cpData.value?.overview?.heatmap || {};
  const today = new Date();
  const days: HeatmapDay[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = map[dateStr];

    let tries = 0;
    let ac = 0;
    if (typeof entry === 'number') {
      tries = entry;
    } else if (entry && typeof entry === 'object') {
      tries = Number(entry.tries || entry.count || 0);
      ac = Number(entry.ac || 0);
    }

    let level = 0;
    if (tries > 0 && tries <= 2) level = 1;
    else if (tries > 2 && tries <= 6) level = 2;
    else if (tries > 6 && tries <= 15) level = 3;
    else if (tries > 15) level = 4;

    days.push({ date: dateStr, count: tries, tries, ac, level });
  }
  return days;
});

const heatmapWeeks = computed(() => {
  const allDays = heatmapData.value;
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }
  return weeks;
});

const totalSubmissionsInHeatmap = computed(() => {
  return heatmapData.value.reduce((acc, d) => acc + d.tries, 0);
});

const heatmapMonths = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const res: { name: string; percent: number }[] = [];
  const weeks = heatmapWeeks.value;
  const totalWeeks = weeks.length;

  weeks.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date);
      if (d.getDate() <= 7) {
        res.push({
          name: months[d.getMonth()],
          percent: Math.round((idx / totalWeeks) * 100),
        });
      }
    }
  });
  return res;
});
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

/* Topbar */
.dashboard-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--muted);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
  animation: pulse-glow 2s infinite ease-in-out;
}

.live-text {
  font-weight: 600;
  color: var(--text);
}

/* Stats Grid & Clean KPI Cards */
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

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 0;
}

.stat-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  display: flex;
  align-items: baseline;
}

.val-emerald { color: #34d399; }
.val-sky { color: #38bdf8; }
.val-amber { color: #fbbf24; }
.val-purple { color: #c084fc; }

.stat-unit {
  font-size: var(--text-lg);
  font-weight: 600;
  opacity: 0.75;
  margin-left: 2px;
}

.stat-helper {
  font-size: var(--text-xs);
  color: var(--muted);
  line-height: 1.3;
  margin-top: 0.2rem;
}

/* Light Mode for Clean KPI Cards */
:root.light .stat-card {
  background: #ffffff;
  border-color: var(--border);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

:root.light .stat-card:hover {
  border-color: #cbd5e1;
}

:root.light .val-emerald { color: #047857; }
:root.light .val-sky { color: #0284c7; }
:root.light .val-amber { color: #b45309; }
:root.light .val-purple { color: #6b21a8; }

:root.light .stat-label {
  color: #4b5563;
  font-weight: 700;
}

:root.light .stat-helper {
  color: #6b7280;
}

/* Platform Handles Quick Bar */
.platform-handles-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
}

.platform-handle-chip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0.85rem;
  row-gap: 0.15rem;
  column-gap: 0.35rem;
  text-align: center;
  border-radius: 0.75rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text);
  text-decoration: none;
  transition: all 0.2s;
  box-sizing: border-box;
  width: 100%;
}

.platform-handle-chip:hover {
  background: var(--bg-elevated);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.platform-handle-chip svg {
  display: none;
}

.chip-logo-img {
  width: 1.1rem;
  height: 1.1rem;
  object-fit: contain;
  border-radius: 2px;
}

.chip-platform {
  font-weight: 600;
  color: var(--muted);
}

.chip-handle {
  flex-basis: 100%;
  text-align: center;
  font-weight: 700;
  color: var(--text);
  font-size: 0.75rem;
}

/* Tab Navigation */
.tabs-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.tabs-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.25rem;
  overflow-x: auto;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--text);
  background: var(--bg-soft);
}

.tab-btn.active {
  color: var(--text);
  background: var(--bg-soft);
  border-color: var(--border);
}

:root.light .tab-btn {
  color: #4b5563;
}
:root.light .tab-btn:hover {
  color: #111827;
  background: #f3f4f6;
}
:root.light .tab-btn.active {
  color: #111827;
  background: #f3f4f6;
  border-color: #cbd5e1;
}

.tab-logo-img {
  width: 1.15rem;
  height: 1.15rem;
  object-fit: contain;
}

.tab-badge {
  font-size: var(--text-xs);
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
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
    border-radius: 0.5rem !important;
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
