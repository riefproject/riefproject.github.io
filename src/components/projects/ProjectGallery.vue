<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@nanostores/vue";
import type { LocaleText, Project } from "../../types/profile.types";
import { lang as langStore } from "../../stores/uiStore.js";

type Category = { key: string; label: LocaleText };

const props = defineProps<{
  projects: Project[];
  categories: Category[];
}>();

const searchTerm = ref("");
const selectedCategory = ref(props.categories[0]?.key ?? "all");
const showAllProjects = ref(false);
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
        viewMore: "Lihat Proyek Lainnya",
        viewLess: "Sembunyikan",
        featuredLabel: "Proyek Unggulan",
        otherLabel: "Proyek Lainnya",
      }
    : {
        searchLabel: "Search",
        searchPlaceholder: "Search titles, descriptions, or technologies",
        resultSuffix: "projects",
        empty: "No projects match the current filters.",
        impactLabel: "Result",
        viewMore: "View More Projects",
        viewLess: "Show Less",
        featuredLabel: "Featured Projects",
        otherLabel: "Other Projects",
      }
);

const featuredProjects = computed(() => {
  return props.projects.filter((p) => p.featured);
});

const otherProjects = computed(() => {
  return props.projects.filter((p) => !p.featured);
});

const filteredProjects = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  const projectsToFilter = showAllProjects.value
    ? props.projects
    : featuredProjects.value;

  return projectsToFilter.filter((project) => {
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

const toggleViewMore = () => {
  showAllProjects.value = !showAllProjects.value;
};

const expandedProjects = ref(new Set<string>());
const toggleProject = (id: string) => {
  const newSet = new Set(expandedProjects.value);
  if (newSet.has(id)) newSet.delete(id);
  else newSet.add(id);
  expandedProjects.value = newSet;
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
        <div class="project-thumbnail">
          <div v-if="project.img" class="project-thumbnail-img">
            <img
              :src="project.img"
              :alt="resolveText(project.title)"
              class="w-full h-full object-cover" />
          </div>
          <div v-else class="project-thumbnail-placeholder">
            {{ resolveText(project.title).charAt(0) }}
          </div>
        </div>
        <header class="space-y-1">
          <p
            class="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {{ project.year }} · {{ resolveText(project.category) }}
          </p>
          <h3 class="font-semibold text-text">
            {{ resolveText(project.title) }}
          </h3>
        </header>
        <div class="relative overflow-hidden transition-[max-height] duration-500 ease-in-out" :class="expandedProjects.has(project.title.en) ? 'max-h-[3000px]' : 'max-h-[120px]'">
          <p class="text-sm text-muted">
            {{ resolveText(project.description) }}
          </p>
          <p v-if="project.impact" class="text-sm font-semibold text-text mt-3">
            {{ copy.impactLabel }}:
            <span class="font-normal text-muted">{{ resolveText(project.impact) }}</span>
          </p>
          <ul class="space-y-1 text-sm text-muted list-disc pl-5 mt-2">
            <li v-for="highlight in project.highlights" :key="highlight.en">
              {{ resolveText(highlight) }}
            </li>
          </ul>
          
          <div :class="['absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent pointer-events-none transition-opacity duration-300', expandedProjects.has(project.title.en) ? 'opacity-0' : 'opacity-100']"></div>
        </div>
        
        <button type="button" @click="toggleProject(project.title.en)" class="text-left cursor-pointer text-sm font-semibold text-accent hover:underline -mt-1 w-fit">
          {{ expandedProjects.has(project.title.en) ? (locale === 'id' ? 'Tampilkan lebih sedikit' : 'Show less') : (locale === 'id' ? 'Baca selengkapnya' : 'Read details') }}
        </button>
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

    <div
      v-if="otherProjects.length > 0 && searchTerm.trim().length === 0"
      class="flex justify-center mt-4">
      <button
        @click="toggleViewMore"
        class="inline-flex items-center justify-center rounded-full border-2 border-accent px-6 py-3 text-base font-semibold text-accent transition hover:bg-accent hover:text-white">
        {{ showAllProjects ? copy.viewLess : copy.viewMore }}
        <svg
          :class="[
            'ml-2 h-5 w-5 transition-transform',
            showAllProjects ? 'rotate-180' : '',
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </button>
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

.project-thumbnail {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
  border-radius: 0.75rem;
}

.project-thumbnail-img,
.project-thumbnail-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(var(--accent-rgb) / 0.4);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(var(--accent-rgb) / 0.15);
}

.project-thumbnail-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgb(var(--accent-rgb) / 0.2),
    rgb(var(--accent-rgb) / 0.5)
  );
  font-size: 3rem;
  font-weight: 700;
  color: var(--text);
}

.project-card h3 {
  font-size: 1.15rem;
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
