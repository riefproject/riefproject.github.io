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
        :solvedLabel="copy.solved"
        :footerText="copy.tlxFooter"
        @select="$emit('selectPlatform', 'tlx')">
        <MetaRow :label="`${copy.totalSubmissions}:`">
          <strong>{{
            cpData?.platforms?.tlx?.totalSubmissions || CP_FALLBACK.tlxTotalSubmissions
          }}</strong>
        </MetaRow>
        <MetaRow :label="`${copy.topLanguage}:`">
          <strong>C++20</strong>
        </MetaRow>
      </PlatformCard>

      <!-- Codeforces Card -->
      <PlatformCard
        name="Codeforces"
        :handle="cpData?.platforms?.codeforces?.handle || CP_PLATFORMS.codeforces.handleFallback"
        :logo="CP_PLATFORMS.codeforces.logo"
        :solvedNum="cpData?.platforms?.codeforces?.rating || CP_FALLBACK.codeforcesRating"
        :solvedLabel="copy.rating"
        :footerText="copy.codeforcesFooter"
        @select="$emit('selectPlatform', 'codeforces')">
        <MetaRow :label="`${copy.problemsSolved}:`">
          <strong>{{ totalCfSolved }} {{ copy.problems }}</strong>
        </MetaRow>
        <MetaRow :label="`${copy.rank}:`">
          <strong class="cf-rank-text capitalize">{{
            cpData?.platforms?.codeforces?.rank || CP_FALLBACK.codeforcesRank
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
        :solvedLabel="copy.solved"
        :footerText="copy.leetcodeFooter"
        @select="$emit('selectPlatform', 'leetcode')">
        <MetaRow :label="`${copy.difficultySplit}:`">
          <span class="diff-split">
            <span class="diff-cnt easy"
              >{{
                cpData?.platforms?.leetcode?.easySolved || CP_FALLBACK.leetcodeEasySolved
              }}E</span
            >
            ·
            <span class="diff-cnt medium"
              >{{
                cpData?.platforms?.leetcode?.mediumSolved || CP_FALLBACK.leetcodeMediumSolved
              }}M</span
            >
            ·
            <span class="diff-cnt hard"
              >{{
                cpData?.platforms?.leetcode?.hardSolved || CP_FALLBACK.leetcodeHardSolved
              }}H</span
            >
          </span>
        </MetaRow>
        <MetaRow :label="`${copy.globalRanking}:`">
          <strong
            >~{{
              (cpData?.platforms?.leetcode?.ranking || CP_FALLBACK.leetcodeRanking).toLocaleString()
            }}</strong
          >
        </MetaRow>
      </PlatformCard>

      <!-- HackerRank Card -->
      <PlatformCard
        name="HackerRank"
        :handle="cpData?.platforms?.hackerrank?.handle || CP_PLATFORMS.hackerrank.handleFallback"
        :logo="CP_PLATFORMS.hackerrank.logo"
        :solvedNum="totalHrSolved + '+'"
        :solvedLabel="copy.solved"
        :footerText="copy.hackerrankFooter"
        @select="$emit('selectPlatform', 'hackerrank')">
        <MetaRow :label="`${copy.algorithmsTrack}:`">
          <strong class="track-pts-emerald">{{ hrAlgorithmsPoints }}</strong>
        </MetaRow>
        <MetaRow :label="`${copy.sqlTrack}:`">
          <strong class="track-pts-sky">{{ hrSqlPoints }}</strong>
        </MetaRow>
        <MetaRow :label="`${copy.cppJavaTrack}:`">
          <strong>{{ hrCppJavaPoints }}</strong>
        </MetaRow>
      </PlatformCard>
    </div>

    <!-- Unified Solved Problems Section (Informative Table + Pagination) -->
    <div class="feed-section">
      <div class="feed-header">
        <div>
          <h3>{{ copy.feedTitle }}</h3>
          <p class="feed-subtitle">{{ copy.feedSubtitle }}</p>
        </div>

        <!-- Feed Filter Controls -->
        <div class="feed-controls">
          <SearchInput
            v-model="searchTerm"
            :placeholder="copy.searchPlaceholder"
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
        <p>{{ copy.emptyFeed }}</p>
      </div>

      <!-- Dedicated Archive CTA Card -->
      <div class="view-all-archive-cta">
        <div class="cta-info">
          <div class="flex items-center gap-2">
            <h4 class="cta-title">{{ copy.archiveTitle(totalAllSolved) }}</h4>
          </div>
          <p class="cta-desc">{{ copy.archiveDescription }}</p>
        </div>
        <a :href="archiveHref" class="cta-action-btn">
          <span>{{ copy.openArchive }}</span>
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
import { localizePath } from '../../utils/routing'
import FilterDropdown from '../shared/FilterDropdown.vue'
import SearchInput from '../shared/SearchInput.vue'
import CpTablePagination from './CpTablePagination.vue'
import CpProblemsTable from './CpProblemsTable.vue'
import PlatformCard from '../shared/PlatformCard.vue'
import MetaRow from '../shared/MetaRow.vue'
import { useListFilter } from '../../composables/useListFilter'
import { usePagination } from '../../composables/usePagination'
import { CP_FALLBACK } from '../../utils/cp/defaults'
import { CP_PLATFORMS, CP_PLATFORM_KEYS, buildPlatformCategories } from '../../utils/cp/platforms'
import { matchesProblemSearch } from '../../utils/cp/search'
import type { CpData, CpPlatformKey, SubmissionItem } from '../../types/cp.types'

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
    totalTlxSolved: CP_FALLBACK.tlxTotalSolved,
    totalCfSolved: CP_FALLBACK.codeforcesTotalSolved,
    totalLcSolved: CP_FALLBACK.leetcodeTotalSolved,
    totalHrSolved: CP_FALLBACK.hackerrankTotalSolved,
    isId: false,
    locale: 'en',
  }
)

