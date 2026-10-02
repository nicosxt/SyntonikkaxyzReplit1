import { readdir, mkdir, stat, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public/images/Gallery');
const output = path.join(root, 'client/public/gallery');
const categories = ['3D Worlds', 'AI Art', 'Drawings', 'Merch'];
const isImage = (name) => /\.(jpe?g|png|webp|gif|avif)$/i.test(name);
const sort = (a, b) => a.localeCompare(b, undefined, { numeric: true });

async function imagesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const lists = await Promise.all(entries.sort((a, b) => sort(a.name, b.name)).map(async (entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? imagesIn(file) : isImage(entry.name) ? [file] : [];
  }));
  return lists.flat();
}

export async function generateGallery() {
  await mkdir(output, { recursive: true });
  const items = [];
  const merch = JSON.parse(await readFile(path.join(root, 'scripts/merch-catalog.json'), 'utf8'));
  for (const category of categories) {
    const directory = path.join(source, category === 'Merch' ? 'T Shirt Design' : category);
    const entries = (await readdir(directory, { withFileTypes: true })).sort((a, b) => sort(a.name, b.name));
    const groups = category === 'Merch'
      ? merch.map((design) => ({ ...design, files: design.files.map((file) => path.join(directory, file)) }))
      : category === '3D Worlds'
      ? (await imagesIn(directory)).map((file) => ({ title: path.parse(file).name, files: [file] }))
      : await Promise.all(entries.filter((entry) => entry.isDirectory() || (category === 'Drawings' && isImage(entry.name))).map(async (entry) => ({
          title: entry.isDirectory() ? entry.name : path.parse(entry.name).name,
          files: entry.isDirectory() ? await imagesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)],
        })));
    for (const group of groups) {
      if (!group.files.length) continue;
      const id = `${category}-${group.title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
      const images = [];
      for (const [index, file] of group.files.entries()) {
        const info = await stat(file);
        const key = createHash('sha256').update(`${path.relative(source, file)}:${info.size}:${info.mtimeMs}`).digest('hex').slice(0, 16);
        const filename = `${key}.webp`;
        const thumbnail = `${key}-thumb.webp`;
        try { await stat(path.join(output, filename)); } catch {
          await sharp(file).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toFile(path.join(output, filename));
        }
        if (index === 0) {
          try { await stat(path.join(output, thumbnail)); } catch {
            await sharp(file).rotate().resize(640, 640, { fit: 'cover' }).webp({ quality: 82 }).toFile(path.join(output, thumbnail));
          }
        }
        images.push({ src: `/gallery/${filename}`, alt: group.files.length === 1 ? group.title : `${group.title} — artwork ${index + 1}` });
        if (index === 0) group.thumbnail = `/gallery/${thumbnail}`;
      }
      items.push({ id, title: group.title, category, thumbnail: group.thumbnail, images, products: group.products ?? [] });
    }
  }
  await writeFile(path.join(root, 'client/src/data/gallery.ts'), `// Generated from public/images/Gallery by scripts/generate-gallery.mjs.\nexport interface GalleryImage { src: string; alt: string; }
export interface GalleryProduct { title: string; url: string; images: GalleryImage[]; }
export interface GalleryItem { id: string; title: string; category: string; thumbnail: string; images: GalleryImage[]; products: GalleryProduct[]; }
export const galleryItems: GalleryItem[] = ${JSON.stringify(items, null, 2)};\n`);
  return items;
}
