import { profile } from "@/data/site";

/*
 * Server-side GitHub data.
 *
 * Fetched once per revalidation window instead of from every visitor's
 * browser, so we avoid the unauthenticated 60-requests-per-hour limit and
 * pin the repositories that matter instead of whatever was pushed last.
 * Add an optional GITHUB_TOKEN to raise the rate limit further.
 */

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

const PINNED_REPOS = [
  "Handover",
  "BrandGuard",
  "MaskChat-MERN",
  "BharatCode-Atlas",
];

const requestHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": "aayushbuilds-portfolio",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

function countLanguages(repos) {
  const counts = new Map();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

function pickRepo(repo) {
  return {
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    language: repo.language,
    pushedAt: repo.pushed_at,
    stars: repo.stargazers_count,
  };
}

export async function getGithubData() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${profile.githubHandle}`, {
        headers: requestHeaders,
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(
        `${API}/users/${profile.githubHandle}/repos?per_page=100&sort=pushed`,
        {
          headers: requestHeaders,
          next: { revalidate: REVALIDATE_SECONDS },
        }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub API responded ${userRes.status}/${reposRes.status}`
      );
    }

    const [user, repos] = await Promise.all([userRes.json(), reposRes.json()]);
    if (!Array.isArray(repos)) throw new Error("Unexpected GitHub response");

    const byName = new Map(
      repos.map((repo) => [repo.name.toLowerCase(), repo])
    );
    const pinned = PINNED_REPOS.map((name) =>
      byName.get(name.toLowerCase())
    ).filter(Boolean);

    return {
      ok: true,
      profile: {
        avatarUrl: user.avatar_url,
        publicRepos: user.public_repos,
      },
      pinned: (pinned.length > 0 ? pinned : repos.slice(0, 4)).map(pickRepo),
      languages: countLanguages(repos).slice(0, 4),
    };
  } catch {
    return {
      ok: false,
      profile: null,
      pinned: [],
      languages: [],
    };
  }
}
