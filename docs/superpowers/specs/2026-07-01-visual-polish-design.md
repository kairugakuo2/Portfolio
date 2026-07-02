# Visual Polish & Interactions Design

## Context

The portfolio-completion branch delivered content and theming. User feedback
after previewing: fonts feel inconsistent, and the site should "look, feel,
and move differently." Approved direction: **terminal-precise** — extend the
existing developer identity (typing intro, slash-headers, mono accents)
rather than bolting on generic animation. All features approved by user on
2026-07-01.

## 1. Typography cleanup

**Root cause of "inconsistent fonts":** leftover Vite-template
`font-family: system-ui, Avenir, Helvetica, Arial, sans-serif` in
`src/styles/index.css:10`, plus an unclear mono/body split within cards.

- Remove the `font-family` declaration from `index.css` `:root` — the `body`
  rule in `App.css` already applies `var(--font-body)`.
- Hard rule, applied everywhere: **mono = machine text** (section headers,
  commit hashes, dates, tags, status bar, palette text), **body = human
  text** (names, job titles, descriptions, paragraphs). `.company-name`,
  `.org-name`, `.project-name`, `.job-title`, `.role-title` stay body font;
  `.duration`, `.skill-tag`, `.skills-group-title` stay mono. Exactly two
  families site-wide: IBM Plex Sans, JetBrains Mono.
- While in `index.css`: it still contains the Vite template's own theme
  variables (`--text-color`, `--bg-color`, `--navbar-bg`, `--link-color`,
  `--link-hover`, `--button-bg`) and a `prefers-color-scheme` media query
  that duplicate/fight the App.css theme system. Migrate what's used
  (link colors, button styling, nav background) to the App.css variable
  system and slim `index.css` down to true resets (box-sizing, smooth
  scroll, scroll-padding). This is in scope because it's the same root
  cause: two competing theme/font systems.

## 2. Motion baseline (direction #1)

- **Nav underline:** nav links animate a 1px underline left-to-right on
  hover (`transform: scaleX` on a pseudo-element, 200ms ease-out).
- **Staggered card entrance:** cards inside each section grid get a
  one-time rise-and-fade on scroll-into-view, staggered ~40ms per card.
  Implemented via CSS `animation-delay` driven by an `--stagger-index`
  custom property set inline per card (`style={{ "--stagger-index": i }}`),
  gated by the existing `FadeInSection`/IntersectionObserver pattern already
  in the codebase — no new dependencies.
- **Scroll progress bar:** 2px accent-colored bar fixed to the bottom edge
  of the navbar, width = scroll progress. Small React component
  (`ScrollProgress.jsx`) with a passive scroll listener.
- **Reduced motion:** one `@media (prefers-reduced-motion: reduce)` block
  disables underline animation (instant underline), stagger (cards appear
  immediately), progress bar stays (it's informational, not motion), caret
  blink (solid caret), CRT flicker (plain theme swap).

## 3. Blinking caret on section headers

`▊` block cursor after each `/ section` header text, rendered via CSS
`::after` on the section `h1` elements, 1s step blink animation, accent
color. Solid (no blink) under reduced-motion.

## 4. Git-log experience (light touch)

- Existing card layout unchanged.
- Section header text becomes `/ git log --experience`.
- Each `.duration` badge becomes a fake commit ref in mono: current roles
  render `f4a7c2e · JUN 2026 → HEAD`, past roles `9b3d1e8 · SEP 2022 → AUG
  2024`. Hashes are hardcoded 7-char hex strings in the `experiences` array
  (new `hash` field); `HEAD` replaces "PRESENT".
- `(HEAD)` styling: accent color on the `HEAD` token.

## 5. Status-bar footer

Above the existing copyright line, a slim full-width mono strip styled like
a VS Code status bar: left group `⎇ main` and `Norman, OK`; right group
`UTF-8` and the current theme name (`light` / `dark`, live from
`useTheme()`). 1px top border, `--color-bg-elevated` background, small mono
text. Existing footer content (name, social icons, copyright) stays.
Component: extend `Footer.jsx` (status bar is part of the footer, not a new
top-level component).

## 6. Command palette (⌘K / Ctrl+K)

- New `src/components/CommandPalette.jsx`. No new npm dependencies.
- Global keydown listener (added in the palette component, mounted once in
  `App.jsx`): ⌘K (mac) / Ctrl+K opens; Escape closes; ↑/↓ move selection;
  Enter executes; click-outside closes. Background scroll locked while open.
- Commands (hardcoded array): `Go to About`, `Go to Experience`,
  `Go to Leadership`, `Go to Projects`, `Go to Skills`, `Toggle theme`,
  `Copy email` (writes kairugakuo2@gmail.com to clipboard, shows brief
  "copied ✓" state), `Open GitHub`, `Open LinkedIn`.
- Filter: case-insensitive substring match on command label.
- Styling: centered overlay, mono input with `>` prompt prefix, dimmed
  scrim, selected row highlighted with accent border-left. Fully
  variable-driven for both themes.
- Discoverability: a small `⌘K` hint chip in the navbar (`#rightNav`,
  before the theme toggle) that also opens the palette on click; hidden on
  mobile (<768px) where the palette is keyboard-only anyway — mobile users
  simply don't see it (acceptable: palette is a desktop affordance).
- Accessibility: `role="dialog"` + `aria-label`, input auto-focused on
  open, focus returned to previously-focused element on close.

## 7. CRT flicker on theme toggle

150ms one-shot overlay animation (2-3 horizontal scanline bands + quick
opacity flicker) triggered when `toggleTheme` fires. Implemented as a
short-lived element rendered by `ThemeToggle.jsx` (state: `flicking` set
true on click, cleared on `animationend`). Skipped entirely under
reduced-motion (theme swaps instantly, no overlay).

## 8. Console easter egg

One-time `useEffect` in `App.jsx`: `console.log` with a small ASCII-art
"GAKUO" banner (%c-styled), a friendly line ("like what you see? let's
talk → kairugakuo2@gmail.com"), and the GitHub URL. Fires once per load,
no UI impact.

## Constraints

- Zero new npm dependencies.
- All colors/fonts via existing CSS custom properties; new tokens allowed
  only if added to both `:root` and `[data-theme="dark"]`.
- Every animation ≤ 400ms except the 1s caret blink loop; ease-out enter.
- One consolidated `prefers-reduced-motion` block covers all new motion.
- No layout shift from any animation (transform/opacity only).
- Existing content, sections, and theme system untouched except where named.

## Testing

Manual (no test runner): `npm run dev` — verify each feature in both
themes; keyboard-walk the palette (open, filter, arrows, enter, escape);
toggle OS reduced-motion and confirm animations disable; check 375px width
(hint chip hidden, no horizontal scroll); `npm run build` passes clean.
