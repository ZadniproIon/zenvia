"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ImageViewerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  productName: string;
  brand?: string | null;
};

export function ImageViewerDialog({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
  productName,
  brand,
}: ImageViewerDialogProps) {
  const total = images.length;

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % total);
  }, [currentIndex, total, onSelectIndex]);

  // Handle keyboard navigation and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || images.length === 0 || typeof document === "undefined") return null;

  const currentImage = images[currentIndex] || images[0];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={(e) => {
        // Close if clicking the dark backdrop outside the image/controls
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-5 text-white">
        <div className="flex items-center gap-3">
          {brand && (
            <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {brand}
            </span>
          )}
          <span className="text-sm font-semibold text-white/90 line-clamp-1 max-w-md hidden sm:inline">
            {productName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-white/90 tracking-wider">
            {currentIndex + 1} / {total}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 hover:scale-105 cursor-pointer shadow-md"
            aria-label="Close image viewer"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Previous Arrow Button */}
      {total > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-50 flex size-12 sm:size-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-8" />
        </button>
      )}

      {/* Perfectly Centered Main Image Container with Native Aspect Ratio */}
      <div className="relative flex items-center justify-center p-2 sm:p-4 max-h-[70vh] max-w-[85vw] w-full h-[68vh] sm:h-[72vh]">
        <div className="relative h-full aspect-square max-w-full max-h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#E2E2E2] shadow-2xl">
          <Image
            src={currentImage}
            alt={`${productName} - View ${currentIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1200px) 85vw, 900px"
            className="object-contain transition-all duration-300 select-none"
          />
        </div>
      </div>

      {/* Next Arrow Button */}
      {total > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-50 flex size-12 sm:size-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="size-8" />
        </button>
      )}

      {/* Bottom Thumbnail Navigation Carousel */}
      {total > 1 && (
        <div className="absolute bottom-6 inset-x-0 z-50 flex justify-center px-4">
          <div className="flex items-center gap-3 overflow-x-auto rounded-2xl bg-black/70 p-2.5 backdrop-blur-md max-w-[90vw] shadow-xl">
            {images.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={cn(
                  "relative size-16 sm:size-18 shrink-0 overflow-hidden rounded-xl bg-[#E2E2E2] transition cursor-pointer hover:opacity-100",
                  currentIndex === idx
                    ? "ring-2 ring-white scale-105 opacity-100 shadow-md"
                    : "opacity-50 hover:opacity-90 hover:scale-100"
                )}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
