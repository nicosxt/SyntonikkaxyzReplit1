import { useState } from 'react';
import { Link } from 'wouter';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { caseStudiesData, type CaseStudy } from '@/data/caseStudies';
import { rollingLetterVariants } from '@/lib/rollingLetters';

// Staggered two-column layout: the right column starts lower than the left.
const columns = [['agartha-2026', 'edge-city'], ['chrysalis', 'edge-city-website-2026']];
// Mobile shows a single column in the data order.
const mobileOrder = (id: string) => caseStudiesData.findIndex(project => project.id === id);
// Where to crop each wide cover to fit a square.
const focus: Record<string, string> = {};

function WorkCard({ project }: { project: CaseStudy }) {
  const [active, setActive] = useState(false);
  const reducedMotion = !!useReducedMotion();
  return (
    <motion.div className="work-reveal" style={{ order: mobileOrder(project.id) }}
      initial={reducedMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: mobileOrder(project.id) * 0.15 }}>
    <Link href={project.link} className={`work-card${active ? ' is-active' : ''}`}
      aria-label={`View ${project.title} case study`}
      onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
      onFocus={event => setActive(event.currentTarget.matches(':focus-visible'))} onBlur={() => setActive(false)}>
      <div className="work-card-image">
        <img src={project.previewImage} alt="" loading="lazy" decoding="async" style={{ objectPosition: focus[project.id] }} />
      </div>
      <span className="work-card-title" aria-hidden="true">
        <AnimatePresence initial={false}>
          {active && (
            <motion.span key="title" className="creation-word-content" initial="enter" animate="settle" exit="leave">
              {Array.from(project.title).map((letter, index) => (
                <motion.span key={index} className="creation-letter" variants={rollingLetterVariants(index, reducedMotion)}>
                  {letter === ' ' ? ' ' : letter}
                </motion.span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="creation-home">
      <section className="selected-work-grid" aria-label="Selected work">
        {columns.map((ids, column) => (
          <div key={column} className="work-column">
            {ids.map(id => {
              const project = caseStudiesData.find(entry => entry.id === id);
              return project ? <WorkCard key={id} project={project} /> : null;
            })}
          </div>
        ))}
      </section>
    </div>
  );
}
