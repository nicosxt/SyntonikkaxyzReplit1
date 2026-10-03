import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ImageModal from '@/components/ImageModal';
import posters from '@/data/edgeCity2026.json';

export default function EdgeCity2026() {
  const [selected, setSelected] = useState<(typeof posters)[number] | null>(null);

  return (
    <section className="my-16" aria-labelledby="esmeralda-2026-heading">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Poster Design</p>
        <h2 id="esmeralda-2026-heading" className="text-2xl md:text-3xl font-light mb-6">Edge Esmeralda 2026</h2>
        <p className="w-full text-base md:text-lg leading-relaxed text-muted-foreground">
          A collection of posters for Edge Esmeralda 2026, a month-long gathering bringing people from technology, science, culture, and community together to prototype a brighter future. The illustrations imagine worlds where nature, discovery, and everyday life grow together.
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-6">
          <a href="https://www.edgeesmeralda.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">
            Explore Edge Esmeralda <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a href="https://edgeesmeralda2026.substack.com/p/edge-esmeralda-2026-month-in-review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">
            Read the 2026 recap <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </header>
      <section aria-labelledby="posters-heading">
        <h3 id="posters-heading" className="text-xl font-light mb-8">Edge Esmeralda Posters</h3>
        <div className="grid grid-cols-4 gap-4 md:gap-6 items-start">
          {posters.map((poster, index) => (
            <button key={poster.src} type="button" onClick={() => setSelected(poster)}
              className={`block w-full cursor-zoom-in rounded-sm overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 `}
              aria-label={`Enlarge ${poster.alt}`}>
              <img src={poster.src} alt={poster.alt} width={poster.width} height={poster.height}
                loading={index === 0 ? 'eager' : 'lazy'} decoding="async" className="w-full h-auto" />
            </button>
          ))}
        </div>
      </section>
      <ImageModal isOpen={selected !== null} onClose={() => setSelected(null)} imageSrc={selected?.src} altText={selected?.alt} />
    </section>
  );
}
