import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import ImageModal from '@/components/ImageModal';
import assets from '@/data/agartha2026.json';

const root = '/images/case-studies/agartha-2026';
const residencies = [
  { title: 'Agartha House Patagonia', url: 'https://agartha1.substack.com/p/reflections-from-agarthas-patagonia' },
  { title: 'Island Time', url: 'https://www.agartha.one/islandtime' },
  { title: 'House of Games', url: 'https://agartha1.substack.com/p/our-next-residency-house-of-games' },
  { title: 'Touch Grass', url: 'https://agartha1.substack.com/p/lets-go-touch-grass-agartha-at-edge' },
];
const websiteDescriptions = ['Opening landscape with a mushroom house beneath a blue sky', 'Life at Our Residencies against a warm pastel background', 'The Global Solarpunk Network with an illustrated globe at dusk', 'Building a New Ecosystem with open hands beneath a starry sky'];
const posterDescriptions = ['A futuristic portrait with sculptural white hair and translucent glasses', 'A whimsical tower on a lush floating island', 'A flying saucer surrounded by colorful fragments', 'A warm interior overlooking a coastal sunset', 'Rounded homes in a mountain meadow', 'A portrait with butterfly-shaped glasses', 'A terraced garden and pools above the clouds', 'A glowing dome beneath a celestial sky'];
const paragraph = 'w-full text-base md:text-lg leading-relaxed text-muted-foreground';
const heading = 'text-2xl md:text-3xl font-light mb-5';
type Art = { src: string; width: number; height: number };

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-75">{children}</a>;
}

function WebsiteAnimation({ index }: { index: number }) {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState<boolean | null>(null);
  const active = playing ?? !reducedMotion;
  const path = `${root}/animations/agartha-website-0${index}`;
  return <figure>
    <img src={active ? `${path}.gif` : `${path}-still.webp`} alt={`Agartha website motion study ${index}`} loading="lazy" className="w-full h-auto rounded-sm" />
    <figcaption className="mt-3 flex justify-between gap-4 text-sm text-muted-foreground">
      <span>Website motion study {index}</span>
      <button type="button" onClick={() => setPlaying(!active)} aria-label={`${active ? 'Pause' : 'Play'} website motion study ${index}`} className="underline underline-offset-4">{active ? 'Pause' : 'Play'}</button>
    </figcaption>
  </figure>;
}

export default function Agartha2026() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Agartha 2026 — Nico Shi';
    return () => { document.title = previous; };
  }, []);
  function artwork(image: Art, alt: string) {
    return <button key={image.src} type="button" onClick={() => setSelected({ src: image.src, alt })} aria-label={`Enlarge ${alt}`} className="block w-full cursor-zoom-in rounded-sm overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
      <img {...image} alt={alt} loading="lazy" decoding="async" className="w-full h-auto" />
    </button>;
  }
  return (
    <article className="max-w-5xl mx-auto py-10 md:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Work</Link>
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Founder · Worldbuilding, Branding, Web Design</p>
        <h1 className="text-3xl md:text-5xl font-light">Agartha 2026</h1>
      </header>
      <div className="space-y-16 md:space-y-24">
        <section aria-labelledby="residencies-heading">
          <h2 id="residencies-heading" className={heading}>Residencies</h2>
          <div className="space-y-5 mb-8">
            <p className={paragraph}>By 2026, Agartha had hosted four month-long residencies across three continents, bringing together people from different backgrounds to live intentionally, learn from one another, and form lasting connections with each other and the surrounding landscape.</p>
            <p className={paragraph}>I approached each residency as a world people could inhabit, shaping its narrative, theme, purpose, and visual identity into a distinct shared experience.</p>
            <p className={paragraph}>Learn about the residencies <ExternalLink href="https://www.agartha.one/residencies">here</ExternalLink>.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {assets.residencies.map((image, index) => <figure key={image.src}>
              {artwork(image, `${residencies[index].title} residency poster`)}
              <figcaption className="mt-3">
                <a href={residencies[index].url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 text-sm hover:underline underline-offset-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                  {residencies[index].title}<ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>)}
          </div>
        </section>
        <section aria-labelledby="website-heading">
          <h2 id="website-heading" className={heading}>The Website</h2>
          <div className="space-y-5 mb-8">
            <p className={paragraph}><ExternalLink href="https://www.agartha.one/">Agartha</ExternalLink> is a Solarpunk studio bringing residencies, storytelling, research, art merchandise, and podcasting into one cohesive world.</p>
            <p className={paragraph}>The visual direction moves beyond the familiar Solarpunk image of pristine cities wrapped in greenery. I wanted a future with character, mystery, and room for the unexpected.</p>
            <p className={paragraph}>Drawing on planetary evolution and the <ExternalLink href="https://en.wikipedia.org/wiki/Agartha">myth of a hidden subterranean kingdom</ExternalLink>, the identity combines mystical references with whimsical, otherworldly imagery. The result is a world with its own lore and a distinctive sense of wonder.</p>
          </div>
          <div className="space-y-10"><WebsiteAnimation index={1} /><WebsiteAnimation index={2} /></div>
          <p className={`${paragraph} my-10`}>Each section introduces a different sense of wonder. As visitors move deeper into the project, the background shifts from light to dark, echoing nature’s cycles and gradually revealing Agartha’s wider vision.</p>
          <div className="space-y-8">{assets.website.map((image, index) => artwork(image, websiteDescriptions[index]))}</div>
        </section>
        <section aria-labelledby="pitch-heading">
          <h2 id="pitch-heading" className={heading}>Pitch Deck</h2>
          <p className={`${paragraph} mb-5`}>The pitch deck translates Agartha’s world into a clear introduction to the project. Mystical imagery, extraterrestrial motifs, and playful details give the presentation a distinctive voice while keeping the vision at its center.</p>
          <p className={`${paragraph} mb-8`}>See the full PDF <ExternalLink href="https://drive.google.com/file/d/1SYoESmCIn27IDwua9DSY0-p_ZlNeoWDB/view?usp=sharing">on Google Drive</ExternalLink> or download it <a href={`${root}/pitch-deck/agartha-patagonia-pitch.pdf`} download className="underline underline-offset-4">here</a>.</p>
          {artwork({ src: `${root}/pitch-deck/agartha-pitch-cover.webp`, width: 2000, height: 1125 }, 'Agartha pitch deck cover — Be One of a Kind')}
        </section>
        <section aria-labelledby="art-heading">
          <h2 id="art-heading" className={heading}>Decorative Art</h2>
          <p className={`${paragraph} mb-8`}>These artworks extend Agartha’s identity into physical space. Printed at A3 and displayed throughout the residencies, they brought the project’s imagination into everyday life, setting a shared atmosphere of curiosity, play, and possibility.</p>
          <div className="grid grid-cols-4 gap-2 md:gap-5 items-start">{assets.posters.map((image, index) => artwork(image, posterDescriptions[index]))}</div>
        </section>
      </div>
      <ImageModal isOpen={selected !== null} onClose={() => setSelected(null)} imageSrc={selected?.src} altText={selected?.alt} />
    </article>
  );
}
