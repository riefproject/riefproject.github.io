<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "@nanostores/vue";
import type {
  Achievement,
  AchievementTab,
  LocaleText,
} from "../types/profile.types";
import { lang as langStore } from "../stores/uiStore.js";
import CertificateModal from "./CertificateModal.vue";

type AchievementsProps = {
  items: Achievement[];
  tabs?: AchievementTab[];
};

const props = withDefaults(defineProps<AchievementsProps>(), {
  items: () => [],
});

// Modal state
const isModalOpen = ref(false);
const selectedAchievement = ref<Achievement | null>(null);

const openModal = (achievement: Achievement) => {
  if (achievement.type === "certifications" && achievement.certificateImage) {
    selectedAchievement.value = achievement;
    isModalOpen.value = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedAchievement.value = null;
  // Restore body scroll
  document.body.style.overflow = "";
};

const defaultTabs: AchievementTab[] = [
  { id: "competitions", name: { en: "Competitions", id: "Kompetisi" } },
  { id: "certifications", name: { en: "Certifications", id: "Sertifikasi" } },
  {
    id: "bootcamps",
    name: { en: "Bootcamps & Courses", id: "Bootcamp & Kursus" },
  },
];

const tabs = computed(() => (props.tabs?.length ? props.tabs : defaultTabs));
const activeTab = ref(tabs.value[0]?.id ?? "competitions");

watch(
  tabs,
  (newTabs) => {
    if (!newTabs.length) return;
    if (!newTabs.find((tab) => tab.id === activeTab.value)) {
      activeTab.value = newTabs[0].id;
    }
  },
  { immediate: true }
);

const searchQuery = ref("");
const $lang = useStore(langStore);
const locale = computed(() => ($lang.value === "id" ? "id" : "en"));

const resolveText = (value?: LocaleText) => {
  if (!value) return "";
  return value[locale.value] ?? value.en ?? value.id ?? "";
};

const getHighlightTags = (value?: LocaleText) => {
  const text = resolveText(value);
  if (!text) return [];
  return text
    .split(/[,·\|/]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const copy = computed(() =>
  locale.value === "id"
    ? {
        heading: "Pencapaian & bukti",
        subheading: "Kompetisi, kursus, dan badge yang memang sudah selesai.",
        search: "Cari pencapaian...",
        empty: "Tidak ada data pada kategori ini.",
      }
    : {
        heading: "Achievements & credentials",
        subheading: "Contests, courses, and badges that are completed.",
        search: "Search achievements...",
        empty: "No records match this category.",
      }
);

const filteredAchievements = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return props.items;
  return props.items.filter((item) => {
    const fields = [
      item.title.en,
      item.title.id,
      item.issuer.en,
      item.issuer.id,
      item.highlight?.en ?? "",
      item.highlight?.id ?? "",
    ];
    return fields.some((field) => field.toLowerCase().includes(query));
  });
});

const groupedAchievements = computed(() =>
  filteredAchievements.value.reduce<Record<string, Achievement[]>>(
    (acc, achievement) => {
      if (!acc[achievement.type]) acc[achievement.type] = [];
      acc[achievement.type].push(achievement);
      return acc;
    },
    {}
  )
);

const visibleItems = computed(
  () => groupedAchievements.value[activeTab.value] ?? []
);
</script>

<template>
  <div class="achievements-shell">
    <h2>{{ copy.heading }}</h2>
    <p>{{ copy.subheading }}</p>

    <div class="achievements-toolbar">
      <label class="search">
        <span>{{ copy.search }}</span>
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
        class="achievement-card"
        :class="{
          clickable: item.type === 'certifications' && item.certificateImage,
        }"
        @click="
          item.type === 'certifications' && item.certificateImage
            ? openModal(item)
            : null
        ">
        <div class="achievement-card__header">
          <div>
            <h3>{{ resolveText(item.title) }}</h3>
            <p>{{ resolveText(item.issuer) }}</p>
          </div>
          <!-- Show logo for certifications -->
          <img
            v-if="item.type === 'certifications' && item.logo"
            :src="item.logo"
            :alt="resolveText(item.issuer)"
            class="cert-logo" />
        </div>
        <p class="achievement-card__date">{{ item.date }}</p>
        <div v-if="item.highlight" class="highlight-tags">
          <span v-for="tag in getHighlightTags(item.highlight)" :key="tag">{{
            tag
          }}</span>
        </div>
        <!-- Show "View Certificate" for certs with images, "View credential" for others -->
        <div v-if="item.type === 'certifications' && item.certificateImage">
          <button class="view-cert-btn" type="button">
            {{ locale === "id" ? "Lihat sertifikat" : "View certificate" }}
            <svg
              class="credential-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
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
        </div>
        <a
          v-else-if="item.link"
          :href="item.link"
          target="_blank"
          rel="noreferrer"
          class="credential-link">
          {{ locale === "id" ? "Lihat kredensial" : "View credential" }}
          <svg
            class="credential-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </article>
    </div>
    <p v-else class="empty-state">
      {{ copy.empty }}
    </p>

    <!-- Certificate Modal -->
    <CertificateModal
      :achievement="selectedAchievement"
      :is-open="isModalOpen"
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
  font-size: clamp(2rem, 4svw, 2.75rem);
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
  border-radius: 0.9rem;
  border: 1px solid var(--border);
  padding: 0.85rem 1rem;
  background: var(--bg-elevated);
  color: var(--text);
  font-size: 1rem;
}

.search input:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tab-btn {
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;
}

.tab-btn.active {
  background: var(--chip-bg);
  color: var(--text);
  border-color: var(--accent);
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  text-align: left;
}

.achievement-card {
  padding: 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.achievement-card.clickable {
  cursor: pointer;
}

.achievement-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover, 0 8px 16px rgba(0, 0, 0, 0.1));
}

.achievement-card__header {
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: flex-start;
}

.achievement-card__header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text);
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
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--accent-strong);
  background: var(--chip-bg);
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
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
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

.view-cert-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--accent);
  font-weight: 600;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;
}

.view-cert-btn:hover {
  text-decoration: underline;
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
