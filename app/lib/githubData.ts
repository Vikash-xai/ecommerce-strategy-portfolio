const OWNER = "Vikash-xai";
const REPO = "ecommerce-strategy-portfolio";
const BRANCH = "master";

export type CommitResult = { ok: true } | { ok: false; error: string };

function apiUrl(path: string): string {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
}

function headers(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is not configured on the server.");
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/**
 * Always reads the file fresh from GitHub (never from the bundled module
 * cache) so a save is based on the true current state, not a possibly-stale
 * snapshot from before the last redeploy finished.
 */
export async function readJsonFile<T>(
  path: string,
  fallback: T
): Promise<{ data: T; sha?: string }> {
  const res = await fetch(`${apiUrl(path)}?ref=${BRANCH}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (res.status === 404) {
    return { data: fallback };
  }
  if (!res.ok) {
    const errText = await res.text();
    console.error("readJsonFile: failed", path, res.status, errText);
    throw new Error(`Could not read ${path} (${res.status}).`);
  }
  const json = (await res.json()) as { content: string; sha: string };
  const decoded = Buffer.from(json.content, "base64").toString("utf-8");
  return { data: JSON.parse(decoded) as T, sha: json.sha };
}

export async function writeJsonFile<T>(
  path: string,
  data: T,
  message: string,
  sha?: string
): Promise<CommitResult> {
  try {
    const res = await fetch(apiUrl(path), {
      method: "PUT",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf-8").toString(
          "base64"
        ),
        sha,
        branch: BRANCH,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("writeJsonFile: failed", path, res.status, errText);
      return { ok: false, error: `GitHub commit failed (${res.status}).` };
    }
    return { ok: true };
  } catch (err) {
    console.error("writeJsonFile: threw", path, err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
