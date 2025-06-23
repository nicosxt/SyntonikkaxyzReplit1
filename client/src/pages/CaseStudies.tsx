import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";
import { caseStudiesData } from "../data/caseStudies";

export default function CaseStudies() {
  const { isLoaded, getAnimationClasses } = usePageAnimation({ delay: 200 });

  return (
    <div
      className="min-h-screen mx-auto"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="">
        <h1 className={`p-4 text-3xl md:text-4xl font-light mb-12 text-gray-800 dark:text-white transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          Case Studies
        </h1>

        <div className="space-y-[100px]">
          {caseStudiesData.map((caseStudy, index) => {
            const animationProps = getAnimationClasses(index + 1, 'slide-in-up');
            return (
              <Link key={caseStudy.id} href={caseStudy.link}>
                <div 
                  className={`content-block p-8 hover:opacity-80 cursor-pointer mt-[50px] mb-[50px] hover:scale-105 transition-all duration-300 ${animationProps.className}`}
                  style={animationProps.style}
                >
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
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          ROLE:
                        </p>
                        <p className="text-gray-800 dark:text-white">
                          {caseStudy.role}
                        </p>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
