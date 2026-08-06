import type { Education } from "../types/profile.types";
import { t } from "../types/profile.types";

export const education: Education[] = [
  {
    institution: "Politeknik Negeri Bandung",
    logo: "/img/polban.webp",
    program: t("D3 Informatics Engineering", "D3 Teknik Informatika"),
    period: "2024 — Sekarang",
    details: [
      t(
        "Focusing on software architecture, clean code practices, and systematic problem analysis.",
        "Fokus pada arsitektur perangkat lunak, praktik clean code, dan analisis masalah sistematis."
      ),
      t(
        "Active member of Himpunan Mahasiswa Komputer, supporting academic programs and competition management.",
        "Anggota aktif Himpunan Mahasiswa Komputer, mendukung program akademik dan manajemen kompetisi."
      ),
      t(
        "Developing enterprise applications with complex domain logic and layered architectures.",
        "Mengembangkan aplikasi enterprise dengan logika domain kompleks dan arsitektur berlapis."
      ),
    ],
  },
  {
    institution: "SMAN 1 Subang",
    logo: "/img/smansa.webp",
    program: t(
      "Mathematics & Natural Sciences",
      "Matematika & Ilmu Pengetahuan Alam"
    ),
    period: "2021 — 2024",
    details: [
      t(
        "Head of Programming Division at Brainware of SMANSA computer club.",
        "Ketua Divisi Pemrograman di klub komputer Brainware of SMANSA."
      ),
      t(
        "District Champion in National Science Olympiad (OSN) Informatics 2022.",
        "Juara Kabupaten Olimpiade Sains Nasional (OSN) Informatika 2022."
      ),
      t(
        "Led training programs and mentored members in competitive programming and project development.",
        "Memimpin program pelatihan dan mentoring anggota dalam competitive programming dan pengembangan proyek."
      ),
    ],
  },
];
