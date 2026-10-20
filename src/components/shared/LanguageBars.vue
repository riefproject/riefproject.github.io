<template>
  <div v-if="languages.length" class="mt-8">
    <div v-if="showHeader" class="block-header">
      <h3>{{ headerTitle }}</h3>
      <span class="block-sub">{{ headerSubtitle }}</span>
    </div>
    <div class="lang-list">
      <div v-for="lang in languages" :key="lang.name" class="lang-row">
        <div class="lang-head">
          <span class="lang-name">{{ lang.name }}</span>
          <span class="lang-pct">{{ lang.percentage }}%</span>
        </div>
        <div class="lang-bar-track">
          <div class="lang-bar-fill" :style="{ width: `${lang.percentage}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface LanguageStat {
  name: string
  percentage: number
}

const props = withDefaults(
  defineProps<{
    languages: LanguageStat[]
    isId?: boolean
    titleEn?: string
    titleId?: string
    subtitleEn?: string
    subtitleId?: string
    showHeader?: boolean
  }>(),
  {
    isId: false,
    titleEn: 'Most Used Languages',
    titleId: 'Bahasa Pemrograman',
    subtitleEn: '',
    subtitleId: '',
    showHeader: true,
  }
)

const headerTitle = computed(() => (props.isId ? props.titleId : props.titleEn))
const headerSubtitle = computed(() => (props.isId ? props.subtitleId : props.subtitleEn))
</script>

<style scoped>
.lang-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lang-row {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.lang-head {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
}

.lang-name {
  font-weight: 600;
  color: var(--text);
}

.lang-pct {
  color: var(--muted);
  font-weight: 700;
}

.lang-bar-track {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--chip-bg);
  overflow: hidden;
}

.lang-bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: #34d399;
  transition: width 0.4s ease;
}

:root.light .lang-bar-fill {
  background: #047857;
}
</style>
