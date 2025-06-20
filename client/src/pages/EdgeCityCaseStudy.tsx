import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { getCaseStudyById } from "../data/caseStudies";
import ClickableImage from "../components/ClickableImage";

export default function EdgeCityCaseStudy() {
  const caseStudy = getCaseStudyById("edge-city");

  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return (
    <div
      className="min-h-screen max-w-4xl mx-auto flex flex-col"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
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
            <span
              key={tag}
              className="px-3 py-1 bg-black/10 dark:bg-white/10 rounded-full text-sm text-gray-800 dark:text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Role */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
            ROLE:
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{caseStudy.role}</p>
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">
            EXAMPLES:
          </h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            {caseStudy.examples.map((example, index) => (
              <p key={index}>
                {example.url ? (
                  <a
                    href={example.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-white hover:opacity-70 transition-opacity underline"
                  >
                    {example.text}
                  </a>
                ) : (
                  example.text
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Full width hero image */}
        <div className="mb-8">
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edge2.0-branding.jpg"
            alt="Edge City branding example"
            className="bg-white/5 rounded-2xl aspect-video w-full flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
        </div>

        {/* Description paragraph */}
        <div className="mb-12">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Edge City is a society incubator that hosts month-long pop-up city
            style un-conferences all around the world, innovating on the way
            people learn, work, live and gather together.
          </p>
        </div>

        {/* 2x2 grid of placeholder images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edgeesmeralda-landing.jpg"
            alt="Edge Esmeralda Landing Page"
            placeholderText="Edge Esmeralda"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edgecitybhutan.jpg"
            alt="Edge City Bhutan"
            placeholderText="Edge City Bhutan"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edgecitypatagonia.jpg"
            alt="Edge City Patagonia"
            placeholderText="Edge City Patagonia"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edgecityweb_cover.jpg"
            alt="Edge City Web Cover"
            placeholderText="Edge City Web Cover"
          />
        </div>

        {/* Additional text section */}
        <div className="mb-12">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Working in this fast-growing start-up, my role is to help define a
            visual direction, and design assets on the fly when demands come in.
            I started off by exploring visual directions early on with
            moodboarding and researching the Edge City philosophy.
          </p>
        </div>

        {/* Horizontal branding images */}
        <div className="flex gap-6 mb-12 overflow-x-auto">
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edgecity-branding1.jpg"
            alt="Edge City Branding Moodboard 1"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edgecity-branding2.jpg"
            alt="Edge City Branding Philosophy"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/edgecity-branding3.jpg"
            alt="Edge City Visual Identity"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
        </div>

        {/* Description paragraph */}
        <div className="mb-12">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Over time, I’ve developed a custom pipeline with various AI tools of shipping assets on demand that are cohesive within the brand identity.
          </p>
        </div>

        {/* Horizontal scroll - Edge Esmeralda 2025 images */}
        <div className="flex gap-6 mb-12 overflow-x-auto">
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/ee25_children.jpg"
            alt="Edge Esmeralda 2025 - Children"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/ee25_dacc.jpg"
            alt="Edge Esmeralda 2025 - DACC"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/ee25_decentralized-ai.jpg"
            alt="Edge Esmeralda 2025 - Decentralized AI"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/ee25_governance-games.jpg"
            alt="Edge Esmeralda 2025 - Governance Games"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/ee25_ignite-talks.jpg"
            alt="Edge Esmeralda 2025 - Ignite Talks"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/src/assets/images/case-studies/edge-city/ee25_neuro.jpg"
            alt="Edge Esmeralda 2025 - Neuro"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
        </div>

        
      </div>
    </div>
  );
}
