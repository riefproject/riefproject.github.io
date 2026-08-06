<template>
  <div class="cp-explorer">
    <!-- Explorer Header / Filter Controls -->
    <div class="explorer-card">
      <div class="explorer-controls-header">
        <div class="search-box">
          <svg class="search-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="isId ? 'Cari judul soal, topik, bahasa, kontes...' : 'Search problem title, topic, language, contest...'"
            class="explorer-search-input"
            @input="currentPage = 1"
          />
          <button v-if="searchQuery" @click="searchQuery = ''; currentPage = 1" class="clear-search-btn">✕</button>
        </div>

        <div class="rows-per-page-select">
          <label class="text-xs text-gray-400">{{ isId ? 'Baris per halaman:' : 'Per page:' }}</label>
          <select v-model.number="pageSize" @change="currentPage = 1" class="page-size-dropdown">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
      </div>

      <!-- Platform Filter Tabs -->
      <div class="platform-filter-tabs">
        <button
          type="button"
          @click="selectPlatform('all')"
          class="platform-tab-btn"
          :class="{ active: selectedPlatform === 'all' }"
        >
          <span>All</span>
          <span class="count-pill">({{ totalAllSolved }})</span>
        </button>

        <button
          type="button"
          @click="selectPlatform('tlx')"
          class="platform-tab-btn"
          :class="{ active: selectedPlatform === 'tlx' }"
        >
          <img src="/img/tlx/tlx.webp" alt="TLX" class="tab-btn-logo" />
          <span>TLX</span>
          <span class="count-pill">({{ totalTlxSolved }})</span>
        </button>

        <button
          type="button"
          @click="selectPlatform('codeforces')"
          class="platform-tab-btn"
          :class="{ active: selectedPlatform === 'codeforces' }"
        >
          <img src="/img/codeforces/codeforces.webp" alt="CF" class="tab-btn-logo" />
          <span>Codeforces</span>
          <span class="count-pill">({{ totalCfSolved }})</span>
        </button>

        <button
          type="button"
          @click="selectPlatform('leetcode')"
          class="platform-tab-btn"
          :class="{ active: selectedPlatform === 'leetcode' }"
        >
          <img src="/img/leetcode/leetcode.webp" alt="LC" class="tab-btn-logo" />
          <span>LeetCode</span>
          <span class="count-pill">({{ totalLcSolved }})</span>
        </button>

        <button
          type="button"
          @click="selectPlatform('hackerrank')"
          class="platform-tab-btn"
          :class="{ active: selectedPlatform === 'hackerrank' }"
        >
          <img src="/img/hackerrank/HackerRank.webp" alt="HR" class="tab-btn-logo" />
          <span>HackerRank</span>
          <span class="count-pill">({{ totalHrSolved }})</span>
        </button>
      </div>
    </div>

    <!-- Results Table Container -->
    <div class="explorer-table-card">
      <div class="table-status-bar">
        <div class="status-count">
          {{ isId
            ? `Menampilkan ${paginationRange} dari ${filteredProblems.length} soal (${selectedPlatform.toUpperCase()})`
            : `Showing ${paginationRange} of ${filteredProblems.length} problems (${selectedPlatform.toUpperCase()})`
          }}
        </div>
        <div class="pagination-info">
          {{ isId ? `Halaman ${currentPage} dari ${totalPages}` : `Page ${currentPage} of ${totalPages}` }}
        </div>
      </div>

      <div v-if="paginatedProblems.length > 0" class="table-scroll-container">
        <!-- Desktop & Scrollable Table -->
        <table class="problems-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-platform">Platform</th>
              <th class="col-title">{{ isId ? 'Judul Soal' : 'Problem Name' }}</th>
              <th class="col-topic">{{ isId ? 'Topik / Modul' : 'Topic / Module' }}</th>
              <th class="col-diff">{{ isId ? 'Kesulitan' : 'Difficulty' }}</th>
              <th class="col-lang">{{ isId ? 'Bahasa' : 'Language' }}</th>
              <th class="col-status">Status</th>
              <th class="col-time">{{ isId ? 'Waktu Selesai' : 'Solved Date' }}</th>
              <th class="col-act"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in paginatedProblems" :key="item.id" class="table-item-row">
              <!-- Item Number -->
              <td class="cell-num">
                {{ (currentPage - 1) * pageSize + idx + 1 }}
              </td>
              <!-- Platform -->
              <td class="cell-platform">
                <div class="platform-chip" :class="item.platform">
                  <img :src="getPlatformLogo(item.platform)" :alt="item.platform" class="chip-img" />
                  <span>{{ getPlatformName(item.platform) }}</span>
                </div>
              </td>
              <!-- Title -->
              <td class="cell-title">
                <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer" class="title-link" :title="item.title">
                  <span class="title-text">{{ item.title }}</span>
                  <svg class="w-3.5 h-3.5 title-ext-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </td>
              <!-- Category / Topic -->
              <td class="cell-topic">
                <span class="topic-tag" v-if="item.category" :title="item.category">
                  <span>{{ item.category }}</span>
                </span>
                <span class="text-xs text-gray-500 font-mono" v-else>-</span>
              </td>
              <!-- Difficulty -->
              <td class="cell-diff">
                <span v-if="item.difficulty && item.difficulty !== '-'" class="diff-tag" :class="getDiffClass(item.difficulty)">
                  {{ item.difficulty }}
                </span>
                <span v-else class="text-xs text-gray-500 font-mono">-</span>
              </td>
              <!-- Language -->
              <td class="cell-lang">
                <span class="lang-code" v-if="item.language">{{ cleanLanguage(item.language) }}</span>
                <span class="lang-code empty" v-else>-</span>
              </td>
              <!-- Verdict -->
              <td class="cell-status">
                <span class="status-pill ac">AC</span>
              </td>
              <!-- Time -->
              <td class="cell-time" :title="item.solvedAt">
                {{ formatExactDate(item.solvedAt) }}
              </td>
              <!-- Action -->
              <td class="cell-act">
                <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer" class="action-btn" :title="isId ? 'Buka Soal / Submisi di Platform' : 'Open Problem / Submission on Platform'">
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
      </div>

      <div v-else class="empty-state">
        <p>{{ isId ? 'Tidak ada soal yang cocok dengan kriteria pencarian.' : 'No problems match the search criteria.' }}</p>
      </div>

      <!-- Numbered Pagination Bar -->
      <div v-if="totalPages > 1" class="pagination-bar">
        <button
          type="button"
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          class="page-nav-btn"
          :title="isId ? 'Halaman Pertama' : 'First Page'"
        >
          «
        </button>

        <button
          type="button"
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="page-nav-btn"
        >
          ‹ {{ isId ? 'Sebelumnya' : 'Prev' }}
        </button>

        <div class="page-numbers">
          <button
            v-for="p in visiblePageNumbers"
            :key="p"
            type="button"
            @click="typeof p === 'number' && goToPage(p)"
            class="page-num-btn"
            :class="{ active: currentPage === p, dots: p === '...' }"
            :disabled="p === '...'"
          >
            {{ p }}
          </button>
        </div>

        <button
          type="button"
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="page-nav-btn"
        >
          {{ isId ? 'Berikutnya' : 'Next' }} ›
        </button>

        <button
          type="button"
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
          class="page-nav-btn"
          :title="isId ? 'Halaman Terakhir' : 'Last Page'"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { lang } from '../../stores/uiStore.js';

