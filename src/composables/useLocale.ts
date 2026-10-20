import { computed, type ComputedRef } from 'vue'
import { useStore } from '@nanostores/vue'
import { lang, type Locale } from '../stores/uiStore'
import { resolveLocaleText, type LocaleText } from '../utils/i18n'
import type { Locale as RoutingLocale } from '../utils/routing'

export function useLocale(initialLocale?: RoutingLocale) {
  const $lang = useStore(lang)
  const isId = computed(() => (initialLocale ? initialLocale === 'id' : $lang.value === 'id'))
  const locale = computed<Locale>(() => (isId.value ? 'id' : 'en'))

  const resolveText = (text?: LocaleText | string): string => resolveLocaleText(text, isId.value)

  return { $lang, isId, locale, resolveText } as {
    $lang: ComputedRef<Locale>
    isId: ComputedRef<boolean>
    locale: ComputedRef<Locale>
    resolveText: (text?: LocaleText | string) => string
  }
}
