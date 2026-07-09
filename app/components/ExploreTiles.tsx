import { ArrowRight, FileText, Image as ImageIcon, Newspaper, Paintbrush } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const tiles = [
  {
    href: "/contents",
    icon: FileText,
    title: "Contents",
    description: "Full experience, skills, projects, and education.",
  },
  {
    href: "/pictures",
    icon: ImageIcon,
    title: "Pictures",
    description: "A visual look at the work and moments behind it.",
  },
  {
    href: "/articles",
    icon: Newspaper,
    title: "Articles",
    description: "Writing on retail analytics and e-commerce strategy.",
  },
  {
    href: "/visualizer",
    icon: Paintbrush,
    title: "Visualizer",
    description: "Preview Asian Paints shades on your own room photos.",
  },
];

export default function ExploreTiles() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading eyebrow="Explore" title="More to see" />

      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-colors hover:border-lime-400/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/10 text-lime-300">
              <tile.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-white">
                {tile.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                {tile.description}
              </p>
            </div>
            <span className="mt-auto flex items-center gap-1 text-sm font-medium text-lime-300">
              View
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
