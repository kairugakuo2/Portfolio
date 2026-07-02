# Visual Polish & Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved "terminal-precise" polish pass: unify typography onto exactly two font systems, add a coherent motion baseline, and ship five signature interactions (blinking caret headers, git-log experience, status-bar footer, ⌘K command palette, CRT theme flicker, console easter egg).

**Architecture:** Pure client-side React (Vite, React 19, plain CSS, no test runner). All theming continues through the CSS custom properties in `src/styles/App.css` (`--color-*`, `--font-*`). New interactive components (`CommandPalette`, `ScrollProgress`) are plain React with zero new dependencies; palette open-state is lifted to `App.jsx` and shared with the navbar hint chip via props.

**Tech Stack:** React 19, Vite, plain CSS, FontAwesome (existing dependency), react-intersection-observer (existing dependency, used by `FadeInSection`).

## Global Constraints

- Zero new npm dependencies.
- All colors/fonts via existing CSS custom properties; new tokens allowed only if added to BOTH `:root` and `[data-theme="dark"]` in `src/styles/App.css`.
- Exactly two font families site-wide: `var(--font-body)` (IBM Plex Sans) for human text (names, titles, descriptions), `var(--font-mono)` (JetBrains Mono) for machine text (section headers, hashes, dates, tags, status bar, palette).
- Every animation ≤ 400ms except the 1s caret blink loop; `ease-out` for entrances.
- One consolidated `@media (prefers-reduced-motion: reduce)` block in `App.css` covers all new motion (caret solid, no stagger, no underline animation, no CRT flicker).
- Animations use transform/opacity only — no layout shift.
- No test runner exists. "Verify" = `npm run dev`, check in browser, no console errors; `npm run build` passes clean.
- Email is exactly `kairugakuo2@gmail.com`; GitHub `https://github.com/kairugakuo2`; LinkedIn `https://www.linkedin.com/in/gakuo/`.

---

## File Structure

**New files:**
- `src/components/ScrollProgress.jsx` — scroll-progress bar (rAF-throttled listener)
- `src/components/CommandPalette.jsx` — ⌘K palette (overlay, filter, keyboard nav)

**Modified files:**
- `src/styles/index.css` — slim to true resets; remove Vite-template fonts/colors
- `src/styles/App.css` — migrated element styles, motion baseline, caret, git-log, status bar, palette, flicker, reduced-motion block
- `src/styles/FadeInSection.css` — soften section entrance, reduced-motion
- `src/sections/Experience.jsx` — git-log data + render
- `src/sections/Leadership.jsx`, `src/sections/Projects.jsx`, `src/sections/Skills.jsx` — stagger index on cards
- `src/components/NavBar.jsx` — ScrollProgress + ⌘K hint chip (via `onOpenPalette` prop)
- `src/components/Footer.jsx` — status bar strip
- `src/components/ThemeToggle.jsx` — CRT flicker overlay
- `src/App.jsx` — palette state, palette mount, console easter egg

---

### Task 1: Kill the third font system — consolidate index.css into the token system

**Files:**
- Modify: `src/styles/index.css` (full rewrite — currently 106 lines of Vite-template leftovers)
- Modify: `src/styles/App.css` (extend `:root`/`[data-theme="dark"]`/`body`, add element styles)

**Interfaces:**
- Consumes: existing tokens `--color-bg`, `--color-bg-elevated`, `--color-text`, `--color-border`, `--color-accent`, `--font-body`, `--font-mono` in `App.css`.
- Produces: global `a`, `button`, `h1`, `p` element styles now live in `App.css` under the token system; `index.css` contains ONLY resets. Later tasks assume `nav` background is `var(--color-bg)`.

- [ ] **Step 1: Rewrite `src/styles/index.css`**

Replace the full contents with:

