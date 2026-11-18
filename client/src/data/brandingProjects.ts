// Content for the branding case studies rendered by pages/BrandingCaseStudy.tsx.
// Paragraph text may contain [label](url) links.

import esmeralda2026 from "./edgeCity2026.json";

export interface BrandImage {
  /** A file name inside the project's image folder, or an absolute path starting with "/". */
  file: string;
  width: number;
  height: number;
  alt: string;
}

export interface BrandSection {
  heading: string;
  paragraphs: string[];
  images: BrandImage[];
  /** Optimized .mp4 clips with a .webp poster frame, in the project's image folder. */
  videos?: { file: string; poster: string; width: number; height: number; label: string }[];
  /** "stack" shows one per row; "grid" two per row; "row" three per row, even on phones. */
  layout?: "stack" | "grid" | "row";
  caption?: string;
}

export interface BrandProject {
  id: string;
  title: string;
  role: string;
  intro: string[];
  sections: BrandSection[];
  links: { title: string; detail: string; url: string }[];
  /** Where the back link goes; defaults to the Work page. */
  back?: { href: string; label: string };
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

  "edge-city-posters": {
    id: "edge-city-posters",
    title: "Edge City Posters",
    role: "Illustration · Art Direction",
    intro: [
      "I work closely with the [Edge City](https://edgecity.live/) team to create these assets. Each one is an original concept that portrays a partner, a sponsor, or a themed track: a series of events at an Edge City gathering.",
      "Before taking on any brief, I trained a custom style in Midjourney and a LoRA on Stable Diffusion, so every piece shares one visual language. For each asset, I define the concept, generate options in Midjourney or Stable Diffusion, select the result that fits best, and finish it with editing and polish in Adobe Firefly.",
    ],
    sections: [
      {
        heading: "Edge Esmeralda 2026",
        paragraphs: [
          "A collection of posters for [Edge Esmeralda 2026](https://www.edgeesmeralda.com/), a month-long gathering bringing people from technology, science, culture, and community together to prototype a brighter future. The illustrations imagine worlds where nature, discovery, and everyday life grow together.",
        ],
        images: esmeralda2026
          .filter(poster => !poster.src.includes("-portrait"))
          .map(poster => ({ file: poster.src, width: poster.width, height: poster.height, alt: poster.alt })),
        layout: "grid",
      },
      {
        heading: "Sponsors & Partners",
        paragraphs: ["Artwork for the sponsors and partners of Edge City, each built around what the organisation stands for."],
        images: ["Uniswap", "SaunaDAO", "Protocol_Labs", "Metamask", "Lisk", "Gensyn", "Eigenlayer", "CyberFund", "Arbitrum"].map(name => ({
          file: `/images/case-studies/edge-city/partners/Sponsor_16x9_${name}.jpg`,
          width: 1920,
          height: 1095,
          alt: `Edge City sponsor artwork — ${name.replace(/_/g, " ")}`,
        })),
        layout: "grid",
      },
      {
        heading: "Themed Tracks",
        paragraphs: ["Art for the themed tracks of [Edge Esmeralda 2025](https://edgeesmeralda.com/), giving each week of programming its own visual anchor."],
        images: [
          ["ee25_16x9_Agrivision_Agtech Week.jpg", "Agrivision Agtech Week"],
          ["ee25_16x9_Art on the Edge 0.jpg", "Art on the Edge"],
          ["ee25_16x9_Cities of Tomorrow1.jpg", "Cities of Tomorrow"],
          ["ee25_16x9_Consciousness_Week.webp", "Consciousness Week"],
          ["ee25_16x9_Cosmos_Institute.webp", "Cosmos Institute"],
          ["ee25_16x9_Decentralized_AI_2.jpg", "Decentralized AI"],
          ["ee25_16x9_HealthTrack.jpg", "Health Track"],
          ["ee25_16x9_LongJourney.webp", "Long Journey"],
          ["ee25_16x9_Protocol_Worlds.webp", "Protocol Worlds"],
          ["ee25_16x9_Revitalizing American Economies.jpg", "Revitalizing American Economies"],
          ["ee25_16x9_Roots_of_Progress.webp", "Roots of Progress"],
          ["ee25_16x9_Tomorrowland.jpg", "Tomorrowland"],
        ].map(([file, name]) => ({
          file: `/images/case-studies/edge-city/ee25_programassets/${file}`,
          width: 1920,
          height: 1080,
          alt: `Edge Esmeralda 2025 track artwork — ${name}`,
        })),
        layout: "grid",
      },
      {
        heading: "Decorative Art",
        paragraphs: ["Program assets printed to decorate the spaces at [Edge Esmeralda 2025](https://edgeesmeralda.com/)."],
        images: [1, 3, 4, 5, 6, 8, 9, 10].map(index => ({
          file: `/images/case-studies/edge-city/ee25_additionalassets/wallart${index}.jpg`,
          width: 1556,
          height: 1038,
          alt: `Edge Esmeralda 2025 wall art ${index}`,
        })),
        layout: "grid",
      },
    ],
    links: [
      { title: "Edge City", detail: "edgecity.live", url: "https://edgecity.live/" },
      { title: "Edge Esmeralda", detail: "edgeesmeralda.com", url: "https://www.edgeesmeralda.com/" },
      { title: "2026 Recap", detail: "Substack", url: "https://edgeesmeralda2026.substack.com/p/edge-esmeralda-2026-month-in-review" },
    ],
  },

