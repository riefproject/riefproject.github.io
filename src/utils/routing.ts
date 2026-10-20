export type Locale = 'en' | 'id'

const splitPath = (value: string): { pathname: string; suffix: string } => {
  const match = value.match(/^([^?#]*)([?#].*)?$/)
  return {
    pathname: match?.[1] || '/',
    suffix: match?.[2] || '',
  }
}

export const localeFromPath = (pathname: string): Locale => {
  const { pathname: path } = splitPath(pathname)
  return path === '/id' || path.startsWith('/id/') ? 'id' : 'en'
}

export const stripLocalePath = (pathname: string): string => {
  const { pathname: path, suffix } = splitPath(pathname)
  if (path === '/id') return `/${suffix}`
  if (path.startsWith('/id/')) return `${path.slice(3) || '/'}${suffix}`
  return `${path || '/'}${suffix}`
}

export const localizePath = (path: string, locale: Locale): string => {
  const { pathname, suffix } = splitPath(path)
  const base = stripLocalePath(pathname.startsWith('/') ? pathname : `/${pathname}`)

  if (locale === 'en') return `${base || '/'}${suffix}`

  const localized = base === '/' ? '/id/' : `/id${base}`
  return `${localized}${suffix}`
}
