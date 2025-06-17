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
import cloudsBg from "@assets/sky-clouds-1_1750118588419.jpg";

function Router() {
  return (
    <div 
      className="min-h-screen text-gray-800 dark:bg-black dark:text-white transition-colors duration-300"
      style={{
        backgroundImage: `url(${cloudsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark mode overlay */}
      <div className="min-h-screen bg-transparent dark:bg-black/80 transition-colors duration-300">
        <Navigation />
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
                  <p className="text-gray-400 dark:text-gray-400">Page not found</p>
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
