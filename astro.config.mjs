import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain. Canonicals, sitemap entries, and og:image absolute URLs
  // derive from this. Update if the domain ever changes.
  site: 'https://dranataliaasquino.com.uy',
  integrations: [
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
    // The whole stylesheet is ~15 KB. Inlining it removes a render-blocking
    // request on every page; GitHub Pages caches assets for only 10 minutes,
    // so a separate file would rarely be reused across navigations anyway.
    inlineStylesheets: 'always',
  },
  // Self-hosted fonts (files under src/assets/fonts/, SIL OFL). The local
  // provider keeps the build fully offline and avoids the extra origins of
  // Google Fonts on the critical path. Variable fonts instanced with
  // fonttools varLib.instancer to the weights/optical sizes the site uses:
  //   Inter wght=400:600 · Source Serif 4 wght=400:600 opsz=8:60
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '400 600',
            style: 'normal',
            src: ['./src/assets/fonts/inter-latin-wght.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            weight: '400 600',
            style: 'normal',
            src: ['./src/assets/fonts/source-serif-4-latin-opsz-wght.woff2'],
          },
        ],
      },
    },
  ],
});
