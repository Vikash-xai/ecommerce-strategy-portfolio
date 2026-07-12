"use client";

import { useActionState } from "react";
import type { Field } from "../../biodata/biodataData";
import { saveBiodata, type SaveResult } from "./actions";

function FieldInput({ name, field }: { name: string; field: Field }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-slate-300">{field.label}</span>
      <input
        type="text"
        name={name}
        defaultValue={field.value ?? ""}
        placeholder="Leave blank to show as not yet added"
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-600 focus:border-lime-400/50 focus:outline-none"
      />
    </label>
  );
}

function FieldSection({
  title,
  prefix,
  fields,
}: {
  title: string;
  prefix: string;
  fields: Field[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-lime-400">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <FieldInput key={f.label} name={`${prefix}__${f.label}`} field={f} />
        ))}
      </div>
    </section>
  );
}

export default function EditBiodataForm({
  personalDetails,
  familyDetails,
  astrologicalDetails,
  professionalDetails,
  aboutMe,
}: {
  personalDetails: Field[];
  familyDetails: Field[];
  astrologicalDetails: Field[];
  professionalDetails: Field[];
  aboutMe: string;
}) {
  const [state, formAction, pending] = useActionState<SaveResult | null, FormData>(
    saveBiodata,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <FieldSection title="Personal Details" prefix="personal" fields={personalDetails} />
      <FieldSection title="Family Details" prefix="family" fields={familyDetails} />
      <FieldSection
        title="Astrological Details"
        prefix="astro"
        fields={astrologicalDetails}
      />
      <FieldSection
        title="Education & Career"
        prefix="professional"
        fields={professionalDetails}
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-lime-400">
          About Me
        </h2>
        <textarea
          name="aboutMe"
          defaultValue={aboutMe}
          rows={6}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-white focus:border-lime-400/50 focus:outline-none"
        />
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-lime-400 px-6 py-2.5 text-sm font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state?.ok === true ? (
          <span className="text-sm text-lime-300">
            Saved — live on the site in about a minute.
          </span>
        ) : null}
        {state?.ok === false ? (
          <span className="text-sm text-red-400">{state.error}</span>
        ) : null}
      </div>
    </form>
  );
}
