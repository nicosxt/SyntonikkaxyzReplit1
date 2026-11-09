// Character animation speeds (in milliseconds)
const LETTER_SPEED = { fast: 25, normal: 35, slow: 50, verySlow: 70 };
// Change this to speed up/slow down all text animations.
const DEFAULT_LETTER_SPEED = 15;

export const getLetterSpeed = (speed?: keyof typeof LETTER_SPEED) =>
  speed ? LETTER_SPEED[speed] : DEFAULT_LETTER_SPEED;
