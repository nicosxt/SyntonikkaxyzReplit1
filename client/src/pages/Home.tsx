import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay: number;
  letterSpeed?: number;
}

function AnimatedText({ text, className = "", delay, letterSpeed = 50 }: AnimatedTextProps) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (visibleLetters < text.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, letterSpeed);

      return () => clearTimeout(timer);
    }
  }, [isStarted, visibleLetters, text.length, letterSpeed]);

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ease-out ${
            index < visibleLetters 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${Math.max(0, (index - visibleLetters) * 20)}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const textParts = [
    { text: "Nico Shi", className: "italic font-light text-gray-800 dark:text-white", delay: 300 },
    { text: " is a multi-disciplinary designer building ", className: "", delay: 1000 },
    { text: "Protopian", className: "italic font-light text-gray-800 dark:text-white", delay: 2500 },
    { text: " brands with AI, XR, and immersive art.", className: "", delay: 3200 }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 md:px-8" style={{ marginLeft: '15%', marginRight: '15%' }}>
      
      {/* Left-aligned text section */}
      <div className="mb-12 text-left">
        <span className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
          {textParts.map((part, index) => (
            <AnimatedText
              key={index}
              text={part.text}
              className={part.className}
              delay={part.delay}
              letterSpeed={30}
            />
          ))}
        </span>
      </div>
        
      {/* MORE Button */}
      <div className={`flex justify-end mt-6 transition-all duration-1000 ease-out ${
        isLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '4500ms' }}>
        <Link href="/case-studies">
          <button className="flex items-center gap-2 text-gray-800 dark:text-white hover:opacity-70 transition-all duration-300 hover:translate-x-1 hover:scale-105">
            <span className="text-lg font-light">MORE</span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </div>
  );
}
