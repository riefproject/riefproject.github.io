<template>
  <div class="dev-dashboard">
    <!-- Topbar -->
    <DashboardTopbar :lastUpdated="lastUpdated" :isId="isId" />

    <NavTabs v-model="activeTab" :tabs="tabs" :isId="isId" />

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
      @selectTab="activeTab = $event"
    />

    <!-- TAB: GITHUB -->
    <DevGitHubTab
      v-else-if="activeTab === 'github'"
      :github="github"
      :topLanguage="topLanguage"
      :githubLastYear="githubLastYear"
      :githubHeatmapWeeks="githubHeatmapWeeks"
      :githubHeatmapMonths="githubHeatmapMonths"
      :isId="isId"
    />

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
      :isId="isId"
    />

    <!-- Cross-link to Competitive Programming -->
    <div class="dashboard-crosslink">
      <a href="/competitive-programming" class="crosslink-btn">
        <svg class="crosslink-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        <span class="crosslink-text">
          <span class="crosslink-l1">{{ isId ? 'Jelajahi' : 'Explore my' }}</span>
          <span class="crosslink-l2">{{ isId ? 'Competitive Programming saya →' : 'Competitive Programming →' }}</span>
        </span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocale } from '../../composables/useLocale';
import DevOverviewTab from './DevOverviewTab.vue';
import DevGitHubTab from './DevGitHubTab.vue';
import DevGitLabTab from './DevGitLabTab.vue';
import NavTabs from '../shared/NavTabs.vue';
import DashboardTopbar from '../shared/DashboardTopbar.vue';
import { buildHeatmapDays, buildMonths, toWeeks } from '../../utils/heatmap';
import { formatRelativeTime } from '../../utils/dateFormat';

const props = defineProps<{
  initialData?: any;
}>();

const { isId } = useLocale();

const devData = ref<any>(props.initialData || null);
const lastUpdated = ref<string>(props.initialData?.meta?.updatedAt || new Date().toISOString());
const activeTab = ref<'overview' | 'github' | 'gitlab'>('overview');

// GitHub & GitLab Extracts
const github = computed(() => devData.value?.platforms?.github || devData.value?.github || {});
const gitlab = computed(() => devData.value?.platforms?.gitlab || devData.value?.gitlab || {});

const topLanguage = computed(() => {
  const langs = github.value?.languages;
  return Array.isArray(langs) && langs.length > 0 ? langs[0].name : '';
});

const githubPrMerged = computed(() => Number(github.value?.prStats?.merged || 0));
const gitlabMrMerged = computed(() => Number(gitlab.value?.stats?.mergeRequests?.merged ?? gitlab.value?.stats?.mergeRequestsMerged ?? 0));
const gitlabMrOpened = computed(() => Number(gitlab.value?.stats?.mergeRequests?.opened ?? gitlab.value?.stats?.mergeRequestsOpened ?? 0));
const prMerged = computed(() => githubPrMerged.value + gitlabMrMerged.value);

const gitlabTotalEvents = computed(() => Number(gitlab.value?.stats?.totalEvents || 0));

const totalContributions = computed(() => {
  const ghTotal = Number(github.value?.overview?.totalContributions || 0);
  return ghTotal + gitlabTotalEvents.value;
});

const currentStreak = computed(() => {
  return Number(github.value?.overview?.currentStreak || 0);
});

const lastYearContributions = computed(() => {
  const ghLast = Number(github.value?.overview?.lastYearContributions || 0);
  return ghLast + gitlabTotalEvents.value;
});

const githubLastYear = computed(() => Number(github.value?.overview?.lastYearContributions || 0));

const gitlabLanguages = computed(() => {
  const langs = gitlab.value?.stats?.languages || gitlab.value?.languages;
  return Array.isArray(langs) ? langs.filter((l: any) => l.percentage > 0) : [];
});

