<template>
  <div class="dev-dashboard">
    <!-- Topbar -->
    <div class="dashboard-topbar">
      <div class="live-indicator">
        <span class="pulse-dot"></span>
        <span class="live-text">{{ isId ? 'Sinkronisasi Live' : 'Live Synced' }}</span>
        <span class="updated-time" v-if="lastUpdated">• {{ formatRelativeTime(lastUpdated) }}</span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-nav" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span v-if="tab.logo" class="tab-logo">
          <img :src="tab.logo" :alt="tab.key" class="tab-logo-img logo-variant-dark" />
          <img v-if="tab.logoLight" :src="tab.logoLight" :alt="tab.key" class="tab-logo-img logo-variant-light" />
        </span>
        <span v-else class="tab-icon" v-html="tab.icon"></span>
        <span class="tab-name">{{ isId ? tab.labelId : tab.labelEn }}</span>
        <span v-if="tab.count" class="tab-badge">{{ tab.count }}</span>
      </button>
    </div>

    <!-- TAB: OVERVIEW -->
    <div v-if="activeTab === 'overview'" class="tab-content">
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Total Kontribusi' : 'Total Contributions' }}</span>
          <div class="stat-value val-emerald">{{ totalContributions }}<span class="stat-unit">+</span></div>
          <span class="stat-helper">{{ isId ? 'Gabungan GitHub & GitLab' : 'Combined GitHub + GitLab' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Streak Saat Ini' : 'Current Streak' }}</span>
          <div class="stat-value val-sky">{{ currentStreak }}<span class="stat-unit"> {{ isId ? 'hari' : 'days' }}</span></div>
          <span class="stat-helper">{{ isId ? 'Hari berturut-turut aktif' : 'Consecutive active days' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'PR / MR Selesai' : 'PR / MR Merged' }}</span>
          <div class="stat-value val-purple">{{ prMerged }}</div>
          <span class="stat-helper">GitHub {{ githubPrMerged }} · GitLab {{ gitlabMrMerged }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Bahasa Utama' : 'Top Language' }}</span>
          <div class="stat-value val-amber">{{ topLanguage || '—' }}</div>
          <span class="stat-helper">{{ isId ? 'Berdasarkan bytes repo publik' : 'By public repo bytes' }}</span>
        </div>
      </div>

      <!-- Combined Heatmap -->
      <section class="heatmap-section">
        <div class="section-header">
          <div class="title-with-badge">
            <h3>{{ isId ? 'Aktivitas Pengembangan 12 Bulan' : 'Development Activity (12 months)' }}</h3>
            <span class="activity-count-badge">{{ lastYearContributions }} {{ isId ? 'kontribusi' : 'contributions' }}</span>
          </div>
          <div class="heatmap-legend">
            <span class="legend-label">{{ isId ? 'Sedikit' : 'Less' }}</span>
            <span class="heat-box lvl-0"></span>
            <span class="heat-box lvl-1"></span>
            <span class="heat-box lvl-2"></span>
            <span class="heat-box lvl-3"></span>
            <span class="heat-box lvl-4"></span>
            <span class="legend-label">{{ isId ? 'Banyak' : 'More' }}</span>
          </div>
        </div>
        <div class="heatmap-container">
          <div class="heatmap-scroll" ref="heatmapScrollEl">
            <div class="heatmap-grid-wrapper">
              <div class="heatmap-grid">
                <div v-for="(week, wIdx) in heatmapWeeks" :key="wIdx" class="heatmap-col">
                  <div
                    v-for="day in week"
                    :key="day.date"
                    class="heatmap-cell"
                    :class="`lvl-${day.level}`"
                    @mouseenter="showTooltip($event, day)"
                    @mouseleave="hideTooltip"
                  ></div>
                </div>
              </div>
              <div class="heatmap-months">
                <span v-for="m in heatmapMonths" :key="m.name" :style="{ left: `${m.percent}%` }" class="month-label">{{ m.name }}</span>
              </div>
            </div>
            <div class="heatmap-swipe-hint">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
              <span>{{ isId ? 'Geser untuk melihat seluruh kalender' : 'Swipe to see the full calendar' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Platform Cards -->
      <div class="platform-cards-grid">
        <div class="platform-detail-card" @click="activeTab = 'github'">
          <div class="pcard-header">
            <div class="pcard-title-group">
              <div class="pcard-logo-box">
                <img src="/img/stacks/github-dark.svg" alt="GitHub" class="pcard-img-logo logo-variant-dark" />
                <img src="/img/stacks/github-light.svg" alt="GitHub" class="pcard-img-logo logo-variant-light" />
              </div>
              <div class="pcard-title-text">
                <h4 class="pcard-name">GitHub</h4>
                <span class="pcard-handle">@{{ github?.user?.login || 'riefproject' }}</span>
              </div>
            </div>
            <div class="pcard-solved-badge">
              <span class="pcard-solved-num">{{ github?.overview?.totalContributions || 0 }}</span>
              <span class="pcard-solved-label">{{ isId ? 'kontribusi' : 'contributions' }}</span>
            </div>
          </div>
          <div class="pcard-body">
            <div class="pcard-meta-row">
              <span>{{ isId ? 'Streak Terpanjang' : 'Longest Streak' }}:</span>
              <strong>{{ github?.overview?.longestStreak || 0 }} {{ isId ? 'hari' : 'days' }}</strong>
            </div>
            <div class="pcard-meta-row">
              <span>PR Merged:</span>
              <strong>{{ githubPrMerged }} / {{ github?.prStats?.total || 0 }}</strong>
            </div>
          </div>
          <div class="pcard-footer">
            <span class="view-details-link">{{ isId ? 'Lihat Detail GitHub →' : 'View GitHub Details →' }}</span>
          </div>
        </div>

        <div class="platform-detail-card" @click="activeTab = 'gitlab'">
          <div class="pcard-header">
            <div class="pcard-title-group">
              <div class="pcard-logo-box">
                <img src="/img/stacks/gitlab-dark.svg" alt="GitLab" class="pcard-img-logo logo-variant-dark" />
                <img src="/img/stacks/gitlab-light.svg" alt="GitLab" class="pcard-img-logo logo-variant-light" />
              </div>
              <div class="pcard-title-text">
                <h4 class="pcard-name">GitLab</h4>
                <span class="pcard-handle">{{ isId ? 'Workspace perusahaan' : 'Company workspace' }}</span>
              </div>
            </div>
            <div class="pcard-solved-badge">
              <span class="pcard-solved-num">{{ gitlabTotalEvents }}</span>
              <span class="pcard-solved-label">{{ isId ? 'event' : 'events' }}</span>
            </div>
          </div>
          <div class="pcard-body">
            <div class="pcard-meta-row">
              <span>{{ isId ? 'Hari Aktif' : 'Active Days' }}:</span>
              <strong>{{ gitlab?.stats?.daysActive || 0 }}</strong>
            </div>
            <div class="pcard-meta-row">
              <span>MR Merged:</span>
              <strong>{{ gitlabMrMerged }}</strong>
            </div>
          </div>
          <div class="pcard-footer">
            <span class="view-details-link">{{ isId ? 'Lihat Detail GitLab →' : 'View GitLab Details →' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB: GITHUB -->
    <div v-if="activeTab === 'github'" class="tab-content">
      <div class="profile-header">
        <img :src="github?.user?.avatarUrl || '/img/stacks/github-dark.svg'" alt="avatar" class="profile-avatar" />
        <div class="profile-info">
          <h2>{{ github?.user?.name || 'riefproject' }}</h2>
          <p class="profile-sub">
            <a :href="github?.user?.url || 'https://github.com/riefproject'" target="_blank" rel="noopener noreferrer">
              @{{ github?.user?.login || 'riefproject' }} ↗
            </a>
            <span v-if="github?.user?.company"> · {{ github.user.company }}</span>
          </p>
          <p v-if="github?.user?.bio" class="profile-bio">{{ github.user.bio }}</p>
        </div>
        <div class="profile-metrics">
          <div class="pm-item"><strong>{{ github?.user?.followers || 0 }}</strong><span>{{ isId ? 'Followers' : 'Followers' }}</span></div>
          <div class="pm-item"><strong>{{ github?.user?.following || 0 }}</strong><span>Following</span></div>
          <div class="pm-item"><strong>{{ github?.user?.publicRepos || 0 }}</strong><span>{{ isId ? 'Repo' : 'Repos' }}</span></div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Total Kontribusi' : 'Total Contributions' }}</span>
          <div class="stat-value val-emerald">{{ github?.overview?.totalContributions || 0 }}<span class="stat-unit">+</span></div>
          <span class="stat-helper">{{ isId ? 'Semua tahun tercatat' : 'All recorded years' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Streak Saat Ini' : 'Current Streak' }}</span>
          <div class="stat-value val-sky">{{ github?.overview?.currentStreak || 0 }}<span class="stat-unit"> {{ isId ? 'hari' : 'd' }}</span></div>
          <span class="stat-helper">{{ isId ? 'Terpanjang' : 'Longest' }}: {{ github?.overview?.longestStreak || 0 }} {{ isId ? 'hari' : 'days' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'PR Dibuka' : 'Pull Requests' }}</span>
          <div class="stat-value val-purple">{{ github?.prStats?.total || 0 }}<span class="stat-unit"> ({{ github?.prStats?.merged || 0 }} merged)</span></div>
          <span class="stat-helper">{{ isId ? 'Repo publik' : 'Public repositories' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Bahasa Utama' : 'Top Language' }}</span>
          <div class="stat-value val-amber">{{ topLanguage || '—' }}</div>
          <span class="stat-helper">{{ isId ? 'Berdasarkan bytes repo publik' : 'By public repo bytes' }}</span>
        </div>
      </div>

      <div class="yearly-chips" v-if="github?.overview?.yearlyTotal">
        <span v-for="(count, year) in github.overview.yearlyTotal" :key="year" class="year-chip">
          <strong>{{ count }}</strong> {{ isId ? 'kontribusi' : 'contribs' }} · {{ year }}
        </span>
      </div>

      <section class="heatmap-section">
        <div class="section-header">
          <div class="title-with-badge">
            <h3>GitHub {{ isId ? 'Kalender Kontribusi' : 'Contribution Calendar' }}</h3>
            <span class="activity-count-badge">{{ githubLastYear }} {{ isId ? 'kontribusi 12 bulan terakhir' : 'contributions in past 12 months' }}</span>
          </div>
          <div class="heatmap-legend">
            <span class="legend-label">{{ isId ? 'Sedikit' : 'Less' }}</span>
            <span class="heat-box lvl-0"></span>
            <span class="heat-box lvl-1"></span>
            <span class="heat-box lvl-2"></span>
            <span class="heat-box lvl-3"></span>
            <span class="heat-box lvl-4"></span>
            <span class="legend-label">{{ isId ? 'Banyak' : 'More' }}</span>
          </div>
        </div>
        <div class="heatmap-container">
          <div class="heatmap-scroll">
            <div class="heatmap-grid-wrapper">
              <div class="heatmap-grid">
                <div v-for="(week, wIdx) in githubHeatmapWeeks" :key="wIdx" class="heatmap-col">
                  <div
                    v-for="day in week"
                    :key="day.date"
                    class="heatmap-cell"
                    :class="`lvl-${day.level}`"
                    @mouseenter="showTooltip($event, day)"
                    @mouseleave="hideTooltip"
                  ></div>
                </div>
              </div>
              <div class="heatmap-months">
                <span v-for="m in githubHeatmapMonths" :key="m.name" :style="{ left: `${m.percent}%` }" class="month-label">{{ m.name }}</span>
              </div>
            </div>
            <div class="heatmap-swipe-hint">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
              <span>{{ isId ? 'Geser untuk melihat seluruh kalender' : 'Swipe to see the full calendar' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Languages -->
      <div class="mt-8" v-if="github?.languages?.length">
        <div class="block-header">
          <h3>{{ isId ? 'Bahasa Pemrograman' : 'Most Used Languages' }}</h3>
          <span class="block-sub">{{ isId ? 'Berdasarkan ukuran bytes repo publik' : 'Based on public repository byte sizes' }}</span>
        </div>
        <div class="lang-list">
          <div v-for="lang in github.languages" :key="lang.name" class="lang-row">
            <div class="lang-head">
              <span class="lang-name">{{ lang.name }}</span>
              <span class="lang-pct">{{ lang.percentage }}%</span>
            </div>
            <div class="lang-bar-track">
              <div class="lang-bar-fill" :style="{ width: `${lang.percentage}%` }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Repos -->
      <div class="mt-8" v-if="github?.topRepos?.length">
        <div class="block-header">
          <h3>{{ isId ? 'Repo Teratas' : 'Top Repositories' }}</h3>
          <span class="block-sub">{{ isId ? 'Diurutkan berdasarkan bintang' : 'Sorted by stars' }}</span>
        </div>
        <div class="repo-grid">
          <a
            v-for="repo in github.topRepos"
            :key="repo.fullName"
            :href="repo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="repo-card"
          >
            <div class="repo-top">
              <h4 class="repo-name">{{ repo.name }}</h4>
              <span class="repo-star">★ {{ repo.stars }}</span>
            </div>
            <p v-if="repo.description" class="repo-desc">{{ repo.description }}</p>
            <div class="repo-meta">
              <span v-if="repo.language" class="repo-lang"><span class="repo-lang-dot"></span>{{ repo.language }}</span>
              <span v-if="repo.forks" class="repo-fork">⑂ {{ repo.forks }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- TAB: GITLAB -->
    <div v-if="activeTab === 'gitlab'" class="tab-content">
      <div class="masked-note">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>
          {{ isId
            ? 'Aktivitas dari workspace GitLab perusahaan — detail proyek & domain disamarkan demi kerahasiaan.'
            : 'Activity from a company GitLab workspace — project details & domain are masked for confidentiality.' }}
        </span>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Total Event' : 'Total Events' }}</span>
          <div class="stat-value val-emerald">{{ gitlabTotalEvents }}<span class="stat-unit">+</span></div>
          <span class="stat-helper">{{ isId ? '12 bulan terakhir' : 'Past 12 months' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'Hari Aktif' : 'Active Days' }}</span>
          <div class="stat-value val-sky">{{ gitlab?.stats?.daysActive || 0 }}</div>
          <span class="stat-helper">{{ isId ? 'Hari dengan aktivitas' : 'Days with activity' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'MR Dibuka' : 'MR Opened' }}</span>
          <div class="stat-value val-amber">{{ gitlabMrOpened }}</div>
          <span class="stat-helper">Merge Request</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">{{ isId ? 'MR Merged' : 'MR Merged' }}</span>
          <div class="stat-value val-purple">{{ gitlabMrMerged }}</div>
          <span class="stat-helper">{{ isId ? 'Digabung ke branch utama' : 'Merged to main branch' }}</span>
        </div>
      </div>

      <section class="heatmap-section">
        <div class="section-header">
          <div class="title-with-badge">
            <h3>GitLab {{ isId ? 'Kalender Kontribusi' : 'Contribution Calendar' }}</h3>
            <span class="activity-count-badge">{{ gitlabTotalEvents }} {{ isId ? 'event 12 bulan terakhir' : 'events in past 12 months' }}</span>
          </div>
          <div class="heatmap-legend">
            <span class="legend-label">{{ isId ? 'Sedikit' : 'Less' }}</span>
            <span class="heat-box lvl-0"></span>
            <span class="heat-box lvl-1"></span>
            <span class="heat-box lvl-2"></span>
            <span class="heat-box lvl-3"></span>
            <span class="heat-box lvl-4"></span>
            <span class="legend-label">{{ isId ? 'Banyak' : 'More' }}</span>
          </div>
        </div>
        <div class="heatmap-container">
          <div class="heatmap-scroll">
            <div class="heatmap-grid-wrapper">
              <div class="heatmap-grid">
                <div v-for="(week, wIdx) in gitlabHeatmapWeeks" :key="wIdx" class="heatmap-col">
                  <div
                    v-for="day in week"
                    :key="day.date"
                    class="heatmap-cell"
                    :class="`lvl-${day.level}`"
                    @mouseenter="showTooltip($event, day)"
                    @mouseleave="hideTooltip"
                  ></div>
                </div>
              </div>
              <div class="heatmap-months">
                <span v-for="m in gitlabHeatmapMonths" :key="m.name" :style="{ left: `${m.percent}%` }" class="month-label">{{ m.name }}</span>
              </div>
            </div>
            <div class="heatmap-swipe-hint">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
              <span>{{ isId ? 'Geser untuk melihat seluruh kalender' : 'Swipe to see the full calendar' }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8" v-if="gitlabLanguages.length">
        <div class="block-header">
          <h3>{{ isId ? 'Bahasa Pemrograman' : 'Most Used Languages' }}</h3>
          <span class="block-sub">{{ isId ? 'Dari proyek aktif (detail proyek disamarkan)' : 'From active projects (details masked)' }}</span>
        </div>
        <div class="lang-list">
          <div v-for="lang in gitlabLanguages" :key="lang.name" class="lang-row">
            <div class="lang-head">
              <span class="lang-name">{{ lang.name }}</span>
              <span class="lang-pct">{{ lang.percentage }}%</span>
            </div>
            <div class="lang-bar-track">
              <div class="lang-bar-fill" :style="{ width: `${lang.percentage}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-crosslink">
      <a href="/competitive-programming" class="crosslink-btn">
        <svg class="crosslink-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        <span class="crosslink-text">
          <span class="crosslink-l1">{{ isId ? 'Jelajahi' : 'Explore my' }}</span>
          <span class="crosslink-l2">{{ isId ? 'Competitive Programming saya →' : 'Competitive Programming →' }}</span>
        </span>
      </a>
    </div>

    <Teleport to="body">
      <div
        v-if="tooltip.visible"
        class="heatmap-tooltip"
        :style="{ top: `${tooltip.top}px`, left: `${tooltip.left}px` }"
      >{{ tooltip.text }}</div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { lang } from '../../stores/uiStore.js';

const props = defineProps<{
  initialData?: any;
}>();

const $lang = useStore(lang);
const isId = computed(() => $lang.value === 'id');

const devData = ref<any>(props.initialData || null);
const lastUpdated = ref<string>(props.initialData?.meta?.updatedAt || new Date().toISOString());
const activeTab = ref<'overview' | 'github' | 'gitlab'>('overview');
const heatmapScrollEl = ref<HTMLElement | null>(null);

const tooltip = reactive({ visible: false, text: '', top: 0, left: 0 });

const showTooltip = (e: MouseEvent, day: HeatmapDay) => {
  tooltip.text = formatHeatmapTooltip(day);
  const target = e.currentTarget as HTMLElement;
  if (target) {
    const rect = target.getBoundingClientRect();
    tooltip.top = rect.top - 8;
    tooltip.left = rect.left + rect.width / 2;
  }
  tooltip.visible = true;
};

const hideTooltip = () => {
  tooltip.visible = false;
};

const github = computed(() => devData.value?.platforms?.github || null);
const gitlab = computed(() => devData.value?.platforms?.gitlab || null);

const githubPrMerged = computed(() => github.value?.prStats?.merged || 0);
const githubPrTotal = computed(() => github.value?.prStats?.total || 0);
const gitlabMrOpened = computed(() => gitlab.value?.stats?.mergeRequests?.opened || 0);
const gitlabMrMerged = computed(() => gitlab.value?.stats?.mergeRequests?.merged || 0);
const gitlabTotalEvents = computed(() => gitlab.value?.stats?.totalEvents || Object.values(gitlab.value?.heatmap || {}).reduce((a: number, b: any) => a + Number(b || 0), 0));
const gitlabLanguages = computed(() => gitlab.value?.stats?.languages || []);

const topLanguage = computed(() => github.value?.languages?.[0]?.name || '-');
const currentStreak = computed(() => github.value?.overview?.currentStreak || 0);
const totalContributions = computed(() => {
  const gh = github.value?.overview?.totalContributions || 0;
  const gl = gitlabTotalEvents.value;
  return gh + gl;
});
const prMerged = computed(() => githubPrMerged.value + gitlabMrMerged.value);
const lastYearContributions = computed(() => {
  const gh = github.value?.overview?.lastYearContributions || 0;
  return gh + gitlabTotalEvents.value;
});
const githubLastYear = computed(() => github.value?.overview?.lastYearContributions || 0);

const tabs = computed(() => [
  {
    key: 'overview',
    labelEn: 'Overview',
    labelId: 'Ringkasan',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    count: `${totalContributions.value}+`,
  },
  {
    key: 'github',
    labelEn: 'GitHub',
    labelId: 'GitHub',
    logo: '/img/stacks/github-dark.svg',
    logoLight: '/img/stacks/github-light.svg',
    count: github.value?.overview?.totalContributions || 0,
  },
  {
    key: 'gitlab',
    labelEn: 'GitLab',
    labelId: 'GitLab',
    logo: '/img/stacks/gitlab-dark.svg',
    logoLight: '/img/stacks/gitlab-light.svg',
    count: gitlabTotalEvents.value || 0,
  },
]);

// Heatmap helpers
interface HeatmapDay { date: string; count: number; level: number; }

const getLevel = (count: number) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  if (count <= 14) return 3;
  return 4;
};

const buildHeatmapDays = (map: Record<string, any>, extract: (v: any) => number) => {
  const today = new Date();
  const days: HeatmapDay[] = [];
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = map?.[dateStr];
    const count = extract(entry);
    days.push({ date: dateStr, count, level: getLevel(count) });
  }
  return days;
};

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
    out[k] = ghCount + glCount;
  });
  return out;
});

const heatmapDays = computed(() => buildHeatmapDays(combinedMap.value, (v) => (typeof v === 'object' ? Number(v?.count || 0) : Number(v || 0))));
const githubHeatmapDays = computed(() => buildHeatmapDays(github.value?.overview?.heatmap || {}, (v) => (typeof v === 'object' ? Number(v?.count || 0) : Number(v || 0))));
const gitlabHeatmapDays = computed(() => buildHeatmapDays(gitlab.value?.heatmap || {}, (v) => (typeof v === 'object' ? Number(v?.count || 0) : Number(v || 0))));

const toWeeks = (days: HeatmapDay[]) => {
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
};

const heatmapWeeks = computed(() => toWeeks(heatmapDays.value));
const githubHeatmapWeeks = computed(() => toWeeks(githubHeatmapDays.value));
const gitlabHeatmapWeeks = computed(() => toWeeks(gitlabHeatmapDays.value));

const buildMonths = (weeks: HeatmapDay[][]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const res: { name: string; percent: number }[] = [];
  const totalWeeks = weeks.length;
  weeks.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date);
      if (d.getDate() <= 7) {
        res.push({ name: months[d.getMonth()], percent: Math.round((idx / totalWeeks) * 100) });
      }
    }
  });
  return res;
};

const heatmapMonths = computed(() => buildMonths(heatmapWeeks.value));
const githubHeatmapMonths = computed(() => buildMonths(githubHeatmapWeeks.value));
const gitlabHeatmapMonths = computed(() => buildMonths(gitlabHeatmapWeeks.value));

const formatHeatmapTooltip = (day: HeatmapDay) => {
  const dateObj = new Date(day.date + 'T00:00:00');
  const dateFormatted = dateObj.toLocaleDateString(isId.value ? 'id-ID' : 'en-US', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
  if (day.count === 0) return `${dateFormatted}: ${isId.value ? 'Tidak ada aktivitas' : 'No activity'}`;
  return `${dateFormatted}: ${day.count} ${isId.value ? 'kontribusi' : 'contributions'}`;
};

const formatRelativeTime = (isoString?: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const diffSec = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (diffSec < 60) return isId.value ? 'baru saja' : 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;
  return date.toLocaleDateString(isId.value ? 'id-ID' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

onMounted(() => {
  setTimeout(() => {
    if (heatmapScrollEl.value) {
      heatmapScrollEl.value.scrollLeft = heatmapScrollEl.value.scrollWidth;
    }
  }, 300);
});
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

/* Topbar */
.dashboard-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1rem;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-base);
  color: var(--muted);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: pulse-glow 2s infinite;
}

.pulse-dot.is-refreshing {
  background-color: #38bdf8;
  box-shadow: 0 0 10px #38bdf8;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

.live-text { font-weight: 600; color: var(--text); }
.updated-time { opacity: 0.75; font-size: var(--text-sm); }

.refresh-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover:not(:disabled) { background: var(--chip-bg); border-color: var(--text); }
.refresh-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* Tab Navigation */
.tabs-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border);
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabs-nav::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  border-radius: 0.75rem 0.75rem 0 0;
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  color: var(--muted);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
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

.tab-logo-img { width: 1.1rem; height: 1.1rem; object-fit: contain; }
.tab-icon { display: inline-flex; }

/* Adaptive platform logos: dark variant by default, light variant in light mode */
.tab-logo { display: inline-flex; }
.logo-variant-dark { display: inline-block; }
.logo-variant-light { display: none; }
:root.light .logo-variant-dark { display: none; }
:root.light .logo-variant-light { display: inline-block; }

.tab-badge {
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text);
}

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 640px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 1.35rem;
  border-radius: 1rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  transition: border-color 0.2s, transform 0.2s;
}

.stat-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }

.stat-label {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin-bottom: 0.4rem;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1.1;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: -0.03em;
  margin-bottom: 0.35rem;
}

.val-emerald { color: #34d399; }
.val-sky { color: #38bdf8; }
.val-amber { color: #fbbf24; }
.val-purple { color: #c084fc; }
.stat-unit { font-size: var(--text-lg); font-weight: 700; opacity: 0.85; margin-left: 1px; }
.stat-helper { font-size: var(--text-sm); color: var(--muted); line-height: 1.35; }

:root.light .stat-card { background: #ffffff; border-color: var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
:root.light .stat-card:hover { border-color: #cbd5e1; }
:root.light .val-emerald { color: #047857; }
:root.light .val-sky { color: #0284c7; }
:root.light .val-amber { color: #b45309; }
:root.light .val-purple { color: #6b21a8; }
:root.light .stat-label { color: #4b5563; font-weight: 700; }
:root.light .stat-helper { color: #6b7280; }

/* Heatmap Section */
.heatmap-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .section-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.title-with-badge h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.activity-count-badge {
  font-size: var(--text-sm);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--muted);
}

.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--text-sm);
  color: var(--muted);
}

.heat-box {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.heat-box.lvl-0 { background: var(--bg-elevated); }
.heat-box.lvl-1 { background: #064e3b; }
.heat-box.lvl-2 { background: #047857; }
.heat-box.lvl-3 { background: #10b981; }
.heat-box.lvl-4 { background: #34d399; }

.heatmap-container { position: relative; }
.heatmap-scroll { overflow-x: auto; padding-bottom: 0.5rem; }
.heatmap-grid-wrapper { position: relative; width: max-content; padding-bottom: 1.5rem; }
.heatmap-grid { display: flex; gap: 3px; }
.heatmap-col { display: flex; flex-direction: column; gap: 3px; flex-shrink: 0; }

.heatmap-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background: var(--bg-elevated);
  transition: transform 0.1s;
}

.heatmap-cell:hover {
  transform: scale(1.3);
  z-index: 10;
}

.heatmap-tooltip {
  position: fixed;
  z-index: 99999;
  transform: translate(-50%, -100%);
  pointer-events: none;
  background: var(--bg-soft, #0f172a);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: 0.6rem;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  font-size: var(--text-sm);
  white-space: nowrap;
  animation: tooltipFadeIn 0.12s ease-out;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -90%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -100%);
  }
}

.heatmap-cell.lvl-0 { background: var(--bg-elevated); opacity: 0.6; }
.heatmap-cell.lvl-1 { background: #064e3b; }
.heatmap-cell.lvl-2 { background: #047857; }
.heatmap-cell.lvl-3 { background: #10b981; }
.heatmap-cell.lvl-4 { background: #34d399; }

.heatmap-months {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.2rem;
}

.month-label {
  position: absolute;
  font-size: var(--text-xs);
  color: var(--muted);
}

/* Platform cards */
.platform-cards-grid { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.25rem; }
@media (min-width: 640px) {
  .platform-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.platform-detail-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.platform-detail-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }

.pcard-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.pcard-title-group { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
.pcard-logo-box {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  flex-shrink: 0;
}
.pcard-img-logo { width: 1.35rem; height: 1.35rem; object-fit: contain; }
.pcard-title-text { display: flex; flex-direction: column; line-height: 1.15; }
.pcard-name { font-size: var(--text-base); font-weight: 700; margin: 0; color: var(--text); }
.pcard-handle { font-size: var(--text-xs); color: var(--muted); margin-top: 0.15rem; }

.pcard-solved-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface-muted);
  white-space: nowrap;
}
.pcard-solved-num { font-size: var(--text-lg); font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
.pcard-solved-label { font-size: var(--text-xs); color: var(--muted); font-weight: 400; }

.pcard-body { display: flex; flex-direction: column; gap: 0.5rem; font-size: var(--text-sm); color: var(--muted); margin-bottom: 1.25rem; }
.pcard-meta-row { display: flex; justify-content: space-between; align-items: center; }
.pcard-meta-row strong { color: var(--text); }

.pcard-footer { border-top: 1px solid var(--border); padding-top: 0.75rem; }
.view-details-link { font-size: var(--text-sm); font-weight: 600; color: var(--link); }

/* GitHub profile header */
.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

.profile-avatar { width: 3.5rem; height: 3.5rem; border-radius: 50%; object-fit: cover; }
.profile-info { flex: 1; min-width: 200px; }
.profile-info h2 { margin: 0; font-size: 1.25rem; font-weight: 800; }
.profile-sub { margin: 0.2rem 0 0; font-size: var(--text-sm); color: var(--muted); }
.profile-sub a { color: var(--link); text-decoration: none; }
.profile-bio { margin: 0.35rem 0 0; font-size: var(--text-sm); color: var(--muted); }

.profile-metrics { display: flex; gap: 1.25rem; }
.pm-item { display: flex; flex-direction: column; align-items: center; }
.pm-item strong { font-size: 1.1rem; font-weight: 800; }
.pm-item span { font-size: var(--text-xs); color: var(--muted); }

/* Yearly chips */
.yearly-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.year-chip {
  font-size: var(--text-sm);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--chip-bg);
  border: 1px solid var(--border);
  color: var(--muted);
}
.year-chip strong { color: var(--text); }

/* Block headers */
.mt-8 { margin-top: 2rem; }
.block-header { display: flex; align-items: baseline; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem; }
.block-header h3 { margin: 0; font-size: var(--text-lg); font-weight: 700; }
.block-sub { font-size: var(--text-sm); color: var(--muted); }

/* Languages */
.lang-list { display: flex; flex-direction: column; gap: 0.75rem; }
.lang-row { display: flex; flex-direction: column; gap: 0.3rem; }
.lang-head { display: flex; justify-content: space-between; font-size: var(--text-sm); }
.lang-name { font-weight: 600; color: var(--text); }
.lang-pct { color: var(--muted); font-weight: 700; }
.lang-bar-track { height: 8px; border-radius: 999px; background: var(--chip-bg); overflow: hidden; }
.lang-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: #34d399;
  transition: width 0.4s ease;
}

/* Top repos */
.repo-grid { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 0.85rem; }
@media (min-width: 768px) {
  .repo-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.repo-card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem 1.15rem;
  border-radius: 1rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s;
}

.repo-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }
.repo-top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.repo-name { margin: 0; font-size: var(--text-base); font-weight: 700; color: var(--link); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.repo-star { font-size: var(--text-sm); font-weight: 700; color: var(--muted); flex-shrink: 0; }
.repo-desc { margin: 0; font-size: var(--text-sm); color: var(--muted); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.repo-meta { display: flex; align-items: center; gap: 1rem; font-size: var(--text-xs); color: var(--muted); }
.repo-lang { display: inline-flex; align-items: center; gap: 0.35rem; }
.repo-lang-dot { width: 10px; height: 10px; border-radius: 999px; background: #34d399; display: inline-block; }

/* GitLab masked note */
.masked-note {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: var(--muted);
  font-size: var(--text-sm);
}

.tab-content { display: flex; flex-direction: column; gap: 1.5rem; }

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

/* Light Mode Surface Overrides */
:root.light .heatmap-section { background: #ffffff; border-color: #e2e8f0; }
:root.light .platform-detail-card { background: #ffffff; border-color: #e2e8f0; }
:root.light .pcard-logo-box { background: #f8fafc; border-color: #e2e8f0; }
:root.light .profile-header { background: #ffffff; border-color: #e2e8f0; }
:root.light .repo-card { background: #ffffff; border-color: #e2e8f0; }
:root.light .lang-bar-fill { background: #047857; }
:root.light .repo-lang-dot { background: #047857; }
:root.light .year-chip { background: #ffffff; }

/* Tab buttons in Light Mode */
:root.light .tab-btn { color: #4b5563; }
:root.light .tab-btn:hover { color: #111827; background: #f3f4f6; }
:root.light .tab-btn.active { color: #111827; background: #f3f4f6; border-color: #cbd5e1; }

/* Mobile Responsive Layout Refinements */

/* Heatmap swipe affordance (hidden on desktop) */
.heatmap-swipe-hint {
  display: none;
}

@media (max-width: 767px) {
  .heatmap-section { padding: 1rem !important; gap: 0.75rem !important; }
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
    padding: 0.45rem 0.75rem !important;
    font-size: 0.78rem !important;
    width: auto !important;
    flex: 0 1 auto !important;
    justify-content: center !important;
    gap: 0.35rem !important;
  }

  /* Overview full-width row, GitHub + GitLab split the second row */
  .tab-btn:first-child { flex: 1 1 100% !important; }
  .tab-btn:not(:first-child) { flex: 1 1 calc(50% - 0.25rem) !important; }

  /* Cross-link: break onto two centered lines */
  .crosslink-btn { flex-wrap: wrap; justify-content: center; text-align: center; }
  .crosslink-text { flex-direction: column; align-items: center; line-height: 1.4; }

  .tab-btn .tab-badge { padding: 0.1rem 0.35rem !important; font-size: 0.68rem !important; }
  .tab-logo-img { width: 1rem !important; height: 1rem !important; }

  /* Denser 2-col stat cards (falls back to 1 col below 360px) */
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
  .stat-card { padding: 1rem 1.1rem; }
  .stat-value { font-size: 1.45rem; }
  .stat-helper { font-size: 0.68rem; }

  .tab-content { gap: 1.25rem; }

  /* Heatmap section header: count badge drops below the title on mobile */
  .title-with-badge { flex-direction: column; align-items: flex-start; gap: 0.4rem; }

  /* Profile header: metrics drop to their own full-width row */
  .profile-header { padding: 1.25rem; gap: 0.9rem; }
  .profile-avatar { width: 3rem; height: 3rem; }
  .profile-metrics { flex: 1 1 100%; justify-content: space-around; }
  .pm-item strong { font-size: 1rem; }

  .platform-detail-card { padding: 1.25rem; }
  .pcard-header { flex-wrap: wrap; gap: 0.6rem; }
  .pcard-solved-num { font-size: 1.1rem; }
  .pcard-solved-badge {
    flex: 1 1 100%;
    justify-content: space-between;
    padding: 0.3rem 0.6rem;
  }

  /* Heatmap: right-edge fade signals more content + swipe hint */
  .heatmap-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 1.4rem;
    right: 0;
    width: 30px;
    background: linear-gradient(to left, var(--bg-soft), rgba(0, 0, 0, 0));
    pointer-events: none;
    z-index: 2;
  }

  .heatmap-swipe-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    margin-top: 0.35rem;
    font-size: var(--text-xs);
    color: var(--muted);
    opacity: 0.75;
  }

  :root.light .heatmap-container::after {
    background: linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0));
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

  .platform-cards-grid { gap: 1rem !important; }
}

@media (max-width: 359px) {
  .stats-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
}

@media (max-width: 480px) {
  .dashboard-topbar {
    flex-direction: column !important;
    gap: 0.75rem !important;
    align-items: stretch !important;
    text-align: center !important;
  }

  .live-indicator { justify-content: center !important; }
}
</style>
