import type { CpHeatmapDay } from '../../types/cp.types'
import { buildHeatmapDays as buildDays, type HeatmapTooltipMetric } from '../heatmap'
import { cleanLanguage } from './formatting'

export const cpHeatmapMetrics = (day: CpHeatmapDay, isId: boolean): HeatmapTooltipMetric[] => {
  const tries = day?.tries ?? 0
  const ac = day?.ac ?? 0

  if (tries === 0 && ac === 0) {
    return [{ value: isId ? 'Tidak ada aktivitas' : 'No activity', color: 'slate' }]
  }

  return [
    { value: tries, label: isId ? 'Try' : 'Tries', color: 'sky' },
    { value: ac, label: 'AC', color: 'emerald' },
  ]
}

const cpHeatmapLevel = (count: number): number => {
  if (count > 0 && count <= 2) return 1
  if (count > 2 && count <= 6) return 2
  if (count > 6 && count <= 15) return 3
  if (count > 15) return 4
  return 0
}

export const buildCpHeatmap = (map: Record<string, any> = {}, daysBack = 364): CpHeatmapDay[] => {
  const days = buildDays(
    map,
    (entry) => {
      let tries = 0
      let ac = 0
      if (typeof entry === 'number') {
        tries = entry
      } else if (entry && typeof entry === 'object') {
        tries = Number(entry.tries || entry.count || 0)
        ac = Number(entry.ac || 0)
      }
      return { count: tries, tries, ac }
    },
    { daysBack, utcDate: true, levelFor: cpHeatmapLevel }
  )

  return days.map(({ date, count, tries, ac, level }) => ({
    date,
    count,
    tries: tries ?? 0,
    ac: ac ?? 0,
    level,
  }))
}

export const getPrimaryLanguage = (cpData: any) => {
  const overviewTop = cpData?.overview?.topLanguage
  if (overviewTop?.name && overviewTop?.count) {
    const name = overviewTop.name
    const count = Number(overviewTop.count)
    const formattedCount = count >= 1000 ? `${Math.floor(count / 1000)}K+` : `${count}+`
    return { name, count, formattedCount }
  }

  const counts: Record<string, number> = {}

  Object.entries(cpData?.platforms?.tlx?.languages || {}).forEach(([l, cnt]) => {
    const cleaned = cleanLanguage(l)
    counts[cleaned] = (counts[cleaned] || 0) + Number(cnt || 0)
  })

  const cfLangs = cpData?.platforms?.codeforces?.languages
  if (cfLangs && Object.keys(cfLangs).length > 0) {
    Object.entries(cfLangs).forEach(([l, cnt]) => {
      const cleaned = cleanLanguage(l)
      counts[cleaned] = (counts[cleaned] || 0) + Number(cnt || 0)
    })
  } else {
    const cfSubs = Number(cpData?.platforms?.codeforces?.totalSubmissions) || 0
    counts['C++20'] = (counts['C++20'] || 0) + cfSubs
  }

  ;(cpData?.platforms?.leetcode?.recentSolved || []).forEach((s: any) => {
    if (s.language) {
      const cleaned = cleanLanguage(s.language)
      counts[cleaned] = (counts[cleaned] || 0) + 1
    }
  })

  ;(cpData?.platforms?.hackerrank?.recentSolved || []).forEach((s: any) => {
    if (s.language) {
      const cleaned = cleanLanguage(s.language)
      counts[cleaned] = (counts[cleaned] || 0) + 1
    }
  })

  let maxLang = 'C++20'
  let maxCount = 0
  Object.entries(counts).forEach(([l, cnt]) => {
    if (cnt > maxCount) {
      maxCount = cnt
      maxLang = l
    }
  })

  if (maxCount <= 0) {
    maxCount = 1137
    maxLang = 'C++20'
  }

  const formattedCount = maxCount >= 1000 ? `${Math.floor(maxCount / 1000)}K+` : `${maxCount}+`
  return { name: maxLang, count: maxCount, formattedCount }
}
