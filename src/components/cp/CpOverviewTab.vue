<template>
  <div class="overview-tab">
    <!-- Platform Breakdown Cards -->
    <div class="platform-cards-grid">
      <!-- TLX Card -->
      <PlatformCard
        name="TOKI Learning Center"
        :handle="cpData?.platforms?.tlx?.handle || 'aycaaa'"
        logo="/img/tlx/tlx.webp"
        :solvedNum="totalTlxSolved"
        :solvedLabel="isId ? 'selesai' : 'solved'"
        :footerText="isId ? 'Lihat Detail TLX →' : 'View TLX Details →'"
        @select="$emit('selectPlatform', 'tlx')"
      >
        <div class="pcard-meta-row">
          <span>{{ isId ? 'Submisi Total' : 'Total Submissions' }}:</span>
          <strong>{{ cpData?.platforms?.tlx?.totalSubmissions || 561 }}</strong>
        </div>
        <div class="pcard-meta-row">
          <span>{{ isId ? 'Bahasa Dominan' : 'Top Language' }}:</span>
          <strong>C++20</strong>
        </div>
      </PlatformCard>

      <!-- Codeforces Card -->
      <PlatformCard
        name="Codeforces"
        :handle="cpData?.platforms?.codeforces?.handle || 'feeera'"
        logo="/img/codeforces/codeforces.webp"
        :solvedNum="cpData?.platforms?.codeforces?.rating || 625"
        solvedLabel="rating"
        :footerText="isId ? 'Lihat Detail Codeforces →' : 'View Codeforces Details →'"
        @select="$emit('selectPlatform', 'codeforces')"
      >
        <div class="pcard-meta-row">
          <span>{{ isId ? 'Soal Selesai' : 'Problems Solved' }}:</span>
          <strong>{{ totalCfSolved }} {{ isId ? 'Soal' : 'Problems' }}</strong>
        </div>
        <div class="pcard-meta-row">
          <span>Rank:</span>
          <strong class="cf-rank-text capitalize">{{ cpData?.platforms?.codeforces?.rank || 'newbie' }}</strong>
        </div>
      </PlatformCard>

      <!-- LeetCode Card -->
      <PlatformCard
        name="LeetCode"
        :handle="cpData?.platforms?.leetcode?.handle || 'fsaree'"
        logo="/img/leetcode/leetcode.webp"
        :solvedNum="totalLcSolved"
        :solvedLabel="isId ? 'selesai' : 'solved'"
        :footerText="isId ? 'Lihat Detail LeetCode →' : 'View LeetCode Details →'"
        @select="$emit('selectPlatform', 'leetcode')"
      >
        <div class="pcard-meta-row">
          <span>{{ isId ? 'Tingkat Kesulitan' : 'Difficulty Split' }}:</span>
          <span class="diff-split">
            <span class="diff-cnt easy">{{ cpData?.platforms?.leetcode?.easySolved || 32 }}E</span>
            ·
            <span class="diff-cnt medium">{{ cpData?.platforms?.leetcode?.mediumSolved || 24 }}M</span>
            ·
            <span class="diff-cnt hard">{{ cpData?.platforms?.leetcode?.hardSolved || 3 }}H</span>
          </span>
        </div>
        <div class="pcard-meta-row">
          <span>Global Ranking:</span>
          <strong>~{{ (cpData?.platforms?.leetcode?.ranking || 2367686).toLocaleString() }}</strong>
        </div>
      </PlatformCard>

      <!-- HackerRank Card -->
      <PlatformCard
        name="HackerRank"
        :handle="cpData?.platforms?.hackerrank?.handle || 'areee'"
        logo="/img/hackerrank/HackerRank.webp"
        :solvedNum="totalHrSolved + '+'"
        :solvedLabel="isId ? 'selesai' : 'solved'"
        :footerText="isId ? 'Lihat Detail HackerRank →' : 'View HackerRank Details →'"
        @select="$emit('selectPlatform', 'hackerrank')"
      >
        <div class="pcard-meta-row">
          <span>Algorithms Track:</span>
          <strong class="track-pts-emerald">1029.98 pts</strong>
        </div>
        <div class="pcard-meta-row">
          <span>SQL Track:</span>
          <strong class="track-pts-sky">390 pts</strong>
        </div>
        <div class="pcard-meta-row">
          <span>C++ & Java Track:</span>
          <strong>430+ pts</strong>
        </div>
      </PlatformCard>
    </div>

    <!-- Unified Solved Problems Section (Informative Table + Pagination) -->
    <div class="feed-section">
      <div class="feed-header">
        <div>
          <h3>
            {{
              isId ? "Daftar Soal yang Diselesaikan" : "Solved Problems History"
            }}
          </h3>
          <p class="feed-subtitle">
            {{
              isId
                ? "Aktivitas penyelesaian soal lintas platform secara kronologis."
                : "Chronological stream of solved challenges across all competitive platforms."
            }}
          </p>
        </div>

        <!-- Feed Filter Controls -->
        <div class="feed-controls">
          <div class="search-input-wrap">
            <svg
              class="search-icon w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="
                isId
                  ? 'Cari judul soal, topik, bahasa...'
                  : 'Search problem title, topic, language...'
              "
              class="search-input"
              @input="currentPage = 1" />
          </div>

          <!-- Unified Filter Popover (Desktop & Mobile) -->
          <FilterDropdown
            v-model="feedPlatformFilter"
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
          :isId="isId"
        />

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
            isId
              ? "Tidak ada soal yang cocok dengan filter pencarian."
              : "No problems found matching your filter."
          }}
        </p>
      </div>

      <!-- Dedicated Archive CTA Card -->
      <div class="view-all-archive-cta">
        <div class="cta-info">
          <div class="flex items-center gap-2">
            <h4 class="cta-title">
              {{
                isId
                  ? `Jelajahi Seluruh ${totalAllSolved}+ Koleksi Soal`
                  : `Explore Complete ${totalAllSolved}+ Solved Archive`
              }}
            </h4>
          </div>
          <p class="cta-desc">
            {{
              isId
                ? "Buka halaman arsip terfokus dengan filter komprehensif, pencarian cepat per topik, navigasi multi-halaman, dan link soal langsung."
                : "Open the dedicated archive page with full-text search, topic filtering, multi-page pagination, and direct problem links."
            }}
          </p>
        </div>
        <a
          :href="`/competitive-programming/problems${feedPlatformFilter.length < allPlatformKeys.length ? '?platform=' + feedPlatformFilter.join(',') : ''}`"
          class="cta-action-btn">
          <span>{{
            isId ? "Buka Halaman Arsip Soal" : "Open Solved Problems Archive"
          }}</span>
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
import { ref, computed } from "vue";
import FilterDropdown from "../shared/FilterDropdown.vue";
import CpTablePagination from "./CpTablePagination.vue";
import CpProblemsTable from "./CpProblemsTable.vue";
import PlatformCard from "../shared/PlatformCard.vue";
import { cleanLanguage, getDiffClass } from "../../utils/cp/formatting";
import { getPlatformLogo, getPlatformName } from "../../utils/cp/platforms";

