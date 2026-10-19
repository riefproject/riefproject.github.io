<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    ariaLabel?: string
    inputType?: 'text' | 'search'
    withIcon?: boolean
    clearable?: boolean
    surface?: 'elevated' | 'soft' | 'plain'
  }>(),
  {
    inputType: 'text',
    withIcon: true,
    clearable: false,
    surface: 'elevated',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()

const hasClear = computed(() => props.clearable && props.modelValue.length > 0)

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

const clear = () => {
  emit('update:modelValue', '')
  emit('input', '')
}
</script>

<template>
  <div class="search-input-wrap" :class="`is-${surface}`">
    <svg
      v-if="withIcon"
      class="search-icon w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      class="search-input"
      :class="[`is-${surface}`, { 'has-clear': hasClear }]"
      @input="onInput" />
    <button v-if="hasClear" type="button" class="clear-search-btn" @click="clear">✕</button>
  </div>
</template>

<style scoped>
.search-input-wrap {
  position: relative;
  width: auto;
  flex: 1;
}

.search-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 2.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
  font-size: var(--text-base);
  outline: none;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: var(--text);
}

.is-elevated .search-icon {
  left: 0.85rem;
}

.search-input.is-elevated {
  padding: 0 2rem 0 2.4rem;
}

.is-soft .search-icon {
  left: 0.75rem;
}

.search-input.is-soft {
  background: var(--bg-soft);
  padding: 0 1rem 0 2.2rem;
}

.search-input.is-plain {
  height: auto;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: var(--text-base);
  cursor: pointer;
}

:root.light .search-input.is-soft {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #0f172a;
}

:root.light .search-input.is-soft:focus {
  border-color: #64748b;
}
</style>
