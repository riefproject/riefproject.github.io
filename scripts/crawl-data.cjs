#!/usr/bin/env node
// Scheduled data crawler — replaces the runtime Netlify functions.
// Crawls GitHub (public), GitLab (token via env) and CP platforms, then writes
// the merged payloads that the site reads at build time:
//   src/data/dev-activity-initial.json
//   src/data/cp-data-initial.json
// Runs standalone with plain Node 18+ (global fetch) — no dependencies.
// On any hard failure the previous JSON file is left untouched.

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Minimal .env loader (no dependency) — same format as dotenv.
// ---------------------------------------------------------------------------
function loadEnv(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const raw = trimmed.slice(eq + 1).trim();
      let value = raw;
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // ignore missing .env
  }
}

loadEnv(path.join(__dirname, '..', '.env'));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const nowIso = () => new Date().toISOString();

function readExisting(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function writeJson(file, payload) {
  const next = JSON.stringify(payload, null, 2) + '\n';
  const prev = readExisting(file) !== null ? fs.readFileSync(file, 'utf8') : null;
  if (prev === next) {
    console.log(`  unchanged: ${file}`);
    return false;
  }
  fs.writeFileSync(file, next);
  console.log(`  updated:   ${file}`);
  return true;
}

// ---------------------------------------------------------------------------
// 1. GitHub activity (public APIs, no token) — mirrors netlify/functions/github-activity.ts
// ---------------------------------------------------------------------------
const GH_USERNAME = 'riefproject';
const GITHUB_API = 'https://api.github.com';
const CONTRIB_API = 'https://github-contributions-api.jogruber.de/v4';

async function ghFetchJson(url, init) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'portfolio-dev-activity',
      Accept: 'application/vnd.github+json',
      ...((init && init.headers) || {}),
    },
    ...(init || {}),
  });
  if (!res.ok) throw new Error(`GitHub API responded with ${res.status} for ${url}`);
  return res.json();
}

async function ghContributions(username) {
  const data = await ghFetchJson(`${CONTRIB_API}/${username}`);
  const contributions = Array.isArray(data && data.contributions) ? data.contributions : [];

  const heatmap = {};
  let total = 0;
  contributions.forEach((c) => {
    const count = Number(c.count) || 0;
    const level = Number(c.level) || 0;
    heatmap[c.date] = { count, level };
    total += count;
  });

  const yearlyTotal = (data && data.total) || {};

  const sortedDates = contributions
    .filter((c) => (Number(c.count) || 0) > 0)
    .map((c) => c.date)
    .sort();

  let longestStreak = 0;
  let run = 0;
  const msPerDay = 86400000;
  let prev = null;
  sortedDates.forEach((dateStr) => {
    const d = new Date(dateStr + 'T00:00:00Z');
    if (prev && d.getTime() - prev.getTime() === msPerDay) {
      run += 1;
    } else {
      run = 1;
    }
    longestStreak = Math.max(longestStreak, run);
    prev = d;
  });

  const activeDays = new Set(sortedDates);
  const today = new Date();
  let cur = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (activeDays.has(key)) {
      cur += 1;
    } else if (i !== 0) {
      break;
    } else if (!activeDays.has(key)) {
      cur = 0;
      break;
    }
  }
  const currentStreak = cur;

  const cutoff = new Date(today);
  cutoff.setUTCDate(cutoff.getUTCDate() - 364);
  let lastYear = 0;
  contributions.forEach((c) => {
    const cd = new Date(c.date + 'T00:00:00Z');
    if (cd >= cutoff && cd <= today) lastYear += Number(c.count) || 0;
  });

  return { heatmap, yearlyTotal, totalContributions: total, currentStreak, longestStreak, lastYear };
}

async function ghUser(username) {
  const u = await ghFetchJson(`${GITHUB_API}/users/${username}`);
  return {
    login: u.login,
    name: u.name || u.login,
    avatarUrl: u.avatar_url || `https://avatars.githubusercontent.com/${username}`,
    url: u.html_url,
    bio: u.bio,
    company: u.company,
    location: u.location,
    blog: u.blog,
    followers: u.followers || 0,
    following: u.following || 0,
    publicRepos: u.public_repos || 0,
    publicGists: u.public_gists || 0,
    createdAt: u.created_at,
  };
}

