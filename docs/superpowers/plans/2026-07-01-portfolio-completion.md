# Portfolio Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the 3-year-stale React portfolio up to date with resume content (2 new Experience entries, new Leadership/Projects/Skills sections, built-out Footer) and add a real light/dark theme system with a clean, non-generic-AI-looking visual style.

**Architecture:** Pure client-side React (Vite, no backend, no test runner). Theme state lives in a React Context backed by `localStorage` + `prefers-color-scheme`, applied via a `data-theme` attribute on `<html>` that CSS custom properties key off of. Content sections follow the existing `Experience.jsx` pattern: a hardcoded array mapped to cards inside a section component.

**Tech Stack:** React 19, Vite, plain CSS (custom properties, no CSS framework), FontAwesome (already a dependency) for icons, Google Fonts (IBM Plex Sans + JetBrains Mono) loaded via `<link>` in `index.html`.

## Global Constraints

- No new npm dependencies — FontAwesome free-solid/free-brands icon sets already include `faSun`, `faMoon`, `faGithub`, `faLinkedin`, `faEnvelope`.
- No test runner exists in this project. "Testable deliverable" for each task means: run `npm run dev`, visually verify in the browser, verify no console errors.
- Content facts (experience bullets, project bullets, skills) must match the resume text verbatim in meaning — no invented claims. Source: `docs/superpowers/specs/2026-07-01-portfolio-completion-design.md`.
- Keep all 4 existing `Experience.jsx` entries unchanged (user will prune later) — only append, never remove.
- Style must avoid gradients, glow, glassmorphism, and heavy drop shadows — flat colors + 1px borders + a single accent color, per the approved design spec.
- Monospace font (`JetBrains Mono`) is an accent used only for section slash-headers, tags, and dates — never for body paragraphs.

---

## File Structure

**New files:**
- `src/context/ThemeContext.jsx` — theme state, localStorage persistence, system-preference fallback
- `src/components/ThemeToggle.jsx` — sun/moon icon button, consumes `ThemeContext`
- `src/sections/Leadership.jsx` — GDG entry, mirrors `Experience.jsx` structure
- `src/sections/Projects.jsx` — rewrite of the currently-empty file; 3 project cards
- `src/sections/Skills.jsx` — 3 grouped skill-tag lists

