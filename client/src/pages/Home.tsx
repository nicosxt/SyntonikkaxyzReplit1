export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
          <span className="block">Nico Shi</span>
          <span className="text-2xl md:text-3xl font-light text-gray-300">
            is a multi-disciplinary designer building{" "}
          </span>
          <span className="italic font-light">Protopian</span>
          <span className="text-2xl md:text-3xl font-light text-gray-300">
            {" "}brands with AI, XR, and immersive art.
          </span>
        </h1>
      </div>

      {/* Featured Case Study Preview */}
      <div className="w-full max-w-2xl">
        <div className="bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 min-h-[400px] flex items-start">
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
  );
}
