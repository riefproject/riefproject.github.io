<template>
  <div>
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h4 class="text-lg font-semibold platform-subtitle">{{ isId ? titleId : titleEn }}</h4>
      <span class="text-xs platform-count-text">
        {{ isId ? `Total ${problems.length} ${itemNounId} tercatat` : `Total ${problems.length} recorded ${itemNounEn}` }}
      </span>
    </div>

    <div class="cp-table-wrapper">
      <table class="cp-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th class="col-title">{{ isId ? titleColumnId : titleColumnEn }}</th>
            <th v-for="col in columns" :key="col.key" :class="`col-${columnClass(col.key)}`">
              {{ isId ? col.labelId : col.labelEn }}
            </th>
            <th class="col-status">Status</th>
            <th class="col-time">{{ isId ? 'Waktu' : 'Solved' }}</th>
            <th class="col-action"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in paginatedList" :key="item.id || idx" class="cp-table-row">
            <td class="cell-num">{{ (currentPage - 1) * pageSize + idx + 1 }}</td>
            <td class="cell-title">
              <a
                :href="item.url || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="problem-title-link"
                :title="item.title"
              >
                <span class="title-text">{{ item.title }}</span>
                <svg class="w-3.5 h-3.5 link-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </td>
            <td v-for="col in columns" :key="col.key" :class="`cell-${columnClass(col.key)}`">
              <template v-if="col.key === 'category'">
                <span v-if="item.category" class="topic-pill" :title="item.category">
                  <span>{{ item.category }}</span>
                </span>
              </template>
              <template v-else-if="col.key === 'difficulty'">
                <span class="diff-badge" :class="getDiffClass(item.difficulty)">{{ item.difficulty }}</span>
              </template>
              <template v-else-if="col.key === 'language'">
                <span class="lang-tag">{{ cleanLanguage(item.language) }}</span>
              </template>
            </td>
            <td class="cell-status">
              <span class="status-badge ac">AC</span>
            </td>
            <td class="cell-time">{{ formatExactDate(item.solvedAt, isId) }}</td>
            <td class="cell-action">
              <a
                :href="item.url || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="open-btn"
                :title="isId ? openTitleId : openTitleEn"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <CpTablePagination
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="pageSize"
        :totalItems="problems.length"
        :isId="isId"
      />

      <div v-if="archiveHref" class="tab-bottom-cta">
        <a :href="archiveHref" class="tab-cta-btn">
          <span>{{ isId ? ctaId : ctaEn }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CpTablePagination from './CpTablePagination.vue';
import { cleanLanguage, getDiffClass } from '../../utils/cp/formatting';
import { formatExactDate } from '../../utils/dateFormat';
import { usePagination } from '../../composables/usePagination';
import type { CpColumn, CpColumnKey } from '../../types/cp.types';

const props = withDefaults(
  defineProps<{
    problems: any[];
    columns?: CpColumn[];
    titleEn: string;
    titleId: string;
    itemNounEn?: string;
    itemNounId?: string;
    titleColumnEn?: string;
    titleColumnId?: string;
    openTitleEn?: string;
    openTitleId?: string;
    archiveHref?: string;
    ctaEn?: string;
    ctaId?: string;
    isId?: boolean;
    pageSize?: number;
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
  },
);

const { currentPage, pageSize, totalPages, paginatedList } = usePagination(
  () => props.problems,
  props.pageSize,
);

const columnClass = (key: CpColumnKey) => (key === 'difficulty' ? 'diff' : key);
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
