import { Link } from "wouter";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getLetterSpeed } from "../config/animations";

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

function AnimatedText({ text, className = "", delay, letterSpeed = getLetterSpeed(), startOffset = 0 }: AnimatedTextProps) {
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
  type CharWithIndex = typeof charSpans[0] & { originalIndex: number };
  const wordGroups: { chars: CharWithIndex[]; wordIndex: number }[] = [];
  let currentWord: CharWithIndex[] = [];
  let currentWordIndex = -1;

  charSpans.forEach((span, index) => {
    if (span.wordIndex !== currentWordIndex) {
      if (currentWord.length > 0) {
        wordGroups.push({ chars: currentWord, wordIndex: currentWordIndex });
      }
      currentWord = [];
      currentWordIndex = span.wordIndex;
    }
    currentWord.push({ ...span, originalIndex: index } as CharWithIndex);
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
    { text: "Nico Shi", className: "italic font-light text-gray-800 dark:text-white" },
    { text: " is a multi-disciplinary designer building ", className: "" },
    { text: "Protopian", className: "italic font-light text-gray-800 dark:text-white" },
    { text: " brands with AI, XR, and immersive art.", className: "" }
  ];

  return (
    <div className="h-screen fixed inset-0 flex flex-col justify-center max-w-6xl mx-auto px-4 md:px-8" style={{ marginLeft: '15%', marginRight: '15%' }}>
      
      {/* Left-aligned text section */}
      <div className="mb-12 text-left">
        <span className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          {textParts.map((part, index) => {
            // Calculate cumulative character offset
            const startOffset = textParts.slice(0, index).reduce((acc, prevPart) => acc + prevPart.text.length, 0);
            return (
              <AnimatedText
                key={index}
                text={part.text}
                className={part.className}
                delay={300}
                letterSpeed={30}
                startOffset={startOffset}
              />
            );
          })}
        </span>
      </div>
        
      {/* GAME and MORE Buttons */}
      <div className={`flex justify-between mt-6 transition-all duration-1000 ease-out ${
        isLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '500ms' }}>
        {/* GAME Button - Bottom Left */}
        <Link href="/game">
          <button className="glass-button flex items-center gap-2 text-gray-800 dark:text-white px-4 py-2 hover:scale-105">
            <Gamepad2 className="w-6 h-6 transition-transform duration-300" />
            {/* <span className="text-lg font-light">GAME</span> */}
          </button>
        </Link>
        
        {/* MORE Button - Bottom Right */}
        <Link href="/case-studies">
          <button className="glass-button flex items-center gap-2 text-gray-800 dark:text-white px-4 py-2 hover:translate-x-1 hover:scale-105">
            <span className="text-lg font-light">MORE</span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </div>
  );
}
