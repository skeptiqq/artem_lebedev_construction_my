/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import foremanArtemAbout from "../assets/images/artem_about.jpg";

export default function About() {
  return (
    <section id="about" className="bg-white border-b border-stone-100">

      {/* ══ MOBILE ══════════════════════════════════════════════════════════ */}
      <div className="sm:hidden pb-10">

        {/* Заголовок */}
        <div className="px-4 pt-10 pb-6">
          <h2
            className="font-sans font-bold text-stone-900 tracking-tight leading-tight"
            style={{ fontSize: "clamp(20px, 2.8svh, 26px)" }}
          >
            О руководителе
          </h2>
        </div>

        {/* Фото — edge-to-edge с оверлеем имени */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: "3/4", maxHeight: "88vw" }}
        >
          <img
            src={foremanArtemAbout}
            alt="Прораб Артем Лебедев"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 28%" }}
          />

          {/* Градиент снизу */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "45%",
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
            }}
          />

          {/* Монограмма АЛ — правый нижний угол */}
          <div
            className="absolute pointer-events-none"
            style={{ bottom: "clamp(14px, 2.2svh, 22px)", right: "clamp(14px, 3.5vw, 22px)", opacity: 0.28 }}
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

          {/* Имя + роль поверх фото */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
            <p className="font-sans font-semibold text-white text-[15px] tracking-tight leading-snug">
              Артем Лебедев
            </p>
            <p
              className="font-sans text-[13px] mt-1 tracking-wide"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Прораб · руководитель проектов
            </p>
          </div>
        </motion.div>

        {/* Цитата + два абзаца */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 pt-7 flex flex-col gap-6"
        >
          {/* Цитата */}
          <div className="relative pl-5">
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{ background: "#8B5E3C" }}
            />
            <p className="text-stone-800 text-[15px] leading-relaxed font-sans font-medium italic">
              «Я не передаю объект другим людям после подписания договора. Я остаюсь главным контактным лицом до завершения ремонта и лично отвечаю за работу команды».
            </p>
          </div>

          {/* Два абзаца — без третьего и без статистики */}
          <div className="space-y-4 text-stone-500 text-sm leading-relaxed font-sans">
            <p>
              В строительстве и отделке прошел путь от мастера до прораба: работал на черновых и чистовых работах, изучал инженерные системы изнутри. За 6 лет реализовал более 90 объектов — квартиры, дома и коммерческие помещения.
            </p>
            <p>
              Понимаю, как дизайнеры разрабатывают проекты, и знаю, как грамотно воплотить их в жизнь с соблюдением строительной физики и бюджета заказчика.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ══ DESKTOP sm+ ═════════════════════════════════════════════════════ */}
      <div className="hidden sm:block py-8 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="border-b border-stone-200 pb-5 mb-7 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
              О руководителе
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-16 items-start">

            {/* Фото */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden w-full" style={{ aspectRatio: "3/4" }}>
                <img
                  src={foremanArtemAbout}
                  alt="Прораб Артем Лебедев"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
                {/* Монограмма АЛ — правый нижний угол */}
                <div className="absolute pointer-events-none" style={{ bottom: 22, right: 22, opacity: 0.22 }}>
                  <svg viewBox="0 0 36 36" fill="none" width="44" height="44" aria-hidden="true">
                    <path d="M4,32 L13,4 L21,16 L21,4 L32,4 L32,32" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="9" y1="16" x2="21" y2="16" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 border-t border-stone-200 pt-4 flex items-center justify-between">
                <div>
                  <p className="font-sans font-semibold text-stone-900 text-base tracking-tight">Артем Лебедев</p>
                  <p className="font-sans text-stone-400 text-sm mt-0.5">Прораб · руководитель проектов</p>
                </div>
              </div>
            </motion.div>

            {/* Текст */}
            <motion.div
              className="lg:col-span-7 flex flex-col gap-6 sm:gap-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative pl-5 sm:pl-6">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ background: "#8B5E3C" }}
                />
                <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-sans font-medium italic">
                  «Я не передаю объект другим людям после подписания договора. Я остаюсь главным контактным лицом до завершения ремонта и лично отвечаю за работу команды – думаю, в этом главный плюс».
                </p>
              </div>

              <div className="space-y-5 text-stone-500 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  В строительстве и отделке прошел путь от мастера до прораба: работал на черновых и чистовых работах, изучал инженерные системы изнутри. За 6 лет реализовал более 90 объектов – квартиры, дома и коммерческие помещения.
                </p>
                <p>
                  Понимаю, как дизайнеры разрабатывают проекты, и знаю, как грамотно воплотить их в жизнь с соблюдением строительной физики и бюджета заказчика. Принимаю лично каждый скрытый узел – от стяжки до инженерных систем.
                </p>
                <p>
                  В работу принимаю только объекты от 40 м² – для комплексного ремонта под ключ. Одновременно веду не более 3–4 проектов: это позволяет регулярно посещать каждый объект и держать качество на необходимом уровне.
                </p>
              </div>

              <div className="grid grid-cols-3 border-t border-stone-200 pt-5 gap-3">
                {[
                  { value: "6+", label: "лет опыта" },
                  { value: "90+", label: "объектов" },
                  { value: "3–4", label: "проекта\nодновременно" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span
                      className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tighter leading-none"
                      style={{ color: "#8B5E3C" }}
                    >
                      {s.value}
                    </span>
                    <span className="text-stone-400 text-xs sm:text-sm font-sans leading-tight whitespace-pre-line">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
