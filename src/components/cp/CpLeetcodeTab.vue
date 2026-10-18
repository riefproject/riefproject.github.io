<template>
  <div class="platform-spotlight">
    <CpPlatformHeader
      name="LeetCode"
      logo="/img/leetcode/leetcode.webp"
      description-en="Data Structures & Algorithms practice platform for software engineering technical preparation."
      description-id="Platform latihan Data Structures & Algorithms untuk persiapan teknikal software engineer."
      archive-href="/competitive-programming/problems?platform=leetcode"
      archive-label-en="Open LeetCode Archive (59)"
      archive-label-id="Buka Koleksi LeetCode (59 Soal)"
      :profile-href="`https://leetcode.com/u/${cpData?.platforms?.leetcode?.handle || 'fsaree'}`"
      profile-label-en="LeetCode Profile ↗"
      profile-label-id="Profil LeetCode ↗"
      :isId="isId"
    />

    <CpMetricsGrid :metrics="metrics" />

    <div class="mt-8">
      <CpSolvedProblemsPanel
        :problems="recentSolvedList"
        :columns="columns"
        title-en="Solved LeetCode Problems"
        title-id="Soal LeetCode yang Diselesaikan"
        archive-href="/competitive-programming/problems?platform=leetcode"
        :cta-en="`View All ${totalLcSolved} LeetCode Problems on Dedicated Page →`"
        :cta-id="`Lihat Seluruh ${totalLcSolved} Soal LeetCode di Halaman Khusus →`"
        open-title-en="Open on LeetCode"
        open-title-id="Buka di LeetCode"
        :isId="isId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CpPlatformHeader from './CpPlatformHeader.vue';
import CpMetricsGrid from './CpMetricsGrid.vue';
import CpSolvedProblemsPanel from './CpSolvedProblemsPanel.vue';
import type { CpColumn, CpMetric } from './cpTypes';

const props = withDefaults(
  defineProps<{
    cpData: any;
    totalLcSolved?: number;
    isId?: boolean;
  }>(),
  {
    totalLcSolved: 59,
    isId: false,
  },
);

const recentSolvedList = computed(
  () => props.cpData?.platforms?.leetcode?.recentSolved || [],
);

const columns: CpColumn[] = [
  { key: 'category', labelEn: 'Category', labelId: 'Kategori' },
];

const metrics = computed<CpMetric[]>(() => [
  {
    label: 'Easy Solved',
    value: props.cpData?.platforms?.leetcode?.easySolved || 32,
    sub: props.isId ? 'Fondasi & Dasar DSA' : 'DSA Foundations & Basics',
    variant: 'emerald',
  },
  {
    label: 'Medium Solved',
    value: props.cpData?.platforms?.leetcode?.mediumSolved || 24,
    sub: props.isId ? 'Problem Solving Inti' : 'Core Problem Solving',
    variant: 'amber',
  },
  {
    label: 'Hard Solved',
    value: props.cpData?.platforms?.leetcode?.hardSolved || 3,
    sub: props.isId ? 'Kompleksitas Lanjutan' : 'Advanced Complexity',
    variant: 'rose',
  },
]);
</script>
