<script setup lang="ts">
import { computed } from "vue";
import FilterDropdown from "../shared/FilterDropdown.vue";
import { useStore } from "@nanostores/vue";
import type { LocaleText, TechStack } from "../../types/profile.types";
import { theme as themeStore } from "../../stores/uiStore";
import { useLocale } from "../../composables/useLocale";
import { useListFilter } from "../../composables/useListFilter";

type Category = { key: string; label: LocaleText };

const props = defineProps<{
  items: TechStack[];
  categories: Category[];
}>();

const { searchTerm, selectedCategories, filteredItems } = useListFilter({
  items: () => props.items,
  categories: () => props.categories,
  getCategory: (item) => item.category,
  matchesSearch: (item, term) => item.name.toLowerCase().includes(term),
});
const $theme = useStore(themeStore);
const { isId, locale, resolveText } = useLocale();

const searchPlaceholder = computed(() =>
  isId.value ? "Cari stack atau tools" : "Search stack or tools",
);

const resolveLogo = (item: TechStack) => {
  return $theme.value === "dark" ? item.logoDark : item.logoLight;
};

const resolvedCategories = computed(() => {
  return props.categories.map((c) => ({
    key: c.key,
    label: resolveText(c.label),
  }));
});
</script>

<template>
  <div class="stack-shell">
    <div class="toolbar">
      <div class="search-input-wrap">
        <input
          v-model="searchTerm"
          type="search"
          :placeholder="searchPlaceholder"
          :aria-label="
            locale === 'id' ? 'Cari tech stack' : 'Search tech stack'
          "
          class="stack-search-input" />
      </div>

      <FilterDropdown
        v-model="selectedCategories"
        :categories="resolvedCategories"
        :locale="locale" />
    </div>

    <div
      class="scroller"
      :aria-label="locale === 'id' ? 'Daftar tech stack' : 'Tech stack list'">
      <div class="stack-grid">
        <div
          v-for="item in filteredItems"
          :key="item.name"
          class="stack-card surface">
          <div class="stack-logo">
            <img
              v-if="resolveLogo(item)"
              :src="resolveLogo(item)"
              alt=""
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

.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.search-input-wrap {
  flex: 1;
}

.stack-search-input {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  padding: 0.55rem 0.75rem;
  background: var(--bg-elevated);
  color: var(--text);
  outline: none;
  font-size: 0.9rem;
}

.stack-search-input:focus {
  border-color: var(--text);
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

@media (max-width: 640px) {
  .toolbar {
    flex-direction: row !important;
    align-items: center !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }

  .search-input-wrap {
    flex: 1 !important;
  }
}

@media (max-width: 768px) {
  .stack-grid {
    grid-auto-columns: minmax(100px, 1fr);
    min-width: calc(4 * 110px);
  }
}
</style>
