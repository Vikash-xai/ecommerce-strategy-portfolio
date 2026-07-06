import { stats } from "../data";

export default function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-xl"
          >
            <div className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-3xl font-semibold text-transparent">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
