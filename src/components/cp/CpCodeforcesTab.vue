<template>
  <div class="platform-spotlight">
    <CpPlatformHeader
      name="Codeforces"
      logo="/img/codeforces/codeforces.webp"
      description-en="Global algorithm competition and international olympiad platform."
      description-id="Platform kompetisi algoritma global dan olimpiade internasional."
      archive-href="/competitive-programming/problems?platform=codeforces"
      archive-label-en="Open CF Archive (50)"
      archive-label-id="Buka Koleksi CF (50 Soal)"
      :profile-href="`https://codeforces.com/profile/${cpData?.platforms?.codeforces?.handle || 'feeera'}`"
      profile-label-en="Codeforces Profile ↗"
      profile-label-id="Profil Codeforces ↗"
      :isId="isId"
    />

    <CpMetricsGrid :metrics="metrics" />

    <div class="mt-8">
      <h4 class="text-lg font-semibold mb-3 platform-subtitle">{{ isId ? 'Topik & Algoritma di Codeforces' : 'Topics & Algorithms on Codeforces' }}</h4>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(cnt, tag) in (cpData?.platforms?.codeforces?.tagsCount || {})"
          :key="tag"
          class="px-3 py-1.5 cf-tag-card text-sm flex items-center gap-2"
        >
          <span class="cf-tag-name">{{ tag }}</span>
          <span class="cf-tag-count">{{ cnt }}</span>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <CpSolvedProblemsPanel
        :problems="recentSolvedList"
        :columns="columns"
        title-en="Solved Codeforces Problems"
        title-id="Soal Codeforces yang Diselesaikan"
        archive-href="/competitive-programming/problems?platform=codeforces"
        :cta-en="`View All ${totalCfSolved} Codeforces Problems on Dedicated Page →`"
        :cta-id="`Lihat Seluruh ${totalCfSolved} Soal Codeforces di Halaman Khusus →`"
        open-title-en="Open on Codeforces"
        open-title-id="Buka di Codeforces"
        :isId="isId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CpPlatformHeader from './CpPlatformHeader.vue';
import CpMetricsGrid from './CpMetricsGrid.vue';
import CpSolvedProblemsPanel from './CpSolvedProblemsPanel.vue';
import type { CpColumn, CpMetric } from './cpTypes';

const props = withDefaults(
  defineProps<{
    cpData: any;
    totalCfSolved?: number;
    isId?: boolean;
  }>(),
  {
    totalCfSolved: 50,
    isId: false,
  },
);

const recentSolvedList = computed(
  () => props.cpData?.platforms?.codeforces?.recentSolved || [],
);

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Tag', labelId: 'Tag' },
  { key: 'difficulty', labelEn: 'Difficulty', labelId: 'Kesulitan' },
  { key: 'language', labelEn: 'Language', labelId: 'Bahasa' },
];

const metrics = computed<CpMetric[]>(() => [
  {
    label: props.isId ? 'Rating Saat Ini' : 'Current Rating',
    value: props.cpData?.platforms?.codeforces?.rating || 625,
    subHtml: `Rank: <span class="capitalize font-medium">${props.cpData?.platforms?.codeforces?.rank || 'newbie'}</span>`,
    variant: 'sky',
  },
  {
    label: props.isId ? 'Soal Selesai' : 'Unique Solved',
    value: props.totalCfSolved,
    sub: props.isId ? 'Soal Berhasil AC' : 'Problems Accepted',
    variant: 'emerald',
  },
  {
    label: props.isId ? 'Total Submisi' : 'Total Submissions',
    value: props.cpData?.platforms?.codeforces?.totalSubmissions || 148,
    sub: props.isId ? 'Riwayat submisi di CF' : 'Submission history on CF',
    variant: 'purple',
  },
]);
</script>

<style scoped>
.cf-tag-card {
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-md);
}
:root.light .cf-tag-card {
  background: var(--bg-soft) !important;
  border: none !important;
}

.cf-tag-name {
  color: #e2e8f0;
  font-weight: 500;
}
:root.light .cf-tag-name {
  color: #334155 !important;
}

.cf-tag-count {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
  font-size: 0.725rem;
  font-weight: 700;
}
:root.light .cf-tag-count {
  background: #e0f2fe !important;
  color: #0369a1 !important;
}
</style>
