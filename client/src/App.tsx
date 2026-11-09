import { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import CreationHero from "@/components/CreationHero";
import Home from "@/pages/Home";
import cloudsBg from "@assets/sky-clouds-washed.jpeg";

// Everything except the landing page is split into its own chunk, so the first
// paint only downloads the hero, navigation and project grid.
const EdgeCityCaseStudy = lazy(() => import("@/pages/EdgeCityCaseStudy"));
const EdgeCityWebsite2026 = lazy(() => import("@/pages/EdgeCityWebsite2026"));
const AgarthaCaseStudy = lazy(() => import("@/pages/AgarthaCaseStudy"));
const Agartha2026 = lazy(() => import("@/pages/Agartha2026"));
const Galleries = lazy(() => import("@/pages/Galleries"));
const GalleryDetail = lazy(() => import("@/pages/Galleries").then(m => ({ default: m.GalleryDetail })));
const GameDetail = lazy(() => import("@/pages/Games").then(m => ({ default: m.GameDetail })));
const VideoDetail = lazy(() => import("@/pages/Videos"));
const Services = lazy(() => import("@/pages/Services"));
const Info = lazy(() => import("@/pages/Info"));
const PlatformerPage = lazy(() => import("@/pages/PlatformerPage"));

function Router() {
  const [location] = useLocation();
  const hasLanding = ["/", "/playground", "/info"].includes(location);

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
      {!hasLanding && <StarfieldBackground className="dark:block hidden" />}
      
      {/* Content overlay */}
      <div className="min-h-screen bg-transparent transition-colors duration-300 relative z-10">
        {hasLanding && <CreationHero />}
        <Navigation hasLanding={hasLanding} />
        <main className={location === "/" ? "" : hasLanding ? "pt-20 px-[3vw] pb-8" : "pt-20 px-4 pb-8"}>
          <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/case-studies"><Redirect to="/" /></Route>
            <Route path="/case-studies/edge-city-2026"><Redirect to="/case-studies/edge-city" /></Route>
            <Route path="/case-studies/edge-city-website-2026" component={EdgeCityWebsite2026} />
            <Route
              path="/case-studies/edge-city"
              component={EdgeCityCaseStudy}
            />
            <Route path="/case-studies/agartha" component={AgarthaCaseStudy} />
            <Route path="/case-studies/agartha-2026" component={Agartha2026} />
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
                  <h1 className="text-title font-light mb-4">404</h1>
                  <p className="text-muted-foreground">Page not found</p>
                </div>
              </div>
            </Route>
          </Switch>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <Router />;
}
