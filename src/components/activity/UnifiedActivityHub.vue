<template>
  <div class="activity-hub">
    <!-- Filter Tabs (styled identical to Competitive Programming tabs) -->
    <div class="tabs-nav" role="tablist" :aria-label="isId ? 'Filter aktivitas' : 'Activity filters'">
      <button
        v-for="tab in filterTabs"
        :key="tab.key"
        type="button"
        role="tab"
        :aria-selected="heatmapFilter === tab.key"
        class="tab-btn"
        :class="{ active: heatmapFilter === tab.key }"
        @click="heatmapFilter = tab.key"
      >
        <span class="tab-icon" v-html="tab.icon"></span>
        <span class="tab-name">{{ isId ? tab.labelId : tab.labelEn }}</span>
        <span class="tab-badge" v-if="tab.count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Clean Activity Heatmap (identical to /competitive-programming style) -->
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="heatmapTitle"
      :countBadge="heatmapCountBadge"
      :isId="isId"
      :getMetrics="resolveUnifiedMetrics"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { lang } from '../../stores/uiStore.js';
import ActivityHeatmap from '../shared/ActivityHeatmap.vue';
import {
  buildHeatmapDays,
  toWeeks,
  buildMonths,
  type HeatmapTooltipMetric,
} from '../../utils/activityDateUtils';

const props = defineProps<{
  initialDevData?: any;
  initialCpData?: any;
}>();

const $lang = useStore(lang);
const isId = computed(() => $lang.value === 'id');

const heatmapFilter = ref<'all' | 'dev' | 'cp'>('all');

// Dev metrics
const devPlatforms = computed(() => props.initialDevData?.platforms || {});
const githubTotal = computed(() => devPlatforms.value.github?.overview?.totalContributions || 725);
const gitlabTotal = computed(() => devPlatforms.value.gitlab?.stats?.totalEvents || 144);
const devTotalContributions = computed(() => githubTotal.value + gitlabTotal.value);

// CP metrics
const cpOverview = computed(() => props.initialCpData?.overview || {});
const totalCpSolved = computed(() => cpOverview.value.totalSolved || 641);
const totalCpSubmissions = computed(() => cpOverview.value.totalSubmissions || 1200);

// Total aggregate
const totalAll = computed(() => devTotalContributions.value + totalCpSolved.value);

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
]);

// Heatmap Title & Count Badge
const heatmapTitle = computed(() => {
  if (heatmapFilter.value === 'dev') {
    return isId.value ? 'Kalender Aktivitas Development' : 'Development Activity Calendar';
  }
  if (heatmapFilter.value === 'cp') {
    return isId.value ? 'Kalender Aktivitas Submisi CP' : 'CP Submission Activity Calendar';
  }
  return isId.value ? 'Kalender Aktivitas' : 'Activity Calendar';
});

const heatmapCountBadge = computed(() => {
  return `${activeDaysCount.value} ${isId.value ? 'hari aktif' : 'active days'}`;
});

// Unified Heatmap construction
const unifiedMap = computed<Record<string, any>>(() => {
  const ghMap = props.initialDevData?.platforms?.github?.overview?.heatmap || {};
  const glMap = props.initialDevData?.platforms?.gitlab?.heatmap || {};
  const cpMap = props.initialCpData?.overview?.heatmap || {};

  const allKeys = new Set([...Object.keys(ghMap), ...Object.keys(glMap), ...Object.keys(cpMap)]);
  const out: Record<string, any> = {};

  allKeys.forEach((dateStr) => {
    const ghEntry = ghMap[dateStr];
    const glEntry = glMap[dateStr];
    const cpEntry = cpMap[dateStr];

    const ghCount = typeof ghEntry === 'object' ? Number(ghEntry?.count || 0) : Number(ghEntry || 0);
    const glCount = typeof glEntry === 'object' ? Number(glEntry?.count || 0) : Number(glEntry || 0);
    const devTotal = ghCount + glCount;

    const cpTries = typeof cpEntry === 'object' ? Number(cpEntry?.tries || 0) : (typeof cpEntry === 'number' ? cpEntry : 0);
    const cpAc = typeof cpEntry === 'object' ? Number(cpEntry?.ac || 0) : 0;

    let targetCount = 0;
    if (heatmapFilter.value === 'all') {
      targetCount = devTotal + cpTries;
    } else if (heatmapFilter.value === 'dev') {
      targetCount = devTotal;
    } else {
      targetCount = cpTries;
    }

    out[dateStr] = {
      count: targetCount,
      github: heatmapFilter.value !== 'cp' ? ghCount : 0,
      gitlab: heatmapFilter.value !== 'cp' ? glCount : 0,
      ac: heatmapFilter.value !== 'dev' ? cpAc : 0,
      tries: heatmapFilter.value !== 'dev' ? cpTries : 0,
    };
  });

  return out;
});

const heatmapDays = computed(() =>
  buildHeatmapDays(unifiedMap.value, (entry) => ({
    count: entry?.count || 0,
    github: entry?.github,
    gitlab: entry?.gitlab,
    ac: entry?.ac,
    tries: entry?.tries,
  }))
);

const heatmapWeeks = computed(() => toWeeks(heatmapDays.value));
const heatmapMonths = computed(() => buildMonths(heatmapWeeks.value));
const activeDaysCount = computed(() => heatmapDays.value.filter((d) => d.count > 0).length);

const resolveUnifiedMetrics = (day: any, isIdState: boolean): HeatmapTooltipMetric[] => {
  const metrics: HeatmapTooltipMetric[] = [];
  if (day.github && day.github > 0) {
    metrics.push({
      value: day.github,
      label: isIdState ? 'GitHub' : 'GitHub',
      logo: '/img/stacks/github-dark.svg',
      logoLight: '/img/stacks/github-light.svg',
      color: 'slate',
    });
  }
  if (day.gitlab && day.gitlab > 0) {
    metrics.push({
      value: day.gitlab,
      label: isIdState ? 'GitLab' : 'GitLab',
      logo: '/img/stacks/gitlab-dark.svg',
      logoLight: '/img/stacks/gitlab-light.svg',
      color: 'orange',
    });
  }
  if (day.ac && day.ac > 0) {
    metrics.push({
      value: day.ac,
      label: 'AC',
      color: 'emerald',
    });
  }
  if (day.tries && day.tries > 0) {
    metrics.push({
      value: day.tries,
      label: isIdState ? 'Tries' : 'Tries',
      color: 'amber',
    });
  }
  if (metrics.length === 0) {
    return [
      {
        value: isIdState ? 'Tidak ada aktivitas' : 'No activity',
        color: 'slate',
      },
    ];
  }
  return metrics;
};
</script>

<style scoped>
.activity-hub {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
}

/* Tab Navigation styled identical to Competitive Programming */
.tabs-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs-nav::-webkit-scrollbar {
  display: none;
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

.tab-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tab-badge {
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  color: var(--muted);
  border: 1px solid var(--border);
}

.tab-btn.active .tab-badge {
  background: var(--border);
  color: var(--text);
}
</style>