const props = defineProps<{
  initialData?: any;
}>();

const $lang = useStore(lang);
const isId = computed(() => $lang.value === 'id');

const cpData = ref<any>(props.initialData || null);
const selectedPlatform = ref<string>('all');
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(20);

// Platform Total Solved counts
const totalAllSolved = computed(() => cpData.value?.overview?.totalSolved || 470);
const totalTlxSolved = computed(() => cpData.value?.platforms?.tlx?.totalSolved || 223);
const totalCfSolved = computed(() => cpData.value?.platforms?.codeforces?.totalSolved || 50);
const totalLcSolved = computed(() => cpData.value?.platforms?.leetcode?.totalSolved || 59);
const totalHrSolved = computed(() => cpData.value?.platforms?.hackerrank?.totalSolved || 138);

// URL Query Param handler on mounted
onMounted(() => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const plat = urlParams.get('platform');
    if (plat && ['tlx', 'codeforces', 'leetcode', 'hackerrank', 'all'].includes(plat.toLowerCase())) {
      selectedPlatform.value = plat.toLowerCase();
    }
    const q = urlParams.get('q');
    if (q) {
      searchQuery.value = q;
    }
  }
});

const selectPlatform = (platform: string) => {
  selectedPlatform.value = platform;
  currentPage.value = 1;
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    if (platform === 'all') {
      url.searchParams.delete('platform');
    } else {
      url.searchParams.set('platform', platform);
    }
    window.history.replaceState({}, '', url.toString());
  }
};

// Filtered List
const allProblems = computed(() => {
  return cpData.value?.recentGlobalFeed || [];
});

