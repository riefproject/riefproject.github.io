<template>
  <div class="cp-dashboard">
    <!-- Header / Live Bar -->
    <div class="dashboard-topbar">
      <div class="live-indicator">
        <span class="pulse-dot" :class="{ 'is-refreshing': isRefreshing }"></span>
        <span class="live-text">
          {{ isRefreshing ? (isId ? 'Memperbarui data...' : 'Refreshing data...') : (isId ? 'Sinkronisasi Live' : 'Live Synced') }}
        </span>
        <span class="updated-time" v-if="lastUpdated">
          • {{ formatRelativeTime(lastUpdated) }}
        </span>
      </div>

      <button
        type="button"
        @click="refreshData"
        class="refresh-btn"
        :disabled="isRefreshing"
        :title="isId ? 'Segarkan data live' : 'Refresh live data'"
      >
        <svg class="w-4 h-4" :class="{ 'animate-spin': isRefreshing }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
        <span>{{ isId ? 'Refresh' : 'Refresh' }}</span>
      </button>
    </div>

    <!-- Global Hero Stats -->
    <div class="stats-grid">
      <!-- Card 1: Total Problems Solved -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Total Soal Selesai' : 'Total Problems Solved' }}</span>
        <div class="stat-value val-emerald">
          {{ totalSolved }}<span class="stat-unit">+</span>
        </div>
        <span class="stat-helper">{{ isId ? 'Akumulasi dari 4 platform' : 'Aggregated across 4 platforms' }}</span>
      </div>

      <!-- Card 2: Total Submissions -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Total Submisi' : 'Total Submissions' }}</span>
        <div class="stat-value val-sky">
          {{ totalSubmissions }}<span class="stat-unit">+</span>
        </div>
        <span class="stat-helper">{{ isId ? 'Riwayat percobaan & evaluasi juri' : 'Judged runs & submission history' }}</span>
      </div>

      <!-- Card 3: Active Platforms -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Platform Aktif' : 'Active Platforms' }}</span>
        <div class="stat-value val-amber">4</div>
        <span class="stat-helper">TLX · Codeforces · LeetCode · HackerRank</span>
      </div>

      <!-- Card 4: Primary Language -->
      <div class="stat-card">
        <span class="stat-label">{{ isId ? 'Bahasa Utama' : 'Primary Language' }}</span>
        <div class="stat-value val-purple">C++20</div>
        <span class="stat-helper">{{ isId ? '500+ submisi C++ kompetitif' : '500+ competitive C++ submissions' }}</span>
      </div>
    </div>

    <!-- Platform Quick Links Bar with Real Logos -->
    <div class="platform-handles-bar">
      <a
        v-for="p in platformPills"
        :key="p.key"
        :href="p.url"
        target="_blank"
        rel="noopener noreferrer"
        class="platform-handle-chip"
      >
        <img :src="p.logo" :alt="p.name" class="chip-logo-img" />
        <span class="chip-platform">{{ p.name }}:</span>
        <span class="chip-handle">@{{ p.handle }}</span>
        <svg class="w-3.5 h-3.5 opacity-60 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>

    <!-- Submission Activity Heatmap Section -->
    <section class="heatmap-section">
      <div class="section-header">
        <div class="title-with-badge">
          <h3>{{ isId ? 'Kalender Aktivitas Submisi' : 'Submission Activity Heatmap' }}</h3>
          <span class="activity-count-badge">
            {{ totalSubmissionsInHeatmap }} {{ isId ? 'submisi 12 bulan terakhir' : 'submissions in past 12 months' }}
          </span>
        </div>
        <div class="heatmap-legend">
          <span class="legend-label">{{ isId ? 'Sedikit' : 'Less' }}</span>
          <span class="heat-box lvl-0"></span>
          <span class="heat-box lvl-1"></span>
          <span class="heat-box lvl-2"></span>
          <span class="heat-box lvl-3"></span>
          <span class="heat-box lvl-4"></span>
          <span class="legend-label">{{ isId ? 'Banyak' : 'More' }}</span>
        </div>
      </div>

      <div class="heatmap-container">
        <div ref="heatmapScrollEl" class="heatmap-scroll">
          <div class="heatmap-grid-wrapper">
            <div class="heatmap-grid">
              <div
                v-for="(week, wIdx) in heatmapWeeks"
                :key="wIdx"
                class="heatmap-col"
              >
                <div
                  v-for="day in week"
                  :key="day.date"
                  class="heatmap-cell"
                  :class="`lvl-${day.level}`"
                  :title="formatHeatmapTooltip(day)"
                  @mouseenter="onCellMouseEnter($event, day)"
                  @mouseleave="onCellMouseLeave"
                ></div>
              </div>
            </div>
            <div class="heatmap-months">
              <span v-for="m in heatmapMonths" :key="m.name" :style="{ left: `${m.percent}%` }" class="month-label">
                {{ m.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Dynamic Floating Tooltip for Activity Matrix -->
        <Teleport to="body">
          <div
            v-if="hoveredHeatmapDay"
            class="heatmap-floating-tooltip"
            :style="{ top: `${heatmapTooltipPos.top}px`, left: `${heatmapTooltipPos.left}px` }"
          >
            <div class="tip-date">{{ formatTooltipHeaderDate(hoveredHeatmapDay.date) }}</div>
            <div class="tip-stats">
              <span class="tip-badge tip-try">
                <span class="tip-dot dot-try"></span>
                <strong>{{ hoveredHeatmapDay.tries }}</strong> {{ isId ? 'Try' : 'Tries' }}
              </span>
              <span class="tip-badge tip-ac">
                <span class="tip-dot dot-ac"></span>
                <strong>{{ hoveredHeatmapDay.ac }}</strong> AC
              </span>
            </div>
          </div>
        </Teleport>
      </div>
    </section>

    <!-- Tab System -->
    <section class="tabs-section">
      <div class="tabs-nav" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.key"
          @click="activeTab = tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
        >
          <img v-if="tab.logo" :src="tab.logo" :alt="tab.key" class="tab-logo-img" />
          <span v-else-if="tab.icon" class="tab-icon" v-html="tab.icon"></span>
          <span class="tab-name">{{ isId ? tab.labelId : tab.labelEn }}</span>
          <span v-if="tab.count" class="tab-badge">{{ tab.count }}</span>
        </button>
      </div>

      <!-- TAB 1: OVERVIEW -->
      <div v-if="activeTab === 'overview'" class="tab-content">
        <!-- Platform Breakdown Cards -->
        <div class="platform-cards-grid">
          <!-- TLX Card -->
          <div class="platform-detail-card" @click="activeTab = 'tlx'">
            <div class="pcard-header">
              <div class="pcard-title-group">
                <div class="pcard-logo-box">
                  <img src="/img/tlx/tlx.webp" alt="TLX" class="pcard-img-logo" />
                </div>
                <div class="pcard-title-text">
                  <h4 class="pcard-name">TOKI Learning Center</h4>
                  <span class="pcard-handle">@{{ cpData?.platforms?.tlx?.handle || 'aycaaa' }}</span>
                </div>
              </div>
              <div class="pcard-solved-badge">
                <span class="pcard-solved-num">{{ totalTlxSolved }}</span>
                <span class="pcard-solved-label">{{ isId ? 'selesai' : 'solved' }}</span>
              </div>
            </div>
            <div class="pcard-body">
              <div class="pcard-meta-row">
                <span>{{ isId ? 'Submisi Total' : 'Total Submissions' }}:</span>
                <strong>{{ cpData?.platforms?.tlx?.totalSubmissions || 561 }}</strong>
              </div>
              <div class="pcard-meta-row">
                <span>{{ isId ? 'Bahasa Dominan' : 'Top Language' }}:</span>
                <strong>C++20</strong>
              </div>
            </div>
            <div class="pcard-footer">
              <span class="view-details-link">{{ isId ? 'Lihat Detail TLX →' : 'View TLX Details →' }}</span>
            </div>
          </div>

          <!-- Codeforces Card -->
          <div class="platform-detail-card" @click="activeTab = 'codeforces'">
            <div class="pcard-header">
              <div class="pcard-title-group">
                <div class="pcard-logo-box">
                  <img src="/img/codeforces/codeforces.webp" alt="Codeforces" class="pcard-img-logo" />
                </div>
                <div class="pcard-title-text">
                  <h4 class="pcard-name">Codeforces</h4>
                  <span class="pcard-handle">@{{ cpData?.platforms?.codeforces?.handle || 'feeera' }}</span>
                </div>
              </div>
              <div class="pcard-solved-badge">
                <span class="pcard-solved-num">{{ cpData?.platforms?.codeforces?.rating || 625 }}</span>
                <span class="pcard-solved-label">rating</span>
              </div>
            </div>
            <div class="pcard-body">
              <div class="pcard-meta-row">
                <span>{{ isId ? 'Soal Selesai' : 'Problems Solved' }}:</span>
                <strong>{{ totalCfSolved }} Soal</strong>
              </div>
              <div class="pcard-meta-row">
                <span>Rank:</span>
                <strong class="cf-rank-text capitalize">{{ cpData?.platforms?.codeforces?.rank || 'newbie' }}</strong>
              </div>
            </div>
            <div class="pcard-footer">
              <span class="view-details-link">{{ isId ? 'Lihat Detail Codeforces →' : 'View Codeforces Details →' }}</span>
            </div>
          </div>

          <!-- LeetCode Card -->
          <div class="platform-detail-card" @click="activeTab = 'leetcode'">
            <div class="pcard-header">
              <div class="pcard-title-group">
                <div class="pcard-logo-box">
                  <img src="/img/leetcode/leetcode.webp" alt="LeetCode" class="pcard-img-logo" />
                </div>
                <div class="pcard-title-text">
                  <h4 class="pcard-name">LeetCode</h4>
                  <span class="pcard-handle">@{{ cpData?.platforms?.leetcode?.handle || 'fsaree' }}</span>
                </div>
              </div>
              <div class="pcard-solved-badge">
                <span class="pcard-solved-num">{{ totalLcSolved }}</span>
                <span class="pcard-solved-label">{{ isId ? 'selesai' : 'solved' }}</span>
              </div>
            </div>
            <div class="pcard-body">
              <div class="pcard-meta-row">
                <span>{{ isId ? 'Tingkat Kesulitan' : 'Difficulty Split' }}:</span>
                <span class="diff-split">
                  <span class="diff-cnt easy">{{ cpData?.platforms?.leetcode?.easySolved || 32 }}E</span> ·
                  <span class="diff-cnt medium">{{ cpData?.platforms?.leetcode?.mediumSolved || 24 }}M</span> ·
                  <span class="diff-cnt hard">{{ cpData?.platforms?.leetcode?.hardSolved || 3 }}H</span>
                </span>
              </div>
              <div class="pcard-meta-row">
                <span>Global Ranking:</span>
                <strong>~{{ (cpData?.platforms?.leetcode?.ranking || 2367686).toLocaleString() }}</strong>
              </div>
            </div>
            <div class="pcard-footer">
              <span class="view-details-link">{{ isId ? 'Lihat Detail LeetCode →' : 'View LeetCode Details →' }}</span>
            </div>
          </div>

          <!-- HackerRank Card -->
          <div class="platform-detail-card" @click="activeTab = 'hackerrank'">
            <div class="pcard-header">
              <div class="pcard-title-group">
                <div class="pcard-logo-box">
                  <img src="/img/hackerrank/HackerRank.webp" alt="HackerRank" class="pcard-img-logo" />
                </div>
                <div class="pcard-title-text">
                  <h4 class="pcard-name">HackerRank</h4>
                  <span class="pcard-handle">@{{ cpData?.platforms?.hackerrank?.handle || 'areee' }}</span>
                </div>
              </div>
              <div class="pcard-solved-badge">
                <span class="pcard-solved-num">{{ totalHrSolved }}+</span>
                <span class="pcard-solved-label">{{ isId ? 'selesai' : 'solved' }}</span>
              </div>
            </div>
            <div class="pcard-body">
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
            </div>
            <div class="pcard-footer">
              <span class="view-details-link">{{ isId ? 'Lihat Detail HackerRank →' : 'View HackerRank Details →' }}</span>
            </div>
          </div>
        </div>

        <!-- Unified Solved Problems Section (Informative Table + Pagination) -->
        <div class="feed-section">
          <div class="feed-header">
            <div>
              <h3>{{ isId ? 'Daftar Soal yang Diselesaikan' : 'Solved Problems History' }}</h3>
              <p class="feed-subtitle">
                {{ isId ? 'Aktivitas penyelesaian soal lintas platform secara kronologis.' : 'Chronological stream of solved challenges across all competitive platforms.' }}
              </p>
            </div>

            <!-- Feed Filter Controls -->
            <div class="feed-controls">
              <div class="search-input-wrap">
                <svg class="search-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="isId ? 'Cari judul soal, topik, bahasa...' : 'Search problem title, topic, language...'"
                  class="search-input"
                  @input="overviewCurrentPage = 1"
                />
              </div>

              <!-- Unified Filter Popover (Desktop & Mobile) -->
              <div class="filter-dropdown-container">
                <button
                  type="button"
                  @click="isFilterOpen = !isFilterOpen"
                  class="filter-trigger-btn"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                  <span>{{ activePlatformLabel }}</span>
                  <span class="active-badge" v-if="feedPlatformFilter !== 'all'">1</span>
                </button>
                
                <div v-if="isFilterOpen" class="filter-overlay" @click="isFilterOpen = false"></div>
                
                <div v-if="isFilterOpen" class="filter-dropdown-menu">
                  <div class="dropdown-list">
                    <label class="dropdown-item" @click="setPlatformFilter('all'); isFilterOpen = false">
                      <input type="radio" :checked="feedPlatformFilter === 'all'" name="platform-filter" />
                      <span>All ({{ totalSolved }})</span>
                    </label>
                    <label class="dropdown-item" @click="setPlatformFilter('tlx'); isFilterOpen = false">
                      <input type="radio" :checked="feedPlatformFilter === 'tlx'" name="platform-filter" />
                      <img src="/img/tlx/tlx.webp" alt="TLX" class="btn-logo-mini" />
                      <span>TLX ({{ totalTlxSolved }})</span>
                    </label>
                    <label class="dropdown-item" @click="setPlatformFilter('codeforces'); isFilterOpen = false">
                      <input type="radio" :checked="feedPlatformFilter === 'codeforces'" name="platform-filter" />
                      <img src="/img/codeforces/codeforces.webp" alt="CF" class="btn-logo-mini" />
                      <span>Codeforces ({{ totalCfSolved }})</span>
                    </label>
                    <label class="dropdown-item" @click="setPlatformFilter('leetcode'); isFilterOpen = false">
                      <input type="radio" :checked="feedPlatformFilter === 'leetcode'" name="platform-filter" />
                      <img src="/img/leetcode/leetcode.webp" alt="LC" class="btn-logo-mini" />
                      <span>LeetCode ({{ totalLcSolved }})</span>
                    </label>
                    <label class="dropdown-item" @click="setPlatformFilter('hackerrank'); isFilterOpen = false">
                      <input type="radio" :checked="feedPlatformFilter === 'hackerrank'" name="platform-filter" />
                      <img src="/img/hackerrank/HackerRank.webp" alt="HR" class="btn-logo-mini" />
                      <span>HackerRank ({{ totalHrSolved }})</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Feed Table -->
          <div v-if="filteredFeed.length > 0" class="cp-table-wrapper">
            <!-- Desktop/Tablet Table -->
            <table class="cp-table">
              <thead>
                <tr>
                  <th class="col-num">#</th>
                  <th class="col-platform">Platform</th>
                  <th class="col-title">{{ isId ? 'Judul Soal' : 'Problem Name' }}</th>
                  <th class="col-category">{{ isId ? 'Topik / Modul' : 'Topic / Module' }}</th>
                  <th class="col-diff">{{ isId ? 'Kesulitan' : 'Difficulty' }}</th>
                  <th class="col-lang">{{ isId ? 'Bahasa' : 'Language' }}</th>
                  <th class="col-status">Status</th>
                  <th class="col-time">{{ isId ? 'Waktu Selesai' : 'Solved Date' }}</th>
                  <th class="col-action"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in paginatedOverviewFeed" :key="item.id" class="cp-table-row">
                  <!-- Row Number -->
                  <td class="cell-num">{{ (overviewCurrentPage - 1) * overviewPageSize + idx + 1 }}</td>
                  <!-- Platform -->
                  <td class="cell-platform">
                    <div class="platform-badge-cell" :class="item.platform">
                      <img :src="getPlatformLogo(item.platform)" :alt="item.platform" class="table-logo-img" />
                      <span class="platform-text-name">{{ getPlatformName(item.platform) }}</span>
                    </div>
                  </td>
                  <!-- Title -->
                  <td class="cell-title">
                    <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer" class="problem-title-link">
                      <span class="title-text">{{ item.title }}</span>
                      <svg class="w-3.5 h-3.5 link-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </td>
                  <!-- Category -->
                  <td class="cell-category">
                    <span class="topic-pill" v-if="item.category" :title="item.category">
                      <span>{{ item.category }}</span>
                    </span>
                    <span class="text-xs text-gray-500 font-mono" v-else>-</span>
                  </td>
                  <!-- Difficulty -->
                  <td class="cell-diff">
                    <span v-if="item.difficulty && item.difficulty !== '-'" class="diff-badge" :class="getDiffClass(item.difficulty)">
                      {{ item.difficulty }}
                    </span>
                    <span v-else class="text-xs text-gray-500 font-mono">-</span>
                  </td>
                  <!-- Language -->
                  <td class="cell-lang">
                    <span class="lang-tag" v-if="item.language">{{ cleanLanguage(item.language) }}</span>
                    <span class="text-xs text-gray-500 font-mono" v-else>-</span>
                  </td>
                  <!-- Status -->
                  <td class="cell-status">
                    <span class="status-badge ac">AC</span>
                  </td>
                  <!-- Time -->
                  <td class="cell-time" :title="item.solvedAt">
                    {{ formatExactDate(item.solvedAt) }}
                  </td>
                  <!-- Action Link -->
                  <td class="cell-action">
                    <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer" class="open-btn" :title="isId ? 'Buka soal di platform' : 'Open problem'">
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

            <div class="feed-footer-controls">
              <div class="feed-counter-text">
                <span class="desktop-only-text">
                  {{ isId
                    ? `Menampilkan ${overviewRange} dari ${filteredFeed.length} soal (Halaman ${overviewCurrentPage} dari ${overviewTotalPages})`
                    : `Showing ${overviewRange} of ${filteredFeed.length} problems (Page ${overviewCurrentPage} of ${overviewTotalPages})`
                  }}
                </span>
                <div class="mobile-only-text-group">
                  <div class="mob-range-text">
                    {{ isId ? `${overviewRange} dari ${filteredFeed.length}` : `${overviewRange} of ${filteredFeed.length}` }}
                  </div>
                  <div class="mob-page-text">
                    {{ isId ? `Halaman ${overviewCurrentPage} / ${overviewTotalPages}` : `Page ${overviewCurrentPage} / ${overviewTotalPages}` }}
                  </div>
                </div>
              </div>

              <!-- Pagination Navigation Buttons -->
              <div class="pagination-nav-group" v-if="overviewTotalPages > 1">
                <button
                  type="button"
                  @click="overviewCurrentPage = 1"
                  :disabled="overviewCurrentPage === 1"
                  class="pg-btn"
                  title="First Page"
                >
                  «
                </button>
                <button
                  type="button"
                  @click="overviewCurrentPage--"
                  :disabled="overviewCurrentPage === 1"
                  class="pg-btn"
                >
                  ‹ {{ isId ? 'Prev' : 'Prev' }}
                </button>

                <div class="pg-num-list">
                  <button
                    v-for="p in overviewVisiblePages"
                    :key="p"
                    type="button"
                    @click="typeof p === 'number' && (overviewCurrentPage = p)"
                    class="pg-num-btn"
                    :class="{ active: overviewCurrentPage === p, dots: p === '...' }"
                    :disabled="p === '...'"
                  >
                    {{ p }}
                  </button>
                </div>

                <button
                  type="button"
                  @click="overviewCurrentPage++"
                  :disabled="overviewCurrentPage === overviewTotalPages"
                  class="pg-btn"
                >
                  {{ isId ? 'Next' : 'Next' }} ›
                </button>
                <button
                  type="button"
                  @click="overviewCurrentPage = overviewTotalPages"
                  :disabled="overviewCurrentPage === overviewTotalPages"
                  class="pg-btn"
                  title="Last Page"
                >
                  »
                </button>
              </div>
            </div>
          </div>

          <div v-else class="empty-feed">
            <p>{{ isId ? 'Tidak ada soal yang cocok dengan filter pencarian.' : 'No problems found matching your filter.' }}</p>
          </div>

          <!-- View More / Dedicated Page Redirect CTA Card -->
          <div class="view-all-archive-cta">
            <div class="cta-info">
              <div class="flex items-center gap-2">
                <h4 class="cta-title">{{ isId ? 'Jelajahi Seluruh 441+ Koleksi Soal' : 'Explore Complete 441+ Solved Archive' }}</h4>
              </div>
              <p class="cta-desc">
                {{ isId
                  ? 'Buka halaman arsip terfokus dengan filter komprehensif, pencarian cepat per topik, navigasi multi-halaman, dan link soal langsung.'
                  : 'Open the dedicated archive page with full-text search, topic filtering, multi-page pagination, and direct problem links.'
                }}
              </p>
            </div>
            <a
              :href="`/competitive-programming/problems${feedPlatformFilter !== 'all' ? '?platform=' + feedPlatformFilter : ''}`"
              class="cta-action-btn"
            >
              <span>{{ isId ? 'Buka Halaman Arsip Soal' : 'Open Solved Problems Archive' }}</span>
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- TAB 2: TLX -->
      <div v-if="activeTab === 'tlx'" class="tab-content">
        <div class="platform-spotlight">
          <div class="spotlight-header">
            <div class="flex items-center gap-3.5">
              <div class="spotlight-logo-box">
                <img src="/img/tlx/tlx.webp" alt="TLX" class="spotlight-img-logo" />
              </div>
              <div>
                <h2>TLX (TOKI Learning Center)</h2>
                <p>Platform resmi Ikatan Alumni Tim Olimpiade Komputer Indonesia (IA-TOKI).</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <a href="/competitive-programming/problems?platform=tlx" class="dedicated-page-header-btn">
                <span>{{ isId ? 'Buka Koleksi TLX (194 Soal)' : 'Open TLX Archive (194)' }}</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a :href="`https://tlx.toki.id/profiles/${cpData?.platforms?.tlx?.handle || 'aycaaa'}`" target="_blank" class="external-profile-btn">
                Profil TLX ↗
              </a>
            </div>
          </div>

          <div class="spotlight-metrics-grid">
            <div class="spotlight-metric">
              <span class="metric-label">Unique Solved</span>
              <span class="metric-val metric-val-emerald">{{ totalTlxSolved }}</span>
              <span class="metric-sub">Soal Berhasil AC</span>
            </div>
            <div class="spotlight-metric">
              <span class="metric-label">Total Submisi</span>
              <span class="metric-val metric-val-sky">{{ cpData?.platforms?.tlx?.totalSubmissions || 561 }}</span>
              <span class="metric-sub">Riwayat submit di TLX</span>
            </div>
            <div class="spotlight-metric">
              <span class="metric-label">Total AC Submissions</span>
              <span class="metric-val metric-val-amber">{{ cpData?.platforms?.tlx?.totalAcSubmissions || 215 }}</span>
              <span class="metric-sub">Submisi berstatus 100/AC</span>
            </div>
          </div>

          <!-- TLX Recent Solved Table + Numbered Pagination -->
          <div class="mt-8">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h4 class="text-lg font-semibold platform-subtitle">Soal TLX yang Diselesaikan</h4>
              <span class="text-xs platform-count-text">Total {{ (cpData?.platforms?.tlx?.recentSolved || []).length }} soal tercatat</span>
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
                  <tr v-for="(item, idx) in paginatedTlxList" :key="item.id" class="cp-table-row">
                    <td class="cell-num">{{ (tlxCurrentPage - 1) * tlxPageSize + idx + 1 }}</td>
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
                      {{ formatExactDate(item.solvedAt) }}
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

              <!-- TLX Pagination Bar -->
              <div class="feed-footer-controls" v-if="tlxTotalPages > 1">
                <div class="feed-counter-text">
                  <span class="desktop-only-text">
                    {{ `Halaman ${tlxCurrentPage} dari ${tlxTotalPages} (Total ${(cpData?.platforms?.tlx?.recentSolved || []).length} Soal TLX)` }}
                  </span>
                  <div class="mobile-only-text-group">
                    <div class="mob-range-text">
                      {{ `${(tlxCurrentPage - 1) * tlxPageSize + 1}-${Math.min(tlxCurrentPage * tlxPageSize, (cpData?.platforms?.tlx?.recentSolved || []).length)} dari ${(cpData?.platforms?.tlx?.recentSolved || []).length}` }}
                    </div>
                    <div class="mob-page-text">
                      {{ `Halaman ${tlxCurrentPage} / ${tlxTotalPages}` }}
                    </div>
                  </div>
                </div>
                <div class="pagination-nav-group">
                  <button type="button" @click="tlxCurrentPage = 1" :disabled="tlxCurrentPage === 1" class="pg-btn">«</button>
                  <button type="button" @click="tlxCurrentPage--" :disabled="tlxCurrentPage === 1" class="pg-btn">‹ Prev</button>
                  <div class="pg-num-list">
                    <button
                      v-for="p in tlxVisiblePages"
                      :key="p"
                      type="button"
                      @click="typeof p === 'number' && (tlxCurrentPage = p)"
                      class="pg-num-btn"
                      :class="{ active: tlxCurrentPage === p, dots: p === '...' }"
                      :disabled="p === '...'"
                    >
                      {{ p }}
                    </button>
                  </div>
                  <button type="button" @click="tlxCurrentPage++" :disabled="tlxCurrentPage === tlxTotalPages" class="pg-btn">Next ›</button>
                  <button type="button" @click="tlxCurrentPage = tlxTotalPages" :disabled="tlxCurrentPage === tlxTotalPages" class="pg-btn">»</button>
                </div>
              </div>

              <!-- Dedicated Link Banner -->
              <div class="tab-bottom-cta">
                <a href="/competitive-programming/problems?platform=tlx" class="tab-cta-btn">
                  <span>Lihat Seluruh {{ totalTlxSolved }} Soal TLX di Halaman Khusus →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: CODEFORCES -->
      <div v-if="activeTab === 'codeforces'" class="tab-content">
        <div class="platform-spotlight">
          <div class="spotlight-header">
            <div class="flex items-center gap-3.5">
              <div class="spotlight-logo-box">
                <img src="/img/codeforces/codeforces.webp" alt="Codeforces" class="spotlight-img-logo" />
              </div>
              <div>
                <h2>Codeforces</h2>
                <p>Platform kompetisi algoritma global dan olimpiade internasional.</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <a href="/competitive-programming/problems?platform=codeforces" class="dedicated-page-header-btn">
                <span>{{ isId ? 'Buka Koleksi CF (50 Soal)' : 'Open CF Archive (50)' }}</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a :href="`https://codeforces.com/profile/${cpData?.platforms?.codeforces?.handle || 'feeera'}`" target="_blank" class="external-profile-btn">
                Profil Codeforces ↗
              </a>
            </div>
          </div>

          <div class="spotlight-metrics-grid">
            <div class="spotlight-metric">
              <span class="metric-label">Current Rating</span>
              <span class="metric-val metric-val-sky">{{ cpData?.platforms?.codeforces?.rating || 625 }}</span>
              <span class="metric-sub">Rank: <span class="capitalize font-medium">{{ cpData?.platforms?.codeforces?.rank || 'newbie' }}</span></span>
            </div>
            <div class="spotlight-metric">
              <span class="metric-label">Unique Solved</span>
              <span class="metric-val metric-val-emerald">{{ totalCfSolved }}</span>
              <span class="metric-sub">Soal Berhasil AC</span>
            </div>
            <div class="spotlight-metric">
              <span class="metric-label">Total Submisi</span>
              <span class="metric-val metric-val-purple">{{ cpData?.platforms?.codeforces?.totalSubmissions || 148 }}</span>
              <span class="metric-sub">Riwayat submit di CF</span>
            </div>
          </div>

          <!-- CF Tags Breakdown -->
          <div class="mt-8">
            <h4 class="text-lg font-semibold mb-3 platform-subtitle">Topik & Algoritma di Codeforces</h4>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(cnt, tag) in (cpData?.platforms?.codeforces?.tagsCount || {})"
                :key="tag"
                class="px-3 py-1.5 rounded-lg cf-tag-card text-sm flex items-center gap-2"
              >
                <span class="cf-tag-name">{{ tag }}</span>
                <span class="cf-tag-count">{{ cnt }}</span>
              </div>
            </div>
          </div>

          <!-- CF Recent Solved Problems Table -->
          <div class="mt-8">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h4 class="text-lg font-semibold platform-subtitle">Soal Codeforces yang Diselesaikan</h4>
              <span class="text-xs platform-count-text">Total {{ (cpData?.platforms?.codeforces?.recentSolved || []).length }} soal tercatat</span>
            </div>

            <div class="cp-table-wrapper">
              <table class="cp-table">
                <thead>
                  <tr>
                    <th class="col-num">#</th>
                    <th class="col-title">Soal</th>
                    <th class="col-category">Tag</th>
                    <th class="col-diff">Difficulty</th>
                    <th class="col-lang">Bahasa</th>
                    <th class="col-status">Status</th>
                    <th class="col-time">Waktu</th>
                    <th class="col-action"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in paginatedCfList" :key="item.id" class="cp-table-row">
                    <td class="cell-num">{{ (cfCurrentPage - 1) * cfPageSize + idx + 1 }}</td>
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
                    <td class="cell-diff">
                      <span class="diff-badge" :class="getDiffClass(item.difficulty)">{{ item.difficulty }}</span>
                    </td>
                    <td class="cell-lang">
                      <span class="lang-tag">{{ cleanLanguage(item.language) }}</span>
                    </td>
                    <td class="cell-status">
                      <span class="status-badge ac">AC</span>
                    </td>
                    <td class="cell-time">
                      {{ formatExactDate(item.solvedAt) }}
                    </td>
                    <td class="cell-action">
                      <a :href="item.url" target="_blank" class="open-btn" title="Buka di Codeforces">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- CF Pagination -->
              <div class="feed-footer-controls" v-if="cfTotalPages > 1">
                <div class="feed-counter-text">
                  <span class="desktop-only-text">
                    {{ `Halaman ${cfCurrentPage} dari ${cfTotalPages} (Total ${(cpData?.platforms?.codeforces?.recentSolved || []).length} Soal CF)` }}
                  </span>
                  <div class="mobile-only-text-group">
                    <div class="mob-range-text">
                      {{ `${(cfCurrentPage - 1) * cfPageSize + 1}-${Math.min(cfCurrentPage * cfPageSize, (cpData?.platforms?.codeforces?.recentSolved || []).length)} dari ${(cpData?.platforms?.codeforces?.recentSolved || []).length}` }}
                    </div>
                    <div class="mob-page-text">
                      {{ `Halaman ${cfCurrentPage} / ${cfTotalPages}` }}
                    </div>
                  </div>
                </div>
                <div class="pagination-nav-group">
                  <button type="button" @click="cfCurrentPage = 1" :disabled="cfCurrentPage === 1" class="pg-btn">«</button>
                  <button type="button" @click="cfCurrentPage--" :disabled="cfCurrentPage === 1" class="pg-btn">‹ Prev</button>
                  <div class="pg-num-list">
                    <button
                      v-for="p in cfVisiblePages"
                      :key="p"
                      type="button"
                      @click="typeof p === 'number' && (cfCurrentPage = p)"
                      class="pg-num-btn"
                      :class="{ active: cfCurrentPage === p, dots: p === '...' }"
                      :disabled="p === '...'"
                    >
                      {{ p }}
                    </button>
                  </div>
                  <button type="button" @click="cfCurrentPage++" :disabled="cfCurrentPage === cfTotalPages" class="pg-btn">Next ›</button>
                  <button type="button" @click="cfCurrentPage = cfTotalPages" :disabled="cfCurrentPage === cfTotalPages" class="pg-btn">»</button>
                </div>
              </div>

              <!-- Dedicated Link Banner -->
              <div class="tab-bottom-cta">
                <a href="/competitive-programming/problems?platform=codeforces" class="tab-cta-btn">
                  <span>Lihat Seluruh {{ totalCfSolved }} Soal Codeforces di Halaman Khusus →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: LEETCODE -->
      <div v-if="activeTab === 'leetcode'" class="tab-content">
        <div class="platform-spotlight">
          <div class="spotlight-header">
            <div class="flex items-center gap-3.5">
              <div class="spotlight-logo-box">
                <img src="/img/leetcode/leetcode.webp" alt="LeetCode" class="spotlight-img-logo" />
              </div>
              <div>
                <h2>LeetCode</h2>
                <p>Platform latihan Data Structures & Algorithms untuk persiapan teknikal software engineer.</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <a href="/competitive-programming/problems?platform=leetcode" class="dedicated-page-header-btn">
                <span>{{ isId ? 'Buka Koleksi LeetCode (59 Soal)' : 'Open LeetCode Archive (59)' }}</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a :href="`https://leetcode.com/u/${cpData?.platforms?.leetcode?.handle || 'fsaree'}`" target="_blank" class="external-profile-btn">
                Profil LeetCode ↗
              </a>
            </div>
          </div>

          <div class="spotlight-metrics-grid">
            <div class="spotlight-metric">
              <span class="metric-label">Easy Solved</span>
              <span class="metric-val metric-val-emerald">{{ cpData?.platforms?.leetcode?.easySolved || 32 }}</span>
              <span class="metric-sub">Fondasi & Dasar DSA</span>
            </div>
            <div class="spotlight-metric">
              <span class="metric-label">Medium Solved</span>
              <span class="metric-val metric-val-amber">{{ cpData?.platforms?.leetcode?.mediumSolved || 24 }}</span>
              <span class="metric-sub">Core Problem Solving</span>
            </div>
            <div class="spotlight-metric">
              <span class="metric-label">Hard Solved</span>
              <span class="metric-val metric-val-rose">{{ cpData?.platforms?.leetcode?.hardSolved || 3 }}</span>
              <span class="metric-sub">Advanced Complexity</span>
            </div>
          </div>

          <!-- LeetCode Recent Solved Table -->
          <div class="mt-8">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h4 class="text-lg font-semibold platform-subtitle">Soal LeetCode yang Diselesaikan</h4>
              <span class="text-xs platform-count-text">Total {{ (cpData?.platforms?.leetcode?.recentSolved || []).length }} soal tercatat</span>
            </div>

            <div class="cp-table-wrapper">
              <table class="cp-table">
                <thead>
                  <tr>
                    <th class="col-num">#</th>
                    <th class="col-title">Problem</th>
                    <th class="col-category">Category</th>
                    <th class="col-status">Status</th>
                    <th class="col-time">Solved</th>
                    <th class="col-action"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in paginatedLcList" :key="item.id" class="cp-table-row">
                    <td class="cell-num">{{ (lcCurrentPage - 1) * lcPageSize + idx + 1 }}</td>
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
                      {{ formatExactDate(item.solvedAt) }}
                    </td>
                    <td class="cell-action">
                      <a :href="item.url" target="_blank" class="open-btn" title="Buka di LeetCode">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- LC Pagination -->
              <div class="feed-footer-controls" v-if="lcTotalPages > 1">
                <div class="feed-counter-text">
                  <span class="desktop-only-text">
                    {{ `Halaman ${lcCurrentPage} dari ${lcTotalPages} (Total ${(cpData?.platforms?.leetcode?.recentSolved || []).length} Soal LeetCode)` }}
                  </span>
                  <div class="mobile-only-text-group">
                    <div class="mob-range-text">
                      {{ `${(lcCurrentPage - 1) * lcPageSize + 1}-${Math.min(lcCurrentPage * lcPageSize, (cpData?.platforms?.leetcode?.recentSolved || []).length)} dari ${(cpData?.platforms?.leetcode?.recentSolved || []).length}` }}
                    </div>
                    <div class="mob-page-text">
                      {{ `Halaman ${lcCurrentPage} / ${lcTotalPages}` }}
                    </div>
                  </div>
                </div>
                <div class="pagination-nav-group">
                  <button type="button" @click="lcCurrentPage = 1" :disabled="lcCurrentPage === 1" class="pg-btn">«</button>
                  <button type="button" @click="lcCurrentPage--" :disabled="lcCurrentPage === 1" class="pg-btn">‹ Prev</button>
                  <div class="pg-num-list">
                    <button
                      v-for="p in lcVisiblePages"
                      :key="p"
                      type="button"
                      @click="typeof p === 'number' && (lcCurrentPage = p)"
                      class="pg-num-btn"
                      :class="{ active: lcCurrentPage === p, dots: p === '...' }"
                      :disabled="p === '...'"
                    >
                      {{ p }}
                    </button>
                  </div>
                  <button type="button" @click="lcCurrentPage++" :disabled="lcCurrentPage === lcTotalPages" class="pg-btn">Next ›</button>
                  <button type="button" @click="lcCurrentPage = lcTotalPages" :disabled="lcCurrentPage === lcTotalPages" class="pg-btn">»</button>
                </div>
              </div>

              <!-- Dedicated Link Banner -->
              <div class="tab-bottom-cta">
                <a href="/competitive-programming/problems?platform=leetcode" class="tab-cta-btn">
                  <span>Lihat Seluruh {{ totalLcSolved }} Soal LeetCode di Halaman Khusus →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 5: HACKERRANK -->
      <div v-if="activeTab === 'hackerrank'" class="tab-content">
        <div class="platform-spotlight">
          <div class="spotlight-header">
            <div class="flex items-center gap-3.5">
              <div class="spotlight-logo-box">
                <img src="/img/hackerrank/HackerRank.webp" alt="HackerRank" class="spotlight-img-logo" />
              </div>
              <div>
                <h2>HackerRank</h2>
                <p>Platform evaluasi skill programming, SQL, problem solving, dan bahasa pemrograman.</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <a href="/competitive-programming/problems?platform=hackerrank" class="dedicated-page-header-btn">
                <span>{{ isId ? 'Buka Koleksi HackerRank (138+ Challenges)' : 'Open HackerRank Archive (138+)' }}</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a :href="`https://www.hackerrank.com/profile/${cpData?.platforms?.hackerrank?.handle || 'areee'}`" target="_blank" class="external-profile-btn">
                Profil HackerRank ↗
              </a>
            </div>
          </div>

          <!-- Track Scores Grid -->
          <div class="mt-4">
            <h4 class="text-lg font-semibold mb-4 platform-subtitle">Skor & Track Domain</h4>
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
            <h4 class="text-lg font-semibold mb-4 platform-subtitle">Badges & Skill Stars</h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                v-for="b in (cpData?.platforms?.hackerrank?.badges || [])"
                :key="b.name"
                class="p-3.5 rounded-xl hr-badge-card text-center"
              >
                <div class="hr-badge-stars font-bold text-lg">★ {{ b.stars }} Stars</div>
                <div class="text-sm font-semibold hr-badge-name mt-1">{{ b.name }}</div>
                <div class="text-xs hr-badge-solved mt-0.5">{{ b.solved }} solved</div>
              </div>
            </div>
          </div>

          <!-- HackerRank Recent Challenges Table -->
          <div class="mt-8">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h4 class="text-lg font-semibold platform-subtitle">Challenges HackerRank yang Diselesaikan</h4>
              <span class="text-xs platform-count-text">Total {{ (cpData?.platforms?.hackerrank?.recentSolved || []).length }} challenges tercatat</span>
            </div>

            <div class="cp-table-wrapper">
              <table class="cp-table">
                <thead>
                  <tr>
                    <th class="col-num">#</th>
                    <th class="col-title">Challenge</th>
                    <th class="col-category">Track / Domain</th>
                    <th class="col-status">Status</th>
                    <th class="col-time">Solved</th>
                    <th class="col-action"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in paginatedHrList" :key="item.id" class="cp-table-row">
                    <td class="cell-num">{{ (hrCurrentPage - 1) * hrPageSize + idx + 1 }}</td>
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
                      {{ formatExactDate(item.solvedAt) }}
                    </td>
                    <td class="cell-action">
                      <a :href="item.url" target="_blank" class="open-btn" title="Buka di HackerRank">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- HR Pagination -->
              <div class="feed-footer-controls" v-if="hrTotalPages > 1">
                <div class="feed-counter-text">
                  <span class="desktop-only-text">
                    {{ `Halaman ${hrCurrentPage} dari ${hrTotalPages} (Total ${(cpData?.platforms?.hackerrank?.recentSolved || []).length} Challenges HR)` }}
                  </span>
                  <div class="mobile-only-text-group">
                    <div class="mob-range-text">
                      {{ `${(hrCurrentPage - 1) * hrPageSize + 1}-${Math.min(hrCurrentPage * hrPageSize, (cpData?.platforms?.hackerrank?.recentSolved || []).length)} dari ${(cpData?.platforms?.hackerrank?.recentSolved || []).length}` }}
                    </div>
                    <div class="mob-page-text">
                      {{ `Halaman ${hrCurrentPage} / ${hrTotalPages}` }}
                    </div>
                  </div>
                </div>
                <div class="pagination-nav-group">
                  <button type="button" @click="hrCurrentPage = 1" :disabled="hrCurrentPage === 1" class="pg-btn">«</button>
                  <button type="button" @click="hrCurrentPage--" :disabled="hrCurrentPage === 1" class="pg-btn">‹ Prev</button>
                  <div class="pg-num-list">
                    <button
                      v-for="p in hrVisiblePages"
                      :key="p"
                      type="button"
                      @click="typeof p === 'number' && (hrCurrentPage = p)"
                      class="pg-num-btn"
                      :class="{ active: hrCurrentPage === p, dots: p === '...' }"
                      :disabled="p === '...'"
                    >
                      {{ p }}
                    </button>
                  </div>
                  <button type="button" @click="hrCurrentPage++" :disabled="hrCurrentPage === hrTotalPages" class="pg-btn">Next ›</button>
                  <button type="button" @click="hrCurrentPage = hrTotalPages" :disabled="hrCurrentPage === hrTotalPages" class="pg-btn">»</button>
                </div>
              </div>

              <!-- Dedicated Link Banner -->
              <div class="tab-bottom-cta">
                <a href="/competitive-programming/problems?platform=hackerrank" class="tab-cta-btn">
                  <span>Lihat Seluruh {{ totalHrSolved }}+ Challenges HackerRank di Halaman Khusus →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="dashboard-crosslink">
      <a href="/development-activity" class="crosslink-btn">
        <svg class="crosslink-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        <span>{{ isId ? 'Jelajahi Aktivitas Development saya →' : 'Explore my Development Activity →' }}</span>
      </a>
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
const isRefreshing = ref(false);
const lastUpdated = ref<string>(props.initialData?.meta?.updatedAt || new Date().toISOString());

const activeTab = ref<'overview' | 'tlx' | 'codeforces' | 'leetcode' | 'hackerrank'>('overview');
const searchQuery = ref('');
const feedPlatformFilter = ref<string>('all');
const isFilterOpen = ref(false);

const activePlatformLabel = computed(() => {
  const map: Record<string, string> = {
    all: isId.value ? 'Semua Platform' : 'All Platforms',
    tlx: 'TLX (TOKI)',
    codeforces: 'Codeforces',
    leetcode: 'LeetCode',
    hackerrank: 'HackerRank',
  };
  return map[feedPlatformFilter.value] || 'Platform';
});

// Exact Solved Counts
const totalSolved = computed(() => cpData.value?.overview?.totalSolved || 470);
const totalSubmissions = computed(() => cpData.value?.overview?.totalSubmissions || 1194);
const totalTlxSolved = computed(() => cpData.value?.platforms?.tlx?.totalSolved || 223);
const totalCfSolved = computed(() => cpData.value?.platforms?.codeforces?.totalSolved || 50);
const totalLcSolved = computed(() => cpData.value?.platforms?.leetcode?.totalSolved || 59);
const totalHrSolved = computed(() => cpData.value?.platforms?.hackerrank?.totalSolved || 138);

// Pagination States (10 items per page by default)
const overviewCurrentPage = ref(1);
const overviewPageSize = ref(10);

const tlxCurrentPage = ref(1);
const tlxPageSize = ref(10);

const cfCurrentPage = ref(1);
const cfPageSize = ref(10);

const lcCurrentPage = ref(1);
const lcPageSize = ref(10);

const hrCurrentPage = ref(1);
const hrPageSize = ref(10);

const setPlatformFilter = (platform: string) => {
  feedPlatformFilter.value = platform;
  overviewCurrentPage.value = 1;
};

const platformPills = computed(() => [
  { key: 'tlx', name: 'TLX', handle: cpData.value?.platforms?.tlx?.handle || 'aycaaa', logo: '/img/tlx/tlx.webp', url: 'https://tlx.toki.id/profiles/aycaaa' },
  { key: 'codeforces', name: 'Codeforces', handle: cpData.value?.platforms?.codeforces?.handle || 'feeera', logo: '/img/codeforces/codeforces.webp', url: 'https://codeforces.com/profile/feeera' },
  { key: 'leetcode', name: 'LeetCode', handle: cpData.value?.platforms?.leetcode?.handle || 'fsaree', logo: '/img/leetcode/leetcode.webp', url: 'https://leetcode.com/u/fsaree' },
  { key: 'hackerrank', name: 'HackerRank', handle: cpData.value?.platforms?.hackerrank?.handle || 'areee', logo: '/img/hackerrank/HackerRank.webp', url: 'https://www.hackerrank.com/profile/areee' },
]);

const tabs = computed(() => [
  {
    key: 'overview',
    labelEn: 'All Overview',
    labelId: 'Ringkasan Utama',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    count: `${totalSolved.value}+`,
  },
  {
    key: 'tlx',
    labelEn: 'TLX (TOKI)',
    labelId: 'TLX (TOKI)',
    logo: '/img/tlx/tlx.webp',
    count: totalTlxSolved.value,
  },
  {
    key: 'codeforces',
    labelEn: 'Codeforces',
    labelId: 'Codeforces',
    logo: '/img/codeforces/codeforces.webp',
    count: totalCfSolved.value,
  },
  {
    key: 'leetcode',
    labelEn: 'LeetCode',
    labelId: 'LeetCode',
    logo: '/img/leetcode/leetcode.webp',
    count: totalLcSolved.value,
  },
  {
    key: 'hackerrank',
    labelEn: 'HackerRank',
    labelId: 'HackerRank',
    logo: '/img/hackerrank/HackerRank.webp',
    count: `${totalHrSolved.value}+`,
  },
]);

// Heatmap Calculation
interface HeatmapDay {
  date: string;
  count: number;
  tries: number;
  ac: number;
  level: number;
}

const hoveredHeatmapDay = ref<HeatmapDay | null>(null);
const heatmapTooltipPos = ref({ top: 0, left: 0 });

const onCellMouseEnter = (e: MouseEvent, day: HeatmapDay) => {
  hoveredHeatmapDay.value = day;
  const target = e.currentTarget as HTMLElement;
  if (target) {
    const rect = target.getBoundingClientRect();
    heatmapTooltipPos.value = {
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    };
  }
};

const onCellMouseLeave = () => {
  hoveredHeatmapDay.value = null;
};

const formatHeatmapTooltip = (day: HeatmapDay) => {
  const dateObj = new Date(day.date + 'T00:00:00');
  const dateFormatted = dateObj.toLocaleDateString(isId.value ? 'id-ID' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  if (day.tries === 0 && day.ac === 0) {
    return `${dateFormatted}: ${isId.value ? 'Tidak ada aktivitas (0 Try, 0 AC)' : 'No activity (0 Try, 0 AC)'}`;
  }
  return `${dateFormatted}: ${day.tries} ${isId.value ? 'Try' : 'Tries'} · ${day.ac} AC`;
};

const formatTooltipHeaderDate = (dateStr: string) => {
  const dateObj = new Date(dateStr + 'T00:00:00');
  return dateObj.toLocaleDateString(isId.value ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const heatmapData = computed(() => {
  const map = cpData.value?.overview?.heatmap || {};
  const today = new Date();
  const days: HeatmapDay[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = map[dateStr];

    let tries = 0;
    let ac = 0;
    if (typeof entry === 'number') {
      tries = entry;
    } else if (entry && typeof entry === 'object') {
      tries = Number(entry.tries || entry.count || 0);
      ac = Number(entry.ac || 0);
    }

    let level = 0;
    if (tries > 0 && tries <= 2) level = 1;
    else if (tries > 2 && tries <= 6) level = 2;
    else if (tries > 6 && tries <= 15) level = 3;
    else if (tries > 15) level = 4;

    days.push({ date: dateStr, count: tries, tries, ac, level });
  }
  return days;
});

const heatmapWeeks = computed(() => {
  const allDays = heatmapData.value;
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }
  return weeks;
});

const totalSubmissionsInHeatmap = computed(() => {
  return heatmapData.value.reduce((acc, d) => acc + d.tries, 0);
});

const heatmapMonths = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const res: { name: string; percent: number }[] = [];
  const weeks = heatmapWeeks.value;
  const totalWeeks = weeks.length;

  weeks.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date);
      if (d.getDate() <= 7) {
        res.push({
          name: months[d.getMonth()],
          percent: Math.round((idx / totalWeeks) * 100),
        });
      }
    }
  });
  return res;
});

