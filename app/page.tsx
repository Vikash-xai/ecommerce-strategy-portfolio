const skills = [
  "Marketplace Strategy",
  "Growth Analytics",
  "Pricing Optimization",
  "Customer Segmentation",
  "A/B Testing",
  "SQL & Data Visualization",
  "Competitive Analysis",
  "P&L Ownership",
];

const experience = [
  {
    role: "E-commerce Strategy Analyst",
    company: "Company Name",
    period: "2023 — Present",
    description:
      "Drive growth strategy across marketplaces, partnering with product and marketing teams to improve conversion, retention, and unit economics.",
  },
  {
    role: "Business Analyst, Digital Commerce",
    company: "Previous Company",
    period: "2021 — 2023",
    description:
      "Built forecasting models and dashboards to guide merchandising and promotional strategy, translating data into actionable recommendations.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-8 sm:px-0">
        <span className="text-sm font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          Vikash Kumar
        </span>
        <nav className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <a href="#about" className="hover:text-zinc-950 dark:hover:text-zinc-50">
            About
          </a>
          <a href="#experience" className="hover:text-zinc-950 dark:hover:text-zinc-50">
            Experience
          </a>
          <a href="#contact" className="hover:text-zinc-950 dark:hover:text-zinc-50">
            Contact
          </a>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-24 px-6 py-16 sm:px-0">
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Vikash Kumar
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            E-commerce Strategy Analyst
          </p>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I help e-commerce businesses turn data into growth — from
            marketplace strategy and pricing to customer retention and
            operational efficiency.
          </p>
        </section>

        <section id="about" className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            About
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            I&apos;m a strategy analyst focused on e-commerce growth — using
            data to guide decisions on pricing, merchandising, and customer
            experience. I work closely with product, marketing, and
            operations teams to turn insight into measurable revenue impact.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="experience" className="flex flex-col gap-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            Experience
          </h2>
          <div className="flex flex-col gap-8">
            {experience.map((job) => (
              <div key={job.role} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                    {job.role}
                  </h3>
                  <span className="text-sm text-zinc-500 dark:text-zinc-500">
                    {job.period}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {job.company}
                </p>
                <p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            Contact
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Open to new opportunities and collaborations in e-commerce
            strategy.
          </p>
          <a
            href="mailto:kvikash0882@gmail.com"
            className="w-fit rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            kvikash0882@gmail.com
          </a>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-3xl px-6 py-8 text-sm text-zinc-500 sm:px-0">
        © {new Date().getFullYear()} Vikash Kumar
      </footer>
    </div>
  );
}
