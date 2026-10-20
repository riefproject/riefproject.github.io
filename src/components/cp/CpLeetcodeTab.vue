<template>
  <CpPlatformTab
    platform="leetcode"
    :cpData="cpData"
    :columns="columns"
    :isId="isId"
    solved-title-en="Solved LeetCode Problems"
    solved-title-id="Soal LeetCode yang Diselesaikan"
    archive-href="/competitive-programming/problems?platform=leetcode"
    :cta-en="`View All ${totalLcSolved} LeetCode Problems on Dedicated Page →`"
    :cta-id="`Lihat Seluruh ${totalLcSolved} Soal LeetCode di Halaman Khusus →`"
    open-title-en="Open on LeetCode"
    open-title-id="Buka di LeetCode">
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
    totalLcSolved?: number
    isId?: boolean
  }>(),
  {
    totalLcSolved: CP_FALLBACK.leetcodeTotalSolved,
    isId: false,
  }
)

const columns: CpColumn[] = [{ key: 'category', labelEn: 'Category', labelId: 'Kategori' }]

const metrics = computed<CpMetric[]>(() => [
  {
    label: 'Easy Solved',
    value: props.cpData?.platforms?.leetcode?.easySolved || CP_FALLBACK.leetcodeEasySolved,
    sub: props.isId ? 'Fondasi & Dasar DSA' : 'DSA Foundations & Basics',
  },
  {
    label: 'Medium Solved',
    value: props.cpData?.platforms?.leetcode?.mediumSolved || CP_FALLBACK.leetcodeMediumSolved,
    sub: props.isId ? 'Problem Solving Inti' : 'Core Problem Solving',
  },
  {
    label: 'Hard Solved',
    value: props.cpData?.platforms?.leetcode?.hardSolved || CP_FALLBACK.leetcodeHardSolved,
    sub: props.isId ? 'Kompleksitas Lanjutan' : 'Advanced Complexity',
  },
])
</script>
