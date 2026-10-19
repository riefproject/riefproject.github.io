<template>
  <div class="platform-spotlight">
    <CpPlatformHeader
      name="HackerRank"
      logo="/img/hackerrank/HackerRank.webp"
      description-en="Evaluation platform for programming skills, SQL, problem solving, and languages."
      description-id="Platform evaluasi kemampuan programming, SQL, problem solving, dan bahasa pemrograman."
      archive-href="/competitive-programming/problems?platform=hackerrank"
      archive-label-en="Open HackerRank Archive (138+)"
      archive-label-id="Buka Koleksi HackerRank (138+ Challenges)"
      :profile-href="`https://www.hackerrank.com/profile/${cpData?.platforms?.hackerrank?.handle || 'areee'}`"
      profile-label-en="HackerRank Profile ↗"
      profile-label-id="Profil HackerRank ↗"
      :isId="isId"
    />

    <div class="mt-4">
      <h4 class="text-lg font-semibold mb-4 platform-subtitle">{{ isId ? 'Skor & Track Domain' : 'Scores & Track Domains' }}</h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="track in (cpData?.platforms?.hackerrank?.trackScores || [])"
          :key="track.slug"
          class="p-4 hr-track-card"
        >
          <span class="text-sm font-medium hr-track-name">{{ track.name }}</span>
          <div class="text-2xl font-bold hr-track-score mt-1">{{ track.score }} pts</div>
          <span v-if="track.rank" class="text-xs hr-track-rank mt-1 block">Rank #{{ track.rank.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h4 class="text-lg font-semibold mb-4 platform-subtitle">{{ isId ? 'Badge & Bintang Keahlian' : 'Badges & Skill Stars' }}</h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="b in (cpData?.platforms?.hackerrank?.badges || [])"
          :key="b.name"
          class="p-3.5 hr-badge-card text-center"
        >
          <div class="hr-badge-stars font-bold text-lg">★ {{ b.stars }} Stars</div>
          <div class="text-sm font-semibold hr-badge-name mt-1">{{ b.name }}</div>
          <div class="text-xs hr-badge-solved mt-0.5">{{ b.solved }} {{ isId ? 'selesai' : 'solved' }}</div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <CpSolvedProblemsPanel
        :problems="recentSolvedList"
        :columns="columns"
        title-en="Solved HackerRank Challenges"
        title-id="Tantangan HackerRank yang Diselesaikan"
        title-column-en="Challenge"
        title-column-id="Tantangan"
        item-noun-en="challenges"
        item-noun-id="tantangan"
        archive-href="/competitive-programming/problems?platform=hackerrank"
        :cta-en="`View All ${totalHrSolved}+ HackerRank Challenges on Dedicated Page →`"
        :cta-id="`Lihat Seluruh ${totalHrSolved}+ Tantangan HackerRank di Halaman Khusus →`"
        open-title-en="Open on HackerRank"
        open-title-id="Buka di HackerRank"
        :isId="isId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CpPlatformHeader from './CpPlatformHeader.vue';
import CpSolvedProblemsPanel from './CpSolvedProblemsPanel.vue';
import type { CpColumn } from '../../types/cp.types';

const props = withDefaults(
  defineProps<{
    cpData: any;
    totalHrSolved?: number;
    isId?: boolean;
  }>(),
  {
    totalHrSolved: 138,
    isId: false,
  },
);

const recentSolvedList = computed(
  () => props.cpData?.platforms?.hackerrank?.recentSolved || [],
);

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Track / Domain', labelId: 'Track / Domain' },
];
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
