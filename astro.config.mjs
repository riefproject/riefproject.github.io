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
  ].filter(Boolean),
  output: "static",
  vite: {
    // Watcher ignore removed to allow content collection cache invalidation
  }
});
