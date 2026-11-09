import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import ImageModal from '@/components/ImageModal';
import assets from '@/data/chrysalis.json';

const root = '/images/case-studies/chrysalis';
const conceptDescriptions = ['Chrysalis concept one — build your project as it builds you', 'Chrysalis concept two — the metamorphosis of a butterfly'];
const explorationDescriptions = ['A strip of butterfly wing patterns and macro nature photography', 'Welcome to Chrysalis over a warm sunrise gradient', 'Welcome to Chrysalis over a pastel butterfly wing', 'Welcome to Chrysalis in monospace type over a dark butterfly wing'];
const videoDescriptions = ['The Chrysalis landing page', 'Who you are — the audience section', 'Your team — mentor cards', 'Chrysalis Houses — living together during the season'];
const resources = [
  { title: 'Live Website', detail: 'agartha.one/chrysalis', url: 'https://agartha.one/chrysalis' },
  { title: 'Website Walkthrough', detail: 'YouTube', url: 'https://youtu.be/me82xmu2FDw' },
  { title: 'Substack Announcement', detail: 'Introducing Chrysalis', url: 'https://agartha1.substack.com/p/introducing-chrysalis-solarpunk-begins' },
  { title: 'Agartha Manifesto', detail: 'Substack', url: 'https://agartha1.substack.com/p/a-manifesto-on-empowering-the-solarpunk' },
  { title: 'Moodboard', detail: 'Cosmos', url: 'https://www.cosmos.so/syntonikka/crysalis' },
];
const paragraph = 'w-full text-body text-muted-foreground';
const heading = 'text-heading font-light mb-5';
type Art = { src: string; width: number; height: number };

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-75">{children}</a>;
}

function WebsiteVideo({ index }: { index: number }) {
  const reducedMotion = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const active = playing ?? !reducedMotion;
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (active) element.play().catch(() => {});
    else element.pause();
  }, [active]);
  const path = `${root}/web-animation-${index}`;
  return <figure>
    <video ref={video} src={`${path}.mp4`} poster={`${path}-poster.webp`} muted loop playsInline preload="metadata" aria-label={videoDescriptions[index]} className="w-full h-auto rounded-sm" />
    <figcaption className="mt-3 flex justify-between gap-4 text-small text-muted-foreground">
      <span>{videoDescriptions[index]}</span>
      <button type="button" onClick={() => setPlaying(!active)} aria-label={`${active ? 'Pause' : 'Play'} ${videoDescriptions[index]}`} className="underline underline-offset-4">{active ? 'Pause' : 'Play'}</button>
    </figcaption>
  </figure>;
}

