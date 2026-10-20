const buildCpFallback = (cpData) => {
  const { overview, platforms } = cpData

  return {
    overviewTotalSolved: overview.totalSolved,
    overviewTotalSubmissions: overview.totalSubmissions,
    primaryLanguageName: overview.topLanguage?.name || 'C++20',
    primaryLanguageCount: overview.topLanguage?.count || 0,

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
  }
}

module.exports = { buildCpFallback }
