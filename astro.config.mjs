import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain. Canonicals, sitemap entries, and og:image absolute URLs
  // derive from this. Update if the domain ever changes.
  site: 'https://dranataliaasquino.com.uy',
  integrations: [
    tailwind(),
    // Suppress lastmod in sitemap entries so Google does not surface a
    // build/commit date as a "publication date" in search snippets. The site
    // is an evergreen institutional one, not dated content.
    sitemap({
      serialize(item) {
        delete item.lastmod;
        return item;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
