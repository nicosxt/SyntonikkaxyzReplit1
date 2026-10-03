import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { videoProjects } from '@/data/videos';
import XEmbed from '@/components/XEmbed';
import FramerContent, { VideoEmbed } from '@/components/FramerContent';

export default function VideoDetail({ params }: { params: { slug: string } }) {
  const project = videoProjects.find(item => item.slug === params.slug);
  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = `${project?.title || 'Video not found'} — Videos`;
    return () => { document.title = previous; };
  }, [project]);
  const back = <Link href="/playground" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Playground</Link>;
  if (!project) return <div className="max-w-4xl mx-auto py-20"><h1 className="text-3xl mb-6">Video not found</h1>{back}</div>;
  return (
    <article className="max-w-5xl mx-auto py-10 md:py-16">
      <div className="mb-10">{back}</div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">Videos</p>
        <h1 className="text-3xl md:text-5xl font-light text-gray-800 dark:text-white">{project.title}</h1>
      </header>
      <img src={project.cover} alt={`${project.title} — cover artwork`} decoding="async" className="w-full h-auto rounded-sm" />
      {project.description && <p className="w-full mt-10 text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>}
      {project.content ? (
        <div className="w-full mx-auto mt-10"><FramerContent blocks={project.content} title={project.title} /></div>
      ) : (
        <section aria-label="Watch the film" className="mt-10">{project.platform === "x" ? <XEmbed url={project.video} /> : <VideoEmbed url={project.video} title={project.title} />}</section>
      )}
      {project.source && <a href={project.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 underline underline-offset-4">Read the story on Substack <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></a>}
      <div className="mt-16 pt-8 border-t border-black/15 dark:border-white/15">{back}</div>
    </article>
  );
}
