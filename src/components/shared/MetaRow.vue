<template>
  <div class="pcard-meta-row">
    <span>{{ label }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<style scoped>
.pcard-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pcard-meta-row :deep(strong) {
  color: var(--text);
}
</style>
