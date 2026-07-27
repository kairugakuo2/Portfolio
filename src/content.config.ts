import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// `provenance` is the honesty layer: every essay states, on its face, what
// kind of evidence backs it. Rendered as a visible badge on the page.
const provenance = z.enum([
  // Written from code I wrote and can link to.
  "production",
  // Explains the problem class from public knowledge. Deliberately contains no
  // employer-specific architecture, and says so.
  "domain",
  // A researched position. Not something I have shipped.
  "position",
]);

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    // `draft` entries are excluded from every listing and from the sitemap.
    draft: z.boolean().default(false),
    provenance,
    readingTime: z.string(),
  }),
});

export const collections = { writing };
