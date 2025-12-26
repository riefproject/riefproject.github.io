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
</script>

<template>
  <div class="stack-shell">
    <div class="toolbar">
      <div class="tabs" role="tablist">
        <button
          v-for="category in categories"
          :key="category.key"
          type="button"
          @click="setCategory(category.key)"
          :aria-selected="category.key === selectedCategory"
          :class="['tab', { active: category.key === selectedCategory }]">
          {{ resolveLabel(category.label) }}
        </button>
      </div>
      <div class="search">
        <input
          v-model="searchTerm"
          type="search"
          :placeholder="copy.search"
          aria-label="Search tech stack" />
        <span class="count">{{ activeCount }} {{ copy.result }}</span>
      </div>
    </div>

    <div class="scroller" aria-label="Tech stack list">
      <div class="stack-grid">
        <div
          v-for="item in filteredItems"
          :key="item.name"
          class="stack-card surface">
          <div class="stack-logo">
            <div
              v-if="resolveLogo(item)"
              v-html="resolveLogo(item)"
              class="logo-svg"></div>
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
  flex-direction: column;
  gap: 0.5rem;
}

.tabs {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tab {
  padding: 0.4rem 0.85rem;
  border-radius: 0.9rem;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--muted);
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;
}

.tab.active {
  background: var(--chip-bg);
  border-color: var(--accent);
  color: var(--accent-strong);
}

.search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search input {
  flex: 1;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  padding: 0.55rem 0.75rem;
  background: var(--bg-elevated);
  color: var(--text);
}

.count {
  font-size: 0.9rem;
  color: var(--muted);
  font-weight: 600;
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

.logo-svg :deep(svg) {
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

@media (max-width: 900px) {
  .search {
    flex-direction: column;
    align-items: flex-start;
  }

  .search input {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .stack-grid {
    grid-auto-columns: minmax(100px, 1fr);
    min-width: calc(4 * 110px);
  }
}
</style>