const tabs = computed(() => [
  {
    key: 'overview' as const,
    labelEn: 'All Overview',
    labelId: 'Ringkasan Utama',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    count: `${totalContributions.value}+`,
  },
  {
    key: 'github' as const,
    labelEn: 'GitHub',
    labelId: 'GitHub',
    logo: '/img/stacks/github-dark.svg',
    logoLight: '/img/stacks/github-light.svg',
    count: github.value?.overview?.totalContributions || 0,
  },
  {
    key: 'gitlab' as const,
    labelEn: 'GitLab',
    labelId: 'GitLab',
    logo: '/img/stacks/gitlab-dark.svg',
    logoLight: '/img/stacks/gitlab-light.svg',
    count: gitlabTotalEvents.value || 0,
  },
]);

// Heatmap Data Computations
const combinedMap = computed<Record<string, any>>(() => {
  const out: Record<string, any> = {};
  const ghMap = github.value?.overview?.heatmap || {};
  const glMap = gitlab.value?.heatmap || {};
  const keys = new Set([...Object.keys(ghMap), ...Object.keys(glMap)]);
  keys.forEach((k) => {
    const gh = ghMap[k];
    const gl = glMap[k];
    const ghCount = typeof gh === 'object' ? Number(gh?.count || 0) : Number(gh || 0);
    const glCount = typeof gl === 'object' ? Number(gl?.count || 0) : Number(gl || 0);
    out[k] = { count: ghCount + glCount, github: ghCount, gitlab: glCount };
  });
  return out;
});

const buildDevHeatmapDays = (
  map: Record<string, any>,
  extract?: (entry: any) => { count: number; github?: number; gitlab?: number },
) => {
  return buildHeatmapDays(map, (entry) => {
    if (extract) return extract(entry);
    if (typeof entry === 'object' && entry !== null) {
      const count = Number(entry?.count || 0);
      const res: any = { count };
      if (typeof entry.github === 'number') res.github = entry.github;
      if (typeof entry.gitlab === 'number') res.gitlab = entry.gitlab;
      return res;
    }
    return { count: Number(entry || 0) };
  });
};

const heatmapDays = computed(() => buildDevHeatmapDays(combinedMap.value));
const githubHeatmapDays = computed(() =>
  buildDevHeatmapDays(github.value?.overview?.heatmap || {}, (entry) => {
    const count = typeof entry === 'object' ? Number(entry?.count || 0) : Number(entry || 0);
    return { count, github: count };
  })
);
const gitlabHeatmapDays = computed(() =>
  buildDevHeatmapDays(gitlab.value?.heatmap || {}, (entry) => {
    const count = typeof entry === 'object' ? Number(entry?.count || 0) : Number(entry || 0);
    return { count, gitlab: count };
  })
);

const heatmapWeeks = computed(() => toWeeks(heatmapDays.value));
const githubHeatmapWeeks = computed(() => toWeeks(githubHeatmapDays.value));
const gitlabHeatmapWeeks = computed(() => toWeeks(gitlabHeatmapDays.value));

const heatmapMonths = computed(() => buildMonths(heatmapWeeks.value));
const githubHeatmapMonths = computed(() => buildMonths(githubHeatmapWeeks.value));
const gitlabHeatmapMonths = computed(() => buildMonths(gitlabHeatmapWeeks.value));
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

/* Cross-link to other dashboard */
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

.crosslink-text {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
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
    padding: 0.45rem 0.75rem !important;
    font-size: 0.78rem !important;
    width: auto !important;
    flex: 0 1 auto !important;
    justify-content: center !important;
    gap: 0.35rem !important;
  }

  .tab-btn:first-child { flex: 1 1 100% !important; }
  .tab-btn:not(:first-child) { flex: 1 1 calc(50% - 0.25rem) !important; }

  .crosslink-btn { flex-wrap: wrap; justify-content: center; text-align: center; }
  .crosslink-text { flex-direction: column; align-items: center; line-height: 1.4; }

  .tab-btn .tab-badge { padding: 0.1rem 0.35rem !important; font-size: 0.68rem !important; }
  .tab-logo-img { width: 1rem !important; height: 1rem !important; }

  :root.light .tab-btn {
    background: #ffffff !important;
    border-color: #d1d5db !important;
  }

  :root.light .tab-btn.active {
    background: #f3f4f6 !important;
    border-color: #cbd5e1 !important;
    color: #111827 !important;
  }
}
</style>
