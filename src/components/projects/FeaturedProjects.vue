<script setup lang="ts">
import type { Project } from '../../types/profile.types'
import ProjectCard from './ProjectCard.vue'

defineProps<{
  projects: Project[]
  initialLocale?: 'en' | 'id'
}>()
</script>

<template>
  <div class="projects-grid">
    <ProjectCard
      v-for="project in projects"
      :key="project.title.en"
      :project="project"
      :maxHighlights="3"
      :maxLinks="2"
      :maxStack="5"
      :initial-locale="initialLocale" />
  </div>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
