<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../types/profile.types'
import { useLocale } from '../../composables/useLocale'
import ArrowUpRight from '../shared/ArrowUpRight.vue'
import CollapsibleContent from '../shared/CollapsibleContent.vue'

const props = withDefaults(
  defineProps<{
    project: Project
    maxHighlights?: number
    maxLinks?: number
    maxStack?: number
    collapsedHeight?: string
    fadeHeight?: string
    initialLocale?: 'en' | 'id'
  }>(),
  {
    collapsedHeight: '120px',
    fadeHeight: '3rem',
  }
)

const { resolveText } = useLocale(props.initialLocale)

const highlightItems = computed(() =>
  props.maxHighlights != null ?
    props.project.highlights.slice(0, props.maxHighlights)
  : props.project.highlights
)

const linkItems = computed(() => {
  const links = props.project.links ?? []
  return props.maxLinks != null ? links.slice(0, props.maxLinks) : links
})

const stackItems = computed(() =>
  props.maxStack != null ? props.project.stack.slice(0, props.maxStack) : props.project.stack
)

const extraStack = computed(() =>
  props.maxStack != null ? Math.max(props.project.stack.length - props.maxStack, 0) : 0
)
</script>

<template>
  <article class="project-card">
    <slot name="media">
      <div v-if="project.img" class="project-image">
        <img :src="project.img" :alt="resolveText(project.title)" loading="lazy" decoding="async" />
      </div>
      <div
        v-else
        class="project-placeholder"
        :data-initial="resolveText(project.title).charAt(0)"></div>
    </slot>

    <div class="project-content">
      <header class="project-header">
        <p class="project-meta">{{ project.year }} · {{ resolveText(project.category) }}</p>
        <h3 class="project-title">{{ resolveText(project.title) }}</h3>
        <slot name="header-actions" />
      </header>

      <CollapsibleContent class="mt-2" :collapsedHeight="collapsedHeight" :fadeHeight="fadeHeight">
        <slot name="body">
          <p class="project-description">{{ resolveText(project.description) }}</p>
          <p v-if="project.impact" class="project-impact">{{ resolveText(project.impact) }}</p>
          <ul v-if="highlightItems.length" class="project-highlights">
            <li v-for="(highlight, index) in highlightItems" :key="index">
              {{ resolveText(highlight) }}
            </li>
          </ul>
        </slot>
      </CollapsibleContent>

      <slot name="links">
        <div v-if="linkItems.length" class="project-links">
          <a
            v-for="link in linkItems"
            :key="link.url"
            class="project-link"
            :href="link.url"
            target="_blank"
            rel="noreferrer">
            {{ resolveText(link.label) }}
            <ArrowUpRight :size="16" />
          </a>
        </div>
      </slot>

      <slot name="stack">
        <div v-if="stackItems.length" class="project-stack">
          <span v-for="tech in stackItems" :key="tech" class="stack-chip">{{ tech }}</span>
          <span v-if="extraStack > 0" class="stack-chip">+{{ extraStack }}</span>
        </div>
      </slot>

      <slot name="footer" />
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: none;
  border-radius: var(--radius-xl);
  background: var(--bg-soft);
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.project-card:hover {
  background: var(--bg-elevated);
  transform: translateY(-2px);
}

.project-card:hover :deep(.collapsible__fade) {
  background: linear-gradient(to top, var(--bg-elevated), transparent);
}

.project-image {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: none;
}

.project-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-placeholder {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.project-placeholder::before {
  content: attr(data-initial);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: 1px solid var(--border);
  font-size: 3rem;
  font-weight: 700;
  color: var(--muted);
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.project-meta {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
}

.project-title {
  margin: 0;
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
}

.project-description {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
}

.project-impact {
  margin: 0.5rem 0 0;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--muted);
  background: var(--bg);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-sm);
}

.project-highlights {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
  list-style: disc;
}

.project-highlights li {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--muted);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  transition: border-color 0.2s ease;
}

.project-link:hover {
  border-color: var(--accent);
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.stack-chip {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--muted);
}
</style>
