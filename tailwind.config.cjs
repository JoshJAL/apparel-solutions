/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        backgroundLight: 'rgb(248, 242, 218)',
        backgroundLightButtons: 'rgb(250, 215, 72)',
        backgroundLightButtonsHover: 'rgb(227, 194, 59)'
      },
      fontFamily: {
        seaside: ['Seaside Resort NF']
      }
    }
  },
  plugins: []
};
