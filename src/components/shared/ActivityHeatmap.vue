<template>
  <section class="heatmap-section">
    <div class="section-header">
      <div class="title-with-badge">
        <h3>{{ title }}</h3>
        <span class="activity-count-badge" v-if="countBadge">{{
          countBadge
        }}</span>
      </div>
      <div class="heatmap-legend">
        <span class="legend-label">{{ isId ? "Sedikit" : "Less" }}</span>
        <span class="heat-box lvl-0"></span>
        <span class="heat-box lvl-1"></span>
        <span class="heat-box lvl-2"></span>
        <span class="heat-box lvl-3"></span>
        <span class="heat-box lvl-4"></span>
        <span class="legend-label">{{ isId ? "Banyak" : "More" }}</span>
      </div>
    </div>

    <div class="heatmap-container">
      <div ref="heatmapScrollEl" class="heatmap-scroll">
        <div class="heatmap-grid-wrapper">
          <div class="heatmap-grid">
            <div v-for="(week, wIdx) in weeks" :key="wIdx" class="heatmap-col">
              <div
                v-for="day in week"
                :key="day.date"
                class="heatmap-cell"
                :class="`lvl-${day.level}`"
                :title="formatFallbackTitle(day)"
                @mouseenter="onCellMouseEnter($event, day)"
                @mouseleave="onCellMouseLeave"></div>
            </div>
          </div>
          <div class="heatmap-months">
            <span
              v-for="(m, mIdx) in months"
              :key="`${m.name}-${mIdx}`"
              :style="{ left: `${m.percent}%` }"
              class="month-label">
              {{ m.name }}
            </span>
          </div>
        </div>

        <div class="heatmap-swipe-hint">
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <span>{{
            isId
              ? "Geser untuk melihat seluruh kalender"
              : "Swipe to see the full calendar"
          }}</span>
        </div>
      </div>

      <!-- Floating Rich Interactive Tooltip -->
      <Teleport to="body">
        <div
          v-if="hoveredDay"
          class="heatmap-floating-tooltip"
          :style="{ top: `${tooltipPos.top}px`, left: `${tooltipPos.left}px` }">
          <div class="tip-date">
            {{ formatTooltipHeaderDate(hoveredDay.date, isId) }}
          </div>
          <div class="tip-stats">
            <slot
              name="tooltip"
              :day="hoveredDay"
              :isId="isId"
              :metrics="resolveMetrics(hoveredDay)">
              <span
                v-for="(m, mIdx) in resolveMetrics(hoveredDay)"
                :key="mIdx"
                class="tip-badge"
                :class="`tip-${m.color || 'emerald'}`">
                <!-- Jika ada logo: render logo platform adaptif theme -->
                <span v-if="m.logo" class="tip-logo-box">
                  <img
                    :src="m.logo"
                    :alt="m.label || ''"
                    class="tip-img-logo"
                    :class="{ 'logo-variant-dark': Boolean(m.logoLight) }" />
                  <img
                    v-if="m.logoLight"
                    :src="m.logoLight"
                    :alt="m.label || ''"
                    class="tip-img-logo logo-variant-light" />
                </span>
                <!-- Fallback: dot -->
                <span
                  v-else
                  class="tip-dot"
                  :class="`dot-${m.color || 'emerald'}`"></span>

                <strong v-if="typeof m.value === 'number'">{{
                  m.value
                }}</strong>
                <span v-else>{{ m.value }}</span>

                <span v-if="m.label" class="tip-label">{{ m.label }}</span>
              </span>
            </slot>
          </div>
        </div>
      </Teleport>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { HeatmapTooltipMetric } from "../../utils/activityDateUtils";
import { formatTooltipHeaderDate } from "../../utils/activityDateUtils";

const props = withDefaults(
  defineProps<{
    weeks: any[][];
    months: Array<{ name: string; percent: number }>;
    title: string;
    countBadge?: string;
    isId?: boolean;
    getMetrics?: (day: any, isId: boolean) => HeatmapTooltipMetric[];
  }>(),
  {
    isId: false,
  },
);

