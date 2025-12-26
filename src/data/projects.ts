import type { Project } from "../types/profile.types";
import { t } from "../types/profile.types";

export const projects: Project[] = [
  {
    title: t(
      "Integrated Sharia Cooperative System",
      "Sistem Koperasi Syariah Terintegrasi"
    ),
    img: "/img/projects/KopSy.png",
    description: t(
      "Full-stack integrated sharia cooperative application with complex domain logic handling savings, murabahah-based installments, POS cash system, and inventory management.",
      "Aplikasi koperasi syariah terintegrasi fullstack dengan logika domain kompleks yang menangani simpanan, cicilan berbasis murabahah, sistem POS cash, dan manajemen stok."
    ),
    impact: t(
      "Implemented feature-based end-to-end development approach ensuring consistent data flow across financial and inventory modules.",
      "Mengimplementasikan pendekatan pengembangan end-to-end berbasis fitur yang memastikan aliran data konsisten lintas modul keuangan dan inventori."
    ),
    year: 2025,
    category: t("Enterprise Web Application", "Aplikasi Web Enterprise"),
    categoryKey: "enterprise",
    featured: true,
    stack: ["Laravel", "Vue.js", "PHP", "JavaScript", "PostgreSQL"],
    highlights: [
      t(
        "Complex domain modeling for sharia-compliant financial operations.",
        "Pemodelan domain kompleks untuk operasi keuangan sesuai syariah."
      ),
      t(
        "Multi-role access control with centralized authorization system.",
        "Kontrol akses multi-role dengan sistem otorisasi terpusat."
      ),
      t(
        "Synchronized data structure across financial and inventory modules.",
        "Struktur data tersinkronisasi lintas modul keuangan dan inventori."
      ),
      t(
        "Feature-based fullstack development for maintainable codebase.",
        "Pengembangan fullstack berbasis fitur untuk kode yang maintainable."
      ),
    ],
    links: [
      {
        label: t("View details", "Lihat detail"),
        url: "#",
      },
    ],
  },
  {
    title: t(
      "Productivity Application (Java Desktop)",
      "Productivity Application (Java Desktop)"
    ),
    img: "/img/projects/Pomodone.png",
    description: t(
      "Cross-platform desktop productivity application with layered MVC architecture, implementing multiple design patterns for modularity and scalability.",
      "Aplikasi desktop produktivitas cross-platform dengan arsitektur layered MVC, mengimplementasikan berbagai design pattern untuk modularitas dan skalabilitas."
    ),
    impact: t(
      "Delivered cross-platform installable application with comprehensive testing and database fallback system ensuring data persistence across operating systems.",
      "Menghasilkan aplikasi installable cross-platform dengan testing komprehensif dan sistem fallback database yang memastikan persistensi data lintas sistem operasi."
    ),
    year: 2025,
    category: t("Desktop Application", "Aplikasi Desktop"),
    categoryKey: "desktop-app",
    featured: true,
    stack: ["Java", "JavaFX", "PostgreSQL", "SQLite", "Design Patterns"],
    highlights: [
      t(
        "Layered MVC architecture with strict separation of concerns.",
        "Arsitektur layered MVC dengan separation of concerns yang ketat."
      ),
      t(
        "Multiple design patterns for maintainable and scalable codebase.",
        "Berbagai design pattern untuk kode yang maintainable dan scalable."
      ),
      t(
        "PostgreSQL with SQLite fallback stored in cross-platform user directory.",
        "PostgreSQL dengan fallback SQLite tersimpan di direktori pengguna cross-platform."
      ),
      t(
        "Comprehensive unit testing and structured input-output validation.",
        "Unit testing komprehensif dan validasi input-output terstruktur."
      ),
      t(
        "Focus on UI/UX readability and user workflow optimization.",
        "Fokus pada keterbacaan UI/UX dan optimasi alur pengguna."
      ),
    ],
    links: [
      {
        label: t("View details", "Lihat detail"),
        url: "#",
      },
    ],
  },
  {
    title: t("Block Shooter Game", "Block Shooter Game"),
    img: "/img/projects/BlockShooter.png",
    description: t(
      "2D arcade shooter game built with C and Raylib, implementing low-level data structures, game loop mechanics, and persistent game state management.",
      "Game arcade shooter 2D yang dibangun dengan C dan Raylib, mengimplementasikan struktur data tingkat rendah, mekanika game loop, dan manajemen state permainan persisten."
    ),
    impact: t(
      "Led team development focusing on object behavior design, game loop optimization, and user experience management throughout the development cycle.",
      "Memimpin pengembangan tim dengan fokus pada desain perilaku objek, optimasi game loop, dan manajemen pengalaman pengguna sepanjang siklus pengembangan."
    ),
    year: 2025,
    category: t("Game Project", "Proyek Game"),
    categoryKey: "game",
    featured: true,
    stack: ["C", "Raylib", "Low-Level Programming"],
    highlights: [
      t(
        "Manual implementation of data structures at low level.",
        "Implementasi manual struktur data di tingkat rendah."
      ),
      t(
        "Optimized game loop for responsive gameplay and object behavior.",
        "Game loop teroptimasi untuk gameplay responsif dan perilaku objek."
      ),
      t(
        "Persistent game state and local high-score tracking system.",
        "State permainan persisten dan sistem tracking high-score lokal."
      ),
      t(
        "Team collaboration and leadership in game development workflow.",
        "Kolaborasi tim dan kepemimpinan dalam alur pengembangan game."
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
    title: t("Bioskopku CLI Ticketing", "Bioskopku CLI Ticketing"),
    img: "/img/projects/Bioskopku.png",
    description: t(
      "CLI cinema ticketing system in pure C with real-time validation and role-based access controls, optimized for terminal workflows.",
      "Sistem tiket bioskop CLI berbasis C murni dengan validasi realtime dan kontrol akses berbasis peran, dioptimalkan untuk alur terminal."
    ),
    impact: t(
      "Reduced seat-assignment errors in class projects through validation system and structured CSV reporting.",
      "Mengurangi kesalahan assign kursi di proyek kuliah melalui sistem validasi dan pelaporan CSV terstruktur."
    ),
    year: 2024,
    category: t("CLI Tool", "CLI Tool"),
    categoryKey: "cli",
    stack: ["C", "Modular Architecture", "CSV Storage"],
    highlights: [
      t(
        "Modular seat management with clean architecture and clear structure.",
        "Manajemen kursi modular dengan arsitektur bersih dan struktur jelas."
      ),
      t(
        "Multi-role access controls (admin, manager, staff, customer).",
        "Kontrol akses multi-role (admin, manager, staff, customer)."
      ),
      t(
        "Automated scheduling, validation, and structured CSV reports.",
        "Penjadwalan otomatis, validasi, dan laporan CSV terstruktur."
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
