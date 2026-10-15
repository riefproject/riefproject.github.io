<template>
  <div class="tab-content">
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
    <ActivityHeatmap
      :weeks="heatmapWeeks"
      :months="heatmapMonths"
      :title="isId ? 'Aktivitas Pengembangan' : 'Development Activity'"
      :countBadge="`${lastYearContributions} ${isId ? 'kontribusi' : 'contributions'}`"
      :isId="isId"
    />

    <!-- Platform Cards -->
    <div class="platform-cards-grid">
      <div class="platform-detail-card" @click="$emit('selectTab', 'github')">
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

      <div class="platform-detail-card" @click="$emit('selectTab', 'gitlab')">
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
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue';
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
