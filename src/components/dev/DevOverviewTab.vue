<template>
  <div class="tab-content">
    <div class="stats-grid">
      <StatCard
        :label="isId ? 'Total Kontribusi' : 'Total Contributions'"
        :value="totalContributions"
        unit="+"
        appearance="dev"
        variant="emerald"
        :helper="isId ? 'Gabungan GitHub & GitLab' : 'Combined GitHub + GitLab'"
      />
      <StatCard
        :label="isId ? 'Streak Saat Ini' : 'Current Streak'"
        :value="currentStreak"
        :unit="isId ? ' hari' : ' days'"
        appearance="dev"
        variant="sky"
        :helper="isId ? 'Hari berturut-turut aktif' : 'Consecutive active days'"
      />
      <StatCard
        :label="isId ? 'PR / MR Selesai' : 'PR / MR Merged'"
        :value="prMerged"
        appearance="dev"
        variant="purple"
        :helper="`GitHub ${githubPrMerged} · GitLab ${gitlabMrMerged}`"
      />
      <StatCard
        :label="isId ? 'Bahasa Utama' : 'Top Language'"
        :value="topLanguage || '—'"
        appearance="dev"
        variant="amber"
        :helper="isId ? 'Berdasarkan bytes repo publik' : 'By public repo bytes'"
      />
    </div>

    <!-- Combined Heatmap -->
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="isId ? 'Aktivitas Pengembangan' : 'Development Activity'"
      :countBadge="`${lastYearContributions} ${isId ? 'kontribusi' : 'contributions'}`"
      :isId="isId"
    />

    <!-- Platform Cards -->
    <div class="platform-cards-grid">
      <PlatformCard
        name="GitHub"
        :handle="github?.user?.login || 'riefproject'"
        logo="/img/stacks/github-dark.svg"
        logoLight="/img/stacks/github-light.svg"
        :solvedNum="github?.overview?.totalContributions || 0"
        :solvedLabel="isId ? 'kontribusi' : 'contributions'"
        :footerText="isId ? 'Lihat Detail GitHub →' : 'View GitHub Details →'"
        @select="$emit('selectTab', 'github')"
      >
        <div class="pcard-meta-row">
          <span>{{ isId ? 'Streak Terpanjang' : 'Longest Streak' }}:</span>
          <strong>{{ github?.overview?.longestStreak || 0 }} {{ isId ? 'hari' : 'days' }}</strong>
        </div>
        <div class="pcard-meta-row">
          <span>PR Merged:</span>
          <strong>{{ githubPrMerged }} / {{ github?.prStats?.total || 0 }}</strong>
        </div>
      </PlatformCard>

      <PlatformCard
        name="GitLab"
        :handle="isId ? 'Workspace perusahaan' : 'Company workspace'"
        logo="/img/stacks/gitlab-dark.svg"
        logoLight="/img/stacks/gitlab-light.svg"
        :solvedNum="gitlabTotalEvents"
        :solvedLabel="isId ? 'event' : 'events'"
        :footerText="isId ? 'Lihat Detail GitLab →' : 'View GitLab Details →'"
        @select="$emit('selectTab', 'gitlab')"
      >
        <div class="pcard-meta-row">
          <span>{{ isId ? 'Hari Aktif' : 'Active Days' }}:</span>
          <strong>{{ gitlab?.stats?.daysActive || 0 }}</strong>
        </div>
        <div class="pcard-meta-row">
          <span>MR Merged:</span>
          <strong>{{ gitlabMrMerged }}</strong>
        </div>
      </PlatformCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue';
import PlatformCard from '../shared/PlatformCard.vue';
import StatCard from '../shared/StatCard.vue';
import type { DevHeatmapDay } from './devUtils';

defineProps<{
  totalContributions: number;
  currentStreak: number;
  prMerged: number;
  githubPrMerged: number;
  gitlabMrMerged: number;
  topLanguage?: string;
  lastYearContributions: number;
  heatmapWeeks: DevHeatmapDay[][];
  heatmapMonths: Array<{ name: string; percent: number }>;
  github: any;
  gitlab: any;
  gitlabTotalEvents: number;
  isId?: boolean;
}>();

defineEmits<{
  (e: 'selectTab', tab: 'github' | 'gitlab'): void;
}>();
</script>
