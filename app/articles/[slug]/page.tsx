import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../articlesData";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article | Vikash Kumar" };
  return {
    title: `${article.title} | Vikash Kumar`,
    description: article.excerpt || undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const paragraphs = article.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/articles"
        className="mb-8 flex w-fit items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to articles
      </Link>

      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {new Date(article.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-8 flex flex-col gap-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-7 text-slate-300">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
