<template>
  <div>
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h4 class="text-lg font-semibold platform-subtitle">{{ isId ? titleId : titleEn }}</h4>
      <span class="text-xs platform-count-text">
        {{
          isId ?
            `Total ${problems.length} ${itemNounId} tercatat`
          : `Total ${problems.length} recorded ${itemNounEn}`
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
        :titleColumnEn="titleColumnEn"
        :titleColumnId="titleColumnId"
        timeColumnEn="Solved"
        timeColumnId="Waktu"
        :openTitleEn="openTitleEn"
        :openTitleId="openTitleId"
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
          <span>{{ isId ? ctaId : ctaEn }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CpProblemsTable from './CpProblemsTable.vue'
import CpTablePagination from './CpTablePagination.vue'
import { usePagination } from '../../composables/usePagination'
import type { CpColumn, SubmissionItem } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    problems: SubmissionItem[]
    columns?: CpColumn[]
    titleEn: string
    titleId: string
    itemNounEn?: string
    itemNounId?: string
    titleColumnEn?: string
    titleColumnId?: string
    openTitleEn?: string
    openTitleId?: string
    archiveHref?: string
    ctaEn?: string
    ctaId?: string
    isId?: boolean
    pageSize?: number
  }>(),
  {
    columns: () => [],
    itemNounEn: 'problems',
    itemNounId: 'soal',
    titleColumnEn: 'Problem Name',
    titleColumnId: 'Judul Soal',
    openTitleEn: 'Open submission',
    openTitleId: 'Buka submisi',
    archiveHref: '',
    ctaEn: '',
    ctaId: '',
    isId: false,
    pageSize: 10,
  }
)

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
