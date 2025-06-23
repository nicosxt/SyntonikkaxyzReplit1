import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const textParts = [
    { text: "Nico Shi", className: "italic font-light text-gray-800 dark:text-white" },
    { text: " is a multi-disciplinary designer building ", className: "" },
    { text: "Protopian", className: "italic font-light text-gray-800 dark:text-white" },
    { text: " brands with AI, XR, and immersive art.", className: "" }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 md:px-8" style={{ marginLeft: '15%', marginRight: '15%' }}>
      
      {/* Left-aligned text section */}
      <div className="mb-12 text-left">
        <span className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
          {textParts.map((part, index) => (
            <span
              key={index}
              className={`inline transition-opacity duration-[6500ms] ease-out ${part.className} ${
                isLoaded 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
            >
              {part.text}
            </span>
          ))}
        </span>
      </div>
        
      {/* MORE Button */}
      <div className={`flex justify-end mt-6 transition-opacity duration-[6500ms] ease-out ${
        isLoaded 
          ? 'opacity-100' 
          : 'opacity-0'
      }`}>
        <Link href="/case-studies">
          <button className="flex items-center gap-2 text-gray-800 dark:text-white hover:opacity-70 transition-all duration-300 hover:translate-x-1">
            <span className="text-lg font-light">MORE</span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </div>
  );
}
