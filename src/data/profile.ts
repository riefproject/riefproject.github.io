import type {
  Profile,
  Highlight,
  Stat,
  CPProfile,
  FocusArea,
  SkillCategory,
} from "../types/profile.types";
import { t } from "../types/profile.types";

export const profile: Profile = {
  name: "Arief F-sa Wijaya",
  role: t("Informatics Engineering Student", "Mahasiswa D3 Teknik Informatika"),
  tagline: t(
    "Software engineer with competitive programming foundation—delivering structured, maintainable solutions.",
    "Software engineer dengan basis competitive programming—menghasilkan solusi terstruktur dan maintainable."
  ),
  location: t("Bandung, West Java", "Bandung, Jawa Barat"),
  availability: t(
    "Available for internships, collaborations, and software development projects.",
    "Tersedia untuk internship, kolaborasi, dan proyek pengembangan perangkat lunak."
  ),
  intro: t(
    "4th semester informatics student with strong foundation in software architecture and systematic problem-solving. Experienced in designing scalable solutions and managing complexity through structured approaches.",
    "Mahasiswa informatika semester 4 dengan fondasi kuat dalam arsitektur perangkat lunak dan pemecahan masalah sistematis. Berpengalaman merancang solusi scalable dan mengelola kompleksitas melalui pendekatan terstruktur."
  ),
  bio: t(
    "Currently studying D3 Informatics Engineering at Politeknik Negeri Bandung with focus on software architecture, clean code practices, and systematic problem analysis. Background in competitive programming shapes analytical thinking and efficiency-oriented approach in building modular, readable, and maintainable software systems.",
    "Saat ini menempuh D3 Teknik Informatika di Politeknik Negeri Bandung dengan fokus pada arsitektur perangkat lunak, praktik clean code, dan analisis masalah sistematis. Latar belakang competitive programming membentuk pola pikir analitis dan pendekatan berorientasi efisiensi dalam membangun sistem perangkat lunak yang modular, mudah dibaca, dan maintainable."
  ),
  focusStack: t(
    "C/C++ · Competitive Programming · Backend & Automation",
    "C/C++ · Competitive Programming · Backend & Automation"
  ),
  resumeUrl: "https://example.com/your-cv.pdf",
};

export const heroHighlights: Highlight[] = [
  {
    label: t("Software Architecture", "Arsitektur Perangkat Lunak"),
    detail: t(
      "Design patterns, layered MVC, and modular system architecture",
      "Design patterns, layered MVC, dan arsitektur sistem modular"
    ),
  },
  {
    label: t("Competitive Programming", "Competitive Programming"),
    detail: t(
      "ICPC Regional Asia participant, 300+ problems solved",
      "Peserta ICPC Regional Asia, 300+ soal terselesaikan"
    ),
  },
  {
    label: t("Development Focus", "Fokus Pengembangan"),
    detail: t(
      "Clean code, systematic problem analysis, and scalable solutions",
      "Clean code, analisis masalah sistematis, dan solusi scalable"
    ),
  },
];

export const stats: Stat[] = [
  {
    label: t("Contests tackled", "Kompetisi diikuti"),
    value: "10+",
    helper: t(
      "NOI/OSN plus internal scrims and showcases",
      "NOI/OSN plus sparing internal dan showcase"
    ),
  },
  {
    label: t("Problems solved", "Soal terselesaikan"),
    value: "300+",
    helper: t(
      "TLX, LeetCode, Codeforces, and others",
      "TLX, LeetCode, Codeforces, dan lainnya"
    ),
  },
  {
    label: t("Languages used", "Bahasa yang dikuasai"),
    value: "8+",
    helper: t(
      "C, C++, Python, JavaScript, Java, plus supporting scripts",
      "C, C++, Python, JavaScript, Java, plus skrip pendukung"
    ),
  },
  {
    label: t("Projects delivered", "Proyek selesai"),
    value: "10+",
    helper: t(
      "School, club, and personal builds",
      "Proyek sekolah, komunitas, dan proyek pribadi"
    ),
  },
];

export const cpProfiles: CPProfile[] = [
  {
    platform: "Codeforces",
    handle: "your-handle",
    url: "https://codeforces.com/profile/your-handle",
    logo: "/img/codeforces.webp",
    note: t(
      "Regular contests and upsolving logs.",
      "Kontes rutin dan catatan upsolve."
    ),
  },
  {
    platform: "TLX",
    handle: "your-handle",
    url: "https://tlx.toki.id/users/your-handle",
    logo: "/img/tlx.png",
    note: t(
      "Practice sets and local contests.",
      "Latihan set dan kontes lokal."
    ),
  },
  {
    platform: "LeetCode",
    handle: "your-handle",
    url: "https://leetcode.com/your-handle",
    logo: "/img/leetcode.png",
    note: t(
      "Daily drills for data structures and algorithms.",
      "Latihan harian struktur data dan algoritma."
    ),
  },
  {
    platform: "HackerRank",
    handle: "your-handle",
    url: "https://hackerrank.com/your-handle",
    logo: "/img/HackerRank.png",
    note: t(
      "Weekend rounds and speed benchmarks.",
      "Round akhir pekan dan tolok ukur kecepatan."
    ),
  },
];

