<template>
  <div class="cp-explorer">
    <!-- Explorer Header / Filter Controls -->
    <div class="explorer-card">
      <div class="explorer-controls-header">
        <SearchInput
          v-model="searchTerm"
          :placeholder="
            isId ?
              'Cari judul soal, topik, bahasa, kontes...'
            : 'Search problem title, topic, language, contest...'
          "
          clearable
          @input="currentPage = 1" />

        <!-- Unified Filter Popover (Desktop & Mobile) -->
        <FilterDropdown
          v-model="selectedCategories"
          :categories="platformCategories"
          :locale="locale"
          itemType="platform" />

        <div class="rows-per-page-select">
          <label class="text-xs text-gray-400">{{
            isId ? 'Baris per halaman:' : 'Per page:'
          }}</label>
          <select v-model.number="pageSize" @change="currentPage = 1" class="page-size-dropdown">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Results Table Container -->
    <div class="explorer-table-card">
      <div v-if="paginatedProblems.length > 0">
        <CpProblemsTable
          :problems="paginatedProblems"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :isId="isId" />
      </div>

      <div v-else class="empty-state">
        <p>
          {{
            isId ?
              'Tidak ada soal yang cocok dengan kriteria pencarian.'
            : 'No problems match the search criteria.'
          }}
        </p>
      </div>

      <!-- Numbered Pagination Bar -->
      <CpTablePagination
        v-if="filteredProblems.length > 0"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="pageSize"
        :totalItems="filteredProblems.length"
        :isId="isId"
        :scrollToTop="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import FilterDropdown from '../shared/FilterDropdown.vue'
import SearchInput from '../shared/SearchInput.vue'
import CpTablePagination from './CpTablePagination.vue'
import CpProblemsTable from './CpProblemsTable.vue'
import { useLocale } from '../../composables/useLocale'
import { useCpStats } from '../../composables/useCpStats'
import { useListFilter } from '../../composables/useListFilter'
import { usePagination } from '../../composables/usePagination'
import { CP_PLATFORM_KEYS, buildPlatformCategories } from '../../utils/cp/platforms'
import type { CpData, SubmissionItem } from '../../types/cp.types'

type ProblemsPayload = { problems?: SubmissionItem[] } | SubmissionItem[]

const props = defineProps<{
  initialData?: CpData
  initialProblems?: ProblemsPayload
}>()

const { isId, locale } = useLocale()

const cpData = ref<CpData | null>(props.initialData || null)
const rawProblemsData = ref<ProblemsPayload | null>(props.initialProblems || null)
const allPlatformKeys = [...CP_PLATFORM_KEYS]

// Reuse the dashboard summary composable so the counts stay in sync.
const {
  totalSolved: totalAllSolved,
  totalTlxSolved,
  totalCfSolved,
  totalLcSolved,
  totalHrSolved,
} = useCpStats(cpData)

const platformCategories = computed(() =>
  buildPlatformCategories(
    {
      all: totalAllSolved.value,
      tlx: totalTlxSolved.value,
      codeforces: totalCfSolved.value,
      leetcode: totalLcSolved.value,
      hackerrank: totalHrSolved.value,
    },
    isId.value
  )
)

// Filtered List
const allProblems = computed<SubmissionItem[]>(() => {
  if (rawProblemsData.value) {
    if (Array.isArray(rawProblemsData.value)) return rawProblemsData.value
    if (Array.isArray(rawProblemsData.value.problems)) return rawProblemsData.value.problems
  }
  return cpData.value?.recentGlobalFeed || []
})

const {
  searchTerm,
  selectedCategories,
  filteredItems: filteredProblems,
} = useListFilter<SubmissionItem>({
  items: () => allProblems.value,
  categories: () => allPlatformKeys.map((key) => ({ key })),
  getCategory: (item) => item.platform as string,
  matchesSearch: (item, term) =>
    [
      item.title,
      item.category,
      item.language,
      item.platform,
      item.difficulty !== undefined ? String(item.difficulty) : '',
    ].some((value) => value && value.toLowerCase().includes(term)),
})

const {
  currentPage,
  pageSize,
  totalPages,
  paginatedList: paginatedProblems,
} = usePagination(() => filteredProblems.value, 20)

// URL Query Param handler on mounted
onMounted(() => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const plat = urlParams.get('platform')
    if (plat) {
      if (plat.toLowerCase() === 'all') {
        selectedCategories.value = [...allPlatformKeys]
      } else {
        const plats = plat.toLowerCase().split(',')
        const validPlats = plats.filter((p) =>
          allPlatformKeys.includes(p as (typeof allPlatformKeys)[number])
        )
        if (validPlats.length > 0) {
          selectedCategories.value = validPlats
        }
      }
    }
    const q = urlParams.get('q')
    if (q) {
      searchTerm.value = q
    }
  }
})

watch(selectedCategories, (newVal) => {
  currentPage.value = 1
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    if (newVal.length === allPlatformKeys.length) {
      url.searchParams.delete('platform')
    } else {
      url.searchParams.set('platform', newVal.join(','))
    }
    window.history.replaceState({}, '', url.toString())
  }
})
</script>

<style scoped>
.cp-explorer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  --text-2xl: 1.75rem;
  --text-lg: 1.125rem;
  --text-base: 0.875rem;
  --text-sm: 0.75rem;
  --text-xs: 0.7rem;
}

.explorer-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* padding: 1.25rem; */
  /* background: var(--bg-soft); */
  border: none;
  border-radius: var(--radius-2xl);
}

.explorer-controls-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
}

.search-input-wrap {
  flex: 1;
}

.rows-per-page-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-size-dropdown {
  height: 2.5rem;
  padding: 0 0.6rem;
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--text-base);
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
}

/* Table Card */
.explorer-table-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: var(--muted);
  font-size: var(--text-base);
}

@media (max-width: 640px) {
  .explorer-controls-header {
    flex-direction: row !important;
    align-items: center !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }

  .explorer-controls-header .search-input-wrap {
    max-width: none !important;
    flex: 1 !important;
  }

  .rows-per-page-select {
    display: none !important;
  }
}
</style>