**Modified files:**
- `index.html` — Google Fonts `<link>` tags, pre-paint inline theme script, fix `maximum-scale=1` (blocks pinch-zoom, an accessibility anti-pattern) in the viewport meta tag
- `src/styles/App.css` — CSS custom properties (light + dark), font-family rules, flat restyle of existing nav/experience/skill-tag rules, new rules for leadership/projects/skills/footer/theme-toggle, mobile breakpoint additions
- `src/context/` — new directory (doesn't exist yet)
- `src/sections/Experience.jsx` — append 2 entries to the `experiences` array
- `src/components/NavBar.jsx` — add Leadership/Skills anchor links, mount `ThemeToggle`
- `src/components/Footer.jsx` — build out (currently a 1-line/empty file)
- `src/App.jsx` — wrap tree in `ThemeProvider`, render `Leadership`/`Projects`/`Skills`/`Footer` in order

---

### Task 1: Theme foundation — fonts + CSS custom properties

**Files:**
- Modify: `index.html`
- Modify: `src/styles/App.css:1-16` (global reset section)

**Interfaces:**
- Produces: CSS custom properties `--color-bg`, `--color-bg-elevated`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-text`, `--font-body`, `--font-mono`, toggled by `[data-theme="dark"]` on `<html>`. All later tasks style with `var(--color-*)` / `var(--font-*)`, never raw hex or font names.

- [ ] **Step 1: Add Google Fonts and fix viewport meta in `index.html`**

Replace the full contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <title>Gakuo Kairu</title>
    <script>
      (function () {
        try {
          var stored = localStorage.getItem("theme");
          var theme = stored === "light" || stored === "dark"
            ? stored
            : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
          document.documentElement.setAttribute("data-theme", theme);
        } catch (e) {
          document.documentElement.setAttribute("data-theme", "light");
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Add CSS custom properties and base typography to `src/styles/App.css`**

Replace lines 1-16 (the `GLOBAL RESET` block) with:

```css
 /* ========== THEME VARIABLES ========== */
:root {
  --color-bg: #FAFAFA;
  --color-bg-elevated: #FFFFFF;
  --color-text: #111827;
  --color-text-muted: #4B5563;
  --color-border: #E5E7EB;
  --color-accent: #2563EB;
  --color-accent-text: #FFFFFF;
  --font-body: "IBM Plex Sans", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

[data-theme="dark"] {
  --color-bg: #0F172A;
  --color-bg-elevated: #1E293B;
  --color-text: #F8FAFC;
  --color-text-muted: #94A3B8;
  --color-border: #334155;
  --color-accent: #60A5FA;
  --color-accent-text: #0F172A;
}

 /* ========== GLOBAL RESET ========== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-text);
  transition: background-color 200ms ease, color 200ms ease;
}
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`

Expected: page loads with no console errors. Open browser devtools, select the `<html>` element, confirm it has `data-theme="light"` (or `"dark"` if your OS is in dark mode). In the Elements/Styles panel, confirm `body` shows `font-family: "IBM Plex Sans", sans-serif` and the computed background color is `#FAFAFA` (or `#0F172A` in dark).

Manually test the variable swap before the toggle UI exists: in devtools, edit the `<html>` tag to add/change `data-theme="dark"`, confirm the page background and text color flip. Set it back.

- [ ] **Step 4: Commit**

```bash
git add index.html src/styles/App.css
git commit -m "Add theme CSS variables and Google Fonts (IBM Plex Sans + JetBrains Mono)"
```

---

### Task 2: Theme context, toggle button, and NavBar wiring

**Files:**
- Create: `src/context/ThemeContext.jsx`
- Create: `src/components/ThemeToggle.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/NavBar.jsx`
- Modify: `src/styles/App.css` (append `.theme-toggle` rule)

**Interfaces:**
- Consumes: `--color-*` variables from Task 1.
- Produces: `ThemeProvider` component (wraps children, exported from `src/context/ThemeContext.jsx`), `useTheme()` hook returning `{ theme, toggleTheme }` where `theme` is `"light" | "dark"` and `toggleTheme` is a zero-arg function. `ThemeToggle` default-exported component that later tasks don't depend on directly (only `NavBar` mounts it).

- [ ] **Step 1: Create `src/context/ThemeContext.jsx`**

```jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function getInitialTheme() {
    try {
        const stored = window.localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
    } catch {
        // localStorage unavailable (e.g. private browsing) - fall through
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            window.localStorage.setItem("theme", theme);
        } catch {
            // localStorage unavailable - theme still applies for this session
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
```

- [ ] **Step 2: Create `src/components/ThemeToggle.jsx`**

```jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
        </button>
    );
};

export default ThemeToggle;
```

- [ ] **Step 3: Wrap `src/App.jsx` in `ThemeProvider`**

Replace the full contents of `src/App.jsx` with:

```jsx
import React, { useEffect } from "react";
import './styles/App.css'
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import FadeInSection from './components/FadeInSection';
import Intro from "./sections/Intro";
import About from "./sections/About";
import Experience from "./sections/Experience";



const App = () => {
    useEffect(() => {
        //reset the scroll position on load
        setTimeout(() => {
            window.scrollTo(0, 0);

        }, 0);
    }, []);
    return (
        <ThemeProvider>
            <div className="App" >
                <NavBar/>

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
                </div>


            </div>
        </ThemeProvider>
    );
};
export default App
```

(Leadership/Projects/Skills/Footer are added to this tree in later tasks — this step only adds the `ThemeProvider` wrapper.)

- [ ] **Step 4: Mount `ThemeToggle` in `src/components/NavBar.jsx`**

Replace the full contents of `src/components/NavBar.jsx` with:

```jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import ThemeToggle from "./ThemeToggle";
import "../styles/App.css";

const NavBar = () => {

    return (
        <nav className="navbar">
            <div className="navContainer">
                {/* Brand / Name */}
                <a href="#" className="navbar-brand">Gakuo Kairu</a>

                {/* Full nav links – always visible on desktop, dropdown on mobile */}
                <div className={"navLinks"}>
                    <div id="leftNav">
                        <a href="#about">About</a>
                        <a href="#experience">Experience</a>
                        <a href="#projects">Projects</a>
                    </div>
                    <div id="rightNav">
                        <a target="_blank" href="mailto:kairugakuo2@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} className="socialIcon" />
                        </a>
                        <a target="_blank" href="https://github.com/kairugakuo2">
                            <FontAwesomeIcon icon={faGithub} className="socialIcon"/>
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/gakuo/">
                            <FontAwesomeIcon icon={faLinkedin} className="socialIcon"/>
                        </a>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
```

(Leadership/Skills nav links are added in later tasks once those sections exist — this step only adds the toggle.)

- [ ] **Step 5: Append `.theme-toggle` style to `src/styles/App.css`**

Add to the end of the file:

```css
 /* ========== THEME TOGGLE ========== */
.theme-toggle {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  transition: border-color 150ms ease;
}

.theme-toggle:hover {
  border-color: var(--color-accent);
}
```

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev`

Expected: a sun/moon icon button appears in the navbar. Click it — the whole page background/text/border colors should flip between light and dark instantly. Reload the page — the theme you left it on should persist (check `localStorage` in devtools Application tab, key `theme`).

- [ ] **Step 7: Commit**

```bash
git add src/context/ThemeContext.jsx src/components/ThemeToggle.jsx src/App.jsx src/components/NavBar.jsx src/styles/App.css
git commit -m "Add dark/light theme toggle with localStorage persistence"
```

---

### Task 3: Update Experience with resume-current entries

**Files:**
- Modify: `src/sections/Experience.jsx:4-33`

**Interfaces:**
- Consumes: nothing new — `experiences` array shape is unchanged (`{ company, title, duration, description, skills }`).
- Produces: nothing new consumed by later tasks.

- [ ] **Step 1: Append 2 new entries to the `experiences` array**

In `src/sections/Experience.jsx`, replace the `experiences` array (lines 4-33) with:

```jsx
const experiences = [
    {
        company: "Argo Data",
        title: "Software Engineer Intern",
        duration: "JUN 2026 - PRESENT",
        description: "Building a secure signing key bootstrap and rotation system in C#/.NET for GLBA/HIPAA-regulated banking infrastructure. Implementing DPAPI-encrypted local key cache, Registrar API client, and automated rotation logic with resilient failure recovery. Writing MSTest coverage for bootstrap, cache, DPAPI round-trip, rotation, and Registrar error scenarios.",
        skills: ["C#", ".NET", "MSTest", "Security", "Banking Infrastructure"]
    },
    {
        company: "William Kerber Software Studio",
        title: "Founder (Selected Team)",
        duration: "FEB 2026 - PRESENT",
        description: "Selected as part of a 4 person team to develop a professional esports media aggregation platform. Led UI/UX design through Figma prototypes used in investor pitch and MVP planning.",
        skills: ["UI/UX Design", "Figma", "Product Strategy", "Team Leadership"]
    },
    {
        company: "University of Oklahoma",
        title: "Student Programmer",
        duration: "FEB 2025 - PRESENT",
        description: "Maintain and update department web/apps, manage databases, and generate reports. Provide tech support for students, faculty, and staff, including language tests and video streaming. Work with the team on troubleshooting and larger tech projects.",
        skills: ["Web Development", "Database Management", "Tech Support", "Team Collaboration"]
    },
    {
        company: "Delta Tau Delta Fraternity",
        title: "Philanthropy Committee Member",
        duration: "JAN 2025 - PRESENT",
        description: "Managed the GivePulse app to track fraternity volunteer hours. Onboarded members, imported data, and maintained records. Coordinated with GivePulse reps and helped set up volunteer opportunities.",
        skills: ["App Management", "Data Management", "Volunteer Coordination", "Team Leadership"]
    },
    {
        company: "Velocity Detailing",
        title: "Owner",
        duration: "MAY 2024 - PRESENT",
        description: "Launched and scaled a mobile detailing business, completing 30+ projects in 3 months with 98% customer satisfaction. Acquired customers via free marketing platforms (Google, Yelp, TikTok, Instagram, Facebook). Designed and developed the website using CRM software, with additional customization in HTML and CSS.",
        skills: ["Business Development", "Digital Marketing", "Web Design", "Customer Service", "Project Management"]
    },
    {
        company: "Arcis Golf",
        title: "Outside Service Attendant",
        duration: "SEP 2022 - AUG 2024",
        description: "Greet and assist golfers for a great experience. Keep carts in top shape and equipment organized. Help with events and smooth daily operations.",
        skills: ["Customer Service", "Equipment Maintenance", "Event Coordination", "Operations Management"]
    }
];
```

- [ ] **Step 2: Restyle the experience card rules to use theme variables (flat style)**

In `src/styles/App.css`, find the `EXPERIENCE SECTION` block (originally lines 153-266) and replace it entirely with:

```css
 /* ========== EXPERIENCE SECTION ========== */
.experience {
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
}

.experience h1 {
  font-family: var(--font-mono);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--color-text);
  font-weight: 500;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.experience-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  transition: transform 150ms ease, border-color 150ms ease;
}

.experience-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.company-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  flex: 1;
  min-width: 200px;
}

.duration {
  background: var(--color-bg);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  font-weight: 500;
  white-space: nowrap;
}

.job-title {
  font-size: 1.1rem;
  color: var(--color-accent);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.job-description {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  font-weight: 500;
  transition: border-color 150ms ease;
}

.skill-tag:hover {
  border-color: var(--color-accent);
}
```

This removes the old gradient `::before` bar and gradient skill-tag background per the approved flat, non-generic-AI-looking style — replaced with a 1px border + 2px hover lift.

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`

Expected: Experience section shows 6 cards in this order: Argo Data, William Kerber Software Studio, University of Oklahoma, Delta Tau Delta Fraternity, Velocity Detailing, Arcis Golf. Cards are flat (no gradient left-bar, no colored gradient tags) with a 1px border that turns accent-blue on hover. Toggle dark mode — cards should still be readable with dark surface color.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Experience.jsx src/styles/App.css
git commit -m "Sync Experience section with current resume, restyle cards flat"
```

---

### Task 4: Leadership section

**Files:**
- Create: `src/sections/Leadership.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/NavBar.jsx`
- Modify: `src/styles/App.css` (append leadership styles)

**Interfaces:**
- Consumes: `.duration`, `.skill-tag`-style card conventions and `--color-*`/`--font-*` variables from Tasks 1-3.
- Produces: `Leadership` default export, rendered between `Experience` and `Projects` in `App.jsx`. No other task consumes this directly.

- [ ] **Step 1: Create `src/sections/Leadership.jsx`**

```jsx
import React from 'react';
import "../styles/App.css";

const leadership = [
    {
        organization: "Google Developer Group (GDG) - University of Oklahoma",
        title: "Connections Coordinator",
        duration: "SEP 2025 - PRESENT",
        description: "Collaborating with team to plan and coordinate upcoming tech workshops and networking events for students. Leading outreach and partnership efforts to grow cross-organization engagement on campus."
    }
];

export default function Leadership() {
    return (
        <div id="leadership" className="leadership">
            <h1>/ leadership</h1>
            <div className="leadership-grid">
                {leadership.map((role, index) => (
                    <div key={index} className="leadership-card">
                        <div className="leadership-header">
                            <h3 className="org-name">{role.organization}</h3>
                            <span className="duration">{role.duration}</span>
                        </div>
                        <h4 className="role-title">{role.title}</h4>
                        <p className="role-description">{role.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Add Leadership styles to `src/styles/App.css`**

Append:

```css
 /* ========== LEADERSHIP SECTION ========== */
.leadership {
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
}

.leadership h1 {
  font-family: var(--font-mono);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--color-text);
  font-weight: 500;
}

