import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { caseStudiesData } from '@/data/caseStudies';

const tagline = 'Nico Shi is a multi-disciplinary artist building Protopian worlds.';

export default function Home() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const playing = !hovered && !focused && !reducedMotion;
  const project = caseStudiesData[active];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % caseStudiesData.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, active]);

  function move(offset: number) {
    setActive(index => (index + offset + caseStudiesData.length) % caseStudiesData.length);
  }

  let characterIndex = 0;
  return (
    <section aria-label="Selected work" aria-roledescription="carousel" className="work-landing" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="relative flex-1 min-h-0 overflow-hidden rounded-sm">
        {caseStudiesData.map((slide, index) => (
          <motion.div key={slide.id} initial={false} animate={{ opacity: active === index ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 1.1 }} aria-hidden={active !== index} className={`absolute inset-0 ${active === index ? 'z-10' : 'pointer-events-none'}`}>
            <Link href={slide.link} tabIndex={active === index ? 0 : -1} aria-label={`View ${slide.title} case study`} className="block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px]">
              <img src={slide.previewImage} alt={`${slide.title} — selected work`} className="w-full h-full object-cover" loading="eager" decoding="async" />
            </Link>
          </motion.div>
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[10svh] bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="work-landing-footer">
        <Link href={project.link} className="group inline-flex items-center gap-4 min-w-0 text-white">
          <span key={project.id}><span className="block text-lg md:text-xl font-light">{project.title}</span><span className="block text-xs text-gray-400 mt-1">{project.role}</span></span>
          <ArrowUpRight aria-hidden="true" className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
        <div className="work-landing-tagline">
          <h1 aria-label={tagline} className="whitespace-nowrap text-[min(1.25rem,2.9cqw)] font-light leading-relaxed text-gray-300 text-right">
            <span aria-hidden="true">{tagline.split(' ').map((word, index) => {
              const start = characterIndex;
              characterIndex += word.length + 1;
              return <span key={index} className={`inline-block whitespace-nowrap ${index >= 7 ? 'font-bold italic text-white' : ''}`}>
                {Array.from(word).map((char, i) => <span key={i} className="work-tagline-letter" style={{ '--letter-delay': `${(start + i) * 28}ms` } as CSSProperties}>{char}</span>)}{'\u00a0'}
              </span>;
            })}</span>
          </h1>
        </div>
        <div className="work-landing-controls flex items-center gap-1 text-white">
          <button className="p-3 rounded-full hover:bg-white/10" onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft className="w-4 h-4" /></button>
          <span className="text-xs tabular-nums px-1" aria-live={playing ? 'off' : 'polite'}>{String(active + 1).padStart(2, '0')} / {String(caseStudiesData.length).padStart(2, '0')}</span>
          <button className="p-3 rounded-full hover:bg-white/10" onClick={() => move(1)} aria-label="Next project"><ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
}
