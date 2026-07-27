"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import type { Picture } from "../../pictures/picturesData";
import { deletePicture, uploadPicture } from "./actions";

export default function PicturesManager({
  initialPictures,
}: {
  initialPictures: Picture[];
}) {
  const [pictures, setPictures] = useState(initialPictures);
  const [uploadPending, startUploadTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; error?: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus(null);
    startUploadTransition(async () => {
      const result = await uploadPicture(null, formData);
      if (result.ok) {
        setPictures((prev) => [...prev, result.picture]);
        formRef.current?.reset();
        setStatus({ ok: true });
      } else {
        setStatus({ ok: false, error: result.error });
      }
    });
  }

  function handleDelete(url: string) {
    if (!confirm("Delete this picture? This can't be undone.")) return;
    setStatus(null);
    startDeleteTransition(async () => {
      const result = await deletePicture(url);
      if (result.ok) {
        setPictures((prev) => prev.filter((p) => p.url !== url));
      } else {
        setStatus({ ok: false, error: result.error });
      }
    });
  }

  const sorted = [...pictures].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

  return (
    <div className="flex flex-col gap-8">
      <form
        ref={formRef}
        onSubmit={handleUpload}
        className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-5"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-lime-400">
          Upload a photo
        </h2>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-300">Image</span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            className="text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-lime-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#060d1f]"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-300">Caption (optional)</span>
          <input
            name="caption"
            placeholder="A short caption for this photo"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-600 focus:border-lime-400/50 focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={uploadPending}
            className="rounded-full bg-lime-400 px-6 py-2.5 text-sm font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40 disabled:opacity-60"
          >
            {uploadPending ? "Uploading…" : "Upload"}
          </button>
          {status?.ok === true ? (
            <span className="text-sm text-lime-300">
              Saved — live on the site in about a minute.
            </span>
          ) : null}
          {status?.ok === false ? (
            <span className="text-sm text-red-400">{status.error}</span>
          ) : null}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-lime-400">
          Existing photos
        </h2>
        {sorted.length === 0 ? (
          <p className="text-sm text-slate-400">No pictures yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <div
                key={p.url}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-square">
                  <Image
                    src={p.url}
                    alt={p.caption || "Photo"}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <span className="truncate text-sm text-slate-400">
                    {p.caption || "—"}
                  </span>
                  <button
                    type="button"
                    disabled={deletePending}
                    onClick={() => handleDelete(p.url)}
                    className="shrink-0 text-sm font-medium text-red-400 hover:underline disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
