import { useEffect, useRef } from 'react';

type XWidgets = { widgets: { createTweet: (id: string, element: HTMLElement, options: Record<string, unknown>) => Promise<HTMLElement | undefined> } };
let widgetsPromise: Promise<XWidgets> | undefined;
function loadWidgets() {
  if (!widgetsPromise) {
    widgetsPromise = new Promise<XWidgets>((resolve, reject) => {
      const current = (window as Window & { twttr?: XWidgets }).twttr;
      if (current?.widgets) { resolve(current); return; }
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        const api = (window as Window & { twttr?: XWidgets }).twttr;
        if (api?.widgets) resolve(api);
        else reject(new Error('X embed unavailable'));
      };
      script.onerror = () => { script.remove(); reject(new Error('X embed unavailable')); };
      document.body.appendChild(script);
    }).catch(error => { widgetsPromise = undefined; throw error; });
  }
  return widgetsPromise;
}

export default function XEmbed({ url }: { url: string }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = container.current;
    const id = url.match(/^https:\/\/(?:x|twitter)\.com\/[^/]+\/status\/(\d+)/)?.[1];
    if (!host || !id) return;
    // Give each effect its own host so late async responses cannot duplicate an embed.
    const mount = document.createElement('div');
    host.appendChild(mount);
    let cancelled = false;
    loadWidgets().then(api => {
      if (!cancelled) return api.widgets.createTweet(id, mount, {
        dnt: true, conversation: 'none', align: 'center',
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      });
    }).catch(() => { /* The permanent direct link remains available if X is blocked. */ });
    return () => { cancelled = true; mount.remove(); };
  }, [url]);
  return (
    <div>
      <div ref={container} />
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm underline underline-offset-4 text-gray-600 dark:text-gray-400">Watch the original post on X</a>
    </div>
  );
}
