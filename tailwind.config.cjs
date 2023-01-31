/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        glysa: ["var(--font-glysa)", ...fontFamily.serif],
        lexend: ["var(--font-lexend)", ...fontFamily.sans],
      },
      colors: {
        g: {
          100: "#141414",
          90: "#191919",
          80: "#1E1E1E",
          70: "#232323",
          60: "#282828",
          50: "#2D2D2D",
          40: "#323232",
          30: "#373737",
          20: "#3c3c3c",
          10: "#414141",
        },
        // Colors for the "Add contact" button's gradients
        "add-contact": {
          "base-1": "rgba(40, 40, 40, 0.7)",
          "base-2": "rgba(40, 40, 40, 1)",
          "border-1": "rgba(60, 60, 60, 1)",
          "border-2": "rgba(60, 60, 60, 0)",
        },
      },
      opacity: {
        100: "100%",
        56: "56%",
        32: "32%",
      },
      gridTemplateColumns: {
        navbar: "1fr auto 1fr",
      },
    },
  },
  plugins: [],
};
