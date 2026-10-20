import { computed, type Ref } from 'vue'
import { buildCpHeatmap, getPrimaryLanguage } from '../utils/cp/stats'
import { CP_PLATFORMS } from '../utils/cp/platforms'
import { buildMonths, toWeeks } from '../utils/heatmap'
import { useCpSummary } from './useCpSummary'
import { OVERVIEW_ICON } from '../utils/icons'
import type { CpData } from '../types/cp.types'

export const useCpStats = (cpData: Ref<CpData | null>) => {
  const summary = useCpSummary(cpData)
  const { totalSolved, totalTlxSolved, totalCfSolved, totalLcSolved, totalHrSolved } = summary

  const primaryLanguage = computed(() => getPrimaryLanguage(cpData.value))

  const tabs = computed(() => [
    {
      key: 'overview' as const,
      labelEn: 'All Overview',
      labelId: 'Ringkasan Utama',
      icon: OVERVIEW_ICON,
      count: `${totalSolved.value}+`,
    },
    {
      key: 'tlx' as const,
      labelEn: 'TLX (TOKI)',
      labelId: 'TLX (TOKI)',
      logo: CP_PLATFORMS.tlx.logo,
      count: totalTlxSolved.value,
    },
    {
      key: 'codeforces' as const,
      labelEn: 'Codeforces',
      labelId: 'Codeforces',
      logo: CP_PLATFORMS.codeforces.logo,
      count: totalCfSolved.value,
    },
    {
      key: 'leetcode' as const,
      labelEn: 'LeetCode',
      labelId: 'LeetCode',
      logo: CP_PLATFORMS.leetcode.logo,
      logoLight: CP_PLATFORMS.leetcode.logoLight,
      count: totalLcSolved.value,
    },
    {
      key: 'hackerrank' as const,
      labelEn: 'HackerRank',
      labelId: 'HackerRank',
      logo: CP_PLATFORMS.hackerrank.logo,
      count: `${totalHrSolved.value}+`,
    },
  ])

  const heatmapData = computed(() => buildCpHeatmap(cpData.value?.overview?.heatmap || {}))
  const heatmapWeeks = computed(() => toWeeks(heatmapData.value))
  const heatmapMonths = computed(() => buildMonths(heatmapWeeks.value))
  const totalSubmissionsInHeatmap = computed(() => heatmapData.value.reduce((acc, d) => acc + d.tries, 0))

  return {
    ...summary,
    primaryLanguage,
    tabs,
    heatmapWeeks,
    heatmapMonths,
    totalSubmissionsInHeatmap,
  }
}
