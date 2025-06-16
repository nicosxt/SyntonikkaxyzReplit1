import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "HOME", path: "/" },
    { href: "/case-studies", label: "case studies", path: "/case-studies" },
    { href: "/services", label: "services", path: "/services" },
    { href: "/info", label: "info", path: "/info" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-white/10 border border-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
        <ul className="flex justify-between items-center text-sm">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link tracking-wide ${
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
    </nav>
  );
}