// Overview Feed Computation & Pagination
const allRecentFeed = computed(() => {
  return cpData.value?.recentGlobalFeed || [];
});

const filteredFeed = computed(() => {
  let list = allRecentFeed.value;
  if (feedPlatformFilter.value !== 'all') {
    list = list.filter((item: any) => item.platform === feedPlatformFilter.value);
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

const overviewTotalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredFeed.value.length / overviewPageSize.value));
});

const paginatedOverviewFeed = computed(() => {
  const start = (overviewCurrentPage.value - 1) * overviewPageSize.value;
  return filteredFeed.value.slice(start, start + overviewPageSize.value);
});

const overviewRange = computed(() => {
  const total = filteredFeed.value.length;
  if (total === 0) return '0';
  const start = (overviewCurrentPage.value - 1) * overviewPageSize.value + 1;
  const end = Math.min(overviewCurrentPage.value * overviewPageSize.value, total);
  return `${start}-${end}`;
});

const getPageNumbersHelper = (totalPages: number, currentPage: number) => {
  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 2) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    if (!pages.includes(totalPages)) pages.push(totalPages);
  }
  return pages;
};

const overviewVisiblePages = computed(() => {
  return getPageNumbersHelper(overviewTotalPages.value, overviewCurrentPage.value);
});

