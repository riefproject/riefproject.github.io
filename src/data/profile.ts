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
    "Problem solver and competitive programming enthusiast who ships fast with care.",
    "Problem solver dan pecinta competitive programming yang suka eksekusi cepat dan rapi."
  ),
  location: t("West Bandung, Indonesia", "Bandung Barat, Indonesia"),
  availability: t(
    "Available for internships, collaborations, and mentoring sessions.",
    "Siap untuk internship, kolaborasi, dan sesi mentoring."
  ),
  intro: t(
    "OSN-bred problem solver pairing algorithmic rigor with practical shipping—turning constraints into working features.",
    "Problem solver jebolan OSN yang memadukan ketelitian algoritma dengan eksekusi praktis—menerjemahkan constraint jadi fitur yang jalan."
  ),
  bio: t(
    "Currently studying Informatics Engineering at Politeknik Negeri Bandung while growing Brainware of SMANSA. Balances competitive programming, backend tinkering, and mentoring with a focus on efficient, reliable systems that feel good to use.",
    "Sedang menempuh Teknik Informatika di Politeknik Negeri Bandung sambil membesarkan Brainware of SMANSA. Menyeimbangkan competitive programming, oprek backend, dan mentoring dengan fokus pada sistem efisien, andal, dan nyaman dipakai."
  ),
  focusStack: t(
    "C/C++ · Competitive Programming · Backend & Automation",
    "C/C++ · Competitive Programming · Backend & Automation"
  ),
  resumeUrl: "https://example.com/your-cv.pdf",
};

export const heroHighlights: Highlight[] = [
  {
    label: t("Competitive Programming", "Competitive Programming"),
    detail: t(
      "10+ contests from school scrims to NOI/OSN stages",
      "10+ kontes dari sparing sekolah sampai tahapan NOI/OSN"
    ),
  },
  {
    label: t("Leadership", "Leadership"),
    detail: t(
      "Led Brainware SMANSA; labs stayed active (2022–2023)",
      "Memimpin Brainware SMANSA; lab tetap aktif (2022–2023)"
    ),
  },
  {
    label: t("Core Interests", "Fokus Utama"),
    detail: t(
      "Backend automation, diagnostic tools, and mentoring juniors",
      "Backend automation, tools diagnostik, dan mentoring junior"
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
    title: t("Summary", "Ringkasan"),
    items: [
      t(
        "Problem solving & pattern finding",
        "Problem solving & menemukan pola"
      ),
      t(
        "Competitive programming & contest prep",
        "Competitive programming & persiapan kontes"
      ),
      t("Data structures & algorithms", "Data structure & algorithm"),
      t(
        "Web/backend fundamentals for shipping prototypes",
        "Dasar web/backend untuk eksekusi prototipe"
      ),
      t("Leadership & mentoring juniors", "Leadership & mentoring junior"),
    ],
  },
  {
    title: t("Programming languages", "Bahasa pemrograman"),
    items: [
      t("C / C++ (primary)", "C / C++ (utama)"),
      t("Python for automation & tooling", "Python untuk automation & tooling"),
      t(
        "JavaScript for web & prototyping",
        "JavaScript untuk web & prototyping"
      ),
      t("Java basics for coursework", "Java dasar untuk tugas kuliah"),
    ],
    helper: t(
      "Also touches PHP, HTML/CSS, and SQL basics",
      "Menjelajah PHP, HTML/CSS, dan dasar SQL"
    ),
  },
  {
    title: t("Tools & frameworks", "Perangkat & framework"),
    items: [
      t("Raylib for game experiments", "Raylib buat eksperimen gim"),
      t("Qt for desktop interfaces", "Qt buat antarmuka desktop"),
      t("Node.js & Express fundamentals", "Dasar Node.js & Express"),
      t("Git / GitHub for collaboration", "Git / GitHub buat kolaborasi"),
    ],
  },
  {
    title: t("Soft skills & community", "Soft skill & komunitas"),
    items: [
      t(
        "Club leadership & event planning",
        "Kepemimpinan klub & perencanaan acara"
      ),
      t("Curriculum design for juniors", "Desain kurikulum untuk junior"),
      t("Public speaking & presentation", "Public speaking & presentasi"),
      t("Documentation & knowledge sharing", "Dokumentasi & berbagi ilmu"),
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
