<template>
  <div class="platform-spotlight">
    <CpPlatformHeader
      name="TLX (TOKI Learning Center)"
      logo="/img/tlx/tlx.webp"
      description-en="Official platform of the Indonesian Informatics Olympiad Alumni Association (IA-TOKI)."
      description-id="Platform resmi Ikatan Alumni Tim Olimpiade Komputer Indonesia (IA-TOKI)."
      archive-href="/competitive-programming/problems?platform=tlx"
      archive-label-en="Open TLX Archive (194)"
      archive-label-id="Buka Koleksi TLX (194 Soal)"
      :profile-href="`https://tlx.toki.id/profiles/${cpData?.platforms?.tlx?.handle || 'aycaaa'}`"
      profile-label-en="TLX Profile ↗"
      profile-label-id="Profil TLX ↗"
      :isId="isId"
    />

    <CpMetricsGrid :metrics="metrics" />

    <div class="mt-8">
      <CpSolvedProblemsPanel
        :problems="recentSolvedList"
        :columns="columns"
        title-en="Solved TLX Problems"
        title-id="Soal TLX yang Diselesaikan"
        archive-href="/competitive-programming/problems?platform=tlx"
        :cta-en="`View All ${totalTlxSolved} TLX Problems on Dedicated Page →`"
        :cta-id="`Lihat Seluruh ${totalTlxSolved} Soal TLX di Halaman Khusus →`"
        open-title-en="Open Submission / Answer on TLX"
        open-title-id="Buka Submisi / Jawaban di TLX"
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
    totalTlxSolved?: number;
    isId?: boolean;
  }>(),
  {
    totalTlxSolved: 371,
    isId: false,
  },
);

const recentSolvedList = computed(
  () => props.cpData?.platforms?.tlx?.recentSolved || [],
);

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Topic', labelId: 'Topik / Modul' },
  { key: 'language', labelEn: 'Language', labelId: 'Bahasa' },
];

const metrics = computed<CpMetric[]>(() => [
  {
    label: props.isId ? 'Soal Selesai' : 'Unique Solved',
    value: props.totalTlxSolved,
    sub: props.isId ? 'Soal Berhasil AC' : 'Problems Accepted',
    variant: 'emerald',
  },
  {
    label: props.isId ? 'Total Submisi' : 'Total Submissions',
    value: props.cpData?.platforms?.tlx?.totalSubmissions || 561,
    sub: props.isId ? 'Riwayat submisi di TLX' : 'Submission history on TLX',
    variant: 'sky',
  },
  {
    label: props.isId ? 'Submisi AC' : 'Total AC Submissions',
    value: props.cpData?.platforms?.tlx?.totalAcSubmissions || 215,
    sub: props.isId ? 'Submisi berstatus 100/AC' : 'Submissions with 100/AC score',
    variant: 'amber',
  },
]);
</script>
