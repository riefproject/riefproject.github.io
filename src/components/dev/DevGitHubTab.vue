<template>
  <div class="tab-content">
    <div class="profile-header">
      <img
        :src="github?.user?.avatarUrl || '/img/stacks/github-dark.svg'"
        alt="avatar"
        class="profile-avatar" />
      <div class="profile-info">
        <h2>{{ github?.user?.name || 'riefproject' }}</h2>
        <p class="profile-sub">
          <a
            :href="github?.user?.url || 'https://github.com/riefproject'"
            target="_blank"
            rel="noopener noreferrer">
            @{{ github?.user?.login || 'riefproject' }} ↗
          </a>
          <span v-if="github?.user?.company"> · {{ github.user.company }}</span>
        </p>
        <p v-if="github?.user?.bio" class="profile-bio">{{ github.user.bio }}</p>
      </div>
      <div class="profile-metrics">
        <div class="pm-item">
          <strong>{{ github?.user?.followers || 0 }}</strong
          ><span>{{ copy.followers }}</span>
        </div>
        <div class="pm-item">
          <strong>{{ github?.user?.following || 0 }}</strong
          ><span>{{ copy.following }}</span>
        </div>
        <div class="pm-item">
          <strong>{{ github?.user?.publicRepos || 0 }}</strong
          ><span>{{ copy.publicRepos }}</span>
        </div>
      </div>
    </div>

    <StatsGrid appearance="dev" :items="stats" />

    <div class="yearly-chips" v-if="github?.overview?.yearlyTotal">
      <span v-for="(count, year) in github.overview.yearlyTotal" :key="year" class="year-chip">
        <strong>{{ count }}</strong> {{ copy.contributions }} · {{ year }}
      </span>
    </div>

    <ActivityHeatmap
      :weeks="githubHeatmapWeeks"
      :months="githubHeatmapMonths"
      :title="`GitHub ${copy.contributionCalendar}`"
      :countBadge="`${githubLastYear} ${copy.contributions}`"
      :getMetrics="devHeatmapMetrics"
      :isId="isId" />

    <!-- Languages -->
    <LanguageBars
      v-if="github?.languages?.length"
      :languages="github.languages"
      :isId="isId"
      :title-en="copy.languagesTitle"
      :title-id="copy.languagesTitle"
      :subtitle-en="copy.languagesSubtitle"
      :subtitle-id="copy.languagesSubtitle" />

    <!-- Top Repos -->
    <div class="mt-8" v-if="github?.topRepos?.length">
      <div class="block-header">
        <h3>{{ copy.topRepositories }}</h3>
        <span class="block-sub">{{ copy.sortedByStars }}</span>
      </div>
      <div class="repo-grid">
        <a
          v-for="repo in github.topRepos"
          :key="repo.fullName"
          :href="repo.url"
          target="_blank"
          rel="noopener noreferrer"
          class="repo-card">
          <div class="repo-top">
            <h4 class="repo-name">{{ repo.name }}</h4>
            <span class="repo-star">★ {{ repo.stars }}</span>
          </div>
          <p v-if="repo.description" class="repo-desc">{{ repo.description }}</p>
          <div class="repo-meta">
            <span v-if="repo.language" class="repo-lang"
              ><span class="repo-lang-dot"></span>{{ repo.language }}</span
            >
            <span v-if="repo.forks" class="repo-fork">⑂ {{ repo.forks }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue'
import LanguageBars from '../shared/LanguageBars.vue'
import StatsGrid from '../shared/StatsGrid.vue'
import { devHeatmapMetrics, type HeatmapDay } from '../../utils/heatmap'
import type { DevPlatformProfile } from '../../types/dev.types'
import type { StatItem } from '../../types/ui.types'
import { computed } from 'vue'

const props = defineProps<{
  github: DevPlatformProfile
  topLanguage?: string
  githubLastYear: number
  githubHeatmapWeeks: HeatmapDay[][]
  githubHeatmapMonths: Array<{ name: string; percent: number }>
  isId?: boolean
}>()

const copy = computed(() => {
  const id = props.isId
  return {
    followers: id ? 'Pengikut' : 'Followers',
    following: id ? 'Mengikuti' : 'Following',
    publicRepos: id ? 'Repo Publik' : 'Public Repos',
    contributions: id ? 'kontribusi' : 'contributions',
    contributionCalendar: id ? 'Kalender Kontribusi' : 'Contribution Calendar',
    languagesTitle: id ? 'Bahasa Pemrograman' : 'Most Used Languages',
    languagesSubtitle:
      id ? 'Berdasarkan ukuran bytes repo publik' : 'Based on public repository byte sizes',
    topRepositories: id ? 'Repo Teratas' : 'Top Repositories',
    sortedByStars: id ? 'Diurutkan berdasarkan bintang' : 'Sorted by stars',
    totalContributions: id ? 'Total Kontribusi' : 'Total Contributions',
    allRecordedYears: id ? 'Semua tahun tercatat' : 'All recorded years',
    currentStreak: id ? 'Streak Saat Ini' : 'Current Streak',
    daysUnit: id ? ' hari' : ' days',
    longest: id ? 'Terpanjang' : 'Longest',
    pullRequests: id ? 'PR Dibuka' : 'Pull Requests',
    publicRepositories: id ? 'Repo publik' : 'Public repositories',
    topLanguage: id ? 'Bahasa Utama' : 'Top Language',
    topLanguageHelper: id ? 'Berdasarkan bytes repo publik' : 'By public repo bytes',
  }
})

const stats = computed<StatItem[]>(() => {
  const { github } = props
  return [
    {
      label: copy.value.totalContributions,
      value: github?.overview?.totalContributions || 0,
      unit: '+',
      variant: 'emerald',
      helper: copy.value.allRecordedYears,
    },
    {
      label: copy.value.currentStreak,
      value: github?.overview?.currentStreak || 0,
      unit: copy.value.daysUnit,
      variant: 'sky',
      helper: `${copy.value.longest}: ${github?.overview?.longestStreak || 0} ${copy.value.daysUnit.trim()}`,
    },
    {
      label: copy.value.pullRequests,
      value: github?.prStats?.total || 0,
      unit: ` (${github?.prStats?.merged || 0} merged)`,
      variant: 'purple',
      helper: copy.value.publicRepositories,
    },
    {
      label: copy.value.topLanguage,
      value: props.topLanguage || '—',
      variant: 'amber',
      helper: copy.value.topLanguageHelper,
    },
  ]
})
</script>
