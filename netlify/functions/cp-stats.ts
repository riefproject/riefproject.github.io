// netlify/functions/cp-stats.ts

interface SubmissionsItem {
  id: string | number;
  platform: 'tlx' | 'codeforces' | 'leetcode' | 'hackerrank';
  title: string;
  category?: string;
  language?: string;
  difficulty?: string | number;
  url?: string;
  solvedAt: string;
}

const HANDLES = {
  tlx: 'aycaaa',
  codeforces: 'feeera',
  leetcode: 'fsaree',
  hackerrank: 'areee',
};

function getTlxDifficulty(containerName?: string): string {
  if (!containerName) return 'Medium';
  const name = containerName.trim();

  const easyKeywords = [
    'Keluaran dan Ekspresi',
    'Variabel',
    'Percabangan',
    'Perulangan',
    'Larik',
    'Array',
    'Fungsi',
    'Tipe Data',
    'Analisis Kompleksitas',
    'Pencarian dan Pengurutan',
    'Rekursi Dasar',
    'Perkenalan Pemrograman',
  ];
  if (easyKeywords.some((k) => name.includes(k))) return 'Easy';

  const hardKeywords = [
    'Dynamic Programming',
    'Lanjutan',
    'Non-Linear',
    'Algoritma Graf',
    'OSN',
    'OSN-P',
    'ICPC',
    'INC',
    'NOI',
    'Final',
    'Senior',
    'Arkavidia',
    'Schematics',
    'GEMASTIK',
    'Gemastik',
    'COMPFEST',
    'IDEAFUSE',
    'IMPACT',
    'Liga Kompetitif',
  ];
  if (hardKeywords.some((k) => name.includes(k))) return 'Hard';

  return 'Medium';
}

// 1. Fetch TLX Data
async function fetchTlxData(username: string) {
  let allSubmissions: any[] = [];
  let beforeId: number | null = null;
  let isFinished = false;
  let pageCount = 0;

  while (!isFinished && pageCount < 50) {
    pageCount++;
    const url = `https://api.tlx.toki.id/v2/submissions/programming?username=${username}${beforeId ? `&beforeId=${beforeId}` : ''}`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Portfolio CP Dashboard)' }
      });
      if (!res.ok) break;
      const json = await res.json();
      const page = json.data?.page || [];
      if (page.length === 0) break;

      const mapped = page.map((item: any) => ({
        id: item.id,
        problemJid: item.problemJid,
        containerName: json.containerNamesMap?.[item.containerJid] || 'Latihan',
        problemName: json.problemNamesMap?.[item.problemJid] || 'Soal TLX',
        problemAlias: json.problemAliasesMap?.[`${item.containerJid}-${item.problemJid}`] || '-',
        language: item.gradingLanguage || 'Cpp20',
        verdict: item.latestGrading?.verdict?.code || 'N/A',
        score: item.latestGrading?.score ?? 0,
        time: item.time,
        submittedAt: new Date(item.time).toISOString(),
      }));

      allSubmissions.push(...mapped);
      const lastId = page[page.length - 1].id;
      beforeId = lastId - 1; // Cursor offset -1 as per tlx-api.md

      if (page.length < 20) {
        isFinished = true;
      }
    } catch (err) {
      console.error('Error fetching TLX:', err);
      break;
    }
  }

  const acSubmissions = allSubmissions.filter((s) => s.verdict === 'AC' || s.score === 100);
  const uniqueProblems = new Map<string, any>();
  acSubmissions.forEach((s) => {
    if (!uniqueProblems.has(s.problemName)) {
      uniqueProblems.set(s.problemName, s);
    }
  });

  const languages: Record<string, number> = {};
  allSubmissions.forEach((s) => {
    languages[s.language] = (languages[s.language] || 0) + 1;
  });

  const dailyCalendar: Record<string, { tries: number, ac: number }> = {};
  allSubmissions.forEach((s) => {
    const day = s.submittedAt.slice(0, 10);
    if (!dailyCalendar[day]) dailyCalendar[day] = { tries: 0, ac: 0 };
    dailyCalendar[day].tries += 1;
    if (s.verdict === 'AC' || s.score === 100) {
      dailyCalendar[day].ac += 1;
    }
  });

  // ALL unique solved problems
  const recentSolved: SubmissionsItem[] = Array.from(uniqueProblems.values())
    .map((s) => ({
      id: `tlx-${s.id}`,
      platform: 'tlx',
      title: s.problemName,
      category: s.containerName,
      language: s.language,
      difficulty: '-',
      url: `https://tlx.toki.id/submissions/${s.id}`,
      solvedAt: s.submittedAt,
    }));

  return {
    handle: username,
    url: `https://tlx.toki.id/profiles/${username}`,
    totalSubmissions: allSubmissions.length,
    totalSolved: 223, // Official TLX AC count on profile
    uniqueProblemsSolved: uniqueProblems.size,
    totalAcSubmissions: 223,
    languages: {
      Cpp20: languages['Cpp20'] || 538,
      Pascal: languages['Pascal'] || 12,
      C: languages['C'] || 11,
      ...languages,
    },
    dailyCalendar,
    recentSolved,
  };
}

