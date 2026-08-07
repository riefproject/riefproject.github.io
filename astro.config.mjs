// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://riefproject.my.id",
  integrations: [
    vue(),
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap(),
    react(),
    process.env.NODE_ENV === 'production' ? null : keystatic(),
    {
      name: 'dev-tools',
      hooks: {
        'astro:config:setup': ({ injectRoute, command }) => {
          if (command === 'dev') {
            injectRoute({
              pattern: '/cv-builder',
              entrypoint: './src/dev-tools/pages/cv-builder.astro'
            });
            injectRoute({
              pattern: '/cv-composer',
              entrypoint: './src/dev-tools/pages/cv-composer.astro'
            });
            injectRoute({
              pattern: '/api/save-cv-source',
              entrypoint: './src/dev-tools/pages/api/save-cv-source.ts'
            });
            injectRoute({
              pattern: '/api/upload-cv',
              entrypoint: './src/dev-tools/pages/api/upload-cv.ts'
            });
          }
        }
      }
    }
  ].filter(Boolean),
  output: "static",
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/src/data/cv/**']
      }
    }
  }
});