.leadership-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.leadership-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  transition: transform 150ms ease, border-color 150ms ease;
}

.leadership-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
}

.leadership-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.org-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  flex: 1;
  min-width: 200px;
}

.role-title {
  font-size: 1.1rem;
  color: var(--color-accent);
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.role-description {
  color: var(--color-text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}
```

- [ ] **Step 3: Render `Leadership` in `src/App.jsx` after `Experience`**

In `src/App.jsx`, add the import:

```jsx
import Leadership from "./sections/Leadership";
```

And add a `FadeInSection` after the `Experience` one:

```jsx
                    <FadeInSection>
                        <Experience />
                    </FadeInSection>
                    <FadeInSection>
                        <Leadership />
                    </FadeInSection>
```

- [ ] **Step 4: Add a Leadership nav link in `src/components/NavBar.jsx`**

In the `#leftNav` div, add a link after Experience:

```jsx
                    <div id="leftNav">
                        <a href="#about">About</a>
                        <a href="#experience">Experience</a>
                        <a href="#leadership">Leadership</a>
                        <a href="#projects">Projects</a>
                    </div>
```

- [ ] **Step 5: Verify in the browser**

Run: `npm run dev`

Expected: a `/ leadership` section appears after Experience showing the GDG card. Clicking "Leadership" in the navbar scrolls to it. Card hover lifts 2px and border turns accent blue, matching the Experience card behavior. Confirm in both light and dark theme.

- [ ] **Step 6: Commit**

```bash
git add src/sections/Leadership.jsx src/App.jsx src/components/NavBar.jsx src/styles/App.css
git commit -m "Add Leadership section (GDG Connections Coordinator)"
```

---

### Task 5: Projects section

**Files:**
- Modify: `src/sections/Projects.jsx` (currently empty)
- Modify: `src/App.jsx`
- Modify: `src/styles/App.css` (append project styles)

**Interfaces:**
- Consumes: `--color-*`/`--font-*` variables, `.skill-tag` class from Tasks 1-3.
- Produces: `Projects` default export, rendered after `Leadership` in `App.jsx`.

- [ ] **Step 1: Write `src/sections/Projects.jsx`**

```jsx
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../styles/App.css";

const projects = [
    {
        name: "StudySync",
        duration: "AUG 2025 - DEC 2025",
        description: "Collaborative study platform combining real-time collaboration tools with a dashboard-based workflow for exam prep.",
        highlights: [
            "Acted as technical lead for a 5-person team, coordinating sprints, task ownership, and delivery",
            "Built the frontend architecture, including authentication flow and dashboard-based feature layout",
            "Established modular file structure enabling parallel development with minimal conflicts",
            "Delivered end-to-end (demo, documentation, submission), earning a perfect grade"
        ],
        tech: ["React", "JavaScript", "Git", "Vercel"],
        github: "https://github.com/kairugakuo2/StudySync"
    },
    {
        name: "URL Shortener API",
        duration: "SEP 2025 - PRESENT",
        description: "REST API for creating short links, tracking redirects, and recording clicks.",
        highlights: [
            "Implemented robust input validation and centralized error handling with ProblemDetails responses (400, 404, 500)",
            "Tested endpoints with Swagger/OpenAPI; added health checks and seeding routines for reliability",
            "Implemented xUnit tests, Docker containerization, and GitHub Actions CI for automated build/test pipelines"
        ],
        tech: ["C#", "ASP.NET Core", "SQLite", "EF Core"],
        github: "https://github.com/kairugakuo2/url-shortener-minimal"
    },
    {
        name: "Sooner Planner",
        duration: "JUNE 2025 - PRESENT",
        description: "Class scheduler generating 1,000+ possible combinations from OU course data and user filters.",
        highlights: [
            "Crafted a responsive UI with React and Tailwind, supporting mobile and desktop views",
            "Engineered state logic to handle dynamic schedule rendering and real-time updates"
        ],
        tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
        github: "https://github.com/kairugakuo2/sooner-planner"
    }
];

export default function Projects() {
    return (
        <div id="projects" className="projects">
            <h1>/ projects</h1>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-header">
                            <h3 className="project-name">{project.name}</h3>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`View ${project.name} on GitHub`}
                                className="project-github-link"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </div>
                        <span className="duration">{project.duration}</span>
                        <p className="project-description">{project.description}</p>
                        <ul className="project-highlights">
                            {project.highlights.map((highlight, i) => (
                                <li key={i}>{highlight}</li>
                            ))}
                        </ul>
                        <div className="skills-container">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="skill-tag">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Add project styles to `src/styles/App.css`**

Append:

```css
 /* ========== PROJECTS SECTION ========== */
.projects {
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
}

.projects h1 {
  font-family: var(--font-mono);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--color-text);
  font-weight: 500;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  transition: transform 150ms ease, border-color 150ms ease;
}

.project-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.project-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.project-github-link {
  color: var(--color-text-muted);
  font-size: 1.2rem;
  transition: color 150ms ease;
}

.project-github-link:hover {
  color: var(--color-accent);
}

.project-description {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 0.95rem;
}

.project-highlights {
  color: var(--color-text-muted);
  line-height: 1.6;
  font-size: 0.9rem;
  margin: 0 0 1.5rem 1.25rem;
}

.project-highlights li {
  margin-bottom: 0.4rem;
}
```

- [ ] **Step 3: Render `Projects` in `src/App.jsx` after `Leadership`**

Add the import:

```jsx
import Projects from "./sections/Projects";
```

Add a `FadeInSection` after the `Leadership` one:

```jsx
                    <FadeInSection>
                        <Leadership />
                    </FadeInSection>
                    <FadeInSection>
                        <Projects />
                    </FadeInSection>
```

(No NavBar change needed — the `#projects` link already exists from the original scaffold.)

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`

Expected: a `/ projects` section shows 3 cards (StudySync, URL Shortener API, Sooner Planner) each with a GitHub icon link (opens the correct repo in a new tab — verify each URL), duration badge, description, bullet highlights, and tech tags. Clicking "Projects" in the navbar scrolls here. Verify in both themes.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Projects.jsx src/App.jsx src/styles/App.css
git commit -m "Add Projects section (StudySync, URL Shortener API, Sooner Planner)"
```

---

### Task 6: Skills section

**Files:**
- Create: `src/sections/Skills.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/NavBar.jsx`
- Modify: `src/styles/App.css` (append skills styles)

**Interfaces:**
- Consumes: `.skill-tag`, `--color-*`/`--font-*` from Tasks 1-3.
- Produces: `Skills` default export, rendered after `Projects` in `App.jsx`.

- [ ] **Step 1: Create `src/sections/Skills.jsx`**

```jsx
import React from 'react';
import "../styles/App.css";

const skillGroups = [
    {
        category: "Languages",
        items: ["Python", "C++", "Java", "JavaScript/TypeScript", "C#", "SQL"]
    },
    {
        category: "Frameworks",
        items: ["React", "Next.js", "Node.js", "ASP.NET Core", "Entity Framework Core", "Swagger/OpenAPI", "Vite"]
    },
    {
        category: "Tools",
        items: ["Git/GitHub", "Visual Studio", "Docker", "xUnit/Jest", "MSTest", "Chrome DevTools", "CLI", "Vercel", "Agile Workflow"]
    }
];

export default function Skills() {
    return (
        <div id="skills" className="skills">
            <h1>/ skills</h1>
            <div className="skills-groups">
                {skillGroups.map((group) => (
                    <div key={group.category} className="skills-group">
                        <h4 className="skills-group-title">{group.category}</h4>
                        <div className="skills-container">
                            {group.items.map((item) => (
                                <span key={item} className="skill-tag">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Add skills styles to `src/styles/App.css`**

Append:

```css
 /* ========== SKILLS SECTION ========== */
.skills {
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
}

.skills h1 {
  font-family: var(--font-mono);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--color-text);
  font-weight: 500;
}

