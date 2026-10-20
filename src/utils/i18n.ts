export type LocaleText = {
  en: string
  id: string
}

export const t = (en: string, id: string): LocaleText => ({ en, id })

export const resolveLocaleText = (text: LocaleText | string | undefined, isId: boolean): string => {
  if (!text) return ''
  if (typeof text === 'string') return text
  return (isId ? text.id : text.en) || text.en
}
