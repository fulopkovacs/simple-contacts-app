/** @type {import('tailwindcss').Config} */

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        glysa: ["var(--font-glysa)", ...fontFamily.serif],
        lexend: ["var(--font-lexend)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
