export interface CaseStudyExample {
  text: string;
  url?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  tags: string[];
  examples: CaseStudyExample[];
  link: string;
  preview: string;
  previewImage?: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "edge-city",
    title: "CASE STUDY: EDGE CITY",
    role: "Brand Designer",
    tags: ["#Branding", "#Graphics"],
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
    previewImage:
      "/src/assets/images/case-studies/edge-city/edge2.0-branding.jpg",
    link: "/case-studies/edge-city",
  },
  {
    id: "agartha",
    title: "CASE STUDY: AGARTHA",
    role: "Founder",
    tags: ["#Branding", "#Design"],
    examples: [
      { text: "agartha.one", url: "https://agartha.one" },
      { text: "Grid Free Minds" },
    ],
    preview: "agartha.one",
    link: "/case-studies/agartha",
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudiesData.find((study) => study.id === id);
};
