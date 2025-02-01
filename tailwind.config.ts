import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: "#0049cc",
        blueNavy: "#0D3880",
        pink: '#E60278',
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0D3880",
        accent: "#E60278",
      },
    },
  },
  plugins: [],
};
export default config;