const filteredProblems = computed(() => {
  let list = allProblems.value;
  if (selectedPlatform.value !== 'all') {
    list = list.filter((item: any) => item.platform === selectedPlatform.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (item: any) =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.language && item.language.toLowerCase().includes(q)) ||
        (item.platform && item.platform.toLowerCase().includes(q)) ||
        (item.difficulty && String(item.difficulty).toLowerCase().includes(q))
    );
  }
  return list;
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredProblems.value.length / pageSize.value));
});

const paginatedProblems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredProblems.value.slice(start, start + pageSize.value);
});

const paginationRange = computed(() => {
  const total = filteredProblems.value.length;
  if (total === 0) return '0';
  const start = (currentPage.value - 1) * pageSize.value + 1;
  const end = Math.min(currentPage.value * pageSize.value, total);
  return `${start}-${end}`;
});

const visiblePageNumbers = computed(() => {
  const total = totalPages.value;
  const curr = currentPage.value;
  const pages: (number | string)[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (curr > 3) pages.push('...');
    const start = Math.max(2, curr - 1);
    const end = Math.min(total - 1, curr + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (curr < total - 2) pages.push('...');
    pages.push(total);
  }
  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  }
};

// Helpers
const getPlatformLogo = (platform: string) => {
  switch (platform) {
    case 'tlx': return '/img/tlx/tlx.webp';
    case 'codeforces': return '/img/codeforces/codeforces.webp';
    case 'leetcode': return '/img/leetcode/leetcode.webp';
    case 'hackerrank': return '/img/hackerrank/HackerRank.webp';
    default: return '/img/tlx/tlx.webp';
  }
};

const getPlatformName = (platform: string) => {
  switch (platform) {
    case 'tlx': return 'TLX';
    case 'codeforces': return 'Codeforces';
    case 'leetcode': return 'LeetCode';
    case 'hackerrank': return 'HackerRank';
    default: return platform?.toUpperCase();
  }
};

const cleanLanguage = (lang: string) => {
  if (!lang) return '-';
  if (lang.includes('Cpp20') || lang.includes('C++20')) return 'C++20';
  if (lang.includes('Cpp23') || lang.includes('C++23')) return 'C++23';
  if (lang.includes('Rust')) return 'Rust';
  if (lang.includes('Pascal')) return 'Pascal';
  if (lang.includes('Java')) return 'Java';
  if (lang.includes('Python')) return 'Python';
  if (lang.includes('SQL') || lang.includes('Sql')) return 'SQL';
  if (lang.includes('C') && !lang.includes('C++')) return 'C';
  return lang;
};

const getDiffClass = (diff: any) => {
  if (!diff) return 'normal';
  const str = String(diff).toLowerCase();
  if (str.includes('easy') || str === '800' || str === '900') return 'easy';
  if (str.includes('medium') || str === '1000' || str === '1100' || str === '1200' || str === '1300') return 'medium';
  if (str.includes('hard') || parseInt(str, 10) >= 1400) return 'hard';
  return 'normal';
};

const formatExactDate = (isoString?: string) => {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return date.toLocaleDateString(isId.value ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
</script>

<style scoped>
.cp-explorer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.explorer-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
}

.explorer-controls-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .explorer-controls-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}

.explorer-search-input {
  width: 100%;
  padding: 0.55rem 2rem 0.55rem 2.4rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  color: var(--text);
  font-size: 0.875rem;
  outline: none;
}

.explorer-search-input:focus {
  border-color: var(--text);
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 0.85rem;
  cursor: pointer;
}

.rows-per-page-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-size-dropdown {
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.8rem;
  outline: none;
}

/* Platform Filter Tabs */
.platform-filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  border-top: 1px solid var(--border);
  padding-top: 0.85rem;
}

.platform-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.platform-tab-btn:hover {
  color: var(--text);
}

.platform-tab-btn.active {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.tab-btn-logo {
  width: 0.95rem;
  height: 0.95rem;
  object-fit: contain;
}

.count-pill {
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0.85;
}

/* Table Card */
.explorer-table-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  overflow: hidden;
}

.table-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--muted);
}

.status-count {
  font-weight: 600;
  color: var(--text);
}

.table-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  max-width: 100%;
  display: block;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--border) var(--bg-soft);
}

.table-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.table-scroll-container::-webkit-scrollbar-track {
  background: var(--bg-elevated);
  border-radius: 4px;
}

.table-scroll-container::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.table-scroll-container::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

