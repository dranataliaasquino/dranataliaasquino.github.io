/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Sage & Sand palette
        cream: '#F4F1EA',       // background base
        sage: {
          50: '#EDF1E8',
          100: '#DDE5D6',       // soft sage panels
          300: '#A8B89E',       // muted sage accents
          600: '#5C6B58',       // primary text/links
          900: '#2E3A2C',       // headings, strong text
        },
        sand: {
          50: '#FBF8F2',
          100: '#EFE8DA',
          300: '#D4C7AB',
          600: '#8A7A55',
        },
        ink: '#2E3A2C',
        muted: '#5B5B5B',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'ui-serif', 'serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