// TLX Pagination
const tlxTotalPages = computed(() => {
  const list = cpData.value?.platforms?.tlx?.recentSolved || [];
  return Math.max(1, Math.ceil(list.length / tlxPageSize.value));
});

const paginatedTlxList = computed(() => {
  const list = cpData.value?.platforms?.tlx?.recentSolved || [];
  const start = (tlxCurrentPage.value - 1) * tlxPageSize.value;
  return list.slice(start, start + tlxPageSize.value);
});

const tlxVisiblePages = computed(() => {
  return getPageNumbersHelper(tlxTotalPages.value, tlxCurrentPage.value);
});

// CF Pagination
const cfTotalPages = computed(() => {
  const list = cpData.value?.platforms?.codeforces?.recentSolved || [];
  return Math.max(1, Math.ceil(list.length / cfPageSize.value));
});

const paginatedCfList = computed(() => {
  const list = cpData.value?.platforms?.codeforces?.recentSolved || [];
  const start = (cfCurrentPage.value - 1) * cfPageSize.value;
  return list.slice(start, start + cfPageSize.value);
});

const cfVisiblePages = computed(() => {
  return getPageNumbersHelper(cfTotalPages.value, cfCurrentPage.value);
});

// LC Pagination
const lcTotalPages = computed(() => {
  const list = cpData.value?.platforms?.leetcode?.recentSolved || [];
  return Math.max(1, Math.ceil(list.length / lcPageSize.value));
});

