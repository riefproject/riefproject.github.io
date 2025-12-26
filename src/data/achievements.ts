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
    date: "2024",
    highlight: t("Role Certificate", "Sertifikat Role"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "E078188D01D3",
    credentialUrl: "https://www.hackerrank.com/certificates/e078188d01d3",
    certificateImage: "/img/certs/HackerRank_SE.png",
  },
  {
    type: "certifications",
    title: t("Software Engineer Intern", "Software Engineer Intern"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2024",
    highlight: t("Role Certificate", "Sertifikat Role"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "B182F21F4D48",
    credentialUrl: "https://www.hackerrank.com/certificates/b182f21f4d48",
    certificateImage: "/img/certs/HackerRank_SEI.png",
  },
  {
    type: "certifications",
    title: t("SQL (Advanced)", "SQL (Advanced)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2024",
    highlight: t("Advanced Level", "Level Advanced"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "64462224B762",
    credentialUrl: "https://www.hackerrank.com/certificates/64462224b762",
    certificateImage: "/img/certs/HackerRank_SQL.png",
  },
  {
    type: "certifications",
    title: t(
      "Problem Solving (Intermediate)",
      "Problem Solving (Intermediate)"
    ),
    issuer: t("HackerRank", "HackerRank"),
    date: "2024",
    highlight: t("Intermediate Level", "Level Intermediate"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "384E0124DE3B",
    credentialUrl: "https://www.hackerrank.com/certificates/384e0124de3b",
    certificateImage: "/img/certs/HackerRank_ProbSolving.png",
  },
  {
    type: "certifications",
    title: t("Java (Basic)", "Java (Basic)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2024",
    highlight: t("Programming Language", "Bahasa Pemrograman"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "C7E8AE598DF0",
    credentialUrl: "https://www.hackerrank.com/certificates/c7e8ae598df0",
    certificateImage: "/img/certs/HackerRank_Java.png",
  },
  {
    type: "certifications",
    title: t("Python (Basic)", "Python (Basic)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2024",
    highlight: t("Programming Language", "Bahasa Pemrograman"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "BFC0F850134D",
    credentialUrl: "https://www.hackerrank.com/certificates/bfc0f850134d",
    certificateImage: "/img/certs/HackerRank_Python.png",
  },
  {
    type: "certifications",
    title: t("JavaScript (Basic)", "JavaScript (Basic)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2024",
    highlight: t("Programming Language", "Bahasa Pemrograman"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "384E0124DE3B",
    credentialUrl: "https://www.hackerrank.com/certificates/384e0124de3b",
    certificateImage: "/img/certs/HackerRank_JS.png",
  },
  {
    type: "certifications",
    title: t("Go (Basic)", "Go (Basic)"),
    issuer: t("HackerRank", "HackerRank"),
    date: "2024",
    highlight: t("Programming Language", "Bahasa Pemrograman"),
    link: "https://www.hackerrank.com/",
    logo: "/img/certs/hackerrank.png",
    credentialId: "E49F9D4AA14C",
    credentialUrl: "https://www.hackerrank.com/certificates/E49F9D4AA14C",
    certificateImage: "/img/certs/HackerRank_Go.png",
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
