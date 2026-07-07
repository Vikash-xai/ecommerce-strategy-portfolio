import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Articles | Vikash Kumar",
  description: "Writing from Vikash Kumar on retail and e-commerce analytics.",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading
        eyebrow="Writing"
        title="Articles"
        description="Thoughts on retail analytics, merchandising strategy, and e-commerce growth."
      />

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
    </div>
  );
}