const hoveredDay = ref<any | null>(null);
const tooltipPos = ref({ top: 0, left: 0 });
const heatmapScrollEl = ref<HTMLElement | null>(null);

const resolveMetrics = (day: any): HeatmapTooltipMetric[] => {
  if (!day) return [];

  // 1. Custom resolver function jika diberikan
  if (props.getMetrics) {
    return props.getMetrics(day, props.isId);
  }

  // 2. Jika item hari sudah membawa metrics array eksplisit
  if (Array.isArray(day.metrics) && day.metrics.length > 0) {
    return day.metrics;
  }

  // 3. Deteksi data CP (Tries & AC) -> tanpa logo, otomatis dot sky & emerald
  if (typeof day.tries === "number" && typeof day.ac === "number") {
    if (day.tries === 0 && day.ac === 0) {
      return [
        {
          value: props.isId ? "Tidak ada aktivitas" : "No activity",
          color: "slate",
        },
      ];
    }
    return [
      {
        value: day.tries,
        label: props.isId ? "Try" : "Tries",
        color: "sky",
      },
      {
        value: day.ac,
        label: "AC",
        color: "emerald",
      },
    ];
  }

  // 4. Deteksi platform Dev (GitHub / GitLab) -> memiliki logo platform
  if (typeof day.github === "number" || typeof day.gitlab === "number") {
    const list: HeatmapTooltipMetric[] = [];
    if (day.github && day.github > 0) {
      list.push({
        value: day.github,
        label: props.isId ? "kontribusi" : "contributions",
        logo: "/img/stacks/github-dark.svg",
        logoLight: "/img/stacks/github-light.svg",
        color: "neutral",
      });
    }
    if (day.gitlab && day.gitlab > 0) {
      list.push({
        value: day.gitlab,
        label: props.isId ? "event" : "events",
        logo: "/img/stacks/gitlab-dark.svg",
        logoLight: "/img/stacks/gitlab-light.svg",
        color: "orange",
      });
    }
    if (list.length === 0) {
      return [
        {
          value: props.isId ? "Tidak ada kontribusi" : "No contributions",
          color: "slate",
        },
      ];
    }
    return list;
  }

  // 5. Fallback generik jika hanya membawa count
  if (day.count && day.count > 0) {
    return [
      {
        value: day.count,
        label: props.isId ? "kontribusi" : "contributions",
        color: "emerald",
      },
    ];
  }

  return [
    {
      value: props.isId ? "Tidak ada aktivitas" : "No activity",
      color: "slate",
    },
  ];
};

const onCellMouseEnter = (e: MouseEvent, day: any) => {
  hoveredDay.value = day;
  const target = e.currentTarget as HTMLElement;
  if (target) {
    const rect = target.getBoundingClientRect();
    tooltipPos.value = {
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    };
  }
};

const onCellMouseLeave = () => {
  hoveredDay.value = null;
};

