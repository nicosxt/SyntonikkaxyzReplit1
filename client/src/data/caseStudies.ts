export interface CaseStudyExample {
  text: string;
  url?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  examples: CaseStudyExample[];
  link: string;
  preview: string;
  previewImage?: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "agartha-2026",
    title: "Agartha 2026",
    role: "Founder · Worldbuilding, Branding, Web Design",
    examples: [{ text: "agartha.one", url: "https://www.agartha.one/" }],
    preview: "agartha.one",
    previewImage: "/images/case-studies/agartha-2026/home-cover.webp",
    link: "/case-studies/agartha-2026",
  },
  {
    id: "chrysalis",
    title: "Chrysalis",
    role: "Founder · Brand Positioning, Storytelling, Web Design",
    examples: [{ text: "agartha.one/chrysalis", url: "https://agartha.one/chrysalis" }],
    preview: "agartha.one/chrysalis",
    previewImage: "/images/case-studies/chrysalis/cover.webp",
    link: "/case-studies/chrysalis",
  },
  {
    id: "edge-city-website-2026",
    title: "Edge City 2026",
    role: "Web Design · Motion",
    examples: [{ text: "edgecity.live", url: "https://edgecity.live/" }],
    preview: "edgecity.live",
    previewImage: "/images/case-studies/edge-city-website-2026/home-cover.webp",
    link: "/case-studies/edge-city-website-2026",
  },
  {
    id: "edge-city",
    title: "Edge City 2025",
    role: "Brand Designer",
    examples: [
      { text: "edgecity.live", url: "https://edgecity.live" },
      { text: "edgeesmeralda.com", url: "https://edgeesmeralda.com" },
      {
        text: "Edge Esmeralda Trailer",
        url: "https://x.com/ethereum/status/1927026215744889233",
      },
      { text: "Edge City Media", url: "https://www.edgecity.live/media" },
    ],
    preview: "edgecity.live",
    previewImage: "/images/case-studies/edge-city/edge2.0-branding.jpg",
    link: "/case-studies/edge-city",
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudiesData.find((study) => study.id === id);
};
