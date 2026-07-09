import { ExternalLink, Sparkles } from "lucide-react";
import { projects } from "../data";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading
        eyebrow="Key Projects"
        title="Selected Work"
        description="Initiatives that combined data, strategy, and cross-functional execution to move the needle."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-colors hover:border-lime-400/30"
          >
            <h3 className="text-base font-semibold text-white">
              {project.title}
            </h3>
            <p className="flex-1 text-sm leading-6 text-slate-400">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1.5 text-xs font-medium text-lime-300">
                <Sparkles className="h-3.5 w-3.5" />
                {project.highlight}
              </div>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View code
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