async function ghRepos(username) {
  const repos = [];
  let page = 1;
  while (true) {
    const pageData = await ghFetchJson(
      `${GITHUB_API}/users/${username}/repos?per_page=100&page=${page}&sort=updated`
    );
    if (!Array.isArray(pageData) || pageData.length === 0) break;
    repos.push(...pageData);
    if (pageData.length < 100) break;
    page += 1;
    if (page > 3) break;
  }
  return repos;
}

async function ghLanguages(username, repos) {
  const source = repos.filter((r) => !r.fork).slice(0, 25);
  const totals = {};
  const batchSize = 8;
  for (let i = 0; i < source.length; i += batchSize) {
    const batch = source.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (repo) => ghFetchJson(`${GITHUB_API}/repos/${repo.full_name}/languages`))
    );
    results.forEach((res) => {
      if (res.status === 'fulfilled' && res.value) {
        Object.entries(res.value).forEach(([lang, bytes]) => {
          totals[lang] = (totals[lang] || 0) + Number(bytes);
        });
      }
    });
  }

  const totalBytes = Object.values(totals).reduce((sum, v) => sum + v, 0);
  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 10);
}

async function ghSearchCount(query) {
  try {
    const data = await ghFetchJson(`${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}&per_page=1`);
    return Number(data && data.total_count) || 0;
  } catch {
    return 0;
  }
}

function ghBuildTopRepos(repos) {
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 8)
    .map((r) => ({
      name: r.name,
      fullName: r.full_name,
      url: r.html_url,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      updatedAt: r.updated_at,
      archived: r.archived,
      topics: r.topics || [],
    }));
}

async function crawlGithub() {
  const [contrib, user, repos] = await Promise.allSettled([
    ghContributions(GH_USERNAME),
    ghUser(GH_USERNAME),
    ghRepos(GH_USERNAME),
  ]);

  const contributions = contrib.status === 'fulfilled'
    ? contrib.value
    : { heatmap: {}, yearlyTotal: {}, totalContributions: 0, currentStreak: 0, longestStreak: 0, lastYear: 0 };

  let userData = {
    login: GH_USERNAME,
    name: GH_USERNAME,
    avatarUrl: `https://avatars.githubusercontent.com/${GH_USERNAME}`,
    url: `https://github.com/${GH_USERNAME}`,
  };
  if (user.status === 'fulfilled') userData = user.value;

  const repoList = repos.status === 'fulfilled' ? repos.value : [];

  const [languages, prStats, mergedPrs, issueStats] = await Promise.allSettled([
    ghLanguages(GH_USERNAME, repoList),
    ghSearchCount(`author:${GH_USERNAME} type:pr`),
    ghSearchCount(`author:${GH_USERNAME} type:pr is:merged`),
    ghSearchCount(`author:${GH_USERNAME} type:issue`),
  ]);

  return {
    meta: { updatedAt: nowIso(), username: GH_USERNAME, source: 'github-public-api' },
    overview: {
      totalContributions: contributions.totalContributions,
      lastYearContributions: contributions.lastYear,
      currentStreak: contributions.currentStreak,
      longestStreak: contributions.longestStreak,
      heatmap: contributions.heatmap,
      yearlyTotal: contributions.yearlyTotal,
    },
    user: userData,
    languages: languages.status === 'fulfilled' ? languages.value : [],
    topRepos: ghBuildTopRepos(repoList),
    prStats: { total: prStats.status === 'fulfilled' ? prStats.value : 0, merged: mergedPrs.status === 'fulfilled' ? mergedPrs.value : 0 },
    issueStats: { total: issueStats.status === 'fulfilled' ? issueStats.value : 0 },
  };
}

// ---------------------------------------------------------------------------
// 2. GitLab activity (private instance, token via env) — mirrors gitlab-activity.ts
// ---------------------------------------------------------------------------
const GITLAB_USER_ID = '379';
const GITLAB_URL = 'https://gitlab.example.com';

