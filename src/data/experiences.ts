import type { Experience } from "../types/profile.types";
import { t } from "../types/profile.types";

export const experiences: Experience[] = [
  {
    company: "Himpunan Mahasiswa Komputer Politeknik Negeri Bandung",
    logo: "/img/himakom.png",
    role: t("Junior Staff Member", "Staf Muda"),
    period: "2025 — Sekarang",
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
    period: "2022 — 2023",
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
  {
    company: "Independent Competitive Programming Journey",
    logo: "/img/codeforces.webp",
    role: t("Problem Solver & Mentor", "Problem Solver & Mentor"),
    period: "2021 — Sekarang",
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
