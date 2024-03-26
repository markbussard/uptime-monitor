import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          "900": "#111827", // Background color for the body
          "800": "#1F2937" // Background color for the navbar and footer
        },
        gray: {
          "400": "#9CA3AF", // Text color for secondary text
          "300": "#D1D5DB" // Text color for less prominent information like testimonials
        },
        blue: {
          "600": "#2563EB", // Primary button background color and icon color
          "700": "#1D4ED8", // Primary button background color on hover state
          "500": "#3B82F6" // Feature icon color
        },
        white: "#FFFFFF" // Primary text color
      }
    }
  },
  plugins: []
};
export default config;
