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
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/Koperasi-Syariah",
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
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/pomodone",
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
  {
    title: t("AlpenliCloud File Manager", "AlpenliCloud File Manager"),
    img: "/img/projects/Alpenlicloud.png",
    description: t(
      "Cross-platform GUI file manager inspired by Windows Explorer, built in C with raylib/raygui and 4 core ADTs (tree, stack, queue, linked list).",
      "File manager GUI lintas OS terinspirasi Windows Explorer, dibangun dengan C, raylib/raygui, dan 4 ADT utama (tree, stack, queue, linked list)."
    ),
    impact: t(
      "Shipped a desktop file manager for 3 OSes with 10+ keyboard shortcuts, undo/redo, trash recovery, and bulk-operation progress feedback.",
      "Merilis file manager desktop untuk 3 OS dengan 10+ shortcut keyboard, undo/redo, trash recovery, dan progress feedback untuk operasi massal."
    ),
    year: 2025,
    category: t("Desktop Application", "Aplikasi Desktop"),
    categoryKey: "desktop-app",
    featured: true,
    stack: ["C", "raylib", "raygui", "Data Structures", "Platform APIs"],
    highlights: [
      t(
        "Non-binary tree powers directory hierarchy and sidebar navigation.",
        "Non-binary tree menggerakkan hierarki direktori dan navigasi sidebar."
      ),
      t(
        "Stack-based undo/redo across create, delete, rename, and paste actions.",
        "Undo/redo berbasis stack untuk create, delete, rename, dan paste."
      ),
      t(
        "Queue-based clipboard workflow with progress UI for 10+ items.",
        "Alur clipboard berbasis queue dengan UI progress untuk 10+ item."
      ),
      t(
        "Custom window chrome with resizable layout and modern toolbar.",
        "Window chrome kustom dengan layout resizable dan toolbar modern."
      ),
      t(
        "Cross-platform build flow with bundled raylib and system fallback.",
        "Build lintas OS dengan raylib bundling dan fallback ke sistem."
      ),
    ],
    links: [
      {
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/AlpenliCloud",
      },
    ],
  },
  {
    title: t(
      "reeshape – Shape Playground (Pattern Block Activity)",
      "reeshape – Shape Playground (Pattern Block Activity)"
    ),
    img: "/img/projects/reeshape.png",
    description: t(
      "Interactive 2D pattern-block puzzle built in Godot 4 (C#) with manual 2D transforms, snap-based validation, and custom stage templates.",
      "Puzzle pattern-block 2D interaktif di Godot 4 (C#) dengan transformasi 2D manual, validasi berbasis snapping, dan template stage custom."
    ),
    impact: t(
      "Shipped a complete gameplay loop with 3 curated 720p challenges, persistent progress + best-time tracking, and a JSON-based Template Builder so users can create and replay patterns.",
      "Menghadirkan gameplay lengkap dengan 3 challenge 720p, penyimpanan progres + best time persisten, serta Template Builder berbasis JSON agar pengguna bisa membuat dan memainkan ulang pola."
    ),
    year: 2025,
    category: t("Game Project", "Proyek Game"),
    categoryKey: "game",
    featured: true,
    stack: ["Godot 4", "C#", ".NET", "2D Graphics", "JSON"],
    highlights: [
      t(
        "Manual 2D transform pipeline plus training-focused mechanics (snapping, hit testing, geometric composition).",
        "Pipeline transform 2D manual plus latihan grafika (snapping, hit test, komposisi geometri)."
      ),
      t(
        "Snap-to-slot validation that locks shapes, triggers 100% completion, and stores persistent progress + best time.",
        "Validasi snap-to-slot yang mengunci shape, memicu completion 100%, serta menyimpan progres dan best time."
      ),
      t(
        "Full input system: drag-and-drop, Q/E rotation, WASD/arrow micro-move, right-click reset.",
        "Sistem input lengkap: drag-and-drop, rotasi Q/E, translasi presisi WASD/panah, klik kanan reset."
      ),
      t(
        "Modular stage/template system (TemplateShapeStage, TemplateLoader) with JSON receipts.",
        "Sistem stage/template modular (TemplateShapeStage, TemplateLoader) dengan JSON receipt."
      ),
      t(
        "Template Builder workflow (build -> export JSON -> replay in My Patterns) optimized for desktop Windows/macOS/Linux at 1280x720.",
        "Workflow Template Builder (build -> export JSON -> replay di My Patterns) optimal untuk desktop Windows/macOS/Linux di 1280x720."
      ),
    ],
    links: [
      {
        label: t("View repository", "Lihat repositori"),
        url: "https://github.com/riefproject/reeshape",
      },
    ],
  },
];