const formatFallbackTitle = (day: any) => {
  if (!day || !day.date) return "";
  const dateObj = new Date(day.date + "T00:00:00");
  const dateFormatted = dateObj.toLocaleDateString(
    props.isId ? "id-ID" : "en-US",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
  const metrics = resolveMetrics(day);
  const text = metrics
    .map((m) => `${m.value} ${m.label || ""}`.trim())
    .join(" · ");
  return `${dateFormatted}: ${text}`;
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

.heat-box.lvl-0 {
  background: var(--bg-elevated);
}
.heat-box.lvl-1 {
  background: #064e3b;
}
.heat-box.lvl-2 {
  background: #047857;
}
.heat-box.lvl-3 {
  background: #10b981;
}
.heat-box.lvl-4 {
  background: #34d399;
}

.heatmap-container {
  position: relative;
}

.heatmap-scroll {
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
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

.heatmap-cell.lvl-0 {
  background: var(--bg-elevated);
  opacity: 0.6;
}
.heatmap-cell.lvl-1 {
  background: #064e3b;
}
.heatmap-cell.lvl-2 {
  background: #047857;
}
.heatmap-cell.lvl-3 {
  background: #10b981;
}
.heatmap-cell.lvl-4 {
  background: #34d399;
}

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

.heatmap-swipe-hint {
  display: none;
}

/* Floating Rich Tooltip */
.heatmap-floating-tooltip {
  position: fixed;
  z-index: 99999;
  transform: translate(-50%, -100%);
  pointer-events: none;
  background: var(--bg-soft, #0f172a);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: 0.6rem;
  padding: 0.5rem 0.75rem;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.5),
    0 8px 10px -6px rgba(0, 0, 0, 0.5);
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
  gap: 0.35rem;
  padding: 0.15rem 0.45rem;
  border-radius: 0.35rem;
  font-size: var(--text-sm);
  font-weight: 500;
}

.tip-badge strong {
  font-weight: 700;
}

.tip-logo-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.tip-img-logo {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.logo-variant-dark {
  display: inline-block;
}
.logo-variant-light {
  display: none;
}
:root.light .logo-variant-dark {
  display: none;
}
:root.light .logo-variant-light {
  display: inline-block;
}

.tip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Parametric Color Variants (Badges & Dots) */
.tip-sky {
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.25);
}
.dot-sky {
  background: #38bdf8;
}

.tip-emerald {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.dot-emerald {
  background: #34d399;
}

.tip-orange {
  background: rgba(251, 146, 60, 0.12);
  color: #fb923c;
  border: 1px solid rgba(251, 146, 60, 0.28);
}
.dot-orange {
  background: #fb923c;
}

.tip-purple {
  background: rgba(192, 132, 252, 0.15);
  color: #c084fc;
  border: 1px solid rgba(192, 132, 252, 0.3);
}
.dot-purple {
  background: #c084fc;
}

.tip-amber {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}
.dot-amber {
  background: #fbbf24;
}

.tip-neutral,
.tip-slate {
  background: rgba(255, 255, 255, 0.08);
  color: #f1f5f9;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.dot-neutral,
.dot-slate {
  background: #94a3b8;
}

/* Light Mode Overrides */
:root.light .heatmap-section {
  background: #ffffff;
  border-color: #e2e8f0;
}

:root.light .heatmap-floating-tooltip {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.05);
}

:root.light .tip-date {
  color: #64748b;
  border-color: #f1f5f9;
}

:root.light .tip-sky {
  background: #f0f9ff;
  color: #0284c7;
  border-color: #bae6fd;
}

:root.light .tip-emerald {
  background: #ecfdf5;
  color: #047857;
  border-color: #a7f3d0;
}

:root.light .tip-orange {
  background: #fff7ed;
  color: #ea580c;
  border-color: #fed7aa;
}

:root.light .tip-purple {
  background: #faf5ff;
  color: #7e22ce;
  border-color: #e9d5ff;
}

:root.light .tip-amber {
  background: #fffbeb;
  color: #b45309;
  border-color: #fde68a;
}

:root.light .tip-neutral,
:root.light .tip-slate {
  background: #f8fafc;
  color: #0f172a;
  border-color: #cbd5e1;
}

/* Responsive Styles */
@media (max-width: 767px) {
  .heatmap-section {
    padding: 1rem !important;
    gap: 0.75rem !important;
  }
}

@media (max-width: 640px) {
  .heatmap-container::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 1.4rem;
    right: 0;
    width: 30px;
    background: linear-gradient(to left, var(--bg-soft), rgba(0, 0, 0, 0));
    pointer-events: none;
    z-index: 2;
  }

  .heatmap-swipe-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    margin-top: 0.35rem;
    font-size: var(--text-xs);
    color: var(--muted);
    opacity: 0.75;
  }

  :root.light .heatmap-container::after {
    background: linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0));
  }
}
</style>
