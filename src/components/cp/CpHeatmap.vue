<template>
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
          <div class="tip-date">{{ formatTooltipHeaderDate(hoveredHeatmapDay.date, isId) }}</div>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HeatmapDay } from './cpUtils';
import { formatTooltipHeaderDate } from './cpUtils';

const props = withDefaults(
  defineProps<{
    heatmapWeeks: HeatmapDay[][];
    heatmapMonths: Array<{ name: string; percent: number }>;
    totalSubmissionsInHeatmap: number;
    isId?: boolean;
  }>(),
  {
    isId: false,
  }
);

const hoveredHeatmapDay = ref<HeatmapDay | null>(null);
const heatmapTooltipPos = ref({ top: 0, left: 0 });
const heatmapScrollEl = ref<HTMLElement | null>(null);

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
  const dateFormatted = dateObj.toLocaleDateString(props.isId ? 'id-ID' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  if (day.tries === 0 && day.ac === 0) {
    return `${dateFormatted}: ${props.isId ? 'Tidak ada aktivitas (0 Try, 0 AC)' : 'No activity (0 Try, 0 AC)'}`;
  }
  return `${dateFormatted}: ${day.tries} ${props.isId ? 'Try' : 'Tries'} · ${day.ac} AC`;
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

@media (max-width: 767px) {
  .heatmap-section {
    padding: 1rem !important;
    gap: 0.75rem !important;
  }
}
</style>
