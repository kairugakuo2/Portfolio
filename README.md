# gakuokairu.com

Personal site — positioned around distributed services and API security.

Built with [Astro](https://astro.build) (static output) with React islands for the
few genuinely interactive pieces. Single scrolling page; experience and project
cards expand into a detail modal on click.

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
  data/                experience, projects, skills, site metadata
  pages/index.astro    the whole site — one scrolling page
  components/
    DetailModal.astro  the click-to-expand popup + its data + its script
    Nav.astro          section-anchor nav
    Footer.astro
    CommandPalette.jsx React island — ⌘K, scrolls to sections
    ThemeToggle.jsx    React island
    ScrollProgress.jsx React island
  layouts/Base.astro   shell: head, nav, footer, palette
  lib/theme.js         theme store shared across islands
  styles/global.css    tokens + all styling
```

## The detail modal

Experience and project cards carry `data-detail-id`. `DetailModal.astro` embeds
a JSON blob of every entry (built from `src/data/experience.ts` and
`projects.ts`) plus a small vanilla script that populates and opens a native
`<dialog>` on click. No React island for this — `<dialog>` gives focus
trapping and Esc-to-close for free, and a popup this simple doesn't need
hydration.

To add detail to a card, add an `insight` string to its entry in
`src/data/experience.ts` or `projects.ts` — it renders as a "further thinking"
block in the modal. Leave it off and the modal just shows the bullets and
skills already on the card.

## Content notes

There's no separate long-form writing section. Anything worth saying about the
Argo Data work or the URL Shortener lives as a condensed `insight` paragraph in
that entry's modal, not as a standalone page — deliberately no
employer-specific architecture, since Argo Data is an active internship.

## Theme

`data-theme` on `<html>`, set by an inline script before first paint to avoid a
flash. Islands share state through `src/lib/theme.js` rather than React context,
since each island is its own React root and a provider can't span them.