// 2. Fetch Codeforces Data
async function fetchCodeforcesData(handle: string) {
  const [infoRes, statusRes, ratingRes] = await Promise.allSettled([
    fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
    fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`),
    fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
  ]);

  let userInfo: any = { rating: 625, maxRating: 625, rank: 'newbie', maxRank: 'newbie' };
  if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
    const data = await infoRes.value.json();
    if (data.status === 'OK' && data.result?.[0]) {
      userInfo = data.result[0];
    }
  }

  let contestsCount = 0;
  if (ratingRes.status === 'fulfilled' && ratingRes.value.ok) {
    const data = await ratingRes.value.json();
    if (data.status === 'OK') {
      contestsCount = data.result?.length || 0;
    }
  }

  let allSubs: any[] = [];
  if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
    const data = await statusRes.value.json();
    if (data.status === 'OK') {
      allSubs = data.result || [];
    }
  }

  const acSubs = allSubs.filter((s) => s.verdict === 'OK');
  const uniqueProblems = new Map<string, any>();
  const tagsCount: Record<string, number> = {};
  const ratingDistribution: Record<string, number> = {};
  const dailyCalendar: Record<string, { tries: number, ac: number }> = {};

  allSubs.forEach((s) => {
    const day = new Date(s.creationTimeSeconds * 1000).toISOString().slice(0, 10);
    if (!dailyCalendar[day]) dailyCalendar[day] = { tries: 0, ac: 0 };
    dailyCalendar[day].tries += 1;
    if (s.verdict === 'OK') {
      dailyCalendar[day].ac += 1;
    }
  });

  acSubs.forEach((s) => {
    const key = `${s.problem.contestId || 'gym'}-${s.problem.index}`;
    if (!uniqueProblems.has(key)) {
      uniqueProblems.set(key, s);
      (s.problem.tags || []).forEach((t: string) => {
        tagsCount[t] = (tagsCount[t] || 0) + 1;
      });
      if (s.problem.rating) {
        ratingDistribution[s.problem.rating] = (ratingDistribution[s.problem.rating] || 0) + 1;
      }
    }
  });

  // ALL unique solved problems
  const recentSolved: SubmissionsItem[] = Array.from(uniqueProblems.values())
    .map((s) => {
      const p = s.problem;
      const problemUrl = p.contestId
        ? `https://codeforces.com/contest/${p.contestId}/problem/${p.index}`
        : `https://codeforces.com/problemset`;
      return {
        id: `cf-${s.id}`,
        platform: 'codeforces',
        title: `${s.problem.name} (${s.problem.contestId}${s.problem.index})`,
        category: (p.tags && p.tags[0]) || 'Problem Solving',
        language: s.programmingLanguage,
        difficulty: p.rating ? `${p.rating}` : '800',
        url: problemUrl,
        solvedAt: new Date(s.creationTimeSeconds * 1000).toISOString(),
      };
    });

  return {
    handle,
    url: `https://codeforces.com/profile/${handle}`,
    rating: userInfo.rating || 625,
    maxRating: userInfo.maxRating || 625,
    rank: userInfo.rank || 'newbie',
    maxRank: userInfo.maxRank || 'newbie',
    contestsCount,
    totalSubmissions: allSubs.length || 148,
    totalSolved: uniqueProblems.size || 50,
    totalAcSubmissions: acSubs.length || 50,
    tagsCount,
    ratingDistribution,
    dailyCalendar,
    recentSolved,
  };
}

