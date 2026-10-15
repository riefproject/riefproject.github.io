<template>
  <div class="platform-spotlight">
    <div class="spotlight-header">
      <div class="flex items-center gap-3.5">
        <div class="spotlight-logo-box">
          <img src="/img/tlx/tlx.webp" alt="TLX" class="spotlight-img-logo" />
        </div>
        <div>
          <h2>TLX (TOKI Learning Center)</h2>
          <p>{{ isId ? 'Platform resmi Ikatan Alumni Tim Olimpiade Komputer Indonesia (IA-TOKI).' : 'Official platform of the Indonesian Informatics Olympiad Alumni Association (IA-TOKI).' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <a href="/competitive-programming/problems?platform=tlx" class="dedicated-page-header-btn">
          <span>{{ isId ? 'Buka Koleksi TLX (194 Soal)' : 'Open TLX Archive (194)' }}</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a :href="`https://tlx.toki.id/profiles/${cpData?.platforms?.tlx?.handle || 'aycaaa'}`" target="_blank" class="external-profile-btn">
          {{ isId ? 'Profil TLX ↗' : 'TLX Profile ↗' }}
        </a>
      </div>
    </div>

    <div class="spotlight-metrics-grid">
      <div class="spotlight-metric">
        <span class="metric-label">{{ isId ? 'Soal Selesai' : 'Unique Solved' }}</span>
        <span class="metric-val metric-val-emerald">{{ totalTlxSolved }}</span>
        <span class="metric-sub">{{ isId ? 'Soal Berhasil AC' : 'Problems Accepted' }}</span>
      </div>
      <div class="spotlight-metric">
        <span class="metric-label">{{ isId ? 'Total Submisi' : 'Total Submissions' }}</span>
        <span class="metric-val metric-val-sky">{{ cpData?.platforms?.tlx?.totalSubmissions || 561 }}</span>
        <span class="metric-sub">{{ isId ? 'Riwayat submisi di TLX' : 'Submission history on TLX' }}</span>
      </div>
      <div class="spotlight-metric">
        <span class="metric-label">{{ isId ? 'Submisi AC' : 'Total AC Submissions' }}</span>
        <span class="metric-val metric-val-amber">{{ cpData?.platforms?.tlx?.totalAcSubmissions || 215 }}</span>
        <span class="metric-sub">{{ isId ? 'Submisi berstatus 100/AC' : 'Submissions with 100/AC score' }}</span>
      </div>
    </div>

    <!-- TLX Recent Solved Table + Numbered Pagination -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 class="text-lg font-semibold platform-subtitle">{{ isId ? 'Soal TLX yang Diselesaikan' : 'Solved TLX Problems' }}</h4>
        <span class="text-xs platform-count-text">{{ isId ? `Total ${recentSolvedList.length} soal tercatat` : `Total ${recentSolvedList.length} recorded problems` }}</span>
      </div>

      <div class="cp-table-wrapper">
        <table class="cp-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-title">{{ isId ? 'Judul Soal' : 'Problem Name' }}</th>
              <th class="col-category">{{ isId ? 'Topik / Modul' : 'Topic' }}</th>
              <th class="col-lang">{{ isId ? 'Bahasa' : 'Language' }}</th>
              <th class="col-status">Status</th>
              <th class="col-time">{{ isId ? 'Waktu' : 'Solved' }}</th>
              <th class="col-action"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in paginatedList" :key="item.id || idx" class="cp-table-row">
              <td class="cell-num">{{ (currentPage - 1) * pageSize + idx + 1 }}</td>
              <td class="cell-title">
                <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer" class="problem-title-link" :title="item.title">
                  <span class="title-text">{{ item.title }}</span>
                  <svg class="w-3.5 h-3.5 link-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </td>
              <td class="cell-category">
                <span class="topic-pill" v-if="item.category" :title="item.category">
                  <span>{{ item.category }}</span>
                </span>
              </td>
              <td class="cell-lang">
                <span class="lang-tag">{{ cleanLanguage(item.language) }}</span>
              </td>
              <td class="cell-status">
                <span class="status-badge ac">AC</span>
              </td>
              <td class="cell-time">
                {{ formatExactDate(item.solvedAt, isId) }}
              </td>
              <td class="cell-action">
                <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer" class="open-btn" :title="isId ? 'Buka Submisi / Jawaban di TLX' : 'Open Submission / Answer on TLX'">
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
          <a href="/competitive-programming/problems?platform=tlx" class="tab-cta-btn">
            <span>{{ isId ? `Lihat Seluruh ${totalTlxSolved} Soal TLX di Halaman Khusus →` : `View All ${totalTlxSolved} TLX Problems on Dedicated Page →` }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CpTablePagination from './CpTablePagination.vue';
import { cleanLanguage, formatExactDate } from './cpUtils';

const props = withDefaults(
  defineProps<{
    cpData: any;
    totalTlxSolved?: number;
    isId?: boolean;
  }>(),
  {
    totalTlxSolved: 371,
    isId: false,
  }
);

const currentPage = ref(1);
const pageSize = ref(10);

const recentSolvedList = computed(() => {
  return props.cpData?.platforms?.tlx?.recentSolved || [];
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
  border-top: 1px solid var(--border);
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
