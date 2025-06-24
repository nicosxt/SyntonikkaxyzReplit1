import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay: number;
  letterSpeed?: number;
}

// Utility function to prevent word breaking
function createWordBoundarySpans(text: string) {
  const words = text.split(' ');
  const spans: { char: string; isWordEnd: boolean; wordIndex: number }[] = [];
  
  words.forEach((word, wordIndex) => {
    // Add characters of the word
    for (let i = 0; i < word.length; i++) {
      spans.push({
        char: word[i],
        isWordEnd: i === word.length - 1,
        wordIndex
      });
    }
    
    // Add space after word (except for last word)
    if (wordIndex < words.length - 1) {
      spans.push({
        char: ' ',
        isWordEnd: true,
        wordIndex
      });
    }
  });
  
  return spans;
}

function AnimatedText({ text, className = "", delay, letterSpeed = 50 }: AnimatedTextProps) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const charSpans = createWordBoundarySpans(text);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (visibleLetters < charSpans.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, letterSpeed);

      return () => clearTimeout(timer);
    }
  }, [isStarted, visibleLetters, charSpans.length, letterSpeed]);

  // Group characters by words for proper wrapping
  const wordGroups: { chars: typeof charSpans; wordIndex: number }[] = [];
  let currentWord: typeof charSpans = [];
  let currentWordIndex = -1;

  charSpans.forEach((span, index) => {
    if (span.wordIndex !== currentWordIndex) {
      if (currentWord.length > 0) {
        wordGroups.push({ chars: currentWord, wordIndex: currentWordIndex });
      }
      currentWord = [];
      currentWordIndex = span.wordIndex;
    }
    currentWord.push({ ...span, originalIndex: index });
  });
  
  if (currentWord.length > 0) {
    wordGroups.push({ chars: currentWord, wordIndex: currentWordIndex });
  }

  return (
    <span className={className}>
      {wordGroups.map((wordGroup, groupIndex) => (
        <span key={groupIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
          {wordGroup.chars.map((span, charIndex) => {
            const originalIndex = (span as any).originalIndex;
            return (
              <span
                key={originalIndex}
                className={`inline-block transition-all duration-300 ease-out ${
                  originalIndex < visibleLetters 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${Math.max(0, (originalIndex - visibleLetters) * 20)}ms`
                }}
              >
                {span.char === ' ' ? '\u00A0' : span.char}
              </span>
            );
          })}
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
        <span className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
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
