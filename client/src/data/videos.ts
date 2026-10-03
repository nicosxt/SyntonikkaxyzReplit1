import gamePosts from './games.json';
import type { ContentBlock } from '@/components/FramerContent';

interface VideoProject {
  slug: string;
  title: string;
  cover: string;
  video: string;
  platform?: "youtube" | "x";
  source?: string;
  description?: string;
  content?: ContentBlock[];
}

// Keep the original Framer article and timestamped project breakdown intact.
const gameReel = gamePosts.find(post => post.slug === 'reel2023')!;

export const videoProjects: VideoProject[] = [
  {
    slug: 'the-future-i-want',
    title: 'The Future I Want',
    cover: '/images/videos/the-future-i-want/the-future-i-want-cover.webp',
    video: 'https://www.youtube.com/watch?v=DIhSJ-i_KPQ',
    source: 'https://agartha1.substack.com/p/the-future-i-want',
    description: 'An AI-assisted music video imagining a future where technological progress supports ecological harmony, thriving communities, and the joy of being alive. Created with Colton Orr at the Edge City Lanna hackathon in Chiang Mai, this world-building project explores many possible futures through scenes of family, culture, compassion, and connection with nature. It asks what becomes possible when we give care and gentleness as much attention as innovation.',
  },
  {
    slug: 'game-reel-2023',
    title: gameReel.title,
    cover: gameReel.cover,
    video: 'https://www.youtube.com/watch?v=CFQj7OGfxww',
    content: gameReel.content,
  },
  {
    slug: 'the-art-of-chilling',
    title: 'The Art of Chilling [at Essaouira Chill Art Hostel]',
    cover: '/images/videos/the-art-of-chilling/the-art-of-chilling-cover.jpg',
    video: 'https://www.youtube.com/watch?v=eFYcTnonork',
  },
  {
    slug: 'edge-esmeralda-trailer',
    title: 'Edge Esmeralda Trailer',
    cover: '/images/videos/edge-esmeralda-trailer/edge-esmeralda-trailer-cover.jpg',
    video: 'https://x.com/ethereum/status/1927026215744889233',
    platform: 'x',
    description: 'A glimpse of Edge Esmeralda: a gathering of builders exploring technology, art, science, and new ways of living together. Shared by Ethereum, the trailer introduces a pop-up city dedicated to prototyping human flourishing.',
  },
];
