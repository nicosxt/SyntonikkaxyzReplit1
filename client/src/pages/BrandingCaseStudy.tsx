import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ImageModal from '@/components/ImageModal';
import { brandingProjects, type BrandImage } from '@/data/brandingProjects';

const paragraph = 'w-full text-body text-muted-foreground';
const heading = 'text-heading font-light mb-5';
const layouts = {
  stack: 'space-y-8',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start',
  row: 'grid grid-cols-3 gap-2 md:gap-4 items-start',
};
const slug =(text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Turns "[label](url)" in the copy into external links.
function richText(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!link) return <Fragment key={index}>{part}</Fragment>;
    return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-75">{link[1]}</a>;
  });
}

export default function BrandingCaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = brandingProjects[id];
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} — Nico Shi`;
    return () => { document.title = previous; };
  }, [project]);

  if (!project) {
    return <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">Project not found</div>;
  }

  const root = `/images/case-studies/${project.id}`;
  function artwork(image: BrandImage) {
    const src = image.file.startsWith('/') ? image.file : `${root}/${image.file}`;
    return <button key={image.file} type="button" onClick={() => setSelected({ src, alt: image.alt })} aria-label={`Enlarge ${image.alt}`} className="block w-full cursor-zoom-in rounded-sm overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
      <img src={src} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" className="w-full h-auto" />
    </button>;
  }

  return (
    <article className="w-full md:w-[70vw] mx-auto py-10 md:py-16">
      <Link href={project.back?.href ?? '/'} className="inline-flex items-center gap-2 text-small text-muted-foreground hover:text-foreground mb-10"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> {project.back?.label ?? 'Back to Work'}</Link>
      <header className="mb-12">
        <p className="text-label uppercase tracking-[0.2em] text-muted-foreground mb-4">{project.role}</p>
        <h1 className="text-title font-light">{project.title}</h1>
        {project.intro.map((text, index) => <p key={index} className={`${paragraph} ${index === 0 ? 'mt-6' : 'mt-5'}`}>{richText(text)}</p>)}
      </header>
      <div className="space-y-16 md:space-y-24">
        {project.sections.map(section => {
          const headingId = `${slug(section.heading)}-heading`;
          return <section key={section.heading} aria-labelledby={headingId}>
            <h2 id={headingId} className={heading}>{section.heading}</h2>
            {section.paragraphs.length > 0 && <div className="space-y-5 mb-8">{section.paragraphs.map((text, index) => <p key={index} className={paragraph}>{richText(text)}</p>)}</div>}
            {section.images.length > 0 && <div className={layouts[section.layout ?? 'stack']}>{section.images.map(artwork)}</div>}
            {/* Each clip grows in proportion to its aspect ratio, so clips in a row share one height. */}
            {section.videos && <div className="flex gap-2 md:gap-4 w-full md:w-2/3">{section.videos.map(video => (
              <video key={video.file} src={`${root}/${video.file}`} poster={`${root}/${video.poster}`} width={video.width} height={video.height}
                controls playsInline preload="none" aria-label={video.label}
                style={{ flex: `${video.width / video.height} 1 0`, aspectRatio: `${video.width} / ${video.height}` }}
                className="block min-w-0 h-auto rounded-sm bg-black object-cover" />
            ))}</div>}
          </section>;
        })}
        {project.links.length > 0 && <section aria-labelledby="links-heading">
          <h2 id="links-heading" className={heading}>Links</h2>
          <ul className="border-t border-black/15 dark:border-white/15">
            {project.links.map(link => <li key={link.url} className="border-b border-black/15 dark:border-white/15">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <span className="text-subhead font-light">{link.title}</span>
                <span className="flex items-center gap-3 text-small text-muted-foreground">
                  <span className="hidden sm:inline">{link.detail}</span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </span>
              </a>
            </li>)}
          </ul>
        </section>}
      </div>
      <ImageModal isOpen={selected !== null} onClose={() => setSelected(null)} imageSrc={selected?.src} altText={selected?.alt} />
    </article>
  );
}
