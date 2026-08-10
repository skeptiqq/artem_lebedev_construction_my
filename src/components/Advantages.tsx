/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ADVANTAGES } from "../data";

export default function Advantages() {
  return (
    <section id="advantages" className="bg-white sm:border-b sm:border-stone-100">

      {/* ══ MOBILE: редакционная сетка 2×2 ════════════════════════════════════ */}
      <div className="sm:hidden pb-10">

        {/* Заголовок */}
        <div className="px-5 pt-10 pb-5 border-b border-stone-200">
          <h2
            className="font-sans font-bold text-stone-900 tracking-tight leading-tight"
            style={{ fontSize: "clamp(20px, 2.8svh, 26px)" }}
          >
            Преимущества
          </h2>
        </div>

        {/* 2×2 grid — gap-px + stone-200 фон как тонкий разделитель */}
        <div className="grid grid-cols-2 gap-px bg-stone-200 mt-4">
          {ADVANTAGES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="bg-white flex flex-col gap-2 p-5"
              style={{ minHeight: "clamp(215px, 34svh, 290px)" }}
            >
              {/* Водяной номер */}
              <span
                className="font-sans font-extrabold tracking-tighter leading-none select-none"
                style={{ fontSize: "clamp(28px, 4svh, 36px)", color: "#8B5E3C", opacity: 0.2 }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Заголовок */}
              <p
                className="font-sans font-semibold text-stone-900 tracking-tight leading-snug whitespace-pre-line"
                style={{ fontSize: "clamp(12px, 1.7svh, 14px)" }}
              >
                {item.title}
              </p>

              {/* Описание */}
              <p
                className="font-sans text-stone-400 leading-relaxed"
                style={{ fontSize: "clamp(10px, 1.35svh, 12px)" }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ DESKTOP sm+: оригинальный макет ════════════════════════════════ */}
      <div className="hidden sm:block py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border-b border-stone-200 pb-6 mb-16">
            <h2 className="text-3xl xl:text-4xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
              Преимущества работы с нами
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col gap-5 px-8 py-10
                  border-t border-stone-200
                  ${idx < ADVANTAGES.length - 1 ? "lg:border-r lg:border-stone-200" : ""}
                  hover:bg-stone-50 transition-colors duration-300`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100
                             transition-transform duration-300 origin-left"
                  style={{ background: "#8B5E3C" }}
                />
                <span
                  className="font-sans font-extrabold text-4xl tracking-tighter leading-none select-none"
                  style={{ color: "#8B5E3C", opacity: 0.25 }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="font-sans font-semibold text-stone-900 text-lg tracking-tight leading-snug">
                  {item.title}
                </p>
                <p className="text-stone-400 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