```css
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

:root {
  scroll-padding-top: 80px;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

This removes: the `system-ui, Avenir, Helvetica...` font stack (the third font system causing the inconsistency), the duplicate `--text-color`/`--bg-color`/`--navbar-bg`/`--link-color`/`--link-hover`/`--button-bg` variables, the `prefers-color-scheme` media query (theme is handled by `data-theme` + App.css), and the `a`/`body`/`nav`/`button`/`h1`/`p` element rules (migrated to App.css next step).

- [ ] **Step 2: Migrate the needed element styles into `src/styles/App.css`**

In `App.css`, find the `:root { ... }` block and add `color-scheme: light;` as its first declaration. Find the `[data-theme="dark"] { ... }` block and add `color-scheme: dark;` as its first declaration.

Find the existing `body { ... }` rule (added in the theme-foundation task, contains `font-family: var(--font-body)`) and replace it with:

```css
body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  transition: background-color 200ms ease, color 200ms ease;
}
```

Directly after the `body` rule, add the migrated element styles:

```css
a {
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
}

a:hover {
  color: var(--color-accent);
}

h1 {
  margin: 0;
  padding: 0;
  font-size: 3em;
  line-height: 1.1;
  text-align: left;
}

p {
  font-size: 1.25rem;
  margin: 10px;
}

button {
  background-color: var(--color-bg-elevated);
  color: var(--color-text);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: var(--color-accent);
}
```

Then find the `nav{ ... }` rule (has `border-bottom: lightgrey solid 1px;`) and replace it with:

```css
nav{
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  padding: 10px 40px;
  z-index: 1000;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}
```

(This also fixes the hardcoded `lightgrey` border and the previously-transparent fixed nav, both leftovers that made themes inconsistent.)

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`

Expected: page renders identically-or-better in both themes: nav has a solid background matching the theme, links/buttons recolor with the theme, body text is IBM Plex Sans everywhere (inspect a paragraph in devtools — computed font-family must show "IBM Plex Sans", NOT system-ui/Avenir). `npm run build` → 0 warnings.

- [ ] **Step 4: Commit**

```bash
git add src/styles/index.css src/styles/App.css
git commit -m "Consolidate leftover Vite template styles into the token system"
```

---

### Task 2: Motion baseline — nav underline, staggered cards, scroll progress, reduced-motion block

**Files:**
- Create: `src/components/ScrollProgress.jsx`
- Modify: `src/components/NavBar.jsx` (mount ScrollProgress)
- Modify: `src/styles/FadeInSection.css` (soften entrance)
- Modify: `src/sections/Leadership.jsx`, `src/sections/Projects.jsx`, `src/sections/Skills.jsx`, `src/sections/Experience.jsx` (stagger index on cards)
- Modify: `src/styles/App.css` (underline, stagger keyframes, progress bar, consolidated reduced-motion block)

**Interfaces:**
- Consumes: `.fade-in-section` / `.is-visible` classes from `FadeInSection.jsx` (unchanged); `--color-accent` token.
- Produces: cards accept an inline `--stagger-index` custom property (`style={{ "--stagger-index": index }}`); a single `@media (prefers-reduced-motion: reduce)` block at the END of `App.css` that Tasks 3 and 6 append into (exact location: last block in the file, marked `/* ========== REDUCED MOTION ========== */`).

- [ ] **Step 1: Create `src/components/ScrollProgress.jsx`**

