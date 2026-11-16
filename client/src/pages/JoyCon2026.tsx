import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// JoyCon 2026 — a Flash-game-style island map of San Francisco. The island is
// one background image; every ride is its own transparent sprite placed on top
// as a button. Clicking a ride highlights it and pops a speech bubble.

const BASE = "/images/joycon2026";

// Native size of the island artwork. Ride positions below are percentages of it.
const STAGE_W = 1600;
const STAGE_H = 893; // island art is 2752x1536

type Ride = {
  id: string;
  name: string;
  blurb: string;
  img: string;
  // Bottom-center of the sprite, in % of the stage.
  x: number;
  y: number;
  // Sprite width in % of the stage width; ar = height / width of the trimmed art.
  w: number;
  ar: number;
  bob?: boolean;
};

const RIDES: Ride[] = [
  {
    id: "sermon",
    name: "Sunday Sermon",
    blurb: "A church that helps you stay awake. Climb the beam, take a pew, and come down a little more here than you went up.",
    img: `${BASE}/sunday-sermon.webp`,
    x: 55.5,
    y: 31,
    w: 11,
    ar: 1016 / 736,
    bob: true,
  },
  {
    id: "safari",
    name: "Joy Safaris",
    blurb: "Mike Wang and Cyane Bannister, in their finest zoo suits, lead a binocular tour of the wildest joy in the city. Keep your eyes peeled.",
    img: `${BASE}/joy-safaris.webp`,
    x: 28.8,
    y: 52,
    w: 17,
    ar: 983 / 1013,
  },
  {
    id: "chocolate",
    name: "Chocolate Circle",
    blurb: "Sit down, sip cacao, look the person next to you in the eye. The mountain in the middle is for sharing.",
    img: `${BASE}/chocolate-circle.webp`,
    x: 51,
    y: 52.5,
    w: 17,
    ar: 882 / 976,
  },
  {
    id: "tables",
    name: "Open Tables",
    blurb: "Flowers on, candles lit, every seat empty. Pull up a chair next to someone you haven't met yet.",
    img: `${BASE}/open-tables.webp`,
    x: 72.8,
    y: 51,
    w: 17,
    ar: 702 / 911,
  },
  {
    id: "theater",
    name: "Mystery Theater",
    blurb: "Masks on. Ghosts wander the aisles, a guy in flannel plays the soundtrack, and nobody is quite sure what happens next.",
    img: `${BASE}/mystery-theater.webp`,
    x: 51,
    y: 80,
    w: 16,
    ar: 957 / 929,
  },
];

// Hard-edged "cel" outline: stacked zero-blur drop shadows, no glow.
const OUTLINE_HOVER =
  "drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff)";
const OUTLINE_ACTIVE =
  "drop-shadow(4px 0 0 #ffe14d) drop-shadow(-4px 0 0 #ffe14d) drop-shadow(0 4px 0 #ffe14d) drop-shadow(0 -4px 0 #ffe14d) drop-shadow(3px 0 0 #111) drop-shadow(-3px 0 0 #111) drop-shadow(0 3px 0 #111) drop-shadow(0 -3px 0 #111)";

function useStageScale() {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return scale;
}