defineEmits<{ (e: 'selectPlatform', platform: CpPlatformKey): void }>()

const copy = computed(() => {
  const id = props.isId
  return {
    solved: id ? 'selesai' : 'solved',
    rating: 'rating',
    rank: id ? 'Peringkat' : 'Rank',
    totalSubmissions: id ? 'Submisi Total' : 'Total Submissions',
    topLanguage: id ? 'Bahasa Dominan' : 'Top Language',
    problemsSolved: id ? 'Soal Selesai' : 'Problems Solved',
    problems: id ? 'Soal' : 'Problems',
    difficultySplit: id ? 'Tingkat Kesulitan' : 'Difficulty Split',
    globalRanking: id ? 'Peringkat Global' : 'Global Ranking',
    algorithmsTrack: id ? 'Track Algoritma' : 'Algorithms Track',
    sqlTrack: 'SQL Track',
    cppJavaTrack: id ? 'Track C++ & Java' : 'C++ & Java Track',
    tlxFooter: id ? 'Lihat Detail TLX →' : 'View TLX Details →',
    codeforcesFooter: id ? 'Lihat Detail Codeforces →' : 'View Codeforces Details →',
    leetcodeFooter: id ? 'Lihat Detail LeetCode →' : 'View LeetCode Details →',
    hackerrankFooter: id ? 'Lihat Detail HackerRank →' : 'View HackerRank Details →',
    feedTitle: id ? 'Daftar Soal yang Diselesaikan' : 'Solved Problems History',
    feedSubtitle:
      id ?
        'Aktivitas penyelesaian soal lintas platform secara kronologis.'
      : 'Chronological stream of solved challenges across all competitive platforms.',
    searchPlaceholder:
      id ? 'Cari judul soal, topik, bahasa...' : 'Search problem title, topic, language...',
    emptyFeed:
      id ?
        'Tidak ada soal yang cocok dengan filter pencarian.'
      : 'No problems found matching your filter.',
    archiveTitle: (total: number) =>
      id ? `Jelajahi Seluruh ${total}+ Koleksi Soal` : `Explore Complete ${total}+ Solved Archive`,
    archiveDescription:
      id ?
        'Buka halaman arsip terfokus dengan filter komprehensif, pencarian cepat per topik, navigasi multi-halaman, dan link soal langsung.'
      : 'Open the dedicated archive page with full-text search, topic filtering, multi-page pagination, and direct problem links.',
    openArchive: id ? 'Buka Halaman Arsip Soal' : 'Open Solved Problems Archive',
  }
})

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
  matchesSearch: matchesProblemSearch,
})

const {
  currentPage,
  pageSize,
  totalPages,
  paginatedList: paginatedFeed,
} = usePagination(() => filteredFeed.value)

const archiveHref = computed(() =>
  localizePath(
    `/competitive-programming/problems${
      selectedCategories.value.length < allPlatformKeys.length ?
        `?platform=${selectedCategories.value.join(',')}`
      : ''
    }`,
    props.isId ? 'id' : 'en'
  )
)

const hackerrankTrackScore = (slug: string) =>
  props.cpData?.platforms?.hackerrank?.trackScores?.find((track) => track.slug === slug)?.score || 0

const formatPoints = (score: number) => `${Number(score.toFixed(2)).toLocaleString('en-US')} pts`

const hrAlgorithmsPoints = computed(() => formatPoints(hackerrankTrackScore('algorithms')))
const hrSqlPoints = computed(() => formatPoints(hackerrankTrackScore('sql')))
const hrCppJavaPoints = computed(() =>
  formatPoints(hackerrankTrackScore('cpp') + hackerrankTrackScore('java'))
)
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
  color: var(--color-success);
}
.diff-cnt.medium {
  color: var(--color-warning);
}
.diff-cnt.hard {
  color: var(--color-danger);
}

.cf-rank-text {
  color: var(--color-info);
}

.track-pts-emerald {
  color: var(--color-success);
}

.track-pts-sky {
  color: var(--color-info);
}

:root.light .diff-cnt.easy {
  color: var(--color-success-strong);
  font-weight: 700;
}
:root.light .diff-cnt.medium {
  color: var(--color-warning-strong);
  font-weight: 700;
}
:root.light .diff-cnt.hard {
  color: var(--color-danger-strong);
  font-weight: 700;
}

:root.light .track-pts-emerald {
  color: var(--color-success-strong);
}

:root.light .track-pts-sky {
  color: var(--color-info-strong);
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
  font-size: var(--type-lg);
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.feed-subtitle {
  font-size: var(--type-sm);
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
    margin-top: 2rem;
  }

  .feed-controls {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  .feed-controls .search-input-wrap {
    max-width: none;
    flex: 1;
  }
}
</style>
