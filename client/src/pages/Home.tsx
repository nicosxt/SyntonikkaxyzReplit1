import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 md:px-8" style={{ marginLeft: '15%', marginRight: '15%' }}>
      
      {/* Left-aligned text section */}
      <div className="mb-12 text-left">
          <span className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
             <span className="italic font-light text-gray-800 dark:text-white">Nico Shi</span> is a multi-disciplinary designer building{" "}
            <span className="italic font-light text-gray-800 dark:text-white">Protopian</span>
            {" "}brands with AI, XR, and immersive art.
          </span>
      </div>
        
      {/* MORE Button */}
      <div className="flex justify-end mt-6">
        <Link href="/case-studies">
          <button className="flex items-center gap-2 text-gray-800 dark:text-white hover:opacity-70 transition-opacity">
            <span className="text-lg font-light">MORE</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}
