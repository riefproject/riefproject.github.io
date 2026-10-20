<template>
  <CpPlatformTab
    platform="hackerrank"
    :cpData="cpData"
    :columns="columns"
    :isId="isId"
    solved-title-en="Solved HackerRank Challenges"
    solved-title-id="Tantangan HackerRank yang Diselesaikan"
    title-column-en="Challenge"
    title-column-id="Tantangan"
    item-noun-en="challenges"
    item-noun-id="tantangan"
    archive-href="/competitive-programming/problems?platform=hackerrank"
    :cta-en="`View All ${totalHrSolved}+ HackerRank Challenges on Dedicated Page →`"
    :cta-id="`Lihat Seluruh ${totalHrSolved}+ Tantangan HackerRank di Halaman Khusus →`"
    open-title-en="Open on HackerRank"
    open-title-id="Buka di HackerRank">
    <div class="mt-4">
      <h4 class="text-lg font-semibold mb-4 platform-subtitle">
        {{ copy.scoresTitle }}
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="track in cpData?.platforms?.hackerrank?.trackScores || []"
          :key="track.slug"
          class="p-4 hr-track-card">
          <span class="text-sm font-medium hr-track-name">{{ track.name }}</span>
          <div class="text-2xl font-bold hr-track-score mt-1">{{ track.score }} pts</div>
          <span v-if="track.rank" class="text-xs hr-track-rank mt-1 block"
            >Rank #{{ track.rank.toLocaleString() }}</span
          >
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h4 class="text-lg font-semibold mb-4 platform-subtitle">
        {{ copy.badgesTitle }}
      </h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="b in cpData?.platforms?.hackerrank?.badges || []"
          :key="b.name"
          class="p-3.5 hr-badge-card text-center">
          <div class="hr-badge-stars font-bold text-lg">★ {{ b.stars }} Stars</div>
          <div class="text-sm font-semibold hr-badge-name mt-1">{{ b.name }}</div>
          <div class="text-xs hr-badge-solved mt-0.5">{{ b.solved }} {{ copy.solved }}</div>
        </div>
      </div>
    </div>
  </CpPlatformTab>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CpPlatformTab from './CpPlatformTab.vue'
import { CP_FALLBACK } from '../../utils/cp/defaults'
import type { CpColumn, CpData } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    cpData: CpData
    totalHrSolved?: number
    isId?: boolean
  }>(),
  {
    totalHrSolved: CP_FALLBACK.hackerrankTotalSolved,
    isId: false,
  }
)

const copy = computed(() => {
  const id = props.isId
  return {
    scoresTitle: id ? 'Skor & Track Domain' : 'Scores & Track Domains',
    badgesTitle: id ? 'Badge & Bintang Keahlian' : 'Badges & Skill Stars',
    solved: id ? 'selesai' : 'solved',
  }
})

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Track / Domain', labelId: 'Track / Domain' },
]
</script>

<style scoped>
.hr-track-card {
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-xl);
}
:root.light .hr-track-card {
  background: var(--bg-soft) !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.hr-track-name {
  color: #e2e8f0;
}
:root.light .hr-track-name {
  color: #334155 !important;
}

.hr-track-score {
  color: #34d399;
}
:root.light .hr-track-score {
  color: #047857 !important;
}

.hr-track-rank {
  color: var(--muted);
}
:root.light .hr-track-rank {
  color: #64748b !important;
}

.hr-badge-card {
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-xl);
}
:root.light .hr-badge-card {
  background: var(--bg-soft) !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.hr-badge-stars {
  color: #fbbf24;
}
:root.light .hr-badge-stars {
  color: #b45309 !important;
}

.hr-badge-name {
  color: #f3f4f6;
}
:root.light .hr-badge-name {
  color: #1e293b !important;
}

.hr-badge-solved {
  color: var(--muted);
}
:root.light .hr-badge-solved {
  color: #64748b !important;
}
</style>
