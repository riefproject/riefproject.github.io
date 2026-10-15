<template>
  <div class="activity-hub">
    <!-- 1. Unified Calendar (The core consolidated feature) -->
    <section class="heatmap-section">
      <div class="section-header">
        <div class="header-left">
          <h2 class="section-title">{{ isId ? 'Kalender Aktivitas 12 Bulan' : '12-Month Activity Calendar' }}</h2>
          <span class="active-count font-mono">{{ activeDaysCount }} {{ isId ? 'hari aktif' : 'active days' }}</span>
        </div>

        <!-- Filter toggle -->
        <div class="filter-toggle" role="group" :aria-label="isId ? 'Filter kalender' : 'Filter calendar'">
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: heatmapFilter === 'all' }"
            @click="heatmapFilter = 'all'"
          >
            {{ isId ? 'Semua' : 'All' }}
          </button>
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: heatmapFilter === 'dev' }"
            @click="heatmapFilter = 'dev'"
          >
            Development
          </button>
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: heatmapFilter === 'cp' }"
            @click="heatmapFilter = 'cp'"
          >
            CP
          </button>
        </div>
      </div>

      <div class="heatmap-container">
        <div class="heatmap-scroll" ref="heatmapScrollEl">
          <div class="heatmap-grid-wrapper">
            <div class="heatmap-grid">
              <div v-for="(week, wIdx) in heatmapWeeks" :key="wIdx" class="heatmap-col">
                <div
                  v-for="day in week"
                  :key="day.date"
                  class="heatmap-cell"
                  :class="`lvl-${day.level}`"
                  @mouseenter="showTooltip($event, day)"
                  @mouseleave="hideTooltip"
                ></div>
              </div>
            </div>
            <div class="heatmap-months">
              <span
                v-for="m in heatmapMonths"
                :key="m.name"
                :style="{ left: `${m.percent}%` }"
                class="month-label font-mono"
              >
                {{ m.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="heatmap-footer">
          <div class="legend-row">
            <span class="legend-label">{{ isId ? 'Sedikit' : 'Less' }}</span>
            <span class="heat-box lvl-0"></span>
            <span class="heat-box lvl-1"></span>
            <span class="heat-box lvl-2"></span>
            <span class="heat-box lvl-3"></span>
            <span class="heat-box lvl-4"></span>
            <span class="legend-label">{{ isId ? 'Banyak' : 'More' }}</span>
          </div>
          <span class="swipe-hint font-mono">{{ isId ? 'Geser untuk melihat riwayat penuh →' : 'Swipe for full history →' }}</span>
        </div>
      </div>
    </section>

    <!-- 2. View Switcher & Direct Standalone CTA -->
    <div class="view-header">
      <div class="tabs-nav" role="tablist">
        <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'development'"
          class="tab-btn"
          :class="{ active: activeTab === 'development' }"
          @click="activeTab = 'development'"
        >
          <span>Development</span>
          <span class="tab-count font-mono">{{ devTotalContributions }}+</span>
        </button>

        <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'cp'"
          class="tab-btn"
          :class="{ active: activeTab === 'cp' }"
          @click="activeTab = 'cp'"
        >
          <span>Competitive Programming</span>
          <span class="tab-count font-mono">{{ totalCpSolved }}+</span>
        </button>
      </div>

      <div class="standalone-cta-wrap">
        <a
          v-if="activeTab === 'development'"
          href="/development-activity"
          class="standalone-link"
          :title="isId ? 'Buka halaman penuh Development Activity' : 'Open full Development Activity page'"
        >
          <span>{{ isId ? 'Buka halaman khusus Development' : 'Open dedicated Development page' }}</span>
          <span class="link-arrow" aria-hidden="true">→</span>
        </a>
        <a
          v-else
          href="/competitive-programming"
          class="standalone-link"
          :title="isId ? 'Buka halaman penuh CP Journey' : 'Open full CP Journey page'"
        >
          <span>{{ isId ? 'Buka halaman khusus CP Journey' : 'Open dedicated CP Journey page' }}</span>
          <span class="link-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    <!-- 3. Embedded Sub-Dashboards -->
    <div class="tab-view-content">
      <div v-if="activeTab === 'development'">
        <DevelopmentActivity :initialData="props.initialDevData" />
      </div>
      <div v-else-if="activeTab === 'cp'">
        <CpDashboard :initialData="props.initialCpData" />
      </div>
    </div>

    <!-- Floating Tooltip -->
    <div
      v-if="tooltip.visible"
      class="heatmap-tooltip"
      :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
    >
      <div class="tooltip-date font-mono">{{ tooltip.date }}</div>
      <div class="tooltip-body">
        <div v-if="tooltip.devCount > 0" class="tooltip-line">
          {{ tooltip.devCount }} {{ isId ? 'kontribusi dev' : 'dev contributions' }}
        </div>
        <div v-if="tooltip.cpTries > 0" class="tooltip-line">
          {{ tooltip.cpTries }} {{ isId ? 'submisi CP' : 'CP submissions' }} ({{ tooltip.cpAc }} AC)
        </div>
        <div class="tooltip-line text-muted" v-if="tooltip.total === 0">
          {{ isId ? 'Tidak ada aktivitas' : 'No activity' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { lang } from '../../stores/uiStore.js';
import DevelopmentActivity from '../dev/DevelopmentActivity.vue';
import CpDashboard from '../cp/CpDashboard.vue';

const props = defineProps<{
  initialDevData?: any;
  initialCpData?: any;
}>();

const $lang = useStore(lang);
const isId = computed(() => $lang.value === 'id');

const activeTab = ref<'development' | 'cp'>('development');
const heatmapFilter = ref<'all' | 'dev' | 'cp'>('all');
const heatmapScrollEl = ref<HTMLElement | null>(null);

// Dev metrics
const devPlatforms = computed(() => props.initialDevData?.platforms || {});
const githubTotal = computed(() => devPlatforms.value.github?.overview?.totalContributions || 725);
const gitlabTotal = computed(() => devPlatforms.value.gitlab?.stats?.totalEvents || 144);
const devTotalContributions = computed(() => githubTotal.value + gitlabTotal.value);

// CP metrics
const cpOverview = computed(() => props.initialCpData?.overview || {});
const totalCpSolved = computed(() => cpOverview.value.totalSolved || 641);

// Unified Heatmap construction
interface UnifiedDay {
  date: string;
  devCount: number;
  cpTries: number;
  cpAc: number;
  total: number;
  level: number;
}

const getLevel = (count: number) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  if (count <= 14) return 3;
  return 4;
};

const unifiedDays = computed<UnifiedDay[]>(() => {
  const devMap = props.initialDevData?.overview?.heatmap || {};
  const cpMap = props.initialCpData?.overview?.heatmap || {};

  const today = new Date();
  const days: UnifiedDay[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);

    const devEntry = devMap[dateStr];
    const devCount = typeof devEntry === 'object' ? Number(devEntry?.count || 0) : Number(devEntry || 0);

    const cpEntry = cpMap[dateStr];
    const cpTries = typeof cpEntry === 'object' ? Number(cpEntry?.tries || 0) : 0;
    const cpAc = typeof cpEntry === 'object' ? Number(cpEntry?.ac || 0) : 0;

    let targetTotal = 0;
    if (heatmapFilter.value === 'all') {
      targetTotal = devCount + cpTries;
    } else if (heatmapFilter.value === 'dev') {
      targetTotal = devCount;
    } else {
      targetTotal = cpTries;
    }

    days.push({
      date: dateStr,
      devCount,
      cpTries,
      cpAc,
      total: targetTotal,
      level: getLevel(targetTotal),
    });
  }

  return days;
});

const activeDaysCount = computed(() => {
  return unifiedDays.value.filter((d) => d.total > 0).length;
});

const toWeeks = (days: UnifiedDay[]) => {
  const weeks: UnifiedDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
};

const heatmapWeeks = computed(() => toWeeks(unifiedDays.value));

const heatmapMonths = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const res: { name: string; percent: number }[] = [];
  const totalWeeks = heatmapWeeks.value.length;
  heatmapWeeks.value.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date);
      if (d.getDate() <= 7) {
        res.push({ name: months[d.getMonth()], percent: Math.round((idx / totalWeeks) * 100) });
      }
    }
  });
  return res;
});

