/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import ProjectGallery from "./ProjectGallery";
import { trackGoal } from "../lib/metrika";
import { ChevronSvg } from "./ChevronArrow";

type Category = "comfort" | "premium";

const CATEGORY_LABELS: Record<Category, string> = {
  comfort: "Стандарт",
  premium: "Премиум",
};

function ProjectCard({
  project,
  idx,
  onOpen,
  eager = false,
}: {
  project: Project;
  idx: number;
  onOpen: (p: Project) => void;
  className?: string;
  eager?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={eager ? { opacity: 1, y: 0 } : undefined}
      whileInView={eager ? undefined : { opacity: 1, y: 0 }}
      viewport={eager ? undefined : { once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: eager ? idx * 0.07 : idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border-t border-stone-200 hover:border-stone-900 transition-colors duration-300"
    >
      {/* Cover image — no border-radius, no shadow */}
      <div
        className="relative overflow-hidden bg-stone-100 cursor-pointer aspect-[4/3]"
        onClick={() => {
          onOpen(project);
        }}
      >
        <img
          src={project.cover}
          alt={project.title}
          loading={idx < 4 ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* Bronze overlay line at bottom on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
          style={{ background: "#8B5E3C" }}
        />
      </div>

      {/* Info */}
      <div className="pt-4 pb-5 flex flex-col gap-4">
        <h3 className="font-sans font-semibold text-stone-900 text-base sm:text-lg leading-tight tracking-tight">
          {project.title}
        </h3>

        {(project.area || project.duration || project.price) && (
          <div className="flex flex-wrap gap-6 font-sans">
            {project.area && (
              <div className="flex flex-col gap-0.5">
                <span className="text-stone-400 text-[11px] font-medium tracking-wide uppercase">Площадь</span>
                <span className="text-stone-800 font-semibold text-sm">{project.area}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex flex-col gap-0.5">
                <span className="text-stone-400 text-[11px] font-medium tracking-wide uppercase">Срок</span>
                <span className="text-stone-800 font-semibold text-sm">{project.duration}</span>
              </div>
            )}
            {project.price && (
              <div className="flex flex-col gap-0.5">
                <span className="text-stone-400 text-[11px] font-medium tracking-wide uppercase">Стоимость работ</span>
                <span className="text-stone-800 font-semibold text-sm">{project.price}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => {
            onOpen(project);
          }}
          className="self-start font-sans text-sm font-medium text-stone-400
                     border-b border-stone-300 pb-px
                     hover:text-stone-900 hover:border-stone-900
                     transition-colors duration-200 cursor-pointer"
        >
          Смотреть проект →
        </button>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("comfort");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [atEnd, setAtEnd] = useState(false);       // last card visible
  const [atStart, setAtStart] = useState(true);    // first card visible

  // Desktop scroll state (kept for desktop chevrons)
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Refs for auto-switch logic (avoid stale closures)
  const activeCategoryRef = useRef(activeCategory);
  useEffect(() => { activeCategoryRef.current = activeCategory; }, [activeCategory]);

  const autoSwitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const justSwitched    = useRef(true);    // true on mount → prevents auto-switch before user scrolls
  const touchStartX     = useRef<number | null>(null);

  const filtered = PROJECTS.filter((p) => p.category === activeCategory);

  const clearAutoSwitch = () => {
    if (autoSwitchTimer.current) { clearTimeout(autoSwitchTimer.current); autoSwitchTimer.current = null; }
  };

  const syncScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const end   = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    const start = el.scrollLeft <= 4;
    setCanLeft(!start);
    setCanRight(!end);
    setAtEnd(end);
    setAtStart(start);
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    if (card) setActiveDot(Math.round(el.scrollLeft / (card.offsetWidth + 12)));

    // ── Auto-switch forward: end of Стандарт → Премиум ──
    if (end && activeCategoryRef.current === "comfort" && !justSwitched.current) {
      if (!autoSwitchTimer.current) {
        autoSwitchTimer.current = setTimeout(() => {
          autoSwitchTimer.current = null;
          justSwitched.current = true;
          setActiveCategory("premium");
          trackGoal("portfolio_auto_advance", { tier: "premium" });
          setTimeout(() => { justSwitched.current = false; }, 1500);
        }, 900);
      }
    } else if (!end) {
      clearAutoSwitch();
    }
  }, []);

  // Swipe/drag tracking for reverse: right-swipe from start of Премиум → Стандарт
  // Handles both touch (mobile) and pointer (desktop mouse drag / DevTools emulation)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only track primary pointer (left mouse button / first touch)
    if (e.isPrimary) touchStartX.current = e.clientX;
  }, []);

  const tryGoBack = useCallback((endX: number) => {
    if (touchStartX.current === null) return;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    const el = scrollRef.current;
    if (!el) return;
    const isAtStart = el.scrollLeft <= 4;
    if (isAtStart && dx > 40 && activeCategoryRef.current === "premium" && !justSwitched.current) {
      justSwitched.current = true;
      setActiveCategory("comfort");
      trackGoal("portfolio_filter_click", { tier: "comfort", source: "swipe" });
      setTimeout(() => { justSwitched.current = false; }, 1500);
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    tryGoBack(e.changedTouches[0].clientX);
  }, [tryGoBack]);

  // Mid-gesture detection — fires before browser can cancel the overscroll
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollLeft > 4) return; // not at start
    if (activeCategoryRef.current !== "premium") return;
    if (justSwitched.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (dx > 55) {
      justSwitched.current = true;
      touchStartX.current = null;
      setActiveCategory("comfort");
      trackGoal("portfolio_filter_click", { tier: "comfort", source: "swipe" });
      setTimeout(() => { justSwitched.current = false; }, 1500);
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (e.isPrimary) tryGoBack(e.clientX);
  }, [tryGoBack]);

  // Reset scroll + dot when category changes
  useEffect(() => {
    clearAutoSwitch();
    justSwitched.current = true;
    setActiveDot(0);
    setAtEnd(false);
    setAtStart(true);
    const el = scrollRef.current;
    if (el) el.scrollLeft = 0;
    setTimeout(syncScroll, 50);
    // Allow auto-switch only after user has had time to settle on this category
    const guard = setTimeout(() => { justSwitched.current = false; }, 2000);
    window.addEventListener("resize", syncScroll);
    return () => {
      window.removeEventListener("resize", syncScroll);
      clearAutoSwitch();
      clearTimeout(guard);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const switchCategory = (cat: Category) => {
    clearAutoSwitch();
    justSwitched.current = true;
    setActiveCategory(cat);
    trackGoal("portfolio_filter_click", { tier: cat });
    setTimeout(() => { justSwitched.current = false; }, 1500);
  };

  // ── Project-open depth tracking ──────────────────────────────────────────
  const openedProjects = useRef(new Set<string>());
  const portfolioDepth = useRef({ d10: false, d30: false, d50: false, d70: false });

  const handleProjectOpen = (project: Project) => {
    setOpenProject(project);
    openedProjects.current.add(project.id);
    const pct = openedProjects.current.size / PROJECTS.length;
    if (!portfolioDepth.current.d10 && pct >= 0.10) { portfolioDepth.current.d10 = true; trackGoal("portfolio_depth_10"); }
    if (!portfolioDepth.current.d30 && pct >= 0.30) { portfolioDepth.current.d30 = true; trackGoal("portfolio_depth_30"); }
    if (!portfolioDepth.current.d50 && pct >= 0.50) { portfolioDepth.current.d50 = true; trackGoal("portfolio_depth_50"); }
    if (!portfolioDepth.current.d70 && pct >= 0.70) { portfolioDepth.current.d70 = true; trackGoal("portfolio_depth_70"); }
  };

  return (
    <section id="portfolio" className="bg-white border-b border-stone-100">

      {/* ══ MOBILE ══════════════════════════════════════════════════════════ */}
      <div className="sm:hidden">

        {/* Header: title + tabs */}
        <div className="px-5 pt-10">
          <h2
            className="font-sans font-bold text-stone-900 tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(20px, 2.8svh, 26px)" }}
          >
            Последние объекты
          </h2>

          {/* Segment tabs */}
          <div className="flex border-b border-stone-200">
            {(["comfort", "premium"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => switchCategory(cat)}
                className={`relative flex-1 pb-3.5 font-sans font-medium text-[13px] tracking-tight
                            transition-colors duration-200 cursor-pointer text-center ${
                              activeCategory === cat ? "text-stone-900" : "text-stone-400"
                            }`}
              >
                {CATEGORY_LABELS[cat]}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="mobile-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "#8B5E3C" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel — peek layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              ref={scrollRef}
              onScroll={syncScroll}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-5 pb-1 pl-5 scroll-pl-5"
              style={{ paddingRight: "1.25rem", gap: "12px" }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              {filtered.map((project, idx) => (
                <button
                  key={project.id}
                  data-card
                  onClick={() => {
                    handleProjectOpen(project);
                  }}
                  className="snap-start shrink-0 text-left cursor-pointer group"
                  style={{ width: "82vw" }}
                  aria-label={`Открыть проект ${project.title}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-stone-100 aspect-[3/4]">
                    <img
                      src={project.cover}
                      alt={project.title}
                      loading={idx < 2 ? "eager" : "lazy"}
                      className="w-full h-full object-cover transition-transform duration-500 group-active:scale-[1.02]"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[3px]"
                      style={{ background: "#8B5E3C" }}
                    />
                    <div
                      className="absolute top-3 left-3 font-sans font-extrabold text-xs tracking-widest select-none"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-3.5 pb-3 border-t border-stone-200">
                    <p
                      className="font-sans font-semibold text-stone-900 leading-tight tracking-tight truncate"
                      style={{ fontSize: "clamp(14px, 2svh, 17px)" }}
                    >
                      {project.title}
                    </p>
                    {(project.area || project.price) && (
                      <div className="flex items-center gap-2 font-sans text-stone-400 mt-1"
                           style={{ fontSize: "clamp(12px, 1.6svh, 14px)" }}>
                        {project.area && <span>{project.area}</span>}
                        {project.area && project.price && (
                          <span style={{ color: "#d6d3d1" }}>·</span>
                        )}
                        {project.price && <span>{project.price}</span>}
                      </div>
                    )}
                    <p
                      className="font-sans font-medium mt-2"
                      style={{ fontSize: "clamp(11px, 1.5svh, 13px)", color: "#8B5E3C" }}
                    >
                      Смотреть проект →
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Dot indicators + transition hint */}
            <div className="flex flex-col items-center gap-2.5 pt-4 pb-8">
              <div className="flex items-center gap-1.5">
                {filtered.map((_, i) => (
                  <div
                    key={i}
                    className="transition-all duration-300"
                    style={{
                      height: 2,
                      width: i === activeDot ? 20 : 8,
                      background: i === activeDot ? "#8B5E3C" : "#d6d3d1",
                    }}
                  />
                ))}
              </div>

              <AnimatePresence>
                {atEnd && activeCategory === "comfort" && (
                  <motion.p
                    key="hint-forward"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.3 }}
                    className="font-sans text-[11px] tracking-wide"
                    style={{ color: "#8B5E3C" }}
                  >
                    Далее: Премиум →
                  </motion.p>
                )}
                {atStart && activeCategory === "premium" && (
                  <motion.button
                    key="hint-backward"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => switchCategory("comfort")}
                    className="font-sans text-[11px] tracking-wide cursor-pointer"
                    style={{ color: "#8B5E3C" }}
                  >
                    ← Стандарт
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══ DESKTOP sm+ ═════════════════════════════════════════════════════ */}
      <div className="hidden sm:block py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header row */}
          <div className="flex items-end justify-between mb-12 border-b border-stone-200 pb-6">
            <h2 className="text-3xl xl:text-4xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
              Последние объекты
            </h2>
            <div className="flex gap-6">
              {(["comfort", "premium"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => switchCategory(cat)}
                  className={`relative pb-1 font-sans font-medium text-base tracking-tight transition-colors duration-200 cursor-pointer ${
                    activeCategory === cat ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: "#8B5E3C" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0"
              >
                {filtered.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    idx={idx}
                    onOpen={handleProjectOpen}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Desktop category chevrons */}
            {activeCategory === "comfort" && (
              <button
                onClick={() => switchCategory("premium")}
                className="absolute top-1/2 -translate-y-1/2 right-[-1.25rem] z-20 flex items-center justify-center w-10 h-10 bg-white border border-stone-200 shadow-md hover:shadow-lg hover:border-stone-300 transition-all cursor-pointer"
                aria-label="Перейти к Премиум"
              >
                <ChevronSvg direction="right" color="#1e293b" size={20} strokeWidth={1.5} />
              </button>
            )}
            {activeCategory === "premium" && (
              <button
                onClick={() => switchCategory("comfort")}
                className="absolute top-1/2 -translate-y-1/2 left-[-1.25rem] z-20 flex items-center justify-center w-10 h-10 bg-white border border-stone-200 shadow-md hover:shadow-lg hover:border-stone-300 transition-all cursor-pointer"
                aria-label="Перейти к Стандарт"
              >
                <ChevronSvg direction="left" color="#1e293b" size={20} strokeWidth={1.5} />
              </button>
            )}
          </div>

        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectGallery
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
