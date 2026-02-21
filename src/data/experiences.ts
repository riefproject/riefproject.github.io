import type { Experience } from "../types/profile.types";
import { t } from "../types/profile.types";

export const workExperiences: Experience[] = [
  {
    company: "Friendly Study Buddy",
    logo: "/img/friendlystudybuddy.png",
    role: t("Coding & Informatics Tutor", "Tutor Coding & Informatika"),
    period: t("Jan 2026 — Now", "Jan 2026 — Sekarang"),
    summary: t(
      "Teaching coding and informatics fundamentals in a part-time remote role, with personalized guidance for learners from diverse ages and backgrounds.",
      "Mengajar dasar coding dan informatika secara paruh waktu jarak jauh, dengan pendampingan yang dipersonalisasi untuk pelajar dari beragam usia dan latar belakang."
    ),
    stack: [
      "Project-Based Learning",
      "Computational Thinking",
      "Problem Solving",
      "Mentoring",
    ],
    achievements: [
      t(
        "Designed adaptive learning paths based on each learner's goals, pace, and prior experience.",
        "Menyusun jalur belajar adaptif berdasarkan tujuan, kecepatan belajar, dan pengalaman awal tiap pelajar."
      ),
      t(
        "Applied project-based learning to guide learners in building contextual real-world projects while strengthening programming fundamentals.",
        "Menerapkan project-based learning untuk membimbing pelajar membangun proyek kontekstual dunia nyata sambil memperkuat fundamental pemrograman."
      ),
      t(
        "Improved learners' problem-solving, computational thinking, and logical reasoning through practical exercises.",
        "Meningkatkan kemampuan problem solving, computational thinking, dan penalaran logis melalui latihan yang praktis."
      ),
      t(
        "Encouraged independent and collaborative exploration to prepare learners for self-directed study, automation tasks, and professional use cases.",
        "Mendorong eksplorasi mandiri maupun kolaboratif untuk mempersiapkan pelajar ke pembelajaran mandiri, tugas otomasi, dan kebutuhan profesional."
      ),
    ],
  },
];

export const organizationalExperiences: Experience[] = [
  {
    company: "Himpunan Mahasiswa Komputer Politeknik Negeri Bandung",
    logo: "/img/himakom.png",
    role: t("Junior Staff Member", "Staf Muda"),
    period: t("2025 — Now", "2025 — Sekarang"),
    summary: t(
      "Supporting academic program development and competition management within the Computer Science Department.",
      "Mendukung pengembangan program akademik dan manajemen kompetisi di lingkungan Jurusan Teknik Informatika."
    ),
    stack: ["Program Management", "Event Coordination", "Academic Support"],
    achievements: [
      t(
        "Assisted in organizing cross-program academic sharing sessions within Informatics Department.",
        "Membantu penyusunan dan pelaksanaan program sharing akademik lintas program studi di Jurusan Teknik Informatika."
      ),
      t(
        "Involved in bootcamp and competition training management, including participant coordination and academic resource management.",
        "Terlibat dalam pengelolaan kegiatan bootcamp dan pembinaan lomba, termasuk manajemen peserta dan koordinasi kebutuhan akademik."
      ),
      t(
        "Supported student competition preparation through administrative and technical assistance.",
        "Mendukung persiapan dan keberlangsungan kegiatan kompetisi mahasiswa, baik secara administratif maupun teknis."
      ),
    ],
  },
  {
    company: "Brainware of SMANSA (BIoS)",
    logo: "/img/biossmansa.png",
    role: t("Head of Programming Division", "Kepala Divisi Programming"),
    period: t("2022 — 2023", "2022 — 2023"),
    summary: t(
      "Led school computer club programming division, coordinating training programs and member development initiatives.",
      "Memimpin divisi pemrograman klub komputer sekolah, mengkoordinasikan program pelatihan dan inisiatif pengembangan anggota."
    ),
    stack: ["Leadership", "Curriculum Design", "C/C++", "Mentoring"],
    achievements: [
      t(
        "Coordinated programming activities and collaborative projects among club members.",
        "Mengkoordinasikan kegiatan pemrograman dan proyek bersama anggota klub."
      ),
      t(
        "Developed and executed training programs covering basic to advanced programming concepts.",
        "Menyusun dan menjalankan program pelatihan pemrograman dasar hingga lanjutan."
      ),
      t(
        "Mentored members in project development and problem-solving skill enhancement.",
        "Membimbing anggota dalam pengembangan proyek dan peningkatan kemampuan problem solving."
      ),
      t(
        "Presented project results at school events to promote collaboration and innovation.",
        "Mempresentasikan hasil proyek pada kegiatan sekolah untuk mendorong kolaborasi dan inovasi."
      ),
    ],
  },
];

export const personalExperiences: Experience[] = [
  {
    company: "Independent Competitive Programming Journey",
    logo: "/img/codeforces.webp",
    role: t("Problem Solver & Mentor", "Problem Solver & Mentor"),
    period: t("2021 — Now", "2021 — Sekarang"),
    summary: t(
      "Continuous problem-solving practice across multiple platforms while sharing knowledge through mentoring sessions.",
      "Latihan problem solving berkelanjutan di berbagai platform sambil berbagi pengetahuan melalui sesi mentoring."
    ),
    stack: ["C++", "Python", "TLX", "LeetCode", "Codeforces"],
    achievements: [
      t(
        "Solved 400+ problems with documented notes and reusable templates shared with peers.",
        "Menyelesaikan 400+ soal dengan catatan terdokumentasi dan template yang dapat digunakan ulang oleh rekan."
      ),
      t(
        "Created visual explanations for complex data structures and algorithm concepts.",
        "Membuat penjelasan visual untuk konsep struktur data dan algoritma yang kompleks."
      ),
      t(
        "Conducted knowledge-sharing sessions and micro-challenges for classmates and juniors.",
        "Mengadakan sesi berbagi pengetahuan dan micro-challenge untuk teman sekelas dan junior."
      ),
    ],
  },
];

export const experiences: Experience[] = [
  ...workExperiences,
  ...organizationalExperiences,
  ...personalExperiences,
];
