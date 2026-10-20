export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_ARCHIVE_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const

export const getPageNumbers = (totalPages: number, currentPage: number): (number | string)[] => {
  const pages: (number | string)[] = []
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 2) pages.push('...')
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    if (!pages.includes(totalPages)) pages.push(totalPages)
  }
  return pages
}
