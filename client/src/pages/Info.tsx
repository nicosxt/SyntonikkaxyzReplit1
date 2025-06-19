const socialLinks = [
  { name: "X", href: "#" },
  { name: "Substack", href: "#" },
  { name: "Snapchat", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Resume", href: "#" },
];

export default function Info() {
  return (
    <div
      className="min-h-screen max-w-4xl mx-auto flex flex-col justify-center"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="mb-12">
        <div className="mb-8"></div>

        <div className="mb-8">
          <p
            className="text-xl mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            My approach to design is rooted in the belief that creativity and
            technology should work in harmony to create meaningful experiences
            that push boundaries and challenge conventional thinking.
          </p>
          <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>
            Below you'll find more detailed information about my design
            philosophy, creative process, and the experiences that have shaped
            my work.
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
              I believe in creating designs that are not just visually striking,
              but also intellectually stimulating and emotionally resonant. My
              work explores the intersection of technology and humanity, always
              asking how we can use design to create better futures.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              Creative Process
            </h3>
            <p>
              My process begins with deep research and understanding of the
              problem space. I then explore multiple conceptual directions
              before converging on solutions that are both innovative and
              practical. Collaboration is key - I work closely with clients,
              developers, and other creatives to ensure the final outcome
              exceeds expectations.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              Technology & Innovation
            </h3>
            <p>
              I'm passionate about emerging technologies like AI, XR, and
              immersive experiences. These tools aren't just technical solutions
              - they're new languages for creative expression. I stay at the
              forefront of these developments to bring cutting-edge capabilities
              to every project.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              Lifestyle & Inspiration
            </h3>
            <p>
              Inspiration comes from everywhere - art galleries, nature,
              conversations with interesting people, travel, and constant
              learning. I maintain a curious mindset and am always exploring new
              mediums, technologies, and ways of thinking about design problems.
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
