"use client";

import { Download, Info, Trash2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import PaintCanvas, { type Region } from "./PaintCanvas";
import { paintColorFamilies } from "./paintColors";

type UploadedImage = {
  id: string;
  name: string;
  url: string;
  regions: Region[];
};

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function VisualizerApp() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState(paintColorFamilies[0].colors[0].hex);
  const [opacityPercent, setOpacityPercent] = useState(85);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      // Intentionally reads the accumulated ref at unmount time, not a DOM node ref.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const activeImage = images.find((img) => img.id === activeImageId) ?? null;

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages: UploadedImage[] = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => {
        const url = URL.createObjectURL(file);
        objectUrlsRef.current.push(url);
        return { id: makeId(), name: file.name, url, regions: [] };
      });
    if (newImages.length === 0) return;

    setImages((prev) => [...prev, ...newImages]);
    setActiveImageId((prev) => prev ?? newImages[0].id);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      const next = prev.filter((img) => img.id !== id);
      setActiveImageId((current) => {
        if (current !== id) return current;
        return next.length > 0 ? next[0].id : null;
      });
      return next;
    });
  };

  const updateRegions = (imageId: string, regions: Region[]) => {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, regions } : img))
    );
  };

  const deleteRegion = (regionId: string) => {
    if (!activeImage) return;
    updateRegions(
      activeImage.id,
      activeImage.regions.filter((r) => r.id !== regionId)
    );
  };

  const clearRegions = () => {
    if (!activeImage) return;
    updateRegions(activeImage.id, []);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !activeImage) return;
    const link = document.createElement("a");
    link.download = `visualized-${activeImage.name || "room"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Try It"
        title="Paint Visualizer"
        description="Upload photos of your room, pick a wall or ceiling, and preview it in real Asian Paints shades."
      />

      <div className="mb-8 flex items-start gap-2 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4 text-sm leading-6 text-slate-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-lime-300" />
        <p>
          Shade names are from Asian Paints&apos; published catalogue. Hex
          values shown here are digital approximations for preview only —
          Asian Paints doesn&apos;t publish official screen colour codes, so
          always confirm against a physical swatch before painting.
        </p>
      </div>

      <div
        className="mb-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-8 text-center transition-colors hover:border-lime-400/30"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
      >
        <Upload className="h-6 w-6 text-lime-300" />
        <p className="text-sm text-slate-300">
          Drop photos here or click to upload — multiple at once
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {images.length > 0 ? (
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {images.map((img) => (
            <div key={img.id} className="relative shrink-0">
              <button
                onClick={() => setActiveImageId(img.id)}
                className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${
                  img.id === activeImageId
                    ? "border-lime-400"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.name}
                  className="h-full w-full object-cover"
                />
              </button>
              <button
                onClick={() => removeImage(img.id)}
                aria-label={`Remove ${img.name}`}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#060d1f] text-slate-300 ring-1 ring-white/15 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          {activeImage ? (
            <>
              <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <label className="flex flex-1 items-center gap-3 text-sm text-slate-300">
                  Opacity
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={opacityPercent}
                    onChange={(e) => setOpacityPercent(Number(e.target.value))}
                    className="flex-1 accent-lime-400"
                  />
                  <span className="w-10 text-right text-slate-400">
                    {opacityPercent}%
                  </span>
                </label>
                <button
                  onClick={clearRegions}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear regions
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-1.5 text-xs font-semibold text-[#060d1f] shadow-lg shadow-lime-400/20 transition-shadow hover:shadow-lime-400/40"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>

              <PaintCanvas
                ref={canvasRef}
                imageUrl={activeImage.url}
                regions={activeImage.regions}
                onRegionsChange={(regions) => updateRegions(activeImage.id, regions)}
                activeColor={activeColor}
                opacity={opacityPercent / 100}
              />

              <p className="text-xs text-slate-500">
                Pick a colour on the right, then drag to trace a wall or
                ceiling. Click an existing painted area to recolour it.
              </p>
            </>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-center text-slate-500">
              <Upload className="h-6 w-6" />
              <p className="text-sm">Upload a photo to get started</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Asian Paints Colours
            </h3>
            <div className="flex max-h-[420px] flex-col gap-4 overflow-y-auto pr-1">
              {paintColorFamilies.map((family) => (
                <div key={family.family}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {family.family}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {family.colors.map((color) => (
                      <button
                        key={color.name}
                        title={color.name}
                        aria-label={color.name}
                        onClick={() => setActiveColor(color.hex)}
                        style={{ backgroundColor: color.hex }}
                        className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-[#060d1f] transition-transform hover:scale-110 ${
                          activeColor === color.hex
                            ? "ring-lime-400"
                            : "ring-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {activeImage && activeImage.regions.length > 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <h3 className="mb-4 text-sm font-semibold text-white">
                Painted Areas
              </h3>
              <ul className="flex flex-col gap-2">
                {activeImage.regions.map((region, i) => (
                  <li
                    key={region.id}
                    className="flex items-center justify-between gap-2 text-sm text-slate-300"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full border border-white/15"
                        style={{ backgroundColor: region.color }}
                      />
                      Area {i + 1}
                    </span>
                    <button
                      onClick={() => deleteRegion(region.id)}
                      aria-label={`Delete area ${i + 1}`}
                      className="text-slate-500 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
