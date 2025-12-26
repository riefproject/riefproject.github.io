# Portfolio Astro x Vue

Personal portfolio siap pakai memakai Astro 5 + integrasi Vue 3. Konten di-render statis oleh
Astro, sementara gallery proyek memakai komponen Vue yang bisa difilter dan dicari secara client
side.

## Pengembangan

```sh
npm install
npm run dev
npm run build
```

## Struktur utama

- `src/data/profile.ts` — satu sumber data untuk hero, pengalaman, proyek, kontak, dsb.
- `src/pages/index.astro` — merakit seluruh section (Hero, About, Experience, Projects, Contact).
- `src/components/sections/*` — blok konten Astro (Hero, About, Skills, Projects, Achievements, Education, Contact).
- `src/components/projects/ProjectGallery.vue` — komponen Vue untuk filter + pencarian proyek.
- `src/components/Achievements.vue` — Astro Island Vue untuk tab pencapaian & kredensial.
- `src/components/ThemeToggle.vue` & `src/components/LangToggle.vue` — island untuk dark mode + language switch.
- `src/stores/uiStore.js` — state global berbasis Nanostores untuk tema/bahasa.
- `src/styles/global.css` — token warna, layout, dan utilitas global.
- `tailwind.config.mjs` & `postcss.config.cjs` — konfigurasi Tailwind + PostCSS.

## Fitur utama

- Sidebar modern yang lengket di desktop dan berubah jadi menu hamburger di mobile (+ overlay).
- Smooth scrolling & highlight otomatis pada link aktif dengan Intersection Observer.
- Section lengkap: Hero, About, Skills, Projects (Vue gallery), Achievements (Vue tabs), Education/Experience, Contact.
- Placeholder media proyek sehingga kartu tetap konsisten walau belum ada gambar final.
- Dark / light mode toggle dengan state tersinkron ke localStorage + dukungan CSS variable.
- Toggle bahasa (EN/ID) yang langsung mempengaruhi teks di Achievements & komponen yang terhubung ke store.
- Tailwind CSS + token global untuk adaptasi gaya cepat.

## Kustomisasi cepat

1. **Ubah profil & konten:** perbarui objek di `src/data/profile.ts`.
2. **Form kontak:** ganti `action` Formspree pada `ContactSection.astro` bila memakai layanan lain.
3. **Gaya visual & utility:** pakai kelas Tailwind langsung di komponen atau ubah layer kustom di
   `src/styles/global.css` (termasuk palet light/dark yang dikontrol lewat class `dark`).
4. **Terjemahan konten:** update string EN/ID di `src/data/profile.ts` (contoh pada objek `achievements`)
   agar toggle bahasa menampilkan teks yang sesuai.

Setelah modifikasi, jalankan `npm run build` untuk memastikan tidak ada error sebelum deploy.

## Tailwind CSS

- Utility class siap pakai karena integrasi `@astrojs/tailwind`.
- Direktif `@tailwind base/components/utilities` dimuat di `src/styles/global.css`, jadi kamu bebas
  menambahkan komponen kustom pada file yang sama (gunakan `@layer` bila perlu).
- Atur token, font, atau plugin lewat `tailwind.config.mjs`. Perubahan akan otomatis diproses saat
  menjalankan `npm run dev` atau `npm run build`.
