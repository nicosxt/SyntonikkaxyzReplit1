import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

// Stars icon component
function StarsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L13.09 8.26L20 9.27L13.09 10.28L12 16.54L10.91 10.28L4 9.27L10.91 8.26L12 2Z"
        fill="currentColor"
      />
      <path
        d="M19 7L19.5 9L21.5 9.5L19.5 10L19 12L18.5 10L16.5 9.5L18.5 9L19 7Z"
        fill="currentColor"
      />
      <path
        d="M5 16L5.5 18L7.5 18.5L5.5 19L5 21L4.5 19L2.5 18.5L4.5 18L5 16Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Sun icon component
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <div className="bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-full px-3 py-2 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="relative w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none rounded-full"
      >
        {/* Dark mode icon (stars) - shown in dark mode */}
        <StarsIcon
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white transition-all duration-300 ease-in-out ${
            theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />

        {/* Light mode icon (sun) - shown in light mode */}
        <SunIcon
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black transition-all duration-300 ease-in-out ${
            theme === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
      </button>
    </div>
  );
}
