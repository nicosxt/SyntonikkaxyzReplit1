import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

const words = ['Divine', 'Messy', 'Protopian', 'Love', 'Everything', 'Salvation'];

export default function CreationHero() {
  const [step, setStep] = useState(0);
  const [focused, setFocused] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const inView = useInView(hero, { amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const word = words[step % words.length];

  useEffect(() => {
    if (reducedMotion || focused || !inView) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => setStep(value => value + 1), 5000 / 1.2);
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [step, reducedMotion, focused, inView]);

  return (
      <section ref={hero} className="creation-hero" aria-label="Creation">
        <motion.h2 className="creation-heading" layout={reducedMotion ? false : "position"} transition={{ layout: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}>
          <button type="button" className="creation-trigger" onClick={() => setStep(value => value + 1)}
            onFocus={event => setFocused(event.currentTarget.matches(':focus-visible'))} onBlur={() => setFocused(false)}
            aria-label={`Creation is ${word}. Show next word`}>
            <span aria-hidden="true">Creation is </span>
            <motion.span className="creation-word" layout={reducedMotion ? false : "position"} transition={{ layout: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }} aria-hidden="true">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span key={step} className="creation-word-content" initial="enter" animate="settle" exit="leave">
                  {Array.from(word).map((letter, index) => (
                    <motion.span key={index} className="creation-letter"
                      variants={{
                        enter: { opacity: 0, y: reducedMotion ? 0 : 22, scaleX: reducedMotion ? 1 : 0.65, scaleY: reducedMotion ? 1 : 1.6, rotate: reducedMotion ? 0 : -5 },
                        settle: { opacity: 1, y: 0, scaleX: 1, scaleY: 1, rotate: 0,
                          transition: { type: 'spring', stiffness: 190, damping: 15, mass: 1.8, delay: reducedMotion ? 0 : index * 0.0525, opacity: { duration: reducedMotion ? 0 : 0.525 } } },
                        leave: { opacity: 0, y: reducedMotion ? 0 : -18, scaleX: reducedMotion ? 1 : 1.2, scaleY: reducedMotion ? 1 : 0.7, rotate: reducedMotion ? 0 : 4,
                          transition: { duration: reducedMotion ? 0 : 0.42, delay: reducedMotion ? 0 : index * 0.027, ease: 'easeIn' } },
                      }}
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
