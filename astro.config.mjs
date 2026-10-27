// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import keystatic from '@keystatic/astro'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://riefproject.my.id',
  integrations: [
    vue(),
    sitemap(),
    react(),
    process.env.NODE_ENV === 'production' ? null : keystatic(),
    {
      name: 'dev-tools',
      hooks: {
        'astro:config:setup': (
          /** @type {{ injectRoute: (route: { pattern: string, entrypoint: string }) => void, command: string }} */
          { injectRoute, command }
        ) => {
          if (command === 'dev') {
            injectRoute({
              pattern: '/cv-builder',
              entrypoint: './src/dev-tools/pages/cv-builder.astro',
            })
            injectRoute({
              pattern: '/cv-composer',
              entrypoint: './src/dev-tools/pages/cv-composer.astro',
            })
            injectRoute({
              pattern: '/api/save-cv-source',
              entrypoint: './src/dev-tools/pages/api/save-cv-source.ts',
            })
            injectRoute({
              pattern: '/api/upload-cv',
              entrypoint: './src/dev-tools/pages/api/upload-cv.ts',
            })
          }
        },
      },
    },
  ].filter(Boolean),
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [
      tailwindcss(),
      {
        // Astro 7 + Vite 8 workaround: the React Fast Refresh transform leaks into
        // `.vue` SFCs during SSR, injecting `$RefreshSig$` and breaking `astro dev`.
        // React is only used by the dev-only Keystatic admin here, so turning the
        // refresh transform off is safe. Remove once @astrojs/react scopes it.
        name: 'disable-react-refresh',
        enforce: 'post',
        config: () => ({ oxc: { jsx: { refresh: false } } }),
      },
    ],
    server: {
      watch: {
        ignored: ['**/src/data/cv/**'],
      },
    },
  },
})
