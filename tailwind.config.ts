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
        background: "#0D0612", // Very dark deep purple
        foreground: "#FAF9F6", // Ivory
        luxury: {
          purple: {
            900: "#160B1E", // Deep dark purple
            800: "#2A1437",
            700: "#3D1E4F",
            600: "#55296E",
            100: "#846B96", // Soft lavender highlight
          },
          gold: {
            DEFAULT: "#D4AF37", // Champagne gold
            light: "#F3E5AB",
            dark: "#AA8C2C",
          },
          ivory: {
            DEFAULT: "#FAF9F6",
            muted: "#E8E6DF",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        sans: ["var(--font-lato)"],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
