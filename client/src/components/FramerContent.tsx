import { createElement, Fragment, type ReactNode } from 'react';

export interface ContentBlock {
  type: string;
  text?: string;
  tag?: string;
  bold?: boolean;
  italic?: boolean;
  inlineCode?: boolean;
  link?: { href: string; openInNewTab?: boolean };
  children?: ContentBlock[];
  media?: { src: string; alt: string };
  url?: string;
}

function safeLink(url: string) {
  return /^(https?:\/\/|mailto:|\/[^/]|#)/i.test(url) ? url : undefined;
}

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  let id: string | null = null;
  let start: string | null = null;
  try {
    const parsed = new URL(url);
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(parsed.hostname)) {
      id = parsed.searchParams.get('v') || parsed.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1] || null;
    } else if (parsed.hostname === 'youtu.be') id = parsed.pathname.slice(1);
    start = parsed.searchParams.get('t');
  } catch { /* Invalid source URLs never become embeds. */ }
  if (!id || !/^[\w-]{11}$/.test(id)) {
    return safeLink(url) ? <p><a href={url} target="_blank" rel="noopener noreferrer">Watch video</a></p> : null;
  }
  const seconds = start?.match(/^(\d+)s?$/)?.[1];
  return <div className="my-8 aspect-video overflow-hidden rounded-sm bg-black">
    <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}${seconds ? `?start=${seconds}` : ''}`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
  </div>;
}

export default function FramerContent({ blocks, title }: { blocks: ContentBlock[]; title: string }) {
  function render(node: ContentBlock, index: number): ReactNode {
    const children = node.children?.map(render);
    switch (node.type) {
      case 'TextRun': {
        let text: ReactNode = node.text;
        if (node.inlineCode) text = <code>{text}</code>;
        if (node.bold) text = <strong>{text}</strong>;
        if (node.italic) text = <em>{text}</em>;
        const href = node.link && safeLink(node.link.href);
        if (href) text = <a href={href} target={node.link?.openInNewTab ? '_blank' : undefined} rel="noopener noreferrer">{text}</a>;
        return <Fragment key={index}>{text}</Fragment>;
      }
      case 'TextBlock':
        return createElement(['p', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'].includes(node.tag || '') ? node.tag! : 'p', { key: index }, children);
      case 'TextBulletList': return <ul key={index}>{children}</ul>;
      case 'TextOrderedList': return <ol key={index}>{children}</ol>;
      case 'TextListItem': return <li key={index}>{children}</li>;
      case 'TextLineBreak': return <br key={index} />;
      case 'TextMediaBlock': return node.media ? <figure key={index}><img src={node.media.src} alt={node.media.alt || `${title} — project image ${index + 1}`} loading="lazy" decoding="async" className="w-full h-auto rounded-sm" /></figure> : null;
      case 'TextComponentInstance': return node.url ? <VideoEmbed key={index} url={node.url} title={`${title} video`} /> : null;
      case 'TextUnsupportedBlock': return <p key={index} className="text-sm text-gray-500 dark:text-gray-400 italic">Video unavailable.</p>;
      default: return <Fragment key={index}>{children}</Fragment>;
    }
  }
  return <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-light prose-a:underline-offset-4 prose-img:my-0 prose-p:leading-relaxed break-words">{blocks.map(render)}</div>;
}
