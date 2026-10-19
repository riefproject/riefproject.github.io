<script setup lang="ts">
import type { HeatmapDay, HeatmapTooltipMetric } from '../../utils/heatmap'
import { formatTooltipHeaderDate } from '../../utils/dateFormat'

defineProps<{
  day: HeatmapDay
  top: number
  left: number
  isId: boolean
  metrics: HeatmapTooltipMetric[]
}>()
</script>

<template>
  <Teleport to="body">
    <div class="heatmap-floating-tooltip" :style="{ top: `${top}px`, left: `${left}px` }">
      <div class="tip-date">{{ formatTooltipHeaderDate(day.date, isId) }}</div>
      <div class="tip-stats">
        <slot :day="day" :isId="isId" :metrics="metrics">
          <span
            v-for="(m, mIdx) in metrics"
            :key="mIdx"
            class="tip-badge"
            :class="`tip-${m.color || 'emerald'}`">
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
            <span v-else class="tip-dot" :class="`dot-${m.color || 'emerald'}`"></span>

            <strong v-if="typeof m.value === 'number'">{{ m.value }}</strong>
            <span v-else>{{ m.value }}</span>

            <span v-if="m.label" class="tip-label">{{ m.label }}</span>
          </span>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.heatmap-floating-tooltip {
  position: fixed;
  z-index: 99999;
  transform: translate(-50%, -100%);
  pointer-events: none;
  background: var(--bg-soft, #0f172a);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: var(--radius-md);
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
  border-radius: var(--radius-sm);
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
</style>