export const focusAreas: FocusArea[] = [
  {
    title: t(
      "Competitive programming mindset",
      "Competitive programming mindset"
    ),
    description: t(
      "Apply olympiad-style thinking to daily engineering: test constraints, budget time, and choose clean patterns quickly.",
      "Pakai pola pikir olimpiade ke engineering harian: uji constraint, atur time budget, dan pilih pola yang rapi dengan cepat."
    ),
    items: [
      t("Contest-grade algorithm reviews", "Review algoritma setingkat kontes"),
      t(
        "Structured drills and training modules",
        "Drill terstruktur dan modul latihan"
      ),
      t(
        "Data-driven retrospectives and scorecards",
        "Retrospektif berbasis data dan scorecard"
      ),
    ],
  },
  {
    title: t("Backend & tooling", "Backend & tooling"),
    description: t(
      "Build lightweight C/C++ systems with a focus on automation, diagnostics, and developer comfort.",
      "Membangun sistem C/C++ yang ringan dengan fokus otomasi, diagnostik, dan kenyamanan developer."
    ),
    items: [
      t(
        "CLI and desktop utilities with clear flows",
        "CLI dan desktop utility dengan alur jelas"
      ),
      t(
        "Raylib / Qt playgrounds for UI and graphics",
        "Playground Raylib / Qt untuk UI dan grafis"
      ),
      t(
        "Structured logging and reporting teams can act on",
        "Logging dan reporting terstruktur yang mudah ditindak"
      ),
    ],
  },
  {
    title: t("Mentorship & community", "Mentorship & community"),
    description: t(
      "Grow together via Brainware of SMANSA—mentoring juniors, sharing playbooks, and keeping resources open.",
      "Berkembang bersama lewat Brainware of SMANSA—mentoring junior, berbagi playbook, dan menjaga resource tetap terbuka."
    ),
    items: [
      t("Club leadership & workshops", "Kepemimpinan klub & workshop"),
      t("Mentoring for NOI hopefuls", "Mentoring untuk calon NOI"),
      t("Open resources & documentation", "Resource & dokumentasi terbuka"),
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: t("Software Engineering", "Rekayasa Perangkat Lunak"),
    items: [
      t(
        "Software architecture & design patterns",
        "Arsitektur perangkat lunak & design patterns"
      ),
      t(
        "Full-stack web development (Laravel, Vue.js)",
        "Pengembangan web full-stack (Laravel, Vue.js)"
      ),
      t(
        "Database design & advanced SQL",
        "Desain database & SQL tingkat lanjut"
      ),
      t(
        "Clean code practices & maintainable systems",
        "Praktik clean code & sistem maintainable"
      ),
      t(
        "MVC architecture & layered design",
        "Arsitektur MVC & desain berlapis"
      ),
    ],
  },
  {
    title: t("Programming Languages", "Bahasa Pemrograman"),
    items: [
      t(
        "C/C++ (Competitive Programming & Systems)",
        "C/C++ (Competitive Programming & Sistem)"
      ),
      t("Java (Desktop Applications & OOP)", "Java (Aplikasi Desktop & OOP)"),
      t("PHP (Laravel Framework)", "PHP (Framework Laravel)"),
      t(
        "JavaScript/TypeScript (Vue.js, Node.js)",
        "JavaScript/TypeScript (Vue.js, Node.js)"
      ),
      t("Python (Automation & Scripting)", "Python (Automation & Scripting)"),
    ],
  },
  {
    title: t("Algorithms & Problem Solving", "Algoritma & Problem Solving"),
    items: [
      t(
        "Advanced data structures & algorithms",
        "Struktur data & algoritma tingkat lanjut"
      ),
      t(
        "Dynamic programming & graph algorithms",
        "Dynamic programming & algoritma graf"
      ),
      t(
        "Complexity analysis & optimization",
        "Analisis kompleksitas & optimasi"
      ),
      t(
        "Competitive programming (ICPC, OSN)",
        "Competitive programming (ICPC, OSN)"
      ),
    ],
  },
  {
    title: t("Tools & Technologies", "Tools & Teknologi"),
    items: [
      t("Git & GitHub (Version Control)", "Git & GitHub (Version Control)"),
      t("MySQL, PostgreSQL, SQLite", "MySQL, PostgreSQL, SQLite"),
      t(
        "JavaFX, Qt (Desktop Development)",
        "JavaFX, Qt (Pengembangan Desktop)"
      ),
      t("Raylib (Game Development)", "Raylib (Pengembangan Game)"),
      t(
        "Unit Testing & Code Quality Tools",
        "Unit Testing & Tools Kualitas Kode"
      ),
    ],
  },
];

export const toolbox: string[] = [
  "C",
  "C++",
  "Python",
  "JavaScript",
  "Raylib",
  "Qt",
  "Node.js",
  "Express",
  "Git & GitHub",
  "MySQL",
];
