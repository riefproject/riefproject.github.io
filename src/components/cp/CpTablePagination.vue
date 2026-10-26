<template>
  <div class="feed-footer-controls">
    <div class="feed-counter-text">
      <span class="desktop-only-text">{{ desktopText }}</span>
      <div class="mobile-only-text-group">
        <div class="mob-range-text">{{ mobileRangeText }}</div>
        <div class="mob-page-text">{{ mobilePageText }}</div>
      </div>
    </div>

    <!-- Pagination Navigation Buttons -->
    <div class="pagination-nav-group" v-if="totalPages > 1">
      <button
        type="button"
        @click="setPage(1)"
        :disabled="currentPage === 1"
        class="pg-btn"
        :title="navCopy.firstPage">
        «
      </button>
      <button
        type="button"
        @click="setPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pg-btn"
        :title="navCopy.previousPage">
        ‹
      </button>

      <div class="pg-num-list">
        <button
          v-for="(p, pIdx) in visiblePages"
          :key="pIdx"
          type="button"
          @click="typeof p === 'number' ? setPage(p) : null"
          class="pg-num-btn"
          :class="{ active: p === currentPage, dots: p === '...' }"
          :disabled="p === '...'">
          {{ p }}
        </button>
      </div>

      <button
        type="button"
        @click="setPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="pg-btn"
        :title="navCopy.nextPage">
        ›
      </button>
      <button
        type="button"
        @click="setPage(totalPages)"
        :disabled="currentPage === totalPages"
        class="pg-btn"
        :title="navCopy.lastPage">
        »
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPageNumbers } from '../../utils/pagination'

const PAGINATION_SCROLL_TOP = 180

const props = withDefaults(
  defineProps<{
    currentPage: number
    totalPages: number
    pageSize: number
    totalItems: number
    isId?: boolean
    scrollToTop?: boolean
  }>(),
  {
    isId: false,
    scrollToTop: false,
  }
)

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const navCopy = computed(() =>
  props.isId ?
    {
      firstPage: 'Halaman Pertama',
      previousPage: 'Halaman Sebelumnya',
      nextPage: 'Halaman Berikutnya',
      lastPage: 'Halaman Terakhir',
    }
  : {
      firstPage: 'First Page',
      previousPage: 'Previous Page',
      nextPage: 'Next Page',
      lastPage: 'Last Page',
    }
)

const rangeText = computed(() => {
  if (props.totalItems === 0) return '0'
  const start = (props.currentPage - 1) * props.pageSize + 1
  const end = Math.min(props.currentPage * props.pageSize, props.totalItems)
  return `${start}-${end}`
})

const desktopText = computed(() =>
  props.isId ?
    `Menampilkan ${rangeText.value} dari ${props.totalItems} soal (Halaman ${props.currentPage} dari ${props.totalPages})`
  : `Showing ${rangeText.value} of ${props.totalItems} problems (Page ${props.currentPage} of ${props.totalPages})`
)

const mobileRangeText = computed(() =>
  props.isId ?
    `${rangeText.value} dari ${props.totalItems}`
  : `${rangeText.value} of ${props.totalItems}`
)

const mobilePageText = computed(() =>
  props.isId ?
    `Halaman ${props.currentPage} / ${props.totalPages}`
  : `Page ${props.currentPage} / ${props.totalPages}`
)

const visiblePages = computed(() => {
  return getPageNumbers(props.totalPages, props.currentPage)
})

const setPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
    if (props.scrollToTop && typeof window !== 'undefined') {
      window.scrollTo({ top: PAGINATION_SCROLL_TOP, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.feed-footer-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  border-bottom-left-radius: var(--radius-2xl);
  border-bottom-right-radius: var(--radius-2xl);
}

@media (min-width: 640px) {
  .feed-footer-controls {
    flex-direction: row;
  }
}

.feed-counter-text {
  font-size: var(--type-sm);
  color: var(--muted);
  font-weight: 500;
}

.pagination-nav-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.pg-btn {
  white-space: nowrap;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--type-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.pg-btn:hover:not(:disabled) {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.pg-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pg-num-list {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.pg-num-btn {
  width: 1.85rem;
  height: 1.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--type-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.pg-num-btn:hover:not(.dots):not(.active) {
  background: var(--chip-bg);
}

.pg-num-btn.active {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.pg-num-btn.dots {
  border: none;
  background: transparent;
  cursor: default;
  color: var(--muted);
}

.mobile-only-text-group {
  display: none;
}

@media (max-width: 640px) {
  .desktop-only-text {
    display: none;
  }
  .mobile-only-text-group {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    text-align: left;
  }

  .mob-range-text {
    font-size: 0.775rem;
    font-weight: 700;
    color: var(--text);
  }

  .mob-page-text {
    font-size: 0.675rem;
    font-weight: 500;
    color: var(--muted);
  }

  .feed-footer-controls .pg-num-list,
  .feed-footer-controls .pg-btn[title='First Page'],
  .feed-footer-controls .pg-btn[title='Last Page'] {
    display: none;
  }

  .feed-footer-controls {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 0.85rem;
  }

  .feed-counter-text {
    font-size: 0.725rem;
    font-weight: 600;
  }

  .pagination-nav-group {
    gap: 0.3rem;
  }

  .pg-btn {
    padding: 0.35rem 0.65rem;
    font-size: 0.725rem;
    border-radius: var(--radius-sm);
  }
}
</style>
