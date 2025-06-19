
import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/use-theme";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { href: "/", label: "HOME", path: "/" },
    { href: "/services", label: "services", path: "/services" },
    { href: "/info", label: "info", path: "/info" },
  ];

  const caseStudyItems = [
    { href: "/case-studies/edge-city", label: "EDGE CITY" },
    { href: "/case-studies/agartha", label: "AGARTHA" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const isCaseStudiesActive = location.startsWith("/case-studies");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="flex justify-between items-center p-4" style={{ marginLeft: '15%', marginRight: '15%' }}>
        {/* Left side - Navigation Links */}
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.href}>
              <span
                className={`text-sm transition-colors hover:text-foreground/80 ${
                  isActive(item.path)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
          
          {/* Case Studies Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link href="/case-studies">
              <span
                className={`text-sm transition-colors hover:text-foreground/80 flex items-center gap-1 ${
                  isCaseStudiesActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                case studies
                <ChevronDown className="w-3 h-3" />
              </span>
            </Link>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-sm border border-border/40 rounded-lg shadow-lg py-2">
                {caseStudyItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </nav>
  );
}
