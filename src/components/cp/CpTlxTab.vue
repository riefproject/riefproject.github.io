<template>
  <CpPlatformTab
    platform="tlx"
    :cpData="cpData"
    :columns="columns"
    :copy="platformCopy"
    :isId="isId">
    <CpMetricsGrid :metrics="metrics" />
  </CpPlatformTab>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CpPlatformTab from './CpPlatformTab.vue'
import CpMetricsGrid from './CpMetricsGrid.vue'
import { CP_FALLBACK } from '../../utils/cp/defaults'
import type { CpColumn, CpData, CpMetric, CpPlatformCopy } from '../../types/cp.types'

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

const copy = computed(() => {
  const id = props.isId
  return {
    uniqueSolved: id ? 'Soal Selesai' : 'Unique Solved',
    problemsAccepted: id ? 'Soal Berhasil AC' : 'Problems Accepted',
    totalSubmissions: id ? 'Total Submisi' : 'Total Submissions',
    submissionHistory: id ? 'Riwayat submisi di TLX' : 'Submission history on TLX',
    acSubmissions: id ? 'Submisi AC' : 'Total AC Submissions',
    acSubmissionsSub: id ? 'Submisi berstatus 100/AC' : 'Submissions with 100/AC score',
  }
})

const platformCopy = computed<CpPlatformCopy>(() => ({
  solvedTitle: { en: 'Solved TLX Problems', id: 'Soal TLX yang Diselesaikan' },
  cta: {
    en: `View All ${props.totalTlxSolved} TLX Problems on Dedicated Page →`,
    id: `Lihat Seluruh ${props.totalTlxSolved} Soal TLX di Halaman Khusus →`,
  },
  openTitle: {
    en: 'Open Submission / Answer on TLX',
    id: 'Buka Submisi / Jawaban di TLX',
  },
}))

const metrics = computed<CpMetric[]>(() => [
  {
    label: copy.value.uniqueSolved,
    value: props.totalTlxSolved,
    sub: copy.value.problemsAccepted,
  },
  {
    label: copy.value.totalSubmissions,
    value: props.cpData?.platforms?.tlx?.totalSubmissions || CP_FALLBACK.tlxTotalSubmissions,
    sub: copy.value.submissionHistory,
  },
  {
    label: copy.value.acSubmissions,
    value: props.cpData?.platforms?.tlx?.totalAcSubmissions || CP_FALLBACK.tlxTotalAcSubmissions,
    sub: copy.value.acSubmissionsSub,
  },
])
</script>
