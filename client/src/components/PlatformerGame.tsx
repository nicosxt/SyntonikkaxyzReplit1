import { useRef, useEffect, useCallback, useState } from "react";

class Character {
  x: number;
  y: number;
  width: number;
  height: number;
  char: string;
  originalY: number;
  
  // Animation properties
  jumpAnimation: {
    active: boolean;
    timeRemaining: number;
    jumpHeight: number;
    bounceVelocity: number;
  };

  // Fade-in animation properties
  fadeAnimation: {
    opacity: number;
    isVisible: boolean;
    delay: number;
  };

  // Styling to match landing page
  textColor: string;
  font: string;
  fontSize: number;

  constructor(x: number, y: number, width: number, height: number, char: string, index: number = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.char = char;
    this.originalY = y;
    
    this.jumpAnimation = {
      active: false,
      timeRemaining: 0,
      jumpHeight: 0,
      bounceVelocity: 0
    };

    this.fadeAnimation = {
      opacity: 0,
      isVisible: false,
      delay: index * 30 + 500 // Stagger delay like home page: 30ms per character + 500ms initial delay
    };

    // Match landing page styling: text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300
    this.textColor = "#9CA3AF"; // text-gray-400 for better contrast on dark background
    this.font = "'PP Neue Montreal', Arial, Helvetica, sans-serif";
    this.fontSize = 29; // 60% of original 48px size
  }

