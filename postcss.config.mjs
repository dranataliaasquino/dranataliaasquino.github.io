// Tailwind runs through PostCSS, which Astro supports natively via Vite.
// The @astrojs/tailwind integration was dropped in the Astro 7 upgrade: it
// peers at astro ^3 || ^4 || ^5 and has no Astro 6/7-compatible release.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
