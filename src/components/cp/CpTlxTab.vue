<template>
  <CpPlatformTab
    platform="tlx"
    :cpData="cpData"
    :columns="columns"
    :isId="isId"
    solved-title-en="Solved TLX Problems"
    solved-title-id="Soal TLX yang Diselesaikan"
    archive-href="/competitive-programming/problems?platform=tlx"
    :cta-en="`View All ${totalTlxSolved} TLX Problems on Dedicated Page →`"
    :cta-id="`Lihat Seluruh ${totalTlxSolved} Soal TLX di Halaman Khusus →`"
    open-title-en="Open Submission / Answer on TLX"
    open-title-id="Buka Submisi / Jawaban di TLX">
    <CpMetricsGrid :metrics="metrics" />
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
    totalTlxSolved?: number
    isId?: boolean
  }>(),
  {
    totalTlxSolved: 371,
    isId: false,
  }
)

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Topic', labelId: 'Topik / Modul' },
  { key: 'language', labelEn: 'Language', labelId: 'Bahasa' },
]

const metrics = computed<CpMetric[]>(() => [
  {
    label: props.isId ? 'Soal Selesai' : 'Unique Solved',
    value: props.totalTlxSolved,
    sub: props.isId ? 'Soal Berhasil AC' : 'Problems Accepted',
  },
  {
    label: props.isId ? 'Total Submisi' : 'Total Submissions',
    value: props.cpData?.platforms?.tlx?.totalSubmissions || 561,
    sub: props.isId ? 'Riwayat submisi di TLX' : 'Submission history on TLX',
  },
  {
    label: props.isId ? 'Submisi AC' : 'Total AC Submissions',
    value: props.cpData?.platforms?.tlx?.totalAcSubmissions || 215,
    sub: props.isId ? 'Submisi berstatus 100/AC' : 'Submissions with 100/AC score',
  },
])
</script>
