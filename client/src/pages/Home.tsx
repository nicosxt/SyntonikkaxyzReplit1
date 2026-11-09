import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { caseStudiesData } from '@/data/caseStudies';

export default function Home() {
  return (
    <div className="creation-home">
      <section className="selected-work-grid" aria-label="Selected work">
        {caseStudiesData.map(project => (
          <Link key={project.id} href={project.link} className="work-card group" aria-label={`View ${project.title} case study`}>
            <div
              className="work-card-image"
              style={project.id === 'edge-city-website-2026' ? { backgroundColor: '#fff' } : undefined}
            >
              <img style={project.id === 'edge-city-website-2026' ? { scale: '1.05' } : undefined} src={project.previewImage} alt={`${project.title} — selected work`} loading="lazy" decoding="async" />
            </div>
            <div className="flex items-center justify-between gap-4 pt-4">
              <div>
                <h3 className="text-subhead font-light">{project.title}</h3>
                <p className="mt-1 text-small text-gray-400">{project.role}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
