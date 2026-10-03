import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Layers } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import visualArt from "@/data/visualArt.json";
import gamePosts from "@/data/games.json";
import { videoProjects } from "@/data/videos";
import { merchStories, merchStorySource } from "@/data/merchStories";
import merchStoryImages from "@/data/merchStoryImages.json";

const categories = ["All", "Visual Art", "Games", "Merch", "Videos"] as const;

type Artwork = GalleryItem & { description?: string; source?: string; sourceLabel?: string };

// Editorial details stay separate from the generated image catalog.
const galleryDetails: Record<string, Partial<Artwork>> = {
  "ai-art-2025-mystic-future": { title: "Mystic Future [2025]" },
  "ai-art-2025-constellations": {
    title: "Constellation [2025]",
    description: "A collaboration with Colton Orr.",
    source: "https://www.behance.net/gallery/232206955/Constellation-Brand-Design",
    sourceLabel: "View Constellation Brand Design on Behance",
  },
  "ai-art-2025-renaissance-futurism": { title: "Renaissance Futurism [2025]" },
};

const allGalleryItems: Artwork[] = [...visualArt, ...galleryItems].map(item => {
  const details = galleryDetails[item.id];
  return {
    ...item,
    ...details,
    images: item.images.map(image => ({
      ...image,
      alt: details?.title ? image.alt.replace(item.title, details.title) : image.alt,
    })),
  };
});

const featuredOrder = [
  "3d-worlds-desert-temple",
  "ai-art-2025-mystic-future",
  "the-future-i-want",
  "drawings-faces-in-joshua-tree",
  "drawings-agartha-in-patagonia",
  "drawings-animals-in-parallel-universe",
  "everything-is-alive",
  "chefumami",
  "game-reel-2023",
  "inktober-2025",
  "astro-cities",
  "edge-esmeralda-trailer",
  "the-art-of-chilling",
  "burping-the-right-way",
];
const collectionRank = (id: string) => {
  const index = featuredOrder.indexOf(id);
  return index === -1 ? featuredOrder.length : index;
};

const collectionItems = [
  ...videoProjects.map(project => ({ id: project.slug, title: project.title, category: "Videos", thumbnail: project.cover, images: [{ src: project.cover, alt: project.title }], href: `/videos/${project.slug}` })),
  ...allGalleryItems.map(item => ({ ...item, category: item.category === "Merch" ? "Merch" : "Visual Art", href: `/galleries/${item.id}` })),
  ...gamePosts.filter(post => post.slug !== "reel2023").map(post => ({ id: post.slug, title: post.title, category: "Games", thumbnail: post.cover, images: [{ src: post.cover, alt: post.title }], href: `/games/${post.slug}` })),
].sort((a, b) => collectionRank(a.id) - collectionRank(b.id));

export default function Playground() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const items = collectionItems.filter((item) => category === "All" || item.category === category);

  return (
    <div className="max-w-6xl mx-auto py-10 md:py-16">
      <header className="mb-10 md:mb-14">
        <p className="mt-5 text-gray-600 dark:text-gray-400 text-base md:text-lg">Visual art, games, videos, and things to wear.</p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/15 dark:border-white/15 pb-5 mb-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter collection by category">
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
        <p className="text-xs text-gray-500 dark:text-gray-400" aria-live="polite">{items.length} {items.length === 1 ? "entry" : "entries"}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-5">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            aria-label={`Open ${item.title}${item.images.length > 1 ? `, collection of ${item.images.length} images` : ""}`}
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
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  item.id === "the-art-of-chilling"
                    ? "scale-[1.34] motion-safe:group-hover:scale-[1.4]"
                    : "motion-safe:group-hover:scale-105"
                }`}
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
  const item = allGalleryItems.find((entry) => entry.id === params.id);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-gray-800 dark:text-white">
        <h1 className="text-3xl mb-6">Artwork not found</h1>
        <Link href="/playground" className="underline underline-offset-4">Back to Playground</Link>
      </div>
    );
  }

  const storyImages = item.category === "Merch" ? merchStoryImages.filter(image => image.section === item.title) : [];
  const artworkImages = storyImages.length ? [storyImages[0], ...item.images.slice(1)] : item.images;

  return (
    <article className="max-w-5xl mx-auto py-10 md:py-16">
      <Link href="/playground" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-10">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Playground
      </Link>
      <header className="mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">{item.category === "Merch" ? "Merch" : "Visual Art"} · {item.images.length} {item.images.length === 1 ? "artwork" : "artworks"}</p>
        <h1 className="text-3xl md:text-5xl font-light text-gray-800 dark:text-white">{item.title}</h1>
        {item.description && <p className="mt-5 w-full text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>}
        {item.source && <a href={item.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-5 text-sm underline underline-offset-4 text-gray-600 dark:text-gray-400">{item.sourceLabel || "Read more"} <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></a>}
      </header>
      <div className="space-y-10 md:space-y-16">
        {artworkImages.map((image, index) => (
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
      {item.category === "Merch" && merchStories[item.id] && (
        <section aria-labelledby="design-story" className="mt-12 md:mt-16">
          <h2 id="design-story" className="text-2xl md:text-3xl font-light text-gray-800 dark:text-white mb-5">Behind the design</h2>
          <div className="w-full space-y-5">
            {merchStories[item.id].map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">{paragraph}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 mt-10">
            {storyImages.slice(1).map((image, index) => (
              <figure key={image.src} className={storyImages.length === 2 ? "sm:col-span-2" : ""}>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" className="w-full h-auto rounded-sm" />
                <figcaption className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{image.caption}</figcaption>
              </figure>
            ))}
          </div>
          <a href={merchStorySource} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-5 text-sm text-gray-600 dark:text-gray-400 underline underline-offset-4 hover:text-black dark:hover:text-white">
            Read the full design story on Substack <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </section>
      )}
      {item.products.length > 0 && (
        <section aria-labelledby="shop-design" className="mt-16 pt-10 border-t border-black/15 dark:border-white/15">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">Art you can wear</p>
              <h2 id="shop-design" className="text-2xl md:text-3xl font-light text-gray-800 dark:text-white">Shop this design</h2>
            </div>
            <a href="https://merch.agartha.one/" className="inline-flex items-center gap-2 text-sm underline underline-offset-4 text-gray-700 dark:text-gray-300">
              Visit Agartha shop <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <div className="space-y-12">
            {item.products.map((product) => (
              <div key={product.url}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.images.map((image) => (
                    <a key={image.src} href={product.url} aria-label={`View ${product.title} in the Agartha shop`} className="block overflow-hidden rounded-sm bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="w-full h-auto" />
                    </a>
                  ))}
                </div>
                <a href={product.url} className="mt-4 flex flex-wrap items-center justify-between gap-3 text-gray-800 dark:text-white group">
                  <h3 className="text-base md:text-lg">{product.title}</h3>
                  <span className="inline-flex items-center gap-2 text-sm underline underline-offset-4 group-hover:opacity-70">View in shop <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></span>
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
      <Link href="/playground" className="inline-flex items-center gap-2 mt-16 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Playground
      </Link>
    </article>
  );
}