.skills-groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skills-group-title {
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
```

- [ ] **Step 3: Render `Skills` in `src/App.jsx` after `Projects`**

Add the import:

```jsx
import Skills from "./sections/Skills";
```

Add a `FadeInSection` after the `Projects` one:

```jsx
                    <FadeInSection>
                        <Projects />
                    </FadeInSection>
                    <FadeInSection>
                        <Skills />
                    </FadeInSection>
```

- [ ] **Step 4: Add a Skills nav link in `src/components/NavBar.jsx`**

In `#leftNav`, add a link after Projects:

```jsx
                    <div id="leftNav">
                        <a href="#about">About</a>
                        <a href="#experience">Experience</a>
                        <a href="#leadership">Leadership</a>
                        <a href="#projects">Projects</a>
                        <a href="#skills">Skills</a>
                    </div>
```

- [ ] **Step 5: Verify in the browser**

Run: `npm run dev`

Expected: a `/ skills` section shows 3 groups (Languages, Frameworks, Tools) each with a small uppercase mono label and a row of flat tag pills matching the Experience/Projects tag style. Clicking "Skills" in the navbar scrolls here. Verify in both themes.

- [ ] **Step 6: Commit**

```bash
git add src/sections/Skills.jsx src/App.jsx src/components/NavBar.jsx src/styles/App.css
git commit -m "Add Skills section (Languages, Frameworks, Tools)"
```

---

### Task 7: Footer

**Files:**
- Modify: `src/components/Footer.jsx` (currently empty)
- Modify: `src/App.jsx`
- Modify: `src/styles/App.css` (append footer styles)

**Interfaces:**
- Consumes: `--color-*`/`--font-*` from Task 1, `.socialIcon` class already defined in `App.css`.
- Produces: `Footer` default export, rendered at the bottom of `src/App.jsx` (outside `.content`, matching its original placement in the JSX before this rebuild).

- [ ] **Step 1: Write `src/components/Footer.jsx`**

```jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../styles/App.css";

const Footer = () => {
    const year = new Date().getFullYear();

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
            <span className="footer-copyright">&copy; {year} Gakuo Kairu. Built with React.</span>
        </footer>
    );
};

export default Footer;
```

- [ ] **Step 2: Add footer styles to `src/styles/App.css`**

Append:

```css
 /* ========== FOOTER ========== */
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 0 2rem 0;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.footer-name {
  font-family: var(--font-mono);
  color: var(--color-text);
  font-size: 1.1rem;
}

.footer-social {
  display: flex;
  gap: 1.5rem;
}

.footer-copyright {
  font-size: 0.85rem;
}
```

- [ ] **Step 3: Render `Footer` in `src/App.jsx`**

Add the import:

```jsx
import Footer from './components/Footer';
```

Render it after the closing `</div>` of `.content`, still inside `.App`:

```jsx
                    <FadeInSection>
                        <Skills />
                    </FadeInSection>
                </div>

                <Footer />

            </div>
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`

Expected: scrolling to the bottom of the page shows a footer with your name (mono font), 3 social icons (email/GitHub/LinkedIn — same targets as the navbar icons), and a copyright line with the current year. A 1px top border separates it from the Skills section above. Verify in both themes.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.jsx src/App.jsx src/styles/App.css
git commit -m "Build out Footer with social links and copyright"
```

---

### Task 8: Mobile responsiveness pass for new sections

**Files:**
- Modify: `src/styles/App.css` (extend the existing `@media (max-width: 768px)` block)

**Interfaces:**
- Consumes: all classes from Tasks 4-7 (`.leadership-grid`, `.leadership-card`, `.leadership-header`, `.org-name`, `.projects-grid`, `.project-card`, `.project-header`, `.footer`, `.footer-social`).
- Produces: nothing consumed by other tasks — this is the final task.

- [ ] **Step 1: Extend the mobile media query in `src/styles/App.css`**

Find the `@media (max-width: 768px) { ... }` block (originally the last block in the file, containing the `Experience responsiveness` rules) and add these rules directly before its closing `}`:

```css

   /* Leadership responsiveness */
   .leadership-grid {
     grid-template-columns: 1fr;
     gap: 1.5rem;
   }

   .leadership-card {
     padding: 1.5rem;
   }

   .leadership-header {
     flex-direction: column;
     align-items: flex-start;
     gap: 0.5rem;
   }

   .org-name {
     font-size: 1.2rem;
     min-width: auto;
   }

   /* Projects responsiveness */
   .projects-grid {
     grid-template-columns: 1fr;
     gap: 1.5rem;
   }

   .project-card {
     padding: 1.5rem;
   }

   .project-name {
     font-size: 1.2rem;
   }

   /* Footer responsiveness */
   .footer {
     padding: 2rem 1rem 1.5rem 1rem;
     text-align: center;
   }

   .footer-social {
     gap: 1rem;
   }
