<template>
  <div class="platform-spotlight">
    <div class="spotlight-header">
      <div class="flex items-center gap-3.5">
        <div class="spotlight-logo-box">
          <img src="/img/leetcode/leetcode.webp" alt="LeetCode" class="spotlight-img-logo" />
        </div>
        <div>
          <h2>LeetCode</h2>
          <p>{{ isId ? 'Platform latihan Data Structures & Algorithms untuk persiapan teknikal software engineer.' : 'Data Structures & Algorithms practice platform for software engineering technical preparation.' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <a href="/competitive-programming/problems?platform=leetcode" class="dedicated-page-header-btn">
          <span>{{ isId ? 'Buka Koleksi LeetCode (59 Soal)' : 'Open LeetCode Archive (59)' }}</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a :href="`https://leetcode.com/u/${cpData?.platforms?.leetcode?.handle || 'fsaree'}`" target="_blank" class="external-profile-btn">
          {{ isId ? 'Profil LeetCode ↗' : 'LeetCode Profile ↗' }}
        </a>
      </div>
    </div>

    <div class="spotlight-metrics-grid">
      <div class="spotlight-metric">
        <span class="metric-label">Easy Solved</span>
        <span class="metric-val metric-val-emerald">{{ cpData?.platforms?.leetcode?.easySolved || 32 }}</span>
        <span class="metric-sub">{{ isId ? 'Fondasi & Dasar DSA' : 'DSA Foundations & Basics' }}</span>
      </div>
      <div class="spotlight-metric">
        <span class="metric-label">Medium Solved</span>
        <span class="metric-val metric-val-amber">{{ cpData?.platforms?.leetcode?.mediumSolved || 24 }}</span>
        <span class="metric-sub">{{ isId ? 'Problem Solving Inti' : 'Core Problem Solving' }}</span>
      </div>
      <div class="spotlight-metric">
        <span class="metric-label">Hard Solved</span>
        <span class="metric-val metric-val-rose">{{ cpData?.platforms?.leetcode?.hardSolved || 3 }}</span>
        <span class="metric-sub">{{ isId ? 'Kompleksitas Lanjutan' : 'Advanced Complexity' }}</span>
      </div>
    </div>

    <!-- LeetCode Recent Solved Table -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 class="text-lg font-semibold platform-subtitle">{{ isId ? 'Soal LeetCode yang Diselesaikan' : 'Solved LeetCode Problems' }}</h4>
        <span class="text-xs platform-count-text">{{ isId ? `Total ${recentSolvedList.length} soal tercatat` : `Total ${recentSolvedList.length} recorded problems` }}</span>
      </div>

      <div class="cp-table-wrapper">
        <table class="cp-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-title">{{ isId ? 'Judul Soal' : 'Problem Name' }}</th>
              <th class="col-category">{{ isId ? 'Kategori' : 'Category' }}</th>
              <th class="col-status">Status</th>
              <th class="col-time">{{ isId ? 'Waktu' : 'Solved' }}</th>
              <th class="col-action"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in paginatedList" :key="item.id || idx" class="cp-table-row">
              <td class="cell-num">{{ (currentPage - 1) * pageSize + idx + 1 }}</td>
              <td class="cell-title">
                <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer" class="problem-title-link">
                  <span class="title-text">{{ item.title }}</span>
                </a>
              </td>
              <td class="cell-category">
                <span class="topic-pill" v-if="item.category" :title="item.category">
                  <span>{{ item.category }}</span>
                </span>
              </td>
              <td class="cell-status">
                <span class="status-badge ac">AC</span>
              </td>
              <td class="cell-time">
                {{ formatExactDate(item.solvedAt, isId) }}
              </td>
              <td class="cell-action">
                <a :href="item.url" target="_blank" class="open-btn" :title="isId ? 'Buka di LeetCode' : 'Open on LeetCode'">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Reusable Pagination -->
        <CpTablePagination
          v-model:currentPage="currentPage"
          :totalPages="totalPages"
          :pageSize="pageSize"
          :totalItems="recentSolvedList.length"
          :isId="isId"
        />

        <!-- Dedicated Link Banner -->
        <div class="tab-bottom-cta">
          <a href="/competitive-programming/problems?platform=leetcode" class="tab-cta-btn">
            <span>{{ isId ? `Lihat Seluruh ${totalLcSolved} Soal LeetCode di Halaman Khusus →` : `View All ${totalLcSolved} LeetCode Problems on Dedicated Page →` }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CpTablePagination from './CpTablePagination.vue';
import { formatExactDate } from './cpUtils';

const props = withDefaults(
  defineProps<{
    cpData: any;
    totalLcSolved?: number;
    isId?: boolean;
  }>(),
  {
    totalLcSolved: 59,
    isId: false,
  }
);

const currentPage = ref(1);
const pageSize = ref(10);

const recentSolvedList = computed(() => {
  return props.cpData?.platforms?.leetcode?.recentSolved || [];
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(recentSolvedList.value.length / pageSize.value));
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return recentSolvedList.value.slice(start, start + pageSize.value);
});
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
