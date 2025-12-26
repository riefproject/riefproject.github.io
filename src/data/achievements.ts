import type { Achievement, AchievementTab } from "../types/profile.types";
import { t } from "../types/profile.types";

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