// Tooltip State
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  date: '',
  devCount: 0,
  cpTries: 0,
  cpAc: 0,
  total: 0,
});

const showTooltip = (event: MouseEvent, day: UnifiedDay) => {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const dateObj = new Date(day.date + 'T00:00:00');
  const formatted = dateObj.toLocaleDateString(isId.value ? 'id-ID' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  tooltip.value = {
    visible: true,
    x: rect.left + rect.width / 2,
    y: rect.top - 8,
    date: formatted,
    devCount: day.devCount,
    cpTries: day.cpTries,
    cpAc: day.cpAc,
    total: day.total,
  };
};

const hideTooltip = () => {
  tooltip.value.visible = false;
};

onMounted(() => {
  setTimeout(() => {
    if (heatmapScrollEl.value) {
      heatmapScrollEl.value.scrollLeft = heatmapScrollEl.value.scrollWidth;
    }
  }, 300);
});
</script>

<style scoped>
.activity-hub {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-width: 0;
}

/* 1. Heatmap Section */
.heatmap-section {
  padding: 1.25rem 1.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.active-count {
  font-size: 0.75rem;
  color: var(--muted);
}

.filter-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  background: var(--bg-main, #0b0f17);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
}

.toggle-btn {
  padding: 0.25rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.35rem;
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.toggle-btn:hover {
  color: var(--text);
}

.toggle-btn.active {
  background: var(--surface, rgba(255, 255, 255, 0.08));
  color: var(--text);
  font-weight: 600;
}

.heatmap-container {
  position: relative;
  overflow: hidden;
}

.heatmap-scroll {
  overflow-x: auto;
  scrollbar-width: thin;
  padding-bottom: 0.5rem;
}

.heatmap-grid-wrapper {
  display: inline-block;
  min-width: max-content;
}

.heatmap-grid {
  display: flex;
  gap: 3px;
}

.heatmap-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.heatmap-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  transition: opacity 0.15s;
  cursor: pointer;
}

.heatmap-cell:hover {
  outline: 1.5px solid var(--text);
  outline-offset: -1px;
}

/* Levels */
.lvl-0 { background-color: var(--border); opacity: 0.35; }
.lvl-1 { background-color: #0e4429; }
.lvl-2 { background-color: #006d32; }
.lvl-3 { background-color: #26a641; }
.lvl-4 { background-color: #39d353; }

:global(html.light) .lvl-0 { background-color: #ebedf0; opacity: 1; }
:global(html.light) .lvl-1 { background-color: #9be9a8; }
:global(html.light) .lvl-2 { background-color: #40c463; }
:global(html.light) .lvl-3 { background-color: #30a14e; }
:global(html.light) .lvl-4 { background-color: #216e39; }

.heatmap-months {
  position: relative;
  height: 18px;
  margin-top: 6px;
  font-size: 0.7rem;
  color: var(--muted);
}

.month-label { position: absolute; }

.heatmap-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.72rem;
  color: var(--muted);
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.heat-box {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}

.swipe-hint {
  display: none;
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .swipe-hint { display: inline-block; }
}

/* 2. View Switcher & Standalone CTA */
.view-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.tabs-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 0.5rem;
  background: transparent;
  border: 1px solid transparent;
  color: var(--muted);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  color: var(--text);
  background: var(--bg-soft);
}

.tab-btn.active {
  color: var(--text);
  background: var(--bg-soft);
  border-color: var(--border);
  font-weight: 600;
}

.tab-count {
  font-size: 0.75rem;
  padding: 0.1rem 0.35rem;
  border-radius: 0.25rem;
  background: var(--surface, rgba(255, 255, 255, 0.06));
  color: var(--text);
}

.standalone-cta-wrap {
  display: flex;
  align-items: center;
}

.standalone-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  padding: 0.35rem 0.65rem;
  border-radius: 0.4rem;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  transition: all 0.15s ease;
}

.standalone-link:hover {
  color: var(--text);
  border-color: var(--muted);
}

.link-arrow {
  transition: transform 0.15s ease;
}

.standalone-link:hover .link-arrow {
  transform: translateX(2px);
}

/* 3. Tab Content */
.tab-view-content {
  width: 100%;
}

/* Tooltip */
.heatmap-tooltip {
  position: fixed;
  transform: translate(-50%, -100%);
  padding: 0.45rem 0.65rem;
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid #334155;
  border-radius: 0.4rem;
  font-size: 0.75rem;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}

.tooltip-date {
  font-weight: 600;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #334155;
  padding-bottom: 0.15rem;
}

.tooltip-line {
  font-size: 0.72rem;
  line-height: 1.4;
}
</style>
