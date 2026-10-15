<template>
  <div class="tab-content">
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
        <span class="stat-helper">{{ isId ? 'Aktivitas di GitLab' : 'GitLab activity' }}</span>
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

    <ActivityHeatmap
      :weeks="gitlabHeatmapWeeks"
      :months="gitlabHeatmapMonths"
      :title="`GitLab ${isId ? 'Kalender Kontribusi' : 'Contribution Calendar'}`"
      :countBadge="`${gitlabTotalEvents} ${isId ? 'event' : 'events'}`"
      :isId="isId"
    />

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
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue';
import type { DevHeatmapDay } from './devUtils';

defineProps<{
  gitlab: any;
  gitlabTotalEvents: number;
  gitlabMrOpened: number;
  gitlabMrMerged: number;
  gitlabHeatmapWeeks: DevHeatmapDay[][];
  gitlabHeatmapMonths: Array<{ name: string; percent: number }>;
  gitlabLanguages: any[];
  isId?: boolean;
}>();
</script>
