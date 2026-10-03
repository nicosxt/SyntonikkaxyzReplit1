import fs from 'node:fs/promises';

// Re-run with a fresh Framer Work export: node scripts/import-games.mjs /path/to/blog-content.json
const categories = {
  'everything-is-alive': 'Mixed Reality',
  reel2023: 'Reel',
  chefumami: 'Mobile Games',
  pocketbeats: 'Music Games',
  pocketsolarcalculator: 'Mobile Games',
  scratchmyitchyback: 'Mobile Games',
  opposites: 'Mobile Games',
};
const source = JSON.parse(await fs.readFile(process.argv[2], 'utf8'));
const assets = new Map();
function image(value) {
  const src = typeof value === 'string' ? value : value?.src;
  if (!src) return '';
  if (!src.startsWith('data:framer/asset-reference,')) return src;
  const filename = src.split(',')[1].split('?')[0];
  assets.set(filename, `https://framerusercontent.com/images/${filename}`);
  return `/images/games/${filename}`;
}
function block(node) {
  const result = { type: node.type };
  for (const key of ['text', 'tag', 'bold', 'italic', 'inlineCode', 'link']) {
    if (node[key] !== undefined) result[key] = node[key];
  }
  if (node.children?.length) result.children = node.children.map(block);
  if (node.media) result.media = { src: image(node.media), alt: node.media.alt || '' };
  if (node.$control__url) result.url = node.$control__url;
  return result;
}
const posts = source.items.filter(({ fields }) => fields.Slug in categories)
  .sort((a, b) => Object.keys(categories).indexOf(a.fields.Slug) - Object.keys(categories).indexOf(b.fields.Slug))
  .map(({ fields: f }) => ({
    slug: f.Slug, title: f.Slug === 'reel2023' ? 'Game Reel 2023' : f.Title, category: categories[f.Slug],
    client: f.Client, role: f.Role, cover: image(f['Featured Image']),
    video: /^https:\/\//.test(f['YouTube URL']) ? f['YouTube URL'] : '',
    content: f.Content.map(block),
  }));
await fs.writeFile('client/src/data/games.json', JSON.stringify(posts, null, 2) + '\n');
await fs.writeFile('/tmp/portfolio-game-assets.json', JSON.stringify([...assets]));
console.log(`Imported ${posts.length} posts; ${assets.size} image assets listed in /tmp/portfolio-game-assets.json.`);
