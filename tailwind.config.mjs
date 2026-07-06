/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        "background-soft": "var(--bg-soft)",
        surface: "var(--bg-elevated)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ['"JetBrains Mono"', '"Inter"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: "0 20px 70px rgba(15, 23, 42, 0.45)",
      },
    },
  },
  plugins: [],
};
