import socialData from '../content/singletons/social.json'
import { profile } from '../data/profile'
import type { Locale } from './routing'

export type JsonLd = Record<string, unknown>

export const DEFAULT_DESCRIPTION =
  'Software engineer and competitive programmer from Bandung, Indonesia. Explore projects, experience, achievements, and coding activity across GitHub and CP platforms.'

export const DEFAULT_DESCRIPTION_ID =
  'Software engineer dan competitive programmer asal Bandung, Indonesia. Jelajahi proyek, pengalaman, pencapaian, dan aktivitas coding di GitHub serta platform CP.'

export const normalizeSiteUrl = (site?: URL | string | null): string => {
  const value = site?.toString() || 'https://riefproject.my.id'
  return value.endsWith('/') ? value.slice(0, -1) : value
}

const absoluteUrl = (siteUrl: string, path: string): string => new URL(path, `${siteUrl}/`).toString()

export const buildPersonSchema = (siteUrl: string, locale: Locale = 'en'): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: `${siteUrl}/`,
  mainEntityOfPage: `${siteUrl}/`,
  image: `${siteUrl}/img/me.webp`,
  jobTitle: 'Software Engineer & Competitive Programmer',
  description: profile.intro[locale],
  sameAs: socialData.socials.map((social) => social.url).filter((url) => url.startsWith('http')),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bandung',
    addressRegion: 'West Java',
    addressCountry: 'ID',
  },
  knowsAbout: ['Software Engineering', 'Web Development', 'Competitive Programming'],
})

export const buildWebSiteSchema = (siteUrl: string, locale: Locale = 'en'): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: profile.name,
  url: `${siteUrl}/`,
  description: profile.tagline[locale],
  inLanguage: locale,
})

export const buildProfilePageSchema = (siteUrl: string, path = '/', locale: Locale = 'en'): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: `${profile.name} — Software Engineer & Competitive Programmer`,
  url: absoluteUrl(siteUrl, path),
  inLanguage: locale,
  mainEntity: {
    '@type': 'Person',
    name: profile.name,
    url: absoluteUrl(siteUrl, path),
  },
})

export const buildCollectionPageSchema = (siteUrl: string, path: string, name: string, description: string, locale: Locale = 'en'): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url: absoluteUrl(siteUrl, path),
  inLanguage: locale,
  isPartOf: {
    '@type': 'WebSite',
    name: profile.name,
    url: `${siteUrl}/`,
  },
})

export const buildBreadcrumbSchema = (siteUrl: string, items: Array<{ name: string; path: string }>): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(siteUrl, item.path),
  })),
})
