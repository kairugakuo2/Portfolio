# gakuokairu.com

Personal site — positioned around distributed services and API security.

Built with [Astro](https://astro.build) (static output) with React islands for the
few genuinely interactive pieces.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve the built output
npm run check    # type-check .astro / .ts / .tsx
```

## Layout

```
src/
  content/writing/   the essays (MDX) — the point of the site
  content.config.ts  collection schema, incl. the provenance field
  data/              experience, projects, skills, site metadata
  pages/             routes
  components/        .astro components + three React islands
  layouts/Base.astro shell: head, nav, footer, palette
  lib/theme.js       theme store shared across islands
  styles/global.css  tokens + all styling
```

## Adding an essay

Drop an `.mdx` file in `src/content/writing/`. Frontmatter:

```yaml
---
title: "..."
summary: "..."
date: 2026-07-26
tags: ["Security"]
featured: false     # surfaces it on the home page
draft: false        # true hides it from listings and the sitemap
provenance: production | domain | position
readingTime: "8 min read"
---
```

### The `provenance` field

Every essay states what kind of evidence backs it, rendered as a badge on the page:

- `production` — written from code I wrote and can link to.
- `domain` — explains a problem class from public knowledge. Contains no
  employer-specific architecture, and says so on the page.
- `position` — a researched argument, not something I've shipped.

This is deliberate. It keeps claims honest and makes the NDA boundary explicit
rather than implied.

## Content notes

Nothing in `src/content/writing/` describes any employer's internal systems.
The two `domain` essays cover publicly documented problem classes (key
rotation, secrets at rest) and carry a visible disclaimer to that effect.

## Diagrams

ASCII, inside `<div class="diagram">` blocks — version-controllable as text,
no build-time renderer, and on-theme with the rest of the site.

## Theme

`data-theme` on `<html>`, set by an inline script before first paint to avoid a
flash. Islands share state through `src/lib/theme.js` rather than React context,
since each island is its own React root and a provider can't span them.
