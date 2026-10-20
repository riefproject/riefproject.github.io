import { computed, type Ref } from 'vue'
import { CP_FALLBACK } from '../utils/cp/defaults'
import type { CpData } from '../types/cp.types'

/**
 * Lightweight CP totals for components that do not need the heatmap or tabs.
 * Keeps the canonical fallback values in one place.
 */
export const useCpSummary = (cpData: Ref<CpData | null>) => {
  const totalSolved = computed(() => cpData.value?.overview?.totalSolved || CP_FALLBACK.overviewTotalSolved)
  const totalSubmissions = computed(() => cpData.value?.overview?.totalSubmissions || CP_FALLBACK.overviewTotalSubmissions)
  const totalTlxSolved = computed(() => cpData.value?.platforms?.tlx?.totalSolved || CP_FALLBACK.tlxTotalSolved)
  const totalCfSolved = computed(() => cpData.value?.platforms?.codeforces?.totalSolved || CP_FALLBACK.codeforcesTotalSolved)
  const totalLcSolved = computed(() => cpData.value?.platforms?.leetcode?.totalSolved || CP_FALLBACK.leetcodeTotalSolved)
  const totalHrSolved = computed(() => cpData.value?.platforms?.hackerrank?.totalSolved || CP_FALLBACK.hackerrankTotalSolved)

  return {
    totalSolved,
    totalSubmissions,
    totalTlxSolved,
    totalCfSolved,
    totalLcSolved,
    totalHrSolved,
  }
}