// 3. Fetch LeetCode Data via alfa-leetcode-api proxy
async function fetchLeetCodeData(username: string) {
  try {
    const [profileRes, solvedRes, acRes] = await Promise.allSettled([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/acSubmission?limit=50`)
    ]);

    let ranking = 2367686;
    if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
      const pJson = await profileRes.value.json();
      if (pJson.ranking) ranking = pJson.ranking;
    }

    let easySolved = 32;
    let mediumSolved = 24;
    let hardSolved = 3;
    let totalSolved = 59;
    if (solvedRes.status === 'fulfilled' && solvedRes.value.ok) {
      const sJson = await solvedRes.value.json();
      if (sJson.solvedProblem) totalSolved = sJson.solvedProblem;
      if (sJson.easySolved) easySolved = sJson.easySolved;
      if (sJson.mediumSolved) mediumSolved = sJson.mediumSolved;
      if (sJson.hardSolved) hardSolved = sJson.hardSolved;
    }

    let recentSolved: SubmissionsItem[] = [];
    const dailyCalendar: Record<string, { tries: number, ac: number }> = {};

    if (acRes.status === 'fulfilled' && acRes.value.ok) {
      const acJson = await acRes.value.json();
      const submissionList = acJson.submission || [];
      recentSolved = submissionList.map((item: any) => {
        const langMap: Record<string, string> = {
          cpp: 'C++',
          golang: 'Go',
          python3: 'Python',
          java: 'Java',
          javascript: 'JavaScript',
          typescript: 'TypeScript'
        };
        const lang = langMap[item.lang] || 'C++';
        const solvedAt = new Date(parseInt(item.timestamp, 10) * 1000).toISOString();
        
        const day = solvedAt.slice(0, 10);
        if (!dailyCalendar[day]) dailyCalendar[day] = { tries: 0, ac: 0 };
        dailyCalendar[day].tries += 1;
        dailyCalendar[day].ac += 1;

        return {
          id: `lc-${item.timestamp || item.titleSlug}`,
          platform: 'leetcode',
          title: item.title,
          category: 'Algorithms',
          language: lang,
          difficulty: '-',
          url: `https://leetcode.com/problems/${item.titleSlug}/`,
          solvedAt,
        };
      });
    }

    return {
      handle: username,
      url: `https://leetcode.com/u/${username}`,
      ranking,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      dailyCalendar,
      recentSolved,
    };
  } catch (err: any) {
    console.error('Failed to fetch LeetCode data via API:', err);
    return {
      handle: username,
      url: `https://leetcode.com/u/${username}`,
      ranking: 2367686,
      totalSolved: 59,
      easySolved: 32,
      mediumSolved: 24,
      hardSolved: 3,
      dailyCalendar: {},
      recentSolved: [],
    };
  }
}

// 4. Fetch HackerRank Data
async function fetchHackerRankData(handle: string) {
  const [badgeRes, scoreRes, chalRes, histRes] = await Promise.allSettled([
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/badges`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }),
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/scores_elo`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }),
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/recent_challenges?limit=50&response_version=v2`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }),
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/submission_histories`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }),
  ]);

  let badges: any[] = [];
  if (badgeRes.status === 'fulfilled' && badgeRes.value.ok) {
    const data = await badgeRes.value.json();
    badges = (data.models || [])
      .filter((b: any) => b.stars > 0 || b.current_points > 0 || b.solved > 0)
      .map((b: any) => ({
        name: b.badge_name,
        stars: b.stars,
        points: b.current_points,
        solved: b.solved,
        category: b.category_name || b.badge_type,
      }));
  }

  let trackScores: any[] = [];
  if (scoreRes.status === 'fulfilled' && scoreRes.value.ok) {
    const data = await scoreRes.value.json();
    trackScores = (data || [])
      .filter((t: any) => t.practice && t.practice.score > 0)
      .map((t: any) => ({
        name: t.name,
        slug: t.slug,
        score: Math.round(t.practice.score * 100) / 100,
        rank: t.practice.rank,
      }));
  }

  let totalHrSubmissions = 415;
  const dailyCalendar: Record<string, { tries: number, ac: number }> = {};

  if (histRes.status === 'fulfilled' && histRes.value.ok) {
    const histData = await histRes.value.json();
    let sum = 0;
    for (const [date, count] of Object.entries(histData)) {
      dailyCalendar[date] = { tries: Number(count), ac: 0 };
      sum += Number(count);
    }
    if (sum > 0) totalHrSubmissions = sum;
  }

  let recentChallenges: any[] = [];
  if (chalRes.status === 'fulfilled' && chalRes.value.ok) {
    const data = await chalRes.value.json();
    recentChallenges = (data.models || []).map((c: any) => {
      const solvedAt = c.created_at || new Date().toISOString();
      return {
        id: `hr-${c.ch_slug}`,
        platform: 'hackerrank' as const,
        title: c.name,
        category: 'Algorithms & Problem Solving',
        language: 'C++ / SQL',
        difficulty: 'Practice',
        url: `https://www.hackerrank.com${c.url}`,
        solvedAt,
      };
    });
  }

  // Update HackerRank AC counts based on recent solved challenges
  recentChallenges.forEach((c: any) => {
    if (c.solvedAt) {
      const day = c.solvedAt.slice(0, 10);
      if (!dailyCalendar[day]) dailyCalendar[day] = { tries: 0, ac: 0 };
      dailyCalendar[day].ac += 1;
      if (dailyCalendar[day].tries < dailyCalendar[day].ac) {
        dailyCalendar[day].tries = dailyCalendar[day].ac;
      }
    }
  });

  const badgeSolvedTotal = badges.reduce((acc, b) => acc + (b.solved || 0), 0) || 138;

  return {
    handle,
    url: `https://www.hackerrank.com/profile/${handle}`,
    totalSolved: badgeSolvedTotal,
    totalSubmissions: totalHrSubmissions,
    badges,
    trackScores,
    dailyCalendar,
    recentSolved: recentChallenges,
  };
}

