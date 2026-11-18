import type { ReactNode } from "react";
import { Link } from "wouter";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 dark:text-white underline underline-offset-4 decoration-current/40 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
    >
      {children}
    </a>
  );
}

export default function Info() {
  return (
    <article
      className="w-full md:w-[70vw] mx-auto py-12 md:py-20 space-y-12 text-body text-gray-600 dark:text-gray-300"
    >
      <header className="space-y-6">
        <figure className="space-y-4 text-center">
          <div className="mx-auto w-[48%] max-w-[15.36rem]">
          <img
            src="/images/about/profile.jpeg"
            alt="Nico wearing a bandana in a tiled courtyard."
            width={3024}
            height={4032}
            decoding="async"
            className="w-full aspect-square object-cover object-[50%_35%] rounded-full"
          />
          </div>
          <figcaption>Hi, I'm Nico :)</figcaption>
        </figure>
        <p className="text-heading font-medium text-gray-800 dark:text-white">I build worlds you can live inside of.</p>
        <p>I see brands, businesses, and communities as worlds of their own.</p>
        <p>
          I bring life and love to mission-aligned projects, helping people visualize—and
          build—the futures they believe in.
        </p>
        <p>
          My practice spans art, branding, world-building, gameplay engineering,
          creative writing, music, and community organizing. I see art as a way of
          being, bringing creativity to both technical challenges and human connections.
        </p>
      </header>

      <section aria-labelledby="story-heading" className="space-y-5">
        <h2 id="story-heading" className="text-heading font-medium text-gray-800 dark:text-white">
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
          a Solarpunk culture business I co-founded, now a global community and social
          movement. Through residencies, media, and community building, I have empowered
          a global group of people to work toward more meaningful and beautiful ways of living.
        </p>
      </section>

      <hr className="border-black/20 dark:border-white/20" />

      <footer className="space-y-6">
        <p>
          Outside the studio, I love to{" "}
          <ExternalLink href="https://soundcloud.com/syntonikka">DJ</ExternalLink>,{" "}
          <Link href="/case-studies/fire-spinning" className="text-gray-800 dark:text-white underline underline-offset-4 decoration-current/40 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm">spin fire</Link>,
          lift weights, compost, host parties, have adventures in nature, and read
          about mysticism, Taoism, sci-fi, and life design.
        </p>
        <p>
          Find me on <ExternalLink href="https://agartha1.substack.com/">Substack</ExternalLink>,{" "}
          <ExternalLink href="https://x.com/syntonikka">X</ExternalLink>,{" "}
          <ExternalLink href="https://www.instagram.com/syntonikka/">Instagram</ExternalLink>,{" "}
          and <ExternalLink href="https://soundcloud.com/syntonikka">SoundCloud</ExternalLink>.
        </p>
      </footer>
    </article>
  );
}
