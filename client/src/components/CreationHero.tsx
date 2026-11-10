import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import CreationParticles from '@/components/CreationParticles';
import { rollingLetterVariants } from '@/lib/rollingLetters';

// Each word owns one particle scene (0 ring, 1 Chladni plate, 2 flock), shown in this order.
const slides = [{ word: 'Transmission', scene: 1 }, { word: 'Life', scene: 2 }, { word: 'Divine', scene: 0 }];

export default function CreationHero() {
  const [step, setStep] = useState(0);
  const [focused, setFocused] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const { word, scene } = slides[step % slides.length];

  useEffect(() => {
    if (reducedMotion || focused || !inView) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => setStep(value => value + 1), 30000);
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [step, reducedMotion, focused, inView]);

  return (
      <section ref={hero} className="creation-hero" aria-label="Creation" onClick={() => setStep(value => value + 1)}>
        <CreationParticles scene={scene} reducedMotion={!!reducedMotion} />
        <motion.h2 className="creation-heading" layout={reducedMotion ? false : "position"} transition={{ layout: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}>
          <button type="button" className="creation-trigger"
            onFocus={event => setFocused(event.currentTarget.matches(':focus-visible'))} onBlur={() => setFocused(false)}
            aria-label={`Creation is ${word}. Show next word`}>
            <span aria-hidden="true">Creation is </span>
            <motion.span className="creation-word" layout={reducedMotion ? false : "position"} transition={{ layout: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }} aria-hidden="true">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span key={step} className="creation-word-content" initial="enter" animate="settle" exit="leave">
                  {Array.from(word).map((letter, index) => (
                    <motion.span key={index} className="creation-letter"
                      variants={rollingLetterVariants(index, !!reducedMotion)}
                    >{letter}</motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </button>
        </motion.h2>
      </section>
  );
}
