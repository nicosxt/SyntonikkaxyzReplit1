import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function EdgeCityCaseStudy() {
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
          CASE STUDY: EDGE CITY
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
            #Branding
          </span>
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
            #Graphics
          </span>
        </div>

        {/* Role */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">ROLE: Brand Designer</h2>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">EXAMPLES:</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>web & graphics design -- edgecity.live</p>
            <p>web & graphics design -- edgeesmeralda.com</p>
            <p>graphics design -- Edge City Media</p>
            <p>trailer video -- Edge Esmeralda trailer</p>
          </div>
        </div>

        {/* Image placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Edge City Website Design</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Brand Identity System</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Graphics & Marketing Materials</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Edge Esmeralda Trailer</span>
          </div>
        </div>

        {/* Additional image placeholders */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white/5 rounded-2xl aspect-[16/9] flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Project Overview Visual</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-[16/9] flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Design Process Documentation</span>
          </div>
        </div>
      </div>
    </div>
  );
}