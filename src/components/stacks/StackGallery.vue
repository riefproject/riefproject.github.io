<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@nanostores/vue";
import type { LocaleText, TechStack } from "../../types/profile.types";
import {
  lang as langStore,
  theme as themeStore,
} from "../../stores/uiStore.js";

type Category = { key: string; label: LocaleText };

const props = defineProps<{
  items: TechStack[];
  categories: Category[];
}>();

const searchTerm = ref("");
const selectedCategory = ref(props.categories[0]?.key ?? "all");
const isFilterOpen = ref(false);
const $lang = useStore(langStore);
const $theme = useStore(themeStore);
const locale = computed(() => ($lang.value === "id" ? "id" : "en"));

const copy = computed(() =>
  locale.value === "id"
    ? {
        search: "Cari stack atau tools",
        result: "item",
      }
    : {
        search: "Search stack or tools",
        result: "items",
      }
);

const filteredItems = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  return props.items.filter((item) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      item.category === selectedCategory.value;
    const matchesSearch =
      term.length === 0 || item.name.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
});

const activeCount = computed(() => filteredItems.value.length);

const setCategory = (key: string) => {
  selectedCategory.value = key;
};

const resolveLabel = (value: LocaleText) => value[locale.value] ?? value.en;

const resolveLogo = (item: TechStack) => {
  return $theme.value === "dark" ? item.logoDark : item.logoLight;
};

const activeCategoryLabel = computed(() => {
  const cat = props.categories.find(c => c.key === selectedCategory.value);
  return cat ? resolveLabel(cat.label) : (locale.value === 'id' ? 'Kategori' : 'Category');
});
</script>

<template>
  <div class="stack-shell">
    <div class="toolbar">
      <div class="search-input-wrap">
        <input
          v-model="searchTerm"
          type="search"
          :placeholder="copy.search"
          aria-label="Search tech stack"
          class="stack-search-input" />
      </div>

      <div class="filter-dropdown-container">
        <button
          type="button"
          @click="isFilterOpen = !isFilterOpen"
          class="filter-trigger-btn"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          <span>{{ activeCategoryLabel }}</span>
          <span class="active-badge" v-if="selectedCategory !== 'all'">1</span>
        </button>
        
        <div v-if="isFilterOpen" class="filter-overlay" @click="isFilterOpen = false"></div>
        
        <div v-if="isFilterOpen" class="filter-dropdown-menu">
          <div class="dropdown-list">
            <label
              v-for="category in props.categories"
              :key="category.key"
              class="dropdown-item"
              @click="setCategory(category.key); isFilterOpen = false"
            >
              <input type="radio" :checked="category.key === selectedCategory" name="stack-category-filter" />
              <span>{{ resolveLabel(category.label) }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="scroller" aria-label="Tech stack list">
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
  border-radius: 0.75rem;
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

.filter-dropdown-container {
  position: relative;
}

.filter-trigger-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.95rem;
  border-radius: 0.75rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  height: 100%;
  box-sizing: border-box;
  white-space: nowrap;
}

.filter-trigger-btn:hover {
  background: var(--chip-bg);
  border-color: var(--border-hover);
}

.active-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background: var(--accent);
  color: var(--bg);
  font-size: 0.65rem;
  font-weight: 700;
}

.filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: transparent;
}

.filter-dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 101;
  width: 210px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: popoverFadeIn 0.15s ease-out;
}

@keyframes popoverFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-list {
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.85rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text);
  transition: background 0.15s;
}

.dropdown-item:hover {
  background: var(--bg-elevated);
}

.dropdown-item input[type="radio"] {
  accent-color: var(--accent);
  cursor: pointer;
  margin: 0;
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
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--chip-bg);
  border: 1px solid var(--border);
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
  font-size: 0.95rem;
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
