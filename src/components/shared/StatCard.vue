<template>
  <div class="stat-card" :class="appearance === 'dev' && 'stat-card--dev'">
    <span class="stat-label">{{ label }}</span>
    <div
      class="stat-value"
      :class="variant && variant !== 'none' ? `val-${variant}` : ''"
    >
      <slot name="value">
        {{ value }}
      </slot>
      <span v-if="unit" class="stat-unit">{{ unit }}</span>
    </div>
    <span v-if="helper" class="stat-helper">{{ helper }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    value?: number | string;
    unit?: string;
    helper?: string;
    variant?: 'emerald' | 'sky' | 'amber' | 'purple' | 'none';
    appearance?: 'default' | 'dev';
  }>(),
  {
    variant: 'none',
    appearance: 'default',
  }
);

const colorClass = computed(() => {
  switch (props.variant) {
    case 'emerald':
      return 'val-emerald';
    case 'sky':
      return 'val-sky';
    case 'amber':
      return 'val-amber';
    case 'purple':
      return 'val-purple';
    default:
      return '';
  }
});
</script>

<style scoped>
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem;
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-xl);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 0;
}

.stat-card:hover {
  background: var(--bg-elevated);
  transform: translateY(-2px);
}

.stat-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  display: flex;
  align-items: baseline;
}

.val-emerald { color: #34d399; }
.val-sky { color: #38bdf8; }
.val-amber { color: #fbbf24; }
.val-purple { color: #c084fc; }

.stat-unit {
  font-size: var(--text-lg);
  font-weight: 600;
  opacity: 0.75;
  margin-left: 2px;
}

.stat-helper {
  font-size: var(--text-xs);
  color: var(--muted);
  line-height: 1.3;
  margin-top: 0.2rem;
}

.stat-card--dev {
  justify-content: space-between;
  gap: 0;
  padding: 1.25rem 1.35rem;
  transition:
    background 0.2s,
    transform 0.2s;
}

.stat-card--dev .stat-label {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

.stat-card--dev .stat-value {
  display: block;
  margin-bottom: 0.35rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}

.stat-card--dev .stat-unit {
  font-weight: 700;
  opacity: 0.85;
  margin-left: 1px;
}

.stat-card--dev .stat-helper {
  font-size: var(--text-sm);
  line-height: 1.35;
  margin-top: 0;
}

:root.light .stat-card {
  background: var(--bg-soft);
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

:root.light .stat-card:hover {
  background: var(--bg-elevated);
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

@media (max-width: 640px) {
  .stat-card--dev {
    padding: 1rem 1.1rem;
  }

  .stat-card--dev .stat-value {
    font-size: 1.45rem;
  }

  .stat-card--dev .stat-helper {
    font-size: 0.68rem;
  }
}
</style>
