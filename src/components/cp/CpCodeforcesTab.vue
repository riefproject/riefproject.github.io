<template>
  <CpPlatformTab
    platform="codeforces"
    :cpData="cpData"
    :columns="columns"
    :isId="isId"
    solved-title-en="Solved Codeforces Problems"
    solved-title-id="Soal Codeforces yang Diselesaikan"
    archive-href="/competitive-programming/problems?platform=codeforces"
    :cta-en="`View All ${totalCfSolved} Codeforces Problems on Dedicated Page →`"
    :cta-id="`Lihat Seluruh ${totalCfSolved} Soal Codeforces di Halaman Khusus →`"
    open-title-en="Open on Codeforces"
    open-title-id="Buka di Codeforces">
    <CpMetricsGrid :metrics="metrics" />

    <div class="mt-8">
      <h4 class="text-lg font-semibold mb-3 platform-subtitle">
        {{ copy.topicsTitle }}
      </h4>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(cnt, tag) in cpData?.platforms?.codeforces?.tagsCount || {}"
          :key="tag"
          class="px-3 py-1.5 cf-tag-card text-sm flex items-center gap-2">
          <span class="cf-tag-name">{{ tag }}</span>
          <span class="cf-tag-count">{{ cnt }}</span>
        </div>
      </div>
    </div>
  </CpPlatformTab>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CpPlatformTab from './CpPlatformTab.vue'
import CpMetricsGrid from './CpMetricsGrid.vue'
import { CP_FALLBACK } from '../../utils/cp/defaults'
import type { CpColumn, CpData, CpMetric } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    cpData: CpData
    totalCfSolved?: number
    isId?: boolean
  }>(),
  {
    totalCfSolved: CP_FALLBACK.codeforcesTotalSolved,
    isId: false,
  }
)

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Tag', labelId: 'Tag' },
  { key: 'difficulty', labelEn: 'Difficulty', labelId: 'Kesulitan' },
  { key: 'language', labelEn: 'Language', labelId: 'Bahasa' },
]

const copy = computed(() => {
  const id = props.isId
  return {
    topicsTitle: id ? 'Topik & Algoritma di Codeforces' : 'Topics & Algorithms on Codeforces',
    currentRating: id ? 'Rating Saat Ini' : 'Current Rating',
    uniqueSolved: id ? 'Soal Selesai' : 'Unique Solved',
    problemsAccepted: id ? 'Soal Berhasil AC' : 'Problems Accepted',
    totalSubmissions: id ? 'Total Submisi' : 'Total Submissions',
    submissionHistory: id ? 'Riwayat submisi di CF' : 'Submission history on CF',
  }
})

const metrics = computed<CpMetric[]>(() => [
  {
    label: copy.value.currentRating,
    value: props.cpData?.platforms?.codeforces?.rating || CP_FALLBACK.codeforcesRating,
    subPrefix: 'Rank:',
    subHighlight: props.cpData?.platforms?.codeforces?.rank || CP_FALLBACK.codeforcesRank,
  },
  {
    label: copy.value.uniqueSolved,
    value: props.totalCfSolved,
    sub: copy.value.problemsAccepted,
  },
  {
    label: copy.value.totalSubmissions,
    value:
      props.cpData?.platforms?.codeforces?.totalSubmissions ||
      CP_FALLBACK.codeforcesTotalSubmissions,
    sub: copy.value.submissionHistory,
  },
])
</script>

<style scoped>
.cf-tag-card {
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-md);
}
:root.light .cf-tag-card {
  background: var(--bg-soft);
  border: none;
}

.cf-tag-name {
  color: var(--text);
  font-weight: 500;
}
:root.light .cf-tag-name {
  color: var(--color-neutral-strong);
}

.cf-tag-count {
  background: rgba(56, 189, 248, 0.15);
  color: var(--color-info);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
  font-size: 0.725rem;
  font-weight: 700;
}
:root.light .cf-tag-count {
  background: color-mix(in srgb, var(--color-info) 15%, transparent);
  color: var(--color-info-strong);
}
</style>
