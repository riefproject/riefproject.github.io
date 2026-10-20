import { computed, type Ref } from 'vue'
import { buildCpHeatmap, getPrimaryLanguage } from '../utils/cp/stats'
import { CP_FALLBACK } from '../utils/cp/defaults'
import { CP_PLATFORMS } from '../utils/cp/platforms'
import { buildMonths, toWeeks } from '../utils/heatmap'
import type { CpData } from '../types/cp.types'

export const useCpStats = (cpData: Ref<CpData | null>) => {
  const totalSolved = computed(() => cpData.value?.overview?.totalSolved || CP_FALLBACK.overviewTotalSolved)
  const totalSubmissions = computed(() => cpData.value?.overview?.totalSubmissions || CP_FALLBACK.overviewTotalSubmissions)
  const totalTlxSolved = computed(() => cpData.value?.platforms?.tlx?.totalSolved || CP_FALLBACK.tlxTotalSolved)
  const totalCfSolved = computed(() => cpData.value?.platforms?.codeforces?.totalSolved || CP_FALLBACK.codeforcesTotalSolved)
  const totalLcSolved = computed(() => cpData.value?.platforms?.leetcode?.totalSolved || CP_FALLBACK.leetcodeTotalSolved)
  const totalHrSolved = computed(() => cpData.value?.platforms?.hackerrank?.totalSolved || CP_FALLBACK.hackerrankTotalSolved)

  const primaryLanguage = computed(() => getPrimaryLanguage(cpData.value))

  const tabs = computed(() => [
    {
      key: 'overview' as const,
      labelEn: 'All Overview',
      labelId: 'Ringkasan Utama',
      icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
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
    totalSolved,
    totalSubmissions,
    totalTlxSolved,
    totalCfSolved,
    totalLcSolved,
    totalHrSolved,
    primaryLanguage,
    tabs,
    heatmapWeeks,
    heatmapMonths,
    totalSubmissionsInHeatmap,
  }
}
