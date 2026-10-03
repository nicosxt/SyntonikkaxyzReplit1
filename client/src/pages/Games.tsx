import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import gamePosts from "@/data/games.json";
import FramerContent, { VideoEmbed } from "@/components/FramerContent";

export function GameDetail({ params }: { params: { slug: string } }) {
  const post = gamePosts.find((entry) => entry.slug === params.slug);
  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = `${post?.title || 'Game not found'} — Games`;
    return () => { document.title = previous; };
  }, [post]);

  const back = <Link href="/playground" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Playground</Link>;
  if (!post) return <div className="max-w-4xl mx-auto py-20 text-gray-800 dark:text-white"><h1 className="text-3xl mb-6">Game not found</h1>{back}</div>;

  return (
    <article className="max-w-5xl mx-auto py-10 md:py-16">
      <div className="mb-10">{back}</div>
      <header className="mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">Games</p>
        <h1 className="text-3xl md:text-5xl font-light text-gray-800 dark:text-white">{post.title}</h1>
        <dl className="flex flex-wrap gap-x-12 gap-y-5 mt-8 text-sm">
          <div><dt className="text-gray-500 dark:text-gray-400 mb-2">Platform / Client</dt><dd className="text-gray-800 dark:text-white">{post.client}</dd></div>
          <div><dt className="text-gray-500 dark:text-gray-400 mb-2">Role</dt><dd className="text-gray-800 dark:text-white">{post.role}</dd></div>
        </dl>
      </header>
      <img src={post.cover} alt={post.title} className="w-full h-auto rounded-sm mb-10 md:mb-16" decoding="async" />
      <div className="max-w-3xl mx-auto">
        {post.video && <VideoEmbed url={post.video} title={`${post.title} preview`} />}
        <FramerContent blocks={post.content} title={post.title} />
      </div>
      <div className="mt-16 pt-8 border-t border-black/15 dark:border-white/15">{back}</div>
    </article>
  );
}
