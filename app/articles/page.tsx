import type { Metadata } from "next";
import { Newspaper, Pencil } from "lucide-react";
import Link from "next/link";
import { ADMIN_EMAIL, auth } from "@/auth";
import SectionHeading from "../components/SectionHeading";
import { sortedArticles } from "./articlesData";

export const metadata: Metadata = {
  title: "Articles | Vikash Kumar",
  description: "Writing from Vikash Kumar on retail and e-commerce analytics.",
};

export default async function ArticlesPage() {
  const session = await auth();
  const isAuthorized = session?.user?.email === ADMIN_EMAIL;
  const articles = sortedArticles();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Writing"
          title="Articles"
          description="Thoughts on retail analytics, merchandising strategy, and e-commerce growth."
        />
        <Link
          href="/admin/articles"
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <Pencil className="h-4 w-4" />
          {isAuthorized ? "Edit" : "Admin"}
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-400/10 text-lime-300">
            <Newspaper className="h-6 w-6" />
          </span>
          <p className="text-base font-medium text-white">
            No articles published yet
          </p>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            New writing on data-driven retail strategy is coming soon. Check
            back later.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-colors hover:border-lime-400/30"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {new Date(article.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <h2 className="text-lg font-semibold text-white group-hover:text-lime-300">
                {article.title}
              </h2>
              {article.excerpt ? (
                <p className="text-sm leading-6 text-slate-400">{article.excerpt}</p>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
