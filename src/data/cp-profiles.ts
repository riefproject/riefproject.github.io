import type { CPProfile } from "../types/profile.types";
import { t } from "../types/profile.types";

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
