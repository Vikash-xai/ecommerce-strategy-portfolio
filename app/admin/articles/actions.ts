"use server";

import { ADMIN_EMAIL, auth } from "@/auth";
import { readJsonFile, writeJsonFile, type CommitResult } from "@/app/lib/githubData";
import type { Article } from "@/app/articles/articlesData";

const FILE_PATH = "app/articles/articles.json";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveArticle(
  input: { title: string; date: string; excerpt: string; body: string },
  originalSlug?: string
): Promise<CommitResult> {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) {
    return { ok: false, error: "Not authorized." };
  }

  const title = input.title.trim();
  const date = input.date.trim();
  const body = input.body.trim();
  const excerpt = input.excerpt.trim();

  if (!title || !date || !body) {
    return { ok: false, error: "Title, date, and body are required." };
  }

  const slug = originalSlug ?? slugify(title);
  if (!slug) {
    return { ok: false, error: "Couldn't derive a URL slug from that title." };
  }

  try {
    const { data: current, sha } = await readJsonFile<Article[]>(FILE_PATH, []);
    const withoutOriginal = originalSlug
      ? current.filter((a) => a.slug !== originalSlug)
      : current;

    if (withoutOriginal.some((a) => a.slug === slug)) {
      return {
        ok: false,
        error: "Another article already uses this title/slug. Use a different title.",
      };
    }

    const next: Article[] = [...withoutOriginal, { slug, title, date, excerpt, body }];
    return await writeJsonFile(
      FILE_PATH,
      next,
      `${originalSlug ? "Update" : "Add"} article: ${title}`,
      sha
    );
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function deleteArticle(slug: string): Promise<CommitResult> {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) {
    return { ok: false, error: "Not authorized." };
  }

  try {
    const { data: current, sha } = await readJsonFile<Article[]>(FILE_PATH, []);
    const next = current.filter((a) => a.slug !== slug);
    return await writeJsonFile(FILE_PATH, next, `Delete article: ${slug}`, sha);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