const paginatedLcList = computed(() => {
  const list = cpData.value?.platforms?.leetcode?.recentSolved || [];
  const start = (lcCurrentPage.value - 1) * lcPageSize.value;
  return list.slice(start, start + lcPageSize.value);
});

const lcVisiblePages = computed(() => {
  return getPageNumbersHelper(lcTotalPages.value, lcCurrentPage.value);
});

// HR Pagination
const hrTotalPages = computed(() => {
  const list = cpData.value?.platforms?.hackerrank?.recentSolved || [];
  return Math.max(1, Math.ceil(list.length / hrPageSize.value));
});

const paginatedHrList = computed(() => {
  const list = cpData.value?.platforms?.hackerrank?.recentSolved || [];
  const start = (hrCurrentPage.value - 1) * hrPageSize.value;
  return list.slice(start, start + hrPageSize.value);
});

const hrVisiblePages = computed(() => {
  return getPageNumbersHelper(hrTotalPages.value, hrCurrentPage.value);
});

// Formatters & Helpers
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

const formatRelativeTime = (isoString?: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return isId.value ? 'baru saja' : 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;

  return date.toLocaleDateString(isId.value ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const refreshData = async () => {
  isRefreshing.value = true;
  try {
    const endpoints = ['/.netlify/functions/cp-stats', '/api/cp-stats'];
    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && data.overview) {
            cpData.value = data;
            lastUpdated.value = data.meta?.updatedAt || new Date().toISOString();
            break;
          }
        }
      } catch {
        // try next
      }
    }
  } catch (err) {
    console.error('Failed to refresh live CP data:', err);
  } finally {
    setTimeout(() => {
      isRefreshing.value = false;
    }, 400);
  }
};

