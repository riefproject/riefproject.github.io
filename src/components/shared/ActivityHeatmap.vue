<template>
  <section class="heatmap-section">
    <div class="section-header">
      <div class="title-with-badge">
        <h3>{{ title }}</h3>
        <span class="activity-count-badge" v-if="countBadge">{{ countBadge }}</span>
      </div>
      <HeatmapLegend :isId="isId" />
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
          <span>{{ copy.swipeHint }}</span>
        </div>
      </div>

      <HeatmapTooltip
        v-if="hoveredDay"
        :day="hoveredDay"
        :top="tooltipPos.top"
        :left="tooltipPos.left"
        :isId="isId"
        :metrics="resolveMetrics(hoveredDay)">
        <template #default="slotProps">
          <slot name="tooltip" v-bind="slotProps" />
        </template>
      </HeatmapTooltip>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import HeatmapLegend from './HeatmapLegend.vue'
import HeatmapTooltip from './HeatmapTooltip.vue'
import type { HeatmapDay, HeatmapTooltipMetric } from '../../utils/heatmap'

const TOOLTIP_GAP_PX = 8
const SCROLL_TO_END_DELAY_MS = 300

const props = withDefaults(
  defineProps<{
    weeks: HeatmapDay[][]
    months: Array<{ name: string; percent: number }>
    title: string
    countBadge?: string
    isId?: boolean
    getMetrics?: (day: HeatmapDay, isId: boolean) => HeatmapTooltipMetric[]
  }>(),
  {
    isId: false,
  }
)

const copy = computed(() =>
  props.isId ?
    {
      swipeHint: 'Geser untuk melihat seluruh kalender',
      contributions: 'kontribusi',
      noActivity: 'Tidak ada aktivitas',
    }
  : {
      swipeHint: 'Swipe to see the full calendar',
      contributions: 'contributions',
      noActivity: 'No activity',
    }
)

const localeCode = computed(() => (props.isId ? 'id-ID' : 'en-US'))

const hoveredDay = ref<HeatmapDay | null>(null)
const tooltipPos = ref({ top: 0, left: 0 })
const heatmapScrollEl = ref<HTMLElement | null>(null)

const resolveMetrics = (day: HeatmapDay): HeatmapTooltipMetric[] => {
  if (!day) return []

  if (props.getMetrics) return props.getMetrics(day, props.isId)

  if (Array.isArray(day.metrics) && day.metrics.length > 0) return day.metrics

  if (day.count > 0) {
    return [
      {
        value: day.count,
        label: copy.value.contributions,
        color: 'emerald',
      },
    ]
  }

  return [
    {
      value: copy.value.noActivity,
      color: 'slate',
    },
  ]
}

const onCellMouseEnter = (e: MouseEvent, day: HeatmapDay) => {
  hoveredDay.value = day
  const target = e.currentTarget as HTMLElement
  if (target) {
    const rect = target.getBoundingClientRect()
    tooltipPos.value = {
      top: rect.top - TOOLTIP_GAP_PX,
      left: rect.left + rect.width / 2,
    }
  }
}

const onCellMouseLeave = () => {
  hoveredDay.value = null
}

const formatFallbackTitle = (day: HeatmapDay) => {
  if (!day || !day.date) return ''
  const dateObj = new Date(day.date + 'T00:00:00')
  const dateFormatted = dateObj.toLocaleDateString(localeCode.value, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const metrics = resolveMetrics(day)
  const text = metrics.map((m) => `${m.value} ${m.label || ''}`.trim()).join(' · ')
  return `${dateFormatted}: ${text}`
}

onMounted(() => {
  setTimeout(() => {
    if (heatmapScrollEl.value) {
      heatmapScrollEl.value.scrollLeft = heatmapScrollEl.value.scrollWidth
    }
  }, SCROLL_TO_END_DELAY_MS)
})
</script>

<style scoped>
.heatmap-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-2xl);
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
  font-size: var(--type-lg);
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.activity-count-badge {
  font-size: var(--type-sm);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  color: var(--muted);
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
  border-radius: var(--radius-xs);
  background: var(--bg-elevated);
  transition: transform 0.1s;
}

.heatmap-cell:hover {
  transform: scale(1.3);
  z-index: 10;
}

.heatmap-cell.lvl-0 {
  background: var(--heatmap-0);
  opacity: 0.6;
}
.heatmap-cell.lvl-1 {
  background: var(--heatmap-1);
}
.heatmap-cell.lvl-2 {
  background: var(--heatmap-2);
}
.heatmap-cell.lvl-3 {
  background: var(--heatmap-3);
}
.heatmap-cell.lvl-4 {
  background: var(--heatmap-4);
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
  font-size: var(--type-xs);
  color: var(--muted);
}

.heatmap-swipe-hint {
  display: none;
}

/* Light Mode Overrides */
:root.light .heatmap-section {
  background: var(--bg-soft);
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* Responsive Styles */
@media (max-width: 767px) {
  .heatmap-section {
    padding: 1rem;
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
  .heatmap-container::after {
    content: '';
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
    font-size: var(--type-xs);
    color: var(--muted);
    opacity: 0.75;
  }

  :root.light .heatmap-container::after {
    background: linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0));
  }
}
</style>
