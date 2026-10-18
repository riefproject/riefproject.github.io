<template>
  <button
    type="button"
    class="toggle-btn"
    :aria-label="ariaLabel"
    @click="cycle"
  >
    <span
      v-for="option in options"
      :key="option.value"
      class="segment"
      :class="{ active: modelValue === option.value }"
      aria-hidden="true"
    >
      <slot :name="option.value">
        <span v-if="option.label">{{ option.label }}</span>
        <span v-else-if="option.icon" v-html="option.icon"></span>
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
export interface SegmentedOption {
  value: string;
  label?: string;
  icon?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    options: SegmentedOption[];
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: 'Toggle',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const cycle = () => {
  const current = props.options.findIndex((option) => option.value === props.modelValue);
  const next = props.options[(current + 1) % props.options.length];
  if (next) emit('update:modelValue', next.value);
};
</script>

<style scoped>
.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--text);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  transition: border-color 0.2s ease, background 0.2s ease;
  line-height: 1;
}

.toggle-btn:hover {
  border-color: var(--border-hover, var(--muted));
}

.segment {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  color: var(--muted);
  border: none;
  transition: all 0.2s ease;
  user-select: none;
}

.segment:hover {
  color: var(--text);
}

.segment.active {
  background: var(--surface);
  color: var(--accent);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  border: none;
  animation: toggle-pop 160ms ease;
}

:deep(svg) {
  width: 1rem;
  height: 1rem;
  display: block;
}

@keyframes toggle-pop {
  0% {
    transform: scale(0.92);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
