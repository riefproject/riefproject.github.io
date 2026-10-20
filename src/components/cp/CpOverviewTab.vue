<template>
  <div class="overview-tab">
    <!-- Platform Breakdown Cards -->
    <div class="platform-cards-grid">
      <!-- TLX Card -->
      <PlatformCard
        name="TOKI Learning Center"
        :handle="cpData?.platforms?.tlx?.handle || CP_PLATFORMS.tlx.handleFallback"
        :logo="CP_PLATFORMS.tlx.logo"
        :solvedNum="totalTlxSolved"
        :solvedLabel="isId ? 'selesai' : 'solved'"
        :footerText="isId ? 'Lihat Detail TLX →' : 'View TLX Details →'"
        @select="$emit('selectPlatform', 'tlx')">
        <MetaRow :label="`${isId ? 'Submisi Total' : 'Total Submissions'}:`">
          <strong>{{ cpData?.platforms?.tlx?.totalSubmissions || 561 }}</strong>
        </MetaRow>
        <MetaRow :label="`${isId ? 'Bahasa Dominan' : 'Top Language'}:`">
          <strong>C++20</strong>
        </MetaRow>
      </PlatformCard>

      <!-- Codeforces Card -->
      <PlatformCard
        name="Codeforces"
        :handle="cpData?.platforms?.codeforces?.handle || CP_PLATFORMS.codeforces.handleFallback"
        :logo="CP_PLATFORMS.codeforces.logo"
        :solvedNum="cpData?.platforms?.codeforces?.rating || 625"
        solvedLabel="rating"
        :footerText="isId ? 'Lihat Detail Codeforces →' : 'View Codeforces Details →'"
        @select="$emit('selectPlatform', 'codeforces')">
        <MetaRow :label="`${isId ? 'Soal Selesai' : 'Problems Solved'}:`">
          <strong>{{ totalCfSolved }} {{ isId ? 'Soal' : 'Problems' }}</strong>
        </MetaRow>
        <MetaRow label="Rank:">
          <strong class="cf-rank-text capitalize">{{
            cpData?.platforms?.codeforces?.rank || 'newbie'
          }}</strong>
        </MetaRow>
      </PlatformCard>

      <!-- LeetCode Card -->
      <PlatformCard
        name="LeetCode"
        :handle="cpData?.platforms?.leetcode?.handle || CP_PLATFORMS.leetcode.handleFallback"
        :logo="CP_PLATFORMS.leetcode.logo"
        :logoLight="CP_PLATFORMS.leetcode.logoLight"
        :solvedNum="totalLcSolved"
        :solvedLabel="isId ? 'selesai' : 'solved'"
        :footerText="isId ? 'Lihat Detail LeetCode →' : 'View LeetCode Details →'"
        @select="$emit('selectPlatform', 'leetcode')">
        <MetaRow :label="`${isId ? 'Tingkat Kesulitan' : 'Difficulty Split'}:`">
          <span class="diff-split">
            <span class="diff-cnt easy">{{ cpData?.platforms?.leetcode?.easySolved || 32 }}E</span>
            ·
            <span class="diff-cnt medium"
              >{{ cpData?.platforms?.leetcode?.mediumSolved || 24 }}M</span
            >
            ·
            <span class="diff-cnt hard">{{ cpData?.platforms?.leetcode?.hardSolved || 3 }}H</span>
          </span>
        </MetaRow>
        <MetaRow label="Global Ranking:">
          <strong>~{{ (cpData?.platforms?.leetcode?.ranking || 2367686).toLocaleString() }}</strong>
        </MetaRow>
      </PlatformCard>

      <!-- HackerRank Card -->
      <PlatformCard
        name="HackerRank"
        :handle="cpData?.platforms?.hackerrank?.handle || CP_PLATFORMS.hackerrank.handleFallback"
        :logo="CP_PLATFORMS.hackerrank.logo"
        :solvedNum="totalHrSolved + '+'"
        :solvedLabel="isId ? 'selesai' : 'solved'"
        :footerText="isId ? 'Lihat Detail HackerRank →' : 'View HackerRank Details →'"
        @select="$emit('selectPlatform', 'hackerrank')">
        <MetaRow label="Algorithms Track:">
          <strong class="track-pts-emerald">1029.98 pts</strong>
        </MetaRow>
        <MetaRow label="SQL Track:">
          <strong class="track-pts-sky">390 pts</strong>
        </MetaRow>
        <MetaRow label="C++ & Java Track:">
          <strong>430+ pts</strong>
        </MetaRow>
      </PlatformCard>
    </div>

    <!-- Unified Solved Problems Section (Informative Table + Pagination) -->
    <div class="feed-section">
      <div class="feed-header">
        <div>
          <h3>
            {{ isId ? 'Daftar Soal yang Diselesaikan' : 'Solved Problems History' }}
          </h3>
          <p class="feed-subtitle">
            {{
              isId ?
                'Aktivitas penyelesaian soal lintas platform secara kronologis.'
              : 'Chronological stream of solved challenges across all competitive platforms.'
            }}
          </p>
        </div>

        <!-- Feed Filter Controls -->
        <div class="feed-controls">
          <SearchInput
            v-model="searchTerm"
            :placeholder="
              isId ?
                'Cari judul soal, topik, bahasa...'
              : 'Search problem title, topic, language...'
            "
            surface="soft"
            @input="currentPage = 1" />

          <!-- Unified Filter Popover (Desktop & Mobile) -->
          <FilterDropdown
            v-model="selectedCategories"
            :categories="platformCategories"
            :locale="locale"
            itemType="platform"
            @update:modelValue="currentPage = 1" />
        </div>
      </div>

      <!-- Feed Table -->
      <div v-if="filteredFeed.length > 0" class="feed-table-card">
        <CpProblemsTable
          :problems="paginatedFeed"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :isId="isId" />

        <!-- Reusable Pagination -->
        <CpTablePagination
          v-model:currentPage="currentPage"
          :totalPages="totalPages"
          :pageSize="pageSize"
          :totalItems="filteredFeed.length"
          :isId="isId" />
      </div>

      <div v-else class="empty-feed">
        <p>
          {{
            isId ?
              'Tidak ada soal yang cocok dengan filter pencarian.'
            : 'No problems found matching your filter.'
          }}
        </p>
      </div>

      <!-- Dedicated Archive CTA Card -->
      <div class="view-all-archive-cta">
        <div class="cta-info">
          <div class="flex items-center gap-2">
            <h4 class="cta-title">
              {{
                isId ?
                  `Jelajahi Seluruh ${totalAllSolved}+ Koleksi Soal`
                : `Explore Complete ${totalAllSolved}+ Solved Archive`
              }}
            </h4>
          </div>
          <p class="cta-desc">
            {{
              isId ?
                'Buka halaman arsip terfokus dengan filter komprehensif, pencarian cepat per topik, navigasi multi-halaman, dan link soal langsung.'
              : 'Open the dedicated archive page with full-text search, topic filtering, multi-page pagination, and direct problem links.'
            }}
          </p>
        </div>
        <a
          :href="`/competitive-programming/problems${selectedCategories.length < allPlatformKeys.length ? '?platform=' + selectedCategories.join(',') : ''}`"
          class="cta-action-btn">
          <span>{{ isId ? 'Buka Halaman Arsip Soal' : 'Open Solved Problems Archive' }}</span>
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FilterDropdown from '../shared/FilterDropdown.vue'
import SearchInput from '../shared/SearchInput.vue'
import CpTablePagination from './CpTablePagination.vue'
import CpProblemsTable from './CpProblemsTable.vue'
import PlatformCard from '../shared/PlatformCard.vue'
import MetaRow from '../shared/MetaRow.vue'
import { useListFilter } from '../../composables/useListFilter'
import { usePagination } from '../../composables/usePagination'
import { CP_PLATFORMS, CP_PLATFORM_KEYS, buildPlatformCategories } from '../../utils/cp/platforms'
import type { CpData, SubmissionItem } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    cpData: CpData
    totalTlxSolved?: number
    totalCfSolved?: number
    totalLcSolved?: number
    totalHrSolved?: number
    isId?: boolean
    locale?: 'en' | 'id'
  }>(),
  {
    totalTlxSolved: 437,
    totalCfSolved: 68,
    totalLcSolved: 102,
    totalHrSolved: 147,
    isId: false,
    locale: 'en',
  }
)

