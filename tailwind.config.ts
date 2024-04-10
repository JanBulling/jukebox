import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#417E38",
        dark: "#2C682C",
        light: "#C5E5B4",
      },
      accent: {
        DEFAULT: "#eab308",
        dark: "#a16207",
        light: "#fde047",
      },
      gray: {
        DEFAULT: "#B1BCC2",
        light: "#F6F7F9",
        dark: "#2C3437",
        50: "#fafaf9",
        100: "#F6F7F9",
        200: "#E9EDF0",
        300: "#D9E1E4",
        400: "#CBD4D9",
        500: "#B1BCC2",
        600: "#929FA5",
        700: "#6E7B83",
        800: "#556066",
        900: "#2C3437",
        950: "#0D121C",
      },
      success: "#65a30d",
      destructive: "#dc2626",
      warning: "#d97706",
      info: "#0284c7",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
      shadow: "#262626",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-subtle":
          "linear-gradient(180deg, theme(colors.neutral.100 / 50%) 0%, theme(colors.neutral.100 / 0%) 48.32%)",
        "gradient-subtle-dark":
          "linear-gradient(180deg, theme(colors.neutral.900 / 50%) 0%, theme(colors.neutral.900 / 0%) 48.32%)",
        "gradient-subtle-gray":
          "linear-gradient(180deg, theme(colors.neutral.900) 0%, theme(colors.neutral.900 / 80%) 100%)",
        "gradient-subtle-white":
          "linear-gradient(180deg, theme(colors.white) 0%, theme(colors.white / 80%) 100%)",
        "gradient-glow-backdrop":
          "radial-gradient(8em circle at calc(50%) 10px, theme(colors.green.500), transparent 30%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        eb_garamond: ["var(--font-eb-garamond)", ...fontFamily.sans],
      },
      boxShadow: {
        xs: "0px 1px 2px 0px theme(colors.shadow / 5%)",
        lg: "0px 4px 6px -2px theme(colors.shadow / 3%), 0px 12px 16px -4px theme(colors.shadow / 8%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("tailwindcss-animate")],
};
export default config;
