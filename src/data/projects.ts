import type { Project } from "../types/profile.types";
import { t } from "../types/profile.types";

export const projects: Project[] = [
  {
    title: t("Bioskopku CLI Ticketing", "Bioskopku CLI Ticketing"),
    img: "/img/projects/BioskopKu.png",
    description: t(
      "CLI cinema ticketing in pure C with real-time validation and role-based controls, optimized for terminal workflows.",
      "Sistem tiket bioskop CLI berbasis C murni dengan validasi realtime dan kontrol berbasis peran, dioptimalkan untuk alur terminal."
    ),
    impact: t(
      "Cut seat-assignment errors for classmates by adding validation and CSV reporting.",
      "Mengurangi salah assign kursi di tugas kuliah lewat validasi dan laporan CSV."
    ),
    year: 2024,
    category: t("CLI Tool", "CLI Tool"),
    categoryKey: "cli",
    stack: ["C", "Modular Architecture", "CSV Storage"],
    highlights: [
      t(
        "Modular, responsive seat management with clear structure.",
        "Manajemen kursi modular dan mudah dibaca."
      ),
      t(
        "Multi-role controls (admin, manager, staff, customer).",
        "Kontrol multi-role (admin, manager, staff, customer)."
      ),
      t(
        "Auto scheduling, validation, and CSV reports.",
        "Penjadwalan, validasi, dan laporan CSV otomatis."
      ),
    ],
    links: [
      {
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/21IF1001-DDPFinalProject-Bioskopku",
      },
    ],
  },
  {
    title: t("Block Shooter — Raylib Game", "Block Shooter — Raylib Game"),
    img: "/img/projects/BlockShooter.png",
    description: t(
      "Fast-paced arcade shooter in C + Raylib with power-ups and persistent high scores.",
      "Arcade shooter cepat dengan C + Raylib, lengkap dengan power-up dan high score persisten."
    ),
    impact: t(
      "Kept gameplay smooth on lab PCs after tuning physics and render loop.",
      "Gameplay tetap mulus di PC lab setelah tuning fisika dan render loop."
    ),
    year: 2024,
    category: t("Game Project", "Proyek Gim"),
    categoryKey: "game",
    stack: ["C", "Raylib", "Game Loop"],
    highlights: [
      t(
        "Lightweight physics for responsive shooting.",
        "Fisik ringan untuk tembakan yang responsif."
      ),
      t(
        "11 difficulty tiers with steady pacing.",
        "11 level kesulitan dengan pacing bertahap."
      ),
      t(
        "Local high-score board to track progress.",
        "Papan high score lokal untuk memantau progres."
      ),
    ],
    links: [
      {
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/21IF009-Project2-A5",
      },
    ],
  },
  {
    title: t("Riefmathics Statistics App", "Riefmathics Statistics App"),
    description: t(
      "JavaScript web app that automates grouped and single data calculations with a tidy OOP structure.",
      "Aplikasi web JavaScript yang mengotomasi perhitungan data berkelompok dan tunggal dengan struktur OOP rapi."
    ),
    impact: t(
      "Replaced manual spreadsheet steps for peers needing quick stats outputs.",
      "Menggantikan langkah manual spreadsheet untuk teman yang butuh hasil statistik cepat."
    ),
    year: 2023,
    category: t("Web Application", "Aplikasi Web"),
    categoryKey: "web-app",
    stack: ["JavaScript", "HTML/CSS", "OOP"],
    highlights: [
      t(
        "Handles grouped and single data smoothly.",
        "Mengelola data berkelompok maupun tunggal dengan mulus."
      ),
      t(
        "Pure JS—no external libraries required.",
        "Murni JavaScript tanpa library eksternal."
      ),
      t(
        "Fast, accurate, and easy to operate.",
        "Cepat, akurat, dan mudah digunakan."
      ),
    ],
    links: [
      {
        label: t("Open app", "Buka aplikasi"),
        url: "https://riefproject.github.io/distributionTable-prerelease/",
      },
    ],
  },
  {
    title: t("Xcreeptor Encryption Suite", "Xcreeptor Encryption Suite"),
    description: t(
      "Qt desktop app layering substitution ciphers, AES-256, and hashed storage for safer secrets.",
      "Aplikasi desktop Qt yang menggabungkan cipher substitusi, AES-256, dan penyimpanan ter-hash untuk keamanan data."
    ),
    impact: t(
      "Gave classmates a friendlier way to try layered encryption workflows.",
      "Memberi teman kuliah cara lebih ramah untuk mencoba alur enkripsi berlapis."
    ),
    year: 2023,
    category: t("Desktop App", "Aplikasi Desktop"),
    categoryKey: "desktop-app",
    stack: ["C++", "Qt", "AES-256"],
    highlights: [
      t(
        "Clean UI so encryption feels approachable.",
        "UI bersih agar enkripsi terasa mudah."
      ),
      t(
        "Multi-layer security: substitution + AES + hashing.",
        "Keamanan multilapis: substitusi + AES + hashing."
      ),
      t(
        "Cross-platform build (Windows, Linux, macOS).",
        "Build lintas platform (Windows, Linux, macOS)."
      ),
    ],
    links: [
      {
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/xcreeptor",
      },
    ],
  },
  {
    title: t(
      "Competitive Programming Repository",
      "Competitive Programming Repository"
    ),
    description: t(
      "A living repository of solutions, notes, and templates from various judges.",
      "Repo hidup berisi solusi, catatan, dan template dari berbagai judge."
    ),
    impact: t(
      "Used as a reference for mentees and club practice sessions.",
      "Jadi referensi untuk mentee dan sesi latihan klub."
    ),
    year: 2021,
    category: t("Community & Learning", "Komunitas & Pembelajaran"),
    categoryKey: "community",
    stack: ["C++", "Python", "Problem Notes"],
    highlights: [
      t(
        "Covers TLX, Codeforces, LeetCode, and more.",
        "Mencakup TLX, Codeforces, LeetCode, dan lainnya."
      ),
      t(
        "Clean, well-commented implementations you can reuse.",
        "Implementasi bersih dengan komentar yang mudah digunakan ulang."
      ),
      t(
        "Includes micro-challenges for mentees.",
        "Memuat micro-challenge untuk mentee."
      ),
    ],
    links: [
      {
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/Competitive-Programming",
      },
    ],
  },
];
