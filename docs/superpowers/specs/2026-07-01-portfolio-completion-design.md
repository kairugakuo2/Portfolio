# Portfolio Completion Design

## Context

The portfolio (React + Vite) has been stale for ~3 years. `Intro`, `About`, and
`Experience` exist but are out of date relative to the resume. `Projects.jsx`
is an empty file. There is no Skills section, no Leadership section, no
dark/light theme, and `Footer.jsx` is empty. The goal is to bring the site up
to date using the resume (`Gakuo_Kairu_Resume (4).pdf`) as the source of truth
for new content, add the missing sections, and add a real light/dark theme
system — all with a clean, non-generic-AI-looking visual style.

## Content plan (sourced from resume, no invented facts)

### Experience — add 2 new entries, keep all 4 existing
Existing entries (LLC Student Programmer, Delta Tau Delta, Velocity Detailing,
Arcis Golf) are kept as-is per user decision — user will prune later.

New entries to add:
- **Argo Data** — Software Engineer Intern, Richardson TX, Jun 2026–Current.
  Building a secure signing key bootstrap/rotation system in C#/.NET for
  GLBA/HIPAA-regulated banking infrastructure; DPAPI-encrypted local key
  cache, Registrar API client, automated rotation with failure recovery;
  MSTest coverage for bootstrap, cache, DPAPI round-trip, rotation, Registrar
  error scenarios.
- **William Kerber Software Studio** — Founder (Selected Team), Norman OK,
  Feb 2026–Current. Selected as part of a 4-person team to develop a
  professional esports media aggregation platform; led UI/UX design through
  Figma prototypes used in investor pitch and MVP planning.

### Leadership (new section)
- **Google Developer Group (GDG) – University of Oklahoma** — Connections
  Coordinator, Norman OK, Sep 2025–Current. Collaborating with team to plan
  and coordinate tech workshops and networking events; leading outreach and
  partnership efforts to grow cross-organization engagement on campus.

### Projects (new section — currently empty file)
Exactly the 3 projects listed on the resume, in resume order:

1. **StudySync** — React, JavaScript, Git, Vercel — Aug 2025–Dec 2025
   - Technical lead for a 5-person team, coordinating sprints, task
     ownership, and delivery
   - Built frontend architecture including auth flow and dashboard-based
     feature layout
   - Established modular file structure enabling parallel development with
     minimal conflicts
   - Delivered end-to-end (demo, docs, submission), earning a perfect grade
   - Link: https://github.com/kairugakuo2/StudySync

2. **URL Shortener API** — C#, ASP.NET Core Minimal API, SQLite, EF Core —
   Sep 2025–Current
   - Built a REST API for short links, redirects, and click tracking
   - Robust input validation and centralized error handling with
     ProblemDetails responses (400, 404, 500)
   - Tested endpoints with Swagger/OpenAPI; added health checks and seeding
     routines
   - xUnit tests, Docker containerization, GitHub Actions CI for
     automated build/test
   - Link: https://github.com/kairugakuo2/url-shortener-minimal

3. **Sooner Planner** — TypeScript, React, Next.js, Tailwind CSS, Git —
   June 2025–Current
   - Class scheduler generating 1,000+ possible combinations from OU course
     data and user filters
   - Responsive UI with React + Tailwind, supporting mobile and desktop
   - State logic for dynamic schedule rendering and real-time updates
   - Link: https://github.com/kairugakuo2/sooner-planner

Each project renders as a card: title, duration, tech-tag row, bullet
highlights, GitHub link icon.

### Skills (new section)
Three grouped columns, exactly as listed on the resume:
- **Languages:** Python, C++, Java, JavaScript/TypeScript, C#, SQL
- **Frameworks:** React, Next.js, Node.js, ASP.NET Core, Entity Framework
  Core, Swagger/OpenAPI, Vite
- **Tools:** Git/GitHub, Visual Studio, Docker, xUnit/Jest, MSTest, Chrome
  DevTools, CLI, Vercel, Agile Workflow

Rendered as flat tag pills grouped under each category heading.

### Footer (currently empty)
Name, social icons (email / GitHub / LinkedIn — same three as navbar),
copyright line with current year.

