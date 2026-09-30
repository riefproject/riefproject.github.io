<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  categories: { key: string; label: string }[];
  modelValue: string[];
  locale: "id" | "en";
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const isFilterOpen = ref(false);

const allCategoryKeys = computed(() =>
  props.categories.filter((c) => c.key !== "all").map((c) => c.key),
);

const activeCategoryLabel = computed(() => {
  if (props.modelValue.length === allCategoryKeys.value.length) {
    return props.locale === "id" ? "Semua Kategori" : "All Categories";
  }
  if (props.modelValue.length === 0) {
    return props.locale === "id" ? "Pilih Kategori" : "Select Category";
  }
  if (props.modelValue.length === 1) {
    const cat = props.categories.find((c) => c.key === props.modelValue[0]);
    return cat
      ? cat.label
      : props.locale === "id"
        ? "1 Kategori"
        : "1 Category";
  }
  return props.locale === "id"
    ? `${props.modelValue.length} Kategori`
    : `${props.modelValue.length} Categories`;
});

const toggleAll = () => {
  if (props.modelValue.length === allCategoryKeys.value.length) {
    emit("update:modelValue", []);
  } else {
    emit("update:modelValue", [...allCategoryKeys.value]);
  }
};

const toggleCategory = (key: string) => {
  if (key === "all") {
    toggleAll();
    return;
  }

  const newValue = [...props.modelValue];
  const index = newValue.indexOf(key);
  if (index === -1) {
    newValue.push(key);
  } else {
    newValue.splice(index, 1);
  }
  emit("update:modelValue", newValue);
};
</script>

<template>
  <div class="filter-dropdown-container">
    <button
      type="button"
      @click="isFilterOpen = !isFilterOpen"
      class="filter-trigger-btn">
      <svg
        class="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <span>{{ activeCategoryLabel }}</span>
      <span class="active-badge" v-if="props.modelValue.length > 0">{{
        props.modelValue.length
      }}</span>
    </button>

    <div
      v-if="isFilterOpen"
      class="filter-overlay"
      @click="isFilterOpen = false"></div>

    <div v-if="isFilterOpen" class="filter-dropdown-menu">
      <div class="dropdown-list">
        <label
          v-for="category in props.categories"
          :key="category.key"
          class="dropdown-item"
          @click.prevent="toggleCategory(category.key)">
          <input
            v-if="category.key === 'all'"
            type="checkbox"
            :checked="props.modelValue.length === allCategoryKeys.length"
            .indeterminate="
              props.modelValue.length > 0 &&
              props.modelValue.length < allCategoryKeys.length
            " />
          <input
            v-else
            type="checkbox"
            :checked="props.modelValue.includes(category.key)" />
          <span>{{ category.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
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

.dropdown-item input[type="checkbox"] {
  accent-color: var(--accent);
  cursor: pointer;
  margin: 0;
}

@media (max-width: 640px) {
  .filter-trigger-btn {
    width: 100%;
    justify-content: center;
  }

  .filter-dropdown-menu {
    width: 100%;
    right: auto;
    left: 0;
  }
}
</style>
