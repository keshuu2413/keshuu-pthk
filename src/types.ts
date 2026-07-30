export interface FlowerSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category: 'White Roses' | 'Red Roses' | 'Cherry Blossoms' | 'Pink Blossoms' | 'Teddy Bears' | 'Cute Cartoon Couples';
  overlayText: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  emoji: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'White Roses' | 'Red Roses' | 'Cherry Blossoms' | 'Pink Blossoms' | 'Teddy Bears' | 'Cartoon Couples';
  imageUrl: string;
  caption: string;
}

export interface RomanticWish {
  id: number;
  message: string;
  tag: string;
}

export type TeddyAction = 'idle' | 'hug' | 'flowers' | 'hearts';

export interface ParticleEffect {
  id: string;
  x: number;
  y: number;
  type: 'heart' | 'blossom' | 'sparkle';
  size: number;
  color: string;
}
