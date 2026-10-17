<template>
  <div class="platform-spotlight">
    <div class="spotlight-header">
      <div class="flex items-center gap-3.5">
        <div class="spotlight-logo-box">
          <img src="/img/hackerrank/HackerRank.webp" alt="HackerRank" class="spotlight-img-logo" />
        </div>
        <div>
          <h2>HackerRank</h2>
          <p>{{ isId ? 'Platform evaluasi kemampuan programming, SQL, problem solving, dan bahasa pemrograman.' : 'Evaluation platform for programming skills, SQL, problem solving, and languages.' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <a href="/competitive-programming/problems?platform=hackerrank" class="dedicated-page-header-btn">
          <span>{{ isId ? 'Buka Koleksi HackerRank (138+ Challenges)' : 'Open HackerRank Archive (138+)' }}</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a :href="`https://www.hackerrank.com/profile/${cpData?.platforms?.hackerrank?.handle || 'areee'}`" target="_blank" class="external-profile-btn">
          {{ isId ? 'Profil HackerRank ↗' : 'HackerRank Profile ↗' }}
        </a>
      </div>
    </div>

    <!-- Track Scores Grid -->
    <div class="mt-4">
      <h4 class="text-lg font-semibold mb-4 platform-subtitle">{{ isId ? 'Skor & Track Domain' : 'Scores & Track Domains' }}</h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="track in (cpData?.platforms?.hackerrank?.trackScores || [])"
          :key="track.slug"
          class="p-4 rounded-xl hr-track-card"
        >
          <span class="text-sm font-medium hr-track-name">{{ track.name }}</span>
          <div class="text-2xl font-bold hr-track-score mt-1">{{ track.score }} pts</div>
          <span v-if="track.rank" class="text-xs hr-track-rank mt-1 block">Rank #{{ track.rank.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Badges Grid -->
    <div class="mt-8">
      <h4 class="text-lg font-semibold mb-4 platform-subtitle">{{ isId ? 'Badge & Bintang Keahlian' : 'Badges & Skill Stars' }}</h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="b in (cpData?.platforms?.hackerrank?.badges || [])"
          :key="b.name"
          class="p-3.5 rounded-xl hr-badge-card text-center"
        >
          <div class="hr-badge-stars font-bold text-lg">★ {{ b.stars }} Stars</div>
          <div class="text-sm font-semibold hr-badge-name mt-1">{{ b.name }}</div>
          <div class="text-xs hr-badge-solved mt-0.5">{{ b.solved }} {{ isId ? 'selesai' : 'solved' }}</div>
        </div>
      </div>
    </div>

    <!-- HackerRank Recent Challenges Table -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 class="text-lg font-semibold platform-subtitle">{{ isId ? 'Tantangan HackerRank yang Diselesaikan' : 'Solved HackerRank Challenges' }}</h4>
        <span class="text-xs platform-count-text">{{ isId ? `Total ${recentSolvedList.length} tantangan tercatat` : `Total ${recentSolvedList.length} recorded challenges` }}</span>
      </div>

      <div class="cp-table-wrapper">
        <table class="cp-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-title">{{ isId ? 'Tantangan' : 'Challenge' }}</th>
              <th class="col-category">{{ isId ? 'Track / Domain' : 'Track / Domain' }}</th>
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
                <a :href="item.url" target="_blank" class="open-btn" :title="isId ? 'Buka di HackerRank' : 'Open on HackerRank'">
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
          <a href="/competitive-programming/problems?platform=hackerrank" class="tab-cta-btn">
            <span>{{ isId ? `Lihat Seluruh ${totalHrSolved}+ Tantangan HackerRank di Halaman Khusus →` : `View All ${totalHrSolved}+ HackerRank Challenges on Dedicated Page →` }}</span>
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
    totalHrSolved?: number;
    isId?: boolean;
  }>(),
  {
    totalHrSolved: 138,
    isId: false,
  }
);

const currentPage = ref(1);
const pageSize = ref(10);

const recentSolvedList = computed(() => {
  return props.cpData?.platforms?.hackerrank?.recentSolved || [];
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
.hr-track-card {
  background: var(--bg-soft);
  border: none;
}
:root.light .hr-track-card {
  background: var(--bg-soft) !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.hr-track-name {
  color: #e2e8f0;
}
:root.light .hr-track-name {
  color: #334155 !important;
}

.hr-track-score {
  color: #34d399;
}
:root.light .hr-track-score {
  color: #047857 !important;
}

.hr-track-rank {
  color: var(--muted);
}
:root.light .hr-track-rank {
  color: #64748b !important;
}

.hr-badge-card {
  background: var(--bg-soft);
  border: none;
}
:root.light .hr-badge-card {
  background: var(--bg-soft) !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.hr-badge-stars {
  color: #fbbf24;
}
:root.light .hr-badge-stars {
  color: #b45309 !important;
}

.hr-badge-name {
  color: #f3f4f6;
}
:root.light .hr-badge-name {
  color: #1e293b !important;
}

.hr-badge-solved {
  color: var(--muted);
}
:root.light .hr-badge-solved {
  color: #64748b !important;
}

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
