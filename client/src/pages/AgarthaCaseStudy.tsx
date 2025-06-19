
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function AgarthaCaseStudy() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col" style={{ marginLeft: '15%', marginRight: '15%' }}>
      <div className="content-block p-8 md:p-12">
        {/* Back button */}
        <Link href="/case-studies">
          <button className="flex items-center gap-2 text-gray-800 dark:text-white hover:opacity-70 transition-opacity mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Case Studies</span>
          </button>
        </Link>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-light mb-4 text-gray-800 dark:text-white">
          CASE STUDY: AGARTHA
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
            #XR Design
          </span>
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
            #Immersive Art
          </span>
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
            #AI Integration
          </span>
        </div>

        {/* Role */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">ROLE: Creative Technologist</h2>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">EXAMPLES:</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>immersive experience design -- Agartha Virtual World</p>
            <p>AI-powered art generation -- Neural Landscape Systems</p>
            <p>interactive installation -- Touch of the Underground</p>
            <p>documentary film -- Journey to Agartha</p>
          </div>
        </div>

        {/* Image placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Virtual World Interface</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">AI Art Generation System</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Interactive Installation Setup</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Documentary Production</span>
          </div>
        </div>

        {/* Additional image placeholders */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white/5 rounded-2xl aspect-[16/9] flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Immersive Experience Overview</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-[16/9] flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Technology Integration Process</span>
          </div>
        </div>
      </div>
    </div>
  );
}
