import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { getCaseStudyById } from "../data/caseStudies";
import ClickableImage from "../components/ClickableImage";

export default function AgarthaCaseStudy() {
  const caseStudy = getCaseStudyById("agartha");

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
          <a
            href="https://agartha.one/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full cursor-pointer bg-white/5 rounded-2xl aspect-video border border-white/10 hover:bg-white/10 transition-colors"
          >
            <img
              src="/images/case-studies/agartha/newweb_intro.gif"
              alt="Agartha web intro gif"
              className="w-full h-full object-cover rounded-2xl"
            />
          </a>
        </div>

        {/* Description paragraph */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Agartha was founded in 2022 at{" "}
            <a
              href="https://mars.college"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-white hover:opacity-70 transition-opacity underline"
            >
              Mars College
            </a>{" "}
            as a research project into holistic lifestyle solutions that address the interconnected global economical, ecological, existential crisis.
            <br />
            At the start, we released{" "}
            <a
              href="https://medium.com/@agartha.one/eco-villages-as-solutions-for-the-next-century-fe82f7535afb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-white hover:opacity-70 transition-opacity underline"
            >
              an article on eco villages as living solutions
            </a>{" "}
            for the next century.
          </p>
        </div>

        {/* Core Ethos Section */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">
            Core Ethos
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The core mission of Agartha is to support and connect local communities to curate lifestyles according to the following ethos:
          </p>
          
          <div className="mb-6">
            <ClickableImage
              src="/images/case-studies/agartha/agartha-ethos.png"
              alt="Agartha Ethos"
              className="bg-white/5 rounded-2xl w-full flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
              Building Protopias:
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              an active improvement of Status Quo, instead of a vision for perfection.
            </p>
            <ClickableImage
              src="/images/case-studies/agartha/protopia.png"
              alt="Protopia concept"
              className="bg-white/5 rounded-2xl w-full flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
              Starting from Within:
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              healthy individual cells compose a healthy body. We can only curate a flourishing world if individuals flourish.
            </p>
            <ClickableImage
              src="/images/case-studies/agartha/self_community_earth.jpg"
              alt="Self, Community, Earth"
              className="bg-white/5 rounded-2xl w-full flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Project Overview Section */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">
            Project Overview
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Soon after compiling research of these communities and personally visiting them, I launched Agartha.One, a map of Solarpunk communities intersecting art, ecology, and technology.
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
              Agartha.One Web Design, 2022:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ClickableImage
                src="/images/case-studies/agartha/web2022/01Page_About_New.jpg"
                alt="About Page"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
              <ClickableImage
                src="/images/case-studies/agartha/web2022/02Page_CommunityProfile.jpg"
                alt="Community Profile Page"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
              <ClickableImage
                src="/images/case-studies/agartha/web2022/03Page_Map.jpg"
                alt="Map Page"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
              <ClickableImage
                src="/images/case-studies/agartha/web2022/04.jpg"
                alt="Additional Page"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Beyond the map, Agartha is an invite to a new regenerative and communal culture, with a branding image that infuses a sense of balance, vibrance and joy.
            <br />
            I chose dark blue, pink, and a variant of rainbow gradient colors to create a mystical, technical, and playful brand identity.
          </p>

          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ClickableImage
                src="/images/case-studies/agartha/pitch2022/pitch_2022_01.png"
                alt="Pitch 2022 01"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
              <ClickableImage
                src="/images/case-studies/agartha/pitch2022/pitch_2022_02.png"
                alt="Pitch 2022 02"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
              <ClickableImage
                src="/images/case-studies/agartha/pitch2022/pitch_2022_03.png"
                alt="Pitch 2022 03"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
              <ClickableImage
                src="/images/case-studies/agartha/pitch2022/pitch_2022_04.png"
                alt="Pitch 2022 04"
                className="bg-white/5 rounded-2xl aspect-video border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-row gap-6 justify-center">
            <ClickableImage
              src="/images/case-studies/agartha/about/2022_pitch_long-1.jpg"
              alt="2022 Pitch Long 1"
              className="bg-white/5 rounded-2xl h-96 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/about/2022_pitch_long-2.jpg"
              alt="2022 Pitch Long 2"
              className="bg-white/5 rounded-2xl h-96 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/about/2022_pitch_long-3.jpg"
              alt="2022 Pitch Long 3"
              className="bg-white/5 rounded-2xl h-96 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>

        </div>

        {/* Brand Identity Explorations */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">
            Brand Identity Explorations
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Here are a range of graphic designs & 3D scenes as Brand Identity explorations for Agartha:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <ClickableImage
              src="/images/case-studies/agartha/graphics/01.png"
              alt="Graphics 01"
              className="bg-white/5 rounded-2xl h-128 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/graphics/02.png"
              alt="Graphics 02"
              className="bg-white/5 rounded-2xl h-128 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/graphics/03.jpg"
              alt="Graphics 03"
              className="bg-white/5 rounded-2xl h-128 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/graphics/04.jpg"
              alt="Graphics 04"
              className="bg-white/5 rounded-2xl h-128 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/graphics/05.png"
              alt="Graphics 05"
              className="bg-white/5 rounded-2xl h-128 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/graphics/06.png"
              alt="Graphics 06"
              className="bg-white/5 rounded-2xl h-128 w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Event & Retreat Designs */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Here are examples of Agartha workshops and retreats Posters:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ClickableImage
              src="/images/case-studies/agartha/events/2022_moos.JPG"
              alt="2022 Moos Event"
              className="bg-white/5 rounded-2xl w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/events/2024_protopian_retreat1.jpg"
              alt="2024 Protopian Retreat 1"
              className="bg-white/5 rounded-2xl w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
            <ClickableImage
              src="/images/case-studies/agartha/events/2024_protopian_retreat2.jpg"
              alt="2024 Protopian Retreat 2"
              className="bg-white/5 rounded-2xl w-auto object-contain border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Agartha continues to evolve in the form of research released at the <a href="https://agartha1.substack.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-white hover:opacity-70 transition-opacity underline">Grid Free Minds newsletter.</a> :)
          </p>
          <div className="flex justify-center">
            <a
              href="https://agartha1.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer hover:opacity-70 transition-opacity"
            >
              <img
                src="/images/case-studies/agartha/grid_free_minds.png"
                alt="Grid Free Minds"
                className="bg-white/5 rounded-2xl w-auto object-contain border border-white/10"
              />
            </a>
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
