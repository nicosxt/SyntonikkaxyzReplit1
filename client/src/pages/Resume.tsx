import { useRef, type MouseEvent } from "react";

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
          className="w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 ease-out will-change-transform"
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
