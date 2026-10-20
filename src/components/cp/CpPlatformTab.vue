<template>
  <div class="platform-spotlight">
    <CpPlatformHeader
      :name="meta.name"
      :logo="meta.logo"
      :logoLight="meta.logoLight"
      :description="description"
      :archive-href="archiveHref"
      :archive-label="archiveLabel"
      :profile-href="profileHref"
      :profile-label="profileLabel"
      :isId="isId" />

    <slot />

    <div class="mt-8">
      <CpSolvedProblemsPanel
        :problems="recentSolved"
        :columns="columns"
        :copy="copy"
        :archive-href="archiveHref"
        :isId="isId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CpPlatformHeader from './CpPlatformHeader.vue'
import CpSolvedProblemsPanel from './CpSolvedProblemsPanel.vue'
import { CP_PLATFORMS } from '../../utils/cp/platforms'
import type { CpColumn, CpData, CpPlatformCopy, CpPlatformKey } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    platform: CpPlatformKey
    cpData: CpData
    columns: CpColumn[]
    copy: CpPlatformCopy
    isId?: boolean
  }>(),
  {
    isId: false,
  }
)

const meta = computed(() => CP_PLATFORMS[props.platform])

const description = computed(() => ({ en: meta.value.descriptionEn, id: meta.value.descriptionId }))

const archiveHref = computed(() => `/competitive-programming/problems?platform=${props.platform}`)

const archiveLabel = computed(() => ({
  en: meta.value.archiveLabelEn,
  id: meta.value.archiveLabelId,
}))

const profileLabel = computed(() => ({
  en: meta.value.profileLabelEn,
  id: meta.value.profileLabelId,
}))

const profileHref = computed(() => {
  const handle = props.cpData?.platforms?.[props.platform]?.handle
  return meta.value.profileUrl(handle || meta.value.handleFallback)
})

const recentSolved = computed(() => props.cpData?.platforms?.[props.platform]?.recentSolved || [])
</script>