.problems-table {
  width: 100%;
  min-width: 980px;
  table-layout: fixed;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
}

/* Explicit Fixed Column Widths & Centralized Alignments */
.col-num, .cell-num { width: 50px; min-width: 50px; max-width: 50px; text-align: center; }
.col-platform, .cell-platform { width: 135px; min-width: 135px; max-width: 135px; text-align: center; }
.col-title, .cell-title { width: 280px; min-width: 280px; text-align: left; }
.col-topic, .cell-topic { width: 180px; min-width: 180px; max-width: 180px; text-align: center; }
.col-diff, .cell-diff { width: 100px; min-width: 100px; max-width: 100px; text-align: center; }
.col-lang, .cell-lang { width: 100px; min-width: 100px; max-width: 100px; text-align: center; }
.col-status, .cell-status { width: 85px; min-width: 85px; max-width: 85px; text-align: center; }
.col-time, .cell-time { width: 125px; min-width: 125px; max-width: 125px; text-align: center; }
.col-act, .cell-act { width: 50px; min-width: 50px; max-width: 50px; text-align: center; }

.problems-table th {
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.problems-table th.col-num,
.problems-table th.col-platform,
.problems-table th.col-topic,
.problems-table th.col-diff,
.problems-table th.col-lang,
.problems-table th.col-status,
.problems-table th.col-time,
.problems-table th.col-act {
  text-align: center;
}

.problems-table th.col-title {
  text-align: left;
}

.problems-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-item-row:hover {
  background: var(--bg-elevated);
}

.platform-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  margin: 0 auto;
}

.chip-img {
  width: 0.9rem;
  height: 0.9rem;
  object-fit: contain;
}

.title-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text);
  font-weight: 600;
  text-decoration: none;
  max-width: 340px;
}

.title-link:hover {
  color: var(--link);
  text-decoration: underline;
}

.title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-ext-icon {
  opacity: 0;
  transition: opacity 0.15s;
  flex-shrink: 0;
}

.title-link:hover .title-ext-icon {
  opacity: 1;
}

.topic-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.2;
  margin: 0 auto;
}

.topic-tag span {
  display: block;
  max-width: 155px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.diff-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  margin: 0 auto;
}

.diff-tag.easy {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.diff-tag.medium {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.diff-tag.hard {
  background: rgba(244, 63, 94, 0.15);
  color: #f43f5e;
  border: 1px solid rgba(244, 63, 94, 0.3);
}

.diff-tag.normal {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

/* Light Mode High Contrast Badges */
:root.light .diff-tag.easy {
  background: #d1fae5;
  color: #065f46;
  border-color: #a7f3d0;
  font-weight: 700;
}

:root.light .diff-tag.medium {
  background: #fef3c7;
  color: #92400e;
  border-color: #fde68a;
  font-weight: 700;
}

:root.light .diff-tag.hard {
  background: #ffe4e6;
  color: #9f1239;
  border-color: #fecdd3;
  font-weight: 700;
}

:root.light .diff-tag.normal {
  background: #e0f2fe;
  color: #0369a1;
  border-color: #bae6fd;
  font-weight: 700;
}

.lang-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.45rem;
  border-radius: 0.35rem;
  background: rgba(168, 85, 247, 0.12);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.25);
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: 600;
  margin: 0 auto;
}

:root.light .lang-code {
  background: #f3e8ff;
  color: #6b21a8;
  border-color: #d8b4fe;
  font-weight: 600;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0 auto;
}

.status-pill.ac {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Light mode high contrast AC Solved badge */
:root.light .status-pill.ac {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
  font-weight: 700;
}

:root.light .topic-tag {
  background: #f3f4f6;
  color: #374151;
  border-color: #e5e7eb;
  font-weight: 500;
}

:root.light .platform-chip {
  background: #f9fafb;
  color: #1f2937;
  border-color: #e5e7eb;
}

.cell-time {
  font-size: 0.75rem;
  color: var(--muted);
  white-space: nowrap;
}

:root.light .cell-time {
  color: #4b5563;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 0.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--muted);
  transition: all 0.15s;
  margin: 0 auto;
}

.action-btn:hover {
  color: var(--text);
  background: var(--chip-bg);
}


/* Pagination Bar */
.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
}

.page-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.page-nav-btn:hover:not(:disabled) {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.page-nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.page-num-btn {
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.page-num-btn:hover:not(.dots):not(.active) {
  background: var(--chip-bg);
}

.page-num-btn.active {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.page-num-btn.dots {
  border: none;
  background: transparent;
  cursor: default;
  color: var(--muted);
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
