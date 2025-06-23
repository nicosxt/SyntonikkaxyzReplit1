import { useEffect, useState } from 'react';

interface UsePageAnimationOptions {
  delay?: number;
  staggerDelay?: number;
}

export function usePageAnimation(options: UsePageAnimationOptions = {}) {
  const { delay = 100, staggerDelay = 100 } = options;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClasses = (index: number = 0, animation: string = 'slide-in-left') => {
    const baseClasses = `transition-all duration-800 ease-out`;
    const animationClasses = isLoaded 
      ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
      : getInitialState(animation);
    
    return {
      className: `${baseClasses} ${animationClasses}`,
      style: { transitionDelay: `${index * staggerDelay}ms` }
    };
  };

  const getInitialState = (animation: string) => {
    switch (animation) {
      case 'slide-in-left':
        return 'opacity-0 -translate-x-8';
      case 'slide-in-right':
        return 'opacity-0 translate-x-8';
      case 'slide-in-up':
        return 'opacity-0 translate-y-8';
      case 'slide-in-down':
        return 'opacity-0 -translate-y-8';
      case 'scale-in':
        return 'opacity-0 scale-95';
      case 'fade-in':
      default:
        return 'opacity-0';
    }
  };

  return { isLoaded, getAnimationClasses };
}