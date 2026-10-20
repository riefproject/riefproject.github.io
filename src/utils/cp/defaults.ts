/**
 * Single source of truth for CP fallback values.
 *
 * These numbers are only used when live data is unavailable (initial render,
 * missing JSON fields, or standalone component usage). Keeping them in one place
 * prevents the previously inconsistent copies across tabs, composables, and
 * Astro sections.
 */
export const CP_FALLBACK = {
  overviewTotalSolved: 754,
  overviewTotalSubmissions: 1528,

  tlxTotalSolved: 437,
  tlxTotalSubmissions: 561,
  tlxTotalAcSubmissions: 215,

  codeforcesTotalSolved: 68,
  codeforcesRating: 625,
  codeforcesRank: 'newbie',
  codeforcesTotalSubmissions: 148,

  leetcodeTotalSolved: 102,
  leetcodeEasySolved: 32,
  leetcodeMediumSolved: 24,
  leetcodeHardSolved: 3,
  leetcodeRanking: 2367686,

  hackerrankTotalSolved: 147,
} as const
