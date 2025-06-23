const socialLinks = [
  { name: "X", href: "http://x.com/syntonikka/" },
  { name: "Substack", href: "https://agartha1.substack.com/" },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com/add/nicooo9999?locale=en-US",
  },
  { name: "Instagram", href: "https://www.instagram.com/syntonikka" },
  {
    name: "Resume",
    href: "https://docs.google.com/document/d/10kNPjpL49cTcRf7B8hNdjXJYIqILHR2f4fmwjf1KR_Y/edit?usp=sharing",
  },
];

export default function Info() {
  return (
    <div
      className="min-h-screen mx-auto flex flex-col justify-center"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="mb-12">
        <div className="mb-8"></div>

        <div className="mb-8">
          <p className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
            Magic happens when{" "}
            <span className="italic font-light text-gray-800 dark:text-white">
              Raw Intuitive Human Creativity
            </span>{" "}
            meets
            <span className="italic font-light text-gray-800 dark:text-white">
              {" "}
              Cutting-Edge Frontier Technology
            </span>
            .
          </p>
        </div>

        {/* Scrollable content section */}
        <div className="max-h-96 overflow-y-auto content-block p-6">
          <div className="space-y-4" style={{ color: "var(--text-muted)" }}>
            <h3
              className="text-lg font-medium mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Design Philosophy
            </h3>
            <p>
              I believe great designs should be both intellectually stimulating
              and emotionally resonant. My work explores the intersection of
              technology and humanity—--always asking how we can use design to
              create more flourishing futures.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              Creative Process
            </h3>
            <p>
              My process begins with deep research and a thorough understanding
              of the problem space. Collaboration is key---I work closely with
              clients, partners, and other creatives to ensure the final outcome
              aligns with the mission and exceeds expectations.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              Staying at the Cutting Edge
            </h3>
            <p>
              I’m passionate about emerging technologies like AI, XR, and
              immersive experiences. These tools are not just technical
              solutions but also new languages for creative expression. I stay
              at the forefront of these developments to bring cutting-edge
              capabilities to every project.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              A Creative Lifestyle
            </h3>
            <p>
              Inspiration comes from everywhere - nature, science, technology,
              magical gatherings, archetypical stories, meditation and peak
              experiences, diverse cultures...
              <br />
              I'm always immersed in narratives that inspire new forms of art,
              and 'ways of being' in flourishing environments.
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-md">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-center py-2 hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
