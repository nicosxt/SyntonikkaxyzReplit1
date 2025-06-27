import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";
import { caseStudiesData } from "../data/caseStudies";
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

export default function CaseStudies() {
  const { isLoaded, getAnimationClasses } = usePageAnimation({ delay: 200 });

  return (
    <div
      className="min-h-screen mx-auto"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="">
        <h1 className="p-4 text-3xl md:text-4xl font-light mb-12 text-gray-800 dark:text-white">
          <AnimatedText 
            text="Case Studies" 
            className=""
            delay={300}
            letterSpeed={40}
          />
        </h1>

        <div className="space-y-[100px]">
          {caseStudiesData.map((caseStudy, index) => {
            const animationProps = getAnimationClasses(index + 1, 'slide-in-up');
            return (
              <Link key={caseStudy.id} href={caseStudy.link}>
                <div 
                  className={`glass-card p-8 cursor-pointer mt-[50px] mb-[50px] hover:scale-105 transition-all duration-300 ${animationProps.className}`}
                  style={animationProps.style}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-800 dark:text-white">
                        {caseStudy.title}
                      </h2>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {caseStudy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-black/10 dark:bg-white/10 rounded-full text-sm text-gray-800 dark:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          ROLE:
                        </p>
                        <p className="text-gray-800 dark:text-white">
                          {caseStudy.role}
                        </p>
                      </div>
                    </div>

                    <div className="glass-card aspect-video flex items-center justify-center">
                      {caseStudy.previewImage ? (
                        <img
                          src={caseStudy.previewImage}
                          alt={`${caseStudy.title} preview`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <span className="text-gray-500">Preview Image</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
