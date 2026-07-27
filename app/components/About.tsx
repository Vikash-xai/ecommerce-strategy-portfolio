import { education, profile } from "../data";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading eyebrow="About" title="Who I am" />

      <p className="max-w-2xl text-base leading-7 text-slate-300">
        {profile.summary}
      </p>

      <div className="mt-10">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-lime-400">
          Education
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          {education.map((e) => (
            <div
              key={e.school}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
            >
              <div className="text-sm font-semibold text-white">{e.degree}</div>
              <div className="mt-1 text-sm text-slate-400">
                {e.school} &middot; {e.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
