import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import ThemeToggle, { useTheme } from "./ThemeToggle";

export default function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { href: "/", label: "Work", active: location === "/" || location.startsWith("/case-studies") },
    { href: "/playground", label: "Playground", active: ["/playground", "/galleries", "/games"].some(path => location === path || location.startsWith(`${path}/`)) },
    { href: "/info", label: "About", active: location === "/info" },
  ];

  return (
    <nav
      className={`fixed top-4 w-[calc(100%-2rem)] max-w-[1600px] left-1/2 transform -translate-x-1/2 z-50 transition-all duration-800 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`} 
    >
      <div className="flex justify-between items-center gap-2">
        <div className={`bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-full px-2 sm:px-6 py-3 backdrop-blur-sm transition-all duration-600 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <ul className="flex justify-between items-center text-xs sm:text-sm gap-4 sm:gap-6">
            {navItems.map((item, index) => {
              const isActive = item.active;
              return (
                <li 
                  key={item.href}
                  className={`transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    className={`nav-link whitespace-nowrap tracking-wide text-gray-800 dark:text-white hover:scale-105 transition-all duration-200 ${
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

        <div className={`transition-all duration-600 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ transitionDelay: '300ms' }}>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}