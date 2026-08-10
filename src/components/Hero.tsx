/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import foremanArtemMain from "../assets/images/hero_artem.jpg";
import { trackGoal } from "../lib/metrika";
import PriceCalculator from "./PriceCalculator";

// ─── Три proof-point ──────────────────────────────────────────────────────────
const PROOF_ITEMS = [
  { value: "90+", unit: "объектов", label: "Реализовано"  },
  { value: "3",   unit: "года",     label: "Гарантия"     },
  { value: "6+",  unit: "лет",      label: "Опыт"         },
] as const;

export default function Hero() {
  const [calcOpen, setCalcOpen] = useState(false);
  const { scrollY } = useScroll();
  const lineHeight = useTransform(scrollY, [0, 90], [4, 0]);

  return (
    <section
      id="hero"
      className="relative bg-stone-900 overflow-hidden min-h-[100svh] flex flex-col lg:flex-row"
    >
      {/* ── MOBILE: photo → offer → proof → CTA ── */}
      <div className="lg:hidden flex flex-col" style={{ height: "100svh" }}>

        {/* ① Фото — главный эмоциональный акцент */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden shrink-0"
          style={{ height: "60svh" }}
        >
          <img
            src={foremanArtemMain}
            alt="Прораб Артем Лебедев"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "65% 12%" }}
          />
          {/* Градиент под хедер */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{ height: "3.5rem", background: "linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)" }}
          />
          {/* Бронзовая черта — внутри фото, поверх него */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "linear" }}
            style={{ height: lineHeight, background: "#8B5E3C", transformOrigin: "left" }}
          />
          {/* Монограмма АЛ — нижний правый угол */}
          <div
            className="absolute pointer-events-none"
            style={{ bottom: "clamp(14px, 2.2svh, 22px)", right: "clamp(14px, 3.5vw, 22px)", opacity: 0.22 }}
          >
            <svg viewBox="0 0 36 36" fill="none" width="38" height="38" aria-hidden="true">
              <path
                d="M4,32 L13,4 L21,16 L21,4 L32,4 L32,32"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="9" y1="16" x2="21" y2="16" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </div>

        </motion.div>

        {/* ② Контентная панель */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-1 bg-white flex flex-col justify-center px-5"
          style={{
            paddingTop:    "clamp(16px, 3svh, 28px)",
            paddingBottom: "clamp(16px, 3svh, 28px)",
          }}
        >

          {/* Заголовок — контролируемые переносы для сильной иерархии */}
          <h1
            className="font-sans font-bold text-stone-900 tracking-tight"
            style={{ fontSize: "clamp(22px, 3.1svh, 30px)", lineHeight: 1.08 }}
          >
            Ремонт под<br />
            <span style={{ color: "#8B5E3C" }}>личным контролем</span><br />
            с понятной сметой
          </h1>

          {/* ③ Proof block — три фиксированных точки доверия */}
          <div
            style={{ marginTop: "clamp(14px, 2.5svh, 22px)" }}
          >
            <div style={{ height: "0.5px", background: "linear-gradient(to right, transparent 0%, #d6d3d1 30%, #d6d3d1 70%, transparent 100%)", marginBottom: "clamp(0.9rem, 2svh, 1.2rem)" }} />
            <div className="flex" style={{ gap: "clamp(10px, 2.5vw, 18px)" }}>
              {PROOF_ITEMS.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex-1 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.16, duration: 0.38, ease: "easeOut" }}
                >
                  {/* Цифра — доминанта */}
                  <span
                    className="font-sans font-extrabold tracking-tighter leading-none"
                    style={{ fontSize: "clamp(22px, 3.6svh, 32px)", color: "#8B5E3C", opacity: 0.62 }}
                  >
                    {p.value}
                  </span>

                  {/* Единица */}
                  <span
                    className="font-sans text-stone-400 uppercase"
                    style={{ fontSize: "clamp(8px, 1svh, 9px)", letterSpacing: "0.13em", marginTop: "0.22em" }}
                  >
                    {p.unit}
                  </span>

                  {/* Лейбл */}
                  <span
                    className="font-sans text-stone-400"
                    style={{ fontSize: "clamp(9px, 1.1svh, 10px)", marginTop: "0.3em", lineHeight: 1.2 }}
                  >
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ④ CTA — логичное завершение экрана */}
          <button
            onClick={() => { trackGoal("cta_hero_click"); setCalcOpen(true); }}
            className="w-full bg-stone-900 text-white font-sans font-semibold tracking-tight
                       cursor-pointer transition-colors duration-200
                       active:bg-stone-800 active:scale-[0.99]"
            style={{ marginTop: "clamp(14px, 2.5svh, 22px)", padding: "clamp(12px, 2svh, 17px) 1.75rem", fontSize: "clamp(14px, 1.9svh, 17px)" }}
          >
            Рассчитать стоимость ремонта
          </button>
        </motion.div>
      </div>

      {/* ── DESKTOP: split layout (без изменений) ── */}
      <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:9rem_9rem] opacity-20 pointer-events-none" />

      <div className="hidden lg:flex flex-1 flex-col items-start justify-center px-16 z-10 relative bg-stone-50" style={{ paddingTop: "64px" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[clamp(1.4rem,3.2vw,2.8rem)] font-sans font-semibold text-stone-900 tracking-tight leading-[1.2] max-w-xl"
        >
          Артем Лебедев – ремонт <span style={{ color: "#8B5E3C" }}>под личным контролем</span><br />с понятной сметой, отчетами и гарантией
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          onClick={() => { trackGoal("cta_hero_click"); setCalcOpen(true); }}
          className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-base tracking-normal transition-all duration-200 cursor-pointer shadow-sm mt-8"
        >
          Рассчитать стоимость ремонта
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:block relative w-[45%] shrink-0 overflow-hidden"
      >
        <img
          src={foremanArtemMain}
          alt="Прораб Артем Лебедев"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Монограмма АЛ — правый нижний угол */}
        <div className="absolute pointer-events-none" style={{ bottom: 22, right: 22, opacity: 0.22 }}>
          <svg viewBox="0 0 36 36" fill="none" width="44" height="44" aria-hidden="true">
            <path d="M4,32 L13,4 L21,16 L21,4 L32,4 L32,32" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="9" y1="16" x2="21" y2="16" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      <PriceCalculator isOpen={calcOpen} onClose={() => setCalcOpen(false)} />
    </section>
  );
}
