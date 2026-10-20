import cpData from '../../data/cp-data.json'

/**
 * Single source of truth for CP fallback values.
 *
 * These numbers are only used when live data is unavailable (initial render,
 * missing JSON fields, or standalone component usage). They are derived from
 * the synced CP snapshot so they can never drift from the committed data.
 */
const { overview, platforms } = cpData

export const CP_FALLBACK = {
  overviewTotalSolved: overview.totalSolved,
  overviewTotalSubmissions: overview.totalSubmissions,

  tlxTotalSolved: platforms.tlx.totalSolved,
  tlxTotalSubmissions: platforms.tlx.totalSubmissions,
  tlxTotalAcSubmissions: platforms.tlx.totalAcSubmissions,

  codeforcesTotalSolved: platforms.codeforces.totalSolved,
  codeforcesRating: platforms.codeforces.rating,
  codeforcesRank: platforms.codeforces.rank,
  codeforcesTotalSubmissions: platforms.codeforces.totalSubmissions,

  leetcodeTotalSolved: platforms.leetcode.totalSolved,
  leetcodeEasySolved: platforms.leetcode.easySolved,
  leetcodeMediumSolved: platforms.leetcode.mediumSolved,
  leetcodeHardSolved: platforms.leetcode.hardSolved,
  leetcodeRanking: platforms.leetcode.ranking,

  hackerrankTotalSolved: platforms.hackerrank.totalSolved,
} as const
