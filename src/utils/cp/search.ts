import type { SubmissionItem } from '../../types/cp.types'

/**
 * Shared full-text matcher for CP problem lists.
 * `term` is expected to be already trimmed and lower-cased by `useListFilter`.
 */
export const matchesProblemSearch = (item: SubmissionItem, term: string): boolean =>
  [item.title, item.category, item.language, item.platform, item.difficulty !== undefined ? String(item.difficulty) : ''].some((value) =>
    value ? value.toLowerCase().includes(term) : false
  )
