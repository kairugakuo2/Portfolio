// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gakuokairu.com",
  integrations: [react(), sitemap({ filter: (page) => !new URL(page).pathname.startsWith("/studio") })],
});
