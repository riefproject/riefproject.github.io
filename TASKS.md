### **Langkah 2: Buat Global Store (`src/stores/uiStore.js`)**

Buat file baru di `src/stores/uiStore.js`. Ini akan menjadi "otak" dari _toggle_ Anda.

```javascript
// src/stores/uiStore.js
import { atom } from "nanostores";

// State untuk Bahasa: 'en' (default) atau 'id'
export const lang = atom("en");
export function setLang(newLang) {
  lang.set(newLang);
}

// State untuk Tema: 'light' (default) atau 'dark'
export const theme = atom("light");
export function toggleTheme() {
  const newTheme = theme.get() === "light" ? "dark" : "light";
  theme.set(newTheme);
}
```

---

### **Langkah 3: Buat Komponen Toggle (Vue)**

Ini adalah tombol-tombol yang akan Anda letakkan di `Layout.astro` Anda (di luar _section_ `Achievements`).

#### **`src/components/ThemeToggle.vue`**

Komponen ini akan mengganti tema dan _juga_ menambahkan/menghapus kelas `dark` dari tag `<html>` (ini cara kerja dark mode di Tailwind).

```vue
<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
    aria-label="Toggle dark mode">
    <svg
      v-if="$theme === 'dark'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m8.364-8.364l-.707-.707M4.343 4.343l-.707-.707m16.97 0l-.707.707M4.343 19.657l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </button>
</template>

<script setup>
import { useStore } from "@nanostores/vue";
import { theme, toggleTheme } from "../stores/uiStore.js";
import { watchEffect } from "vue";

// Hubungkan ke store
const $theme = useStore(theme);

// PENTING: Perbarui <html> tag saat state berubah
watchEffect(() => {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if ($theme.value === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
});
</script>
```

#### **`src/components/LangToggle.vue`**

Komponen ini mengganti bahasa antara 'en' dan 'id'.

```vue
<template>
  <button
    @click="toggleLang"
    class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none font-medium"
    aria-label="Toggle language">
    {{ $lang === "en" ? "ID" : "EN" }}
  </button>
</template>

<script setup>
import { useStore } from "@nanostores/vue";
import { lang, setLang } from "../stores/uiStore.js";

const $lang = useStore(lang);

function toggleLang() {
  setLang($lang.value === "en" ? "id" : "en");
}
</script>
```

---

### **Langkah 4: Upgrade `src/components/Achievements.vue`**

Ini adalah inti dari permintaan Anda. Komponen ini sekarang akan:

1.  **Menggunakan** _store_ bahasa (tidak mengaturnya).
2.  Memiliki **data multi-bahasa**.
3.  Memiliki **Search Bar**.
4.  **Menyaring** data _sebelum_ mengelompokkannya ke _tab_.

<!-- end list -->

