import { Link } from "wouter";

const caseStudies = [
  {
    id: 1,
    title: "CASE STUDY: EDGE CITY",
    overview: "A comprehensive branding project for Edge City, focusing on creating a futuristic identity that bridges physical and digital experiences through innovative design systems.",
    tags: ["#Branding", "#Graphics"],
    role: "Brand Designer",
    link: "/case-studies/edge-city"
  },
  {
    id: 2,
    title: "Case Study: Neural Networks",
    overview: "An immersive art installation exploring the intersection of AI and human creativity through interactive digital experiences and machine learning algorithms.",
    tags: ["AI Art", "Interactive Design", "Installation"],
    role: "Creative Technologist",
    link: "#"
  },
  {
    id: 3,
    title: "Case Study: Metaverse Pavilion",
    overview: "A virtual reality experience design for a cutting-edge tech conference, creating immersive brand experiences in virtual spaces.",
    tags: ["VR Design", "Event Design", "3D Modeling"],
    role: "XR Designer",
    link: "#"
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto" style={{ marginLeft: '15%', marginRight: '15%' }}>
      <div className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-light mb-12 text-gray-800 dark:text-white">
          Case Studies
        </h1>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="content-block p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-800 dark:text-white">
                    {caseStudy.title}
                  </h2>
                  
                  <div className="mb-4">
                    <span className="text-lg text-gray-600 dark:text-gray-300">
                      ROLE: {caseStudy.role}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {caseStudy.overview}
                  </p>

                  {/* View Case Study Button */}
                  <Link href={caseStudy.link}>
                    <button 
                      className="inline-flex items-center gap-2 text-gray-800 dark:text-white hover:opacity-70 transition-opacity border border-white/20 px-4 py-2 rounded-lg"
                      disabled={caseStudy.link === "#"}
                    >
                      <span>View Case Study</span>
                      <span>→</span>
                    </button>
                  </Link>
                </div>

                {/* Preview Image */}
                <div className="bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
                  <span className="text-gray-500">Case Study Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}