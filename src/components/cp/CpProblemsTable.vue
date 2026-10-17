<template>
  <div class="cp-table-wrapper">
    <table class="cp-table">
      <thead>
        <tr>
          <th class="col-num">#</th>
          <th v-if="showPlatform" class="col-platform">Platform</th>
          <th class="col-title">{{ isId ? 'Judul Soal' : 'Problem Name' }}</th>
          <th class="col-category">{{ isId ? 'Topik / Modul' : 'Topic / Module' }}</th>
          <th v-if="showDifficulty" class="col-diff">{{ isId ? 'Kesulitan' : 'Difficulty' }}</th>
          <th class="col-lang">{{ isId ? 'Bahasa' : 'Language' }}</th>
          <th class="col-status">Status</th>
          <th class="col-time">{{ isId ? 'Waktu Selesai' : 'Solved Date' }}</th>
          <th class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in problems" :key="item.id || idx" class="cp-table-row">
          <td class="cell-num">
            {{ startIndex + idx + 1 }}
          </td>

          <!-- Platform Column -->
          <td v-if="showPlatform" class="cell-platform">
            <div class="platform-badge-cell" :class="item.platform">
              <img
                :src="getPlatformLogo(item.platform)"
                :alt="item.platform"
                class="table-logo-img"
              />
              <span class="platform-text-name">{{ getPlatformName(item.platform) }}</span>
            </div>
          </td>

          <!-- Title -->
          <td class="cell-title">
            <a
              :href="item.url || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="problem-title-link"
              :title="item.title"
            >
              <span class="title-text">{{ item.title }}</span>
              <svg class="w-3.5 h-3.5 link-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </td>

          <!-- Category / Topic -->
          <td class="cell-category">
            <span class="topic-pill" v-if="item.category" :title="item.category">
              <span>{{ item.category }}</span>
            </span>
            <span class="text-xs text-gray-500 font-mono" v-else>-</span>
          </td>

          <!-- Difficulty -->
          <td v-if="showDifficulty" class="cell-diff">
            <span
              v-if="item.difficulty && item.difficulty !== '-'"
              class="diff-badge"
              :class="getDiffClass(item.difficulty)"
            >
              {{ item.difficulty }}
            </span>
            <span v-else class="text-xs text-gray-500 font-mono">-</span>
          </td>

          <!-- Language -->
          <td class="cell-lang">
            <span class="lang-tag" v-if="item.language">{{ cleanLanguage(item.language) }}</span>
            <span class="text-xs text-gray-500 font-mono" v-else>-</span>
          </td>

          <!-- Status / Verdict -->
          <td class="cell-status">
            <span class="status-badge ac">AC</span>
          </td>

          <!-- Solved Time -->
          <td class="cell-time" :title="item.solvedAt">
            {{ formatExactDate(item.solvedAt, isId) }}
          </td>

          <!-- Action External Link -->
          <td class="cell-action">
            <a
              :href="item.url || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="open-btn"
              :title="isId ? 'Buka soal di platform' : 'Open problem on platform'"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  getPlatformLogo,
  getPlatformName,
  getDiffClass,
  cleanLanguage,
  formatExactDate,
} from './cpUtils';

const props = withDefaults(
  defineProps<{
    problems: any[];
    currentPage?: number;
    pageSize?: number;
    showPlatform?: boolean;
    showDifficulty?: boolean;
    isId?: boolean;
  }>(),
  {
    currentPage: 1,
    pageSize: 10,
    showPlatform: true,
    showDifficulty: true,
    isId: false,
  }
);

const startIndex = computed(() => (props.currentPage - 1) * props.pageSize);
</script>
