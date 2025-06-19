export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  tags: string[];
  examples: string[];
  link: string;
  preview: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "edge-city",
    title: "CASE STUDY: EDGE CITY",
    role: "Brand Designer",
    tags: ["#Branding", "#Graphics"],
    examples: [
      "web & graphics design -- edgecity.live",
      "web & graphics design -- edgeesmeralda.com",
      "graphics design -- Edge City Media",
      "trailer video -- Edge Esmeralda trailer"
    ],
    preview: "web & graphics design -- edgecity.live",
    link: "/case-studies/edge-city"
  },
  {
    id: "agartha",
    title: "CASE STUDY: AGARTHA",
    role: "Founder",
    tags: ["#Branding", "#Design"],
    examples: [
      "web & graphics design -- agartha.one",
      "graphics design -- Grid Free Minds"
    ],
    preview: "web & graphics design -- agartha.one",
    link: "/case-studies/agartha"
  }
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudiesData.find(study => study.id === id);
};