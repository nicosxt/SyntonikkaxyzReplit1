import type { ReactNode } from "react";
import { usePageAnimation } from "../hooks/usePageAnimation";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 dark:text-white underline underline-offset-4 decoration-current/40 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
    >
      {children}
    </a>
  );
}

export default function Info() {
  const { isLoaded } = usePageAnimation({ delay: 200 });

  return (
    <article
      className={`max-w-3xl mx-auto py-12 md:py-20 space-y-12 text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 transition-all duration-700 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <header className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white">
          Welcome to My World.
        </h1>
        <figure className="space-y-4">
          <img
            src="/images/about/nico.jpg"
            alt="Nico smiling and holding a chicken outdoors."
            width={1126}
            height={1134}
            decoding="async"
            className="w-4/5 max-w-[25.6rem] aspect-square object-cover rounded-full"
          />
          <figcaption>Hi, I'm Nico :)</figcaption>
        </figure>
        <p>
          I see brands, businesses, and communities as worlds of their own. I bring
          life and love to mission-aligned projects, helping people visualize—and
          build—the futures they believe in.
        </p>
      </header>

      <section aria-labelledby="mission-heading" className="space-y-5">
        <h2 id="mission-heading" className="text-2xl font-medium text-gray-800 dark:text-white">
          My Mission
        </h2>
        <p>
          Agartha holds my vision for life in community, where nature, technology,
          spirituality, and art coexist, and ancient wisdom meets new possibilities.
        </p>
        <p>
          The north star for Agartha is a{" "}
          <ExternalLink href="https://agartha1.substack.com/p/what-is-a-solarpunk-campus"><strong>Solarpunk Campus</strong></ExternalLink>:
          a home for people across generations, cultures, and disciplines to
          create, grow, and share beautiful lives.
        </p>
        <p>
          Explore <ExternalLink href="https://agartha.one/">agartha.one</ExternalLink>{" "}
          or follow our journey on{" "}
          <ExternalLink href="https://agartha1.substack.com/">Substack</ExternalLink>.
        </p>
      </section>

      <section aria-labelledby="skills-heading" className="space-y-5">
        <h2 id="skills-heading" className="text-2xl font-medium text-gray-800 dark:text-white">
          My Skills
        </h2>
        <p>I build worlds people can live inside.</p>
        <p>
          My practice spans art, branding, world-building, gameplay engineering,
          creative writing, music, and community organizing. I see art as a way of
          being, bringing creativity to both technical challenges and human connections.
        </p>
        <p>
          My strength is connecting these disciplines: translating abstract ideas
          into visual stories, using AI as a creative tool, and shaping physical
          spaces that influence how we feel and gather. I’m drawn to the cultural
          meanings behind aesthetics—and to making people feel seen and heard.
        </p>
      </section>

      <section aria-labelledby="story-heading" className="space-y-5">
        <h2 id="story-heading" className="text-2xl font-medium text-gray-800 dark:text-white">
          My Story
        </h2>
        <p>
          I began my career making games and virtual worlds. In 2017, while still
          in school, I launched my first game,{" "}
          <ExternalLink href="https://apps.apple.com/us/app/chef-umami/id1230818349">Chef Umami</ExternalLink>,
          with <ExternalLink href="https://chefumami.com/">PINX Studio</ExternalLink>.
          It became one of Apple’s most downloaded new mobile games for weeks.
          I later taught Game Development at Parsons and followed{" "}
          <ExternalLink href="https://www.snapchat.com/@nicooo9999">my experiments with augmented reality</ExternalLink>{" "}
          to Los Angeles, where I joined Snapchat as an AR engineer.
        </p>
        <p>
          The work was playful and exciting, but I craved a deeper purpose beyond
          my bubble of frontier technology. In 2022, I shifted my focus toward the
          interconnected crises of our time—this inspired me to leave the XR
          industry to explore Solarpunk communities.
        </p>
        <p>
          The journey began at{" "}
          <ExternalLink href="https://supernuclear.substack.com/p/case-study-mars-college">Mars College</ExternalLink>,
          an off-grid community of artists, technologists, and punks. It introduced
          me to intentional living, regeneration, and Solarpunk: a hopeful vision
          of life with nature and technology.
        </p>
        <p>
          I spent the following years visiting 30+ intentional communities around
          the world—<ExternalLink href="https://www.smart-village-network.eu/members/community/aardehuis-ecovillage">an Earthship village in the Netherlands</ExternalLink>,{" "}
          a <ExternalLink href="https://supernuclear.substack.com/p/case-study-agape">co-living home in San Francisco</ExternalLink>,{" "}
          <ExternalLink href="https://traditionaldreamfactory.com/">Traditional Dream Factory</ExternalLink>{" "}
          in Portugal, <ExternalLink href="https://www.elpantano.org/">El Pantano</ExternalLink>{" "}
          in Argentina…
        </p>
        <p>
          Out of this exploration came{" "}
          <ExternalLink href="https://agartha.one/"><strong>Agartha</strong></ExternalLink>,
          a Solarpunk creative studio and global community. Through workshops,
          residencies, and creative world building, I have empowered a global
          group of people to work toward more meaningful and beautiful ways of living.
        </p>
      </section>

      <hr className="border-black/20 dark:border-white/20" />

      <footer className="space-y-6">
        <p>
          Outside the studio, I climb, lift, skate, compost, host gatherings,
          have adventures in nature, and read and live by Hermetic and Taoist philosophies.
        </p>
        <p>
          I believe creativity is a way of being. Through the act of creation,
          we are directly connecting to the source.
        </p>
        <blockquote className="border-l-2 border-black/30 dark:border-white/30 pl-6 py-2">
          <p className="italic text-xl text-gray-800 dark:text-white">
            “We are here to awaken from our illusion of separateness.”
          </p>
          <p className="mt-3 text-base">— Thích Nhất Hạnh</p>
        </blockquote>
        <p>
          Find me on <ExternalLink href="https://x.com/syntonikka">X</ExternalLink>,{" "}
          <ExternalLink href="https://www.instagram.com/syntonikka/">Instagram</ExternalLink>,{" "}
          and <ExternalLink href="https://agartha1.substack.com/">Substack</ExternalLink>.
        </p>
      </footer>
    </article>
  );
}
