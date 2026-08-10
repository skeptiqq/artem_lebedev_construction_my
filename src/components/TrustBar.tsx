/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";

const items = [
  {
    number: 6,
    suffix: "+",
    unit: "лет",
    label: "В строительстве",
    sub: "От мастера до прораба",
  },
  {
    number: 90,
    suffix: "+",
    unit: "объектов",
    label: "Реализовано",
    sub: "Квартиры, дома, коммерция",
  },
  {
    number: 0,
    suffix: "",
    unit: "изменений",
    label: "Смета не меняется",
    sub: "Цена и сроки фиксируются до старта",
  },
  {
    number: 3,
    suffix: "",
    unit: "года",
    label: "Гарантия",
    sub: "Письменная, на все работы",
  },
];

const AUTO_DELAY = 3500;

// ─── Счётчик (inView-based) ───────────────────────────────────────────────────
function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (target === 0) { setVal(0); return; }
    let current = 0;
    const total = 60;
    const increment = target / total;
    const id = setInterval(() => {
      current += increment;
      if (current >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(current));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target]);

  return <>{val}{suffix}</>;
}

// ─── Счётчик для тикера (сбрасывается по key при смене слайда) ───────────────
function TickerCounter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    setVal(0);
    if (target === 0) return;
    let current = 0;
    const steps = 60 * 0.6;
    const increment = target / steps;
    const id = setInterval(() => {
      current += increment;
      if (current >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(current));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [target]);

  return <>{val}{suffix}</>;
}

// ─── Варианты анимации слайда ─────────────────────────────────────────────────
const slideVariants = {
  enter: (d: number) => ({ x: d * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d * -56, opacity: 0 }),
};

// ─── Компонент ────────────────────────────────────────────────────────────────
export default function TrustBar() {
  const desktopRef = useRef(null);
  const inView     = useInView(desktopRef, { once: true, margin: "-60px" });

  // ── Мобильный тикер ──
  const count        = items.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir]             = useState<1 | -1>(1);
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX               = useRef<number | null>(null);

  const goTo = useCallback((next: number, direction: 1 | -1) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDir(direction);
    setActiveIdx(next);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((activeIdx + 1) % count, 1);
    }, AUTO_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIdx, goTo, count]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 36) return;
    if (dx < 0) goTo((activeIdx + 1) % count, 1);
    else        goTo((activeIdx - 1 + count) % count, -1);
  };

  const item = items[activeIdx];

  return (
    <section id="trustbar" className="bg-white border-y border-stone-100 overflow-hidden">

      {/* ══ MOBILE: тикер ══════════════════════════════════════════════════ */}
      <div
        className="hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence custom={dir} mode="wait">
           <motion.div
            key={activeIdx}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 pt-7 pb-5 flex flex-col items-center text-center gap-0"
          >
            {/* Цифра + единица */}
            <div className="flex items-end justify-center gap-2 leading-none">
              <span
                className="font-sans font-extrabold tracking-tighter"
                style={{ fontSize: "clamp(2.8rem, 12vw, 3.8rem)", color: "#8B5E3C", lineHeight: 1 }}
              >
                <TickerCounter key={activeIdx} target={item.number} suffix={item.suffix} />
              </span>
              <span className="text-stone-400 text-base font-sans mb-1.5 tracking-tight">
                {item.unit}
              </span>
            </div>

            {/* Подпись */}
            <p className="font-sans font-semibold text-stone-900 text-[15px] tracking-tight leading-snug">
              {item.label}
            </p>

            {/* Sub */}
            <p className="mt-1.5 text-stone-400 text-xs font-sans leading-relaxed">
              {item.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Прогресс-доты */}
        <div className="flex items-center gap-1.5 px-4 pb-5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
              className="relative h-[2px] flex-1 cursor-pointer"
              style={{ background: "#e7e5e4" }}
              aria-label={`Показатель ${i + 1}`}
            >
              {i === activeIdx && (
                <motion.div
                  key={activeIdx}
                  className="absolute inset-y-0 left-0"
                  style={{ background: "#8B5E3C" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
                />
              )}
              {i < activeIdx && (
                <div className="absolute inset-0" style={{ background: "#8B5E3C" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══ DESKTOP sm+: оригинальный грид ═════════════════════════════════ */}
      <div ref={desktopRef} className="hidden sm:block max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative px-10 py-12 flex flex-col gap-3
                ${idx < items.length - 1 ? "border-r border-stone-100" : ""}
                ${idx < 2 ? "border-b border-stone-100 lg:border-b-0" : ""}
                group hover:bg-stone-50 transition-colors duration-300`}
            >
              <motion.div
                className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full origin-top"
                style={{ background: "#8B5E3C" }}
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.25 }}
              />
              <div className="flex items-end gap-2 leading-none">
                <span
                  className="font-sans font-extrabold tracking-tighter"
                  style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)", color: "#8B5E3C", lineHeight: 1 }}
                >
                  <Counter target={it.number} suffix={it.suffix} inView={inView} />
                </span>
                <span className="text-stone-400 text-base font-sans mb-1 tracking-tight">
                  {it.unit}
                </span>
              </div>
              <p className="font-sans font-semibold text-stone-900 text-lg tracking-tight leading-snug">
                {it.label}
              </p>
              <p className="text-stone-400 text-sm font-sans leading-relaxed">
                {it.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
