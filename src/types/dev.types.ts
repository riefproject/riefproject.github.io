import type { HeatmapDay } from '../utils/heatmap'

export interface GitUser {
  login?: string
  name?: string
  avatarUrl?: string
  url?: string
  company?: string | null
  bio?: string | null
  location?: string | null
  followers?: number
  following?: number
  publicRepos?: number
}

export interface GitRepo {
  name: string
  fullName?: string
  url?: string
  description?: string
  language?: string
  stars?: number
  forks?: number
}

export interface GitLanguage {
  name: string
  percentage: number
}

export interface GitPlatformStats {
  totalContributions?: number
  lastYearContributions?: number
  currentStreak?: number
  longestStreak?: number
  totalEvents?: number
  daysActive?: number
  yearlyTotal?: Record<string, number>
  prStats?: {
    total?: number
    merged?: number
    open?: number
    closed?: number
  }
  mergeRequests?: {
    total?: number
    merged?: number
    opened?: number
    open?: number
    closed?: number
  }
  mergeRequestsMerged?: number
  mergeRequestsOpened?: number
  languages?: GitLanguage[]
  heatmap?: Record<string, { count?: number; github?: number; gitlab?: number } | number>
}

export interface DevPlatformProfile {
  handle?: string
  user?: GitUser
  overview?: GitPlatformStats
  stats?: GitPlatformStats
  prStats?: {
    total?: number
    merged?: number
    open?: number
    closed?: number
  }
  heatmap?: Record<string, { count?: number; github?: number; gitlab?: number } | number>
  languages?: GitLanguage[]
  topRepos?: GitRepo[]
}

export interface DevActivityData {
  meta?: {
    updatedAt?: string
    version?: string
  }
  overview?: {
    totalContributions?: number
    lastYearContributions?: number
    currentStreak?: number
    longestStreak?: number
    prMerged?: number
    topLanguage?: string
    heatmap?: Record<string, number>
    yearlyTotal?: Record<string, number>
  }
  platforms?: {
    github?: DevPlatformProfile
    gitlab?: DevPlatformProfile
  }
  github?: DevPlatformProfile
  gitlab?: DevPlatformProfile
  heatmapWeeks?: HeatmapDay[][]
  heatmapMonths?: Array<{ name: string; percent: number }>
}
