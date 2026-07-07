import type { Metadata } from "next";
import About from "../components/About";
import EducationAndAchievements from "../components/EducationAndAchievements";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import SectionHeading from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Contents | Vikash Kumar",
  description:
    "Full experience, skills, projects, and education for Vikash Kumar.",
};

export default function ContentsPage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 pt-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="Contents"
          description="The full picture — skills, career history, key projects, and background."
        />
      </div>
      <About />
      <Experience />
      <Projects />
      <EducationAndAchievements />
    </>
  );
}
