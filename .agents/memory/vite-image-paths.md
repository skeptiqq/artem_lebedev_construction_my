---
name: Vite image paths break in prod
description: Why hardcoded /src/assets/... image paths work in dev but 404 after a Vite production build.
---

Referencing images as string paths like `src="/src/assets/images/foo.jpg"` only works with Vite's
dev server, which serves the `src` directory directly. In a production build, `src` isn't copied to
`dist` verbatim — only files that are actually imported as ES modules (or placed in `public/`) get
bundled/copied.

**Why:** Vite's dev server resolves any path against the project root, so `/src/...` "works" by
accident in dev. The production build only knows about assets reachable via `import img from "./x.jpg"`
(which get hashed and copied to `dist/assets/`) or files placed in `public/` (copied as-is to `dist/`).
Hardcoded `/src/...` strings are invisible to the build and become dead links after deploy.

**How to apply:** When auditing "images missing after publish" bugs, grep for `"/src/` or `'/src/` in
.tsx/.ts/data files. Fix by adding `import x from "../assets/images/x.jpg"` and using the imported
variable as the `src`/data value — this is the consistent approach to prefer across a codebase.
