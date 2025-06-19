import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Case Study: Edge City",
    overview: "A comprehensive branding project for Edge City, focusing on creating a futuristic identity that bridges physical and digital experiences through innovative design systems.",
    tags: ["Brand Identity", "Digital Design", "XR Integration"],
  },
  {
    id: 2,
    title: "Case Study: Neural Networks",
    overview: "An immersive art installation exploring the intersection of AI and human creativity through interactive digital experiences and machine learning algorithms.",
    tags: ["AI Art", "Interactive Design", "Installation"],
  },
  {
    id: 3,
    title: "Case Study: Metaverse Pavilion",
    overview: "A virtual reality experience design for a cutting-edge tech conference, creating immersive brand experiences in virtual spaces.",
    tags: ["VR Design", "Event Design", "3D Modeling"],
  },
];

export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const currentCase = caseStudies[currentIndex];

  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col justify-center" style={{ marginLeft: '15%', marginRight: '15%' }}>
      <div className="content-block p-8 md:p-12 min-h-[600px]">
        <h1 className="text-3xl md:text-4xl font-light mb-8">
          {currentCase.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Project Overview</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {currentCase.overview}
            </p>
            <div className="flex flex-wrap gap-2">
              {currentCase.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Case Study Visual</span>
          </div>
        </div>

        {/* Case study navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* MORE Arrow at bottom */}
      <div className="flex justify-end mt-6">
        <button 
          onClick={nextCase}
          className="flex items-center gap-2 text-gray-800 dark:text-white hover:opacity-70 transition-opacity"
        >
          <span className="text-lg font-light">MORE</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
