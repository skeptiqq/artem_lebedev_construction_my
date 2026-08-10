/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X } from "lucide-react";
import ChevronArrow from "./ChevronArrow";
import { useRef } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const SWIPE_THRESHOLD_PX = 40;

export default function ImageLightbox({ src, alt, onClose, onPrev, onNext, hasPrev, hasNext }: ImageLightboxProps) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const canNavigate = Boolean(onPrev || onNext);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canNavigate) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!canNavigate || !touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0 && hasNext) onNext?.();
    else if (dx > 0 && hasPrev) onPrev?.();
  };

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      style={{ touchAction: "none" }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="Закрыть"
      >
        <X className="w-5 h-5" />
      </button>

      {hasPrev && (
        <ChevronArrow direction="left" onClick={(e) => { e.stopPropagation(); onPrev?.(); }} color="white" size={36} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" ariaLabel="Предыдущее фото" />
      )}

      {hasNext && (
        <ChevronArrow direction="right" onClick={(e) => { e.stopPropagation(); onNext?.(); }} color="white" size={36} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" ariaLabel="Следующее фото" />
      )}

      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </div>
  );
}
