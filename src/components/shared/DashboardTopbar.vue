<template>
  <div class="dashboard-topbar">
    <div class="live-indicator">
      <span class="pulse-dot"></span>
      <span class="live-text">{{ isId ? 'Terakhir Disinkronkan' : 'Last Synced' }}</span>
      <span class="updated-time" v-if="lastUpdated">• {{ formattedTime }}</span>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatRelativeTime } from '../../utils/dateFormat'

const props = withDefaults(
  defineProps<{
    lastUpdated?: string
    isId?: boolean
  }>(),
  {
    isId: false,
  }
)

const formattedTime = computed(() => {
  if (!props.lastUpdated) return ''
  return formatRelativeTime(props.lastUpdated, props.isId)
})
</script>

<style scoped>
.dashboard-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--muted);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}

.live-text {
  font-weight: 600;
  color: var(--text);
}

.updated-time {
  color: var(--muted);
}

@media (max-width: 480px) {
  .dashboard-topbar {
    flex-direction: column !important;
    gap: 0.75rem !important;
    align-items: stretch !important;
    text-align: center !important;
  }

  .live-indicator {
    justify-content: center !important;
  }
}
</style>
