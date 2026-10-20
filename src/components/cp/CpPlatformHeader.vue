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
        <p>{{ isId ? descriptionId : descriptionEn }}</p>
      </div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <a :href="archiveHref" class="dedicated-page-header-btn">
        <span>{{ isId ? archiveLabelId : archiveLabelEn }}</span>
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
        {{ isId ? profileLabelId : profileLabelEn }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    logo: string
    logoLight?: string
    descriptionEn: string
    descriptionId: string
    archiveHref: string
    archiveLabelEn: string
    archiveLabelId: string
    profileHref?: string
    profileLabelEn?: string
    profileLabelId?: string
    isId?: boolean
  }>(),
  {
    profileHref: '',
    profileLabelEn: 'Profile ↗',
    profileLabelId: 'Profil ↗',
    isId: false,
  }
)
</script>