export default function Chrysalis() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Chrysalis — Nico Shi';
    return () => { document.title = previous; };
  }, []);
  function artwork(image: Art, alt: string) {
    return <button key={image.src} type="button" onClick={() => setSelected({ src: image.src, alt })} aria-label={`Enlarge ${alt}`} className="block w-full cursor-zoom-in rounded-sm overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
      <img {...image} alt={alt} loading="lazy" decoding="async" className="w-full h-auto" />
    </button>;
  }
  return (
    <article className="w-full md:w-[70vw] mx-auto py-10 md:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-small text-muted-foreground hover:text-foreground mb-10"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Work</Link>
      <header className="mb-12">
        <p className="text-label uppercase tracking-[0.2em] text-muted-foreground mb-4">Founder · Brand Positioning, Storytelling, Web Design</p>
        <h1 className="text-title font-light">Chrysalis</h1>
        <p className={`${paragraph} mt-6`}><ExternalLink href="https://agartha.one/chrysalis">Chrysalis</ExternalLink> is a 3-month incubator with coaching, workshops, masterminds, deep work, and a week-long graduation retreat in real life, designed to help people launch their Solarpunk projects.</p>
        <p className={`${paragraph} mt-5`}>I came up with the idea for Chrysalis together with the Agartha team. As the founder and brand designer of this project, I own the operation end to end: initial ideation, brand positioning & storytelling, copywriting, website design & development, and recruiting.</p>
      </header>
      <div className="space-y-16 md:space-y-24">
        <section aria-labelledby="concept-heading">
          <h2 id="concept-heading" className={heading}>Core Concept</h2>
          <p className={`${paragraph} mb-8`}>The core idea is a transformation container that is both nourishing and rigorous: participants bring a project into the world while the work also changes them. The program is meant to combine practical project incubation with personal growth, collective learning, and lasting relationships.</p>
          <div className="space-y-8">{assets.concepts.map((image, index) => artwork(image, conceptDescriptions[index]))}</div>
          <p className="mt-4 text-small text-muted-foreground italic">The first two concepts about personal transformation, one centered around the concept of ‘build your project as it builds you’, and the other leaning into the metamorphosis of a butterfly.</p>
        </section>
        <section aria-labelledby="positioning-heading">
          <h2 id="positioning-heading" className={heading}>Positioning & Visual Explorations</h2>
          <div className="space-y-5 mb-8">
            <p className={paragraph}>The positioning work explored the naming of this project. “Accelerator” felt too tied to venture capital; “online school” underplayed the shipping and personal transformation side; “cohort program” felt generic. “Solarpunk incubator” became the choice, as it indicates building towards an optimistic vision of the future.</p>
            <p className={paragraph}>Throughout the design process, I explored other directions, such as leaning into butterfly patterns and the scale of nature.</p>
          </div>
          <div className="space-y-8">{assets.explorations.map((image, index) => artwork(image, explorationDescriptions[index]))}</div>
          <div className="space-y-5 my-10">
            <p className={paragraph}>The intended feeling was both supportive and rigorous: a place that holds people, raises the bar together, helps unblock them, and feels like home. That pairing became a useful design test: <em className="text-foreground">the brand should communicate care and rigor at once.</em></p>
            <p className={paragraph}>I realized butterfly images on their own were not sufficient to indicate the ‘rigorous technology incubator’ aspect of the program, so I started looking into visual aesthetics that are both technical and nature-inspired.</p>
          </div>
          {artwork(assets.moodboard, 'Chrysalis moodboard of ASCII, photography and GAN butterfly graphics')}
          <p className={`${paragraph} mt-8`}>I created a <ExternalLink href="https://www.cosmos.so/syntonikka/crysalis">moodboard</ExternalLink> focusing on ASCII, photography, and GAN graphics.</p>
        </section>
        <section aria-labelledby="story-heading">
          <h2 id="story-heading" className={heading}>Turning the Positioning into a Story</h2>
          <div className="space-y-5 mb-8">
            <p className={paragraph}>The central message for Chrysalis — <strong className="text-foreground font-normal">the project you build is also building you</strong> — frames Chrysalis as a supportive home for people building work that moves the world toward ecological regeneration, ethical technology, loving community, spiritual growth, and holistic wellness, derived from the <ExternalLink href="https://agartha1.substack.com/p/a-manifesto-on-empowering-the-solarpunk">Agartha Manifesto</ExternalLink>.</p>
            <p className={paragraph}>To create a sense of warmth and joy, a feeling Agartha residencies are known for, I used a rainbow gradient throughout the website.</p>
          </div>
          {artwork(assets.gradient, 'Chrysalis color study — a living spectrum of pastel rainbow gradients')}
          <p className={`${paragraph} my-10`}>To express a sense of play, the website is built as a mini game: everything is clickable, interactive, and glowing with a pastel rainbow gradient. Below is the landing page of <ExternalLink href="https://agartha.one/chrysalis">Chrysalis</ExternalLink>.</p>
          <WebsiteVideo index={0} />
        </section>
        <section aria-labelledby="website-heading">
          <h2 id="website-heading" className={heading}>The Website Experience</h2>
          <div className="space-y-5 mb-8">
            <p className={paragraph}>The website outline follows the audience’s questions in sequence: What is this? Is it for me? What happens during the program? What might change? Who will support me? What does it cost, and how do I join?</p>
            <p className={paragraph}>Visual directions were attached to those content needs — for example, circular arrows linking personal transformation and project incubation, an organic chrysalis shape holding a person, a timeline for program rhythms, and a sequence showing metamorphosis. In this approach, visuals explain the experience instead of serving as decoration.</p>
          </div>
          <div className="space-y-10"><WebsiteVideo index={1} /><WebsiteVideo index={2} /><WebsiteVideo index={3} /></div>
        </section>
        <section aria-labelledby="resources-heading">
          <h2 id="resources-heading" className={heading}>Supporting Documents</h2>
          <ul className="border-t border-black/15 dark:border-white/15">
            {resources.map(resource => <li key={resource.url} className="border-b border-black/15 dark:border-white/15">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <span className="text-subhead font-light">{resource.title}</span>
                <span className="flex items-center gap-3 text-small text-muted-foreground">
                  <span className="hidden sm:inline">{resource.detail}</span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </span>
              </a>
            </li>)}
          </ul>
        </section>
      </div>
      <ImageModal isOpen={selected !== null} onClose={() => setSelected(null)} imageSrc={selected?.src} altText={selected?.alt} />
    </article>
  );
}
