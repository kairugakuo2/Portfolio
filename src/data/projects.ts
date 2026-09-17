export const projects = [
  {
    id: "gedis",
    name: "Gedis",
    duration: "SEP 2026",
    summary: "A Redis-compatible server built in Go — from raw TCP sockets to concurrent storage and durable command replay.",
    highlights: [
      "Implemented RESP as a recursive parser and serializer, with bounds validation on client-supplied length prefixes.",
      "Handled concurrent clients with a goroutine per connection and RWMutex-guarded key-value and hash stores; compatible with redis-cli.",
      "Built append-only-file persistence, background fsync, startup command replay, and channel-based shutdown signaling.",
    ],
    tech: ["Go", "TCP Sockets", "RESP", "Concurrency", "Persistence"],
    github: "https://github.com/kairugakuo2/Gedis",
    featured: true,
  },
  {
    id: "morning-negotiation",
    name: "Morning Negotiation",
    duration: "AUG 2026 - PRESENT",
    summary: "Two agents, one daily recommendation — a round-capped negotiation system built around live data and custom tools.",
    highlights: [
      "Built a tool-use agent loop from scratch, integrating local inference with LM Studio and the Anthropic API.",
      "Developed an MCP client authenticating against Strava’s official connector for live data access.",
      "Implemented a custom FastMCP server exposing domain tools, covering both sides of the protocol.",
      "Designed a two-agent negotiation system that converges through a round-capped mediation loop.",
    ],
    tech: ["Python", "Anthropic API", "FastMCP", "LM Studio", "SQLite"],
    github: "https://github.com/kairugakuo2/Morning-Negotiation",
    featured: true,
  },
  {
    id: "url-shortener",
    name: "URL Shortener API",
    duration: "SEP 2025 - PRESENT",
    summary:
      "REST API for short links, redirects, and click tracking — built as a study in how an API should behave when things go wrong.",
    highlights: [
      "Input validation as a security boundary, not a convenience: every untrusted field is checked before it reaches storage.",
      "Centralized error handling with RFC 7807 ProblemDetails responses (400, 404, 500) so failures are machine-readable.",
      "Health checks and seeding routines for reliable startup; endpoints documented and exercised via Swagger/OpenAPI.",
      "xUnit test suite, Docker containerization, and GitHub Actions CI for automated build/test pipelines.",
    ],
    tech: ["C#", "ASP.NET Core", "SQLite", "EF Core", "Docker", "xUnit"],
    github: "https://github.com/kairugakuo2/url-shortener-minimal",
    insight:
      "A URL shortener is, by definition, a service that takes attacker-controlled input and hands other people a link your domain vouches for — so validation is a security boundary, not a nicety. I allowlist schemes (http/https only, never a blocklist), reject internal/private hosts to close off an SSRF path, and cap length before anything touches the database. Every failure returns the same ProblemDetails shape whether it's a 400, 404, or 500, and unhandled exceptions get a generic message to the client — details only ever go to logs. Most of the test suite exists to exercise the failure paths, since those are the ones that only run when something's already going wrong.",
    featured: true,
  },
  {
    id: "sooner-planner",
    name: "Sooner Planner",
    duration: "JUNE 2025 - PRESENT",
    summary:
      "Class scheduler that generates 1,000+ valid schedule combinations from OU course data and user filters.",
    highlights: [
      "Combinatorial generation over real course data, constrained by user-supplied filters.",
      "Responsive React + Tailwind UI supporting mobile and desktop.",
      "Client-side state logic for dynamic schedule rendering and real-time pairwise conflict detection.",
    ],
    tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/kairugakuo2/sooner-planner",
    featured: true,
  },
  {
    id: "studysync",
    name: "StudySync",
    duration: "AUG 2025 - DEC 2025",
    summary:
      "Collaborative study platform pairing real-time collaboration tools with a dashboard-based exam-prep workflow.",
    highlights: [
      "Technical lead for a 5-person team — coordinated sprints, task ownership, and delivery.",
      "Built the frontend architecture, including the authentication flow and dashboard layout.",
      "Established a modular file structure with clear separations, enabling parallel work with minimal merge conflicts.",
      "Delivered end-to-end (demo, documentation, submission), earning a perfect grade.",
    ],
    tech: ["React", "JavaScript", "Git", "Vercel"],
    github: "https://github.com/kairugakuo2/StudySync",
    featured: false,
  },
];