```jsx
import React, { useEffect, useRef } from "react";

const ScrollProgress = () => {
    const barRef = useRef(null);

    useEffect(() => {
        let rafId = null;

        const update = () => {
            rafId = null;
            const doc = document.documentElement;
            const max = doc.scrollHeight - window.innerHeight;
            const progress = max > 0 ? window.scrollY / max : 0;
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${progress})`;
            }
        };

        const onScroll = () => {
            if (rafId === null) {
                rafId = requestAnimationFrame(update);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
};

export default ScrollProgress;
```

- [ ] **Step 2: Mount it in `src/components/NavBar.jsx`**

Add the import:

```jsx
import ScrollProgress from "./ScrollProgress";
```

And render it as the LAST child inside the `<nav>` element (after the closing `</div>` of `.navContainer`):

```jsx
                </div>
                <ScrollProgress />
            </nav>
```

- [ ] **Step 3: Soften the section entrance in `src/styles/FadeInSection.css`**

Replace the full contents with:

```css
.fade-in-section {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
    .fade-in-section {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
```

- [ ] **Step 4: Add stagger index to cards in the four sections**

In `src/sections/Experience.jsx`, change the card `div`:

```jsx
                    <div key={index} className="experience-card" style={{ "--stagger-index": index }}>
```

In `src/sections/Leadership.jsx`:

```jsx
                    <div key={index} className="leadership-card" style={{ "--stagger-index": index }}>
```

In `src/sections/Projects.jsx`:

```jsx
                    <div key={index} className="project-card" style={{ "--stagger-index": index }}>
```

In `src/sections/Skills.jsx`, the map has no index parameter — change it:

```jsx
                {skillGroups.map((group, index) => (
                    <div key={group.category} className="skills-group" style={{ "--stagger-index": index }}>
```

- [ ] **Step 5: Add motion CSS to `src/styles/App.css`**

Append at the end of the file:

```css
 /* ========== MOTION: NAV UNDERLINE ========== */
#leftNav a {
  position: relative;
}

#leftNav a::after {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 6px;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease-out;
}

#leftNav a:hover::after {
  transform: scaleX(1);
}

 /* ========== MOTION: STAGGERED CARDS ========== */
@keyframes card-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-section .experience-card,
.fade-in-section .leadership-card,
.fade-in-section .project-card,
.fade-in-section .skills-group {
  opacity: 0;
}

.fade-in-section.is-visible .experience-card,
.fade-in-section.is-visible .leadership-card,
.fade-in-section.is-visible .project-card,
.fade-in-section.is-visible .skills-group {
  animation: card-rise 400ms ease-out forwards;
  animation-delay: calc(var(--stagger-index, 0) * 40ms);
}

 /* ========== MOTION: SCROLL PROGRESS ========== */
.scroll-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  pointer-events: none;
}

 /* ========== REDUCED MOTION ========== */
@media (prefers-reduced-motion: reduce) {
  #leftNav a::after {
    transition: none;
  }

  .fade-in-section .experience-card,
  .fade-in-section .leadership-card,
  .fade-in-section .project-card,
  .fade-in-section .skills-group {
    opacity: 1;
    animation: none;
  }

  .fade-in-section.is-visible .experience-card,
  .fade-in-section.is-visible .leadership-card,
  .fade-in-section.is-visible .project-card,
  .fade-in-section.is-visible .skills-group {
    animation: none;
  }
}
```

Note: the hover-lift `transform: translateY(-2px)` on cards conflicts with `animation ... forwards` holding the final keyframe. Fix by scoping the animation to not fight hover: after the animation completes the `forwards` fill keeps `translateY(0)`, which blocks the hover transform. To avoid this, add to the same appended CSS (directly after the stagger block):

```css
.fade-in-section.is-visible .experience-card:hover,
.fade-in-section.is-visible .leadership-card:hover,
.fade-in-section.is-visible .project-card:hover {
  animation: none;
  opacity: 1;
  transform: translateY(-2px);
}
```

(Once the entrance has played, hovering swaps to the static hover transform; visually seamless because both end states are `opacity: 1`.)

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev`

Expected: nav links draw a thin accent underline left-to-right on hover; scrolling shows a 2px accent bar filling along the navbar bottom; scrolling down to Experience/Projects shows cards rising in sequence (~40ms apart) instead of all at once; card hover still lifts 2px after entrance. Enable "reduce motion" in OS/devtools rendering emulation → cards appear instantly, no underline animation. `npm run build` clean.

- [ ] **Step 7: Commit**

```bash
git add src/components/ScrollProgress.jsx src/components/NavBar.jsx src/styles/FadeInSection.css src/styles/App.css src/sections/Experience.jsx src/sections/Leadership.jsx src/sections/Projects.jsx src/sections/Skills.jsx
git commit -m "Add motion baseline: nav underline, staggered cards, scroll progress"
```

---

### Task 3: Blinking caret headers + git-log experience

**Files:**
- Modify: `src/sections/Experience.jsx` (hash/from/to data, git-log render, header text)
- Modify: `src/styles/App.css` (caret ::after, commit-hash/head-ref styles, reduced-motion additions)

**Interfaces:**
- Consumes: the `/* ========== REDUCED MOTION ========== */` block created in Task 2 (append rules INSIDE it); `--color-accent`, `--font-mono` tokens; `.duration` class styling.
- Produces: `experiences` array entries gain `hash` (7-char string), `from` (string), `to` (string, `"HEAD"` for current roles); `duration` field is REMOVED. `.commit-hash` and `.head-ref` CSS classes.

- [ ] **Step 1: Update the `experiences` array in `src/sections/Experience.jsx`**

Replace each entry's `duration` field with `hash`, `from`, `to` — full array:

```jsx
const experiences = [
    {
        company: "Argo Data",
        title: "Software Engineer Intern",
        hash: "f4a7c2e",
        from: "JUN 2026",
        to: "HEAD",
        description: "Building a secure signing key bootstrap and rotation system in C#/.NET for GLBA/HIPAA-regulated banking infrastructure. Implementing DPAPI-encrypted local key cache, Registrar API client, and automated rotation logic with resilient failure recovery. Writing MSTest coverage for bootstrap, cache, DPAPI round-trip, rotation, and Registrar error scenarios.",
        skills: ["C#", ".NET", "MSTest", "Security", "Banking Infrastructure"]
    },
    {
        company: "William Kerber Software Studio",
        title: "Founder (Selected Team)",
        hash: "8d21b4a",
        from: "FEB 2026",
        to: "HEAD",
        description: "Selected as part of a 4 person team to develop a professional esports media aggregation platform. Led UI/UX design through Figma prototypes used in investor pitch and MVP planning.",
        skills: ["UI/UX Design", "Figma", "Product Strategy", "Team Leadership"]
    },
    {
        company: "University of Oklahoma",
        title: "Student Programmer",
        hash: "3c9f01d",
        from: "FEB 2025",
        to: "HEAD",
        description: "Maintain and update department web/apps, manage databases, and generate reports. Provide tech support for students, faculty, and staff, including language tests and video streaming. Work with the team on troubleshooting and larger tech projects.",
        skills: ["Web Development", "Database Management", "Tech Support", "Team Collaboration"]
    },
    {
        company: "Delta Tau Delta Fraternity",
        title: "Philanthropy Committee Member",
        hash: "b57e920",
        from: "JAN 2025",
        to: "HEAD",
        description: "Managed the GivePulse app to track fraternity volunteer hours. Onboarded members, imported data, and maintained records. Coordinated with GivePulse reps and helped set up volunteer opportunities.",
        skills: ["App Management", "Data Management", "Volunteer Coordination", "Team Leadership"]
    },
    {
        company: "Velocity Detailing",
        title: "Owner",
        hash: "6a04c8f",
        from: "MAY 2024",
        to: "DEC 2024",
        description: "Launched and scaled a mobile detailing business, completing 30+ projects in 3 months with 98% customer satisfaction. Acquired customers via free marketing platforms (Google, Yelp, TikTok, Instagram, Facebook). Designed and developed the website using CRM software, with additional customization in HTML and CSS.",
        skills: ["Business Development", "Digital Marketing", "Web Design", "Customer Service", "Project Management"]
    },
    {
        company: "Arcis Golf",
        title: "Outside Service Attendant",
        hash: "1e8d3b7",
        from: "SEP 2022",
        to: "AUG 2024",
        description: "Greet and assist golfers for a great experience. Keep carts in top shape and equipment organized. Help with events and smooth daily operations.",
        skills: ["Customer Service", "Equipment Maintenance", "Event Coordination", "Operations Management"]
    }
];
```

NOTE: Velocity Detailing's `to` changes from "PRESENT" to "DEC 2024" — this matches the resume (May 2024 – Dec 2024) and corrects a stale date. All other from/to values are transcriptions of the existing durations.

- [ ] **Step 2: Update the render in `src/sections/Experience.jsx`**

Change the header line:

```jsx
            <h1>/ git log --experience</h1>
```

Change the duration span inside the card map:

```jsx
                            <span className="duration">
                                <span className="commit-hash">{exp.hash}</span>
                                {" · "}{exp.from}{" → "}
                                {exp.to === "HEAD"
                                    ? <span className="head-ref">HEAD</span>
                                    : exp.to}
                            </span>
```

- [ ] **Step 3: Add caret + git-log styles to `src/styles/App.css`**

Append BEFORE the `/* ========== REDUCED MOTION ========== */` block:

```css
 /* ========== SECTION HEADER CARET ========== */
@keyframes caret-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.about h1::after,
.experience h1::after,
.leadership h1::after,
.projects h1::after,
.skills h1::after {
  content: '▊';
  margin-left: 0.35rem;
  color: var(--color-accent);
  animation: caret-blink 1s step-end infinite;
}

 /* ========== GIT LOG EXPERIENCE ========== */
.commit-hash {
  color: var(--color-accent);
}

.head-ref {
  color: var(--color-accent);
  font-weight: 600;
}
```

Then add INSIDE the existing `/* ========== REDUCED MOTION ========== */` media query block (before its closing `}`):

```css
  .about h1::after,
  .experience h1::after,
  .leadership h1::after,
  .projects h1::after,
  .skills h1::after {
    animation: none;
    opacity: 1;
  }
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`

Expected: every section header shows a blinking accent `▊` after its text; Experience header reads `/ git log --experience`; each experience card's badge reads like `f4a7c2e · JUN 2026 → HEAD` with hash and HEAD in accent color; Velocity Detailing shows `6a04c8f · MAY 2024 → DEC 2024`. Reduced-motion → caret solid, not blinking. Both themes readable. `npm run build` clean.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Experience.jsx src/styles/App.css
git commit -m "Add blinking caret headers and git-log styled experience"
```

---

### Task 4: Status-bar footer

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/styles/App.css` (status bar styles)

**Interfaces:**
- Consumes: `useTheme()` from `src/context/ThemeContext` returning `{ theme, toggleTheme }`; `--color-bg-elevated`, `--color-border`, `--color-text-muted`, `--font-mono` tokens.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the status bar to `src/components/Footer.jsx`**

Replace the full contents with:

```jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "../context/ThemeContext";
import "../styles/App.css";

const Footer = () => {
    const year = new Date().getFullYear();
    const { theme } = useTheme();

    return (
        <footer className="footer">
            <span className="footer-name">Gakuo Kairu</span>
            <div className="footer-social">
                <a target="_blank" rel="noreferrer" href="mailto:kairugakuo2@gmail.com" aria-label="Email">
                    <FontAwesomeIcon icon={faEnvelope} className="socialIcon" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/kairugakuo2" aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithub} className="socialIcon" />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/gakuo/" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} className="socialIcon" />
                </a>
            </div>
            <div className="status-bar" aria-hidden="true">
                <div className="status-group">
                    <span className="status-item">⎇ main</span>
                    <span className="status-item">Norman, OK</span>
                </div>
                <div className="status-group">
                    <span className="status-item">UTF-8</span>
                    <span className="status-item">{theme}</span>
                </div>
            </div>
            <span className="footer-copyright">&copy; {year} Gakuo Kairu. Built with React.</span>
        </footer>
    );
};

export default Footer;
```

- [ ] **Step 2: Add status bar styles to `src/styles/App.css`**

Append BEFORE the `/* ========== REDUCED MOTION ========== */` block:

```css
 /* ========== STATUS BAR ========== */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.4rem 1rem;
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.status-group {
  display: flex;
  gap: 1.25rem;
}
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`

Expected: footer shows a slim mono strip between the social icons and the copyright: `⎇ main  Norman, OK` on the left, `UTF-8  light` (or `dark`) on the right; the theme label updates live when the toggle is clicked. Both themes look right; no horizontal overflow at 375px. `npm run build` clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.jsx src/styles/App.css
git commit -m "Add VS Code-style status bar to footer"
```

---

### Task 5: Command palette (⌘K)

**Files:**
- Create: `src/components/CommandPalette.jsx`
- Modify: `src/App.jsx` (palette state + mount)
- Modify: `src/components/NavBar.jsx` (⌘K hint chip via `onOpenPalette` prop)
- Modify: `src/styles/App.css` (palette + hint chip styles, mobile hide)

**Interfaces:**
- Consumes: `useTheme()` (`{ theme, toggleTheme }`); tokens `--color-bg-elevated`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--font-mono`.
- Produces: `CommandPalette` default export with props `{ open, onOpen, onClose }` (all required; `onOpen`/`onClose` are zero-arg functions). `NavBar` gains prop `onOpenPalette` (zero-arg function).

- [ ] **Step 1: Create `src/components/CommandPalette.jsx`**

```jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/App.css";

const CommandPalette = ({ open, onOpen, onClose }) => {
    const { toggleTheme } = useTheme();
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(0);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);
    const previousFocusRef = useRef(null);

    const commands = useMemo(() => [
        { label: "Go to About", run: () => document.getElementById("about")?.scrollIntoView() },
        { label: "Go to Experience", run: () => document.getElementById("experience")?.scrollIntoView() },
        { label: "Go to Leadership", run: () => document.getElementById("leadership")?.scrollIntoView() },
        { label: "Go to Projects", run: () => document.getElementById("projects")?.scrollIntoView() },
        { label: "Go to Skills", run: () => document.getElementById("skills")?.scrollIntoView() },
        { label: "Toggle theme", run: () => toggleTheme() },
        {
            label: "Copy email",
            keepOpen: true,
            run: () => {
                navigator.clipboard?.writeText("kairugakuo2@gmail.com").then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                });
            }
        },
        { label: "Open GitHub", run: () => window.open("https://github.com/kairugakuo2", "_blank", "noreferrer") },
        { label: "Open LinkedIn", run: () => window.open("https://www.linkedin.com/in/gakuo/", "_blank", "noreferrer") },
    ], [toggleTheme]);

    const filtered = useMemo(
        () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
        [commands, query]
    );

    // global open/close shortcut
    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                if (open) { onClose(); } else { onOpen(); }
            } else if (e.key === "Escape" && open) {
                onClose();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onOpen, onClose]);

    // open/close side effects: focus, scroll lock, state reset
    useEffect(() => {
        if (open) {
            previousFocusRef.current = document.activeElement;
            document.body.style.overflow = "hidden";
            setQuery("");
            setSelected(0);
            inputRef.current?.focus();
        } else {
            document.body.style.overflow = "";
            if (previousFocusRef.current instanceof HTMLElement) {
                previousFocusRef.current.focus();
            }
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    const runCommand = (command) => {
        command.run();
        if (!command.keepOpen) onClose();
    };

    const onInputKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelected((s) => Math.min(s + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelected((s) => Math.max(s - 1, 0));
        } else if (e.key === "Enter" && filtered[selected]) {
            runCommand(filtered[selected]);
        }
    };

    return (
        <div className="palette-scrim" onClick={onClose}>
            <div
                className="palette"
                role="dialog"
                aria-label="Command palette"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="palette-input-row">
                    <span className="palette-prompt">&gt;</span>
                    <input
                        ref={inputRef}
                        className="palette-input"
                        type="text"
                        value={query}
                        placeholder="type a command..."
                        onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                        onKeyDown={onInputKeyDown}
                    />
                </div>
                <ul className="palette-list">
                    {filtered.length === 0 && (
                        <li className="palette-empty">no matching commands</li>
                    )}
                    {filtered.map((command, i) => (
                        <li key={command.label}>
                            <button
                                type="button"
                                className={`palette-item${i === selected ? " palette-item-selected" : ""}`}
                                onMouseEnter={() => setSelected(i)}
                                onClick={() => runCommand(command)}
                            >
                                {command.label === "Copy email" && copied ? "copied ✓" : command.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommandPalette;
```

- [ ] **Step 2: Lift palette state into `src/App.jsx`**

Replace the full contents with:

```jsx
import React, { useEffect, useState } from "react";
import './styles/App.css'
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import FadeInSection from './components/FadeInSection';
import CommandPalette from './components/CommandPalette';
import Intro from "./sections/Intro";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Leadership from "./sections/Leadership";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Footer from './components/Footer';



const App = () => {
    const [paletteOpen, setPaletteOpen] = useState(false);

    useEffect(() => {
        //reset the scroll position on load
        setTimeout(() => {
            window.scrollTo(0, 0);

        }, 0);
    }, []);
    return (
        <ThemeProvider>
            <div className="App" >
                <NavBar onOpenPalette={() => setPaletteOpen(true)} />
                <CommandPalette
                    open={paletteOpen}
                    onOpen={() => setPaletteOpen(true)}
                    onClose={() => setPaletteOpen(false)}
                />

                <div className="content">
                    <FadeInSection>
                        <Intro />
                    </FadeInSection>
                    <FadeInSection>
                        <About />
                    </FadeInSection>
                    <FadeInSection>
                        <Experience />
                    </FadeInSection>
                    <FadeInSection>
                        <Leadership />
                    </FadeInSection>
                    <FadeInSection>
                        <Projects />
                    </FadeInSection>
                    <FadeInSection>
                        <Skills />
                    </FadeInSection>
                </div>

                <Footer />

            </div>
        </ThemeProvider>
    );
};
export default App
```

- [ ] **Step 3: Add the ⌘K hint chip to `src/components/NavBar.jsx`**

Change the component signature and add the chip in `#rightNav` directly before `<ThemeToggle />`:

```jsx
const NavBar = ({ onOpenPalette }) => {
```

```jsx
                        <button
                            type="button"
                            className="cmdk-hint"
                            onClick={onOpenPalette}
                            aria-label="Open command palette"
                        >
                            ⌘K
                        </button>
                        <ThemeToggle />
```

- [ ] **Step 4: Add palette + chip styles to `src/styles/App.css`**

Append BEFORE the `/* ========== REDUCED MOTION ========== */` block:

```css
 /* ========== COMMAND PALETTE ========== */
.palette-scrim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 18vh;
}

.palette {
  width: min(90vw, 560px);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
}

.palette-input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.palette-prompt {
  font-family: var(--font-mono);
  color: var(--color-accent);
  font-weight: 600;
}

.palette-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.95rem;
}

.palette-input::placeholder {
  color: var(--color-text-muted);
}

.palette-list {
  list-style: none;
  margin: 0;
  padding: 0.4rem 0;
  max-height: 320px;
  overflow-y: auto;
}

.palette-item {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  border-left: 2px solid transparent;
  border-radius: 0;
  padding: 0.55rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-text);
  cursor: pointer;
}

.palette-item-selected {
  border-left-color: var(--color-accent);
  background: var(--color-bg);
}

.palette-empty {
  padding: 0.55rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.cmdk-hint {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
  margin-left: 10px;
  transition: border-color 150ms ease, color 150ms ease;
}

.cmdk-hint:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}
```

Then INSIDE the existing `@media (max-width: 768px)` block (before its closing `}`), add:

```css
   /* Command palette hint hidden on mobile */
   .cmdk-hint {
     display: none;
   }
```

- [ ] **Step 5: Verify in the browser**

Run: `npm run dev`

Expected: ⌘K (or Ctrl+K) opens a centered palette with a `>` prompt; typing filters commands; ↑/↓ move the accent-left-border selection; Enter on "Go to Projects" closes and smooth-scrolls; "Toggle theme" flips theme; "Copy email" shows `copied ✓` briefly and stays open, clipboard contains kairugakuo2@gmail.com; Escape and click-outside close it and focus returns to the previously focused element; body doesn't scroll while open. The `⌘K` chip in the navbar opens it on click and disappears below 768px. `npm run build` clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/CommandPalette.jsx src/App.jsx src/components/NavBar.jsx src/styles/App.css
git commit -m "Add command palette with keyboard navigation and navbar hint"
```

---

### Task 6: CRT theme flicker + console easter egg

**Files:**
- Modify: `src/components/ThemeToggle.jsx` (flicker overlay)
- Modify: `src/styles/App.css` (flicker tokens + animation, reduced-motion addition)
- Modify: `src/App.jsx` (console easter egg effect)

**Interfaces:**
- Consumes: `useTheme()`; `/* ========== REDUCED MOTION ========== */` block from Task 2.
- Produces: new tokens `--crt-line` (both themes). Nothing else consumed later.

- [ ] **Step 1: Add the flicker overlay to `src/components/ThemeToggle.jsx`**

Replace the full contents with:

```jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const [flickering, setFlickering] = useState(false);

    const handleClick = () => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduceMotion) {
            setFlickering(true);
        }
        toggleTheme();
    };

    return (
        <>
            <button
                type="button"
                className="theme-toggle"
                onClick={handleClick}
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
                <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </button>
            {flickering && (
                <div
                    className="crt-flicker"
                    aria-hidden="true"
                    onAnimationEnd={() => setFlickering(false)}
                />
            )}
        </>
    );
};

