import { describe, expect, it } from 'vitest'
import { cleanLanguage, getDiffClass } from './formatting'

describe('cleanLanguage', () => {
  it('normalizes common judge language labels', () => {
    expect(cleanLanguage('Cpp20')).toBe('C++20')
    expect(cleanLanguage('C++17')).toBe('C++17')
    expect(cleanLanguage('PostgreSQL 15')).toBe('PostgreSQL')
    expect(cleanLanguage('JavaScript')).toBe('JavaScript')
    expect(cleanLanguage('Java 17')).toBe('Java')
  })

  it('falls back to a dash for empty input', () => {
    expect(cleanLanguage('')).toBe('-')
  })
})

describe('getDiffClass', () => {
  it('maps difficulty labels and Codeforces ratings', () => {
    expect(getDiffClass('Easy')).toBe('easy')
    expect(getDiffClass('Medium')).toBe('medium')
    expect(getDiffClass('Hard')).toBe('hard')
    expect(getDiffClass(800)).toBe('easy')
    expect(getDiffClass(1300)).toBe('medium')
    expect(getDiffClass(1400)).toBe('hard')
  })

  it('returns normal for unknown or empty values', () => {
    expect(getDiffClass(undefined)).toBe('normal')
    expect(getDiffClass('unknown')).toBe('normal')
  })
})
