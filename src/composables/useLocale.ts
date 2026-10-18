import { computed, type ComputedRef } from 'vue';
import { useStore } from '@nanostores/vue';
import { lang } from '../stores/uiStore.js';
import { resolveLocaleText, type LocaleText } from '../utils/i18n';

export function useLocale() {
  const $lang = useStore(lang);
  const isId = computed(() => $lang.value === 'id');
  const locale = computed<'en' | 'id'>(() => (isId.value ? 'id' : 'en'));

  const resolveText = (text?: LocaleText | string): string =>
    resolveLocaleText(text, isId.value);

  return { $lang, isId, locale, resolveText } as {
    $lang: ComputedRef<string>;
    isId: ComputedRef<boolean>;
    locale: ComputedRef<'en' | 'id'>;
    resolveText: (text?: LocaleText | string) => string;
  };
}
