export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  stargazers_count: number
  watchers_count: number
  language: string | null
  default_branch: string
}

export interface PlaygroundExperiment {
  id: number
  title: string
  description: string | null
  githubUrl: string
  liveUrl: string | null
  tags: string[]
  thumbnail: string | null
  updatedAt: string
}

/**
 * Outcome of a playground fetch.
 *
 * Failure is modelled explicitly so the page can tell "Haris has no
 * experiments" apart from "GitHub refused the request". Collapsing both into an
 * empty array is what previously made rate limiting look like an empty
 * playground.
 */
export type PlaygroundResult =
  | { ok: true; experiments: PlaygroundExperiment[] }
  | { ok: false; error: string }

const GITHUB_API_BASE = "https://api.github.com"
const PLAYGROUND_PREFIX = "playground-"

/**
 * Repos that belong on the playground page despite not carrying the
 * `playground-` prefix, keyed by repo name. Each value overrides the metadata
 * GitHub reports for that repo.
 */
const EXTRA_REPOS: Record<
  string,
  Partial<Pick<PlaygroundExperiment, "title" | "liveUrl">>
> = {
  // The taste-dna.com domain has been retired, so drop the dead live URL and
  // let the card fall back to the GitHub repo.
  tastedna: { title: "TasteDNA", liveUrl: null },
}

/**
 * Fetch every repository that belongs on the playground page.
 *
 * Deliberately a single API call: the playground repos and the EXTRA_REPOS both
 * come out of the user's repo listing, so querying extras individually only
 * burned extra rate limit.
 *
 * @param username - GitHub username (e.g., "harisovcina")
 */
export async function fetchPlaygroundRepos(
  username: string
): Promise<PlaygroundResult> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    // Without a token GitHub allows 60 requests/hour per IP. Serverless egress
    // IPs are shared, so that budget is usually already spent by someone else.
    // A token raises the limit to 5000/hour and scopes it to us.
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      const reason =
        response.status === 403 || response.status === 429
          ? `rate limited (${response.status}) - set GITHUB_TOKEN to raise the limit`
          : `${response.status} ${response.statusText}`

      console.error(`GitHub API error fetching repos for ${username}: ${reason}`)
      return { ok: false, error: reason }
    }

    const repos: GitHubRepo[] = await response.json()

    // Extras lead, then the playground- repos in most-recently-updated order.
    const extras = repos.filter((repo) => repo.name in EXTRA_REPOS)
    const playground = repos.filter((repo) =>
      repo.name.startsWith(PLAYGROUND_PREFIX)
    )

    return { ok: true, experiments: [...extras, ...playground].map(toExperiment) }
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown error"

    console.error(`Error fetching playground repos for ${username}: ${reason}`)
    return { ok: false, error: reason }
  }
}

/**
 * Map a GitHub repo onto a playground card, applying any EXTRA_REPOS overrides.
 */
function toExperiment(repo: GitHubRepo): PlaygroundExperiment {
  return {
    id: repo.id,
    title: cleanPlaygroundTitle(repo.name),
    description: repo.description,
    githubUrl: repo.html_url,
    liveUrl: repo.homepage,
    tags: repo.topics || [],
    thumbnail: getThumbnailUrl(repo),
    updatedAt: repo.updated_at,
    ...EXTRA_REPOS[repo.name],
  }
}

/**
 * Clean the playground title by removing prefix and formatting
 * @param repoName - Repository name (e.g., "playground-button-morph")
 * @returns Cleaned title (e.g., "Button Morph")
 */
function cleanPlaygroundTitle(repoName: string): string {
  return repoName
    .replace(PLAYGROUND_PREFIX, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Get the URL of the repo's preview.png, cache-busted on the repo's last push
 * so refreshed previews appear at the next revalidation.
 */
function getThumbnailUrl(repo: GitHubRepo): string {
  const timestamp = new Date(repo.pushed_at).getTime()

  return `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/preview.png?t=${timestamp}`
}
