<template>
  <CpPlatformTab
    platform="leetcode"
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
    totalLcSolved?: number
    isId?: boolean
  }>(),
  {
    totalLcSolved: CP_FALLBACK.leetcodeTotalSolved,
    isId: false,
  }
)

const columns: CpColumn[] = [{ key: 'category', labelEn: 'Category', labelId: 'Kategori' }]

const copy = computed(() => {
  const id = props.isId
  return {
    easySub: id ? 'Fondasi & Dasar DSA' : 'DSA Foundations & Basics',
    mediumSub: id ? 'Problem Solving Inti' : 'Core Problem Solving',
    hardSub: id ? 'Kompleksitas Lanjutan' : 'Advanced Complexity',
  }
})

const platformCopy = computed<CpPlatformCopy>(() => ({
  solvedTitle: { en: 'Solved LeetCode Problems', id: 'Soal LeetCode yang Diselesaikan' },
  cta: {
    en: `View All ${props.totalLcSolved} LeetCode Problems on Dedicated Page →`,
    id: `Lihat Seluruh ${props.totalLcSolved} Soal LeetCode di Halaman Khusus →`,
  },
  openTitle: { en: 'Open on LeetCode', id: 'Buka di LeetCode' },
}))

const metrics = computed<CpMetric[]>(() => [
  {
    label: 'Easy Solved',
    value: props.cpData?.platforms?.leetcode?.easySolved || CP_FALLBACK.leetcodeEasySolved,
    sub: copy.value.easySub,
  },
  {
    label: 'Medium Solved',
    value: props.cpData?.platforms?.leetcode?.mediumSolved || CP_FALLBACK.leetcodeMediumSolved,
    sub: copy.value.mediumSub,
  },
  {
    label: 'Hard Solved',
    value: props.cpData?.platforms?.leetcode?.hardSolved || CP_FALLBACK.leetcodeHardSolved,
    sub: copy.value.hardSub,
  },
])
</script>
