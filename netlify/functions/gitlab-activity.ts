
export async function handler(event: any, context: any) {
  const token = process.env.GITLAB_PERSONAL_ACCESS_TOKEN;
  const userId = '379';
  const gitlabUrl = 'https://gitlab.example.com';

  if (!token) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'GitLab token not configured. Returning empty activity.',
        heatmap: {},
      }),
    };
  }

  try {
    // Fetch events for the past 12 months, paginated
    const since = new Date();
    since.setDate(since.getDate() - 365);
    const after = since.toISOString();

    const events: any[] = [];
    let page = 1;
    const maxPages = 30;

    while (page <= maxPages) {
      const response = await fetch(
        `${gitlabUrl}/api/v4/users/${userId}/events?after=${encodeURIComponent(after)}&per_page=100&page=${page}`,
        {
          headers: {
            'PRIVATE-TOKEN': token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitLab API responded with status ${response.status}`);
      }

      const pageData: any = await response.json();
      if (!Array.isArray(pageData) || pageData.length === 0) break;

      events.push(...pageData);
      if (pageData.length < 100) break;
      page += 1;
    }

    // Aggregate contributions by day (YYYY-MM-DD), collect project IDs, and count MRs
    const heatmap: Record<string, number> = {};
    const projectIds = new Set<number>();
    let mrOpened = 0;

    events.forEach((ev: any) => {
      if (!ev.created_at) return;
      const date = ev.created_at.slice(0, 10); // YYYY-MM-DD

      // GitLab's profile heatmap counts each user activity event as 1 contribution point.
      heatmap[date] = (heatmap[date] || 0) + 1;

      if (ev.project_id) {
        projectIds.add(ev.project_id);
      }

      // Count Merge Requests opened by this user
      if (ev.target_type === 'MergeRequest' && ev.action_name === 'opened') {
        mrOpened++;
      }
    });

    // "Merged" = MRs authored by this user that were merged (by the company/anyone),
    // fetched from the merge_requests API — NOT events (events only track who accepted).
    let mrMerged = 0;
    try {
      const mrRes = await fetch(
        `${gitlabUrl}/api/v4/merge_requests?author_id=${userId}&scope=all&state=merged&per_page=100`,
        {
          headers: {
            'PRIVATE-TOKEN': token,
          },
        }
      );
      if (mrRes.ok) {
        const mrList: any = await mrRes.json();
        mrMerged = Array.isArray(mrList) ? mrList.length : 0;
      }
    } catch (err) {
      console.error('Failed to fetch merged MRs:', err);
    }

    // Fetch languages for the active projects (limit to first 5 projects to keep it fast)
    const uniqueProjectIds = Array.from(projectIds).slice(0, 5);
    const languageTotals: Record<string, number> = {};

    await Promise.all(
      uniqueProjectIds.map(async (pid) => {
        try {
          const langRes = await fetch(`${gitlabUrl}/api/v4/projects/${pid}/languages`, {
            headers: {
              'PRIVATE-TOKEN': token,
            },
          });
          if (langRes.ok) {
            const langs: any = await langRes.json();
            Object.entries(langs).forEach(([lang, val]: [string, any]) => {
              languageTotals[lang] = (languageTotals[lang] || 0) + val;
            });
          }
        } catch (err) {
          console.error(`Failed to fetch languages for project ${pid}:`, err);
        }
      })
    );

    // Normalize languages to percentages
    const totalLangValue = Object.values(languageTotals).reduce((sum, val) => sum + val, 0);
    const languages = Object.entries(languageTotals)
      .map(([name, value]) => ({
        name,
        percentage: totalLangValue > 0 ? Math.round((value / totalLangValue) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=600, s-maxage=3600',
      },
      body: JSON.stringify({
        heatmap,
        stats: {
          totalEvents: events.length,
          daysActive: Object.keys(heatmap).length,
          mergeRequests: {
            opened: mrOpened,
            merged: mrMerged,
          },
          languages,
        },
      }),
    };
  } catch (error: any) {
    console.error('Error fetching GitLab activity:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to fetch GitLab activity',
        message: error?.message || 'Unknown error',
      }),
    };
  }
}

if (process.argv[1]?.includes('gitlab-activity')) {
  handler({}, {}).then(res => console.log(JSON.stringify(res, null, 2)));
}
