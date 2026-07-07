import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Pictures | Vikash Kumar",
  description: "A visual gallery from Vikash Kumar's portfolio.",
};

const placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

export default function PicturesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading
        eyebrow="Gallery"
        title="Pictures"
        description="A space for photos and visual work. Images coming soon."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholders.map((n) => (
          <div
            key={n}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] text-slate-500 transition-colors hover:border-lime-400/30"
          >
            <ImageIcon className="h-6 w-6" />
            <span className="text-xs">Add photo</span>
          </div>
        ))}
      </div>
    </div>
  );
}
