export interface SubmissionItem {
  id?: string | number;
  title: string;
  url?: string;
  platform?: string;
  category?: string;
  difficulty?: string | number;
  language?: string;
  status?: string;
  solvedAt?: string;
}

export interface HeatmapDay {
  date: string;
  count: number;
  tries: number;
  ac: number;
  level: number;
}

export const cleanLanguage = (lang: string): string => {
  if (!lang) return '-';
  if (lang.includes('Cpp20') || lang.includes('C++20')) return 'C++20';
  if (lang.includes('Cpp23') || lang.includes('C++23')) return 'C++23';
  if (lang.includes('Rust')) return 'Rust';
  if (lang.includes('Pascal')) return 'Pascal';
  if (lang.includes('Java')) return 'Java';
  if (lang.includes('Python')) return 'Python';
  if (lang.includes('SQL') || lang.includes('Sql')) return 'SQL';
  if (lang.includes('C') && !lang.includes('C++')) return 'C';
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

export const formatExactDate = (isoString?: string, isId: boolean = false): string => {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return date.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatRelativeTime = (isoString?: string, isId: boolean = false): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return isId ? 'baru saja' : 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;

  return date.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTooltipHeaderDate = (dateStr: string, isId: boolean = false): string => {
  const dateObj = new Date(dateStr + 'T00:00:00');
  return dateObj.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

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
