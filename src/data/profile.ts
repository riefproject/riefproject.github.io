export type LocaleText = {
  en: string;
  id: string;
};

const t = (en: string, id: string): LocaleText => ({ en, id });

export type Profile = {
  name: string;
  role: LocaleText;
  tagline: LocaleText;
  location: LocaleText;
  photo?: string;
  availability: LocaleText;
  intro: LocaleText;
  bio: LocaleText;
  focusStack: LocaleText;
  resumeUrl?: string;
};

export type Highlight = {
  label: LocaleText;
  detail: LocaleText;
};

export type Stat = {
  label: LocaleText;
  value: string;
  helper?: LocaleText;
};

export type SocialLink = {
  label: string;
  url: string;
  hint?: string;
};

export type CPProfile = {
  platform: string;
  handle: string;
  url: string;
  logo?: string;
  note?: LocaleText;
};

export type TechStack = {
  name: string;
  category: "language" | "framework" | "tool";
  logoDark?: string;
  logoLight?: string;
};

export type FocusArea = {
  title: LocaleText;
  description: LocaleText;
  items: LocaleText[];
};

export type SkillCategory = {
  title: LocaleText;
  items: LocaleText[];
  helper?: LocaleText;
};

export type Experience = {
  company: string;
  logo?: string;
  role: LocaleText;
  period: string;
  summary: LocaleText;
  stack: string[];
  achievements: LocaleText[];
};

export type Education = {
  institution: string;
  logo?: string;
  program: LocaleText;
  period: string;
  details: LocaleText[];
};

export type AchievementType = "competitions" | "certifications" | "bootcamps";

export type Achievement = {
  type: AchievementType;
  title: LocaleText;
  issuer: LocaleText;
  date: string;
  highlight?: LocaleText;
  link?: string;
};

export type AchievementTab = {
  id: AchievementType;
  name: LocaleText;
};

export type Project = {
  title: LocaleText;
  img?: string;
  description: LocaleText;
  impact?: LocaleText;
  year: number;
  category: LocaleText;
  categoryKey: string;
  stack: string[];
  highlights: LocaleText[];
  links?: {
    label: LocaleText;
    url: string;
  }[];
};