defineEmits<{ (e: 'selectPlatform', platform: string): void }>()

const allPlatformKeys = [...CP_PLATFORM_KEYS]

const totalAllSolved = computed(() => {
  return (
    props.cpData?.overview?.totalSolved ||
    props.totalTlxSolved + props.totalCfSolved + props.totalLcSolved + props.totalHrSolved
  )
})

const platformCategories = computed(() =>
  buildPlatformCategories(
    {
      all: totalAllSolved.value,
      tlx: props.totalTlxSolved,
      codeforces: props.totalCfSolved,
      leetcode: props.totalLcSolved,
      hackerrank: props.totalHrSolved,
    },
    props.locale === 'id'
  )
)

const allRecentFeed = computed<SubmissionItem[]>(() => props.cpData?.recentGlobalFeed || [])

const {
  searchTerm,
  selectedCategories,
  filteredItems: filteredFeed,
} = useListFilter<SubmissionItem>({
  items: () => allRecentFeed.value,
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
  paginatedList: paginatedFeed,
} = usePagination(() => filteredFeed.value, 10)
</script>

<style scoped>
.overview-tab {
  display: flex;
  flex-direction: column;
}

/*
 * Color utilities for the platform card slot content.
 * These live here instead of PlatformCard because `:slotted()` only scopes the
 * direct slot child (MetaRow), not the nested spans, so the styles would not
 * reach `.diff-cnt`, `.cf-rank-text`, or `.track-pts-*`.
 */
.diff-split {
  font-weight: 700;
}

.diff-cnt.easy {
  color: #34d399;
}
.diff-cnt.medium {
  color: #fbbf24;
}
.diff-cnt.hard {
  color: #f43f5e;
}

.cf-rank-text {
  color: #38bdf8;
}

.track-pts-emerald {
  color: #34d399;
}

.track-pts-sky {
  color: #38bdf8;
}

:root.light .diff-cnt.easy {
  color: #047857;
  font-weight: 700;
}
:root.light .diff-cnt.medium {
  color: #b45309;
  font-weight: 700;
}
:root.light .diff-cnt.hard {
  color: #be123c;
  font-weight: 700;
}

:root.light .track-pts-emerald {
  color: #047857;
}

:root.light .track-pts-sky {
  color: #0284c7;
}

.platform-cards-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .platform-cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.feed-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 3.5rem;
  min-width: 0;
}

.feed-table-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.feed-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feed-header h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.feed-subtitle {
  font-size: var(--text-sm);
  color: var(--muted);
  margin: 0.2rem 0 0 0;
}

.feed-controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  width: 100%;
}

.search-input-wrap {
  flex: 1;
}

@media (max-width: 640px) {
  .feed-section {
    margin-top: 2rem !important;
  }

  .feed-controls {
    flex-direction: row !important;
    align-items: center !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }

  .feed-controls .search-input-wrap {
    max-width: none !important;
    flex: 1 !important;
  }
}
</style>
