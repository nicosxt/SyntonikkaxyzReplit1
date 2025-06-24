import { usePageAnimation } from "../hooks/usePageAnimation";
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

const socialLinks = [
  { name: "X", href: "http://x.com/syntonikka/" },
  { name: "Substack", href: "https://agartha1.substack.com/" },
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
  const { isLoaded, getAnimationClasses } = usePageAnimation({ delay: 200, staggerDelay: 100 });

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
            <AnimatedText 
              text="." 
              className=""
              delay={3800}
              letterSpeed={40}
            />
          </p>
        </div>

        {/* Scrollable content section */}
        <div 
          className={`max-h-96 overflow-y-auto content-block p-6 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="space-y-4" style={{ color: "var(--text-muted)" }}>
            <h3
              className="text-lg font-medium mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Design Philosophy
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
              Creative Process
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
              Staying at the Cutting Edge
            </h3>
            <p>
              I’m passionate about emerging technologies like AI, XR, and
              immersive experiences. These tools are not just technical
              solutions but also new languages for creative expression. I stay
              at the forefront of these developments to bring cutting-edge
              capabilities to every project.
            </p>

            <h3
              className="text-lg font-medium mb-3 mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              A Creative Lifestyle
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-md">
        {socialLinks.map((link, index) => {
          const animationProps = getAnimationClasses(index + 5, 'slide-in-up');
          return (
            <a
              key={link.name}
              href={link.href}
              className={`text-center py-2 hover:opacity-70 hover:scale-105 transition-all duration-200 ${animationProps.className}`}
              style={{ 
                color: "var(--text-secondary)",
                ...animationProps.style
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
