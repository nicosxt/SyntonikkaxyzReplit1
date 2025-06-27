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
      className="min-h-screen mx-auto flex flex-col"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="p-8 md:p-12">
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

        {/* Full width hero image */}
        <div className="mb-8">
          <ClickableImage
            src="/images/case-studies/edge-city/edge2.0-branding.jpg"
            alt="Edge City branding example"
            className="bg-white/5 rounded-2xl aspect-video w-full flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
        </div>

        {/* Description paragraph */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <a href="https://edgecity.live" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-white hover:opacity-70 transition-opacity underline">Edge City</a> is a society incubator that hosts month-long pop-up city
            style un-conferences all around the world, innovating on the way
            people learn, work, live, and gather.
            <br />
            The 4 pillars of Edge City Ethos are:
            <ul>
              <li>• Co-creation</li>
              <li>• Multidisciplinary</li>
              <li>• Default Healthy</li>
              <li>• Multi-generational</li>
            </ul>
            Working in this fast-growing start-up, I have to design assets on the fly when demands come in.
            To make sure I can deliver a cohesive brand identity, I started off by exploring visual directions with
            moodboarding and researching the Edge City philosophy. I also worked closely with the team to define a visual direction, and design assets on the fly when demands come in.
            <br />
          </p>
        </div>

        {/* Horizontal branding images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ClickableImage
            src="/images/case-studies/edge-city/edgecity-branding1.jpg"
            alt="Edge City Branding Moodboard 1"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecity-branding2.jpg"
            alt="Edge City Branding Philosophy"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecity-branding3.jpg"
            alt="Edge City Visual Identity"
            className="bg-white/5 rounded-2xl h-64 flex-shrink-0 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          />
        </div>

        {/* Branding Assets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ClickableImage
            src="/images/case-studies/edge-city/branding_floatingislands.jpg"
            alt="Floating Islands"
            placeholderText="Floating Islands"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/branding_textures.jpg"
            alt="Textures"
            placeholderText="Textures"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecity-assets.jpg"
            alt="Textures"
            placeholderText="Textures"
          />
        </div>

        {/* Additional text section */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Understanding and resonating deeply with Edge City's brand philosophy. I work closely
            with the team to design landing images as visual anchors for each event & partner.
            <br />
            Landing pages for Edge City programs:
          </p>
        </div>

        {/* 2x2 grid of placeholder images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ClickableImage
            src="/images/case-studies/edge-city/edgeesmeralda-landing.jpg"
            alt="Edge Esmeralda Landing Page"
            placeholderText="Edge Esmeralda"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecityweb_cover.jpg"
            alt="Edge City Web Cover"
            placeholderText="Edge City Web Cover"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecitybhutan.jpg"
            alt="Edge City Bhutan"
            placeholderText="Edge City Bhutan"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecitypatagonia.jpg"
            alt="Edge City Patagonia"
            placeholderText="Edge City Patagonia"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecity_hackquest.jpg"
            alt="Edge City Bhutan"
            placeholderText="Edge City Bhutan"
          />
          <ClickableImage
            src="/images/case-studies/edge-city/edgecity_article_landing.jpg"
            alt="Edge City Bhutan"
            placeholderText="Edge City Bhutan"
          />
        </div>

        {/* Description paragraph */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Over time, I've developed a custom creative pipeline to ship cohesive assets on demand.
            <br />
            The tools I use includes: Photoshop, Figma, Midjourney, ChatGPT, and Stable Diffusion.
          </p>
        </div>

        {/* Partners Grid Section */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Assets for Sponsors & Partners of Edge City:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_Uniswap.jpg"
              alt="Uniswap Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_SaunaDAO.jpg"
              alt="SaunaDAO Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_Protocol_Labs.jpg"
              alt="Protocol Labs Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_Metamask.jpg"
              alt="Metamask Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_Lisk.jpg"
              alt="Lisk Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_Gensyn.jpg"
              alt="Gensyn Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_Eigenlayer.jpg"
              alt="Eigenlayer Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_CyberFund.jpg"
              alt="CyberFund Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/partners/Sponsor_16x9_Arbitrum.jpg"
              alt="Arbitrum Sponsor"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Program Assets Grid Section */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Art for themed tracks for <a href = "https://edgeesmeralda.com" className="underline">Edge Esmeralda 2025</a>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Agrivision_Agtech Week.jpg"
              alt="Agrivision Agtech Week"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Art on the Edge 0.jpg"
              alt="Art on the Edge"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Cities of Tomorrow1.jpg"
              alt="Cities of Tomorrow"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Consciousness_Week.png"
              alt="Consciousness Week"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Cosmos_Institute.png"
              alt="Cosmos Institute"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Decentralized_AI_2.jpg"
              alt="Decentralized AI"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_HealthTrack.jpg"
              alt="HealthTrack"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_LongJourney.png"
              alt="Long Journey"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Protocol_Worlds.png"
              alt="Protocol Worlds"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Revitalizing American Economies.jpg"
              alt="Revitalizing American Economies"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Roots_of_Progress.png"
              alt="Roots of Progress"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_programassets/ee25_16x9_Tomorrowland.jpg"
              alt="Tomorrowland"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* EE25 Additional Assets Grid Section */}
        <div className="mb-6">
          <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-6">
          Program assets for space decoration at <a href = "https://edgeesmeralda.com" className="underline">Edge Esmeralda 2025</a>:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart1.jpg"
              alt="Wall Art 1"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart3.jpg"
              alt="Wall Art 3"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart4.jpg"
              alt="Wall Art 4"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart5.jpg"
              alt="Wall Art 5"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart6.jpg"
              alt="Wall Art 6"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart8.jpg"
              alt="Wall Art 8"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart9.jpg"
              alt="Wall Art 9"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/edge-city/ee25_additionalassets/wallart10.jpg"
              alt="Wall Art 10"
              className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Additional References */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">
            PROJECT LINKS:
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

      </div>
    </div>
  );
}
