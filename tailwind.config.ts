import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Type scale tokens live in client/src/index.css (:root --text-*).
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "var(--leading-display)", letterSpacing: "-0.02em" }],
        title: ["var(--text-title)", { lineHeight: "var(--leading-title)", letterSpacing: "-0.02em" }],
        heading: ["var(--text-heading)", { lineHeight: "var(--leading-heading)", letterSpacing: "-0.01em" }],
        subhead: ["var(--text-subhead)", { lineHeight: "var(--leading-subhead)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        small: ["var(--text-small)", { lineHeight: "var(--leading-small)" }],
        label: ["var(--text-label)", { lineHeight: "var(--leading-label)" }],
      },
      fontFamily: {
        sans: ['PP Neue Montreal', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
