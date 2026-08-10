/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WORK_STAGES } from "../data";
import { ChevronSvg } from "./ChevronArrow";
import roughFinish from "../assets/images/rough_finish_new.jpg";

const NAV_H = 64; // высота фиксированного хедера

// ─── Mobile: аккордеон ───────────────────────────────────────────────────────
const MOBILE_STAGES = WORK_STAGES.filter((_, i) => i !== 6);

function WorkflowMobile() {
  const [active, setActive] = useState<number | null>(null);

  const tap = (idx: number) => {
    setActive((p) => (p === idx ? null : idx));
  };

  return (
    <div className="sm:hidden bg-white border-b border-stone-100">

      {/* Заголовок */}
      <div className="px-5 pt-10 pb-5">
        <p className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-4">
          (от замысла до ключей)
        </p>
        <h2
          className="font-sans font-bold text-stone-900 tracking-tight leading-tight"
          style={{ fontSize: "clamp(20px, 2.8svh, 26px)" }}
        >
          Этапы взаимодействия
        </h2>
      </div>

      {/* Список */}
      <div>
        {MOBILE_STAGES.map((stage, idx) => {
          const isOpen = active === idx;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <div key={idx} className="border-t border-stone-100">

              {/* Строка-кнопка */}
              <button
                onClick={() => tap(idx)}
                className="w-full flex items-center gap-4 px-5 py-5 text-left cursor-pointer"
              >
                {/* Номер — деликатный индексный */}
                <span
                  className="shrink-0 font-sans font-normal leading-none select-none"
                  style={{
                    fontSize: "0.95rem",
                    letterSpacing: "0.07em",
                    color: "#8B5E3C",
                    opacity: isOpen ? 0.6 : 0.22,
                    minWidth: "1.85rem",
                    transition: "opacity 0.3s",
                  }}
                >
                  {num}
                </span>

                {/* Название этапа */}
                <span
                  className="flex-1 font-sans font-medium leading-snug"
                  style={{
                    fontSize: "clamp(13px, 1.8svh, 15px)",
                    letterSpacing: "-0.01em",
                    color: isOpen ? "#1c1917" : "#57534e",
                    transition: "color 0.25s",
                  }}
                >
                  {stage.title}
                </span>

                {/* Шеврон — тонкий */}
                <span
                  className="shrink-0"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <ChevronSvg
                    direction="down"
                    color={isOpen ? "#8B5E3C" : "#c7c3bd"}
                    size={13}
                    strokeWidth={1.25}
                  />
                </span>
              </button>

              {/* Раскрытый контент */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div style={{ padding: "0 1.25rem 2rem calc(1.25rem + 1.85rem + 1rem)" }}>
                      <p
                        className="font-sans text-stone-400"
                        style={{ fontSize: "clamp(12px, 1.6svh, 13px)", lineHeight: 1.75 }}
                      >
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <div className="border-t border-stone-200" />
      </div>

      <div className="pb-20" />
    </div>
  );
}

// ─── Desktop: sticky вся левая колонка + скролящиеся карточки ───────────────
//
// Референс: вся левая колонка (лейбл + заголовок + фото) — единый sticky-блок.
// Заголовок НЕ уходит: он остаётся над фото пока правая колонка скроллится.
//
// Структура:
//   flex-row
//     LEFT (sticky, height = 100vh - NAV_H):
//       heading div  ← измеряем высоту → headingH
//       photo (flex:1, заполняет остаток)
//     RIGHT (normal flow, padding-top = headingH):
//       cards — первая карточка выровнена с верхом фото
//
// Когда правая колонка заканчивается, левая тоже выходит за экран — sticky снят.
//
const PHOTO_PAD = 60; // px — отступ слева/справа/снизу вокруг фото в левой колонке

function WorkflowDesktop() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingH, setHeadingH] = useState(140);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const update = () => setHeadingH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // scroll-snap-align: start — браузер снаппит viewport к началу блока
    <div
      className="hidden sm:block border-b border-stone-100"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="flex items-start bg-stone-50">

        {/* ── Левая колонка: ЦЕЛИКОМ sticky ─────────────────────────────── */}
        {/* top: NAV_H → прибита под хедером. height: 100vh-NAV_H → занимает весь экран ниже хедера. */}
        <div
          className="w-1/2 shrink-0 sticky flex flex-col bg-stone-50"
          style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
        >

          {/* Заголовок — измеряем высоту для выравнивания первой карточки */}
          {/* Нет border-b — убирает тонкую линию между heading и фото */}
          <div
            ref={headingRef}
            className="shrink-0"
            style={{ padding: `36px ${PHOTO_PAD}px 24px ${PHOTO_PAD}px` }}
          >
            <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-stone-400 mb-4">
              (от замысла до ключей)
            </p>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
              Этапы взаимодействия
            </h2>
          </div>

          {/* Фото — flex:1, занимает всё пространство под заголовком */}
          <div
            className="flex-1 min-h-0"
            style={{ padding: `0 ${PHOTO_PAD}px ${PHOTO_PAD}px ${PHOTO_PAD}px` }}
          >
            <img
              src={roughFinish}
              alt="Черновые работы"
              className="w-full h-full object-cover block"
              style={{ objectPosition: "center 65%" }}
            />
          </div>
        </div>

        {/* ── Правая колонка: карточки, нормальный поток ─────────────────── */}
        {/* padding-top = headingH → верх первой карточки = верх фото */}
        <div
          className="w-1/2 shrink-0 flex flex-col gap-2 bg-stone-50"
          style={{ paddingTop: headingH, paddingBottom: PHOTO_PAD }}
        >
          {WORK_STAGES.filter((_, i) => i !== 6).map((stage, idx) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              className="group relative flex flex-col bg-white"
              style={{ padding: "28px 48px" }}
            >
              {/* Бронзовая черта сверху при hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] scale-x-0
                           group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: "#8B5E3C" }}
              />

              {/* Номер — порядковый по отфильтрованному списку (01–07) */}
              <span
                className="font-sans font-extrabold text-4xl tracking-tighter leading-none select-none mb-6"
                style={{ color: "#8B5E3C", opacity: 0.18 }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Заголовок */}
              <h3 className="font-sans font-semibold text-stone-900 text-lg leading-snug tracking-tight mb-4">
                {stage.title}
              </h3>

              {/* Описание */}
              <p className="font-sans text-sm text-stone-400 leading-relaxed">
                {stage.description}
              </p>

              {/* Результат */}
              {stage.result && (
                <p className="font-sans text-xs text-stone-400 leading-relaxed mt-5 pt-5 border-t border-stone-100">
                  <span className="font-medium text-stone-500">Результат: </span>
                  {stage.result}
                </p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Экспорт ──────────────────────────────────────────────────────────────────
export default function Workflow() {
  return (
    // Единый id="workflow" на обёртке — всегда в DOM на любом viewport.
    // Не имеет overflow:hidden.
    <div id="workflow">
      <WorkflowMobile />
      <WorkflowDesktop />
    </div>
  );
}
