import { stats } from "../data";

export default function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center backdrop-blur-xl"
          >
            <div className="text-3xl font-semibold text-lime-300">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
