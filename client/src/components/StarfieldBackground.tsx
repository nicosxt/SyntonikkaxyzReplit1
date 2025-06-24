import { useEffect, useRef } from "react";

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
  theme?: "light" | "dark";
}

export default function StarfieldBackground({
  className = "",
  theme = "dark",
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear any existing content first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If light mode, keep canvas clear and stop animation
    if (theme === "light") {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // Set fixed canvas size to avoid constant resizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars once
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 160; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.3,
          opacity: Math.random(),
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
          fadeSpeed: Math.random() * 0.001 + 0.005,
        });
      }
    };

    initStars();

    // Animation loop
    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Update opacity for blinking effect
        star.opacity += star.fadeDirection * star.fadeSpeed;

        // Reverse direction when reaching limits
        if (star.opacity <= 0) {
          star.opacity = 0;
          star.fadeDirection = 1;
        } else if (star.opacity >= 1) {
          star.opacity = 1;
          star.fadeDirection = -1;
        }

        // Draw star with enhanced visibility
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add a subtle glow for visibility
        if (star.opacity > 0.5) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(); // Reinitialize stars for new canvas size
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Clear canvas on cleanup
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 15,
        pointerEvents: "none",
        display: theme === "dark" ? "block" : "none",
      }}
    />
  );
}
