import { experience } from "../data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        description="4+ years driving analytics, merchandising strategy, and operations across the fashion and lifestyle e-commerce domain."
      />

      <div className="relative flex flex-col gap-6 border-l border-white/10 pl-8">
        {experience.map((job) => (
          <div key={job.role} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:border-white/20">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-white">
                  {job.role}
                </h3>
                <span className="text-sm text-zinc-500">{job.period}</span>
              </div>
              <p className="text-sm text-fuchsia-300/80">{job.company}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {job.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm leading-6 text-zinc-400"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
