"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Props = {
  mapUrl: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  previewLabel?: string;
};

export default function MapPreview({
  mapUrl,
  thumbnailSrc,
  thumbnailAlt,
  previewLabel = "Preview Map",
}: Props) {
  const [open, setOpen] = useState(false);

  // Avoid reloading the iframe on every re-render; only mount when open.
  const iframeSrc = useMemo(() => mapUrl, [mapUrl]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group w-full rounded-lg overflow-hidden border border-zinc-200 bg-white relative cursor-pointer"
        aria-label={previewLabel}
      >
        <div className="relative w-full" style={{ height: 380 }}>
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            fill
            className="object-cover opacity-90 blur-[2px] transition-all duration-500 ease-out group-hover:scale-105 group-hover:blur-0"
            sizes="(max-width: 768px) 100vw, 680px"
            priority={false}
          />
          <div className="absolute inset-0 bg-white/35 transition-colors duration-300 group-hover:bg-white/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/90 px-4 py-2 text-sm text-zinc-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
              </span>
              {previewLabel} →
            </span>
          </div>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="relative h-full w-full flex items-center justify-center p-4">
            <div className="w-full max-w-4xl rounded-lg border border-zinc-200 bg-white overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200">
                <div className="text-sm text-zinc-900">Austin Food Map</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Close
                </button>
              </div>
              <div style={{ height: "70vh" }} className="w-full">
                <iframe
                  src={iframeSrc}
                  title="Austin Food Map"
                  className="w-full h-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

