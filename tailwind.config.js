/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Light surfaces
        base: {
          DEFAULT: "#FFF9FB",
          alt: "#FDF1F6",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#251E2E",
        },
        // Brand
        rose: {
          50: "#FEF3F7",
          100: "#FBD9E6",
          200: "#F6B9D2",
          300: "#F094B9",
          400: "#EA729F",
          500: "#E85D8A",
          600: "#D0416F",
          700: "#A9315A",
        },
        lavender: {
          100: "#EEE9FB",
          200: "#D9CFF3",
          300: "#B7A6E8",
          400: "#9B85DC",
          500: "#8B7BC7",
          600: "#6E5AA8",
        },
        plum: {
          50: "#F3EDF5",
          100: "#E4D9E9",
          200: "#CFC0D5",
          300: "#A794AD",
          400: "#6B5D6E",
          500: "#5A4D5F",
          600: "#453A4C",
          700: "#392F3F",
          800: "#251E2E",
          900: "#1A1420",
        },
        ink: {
          light: "#2B2230",
          dark: "#F3EDF5",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(43, 34, 48, 0.08), 0 8px 24px -8px rgba(43, 34, 48, 0.10)",
        "soft-dark": "0 2px 10px -2px rgba(0, 0, 0, 0.35), 0 8px 24px -8px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 4px rgba(232, 93, 138, 0.12)",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.06) rotate(-2deg)" },
        },
        "grow-bar": {
          "0%": { width: "0%" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.5s ease-out both",
        flicker: "flicker 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
