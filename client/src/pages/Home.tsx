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
    <div className="max-w-[1600px] mx-auto [container-type:inline-size] flex min-h-[calc(100svh-7rem)] flex-col gap-7 md:gap-9">
      <section aria-label="Selected work" aria-roledescription="carousel" className="flex-1 flex flex-col min-h-0" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="relative min-h-[320px] h-[55svh] md:h-[64svh] overflow-hidden rounded-sm bg-black/10 dark:bg-white/5">
          {caseStudiesData.map((slide, index) => (
            <motion.div key={slide.id} initial={false} animate={{ opacity: active === index ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 1.1 }} aria-hidden={active !== index} className={`absolute inset-0 ${active === index ? 'z-10' : 'pointer-events-none'}`}>
              <Link href={slide.link} tabIndex={active === index ? 0 : -1} aria-label={`View ${slide.title} case study`} className="block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px]">
                <img src={slide.previewImage} alt={`${slide.title} — selected work`} className="w-full h-full object-cover" loading="eager" decoding="async" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <Link href={project.link} className="group inline-flex items-center gap-4 text-gray-800 dark:text-white">
            <span><span className="block text-lg md:text-xl font-light">{project.title}</span><span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">{project.role}</span></span>
            <ArrowUpRight aria-hidden="true" className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <div className="ml-auto flex items-center gap-2 text-gray-800 dark:text-white">
            <button className="p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10" onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft className="w-4 h-4" /></button>
            <span className="text-xs tabular-nums px-1" aria-live={playing ? 'off' : 'polite'}>{String(active + 1).padStart(2, '0')} / {String(caseStudiesData.length).padStart(2, '0')}</span>
            <button className="p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10" onClick={() => move(1)} aria-label="Next project"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>
      <h1 aria-label={tagline} className="w-full whitespace-nowrap text-[min(1.875rem,3cqw)] font-light leading-relaxed text-gray-600 dark:text-gray-300 pb-2">
        <span aria-hidden="true">{tagline.split(' ').map((word, index) => {
          const start = characterIndex;
          characterIndex += word.length + 1;
          return <span key={index} className={`inline-block whitespace-nowrap ${index >= 7 ? 'font-bold italic text-gray-800 dark:text-white' : ''}`}>
            {Array.from(word).map((char, i) => <span key={i} className="work-tagline-letter" style={{ '--letter-delay': `${(start + i) * 28}ms` } as CSSProperties}>{char}</span>)}{'\u00a0'}
          </span>;
        })}</span>
      </h1>
    </div>
  );
}
