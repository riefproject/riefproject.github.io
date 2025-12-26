import type { Achievement, AchievementTab } from "../types/profile.types";
import { t } from "../types/profile.types";

export const achievements: Achievement[] = [
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
    highlight: t("Honorable Mention", "Honorable Mention"),
    link: "https://icpc.global/",
  },
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
      "Honorable Mention · Qualified to ICPC Regional Asia",
      "Honorable Mention · Lolos ke ICPC Regional Asia"
    ),
    link: "https://icpc.global/",
  },
  {
    type: "competitions",
    title: t(
      "National Science Olympiad in Informatics 2022",
      "Olimpiade Sains Nasional Informatika 2022"
    ),
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
    title: t("Software Engineer", "Software Engineer"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2025",
    highlight: t("Role Certificate", "Sertifikat Role"),
    link: "https://www.hackerrank.com/",
  },
  {
    type: "certifications",
    title: t("Software Engineer Intern", "Software Engineer Intern"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2025",
    highlight: t("Role Certificate", "Sertifikat Role"),
    link: "https://www.hackerrank.com/",
  },
  {
    type: "certifications",
    title: t("SQL (Advanced)", "SQL (Advanced)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2025",
    highlight: t("Advanced Level", "Level Advanced"),
    link: "https://www.hackerrank.com/",
  },
  {
    type: "certifications",
    title: t(
      "Problem Solving (Intermediate)",
      "Problem Solving (Intermediate)"
    ),
    issuer: t("HackerRank", "HackerRank"),
    date: "2025",
    highlight: t("Intermediate Level", "Level Intermediate"),
    link: "https://www.hackerrank.com/",
  },
  {
    type: "certifications",
    title: t("Java (Basic)", "Java (Basic)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2025",
    highlight: t("Programming Language", "Bahasa Pemrograman"),
    link: "https://www.hackerrank.com/",
  },
  {
    type: "certifications",
    title: t("Python (Basic)", "Python (Basic)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2025",
    highlight: t("Programming Language", "Bahasa Pemrograman"),
    link: "https://www.hackerrank.com/",
  },
  {
    type: "certifications",
    title: t("JavaScript (Basic)", "JavaScript (Basic)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2025",
    highlight: t("Programming Language", "Bahasa Pemrograman"),
    link: "https://www.hackerrank.com/",
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
