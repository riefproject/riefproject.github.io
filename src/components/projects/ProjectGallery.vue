<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LocaleText, Project } from '../../types/profile.types'
import { useLocale } from '../../composables/useLocale'
import { useListFilter } from '../../composables/useListFilter'
import GalleryToolbar from '../shared/GalleryToolbar.vue'
import ProjectCard from './ProjectCard.vue'

type Category = { key: string; label: LocaleText }

const props = defineProps<{
  projects: Project[]
  categories: Category[]
  initialLocale?: 'en' | 'id'
}>()

const { isId, locale, resolveText } = useLocale(props.initialLocale)

const copy = computed(() =>
  isId.value ?
    {
      searchPlaceholder: 'Cari judul, deskripsi, atau teknologi',
      resultSuffix: 'proyek',
      empty: 'Tidak ada proyek yang cocok dengan filter saat ini.',
      viewMore: 'Lihat Proyek Lainnya',
      viewLess: 'Sembunyikan',
    }
  : {
      searchPlaceholder: 'Search titles, descriptions, or technologies',
      resultSuffix: 'projects',
      empty: 'No projects match the current filters.',
      viewMore: 'View More Projects',
      viewLess: 'Show Less',
    }
)

const showAllProjects = ref(false)

const resolvedCategories = computed(() => {
  return props.categories.map((c) => ({
    key: c.key,
    label: resolveText(c.label),
  }))
})

const featuredProjects = computed(() => {
  return props.projects.filter((p) => p.featured)
})

const otherProjects = computed(() => {
  return props.projects.filter((p) => !p.featured)
})

const {
  searchTerm,
  selectedCategories,
  filteredItems: filteredProjects,
  activeCount,
} = useListFilter({
  items: () => (showAllProjects.value ? props.projects : featuredProjects.value),
  categories: () => props.categories,
  getCategory: (project) => project.categoryKey,
  matchesSearch: (project, term) =>
    project.title.en.toLowerCase().includes(term) ||
    project.title.id.toLowerCase().includes(term) ||
    project.description.en.toLowerCase().includes(term) ||
    project.description.id.toLowerCase().includes(term) ||
    project.stack.some((tech) => tech.toLowerCase().includes(term)),
})

const toggleViewMore = () => {
  showAllProjects.value = !showAllProjects.value
}
</script>

<template>
  <div class="project-gallery flex flex-col gap-6 is-visible">
    <GalleryToolbar
      v-model:search-term="searchTerm"
      v-model:selected-categories="selectedCategories"
      :placeholder="copy.searchPlaceholder"
      :categories="resolvedCategories"
      :locale="locale" />

    <p class="text-sm font-semibold text-muted mb-4">{{ activeCount }} {{ copy.resultSuffix }}</p>

    <div
      v-if="filteredProjects.length"
      class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.title.en"
        :project="project"
        :initial-locale="initialLocale" />
    </div>
    <div
      v-else
      class="project-empty rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
      {{ copy.empty }}
    </div>

    <div
      v-if="otherProjects.length > 0 && searchTerm.trim().length === 0"
      class="flex justify-center mt-4">
      <button
        @click="toggleViewMore"
        class="inline-flex items-center justify-center rounded-full border-2 border-accent px-6 py-3 text-base font-semibold text-accent transition hover:bg-accent hover:text-accent-contrast">
        {{ showAllProjects ? copy.viewLess : copy.viewMore }}
        <svg
          :class="['ml-2 h-5 w-5 transition-transform', showAllProjects ? 'rotate-180' : '']"
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
.project-gallery {
  opacity: 1;
  transform: none;
}

.project-empty {
  background: var(--bg-elevated);
  background: color-mix(in srgb, var(--bg-elevated) 70%, transparent);
}
</style>
