import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { caseStudiesData } from "../data/caseStudies";

export default function CaseStudies() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto" style={{ marginLeft: '15%', marginRight: '15%' }}>
      <div className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-light mb-12 text-gray-800 dark:text-white">
          Case Studies
        </h1>

        <div className="space-y-[100px]">
          {caseStudiesData.map((caseStudy) => (
            <Link key={caseStudy.id} href={caseStudy.link}>
              <div className="content-block p-8 md:p-12 hover:opacity-80 transition-opacity cursor-pointer mt-[50px] mb-[50px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-800 dark:text-white">
                      {caseStudy.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-black/10 dark:bg-white/10 rounded-full text-sm text-gray-800 dark:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">ROLE:</p>
                      <p className="text-gray-800 dark:text-white">{caseStudy.role}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
                    {caseStudy.previewImage ? (
                      <img
                        src={caseStudy.previewImage}
                        alt={`${caseStudy.title} preview`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <span className="text-gray-500">Preview Image</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}