const heatmapScrollEl = ref<HTMLElement | null>(null);

onMounted(() => {
  refreshData();
  setTimeout(() => {
    if (heatmapScrollEl.value) {
      heatmapScrollEl.value.scrollLeft = heatmapScrollEl.value.scrollWidth;
    }
  }, 300);
});
</script>

<style scoped>
.cp-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-width: 0;
  --text-2xl: 1.75rem;
  --text-lg: 1.125rem;
  --text-base: 0.875rem;
  --text-sm: 0.75rem;
  --text-xs: 0.7rem;
}

/* Topbar */
.dashboard-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1rem;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-base);
  color: var(--muted);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: pulse-glow 2s infinite;
}

.pulse-dot.is-refreshing {
  background-color: #38bdf8;
  box-shadow: 0 0 10px #38bdf8;
}

.live-text {
  font-weight: 600;
  color: var(--text);
}

.refresh-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: var(--chip-bg);
  border-color: var(--text);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Stats Grid & Clean KPI Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 1.35rem;
  border-radius: 1rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  transition: border-color 0.2s, transform 0.2s;
}

.stat-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.stat-label {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin-bottom: 0.4rem;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1.1;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: -0.03em;
  margin-bottom: 0.35rem;
}

.val-emerald { color: #34d399; }
.val-sky { color: #38bdf8; }
.val-amber { color: #fbbf24; }
.val-purple { color: #c084fc; }

.stat-unit {
  font-size: var(--text-lg);
  font-weight: 700;
  opacity: 0.85;
  margin-left: 1px;
}

.stat-helper {
  font-size: var(--text-sm);
  color: var(--muted);
  line-height: 1.35;
}

/* Light Mode for Clean KPI Cards */
:root.light .stat-card {
  background: #ffffff;
  border-color: var(--border);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

:root.light .stat-card:hover {
  border-color: #cbd5e1;
}

:root.light .val-emerald { color: #047857; }
:root.light .val-sky { color: #0284c7; }
:root.light .val-amber { color: #b45309; }
:root.light .val-purple { color: #6b21a8; }

:root.light .stat-label {
  color: #4b5563;
  font-weight: 700;
}

:root.light .stat-helper {
  color: #6b7280;
}

/* Platform Handles Quick Bar */
.platform-handles-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
}

.platform-handle-chip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0.85rem;
  row-gap: 0.15rem;
  column-gap: 0.35rem;
  text-align: center;
  border-radius: 0.75rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text);
  text-decoration: none;
  transition: all 0.2s;
  box-sizing: border-box;
  width: 100%;
}

.platform-handle-chip:hover {
  background: var(--bg-elevated);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.platform-handle-chip svg {
  display: none;
}

.chip-logo-img {
  width: 1.1rem;
  height: 1.1rem;
  object-fit: contain;
  border-radius: 2px;
}

.chip-platform {
  font-weight: 600;
  color: var(--muted);
}

.chip-handle {
  flex-basis: 100%;
  text-align: center;
  font-weight: 700;
  color: var(--text);
  font-size: 0.75rem;
}

/* Heatmap Section */
.heatmap-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .section-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.title-with-badge h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.activity-count-badge {
  font-size: var(--text-sm);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--muted);
}

.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--text-sm);
  color: var(--muted);
}

.heat-box {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.heat-box.lvl-0 { background: var(--bg-elevated); }
.heat-box.lvl-1 { background: #064e3b; }
.heat-box.lvl-2 { background: #047857; }
.heat-box.lvl-3 { background: #10b981; }
.heat-box.lvl-4 { background: #34d399; }

.heatmap-container {
  position: relative;
}

.heatmap-scroll {
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.heatmap-grid-wrapper {
  position: relative;
  width: max-content;
  padding-bottom: 1.5rem;
}

.heatmap-grid {
  display: flex;
  gap: 3px;
}

.heatmap-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex-shrink: 0;
}

.heatmap-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background: var(--bg-elevated);
  transition: transform 0.1s;
}

.heatmap-cell:hover {
  transform: scale(1.3);
  z-index: 10;
}

.heatmap-cell.lvl-0 { background: var(--bg-elevated); opacity: 0.6; }
.heatmap-cell.lvl-1 { background: #064e3b; }
.heatmap-cell.lvl-2 { background: #047857; }
.heatmap-cell.lvl-3 { background: #10b981; }
.heatmap-cell.lvl-4 { background: #34d399; }

.heatmap-months {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.2rem;
}

.month-label {
  position: absolute;
  font-size: var(--text-xs);
  color: var(--muted);
}

/* Floating Interactive Tooltip for Activity Heatmap */
.heatmap-floating-tooltip {
  position: fixed;
  z-index: 99999;
  transform: translate(-50%, -100%);
  pointer-events: none;
  background: var(--bg-soft, #0f172a);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: 0.6rem;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  font-size: var(--text-sm);
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  animation: tooltipFadeIn 0.12s ease-out;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -90%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -100%);
  }
}

.tip-date {
  color: var(--muted, #94a3b8);
  font-weight: 500;
  font-size: var(--text-xs);
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  padding-bottom: 0.25rem;
}

.tip-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tip-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.45rem;
  border-radius: 0.35rem;
  font-size: var(--text-sm);
  font-weight: 500;
}

.tip-badge strong {
  font-weight: 700;
}

.tip-try {
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.25);
}

.tip-ac {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.tip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dot-try {
  background: #38bdf8;
}

.dot-ac {
  background: #34d399;
}

/* Tab Navigation */
.tabs-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
}

.tabs-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border);
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabs-nav::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  border-radius: 0.75rem 0.75rem 0 0;
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  color: var(--muted);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--text);
  background: var(--bg-soft);
}

.tab-btn.active {
  color: var(--text);
  background: var(--bg-soft);
  border-color: var(--border);
}

.tab-logo-img {
  width: 1.1rem;
  height: 1.1rem;
  object-fit: contain;
}

.tab-badge {
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text);
}

/* Platform Detail Cards Grid (Tab 1 Overview) */
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

.platform-detail-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.platform-detail-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.pcard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.pcard-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pcard-logo-box {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
}

.pcard-img-logo {
  width: 1.35rem;
  height: 1.35rem;
  object-fit: contain;
}

.pcard-title-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.pcard-name {
  font-size: var(--text-base);
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.pcard-handle {
  font-size: var(--text-xs);
  color: var(--muted);
  margin-top: 0.15rem;
}

.pcard-solved-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface-muted);
  white-space: nowrap;
}

.pcard-solved-num {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.pcard-solved-label {
  font-size: var(--text-xs);
  color: var(--muted);
  font-weight: 400;
}

.pcard-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--muted);
  margin-bottom: 1.25rem;
}

.pcard-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pcard-meta-row strong {
  color: var(--text);
}

.diff-split {
  font-weight: 700;
}

.diff-cnt.easy { color: #34d399; }
.diff-cnt.medium { color: #fbbf24; }
.diff-cnt.hard { color: #f43f5e; }

:root.light .diff-cnt.easy { color: #047857; font-weight: 700; }
:root.light .diff-cnt.medium { color: #b45309; font-weight: 700; }
:root.light .diff-cnt.hard { color: #be123c; font-weight: 700; }

.pcard-footer {
  border-top: 1px solid var(--border);
  padding-top: 0.75rem;
}

.view-details-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--link);
}

/* Feed / Problem Table Section */
.feed-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 3.5rem;
  min-width: 0;
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
  padding: 0.45rem 1rem 0.45rem 2.2rem;
  border-radius: 0.6rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--text-base);
  outline: none;
}

.search-input:focus {
  border-color: var(--text);
}

.filter-dropdown-container {
  position: relative;
}

.filter-trigger-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.95rem;
  border-radius: 0.6rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  height: 100%;
  box-sizing: border-box;
  white-space: nowrap;
}

.filter-trigger-btn:hover {
  background: var(--bg-elevated);
  border-color: var(--border-hover);
}

.active-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background: var(--link);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
}

.filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: transparent;
}

.filter-dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 101;
  width: 250px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: popoverFadeIn 0.15s ease-out;
}

@keyframes popoverFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-elevated);
}

