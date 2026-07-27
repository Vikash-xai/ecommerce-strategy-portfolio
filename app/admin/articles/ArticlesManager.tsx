"use client";

import { useState, useTransition } from "react";
import type { Article } from "../../articles/articlesData";
import { deleteArticle, saveArticle } from "./actions";

export default function ArticlesManager({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [editing, setEditing] = useState<Article | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; error?: string } | null>(null);

  const showForm = isNew || editing !== null;

  function closeForm() {
    setIsNew(false);
    setEditing(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "");
    const date = String(form.get("date") ?? "");
    const excerpt = String(form.get("excerpt") ?? "");
    const body = String(form.get("body") ?? "");

    setStatus(null);
    startTransition(async () => {
      const result = await saveArticle({ title, date, excerpt, body }, editing?.slug);
      if (result.ok) {
        // Re-fetch isn't wired here; reflect optimistically using what we sent.
        const slug = editing?.slug ?? title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const saved: Article = { slug, title: title.trim(), date: date.trim(), excerpt: excerpt.trim(), body: body.trim() };
        setArticles((prev) => {
          const withoutOriginal = editing ? prev.filter((a) => a.slug !== editing.slug) : prev;
          return [...withoutOriginal, saved];
        });
        setStatus({ ok: true });
        closeForm();
      } else {
        setStatus({ ok: false, error: result.error });
      }
    });
  }

  function handleDelete(slug: string) {
    if (!confirm("Delete this article? This can't be undone.")) return;
    setStatus(null);
    startTransition(async () => {
      const result = await deleteArticle(slug);
      if (result.ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
        setStatus({ ok: true });
      } else {
        setStatus({ ok: false, error: result.error });
      }
    });
  }

  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        {sorted.length === 0 ? (
          <p className="text-sm text-slate-400">No articles yet.</p>
        ) : (
          sorted.map((a) => (
            <div
              key={a.slug}
              className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{a.title}</div>
                <div className="text-xs text-slate-400">{a.date}</div>
              </div>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(a);
                    setIsNew(false);
                    setStatus(null);
                  }}
                  className="text-sm font-medium text-lime-300 hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => handleDelete(a.slug)}
                  className="text-sm font-medium text-red-400 hover:underline disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {!showForm ? (
        <button
          type="button"
          onClick={() => {
            setIsNew(true);
            setStatus(null);
          }}
          className="self-start rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40"
        >
          + New article
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-5"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-lime-400">
            {editing ? "Edit article" : "New article"}
          </h2>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-300">Title</span>
            <input
              name="title"
              defaultValue={editing?.title ?? ""}
              required
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-lime-400/50 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-300">Date</span>
            <input
              type="date"
              name="date"
              defaultValue={editing?.date ?? new Date().toISOString().slice(0, 10)}
              required
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-lime-400/50 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-300">Excerpt (optional)</span>
            <input
              name="excerpt"
              defaultValue={editing?.excerpt ?? ""}
              placeholder="A one-line teaser shown on the articles list"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-600 focus:border-lime-400/50 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-300">Body</span>
            <textarea
              name="body"
              rows={12}
              defaultValue={editing?.body ?? ""}
              required
              placeholder="Write in plain text. Leave a blank line between paragraphs."
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-600 focus:border-lime-400/50 focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-lime-400 px-6 py-2.5 text-sm font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="text-sm text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {status?.ok === true ? (
        <span className="text-sm text-lime-300">
          Saved — live on the site in about a minute.
        </span>
      ) : null}
      {status?.ok === false ? (
        <span className="text-sm text-red-400">{status.error}</span>
      ) : null}
    </div>
  );
}
