/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const cards = [
  {
    value: "Своя бригада",
    description: "На объектах работают проверенные мастера: электрик, сантехник, маляр и универсальные специалисты.",
  },
  {
    value: "Скидка до 15% на материалы",
    description: "Закупаем черновой материал у поставщиков по оптовым ценам – экономия передается заказчику.",
  },
  {
    value: "Контроль каждого этапа",
    description: "Проверяю скрытые работы лично и составляю акты приемки.",
  },
  {
    value: "Фото- и видеоотчеты",
    description: "Отчет каждые 3–4 дня в удобный мессенджер.",
  },
];

export default function WorkBenefits() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50 relative border-b border-stone-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:9rem_9rem] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">

        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
            Как это устроено на практике
          </h2>
          <p className="text-stone-500 mt-4 text-base leading-relaxed font-sans font-normal border-l-2 border-slate-800 pl-4">
            Своя команда, оптовые закупки и личный контроль – то, что остается за кадром, но определяет результат.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between gap-3"
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
