<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@nanostores/vue";
import type { LocaleText, Project } from "../../data/profile";
import { lang as langStore } from "../../stores/uiStore.js";

type Category = { key: string; label: LocaleText };

const props = defineProps<{
  projects: Project[];
  categories: Category[];
}>();

const searchTerm = ref("");
const selectedCategory = ref(props.categories[0]?.key ?? "all");
const $lang = useStore(langStore);
const locale = computed(() => ($lang.value === "id" ? "id" : "en"));
const resolveText = (value: LocaleText) => value[locale.value] ?? value.en;

const copy = computed(() =>
  locale.value === "id"
    ? {
        searchLabel: "Cari",
        searchPlaceholder: "Cari judul, deskripsi, atau teknologi",
        resultSuffix: "proyek",
        empty: "Tidak ada proyek yang cocok dengan filter saat ini.",
        impactLabel: "Hasil",
      }
    : {
        searchLabel: "Search",
        searchPlaceholder: "Search titles, descriptions, or technologies",
        resultSuffix: "projects",
        empty: "No projects match the current filters.",
        impactLabel: "Result",
      }
);

const filteredProjects = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  return props.projects.filter((project) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      project.categoryKey === selectedCategory.value;
    const matchesSearch =
      term.length === 0 ||
      project.title.en.toLowerCase().includes(term) ||
      project.title.id.toLowerCase().includes(term) ||
      project.description.en.toLowerCase().includes(term) ||
      project.description.id.toLowerCase().includes(term) ||
      project.stack.some((tech) => tech.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });
});

const activeCount = computed(() => filteredProjects.value.length);

const setCategory = (category: string) => {
  selectedCategory.value = category;
};
</script>

<template>
  <div class="project-gallery flex flex-col gap-6 is-visible">
    <div
      class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <p class="text-sm font-semibold text-muted lg:pt-2">
        {{ activeCount }} {{ copy.resultSuffix }}
      </p>

      <div class="flex flex-col gap-3 w-full lg:w-auto lg:items-end">
        <div class="w-full lg:w-[420px]">
          <label class="flex flex-col gap-1 text-sm font-medium text-muted">
            <input
              v-model="searchTerm"
              type="search"
              :placeholder="copy.searchPlaceholder"
              class="project-search rounded-xl border border-border px-4 py-2.5 text-base text-text focus:outline-none focus:ring-2 focus:ring-accent/40" />
          </label>
        </div>

        <div
          class="flex flex-wrap justify-start gap-2 lg:justify-end"
          role="tablist">
          <button
            v-for="category in categories"
            :key="category.key"
            type="button"
            role="tab"
            :aria-selected="category.key === selectedCategory"
            @click="setCategory(category.key)"
            :class="[
              'rounded-full border px-4 py-2 text-sm font-semibold transition',
              category.key === selectedCategory
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-muted hover:border-accent hover:text-accent',
            ]">
            {{ resolveText(category.label) }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="filteredProjects.length"
      class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="project in filteredProjects"
        :key="project.title.en"
        class="project-card flex h-full flex-col gap-4 rounded-2xl border border-border p-5 shadow-lg shadow-slate-900/5">
        <div
          v-if="project.img"
          class="rounded-xl border border-accent/40 overflow-hidden h-40 flex items-center justify-center shadow-md shadow-accent/15">
          <img
            :src="project.img"
            :alt="resolveText(project.title)"
            class="w-full h-full object-cover" />
        </div>
        <div
          v-else
          class="rounded-xl border border-accent/40 bg-gradient-to-br from-sky-300 via-cyan-200 to-emerald-200 dark:from-sky-900 dark:via-slate-900 dark:to-emerald-900 text-4xl font-semibold text-slate-900 dark:text-white h-40 flex items-center justify-center shadow-md shadow-accent/15">
          {{ resolveText(project.title).charAt(0) }}
        </div>
        <header class="space-y-1">
          <p
            class="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {{ project.year }} · {{ resolveText(project.category) }}
          </p>
          <h3 class="text-xl font-semibold text-text">
            {{ resolveText(project.title) }}
          </h3>
        </header>
        <p class="text-sm text-muted">
          {{ resolveText(project.description) }}
        </p>
        <p v-if="project.impact" class="text-sm font-semibold text-text">
          {{ copy.impactLabel }}:
          <span class="font-normal text-muted">{{
            resolveText(project.impact)
          }}</span>
        </p>
        <ul class="space-y-1 text-sm text-muted list-disc pl-5">
          <li v-for="highlight in project.highlights" :key="highlight.en">
            {{ resolveText(highlight) }}
          </li>
        </ul>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tool in project.stack"
            :key="tool"
            class="project-chip rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted">
            {{ tool }}
          </span>
        </div>
        <div
          v-if="project.links && project.links.length"
          class="mt-auto flex flex-wrap gap-2">
          <a
            v-for="link in project.links"
            :key="link.url"
            class="inline-flex items-center justify-center rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
            :href="link.url"
            target="_blank">
            {{ resolveText(link.label) }}
          </a>
        </div>
      </article>
    </div>
    <div
      v-else
      class="project-empty rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
      {{ copy.empty }}
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: var(--bg-elevated);
}

.project-gallery {
  opacity: 1;
  transform: none;
}

.project-search {
  background: var(--bg-elevated);
}

.project-chip {
  background: var(--chip-bg);
}

.project-empty {
  background: var(--bg-elevated);
  background: color-mix(in srgb, var(--bg-elevated) 70%, transparent);
}
</style>
