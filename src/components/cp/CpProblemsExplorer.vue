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

        <!-- Unified Filter Popover (Desktop & Mobile) -->
        <FilterDropdown 
          v-model="selectedPlatforms"
          :categories="platformCategories"
          :locale="locale"
          itemType="platform"
        />

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
    </div>

    <!-- Results Table Container -->
    <div class="explorer-table-card">
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
      <CpTablePagination
        v-if="filteredProblems.length > 0"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="pageSize"
        :totalItems="filteredProblems.length"
        :isId="isId"
        :scrollToTop="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import FilterDropdown from "../FilterDropdown.vue";
import CpTablePagination from "./CpTablePagination.vue";
import {
  cleanLanguage,
  getPlatformLogo,
  getPlatformName,
  getDiffClass,
  formatExactDate,
} from './cpUtils';
import { useStore } from '@nanostores/vue';
import { lang } from '../../stores/uiStore.js';

const props = defineProps<{
  initialData?: any;
}>();

const $lang = useStore(lang);
const isId = computed(() => $lang.value === 'id');

const cpData = ref<any>(props.initialData || null);
const allPlatformKeys = ['tlx', 'codeforces', 'leetcode', 'hackerrank'];
const selectedPlatforms = ref<string[]>([...allPlatformKeys]);
const locale = computed(() => (isId.value ? 'id' : 'en'));

// Platform Total Solved counts
const totalAllSolved = computed(() => cpData.value?.overview?.totalSolved || 640);
const totalTlxSolved = computed(() => cpData.value?.platforms?.tlx?.totalSolved || 371);
const totalCfSolved = computed(() => cpData.value?.platforms?.codeforces?.totalSolved || 50);
const totalLcSolved = computed(() => cpData.value?.platforms?.leetcode?.totalSolved || 59);
const totalHrSolved = computed(() => cpData.value?.platforms?.hackerrank?.totalSolved || 138);

const platformCategories = computed(() => {
  return [
    { key: 'all', label: `${isId.value ? 'Semua Platform' : 'All Platforms'} (${totalAllSolved.value})` },
    { key: 'tlx', label: `TLX (${totalTlxSolved.value})`, icon: '/img/tlx/tlx.webp' },
    { key: 'codeforces', label: `Codeforces (${totalCfSolved.value})`, icon: '/img/codeforces/codeforces.webp' },
    { key: 'leetcode', label: `LeetCode (${totalLcSolved.value})`, icon: '/img/leetcode/leetcode.webp' },
    { key: 'hackerrank', label: `HackerRank (${totalHrSolved.value})`, icon: '/img/hackerrank/HackerRank.webp' }
  ];
});

const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(20);

// URL Query Param handler on mounted
onMounted(() => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const plat = urlParams.get('platform');
    if (plat) {
      if (plat.toLowerCase() === 'all') {
        selectedPlatforms.value = [...allPlatformKeys];
      } else {
        const plats = plat.toLowerCase().split(',');
        const validPlats = plats.filter(p => allPlatformKeys.includes(p));
        if (validPlats.length > 0) {
          selectedPlatforms.value = validPlats;
        }
      }
    }
    const q = urlParams.get('q');
    if (q) {
      searchQuery.value = q;
    }
  }
});

watch(selectedPlatforms, (newVal) => {
  currentPage.value = 1;
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    if (newVal.length === allPlatformKeys.length) {
      url.searchParams.delete('platform');
    } else {
      url.searchParams.set('platform', newVal.join(','));
    }
    window.history.replaceState({}, '', url.toString());
  }
});

// Filtered List
const allProblems = computed(() => {
  return cpData.value?.recentGlobalFeed || [];
});

const filteredProblems = computed(() => {
  let list = allProblems.value;
  list = list.filter((item: any) => selectedPlatforms.value.includes(item.platform));
  
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
  padding: 1.25rem;
  background: var(--bg-soft);
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

.search-box {
  position: relative;
  width: auto;
  flex: 1;
}

.search-icon,
.search-icon-svg {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.explorer-search-input {
  width: 100%;
  height: 2.5rem;
  padding: 0 2rem 0 2.4rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text);
  font-size: var(--text-base);
  outline: none;
  box-sizing: border-box;
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
  font-size: var(--text-base);
  cursor: pointer;
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
  font-size: var(--text-sm);
  font-weight: 700;
  opacity: 0.85;
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

.table-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  font-size: var(--text-base);
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
  border-radius: var(--radius-sm);
}

.table-scroll-container::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: var(--radius-sm);
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
  font-size: var(--text-base);
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
  font-size: var(--text-xs);
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
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  font-size: var(--text-xs);
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
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: var(--text-xs);
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
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
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
  border-radius: var(--radius-sm);
  background: rgba(168, 85, 247, 0.12);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.25);
  font-size: var(--text-xs);
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
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
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
  font-size: var(--text-xs);
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
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  border: none;
  color: var(--muted);
  transition: all 0.15s;
  margin: 0 auto;
}

.action-btn:hover {
  color: var(--text);
  background: var(--chip-bg);
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

  .explorer-controls-header .search-box {
    max-width: none !important;
    flex: 1 !important;
  }

  .rows-per-page-select {
    display: none !important;
  }
}
</style>
