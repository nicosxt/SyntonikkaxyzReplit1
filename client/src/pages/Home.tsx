import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { caseStudiesData } from '@/data/caseStudies';

const words = ['Divine', 'Messy', 'Protopian', 'Love', 'Everything', 'Salvation'];

export default function Home() {
  const [step, setStep] = useState(0);
  const [focused, setFocused] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const word = words[step % words.length];

  useEffect(() => {
    if (reducedMotion || focused || !inView) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) setStep(value => value + 1);
    }, 3800);
    const resume = () => { if (!document.hidden) setStep(value => value + 1); };
    document.addEventListener('visibilitychange', resume);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', resume);
    };
  }, [step, reducedMotion, focused, inView]);

  return (
    <div className="creation-home">
      <section ref={hero} className="creation-hero" aria-label="Creation">
        <h2 className="creation-heading">
          <button type="button" className="creation-trigger" onClick={() => setStep(value => value + 1)}
            onFocus={event => setFocused(event.currentTarget.matches(':focus-visible'))} onBlur={() => setFocused(false)}
            aria-label={`Creation is ${word}. Show next word`}>
            <span aria-hidden="true">Creation is </span>
            <motion.span className="creation-word" layout={!reducedMotion} transition={{ type: 'spring', stiffness: 180, damping: 22 }} aria-hidden="true">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span key={step} className="creation-word-content" initial="enter" animate="settle" exit="leave">
                  {Array.from(word).map((letter, index) => (
                    <motion.span key={index} className="creation-letter"
                      variants={{
                        enter: { opacity: 0, y: reducedMotion ? 0 : 22, scaleX: reducedMotion ? 1 : 0.65, scaleY: reducedMotion ? 1 : 1.6, rotate: reducedMotion ? 0 : -5 },
                        settle: { opacity: 1, y: 0, scaleX: 1, scaleY: 1, rotate: 0,
                          transition: { type: 'spring', stiffness: 190, damping: 10, mass: 0.8, delay: reducedMotion ? 0 : index * 0.035, opacity: { duration: reducedMotion ? 0 : 0.35 } } },
                        leave: { opacity: 0, y: reducedMotion ? 0 : -18, scaleX: reducedMotion ? 1 : 1.2, scaleY: reducedMotion ? 1 : 0.7, rotate: reducedMotion ? 0 : 4,
                          transition: { duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : index * 0.018, ease: 'easeIn' } },
                      }}
                    >{letter}</motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </button>
        </h2>
      </section>
      <section className="selected-work-grid" aria-label="Selected work">
        {caseStudiesData.map(project => (
          <Link key={project.id} href={project.link} className="work-card group" aria-label={`View ${project.title} case study`}>
            <div className="work-card-image">
              <img src={project.previewImage} alt={`${project.title} — selected work`} loading="lazy" decoding="async" />
            </div>
            <div className="flex items-center justify-between gap-4 pt-4">
              <div>
                <h3 className="text-lg md:text-xl font-light">{project.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-400">{project.role}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
