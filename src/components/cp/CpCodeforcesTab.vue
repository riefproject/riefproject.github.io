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
        {{ isId ? 'Topik & Algoritma di Codeforces' : 'Topics & Algorithms on Codeforces' }}
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
import type { CpColumn, CpData, CpMetric } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    cpData: CpData
    totalCfSolved?: number
    isId?: boolean
  }>(),
  {
    totalCfSolved: 50,
    isId: false,
  }
)

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Tag', labelId: 'Tag' },
  { key: 'difficulty', labelEn: 'Difficulty', labelId: 'Kesulitan' },
  { key: 'language', labelEn: 'Language', labelId: 'Bahasa' },
]

const metrics = computed<CpMetric[]>(() => [
  {
    label: props.isId ? 'Rating Saat Ini' : 'Current Rating',
    value: props.cpData?.platforms?.codeforces?.rating || 625,
    subPrefix: 'Rank:',
    subHighlight: props.cpData?.platforms?.codeforces?.rank || 'newbie',
  },
  {
    label: props.isId ? 'Soal Selesai' : 'Unique Solved',
    value: props.totalCfSolved,
    sub: props.isId ? 'Soal Berhasil AC' : 'Problems Accepted',
  },
  {
    label: props.isId ? 'Total Submisi' : 'Total Submissions',
    value: props.cpData?.platforms?.codeforces?.totalSubmissions || 148,
    sub: props.isId ? 'Riwayat submisi di CF' : 'Submission history on CF',
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
