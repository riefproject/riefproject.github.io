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
import { CP_FALLBACK } from '../../utils/cp/defaults'
import type { CpColumn, CpData, CpMetric } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    cpData: CpData
    totalTlxSolved?: number
    isId?: boolean
  }>(),
  {
    totalTlxSolved: CP_FALLBACK.tlxTotalSolved,
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
    value: props.cpData?.platforms?.tlx?.totalSubmissions || CP_FALLBACK.tlxTotalSubmissions,
    sub: props.isId ? 'Riwayat submisi di TLX' : 'Submission history on TLX',
  },
  {
    label: props.isId ? 'Submisi AC' : 'Total AC Submissions',
    value: props.cpData?.platforms?.tlx?.totalAcSubmissions || CP_FALLBACK.tlxTotalAcSubmissions,
    sub: props.isId ? 'Submisi berstatus 100/AC' : 'Submissions with 100/AC score',
  },
])
</script>
