import socialData from '../content/singletons/social.json'
import { profile } from '../data/profile'

export type JsonLd = Record<string, unknown>

export const DEFAULT_DESCRIPTION =
  'Software engineer and competitive programmer from Bandung, Indonesia. Explore projects, experience, achievements, and coding activity across GitHub and CP platforms.'

export const normalizeSiteUrl = (site?: URL | string | null): string => {
  const value = site?.toString() || 'https://riefproject.my.id'
  return value.endsWith('/') ? value.slice(0, -1) : value
}

const absoluteUrl = (siteUrl: string, path: string): string => new URL(path, `${siteUrl}/`).toString()

export const buildPersonSchema = (siteUrl: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: `${siteUrl}/`,
  mainEntityOfPage: `${siteUrl}/`,
  image: `${siteUrl}/img/me.webp`,
  jobTitle: 'Software Engineer & Competitive Programmer',
  description: profile.intro.en,
  sameAs: socialData.socials.map((social) => social.url).filter((url) => url.startsWith('http')),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bandung',
    addressRegion: 'West Java',
    addressCountry: 'ID',
  },
  knowsAbout: ['Software Engineering', 'Web Development', 'Competitive Programming'],
})

export const buildWebSiteSchema = (siteUrl: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: profile.name,
  url: `${siteUrl}/`,
  description: profile.tagline.en,
  inLanguage: 'en',
})

export const buildProfilePageSchema = (siteUrl: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: `${profile.name} — Software Engineer & Competitive Programmer`,
  url: `${siteUrl}/`,
  mainEntity: {
    '@type': 'Person',
    name: profile.name,
    url: `${siteUrl}/`,
  },
})

export const buildCollectionPageSchema = (siteUrl: string, path: string, name: string, description: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url: absoluteUrl(siteUrl, path),
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
