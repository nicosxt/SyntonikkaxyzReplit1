const caseStudies = [
  {
    id: 1,
    title: "Case Study: Edge City",
    description: "A comprehensive branding project focusing on creating a futuristic identity that bridges physical and digital experiences.",
    tags: ["Brand Identity", "Digital Design", "XR Integration"],
  },
  {
    id: 2,
    title: "Case Study: Neural Networks",
    description: "An immersive art installation exploring the intersection of AI and human creativity through interactive experiences.",
    tags: ["AI Art", "Interactive Design", "Installation"],
  },
  {
    id: 3,
    title: "Case Study: Metaverse Pavilion",
    description: "A virtual reality experience design for a cutting-edge tech conference, creating immersive brand experiences.",
    tags: ["VR Design", "Event Design", "3D Modeling"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 md:px-8">
      {/* Left-aligned text section */}
      <div className="mb-12 text-left">
        <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
          Nico Shi{" "}
          <span className="text-3xl md:text-4xl font-light text-gray-300 block mt-2">
            is a multi-disciplinary designer building{" "}
            <span className="italic font-light text-white">Protopian</span>
            {" "}brands with AI, XR, and immersive art.
          </span>
        </h1>
      </div>

      {/* Layered Case Studies */}
      <div className="relative w-full max-w-4xl" style={{ perspective: '1000px' }}>
        {caseStudies.map((study, index) => (
          <div
            key={study.id}
            className="absolute w-full transition-all duration-500 ease-out"
            style={{
              transform: `
                translateY(${index * 15}px) 
                translateX(${index * 8}px) 
                rotateX(${index * 2}deg) 
                rotateY(${index * 1}deg)
                scale(${1 - index * 0.05})
              `,
              opacity: index === 0 ? 1 : Math.max(0.3, 0.8 - (index * 0.25)),
              zIndex: caseStudies.length - index,
              filter: index > 0 ? `blur(${index * 0.5}px)` : 'none',
            }}
          >
            <div 
              className="bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 min-h-[400px] backdrop-blur-sm"
              style={{
                backgroundColor: index > 0 ? `rgba(255, 255, 255, ${0.05 - index * 0.01})` : 'rgba(255, 255, 255, 0.05)',
                borderColor: index > 0 ? `rgba(255, 255, 255, ${0.2 - index * 0.05})` : 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-light mb-4">
                  {study.title}
                </h2>
                <div className="text-gray-400 text-lg">
                  <p className="mb-4">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer to maintain layout */}
        <div className="invisible">
          <div className="bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 min-h-[400px]">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-4">
                Case Study: Edge City
              </h2>
              <div className="text-gray-400 text-lg">
                <p className="mb-4">
                  A comprehensive branding project focusing on creating a futuristic identity 
                  that bridges physical and digital experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Brand Identity</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Digital Design</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">XR Integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
