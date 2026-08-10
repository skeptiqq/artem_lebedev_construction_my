/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { trackGoal } from "../lib/metrika";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { DESIGN_PROJECT } from "../data";

const FEATURES = [
  "3D-визуализация",
  "Планировки",
  "Рабочие чертежи",
  "Схемы электрики",
  "Схемы сантехники",
  "Развёртки стен",
  "Подбор материалов",
  "Адаптация под объект",
];

export default function DesignProject() {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <>
      <section id="design-project" className="bg-white border-b border-stone-100">

        {/* ══ MOBILE ══════════════════════════════════════════════════════════ */}
        <div className="sm:hidden pb-10">

          {/* Фото — edge-to-edge, пейзажная обрезка */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src="/design-example-1.jpg"
              alt="Дизайн-проект"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center bottom" }}
            />
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

          {/* Заголовок */}
          <div className="px-4 pt-7 pb-5 border-b border-stone-200">
            <h2
              className="font-sans font-bold text-stone-900 tracking-tight leading-tight"
              style={{ fontSize: "clamp(20px, 2.8svh, 26px)" }}
            >
              Дизайн-проект
            </h2>
          </div>

          {/* Вводный текст */}
          <div className="px-4 pt-5">
            <p className="font-sans text-sm text-stone-400 leading-relaxed">
              Работаем с вашим готовым проектом или разрабатываем новый в комплексе с реализацией. Проект создается до выхода команды на объект — это позволяет точнее рассчитать смету и избежать переделок.
            </p>
          </div>

          {/* Состав проекта — теги */}
          <div className="flex flex-wrap gap-x-3 gap-y-2 px-4 pt-5">
            {FEATURES.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                className="font-sans text-stone-500 bg-stone-50"
                style={{ fontSize: "13px", lineHeight: 1.45, padding: "8px 15px" }}
              >
                {item}
              </motion.span>
            ))}
          </div>

          {/* Кнопка — полная ширина на мобиле */}
          {DESIGN_PROJECT.exampleUrl && (
            <div className="px-4 pt-6">
              <button
                onClick={() => { trackGoal("design_project_example_click"); setPdfOpen(true); }}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-700
                           text-white font-sans font-medium text-sm tracking-normal
                           transition-colors duration-200 cursor-pointer"
              >
                Пример дизайн-проекта
              </button>
            </div>
          )}
        </div>

        {/* ══ DESKTOP sm+ ═════════════════════════════════════════════════════ */}
        <div className="hidden sm:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

            <div className="border-b border-stone-200 pb-5 mb-8">
              <h2 className="text-3xl xl:text-4xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
                Дизайн-проект
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

              {/* Левая: текст + список + кнопка */}
              <div className="flex flex-col gap-5">
                <p className="font-sans text-sm text-stone-400 leading-relaxed">
                  Работаем с вашим готовым проектом или разрабатываем новый в комплексе<br className="hidden lg:block" /> с реализацией. Проект создается до выхода команды на объект – это позволяет точнее рассчитать смету и избежать переделок.
                </p>

                <ul className="flex flex-col border-t border-stone-100">
                  {FEATURES.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                      className="flex items-start gap-5 py-3 border-b border-stone-100"
                    >
                      <span
                        className="font-sans font-extrabold text-xl tracking-tighter leading-none select-none shrink-0 mt-0.5"
                        style={{ color: "#8B5E3C", opacity: 0.3 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-sm text-stone-700 leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {DESIGN_PROJECT.exampleUrl && (
                  <button
                    onClick={() => { trackGoal("design_project_example_click"); setPdfOpen(true); }}
                    className="self-start px-6 py-3 bg-stone-900 hover:bg-stone-700
                               text-white font-sans font-medium text-sm tracking-normal
                               transition-colors duration-200 cursor-pointer"
                  >
                    Пример дизайн-проекта
                  </button>
                )}
              </div>

              {/* Правая: фото */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src="/design-example-1.jpg"
                  alt="Дизайн-проект"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center bottom" }}
                />
                {/* Монограмма АЛ — правый нижний угол */}
                <div className="absolute pointer-events-none" style={{ bottom: 22, right: 22, opacity: 0.22 }}>
                  <svg viewBox="0 0 36 36" fill="none" width="44" height="44" aria-hidden="true">
                    <path d="M4,32 L13,4 L21,16 L21,4 L32,4 L32,32" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="9" y1="16" x2="21" y2="16" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── PDF Modal (работает на всех устройствах) ─────────────────────── */}
      <AnimatePresence>
        {pdfOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-stone-950/85 backdrop-blur-sm flex flex-col"
            onClick={() => setPdfOpen(false)}
          >
            {/* Шапка модала */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0 bg-white border-b border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-sans font-semibold text-stone-900 text-sm">
                Пример дизайн-проекта
              </span>
              <button
                onClick={() => setPdfOpen(false)}
                aria-label="Закрыть"
                className="w-11 h-11 bg-stone-100 hover:bg-stone-200 flex items-center
                           justify-center text-stone-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Страницы PDF */}
            <div
              className="flex-1 min-h-0 overflow-y-auto bg-stone-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-3xl mx-auto py-4 px-2 flex flex-col gap-2">
                {Array.from({ length: 56 }, (_, i) => {
                  const n = String(i + 1).padStart(2, "0");
                  return (
                    <img
                      key={i}
                      src={`/design-project/page-${n}.jpg`}
                      alt={`Страница ${i + 1}`}
                      loading="lazy"
                      className="w-full"
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
