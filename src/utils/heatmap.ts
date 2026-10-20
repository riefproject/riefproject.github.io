export interface HeatmapTooltipMetric {
  value: number | string
  label?: string
  logo?: string
  logoLight?: string
  color?: 'sky' | 'emerald' | 'orange' | 'purple' | 'amber' | 'slate' | 'neutral' | string
}

export interface HeatmapDay {
  date: string
  count: number
  tries?: number
  ac?: number
  github?: number
  gitlab?: number
  level: number
  metrics?: HeatmapTooltipMetric[]
}

export const HEATMAP_LEVEL_THRESHOLDS = [2, 6, 14] as const

export const DEFAULT_HEATMAP_DAYS = 364

export const getHeatmapLevel = (count: number): number => {
  if (count <= 0) return 0
  const level = HEATMAP_LEVEL_THRESHOLDS.findIndex((max) => count <= max)
  return level === -1 ? 4 : level + 1
}

export type HeatmapEntryValue =
  | number
  | {
      count?: number
      tries?: number
      ac?: number
      github?: number
      gitlab?: number
    }

export type HeatmapMap = Record<string, HeatmapEntryValue>

type HeatmapExtracted = {
  count: number
  tries?: number
  ac?: number
  github?: number
  gitlab?: number
}

const defaultExtract = (v: HeatmapEntryValue | undefined): HeatmapExtracted => {
  if (typeof v === 'number') return { count: v }
  if (v && typeof v === 'object') {
    const result: HeatmapExtracted = { count: Number(v.count || v.tries || 0) }
    if (typeof v.tries === 'number') result.tries = v.tries
    if (typeof v.ac === 'number') result.ac = v.ac
    if (typeof v.github === 'number') result.github = v.github
    if (typeof v.gitlab === 'number') result.gitlab = v.gitlab
    return result
  }
  return { count: 0 }
}

export const buildHeatmapDays = (
  map: HeatmapMap = {},
  extract: (v: HeatmapEntryValue | undefined) => HeatmapExtracted = defaultExtract,
  options: {
    daysBack?: number
    utcDate?: boolean
    levelFor?: (count: number) => number
  } = {}
): HeatmapDay[] => {
  const { daysBack = DEFAULT_HEATMAP_DAYS, utcDate = false, levelFor = getHeatmapLevel } = options
  const today = new Date()
  const days: HeatmapDay[] = []

  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr =
      utcDate ?
        d.toISOString().slice(0, 10)
      : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const entry = map?.[dateStr]
    const data = extract(entry)

    const item: HeatmapDay = {
      date: dateStr,
      count: data.count,
      level: levelFor(data.count),
    }
    if (typeof data.tries === 'number') item.tries = data.tries
    if (typeof data.ac === 'number') item.ac = data.ac
    if (typeof data.github === 'number') item.github = data.github
    if (typeof data.gitlab === 'number') item.gitlab = data.gitlab

    days.push(item)
  }
  return days
}

const entryCount = (entry: HeatmapEntryValue | undefined): number => (typeof entry === 'object' ? Number(entry?.count || 0) : Number(entry || 0))

export const mergeHeatmaps = (
  githubMap: HeatmapMap = {},
  gitlabMap: HeatmapMap = {}
): Record<string, { count: number; github: number; gitlab: number }> => {
  const out: Record<string, { count: number; github: number; gitlab: number }> = {}
  const keys = new Set([...Object.keys(githubMap), ...Object.keys(gitlabMap)])
  keys.forEach((key) => {
    const ghCount = entryCount(githubMap[key])
    const glCount = entryCount(gitlabMap[key])
    out[key] = { count: ghCount + glCount, github: ghCount, gitlab: glCount }
  })
  return out
}

export type ActivityHeatmapFilter = 'all' | 'dev' | 'cp'

export interface ActivityHeatmapEntry {
  count: number
  github: number
  gitlab: number
  ac: number
  tries: number
}

/**
 * Merges GitHub, GitLab, and CP heatmaps for the unified activity page.
 * CP maps use `tries`/`ac`, while dev maps use `count` (or a plain number).
 */
export const mergeActivityHeatmaps = (
  githubMap: HeatmapMap = {},
  gitlabMap: HeatmapMap = {},
  cpMap: HeatmapMap = {},
  filter: ActivityHeatmapFilter = 'all'
): Record<string, ActivityHeatmapEntry> => {
  const out: Record<string, ActivityHeatmapEntry> = {}
  const keys = new Set([...Object.keys(githubMap), ...Object.keys(gitlabMap), ...Object.keys(cpMap)])

  keys.forEach((key) => {
    const ghCount = entryCount(githubMap[key])
    const glCount = entryCount(gitlabMap[key])
    const cpEntry = cpMap[key]
    const cpIsObject = typeof cpEntry === 'object' && cpEntry !== null
    const cpTries =
      cpIsObject ? Number(cpEntry.tries || 0)
      : typeof cpEntry === 'number' ? cpEntry
      : 0
    const cpAc = cpIsObject ? Number(cpEntry.ac || 0) : 0
    const devTotal = ghCount + glCount

    out[key] = {
      count:
        filter === 'all' ? devTotal + cpTries
        : filter === 'dev' ? devTotal
        : cpTries,
      github: filter !== 'cp' ? ghCount : 0,
      gitlab: filter !== 'cp' ? glCount : 0,
      ac: filter !== 'dev' ? cpAc : 0,
      tries: filter !== 'dev' ? cpTries : 0,
    }
  })

  return out
}

export const buildPlatformHeatmapDays = (map: HeatmapMap = {}, platform: 'github' | 'gitlab'): HeatmapDay[] =>
  buildHeatmapDays(map, (entry) => {
    const count = typeof entry === 'object' ? Number(entry?.count || 0) : Number(entry || 0)
    return { count, [platform]: count }
  })

export const toWeeks = <T>(days: T[], size = 7): T[][] => {
  const weeks: T[][] = []
  for (let i = 0; i < days.length; i += size) {
    weeks.push(days.slice(i, i + size))
  }
  return weeks
}

export const buildMonths = <T extends { date: string }>(weeks: T[][]): Array<{ name: string; percent: number }> => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const res: { name: string; percent: number }[] = []
  const totalWeeks = weeks.length

  weeks.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date)
      if (d.getDate() <= 7) {
        res.push({
          name: months[d.getMonth()],
          percent: Math.round((idx / totalWeeks) * 100),
        })
      }
    }
  })
  return res
}

const DEV_LOGOS = {
  github: { logo: '/img/stacks/github-dark.svg', logoLight: '/img/stacks/github-light.svg' },
  gitlab: { logo: '/img/stacks/gitlab-dark.svg', logoLight: '/img/stacks/gitlab-light.svg' },
}

export const devHeatmapMetrics = (day: HeatmapDay, isId: boolean): HeatmapTooltipMetric[] => {
  const list: HeatmapTooltipMetric[] = []

  if (day.github && day.github > 0) {
    list.push({
      value: day.github,
      label: isId ? 'kontribusi' : 'contributions',
      ...DEV_LOGOS.github,
      color: 'neutral',
    })
  }

  if (day.gitlab && day.gitlab > 0) {
    list.push({
      value: day.gitlab,
      label: isId ? 'event' : 'events',
      ...DEV_LOGOS.gitlab,
      color: 'orange',
    })
  }

  if (list.length === 0) {
    return [
      {
        value: isId ? 'Tidak ada kontribusi' : 'No contributions',
        color: 'slate',
      },
    ]
  }

  return list
}
