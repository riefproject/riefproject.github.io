<template>
  <div class="platform-detail-card" @click="$emit('select')">
    <!-- Card Header Shell -->
    <div class="pcard-header">
      <div class="pcard-title-group">
        <div class="pcard-logo-box">
          <template v-if="logo && logoLight">
            <img :src="logo" :alt="name" class="pcard-img-logo logo-variant-dark" />
            <img :src="logoLight" :alt="name" class="pcard-img-logo logo-variant-light" />
          </template>
          <img v-else :src="logo" :alt="name" class="pcard-img-logo" />
        </div>
        <div class="pcard-title-text">
          <h4 class="pcard-name">{{ name }}</h4>
          <span class="pcard-handle">{{
            handle.startsWith('@') ? handle
            : handle.includes(' ') ? handle
            : `@${handle}`
          }}</span>
        </div>
      </div>
      <div class="pcard-solved-badge">
        <span class="pcard-solved-num">{{ solvedNum }}</span>
        <span class="pcard-solved-label">{{ solvedLabel }}</span>
      </div>
    </div>

    <!-- Card Body (Yield / Slot for custom platform metrics) -->
    <div class="pcard-body">
      <slot />
    </div>

    <!-- Card Footer Shell -->
    <div class="pcard-footer">
      <span class="view-details-link">{{ footerText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  handle: string
  logo: string
  logoLight?: string
  solvedNum: number | string
  solvedLabel: string
  footerText: string
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<style scoped>
.platform-detail-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  background: var(--bg-soft);
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all 0.2s;
}

.platform-detail-card:hover {
  background: var(--bg-elevated);
  transform: translateY(-2px);
}

:root.light .platform-detail-card {
  background: var(--bg-soft);
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

:root.light .platform-detail-card:hover {
  background: var(--bg-elevated);
}

.pcard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.pcard-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pcard-logo-box {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: none;
}

.pcard-img-logo {
  width: 1.35rem;
  height: 1.35rem;
  object-fit: contain;
}

.pcard-title-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.pcard-name {
  font-size: var(--text-base);
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.pcard-handle {
  font-size: var(--text-xs);
  color: var(--muted);
  margin-top: 0.15rem;
}

.pcard-solved-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-md);
  border: none;
  white-space: nowrap;
}

.pcard-solved-num {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.pcard-solved-label {
  font-size: var(--text-xs);
  color: var(--muted);
  font-weight: 400;
}

.pcard-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--muted);
  margin-bottom: 1.25rem;
}

/* Slotted styles for custom yield content inside body */
:slotted(.pcard-meta-row) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:slotted(.pcard-meta-row strong) {
  color: var(--text);
}

:slotted(.diff-split) {
  font-weight: 700;
}

:slotted(.diff-cnt.easy) {
  color: #34d399;
}
:slotted(.diff-cnt.medium) {
  color: #fbbf24;
}
:slotted(.diff-cnt.hard) {
  color: #f43f5e;
}

:root.light :slotted(.diff-cnt.easy) {
  color: #047857;
  font-weight: 700;
}
:root.light :slotted(.diff-cnt.medium) {
  color: #b45309;
  font-weight: 700;
}
:root.light :slotted(.diff-cnt.hard) {
  color: #be123c;
  font-weight: 700;
}

:slotted(.cf-rank-text) {
  color: #38bdf8;
}

:slotted(.capitalize) {
  text-transform: capitalize;
}

:slotted(.track-pts-emerald) {
  color: #34d399;
}

:slotted(.track-pts-sky) {
  color: #38bdf8;
}

:root.light :slotted(.track-pts-emerald) {
  color: #047857;
}

:root.light :slotted(.track-pts-sky) {
  color: #0284c7;
}

.pcard-footer {
  border-top: none;
  padding-top: 0.75rem;
}

.view-details-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--link);
}
</style>
