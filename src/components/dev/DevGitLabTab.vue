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
      <StatCard
        :label="isId ? 'Total Event' : 'Total Events'"
        :value="gitlabTotalEvents"
        unit="+"
        appearance="dev"
        variant="emerald"
        :helper="isId ? 'Aktivitas di GitLab' : 'GitLab activity'"
      />
      <StatCard
        :label="isId ? 'Hari Aktif' : 'Active Days'"
        :value="gitlab?.stats?.daysActive || 0"
        appearance="dev"
        variant="sky"
        :helper="isId ? 'Hari dengan aktivitas' : 'Days with activity'"
      />
      <StatCard
        :label="isId ? 'MR Dibuka' : 'MR Opened'"
        :value="gitlabMrOpened"
        appearance="dev"
        variant="amber"
        helper="Merge Request"
      />
      <StatCard
        :label="isId ? 'MR Merged' : 'MR Merged'"
        :value="gitlabMrMerged"
        appearance="dev"
        variant="purple"
        :helper="isId ? 'Digabung ke branch utama' : 'Merged to main branch'"
      />
    </div>

    <ActivityHeatmap
      :weeks="gitlabHeatmapWeeks"
      :months="gitlabHeatmapMonths"
      :title="`GitLab ${isId ? 'Kalender Kontribusi' : 'Contribution Calendar'}`"
      :countBadge="`${gitlabTotalEvents} ${isId ? 'event' : 'events'}`"
      :isId="isId"
    />

    <LanguageBars
      v-if="gitlabLanguages.length"
      :languages="gitlabLanguages"
      :isId="isId"
      :titleEn="'Most Used Languages'"
      :titleId="'Bahasa Pemrograman'"
      :subtitleEn="'From active projects (details masked)'"
      :subtitleId="'Dari proyek aktif (detail proyek disamarkan)'"
    />
  </div>
</template>

<script setup lang="ts">
import ActivityHeatmap from '../shared/ActivityHeatmap.vue';
import LanguageBars from '../shared/LanguageBars.vue';
import StatCard from '../shared/StatCard.vue';
import type { HeatmapDay } from '../../utils/heatmap';

defineProps<{
  gitlab: any;
  gitlabTotalEvents: number;
  gitlabMrOpened: number;
  gitlabMrMerged: number;
  gitlabHeatmapWeeks: HeatmapDay[][];
  gitlabHeatmapMonths: Array<{ name: string; percent: number }>;
  gitlabLanguages: any[];
  isId?: boolean;
}>();
</script>
