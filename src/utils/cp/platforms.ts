import type { CpPlatformKey } from '../../types/cp.types'

export interface CpPlatformMeta {
  key: CpPlatformKey
  name: string
  overviewName: string
  short: string
  logo: string
  handleFallback: string
  archiveHref: string
  profileUrl: (handle: string) => string
  descriptionEn: string
  descriptionId: string
  archiveLabelEn: string
  archiveLabelId: string
  profileLabelEn: string
  profileLabelId: string
}

export const CP_PLATFORM_KEYS: CpPlatformKey[] = ['tlx', 'codeforces', 'leetcode', 'hackerrank']

export const CP_PLATFORMS: Record<CpPlatformKey, CpPlatformMeta> = {
  tlx: {
    key: 'tlx',
    name: 'TLX (TOKI Learning Center)',
    overviewName: 'TOKI Learning Center',
    short: 'TLX',
    logo: '/img/tlx/tlx.webp',
    handleFallback: 'aycaaa',
    archiveHref: '/competitive-programming/problems?platform=tlx',
    profileUrl: (handle) => `https://tlx.toki.id/profiles/${handle}`,
    descriptionEn: 'Official platform of the Indonesian Informatics Olympiad Alumni Association (IA-TOKI).',
    descriptionId: 'Platform resmi Ikatan Alumni Tim Olimpiade Komputer Indonesia (IA-TOKI).',
    archiveLabelEn: 'Open TLX Archive (194)',
    archiveLabelId: 'Buka Koleksi TLX (194 Soal)',
    profileLabelEn: 'TLX Profile ↗',
    profileLabelId: 'Profil TLX ↗',
  },
  codeforces: {
    key: 'codeforces',
    name: 'Codeforces',
    overviewName: 'Codeforces',
    short: 'Codeforces',
    logo: '/img/codeforces/codeforces.webp',
    handleFallback: 'feeera',
    archiveHref: '/competitive-programming/problems?platform=codeforces',
    profileUrl: (handle) => `https://codeforces.com/profile/${handle}`,
    descriptionEn: 'Global algorithm competition and international olympiad platform.',
    descriptionId: 'Platform kompetisi algoritma global dan olimpiade internasional.',
    archiveLabelEn: 'Open CF Archive (50)',
    archiveLabelId: 'Buka Koleksi CF (50 Soal)',
    profileLabelEn: 'Codeforces Profile ↗',
    profileLabelId: 'Profil Codeforces ↗',
  },
  leetcode: {
    key: 'leetcode',
    name: 'LeetCode',
    overviewName: 'LeetCode',
    short: 'LeetCode',
    logo: '/img/leetcode/leetcode.webp',
    handleFallback: 'fsaree',
    archiveHref: '/competitive-programming/problems?platform=leetcode',
    profileUrl: (handle) => `https://leetcode.com/u/${handle}`,
    descriptionEn: 'Data Structures & Algorithms practice platform for software engineering technical preparation.',
    descriptionId: 'Platform latihan Data Structures & Algorithms untuk persiapan teknikal software engineer.',
    archiveLabelEn: 'Open LeetCode Archive (59)',
    archiveLabelId: 'Buka Koleksi LeetCode (59 Soal)',
    profileLabelEn: 'LeetCode Profile ↗',
    profileLabelId: 'Profil LeetCode ↗',
  },
  hackerrank: {
    key: 'hackerrank',
    name: 'HackerRank',
    overviewName: 'HackerRank',
    short: 'HackerRank',
    logo: '/img/hackerrank/HackerRank.webp',
    handleFallback: 'areee',
    archiveHref: '/competitive-programming/problems?platform=hackerrank',
    profileUrl: (handle) => `https://www.hackerrank.com/profile/${handle}`,
    descriptionEn: 'Evaluation platform for programming skills, SQL, problem solving, and languages.',
    descriptionId: 'Platform evaluasi kemampuan programming, SQL, problem solving, dan bahasa pemrograman.',
    archiveLabelEn: 'Open HackerRank Archive (138+)',
    archiveLabelId: 'Buka Koleksi HackerRank (138+ Challenges)',
    profileLabelEn: 'HackerRank Profile ↗',
    profileLabelId: 'Profil HackerRank ↗',
  },
}

export const getPlatformLogo = (platform: string): string => CP_PLATFORMS[platform as CpPlatformKey]?.logo ?? CP_PLATFORMS.tlx.logo
export const getPlatformName = (platform: string): string => CP_PLATFORMS[platform as CpPlatformKey]?.short ?? platform?.toUpperCase() ?? ''

export type PlatformCategory = { key: string; label: string; icon?: string }

export const buildPlatformCategories = (counts: Partial<Record<CpPlatformKey, number>> & { all?: number }, isId: boolean): PlatformCategory[] => [
  {
    key: 'all',
    label: `${isId ? 'Semua Platform' : 'All Platforms'} (${counts.all ?? 0})`,
  },
  ...CP_PLATFORM_KEYS.map((key) => ({
    key,
    label: `${CP_PLATFORMS[key].short} (${counts[key] ?? 0})`,
    icon: CP_PLATFORMS[key].logo,
  })),
]
