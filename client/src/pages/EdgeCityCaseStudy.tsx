import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { getCaseStudyById } from "../data/caseStudies";

export default function EdgeCityCaseStudy() {
  const caseStudy = getCaseStudyById("edge-city");
  
  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

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

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-light mb-4 text-gray-800 dark:text-white">
          {caseStudy.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {caseStudy.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-black/10 dark:bg-white/10 rounded-full text-sm text-gray-800 dark:text-white">
              {tag}
            </span>
          ))}
        </div>

        {/* Role */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">ROLE:</h3>
          <p className="text-gray-600 dark:text-gray-400">{caseStudy.role}</p>
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">EXAMPLES:</h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            {caseStudy.examples.map((example, index) => (
              <p key={index}>{example}</p>
            ))}
          </div>
        </div>

        {/* Image placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Image Placeholder 1</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Image Placeholder 2</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Image Placeholder 3</span>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
            <span className="text-gray-500">Image Placeholder 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}