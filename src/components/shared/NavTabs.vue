<template>
  <div class="tabs-nav" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      role="tab"
      :aria-selected="modelValue === tab.key"
      class="tab-btn"
      :class="{ active: modelValue === tab.key }"
      @click="$emit('update:modelValue', tab.key)"
    >
      <slot name="tab" :tab="tab" :active="modelValue === tab.key">
        <!-- Logo (with optional dark/light mode variant) -->
        <span v-if="tab.logo && tab.logoLight" class="tab-logo">
          <img
            :src="tab.logo"
            :alt="tab.key"
            class="tab-logo-img logo-variant-dark"
          />
          <img
            :src="tab.logoLight"
            :alt="tab.key"
            class="tab-logo-img logo-variant-light"
          />
        </span>
        <img
          v-else-if="tab.logo"
          :src="tab.logo"
          :alt="tab.key"
          class="tab-logo-img"
        />

        <!-- SVG Icon -->
        <span v-else-if="tab.icon" class="tab-icon" v-html="tab.icon"></span>

        <!-- Tab Label -->
        <span class="tab-name">{{ isId ? tab.labelId : tab.labelEn }}</span>

        <!-- Count / Badge -->
        <span v-if="tab.count !== undefined && tab.count !== null && tab.count !== ''" class="tab-badge">
          {{ tab.count }}
        </span>
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface NavTabItem {
  key: string;
  labelEn: string;
  labelId: string;
  logo?: string;
  logoLight?: string;
  icon?: string;
  count?: string | number;
}

withDefaults(
  defineProps<{
    modelValue: string;
    tabs: NavTabItem[];
    isId?: boolean;
    ariaLabel?: string;
  }>(),
  {
    isId: false,
    ariaLabel: 'Navigation tabs',
  }
);

defineEmits<{
  (e: 'update:modelValue', key: string): void;
}>();
</script>

<style scoped>
.tabs-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs-nav::-webkit-scrollbar {
  display: none;
}

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
