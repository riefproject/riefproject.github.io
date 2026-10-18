export type {
  CpPlatformKey,
  CpOverview,
  CpPlatformProfile,
  SubmissionItem,
  HeatmapDay,
  CpData,
} from '../../types/cp.types';

export const cleanLanguage = (lang: string): string => {
  if (!lang) return '-';
  if (lang.includes('Cpp20') || lang.includes('C++20')) return 'C++20';
  if (lang.includes('Cpp23') || lang.includes('C++23')) return 'C++23';
  if (lang.includes('Cpp17') || lang.includes('C++17')) return 'C++17';
  if (lang.includes('Cpp11') || lang.includes('C++11')) return 'C++11';
  if (lang.includes('Cpp14') || lang.includes('C++14')) return 'C++14';
  if (lang.includes('Rust')) return 'Rust';
  if (lang.includes('Pascal')) return 'Pascal';
  if (lang.includes('PostgreSQL') || lang.includes('postgres') || lang.includes('Postgres')) return 'PostgreSQL';
  if (lang.includes('MySQL') || lang.includes('mysql')) return 'MySQL';
  if (lang.includes('SQL') || lang.includes('Sql')) return 'SQL';
  if (lang.includes('Java') && !lang.includes('JavaScript')) return 'Java';
  if (lang.includes('Python')) return 'Python';
  if (lang.includes('C++') || lang.includes('Cpp') || lang.toLowerCase() === 'cpp') return 'C++20';
  if (lang.includes('C') && !lang.includes('C++') && !lang.includes('C#')) return 'C';
  return lang;
};

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

export const getDiffClass = (diff: any): string => {
  if (!diff) return 'normal';
  const str = String(diff).toLowerCase();
  if (str.includes('easy') || str === '800' || str === '900') return 'easy';
  if (str.includes('medium') || str === '1000' || str === '1100' || str === '1200' || str === '1300') return 'medium';
  if (str.includes('hard') || parseInt(str, 10) >= 1400) return 'hard';
  return 'normal';
};

export { formatExactDate, formatRelativeTime, formatTooltipHeaderDate } from '../../utils/activityDateUtils';

export const getPageNumbersHelper = (totalPages: number, currentPage: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 2) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    if (!pages.includes(totalPages)) pages.push(totalPages);
  }
  return pages;
};
