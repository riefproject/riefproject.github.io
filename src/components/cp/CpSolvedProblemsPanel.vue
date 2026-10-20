<template>
  <div>
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h4 class="text-lg font-semibold platform-subtitle">{{ text(copy.solvedTitle) }}</h4>
      <span class="text-xs platform-count-text">
        {{
          isId ?
            `Total ${problems.length} ${text(itemNoun)} tercatat`
          : `Total ${problems.length} recorded ${text(itemNoun)}`
        }}
      </span>
    </div>

    <div class="cp-table-wrapper">
      <CpProblemsTable
        :problems="paginatedList"
        :columns="columns"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :showPlatform="false"
        :showDifficulty="false"
        :copy="tableCopy"
        bare
        :isId="isId" />

      <CpTablePagination
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="pageSize"
        :totalItems="problems.length"
        :isId="isId" />

      <div v-if="archiveHref" class="tab-bottom-cta">
        <a :href="archiveHref" class="tab-cta-btn">
          <span>{{ text(copy.cta) }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CpProblemsTable from './CpProblemsTable.vue'
import CpTablePagination from './CpTablePagination.vue'
import { usePagination } from '../../composables/usePagination'
import { DEFAULT_PAGE_SIZE } from '../../utils/pagination'
import { resolveLocaleText, type LocaleText } from '../../utils/i18n'
import type { CpColumn, CpPlatformCopy, CpTableCopy, SubmissionItem } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    problems: SubmissionItem[]
    columns?: CpColumn[]
    copy: CpPlatformCopy
    archiveHref?: string
    isId?: boolean
    pageSize?: number
  }>(),
  {
    columns: () => [],
    archiveHref: '',
    isId: false,
    pageSize: DEFAULT_PAGE_SIZE,
  }
)

const text = (value: LocaleText) => resolveLocaleText(value, props.isId)

const itemNoun = computed<LocaleText>(() => props.copy.itemNoun || { en: 'problems', id: 'soal' })

const tableCopy = computed<CpTableCopy>(() => ({
  titleColumn: props.copy.titleColumn || { en: 'Problem Name', id: 'Judul Soal' },
  timeColumn: { en: 'Solved', id: 'Waktu' },
  openTitle: props.copy.openTitle || { en: 'Open submission', id: 'Buka submisi' },
}))

const { currentPage, pageSize, totalPages, paginatedList } = usePagination(
  () => props.problems,
  props.pageSize
)
</script>

<style scoped>
.tab-bottom-cta {
  padding: 1rem;
  background: var(--bg-elevated);
  border-top: none;
  display: flex;
  justify-content: center;
}

.tab-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--link);
  text-decoration: none;
  transition: all 0.15s;
}

.tab-cta-btn:hover {
  text-decoration: underline;
  transform: translateX(2px);
}
</style>
