/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { isNaturalScroll, markProgrammaticScroll } from "../lib/scrollIntent";
import { dismissReturn, getSavedScrollPosition, subscribeReturnVisibility } from "../lib/scrollReturn";

const AWAY_THRESHOLD_PX = 2400;

export default function ReturnToPreviousButton() {
  const [visible, setVisible] = useState(false);
  const anchorScrollY = useRef(0);

  // Only CTA-jump triggers this button
  useEffect(() => subscribeReturnVisibility(setVisible), []);

  // Dismiss when user scrolls far away
  useEffect(() => {
    if (!visible) return;
    anchorScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (!isNaturalScroll()) return;
      if (Math.abs(window.scrollY - anchorScrollY.current) > AWAY_THRESHOLD_PX) {
        dismissReturn();
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  if (!visible) return null;

  const handleClick = () => {
    const savedPosition = getSavedScrollPosition() ?? 0;
    dismissReturn();
    setVisible(false);
    markProgrammaticScroll();
    window.scrollTo({ top: savedPosition, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Вернуться назад"
      className="fixed top-[76px] right-3 sm:top-auto sm:bottom-6 sm:right-6 z-40
                 flex items-center gap-2.5 px-4 py-3
                 bg-white border border-stone-200 hover:border-stone-900
                 text-stone-500 hover:text-stone-900
                 font-sans text-sm font-medium tracking-wide
                 shadow-sm hover:shadow-none
                 transition-all duration-200 cursor-pointer"
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
        <path d="M8.5 2L4 6.5L8.5 11" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Вернуться назад
    </button>
  );
}
