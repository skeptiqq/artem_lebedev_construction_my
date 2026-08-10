/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Lightweight wrapper around Yandex.Metrika's `ym(...)` API.
 *
 * All calls are safe no-ops if the Metrika script hasn't loaded yet
 * (e.g. blocked by an ad-blocker or slow network) – they never throw.
 *
 * See ANALYTICS.md for the full list of goal names fired across the app.
 */

const METRIKA_COUNTER_ID = 110455087;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a named Yandex.Metrika goal.
 * @param goal - goal name, should match the list documented in ANALYTICS.md
 * @param params - optional extra parameters attached to the goal event
 */
export function trackGoal(goal: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window !== "undefined" && typeof window.ym === "function") {
      window.ym(METRIKA_COUNTER_ID, "reachGoal", goal, params);
    }
  } catch {
    // Never let analytics errors break the UI.
  }
}
