import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2563eb",
          subtle: "#dbeafe",
        },
        status: {
          operational: "#16a34a",
          degraded: "#f59e0b",
          outage: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
};

export default config;
