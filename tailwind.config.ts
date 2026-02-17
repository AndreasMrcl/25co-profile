import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-brown": "#B8865C",
        "deep-brown": "#8B5E3C",
        "light-beige": "#F5EDD8",
        "warm-cream": "#FAF6EE",
        "dark-espresso": "#1A1008",
        "muted-tan": "#C9A882",
        "charcoal": "#2D2318",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "grain": "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
