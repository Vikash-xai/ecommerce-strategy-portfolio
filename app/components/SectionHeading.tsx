export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <span className="text-xs font-semibold uppercase tracking-widest text-lime-400">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