export default ThemeToggle;
```

- [ ] **Step 2: Add flicker tokens and styles to `src/styles/App.css`**

In the `:root { ... }` block, add:

```css
  --crt-line: rgba(0, 0, 0, 0.12);
```

In the `[data-theme="dark"] { ... }` block, add:

```css
  --crt-line: rgba(255, 255, 255, 0.08);
```

Append BEFORE the `/* ========== REDUCED MOTION ========== */` block:

```css
 /* ========== CRT FLICKER ========== */
@keyframes crt-flicker {
  0% { opacity: 0.9; }
  30% { opacity: 0.3; }
  60% { opacity: 0.7; }
  100% { opacity: 0; }
}

.crt-flicker {
  position: fixed;
  inset: 0;
  z-index: 3000;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    var(--crt-line),
    var(--crt-line) 2px,
    transparent 2px,
    transparent 5px
  );
  animation: crt-flicker 150ms ease-out forwards;
}
```

Then INSIDE the `/* ========== REDUCED MOTION ========== */` media query block (before its closing `}`), add:

```css
  .crt-flicker {
    display: none;
  }
```

- [ ] **Step 3: Add the console easter egg to `src/App.jsx`**

Add a second `useEffect` after the scroll-reset one:

```jsx
    useEffect(() => {
        /* eslint-disable no-console */
        console.log(
            "%c" +
            " ██████   █████  ██   ██ ██    ██  ██████  \n" +
            "██       ██   ██ ██  ██  ██    ██ ██    ██ \n" +
            "██   ███ ███████ █████   ██    ██ ██    ██ \n" +
            "██    ██ ██   ██ ██  ██  ██    ██ ██    ██ \n" +
            " ██████  ██   ██ ██   ██  ██████   ██████  ",
            "font-family: monospace; color: #2563EB;"
        );
        console.log(
            "%clike what you see? let's talk → kairugakuo2@gmail.com\n" +
            "https://github.com/kairugakuo2",
            "font-family: monospace; font-size: 12px;"
        );
        /* eslint-enable no-console */
    }, []);
