import { describe, expect, it } from 'vitest'
import { buildHeatmapDays, buildPlatformHeatmapDays, getHeatmapLevel, mergeHeatmaps, toWeeks } from './heatmap'

describe('getHeatmapLevel', () => {
  it('maps counts to the five intensity levels', () => {
    expect(getHeatmapLevel(0)).toBe(0)
    expect(getHeatmapLevel(1)).toBe(1)
    expect(getHeatmapLevel(2)).toBe(1)
    expect(getHeatmapLevel(3)).toBe(2)
    expect(getHeatmapLevel(7)).toBe(3)
    expect(getHeatmapLevel(15)).toBe(4)
  })
})

describe('buildHeatmapDays', () => {
  it('fills a continuous range and extracts count/tries/ac', () => {
    const today = new Date().toISOString().slice(0, 10)
    const days = buildHeatmapDays({ [today]: { tries: 4, ac: 2 } }, undefined, { daysBack: 3, utcDate: true })

    expect(days).toHaveLength(3)
    expect(days[2]).toMatchObject({
      date: today,
      count: 4,
      tries: 4,
      ac: 2,
      level: 2,
    })
    expect(days[0]).toMatchObject({ count: 0, level: 0 })
  })

  it('accepts a custom extractor', () => {
    const today = new Date().toISOString().slice(0, 10)
    const days = buildHeatmapDays({ [today]: 9 }, (value) => ({ count: Number(value) * 2 }), { daysBack: 1, utcDate: true })

    expect(days[0].count).toBe(18)
  })
})

describe('mergeHeatmaps', () => {
  it('combines both platforms and preserves per-platform counts', () => {
    expect(mergeHeatmaps({ '2026-01-01': 2 }, { '2026-01-01': { count: 3 }, '2026-01-02': 1 })).toEqual({
      '2026-01-01': { count: 5, github: 2, gitlab: 3 },
      '2026-01-02': { count: 1, github: 0, gitlab: 1 },
    })
  })
})

describe('buildPlatformHeatmapDays', () => {
  it('annotates days with the requested platform field', () => {
    const today = buildPlatformHeatmapDays({}, 'gitlab').at(-1)?.date
    const days = buildPlatformHeatmapDays({ [today as string]: 4 }, 'gitlab')

    expect(days.at(-1)).toMatchObject({ count: 4, gitlab: 4 })
  })
})

describe('toWeeks', () => {
  it('chunks items into seven-day weeks', () => {
    expect(toWeeks([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([[1, 2, 3, 4, 5, 6, 7], [8]])
  })
})
