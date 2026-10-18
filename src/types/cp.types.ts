export type CpPlatformKey = 'tlx' | 'codeforces' | 'leetcode' | 'hackerrank';

export interface CpOverview {
  totalSolved: number;
  totalSubmissions: number;
  activePlatforms: number;
  primaryLanguage: {
    name: string;
    count: number;
  };
  lastSynced?: string;
}

export interface CpPlatformProfile {
  handle: string;
  totalSolved?: number;
  totalSubmissions?: number;
  rating?: number | string;
  rank?: string;
  maxRating?: number;
  badgesCount?: number;
  points?: number;
  stars?: number;
  easy?: number;
  medium?: number;
  hard?: number;
  languages?: Record<string, number>;
}

export interface SubmissionItem {
  id?: string | number;
  title: string;
  url?: string;
  platform?: CpPlatformKey | string;
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

export interface CpData {
  overview?: CpOverview;
  platforms?: Record<string, CpPlatformProfile>;
  recentGlobalFeed?: SubmissionItem[];
  heatmapWeeks?: any[];
  heatmapMonths?: any[];
  totalSubmissionsInHeatmap?: number;
}
