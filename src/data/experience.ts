// Technical roles only. Non-technical work lives in `otherWork` below so the
// signal in the main list stays dense. `id` backs the click-to-expand modal;
// `insight` is optional condensed reasoning shown in that modal.
export const experience = [
  {
    id: "argo-data",
    company: "Argo Data",
    title: "Software Engineer Intern",
    hash: "f4a7c2e",
    from: "JUN 2026",
    to: "HEAD",
    location: "Richardson, TX",
    description:
      "Designed and shipped HMAC-SHA256 request signing across 8 .NET microservices for a distributed platform serving regulated financial clients.",
    bullets: [
      "Shipped service-to-service HTTP authentication across 8 .NET microservices using HMAC-SHA256 request signing.",
      "Strengthened bootstrap authorization with identity-bound, expiring tokens and fail-closed validation.",
      "Engineered zero-downtime key rotation with adoption-delay and grace-period windows, converging services within 60 seconds.",
      "Hardened storage with Windows DPAPI, restrictive NTFS ACLs, and scoped SecureString accessors; validated with 56 MSTest unit tests.",
    ],
    skills: ["C#", ".NET 8", "Cryptography", "Distributed Systems", "MSTest"],
    insight:
      "The interesting part of this work isn't the cryptography, it's the choreography around it. A key rotation can't be a swap — there's no instant where every participant agrees the switch happened, so it has to be a fade: a dual-key grace period where the old and new key are both briefly valid, ordered so verifiers accept the new key before signers start using it. And it has to keep working when the service that issues keys is unreachable — failing closed breaks availability, failing open is an auth bypass, so the real design work is a bounded degraded mode: serve from cache within a hard lifetime, alert loudly, narrow which operations stay allowed. (General description of the problem class — no employer-specific architecture.)",
  },
  {
    id: "william-kerber",
    company: "William Kerber Software Studio",
    title: "Founding Team Member",
    hash: "8d21b4a",
    from: "FEB 2026",
    to: "HEAD",
    location: "Norman, OK",
    description:
      "Selected as part of a 4-person team building a professional esports media aggregation platform.",
    bullets: [
      "Own frontend architecture and interface design, translating Figma prototypes used in investor pitch materials into the MVP build.",
    ],
    skills: ["Product Strategy", "UI/UX", "Figma"],
  },
  {
    id: "ou-llc",
    company: "University of Oklahoma — Language Learning Center",
    title: "Student Programmer",
    hash: "3c9f01d",
    from: "FEB 2025",
    to: "MAY 2026",
    location: "Norman, OK",
    description:
      "Maintained and extended department web and desktop applications used for placement testing and internal workflows.",
    bullets: [
      "Maintained and extended departmental web applications in HTML/CSS/JavaScript serving faculty and students across multiple language programs.",
      "Supported the web and desktop systems used for language placement testing, resolving defects and shipping feature requests for internal staff.",
      "Automated SQL reporting and database updates across 3 departmental workflows, replacing recurring manual data pulls.",
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
    location: "Prosper, TX",
    description:
      "Founded and grew a mobile detailing business — 30+ jobs in 3 months at 98% satisfaction, 25+ clients through organic marketing, and a CRM-backed booking site that lifted conversion 20%.",
  },
];

// `roles` is newest first; the first role is the current headline.
export const leadership = [
  {
    id: "gdg-ou",
    organization: "Google Developer Group — University of Oklahoma",
    short: "GDG at OU",
    roles: [
      { title: "President", from: "SEP 2026", to: "HEAD" },
      { title: "Connections Coordinator", from: "SEP 2025", to: "AUG 2026" },
    ],
    location: "Norman, OK",
    description:
      "Leading OU's Google Developer Group — technical workshops, networking events, and partnerships that connect students with the wider developer community.",
    bullets: [
      "Serve as chapter President, setting direction for workshops, events, and the officer team.",
      "Led outreach and partnership efforts as Connections Coordinator to grow cross-organization engagement on campus.",
      "Served as technical lead for a 5-person engineering team on StudySync, coordinating sprints, task ownership, and end-to-end delivery.",
    ],
    skills: ["Leadership", "Event Planning", "Partnerships", "Team Lead"],
  },
];
