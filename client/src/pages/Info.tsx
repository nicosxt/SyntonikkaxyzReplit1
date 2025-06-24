import { usePageAnimation } from "../hooks/usePageAnimation";
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
  const words = text.split(" ");
  const spans: { char: string; isWordEnd: boolean; wordIndex: number; originalIndex?: number }[] = [];

  words.forEach((word, wordIndex) => {
    // Add characters of the word
    for (let i = 0; i < word.length; i++) {
      spans.push({
        char: word[i],
        isWordEnd: i === word.length - 1,
        wordIndex,
      });
    }

    // Add space after word (except for last word)
    if (wordIndex < words.length - 1) {
      spans.push({
        char: " ",
        isWordEnd: true,
        wordIndex,
      });
    }
  });

  return spans;
}

function AnimatedText({
  text,
  className = "",
  delay,
  letterSpeed = getLetterSpeed(),
  startOffset = 0,
}: AnimatedTextProps) {
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
      setGlobalVisibleLetters((prev) => prev + 1);
    }, letterSpeed);

    return () => clearTimeout(timer);
  }, [isStarted, globalVisibleLetters, letterSpeed]);

  // Group characters by words for proper wrapping
  const wordGroups: { chars: { char: string; isWordEnd: boolean; wordIndex: number; originalIndex?: number }[]; wordIndex: number }[] = [];
  let currentWord: { char: string; isWordEnd: boolean; wordIndex: number; originalIndex?: number }[] = [];
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
        <span
          key={groupIndex}
          className="inline-block"
          style={{ whiteSpace: "nowrap" }}
        >
          {wordGroup.chars.map((span, charIndex) => {
            const originalIndex = (span as any).originalIndex;
            const globalIndex = startOffset + originalIndex;
            const isVisible = globalIndex < globalVisibleLetters;
            return (
              <span
                key={originalIndex}
                className={`inline-block transition-all duration-300 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${Math.max(0, (globalIndex - globalVisibleLetters) * 20)}ms`,
                }}
              >
                {span.char === " " ? "\u00A0" : span.char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

const socialLinks = [
  { name: "X", href: "http://x.com/syntonikka/" },
  { name: "Substack", href: "https://agartha1.substack.com/" },
  { name: "Mixcloud", href: "https://www.mixcloud.com/nicole-xin-tong-shi/" },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com/add/nicooo9999?locale=en-US",
  },
  { name: "Instagram", href: "https://www.instagram.com/syntonikka" },
  {
    name: "Resume",
    href: "https://docs.google.com/document/d/10kNPjpL49cTcRf7B8hNdjXJYIqILHR2f4fmwjf1KR_Y/edit?usp=sharing",
  },
];

export default function Info() {
  const { isLoaded, getAnimationClasses } = usePageAnimation({
    delay: 200,
    staggerDelay: 100,
  });

  return (
    <div
      className="min-h-screen mx-auto flex flex-col justify-center"
      style={{ marginLeft: "15%", marginRight: "15%" }}
    >
      <div className="mb-12">
        <div className="mb-8"></div>

        <div className="mb-8">
          <p className="text-3xl md:text-4xl font-light text-gray-600 dark:text-gray-300 block mt-2">
            <AnimatedText
              text="Magic happens when "
              className=""
              delay={300}
              letterSpeed={40}
            />
            <AnimatedText
              text="Raw Intuitive Human Creativity"
              className="italic font-light text-gray-800 dark:text-white"
              delay={1200}
              letterSpeed={30}
            />
            <AnimatedText
              text=" meets "
              className=""
              delay={2400}
              letterSpeed={40}
            />
            <AnimatedText
              text="Cutting-Edge Frontier Technology"
              className="italic font-light text-gray-800 dark:text-white"
              delay={2800}
              letterSpeed={30}
            />
            <AnimatedText text="." className="" delay={3800} letterSpeed={40} />
          </p>
        </div>

        {/* Scrollable content section */}
        <div
          className={`max-h-96 overflow-y-auto content-block p-6 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="space-y-4" style={{ color: "var(--text-muted)" }}>
            <h3
              className="text-lg font-medium mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              DESIGN PHILOSOPHY
            </h3>
            <p>
              I believe great designs should be both intellectually stimulating
              and emotionally resonant. My work explores the intersection of
              technology and humanity—--always asking how we can use design to
              create more flourishing futures.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              CREATIVE PROCESS
            </h3>
            <p>
              My process begins with deep research and a thorough understanding
              of the problem space. Collaboration is key---I work closely with
              clients, partners, and other creatives to ensure the final outcome
              aligns with the mission and exceeds expectations.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              AT THE CUTTING EDGE
            </h3>
            <p>
              I'm passionate about emerging technologies like AI, XR, and
              immersive experiences. These tools are not just technical
              solutions but also new languages for creative expression. I stay
              at the forefront of these developments to bring cutting-edge
              capabilities to every project.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              A CREATIVE LIFESTYLE
            </h3>
            <p>
              Inspiration comes from everywhere - nature, science, technology,
              magical gatherings, archetypical stories, meditation and peak
              experiences, diverse cultures...
              <br />
              I'm always immersed in narratives that inspire new forms of art,
              and 'ways of being' in flourishing environments.
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap gap-4 items-center">
        {socialLinks.map((link, index) => {
          const animationProps = getAnimationClasses(index + 5, "slide-in-up");
          return (
            <a
              key={link.name}
              href={link.href}
              className={`text-center py-2 px-3 hover:opacity-70 hover:scale-105 transition-all duration-200 ${animationProps.className}`}
              style={{
                color: "var(--text-secondary)",
                ...animationProps.style,
              }}
            >
              {link.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
