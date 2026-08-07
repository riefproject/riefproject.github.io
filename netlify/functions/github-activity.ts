// netlify/functions/github-activity.ts
// Public GitHub stats aggregator — no token required.
// Heatmap  -> https://github-contributions-api.jogruber.de/v4/<username> (JSON)
// User/repos/languages/PRs -> https://api.github.com (REST, unauthenticated, 60 req/hr)

const USERNAME = 'riefproject';

const GITHUB_API = 'https://api.github.com';
const CONTRIB_API = 'https://github-contributions-api.jogruber.de/v4';

const DEFAULT_AVATAR = `https://avatars.githubusercontent.com/${USERNAME}`;

async function fetchJson(url: string, init?: RequestInit): Promise<any> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'portfolio-dev-activity',
      Accept: 'application/vnd.github+json',
      ...(init?.headers || {}),
    },
    ...(init || {}),
  });
  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status} for ${url}`);
  }
  return res.json();
}

async function fetchContributions(username: string) {
  const data = await fetchJson(`${CONTRIB_API}/${username}`);
  const contributions: any[] = Array.isArray(data?.contributions) ? data.contributions : [];

  const heatmap: Record<string, { count: number; level: number }> = {};
  let total = 0;
  contributions.forEach((c) => {
    const count = Number(c.count) || 0;
    const level = Number(c.level) || 0;
    heatmap[c.date] = { count, level };
    total += count;
  });

  const yearlyTotal: Record<string, number> = data?.total || {};

  // Streaks computed over the full contribution history (descending)
  const sortedDates = contributions
    .filter((c) => (Number(c.count) || 0) > 0)
    .map((c) => c.date)
    .sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let run = 0;

  const msPerDay = 86400000;
  let prev: Date | null = null;
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

  // Current streak: consecutive days ending today/yesterday
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
      break; // allow the current day to be a gap
    } else if (!activeDays.has(key)) {
      cur = 0;
      break;
    }
  }
  currentStreak = cur;

  // Last-365-days contribution sum
  const cutoff = new Date(today);
  cutoff.setUTCDate(cutoff.getUTCDate() - 364);
  let lastYear = 0;
  contributions.forEach((c) => {
    const cd = new Date(c.date + 'T00:00:00Z');
    if (cd >= cutoff && cd <= today) lastYear += Number(c.count) || 0;
  });

  return { heatmap, yearlyTotal, totalContributions: total, currentStreak, longestStreak, lastYear };
}

async function fetchUser(username: string) {
  const u = await fetchJson(`${GITHUB_API}/users/${username}`);
  return {
    login: u.login,
    name: u.name || u.login,
    avatarUrl: u.avatar_url || DEFAULT_AVATAR,
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

async function fetchRepos(username: string) {
  const repos: any[] = [];
  let page = 1;
  while (true) {
    const pageData = await fetchJson(
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

async function fetchLanguages(username: string, repos: any[]) {
  // Non-fork repos, prefer most recently updated
  const source = repos.filter((r) => !r.fork);
  const limit = source.slice(0, 25);

  const totals: Record<string, number> = {};

  const batchSize = 8;
  for (let i = 0; i < limit.length; i += batchSize) {
    const batch = limit.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (repo) => {
        const langs = await fetchJson(`${GITHUB_API}/repos/${repo.full_name}/languages`);
        return langs;
      })
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
  const languages = Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 10);

  return languages;
}

async function fetchSearchCount(query: string): Promise<number> {
  try {
    const data = await fetchJson(`${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}&per_page=1`);
    return Number(data?.total_count) || 0;
  } catch {
    return 0;
  }
}

function buildTopRepos(repos: any[]) {
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

export async function handler(event: any, context: any) {
  try {
    const username = event?.queryStringParameters?.username || USERNAME;

    const [contrib, user, repos] = await Promise.allSettled([
      fetchContributions(username),
      fetchUser(username),
      fetchRepos(username),
    ]);

    const contributions = contrib.status === 'fulfilled' ? contrib.value : {
      heatmap: {}, yearlyTotal: {}, totalContributions: 0, currentStreak: 0, longestStreak: 0, lastYear: 0,
    };

    let userData: any = { login: username, name: username, avatarUrl: DEFAULT_AVATAR, url: `https://github.com/${username}` };
    if (user.status === 'fulfilled') userData = user.value;

    const repoList = repos.status === 'fulfilled' ? repos.value : [];

    const [languages, prStats, mergedPrs, issueStats] = await Promise.allSettled([
      fetchLanguages(username, repoList),
      fetchSearchCount(`author:${username} type:pr`),
      fetchSearchCount(`author:${username} type:pr is:merged`),
      fetchSearchCount(`author:${username} type:issue`),
    ]);

    const languageList = languages.status === 'fulfilled' ? languages.value : [];
    const totalPrs = prStats.status === 'fulfilled' ? prStats.value : 0;
    const merged = mergedPrs.status === 'fulfilled' ? mergedPrs.value : 0;
    const issues = issueStats.status === 'fulfilled' ? issueStats.value : 0;

    const payload = {
      meta: {
        updatedAt: new Date().toISOString(),
        username,
        source: 'github-public-api',
      },
      overview: {
        totalContributions: contributions.totalContributions,
        lastYearContributions: contributions.lastYear,
        currentStreak: contributions.currentStreak,
        longestStreak: contributions.longestStreak,
        heatmap: contributions.heatmap,
        yearlyTotal: contributions.yearlyTotal,
      },
      user: userData,
      languages: languageList,
      topRepos: buildTopRepos(repoList),
      prStats: {
        total: totalPrs,
        merged,
      },
      issueStats: {
        total: issues,
      },
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=600, s-maxage=3600',
      },
      body: JSON.stringify(payload),
    };
  } catch (error: any) {
    console.error('Error fetching GitHub activity:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to fetch GitHub activity',
        message: error?.message || 'Unknown error',
      }),
    };
  }
}

if (process.argv[1]?.includes('github-activity')) {
  handler({}, {}).then((res) => console.log(JSON.stringify(res, null, 2)));
}
