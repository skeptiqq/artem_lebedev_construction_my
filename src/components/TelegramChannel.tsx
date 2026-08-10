/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackGoal } from "../lib/metrika";

const CHANNEL_URL = "https://t.me/lebedevv_remont";
const STORAGE_KEY = "tg_channel_dismissed";

export default function TelegramChannel() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const faq = document.getElementById("faq");
    if (!faq) return;

    let fired = false;

    const onScroll = () => {
      if (fired) return;
      const rect = faq.getBoundingClientRect();
      if (rect.bottom <= window.innerHeight + 2) {
        fired = true;
        setVisible(true);
        trackGoal("telegram_popup_shown");
        window.removeEventListener("scroll", onScroll, true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", onScroll, true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-white px-4 sm:px-5 py-4 shadow-lg border border-stone-200">

            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Иконка */}
              <div className="shrink-0 w-9 h-9 flex items-center justify-center" style={{ background: "#2AABEE" }}>
                <Send className="w-4 h-4 text-white" />
              </div>

              {/* Текст */}
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-sm text-stone-900 leading-snug tracking-tight">
                  Telegram-канал Артема
                </p>
                <p className="font-sans text-xs text-stone-400 leading-snug mt-0.5">
                  Регулярные фото и видео с объектов
                </p>
              </div>

              {/* Закрыть (мобиль) */}
              <button
                onClick={dismiss}
                aria-label="Закрыть"
                className="sm:hidden shrink-0 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Кнопка подписки */}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal("telegram_popup_subscribe_click")}
              className="shrink-0 w-full sm:w-auto text-center px-5 py-2.5 sm:py-2
                         font-sans font-medium text-sm text-white tracking-wide
                         transition-opacity duration-200 whitespace-nowrap cursor-pointer hover:opacity-90"
              style={{ background: "#1B3A6B" }}
            >
              Подписаться
            </a>

            {/* Закрыть (десктоп) */}
            <button
              onClick={dismiss}
              aria-label="Закрыть"
              className="hidden sm:block shrink-0 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
