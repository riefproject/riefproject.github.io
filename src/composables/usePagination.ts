import { computed, ref, type Ref } from 'vue'
import { DEFAULT_PAGE_SIZE } from '../utils/pagination'

type PaginationSource<T> = Ref<T[]> | (() => T[])

export function usePagination<T>(source: PaginationSource<T>, initialPageSize = DEFAULT_PAGE_SIZE) {
  const currentPage = ref(1)
  const pageSize = ref(initialPageSize)

  const items = computed<T[]>(() => (typeof source === 'function' ? source() : source.value))
  const totalPages = computed(() => Math.max(1, Math.ceil(items.value.length / pageSize.value)))

  const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return items.value.slice(start, start + pageSize.value)
  })

  return { currentPage, pageSize, totalPages, paginatedList }
}
