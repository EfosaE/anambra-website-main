// styles/tailwind.config.ts
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin"; // ✅ Import the plugin function

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // safelist: ["custom-golden"],
  theme: {
    extend: {
      colors: {
        primary: "#0056B8",
        golden: "#DA9617",
        secondary: "#FFD700",
        background: "#FFF9F2",
        body: "#1E1E1E",
      },
      screens: {
        "between-360-400": { min: "375px", max: "400px" },
        "between-400-700": { min: "400px", max: "700px" },
      },
      fontFamily: {
        instrument: ["var(--font-instrument)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        heading: ['"Integral CF"', "sans-serif"],
        body: ['"Playfair Display"', "serif"],
      },
      spacing: {
        section: "4rem",
        "section-md": "6rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // Target devices between 360px and 400px
      addVariant(
        "between-360-700",
        "@media (min-width: 360px) and (max-width: 700px)"
      );
    }),
  ],
};

export default config;