### Site order
`NavBar → Intro → About → Experience → Leadership → Projects → Skills →
Footer`. NavBar links updated to include Leadership, Projects, Skills anchors
and a theme toggle button.

## Visual design system

**Style baseline: Swiss Modernism 2.0** — strict grid, generous whitespace,
mathematical 8px spacing scale, one accent color, minimal decoration, no
gradients/glow/glassmorphism. Chosen specifically to avoid the generic
"AI-portfolio" look (neon terminal/cyberpunk themes, gradient skill pills,
heavy drop shadows) that a naive "programmy" interpretation tends toward.

**Typography — Developer Mono pairing:**
- Body/headings: `IBM Plex Sans` (clean, technical, highly readable)
- Accent/mono: `JetBrains Mono` — used *sparingly*, only for the existing
  `/ section-name` slash-prefixed headers, tech tags, and date ranges. Not
  applied to body text or paragraphs — monospace-everywhere reads as a
  hacker-theme cliché; monospace-as-accent reads as a working developer's
  choice.

**Color system (real light + dark, both fully supported):**
- Light: near-white background (`#FAFAFA`), near-black text (`#111827`), one
  accent color (desaturated blue, evolving the existing `#007bff`)
- Dark: deep slate (`#0F172A`), off-white text (`#F8FAFC`) — not pure black,
  avoiding the OLED-hacker aesthetic — same accent tuned for AA contrast in
  dark mode
- CSS custom properties define all colors; `[data-theme="dark"]` attribute on
  `html` swaps the variable set
- Card/section separation via 1px borders, not drop shadows; a subtle 1px
  translateY lift on hover is the only elevation cue (replacing the current
  gradient skill-tags and heavy `box-shadow` hover states in
  `Experience.jsx`/`App.css`)

**Theme toggle:**
- Icon button in `NavBar` (sun/moon, FontAwesome — already a project
  dependency)
- Preference persisted in `localStorage`; falls back to
  `prefers-color-scheme` on first visit
- Theme applied via a small inline script in `index.html` before paint, to
  avoid a flash of the wrong theme

**Layout:** keep the existing single-column, centered `.App` container.
Projects and Skills use the same card-grid pattern already established by
`.experience-grid` (CSS grid, `auto-fit`, `minmax`), restyled per the flat
Swiss-modernist palette above rather than the current gradient/shadow style.

## Technical approach

**New files:**
- `src/sections/Leadership.jsx`
- `src/sections/Projects.jsx` (rewrite — currently empty)
- `src/sections/Skills.jsx`
- `src/components/ThemeToggle.jsx`
- `src/context/ThemeContext.jsx` (theme state + localStorage + system
  preference fallback)

**Modified files:**
- `src/App.jsx` — render new sections in order, wrap in `ThemeContext`
  provider
- `src/components/NavBar.jsx` — add Leadership/Projects/Skills links, render
  `ThemeToggle`
- `src/components/Footer.jsx` — build out (currently empty)
- `src/sections/Experience.jsx` — append Argo Data and William Kerber Software
  Studio entries to the existing `experiences` array; keep all 4 existing
  entries unchanged
- `src/styles/App.css` — introduce CSS custom properties for color, replace
  gradient/shadow-heavy styles with the flat Swiss-modernist treatment, add
  styles for new sections, add font imports/`font-family` rules for IBM Plex
  Sans + JetBrains Mono
- `index.html` — add Google Fonts `<link>`/`@import`, add pre-paint theme
  script

**Out of scope for this spec:** pruning the stale Experience entries (user
will decide later), adding a live-deploy link for Sooner Planner or other
projects (only GitHub links are confirmed), redesigning the `Intro`/`About`
copy itself (content unchanged, only new sections/theme are added).

## Error handling / edge cases

- If `localStorage` is unavailable (e.g., private browsing), theme falls back
  to `prefers-color-scheme` read on every load rather than throwing.
- No backend/data-fetching involved — all content is static, hardcoded from
  the resume, matching the existing pattern in `Experience.jsx`.

## Testing

No existing test suite in this project (Vite + React, no test runner
configured). Verification will be manual: run `npm run dev`, visually check
each new section renders, toggle theme and confirm both light and dark
render correctly with no flash-of-wrong-theme, check responsive behavior at
375px/768px/1024px per the existing mobile breakpoint pattern in `App.css`.