.dropdown-header h4 {
  margin: 0;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text);
}

.close-dropdown-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: var(--muted);
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

.close-dropdown-btn:hover {
  color: var(--text);
}

.dropdown-list {
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.85rem;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--text);
  transition: background 0.15s;
}

.dropdown-item:hover {
  background: var(--bg-elevated);
}

.dropdown-item input[type="radio"] {
  accent-color: var(--link);
  cursor: pointer;
  margin: 0;
}

.filter-pill-btn:hover {
  color: var(--text);
}

.filter-pill-btn.active {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.btn-logo-mini {
  width: 0.9rem;
  height: 0.9rem;
  object-fit: contain;
}

/* CP Table Styling */
.cp-table-wrapper {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  max-width: 100%;
  display: block;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--border) var(--bg-soft);
}

.cp-table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.cp-table-wrapper::-webkit-scrollbar-track {
  background: var(--bg-elevated);
  border-radius: 4px;
}

.cp-table-wrapper::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.cp-table-wrapper::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

.cp-table {
  width: 100%;
  min-width: 980px;
  table-layout: fixed;
  border-collapse: collapse;
  text-align: left;
  font-size: var(--text-base);
}

/* Strict Exact Column Widths across all pages */
.col-num, .cell-num { width: 50px; min-width: 50px; max-width: 50px; text-align: center; }
.col-platform, .cell-platform { width: 135px; min-width: 135px; max-width: 135px; text-align: center; }
.col-title, .cell-title { width: 280px; min-width: 280px; text-align: left; }
.col-category, .cell-category { width: 180px; min-width: 180px; max-width: 180px; text-align: center; }
.col-diff, .cell-diff { width: 100px; min-width: 100px; max-width: 100px; text-align: center; }
.col-lang, .cell-lang { width: 100px; min-width: 100px; max-width: 100px; text-align: center; }
.col-status, .cell-status { width: 85px; min-width: 85px; max-width: 85px; text-align: center; }
.col-time, .cell-time { width: 125px; min-width: 125px; max-width: 125px; text-align: center; }
.col-action, .cell-action { width: 50px; min-width: 50px; max-width: 50px; text-align: center; }

