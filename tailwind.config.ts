import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-card": "var(--bg-card)",
        "bg-elevated": "var(--bg-elevated)",
        "accent-primary": "var(--accent-primary)",
        "accent-secondary": "var(--accent-secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        success: "var(--success)",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "28px",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 56, 104, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 56, 104, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-ring": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(255, 56, 104, 0.4)" },
          "50%": { boxShadow: "0 0 16px rgba(124, 92, 255, 0.6)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "glow-ring": "glow-ring 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
