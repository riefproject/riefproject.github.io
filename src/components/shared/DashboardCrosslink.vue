<template>
  <div class="dashboard-crosslink">
    <a :href="href" class="crosslink-btn">
      <ArrowUpRight class="crosslink-ico" :size="16" />
      <span class="crosslink-text"><slot /></span>
    </a>
  </div>
</template>

<script setup lang="ts">
import ArrowUpRight from './ArrowUpRight.vue'

defineProps<{
  href: string
}>()
</script>

<style scoped>
.dashboard-crosslink {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  margin-top: 0.5rem;
}

.crosslink-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--link);
  text-decoration: none;
  transition: all 0.15s;
}

.crosslink-text {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.crosslink-btn:hover {
  text-decoration: underline;
  transform: translateX(2px);
}

.crosslink-ico {
  width: 1rem;
  height: 1rem;
  opacity: 0.8;
}

@media (max-width: 640px) {
  .crosslink-btn {
    justify-content: center;
    text-align: center;
  }

  .crosslink-text {
    flex-direction: column;
    align-items: center;
    line-height: 1.4;
  }
}
</style>
