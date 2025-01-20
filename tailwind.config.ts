import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        // lg: "768px",
        // "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulsate: {
          "0%, 100%": { transform: "scale(1)" },
          "5%": { transform: "scale(1.2)" },
          "10%": { transform: "scale(1.1)" },
          "15%": { transform: "scale(1.3)" },
          "50%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulsate: "pulsate 2.5s infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // function ({ addComponents }: PluginAPI) {
    //   addComponents({
    //     ".small-container": {
    //       maxWidth: "100%",
    //       "@screen sm": {
    //         maxWidth: "640px",
    //       },
    //       "@screen md": {
    //         maxWidth: "768px",
    //       },
    //       // "@screen lg": {
    //       //   maxWidth: "1280px",
    //       // },
    //       // "@screen xl": {
    //       //   maxWidth: "1400px",
    //       // },
    //     },
    //   });
    // },
  ],
} satisfies Config;
