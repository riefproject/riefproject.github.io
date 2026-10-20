import { describe, expect, it } from 'vitest'
import { matchesProblemSearch } from './search'
import type { SubmissionItem } from '../../types/cp.types'

const problem: SubmissionItem = {
  title: 'Two Sum',
  platform: 'leetcode',
  category: 'Array',
  difficulty: 1,
  language: 'C++20',
}

describe('matchesProblemSearch', () => {
  it('matches title, category, platform, language, and difficulty', () => {
    expect(matchesProblemSearch(problem, 'two')).toBe(true)
    expect(matchesProblemSearch(problem, 'array')).toBe(true)
    expect(matchesProblemSearch(problem, 'leetcode')).toBe(true)
    expect(matchesProblemSearch(problem, 'c++')).toBe(true)
    expect(matchesProblemSearch(problem, '1')).toBe(true)
  })

  it('is case-insensitive because callers normalize the term', () => {
    expect(matchesProblemSearch({ ...problem, title: 'Binary Search' }, 'binary')).toBe(true)
  })

  it('returns false when no field matches', () => {
    expect(matchesProblemSearch(problem, 'graph')).toBe(false)
  })

  it('treats an empty term as a match', () => {
    expect(matchesProblemSearch(problem, '')).toBe(true)
  })
})
