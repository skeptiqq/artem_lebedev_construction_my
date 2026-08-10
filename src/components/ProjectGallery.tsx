/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ZoomIn } from "lucide-react";
import ChevronArrow from "./ChevronArrow";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectGallery({ project, onClose }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else onClose();
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return i < project.images.length - 1 ? i + 1 : i;
    });
  }, [project.images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return i > 0 ? i - 1 : i;
    });
  }, []);

  // Touch swipe in lightbox
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const hasPrev = lightboxIndex !== null && lightboxIndex > 0;
  const hasNext = lightboxIndex !== null && lightboxIndex < project.images.length - 1;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={lightboxIndex !== null ? () => setLightboxIndex(null) : onClose}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 flex flex-col h-full max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-sans font-bold text-stone-900 text-base sm:text-lg tracking-tight leading-tight">
              {project.title}
            </h3>
            <span className="text-stone-500 text-xs font-sans mt-0.5 block">
              {project.images.length}{" "}
              {project.images.length === 1
                ? "фотография"
                : project.images.length < 5
                ? "фотографии"
                : "фотографий"}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть галерею"
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto bg-stone-50 p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">

            {/* Project info */}
            <div className="mb-6 space-y-4">
              {/* Stats row */}
              {(project.area || project.duration || project.price) && (
                <div className="flex flex-wrap gap-5 text-sm font-sans">
                  {project.area && (
                    <div>
                      <span className="block text-stone-400 text-[10px] font-medium mb-0.5 tracking-normal">Площадь</span>
                      <span className="text-stone-800 font-semibold">{project.area}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <span className="block text-stone-400 text-[10px] font-medium mb-0.5 tracking-normal">Срок</span>
                      <span className="text-stone-800 font-semibold">{project.duration}</span>
                    </div>
                  )}
                  {project.price && (
                    <div>
                      <span className="block text-stone-400 text-[10px] font-medium mb-0.5 tracking-normal">Стоимость работ</span>
                      <span className="text-stone-800 font-semibold">{project.price}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Description / object about */}
              {project.description && (
                <p className="text-stone-600 text-sm leading-relaxed font-sans">
                  {project.description}
                </p>
              )}

              {/* Artem's comment */}
              {project.artemComment && (
                <div>
                  <p className="font-sans font-semibold text-stone-900 text-base mb-3">Комментарий Артема</p>
                  <div className="relative pl-4">
                    <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-slate-800" />
                    <p className="text-stone-700 text-sm leading-relaxed font-sans italic">«{project.artemComment}».</p>
                  </div>
                </div>
              )}
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 border border-stone-200 hover:border-stone-400 transition-all cursor-zoom-in"
                >
                  <img
                    src={src}
                    alt={`${project.title} – фото ${idx + 1}`}
                    loading={idx < 6 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-sans font-medium text-white bg-stone-900/60 px-1.5 py-0.5 rounded">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-stone-950/95 flex flex-col"
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0">
              <span className="text-stone-400 font-sans text-sm font-normal">
                {lightboxIndex + 1} / {project.images.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Закрыть фото"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo */}
            <div className="flex-1 flex items-center justify-center px-12 relative min-h-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={project.images[lightboxIndex]}
                  alt={`${project.title} – фото ${lightboxIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-full max-h-full object-contain select-none rounded-lg"
                />
              </AnimatePresence>

              {/* Preload next */}
              {hasNext && (
                <link
                  rel="preload"
                  as="image"
                  href={project.images[lightboxIndex + 1]}
                />
              )}

              {/* Prev arrow */}
              {hasPrev && (
                <ChevronArrow direction="left" onClick={goPrev} color="white" size={36} className="absolute left-2 top-1/2 -translate-y-1/2" ariaLabel="Предыдущее фото" />
              )}

              {/* Next arrow */}
              {hasNext && (
                <ChevronArrow direction="right" onClick={goNext} color="white" size={36} className="absolute right-2 top-1/2 -translate-y-1/2" ariaLabel="Следующее фото" />
              )}
            </div>

            {/* Lightbox footer: dots */}
            <div className="flex items-center justify-center gap-1.5 py-4 shrink-0">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === lightboxIndex
                      ? "w-5 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Фото ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
