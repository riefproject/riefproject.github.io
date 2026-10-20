<template>
  <div class="platform-spotlight">
    <CpPlatformHeader
      :name="meta.name"
      :logo="meta.logo"
      :logoLight="meta.logoLight"
      :description-en="meta.descriptionEn"
      :description-id="meta.descriptionId"
      :archive-href="meta.archiveHref"
      :archive-label-en="meta.archiveLabelEn"
      :archive-label-id="meta.archiveLabelId"
      :profile-href="profileHref"
      :profile-label-en="meta.profileLabelEn"
      :profile-label-id="meta.profileLabelId"
      :isId="isId" />

    <slot />

    <div class="mt-8">
      <CpSolvedProblemsPanel
        :problems="recentSolved"
        :columns="columns"
        :title-en="solvedTitleEn"
        :title-id="solvedTitleId"
        :title-column-en="titleColumnEn"
        :title-column-id="titleColumnId"
        :item-noun-en="itemNounEn"
        :item-noun-id="itemNounId"
        :archive-href="archiveHref"
        :cta-en="ctaEn"
        :cta-id="ctaId"
        :open-title-en="openTitleEn"
        :open-title-id="openTitleId"
        :isId="isId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CpPlatformHeader from './CpPlatformHeader.vue'
import CpSolvedProblemsPanel from './CpSolvedProblemsPanel.vue'
import { CP_PLATFORMS } from '../../utils/cp/platforms'
import type { CpColumn, CpData, CpPlatformKey } from '../../types/cp.types'

const props = withDefaults(
  defineProps<{
    platform: CpPlatformKey
    cpData: CpData
    columns: CpColumn[]
    solvedTitleEn: string
    solvedTitleId: string
    archiveHref: string
    ctaEn: string
    ctaId: string
    openTitleEn?: string
    openTitleId?: string
    titleColumnEn?: string
    titleColumnId?: string
    itemNounEn?: string
    itemNounId?: string
    isId?: boolean
  }>(),
  {
    openTitleEn: 'Open submission',
    openTitleId: 'Buka submisi',
    titleColumnEn: 'Problem Name',
    titleColumnId: 'Judul Soal',
    itemNounEn: 'problems',
    itemNounId: 'soal',
    isId: false,
  }
)

const meta = computed(() => CP_PLATFORMS[props.platform])

const profileHref = computed(() => {
  const handle = props.cpData?.platforms?.[props.platform]?.handle
  return meta.value.profileUrl(handle || meta.value.handleFallback)
})

const recentSolved = computed(() => props.cpData?.platforms?.[props.platform]?.recentSolved || [])
</script>
