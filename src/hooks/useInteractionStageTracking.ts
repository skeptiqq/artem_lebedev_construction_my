/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { trackGoal } from "../lib/metrika";
import { isNaturalScroll } from "../lib/scrollIntent";

const STAGES: { id: string; goal: string }[] = [
  { id: "hero",         goal: "stage_reached_hero" },
  { id: "trustbar",    goal: "stage_reached_trustbar" },
  { id: "portfolio",   goal: "stage_reached_portfolio" },
  { id: "advantages",  goal: "stage_reached_advantages" },
  { id: "about",       goal: "stage_reached_about" },
  { id: "workflow",    goal: "stage_reached_workflow" },
  { id: "design-project", goal: "stage_reached_design_project" },
  { id: "reviews",     goal: "stage_reached_reviews" },
  { id: "faq",         goal: "stage_reached_faq" },
  { id: "contact",     goal: "stage_reached_contact" },
];

/**
 * Fires a Metrika goal the first time the visitor naturally scrolls far
 * enough to reach each major content section ("interaction stage") of the
 * page. Each stage fires at most once per page load.
 *
 * Goals only fire for natural scrolling (mouse wheel, touch, keyboard,
 * scrollbar drag). Programmatic scrolls triggered by CTA buttons that jump
 * the user to a lower section mark any skipped-over sections as "jumped".
 * A jumped section's goal will only fire once the user physically scrolls
 * back to it – i.e. its top edge enters the ±15 % viewport window – so a
 * single button click never auto-completes goals for sections the user
 * never actually saw.
 */
export function useInteractionStageTracking(): void {
  useEffect(() => {
    const reached = new Set<string>();
    // Sections whose top was already past the threshold during a programmatic
    // scroll – they need a real physical visit before the goal fires.
    const skipped = new Set<string>();

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const natural = isNaturalScroll();

      if (!natural) {
        // Programmatic scroll in progress (button/anchor jump).
        // Mark every unreached section that is now above the trigger threshold
        // as "skipped" so subsequent natural scrolling won't auto-fire them.
        for (const stage of STAGES) {
          if (reached.has(stage.id)) continue;
          const el = document.getElementById(stage.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top <= viewportHeight * 0.15) {
            skipped.add(stage.id);
          }
        }
        return;
      }

      // Natural scroll – evaluate each unreached stage.
      for (const stage of STAGES) {
        if (reached.has(stage.id)) continue;
        const el = document.getElementById(stage.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;

        let fire = false;

        if (skipped.has(stage.id)) {
          // This section was jumped over programmatically.
          // Only fire when the user has genuinely scrolled to it:
          // the section's top edge must be within ±10 % of the viewport top
          // (small negative tolerance handles scroll-event timing jitter when
          // the section is just barely off the top of the screen).
          if (top >= -viewportHeight * 0.1 && top <= viewportHeight * 0.15) {
            fire = true;
            skipped.delete(stage.id);
          }
        } else {
          // Normal case: section has never been jumped over.
          // Fire as soon as it scrolls within 15 % of the viewport top.
          if (top <= viewportHeight * 0.15) {
            fire = true;
          }
        }

        if (fire) {
          reached.add(stage.id);
          trackGoal(stage.goal);
        }
      }

      if (reached.size === STAGES.length) {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
