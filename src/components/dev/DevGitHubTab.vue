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
      <StatCard
        :label="isId ? 'Total Kontribusi' : 'Total Contributions'"
        :value="github?.overview?.totalContributions || 0"
        unit="+"
        appearance="dev"
        variant="emerald"
        :helper="isId ? 'Semua tahun tercatat' : 'All recorded years'"
      />
      <StatCard
        :label="isId ? 'Streak Saat Ini' : 'Current Streak'"
        :value="github?.overview?.currentStreak || 0"
        :unit="isId ? ' hari' : ' days'"
        appearance="dev"
        variant="sky"
        :helper="`${isId ? 'Terpanjang' : 'Longest'}: ${github?.overview?.longestStreak || 0} ${isId ? 'hari' : 'days'}`"
      />
      <StatCard
        :label="isId ? 'PR Dibuka' : 'Pull Requests'"
        :value="github?.prStats?.total || 0"
        :unit="` (${github?.prStats?.merged || 0} merged)`"
        appearance="dev"
        variant="purple"
        :helper="isId ? 'Repo publik' : 'Public repositories'"
      />
      <StatCard
        :label="isId ? 'Bahasa Utama' : 'Top Language'"
        :value="topLanguage || '—'"
        appearance="dev"
        variant="amber"
        :helper="isId ? 'Berdasarkan bytes repo publik' : 'By public repo bytes'"
      />
    </div>

    <div class="yearly-chips" v-if="github?.overview?.yearlyTotal">
      <span v-for="(count, year) in github.overview.yearlyTotal" :key="year" class="year-chip">
        <strong>{{ count }}</strong> {{ isId ? 'kontribusi' : 'contributions' }} · {{ year }}
      </span>
    </div>

    <ActivityHeatmap
      :weeks="githubHeatmapWeeks"
      :months="githubHeatmapMonths"
      :title="`GitHub ${isId ? 'Kalender Kontribusi' : 'Contribution Calendar'}`"
      :countBadge="`${githubLastYear} ${isId ? 'kontribusi' : 'contributions'}`"
      :isId="isId"
    />

    <!-- Languages -->
    <LanguageBars
      v-if="github?.languages?.length"
      :languages="github.languages"
      :isId="isId"
      :titleEn="'Most Used Languages'"
      :titleId="'Bahasa Pemrograman'"
      :subtitleEn="'Based on public repository byte sizes'"
      :subtitleId="'Berdasarkan ukuran bytes repo publik'"
    />

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
import ActivityHeatmap from '../shared/ActivityHeatmap.vue';
import LanguageBars from '../shared/LanguageBars.vue';
import StatCard from '../shared/StatCard.vue';
import type { HeatmapDay } from '../../utils/heatmap';

defineProps<{
  github: any;
  topLanguage?: string;
  githubLastYear: number;
  githubHeatmapWeeks: HeatmapDay[][];
  githubHeatmapMonths: Array<{ name: string; percent: number }>;
  isId?: boolean;
}>();
</script>
