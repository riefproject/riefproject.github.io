export const getPlatformLogo = (platform: string): string => {
  switch (platform) {
    case 'tlx': return '/img/tlx/tlx.webp';
    case 'codeforces': return '/img/codeforces/codeforces.webp';
    case 'leetcode': return '/img/leetcode/leetcode.webp';
    case 'hackerrank': return '/img/hackerrank/HackerRank.webp';
    default: return '/img/tlx/tlx.webp';
  }
};

export const getPlatformName = (platform: string): string => {
  switch (platform) {
    case 'tlx': return 'TLX';
    case 'codeforces': return 'Codeforces';
    case 'leetcode': return 'LeetCode';
    case 'hackerrank': return 'HackerRank';
    default: return platform?.toUpperCase() || '';
  }
};
