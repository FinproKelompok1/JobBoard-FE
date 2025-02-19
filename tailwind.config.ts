import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "960px",
      },
      colors: {
        lightBlue: "#0049cc",
        blueNavy: "#0D3880",
        pink: "#E60278",
        grey: "#e5e7eb",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0D3880",
        accent: "#E60278",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
