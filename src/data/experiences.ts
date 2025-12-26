import type { Experience } from "../types/profile.types";
import { t } from "../types/profile.types";

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
