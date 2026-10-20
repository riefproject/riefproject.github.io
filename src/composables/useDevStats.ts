import { computed, type Ref } from 'vue'
import { buildHeatmapDays, buildMonths, buildPlatformHeatmapDays, mergeHeatmaps, toWeeks } from '../utils/heatmap'
import type { DevActivityData, GitLanguage } from '../types/dev.types'
import { OVERVIEW_ICON } from '../utils/icons'

export const useDevStats = (devData: Ref<DevActivityData | null>) => {
  const github = computed(() => devData.value?.platforms?.github || devData.value?.github || {})
  const gitlab = computed(() => devData.value?.platforms?.gitlab || devData.value?.gitlab || {})

  const topLanguage = computed(() => {
    const langs = github.value?.languages
    return Array.isArray(langs) && langs.length > 0 ? langs[0].name : ''
  })

  const githubPrMerged = computed(() => Number(github.value?.prStats?.merged || 0))
  const gitlabMrMerged = computed(() => Number(gitlab.value?.stats?.mergeRequests?.merged ?? gitlab.value?.stats?.mergeRequestsMerged ?? 0))
  const gitlabMrOpened = computed(() => Number(gitlab.value?.stats?.mergeRequests?.opened ?? gitlab.value?.stats?.mergeRequestsOpened ?? 0))
  const prMerged = computed(() => githubPrMerged.value + gitlabMrMerged.value)

  const gitlabTotalEvents = computed(() => Number(gitlab.value?.stats?.totalEvents || 0))

  const totalContributions = computed(() => Number(github.value?.overview?.totalContributions || 0) + gitlabTotalEvents.value)
  const currentStreak = computed(() => Number(github.value?.overview?.currentStreak || 0))
  const lastYearContributions = computed(() => Number(github.value?.overview?.lastYearContributions || 0) + gitlabTotalEvents.value)
  const githubLastYear = computed(() => Number(github.value?.overview?.lastYearContributions || 0))

  const gitlabLanguages = computed(() => {
    const langs = gitlab.value?.stats?.languages || gitlab.value?.languages
    return Array.isArray(langs) ? langs.filter((l: GitLanguage) => l.percentage > 0) : []
  })

  const combinedMap = computed(() => mergeHeatmaps(github.value?.overview?.heatmap || {}, gitlab.value?.heatmap || {}))

  const heatmapDays = computed(() => buildHeatmapDays(combinedMap.value))
  const githubHeatmapDays = computed(() => buildPlatformHeatmapDays(github.value?.overview?.heatmap || {}, 'github'))
  const gitlabHeatmapDays = computed(() => buildPlatformHeatmapDays(gitlab.value?.heatmap || {}, 'gitlab'))

  const heatmapWeeks = computed(() => toWeeks(heatmapDays.value))
  const githubHeatmapWeeks = computed(() => toWeeks(githubHeatmapDays.value))
  const gitlabHeatmapWeeks = computed(() => toWeeks(gitlabHeatmapDays.value))

  const heatmapMonths = computed(() => buildMonths(heatmapWeeks.value))
  const githubHeatmapMonths = computed(() => buildMonths(githubHeatmapWeeks.value))
  const gitlabHeatmapMonths = computed(() => buildMonths(gitlabHeatmapWeeks.value))

  const tabs = computed(() => [
    {
      key: 'overview' as const,
      labelEn: 'All Overview',
      labelId: 'Ringkasan Utama',
      icon: OVERVIEW_ICON,
      count: `${totalContributions.value}+`,
    },
    {
      key: 'github' as const,
      labelEn: 'GitHub',
      labelId: 'GitHub',
      logo: '/img/stacks/github-dark.svg',
      logoLight: '/img/stacks/github-light.svg',
      count: github.value?.overview?.totalContributions || 0,
    },
    {
      key: 'gitlab' as const,
      labelEn: 'GitLab',
      labelId: 'GitLab',
      logo: '/img/stacks/gitlab-dark.svg',
      logoLight: '/img/stacks/gitlab-light.svg',
      count: gitlabTotalEvents.value || 0,
    },
  ])

  return {
    github,
    gitlab,
    topLanguage,
    githubPrMerged,
    gitlabMrMerged,
    gitlabMrOpened,
    prMerged,
    gitlabTotalEvents,
    totalContributions,
    currentStreak,
    lastYearContributions,
    githubLastYear,
    gitlabLanguages,
    heatmapWeeks,
    githubHeatmapWeeks,
    gitlabHeatmapWeeks,
    heatmapMonths,
    githubHeatmapMonths,
    gitlabHeatmapMonths,
    tabs,
  }
}
