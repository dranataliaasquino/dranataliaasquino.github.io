import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: Update `site` once you know the GitHub Pages URL or buy a domain.
  // For username-level pages: https://<username>.github.io
  // For project pages: https://<username>.github.io/natalia-asquino-web
  site: 'https://dranataliaasquino.github.io',
  // If using project pages (not user pages), uncomment and set:
  // base: '/natalia-asquino-web',
  integrations: [tailwind(), sitemap()],
  build: {
    format: 'directory',
  },
});
