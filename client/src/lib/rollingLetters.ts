import type { Variants } from 'framer-motion';

// Letter-by-letter "roll" shared by the hero word and the work grid titles.
export function rollingLetterVariants(index: number, reducedMotion: boolean): Variants {
  return {
    enter: { opacity: 0, y: reducedMotion ? 0 : 22, scaleX: reducedMotion ? 1 : 0.65, scaleY: reducedMotion ? 1 : 1.6, rotate: reducedMotion ? 0 : -5 },
    settle: { opacity: 1, y: 0, scaleX: 1, scaleY: 1, rotate: 0,
      transition: { type: 'spring', stiffness: 190, damping: 15, mass: 1.8, delay: reducedMotion ? 0 : index * 0.0525, opacity: { duration: reducedMotion ? 0 : 0.525 } } },
    leave: { opacity: 0, y: reducedMotion ? 0 : -18, scaleX: reducedMotion ? 1 : 1.2, scaleY: reducedMotion ? 1 : 0.7, rotate: reducedMotion ? 0 : 4,
      transition: { duration: reducedMotion ? 0 : 0.42, delay: reducedMotion ? 0 : index * 0.027, ease: 'easeIn' } },
  };
}
