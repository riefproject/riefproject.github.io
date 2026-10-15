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
        <div class="heatmap-scroll" ref="heatmapScrollEl">
          <div class="heatmap-grid-wrapper">
            <div class="heatmap-grid">
              <div v-for="(week, wIdx) in gitlabHeatmapWeeks" :key="wIdx" class="heatmap-col">
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
              <span v-for="(m, mIdx) in gitlabHeatmapMonths" :key="`${m.name}-${mIdx}`" :style="{ left: `${m.percent}%` }" class="month-label">{{ m.name }}</span>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
