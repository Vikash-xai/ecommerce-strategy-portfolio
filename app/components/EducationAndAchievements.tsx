import { Award, GraduationCap } from "lucide-react";
import { achievements, education } from "../data";
import SectionHeading from "./SectionHeading";

export default function EducationAndAchievements() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading eyebrow="Background" title="Education & Achievements" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <GraduationCap className="h-4 w-4 text-fuchsia-300" />
            Education
          </div>
          <div className="flex flex-col gap-5">
            {education.map((item) => (
              <div key={item.school}>
                <p className="text-sm font-medium text-white">{item.school}</p>
                <p className="text-sm text-zinc-400">{item.degree}</p>
                <p className="text-xs text-zinc-500">{item.period}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <Award className="h-4 w-4 text-fuchsia-300" />
            Achievements
          </div>
          <ul className="flex flex-col gap-3">
            {achievements.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-6 text-zinc-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