  "sunflower-lab": {
    id: "sunflower-lab",
    title: "Sunflower Lab",
    role: "Co-founder · Land, Building & Community",
    back: { href: "/playground", label: "Back to Playground" },
    intro: [
      "[Sunflower Lab](https://www.sunflowerlab.xyz/) is a communal home at Bombay Beach, California, co-owned by a sub-community of Mars College. Our vision for this land is to curate healthy communal living, experiment with art, live a Solarpunk lifestyle, and have fun ^_^",
      "I bought the land in 2023 and lived there for two seasons. We used the space for creative work, ran residencies and retreats, and hosted many dinners and brunches.",
    ],
    sections: [
      {
        heading: "The Fence",
        paragraphs: [
          "Will Simons and I installed the fence around the land ([see the reel](https://www.instagram.com/p/C6FZntqJ2L9/)). I built it from up-cycled CNC off-cuts, turning leftover material into a colourful, patterned wall.",
        ],
        images: [
          wide("fence-1.webp", "The Sunflower Lab fence, built from colourful CNC off-cuts, at dusk", 2000, 1500),
          wide("fence-2.webp", "Close-up of the patterned CNC off-cut fence in yellow, black and blue", 2000, 1500),
        ],
        layout: "grid",
      },
      {
        heading: "The Flower Stool",
        paragraphs: [
          "I learned to design and cut furniture on a CNC machine, starting with this flower stool: a scalloped seat on slot-together legs, painted pink and red.",
        ],
        images: [wide("flower-stool.webp", "A pink and red flower-shaped stool made with a CNC machine, standing on desert ground", 772, 1029)],
        layout: "grid",
      },
      {
        heading: "Life at Sun Lab",
        paragraphs: ["Residencies, retreats, creative work, and long communal meals. See more in the [photo album](https://photos.google.com/share/AF1QipMQep_GNYUAcdQ_KGWHnBV-kLiWOR-7xIRGoll3pFUzMHpiswCg99axMSJSE1Z0TQ?key=b1RVNXlPVG5GbkVTUE5qVkNPcXVaQjVreVNzVXFR)."],
        images: [
          wide("pink-trailer.webp", "The pink trailer at Sunflower Lab under a blue desert sky", 2000, 1500),
          wide("zen-cabin.webp", "The wooden Zen Cabin at Sunflower Lab", 2000, 1500),
          wide("friends.webp", "Friends relaxing in front of the fence at Sunflower Lab", 2000, 1125),
          wide("gate.webp", "The red gate at the entrance to Sunflower Lab", 1504, 844),
        ],
        layout: "grid",
      },
    ],
    links: [
      { title: "Sunflower Lab", detail: "sunflowerlab.xyz", url: "https://www.sunflowerlab.xyz/" },
      { title: "Photo Album", detail: "Google Photos", url: "https://photos.google.com/share/AF1QipMQep_GNYUAcdQ_KGWHnBV-kLiWOR-7xIRGoll3pFUzMHpiswCg99axMSJSE1Z0TQ?key=b1RVNXlPVG5GbkVTUE5qVkNPcXVaQjVreVNzVXFR" },
      { title: "Building the Fence", detail: "Instagram", url: "https://www.instagram.com/p/C6FZntqJ2L9/" },
    ],
  },

  "fire-spinning": {
    id: "fire-spinning",
    title: "Fire Spinning",
    role: "Flow Art · Performance",
    back: { href: "/playground", label: "Back to Playground" },
    intro: [
      "I started practising flow art as a hobby during Covid in 2022. Since then, I have found a lovely community of flow artists in LA and all over the world.",
      "Fire spinning is one of my favourite hobbies. I love dancing with the physics of the flow toy, literally playing with fire, and the community that has grown around it.",
    ],
    sections: [
      {
        heading: "Photos",
        paragraphs: [],
        images: [1, 2, 3].map(index => ({ file: `photo-${index}.webp`, width: 960, height: 1280, alt: `Nico spinning fire on stage at night, photo ${index}` })),
        layout: "row",
      },
      {
        heading: "Videos",
        paragraphs: [],
        images: [],
        videos: [
          { file: "video-1.mp4", poster: "video-1-poster.webp", width: 464, height: 848, label: "Fire spinning performance in front of a stage at night" },
          { file: "video-2.mp4", poster: "video-2-poster.webp", width: 480, height: 640, label: "Fire staff spinning at dusk" },
        ],
        layout: "row",
      },
    ],
    links: [],
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
