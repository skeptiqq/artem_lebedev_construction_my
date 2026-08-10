/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { REVIEWS } from "../data";
import { ReviewImage } from "../types";
import { trackGoal } from "../lib/metrika";

// ─── Desktop Card ─────────────────────────────────────────────────────────────

function ReviewCard({
  rev,
  onView,
}: {
  rev: ReviewImage;
  onView: (id: number) => void;
}) {
  return (
    <div
      className="group relative flex flex-col h-full bg-white hover:bg-stone-50
                 transition-colors duration-300 overflow-hidden p-4 cursor-pointer"
      onClick={() => onView(rev.id)}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100
                   transition-transform duration-300 origin-left"
        style={{ background: "#8B5E3C" }}
      />
      <p className="text-stone-500 text-[13px] leading-relaxed font-sans flex-1 overflow-hidden">
        {rev.text}
      </p>
      <div className="border-t border-stone-100 pt-2.5 mt-3 flex items-end justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <p className="font-sans font-semibold text-stone-900 text-sm tracking-tight leading-tight truncate">
            {rev.name}
          </p>
          <p className="text-stone-400 text-xs font-medium tracking-normal mt-0.5">
            {rev.date}
          </p>
        </div>
        <button
          onClick={() => onView(rev.id)}
          className="self-end shrink-0 font-sans text-xs font-medium text-stone-400
                     border-b border-stone-300 pb-px
                     hover:text-stone-900 hover:border-stone-900
                     transition-colors duration-200 cursor-pointer whitespace-nowrap"
        >
          Скриншот →
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Reviews() {
  const [lightboxId, setLightboxId] = useState<number | null>(null);

  // Mobile scroll carousel
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviewsMaxSeen = useRef(0);
  const reviewsDepth   = useRef({ d10: false, d30: false, d50: false, d70: false });

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIdx(idx);
    if (idx > reviewsMaxSeen.current) {
      reviewsMaxSeen.current = idx;
      const pct = (idx + 1) / REVIEWS.length;
      if (!reviewsDepth.current.d10 && pct >= 0.10) { reviewsDepth.current.d10 = true; trackGoal("reviews_depth_10"); }
      if (!reviewsDepth.current.d30 && pct >= 0.30) { reviewsDepth.current.d30 = true; trackGoal("reviews_depth_30"); }
      if (!reviewsDepth.current.d50 && pct >= 0.50) { reviewsDepth.current.d50 = true; trackGoal("reviews_depth_50"); }
      if (!reviewsDepth.current.d70 && pct >= 0.70) { reviewsDepth.current.d70 = true; trackGoal("reviews_depth_70"); }
    }
  };

  const openReview  = (id: number) => setLightboxId(id);
  const closeReview = ()           => setLightboxId(null);

  const activeReview =
    lightboxId !== null ? REVIEWS.find((r) => r.id === lightboxId) ?? null : null;

  useEffect(() => {
    if (!activeReview) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeReview(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeReview]);

  return (
    <section
      id="reviews"
      className="bg-white"
      style={{ scrollSnapAlign: "start" }}
    >

      {/* ══ MOBILE sm:hidden ════════════════════════════════════════════════ */}
      <div className="sm:hidden border-b border-stone-100">

        {/* Заголовок: h2 + счётчик в одну строку */}
        <div className="border-b border-stone-200 px-5 pt-10 pb-6 flex items-baseline justify-between gap-4">
          <h2
            className="font-sans font-bold text-stone-900 tracking-tight leading-tight"
            style={{ fontSize: "clamp(20px, 2.8svh, 26px)" }}
          >
            Отзывы клиентов
          </h2>
          <p
            className="font-sans text-stone-300 tabular-nums shrink-0"
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}
          >
            {String(activeIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(REVIEWS.length).padStart(2, "0")}
          </p>
        </div>

        {/* Нативный горизонтальный скролл */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className="flex-none snap-start w-screen flex flex-col px-5 pt-7 pb-8"
              style={{ minHeight: "70svh" }}
            >
              {/* Категория */}
              {r.category && (
                <p
                  className="font-sans text-stone-400 uppercase tracking-[0.18em] mb-4"
                  style={{ fontSize: "9px" }}
                >
                  {r.category}
                </p>
              )}

              {/* Бронзовая черта + текст */}
              <div className="flex gap-4 flex-1">
                <div
                  className="shrink-0"
                  style={{
                    width: "2px",
                    alignSelf: "stretch",
                    background: "linear-gradient(to bottom, #8B5E3C 0%, #8B5E3C 65%, transparent 100%)",
                    opacity: 0.5,
                    borderRadius: "1px",
                  }}
                />
                <p
                  className="font-sans text-stone-700"
                  style={{
                    fontSize: "clamp(12px, 1.75svh, 14px)",
                    lineHeight: 1.82,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 8,
                    overflow: "hidden",
                  } as React.CSSProperties}
                >
                  {r.text}
                </p>
              </div>

              {/* Футер */}
              <div className="border-t border-stone-100 mt-6 pt-5">
                <p
                  className="font-sans font-semibold text-stone-900 tracking-tight leading-tight"
                  style={{ fontSize: "15px" }}
                >
                  {r.name}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <p
                    className="font-sans text-stone-400"
                    style={{ fontSize: "12px", letterSpacing: "0.03em" }}
                  >
                    {r.date}
                  </p>
                  <button
                    onClick={() => { openReview(r.id); }}
                    className="font-sans text-stone-400 cursor-pointer shrink-0 leading-none"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.03em",
                      borderBottom: "1px solid #d6d3d1",
                      paddingBottom: "1px",
                    }}
                  >
                    Смотреть скриншот
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ══ DESKTOP sm+ ═════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex flex-col min-h-[100svh] lg:h-[100vh]">
        <div className="flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full
                        px-6 lg:px-8 py-8 sm:py-10 lg:pt-20 lg:pb-6">

          <div className="border-b border-stone-200 pb-6 mb-0 shrink-0">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-sans font-bold
                           text-stone-900 tracking-tight leading-tight">
              Отзывы клиентов
            </h2>
          </div>

          {/* Tablet sm–lg: 2 колонки */}
          <div
            className="grid lg:hidden grid-cols-2 flex-1 min-h-0 overflow-y-auto"
            style={{ gap: 1, background: "#e7e5e4" }}
          >
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.id}
                className="min-h-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ReviewCard rev={r} onView={openReview} />
              </motion.div>
            ))}
          </div>

          {/* Desktop lg+: 5×2 */}
          <div
            className="hidden lg:grid lg:grid-cols-5 lg:grid-rows-2 flex-1 min-h-0"
            style={{ gap: 1, background: "#e7e5e4" }}
          >
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.id}
                className="min-h-0 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <ReviewCard rev={r} onView={openReview} />
              </motion.div>
            ))}
          </div>

          <div className="border-b border-stone-200 shrink-0" />
        </div>
      </div>

      {/* ── Лайтбокс ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
            onClick={closeReview}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.96,    opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative max-w-sm w-full bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeReview}
                className="absolute top-2 right-2 z-10 w-11 h-11 flex items-center justify-center
                           bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900
                           cursor-pointer transition-colors"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
              <img
                src={activeReview.image}
                alt={activeReview.alt}
                className="w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