async function crawlGitlab() {
  const token = process.env.GITLAB_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    console.log('  [gitlab] no GITLAB_PERSONAL_ACCESS_TOKEN — returning empty activity');
    return {
      heatmap: {},
      stats: { totalEvents: 0, daysActive: 0, mergeRequests: { opened: 0, merged: 0 }, languages: [] },
    };
  }

  const since = new Date();
  since.setDate(since.getDate() - 365);
  const after = since.toISOString();

  const events = [];
  let page = 1;
  const maxPages = 30;
  while (page <= maxPages) {
    const response = await fetch(
      `${GITLAB_URL}/api/v4/users/${GITLAB_USER_ID}/events?after=${encodeURIComponent(after)}&per_page=100&page=${page}`,
      { headers: { 'PRIVATE-TOKEN': token } }
    );
    if (!response.ok) throw new Error(`GitLab API responded with status ${response.status}`);
    const pageData = await response.json();
    if (!Array.isArray(pageData) || pageData.length === 0) break;
    events.push(...pageData);
    if (pageData.length < 100) break;
    page += 1;
  }

  const heatmap = {};
  const projectIds = new Set();
  let mrOpened = 0;
  events.forEach((ev) => {
    if (!ev.created_at) return;
    const date = ev.created_at.slice(0, 10);
    heatmap[date] = (heatmap[date] || 0) + 1;
    if (ev.project_id) projectIds.add(ev.project_id);
    if (ev.target_type === 'MergeRequest' && ev.action_name === 'opened') mrOpened += 1;
  });

  let mrMerged = 0;
  try {
    const mrRes = await fetch(
      `${GITLAB_URL}/api/v4/merge_requests?author_id=${GITLAB_USER_ID}&scope=all&state=merged&per_page=100`,
      { headers: { 'PRIVATE-TOKEN': token } }
    );
    if (mrRes.ok) {
      const mrList = await mrRes.json();
      mrMerged = Array.isArray(mrList) ? mrList.length : 0;
    }
  } catch (err) {
    console.error('Failed to fetch merged MRs:', err);
  }

  const uniqueProjectIds = Array.from(projectIds).slice(0, 5);
  const languageTotals = {};
  await Promise.all(
    uniqueProjectIds.map(async (pid) => {
      try {
        const langRes = await fetch(`${GITLAB_URL}/api/v4/projects/${pid}/languages`, {
          headers: { 'PRIVATE-TOKEN': token },
        });
        if (langRes.ok) {
          const langs = await langRes.json();
          Object.entries(langs).forEach(([lang, val]) => {
            languageTotals[lang] = (languageTotals[lang] || 0) + val;
          });
        }
      } catch (err) {
        console.error(`Failed to fetch languages for project ${pid}:`, err);
      }
    })
  );

  const totalLangValue = Object.values(languageTotals).reduce((sum, val) => sum + val, 0);
  const languages = Object.entries(languageTotals)
    .map(([name, value]) => ({
      name,
      percentage: totalLangValue > 0 ? Math.round((value / totalLangValue) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return {
    heatmap,
    stats: {
      totalEvents: events.length,
      daysActive: Object.keys(heatmap).length,
      mergeRequests: { opened: mrOpened, merged: mrMerged },
      languages,
    },
  };
}

function combineDevHeatmap(ghPayload, glPayload) {
  const out = {};
  const ghMap = (ghPayload && ghPayload.overview && ghPayload.overview.heatmap) || {};
  const glMap = (glPayload && glPayload.heatmap) || {};
  const keys = new Set([...Object.keys(ghMap), ...Object.keys(glMap)]);
  keys.forEach((k) => {
    const ghV = ghMap[k];
    const glV = glMap[k];
    out[k] =
      (typeof ghV === 'object' ? Number((ghV && ghV.count) || 0) : Number(ghV || 0)) +
      (typeof glV === 'object' ? Number((glV && glV.count) || 0) : Number(glV || 0));
  });
  return out;
}

// ---------------------------------------------------------------------------
// 3. CP stats — mirrors netlify/functions/cp-stats.ts
// ---------------------------------------------------------------------------
const CP_HANDLES = {
  tlx: 'aycaaa',
  codeforces: 'feeera',
  leetcode: 'fsaree',
  hackerrank: 'areee',
};

function getTlxDifficulty(containerName) {
  if (!containerName) return 'Medium';
  const name = containerName.trim();

  const easyKeywords = [
    'Keluaran dan Ekspresi', 'Variabel', 'Percabangan', 'Perulangan', 'Larik', 'Array',
    'Fungsi', 'Tipe Data', 'Analisis Kompleksitas', 'Pencarian dan Pengurutan',
    'Rekursi Dasar', 'Perkenalan Pemrograman',
  ];
  if (easyKeywords.some((k) => name.includes(k))) return 'Easy';

  const hardKeywords = [
    'Dynamic Programming', 'Lanjutan', 'Non-Linear', 'Algoritma Graf', 'OSN', 'OSN-P',
    'ICPC', 'INC', 'NOI', 'Final', 'Senior', 'Arkavidia', 'Schematics', 'GEMASTIK',
    'Gemastik', 'COMPFEST', 'IDEAFUSE', 'IMPACT', 'Liga Kompetitif',
  ];
  if (hardKeywords.some((k) => name.includes(k))) return 'Hard';

  return 'Medium';
}

async function cpTlx(username) {
  let allSubmissions = [];
  let beforeId = null;
  let isFinished = false;
  let pageCount = 0;

  while (!isFinished && pageCount < 50) {
    pageCount++;
    const url = `https://api.tlx.toki.id/v2/submissions/programming?username=${username}${beforeId ? `&beforeId=${beforeId}` : ''}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Portfolio CP Dashboard)' } });
      if (!res.ok) break;
      const json = await res.json();
      const page = (json.data && json.data.page) || [];
      if (page.length === 0) break;

      const mapped = page.map((item) => ({
        id: item.id,
        problemJid: item.problemJid,
        containerName: (json.containerNamesMap && json.containerNamesMap[item.containerJid]) || 'Latihan',
        problemName: (json.problemNamesMap && json.problemNamesMap[item.problemJid]) || 'Soal TLX',
        problemAlias:
          (json.problemAliasesMap && json.problemAliasesMap[`${item.containerJid}-${item.problemJid}`]) || '-',
        language: item.gradingLanguage || 'Cpp20',
        verdict: (item.latestGrading && item.latestGrading.verdict && item.latestGrading.verdict.code) || 'N/A',
        score: (item.latestGrading && item.latestGrading.score) || 0,
        time: item.time,
        submittedAt: new Date(item.time).toISOString(),
      }));

      allSubmissions.push(...mapped);
      const lastId = page[page.length - 1].id;
      beforeId = lastId - 1;
      if (page.length < 20) isFinished = true;
    } catch (err) {
      console.error('Error fetching TLX:', err);
      break;
    }
  }

  const acSubmissions = allSubmissions.filter((s) => s.verdict === 'AC' || s.score === 100);
  const uniqueProblems = new Map();
  acSubmissions.forEach((s) => {
    if (!uniqueProblems.has(s.problemName)) uniqueProblems.set(s.problemName, s);
  });

  const languages = {};
  allSubmissions.forEach((s) => {
    languages[s.language] = (languages[s.language] || 0) + 1;
  });

  const dailyCalendar = {};
  allSubmissions.forEach((s) => {
    const day = s.submittedAt.slice(0, 10);
    if (!dailyCalendar[day]) dailyCalendar[day] = { tries: 0, ac: 0 };
    dailyCalendar[day].tries += 1;
    if (s.verdict === 'AC' || s.score === 100) dailyCalendar[day].ac += 1;
  });

  const recentSolved = Array.from(uniqueProblems.values()).map((s) => ({
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
    totalSolved: 223,
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

async function cpCodeforces(handle) {
  const [infoRes, statusRes, ratingRes] = await Promise.allSettled([
    fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
    fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`),
    fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
  ]);

  let userInfo = { rating: 625, maxRating: 625, rank: 'newbie', maxRank: 'newbie' };
  if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
    const data = await infoRes.value.json();
    if (data.status === 'OK' && data.result && data.result[0]) userInfo = data.result[0];
  }

  let contestsCount = 0;
  if (ratingRes.status === 'fulfilled' && ratingRes.value.ok) {
    const data = await ratingRes.value.json();
    if (data.status === 'OK') contestsCount = (data.result && data.result.length) || 0;
  }

  let allSubs = [];
  if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
    const data = await statusRes.value.json();
    if (data.status === 'OK') allSubs = data.result || [];
  }

  const acSubs = allSubs.filter((s) => s.verdict === 'OK');
  const uniqueProblems = new Map();
  const tagsCount = {};
  const ratingDistribution = {};
  const dailyCalendar = {};

  allSubs.forEach((s) => {
    const day = new Date(s.creationTimeSeconds * 1000).toISOString().slice(0, 10);
    if (!dailyCalendar[day]) dailyCalendar[day] = { tries: 0, ac: 0 };
    dailyCalendar[day].tries += 1;
    if (s.verdict === 'OK') dailyCalendar[day].ac += 1;
  });

  acSubs.forEach((s) => {
    const key = `${s.problem.contestId || 'gym'}-${s.problem.index}`;
    if (!uniqueProblems.has(key)) {
      uniqueProblems.set(key, s);
      (s.problem.tags || []).forEach((t) => {
        tagsCount[t] = (tagsCount[t] || 0) + 1;
      });
      if (s.problem.rating) {
        ratingDistribution[s.problem.rating] = (ratingDistribution[s.problem.rating] || 0) + 1;
      }
    }
  });

  const recentSolved = Array.from(uniqueProblems.values()).map((s) => {
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

async function cpLeetCode(username) {
  try {
    const [profileRes, solvedRes, acRes] = await Promise.allSettled([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/acSubmission?limit=50`),
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

    let recentSolved = [];
    const dailyCalendar = {};

    if (acRes.status === 'fulfilled' && acRes.value.ok) {
      const acJson = await acRes.value.json();
      const submissionList = acJson.submission || [];
      recentSolved = submissionList.map((item) => {
        const langMap = {
          cpp: 'C++', golang: 'Go', python3: 'Python', java: 'Java',
          javascript: 'JavaScript', typescript: 'TypeScript',
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
  } catch (err) {
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

async function cpHackerRank(handle) {
  const [badgeRes, scoreRes, chalRes, histRes] = await Promise.allSettled([
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/badges`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/scores_elo`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/recent_challenges?limit=50&response_version=v2`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
    fetch(`https://www.hackerrank.com/rest/hackers/${handle}/submission_histories`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
  ]);

  let badges = [];
  if (badgeRes.status === 'fulfilled' && badgeRes.value.ok) {
    const data = await badgeRes.value.json();
    badges = (data.models || [])
      .filter((b) => b.stars > 0 || b.current_points > 0 || b.solved > 0)
      .map((b) => ({
        name: b.badge_name,
        stars: b.stars,
        points: b.current_points,
        solved: b.solved,
        category: b.category_name || b.badge_type,
      }));
  }

  let trackScores = [];
  if (scoreRes.status === 'fulfilled' && scoreRes.value.ok) {
    const data = await scoreRes.value.json();
    trackScores = (data || [])
      .filter((t) => t.practice && t.practice.score > 0)
      .map((t) => ({
        name: t.name,
        slug: t.slug,
        score: Math.round(t.practice.score * 100) / 100,
        rank: t.practice.rank,
      }));
  }

  let totalHrSubmissions = 415;
  const dailyCalendar = {};
  if (histRes.status === 'fulfilled' && histRes.value.ok) {
    const histData = await histRes.value.json();
    let sum = 0;
    for (const [date, count] of Object.entries(histData)) {
      dailyCalendar[date] = { tries: Number(count), ac: 0 };
      sum += Number(count);
    }
    if (sum > 0) totalHrSubmissions = sum;
  }

  let recentChallenges = [];
  if (chalRes.status === 'fulfilled' && chalRes.value.ok) {
    const data = await chalRes.value.json();
    recentChallenges = (data.models || []).map((c) => {
      const solvedAt = c.created_at || nowIso();
      return {
        id: `hr-${c.ch_slug}`,
        platform: 'hackerrank',
        title: c.name,
        category: 'Algorithms & Problem Solving',
        language: 'C++ / SQL',
        difficulty: 'Practice',
        url: `https://www.hackerrank.com${c.url}`,
        solvedAt,
      };
    });
  }

  recentChallenges.forEach((c) => {
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

async function crawlCp() {
  const [tlxRes, cfRes, lcRes, hrRes] = await Promise.allSettled([
    cpTlx(CP_HANDLES.tlx),
    cpCodeforces(CP_HANDLES.codeforces),
    cpLeetCode(CP_HANDLES.leetcode),
    cpHackerRank(CP_HANDLES.hackerrank),
  ]);

  const tlx = tlxRes.status === 'fulfilled' ? tlxRes.value : null;
  const cf = cfRes.status === 'fulfilled' ? cfRes.value : null;
  const lc = lcRes.status === 'fulfilled' ? lcRes.value : null;
  const hr = hrRes.status === 'fulfilled' ? hrRes.value : null;

  const combinedHeatmap = {};
  [tlx && tlx.dailyCalendar, cf && cf.dailyCalendar, lc && lc.dailyCalendar, hr && hr.dailyCalendar].forEach((cal) => {
    if (!cal) return;
    Object.entries(cal).forEach(([day, entry]) => {
      if (!combinedHeatmap[day]) combinedHeatmap[day] = { tries: 0, ac: 0 };
      combinedHeatmap[day].tries += entry.tries || 0;
      combinedHeatmap[day].ac += entry.ac || 0;
    });
  });

  const recentGlobalFeed = [
    ...(tlx && tlx.recentSolved || []),
    ...(cf && cf.recentSolved || []),
    ...(lc && lc.recentSolved || []),
    ...(hr && hr.recentSolved || []),
  ].sort((a, b) => new Date(b.solvedAt).getTime() - new Date(a.solvedAt).getTime());

  const totalSolved =
    (tlx && tlx.totalSolved || 223) +
    (cf && cf.totalSolved || 50) +
    (lc && lc.totalSolved || 59) +
    (hr && hr.totalSolved || 138);

  const totalSubmissions =
    (tlx && tlx.totalSubmissions || 561) +
    (cf && cf.totalSubmissions || 148) +
    (lc && lc.totalSolved || 70) +
    (hr && hr.totalSubmissions || 415);

  return {
    meta: { updatedAt: nowIso(), handles: CP_HANDLES },
    overview: {
      totalSolved,
      totalSubmissions,
      activePlatformsCount: 4,
      heatmap: combinedHeatmap,
    },
    platforms: { tlx, codeforces: cf, leetcode: lc, hackerrank: hr },
    recentGlobalFeed,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const DEV_FILE = path.join(__dirname, '..', 'src', 'data', 'dev-activity-initial.json');
const CP_FILE = path.join(__dirname, '..', 'src', 'data', 'cp-data-initial.json');

async function main() {
  console.log('Crawling activity data...');

  // Development activity (GitHub + GitLab)
  try {
    console.log('· GitHub...');
    const github = await crawlGithub();
    console.log('· GitLab...');
    const gitlab = await crawlGitlab();

    const devPayload = {
      meta: { updatedAt: nowIso(), source: 'scheduled-crawl' },
      overview: { ...github.overview, heatmap: combineDevHeatmap(github, gitlab) },
      platforms: { github, gitlab },
    };
    writeJson(DEV_FILE, devPayload);
  } catch (err) {
    console.error('Failed to crawl development activity — keeping existing file.', err);
  }

  // Competitive programming
  try {
    console.log('· CP platforms (TLX, Codeforces, LeetCode, HackerRank)...');
    const cp = await crawlCp();
    writeJson(CP_FILE, cp);
  } catch (err) {
    console.error('Failed to crawl CP stats — keeping existing file.', err);
  }

  console.log('Done.');
}

main();