const props = withDefaults(
  defineProps<{
    cpData: any;
    totalTlxSolved?: number;
    totalCfSolved?: number;
    totalLcSolved?: number;
    totalHrSolved?: number;
    isId?: boolean;
    locale?: "en" | "id";
  }>(),
  {
    totalTlxSolved: 437,
    totalCfSolved: 68,
    totalLcSolved: 102,
    totalHrSolved: 147,
    isId: false,
    locale: "en",
  },
);

defineEmits<{
  (e: "selectPlatform", platform: string): void;
}>();

const allPlatformKeys = ["tlx", "codeforces", "leetcode", "hackerrank"];
const feedPlatformFilter = ref<string[]>([...allPlatformKeys]);
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(10);

const totalAllSolved = computed(() => {
  return (
    props.cpData?.overview?.totalSolved ||
    props.totalTlxSolved +
      props.totalCfSolved +
      props.totalLcSolved +
      props.totalHrSolved
  );
});

const platformCategories = computed(() => [
  {
    key: "all",
    label: `${props.locale === "id" ? "Semua Platform" : "All Platforms"} (${totalAllSolved.value})`,
  },
  {
    key: "tlx",
    label: `TLX (${props.totalTlxSolved})`,
    icon: "/img/tlx/tlx.webp",
  },
  {
    key: "codeforces",
    label: `Codeforces (${props.totalCfSolved})`,
    icon: "/img/codeforces/codeforces.webp",
  },
  {
    key: "leetcode",
    label: `LeetCode (${props.totalLcSolved})`,
    icon: "/img/leetcode/leetcode.webp",
  },
  {
    key: "hackerrank",
    label: `HackerRank (${props.totalHrSolved})`,
    icon: "/img/hackerrank/HackerRank.webp",
  },
]);

const allRecentFeed = computed(() => {
  return props.cpData?.recentGlobalFeed || [];
});

const filteredFeed = computed(() => {
  let list = allRecentFeed.value;
  list = list.filter((item: any) =>
    feedPlatformFilter.value.includes(item.platform),
  );
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (item: any) =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.language && item.language.toLowerCase().includes(q)) ||
        (item.platform && item.platform.toLowerCase().includes(q)) ||
        (item.difficulty && String(item.difficulty).toLowerCase().includes(q)),
    );
  }
  return list;
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredFeed.value.length / pageSize.value));
});

const paginatedFeed = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredFeed.value.slice(start, start + pageSize.value);
});
</script>

<style scoped>
.overview-tab {
  display: flex;
  flex-direction: column;
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
  position: relative;
  width: auto;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}

.search-input {
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem 0 2.2rem;
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--text-base);
  outline: none;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: var(--text);
}

:root.light .search-input {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #0f172a;
}

:root.light .search-input:focus {
  border-color: #64748b;
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
