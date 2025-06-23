import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";

const services = [
  "Graphics Design",
  "Web Design",
  "Logo & Branding",
  "Art Direction",
  "AR / VR",
  "Experience Design",
  "Consulting",
  "Surprises! 🪄",
];

export default function Services() {
  const { isLoaded, getAnimationClasses } = usePageAnimation({ delay: 200, staggerDelay: 150 });

  return (
    <div
      className="min-h-screen max-w-4xl mx-auto flex flex-col justify-center"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="mb-12">
        <h1 className={`text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2 transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <span className="italic font-light text-gray-800 dark:text-white">
            Interdisciplinary
          </span>{" "}
          and{" "}
          <span className="italic font-light text-gray-800 dark:text-white">
            Comprehensive
          </span>
          <br />
          feel-good, bespoke designs for cutting-
          <br />
          edge ideas.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-item"
            {...getAnimationClasses(index + 1, 'slide-in-up')}
          >
            <button className={`service-button hover:scale-105 ${getAnimationClasses(index + 1, 'slide-in-up').className}`}>{service}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