```

- [ ] **Step 2: Verify responsive behavior across breakpoints and both themes**

Run: `npm run dev`

Using browser devtools device toolbar, check the full page (Intro through Footer) at:
- 375px width (small phone) — Leadership/Projects cards should stack to 1 column, footer text should be centered and not overflow
- 768px width (tablet boundary) — confirm the mobile rules kick in exactly at this width
- 1024px width (small desktop) — cards should show in the multi-column grid
- 1440px width (large desktop) — layout should stay centered within the `.App` max-width container, not stretch edge-to-edge

At each width, toggle dark mode and confirm text stays readable (no low-contrast combinations) and no layout shifts when the theme changes.

- [ ] **Step 3: Commit**

```bash
git add src/styles/App.css
git commit -m "Add mobile responsiveness for Leadership, Projects, and Footer"
```

---

## Self-Review Notes

- **Spec coverage:** Experience sync (Task 3), Leadership (Task 4), Projects (Task 5), Skills (Task 6), Footer (Task 7), theme system (Tasks 1-2), flat/Swiss-modernist restyle replacing gradients/shadows (Tasks 1, 3), responsive pass (Task 8) — all spec sections have a corresponding task.
- **Placeholder scan:** no TBD/TODO markers; every step has complete, runnable code.
- **Type/name consistency:** `useTheme()` returns `{ theme, toggleTheme }` in Task 2 Step 1 and is consumed with that exact shape in Task 2 Step 2 (`ThemeToggle.jsx`). CSS variable names (`--color-bg`, `--color-bg-elevated`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-text`, `--font-body`, `--font-mono`) introduced in Task 1 are the only variables referenced in Tasks 2-8 — no renamed or invented variables.
