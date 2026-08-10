/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Tracks the "return to previous position" behavior for CTA buttons that
 * jump the user straight to the contact section (e.g. "Написать Артему",
 * "Обсудить проект"). Saves where the user was before the jump so a small
 * "Вернуться назад" button can smoothly scroll them back – no
 * `history.back()`, just an internal scroll position.
 */

type VisibilityListener = (visible: boolean) => void;

let savedPosition: number | null = null;
let revealTimeout: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<VisibilityListener>();

function notify(visible: boolean): void {
  listeners.forEach((listener) => listener(visible));
}

/** Subscribe to return-button visibility changes. Returns an unsubscribe fn. */
export function subscribeReturnVisibility(listener: VisibilityListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Call right before triggering a programmatic scroll/jump to the contact
 * section. Saves the current scroll position and reveals the return button
 * once the smooth-scroll animation has actually settled (polls scrollY
 * until it stops changing, rather than a fixed delay), so it doesn't flash
 * and then get dismissed mid-scroll on longer pages.
 */
export function beginContactJump(maxWaitMs = 4000): void {
  savedPosition = window.scrollY;
  if (revealTimeout) clearTimeout(revealTimeout);

  let lastY = window.scrollY;
  let stableTicks = 0;
  const startedAt = Date.now();
  const POLL_MS = 100;
  const STABLE_TICKS_NEEDED = 3;

  const check = () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 2) {
      stableTicks += 1;
    } else {
      stableTicks = 0;
      lastY = y;
    }

    if (stableTicks >= STABLE_TICKS_NEEDED || Date.now() - startedAt > maxWaitMs) {
      notify(true);
      return;
    }

    revealTimeout = setTimeout(check, POLL_MS);
  };

  revealTimeout = setTimeout(check, POLL_MS);
}

export function getSavedScrollPosition(): number | null {
  return savedPosition;
}

/** Hide the return button and forget the saved position. */
export function dismissReturn(): void {
  savedPosition = null;
  if (revealTimeout) {
    clearTimeout(revealTimeout);
    revealTimeout = null;
  }
  notify(false);
}
