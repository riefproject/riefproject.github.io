export type {
  CpPlatformKey,
  CpOverview,
  CpPlatformProfile,
  SubmissionItem,
  HeatmapDay,
  CpData,
} from '../../types/cp.types';

import type { HeatmapDay } from '../../types/cp.types';

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

export const buildCpHeatmap = (
  map: Record<string, any> = {},
  daysBack = 364,
): HeatmapDay[] => {
  const today = new Date();
  const days: HeatmapDay[] = [];

  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = map[dateStr];

    let tries = 0;
    let ac = 0;
    if (typeof entry === 'number') {
      tries = entry;
    } else if (entry && typeof entry === 'object') {
      tries = Number(entry.tries || entry.count || 0);
      ac = Number(entry.ac || 0);
    }

    let level = 0;
    if (tries > 0 && tries <= 2) level = 1;
    else if (tries > 2 && tries <= 6) level = 2;
    else if (tries > 6 && tries <= 15) level = 3;
    else if (tries > 15) level = 4;

    days.push({ date: dateStr, count: tries, tries, ac, level });
  }

  return days;
};

export const chunkIntoWeeks = (days: HeatmapDay[], size = 7): HeatmapDay[][] => {
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += size) {
    weeks.push(days.slice(i, i + size));
  }
  return weeks;
};

export const buildHeatmapMonths = (
  weeks: HeatmapDay[][],
): { name: string; percent: number }[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const res: { name: string; percent: number }[] = [];
  const totalWeeks = weeks.length;

  weeks.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date);
      if (d.getDate() <= 7) {
        res.push({
          name: months[d.getMonth()],
          percent: Math.round((idx / totalWeeks) * 100),
        });
      }
    }
  });

  return res;
};

export const getPrimaryLanguage = (cpData: any) => {
  const overviewTop = cpData?.overview?.topLanguage;
  if (overviewTop?.name && overviewTop?.count) {
    const name = overviewTop.name;
    const count = Number(overviewTop.count);
    const formattedCount = count >= 1000 ? `${Math.floor(count / 1000)}K+` : `${count}+`;
    return { name, count, formattedCount };
  }

  const counts: Record<string, number> = {};

  Object.entries(cpData?.platforms?.tlx?.languages || {}).forEach(([l, cnt]) => {
    const cleaned = cleanLanguage(l);
    counts[cleaned] = (counts[cleaned] || 0) + Number(cnt || 0);
  });

  const cfLangs = cpData?.platforms?.codeforces?.languages;
  if (cfLangs && Object.keys(cfLangs).length > 0) {
    Object.entries(cfLangs).forEach(([l, cnt]) => {
      const cleaned = cleanLanguage(l);
      counts[cleaned] = (counts[cleaned] || 0) + Number(cnt || 0);
    });
  } else {
    const cfSubs = Number(cpData?.platforms?.codeforces?.totalSubmissions) || 0;
    counts['C++20'] = (counts['C++20'] || 0) + cfSubs;
  }

  (cpData?.platforms?.leetcode?.recentSolved || []).forEach((s: any) => {
    if (s.language) {
      const cleaned = cleanLanguage(s.language);
      counts[cleaned] = (counts[cleaned] || 0) + 1;
    }
  });

  (cpData?.platforms?.hackerrank?.recentSolved || []).forEach((s: any) => {
    if (s.language) {
      const cleaned = cleanLanguage(s.language);
      counts[cleaned] = (counts[cleaned] || 0) + 1;
    }
  });

  let maxLang = 'C++20';
  let maxCount = 0;
  Object.entries(counts).forEach(([l, cnt]) => {
    if (cnt > maxCount) {
      maxCount = cnt;
      maxLang = l;
    }
  });

  if (maxCount <= 0) {
    maxCount = 1137;
    maxLang = 'C++20';
  }

  const formattedCount = maxCount >= 1000 ? `${Math.floor(maxCount / 1000)}K+` : `${maxCount}+`;
  return { name: maxLang, count: maxCount, formattedCount };
};

