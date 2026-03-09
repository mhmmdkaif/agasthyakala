import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "off-white": "#F7F4EF",
        black: { DEFAULT:"#080808", soft:"#1A1A1A", mid:"#2A2A2A", light:"#666666" },
        gold: { DEFAULT:"#C9963A", light:"#E0B355", bright:"#F0B840", dim:"#7A5A18", pale:"#F5ECD8" },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif:   ["var(--font-cormorant)", "serif"],
        sans:    ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
