import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Layers } from "lucide-react";
import { galleryItems } from "@/data/gallery";

const categories = ["All", "3D Worlds", "AI Art", "Drawings"] as const;

export default function Galleries() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const items = galleryItems.filter((item) => category === "All" || item.category === category);

  return (
    <div className="max-w-6xl mx-auto py-10 md:py-16">
      <header className="mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-4">A visual playground</p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-gray-800 dark:text-white">Galleries</h1>
        <p className="mt-5 text-gray-600 dark:text-gray-400 text-base md:text-lg">Worlds imagined, drawn, and brought to life.</p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/15 dark:border-white/15 pb-5 mb-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter artworks by category">
          {categories.map((name) => (
            <button
              key={name}
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={`rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                category === name
                  ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                  : "text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400" aria-live="polite">{items.length} entries</p>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-5">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={`/galleries/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.title}${item.images.length > 1 ? `, collection of ${item.images.length} images` : ""} in a new tab`}
            className="group min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          >
            <div className="relative aspect-square overflow-hidden bg-black/10 dark:bg-white/5 rounded-sm">
              <img
                src={item.thumbnail}
                alt={item.title}
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                width={640}
                height={640}
                className="w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
              {item.images.length > 1 && (
                <span className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1.5 rounded-full bg-black/60 text-white px-2 py-1 text-xs backdrop-blur-sm">
                  <Layers className="w-3 h-3" aria-hidden="true" />
                  {item.images.length}
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              <ArrowUpRight aria-hidden="true" className="absolute bottom-3 right-3 w-5 h-5 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
            </div>
            <div className="pt-3 pb-5">
              <h2 className="text-xs md:text-base text-gray-800 dark:text-white leading-snug break-words">{item.title}</h2>
              <p className="mt-1 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function GalleryDetail({ params }: { params: { id: string } }) {
  const item = galleryItems.find((entry) => entry.id === params.id);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-gray-800 dark:text-white">
        <h1 className="text-3xl mb-6">Artwork not found</h1>
        <Link href="/galleries" className="underline underline-offset-4">Back to Galleries</Link>
      </div>
    );
  }

  return (
    <article className="max-w-5xl mx-auto py-10 md:py-16">
      <Link href="/galleries" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-10">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Galleries
      </Link>
      <header className="mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">{item.category} · {item.images.length} {item.images.length === 1 ? "artwork" : "artworks"}</p>
        <h1 className="text-3xl md:text-5xl font-light text-gray-800 dark:text-white">{item.title}</h1>
      </header>
      <div className="space-y-10 md:space-y-16">
        {item.images.map((image, index) => (
          <figure key={image.src}>
            <img
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-auto rounded-sm"
            />
            {item.images.length > 1 && (
              <figcaption className="mt-3 text-xs text-gray-500 dark:text-gray-400">{String(index + 1).padStart(2, "0")} / {String(item.images.length).padStart(2, "0")}</figcaption>
            )}
          </figure>
        ))}
      </div>
      <Link href="/galleries" className="inline-flex items-center gap-2 mt-16 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Galleries
      </Link>
    </article>
  );
}
