import type { HeatmapDay } from '../utils/heatmap'
import type { LocaleText } from '../utils/i18n'

export type CpPlatformKey = 'tlx' | 'codeforces' | 'leetcode' | 'hackerrank'

export type CpPlatformCopy = {
  solvedTitle: LocaleText
  cta: LocaleText
  titleColumn?: LocaleText
  itemNoun?: LocaleText
  openTitle?: LocaleText
}

export type CpTableCopy = {
  titleColumn: LocaleText
  timeColumn: LocaleText
  openTitle: LocaleText
}
export type CpColumnKey = 'category' | 'difficulty' | 'language'

export interface CpColumn {
  key: CpColumnKey
  labelEn: string
  labelId: string
}

export interface CpMetric {
  label: string
  value: string | number
  sub?: string
  subPrefix?: string
  subHighlight?: string
}

export interface CpOverview {
  totalSolved?: number
  totalSubmissions?: number
  activePlatforms?: number
  topLanguage?: { name: string; count: number }
  primaryLanguage?: { name: string; count: number }
  lastSynced?: string
  heatmap?: Record<string, { count?: number; tries?: number; ac?: number } | number>
}

export interface CpRecentSolved {
  id?: string | number
  title?: string
  url?: string
  platform?: CpPlatformKey | string
  category?: string
  difficulty?: string | number
  language?: string
  solvedAt?: string
}

export interface CpTrackScore {
  slug: string
  name: string
  score: number
  rank?: number
}

export interface CpBadge {
  name: string
  stars: number
  solved: number
}

export interface CpPlatformProfile {
  handle?: string
  totalSolved?: number
  totalSubmissions?: number
  totalAcSubmissions?: number
  rating?: number | string
  maxRating?: number
  rank?: string
  ranking?: number
  badgesCount?: number
  points?: number
  stars?: number
  easySolved?: number
  mediumSolved?: number
  hardSolved?: number
  languages?: Record<string, number>
  tagsCount?: Record<string, number>
  trackScores?: CpTrackScore[]
  badges?: CpBadge[]
  recentSolved?: CpRecentSolved[]
}

export interface SubmissionItem {
  id?: string | number
  title: string
  url?: string
  platform?: CpPlatformKey | string
  category?: string
  difficulty?: string | number
  language?: string
  status?: string
  solvedAt?: string
}

export interface CpHeatmapDay extends HeatmapDay {
  tries: number
  ac: number
}

export interface CpData {
  meta?: { updatedAt?: string; version?: string }
  overview?: CpOverview
  platforms?: Partial<Record<CpPlatformKey, CpPlatformProfile>>
  recentGlobalFeed?: SubmissionItem[]
  totalSubmissionsInHeatmap?: number
}
