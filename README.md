# Portfolio Astro x Vue

Personal portfolio and activity dashboard built with Astro 5, Vue 3 islands, and Tailwind CSS.
Content is rendered statically; interactive dashboards hydrate only where needed.

## Requirements

- Node.js 20+
- npm

## Quick start

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
npm run preview
```

## Commands

| Command                    | Purpose                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `npm run dev`              | Start the Astro dev server.                                        |
| `npm run build`            | Build the static site into `dist/`.                                |
| `npm run preview`          | Preview the production build locally.                              |
| `npm run check`            | Run `astro check` (Astro, Vue, and TypeScript diagnostics).        |
| `npm test`                 | Run Vitest unit tests.                                             |
| `npm run test:e2e`         | Run Playwright smoke, interaction, and axe accessibility tests.    |
| `npm run verify`           | Format check + Astro check + unit tests + data validation + build. |
| `npm run format`           | Format the repository with Prettier.                               |
| `npm run crawl:data`       | Refresh GitHub, GitLab, and competitive-programming snapshots.     |
| `npm run sync:cp-fallback` | Regenerate `src/data/cp-fallback.json` from the CP snapshot.       |
| `npm run validate:data`    | Validate CP totals, archive problems, and fallback freshness.      |
| `npm run lighthouse`       | Run Lighthouse CI against all public pages.                        |

## Architecture

- `src/content/` — content collections and singleton JSON files. This is the source of truth for
  profile, contact, social links, projects, experience, achievements, education, CP profiles, and
  stack showcase.
- `src/pages/` — static routes: home, projects, competitive programming, solved problems, development
  activity, and combined coding activity.
- `src/components/sections/` — Astro sections used on the home page.
- `src/components/cp/`, `src/components/dev/`, `src/components/activity/` — dashboard islands.
- `src/components/shared/` — reusable Vue/Astro UI primitives.
- `src/utils/` — formatting, heatmap, pagination, SEO, and content-collection helpers.
- `src/data/` — generated runtime snapshots:
  - `dev-activity.json`
  - `cp-data.json`
  - `cp-problems.json`
  - `cp-fallback.json`
- `scripts/` — data crawler, validators, fallback generator, and one-off asset utilities.
- `.github/workflows/` — verification, data refresh, and Lighthouse workflows.

## Content

Content collections are configured in `src/content/config.ts`. Singleton files live in
`src/content/singletons/`:

- `profile.json`
- `contact.json`
- `layout.json`
- `social.json`

Collection entries live in their respective folders, for example `src/content/projects/`,
`src/content/experiences/`, and `src/content/achievements/`.

The Keystatic admin is available in development only; it is not part of the production bundle.

## Data pipeline

`scripts/crawl-data.cjs` writes the activity snapshots. The scheduled workflow:

1. Crawls GitHub, GitLab, TLX, Codeforces, LeetCode, and HackerRank.
2. Regenerates `src/data/cp-fallback.json`.
3. Runs data validation and a production build.
4. Commits the updated JSON only when everything passes.

`CP_FALLBACK` intentionally reads the small `cp-fallback.json` file rather than the full CP snapshot,
so client components do not pull the entire dataset into their bundles.

## SEO

`src/components/layout/BaseHead.astro` owns canonical URLs, title/description, Open Graph, Twitter
cards, `rel="me"` links, and JSON-LD. `src/utils/seo.ts` builds `Person`, `WebSite`, `ProfilePage`,
`CollectionPage`, and `BreadcrumbList` schemas.

English and Indonesian content are served from separate static routes: `/` and `/id/`. Astro renders
the Indonesian copy at build time, each page emits `hreflang` alternates for both locales, and the
language toggle navigates between the localized URLs instead of only swapping text client-side.

## Testing

- Vitest covers pure utilities in `src/**/*.test.ts`.
- Playwright covers page rendering, language/theme toggles, dashboard tabs, filters, and a
  serious/critical axe accessibility check.
- Lighthouse CI checks performance, accessibility, best practices, and SEO budgets for all public
  pages.

## Deployment

The site builds to `dist/` and is deployed as static files. Netlify reads `public/_headers` for basic
security headers and the generated sitemap is served from `/sitemap-index.xml`.
