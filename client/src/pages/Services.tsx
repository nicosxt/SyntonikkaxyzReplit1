import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay: number;
  letterSpeed?: number;
  startOffset?: number;
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

function AnimatedText({ text, className = "", delay, letterSpeed = 50, startOffset = 0 }: AnimatedTextProps) {
  const [globalVisibleLetters, setGlobalVisibleLetters] = useState(0);
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

    const timer = setTimeout(() => {
      setGlobalVisibleLetters(prev => prev + 1);
    }, letterSpeed);

    return () => clearTimeout(timer);
  }, [isStarted, globalVisibleLetters, letterSpeed]);

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
            const globalIndex = startOffset + originalIndex;
            const isVisible = globalIndex < globalVisibleLetters;
            return (
              <span
                key={originalIndex}
                className={`inline-block transition-all duration-300 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${Math.max(0, (globalIndex - globalVisibleLetters) * 20)}ms`
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

const services = [
  "Graphics Design",
  "Web Design",
  "Logo & Branding",
  "Art Direction",
  "AR / VR",
  "Experience Design",
  "Consulting",
  "Surprises! 🪄",
];

export default function Services() {
  const { isLoaded, getAnimationClasses } = usePageAnimation({ delay: 200, staggerDelay: 150 });

  return (
    <div
      className="min-h-screen max-w-4xl mx-auto flex flex-col justify-center"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
          <AnimatedText 
            text="Interdisciplinary" 
            className="italic font-light text-gray-800 dark:text-white"
            delay={300}
            letterSpeed={35}
          />
          <AnimatedText 
            text=" and " 
            className=""
            delay={900}
            letterSpeed={40}
          />
          <AnimatedText 
            text="Comprehensive" 
            className="italic font-light text-gray-800 dark:text-white"
            delay={1100}
            letterSpeed={35}
          />
          <AnimatedText 
            text=" feel-good, bespoke designs for cutting-edge ideas." 
            className=""
            delay={1800}
            letterSpeed={30}
          />
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((service, index) => {
          const animationProps = getAnimationClasses(index + 1, 'slide-in-up');
          return (
            <div 
              key={index} 
              className={`service-item ${animationProps.className}`}
              style={animationProps.style}
            >
              <button className="service-button hover:scale-105 transition-all duration-200">{service}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