export default function JoyCon2026() {
  const scale = useStageScale();
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "JoyCon SF 2026";
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@700;800&display=swap";
    document.head.appendChild(font);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.title = prevTitle;
      font.remove();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = useCallback((id: string) => setActive(a => (a === id ? null : id)), []);
  const current = RIDES.find(r => r.id === active) ?? null;

  const enterFullscreen = () => {
    const el = rootRef.current;
    if (!document.fullscreenElement && el?.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  return (
    <div
      ref={rootRef}
      className="joycon fixed inset-0 overflow-hidden select-none"
      style={{ background: "var(--jc-ocean)", fontFamily: "'Nunito', system-ui, sans-serif" }}
      onClick={() => setActive(null)}
    >
      <style>{CSS}</style>

      {/* Island stage, scaled to fit the viewport; the ocean colour fills the rest. */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <img
          src={`${BASE}/island.webp`}
          alt="A cartoon island shaped like San Francisco"
          className="absolute inset-0 w-full h-full pointer-events-none"
          draggable={false}
        />

        {RIDES.map((r, i) => {
          const isActive = active === r.id;
          const isHover = hover === r.id;
          return (
            <button
              key={r.id}
              type="button"
              aria-label={r.name}
              aria-pressed={isActive}
              className="jc-ride absolute"
              style={{
                left: `${r.x}%`,
                top: `${r.y}%`,
                width: `${r.w}%`,
                transform: "translate(-50%, -100%)",
                zIndex: isActive ? 150 : Math.round(r.y),
                animationDelay: `${i * 90}ms`,
              }}
              onClick={e => {
                e.stopPropagation();
                toggle(r.id);
              }}
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(h => (h === r.id ? null : h))}
              onFocus={() => setHover(r.id)}
              onBlur={() => setHover(h => (h === r.id ? null : h))}
            >
              <img
                src={r.img}
                alt=""
                draggable={false}
                className={`w-full h-auto block ${r.bob ? "jc-bob" : ""} ${isActive ? "jc-pop" : ""}`}
                style={{
                  filter: isActive ? OUTLINE_ACTIVE : isHover ? OUTLINE_HOVER : "none",
                  opacity: active && !isActive ? 0.85 : 1,
                  transition: "opacity 200ms, transform 160ms",
                  transform: isHover && !isActive ? "translateY(-6px)" : undefined,
                }}
              />
            </button>
          );
        })}

        {current && (() => {
          // Sprite top edge in % of stage height; flip the bubble below if there's no room above.
          const spriteTop = current.y - current.w * current.ar * (STAGE_W / STAGE_H);
          const below = spriteTop < 26;
          const bx = Math.min(Math.max(current.x, 13), 87);
          return (
            <div
              key={current.id}
              className={`jc-bubble absolute ${below ? "is-below" : ""}`}
              role="dialog"
              aria-label={current.name}
              onClick={e => e.stopPropagation()}
              style={{ left: `${bx}%`, top: `${below ? current.y + 1.5 : spriteTop + 2}%`, zIndex: 200 }}
            >
              <div className="jc-bubble-body">
                <button className="jc-close" aria-label="Close" onClick={() => setActive(null)}>
                  ×
                </button>
                <h2 className="jc-title">{current.name}</h2>
                <p className="jc-blurb">{current.blurb}</p>
              </div>
              <span className="jc-tail" style={{ left: `calc(50% + ${(current.x - bx) * (STAGE_W / 100)}px)` }} />
            </div>
          );
        })()}
      </div>

      {/* HUD — title banner */}
      <div className="absolute top-[1.5vh] left-[2vh] z-50 flex flex-col items-start gap-[1vh]">
        <h1 className="jc-banner">JOYCON SF</h1>
        <a
          href="https://joyconsf.netlify.app/weekend.html"
          target="_blank"
          rel="noreferrer"
          className="jc-chip"
          onClick={e => e.stopPropagation()}
        >
          Jan 16–17 · Save a seat ↗
        </a>
      </div>
      <p className="jc-hint absolute bottom-[calc(1.5vh+clamp(64px,11vh,108px)+1.2vh)] left-0 right-0 text-center z-40 pointer-events-none">
        {active ? "" : "Click a ride to see what it is"}
      </p>

      <button
        className="jc-chip absolute top-[1.5vh] right-[1.5vh] z-50"
        onClick={e => {
          e.stopPropagation();
          enterFullscreen();
        }}
        aria-label="Toggle fullscreen"
      >
        ⛶
      </button>

      {/* HUD — ride hotbar */}
      <nav
        className="absolute bottom-[1.5vh] left-0 right-0 flex justify-center gap-[1vh] z-50 px-4"
        onClick={e => e.stopPropagation()}
      >
        {RIDES.map(r => (
          <button
            key={r.id}
            type="button"
            className={`jc-slot ${active === r.id ? "is-active" : ""}`}
            onClick={() => toggle(r.id)}
            onMouseEnter={() => setHover(r.id)}
            onMouseLeave={() => setHover(h => (h === r.id ? null : h))}
          >
            <img src={r.img} alt="" draggable={false} />
            <span>{r.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

const CSS = `
.joycon {
  --jc-ocean: #4cc2f4;
  --jc-ink: #111;
  --jc-green: #3fd14a;
  --jc-green-dark: #1f9a2b;
  --jc-yellow: #ffe14d;
}
.joycon button { background: none; border: 0; padding: 0; cursor: pointer; font: inherit; color: inherit; }
.jc-ride { outline: none; animation: jc-drop 520ms cubic-bezier(.3,1.6,.5,1) both; }
.jc-ride:focus-visible img { filter: ${OUTLINE_HOVER} !important; }
@keyframes jc-drop { from { opacity: 0; translate: 0 -40px; } to { opacity: 1; translate: 0 0; } }
.jc-bob { animation: jc-bob 3.2s ease-in-out infinite; }
@keyframes jc-bob { 0%,100% { translate: 0 0; } 50% { translate: 0 -10px; } }
.jc-pop { animation: jc-pop 360ms cubic-bezier(.3,1.8,.5,1); }
.jc-bob.jc-pop { animation: jc-pop 360ms cubic-bezier(.3,1.8,.5,1), jc-bob 3.2s ease-in-out 360ms infinite; }
@keyframes jc-pop { 0% { scale: 1; } 40% { scale: 1.12 .92; } 70% { scale: .96 1.06; } 100% { scale: 1; } }

.jc-bubble { transform: translate(-50%, -100%); width: 360px; animation: jc-bubble-in 260ms cubic-bezier(.3,1.7,.5,1) both; transform-origin: 50% 100%; }
@keyframes jc-bubble-in { from { opacity: 0; scale: .6; } to { opacity: 1; scale: 1; } }
.jc-bubble-body {
  position: relative; background: #fff; border: 4px solid var(--jc-ink); border-radius: 26px;
  padding: 18px 22px 20px; box-shadow: 6px 6px 0 var(--jc-ink);
}
.jc-tail {
  position: absolute; bottom: -22px; width: 0; height: 0; transform: translateX(-50%);
  border-left: 16px solid transparent; border-right: 16px solid transparent; border-top: 24px solid var(--jc-ink);
}
.jc-tail::after {
  content: ""; position: absolute; left: -10px; top: -29px;
  border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 16px solid #fff;
}
.jc-bubble.is-below { transform: translate(-50%, 22px); transform-origin: 50% 0; }
.jc-bubble.is-below .jc-tail { bottom: auto; top: -22px; border-top: 0; border-bottom: 24px solid var(--jc-ink); }
.jc-bubble.is-below .jc-tail::after { top: 9px; border-top: 0; border-bottom: 16px solid #fff; }
.jc-hint { font-family: 'Lilita One', 'Nunito', sans-serif; font-size: clamp(14px, 2.2vh, 20px); color: #fff;
  -webkit-text-stroke: 2.5px var(--jc-ink); paint-order: stroke fill; letter-spacing: .5px; }
.jc-title { font-family: 'Lilita One', 'Nunito', sans-serif; font-size: 34px; line-height: 1; color: #ff4fa3;
  -webkit-text-stroke: 1.5px var(--jc-ink); paint-order: stroke fill; text-shadow: 3px 3px 0 var(--jc-ink); margin: 0 28px 10px 0; letter-spacing: .5px; }
.jc-blurb { font-size: 19px; line-height: 1.35; font-weight: 700; color: #222; margin: 0; }
.jc-close { position: absolute; top: 8px; right: 12px; font-size: 30px !important; line-height: 1; font-weight: 800; color: var(--jc-ink); }
.jc-close:hover { color: #ff4fa3; }

.jc-banner {
  font-family: 'Lilita One', 'Nunito', sans-serif; font-size: clamp(30px, 5.2vh, 56px); line-height: 1; margin: 0;
  color: #fff; letter-spacing: 2px; -webkit-text-stroke: 3px var(--jc-ink); paint-order: stroke fill;
  text-shadow: 0 5px 0 var(--jc-ink);
}
.jc-chip {
  font-family: 'Lilita One', 'Nunito', sans-serif; font-size: clamp(13px, 2vh, 18px); color: var(--jc-ink) !important;
  background: var(--jc-yellow) !important; border: 3px solid var(--jc-ink) !important; border-radius: 999px;
  padding: 6px 14px !important; box-shadow: 0 4px 0 var(--jc-ink); text-decoration: none; transition: translate 120ms, box-shadow 120ms;
}
.jc-chip:hover { translate: 0 2px; box-shadow: 0 2px 0 var(--jc-ink); }

.jc-slot {
  display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
  width: clamp(64px, 11vh, 108px); height: clamp(64px, 11vh, 108px); padding: 6px !important; flex: 0 0 auto;
  background: var(--jc-green) !important; border: 3px solid var(--jc-ink) !important; border-radius: 14px;
  box-shadow: inset 0 -6px 0 var(--jc-green-dark), 0 4px 0 var(--jc-ink); transition: translate 120ms, box-shadow 120ms, background 120ms;
}
.jc-slot img { width: 80%; height: 0; flex: 1 1 auto; min-height: 0; object-fit: contain; pointer-events: none; }
.jc-slot span { font-family: 'Lilita One', 'Nunito', sans-serif; font-size: clamp(9px, 1.35vh, 13px); line-height: 1.05; color: #fff;
  -webkit-text-stroke: 2px var(--jc-ink); paint-order: stroke fill; text-align: center; margin-top: 2px; }
.jc-slot:hover { translate: 0 -3px; }
.jc-slot.is-active { background: var(--jc-yellow) !important; box-shadow: inset 0 -6px 0 #e0b400, 0 4px 0 var(--jc-ink); translate: 0 -3px; }

@media (prefers-reduced-motion: reduce) {
  .jc-ride, .jc-bob, .jc-pop, .jc-bubble { animation: none !important; }
}
`;
