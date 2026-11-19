import { useRef, type MouseEvent } from "react";
// Link areas from the PDF's own link annotations, as % of the page.
// Regenerate with: python3 scripts/resume-links.py client/public/resume.pdf > client/src/data/resume-links.json
import resumeLinks from "@/data/resume-links.json";

// Max tilt in degrees — same feel as the residency cards on agartha.one/residencies.
const TILT_MAX = 5;

export default function Resume() {
  const cardRef = useRef<HTMLDivElement>(null);

  const tilt = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rotateY = ((x - cx) / cx) * TILT_MAX;
    const rotateX = ((cy - y) / cy) * TILT_MAX;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = () => {
    if (cardRef.current) cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article className="w-full md:w-[70vw] mx-auto py-12 md:py-20 space-y-6 text-body text-gray-600 dark:text-gray-300">
      <h1 className="sr-only">Resume</h1>
      <div
        className="flex justify-center [perspective:1000px]"
        onMouseMove={tilt}
        onMouseLeave={reset}
      >
        <div
          ref={cardRef}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: "rotateX(0deg) rotateY(0deg)" }}
        >
          <img
            src="/images/resume/resume.webp"
            alt="Nico Shi's resume: multi-disciplinary designer. Experience, education, publications, skills and tools."
            width={1416}
            height={2000}
            decoding="async"
            className="block w-full h-auto"
          />
          {resumeLinks.map((link) => (
            <a
              key={`${link.href}-${link.top}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              className="absolute rounded-sm hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white transition-colors"
              style={{
                left: `${link.left}%`,
                top: `${link.top}%`,
                width: `${link.width}%`,
                height: `${link.height}%`,
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-small text-center">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 dark:text-white underline underline-offset-4 decoration-current/40 hover:decoration-current"
        >
          Download PDF
        </a>
      </p>
    </article>
  );
}