.cp-table th {
  padding: 0.75rem 1rem;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.cp-table th.col-num,
.cp-table th.col-platform,
.cp-table th.col-category,
.cp-table th.col-diff,
.cp-table th.col-lang,
.cp-table th.col-status,
.cp-table th.col-time,
.cp-table th.col-action {
  text-align: center;
}

.cp-table th.col-title {
  text-align: left;
}

.cp-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cp-table-row:hover {
  background: var(--bg-elevated);
}

.platform-badge-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  font-size: var(--text-xs);
  font-weight: 600;
  white-space: nowrap;
  margin: 0 auto;
}

.table-logo-img {
  width: 0.95rem;
  height: 0.95rem;
  object-fit: contain;
}

.problem-title-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text);
  font-weight: 600;
  text-decoration: none;
  max-width: 320px;
}

.problem-title-link:hover {
  color: var(--link);
  text-decoration: underline;
}

.title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-arrow-icon {
  opacity: 0;
  transition: opacity 0.15s;
  flex-shrink: 0;
}

.problem-title-link:hover .link-arrow-icon {
  opacity: 1;
}

.topic-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: var(--text-xs);
  line-height: 1.2;
  margin: 0 auto;
}

.topic-pill span {
  display: block;
  max-width: 155px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.diff-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: var(--text-xs);
  font-weight: 700;
  white-space: nowrap;
  margin: 0 auto;
}