export type Contact = {
  email: string;
  phone: string;
  message: LocaleText;
  availabilityNote: LocaleText;
};

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

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/arief-f-sa-wijaya-9aa935319",
    hint: "Perjalanan karier",
  },
  {
    label: "GitHub",
    url: "https://github.com/riefproject",
    hint: "Repositori & eksperimen",
  },
  {
    label: "Instagram",
    url: "https://instagram.com/fsarf_",
    hint: "Aktivitas harian",
  },
  {
    label: "Email",
    url: "mailto:talktorief@gmail.com",
    hint: "Kirim pesan langsung",
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

export const stackShowcase: TechStack[] = [
  {
    name: "C/C++",
    category: "language",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#5C8DBC" d="M94.73 29.32c0-1.676-.359-3.158-1.084-4.43-.713-1.25-1.78-2.298-3.21-3.127C78.621 14.95 66.797 8.16 54.987 1.343c-3.183-1.839-6.27-1.772-9.43.093-4.702 2.773-28.243 16.26-35.258 20.323-2.889 1.672-4.295 4.232-4.295 7.559C6 43.016 6.005 56.714 6 70.413c0 1.64.344 3.093 1.037 4.345.713 1.289 1.795 2.366 3.26 3.213 7.014 4.063 30.559 17.55 35.26 20.323 3.16 1.865 6.248 1.932 9.432.093 11.81-6.818 23.635-13.609 35.45-20.42 1.464-.847 2.546-1.925 3.259-3.212.692-1.253 1.036-2.706 1.037-4.346 0 0 0-27.39-.005-41.088"/><path fill="#1A4674" d="M50.503 49.732 7.037 74.758c.713 1.289 1.795 2.366 3.26 3.213 7.014 4.063 30.559 17.55 35.26 20.323 3.16 1.866 6.248 1.932 9.432.094 11.81-6.82 23.635-13.61 35.45-20.42 1.464-.848 2.546-1.926 3.259-3.213z"/><path fill="#1A4674" d="M37.629 57.145c2.53 4.415 7.284 7.393 12.738 7.393 5.488 0 10.27-3.016 12.787-7.478l-12.65-7.328z"/><path fill="#1B598E" d="M94.73 29.321c0-1.677-.359-3.159-1.084-4.43L50.503 49.73l43.195 25.024c.692-1.252 1.036-2.706 1.037-4.346 0 0 0-27.39-.005-41.088"/><path fill="#fff" d="M92.355 51.52H88.98v3.376h-3.376V51.52h-3.375v-3.375h3.375V44.77h3.376v3.375h3.375zm-12.316 0h-3.375v3.376h-3.376V51.52h-3.375v-3.375h3.375V44.77h3.376v3.375h3.375z"/><path fill="#fff" d="M63.154 57.06c-2.517 4.463-7.299 7.479-12.787 7.479-5.454 0-10.209-2.979-12.738-7.394a14.6 14.6 0 0 1-1.935-7.28c0-8.104 6.57-14.673 14.673-14.673 5.42 0 10.15 2.941 12.691 7.311l12.826-7.385c-5.098-8.8-14.615-14.72-25.516-14.72-16.275 0-29.468 13.193-29.468 29.467 0 5.34 1.42 10.346 3.903 14.665 5.084 8.846 14.63 14.803 25.565 14.803 10.955 0 20.514-5.981 25.592-14.853z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#5C8DBC" d="M94.73 29.32c0-1.676-.359-3.158-1.084-4.43-.713-1.25-1.78-2.298-3.21-3.127C78.621 14.95 66.797 8.16 54.987 1.343c-3.183-1.839-6.27-1.772-9.43.093-4.702 2.773-28.243 16.26-35.258 20.323-2.889 1.672-4.295 4.232-4.295 7.559C6 43.016 6.005 56.714 6 70.413c0 1.64.344 3.093 1.037 4.345.713 1.289 1.795 2.366 3.26 3.213 7.014 4.063 30.559 17.55 35.26 20.323 3.16 1.865 6.248 1.932 9.432.093 11.81-6.818 23.635-13.609 35.45-20.42 1.464-.847 2.546-1.925 3.259-3.212.692-1.253 1.036-2.706 1.037-4.346 0 0 0-27.39-.005-41.088"/><path fill="#1A4674" d="M50.503 49.732 7.037 74.758c.713 1.289 1.795 2.366 3.26 3.213 7.014 4.063 30.559 17.55 35.26 20.323 3.16 1.866 6.248 1.932 9.432.094 11.81-6.82 23.635-13.61 35.45-20.42 1.464-.848 2.546-1.926 3.259-3.213z"/><path fill="#1A4674" d="M37.629 57.145c2.53 4.415 7.284 7.393 12.738 7.393 5.488 0 10.27-3.016 12.787-7.478l-12.65-7.328z"/><path fill="#1B598E" d="M94.73 29.321c0-1.677-.359-3.159-1.084-4.43L50.503 49.73l43.195 25.024c.692-1.252 1.036-2.706 1.037-4.346 0 0 0-27.39-.005-41.088"/><path fill="#fff" d="M92.355 51.52H88.98v3.376h-3.376V51.52h-3.375v-3.375h3.375V44.77h3.376v3.375h3.375zm-12.316 0h-3.375v3.376h-3.376V51.52h-3.375v-3.375h3.375V44.77h3.376v3.375h3.375z"/><path fill="#fff" d="M63.154 57.06c-2.517 4.463-7.299 7.479-12.787 7.479-5.454 0-10.209-2.979-12.738-7.394a14.6 14.6 0 0 1-1.935-7.28c0-8.104 6.57-14.673 14.673-14.673 5.42 0 10.15 2.941 12.691 7.311l12.826-7.385c-5.098-8.8-14.615-14.72-25.516-14.72-16.275 0-29.468 13.193-29.468 29.467 0 5.34 1.42 10.346 3.903 14.665 5.084 8.846 14.63 14.803 25.565 14.803 10.955 0 20.514-5.981 25.592-14.853z"/></svg>',
  },
  {
    name: "C#",
    category: "language",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clip-path="url(#a)"><path fill="#A179DC" d="M94.74 29.324c-.001-1.677-.36-3.16-1.085-4.431-.713-1.25-1.78-2.3-3.211-3.128-11.815-6.812-23.64-13.603-35.45-20.423-3.185-1.838-6.272-1.77-9.432.094C40.859 4.209 17.316 17.698 10.3 21.76c-2.889 1.673-4.295 4.233-4.295 7.56-.005 13.7 0 27.4-.005 41.1 0 1.64.344 3.093 1.037 4.346.713 1.288 1.795 2.365 3.26 3.213 7.015 4.064 30.562 17.551 35.263 20.325 3.162 1.866 6.25 1.932 9.434.093 11.811-6.82 23.638-13.61 35.454-20.422 1.464-.847 2.546-1.925 3.259-3.213.692-1.252 1.037-2.706 1.037-4.346 0 0 0-27.392-.005-41.092"/><path fill="#280068" d="M50.508 49.737 7.038 74.766c.712 1.288 1.794 2.365 3.258 3.213C17.314 82.043 40.86 95.53 45.56 98.304c3.162 1.866 6.25 1.932 9.434.093 11.811-6.82 23.638-13.61 35.454-20.422 1.464-.847 2.546-1.925 3.259-3.213z"/><path fill="#390091" d="M94.74 29.324c-.001-1.677-.36-3.16-1.085-4.431L50.508 49.737l43.199 25.025c.692-1.252 1.036-2.706 1.037-4.346 0 0 0-27.392-.005-41.092"/><path fill="#fff" d="M76.102 40.38v4.678h4.678V40.38h2.34v4.678h4.677v2.34H83.12v4.678h4.678v2.339H83.12v4.678h-2.34v-4.678h-4.677v4.678h-2.34v-4.678h-4.678v-2.34h4.678v-4.678h-4.678v-2.339h4.678V40.38zm4.678 7.017h-4.678v4.679h4.678z"/><path fill="#fff" d="M50.603 16.884c12.203 0 22.857 6.627 28.563 16.478l-.055-.095-14.358 8.267c-2.828-4.79-8.014-8.022-13.963-8.088l-.187-.001c-9.071 0-16.426 7.353-16.426 16.425 0 2.966.791 5.747 2.167 8.149 2.83 4.943 8.153 8.277 14.26 8.277 6.142 0 11.495-3.377 14.312-8.372l-.068.12 14.335 8.305C73.54 76.116 63.031 82.722 50.97 82.854l-.367.002c-12.241 0-22.925-6.668-28.618-16.57a32.84 32.84 0 0 1-4.368-16.416c0-18.217 14.768-32.986 32.986-32.986"/></g><defs><clipPath id="a"><path fill="#fff" d="M6 0h88.889v100H6z"/></clipPath></defs></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clip-path="url(#a)"><path fill="#A179DC" d="M94.74 29.324c-.001-1.677-.36-3.16-1.085-4.431-.713-1.25-1.78-2.3-3.211-3.128-11.815-6.812-23.64-13.603-35.45-20.423-3.185-1.838-6.272-1.77-9.432.094C40.859 4.209 17.316 17.698 10.3 21.76c-2.889 1.673-4.295 4.233-4.295 7.56-.005 13.7 0 27.4-.005 41.1 0 1.64.344 3.093 1.037 4.346.713 1.288 1.795 2.365 3.26 3.213 7.015 4.064 30.562 17.551 35.263 20.325 3.162 1.866 6.25 1.932 9.434.093 11.811-6.82 23.638-13.61 35.454-20.422 1.464-.847 2.546-1.925 3.259-3.213.692-1.252 1.037-2.706 1.037-4.346 0 0 0-27.392-.005-41.092"/><path fill="#280068" d="M50.508 49.737 7.038 74.766c.712 1.288 1.794 2.365 3.258 3.213C17.314 82.043 40.86 95.53 45.56 98.304c3.162 1.866 6.25 1.932 9.434.093 11.811-6.82 23.638-13.61 35.454-20.422 1.464-.847 2.546-1.925 3.259-3.213z"/><path fill="#390091" d="M94.74 29.324c-.001-1.677-.36-3.16-1.085-4.431L50.508 49.737l43.199 25.025c.692-1.252 1.036-2.706 1.037-4.346 0 0 0-27.392-.005-41.092"/><path fill="#fff" d="M76.102 40.38v4.678h4.678V40.38h2.34v4.678h4.677v2.34H83.12v4.678h4.678v2.339H83.12v4.678h-2.34v-4.678h-4.677v4.678h-2.34v-4.678h-4.678v-2.34h4.678v-4.678h-4.678v-2.339h4.678V40.38zm4.678 7.017h-4.678v4.679h4.678z"/><path fill="#fff" d="M50.603 16.884c12.203 0 22.857 6.627 28.563 16.478l-.055-.095-14.358 8.267c-2.828-4.79-8.014-8.022-13.963-8.088l-.187-.001c-9.071 0-16.426 7.353-16.426 16.425 0 2.966.791 5.747 2.167 8.149 2.83 4.943 8.153 8.277 14.26 8.277 6.142 0 11.495-3.377 14.312-8.372l-.068.12 14.335 8.305C73.54 76.116 63.031 82.722 50.97 82.854l-.367.002c-12.241 0-22.925-6.668-28.618-16.57a32.84 32.84 0 0 1-4.368-16.416c0-18.217 14.768-32.986 32.986-32.986"/></g><defs><clipPath id="a"><path fill="#fff" d="M6 0h88.889v100H6z"/></clipPath></defs></svg>',
  },
  {
    name: "Java",
    category: "language",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#5382A1" d="M36.753 77.336s-3.822 2.222 2.72 2.974c7.924.904 11.973.774 20.706-.879 0 0 2.296 1.44 5.502 2.687-19.576 8.39-44.304-.486-28.928-4.782M34.36 66.387s-4.286 3.173 2.26 3.85c8.464.873 15.149.945 26.716-1.283 0 0 1.6 1.622 4.116 2.51-23.668 6.92-50.03.545-33.092-5.077"/><path fill="#E76F00" d="M54.527 47.815c4.823 5.554-1.268 10.551-1.268 10.551s12.248-6.322 6.623-14.24C54.63 36.743 50.6 33.074 72.41 20.425c0 0-34.234 8.55-17.883 27.39"/><path fill="#5382A1" d="M80.418 85.434s2.827 2.33-3.115 4.133c-11.3 3.423-47.03 4.456-56.956.136-3.568-1.552 3.124-3.706 5.228-4.159 2.195-.475 3.45-.387 3.45-.387-3.968-2.795-25.648 5.49-11.012 7.861 39.913 6.473 72.757-2.914 62.405-7.584M38.59 55.044s-18.174 4.317-6.436 5.884c4.956.664 14.837.514 24.04-.258 7.522-.634 15.075-1.983 15.075-1.983s-2.653 1.136-4.571 2.446c-18.457 4.854-54.11 2.596-43.846-2.37 8.68-4.195 15.738-3.72 15.738-3.72m32.603 18.224c18.762-9.75 10.088-19.118 4.033-17.856-1.484.309-2.146.576-2.146.576s.551-.863 1.603-1.236c11.978-4.212 21.19 12.42-3.867 19.007 0 0 .29-.26.377-.491"/><path fill="#E76F00" d="M59.882 0s10.39 10.395-9.855 26.377C33.793 39.2 46.325 46.51 50.021 54.861c-9.477-8.55-16.432-16.077-11.766-23.082C45.103 21.496 64.075 16.51 59.882 0"/><path fill="#5382A1" d="M40.434 99.686c18.009 1.153 45.663-.64 46.318-9.161 0 0-1.259 3.23-14.883 5.796-15.371 2.892-34.329 2.555-45.573.7 0 0 2.302 1.906 14.138 2.665"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#5382A1" d="M36.753 77.336s-3.822 2.222 2.72 2.974c7.924.904 11.973.774 20.706-.879 0 0 2.296 1.44 5.502 2.687-19.576 8.39-44.304-.486-28.928-4.782M34.36 66.387s-4.286 3.173 2.26 3.85c8.464.873 15.149.945 26.716-1.283 0 0 1.6 1.622 4.116 2.51-23.668 6.92-50.03.545-33.092-5.077"/><path fill="#E76F00" d="M54.527 47.815c4.823 5.554-1.268 10.551-1.268 10.551s12.248-6.322 6.623-14.24C54.63 36.743 50.6 33.074 72.41 20.425c0 0-34.234 8.55-17.883 27.39"/><path fill="#5382A1" d="M80.418 85.434s2.827 2.33-3.115 4.133c-11.3 3.423-47.03 4.456-56.956.136-3.568-1.552 3.124-3.706 5.228-4.159 2.195-.475 3.45-.387 3.45-.387-3.968-2.795-25.648 5.49-11.012 7.861 39.913 6.473 72.757-2.914 62.405-7.584M38.59 55.044s-18.174 4.317-6.436 5.884c4.956.664 14.837.514 24.04-.258 7.522-.634 15.075-1.983 15.075-1.983s-2.653 1.136-4.571 2.446c-18.457 4.854-54.11 2.596-43.846-2.37 8.68-4.195 15.738-3.72 15.738-3.72m32.603 18.224c18.762-9.75 10.088-19.118 4.033-17.856-1.484.309-2.146.576-2.146.576s.551-.863 1.603-1.236c11.978-4.212 21.19 12.42-3.867 19.007 0 0 .29-.26.377-.491"/><path fill="#E76F00" d="M59.882 0s10.39 10.395-9.855 26.377C33.793 39.2 46.325 46.51 50.021 54.861c-9.477-8.55-16.432-16.077-11.766-23.082C45.103 21.496 64.075 16.51 59.882 0"/><path fill="#5382A1" d="M40.434 99.686c18.009 1.153 45.663-.64 46.318-9.161 0 0-1.259 3.23-14.883 5.796-15.371 2.892-34.329 2.555-45.573.7 0 0 2.302 1.906 14.138 2.665"/></svg>',
  },
  {
    name: "JavaScript",
    category: "language",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#F7DF1E" d="M100 0H0v100h100z"/><path fill="#000" d="M67.175 78.125c2.014 3.29 4.634 5.707 9.27 5.707 3.893 0 6.38-1.946 6.38-4.635 0-3.222-2.555-4.364-6.84-6.238l-2.35-1.008c-6.781-2.89-11.286-6.508-11.286-14.159 0-7.047 5.37-12.413 13.762-12.413 5.975 0 10.27 2.08 13.365 7.524l-7.317 4.699c-1.612-2.89-3.35-4.027-6.048-4.027-2.752 0-4.497 1.746-4.497 4.027 0 2.819 1.746 3.96 5.778 5.706l2.35 1.006c7.983 3.424 12.491 6.915 12.491 14.762 0 8.46-6.646 13.096-15.571 13.096-8.727 0-14.365-4.16-17.124-9.61zm-33.196.815c1.477 2.619 2.82 4.833 6.048 4.833 3.087 0 5.035-1.208 5.035-5.905V45.916h9.397v32.08c0 9.73-5.705 14.158-14.032 14.158-7.524 0-11.881-3.894-14.097-8.583z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#F7DF1E" d="M100 0H0v100h100z"/><path fill="#000" d="M67.175 78.125c2.014 3.29 4.634 5.707 9.27 5.707 3.893 0 6.38-1.946 6.38-4.635 0-3.222-2.555-4.364-6.84-6.238l-2.35-1.008c-6.781-2.89-11.286-6.508-11.286-14.159 0-7.047 5.37-12.413 13.762-12.413 5.975 0 10.27 2.08 13.365 7.524l-7.317 4.699c-1.612-2.89-3.35-4.027-6.048-4.027-2.752 0-4.497 1.746-4.497 4.027 0 2.819 1.746 3.96 5.778 5.706l2.35 1.006c7.983 3.424 12.491 6.915 12.491 14.762 0 8.46-6.646 13.096-15.571 13.096-8.727 0-14.365-4.16-17.124-9.61zm-33.196.815c1.477 2.619 2.82 4.833 6.048 4.833 3.087 0 5.035-1.208 5.035-5.905V45.916h9.397v32.08c0 9.73-5.705 14.158-14.032 14.158-7.524 0-11.881-3.894-14.097-8.583z"/></svg>',
  },
  {
    name: "Python",
    category: "language",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="url(#a)" d="M49.64 0C24.254 0 25.839 11.009 25.839 11.009l.028 11.406h24.225v3.424H16.245S0 23.997 0 49.61c0 25.615 14.179 24.707 14.179 24.707h8.462V62.432s-.457-14.18 13.952-14.18H60.62s13.5.219 13.5-13.046V13.273S76.17 0 49.64 0M36.282 7.67a4.354 4.354 0 0 1 4.358 4.358 4.356 4.356 0 0 1-6.027 4.028 4.35 4.35 0 0 1-2.69-4.028 4.355 4.355 0 0 1 4.359-4.358"/><path fill="url(#b)" d="M50.36 99.48c25.387 0 23.802-11.009 23.802-11.009l-.028-11.405H49.908V73.64h33.847S100 75.485 100 49.869c0-25.615-14.179-24.706-14.179-24.706H77.36v11.886s.457 14.179-13.952 14.179H39.38s-13.5-.218-13.5 13.047v21.933S23.83 99.48 50.36 99.48m13.359-7.67a4.355 4.355 0 0 1-4.028-6.026 4.35 4.35 0 0 1 4.028-2.69 4.355 4.355 0 0 1 4.027 6.027 4.355 4.355 0 0 1-4.027 2.69"/><defs><linearGradient id="a" x1="9.61" x2="59.167" y1="8.948" y2="58.01" gradientUnits="userSpaceOnUse"><stop stop-color="#387EB8"/><stop offset="1" stop-color="#366994"/></linearGradient><linearGradient id="b" x1="40.028" x2="93.247" y1="40.453" y2="90.762" gradientUnits="userSpaceOnUse"><stop stop-color="#FFE052"/><stop offset="1" stop-color="#FFC331"/></linearGradient></defs></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="url(#a)" d="M49.64 0C24.254 0 25.839 11.009 25.839 11.009l.028 11.406h24.225v3.424H16.245S0 23.997 0 49.61c0 25.615 14.179 24.707 14.179 24.707h8.462V62.432s-.457-14.18 13.952-14.18H60.62s13.5.219 13.5-13.046V13.273S76.17 0 49.64 0M36.282 7.67a4.354 4.354 0 0 1 4.358 4.358 4.356 4.356 0 0 1-6.027 4.028 4.35 4.35 0 0 1-2.69-4.028 4.355 4.355 0 0 1 4.359-4.358"/><path fill="url(#b)" d="M50.36 99.48c25.387 0 23.802-11.009 23.802-11.009l-.028-11.405H49.908V73.64h33.847S100 75.485 100 49.869c0-25.615-14.179-24.706-14.179-24.706H77.36v11.886s.457 14.179-13.952 14.179H39.38s-13.5-.218-13.5 13.047v21.933S23.83 99.48 50.36 99.48m13.359-7.67a4.355 4.355 0 0 1-4.028-6.026 4.35 4.35 0 0 1 4.028-2.69 4.355 4.355 0 0 1 4.027 6.027 4.355 4.355 0 0 1-4.027 2.69"/><defs><linearGradient id="a" x1="9.61" x2="59.167" y1="8.948" y2="58.01" gradientUnits="userSpaceOnUse"><stop stop-color="#387EB8"/><stop offset="1" stop-color="#366994"/></linearGradient><linearGradient id="b" x1="40.028" x2="93.247" y1="40.453" y2="90.762" gradientUnits="userSpaceOnUse"><stop stop-color="#FFE052"/><stop offset="1" stop-color="#FFC331"/></linearGradient></defs></svg>',
  },
  {
    name: "PHP",
    category: "language",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#6E81B6" fill-rule="evenodd" d="M50 75.677c27.614 0 50-11.345 50-25.338S77.614 25 50 25 0 36.345 0 50.339s22.386 25.338 50 25.338" clip-rule="evenodd"/><path fill="#fff" fill-rule="evenodd" d="m60.133 58.528 2.48-12.764c.56-2.881.095-5.03-1.383-6.388-1.43-1.314-3.86-1.953-7.426-1.953H49.51l1.228-6.324a.814.814 0 0 0-.797-.969h-5.928a.81.81 0 0 0-.798.659l-2.634 13.55c-.24-1.524-.83-2.835-1.774-3.916-1.74-1.99-4.49-3-8.176-3H19.14a.81.81 0 0 0-.798.658l-5.33 27.43a.81.81 0 0 0 .798.968h5.974c.39 0 .724-.276.798-.66l1.29-6.634h4.447c2.334 0 4.295-.252 5.826-.75 1.566-.51 3.006-1.373 4.276-2.562a13.1 13.1 0 0 0 2.526-3.136l-1.065 5.48a.81.81 0 0 0 .798.968h5.929a.814.814 0 0 0 .798-.658l2.925-15.056H52.4c1.734 0 2.242.345 2.38.493.125.135.385.612.093 2.116l-2.358 12.136a.815.815 0 0 0 .798.968h6.023a.81.81 0 0 0 .797-.656M32.65 47.981c-.373 1.914-1.074 3.279-2.086 4.057-1.028.793-2.672 1.194-4.887 1.194h-2.648l1.915-9.854h3.424c2.515 0 3.528.538 3.935.988.565.625.684 1.876.347 3.615m52.455-7.558c-1.738-1.99-4.489-3-8.175-3H65.44a.81.81 0 0 0-.798.658l-5.33 27.43a.814.814 0 0 0 .797.968h5.975c.39 0 .724-.276.798-.66l1.29-6.634h4.448c2.334 0 4.294-.252 5.825-.75 1.566-.51 3.007-1.373 4.276-2.562a13.1 13.1 0 0 0 2.59-3.247 13.2 13.2 0 0 0 1.41-3.915c.68-3.495.136-6.283-1.616-8.288m-5.817 7.558c-.373 1.914-1.074 3.279-2.085 4.057-1.029.793-2.672 1.194-4.887 1.194h-2.648l1.914-9.854h3.424c2.516 0 3.529.538 3.936.988.563.625.683 1.876.346 3.615" clip-rule="evenodd"/><path fill="#000" fill-rule="evenodd" d="M28.197 42.565q3.405 0 4.54 1.257 1.133 1.258.54 4.315-.621 3.184-2.388 4.546-1.77 1.362-5.382 1.362H21.87l2.232-11.48zm-14.558 23.1h5.974l1.418-7.291h5.118q3.387 0 5.575-.713 2.187-.712 3.977-2.386a12.2 12.2 0 0 0 2.432-3.045q.93-1.665 1.32-3.674.949-4.877-1.43-7.598-2.377-2.721-7.563-2.721H18.97zm30.201-34.72h5.929l-1.418 7.293h5.282q4.984 0 6.876 1.738t1.135 5.634l-2.48 12.765h-6.022L55.5 46.237q.403-2.072-.297-2.825t-2.974-.753h-4.738l-3.054 15.715H38.51zm30.994 11.621q3.405 0 4.54 1.257 1.133 1.258.54 4.315-.619 3.184-2.388 4.546t-5.38 1.362H68.51l2.23-11.48zm-14.56 23.1h5.976l1.417-7.291h5.118q3.389 0 5.576-.713 2.187-.712 3.977-2.386a12.2 12.2 0 0 0 2.43-3.045q.93-1.665 1.322-3.674.948-4.877-1.43-7.598-2.377-2.721-7.563-2.721h-11.49z" clip-rule="evenodd"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#6E81B6" fill-rule="evenodd" d="M50 75.677c27.614 0 50-11.345 50-25.338S77.614 25 50 25 0 36.345 0 50.339s22.386 25.338 50 25.338" clip-rule="evenodd"/><path fill="#fff" fill-rule="evenodd" d="m60.133 58.528 2.48-12.764c.56-2.881.095-5.03-1.383-6.388-1.43-1.314-3.86-1.953-7.426-1.953H49.51l1.228-6.324a.814.814 0 0 0-.797-.969h-5.928a.81.81 0 0 0-.798.659l-2.634 13.55c-.24-1.524-.83-2.835-1.774-3.916-1.74-1.99-4.49-3-8.176-3H19.14a.81.81 0 0 0-.798.658l-5.33 27.43a.81.81 0 0 0 .798.968h5.974c.39 0 .724-.276.798-.66l1.29-6.634h4.447c2.334 0 4.295-.252 5.826-.75 1.566-.51 3.006-1.373 4.276-2.562a13.1 13.1 0 0 0 2.526-3.136l-1.065 5.48a.81.81 0 0 0 .798.968h5.929a.814.814 0 0 0 .798-.658l2.925-15.056H52.4c1.734 0 2.242.345 2.38.493.125.135.385.612.093 2.116l-2.358 12.136a.815.815 0 0 0 .798.968h6.023a.81.81 0 0 0 .797-.656M32.65 47.981c-.373 1.914-1.074 3.279-2.086 4.057-1.028.793-2.672 1.194-4.887 1.194h-2.648l1.915-9.854h3.424c2.515 0 3.528.538 3.935.988.565.625.684 1.876.347 3.615m52.455-7.558c-1.738-1.99-4.489-3-8.175-3H65.44a.81.81 0 0 0-.798.658l-5.33 27.43a.814.814 0 0 0 .797.968h5.975c.39 0 .724-.276.798-.66l1.29-6.634h4.448c2.334 0 4.294-.252 5.825-.75 1.566-.51 3.007-1.373 4.276-2.562a13.1 13.1 0 0 0 2.59-3.247 13.2 13.2 0 0 0 1.41-3.915c.68-3.495.136-6.283-1.616-8.288m-5.817 7.558c-.373 1.914-1.074 3.279-2.085 4.057-1.029.793-2.672 1.194-4.887 1.194h-2.648l1.914-9.854h3.424c2.516 0 3.529.538 3.936.988.563.625.683 1.876.346 3.615" clip-rule="evenodd"/><path fill="#000" fill-rule="evenodd" d="M28.197 42.565q3.405 0 4.54 1.257 1.133 1.258.54 4.315-.621 3.184-2.388 4.546-1.77 1.362-5.382 1.362H21.87l2.232-11.48zm-14.558 23.1h5.974l1.418-7.291h5.118q3.387 0 5.575-.713 2.187-.712 3.977-2.386a12.2 12.2 0 0 0 2.432-3.045q.93-1.665 1.32-3.674.949-4.877-1.43-7.598-2.377-2.721-7.563-2.721H18.97zm30.201-34.72h5.929l-1.418 7.293h5.282q4.984 0 6.876 1.738t1.135 5.634l-2.48 12.765h-6.022L55.5 46.237q.403-2.072-.297-2.825t-2.974-.753h-4.738l-3.054 15.715H38.51zm30.994 11.621q3.405 0 4.54 1.257 1.133 1.258.54 4.315-.619 3.184-2.388 4.546t-5.38 1.362H68.51l2.23-11.48zm-14.56 23.1h5.976l1.417-7.291h5.118q3.389 0 5.576-.713 2.187-.712 3.977-2.386a12.2 12.2 0 0 0 2.43-3.045q.93-1.665 1.322-3.674.948-4.877-1.43-7.598-2.377-2.721-7.563-2.721h-11.49z" clip-rule="evenodd"/></svg>',
  },
  {
    name: "React.js",
    category: "framework",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#5C8DBC" d="M94.73 29.32c0-1.676-.359-3.158-1.084-4.43-.713-1.25-1.78-2.298-3.21-3.127C78.621 14.95 66.797 8.16 54.987 1.343c-3.183-1.839-6.27-1.772-9.43.093-4.702 2.773-28.243 16.26-35.258 20.323-2.889 1.672-4.295 4.232-4.295 7.559C6 43.016 6.005 56.714 6 70.413c0 1.64.344 3.093 1.037 4.345.713 1.289 1.795 2.366 3.26 3.213 7.014 4.063 30.559 17.55 35.26 20.323 3.16 1.865 6.248 1.932 9.432.093 11.81-6.818 23.635-13.609 35.45-20.42 1.464-.847 2.546-1.925 3.259-3.212.692-1.253 1.036-2.706 1.037-4.346 0 0 0-27.39-.005-41.088"/><path fill="#1A4674" d="M50.503 49.732 7.037 74.758c.713 1.289 1.795 2.366 3.26 3.213 7.014 4.063 30.559 17.55 35.26 20.323 3.16 1.866 6.248 1.932 9.432.094 11.81-6.82 23.635-13.61 35.45-20.42 1.464-.848 2.546-1.926 3.259-3.213z"/><path fill="#1A4674" d="M37.629 57.145c2.53 4.415 7.284 7.393 12.738 7.393 5.488 0 10.27-3.016 12.787-7.478l-12.65-7.328z"/><path fill="#1B598E" d="M94.73 29.321c0-1.677-.359-3.159-1.084-4.43L50.503 49.73l43.195 25.024c.692-1.252 1.036-2.706 1.037-4.346 0 0 0-27.39-.005-41.088"/><path fill="#fff" d="M92.355 51.52H88.98v3.376h-3.376V51.52h-3.375v-3.375h3.375V44.77h3.376v3.375h3.375zm-12.316 0h-3.375v3.376h-3.376V51.52h-3.375v-3.375h3.375V44.77h3.376v3.375h3.375z"/><path fill="#fff" d="M63.154 57.06c-2.517 4.463-7.299 7.479-12.787 7.479-5.454 0-10.209-2.979-12.738-7.394a14.6 14.6 0 0 1-1.935-7.28c0-8.104 6.57-14.673 14.673-14.673 5.42 0 10.15 2.941 12.691 7.311l12.826-7.385c-5.098-8.8-14.615-14.72-25.516-14.72-16.275 0-29.468 13.193-29.468 29.467 0 5.34 1.42 10.346 3.903 14.665 5.084 8.846 14.63 14.803 25.565 14.803 10.955 0 20.514-5.981 25.592-14.853z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 101 100"><path fill="#61DAFB" d="M50.307 58.816a8.816 8.816 0 1 0 0-17.632 8.816 8.816 0 0 0 0 17.632"/><path stroke="#61DAFB" stroke-width="5" d="M50.307 68.063c26.126 0 47.306-8.087 47.306-18.063s-21.18-18.062-47.306-18.062C24.18 31.938 3 40.024 3 50s21.18 18.063 47.307 18.063Z"/><path stroke="#61DAFB" stroke-width="5" d="M34.664 59.031C47.727 81.658 65.321 95.957 73.96 90.97c8.64-4.988 5.053-27.374-8.01-50C52.885 18.342 35.291 4.043 26.652 9.03s-5.052 27.374 8.011 50Z"/><path stroke="#61DAFB" stroke-width="5" d="M34.664 40.969c-13.063 22.626-16.65 45.012-8.01 50 8.638 4.988 26.232-9.311 39.295-31.938s16.65-45.012 8.01-50c-8.638-4.988-26.232 9.311-39.295 31.938Z"/></svg>',
  },
  {
    name: "Vue.js",
    category: "framework",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#41B883" d="M80 7h20L50 93.25 0 7h38.25L50 27 61.5 7z"/><path fill="#41B883" d="m0 7 50 86.25L100 7H80L50 58.75 19.75 7z"/><path fill="#35495E" d="M19.75 7 50 59 80 7H61.5L50 27 38.25 7z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#41B883" d="M80 7h20L50 93.25 0 7h38.25L50 27 61.5 7z"/><path fill="#41B883" d="m0 7 50 86.25L100 7H80L50 58.75 19.75 7z"/><path fill="#35495E" d="M19.75 7 50 59 80 7H61.5L50 27 38.25 7z"/></svg>',
  },
  {
    name: "Astro",
    category: "framework",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#FF5D01" d="M35.696 85.174c-4.502-4.13-5.816-12.807-3.94-19.093 3.252 3.963 7.758 5.219 12.426 5.927 7.206 1.094 14.283.685 20.977-2.62.766-.378 1.473-.881 2.31-1.39.629 1.827.792 3.674.573 5.552-.534 4.576-2.803 8.111-6.413 10.79-1.443 1.072-2.97 2.03-4.461 3.04-4.58 3.107-5.818 6.749-4.098 12.046.041.13.078.258.17.573-2.338-1.05-4.046-2.578-5.347-4.589-1.375-2.121-2.029-4.468-2.063-7.008-.017-1.236-.017-2.483-.183-3.7-.404-2.97-1.794-4.3-4.412-4.378-2.687-.078-4.812 1.588-5.375 4.213-.043.201-.106.4-.168.634z"/><path fill="#fff" d="M10 65.034s13.332-6.517 26.7-6.517l10.08-31.302c.377-1.514 1.48-2.543 2.723-2.543 1.244 0 2.346 1.029 2.723 2.543l10.08 31.302c15.834 0 26.7 6.517 26.7 6.517L66.318 3.008c-.65-1.83-1.746-3.009-3.226-3.009H35.918c-1.48 0-2.532 1.179-3.227 3.009C32.642 3.13 10 65.034 10 65.034"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#FF5D01" d="M35.696 85.174c-4.502-4.13-5.816-12.807-3.94-19.093 3.252 3.963 7.758 5.219 12.426 5.927 7.206 1.094 14.283.685 20.977-2.62.766-.378 1.473-.881 2.31-1.39.629 1.827.792 3.674.573 5.552-.534 4.576-2.803 8.111-6.413 10.79-1.443 1.072-2.97 2.03-4.461 3.04-4.58 3.107-5.818 6.749-4.098 12.046.041.13.078.258.17.573-2.338-1.05-4.046-2.578-5.347-4.589-1.375-2.121-2.029-4.468-2.063-7.008-.017-1.236-.017-2.483-.183-3.7-.404-2.97-1.794-4.3-4.412-4.378-2.687-.078-4.812 1.588-5.375 4.213-.043.201-.106.4-.168.634z"/><path fill="#000014" d="M10 65.034s13.332-6.517 26.7-6.517l10.08-31.302c.377-1.514 1.48-2.543 2.723-2.543 1.244 0 2.346 1.029 2.723 2.543l10.08 31.302c15.834 0 26.7 6.517 26.7 6.517L66.318 3.008c-.65-1.83-1.746-3.009-3.226-3.009H35.918c-1.48 0-2.532 1.179-3.227 3.009C32.642 3.13 10 65.034 10 65.034"/></svg>',
  },
  {
    name: "Tailwind CSS",
    category: "framework",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#06B6D4" d="M50 20q-20 0-25 19.994 7.5-9.997 17.5-7.498c3.804.95 6.522 3.71 9.532 6.764 4.902 4.974 10.576 10.731 22.969 10.731q20 0 24.999-19.995-7.5 9.997-17.5 7.5c-3.803-.951-6.521-3.71-9.531-6.765C68.067 25.758 62.392 20 50 20M25 49.991q-20 0-25 19.995 7.5-9.998 17.5-7.498c3.803.952 6.522 3.71 9.532 6.763C31.933 74.225 37.608 79.984 50 79.984q20 0 25-19.995-7.5 9.997-17.5 7.498c-3.803-.95-6.522-3.71-9.532-6.763C43.066 55.75 37.393 49.991 25 49.991"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#06B6D4" d="M50 20q-20 0-25 19.994 7.5-9.997 17.5-7.498c3.804.95 6.522 3.71 9.532 6.764 4.902 4.974 10.576 10.731 22.969 10.731q20 0 24.999-19.995-7.5 9.997-17.5 7.5c-3.803-.951-6.521-3.71-9.531-6.765C68.067 25.758 62.392 20 50 20M25 49.991q-20 0-25 19.995 7.5-9.998 17.5-7.498c3.803.952 6.522 3.71 9.532 6.763C31.933 74.225 37.608 79.984 50 79.984q20 0 25-19.995-7.5 9.997-17.5 7.498c-3.803-.95-6.522-3.71-9.532-6.763C43.066 55.75 37.393 49.991 25 49.991"/></svg>',
  },
  {
    name: "Bootstrap",
    category: "framework",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#fff" fill-rule="evenodd" d="M20.77 10c-5.705 0-9.928 4.994-9.739 10.41.182 5.203-.054 11.942-1.75 17.438C7.578 43.36 4.7 46.852 0 47.3v5.06c4.7.45 7.578 3.94 9.28 9.453 1.697 5.495 1.933 12.234 1.751 17.438-.189 5.415 4.033 10.41 9.74 10.41h58.466c5.706 0 9.928-4.994 9.738-10.41-.181-5.204.055-11.943 1.751-17.438C92.43 56.3 95.3 52.809 100 52.36V47.3c-4.7-.45-7.571-3.94-9.274-9.452-1.697-5.495-1.932-12.234-1.75-17.438.189-5.415-4.033-10.41-9.739-10.41zm47.027 49.037c0 7.457-5.563 11.98-14.794 11.98H37.287a1.695 1.695 0 0 1-1.695-1.695V30.34a1.695 1.695 0 0 1 1.695-1.695h15.625c7.698 0 12.75 4.17 12.75 10.571 0 4.493-3.4 8.516-7.729 9.22v.235c5.894.646 9.863 4.728 9.863 10.366m-16.508-25.02h-8.96v12.656h7.547c5.834 0 9.05-2.349 9.05-6.548 0-3.935-2.766-6.108-7.637-6.108m-8.96 17.678v13.947h9.29c6.074 0 9.291-2.437 9.291-7.017s-3.307-6.93-9.682-6.93z" clip-rule="evenodd"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#7952B3" fill-rule="evenodd" d="M20.77 10c-5.705 0-9.928 4.994-9.739 10.41.182 5.203-.054 11.942-1.75 17.438C7.578 43.36 4.7 46.852 0 47.3v5.06c4.7.45 7.578 3.94 9.28 9.453 1.697 5.495 1.933 12.234 1.751 17.438-.189 5.415 4.033 10.41 9.74 10.41h58.466c5.706 0 9.928-4.994 9.738-10.41-.181-5.204.055-11.943 1.751-17.438C92.43 56.3 95.3 52.809 100 52.36V47.3c-4.7-.45-7.571-3.94-9.274-9.452-1.697-5.495-1.932-12.234-1.75-17.438.189-5.415-4.033-10.41-9.739-10.41zm47.027 49.037c0 7.457-5.563 11.98-14.794 11.98H37.287a1.695 1.695 0 0 1-1.695-1.695V30.34a1.695 1.695 0 0 1 1.695-1.695h15.625c7.698 0 12.75 4.17 12.75 10.571 0 4.493-3.4 8.516-7.729 9.22v.235c5.894.646 9.863 4.728 9.863 10.366m-16.508-25.02h-8.96v12.656h7.547c5.834 0 9.05-2.349 9.05-6.548 0-3.935-2.766-6.108-7.637-6.108m-8.96 17.678v13.947h9.29c6.074 0 9.291-2.437 9.291-7.017s-3.307-6.93-9.682-6.93z" clip-rule="evenodd"/></svg>',
  },
  {
    name: "Express",
    category: "framework",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#fff" d="M31.015 61.316v-21.88h1.187v3.442q.21-.23.387-.486a5.88 5.88 0 0 1 5.364-3.328c2.706-.08 4.905.92 6.197 3.328a10.7 10.7 0 0 1 .258 9.808c-1.204 2.699-4.177 4.04-7.36 3.547a5.95 5.95 0 0 1-4.751-3.134v8.7zm1.187-14.14.266 2.57c.469 2.923 2.198 4.651 4.912 4.976a5.58 5.58 0 0 0 6.132-3.547 9.52 9.52 0 0 0-.209-7.82 5.47 5.47 0 0 0-5.76-3.184 5.33 5.33 0 0 0-4.759 3.934 27 27 0 0 0-.582 3.07zm37.499 2.974a6.4 6.4 0 0 1-6.254 5.655c-4.977.25-7.312-3.054-7.683-6.867a11 11 0 0 1 .97-6.06 6.76 6.76 0 0 1 7.036-3.773 6.47 6.47 0 0 1 5.736 4.92 33 33 0 0 1 .557 3.636h-13.07c-.242 3.458 1.616 6.238 4.25 6.908 3.28.807 6.083-.614 7.101-3.733.226-.8.638-.913 1.365-.686zm-12.717-3.596h11.69c-.073-3.683-2.366-6.36-5.478-6.39-3.512-.058-6.06 2.512-6.212 6.39m15.133 3.676h1.146a4.6 4.6 0 0 0 2.698 3.96 7.05 7.05 0 0 0 6.124-.162 2.75 2.75 0 0 0 1.616-2.707 2.496 2.496 0 0 0-1.68-2.496c-1.26-.47-2.602-.728-3.886-1.14a28.5 28.5 0 0 1-3.91-1.43c-2.07-1.01-2.198-4.944.145-6.19a8.25 8.25 0 0 1 7.885-.121 4.15 4.15 0 0 1 2.101 4.234h-.982c0-.047-.09-.089-.09-.137-.121-3.133-2.755-4.113-5.582-3.838a7.1 7.1 0 0 0-2.424.735 2.42 2.42 0 0 0-1.405 2.424 2.42 2.42 0 0 0 1.616 2.278c1.234.453 2.544.744 3.821 1.099l3.086.807a3.645 3.645 0 0 1 2.504 3.288 3.89 3.89 0 0 1-2.092 4.04c-2.698 1.527-7.142 1.123-9.122-.807a5.4 5.4 0 0 1-1.566-3.837zm27.323-6.05h-1.075c0-.146-.057-.286-.073-.397a3.51 3.51 0 0 0-2.86-3.377 7.05 7.05 0 0 0-4.532.219 2.75 2.75 0 0 0-1.996 2.626 2.535 2.535 0 0 0 1.939 2.553l4.912 1.26q.796.192 1.566.477a4.05 4.05 0 0 1 2.677 3.686 4.03 4.03 0 0 1-2.468 3.836 9 9 0 0 1-7.271.073 5.04 5.04 0 0 1-3.038-4.896h1.05a5.89 5.89 0 0 0 8.968 3.75 2.89 2.89 0 0 0 1.55-2.699 2.5 2.5 0 0 0-1.704-2.48c-1.261-.47-2.602-.72-3.886-1.14a29 29 0 0 1-3.934-1.414c-2.02-.994-2.182-4.896.121-6.14a8.14 8.14 0 0 1 8.015-.09 4.23 4.23 0 0 1 2.028 4.145zM29.063 55.41a1.85 1.85 0 0 1-2.295-.872L22.59 48.76l-.605-.807-4.848 6.592a1.776 1.776 0 0 1-2.181.857l6.245-8.378-5.81-7.57a1.93 1.93 0 0 1 2.302.806l4.329 5.848 4.355-5.825a1.737 1.737 0 0 1 2.165-.808l-2.255 2.991-3.054 3.976a.807.807 0 0 0 0 1.203l5.817 7.764zm26.516-16.037v1.14a5.86 5.86 0 0 0-6.238 6.051v8.887h-1.155V39.445h1.14v3.28c1.397-2.393 3.554-3.28 6.26-3.345zM.002 46.92l.509-2.513c1.397-4.969 7.094-7.037 11.013-3.959 2.294 1.802 2.867 4.355 2.755 7.231H1.35c-.209 5.139 3.498 8.241 8.24 6.658a4.94 4.94 0 0 0 3.127-3.483c.25-.807.665-.945 1.422-.712a6.56 6.56 0 0 1-3.135 4.792 7.595 7.595 0 0 1-8.847-1.131 7.96 7.96 0 0 1-1.987-4.67c0-.286-.095-.552-.162-.808Q0 47.607 0 46.92zm1.365-.347h11.69c-.072-3.725-2.423-6.367-5.558-6.392-3.49-.047-5.987 2.537-6.14 6.375z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#000" d="M31.015 61.315V39.437h1.187v3.441q.21-.23.387-.485a5.88 5.88 0 0 1 5.364-3.329c2.706-.08 4.905.921 6.197 3.329a10.7 10.7 0 0 1 .258 9.808c-1.204 2.698-4.177 4.04-7.36 3.547a5.95 5.95 0 0 1-4.751-3.135v8.701zm1.187-14.14.266 2.57c.469 2.924 2.198 4.652 4.912 4.977a5.58 5.58 0 0 0 6.132-3.547 9.52 9.52 0 0 0-.209-7.821 5.47 5.47 0 0 0-5.76-3.184 5.33 5.33 0 0 0-4.759 3.935 27 27 0 0 0-.582 3.07m37.499 2.974a6.4 6.4 0 0 1-6.254 5.656c-4.977.25-7.312-3.054-7.683-6.868a11 11 0 0 1 .97-6.06 6.76 6.76 0 0 1 7.036-3.773 6.47 6.47 0 0 1 5.736 4.92 33 33 0 0 1 .557 3.637h-13.07c-.242 3.458 1.616 6.237 4.25 6.908 3.28.807 6.083-.614 7.101-3.733.226-.8.638-.914 1.365-.687zm-12.717-3.595h11.69c-.073-3.684-2.366-6.36-5.478-6.391-3.512-.057-6.06 2.513-6.212 6.391m15.133 3.676h1.146a4.59 4.59 0 0 0 2.698 3.959 7.06 7.06 0 0 0 6.124-.161 2.75 2.75 0 0 0 1.616-2.707 2.496 2.496 0 0 0-1.68-2.497c-1.26-.469-2.602-.727-3.886-1.14a28.5 28.5 0 0 1-3.91-1.429c-2.07-1.01-2.198-4.944.145-6.19a8.25 8.25 0 0 1 7.885-.121 4.15 4.15 0 0 1 2.101 4.234h-.982c0-.048-.09-.09-.09-.138-.121-3.133-2.755-4.113-5.582-3.837a7.1 7.1 0 0 0-2.424.734 2.42 2.42 0 0 0-1.405 2.424 2.42 2.42 0 0 0 1.616 2.279c1.234.453 2.544.743 3.821 1.098l3.086.807a3.645 3.645 0 0 1 2.504 3.289 3.89 3.89 0 0 1-2.092 4.04c-2.698 1.526-7.142 1.123-9.122-.808a5.4 5.4 0 0 1-1.566-3.837zm27.323-6.051h-1.075c0-.146-.057-.285-.073-.396a3.51 3.51 0 0 0-2.86-3.377 7.05 7.05 0 0 0-4.532.218 2.75 2.75 0 0 0-1.996 2.626 2.535 2.535 0 0 0 1.939 2.553l4.912 1.26q.796.192 1.566.477a4.05 4.05 0 0 1 2.677 3.687 4.03 4.03 0 0 1-2.468 3.835 9 9 0 0 1-7.271.074 5.04 5.04 0 0 1-3.038-4.897h1.05a5.89 5.89 0 0 0 8.968 3.75 2.89 2.89 0 0 0 1.55-2.698 2.5 2.5 0 0 0-1.704-2.481c-1.261-.47-2.602-.719-3.886-1.14a29 29 0 0 1-3.934-1.413c-2.02-.994-2.182-4.896.121-6.14a8.14 8.14 0 0 1 8.015-.09 4.23 4.23 0 0 1 2.028 4.145zm-70.377 11.23a1.85 1.85 0 0 1-2.295-.872L22.59 48.76l-.605-.807-4.848 6.593a1.776 1.776 0 0 1-2.181.856l6.245-8.378-5.81-7.57a1.93 1.93 0 0 1 2.302.807l4.329 5.848 4.355-5.826a1.736 1.736 0 0 1 2.165-.808l-2.255 2.992-3.054 3.975a.81.81 0 0 0 0 1.204l5.817 7.764zm26.516-16.036v1.14a5.86 5.86 0 0 0-6.238 6.05v8.888h-1.155V39.444h1.14v3.28c1.397-2.392 3.554-3.28 6.26-3.344zM.002 46.92l.509-2.514c1.397-4.968 7.094-7.036 11.013-3.958 2.294 1.801 2.867 4.354 2.755 7.231H1.35c-.209 5.138 3.498 8.24 8.24 6.657a4.94 4.94 0 0 0 3.127-3.482c.25-.807.665-.946 1.422-.712a6.56 6.56 0 0 1-3.135 4.791 7.595 7.595 0 0 1-8.847-1.13A7.96 7.96 0 0 1 .17 49.132c0-.285-.095-.551-.162-.807Q0 47.605 0 46.919zm1.365-.348h11.69c-.072-3.724-2.423-6.367-5.558-6.391-3.49-.048-5.987 2.537-6.14 6.375z"/></svg>',
  },
  {
    name: "Laravel",
    category: "framework",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#FF2D20" d="M98.494 22.485q.054.2.054.406v21.335a1.56 1.56 0 0 1-.782 1.349L79.86 55.885v20.433a1.56 1.56 0 0 1-.777 1.35L41.705 99.184c-.085.049-.179.08-.272.113-.035.012-.068.033-.105.043a1.6 1.6 0 0 1-.797 0c-.043-.012-.082-.035-.123-.05-.085-.032-.175-.059-.256-.106L2.782 77.668A1.56 1.56 0 0 1 2 76.318V12.316q.001-.21.055-.409c.011-.044.039-.085.054-.13.03-.082.057-.165.1-.241.028-.05.071-.091.106-.138.045-.062.086-.127.138-.18.045-.046.103-.079.154-.118.056-.046.107-.097.171-.134h.002L21.466.208a1.56 1.56 0 0 1 1.555 0l18.686 10.758h.004c.062.04.115.088.171.133.05.038.107.073.152.116.054.056.093.12.14.183.033.047.078.087.105.138.044.078.07.16.1.241.017.045.044.086.055.132q.054.2.055.407V52.29l15.57-8.966V22.89c0-.136.02-.274.055-.404.014-.047.039-.087.055-.132.03-.082.058-.166.1-.241.03-.05.073-.092.106-.138.046-.063.085-.127.14-.181.044-.045.1-.078.151-.117.059-.047.11-.097.171-.134h.002l18.688-10.759a1.56 1.56 0 0 1 1.556 0l18.686 10.759c.066.039.116.087.174.132.05.04.106.074.15.117.055.056.093.12.14.183.035.046.078.087.105.138.045.076.07.16.101.24.018.046.043.086.055.133m-3.06 20.84v-17.74l-6.54 3.764-9.034 5.201v17.74l15.575-8.965zM76.746 75.418V57.665l-8.885 5.075-25.375 14.482v17.92zM5.115 15.008v60.41L39.372 95.14V77.224L21.476 67.096l-.006-.004-.008-.004c-.06-.035-.11-.086-.167-.128-.049-.04-.105-.07-.148-.113l-.004-.006c-.05-.049-.085-.109-.128-.163-.04-.053-.086-.097-.117-.152l-.002-.006c-.035-.058-.056-.128-.082-.194-.025-.059-.058-.113-.073-.175v-.002c-.02-.074-.024-.152-.032-.228-.007-.058-.023-.116-.023-.175V23.974l-9.032-5.203-6.539-3.76zm17.13-11.654L6.678 12.316l15.565 8.962 15.567-8.964-15.567-8.96zm8.097 55.93 9.032-5.2V15.009l-6.54 3.764-9.033 5.201V63.05zM78.305 13.93l-15.567 8.96 15.567 8.962L93.87 22.89zm-1.558 20.62-9.033-5.201-6.54-3.765v17.741l9.032 5.2 6.541 3.766zm-35.82 39.98 22.834-13.036 11.413-6.514-15.555-8.956-17.91 10.311-16.323 9.398z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#FF2D20" d="M98.494 22.485q.054.2.054.406v21.335a1.56 1.56 0 0 1-.782 1.349L79.86 55.885v20.433a1.56 1.56 0 0 1-.777 1.35L41.705 99.184c-.085.049-.179.08-.272.113-.035.012-.068.033-.105.043a1.6 1.6 0 0 1-.797 0c-.043-.012-.082-.035-.123-.05-.085-.032-.175-.059-.256-.106L2.782 77.668A1.56 1.56 0 0 1 2 76.318V12.316q.001-.21.055-.409c.011-.044.039-.085.054-.13.03-.082.057-.165.1-.241.028-.05.071-.091.106-.138.045-.062.086-.127.138-.18.045-.046.103-.079.154-.118.056-.046.107-.097.171-.134h.002L21.466.208a1.56 1.56 0 0 1 1.555 0l18.686 10.758h.004c.062.04.115.088.171.133.05.038.107.073.152.116.054.056.093.12.14.183.033.047.078.087.105.138.044.078.07.16.1.241.017.045.044.086.055.132q.054.2.055.407V52.29l15.57-8.966V22.89c0-.136.02-.274.055-.404.014-.047.039-.087.055-.132.03-.082.058-.166.1-.241.03-.05.073-.092.106-.138.046-.063.085-.127.14-.181.044-.045.1-.078.151-.117.059-.047.11-.097.171-.134h.002l18.688-10.759a1.56 1.56 0 0 1 1.556 0l18.686 10.759c.066.039.116.087.174.132.05.04.106.074.15.117.055.056.093.12.14.183.035.046.078.087.105.138.045.076.07.16.101.24.018.046.043.086.055.133m-3.06 20.84v-17.74l-6.54 3.764-9.034 5.201v17.74l15.575-8.965zM76.746 75.418V57.665l-8.885 5.075-25.375 14.482v17.92zM5.115 15.008v60.41L39.372 95.14V77.224L21.476 67.096l-.006-.004-.008-.004c-.06-.035-.11-.086-.167-.128-.049-.04-.105-.07-.148-.113l-.004-.006c-.05-.049-.085-.109-.128-.163-.04-.053-.086-.097-.117-.152l-.002-.006c-.035-.058-.056-.128-.082-.194-.025-.059-.058-.113-.073-.175v-.002c-.02-.074-.024-.152-.032-.228-.007-.058-.023-.116-.023-.175V23.974l-9.032-5.203-6.539-3.76zm17.13-11.654L6.678 12.316l15.565 8.962 15.567-8.964-15.567-8.96zm8.097 55.93 9.032-5.2V15.009l-6.54 3.764-9.033 5.201V63.05zM78.305 13.93l-15.567 8.96 15.567 8.962L93.87 22.89zm-1.558 20.62-9.033-5.201-6.54-3.765v17.741l9.032 5.2 6.541 3.766zm-35.82 39.98 22.834-13.036 11.413-6.514-15.555-8.956-17.91 10.311-16.323 9.398z"/></svg>',
  },
  {
    name: "PostgreSQL",
    category: "tool",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#000" d="M98.472 59.902c-.582-1.766-2.105-2.995-4.074-3.29-.929-.14-1.992-.08-3.251.18-2.194.454-3.821.627-5.009.66 4.483-7.59 8.129-16.246 10.227-24.393 3.394-13.175 1.58-19.177-.539-21.892C90.218 3.981 82.036.121 72.166.003c-5.267-.065-9.89.978-12.3 1.728-2.246-.398-4.66-.62-7.193-.66-4.749-.076-8.944.962-12.529 3.095a57 57 0 0 0-8.848-2.227C22.644.514 15.672 1.624 10.57 5.237c-6.175 4.375-9.038 11.975-8.509 22.59.168 3.37 2.048 13.625 5.009 23.35 1.701 5.59 3.515 10.232 5.392 13.798 2.661 5.058 5.51 8.035 8.706 9.105 1.792.599 5.048 1.018 8.472-1.842.434.527 1.013 1.05 1.782 1.537.976.618 2.17 1.122 3.361 1.42 4.296 1.078 8.319.808 11.752-.701.02.612.037 1.197.05 1.702.023.82.046 1.623.076 2.374.203 5.08.548 9.029 1.57 11.792.055.152.13.384.21.63.51 1.564 1.361 4.182 3.529 6.232C54.215 99.35 56.929 100 59.415 100c1.247 0 2.437-.164 3.48-.388 3.72-.8 7.944-2.017 11-6.38 2.889-4.125 4.293-10.337 4.547-20.126l.093-.793.06-.517.68.06.176.012c3.788.173 8.42-.633 11.265-1.958 2.248-1.046 9.452-4.86 7.756-10.008"/><path fill="#336791" d="M91.994 60.903c-11.264 2.33-12.038-1.494-12.038-1.494C91.848 41.713 96.82 19.251 92.53 13.753 80.825-1.243 60.564 5.85 60.226 6.033l-.109.02c-2.225-.463-4.716-.74-7.515-.785-5.096-.084-8.963 1.34-11.896 3.57 0 0-36.145-14.93-34.463 18.78.357 7.17 10.25 54.262 22.05 40.039 4.313-5.202 8.48-9.6 8.48-9.6 2.07 1.38 4.547 2.082 7.145 1.83l.202-.172c-.063.646-.034 1.277.08 2.025-3.04 3.406-2.146 4.004-8.223 5.258-6.149 1.271-2.537 3.533-.178 4.125 2.859.717 9.474 1.732 13.943-4.542l-.178.716c1.19.957 2.027 6.222 1.887 10.996-.14 4.773-.234 8.05.704 10.61.94 2.56 1.874 8.32 9.863 6.604 6.674-1.435 10.134-5.152 10.615-11.353.341-4.407 1.114-3.756 1.163-7.697l.62-1.865c.715-5.976.113-7.904 4.225-7.007l1 .088c3.027.138 6.988-.488 9.313-1.572 5.007-2.33 7.976-6.22 3.04-5.198"/><path fill="#fff" d="M42.821 30.825c-1.015-.142-1.934-.011-2.4.342a.88.88 0 0 0-.364.587c-.058.42.235.884.416 1.123.51.678 1.254 1.143 1.991 1.246q.16.022.319.022c1.229 0 2.347-.96 2.445-1.668.123-.887-1.161-1.479-2.407-1.652m33.627.028c-.097-.696-1.33-.894-2.502-.73-1.17.162-2.303.692-2.209 1.389.076.542 1.052 1.467 2.207 1.467q.147 0 .296-.02c.77-.108 1.337-.599 1.606-.882.409-.431.646-.912.602-1.224"/><path fill="#fff" d="M95.743 60.639c-.43-1.303-1.812-1.721-4.11-1.246-6.818 1.411-9.26.434-10.062-.158 5.3-8.098 9.66-17.886 12.013-27.018 1.114-4.326 1.73-8.343 1.78-11.618.056-3.594-.555-6.235-1.814-7.848-5.076-6.505-12.526-9.993-21.544-10.09-6.2-.069-11.438 1.522-12.453 1.97a31 31 0 0 0-7.008-.903c-4.654-.076-8.677 1.042-12.008 3.32a53.5 53.5 0 0 0-9.758-2.566c-7.905-1.277-14.187-.31-18.67 2.875-5.35 3.8-7.819 10.593-7.34 20.19.16 3.229 1.995 13.161 4.89 22.673 3.811 12.52 7.954 19.607 12.313 21.065.51.17 1.098.29 1.747.29 1.59 0 3.54-.719 5.568-3.164a201 201 0 0 1 7.674-8.707 12.34 12.34 0 0 0 5.52 1.489l.014.151q-.498.594-.974 1.206c-1.334 1.698-1.611 2.052-5.905 2.938-1.222.253-4.466.923-4.513 3.204-.052 2.491 3.835 3.538 4.277 3.648 1.543.388 3.03.579 4.448.579 3.447 0 6.482-1.136 8.906-3.335-.074 8.882.295 17.634 1.358 20.3.872 2.183 3 7.519 9.72 7.518.987 0 2.073-.115 3.267-.372 7.015-1.508 10.06-4.617 11.24-11.47.63-3.664 1.712-12.411 2.22-17.103 1.075.336 2.458.49 3.953.49 3.118 0 6.715-.665 8.972-1.715 2.534-1.18 7.108-4.077 6.279-6.593M79.037 28.933c-.023 1.385-.213 2.643-.414 3.956-.217 1.411-.442 2.87-.498 4.642-.056 1.725.159 3.517.367 5.251.42 3.502.85 7.107-.817 10.664q-.415-.739-.739-1.522c-.207-.504-.657-1.313-1.28-2.433-2.423-4.358-8.099-14.565-5.193-18.73.865-1.24 3.061-2.514 8.574-1.828M72.355 5.467c8.08.179 14.472 3.21 18.997 9.009 3.47 4.447-.351 24.686-11.416 42.145l-.335-.424-.14-.175c2.859-4.735 2.3-9.42 1.802-13.574-.204-1.704-.397-3.314-.348-4.827.05-1.602.262-2.977.466-4.306.252-1.638.507-3.333.437-5.332.052-.21.074-.457.046-.75-.18-1.917-2.362-7.652-6.808-12.842-2.432-2.839-5.98-6.016-10.822-8.159 2.083-.433 4.931-.836 8.12-.765M27.14 66.622c-2.234 2.694-3.777 2.177-4.285 2.008-3.306-1.106-7.143-8.114-10.526-19.227-2.927-9.615-4.637-19.285-4.773-21.996-.427-8.575 1.646-14.551 6.162-17.763 7.349-5.226 19.432-2.098 24.287-.511-.07.069-.142.133-.211.203-7.968 8.069-7.779 21.854-7.759 22.697 0 .325.026.785.064 1.418.137 2.319.392 6.634-.29 11.521-.633 4.541.763 8.986 3.83 12.195q.472.494.991.937a205 205 0 0 0-7.49 8.518m8.514-11.391c-2.472-2.587-3.594-6.184-3.08-9.872.72-5.162.454-9.658.311-12.073-.02-.338-.038-.635-.048-.868 1.164-1.035 6.558-3.933 10.404-3.05 1.755.404 2.825 1.603 3.27 3.664 2.301 10.674.304 15.122-1.3 18.697-.33.737-.643 1.433-.91 2.153l-.207.557c-.523 1.407-1.01 2.716-1.312 3.959-2.628-.008-5.184-1.134-7.128-3.168m.403 14.394c-.767-.192-1.457-.526-1.862-.803.338-.16.94-.377 1.984-.593 5.051-1.042 5.832-1.778 7.535-3.947a33 33 0 0 1 1.447-1.748c.914-1.026 1.331-.852 2.089-.537.614.254 1.212 1.026 1.454 1.875.115.401.244 1.163-.178 1.755-3.558 4.997-8.744 4.933-12.469 3.998m26.437 24.668c-6.18 1.328-8.368-1.834-9.81-5.448-.93-2.334-1.388-12.856-1.063-24.477a1.4 1.4 0 0 0-.06-.444 6 6 0 0 0-.173-.821c-.483-1.691-1.659-3.106-3.07-3.692-.56-.233-1.589-.66-2.825-.343.264-1.09.72-2.32 1.216-3.651l.208-.56c.234-.632.528-1.287.839-1.98 1.679-3.74 3.978-8.863 1.483-20.436-.935-4.335-4.057-6.452-8.789-5.96-2.837.294-5.432 1.442-6.727 2.1q-.416.212-.77.41c.36-4.367 1.726-12.53 6.832-17.694C43 8.046 47.282 6.44 52.5 6.527c10.28.168 16.871 5.458 20.591 9.866 3.206 3.799 4.942 7.625 5.635 9.69-5.21-.532-8.753.499-10.55 3.074-3.907 5.601 2.138 16.473 5.044 21.698.532.957.992 1.785 1.137 2.136.946 2.3 2.171 3.835 3.065 4.955.274.343.54.677.743.967-1.578.457-4.413 1.51-4.154 6.779-.209 2.643-1.69 15.02-2.442 19.392-.994 5.776-3.114 7.928-9.074 9.21m25.794-29.6c-1.613.751-4.313 1.315-6.878 1.436-2.833.133-4.275-.319-4.615-.596-.159-3.283 1.06-3.626 2.35-3.99.202-.056.4-.112.59-.179q.178.146.391.287c2.277 1.507 6.339 1.67 12.073.483l.063-.013c-.774.726-2.097 1.699-3.974 2.572"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#000" d="M98.472 59.902c-.582-1.766-2.105-2.995-4.074-3.29-.929-.14-1.992-.08-3.251.18-2.194.454-3.821.627-5.009.66 4.483-7.59 8.129-16.246 10.227-24.393 3.394-13.175 1.58-19.177-.539-21.892C90.218 3.981 82.036.121 72.166.003c-5.267-.065-9.89.978-12.3 1.728-2.246-.398-4.66-.62-7.193-.66-4.749-.076-8.944.962-12.529 3.095a57 57 0 0 0-8.848-2.227C22.644.514 15.672 1.624 10.57 5.237c-6.175 4.375-9.038 11.975-8.509 22.59.168 3.37 2.048 13.625 5.009 23.35 1.701 5.59 3.515 10.232 5.392 13.798 2.661 5.058 5.51 8.035 8.706 9.105 1.792.599 5.048 1.018 8.472-1.842.434.527 1.013 1.05 1.782 1.537.976.618 2.17 1.122 3.361 1.42 4.296 1.078 8.319.808 11.752-.701.02.612.037 1.197.05 1.702.023.82.046 1.623.076 2.374.203 5.08.548 9.029 1.57 11.792.055.152.13.384.21.63.51 1.564 1.361 4.182 3.529 6.232C54.215 99.35 56.929 100 59.415 100c1.247 0 2.437-.164 3.48-.388 3.72-.8 7.944-2.017 11-6.38 2.889-4.125 4.293-10.337 4.547-20.126l.093-.793.06-.517.68.06.176.012c3.788.173 8.42-.633 11.265-1.958 2.248-1.046 9.452-4.86 7.756-10.008"/><path fill="#336791" d="M91.994 60.903c-11.264 2.33-12.038-1.494-12.038-1.494C91.848 41.713 96.82 19.251 92.53 13.753 80.825-1.243 60.564 5.85 60.226 6.033l-.109.02c-2.225-.463-4.716-.74-7.515-.785-5.096-.084-8.963 1.34-11.896 3.57 0 0-36.145-14.93-34.463 18.78.357 7.17 10.25 54.262 22.05 40.039 4.313-5.202 8.48-9.6 8.48-9.6 2.07 1.38 4.547 2.082 7.145 1.83l.202-.172c-.063.646-.034 1.277.08 2.025-3.04 3.406-2.146 4.004-8.223 5.258-6.149 1.271-2.537 3.533-.178 4.125 2.859.717 9.474 1.732 13.943-4.542l-.178.716c1.19.957 2.027 6.222 1.887 10.996-.14 4.773-.234 8.05.704 10.61.94 2.56 1.874 8.32 9.863 6.604 6.674-1.435 10.134-5.152 10.615-11.353.341-4.407 1.114-3.756 1.163-7.697l.62-1.865c.715-5.976.113-7.904 4.225-7.007l1 .088c3.027.138 6.988-.488 9.313-1.572 5.007-2.33 7.976-6.22 3.04-5.198"/><path fill="#fff" d="M42.821 30.825c-1.015-.142-1.934-.011-2.4.342a.88.88 0 0 0-.364.587c-.058.42.235.884.416 1.123.51.678 1.254 1.143 1.991 1.246q.16.022.319.022c1.229 0 2.347-.96 2.445-1.668.123-.887-1.161-1.479-2.407-1.652m33.627.028c-.097-.696-1.33-.894-2.502-.73-1.17.162-2.303.692-2.209 1.389.076.542 1.052 1.467 2.207 1.467q.147 0 .296-.02c.77-.108 1.337-.599 1.606-.882.409-.431.646-.912.602-1.224"/><path fill="#fff" d="M95.743 60.639c-.43-1.303-1.812-1.721-4.11-1.246-6.818 1.411-9.26.434-10.062-.158 5.3-8.098 9.66-17.886 12.013-27.018 1.114-4.326 1.73-8.343 1.78-11.618.056-3.594-.555-6.235-1.814-7.848-5.076-6.505-12.526-9.993-21.544-10.09-6.2-.069-11.438 1.522-12.453 1.97a31 31 0 0 0-7.008-.903c-4.654-.076-8.677 1.042-12.008 3.32a53.5 53.5 0 0 0-9.758-2.566c-7.905-1.277-14.187-.31-18.67 2.875-5.35 3.8-7.819 10.593-7.34 20.19.16 3.229 1.995 13.161 4.89 22.673 3.811 12.52 7.954 19.607 12.313 21.065.51.17 1.098.29 1.747.29 1.59 0 3.54-.719 5.568-3.164a201 201 0 0 1 7.674-8.707 12.34 12.34 0 0 0 5.52 1.489l.014.151q-.498.594-.974 1.206c-1.334 1.698-1.611 2.052-5.905 2.938-1.222.253-4.466.923-4.513 3.204-.052 2.491 3.835 3.538 4.277 3.648 1.543.388 3.03.579 4.448.579 3.447 0 6.482-1.136 8.906-3.335-.074 8.882.295 17.634 1.358 20.3.872 2.183 3 7.519 9.72 7.518.987 0 2.073-.115 3.267-.372 7.015-1.508 10.06-4.617 11.24-11.47.63-3.664 1.712-12.411 2.22-17.103 1.075.336 2.458.49 3.953.49 3.118 0 6.715-.665 8.972-1.715 2.534-1.18 7.108-4.077 6.279-6.593M79.037 28.933c-.023 1.385-.213 2.643-.414 3.956-.217 1.411-.442 2.87-.498 4.642-.056 1.725.159 3.517.367 5.251.42 3.502.85 7.107-.817 10.664q-.415-.739-.739-1.522c-.207-.504-.657-1.313-1.28-2.433-2.423-4.358-8.099-14.565-5.193-18.73.865-1.24 3.061-2.514 8.574-1.828M72.355 5.467c8.08.179 14.472 3.21 18.997 9.009 3.47 4.447-.351 24.686-11.416 42.145l-.335-.424-.14-.175c2.859-4.735 2.3-9.42 1.802-13.574-.204-1.704-.397-3.314-.348-4.827.05-1.602.262-2.977.466-4.306.252-1.638.507-3.333.437-5.332.052-.21.074-.457.046-.75-.18-1.917-2.362-7.652-6.808-12.842-2.432-2.839-5.98-6.016-10.822-8.159 2.083-.433 4.931-.836 8.12-.765M27.14 66.622c-2.234 2.694-3.777 2.177-4.285 2.008-3.306-1.106-7.143-8.114-10.526-19.227-2.927-9.615-4.637-19.285-4.773-21.996-.427-8.575 1.646-14.551 6.162-17.763 7.349-5.226 19.432-2.098 24.287-.511-.07.069-.142.133-.211.203-7.968 8.069-7.779 21.854-7.759 22.697 0 .325.026.785.064 1.418.137 2.319.392 6.634-.29 11.521-.633 4.541.763 8.986 3.83 12.195q.472.494.991.937a205 205 0 0 0-7.49 8.518m8.514-11.391c-2.472-2.587-3.594-6.184-3.08-9.872.72-5.162.454-9.658.311-12.073-.02-.338-.038-.635-.048-.868 1.164-1.035 6.558-3.933 10.404-3.05 1.755.404 2.825 1.603 3.27 3.664 2.301 10.674.304 15.122-1.3 18.697-.33.737-.643 1.433-.91 2.153l-.207.557c-.523 1.407-1.01 2.716-1.312 3.959-2.628-.008-5.184-1.134-7.128-3.168m.403 14.394c-.767-.192-1.457-.526-1.862-.803.338-.16.94-.377 1.984-.593 5.051-1.042 5.832-1.778 7.535-3.947a33 33 0 0 1 1.447-1.748c.914-1.026 1.331-.852 2.089-.537.614.254 1.212 1.026 1.454 1.875.115.401.244 1.163-.178 1.755-3.558 4.997-8.744 4.933-12.469 3.998m26.437 24.668c-6.18 1.328-8.368-1.834-9.81-5.448-.93-2.334-1.388-12.856-1.063-24.477a1.4 1.4 0 0 0-.06-.444 6 6 0 0 0-.173-.821c-.483-1.691-1.659-3.106-3.07-3.692-.56-.233-1.589-.66-2.825-.343.264-1.09.72-2.32 1.216-3.651l.208-.56c.234-.632.528-1.287.839-1.98 1.679-3.74 3.978-8.863 1.483-20.436-.935-4.335-4.057-6.452-8.789-5.96-2.837.294-5.432 1.442-6.727 2.1q-.416.212-.77.41c.36-4.367 1.726-12.53 6.832-17.694C43 8.046 47.282 6.44 52.5 6.527c10.28.168 16.871 5.458 20.591 9.866 3.206 3.799 4.942 7.625 5.635 9.69-5.21-.532-8.753.499-10.55 3.074-3.907 5.601 2.138 16.473 5.044 21.698.532.957.992 1.785 1.137 2.136.946 2.3 2.171 3.835 3.065 4.955.274.343.54.677.743.967-1.578.457-4.413 1.51-4.154 6.779-.209 2.643-1.69 15.02-2.442 19.392-.994 5.776-3.114 7.928-9.074 9.21m25.794-29.6c-1.613.751-4.313 1.315-6.878 1.436-2.833.133-4.275-.319-4.615-.596-.159-3.283 1.06-3.626 2.35-3.99.202-.056.4-.112.59-.179q.178.146.391.287c2.277 1.507 6.339 1.67 12.073.483l.063-.013c-.774.726-2.097 1.699-3.974 2.572"/></svg>',
  },
  {
    name: "MongoDB",
    category: "tool",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#599636" d="m50.146.273 2.668 5.012c.6.925 1.25 1.744 2.016 2.506a70 70 0 0 1 6.262 7.08c4.521 5.938 7.57 12.531 9.749 19.662 1.306 4.356 2.015 8.824 2.069 13.343.218 13.508-4.413 25.107-13.75 34.747a40 40 0 0 1-4.905 4.194c-.925 0-1.363-.71-1.744-1.363a11.2 11.2 0 0 1-1.362-3.921c-.328-1.635-.544-3.269-.438-4.956v-.763c-.075-.162-.89-75.157-.566-75.541"/><path fill="#6CAC48" d="M50.146.108c-.11-.22-.22-.054-.329.053.053 1.093-.328 2.068-.925 3-.656.924-1.524 1.634-2.396 2.396-4.844 4.194-8.656 9.259-11.709 14.924-4.062 7.624-6.156 15.796-6.75 24.398-.271 3.103.982 14.052 1.96 17.211 2.669 8.387 7.462 15.415 13.67 21.515 1.526 1.468 3.157 2.83 4.844 4.14.49 0 .544-.438.656-.763a15 15 0 0 0 .491-2.124l1.094-8.169z"/><path fill="#C2BFBF" d="M52.814 90.135c.11-1.25.71-2.287 1.362-3.321-.656-.272-1.143-.813-1.524-1.416-.33-.57-.601-1.173-.813-1.797-.762-2.287-.925-4.687-1.143-7.024V75.16c-.272.22-.329 2.069-.329 2.344a54 54 0 0 1-.98 7.353c-.163.98-.273 1.959-.876 2.83 0 .11 0 .22.053.382.981 2.887 1.25 5.827 1.416 8.824v1.094c0 1.306-.053 1.03 1.031 1.468.438.163.925.22 1.362.544.329 0 .382-.272.382-.49l-.163-1.797V92.7c-.053-.875.11-1.744.219-2.563z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#599636" d="m50.146.273 2.668 5.012c.6.925 1.25 1.744 2.016 2.506a70 70 0 0 1 6.262 7.08c4.521 5.938 7.57 12.531 9.749 19.662 1.306 4.356 2.015 8.824 2.069 13.343.218 13.508-4.413 25.107-13.75 34.747a40 40 0 0 1-4.905 4.194c-.925 0-1.363-.71-1.744-1.363a11.2 11.2 0 0 1-1.362-3.921c-.328-1.635-.544-3.269-.438-4.956v-.763c-.075-.162-.89-75.157-.566-75.541"/><path fill="#6CAC48" d="M50.146.108c-.11-.22-.22-.054-.329.053.053 1.093-.328 2.068-.925 3-.656.924-1.524 1.634-2.396 2.396-4.844 4.194-8.656 9.259-11.709 14.924-4.062 7.624-6.156 15.796-6.75 24.398-.271 3.103.982 14.052 1.96 17.211 2.669 8.387 7.462 15.415 13.67 21.515 1.526 1.468 3.157 2.83 4.844 4.14.49 0 .544-.438.656-.763a15 15 0 0 0 .491-2.124l1.094-8.169z"/><path fill="#C2BFBF" d="M52.814 90.135c.11-1.25.71-2.287 1.362-3.321-.656-.272-1.143-.813-1.524-1.416-.33-.57-.601-1.173-.813-1.797-.762-2.287-.925-4.687-1.143-7.024V75.16c-.272.22-.329 2.069-.329 2.344a54 54 0 0 1-.98 7.353c-.163.98-.273 1.959-.876 2.83 0 .11 0 .22.053.382.981 2.887 1.25 5.827 1.416 8.824v1.094c0 1.306-.053 1.03 1.031 1.468.438.163.925.22 1.362.544.329 0 .382-.272.382-.49l-.163-1.797V92.7c-.053-.875.11-1.744.219-2.563z"/></svg>',
  },
  {
    name: "Git",
    category: "tool",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#DE4C36" d="M98.114 45.544 54.454 1.886a6.44 6.44 0 0 0-9.108 0l-9.066 9.066 11.5 11.501a7.65 7.65 0 0 1 7.869 1.834 7.66 7.66 0 0 1 1.817 7.916L68.55 43.287c2.682-.923 5.776-.326 7.918 1.82a7.66 7.66 0 0 1 0 10.836 7.662 7.662 0 0 1-12.508-8.335L53.623 37.271v27.202a7.663 7.663 0 0 1 2.026 12.288 7.66 7.66 0 0 1-10.836 0 7.663 7.663 0 0 1 2.508-12.51V36.795a7.6 7.6 0 0 1-2.508-1.672 7.66 7.66 0 0 1-1.651-8.377l-11.338-11.34L1.887 45.344a6.44 6.44 0 0 0 0 9.11l43.661 43.659a6.44 6.44 0 0 0 9.108 0l43.458-43.457a6.444 6.444 0 0 0 0-9.11"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#DE4C36" d="M98.114 45.544 54.454 1.886a6.44 6.44 0 0 0-9.108 0l-9.066 9.066 11.5 11.501a7.65 7.65 0 0 1 7.869 1.834 7.66 7.66 0 0 1 1.817 7.916L68.55 43.287c2.682-.923 5.776-.326 7.918 1.82a7.66 7.66 0 0 1 0 10.836 7.662 7.662 0 0 1-12.508-8.335L53.623 37.271v27.202a7.663 7.663 0 0 1 2.026 12.288 7.66 7.66 0 0 1-10.836 0 7.663 7.663 0 0 1 2.508-12.51V36.795a7.6 7.6 0 0 1-2.508-1.672 7.66 7.66 0 0 1-1.651-8.377l-11.338-11.34L1.887 45.344a6.44 6.44 0 0 0 0 9.11l43.661 43.659a6.44 6.44 0 0 0 9.108 0l43.458-43.457a6.444 6.444 0 0 0 0-9.11"/></svg>',
  },
  {
    name: "GitHub",
    category: "tool",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#fff" d="M50 1C22.39 1 0 23.386 0 51c0 22.092 14.326 40.834 34.193 47.446 2.499.462 3.416-1.085 3.416-2.406 0-1.192-.046-5.131-.067-9.309-13.91 3.025-16.846-5.9-16.846-5.9-2.274-5.779-5.552-7.315-5.552-7.315-4.536-3.104.342-3.04.342-3.04 5.021.353 7.665 5.153 7.665 5.153 4.46 7.644 11.697 5.434 14.55 4.156.449-3.232 1.745-5.437 3.175-6.686-11.106-1.264-22.78-5.552-22.78-24.71 0-5.459 1.953-9.92 5.151-13.42-.519-1.26-2.23-6.346.485-13.233 0 0 4.198-1.344 13.753 5.125 3.988-1.108 8.266-1.663 12.515-1.682 4.25.019 8.53.574 12.526 1.682 9.543-6.469 13.736-5.125 13.736-5.125 2.722 6.887 1.01 11.973.49 13.232 3.206 3.502 5.146 7.962 5.146 13.42 0 19.205-11.697 23.434-22.83 24.671 1.793 1.552 3.39 4.595 3.39 9.26 0 6.69-.057 12.074-.057 13.721 0 1.33.9 2.89 3.434 2.399C85.691 91.819 100 73.085 100 51c0-27.614-22.386-50-50-50"/><path fill="#fff" d="M18.727 72.227c-.11.248-.502.322-.857.152-.363-.163-.567-.502-.45-.751.108-.256.5-.327.862-.156.363.163.57.505.445.755m2.459 2.194c-.238.221-.705.118-1.021-.231-.327-.349-.388-.814-.146-1.04.245-.22.698-.117 1.025.232.328.353.391.816.142 1.04zm1.687 2.808c-.306.213-.807.013-1.117-.432-.306-.444-.306-.977.007-1.191.31-.214.804-.021 1.117.42.306.452.306.985-.007 1.203m2.854 3.252c-.274.302-.858.22-1.285-.192-.437-.403-.56-.975-.284-1.277.277-.303.864-.218 1.294.191.435.403.567.979.275 1.278m3.687 1.098c-.12.391-.682.57-1.249.403-.565-.171-.935-.63-.821-1.026.117-.394.682-.58 1.253-.401.564.17.935.625.818 1.024m4.198.465c.014.413-.466.755-1.06.762-.599.013-1.082-.32-1.089-.726 0-.416.47-.755 1.067-.765.595-.012 1.082.32 1.082.73m4.123-.158c.071.403-.342.816-.932.926-.58.106-1.118-.143-1.192-.541-.072-.413.349-.826.928-.933.591-.103 1.12.14 1.196.548"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#161614" d="M50 1C22.39 1 0 23.386 0 51c0 22.092 14.327 40.834 34.193 47.446 2.499.462 3.417-1.085 3.417-2.406 0-1.192-.047-5.131-.068-9.309-13.91 3.025-16.846-5.9-16.846-5.9-2.274-5.779-5.551-7.315-5.551-7.315-4.537-3.104.341-3.04.341-3.04 5.022.353 7.665 5.153 7.665 5.153 4.46 7.644 11.697 5.434 14.55 4.156.449-3.232 1.745-5.437 3.175-6.686-11.106-1.264-22.78-5.552-22.78-24.71 0-5.459 1.953-9.92 5.151-13.42-.519-1.26-2.23-6.346.485-13.233 0 0 4.198-1.344 13.753 5.125 3.988-1.108 8.266-1.663 12.515-1.682 4.25.019 8.53.574 12.526 1.682 9.544-6.469 13.736-5.125 13.736-5.125 2.722 6.887 1.01 11.973.49 13.232 3.206 3.502 5.146 7.962 5.146 13.42 0 19.205-11.697 23.434-22.83 24.671 1.793 1.552 3.391 4.595 3.391 9.26 0 6.69-.058 12.074-.058 13.721 0 1.33.9 2.89 3.435 2.399C85.692 91.819 100 73.085 100 51c0-27.614-22.386-50-50-50"/><path fill="#161614" d="M18.727 72.227c-.11.248-.502.322-.857.152-.363-.163-.567-.502-.45-.751.109-.256.5-.327.862-.156.363.163.57.505.445.755m2.46 2.194c-.24.221-.706.118-1.022-.231-.327-.349-.388-.814-.146-1.04.246-.22.698-.117 1.026.232.327.353.39.816.14 1.04zm1.687 2.808c-.307.213-.808.013-1.118-.432-.306-.444-.306-.977.007-1.191.31-.214.804-.021 1.118.42.305.452.305.985-.008 1.203m2.853 3.252c-.274.302-.858.22-1.285-.192-.437-.403-.56-.975-.284-1.277.277-.303.864-.218 1.295.191.434.403.566.979.274 1.278m3.688 1.098c-.12.391-.683.57-1.25.403-.565-.171-.935-.63-.821-1.026.118-.394.682-.58 1.253-.401.565.17.936.625.818 1.024m4.197.465c.014.413-.466.755-1.06.762-.599.013-1.082-.32-1.088-.726 0-.416.469-.755 1.067-.765.594-.012 1.081.32 1.081.73m4.123-.158c.071.403-.342.816-.932.926-.58.106-1.118-.143-1.192-.541-.072-.413.35-.826.928-.933.592-.103 1.12.14 1.196.548"/></svg>',
  },
  {
    name: "GitLab",
    category: "tool",
    logoDark:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#E24329" d="m50 96.118 18.413-56.67H31.587z"/><path fill="#FC6D26" d="M50 96.117 31.587 39.448H5.782z"/><path fill="#FCA326" d="M5.782 39.448.186 56.67a3.81 3.81 0 0 0 1.385 4.262L50 96.117z"/><path fill="#E24329" d="M5.782 39.449h25.805L20.497 5.317c-.57-1.756-3.055-1.756-3.625 0z"/><path fill="#FC6D26" d="m50 96.117 18.413-56.669h25.805z"/><path fill="#FCA326" d="m94.218 39.448 5.595 17.222a3.81 3.81 0 0 1-1.385 4.262L50 96.117z"/><path fill="#E24329" d="M94.218 39.449H68.413l11.09-34.132c.57-1.756 3.055-1.756 3.625 0z"/></svg>',
    logoLight:
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#E24329" d="m50 96.118 18.413-56.67H31.587z"/><path fill="#FC6D26" d="M50 96.117 31.587 39.448H5.782z"/><path fill="#FCA326" d="M5.782 39.448.186 56.67a3.81 3.81 0 0 0 1.385 4.262L50 96.117z"/><path fill="#E24329" d="M5.782 39.449h25.805L20.497 5.317c-.57-1.756-3.055-1.756-3.625 0z"/><path fill="#FC6D26" d="m50 96.117 18.413-56.669h25.805z"/><path fill="#FCA326" d="m94.218 39.448 5.595 17.222a3.81 3.81 0 0 1-1.385 4.262L50 96.117z"/><path fill="#E24329" d="M94.218 39.449H68.413l11.09-34.132c.57-1.756 3.055-1.756 3.625 0z"/></svg>',
  },
];

export const experiences: Experience[] = [
  {
    company: "Brainware of SMANSA (BIoS)",
    logo: "/img/biossmansa.png",
    role: t("Head of Programming Division", "Kepala Divisi Programming"),
    period: "2022 — 2023",
    summary: t(
      "Led SMANSA’s computer club—built training tracks, ran competitions, and kept the community active.",
      "Memimpin klub komputer SMANSA—menyusun jalur latihan, mengadakan kompetisi, dan menjaga komunitas tetap aktif."
    ),
    stack: ["Leadership", "Curriculum Design", "C/C++", "Community"],
    achievements: [
      t(
        "Designed multi-level programming bootcamps so newcomers and seniors each had a track.",
        "Menyusun bootcamp bertahap sehingga anggota baru maupun senior punya jalur belajar."
      ),
      t(
        "Hosted showcases and talks to build interest in product building and problem solving.",
        "Mengadakan showcase dan sesi berbagi untuk menumbuhkan minat membangun produk dan problem solving."
      ),
      t(
        "Mentored juniors for NOI/OSN so their algorithm foundations stick.",
        "Mementori junior jelang NOI/OSN agar fondasi algoritmanya mantap."
      ),
    ],
  },
  {
    company: "Independent Competitive Programming Journey",
    logo: "/img/codeforces.webp",
    role: t("Problem Solver & Coach", "Problem Solver & Coach"),
    period: "2021 — Sekarang",
    summary: t(
      "Solving problems on TLX, LeetCode, Codeforces, then turning the lessons into mentoring sessions.",
      "Menyelesaikan soal di TLX, LeetCode, Codeforces, lalu menerjemahkan pelajarannya ke sesi mentoring."
    ),
    stack: ["C++", "Python", "TLX", "LeetCode", "Codeforces"],
    achievements: [
      t(
        "300+ problems solved with notes and templates reused by peers.",
        "300+ soal terselesaikan dengan catatan & template yang dipakai ulang."
      ),
      t(
        "Created visual aids to explain tricky DS/Algo concepts to friends.",
        "Membuat visualisasi untuk menjelaskan konsep DS/Algo yang sulit."
      ),
      t(
        "Hosted sharing sessions and micro-challenges for classmates.",
        "Mengadakan sharing session dan micro-challenge untuk teman sekelas."
      ),
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Politeknik Negeri Bandung",
    logo: "/img/polban.png",
    program: t("D3 Informatics Engineering", "D3 Teknik Informatika"),
    period: "2022 — Sekarang",
    details: [
      t(
        "Focusing on distributed systems, databases, and software engineering foundations.",
        "Fokus pada sistem terdistribusi, database, dan dasar software engineering."
      ),
      t(
        "Merit scholarship recipient and OSN Informatics finalist.",
        "Penerima beasiswa prestasi akademik dan finalis OSN Informatika."
      ),
      t(
        "Coordinator for the Competitive Programming & System Design lab.",
        "Koordinator lab Competitive Programming & System Design di kampus."
      ),
    ],
  },
  {
    institution: "SMA Negeri 1 Subang",
    logo: "/img/smansa.png",
    program: t(
      "Mathematics & Natural Sciences",
      "Matematika & Ilmu Pengetahuan Alam"
    ),
    period: "2021 — 2024",
    details: [
      t(
        "Started as member, later led Brainware of SMANSA.",
        "Mulai sebagai anggota, lalu memimpin Brainware of SMANSA."
      ),
      t(
        "Represented school in OSN Informatics and programming showcases.",
        "Mewakili sekolah di OSN Informatika dan showcase programming."
      ),
    ],
  },
];

export const achievements: Achievement[] = [
  {
    type: "competitions",
    title: t(
      "Indonesia National Contest 2025 (ICPC Indonesia)",
      "Indonesia National Contest 2025 (ICPC Indonesia)"
    ),
    issuer: t(
      "ICPC Indonesia · BINUS University",
      "ICPC Indonesia · BINUS University"
    ),
    date: "2025",
    highlight: t(
      "Ranked · 55th · Qualified to ICPC Asia · Honorable Mention",
      "Ranked · Peringkat 55 · Lolos ke ICPC Asia · Honorable Mention"
    ),
    link: "https://icpc.global/",
  },
  {
    type: "competitions",
    title: t(
      "ICPC Asia Jakarta Regional Contest 2025",
      "ICPC Asia Jakarta Regional Contest 2025"
    ),
    issuer: t(
      "ICPC Foundation · BINUS University",
      "ICPC Foundation · BINUS University"
    ),
    date: "2025",
    highlight: t(
      "Ranked · 45th · Honorable Mention",
      "Ranked · Peringkat 45 · Honorable Mention"
    ),
    link: "https://icpc.global/",
  },
  {
    type: "competitions",
    title: t("NOI in Informatics 2022", "OSN Informatika 2022"),
    issuer: t(
      "National Achievement Center (Puspresnas)",
      "Pusat Prestasi Nasional (Puspresnas)"
    ),
    date: "2022",
    highlight: t(
      "District Champion · Provincial Contestant",
      "Juara Kabupaten · Peserta Provinsi"
    ),
    link: "https://puspresnas.kemdikbud.go.id/",
  },
  {
    type: "competitions",
    title: t("NOI in Informatics 2023", "OSN Informatika 2023"),
    issuer: t(
      "National Achievement Center (Puspresnas)",
      "Pusat Prestasi Nasional (Puspresnas)"
    ),
    date: "2023",
    highlight: t("District Contestant", "Peserta Kabupaten"),
    link: "https://puspresnas.kemdikbud.go.id/",
  },
  {
    type: "certifications",
    title: t("Fundamental C++ Programming", "Belajar Dasar Pemrograman C++"),
    issuer: t("Dicoding Indonesia", "Dicoding Indonesia"),
    date: "2024",
    highlight: t("Official Certificate", "Sertifikat Resmi"),
    link: "https://www.dicoding.com/certificates/cpp-basic",
  },
  {
    type: "certifications",
    title: t("Database Design & SQL", "Database Design & SQL"),
    issuer: t("Udemy", "Udemy"),
    date: "2024",
    highlight: t("Completion", "Sertifikasi"),
    link: "https://example.com/sql-cert",
  },
  {
    type: "bootcamps",
    title: t("Brainware Internal Training", "Bootcamp Internal Brainware"),
    issuer: t("Brainware of SMANSA", "Brainware of SMANSA"),
    date: "2022 — 2023",
    highlight: t("Instructor & mentor", "Instruktur & mentor"),
    link: "https://www.instagram.com/brainwareofsmansa/",
  },
];

export const achievementTabs: AchievementTab[] = [
  { id: "competitions", name: t("Competitions", "Kompetisi") },
  { id: "certifications", name: t("Certifications", "Sertifikasi") },
  { id: "bootcamps", name: t("Bootcamps & Courses", "Bootcamp & Kursus") },
];

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

export const contact: Contact = {
  email: "talktorief@gmail.com",
  phone: "+62 812-0000-0000",
  message: t(
    "Have an idea or tricky problem? Let’s discuss and ship a solid solution.",
    "Punya ide atau masalah sulit? Yuk diskusikan dan eksekusi solusinya."
  ),
  availabilityNote: t(
    "I usually reply within 1–2 business days. Happy to jump on a quick call if needed.",
    "Biasanya membalas dalam 1–2 hari kerja. Siap untuk panggilan singkat jika perlu."
  ),
};
