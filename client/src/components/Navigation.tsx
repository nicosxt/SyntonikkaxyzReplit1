import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Navigation({ hasLanding = false }: { hasLanding?: boolean }) {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { href: "/", label: "Recent Work", active: location === "/" || location.startsWith("/case-studies") },
    { href: "/playground", label: "Playground", active: ["/playground", "/galleries", "/games", "/videos"].some(path => location === path || location.startsWith(`${path}/`)) },
    { href: "/info", label: "Me", active: location === "/info" },
  ];

  return (
    <nav
      className={`${hasLanding ? `absolute top-[calc(100svh+1rem)] ${location === "/" ? "dark" : ""}` : "fixed top-4"} w-[94vw] left-[3vw] md:w-[70vw] md:left-[15vw] z-50 transition-all duration-800 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`} 
    >
      <div className="flex justify-between items-center gap-2">
        <div className={`py-3 transition-all duration-600 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <ul className="flex flex-wrap justify-between items-center text-subhead font-light leading-tight gap-x-4 gap-y-1 sm:gap-x-6">
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
                    aria-current={isActive ? "page" : undefined}
                    className={`nav-link whitespace-nowrap tracking-widest text-gray-800 dark:text-white hover:scale-105 transition-all duration-200 ${
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

      </div>
    </nav>
  );
}