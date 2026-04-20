"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  photos: string[];
  alt:    string;
}

export default function PhotoGallery({ photos, alt }: Props) {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setActive(i => (i + 1) % photos.length), [photos.length]);

  if (photos.length === 0) return null;

  return (
    <div className="mb-6">
      {/* Main photo */}
      <div className="relative h-72 md:h-[480px] rounded-2xl overflow-hidden bg-gray-100 group">
        <Image
          key={active}
          src={photos[active]}
          alt={`${alt} — photo ${active + 1} of ${photos.length}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 65vw"
          priority={active === 0}
        />

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {active + 1} / {photos.length}
        </div>

        {/* Arrows — only shown when >1 photo */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip — show up to 8 */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {photos.slice(0, 8).map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={url}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
          {photos.length > 8 && (
            <div className="flex-shrink-0 w-20 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
              +{photos.length - 8} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}