  render(ctx: CanvasRenderingContext2D) {
    // Don't render if not visible yet
    if (!this.fadeAnimation.isVisible && this.fadeAnimation.opacity === 0) {
      return;
    }

    ctx.save();
    
    // Set text styling to match landing page with fade opacity
    const isDarkMode = document.documentElement.classList.contains('dark');
    const baseColor = isDarkMode ? '#D1D5DB' : '#6B7280'; // text-gray-300 : text-gray-500
    
    // Apply fade opacity to color
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.fadeAnimation.opacity})`;
    
    ctx.font = `300 ${this.fontSize}px ${this.font}`; // 300 = font-light
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.imageSmoothingEnabled = true;

    // Calculate text position (centered in character bounds)
    const textX = this.x + this.width / 2;
    const textY = this.y + this.height / 2;

    // Apply jump animation offset
    const jumpOffset = this.jumpAnimation.active ? this.jumpAnimation.jumpHeight : 0;
    
    ctx.fillText(this.char, textX, textY + jumpOffset);
    ctx.restore();
  }

  // Trigger jump animation when hit from below
  triggerJump() {
    // Always trigger jump, even if already active (for continuous bouncing)
    this.jumpAnimation.active = true;
    this.jumpAnimation.timeRemaining = 800; // 800ms animation
    this.jumpAnimation.bounceVelocity = -12; // Strong initial upward velocity
    this.jumpAnimation.jumpHeight = 0;
  }

  // Update animation
  update(deltaTime: number, gameStartTime: number) {
    // Handle fade-in animation
    if (!this.fadeAnimation.isVisible && gameStartTime >= this.fadeAnimation.delay) {
      this.fadeAnimation.isVisible = true;
    }
    
    if (this.fadeAnimation.isVisible && this.fadeAnimation.opacity < 1) {
      // Fade in over 200ms
      this.fadeAnimation.opacity = Math.min(1, this.fadeAnimation.opacity + (deltaTime / 200));
    }

    // Handle jump animation
    if (this.jumpAnimation.active) {
      // Apply gravity-like physics to bounce
      this.jumpAnimation.bounceVelocity += 1.5; // Gravity
      this.jumpAnimation.jumpHeight += this.jumpAnimation.bounceVelocity;
      
      // Stop animation when character returns to original position or below
      if (this.jumpAnimation.jumpHeight >= 0) {
        this.jumpAnimation.jumpHeight = 0;
        this.jumpAnimation.active = false;
        this.jumpAnimation.bounceVelocity = 0;
      }
      
      this.jumpAnimation.timeRemaining -= deltaTime;
      if (this.jumpAnimation.timeRemaining <= 0) {
        this.jumpAnimation.active = false;
        this.jumpAnimation.jumpHeight = 0;
      }
    }
  }
}

class Block {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;

  // Styling properties - easily customizable
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  font: string;
  fontSize: number;
  padding: number;
  horizontalPadding: number;
  borderRadius: number;
  letterSpacing: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    options: {
      backgroundColor?: string;
      textColor?: string;
      borderColor?: string;
      borderWidth?: number;
      font?: string;
      fontSize?: number;
      padding?: number;
      horizontalPadding?: number;
      borderRadius?: number;
      letterSpacing?: string;
    } = {},
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;

    // Default styling - customize these as needed
    this.backgroundColor = options.backgroundColor || "#000000";
    this.textColor = options.textColor || "#ffffff";
    this.borderColor = options.borderColor || "#ffffff";
    this.borderWidth = options.borderWidth || 1;
    this.font =
      options.font || "'PP Neue Montreal', Arial, Helvetica, sans-serif";
    this.fontSize = options.fontSize || 26;
    this.padding = options.padding || 3;
    this.horizontalPadding = options.horizontalPadding || 7.5; // 2.5 times the default padding (3 * 2.5 = 7.5)
    this.borderRadius = options.borderRadius || 8;
    this.letterSpacing = options.letterSpacing || "1px";
  }

  // Method to render the block (invisible collision box only)
  render(ctx: CanvasRenderingContext2D) {
    // Block is now invisible - only serves as collision boundary
    // No visual rendering needed
  }

  // Method to update styling
  updateStyle(options: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    font?: string;
    fontSize?: number;
    padding?: number;
    horizontalPadding?: number;
    borderRadius?: number;
    letterSpacing?: string;
  }) {
    if (options.backgroundColor !== undefined)
      this.backgroundColor = options.backgroundColor;
    if (options.textColor !== undefined) this.textColor = options.textColor;
    if (options.borderColor !== undefined)
      this.borderColor = options.borderColor;
    if (options.borderWidth !== undefined)
      this.borderWidth = options.borderWidth;
    if (options.font !== undefined) this.font = options.font;
    if (options.fontSize !== undefined) this.fontSize = options.fontSize;
    if (options.padding !== undefined) this.padding = options.padding;
    if (options.horizontalPadding !== undefined) this.horizontalPadding = options.horizontalPadding;
    if (options.borderRadius !== undefined) this.borderRadius = options.borderRadius;
    if (options.letterSpacing !== undefined) this.letterSpacing = options.letterSpacing;
  }
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  color: string;
  bopAnimation: {
    active: boolean;
    timeRemaining: number;
    scale: number;
  };
}

interface GameState {
  player: Player;
  blocks: Block[];
  characters: Character[];
  keys: { [key: string]: boolean };
  touchControls: {
    left: boolean;
    right: boolean;
    jump: boolean;
  };
}

const GRAVITY = 2400; // Gravity per second (pixels/second²)
const JUMP_FORCE = -1050; // Jump velocity per second (pixels/second)
const MAX_MOVE_SPEED = 500; // Maximum horizontal movement speed (pixels/second)
const ACCELERATION = 2600; // Acceleration per second (pixels/second²)
const HORIZONTAL_MULTIPLIER = 1.5; // Horizontal movement multiplier
const DECELERATION = 0.78; // Friction coefficient (frame-rate independent)
const GROUND_HEIGHT = 100;
const BLOCK_GAP = 100; // Uniform gap between aligned blocks in pixels

export default function PlatformerGame() {
  const BLOCK_HEIGHT_SPACE = 0.18;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>();
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const gameStartTimeRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  // Function to measure text width
  const measureTextWidth = useCallback(
    (
      text: string,
      fontSize: number = 26,
      fontFamily: string = "'PP Neue Montreal', Arial, Helvetica, sans-serif",
    ): number => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return text.length * 12; // Fallback estimate

      ctx.font = `${fontSize}px ${fontFamily}`;
      return ctx.measureText(text).width;
    },
    [],
  );

  // Initialize game blocks based on the mockup
  const initializeBlocks = useCallback(
    (canvasWidth: number, canvasHeight: number): Block[] => {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Define block texts for each row
      const topRowTexts = ["BUILDING", "PROTOPIAN", "BRANDS"];
      const centerRowTexts = ["MULTI-DISCIPLINARY", "DESIGNER"];
      const bottomRowTexts = ["NICO SHI", "XR", "AI", "IMMERSIVE WORLDS"];

      // Default styling options for all blocks
      const defaultBlockOptions = {
        backgroundColor: "#000000",
        textColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: 1,
        font: "'PP Neue Montreal', Arial, Helvetica, sans-serif",
        fontSize: 26,
        padding: 3,
        horizontalPadding: 30.5, // 2.5 times the padding value (3 * 2.5 = 7.5)
        borderRadius: 24, // Set to half the block height (48/2 = 24) for perfect rounded rectangle
        letterSpacing: "1px",
      };

      // Calculate block widths based on text content and horizontal padding
      const topRowWidths = topRowTexts.map(
        (text) =>
          measureTextWidth(
            text,
            defaultBlockOptions.fontSize,
            defaultBlockOptions.font,
          ) + defaultBlockOptions.horizontalPadding,
      );
      const centerRowWidths = centerRowTexts.map(
        (text) =>
          measureTextWidth(
            text,
            defaultBlockOptions.fontSize,
            defaultBlockOptions.font,
          ) + defaultBlockOptions.horizontalPadding,
      );
      const bottomRowWidths = bottomRowTexts.map(
        (text) =>
          measureTextWidth(
            text,
            defaultBlockOptions.fontSize,
            defaultBlockOptions.font,
          ) + defaultBlockOptions.horizontalPadding,
      );

      // Calculate block height to match navbar height (48px)
      const blockHeight = 48;

      // Calculate total widths for centering
      const topRowWidth =
        topRowWidths.reduce((sum, width) => sum + width, 0) +
        BLOCK_GAP * (topRowWidths.length - 1);
      const centerRowWidth =
        centerRowWidths.reduce((sum, width) => sum + width, 0) +
        BLOCK_GAP * (centerRowWidths.length - 1);
      const bottomRowWidth =
        bottomRowWidths[0] +
        100 +
        bottomRowWidths[1] +
        BLOCK_GAP +
        bottomRowWidths[2] +
        BLOCK_GAP +
        bottomRowWidths[3]; // Special spacing for NICO SHI

      const blocks: Block[] = [];

      // Top row blocks - 'BUILDING PROTOPIAN BRANDS' centered, now at center row position
      let currentX = centerX - topRowWidth / 2;
      topRowTexts.forEach((text, index) => {
        blocks.push(
          new Block(
            currentX,
            centerY - canvasHeight * 0.03, // 3% higher than center (swapped with center row)
            topRowWidths[index],
            blockHeight,
            text,
            defaultBlockOptions,
          ),
        );
        currentX += topRowWidths[index] + BLOCK_GAP;
      });

      // Center row blocks - 'MULTI-DISCIPLINARY' and 'DESIGNER' centered with BLOCK_GAP, now at top position
      currentX = centerX - centerRowWidth / 2;
      centerRowTexts.forEach((text, index) => {
        blocks.push(
          new Block(
            currentX,
            centerY - canvasHeight * BLOCK_HEIGHT_SPACE - blockHeight, // 16% above center (swapped with top row)
            centerRowWidths[index],
            blockHeight,
            text,
            defaultBlockOptions,
          ),
        );
        currentX += centerRowWidths[index] + BLOCK_GAP;
      });

      // Bottom row blocks - centered, 14% below center (moved 2% lower and increased spacing)
      currentX = centerX - bottomRowWidth / 2;
      bottomRowTexts.forEach((text, index) => {
        blocks.push(
          new Block(
            currentX,
            centerY + canvasHeight * BLOCK_HEIGHT_SPACE, // 14% below center (moved 2% lower from 12%)
            bottomRowWidths[index],
            blockHeight,
            text,
            defaultBlockOptions,
          ),
        );

        // Special spacing for bottom row
        if (index === 0) {
          currentX += bottomRowWidths[index] + 100; // Larger gap after NICO SHI
        } else {
          currentX += bottomRowWidths[index] + BLOCK_GAP;
        }
      });
      return blocks;
    },
    [measureTextWidth],
  );

  // Create individual characters from blocks
  const createCharactersFromBlocks = useCallback((blocks: Block[]): Character[] => {
    const characters: Character[] = [];
    
    blocks.forEach(block => {
      const text = block.text;
      const chars = text.split('');
      
      // Measure character spacing
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.font = `300 29px 'PP Neue Montreal', Arial, Helvetica, sans-serif`;
      
      // Calculate total text width and individual character widths
      const totalTextWidth = ctx.measureText(text).width;
      const charWidths = chars.map(char => ctx.measureText(char).width);
      
      // Calculate starting position to center the text within the block
      const startX = block.x + (block.width - totalTextWidth) / 2;
      const charY = block.y;
      
      // Create character objects
      let currentX = startX;
      chars.forEach((char, charIndex) => {
        if (char !== ' ') { // Skip spaces
          const charWidth = charWidths[charIndex];
          const charHeight = block.height;
          
          const newChar = new Character(
            currentX,
            charY,
            charWidth + 10, // Add some padding for collision detection
            charHeight,
            char,
            characters.length // Use total character count as index for staggered animation
          );
          
          characters.push(newChar);
        }
        currentX += charWidths[charIndex];
      });
    });
    

    return characters;
  }, []);

  // Initialize game state
  const initializeGameState = useCallback(
    (canvasWidth: number, canvasHeight: number): GameState => {
      const blocks = initializeBlocks(canvasWidth, canvasHeight);
      const characters = createCharactersFromBlocks(blocks);
      
      return {
        player: {
          x: 50,
          y: canvasHeight * 0.89 - 30, // 11% above bottom (100% - 11% = 89%)
          width: 30,
          height: 30,
          velocityX: 0,
          velocityY: 0,
          onGround: false,
          color: "#ff6b6b",
          bopAnimation: {
            active: false,
            timeRemaining: 0,
            scale: 1,
          },
        },
        blocks,
        characters,
        keys: {},
        touchControls: {
          left: false,
          right: false,
          jump: false,
        },
      };
    },
    [initializeBlocks, createCharactersFromBlocks],
  );

  // Collision detection
  const checkCollision = (rect1: any, rect2: any) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1; // Use actual device pixel ratio

    setDimensions({ width: newWidth, height: newHeight });

    // Set canvas internal resolution to match device pixel ratio
    canvas.width = newWidth * pixelRatio;
    canvas.height = newHeight * pixelRatio;

    // Scale canvas back to display size
    canvas.style.width = newWidth + "px";
    canvas.style.height = newHeight + "px";

    // Scale context to match pixel ratio
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(pixelRatio, pixelRatio);

      // Optimize text rendering settings
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
    }

    // Reinitialize game state with new dimensions
    gameStateRef.current = initializeGameState(newWidth, newHeight);
  }, [initializeGameState]);

  // Game loop
  const gameLoop = useCallback((currentTime: number = 0) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const gameState = gameStateRef.current;

    if (!canvas || !ctx || !gameState) return;

    // Calculate delta time (time since last frame) in seconds
    const deltaTime =
      lastTimeRef.current === 0
        ? 0
        : (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    // Cap delta time to prevent large jumps (e.g., when tab becomes active again)
    const clampedDeltaTime = Math.min(deltaTime, 1 / 30); // Max 30 FPS equivalent

    // Clear canvas completely for transparency
    ctx.save();
    ctx.globalCompositeOperation = "copy";
    ctx.fillStyle = "rgba(0, 0, 0, 0)"; // Fully transparent
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    ctx.restore();

    // Update player physics
    const player = gameState.player;

    // Handle input
    const leftPressed =
      gameState.keys["ArrowLeft"] ||
      gameState.keys["a"] ||
      gameState.keys["A"] ||
      gameState.touchControls.left;
    const rightPressed =
      gameState.keys["ArrowRight"] ||
      gameState.keys["d"] ||
      gameState.keys["D"] ||
      gameState.touchControls.right;
    const jumpPressed =
      gameState.keys[" "] ||
      gameState.keys["ArrowUp"] ||
      gameState.keys["ArrowDown"] ||
      gameState.keys["w"] ||
      gameState.keys["W"] ||
      gameState.keys["s"] ||
      gameState.keys["S"] ||
      gameState.touchControls.jump;

    // Test animation with 'T' key
    if (gameState.keys["t"] || gameState.keys["T"]) {
      // Trigger animation for first few characters as a test
      gameState.characters.slice(0, 5).forEach(char => char.triggerJump());
    }

    // Skip physics on first frame when deltaTime is 0
    if (clampedDeltaTime > 0) {
      // Smooth horizontal movement with acceleration and deceleration
      if (leftPressed) {
        // Accelerate towards left
        player.velocityX = Math.max(
          player.velocityX -
            ACCELERATION * HORIZONTAL_MULTIPLIER * clampedDeltaTime,
          -MAX_MOVE_SPEED,
        );
      } else if (rightPressed) {
        // Accelerate towards right
        player.velocityX = Math.min(
          player.velocityX +
            ACCELERATION * HORIZONTAL_MULTIPLIER * clampedDeltaTime,
          MAX_MOVE_SPEED,
        );
      } else {
        // Apply smooth deceleration when no input (frame-rate independent)
        player.velocityX *= Math.pow(DECELERATION, clampedDeltaTime * 60);
        // Stop very small movements to prevent infinite tiny movements
        if (Math.abs(player.velocityX) < 5) {
          player.velocityX = 0;
        }
      }

      // Jump movement - only when on ground
      if (jumpPressed && player.onGround) {
        player.velocityY = JUMP_FORCE;
        player.onGround = false;
      }

      // Apply gravity
      player.velocityY += GRAVITY * clampedDeltaTime;

      // Update position using delta time
      player.x += player.velocityX * clampedDeltaTime;
      player.y += player.velocityY * clampedDeltaTime;
      
      // Update bop animation
      if (player.bopAnimation.active) {
        player.bopAnimation.timeRemaining -= clampedDeltaTime;
        if (player.bopAnimation.timeRemaining <= 0) {
          player.bopAnimation.active = false;
          player.bopAnimation.scale = 1;
        } else {
          // Ease out animation - scale decreases over time
          const progress = 1 - (player.bopAnimation.timeRemaining / 0.3);
          player.bopAnimation.scale = 1 + (0.2 * (1 - progress));
        }
      }
    }

    // Use display dimensions for game logic, not internal canvas resolution
    const displayWidth = dimensions.width;
    const displayHeight = dimensions.height;

    // Check boundaries
    if (player.x < 0) {
      player.x = 0;
      player.velocityX = 0;
    }
    if (player.x + player.width > displayWidth) {
      player.x = displayWidth - player.width;
      player.velocityX = 0;
    }

    // Ground collision - ground is at 11% from bottom (3% higher)
    const groundY = displayHeight * 0.89;
    if (player.y + player.height > groundY) {
      player.y = groundY - player.height;
      player.velocityY = 0;
      player.onGround = true;
    }

    // Block collisions
    player.onGround = player.y + player.height >= groundY;

    for (const block of gameState.blocks) {
      if (checkCollision(player, block)) {
        // Trigger bop animation on any collision
        player.bopAnimation.active = true;
        player.bopAnimation.timeRemaining = 0.3; // 300ms animation
        player.bopAnimation.scale = 1.2; // Scale up by 20%
        
        // TRIGGER CHARACTER ANIMATIONS when hitting block from below
        if (player.velocityY < 0 && player.y > block.y) {
          // Find all characters in this block and trigger their jump animations
          const blockText = block.text;
          gameState.characters.forEach(character => {
            // Check if character belongs to this block by position
            if (character.x >= block.x && character.x <= block.x + block.width &&
                character.y >= block.y && character.y <= block.y + block.height) {
              character.triggerJump();
            }
          });
        }
        
        // Top collision (landing on block)
        if (player.velocityY > 0 && player.y < block.y) {
          player.y = block.y - player.height;
          player.velocityY = 0;
          player.onGround = true;
        }
        // Bottom collision (hitting head)
        else if (player.velocityY < 0 && player.y > block.y) {
          player.y = block.y + block.height;
          player.velocityY = 0;
        }
        // Side collisions
        else if (player.velocityX > 0 && player.x < block.x) {
          player.x = block.x - player.width;
          player.velocityX = 0;
        } else if (player.velocityX < 0 && player.x > block.x) {
          player.x = block.x + block.width;
          player.velocityX = 0;
        }
      }
    }



    // Initialize game start time on first frame
    if (gameStartTimeRef.current === 0) {
      gameStartTimeRef.current = currentTime;
    }
    
    const gameElapsedTime = currentTime - gameStartTimeRef.current;

    // Update all characters
    for (const character of gameState.characters) {
      character.update(clampedDeltaTime * 1000, gameElapsedTime); // Convert to milliseconds
    }

    // No ground rendering - transparent background

    // Draw characters with landing page styling and jump animations
    for (const character of gameState.characters) {
      // Update character color based on theme to match landing page
      const isDarkMode = document.documentElement.classList.contains('dark');
      character.textColor = isDarkMode ? '#D1D5DB' : '#6B7280'; // text-gray-300 : text-gray-500
      character.render(ctx);
    }

    // Draw player as a round smiley face with bop animation
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2 - 10;
    const baseRadius = (Math.min(player.width, player.height) / 2) * 1.1; // 10% bigger
    const animatedRadius = baseRadius * player.bopAnimation.scale; // Apply bop animation scale
    
    // Get the block styling for consistent outline
    const isDarkMode = document.documentElement.classList.contains('dark');
    const blockBorderColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
    const blockBorderWidth = 1;
    
    // Save context for scaling
    ctx.save();
    
    // Draw main circle (face)
    ctx.beginPath();
    ctx.arc(centerX, centerY, animatedRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 0, 0.8)"; // Yellow face with 80% transparency
    ctx.fill();
    ctx.strokeStyle = blockBorderColor; // Same color as blocks
    ctx.lineWidth = blockBorderWidth; // Same width as blocks
    ctx.stroke();
    
    // Draw left eye (scaled with animation)
    const eyeOffsetX = animatedRadius * 0.3;
    const eyeOffsetY = animatedRadius * 0.25;
    const eyeWidth = animatedRadius * 0.15;
    const eyeHeight = animatedRadius * 0.3;
    
    ctx.beginPath();
    ctx.ellipse(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    
    // Draw right eye (scaled with animation)
    ctx.beginPath();
    ctx.ellipse(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    
    // Draw smile (arc) (scaled with animation)
    const smileRadius = animatedRadius * 0.5;
    const smileStartAngle = Math.PI * 0.2;
    const smileEndAngle = Math.PI * 0.8;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY + animatedRadius * 0.1, smileRadius, smileStartAngle, smileEndAngle);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3 * player.bopAnimation.scale; // Scale line width too
    ctx.lineCap = "round";
    ctx.stroke();
    
    // Restore context
    ctx.restore();

    animationRef.current = requestAnimationFrame(gameLoop);
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas || !gameStateRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const touches = Array.from(e.touches);

    // Reset touch controls
    gameStateRef.current.touchControls = {
      left: false,
      right: false,
      jump: false,
    };

    // Two finger jump
    if (touches.length >= 2) {
      gameStateRef.current.touchControls.jump = true;
      return;
    }

    // Single finger left/right
    if (touches.length === 1) {
      const touch = touches[0];
      const x = touch.clientX - rect.left;
      const centerX = canvas.width / 2;

      if (x < centerX) {
        gameStateRef.current.touchControls.left = true;
      } else {
        gameStateRef.current.touchControls.right = true;
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (!gameStateRef.current) return;

    // Reset all touch controls when touches end
    if (e.touches.length === 0) {
      gameStateRef.current.touchControls = {
        left: false,
        right: false,
        jump: false,
      };
    }
  }, []);

  // Keyboard event handlers
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!gameStateRef.current) return;
    gameStateRef.current.keys[e.key] = true;
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (!gameStateRef.current) return;
    gameStateRef.current.keys[e.key] = false;
  }, []);

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up canvas for transparency
    const ctx = canvas.getContext("2d", { alpha: true });
    if (ctx) {
      ctx.globalCompositeOperation = "source-over";
      // Ensure transparent background from start
      ctx.save();
      ctx.globalCompositeOperation = "copy";
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    handleResize();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false,
    });

    // Start game loop
    gameLoop();

    return () => {
      // Cleanup
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", (e) => e.preventDefault());

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    gameLoop,
    handleResize,
    handleKeyDown,
    handleKeyUp,
    handleTouchStart,
    handleTouchEnd,
  ]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-auto bg-transparent"
        style={{
          touchAction: "none",
          backgroundColor: "transparent",
        }}
      />

    </div>
  );
}
