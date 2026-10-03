import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import { useTheme } from "@/components/ThemeToggle";
import Home from "@/pages/Home";
import EdgeCityCaseStudy from "@/pages/EdgeCityCaseStudy";
import AgarthaCaseStudy from "@/pages/AgarthaCaseStudy";
import Galleries, { GalleryDetail } from "@/pages/Galleries";
import { GameDetail } from "@/pages/Games";
import VideoDetail from "@/pages/Videos";
import Services from "@/pages/Services";
import Info from "@/pages/Info";
import PlatformerPage from "@/pages/PlatformerPage";
import cloudsBg from "@assets/sky-clouds-washed.jpeg";

function Router() {
  const { theme } = useTheme();
  
  console.log('App Router: Current theme is', theme);

  return (
    <div
      className="min-h-screen text-foreground bg-background transition-colors duration-300"
      style={{
        backgroundImage: `var(--tw-bg-image, url(${cloudsBg}))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Starfield background for dark mode only */}
      <StarfieldBackground className="dark:block hidden" />
      
      {/* Content overlay */}
      <div className="min-h-screen bg-transparent transition-colors duration-300 relative z-10">
        <Navigation />
        <main className="pt-20 px-4 pb-8">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/case-studies"><Redirect to="/" /></Route>
            <Route
              path="/case-studies/edge-city"
              component={EdgeCityCaseStudy}
            />
            <Route path="/case-studies/agartha" component={AgarthaCaseStudy} />
            <Route path="/services" component={Services} />
            <Route path="/galleries/:id" component={GalleryDetail} />
            <Route path="/playground" component={Galleries} />
            <Route path="/galleries"><Redirect to="/playground" /></Route>
            <Route path="/games/reel2023"><Redirect to="/videos/game-reel-2023" /></Route>
            <Route path="/games/:slug" component={GameDetail} />
            <Route path="/games"><Redirect to="/playground" /></Route>
            <Route path="/videos/:slug" component={VideoDetail} />
            <Route path="/info" component={Info} />
            <Route path="/game" component={PlatformerPage} />
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
