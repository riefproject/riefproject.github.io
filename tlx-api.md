# TLX API (api.tlx.toki.id) — Technical Reference & Quirks

## 1. Overview & Architecture

- **Base URL:** `https://api.tlx.toki.id/v2`
- **Type:** Unofficial / Internal REST API used by TLX frontend (IA-TOKI).
- **Authentication:**
  - Public Endpoints (No Auth Required): Submissions, Username Search, Public Profiles.
  - Authenticated Endpoints: `/v2/courses` (Requires `Authorization: Bearer <token>` or session cookies for user-specific data).

---

## 2. Key Endpoints Reference

### A. Username to JID Mapping

- **Endpoint:** `POST /v2/user-search/username-to-jid`
- **Payload:** `["username1", "username2"]` (Array of strings, supports batching).
- **Response:** `{"username1": "JIDUSER...", "username2": "JIDUSER..."}`
- **Use Case:** Convert human-readable handles to TLX internal unique identifiers (`JID`).

### B. Programming Submissions (Public Feed)

- **Endpoint:** `GET /v2/submissions/programming`
- **Query Parameters:**
  - `username` (string): Target TLX username handle (e.g., `username=fnsd`).
  - `beforeId` (integer): Cursor ID for pagination.
  - `containerJid` (string, optional): Filter submissions by Course/Contest Chapter JID.
  - `userJid` (string, optional): Target user's JID.
- **Default Limit:** 20 items per response page.

### C. Courses Overview & Progress

- **Endpoint:** `GET /v2/courses`
- **Behavior:** Returns course metadata (`data`) and user progress (`courseProgressesMap`).
- **CRITICAL QUIRK:** Without a valid User Session/Bearer Token header, `courseProgressesMap` ALWAYS returns `0 / totalProblems` for all courses regardless of URL parameters (e.g., `?username=...` or `?userJid=...` are ignored).

---

## 3. Data Structure & Mapping Schema

The submission API returns a normalized relational structure:

### Submissions Payload Structure

```json
{
  "data": {
    "page": [
      {
        "id": 5777718,
        "jid": "JIDSUBM...",
        "userJid": "JIDUSER...",
        "problemJid": "JIDPROG...",
        "containerJid": "JIDSESS...",
        "gradingLanguage": "Cpp20",
        "time": 1785911358083, // Epoch milliseconds
        "latestGrading": {
          "verdict": { "code": "AC" }, // AC, WA, TLE, RTE, CE
          "score": 100
        }
      }
    ],
    "hasNextPage": false
  },
  "profilesMap": { "JIDUSER...": { "username": "aycaaa" } },
  "problemNamesMap": { "JIDPROG...": "Problem Title Here" },
  "containerNamesMap": { "JIDSESS...": "Chapter Name Here" },
  "problemAliasesMap": { "JIDSESS...-JIDPROG...": "A" }
}
```

### Entity Hierarchy

- **Course** (e.g., _Pemrograman Dasar C++_ -> `JIDCOUR...`)
- **Chapter / Container** (e.g., _Keluaran dan Ekspresi Sederhana_ -> `JIDSESS...`)
- **Problem** (e.g., _Program Pertamaku_ -> `JIDPROG...`)

_Note: In `data.page[i].containerJid`, the ID refers to the **Chapter/Container JID**, NOT the top-level Course JID._

---

## 4. API Quirks, Pitfalls & Solutions (AGENT MUST FOLLOW)

### Quirk 1: Inaccurate `hasNextPage` Flag

- **Issue:** The API often returns `"hasNextPage": false` even when hundreds of older submissions exist for the user.
- **Solution:** NEVER rely on `hasNextPage` as the sole condition to stop fetching. Continue fetching until the API returns an empty `page: []` array OR the lowest ID passes a predefined threshold (`stopAtId`).

### Quirk 2: The Inclusive Cursor Trap (Infinite Loop / Early Termination)

- **Issue:** `beforeId` behaves as **inclusive** (`<=`). When a user makes $\ge 20$ consecutive submissions on the same problem (or in a short timeframe), the 20th item of Page N has the same or sequential ID. Passing `beforeId = lastIdFromCurrentPage` will cause the API to re-fetch the exact same 20 records.
- **Solution:** ALWAYS offset the cursor by -1:
  `nextBeforeId = lastIdFromCurrentPage - 1;`
  This forces the SQL query to fetch strictly smaller IDs (`< lastId`).

### Quirk 3: User Progress Resolution Without Auth

- **Issue:** `/v2/courses` cannot be used to monitor student progress publicly.
- **Solution:** Fetch the complete submission history via `/v2/submissions/programming?username={handle}` using the `-1` cursor offset, then aggregate unique `AC` verdicts mapped against problem titles/containers locally.

---

## 5. Reference Node.js Implementation (Gold Standard Scraping Algorithm)

When asked to write or execute a TLX scraper, the AI agent MUST utilize this exact logic:

```javascript
async function fetchAllTlxSubmissions(username) {
  let allSubmissions = [];
  let beforeId = null;
  let isFinished = false;

  while (!isFinished) {
    let url =
      `[https://api.tlx.toki.id/v2/submissions/programming?username=$](https://api.tlx.toki.id/v2/submissions/programming?username=$){username}` +
      (beforeId ? `&beforeId=${beforeId}` : "");

    try {
      const res = await fetch(url);
      if (!res.ok) break;

      const json = await res.json();
      const page = json.data?.page || [];

      if (page.length === 0) break; // Hard stop on empty array

      const mappedPage = page.map((item) => ({
        id: item.id,
        username: json.profilesMap?.[item.userJid]?.username || username,
        containerName: json.containerNamesMap?.[item.containerJid] || "N/A",
        problemName: json.problemNamesMap?.[item.problemJid] || "N/A",
        problemAlias:
          json.problemAliasesMap?.[`${item.containerJid}-${item.problemJid}`] ||
          "-",
        language: item.gradingLanguage,
        verdict: item.latestGrading?.verdict?.code || "N/A",
        score: item.latestGrading?.score ?? 0,
        submittedAt: new Date(item.time).toISOString(),
      }));

      allSubmissions.push(...mappedPage);

      const lastId = page[page.length - 1].id;

      // CRITICAL FIX: Offset by -1 to break inclusive cursor loop
      beforeId = lastId - 1;

      if (page.length < 20) {
        isFinished = true; // Natural end of data stream
      } else {
        await new Promise((r) => setTimeout(r, 100)); // Rate limiting buffer
      }
    } catch (err) {
      console.error(`Error fetching TLX data for ${username}:`, err.message);
      break;
    }
  }

  return allSubmissions;
}
```
