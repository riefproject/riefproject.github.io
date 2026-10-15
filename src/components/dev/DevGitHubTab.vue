<template>
  <div class="tab-content">
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
        <div class="pm-item"><strong>{{ github?.user?.followers || 0 }}</strong><span>{{ isId ? 'Pengikut' : 'Followers' }}</span></div>
        <div class="pm-item"><strong>{{ github?.user?.following || 0 }}</strong><span>{{ isId ? 'Mengikuti' : 'Following' }}</span></div>
        <div class="pm-item"><strong>{{ github?.user?.publicRepos || 0 }}</strong><span>{{ isId ? 'Repo Publik' : 'Public Repos' }}</span></div>
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
        <div class="stat-value val-sky">{{ github?.overview?.currentStreak || 0 }}<span class="stat-unit"> {{ isId ? 'hari' : 'days' }}</span></div>
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
        <strong>{{ count }}</strong> {{ isId ? 'kontribusi' : 'contributions' }} · {{ year }}
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
        <div class="heatmap-scroll" ref="heatmapScrollEl">
          <div class="heatmap-grid-wrapper">
            <div class="heatmap-grid">
              <div v-for="(week, wIdx) in githubHeatmapWeeks" :key="wIdx" class="heatmap-col">
                <div
                  v-for="day in week"
                  :key="day.date"
                  class="heatmap-cell"
                  :class="`lvl-${day.level}`"
                  @mouseenter="$emit('hoverCell', $event, day)"
                  @mouseleave="$emit('leaveCell')"
                ></div>
              </div>
            </div>
            <div class="heatmap-months">
              <span v-for="(m, mIdx) in githubHeatmapMonths" :key="`${m.name}-${mIdx}`" :style="{ left: `${m.percent}%` }" class="month-label">{{ m.name }}</span>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { DevHeatmapDay } from './devUtils';

defineProps<{
  github: any;
  topLanguage?: string;
  githubLastYear: number;
  githubHeatmapWeeks: DevHeatmapDay[][];
  githubHeatmapMonths: Array<{ name: string; percent: number }>;
  isId?: boolean;
}>();

defineEmits<{
  (e: 'hoverCell', event: MouseEvent, day: DevHeatmapDay): void;
  (e: 'leaveCell'): void;
}>();

const heatmapScrollEl = ref<HTMLElement | null>(null);

onMounted(() => {
  setTimeout(() => {
    if (heatmapScrollEl.value) {
      heatmapScrollEl.value.scrollLeft = heatmapScrollEl.value.scrollWidth;
    }
  }, 300);
});
</script>
