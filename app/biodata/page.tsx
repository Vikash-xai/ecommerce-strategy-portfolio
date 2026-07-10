import type { Metadata } from "next";
import { User } from "lucide-react";
import type { ReactNode } from "react";
import { education, profile } from "../data";
import SectionHeading from "../components/SectionHeading";
import PrintButton from "./PrintButton";
import {
  aboutMe,
  astrologicalDetails,
  familyDetails,
  personalDetails,
  professionalDetails,
  type Field,
} from "./biodataData";

export const metadata: Metadata = {
  title: "Biodata | Vikash Kumar",
  description: "Vikash Kumar's biodata.",
};

const MUTED = "#6b5a3f";
const GOLD = "#B8892B";
const MAROON = "#6B1E23";
const INK = "#2A1810";

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1" style={{ backgroundColor: GOLD }} />
      <span className="h-2 w-2 rotate-45" style={{ backgroundColor: GOLD }} />
      <span className="h-px flex-1" style={{ backgroundColor: GOLD }} />
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mt-9 mb-3 flex items-center gap-3 first:mt-0">
      <h3
        className="shrink-0 text-xs font-bold uppercase tracking-[0.22em]"
        style={{ color: MAROON }}
      >
        {children}
      </h3>
      <span className="h-px flex-1" style={{ backgroundColor: `${GOLD}66` }} />
    </div>
  );
}

function FieldRow({ label, value }: Field) {
  return (
    <div
      className="grid grid-cols-[minmax(130px,42%)_1fr] gap-4 border-b border-dotted py-2 last:border-none"
      style={{ borderColor: `${GOLD}59` }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-wider sm:text-xs"
        style={{ color: MUTED }}
      >
        {label}
      </span>
      {value ? (
        <span className="text-sm sm:text-[15px]" style={{ color: INK }}>
          {value}
        </span>
      ) : (
        <span className="text-sm italic" style={{ color: MUTED }}>
          — add {label.toLowerCase()} —
        </span>
      )}
    </div>
  );
}

export default function BiodataPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="print:hidden">
        <SectionHeading
          eyebrow="Personal"
          title="Biodata"
          description="A traditional-format biodata. Fields marked “— add …” are still to be filled in — send over the details and they'll be added here."
        />

        <div className="mb-8 flex justify-center">
          <PrintButton />
        </div>
      </div>

      <div
        className="rounded-lg p-2 shadow-2xl shadow-black/40 print:shadow-none"
        style={{ backgroundColor: MAROON }}
      >
        <div
          className="rounded-md border-2 px-6 py-10 sm:px-12 sm:py-14"
          style={{
            borderColor: GOLD,
            backgroundColor: "#FBF3E7",
            color: INK,
            fontFamily:
              "Georgia, 'Iowan Old Style', 'Palatino Linotype', ui-serif, serif",
          }}
        >
          <Divider />

          <p
            className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: MUTED }}
          >
            Matrimonial Biodata
          </p>
          <h1
            className="mt-2 text-center text-4xl font-semibold tracking-wide sm:text-5xl"
            style={{ color: MAROON }}
          >
            {profile.name}
          </h1>
          <p className="mt-2 text-center text-sm italic" style={{ color: MUTED }}>
            {profile.title}
          </p>

          <div
            className="mx-auto mt-8 flex h-40 w-32 flex-col items-center justify-center gap-2 rounded border-2 border-dashed"
            style={{ borderColor: `${GOLD}99`, color: MUTED }}
          >
            <User className="h-8 w-8" />
            <span className="text-[11px] uppercase tracking-wide">Add Photo</span>
          </div>

          <div className="mt-8">
            <Divider />
          </div>

          <SectionTitle>Personal Details</SectionTitle>
          {personalDetails.map((f) => (
            <FieldRow key={f.label} {...f} />
          ))}

          <SectionTitle>Family Details</SectionTitle>
          {familyDetails.map((f) => (
            <FieldRow key={f.label} {...f} />
          ))}

          <SectionTitle>Education &amp; Career</SectionTitle>
          {professionalDetails.map((f) => (
            <FieldRow key={f.label} {...f} />
          ))}
          {education.map((e) => (
            <FieldRow
              key={e.school}
              label={e.degree}
              value={`${e.school} (${e.period})`}
            />
          ))}

          <SectionTitle>Astrological Details</SectionTitle>
          {astrologicalDetails.map((f) => (
            <FieldRow key={f.label} {...f} />
          ))}

          <SectionTitle>About Me</SectionTitle>
          <p className="text-[15px] leading-7" style={{ color: "#3a2a1c" }}>
            {aboutMe}
          </p>

          <SectionTitle>Contact Details</SectionTitle>
          <FieldRow label="Email" value={profile.email} />
          <FieldRow label="Phone" value={profile.phone} />
          <FieldRow label="Current Address" value={profile.location} />
          <FieldRow label="LinkedIn" value={profile.linkedin} />

          <div className="mt-9">
            <Divider />
          </div>
          <p className="mt-4 text-center text-[11px] italic" style={{ color: MUTED }}>
            Fields marked “— add …” are yet to be completed.
          </p>
        </div>
      </div>
    </div>
  );
}
