import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain. Canonicals, sitemap entries, and og:image absolute URLs
  // derive from this. Update if the domain ever changes.
  site: 'https://dranataliaasquino.com.uy',
  integrations: [tailwind(), sitemap()],
  build: {
    format: 'directory',
  },
});
