import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  fadeDirection: number;
  fadeSpeed: number;
}

interface StarfieldBackgroundProps {
  className?: string;
}

export default function StarfieldBackground({ className = '' }: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3.9 + 0.1, // 0.1 to 4px radius
          opacity: Math.random(),
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
          fadeSpeed: Math.random() * 0.02 + 0.005, // Random fade speed
        });
      }
    };

    initStars();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        // Update opacity for blinking effect
        star.opacity += star.fadeDirection * star.fadeSpeed;

        // Reverse direction when reaching limits
        if (star.opacity <= 0) {
          star.opacity = 0;
          star.fadeDirection = 1;
          // Random delay before starting to fade in
          star.fadeSpeed = Math.random() * 0.02 + 0.005;
        } else if (star.opacity >= 1) {
          star.opacity = 1;
          star.fadeDirection = -1;
          // Random delay before starting to fade out
          star.fadeSpeed = Math.random() * 0.02 + 0.005;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] ${className}`}
      style={{ display: 'block' }}
    />
  );
}