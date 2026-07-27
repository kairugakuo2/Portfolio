// Technical roles only. Non-technical work lives in `otherWork` below so the
// signal in the main list stays dense.
export const experience = [
  {
    company: "Argo Data",
    title: "Software Engineer Intern",
    hash: "f4a7c2e",
    from: "JUN 2026",
    to: "HEAD",
    location: "Richardson, TX",
    description:
      "Engineering a production-critical, zero-trust identity subsystem in C# and .NET 8 that automates signing key bootstrapping, bridging legacy Windows/COM+ dependencies with modern containerized microservices.",
    bullets: [
      "Implemented Windows-native cryptography via DPAPI to encrypt local key caches, supporting GLBA and HIPAA compliance through explicit in-memory hygiene, SecureString usage, and strict OS-level file ACLs.",
      "Designed automated, zero-downtime key rotation with temporary dual-key grace periods, eliminating manual credential distribution.",
      "Built graceful degradation logic to maintain microservice operation during Registrar outages, validated by MSTest coverage for cryptographic round-trips and distributed edge cases.",
    ],
    skills: ["C#", ".NET 8", "Cryptography", "Distributed Systems", "MSTest"],
    // Links the résumé bullet to the domain writeup it motivated.
    related: "zero-trust-key-rotation",
  },
  {
    company: "William Kerber Software Studio",
    title: "Founder (Selected Team)",
    hash: "8d21b4a",
    from: "FEB 2026",
    to: "HEAD",
    location: "Norman, OK",
    description:
      "Selected as part of a 4-person team building a professional esports media aggregation platform.",
    bullets: [
      "Led UI/UX design through Figma prototypes used in the investor pitch and MVP planning.",
    ],
    skills: ["Product Strategy", "UI/UX", "Figma"],
  },
  {
    company: "University of Oklahoma — Language Learning Center",
    title: "Student Programmer",
    hash: "3c9f01d",
    from: "FEB 2025",
    to: "HEAD",
    location: "Norman, OK",
    description:
      "Maintain department web and desktop applications used for placement testing and internal workflows.",
    bullets: [
      "Managed SQL database updates and generated operational reports supporting 3 departmental workflows.",
      "Maintain and update department websites in HTML/CSS/JS for faculty and student use.",
    ],
    skills: ["SQL", "JavaScript", "Internal Tooling"],
  },
];

export const otherWork = [
  {
    company: "Velocity Detailing",
    title: "Founder",
    from: "MAY 2024",
    to: "DEC 2024",
    description:
      "Founded and grew a mobile detailing business — 30+ jobs in 3 months at 98% satisfaction, 25+ clients through organic marketing, and a CRM-backed booking site that lifted conversion 20%.",
  },
];

export const leadership = [
  {
    organization: "Google Developer Group (GDG) — University of Oklahoma",
    title: "Connections Coordinator",
    duration: "SEP 2025 - PRESENT",
    description:
      "Planning and coordinating tech workshops and networking events for students. Leading outreach and partnership efforts to grow cross-organization engagement on campus.",
  },
];
