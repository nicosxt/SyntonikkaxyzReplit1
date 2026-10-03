import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import ImageModal from '@/components/ImageModal';
import designs from '@/data/edgeCityWebsite2026.json';

const assetRoot = '/images/case-studies/edge-city-website-2026';
const animations = [
  { file: '01-loading-and-landing', title: 'Loading & landing', description: 'Clouds establish the atmosphere for the opening experience.' },
  { file: '02-scrolling-introduction', title: 'Scrolling introduction', description: 'The introduction unfolds against a sky backdrop, bringing the mission into focus.' },
  { file: '03-community-gallery', title: 'Community gallery', description: 'Images of people and places bring the community into the website’s visual story.' },
  { file: '04-village-timeline', title: 'Village timeline', description: 'Floating islands turn the village timeline into a landscape to explore.' },
];
type DesignImage = (typeof designs.finals)[number];

function AnimationPreview({ animation }: { animation: (typeof animations)[number] }) {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState<boolean | null>(null);
  const active = playing ?? !reducedMotion;
  const base = `${assetRoot}/animations/${animation.file}`;
  return (
    <figure>
      <img src={active ? `${base}.gif` : `${base}-still.webp`} alt={`${animation.title} — Edge City website animation`} width={960} height={602} loading="lazy" className="w-full h-auto rounded-sm" />
      <figcaption className="mt-4 flex items-start justify-between gap-4">
        <div><h3 className="text-lg">{animation.title}</h3><p className="mt-1 text-sm text-muted-foreground">{animation.description}</p></div>
        <button type="button" onClick={() => setPlaying(!active)} aria-label={`${active ? 'Pause' : 'Play'} ${animation.title} animation`} className="shrink-0 text-sm underline underline-offset-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{active ? 'Pause' : 'Play'}</button>
      </figcaption>
    </figure>
  );
}

export default function EdgeCityWebsite2026() {
  const [selected, setSelected] = useState<DesignImage | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Edge City Website 2026 — Nico Shi';
    return () => { document.title = previous; };
  }, []);

  function designImage(design: DesignImage) {
    return <figure key={design.src}>
      <button type="button" onClick={() => setSelected(design)} aria-label={`Enlarge ${design.title}`} className="block w-full cursor-zoom-in rounded-sm overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <img src={design.src} alt={`Edge City website — ${design.title}`} width={design.width} height={design.height} loading="lazy" decoding="async" className="w-full h-auto" />
      </button>
      <figcaption className="mt-3 text-sm text-muted-foreground">{design.title}</figcaption>
    </figure>;
  }

  return (
    <article className="max-w-5xl mx-auto py-10 md:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Work</Link>
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Web Design · Motion</p>
        <h1 className="text-3xl md:text-5xl font-light mb-6">Edge City Website 2026</h1>
        <p className="w-full text-base md:text-lg leading-relaxed text-muted-foreground">Edge City brings people working across technology, science, and culture together in popup villages to experiment with better ways of living. The website gives this growing network a home online, connecting its mission, gatherings, grants, and community. This design exploration pairs clear information with expansive skies and floating worlds, making room for both practical discovery and a sense of possibility.</p>
        <a href="https://edgecity.live/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-sm underline underline-offset-4">Visit edgecity.live <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></a>
      </header>
      <div className="space-y-16 md:space-y-24">
        <section aria-labelledby="design-options-heading">
          <h2 id="design-options-heading" className="text-2xl md:text-3xl font-light mb-5">Design Options</h2>
          <p className="w-full text-base md:text-lg leading-relaxed text-muted-foreground mb-8">I worked with the team to come up with mockup header images to try out different styles, exploring brutalism, gorpcore, and minimalism designs.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">{designs.options.map(designImage)}</div>
        </section>
        <section aria-labelledby="animations-heading">
          <h2 id="animations-heading" className="text-2xl md:text-3xl font-light mb-5">Animations</h2>
          <p className="w-full text-base md:text-lg leading-relaxed text-muted-foreground mb-8">Motion connects the different parts of the website into a continuous journey. These studies explore how the opening sky, scrolling introduction, community imagery, and village timeline can unfold over time, balancing a dreamlike atmosphere with clear moments to read and explore.</p>
          <div className="space-y-12">{animations.map(animation => <AnimationPreview key={animation.file} animation={animation} />)}</div>
        </section>
        <section aria-labelledby="final-designs-heading">
          <h2 id="final-designs-heading" className="text-2xl md:text-3xl font-light mb-8">Final Designs</h2>
          <div className="space-y-10 md:space-y-14">{designs.finals.map(designImage)}</div>
        </section>
      </div>
      <ImageModal isOpen={selected !== null} onClose={() => setSelected(null)} imageSrc={selected?.src} altText={selected?.title} />
    </article>
  );
}
