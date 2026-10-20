<script setup lang="ts">
import { computed } from 'vue'
import GalleryToolbar from '../shared/GalleryToolbar.vue'
import { useStore } from '@nanostores/vue'
import type { LocaleText, TechStack } from '../../types/profile.types'
import { theme as themeStore } from '../../stores/uiStore'
import { useLocale } from '../../composables/useLocale'
import { useListFilter } from '../../composables/useListFilter'

type Category = { key: string; label: LocaleText }

const props = defineProps<{
  items: TechStack[]
  categories: Category[]
  initialLocale?: 'en' | 'id'
}>()

const { searchTerm, selectedCategories, filteredItems } = useListFilter({
  items: () => props.items,
  categories: () => props.categories,
  getCategory: (item) => item.category,
  matchesSearch: (item, term) => item.name.toLowerCase().includes(term),
})
const $theme = useStore(themeStore)
const { isId, locale, resolveText } = useLocale(props.initialLocale)

const copy = computed(() => {
  const id = isId.value
  return {
    searchPlaceholder: id ? 'Cari stack atau tools' : 'Search stack or tools',
    searchAria: id ? 'Cari tech stack' : 'Search tech stack',
    listAria: id ? 'Daftar tech stack' : 'Tech stack list',
  }
})

const resolveLogo = (item: TechStack) => {
  return $theme.value === 'dark' ? item.logoDark : item.logoLight
}

const resolvedCategories = computed(() => {
  return props.categories.map((c) => ({
    key: c.key,
    label: resolveText(c.label),
  }))
})
</script>

<template>
  <div class="stack-shell">
    <GalleryToolbar
      v-model:search-term="searchTerm"
      v-model:selected-categories="selectedCategories"
      :placeholder="copy.searchPlaceholder"
      :aria-label="copy.searchAria"
      input-type="search"
      mobile-layout="row"
      :categories="resolvedCategories"
      :locale="locale" />

    <div class="scroller" role="region" tabindex="0" :aria-label="copy.listAria">
      <div class="stack-grid">
        <div v-for="item in filteredItems" :key="item.name" class="stack-card surface">
          <div class="stack-logo">
            <img
              v-if="resolveLogo(item)"
              :src="resolveLogo(item)"
              alt=""
              width="64"
              height="64"
              decoding="async"
              class="logo-svg"
              loading="lazy" />
            <span v-else>{{ item.name.slice(0, 2).toUpperCase() }}</span>
          </div>
          <p class="stack-name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack-shell {
  display: grid;
  gap: 0.75rem;
}

.count {
  font-size: 0.9rem;
  color: var(--muted);
  font-weight: 600;
  white-space: nowrap;
}

.scroller {
  overflow-x: auto;
  padding-bottom: 0.35rem;
}

.stack-grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-columns: minmax(120px, 1fr);
  gap: 0.75rem;
  padding: 0.25rem;
}

.stack-card {
  display: grid;
  place-items: center;
  gap: 0.35rem;
  min-height: 120px;
  padding: 0.85rem;
  text-align: center;
}

.stack-logo {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  display: grid;
  place-items: center;
  /* background: var(--chip-bg); */
  /* border: 1px solid var(--border); */
  overflow: hidden;
}

.stack-logo img,
.logo-svg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img.logo-svg {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.stack-name {
  margin: 0;
  font-weight: 600;
  color: var(--text);
  font-size: 1.15rem;
}

@media (max-width: 768px) {
  .stack-grid {
    grid-auto-columns: minmax(100px, 1fr);
    min-width: calc(4 * 110px);
  }
}
</style>
