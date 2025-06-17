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

function Router() {
  return (
    <div className="min-h-screen bg-[#e8dcc6] text-gray-800 dark:bg-black dark:text-white transition-colors duration-300">
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
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Page not found</p>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
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
