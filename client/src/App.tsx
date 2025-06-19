import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import CaseStudies from "@/pages/CaseStudies";
import Services from "@/pages/Services";
import Info from "@/pages/Info";
import { useState, useEffect } from "react";
import cloudsBg from "@assets/sky-clouds-1_1750118588419.jpg";

function Router() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      return (stored === 'dark' ? 'dark' : 'light') as "light" | "dark";
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen text-foreground bg-background transition-colors duration-300 relative">
      {/* Animated Sky Background - Only in Light Mode */}
      {theme === 'light' && <div className="animated-sky" />}
      
      {/* Static Background Image - Dark Mode */}
      {theme === 'dark' && (
        <div 
          className="fixed inset-0 z-[-1]"
          style={{
            backgroundImage: `url(${cloudsBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
      )}
      
      <div className="min-h-screen bg-transparent transition-colors duration-300 relative z-10">
        <Navigation theme={theme} onThemeToggle={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} />
        <main className="pt-20 px-4 pb-8">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/services" component={Services} />
            <Route path="/info" component={Info} />
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-light mb-4">404</h1>
                  <p className="text-muted-foreground">Page not found</p>
                </div>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
