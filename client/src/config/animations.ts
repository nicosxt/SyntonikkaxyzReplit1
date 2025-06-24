
// Global animation configuration
export const ANIMATION_CONFIG = {
  // Character animation speeds (in milliseconds)
  letterSpeed: {
    fast: 25,
    normal: 35,
    slow: 50,
    verySlow: 70
  },
  
  // Page load delays
  pageDelay: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  
  // Stagger delays for multiple elements
  staggerDelay: {
    fast: 50,
    normal: 100,
    slow: 150
  },
  
  // Default settings - change these to adjust global speed
  defaults: {
    letterSpeed: 35,     // Change this to speed up/slow down all text animations
    pageDelay: 300,      // Change this to adjust page load timing
    staggerDelay: 100    // Change this to adjust element stagger timing
  }
};

// Helper functions for consistent timing
export const getLetterSpeed = (speed?: keyof typeof ANIMATION_CONFIG.letterSpeed) => {
  return speed ? ANIMATION_CONFIG.letterSpeed[speed] : ANIMATION_CONFIG.defaults.letterSpeed;
};

export const getPageDelay = (speed?: keyof typeof ANIMATION_CONFIG.pageDelay) => {
  return speed ? ANIMATION_CONFIG.pageDelay[speed] : ANIMATION_CONFIG.defaults.pageDelay;
};

export const getStaggerDelay = (speed?: keyof typeof ANIMATION_CONFIG.staggerDelay) => {
  return speed ? ANIMATION_CONFIG.staggerDelay[speed] : ANIMATION_CONFIG.defaults.staggerDelay;
};
