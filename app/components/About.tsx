import { skillGroups } from "../data";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading
        eyebrow="About"
        title="Skills & Tools"
        description="A technical foundation in analytics and BI, paired with deep domain expertise in retail and e-commerce merchandising."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-colors hover:border-lime-400/30"
          >
            <h3 className="text-sm font-semibold text-white">
              {group.label}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
