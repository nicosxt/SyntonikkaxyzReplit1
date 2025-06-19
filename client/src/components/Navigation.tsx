import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/use-theme";

export default function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", label: "HOME", path: "/" },
    { href: "/case-studies", label: "case studies", path: "/case-studies" },
    { href: "/services", label: "services", path: "/services" },
    { href: "/info", label: "info", path: "/info" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="flex justify-between items-center">
        <div className="bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
          <ul className="flex justify-between items-center text-sm space-x-6">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link tracking-wide text-gray-800 dark:text-white ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </nav>
  );
}
