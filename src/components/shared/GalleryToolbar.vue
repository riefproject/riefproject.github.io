<script setup lang="ts">
import type { LocaleText } from '../../types/profile.types'
import FilterDropdown from './FilterDropdown.vue'
import SearchInput from './SearchInput.vue'

type Category = { key: string; label: LocaleText }

withDefaults(
  defineProps<{
    placeholder: string
    categories: Category[]
    locale: 'en' | 'id'
    ariaLabel?: string
    inputType?: 'text' | 'search'
    mobileLayout?: 'stack' | 'row'
  }>(),
  {
    inputType: 'text',
    mobileLayout: 'stack',
  }
)

const searchTerm = defineModel<string>('searchTerm', { required: true })
const selectedCategories = defineModel<string[]>('selectedCategories', { required: true })
</script>

<template>
  <div class="gallery-toolbar" :class="`is-${mobileLayout}`">
    <SearchInput
      v-model="searchTerm"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :inputType="inputType"
      :withIcon="false"
      surface="plain" />

    <FilterDropdown v-model="selectedCategories" :categories="categories" :locale="locale" />
  </div>
</template>

<style scoped>
.gallery-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

@media (max-width: 640px) {
  .gallery-toolbar.is-stack {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .gallery-toolbar.is-row {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }
}
</style>
