/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const cards = [
  {
    value: "Более 6 лет опыта",
    description: "Прошел путь от мастера до прораба и знаю каждый этап ремонта изнутри.",
  },
  {
    value: "Договор",
    description: "Стоимость, этапы и сроки фиксируются до начала работ и не меняются в процессе.",
  },
  {
    value: "Прозрачная смета",
    description: "Детальный расчет по всем видам работ составляется до старта.",
  },
  {
    value: "Гарантия до 3 лет",
    description: "На все выполненные работы предоставляется письменная гарантия.",
  },
];

export default function Convenience() {
  return (
    <section className="sm:min-h-screen py-10 sm:py-14 xl:py-24 bg-stone-50 relative border-b border-stone-200 sm:flex sm:flex-col sm:justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:9rem_9rem] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left w-full">

        <div className="max-w-3xl mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
            Организация работы и стандарты
          </h2>
        </div>

        {/* Mobile: vertical list */}
        <div className="sm:hidden flex flex-col gap-3">
          {cards.map((card, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col gap-2.5">
              <span className="block font-sans font-semibold text-slate-900 text-base tracking-tight leading-tight">
                {card.value}
              </span>
              <p className="text-stone-500 text-sm leading-relaxed font-sans">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col gap-3"
            >
              <span className="block font-sans font-semibold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight">
                {card.value}
              </span>
              <p className="text-stone-500 text-sm leading-relaxed font-sans">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
