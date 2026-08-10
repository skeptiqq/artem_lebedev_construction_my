---
name: Major landing rebuild July 2026
description: Full site redesign per Artem's brief — new structure, components, data models
---

## Key decisions

**Portfolio** replaced with comfort/premium only (no "бизнес"). Projects stored in `src/data.ts` as `PROJECTS: Project[]`. New `Project` type uses `images: string[]` (many photos) + separate `cover`. ProjectGallery modal handles full-screen lightbox.

**New components added:**
- `ProjectGallery.tsx` — gallery modal with lightbox, swipe, keyboard, counter, preload
- `Advantages.tsx` — 11 concrete advantage cards from `ADVANTAGES` in data
- `Guarantees.tsx` — 6 guarantee points + 6-step control scheme
- `DesignProject.tsx` — design service block; `DESIGN_PROJECT` config in data has `showExampleButton: false` until PDF added

**Rebuilt components:**
- `Portfolio.tsx` — Комфорт/Премиум switcher, card grid, opens ProjectGallery
- `About.tsx` — "Кто отвечает за ваш ремонт" — large bio, stats, principles, "why personal foreman" callout
- `Workflow.tsx` — 14 stages from `WORK_STAGES` (was 6 steps from `WORK_STEPS`); mobile = accordion, desktop = 2-col grid
- `Reviews.tsx` — image-based reviews (10 slots from `REVIEWS: ReviewImage[]`); shows placeholder grid when no images loaded
- `FAQ.tsx` — allows multiple open at once (Set<string>); 26 questions in data

**App structure** (App.tsx order): Hero → Convenience → Responsibilities → About → Advantages → Portfolio → LiveInspection → Workflow → Guarantees → DesignProject → Reviews → FAQ → ContactForm

**Why:** `WORK_STEPS` renamed to `WORK_STAGES` in data.ts — any old import of `WORK_STEPS` will break.

**Image slots that need real photos:**
- `comfort_molodogvardeyskaya` — cover and images use PLACEHOLDER
- `comfort_rodniki` — cover and images use portfolioAptDone + PLACEHOLDER
- All 10 review slots in `REVIEWS` have `image: ""` — show placeholder grid until filled
- `DESIGN_PROJECT.showExampleButton = false` — set to true when PDF URL added

**How to apply:** When adding real photos — import with ES `import` in data.ts, add to project's `images` array. For reviews, set `image:` field to imported string.
