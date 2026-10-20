import { describe, expect, it } from 'vitest'
import { getPageNumbers } from './pagination'

describe('getPageNumbers', () => {
  it('lists every page when there are five or fewer', () => {
    expect(getPageNumbers(5, 3)).toEqual([1, 2, 3, 4, 5])
  })

  it('adds ellipses around the current page', () => {
    expect(getPageNumbers(10, 5)).toEqual([1, '...', 4, 5, 6, '...', 10])
  })

  it('keeps the first and last pages visible at the edges', () => {
    expect(getPageNumbers(10, 1)).toEqual([1, 2, '...', 10])
    expect(getPageNumbers(10, 10)).toEqual([1, '...', 9, 10])
  })
})
