import { Sparkles } from "lucide-react";
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

      <div className="grid gap-4 sm:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:border-white/20"
          >
            <h3 className="text-base font-semibold text-white">
              {project.title}
            </h3>
            <p className="flex-1 text-sm leading-6 text-zinc-400">
              {project.description}
            </p>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-fuchsia-300">
              <Sparkles className="h-3.5 w-3.5" />
              {project.highlight}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
