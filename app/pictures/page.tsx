import type { Metadata } from "next";
import { ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ADMIN_EMAIL, auth } from "@/auth";
import SectionHeading from "../components/SectionHeading";
import { sortedPictures } from "./picturesData";

export const metadata: Metadata = {
  title: "Pictures | Vikash Kumar",
  description: "A visual gallery from Vikash Kumar.",
};

export default async function PicturesPage() {
  const session = await auth();
  const isAuthorized = session?.user?.email === ADMIN_EMAIL;
  const pictures = sortedPictures();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Gallery"
          title="Pictures"
          description="A space for photos and visual work."
        />
        <Link
          href="/admin/pictures"
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <Pencil className="h-4 w-4" />
          {isAuthorized ? "Edit" : "Admin"}
        </Link>
      </div>

      {pictures.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-400/10 text-lime-300">
            <ImageIcon className="h-6 w-6" />
          </span>
          <p className="text-base font-medium text-white">No pictures yet</p>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Photos added from the admin panel will show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pictures.map((picture) => (
            <figure
              key={picture.url}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-square">
                <Image
                  src={picture.url}
                  alt={picture.caption || "Photo"}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {picture.caption ? (
                <figcaption className="px-4 py-3 text-sm text-slate-400">
                  {picture.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
