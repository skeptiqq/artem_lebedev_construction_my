/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShieldCheck, FileText, Camera, ClipboardCheck, Wrench, CheckCircle } from "lucide-react";

const GUARANTEE_POINTS = [
  {
    icon: FileText,
    title: "Работа по договору",
    description: "Стоимость, этапы, сроки и гарантийные обязательства фиксируются письменно до начала работ.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия до 3 лет",
    description: "Письменная гарантия на все виды выполненных работ. При гарантийном случае Артем выезжает лично.",
  },
  {
    icon: ClipboardCheck,
    title: "Зафиксированная смета",
    description: "Цена работ не меняется в одностороннем порядке. Любые изменения только с вашего согласия и письменно.",
  },
  {
    icon: Camera,
    title: "Фото- и видеоотчеты",
    description: "Каждые 3–4 дня вы получаете отчет о ходе работ в удобный мессенджер.",
  },
  {
    icon: Wrench,
    title: "Личный контроль Артема",
    description: "Скрытые работы – армирование, гидроизоляция, опрессовка труб – проверяются лично и фиксируются в актах.",
  },
  {
    icon: CheckCircle,
    title: "Гарантийное сопровождение",
    description: "После сдачи объекта Артем остается на связи. Все вопросы решаются в рамках гарантийных обязательств.",
  },
];

const CONTROL_STEPS = [
  "Команда завершает этап",
  "Артем проверяет результат",
  "Замечания фиксируются",
  "Команда устраняет замечания",
  "Этап принимается",
  "Клиент получает отчет",
];

export default function Guarantees() {
  return (
    <section id="guarantees" className="py-10 sm:py-20 bg-stone-50 relative border-b border-stone-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:9rem_9rem] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
            Гарантии и контроль качества
          </h2>
          <p className="text-stone-500 mt-4 text-sm sm:text-base leading-relaxed font-sans border-l-2 border-slate-800 pl-4">
            Как устроен контроль на каждом этапе – и почему результат соответствует тому, о чем договорились.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: guarantee cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GUARANTEE_POINTS.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: (idx % 2) * 0.07 }}
                  className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3 hover:border-slate-300 hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center text-slate-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-stone-900 text-sm sm:text-base leading-tight mb-1.5">
                      {point.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: control scheme */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
              <h3 className="font-sans font-bold text-stone-900 text-lg sm:text-xl mb-6 tracking-tight">
                Схема контроля каждого этапа
              </h3>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-stone-200" />

                <div className="space-y-0">
                  {CONTROL_STEPS.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 relative pb-5 last:pb-0">
                      <div className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-700 flex items-center justify-center font-sans font-bold text-xs text-slate-800">
                        {idx + 1}
                      </div>
                      <div className="pt-1">
                        <p className="font-sans text-stone-800 text-sm font-medium leading-snug">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents note */}
            <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200">
              <p className="text-stone-600 text-sm leading-relaxed font-sans">
                <span className="font-bold text-stone-900">Документы по запросу:</span> пример договора и детальной сметы можно запросить у Артема при первом контакте. Все документы составлены на понятном языке.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
