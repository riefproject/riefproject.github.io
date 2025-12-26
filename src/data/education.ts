import type { Education } from "../types/profile.types";
import { t } from "../types/profile.types";

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
