<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Achievement, AchievementTab, LocaleText } from '../../types/profile.types'
import { useLocale } from '../../composables/useLocale'
import { parseHighlightTags } from '../../utils/tags'
import { ACHIEVEMENT_TABS } from '../../data/achievementTabs'
import CertificateModal from './CertificateModal.vue'

type AchievementsProps = {
  items: Achievement[]
  tabs?: AchievementTab[]
  initialLocale?: 'en' | 'id'
}

const props = withDefaults(defineProps<AchievementsProps>(), {
  items: () => [],
})

// Modal state
const isModalOpen = ref(false)
const selectedAchievement = ref<Achievement | null>(null)

// Render the modal only after hydration. It uses <Teleport> + <Transition>, whose
// SSR comment anchors can mismatch during hydration and wipe the whole island.
const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})

const openModal = (achievement: Achievement) => {
  selectedAchievement.value = achievement
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedAchievement.value = null
  document.body.style.overflow = ''
}

const defaultTabs: AchievementTab[] = ACHIEVEMENT_TABS

const tabs = computed(() => (props.tabs?.length ? props.tabs : defaultTabs))
const activeTab = ref(tabs.value[0]?.id ?? 'competitions')

watch(
  tabs,
  (newTabs) => {
    if (!newTabs.length) return
    if (!newTabs.find((tab) => tab.id === activeTab.value)) {
      activeTab.value = newTabs[0].id
    }
  },
  { immediate: true }
)

const searchQuery = ref('')
const { isId, resolveText } = useLocale(props.initialLocale)

const getHighlightTags = (value?: LocaleText) => parseHighlightTags(resolveText(value))

const copy = computed(() =>
  isId.value ?
    {
      heading: 'Pencapaian & bukti',
      subheading: 'Kompetisi, kursus, dan badge yang memang sudah selesai.',
      search: 'Cari pencapaian...',
      empty: 'Tidak ada data pada kategori ini.',
      viewCertificate: 'Lihat sertifikat',
    }
  : {
      heading: 'Achievements & credentials',
      subheading: 'Contests, courses, and badges that are completed.',
      search: 'Search achievements...',
      empty: 'No records match this category.',
      viewCertificate: 'View certificate',
    }
)

const filteredAchievements = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.items
  return props.items.filter((item) => {
    const fields = [
      item.title.en,
      item.title.id,
      item.issuer.en,
      item.issuer.id,
      item.highlight?.en ?? '',
      item.highlight?.id ?? '',
    ]
    return fields.some((field) => field.toLowerCase().includes(query))
  })
})

const groupedAchievements = computed(() =>
  filteredAchievements.value.reduce<Record<string, Achievement[]>>((acc, achievement) => {
    if (!acc[achievement.type]) acc[achievement.type] = []
    acc[achievement.type].push(achievement)
    return acc
  }, {})
)

const visibleItems = computed(() => groupedAchievements.value[activeTab.value] ?? [])
</script>

<template>
  <div class="achievements-shell">
    <h2>{{ copy.heading }}</h2>
    <p>{{ copy.subheading }}</p>

    <div class="achievements-toolbar">
      <label class="search">
        <input v-model="searchQuery" type="search" :placeholder="copy.search" />
      </label>

      <div class="tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.id"
          @click="activeTab = tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]">
          {{ resolveText(tab.name) }}
        </button>
      </div>
    </div>

    <div v-if="visibleItems.length" class="achievements-grid">
      <article
        v-for="item in visibleItems"
        :key="item.title.en + item.date"
        class="achievement-card clickable"
        @click="openModal(item)">
        <div class="achievement-card__header">
          <div>
            <h3>{{ resolveText(item.title) }}</h3>
            <p>{{ resolveText(item.issuer) }}</p>
          </div>
          <!-- Show logo when provided on any item -->
          <img
            v-if="item.logo"
            :src="item.logo"
            :alt="resolveText(item.issuer)"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
            class="cert-logo" />
        </div>
        <p class="achievement-card__date">{{ item.date }}</p>
        <div v-if="item.highlight" class="highlight-tags">
          <span v-for="tag in getHighlightTags(item.highlight)" :key="tag">{{ tag }}</span>
        </div>
        <!-- CTA unified: show certificate when available, otherwise open modal with details -->
        <button
          v-if="item.certificateImage || item.link"
          type="button"
          class="credential-link"
          @click.stop="openModal(item)">
          {{ copy.viewCertificate }}
          <svg class="credential-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </article>
    </div>
    <p v-else class="empty-state">
      {{ copy.empty }}
    </p>

    <!-- Certificate Modal -->
    <CertificateModal
      v-if="isHydrated"
      :achievement="selectedAchievement"
      :is-open="isModalOpen"
      :initial-locale="initialLocale"
      @close="closeModal" />
  </div>
</template>

<style scoped>
.achievements-shell {
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 4rem 1rem;
  text-align: center;
}

.achievements-shell h2 {
  margin: 0 0 0.5rem;
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-family: inherit;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text);
}

.achievements-shell > p {
  color: var(--muted);
  margin-bottom: 2rem;
}

.achievements-toolbar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.search {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  text-align: left;
  color: var(--muted);
  font-size: 0.9rem;
}

.search input {
  border-radius: 8px;
  border: 1px solid var(--border);
  padding: 0.85rem 1rem;
  background: var(--bg-soft);
  color: var(--text);
  font-size: 1rem;
  font-family: inherit;
}

.search input:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  justify-content: center;
  border-bottom: 1px solid var(--border);
}

.tab-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--muted);
  font-weight: 600;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.tab-btn:hover {
  color: var(--text);
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  text-align: left;
}

.achievement-card {
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  border: none;
  background: var(--bg-soft);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.achievement-card.clickable {
  cursor: pointer;
}

.achievement-card.clickable:hover {
  background: var(--bg-elevated);
  transform: translateY(-2px);
}

.achievement-card__header {
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: flex-start;
}

.achievement-card__header h3 {
  margin: 0;
  font-family: inherit;
  font-size: 1.15rem;
}

.achievement-card__header p {
  margin: 0.15rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.highlight-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: -0.3rem;
}

.highlight-tags span {
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  border: none;
  color: var(--accent);
  background: var(--bg);
  font-weight: 600;
}

.achievement-card__date {
  font-size: 0.9rem;
  color: var(--muted);
  margin: 0;
}

.credential-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 1rem;
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.credential-link:hover {
  text-decoration: underline;
}

.credential-icon {
  width: 1rem;
  height: 1rem;
}

.cert-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  flex-shrink: 0;
}

.empty-state {
  margin: 2rem 0 0;
  color: var(--muted);
}

@media (min-width: 768px) {
  .achievements-toolbar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .search {
    width: 320px;
  }

  .tabs {
    justify-content: flex-end;
  }
}
</style>
