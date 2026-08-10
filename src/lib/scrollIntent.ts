/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Tracks whether the user is actively scrolling "by hand" (mouse wheel,
 * touch drag, keyboard, or dragging the scrollbar) versus the page being
 * moved programmatically (e.g. `scrollTo`/`scrollIntoView` triggered by a
 * CTA button or anchor link).
 *
 * Used by scroll-depth / carousel-interaction analytics so that clicking
 * "Написать Артему" (which smooth-scrolls to the contact section) doesn't
 * get counted as the visitor manually scrolling.
 */

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

let lastNaturalInteraction = 0;
let programmaticScrollUntil = 0;
let mouseButtonDown = false;
let initialized = false;

function markNatural() {
  lastNaturalInteraction = Date.now();
}

function initNaturalScrollListeners() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  window.addEventListener("wheel", markNatural, { passive: true });
  window.addEventListener("touchstart", markNatural, { passive: true });
  window.addEventListener("touchmove", markNatural, { passive: true });

  window.addEventListener(
    "keydown",
    (e) => {
      if (SCROLL_KEYS.has(e.key)) markNatural();
    },
    { passive: true }
  );

  // Dragging the scrollbar starts with a mousedown and continues via
  // mousemove while the button is held – approximate "manual scrollbar
  // movement" detection without a dedicated browser API for it.
  window.addEventListener(
    "mousedown",
    () => {
      mouseButtonDown = true;
      markNatural();
    },
    { passive: true }
  );
  window.addEventListener("mouseup", () => {
    mouseButtonDown = false;
  });
  window.addEventListener(
    "mousemove",
    () => {
      if (mouseButtonDown) markNatural();
    },
    { passive: true }
  );
}

initNaturalScrollListeners();

/**
 * Call this immediately before triggering any programmatic scroll
 * (`window.scrollTo`, `element.scrollIntoView`, `element.scrollBy`, etc.)
 * so that resulting scroll events aren't misattributed to the user.
 *
 * Also temporarily disables CSS scroll-snap on <html> so that snap points
 * (Workflow, Reviews) don't intercept / redirect the smooth scroll to the
 * wrong destination.  Snap is restored as soon as the browser fires the
 * `scrollend` event (or after `durationMs` as a fallback for older browsers).
 */
export function markProgrammaticScroll(durationMs = 1400): void {
  programmaticScrollUntil = Date.now() + durationMs;

  const html = document.documentElement;
  html.style.scrollSnapType = "none";

  const restore = () => { html.style.scrollSnapType = ""; };

  if ("onscrollend" in window) {
    window.addEventListener("scrollend", restore, { once: true });
    // Safety fallback in case scrollend never fires (e.g. scroll was instant)
    setTimeout(restore, durationMs);
  } else {
    setTimeout(restore, durationMs);
  }
}

/**
 * Returns true if the most recent scroll movement is likely the result of
 * direct user input (wheel/touch/keyboard/scrollbar) rather than a
 * programmatic scroll triggered by app code.
 */
export function isNaturalScroll(toleranceMs = 700): boolean {
  const now = Date.now();
  if (now < programmaticScrollUntil) return false;
  return now - lastNaturalInteraction < toleranceMs;
}