.diff-badge.easy {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.diff-badge.medium {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.diff-badge.hard {
  background: rgba(244, 63, 94, 0.15);
  color: #f43f5e;
  border: 1px solid rgba(244, 63, 94, 0.3);
}

.diff-badge.normal {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

/* High Contrast Light Mode for Difficulty */
:root.light .diff-badge.easy {
  background: #d1fae5;
  color: #065f46;
  border-color: #a7f3d0;
  font-weight: 700;
}

:root.light .diff-badge.medium {
  background: #fef3c7;
  color: #92400e;
  border-color: #fde68a;
  font-weight: 700;
}

:root.light .diff-badge.hard {
  background: #ffe4e6;
  color: #9f1239;
  border-color: #fecdd3;
  font-weight: 700;
}

:root.light .diff-badge.normal {
  background: #e0f2fe;
  color: #0369a1;
  border-color: #bae6fd;
  font-weight: 700;
}

.lang-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.45rem;
  border-radius: 0.35rem;
  background: rgba(168, 85, 247, 0.12);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.25);
  font-size: var(--text-xs);
  font-family: monospace;
  font-weight: 600;
  margin: 0 auto;
}

:root.light .lang-tag {
  background: #f3e8ff;
  color: #6b21a8;
  border-color: #d8b4fe;
  font-weight: 600;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0 auto;
}

.status-badge.ac {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Solved / AC chip in Light Mode - High Contrast Crisp Green */
:root.light .status-badge.ac {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
  font-weight: 700;
}

:root.light .topic-pill {
  background: #f3f4f6;
  color: #374151;
  border-color: #e5e7eb;
  font-weight: 500;
}

:root.light .platform-badge-cell {
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

.open-btn {
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

.open-btn:hover {
  color: var(--text);
  background: var(--chip-bg);
}


/* Numbered Pagination Nav */
.feed-footer-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
}

@media (min-width: 640px) {
  .feed-footer-controls {
    flex-direction: row;
  }
}

.feed-counter-text {
  font-size: var(--text-sm);
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
  border-radius: 0.45rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--text-sm);
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
  border-radius: 0.45rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: var(--text-sm);
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

/* Dedicated Archive CTA Card */
.view-all-archive-cta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .view-all-archive-cta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.cta-pulse-badge {
  display: inline-flex;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #34d399;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.cta-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.cta-desc {
  font-size: 0.825rem;
  color: var(--muted);
  margin: 0.35rem 0 0 0;
  max-width: 580px;
}

.cta-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 0.75rem;
  background: var(--text);
  color: var(--bg);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s;
  flex-shrink: 0;
}

.cta-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Spotlight Views */
.platform-spotlight {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
}

.spotlight-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .spotlight-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.spotlight-logo-box {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.spotlight-img-logo {
  width: 1.85rem;
  height: 1.85rem;
  object-fit: contain;
}

.spotlight-header h2 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text);
  margin: 0;
}

.spotlight-header p {
  font-size: 0.85rem;
  color: var(--muted);
  margin: 0.2rem 0 0 0;
}

.dedicated-page-header-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 0.6rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s;
}

.dedicated-page-header-btn:hover {
  background: var(--text);
  color: var(--bg);
}

.external-profile-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.85rem;
  border-radius: 0.6rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.external-profile-btn:hover {
  background: var(--chip-bg);
}

.spotlight-metrics-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 640px) {
  .spotlight-metrics-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.spotlight-metric {
  padding: 1.25rem;
  border-radius: 1rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--muted);
}

.metric-val {
  font-size: 1.75rem;
  font-weight: 800;
}

.metric-sub {
  font-size: 0.75rem;
  color: var(--muted);
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

.dashboard-crosslink {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  margin-top: 0.5rem;
}

.crosslink-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--link);
  text-decoration: none;
  transition: all 0.15s;
}

.crosslink-btn:hover {
  text-decoration: underline;
  transform: translateX(2px);
}

.crosslink-ico {
  width: 1rem;
  height: 1rem;
  opacity: 0.8;
}

.empty-feed {
  padding: 3rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}

/* Custom Semantic Colors & Light Mode Contrast Rules */
.cf-rank-text {
  color: var(--muted);
}
:root.light .cf-rank-text {
  color: #374151 !important;
}

.track-pts-emerald {
  color: #34d399;
}
:root.light .track-pts-emerald {
  color: #047857 !important;
}

.track-pts-sky {
  color: #38bdf8;
}
:root.light .track-pts-sky {
  color: #0284c7 !important;
}

/* Metric spotlight values */
.metric-val-emerald { color: #34d399; }
.metric-val-sky { color: #38bdf8; }
.metric-val-amber { color: #fbbf24; }
.metric-val-rose { color: #f43f5e; }
.metric-val-purple { color: #c084fc; }

:root.light .metric-val-emerald { color: #047857 !important; }
:root.light .metric-val-sky { color: #0284c7 !important; }
:root.light .metric-val-amber { color: #b45309 !important; }
:root.light .metric-val-rose { color: #be123c !important; }
:root.light .metric-val-purple { color: #6b21a8 !important; }

/* Subtitle and count labels */
.platform-subtitle {
  color: var(--text);
}
:root.light .platform-subtitle {
  color: #1f2937 !important;
}

.platform-count-text {
  color: var(--muted);
}
:root.light .platform-count-text {
  color: #4b5563 !important;
}

/* Codeforces Topic Tags */
.cf-tag-card {
  background: var(--bg-soft);
  border: 1px solid var(--border);
}
:root.light .cf-tag-card {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
}

.cf-tag-name {
  color: #e2e8f0;
  font-weight: 500;
}
:root.light .cf-tag-name {
  color: #334155 !important;
}

.cf-tag-count {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding: 0.15rem 0.45rem;
  border-radius: 0.35rem;
  font-size: 0.725rem;
  font-weight: 700;
}
:root.light .cf-tag-count {
  background: #e0f2fe !important;
  color: #0369a1 !important;
}

/* HackerRank Domain Track & Badges Cards */
.hr-track-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid var(--border);
}
:root.light .hr-track-card {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
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
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid var(--border);
}
:root.light .hr-badge-card {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
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

/* Tab buttons and search inputs in Light Mode */
:root.light .tab-btn {
  color: #4b5563;
}
:root.light .tab-btn:hover {
  color: #111827;
  background: #f3f4f6;
}
:root.light .tab-btn.active {
  color: #111827;
  background: #f3f4f6;
  border-color: #cbd5e1;
}

:root.light .filter-pill-btn {
  background: #ffffff;
  color: #4b5563;
  border-color: #d1d5db;
}
:root.light .filter-pill-btn:hover {
  color: #111827;
  border-color: #9ca3af;
}
:root.light .filter-pill-btn.active {
  background: #111827 !important;
  color: #ffffff !important;
  border-color: #111827 !important;
}

:root.light .search-input {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #0f172a;
}
:root.light .search-input:focus {
  border-color: #64748b;
}

:root.light .spotlight-metric {
  background: #ffffff;
  border-color: #e2e8f0;
}

:root.light .spotlight-logo-box {
  background: #f8fafc;
  border-color: #e2e8f0;
}

/* Mobile Responsive Layout Refinements (Zero Horizontal Scroll except Tables) */
@media (max-width: 767px) {
  .heatmap-section {
    padding: 1rem !important;
    gap: 0.75rem !important;
  }
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

  .tabs-nav {
    flex-wrap: wrap !important;
    justify-content: center !important;
    overflow-x: visible !important;
    border-bottom: none !important;
    gap: 0.5rem !important;
  }
  
  .tab-btn {
    border: 1px solid var(--border) !important;
    border-radius: 0.5rem !important;
    padding: 0.5rem 0.85rem !important;
    font-size: 0.8rem !important;
    width: auto !important;
    flex-grow: 1 !important;
    justify-content: center !important;
  }

  :root.light .tab-btn {
    background: #ffffff !important;
    border-color: #d1d5db !important;
  }

  :root.light .tab-btn.active {
    background: #f3f4f6 !important;
    border-color: #cbd5e1 !important;
    color: #111827 !important;
  }

  .spotlight-header {
    text-align: center !important;
    align-items: center !important;
  }

  .spotlight-header .flex {
    justify-content: center !important;
    width: 100% !important;
  }

  .dedicated-page-header-btn, 
  .external-profile-btn {
    width: 100% !important;
    justify-content: center !important;
  }

  .platform-handles-bar {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }

  .platform-handle-chip {
    padding: 0.6rem 0.4rem !important;
  }
}

@media (max-width: 480px) {
  .dashboard-topbar {
    flex-direction: column !important;
    gap: 0.75rem !important;
    align-items: stretch !important;
    text-align: center !important;
  }

  .live-indicator {
    justify-content: center !important;
  }

  .refresh-btn {
    justify-content: center !important;
  }
}

/* Responsive Pagination Text & Styles */
.mobile-only-text-group {
  display: none;
}

@media (max-width: 640px) {
  .desktop-only-text {
    display: none !important;
  }
  .mobile-only-text-group {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.15rem !important;
    text-align: left !important;
  }
  
  .mob-range-text {
    font-size: 0.775rem !important;
    font-weight: 700 !important;
    color: var(--text) !important;
  }

  .mob-page-text {
    font-size: 0.675rem !important;
    font-weight: 500 !important;
    color: var(--muted) !important;
  }
  
  /* Hide page numbers and jump buttons on mobile to keep controls simple and thumb-friendly */
  .feed-footer-controls .pg-num-list,
  .feed-footer-controls .pg-btn[title="First Page"],
  .feed-footer-controls .pg-btn[title="Last Page"] {
    display: none !important;
  }
  
  .feed-footer-controls {
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.65rem 0.85rem !important;
  }
  
  .feed-counter-text {
    font-size: 0.725rem !important;
    font-weight: 600 !important;
  }

  .pagination-nav-group {
    gap: 0.3rem !important;
  }

  .pg-btn {
    padding: 0.35rem 0.65rem !important;
    font-size: 0.725rem !important;
    border-radius: 0.35rem !important;
  }
}
</style>
