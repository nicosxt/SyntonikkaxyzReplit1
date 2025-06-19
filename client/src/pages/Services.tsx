import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  "Graphics Design",
  "Web Design", 
  "Logo & Branding",
  "Art Direction",
  "AR / VR",
  "Experience Design",
  "Consulting",
  "Surprises! 🪄"
];

export default function Services() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col justify-center" style={{ marginLeft: '15%', marginRight: '15%' }}>
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
          <span className="italic font-light text-gray-800 dark:text-white">Interdisciplinary</span> and <span className="italic font-light text-gray-800 dark:text-white">Comprehensive</span><br />
          feel-good, bespoke designs for cutting-<br />
          edge ideas.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <button className="service-button">
              {service}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button className="nav-arrow">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button className="nav-arrow">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}