```

(The `#2563EB` literal is acceptable here: console output can't read CSS custom properties, and it matches `--color-accent`'s light value.)

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`

Expected: clicking the theme toggle shows a quick 150ms scanline flicker as colors swap; with reduced-motion emulated, theme swaps instantly with no overlay. DevTools console shows the ASCII GAKUO banner in accent blue plus the contact lines, exactly once per load. `npm run build` clean. `npm run lint` introduces no new errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ThemeToggle.jsx src/styles/App.css src/App.jsx
git commit -m "Add CRT flicker on theme toggle and console easter egg"
```

---

## Self-Review Notes

- **Spec coverage:** §1 typography → Task 1; §2 motion baseline → Task 2; §3 caret → Task 3; §4 git-log → Task 3; §5 status bar → Task 4; §6 palette → Task 5; §7 CRT flicker → Task 6; §8 console egg → Task 6. All spec sections covered.
- **Placeholder scan:** no TBD/TODO; all steps carry complete code.
- **Name consistency:** `--stagger-index` (Tasks 2); `.commit-hash`/`.head-ref` (Task 3 only); `CommandPalette` props `{ open, onOpen, onClose }` defined in Task 5 Step 1 and consumed with the same names in Step 2; `NavBar` prop `onOpenPalette` consistent between Steps 2 and 3; `--crt-line` defined and consumed only in Task 6; reduced-motion block created in Task 2 and appended into by Tasks 3, 5 (mobile block, separate), and 6 with exact location notes.