```vue
<template>
  <div class="w-full max-w-5xl mx-auto py-16 px-4">
    <h2 class="text-3xl font-bold text-center mb-4">
      {{ content.title[$lang] }}
    </h2>
    <p class="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
      {{ content.subtitle[$lang] }}
    </p>

    <div class="mb-8 w-full max-w-lg mx-auto">
      <input
        type="search"
        v-model="searchQuery"
        :placeholder="content.searchPlaceholder[$lang]"
        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div>
      <div
        class="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-3 px-6 text-lg font-medium focus:outline-none transition-all duration-300',
            activeTab === tab.id
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
          ]">
          {{ tab.name[$lang] }}
        </button>
      </div>

      <div class="transition-opacity duration-300">
        <div v-for="tab in tabs" :key="tab.id" v-show="activeTab === tab.id">
          <div
            v-if="
              groupedAchievements[tab.id] &&
              groupedAchievements[tab.id].length > 0
            "
            class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="item in groupedAchievements[tab.id]"
              :key="item.title.en"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ item.title[$lang] }}
                </h3>
                <span
                  v-if="item.highlight && item.highlight[$lang]"
                  class="ml-4 flex-shrink-0 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                  {{ item.highlight[$lang] }}
                </span>
              </div>
              <p
                class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                {{ item.issuer[$lang] }}
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {{ item.date }}
              </p>

              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline">
                {{ content.credentialLink[$lang] }}
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>

          <div
            v-else
            class="text-center text-gray-500 dark:text-gray-400 py-10">
            <p class="text-lg">{{ content.noResults[$lang] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "@nanores/vue";
import { lang } from "../stores/uiStore.js"; // Import store bahasa

// Hubungkan ke store bahasa
const $lang = useStore(lang);

// --- STATE LOKAL ---
const activeTab = ref("competitions");
const searchQuery = ref("");

// --- DATA MULTI-BAHASA ---

// Teks UI
const content = {
  title: { en: "Achievements & Credentials", id: "Pencapaian & Kredensial" },
  subtitle: {
    en: "My journey in competitions, continuous learning, and official certifications.",
    id: "Perjalanan saya di kompetisi, pembelajaran, dan sertifikasi resmi.",
  },
  searchPlaceholder: {
    en: "Search achievements by title, issuer, or highlight...",
    id: "Cari pencapaian berdasarkan judul, penyelenggara, atau sorotan...",
  },
  credentialLink: { en: "View Credential", id: "Lihat Kredensial" },
  noResults: {
    en: "No achievements found matching your search.",
    id: "Pencapaian tidak ditemukan.",
  },
};

// Data Tab
const tabs = [
  { id: "competitions", name: { en: "Competitions", id: "Kompetisi" } },
  { id: "certifications", name: { en: "Certifications", id: "Sertifikasi" } },
  {
    id: "bootcamps",
    name: { en: "Bootcamps & Courses", id: "Bootcamp & Kursus" },
  },
];

// Data Pencapaian (Sekarang Multi-bahasa)
const allAchievements = [
  // == DATA KOMPETISI ==
  {
    type: "competitions",
    title: {
      en: "ICPC Asia Jakarta Regional Contest 2025",
      id: "Kontes Regional ICPC Asia Jakarta 2025",
    },
    issuer: {
      en: "ICPC Foundation / Binus University",
      id: "ICPC Foundation / Binus University",
    },
    date: "November 2025",
    highlight: { en: "Regional Contestant", id: "Kontestan Regional" },
    link: "https://icpc.global/",
  },
  {
    type: "competitions",
    title: {
      en: "Indonesia National Contest (INC) 2025",
      id: "Kontes Nasional Indonesia (INC) 2025",
    },
    issuer: { en: "ICPC Indonesia", id: "ICPC Indonesia" },
    date: "Oktober 2025",
    highlight: { en: "Qualified for Regional", id: "Lolos ke Regional" },
    link: "#",
  },
  {
    type: "competitions",
    title: {
      en: "Olimpiade Sains Nasional (OSN) - Informatics",
      id: "Olimpiade Sains Nasional (OSN) - Informatika",
    },
    issuer: {
      en: "Ministry of Education and Culture",
      id: "Kementerian Pendidikan dan Kebudayaan",
    },
    date: "2021 (Contoh)",
    highlight: { en: "Finalist", id: "Finalis" },
    link: "#",
  },

  // == DATA SERTIFIKASI ==
  {
    type: "certifications",
    title: {
      en: "Learn Basic C++ Programming",
      id: "Belajar Dasar Pemrograman C++",
    },
    issuer: { en: "Dicoding Indonesia", id: "Dicoding Indonesia" },
    date: "Juni 2024",
    highlight: { en: "Official", id: "Resmi" },
    link: "#",
  },
  {
    type: "certifications",
    title: { en: "Database Design & SQL", id: "Desain Database & SQL" },
    issuer: { en: "Udemy", id: "Udemy" },
    date: "Januari 2025",
    highlight: { en: "Certification", id: "Sertifikasi" },
    link: "#",
  },

  // == DATA BOOTCAMP ==
  {
    type: "bootcamps",
    title: {
      en: "Full-Stack Web Developer Bootcamp",
      id: "Bootcamp Web Developer Full-Stack",
    },
    issuer: { en: "Internal Campus Training", id: "Pelatihan Internal Kampus" },
    date: "Maret 2025",
    highlight: { en: "Completed", id: "Selesai" },
    link: "#",
  },
];

// --- LOGIKA FILTER & GRUP ---

// 1. Logika Filter (Berdasarkan Search Bar)
const filteredAchievements = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) {
    return allAchievements; // Kembalikan semua jika search kosong
  }

  return allAchievements.filter((item) => {
    // Cek di kedua bahasa
    const titleEn = item.title.en.toLowerCase();
    const titleId = item.title.id.toLowerCase();
    const issuerEn = item.issuer.en.toLowerCase();
    const issuerId = item.issuer.id.toLowerCase();
    const highlightEn = item.highlight?.en?.toLowerCase() || "";
    const highlightId = item.highlight?.id?.toLowerCase() || "";

    return (
      titleEn.includes(query) ||
      titleId.includes(query) ||
      issuerEn.includes(query) ||
      issuerId.includes(query) ||
      highlightEn.includes(query) ||
      highlightId.includes(query)
    );
  });
});

// 2. Logika Grup (Berdasarkan hasil filter)
const groupedAchievements = computed(() => {
  // Gunakan `filteredAchievements` BUKAN `allAchievements`
  return filteredAchievements.value.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});
});
</script>
```

---

### **Langkah 5: Integrasi di File `.astro` Anda**

Sekarang, di file layout utama Anda (misalnya `src/layouts/Layout.astro`) atau di `src/pages/index.astro`, Anda perlu menempatkan _toggle_ global dan komponen _section_.

```astro
---
import Layout from '../layouts/Layout.astro';
// ... import komponen .astro lainnya ...

// Impor komponen VUE sebagai Astro Island
import Achievements from '../components/Achievements.vue';
import ThemeToggle from '../components/ThemeToggle.vue';
import LangToggle from '../components/LangToggle.vue';
---

<Layout title="Your Name - Portfolio">

  <div class="fixed top-4 right-4 z-50 flex gap-2">
    <ThemeToggle client:load /> <LangToggle client:load /> </div>


  <section id="hero">...</section>
  <section id="about">...</section>
  <section id="skills">...</section>
  <section id="projects">...</section>

  <section id="achievements">
    <Achievements client:visible />
  </section>

  <section id="education">...</section>
  <section id="contact">...</section>

</Layout>
```

#### **PENTING: Setup Dark Mode di `Layout.astro`**

Untuk menghindari layar putih berkedip (FOUC) saat _dark mode_ aktif, tambahkan skrip ini di dalam `<head>` pada file `src/layouts/Layout.astro` Anda.

```astro
<html lang="en">
<head>
    <script is:inline>
      const theme = (() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme');
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      })();

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Simpan preferensi awal di store Nanostores (jika perlu sinkronisasi)
      // Ini akan ditangani oleh komponen ThemeToggle.vue saat di-mount
    </script>
</head>
<body>
  </body>
</html>
```
