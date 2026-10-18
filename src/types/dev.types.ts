export interface GitPlatformStats {
  totalContributions?: number;
  totalEvents?: number;
  daysActive?: number;
  prStats?: {
    merged?: number;
    open?: number;
    closed?: number;
  };
  mergeRequests?: {
    merged?: number;
    open?: number;
    closed?: number;
  };
  languages?: Record<string, number>;
}

export interface DevPlatformProfile {
  handle?: string;
  overview?: GitPlatformStats;
  stats?: GitPlatformStats;
}

export interface DevActivityData {
  meta?: {
    updatedAt?: string;
    version?: string;
  };
  overview?: {
    totalContributions?: number;
    currentStreak?: number;
    prMerged?: number;
    topLanguage?: string;
  };
  platforms?: {
    github?: DevPlatformProfile;
    gitlab?: DevPlatformProfile;
  };
  heatmapWeeks?: any[][];
  heatmapMonths?: Array<{ name: string; percent: number }>;
}
