import { computed, ref } from 'vue'

export const useListFilter = <T>(options: {
  items: () => T[]
  categories: () => Array<{ key: string }>
  getCategory: (item: T) => string
  matchesSearch: (item: T, term: string) => boolean
}) => {
  const { items, categories, getCategory, matchesSearch } = options
  const allCategoryKeys = categories()
    .filter((category) => category.key !== 'all')
    .map((category) => category.key)

  const searchTerm = ref('')
  const selectedCategories = ref<string[]>([...allCategoryKeys])

  const filteredItems = computed(() => {
    const term = searchTerm.value.trim().toLowerCase()

    return items().filter((item) => {
      const matchesCategory = selectedCategories.value.includes(getCategory(item))
      const matchesSearchTerm = term.length === 0 || matchesSearch(item, term)
      return matchesCategory && matchesSearchTerm
    })
  })

  const activeCount = computed(() => filteredItems.value.length)

  return {
    searchTerm,
    selectedCategories,
    filteredItems,
    activeCount,
  }
}
