/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { FAQS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { trackGoal } from "../lib/metrika";
import { ChevronSvg } from "./ChevronArrow";

function FAQItem({
  item,
  isOpen,
  onToggle,
  idx,
}: {
  item: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-stone-100 last:border-b-0"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left flex items-center justify-between gap-4 py-5 cursor-pointer group"
      >
        <span className={`font-sans font-medium text-[13px] sm:text-sm leading-snug tracking-tight transition-colors duration-200 flex-1 ${
          isOpen ? "text-stone-900" : "text-stone-500 group-hover:text-stone-800"
        }`}>
          {item.question}
        </span>
        <span className={`shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronSvg
            direction="down"
            color={isOpen ? "#8B5E3C" : "#d6d3d1"}
            size={16}
            strokeWidth={1.5}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-stone-700 font-sans font-normal text-sm leading-relaxed tracking-normal">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const openedFAQs = useRef(new Set<string>());
  const faqDepth   = useRef({ d10: false, d30: false, d50: false, d70: false });

  const toggle = (id: string, question: string) => {
    setOpenId((prev) => {
      if (prev === id) return null;
      openedFAQs.current.add(id);
      const pct = openedFAQs.current.size / FAQS.length;
      if (!faqDepth.current.d10 && pct >= 0.10) { faqDepth.current.d10 = true; trackGoal("faq_depth_10"); }
      if (!faqDepth.current.d30 && pct >= 0.30) { faqDepth.current.d30 = true; trackGoal("faq_depth_30"); }
      if (!faqDepth.current.d50 && pct >= 0.50) { faqDepth.current.d50 = true; trackGoal("faq_depth_50"); }
      if (!faqDepth.current.d70 && pct >= 0.70) { faqDepth.current.d70 = true; trackGoal("faq_depth_70"); }
      return id;
    });
  };

  const leftFAQs  = FAQS.slice(0, 5);
  const rightFAQs = FAQS.slice(5, 10);
  const visibleFAQs = showAll ? FAQS : FAQS.slice(0, 5);

  return (
    <section id="faq" className="py-8 sm:py-20 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-7 sm:mb-14">
          <h2 className="text-[clamp(20px,2.8svh,26px)] sm:text-3xl xl:text-4xl font-sans font-bold text-stone-900 tracking-tight leading-tight">
            Ответы на вопросы
          </h2>
        </div>

        {/* Mobile: minimalist single column + «Ещё» */}
        <div className="sm:hidden">
          <div className="border-t border-stone-100">
            {visibleFAQs.map((item, idx) => (
              <FAQItem
                key={item.id}
                item={item}
                idx={idx}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id, item.question)}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="font-sans text-stone-400 cursor-pointer"
                style={{ fontSize: "12px", letterSpacing: "0.03em", borderBottom: "1px solid #d6d3d1", paddingBottom: "1px" }}
              >
                Ещё
              </button>
            ) : (
              <button
                onClick={() => setShowAll(false)}
                className="font-sans text-stone-400 cursor-pointer"
                style={{ fontSize: "12px", letterSpacing: "0.03em", borderBottom: "1px solid #d6d3d1", paddingBottom: "1px" }}
              >
                Скрыть
              </button>
            )}
          </div>
        </div>

        {/* Desktop: two columns */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 xl:gap-32">
          <div className="border-t border-stone-100">
            {leftFAQs.map((item, idx) => (
              <FAQItem
                key={item.id}
                item={item}
                idx={idx}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id, item.question)}
              />
            ))}
          </div>
          <div className="border-t border-stone-100">
            {rightFAQs.map((item, idx) => (
              <FAQItem
                key={item.id}
                item={item}
                idx={idx + 5}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id, item.question)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
