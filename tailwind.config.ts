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
        brand: {
          50: "#F0F5F1",
          100: "#DCE8DE",
          200: "#B8D4BD",
          300: "#87A96B",
          400: "#4A7C59",
          500: "#3D6B4A",
          600: "#2F5438",
          700: "#1E3A24",
        },
        cream: "#F5F1EB",
        whatsapp: "#25D366",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