// Master Handler
export async function handler(event: any, context: any) {
  try {
    const [tlxRes, cfRes, lcRes, hrRes] = await Promise.allSettled([
      fetchTlxData(HANDLES.tlx),
      fetchCodeforcesData(HANDLES.codeforces),
      fetchLeetCodeData(HANDLES.leetcode),
      fetchHackerRankData(HANDLES.hackerrank),
    ]);

    const tlx = tlxRes.status === 'fulfilled' ? tlxRes.value : null;
    const cf = cfRes.status === 'fulfilled' ? cfRes.value : null;
    const lc = lcRes.status === 'fulfilled' ? lcRes.value : null;
    const hr = hrRes.status === 'fulfilled' ? hrRes.value : null;

    // Merge Daily Submissions Heatmap
    const combinedHeatmap: Record<string, { tries: number, ac: number }> = {};
    [tlx?.dailyCalendar, cf?.dailyCalendar, lc?.dailyCalendar, hr?.dailyCalendar].forEach((cal) => {
      if (!cal) return;
      Object.entries(cal).forEach(([day, entry]: [string, any]) => {
        if (!combinedHeatmap[day]) combinedHeatmap[day] = { tries: 0, ac: 0 };
        combinedHeatmap[day].tries += entry.tries || 0;
        combinedHeatmap[day].ac += entry.ac || 0;
      });
    });

    // Merge Global Recent Solved (Chronologically sorted)
    const recentGlobalFeed: SubmissionsItem[] = [
      ...(tlx?.recentSolved || []),
      ...(cf?.recentSolved || []),
      ...(lc?.recentSolved || []),
      ...(hr?.recentSolved || []),
    ].sort((a, b) => new Date(b.solvedAt).getTime() - new Date(a.solvedAt).getTime());

    const totalSolved =
      (tlx?.totalSolved || 223) +
      (cf?.totalSolved || 50) +
      (lc?.totalSolved || 59) +
      (hr?.totalSolved || 138);

    const totalSubmissions =
      (tlx?.totalSubmissions || 561) +
      (cf?.totalSubmissions || 148) +
      (lc?.totalSolved || 70) +
      (hr?.totalSubmissions || 415);

    const payload = {
      meta: {
        updatedAt: new Date().toISOString(),
        handles: HANDLES,
      },
      overview: {
        totalSolved,
        totalSubmissions,
        activePlatformsCount: 4,
        heatmap: combinedHeatmap,
      },
      platforms: {
        tlx,
        codeforces: cf,
        leetcode: lc,
        hackerrank: hr,
      },
      recentGlobalFeed,
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
      body: JSON.stringify(payload),
    };
  } catch (error: any) {
    console.error('Error generating CP stats payload:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to fetch CP stats',
        message: error?.message || 'Unknown error',
      }),
    };
  }
}
