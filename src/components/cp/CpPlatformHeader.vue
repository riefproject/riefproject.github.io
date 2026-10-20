<template>
  <div class="spotlight-header">
    <div class="flex items-center gap-3.5">
      <div class="spotlight-logo-box">
        <template v-if="logoLight">
          <img :src="logo" :alt="name" class="spotlight-img-logo logo-variant-dark" />
          <img :src="logoLight" :alt="name" class="spotlight-img-logo logo-variant-light" />
        </template>
        <img v-else :src="logo" :alt="name" class="spotlight-img-logo" />
      </div>
      <div>
        <h2>{{ name }}</h2>
        <p>{{ text(description) }}</p>
      </div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <a :href="archiveHref" class="dedicated-page-header-btn">
        <span>{{ text(archiveLabel) }}</span>
        <svg
          class="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
      <a
        v-if="profileHref"
        :href="profileHref"
        target="_blank"
        rel="noopener noreferrer"
        class="external-profile-btn">
        {{ text(profileLabel) }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resolveLocaleText, type LocaleText } from '../../utils/i18n'

const props = withDefaults(
  defineProps<{
    name: string
    logo: string
    logoLight?: string
    description: LocaleText
    archiveHref: string
    archiveLabel: LocaleText
    profileHref?: string
    profileLabel?: LocaleText
    isId?: boolean
  }>(),
  {
    profileHref: '',
    profileLabel: () => ({ en: 'Profile ↗', id: 'Profil ↗' }),
    isId: false,
  }
)

const text = (value: LocaleText) => resolveLocaleText(value, props.isId)
</script>
