import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 md:px-8">
      {/* Left-aligned text section */}
      <div className="mb-12 text-left">
        <h1 className="md:text-7xl font-light mb-8 text-[48px] text-gray-800 dark:text-white">
          Nico Shi{" "}
          <span className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
            is a multi-disciplinary designer building{" "}
            <span className="italic font-light text-gray-800 dark:text-white">Protopian</span>
            {" "}brands with AI, XR, and immersive art.
          </span>
        </h1>
      </div>
      {/* Single Case Study */}
      <div className="w-full max-w-4xl">
        <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/20 dark:border-white/20 light:border-black/20 rounded-3xl p-8 md:p-12 min-h-[400px] backdrop-blur-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-white dark:text-white light:text-gray-800">
              Case Study: Edge City
            </h2>
            <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg">
              <p className="mb-4">
                A comprehensive branding project focusing on creating a futuristic identity 
                that bridges physical and digital experiences.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 dark:bg-white/10 light:bg-black/10 rounded-full text-sm">Brand Identity</span>
                <span className="px-3 py-1 bg-white/10 dark:bg-white/10 light:bg-black/10 rounded-full text-sm">Digital Design</span>
                <span className="px-3 py-1 bg-white/10 dark:bg-white/10 light:bg-black/10 rounded-full text-sm">XR Integration</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* MORE Button */}
        <div className="flex justify-end mt-6">
          <Link href="/case-studies">
            <button className="flex items-center gap-2 text-white dark:text-white light:text-gray-800 hover:opacity-70 transition-opacity">
              <span className="text-lg font-light">MORE</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
