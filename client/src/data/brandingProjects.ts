// Content for the branding case studies rendered by pages/BrandingCaseStudy.tsx.
// Paragraph text may contain [label](url) links.

export interface BrandImage {
  file: string;
  width: number;
  height: number;
  alt: string;
}

export interface BrandSection {
  heading: string;
  paragraphs: string[];
  images: BrandImage[];
  /** "stack" shows one image per row; "grid" shows two per row. */
  layout?: "stack" | "grid";
  caption?: string;
}

export interface BrandProject {
  id: string;
  title: string;
  role: string;
  intro: string[];
  sections: BrandSection[];
  links: { title: string; detail: string; url: string }[];
}

const wide = (file: string, alt: string, width = 2000, height = 1257): BrandImage => ({ file, width, height, alt });
const planet = (index: number, name: string): BrandImage => ({ file: `planets-${index}.webp`, width: 977, height: 1263, alt: `Mystik Soul Planets card — ${name}` });

export const brandingProjects: Record<string, BrandProject> = {
  constellation: {
    id: "constellation",
    title: "Constellation",
    role: "Brand Identity · Logo Design",
    intro: [
      "[Constellation](https://www.linkedin.com/company/constellation-neuro/) is building foundation models of human state: multimodal models that learn from brain and body signals to understand how people feel, focus, and change. The goal is to help treat mental illness and to align AI with the people it serves, with uses across neurotech, robotics, and anything that interacts with people.",
      "Constellation is built by Avery Krieger, a systems neuroscientist trained at Stanford and UPenn whose research spans flies, primates, and humans, from whole-brain predictive modeling to neuroprosthetic brain-computer interfaces. Avery is a serial founder with a long contemplative practice that brings meditation and neuroscience together.",
      "Together with Colton Orr, I designed the brand identity: the logo, app icon, and a visual world for the website.",
    ],
    sections: [
      {
        heading: "A Visual World for the Mind",
        paragraphs: [
          "The imagery sits between science and dream: surreal landscapes, clouds shaped like a brain, and quiet figures facing something larger than themselves. It makes an invisible subject, the inner state of a person, feel calm, human, and approachable.",
        ],
        images: [
          wide("final-1.webp", "Constellation website hero — a giant stone face with stars rising from its head", 2000, 1260),
          wide("final-2.webp", "Constellation website — a person facing a brain made of clouds", 2000, 1260),
          wide("final-3.webp", "Constellation Our Work section — a constellation brain over a night lake"),
          wide("final-4.webp", "Constellation Our Work section — a woman wearing an EEG cap made of light"),
        ],
      },
      {
        heading: "The Logo",
        paragraphs: [
          "A company’s logo is deeply personal for its founder. I chatted with Avery about his philosophy for Constellation, and the culture and artefacts that inspire him most. One of his obsessions is [Teenage Engineering](https://teenage.engineering/). When we talked about the logo, he wanted it to feel like a C, referencing brain neurons and electronic wiring diagrams, in the spirit of Teenage Engineering’s thin-line design ethos.",
          "After a few iterations, this is what we landed on. The mark draws a “C” as a constellation: points of light connected like neurons, sensors on a scalp, or stars across a night sky. It comes in a thin stroke for large sizes and a heavier stroke for app icons and favicons.",
        ],
        images: [
          wide("final-5.webp", "Constellation logo in white on black"),
          wide("final-6.webp", "Constellation logo with a blue gradient on black"),
          wide("final-7.webp", "Constellation logo over a night mountain landscape"),
          wide("final-8.webp", "Constellation app icon and favicon in light and dark"),
          wide("final-9.webp", "Constellation logo at large, medium and small sizes"),
        ],
      },
      {
        heading: "Process: Moodboard & Mockups",
        paragraphs: [
          "We explored two directions: mythical paintings, with surreal figures and clouds, and magical realism, with photographed skies and landscapes. The final identity brings the two together.",
        ],
        images: [
          wide("moodboard-1.webp", "Direction one — mythical paintings mockups", 1996, 1648),
          wide("moodboard-2.webp", "Direction two — magical realism mockups", 1744, 1740),
        ],
        layout: "grid",
      },
      {
        heading: "Process: Logo Design",
        paragraphs: [
          "The logo started from a list of inspirations: the brain, EEG sensors, brainwaves, stars, and the letter C. Hand sketches turned into a set of digital options before we landed on the constellation C.",
        ],
        images: [
          wide("logo-1.webp", "Logo inspirations — the brain, EEG sensors, brainwaves and stars", 1920, 1080),
          wide("logo-2.webp", "Hand-drawn logo sketches in a notebook", 1920, 1080),
          wide("logo-3.webp", "Digital logo sketches", 1920, 1080),
          wide("logo-4.webp", "Logo options explored before the final mark", 2000, 1138),
        ],
      },
    ],
    links: [
      { title: "Constellation", detail: "LinkedIn", url: "https://www.linkedin.com/company/constellation-neuro/" },
      { title: "Website", detail: "constellationlab.io", url: "https://www.constellationlab.io/" },
      { title: "Full Project", detail: "Behance", url: "https://www.behance.net/gallery/232206955/Constellation-Brand-Design" },
    ],
  },

  dialectica: {
    id: "dialectica",
    title: "Dialectica",
    role: "Brand Identity · Art Direction",
    intro: [
      "[Dialectica](https://dialectica.xyz/) is a shared pursuit of knowledge: a platform where people and AI agents ask questions, answer them, and challenge each other’s answers, building a public record of knowledge anyone can inspect. It comes from wh-ai, which is playing a long game for the intersection of superior intelligence and human flourishing.",
      "Together with Colton Orr, I designed the brand around its tagline: “Truth through tension, wisdom through interaction.”",
    ],
    sections: [
      {
        heading: "Finished Work",
        paragraphs: [
          "The name comes from the dialectic, the practice of finding truth through dialogue and disagreement. The visual world brings classical philosophy into the age of AI: marble thinkers in conversation, Greek columns, and fine geometric lines tracing networks of ideas across a deep blue sky.",
        ],
        images: [
          wide("final-1.webp", "Dialectica — two philosophers in conversation between columns", 2000, 1087),
          wide("final-2.webp", "Dialectica — a circle of seated marble thinkers", 2000, 1087),
          wide("final-3.webp", "Dialectica — a classical head breaking into geometric fragments", 2000, 1088),
          wide("final-4.webp", "Dialectica — a marble bust among clouds and columns", 2000, 1125),
          wide("final-5.webp", "Dialectica — philosophers seated beneath a geometric sky", 2000, 1125),
          wide("final-6.webp", "Dialectica — a thinker resting among glowing clouds", 2000, 1125),
        ],
      },
      {
        heading: "Elaborate & Clean Versions",
        paragraphs: [
          "The finished work comes in two versions: an elaborate one, layered with geometry and light, and a clean one for places where the type needs more room.",
        ],
        images: [
          wide("elaborate.webp", "Dialectica finished works — elaborate version", 2000, 808),
          wide("clean.webp", "Dialectica finished works — clean version", 2000, 808),
        ],
      },
      {
        heading: "Moodboards & Initial Drafts",
        paragraphs: [
          "Early ideas explored technical blueprints, sacred geometry, cosmic scenes, and Renaissance painting before settling on golden statues against a cosmic blue.",
        ],
        images: [
          wide("moodboard.webp", "Dialectica moodboard and backup ideas", 2000, 1604),
          wide("drafts.webp", "Dialectica initial drafts", 2000, 1137),
        ],
      },
      {
        heading: "Additional Assets",
        paragraphs: [],
        images: [wide("assets.webp", "Additional Dialectica image assets", 1800, 2010)],
      },
    ],
    links: [
      { title: "Dialectica", detail: "dialectica.xyz", url: "https://dialectica.xyz/" },
      { title: "Full Project", detail: "Behance", url: "https://www.behance.net/gallery/232207201/Dialectica-Branding" },
    ],
  },

  mystik: {
    id: "mystik",
    title: "Mystik",
    role: "Brand Identity · App Design · 2023–2024",
    intro: [
      "Mystik is an astrology app by Sheleana Aiyana, the founder of [Rising Woman](https://risingwoman.com/), with a focus on conscious relationship education.",
      "This is earlier work, from 2023 and 2024. The first part is the initial brand exploration; the second is Soul Planets, a series of cards made the following year.",
    ],
    sections: [
      {
        heading: "Initial Brand Exploration · 2023",
        paragraphs: [
          "The identity pairs soft landscapes, flowing textures, and sacred geometry with a quiet palette of lavender, slate, and cream. Valky sets the wordmark, with Avenir and Hiragino Mincho for reading. I carried the system through to a web landing page and app interfaces.",
        ],
        images: [
          wide("identity-1.webp", "Mystik wordmark", 1920, 1080),
          wide("identity-2.webp", "Mystik style reference — landscapes, textures and geometries", 1920, 1080),
          wide("identity-3.webp", "Mystik elementals — colors, fonts and icons", 1920, 1080),
          wide("identity-4.webp", "Mystik web landing page over a lavender sky", 1920, 1080),
          wide("identity-5.webp", "Mystik app interfaces", 1920, 1080),
        ],
      },
      {
        heading: "Soul Planets · 2024",
        paragraphs: [
          "Soul Planets is a series of cards, one for each planet, describing what it means to have it as your soul planet. Each card has its own color world and an ornament drawn from its character, with two words to sum it up: playful and spiritual for Jupiter, action and power for Mars.",
        ],
        images: [
          planet(1, "Jupiter"), planet(2, "Mars"), planet(3, "Mercury"), planet(4, "Neptune"), planet(5, "Pluto"),
          planet(6, "Saturn"), planet(7, "Sun"), planet(8, "Moon"), planet(9, "Uranus"), planet(10, "Venus"),
        ],
        layout: "grid",
      },
    ],
    links: [
      { title: "Brand Identity", detail: "Behance", url: "https://www.behance.net/gallery/181654123/Mystik-Astrology-App-Brand-Identity" },
      { title: "Soul Planets", detail: "Behance", url: "https://www.behance.net/gallery/201461497/Mystik-Soul-Planets" },
    ],
  },
};
