# Portfolio Rebuild — Repositioning Around Distributed Services & API Security

**Date:** 2026-07-26
**Status:** Implemented on branch `rebuild/astro-repositioning`

## Problem

The portfolio read as a web-development student site. The hero said "aspiring
software engineer with a passion for Web Development"; the About section listed
introductory coursework technologies.

Meanwhile the strongest material — an Argo Data internship building a zero-trust
identity subsystem (DPAPI-encrypted key caches, automated zero-downtime key
rotation with dual-key grace periods, graceful degradation during registrar
outages, GLBA/HIPAA hygiene) — sat in an experience card partway down a
single-page scroll.

The user's diagnosis of "too empty" was refined during brainstorming to: **not
enough substance**. Six sections all stated *what* was done; nothing showed *how
the author thinks*. The fix is depth, not surface area.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Core problem | Substance, not visual density | Sections were claim lists with no supporting evidence |
| Argo content | Problem-class writeups only | Active internship, regulated employer — publishing internal architecture is a real risk |
| AI angle | Securing LLM-backed APIs | Only honest intersection; a generic "AI interests" block would reintroduce padding |
| Stack | Astro + React islands | Content-first site; MDX authoring, static output, and existing interactive components port as islands |
| Structure | Multi-route, `/writing` as the centerpiece | Deep case studies don't fit a single scroll |
| Experience | Technical roles only | Arcis Golf and fraternity philanthropy diluted signal; Velocity Detailing relocated |

## Architecture

Routes: `/`, `/writing`, `/writing/[slug]`, `/projects`, `/about`.

- Content collection at `src/content/writing/` with a typed schema.
- Structured data extracted from JSX into `src/data/*.ts`.
- Three React islands (`CommandPalette`, `ThemeToggle`, `ScrollProgress`),
  hydrated `client:idle`. Everything else is static HTML.
- Theme state lives in `src/lib/theme.js` rather than React context — each
  island is a separate React root, so a provider cannot span them.
- Diagrams are ASCII in `<div class="diagram">`: no build-time renderer, text in
  version control, consistent with the terminal aesthetic.

## The honesty layer

Each essay declares a `provenance` value rendered as a visible badge:

- `production` — written from code the author wrote and links to.
- `domain` — explains the problem class from public knowledge; carries an
  explicit disclaimer that it describes no employer's implementation.
- `position` — a researched argument, not shipped experience.

This exists for three reasons: it keeps claims defensible in an interview, it
makes the NDA boundary explicit rather than implied, and self-labelling evidence
tiers reads as care rather than as hedging.

## Content

1. **Key Bootstrapping and Rotation in Zero-Trust Systems** (`domain`) — the
   flagship. Bootstrap problem and trust anchors, why rotation is a fade rather
   than a swap, dual-key grace periods, registrar-outage degradation, testing
   failure paths.
2. **Designing an API That Fails Correctly** (`production`) — grounded in the
   URL Shortener. Validation as a security boundary, ProblemDetails, status-code
   semantics, health checks, what the tests are actually for.
3. **Securing an LLM-Backed API** (`position`) — prompt injection as untrusted
   input reaching a privileged interpreter; tool-call authz, cost abuse as DoS,
   output handling, indirect injection.
4. **Secrets at Rest on a Single Host** (`domain`) — DPAPI scopes and secondary
   entropy, what OS-level protection does and doesn't defend against, why
   `SecureString` is weaker than its name.

## Preserved

Terminal/git identity: `git log --experience` framing, commit-hash date ranges,
blinking caret on section headers, command palette (now with essay search),
CRT flicker on theme toggle, scroll progress, VS Code-style status bar.

## Deliberately not done

- SSR/server rendering — the site is static; there is nothing to render per request.
- Mermaid — installed then removed in favor of ASCII; a headless-browser
  build dependency wasn't worth it for four diagrams.
- Tailwind — existing hand-written CSS and theme tokens were ported instead.

## Open items

- The two `domain` essays should be read end-to-end by the author to confirm
  every claim is one they can defend in an interview.
- The `position` essay would be strengthened by an actual demo backing it.
- Rate limiting is called out as missing in the URL Shortener; worth fixing in
  that repo so the essay's "what I'd do differently" section can shrink.
