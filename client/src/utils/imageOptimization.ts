/**
 * Lightweight image optimization for thumbnails and full-size viewing
 */

export interface ImageSizes {
  thumbnail: string;
  full: string;
}

/**
 * Generate different image URLs for thumbnail and full viewing.
 * Uses URL parameters to hint at intended usage for future optimization.
 */
export function getImageSizes(originalSrc: string): ImageSizes {
  return {
    thumbnail: `${originalSrc}?size=thumb`,
    full: originalSrc
  };
}

/**
 * Preload image for smoother modal transitions
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Intersection Observer for lazy loading optimization
 */
export function createLazyLoadObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });
}

/**
 * Optimize image loading based on container size
 */
export function getOptimalImageSize(containerWidth: number, containerHeight: number): string {
  // Calculate optimal size based on device pixel ratio and container dimensions
  const dpr = window.devicePixelRatio || 1;
  const optimalWidth = Math.ceil(containerWidth * dpr);
  const optimalHeight = Math.ceil(containerHeight * dpr);
  
  return `w_${optimalWidth},h_${optimalHeight}`;
}