<script setup lang="ts">
import type { TabItem } from '../../types/ui.types'

defineProps<{
  item: TabItem
  active: boolean
  isId: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="active"
    class="tab-btn"
    :class="{ active }"
    @click="$emit('select')">
    <slot :item="item" :active="active">
      <span v-if="item.logo && item.logoLight" class="tab-logo">
        <img :src="item.logo" :alt="item.key" class="tab-logo-img logo-variant-dark" />
        <img :src="item.logoLight" :alt="item.key" class="tab-logo-img logo-variant-light" />
      </span>
      <img v-else-if="item.logo" :src="item.logo" :alt="item.key" class="tab-logo-img" />

      <span v-else-if="item.icon" class="tab-icon" v-html="item.icon"></span>

      <span class="tab-name">{{ isId ? item.labelId : item.labelEn }}</span>

      <span
        v-if="item.count !== undefined && item.count !== null && item.count !== ''"
        class="tab-badge">
        {{ item.count }}
      </span>
    </slot>
  </button>
</template>

<style scoped>
.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
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

.tab-logo,
.tab-icon {
  display: inline-flex;
  align-items: center;
}

.tab-logo-img {
  width: 1.15rem;
  height: 1.15rem;
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

.tab-badge {
  font-size: var(--text-xs);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  border: none;
  font-weight: 700;
}
</style>
