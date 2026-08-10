/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackGoal } from "../lib/metrika";
import { markProgrammaticScroll } from "../lib/scrollIntent";
import { beginContactJump } from "../lib/scrollReturn";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      // Показываем «Вернуться назад» только если прыгаем достаточно далеко
      // (т.е. пользователь ещё не находится в этом блоке)
      if (Math.abs(offsetPosition - window.scrollY) > 200) {
        beginContactJump();
      }
      markProgrammaticScroll();
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Портфолио",    target: "portfolio" },
    { label: "О руководителе", target: "about" },
    { label: "Этапы работы", target: "workflow" },
    { label: "Отзывы",       target: "reviews" },
    { label: "FAQ",          target: "faq" },
    { label: "Контакты",     target: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-300
          h-14 flex items-center lg:block lg:h-auto lg:py-4
          border-b ${isScrolled ? "border-stone-200" : "border-stone-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">

          {/* Logo */}
          <button
            onClick={() => {
              markProgrammaticScroll();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 bg-stone-900 flex items-center justify-center
                            text-white group-hover:bg-stone-700 transition-colors">
              {/* Монограмма-лигатура АЛ
                  Левая диагональ А: (4,32)→(13,4)
                  Правая диагональ А: (13,4)→(21,16) — переходит в левую стойку Л
                  Левая стойка Л: (21,16)→(21,4)
                  Верх Л: (21,4)→(32,4) → правая стойка (32,4)→(32,32)
                  Перекладина А: (9,16)→(21,16) — 60% от низа
              */}
              <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" aria-label="АЛ">
                <path
                  d="M4,32 L13,4 L21,16 L21,4 L32,4 L32,32"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="9" y1="16" x2="21" y2="16"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <span className="block text-stone-900 group-hover:text-stone-600 font-sans font-semibold text-[14px] leading-tight tracking-tight transition-colors duration-200">
                Артем Лебедев
              </span>
              <span className="block text-stone-400 group-hover:text-stone-500 font-sans text-[11px] leading-tight tracking-normal transition-colors duration-200">
                Дизайн и ремонт квартир
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="text-stone-400 hover:text-stone-900 font-sans text-[13px] font-normal
                           tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => {
                trackGoal("header_discuss_project_click");
                scrollToSection("contact");
              }}
              className="px-5 py-2 bg-stone-900 hover:bg-stone-700 text-white font-sans text-[13px]
                         font-medium tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              Обсудить проект
            </button>
          </div>

          {/* Mobile burger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed top-14 lg:top-[65px] left-0 w-full z-40
                       bg-white border-b border-stone-200 lg:hidden"
          >
            {/* Nav links — thin rows */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {menuItems.map((item, idx) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className={`w-full text-left py-4 font-sans text-[15px] font-normal
                             text-stone-600 hover:text-stone-900 transition-colors
                             ${idx < menuItems.length - 1 ? "border-b border-stone-100" : ""}`}
                >
                  {item.label}
                </button>
              ))}

              {/* CTA */}
              <div className="py-5">
                <button
                  onClick={() => {
                    trackGoal("header_discuss_project_click");
                    scrollToSection("contact");
                  }}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-700 text-white font-sans
                             font-medium text-[15px] text-center transition-colors"
                >
                  Обсудить проект
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
