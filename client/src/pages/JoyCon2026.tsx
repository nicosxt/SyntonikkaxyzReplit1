import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FLOWERS, PARADE, THEATER, TRACK_AR, TRACK_PATH } from "./joycon2026.data";

// JoyCon 2026 — a Moebius-style island map of San Francisco.
// Layers, bottom to top:
//   1. the empty island (one background image), with drifting clouds, fireworks and swaying flowers
//   2. the rides, each its own transparent sprite and a button (click → highlight + speech bubble).
//      Several are built from parts so they can move: coaster carts, parade walkers, stage performers.
//   3. the sky: balloons, kites and a hot-air balloon drifting across the whole screen.
//      They can be dragged and thrown; tapping a party balloon pops it.

const BASE = "/images/joycon2026";
// Bump when artwork files are replaced under the same name, so browsers fetch the new ones.
const V = "?v=4";

// Native size of the island artwork (2752x1536). Ride positions are percentages of it.
const STAGE_W = 1600;
const STAGE_H = 893;

type Spot = { x: number; y: number; w: number }; // bottom-center in % of stage, width in % of stage width

type Ride = {
  id: string;
  num: string;
  name: string;
  blurb: string;
  img: string;
  ar: number; // sprite height / width
  spots: Spot[];
};

const RIDES: Ride[] = [
  {
    id: "sermon",
    num: "I",
    name: "Sunday Sermon",
    blurb: "A church for staying awake. Sit down, breathe, and if you start to float a little, let it happen.",
    img: `${BASE}/sunday-sermon.webp${V}`,
    ar: 1.308,
    spots: [{ x: 59.9, y: 52, w: 18.4 }],
  },
  {
    id: "coaster",
    num: "II",
    name: "The Joy Ride",
    blurb: "The thread that loops the whole weekend together. Arms up for the dip past the church.",
    img: `${BASE}/joy-ride.webp${V}`,
    ar: TRACK_AR,
    spots: [{ x: 48.5, y: 62.5, w: 42 }],
  },
  {
    id: "chocolate",
    num: "III",
    name: "Chocolate Circle",
    blurb: "Sit down, sip cacao, look the person next to you in the eye. The mountain in the middle is for sharing.",
    img: `${BASE}/chocolate-circle.webp${V}`,
    ar: 0.563,
    spots: [{ x: 36.3, y: 72, w: 19.5 }],
  },
  {
    id: "safari",
    num: "IV",
    name: "Joy Safaris",
    blurb: "Mike and Cyane lead the parade, binoculars up, through the wildest joy in the city. Feathers encouraged.",
    img: `${BASE}/joy-safaris.webp${V}`,
    ar: PARADE.ar,
    spots: [{ x: 53, y: 76, w: 13 }],
  },
  {
    id: "theater",
    num: "V",
    name: "Mystery Theater",
    blurb: "Masks on. A ghost wanders on stage, a guy in flannel plays the soundtrack, and nobody is sure what happens next.",
    img: `${BASE}/mystery-theater.webp${V}`,
    ar: THEATER.ar,
    spots: [{ x: 75.6, y: 70.5, w: 13 }],
  },
  {
    id: "tables",
    num: "VI",
    name: "Open Tables",
    blurb: "Dinner tables pop up all over the city: a hilltop, a park, the end of the pier. Candles lit, a seat saved for someone new.",
    img: `${BASE}/open-table.webp${V}`,
    ar: 0.83,
    spots: [
      { x: 43, y: 33.5, w: 4.3 },
      { x: 36.2, y: 45.6, w: 4.3 },
      { x: 74, y: 50.5, w: 4.3 },
      { x: 62.5, y: 74.4, w: 4.3 },
      { x: 82, y: 73.5, w: 4.3 },
      { x: 26.2, y: 89.6, w: 4.3 },
    ],
  },
];

// Ligne-claire highlight: hard ink + paper outline, no soft glow.
const OUTLINE_HOVER =
  "drop-shadow(2px 0 0 #fbf3df) drop-shadow(-2px 0 0 #fbf3df) drop-shadow(0 2px 0 #fbf3df) drop-shadow(0 -2px 0 #fbf3df)";
const OUTLINE_ACTIVE =
  "drop-shadow(3px 0 0 #fbf3df) drop-shadow(-3px 0 0 #fbf3df) drop-shadow(0 3px 0 #fbf3df) drop-shadow(0 -3px 0 #fbf3df) drop-shadow(2px 0 0 #2b2320) drop-shadow(-2px 0 0 #2b2320) drop-shadow(0 2px 0 #2b2320) drop-shadow(0 -2px 0 #2b2320)";

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
  const [active, setActive] = useState<{ id: string; spot: number } | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "JoyCon SF 2026";
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Patrick+Hand+SC&display=swap";
    document.head.appendChild(font);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.title = prevTitle;
      font.remove();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = useCallback(
    (id: string, spot = 0) => setActive(a => (a && a.id === id && a.spot === spot ? null : { id, spot })),
    [],
  );
  const current = active ? RIDES.find(r => r.id === active.id) ?? null : null;

  const enterFullscreen = () => {
    const el = rootRef.current;
    if (!document.fullscreenElement && el?.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  let bubble: JSX.Element | null = null;
  if (current && active) {
    const s = current.spots[active.spot];
    const spriteTop = s.y - s.w * current.ar * (STAGE_W / STAGE_H);
    const below = spriteTop < 30;
    const bx = Math.min(Math.max(s.x, 13), 87);
    bubble = (
      <div
        key={`${current.id}-${active.spot}`}
        className={`jc-bubble absolute ${below ? "is-below" : ""}`}
        role="dialog"
        aria-label={current.name}
        onClick={e => e.stopPropagation()}
        style={{ left: `${bx}%`, top: `${below ? s.y + 1 : Math.max(spriteTop, 2) + 1}%`, zIndex: 200 }}
      >
        <div className="jc-bubble-body">
          <button className="jc-close" aria-label="Close" onClick={() => setActive(null)}>
            ×
          </button>
          <p className="jc-num">{current.num}</p>
          <h2 className="jc-title">{current.name}</h2>
          <p className="jc-blurb">{current.blurb}</p>
        </div>
        <span className="jc-tail" style={{ left: `calc(50% + ${(s.x - bx) * (STAGE_W / 100)}px)` }} />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="joycon fixed inset-0 overflow-hidden select-none" onClick={() => setActive(null)}>
      <style>{CSS}</style>

      {/* Island stage, scaled to fit the viewport; sky and sea colours fill the rest. */}
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
          src={`${BASE}/island.webp${V}`}
          alt="A hand-drawn island shaped like San Francisco"
          className="jc-island absolute inset-0 w-full h-full pointer-events-none"
          draggable={false}
        />

        <Clouds />
        <Fireworks />
        <Flowers />

        {RIDES.flatMap((r, ri) =>
          r.spots.map((s, si) => {
            const key = `${r.id}-${si}`;
            const isActive = active?.id === r.id && active.spot === si;
            const isHover = hover === key;
            return (
              <button
                key={key}
                type="button"
                aria-label={r.spots.length > 1 ? `${r.name} ${si + 1}` : r.name}
                aria-pressed={isActive}
                className="jc-ride absolute"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.w}%`,
                  transform: "translate(-50%, -100%)",
                  // The coaster runs in front of the church but behind everything nearer the viewer.
                  zIndex: isActive ? 150 : r.id === "coaster" ? 56 : Math.round(s.y),
                  animationDelay: `${250 + ri * 120 + si * 60}ms`,
                  // The coaster's box covers half the island, so only the track itself takes clicks.
                  pointerEvents: r.id === "coaster" ? "none" : undefined,
                }}
                onClick={e => {
                  e.stopPropagation();
                  toggle(r.id, si);
                }}
                onMouseEnter={() => setHover(key)}
                onMouseLeave={() => setHover(h => (h === key ? null : h))}
                onFocus={() => setHover(key)}
                onBlur={() => setHover(h => (h === key ? null : h))}
              >
                <div
                  className="jc-art"
                  style={{
                    filter: isActive ? OUTLINE_ACTIVE : isHover ? OUTLINE_HOVER : "none",
                    opacity: active && !isActive ? 0.8 : 1,
                    transform: isActive ? "translateY(-6px)" : isHover ? "translateY(-3px)" : undefined,
                  }}
                >
                  {r.id === "coaster" ? (
                    <Coaster src={r.img} />
                  ) : r.id === "safari" ? (
                    <Parade />
                  ) : r.id === "theater" ? (
                    <Theater src={r.img} />
                  ) : (
                    <img src={r.img} alt="" draggable={false} className="w-full h-auto block" />
                  )}
                </div>
              </button>
            );
          }),
        )}
      </div>

      <Sky />

      {/* The speech bubble lives in its own copy of the stage so it sits above the drifting sky. */}
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center",
          zIndex: 48,
        }}
      >
        {bubble}
      </div>

      {/* HUD — title */}
      <div className="jc-head absolute z-50 flex flex-col items-start">
        <h1 className="jc-banner">JoyCon</h1>
        <p className="jc-sub">a festival of joy · San Francisco</p>
        <a
          href="https://joyconsf.netlify.app/weekend.html"
          target="_blank"
          rel="noreferrer"
          className="jc-chip"
          onClick={e => e.stopPropagation()}
        >
          Jan 16 – 17 · Save a seat ↗
        </a>
      </div>

      <button
        className="jc-chip jc-icon absolute z-50"
        onClick={e => {
          e.stopPropagation();
          enterFullscreen();
        }}
        aria-label="Toggle fullscreen"
      >
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8V3h5M12 3h5v5M17 12v5h-5M8 17H3v-5" />
        </svg>
      </button>

      {/* HUD — ride bar */}
      <nav className="jc-bar absolute left-0 right-0 flex justify-center z-50 px-3" onClick={e => e.stopPropagation()}>
        {RIDES.map(r => (
          <button
            key={r.id}
            type="button"
            className={`jc-slot ${active?.id === r.id ? "is-active" : ""}`}
            onClick={() => toggle(r.id, 0)}
            onMouseEnter={() => setHover(`${r.id}-0`)}
            onMouseLeave={() => setHover(h => (h === `${r.id}-0` ? null : h))}
          >
            <span className="jc-slot-art">
              <img src={r.img} alt="" draggable={false} />
            </span>
            <span className="jc-slot-name">{r.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* Island life: clouds, fireworks, flowers                              */
/* ------------------------------------------------------------------ */

// Only the clouds that are whole in the artwork (two were cut off by its edge), reused at
// different sizes, heights and tints. Each starts part-way across so the sky is never empty.
const SKY_CLOUDS = [
  { n: 5, w: 17.5, y: 9.5, at: 0.12, flip: false, hue: 0 },
  { n: 3, w: 11, y: 4, at: 0.62, flip: false, hue: 0 },
  { n: 2, w: 6, y: 3.5, at: 0.45, flip: false, hue: 0 },
  { n: 5, w: 13, y: 2, at: 0.85, flip: true, hue: -40 },
  { n: 3, w: 15, y: 13, at: 0.98, flip: true, hue: -55 },
  { n: 2, w: 8, y: 16, at: 0.28, flip: true, hue: -30 },
];

function Clouds() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {SKY_CLOUDS.map((c, i) => {
        const dur = 160 + i * 22; // seconds to cross the sky
        return (
          <div
            key={i}
            className="jc-cloud absolute"
            style={{ top: `${c.y}%`, width: `${c.w}%`, animationDuration: `${dur}s`, animationDelay: `${-c.at * dur}s` }}
          >
            <img
              src={`${BASE}/cloud-${c.n}.webp${V}`}
              alt=""
              draggable={false}
              className="w-full h-auto block"
              style={{ transform: c.flip ? "scaleX(-1)" : undefined, filter: c.hue ? `hue-rotate(${c.hue}deg)` : undefined }}
            />
          </div>
        );
      })}
    </div>
  );
}

function Flowers() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      {FLOWERS.map(([x, y, w, h], i) => (
        <i
          key={i}
          className="jc-flower absolute block"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${w}%`,
            height: `${h}%`,
            backgroundImage: `url(${BASE}/flowers.webp${V})`,
            backgroundSize: `${10000 / w}% ${10000 / h}%`,
            backgroundPosition: `${(x / (100 - w)) * 100}% ${(y / (100 - h)) * 100}%`,
            animationDuration: `${1.7 + ((i * 37) % 13) / 9}s`,
            animationDelay: `${-((i * 53) % 29) / 10}s`,
          }}
        />
      ))}
    </div>
  );
}

const FW_COLORS = ["#ef8fb4", "#f5a35a", "#b48ad8", "#f3c44e", "#ee7f6d"];

type Rocket = { x: number; y0: number; y1: number; r: number; color: string; start: number; sway: number };

function newRocket(now: number, delay: number): Rocket {
  return {
    x: 0.08 + Math.random() * 0.84,
    y0: 0.34,
    y1: 0.05 + Math.random() * 0.15,
    r: 42 + Math.random() * 34,
    color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
    start: now + delay,
    sway: (Math.random() - 0.5) * 30,
  };
}

// Fireworks shoot up from behind the island, burst into dashed rays, and fade.
function Fireworks() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const K = 2;
    cv.width = STAGE_W * K;
    cv.height = STAGE_H * K;
    const RISE = 0.9;
    const BURST = 1.5;
    let rockets = [0, 0.9, 1.9, 3.1].map(d => newRocket(performance.now() / 1000, d));
    let raf = 0;
    const tick = (ms: number) => {
      const now = ms / 1000;
      ctx.setTransform(K, 0, 0, K, 0, 0);
      ctx.clearRect(0, 0, STAGE_W, STAGE_H);
      ctx.lineCap = "round";
      rockets = rockets.map(rk => {
        const t = now - rk.start;
        if (t < 0) return rk;
        const bx = rk.x * STAGE_W;
        const by = rk.y1 * STAGE_H;
        ctx.strokeStyle = rk.color;
        ctx.fillStyle = rk.color;
        if (t < RISE) {
          // The shot: a short curved streak racing upward.
          const p = 1 - Math.pow(1 - t / RISE, 2);
          const pos = (q: number) => {
            const y = rk.y0 * STAGE_H + (by - rk.y0 * STAGE_H) * q;
            return [bx + Math.sin(q * 3.1) * rk.sway * (1 - q), y] as const;
          };
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          const tail = Math.max(0, p - 0.22);
          for (let i = 0; i <= 10; i++) {
            const [x, y] = pos(tail + ((p - tail) * i) / 10);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.globalAlpha = 0.9;
          ctx.stroke();
          const [hx, hy] = pos(p);
          ctx.beginPath();
          ctx.arc(hx, hy, 2.6, 0, 6.3);
          ctx.fill();
        } else if (t < RISE + BURST) {
          const q = (t - RISE) / BURST;
          const ease = 1 - Math.pow(1 - q, 3);
          ctx.globalAlpha = q < 0.55 ? 1 : Math.max(0, 1 - (q - 0.55) / 0.45);
          const n = 26;
          for (let i = 0; i < n; i++) {
            const a = (i / n) * 6.283;
            const len = rk.r * (i % 2 ? 0.62 : 1);
            const r1 = len * ease;
            const r0 = len * Math.max(0.18, ease - 0.42);
            const droop = q * q * 10;
            ctx.lineWidth = 1.8;
            ctx.setLineDash(i % 2 ? [] : [5, 5]);
            ctx.beginPath();
            ctx.moveTo(bx + Math.cos(a) * r0, by + Math.sin(a) * r0 + droop);
            ctx.lineTo(bx + Math.cos(a) * r1, by + Math.sin(a) * r1 + droop);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.arc(bx + Math.cos(a) * (r1 + 5), by + Math.sin(a) * (r1 + 5) + droop, i % 2 ? 1.4 : 2, 0, 6.3);
            ctx.fill();
          }
        } else {
          ctx.globalAlpha = 1;
          return newRocket(now, 0.4 + Math.random() * 2.2);
        }
        ctx.globalAlpha = 1;
        return rk;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />;
}

/* ------------------------------------------------------------------ */
/* Rides built from moving parts                                        */
/* ------------------------------------------------------------------ */

function Coaster({ src }: { src: string }) {
  return (
    <div className="relative w-full">
      <img src={src} alt="" draggable={false} className="w-full h-auto block" />
      {/* Invisible hit area that follows the rails, so the empty space between them stays clickable. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
        fill="none"
        stroke="transparent"
        strokeWidth={9}
      >
        <path d={`M${TRACK_PATH.map(p => p.join(" ")).join(" L")} Z`} style={{ pointerEvents: "stroke", cursor: "pointer" }} />
        <ellipse cx={20.4} cy={27.5} rx={18.5} ry={24.5} style={{ pointerEvents: "stroke", cursor: "pointer" }} />
      </svg>
    </div>
  );
}

function Parade() {
  const [fx, fy, fw] = PARADE.flag;
  return (
    <div className="relative w-full" style={{ aspectRatio: `${1 / PARADE.ar}` }}>
      {PARADE.people.map(([x, y, w, h], i) => {
        // The flag belongs to whichever walker's box contains it, so it steps with them.
        const holdsFlag = fx >= x && fx <= x + w && fy >= y - 2 && fy <= y + h;
        return (
          <div
            key={i}
            className="jc-walker absolute"
            style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, animationDelay: `${-(i * 0.17) % 0.9}s`, zIndex: Math.round(y + h) }}
          >
            <img src={`${BASE}/parade-${i + 1}.webp${V}`} alt="" draggable={false} className="w-full h-auto block" />
            {holdsFlag && (
              <img
                src={`${BASE}/parade-flag.webp${V}`}
                alt=""
                draggable={false}
                className="jc-flag absolute"
                style={{ left: `${((fx - x) / w) * 100}%`, top: `${((fy - y) / h) * 100}%`, width: `${(fw / w) * 100}%` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const NOTES = ["♪", "♫", "♪", "♬", "♫"];

function Theater({ src }: { src: string }) {
  return (
    <div className="relative w-full">
      <img src={src} alt="" draggable={false} className="w-full h-auto block" />
      {THEATER.cast.map(([x, y, w], i) => (
        <img
          key={i}
          src={`${BASE}/performer-${i + 1}.webp${V}`}
          alt=""
          draggable={false}
          className={`jc-performer jc-performer-${i + 1} absolute`}
          style={{ left: `${x}%`, top: `${y}%`, width: `${w}%` }}
        />
      ))}
      {NOTES.map((n, i) => (
        <span
          key={i}
          className="jc-note absolute"
          style={
            {
              left: `${58 + (i % 3) * 9}%`,
              top: "34%",
              animationDelay: `${i * 0.62}s`,
              "--dx": `${(i % 2 ? 1 : -1) * (10 + i * 5)}px`,
              color: ["#e9806a", "#7a5aa8", "#2b2320", "#d4658f", "#3f8f87"][i],
            } as React.CSSProperties
          }
        >
          {n}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sky: drifting, draggable, poppable things                           */
/* ------------------------------------------------------------------ */

type Kind = "balloon" | "cluster" | "kite" | "hotair";

type Floater = {
  id: number;
  kind: Kind;
  src: string;
  w: number; // css px at a 1440px-wide viewport; scaled with the window
  hue: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  drift: number; // resting horizontal wind
  lift: number; // resting vertical speed (negative = rises)
  phase: number;
  dragging: boolean;
  popped: boolean;
};

const SKY_SPRITES: Record<Kind, string> = {
  balloon: `${BASE}/balloon.webp${V}`,
  cluster: `${BASE}/balloon-cluster.webp${V}`,
  kite: `${BASE}/kite.webp${V}`,
  hotair: `${BASE}/hot-air-balloon.webp${V}`,
};

function makeFloaters(W: number, H: number): Floater[] {
  const list: Floater[] = [];
  let id = 0;
  const add = (kind: Kind, w: number, hue: number, x: number, y: number, drift: number, lift: number) =>
    list.push({ id: id++, kind, src: SKY_SPRITES[kind], w, hue, x, y, vx: drift, vy: lift, drift, lift, phase: Math.random() * 6.28, dragging: false, popped: false });

  add("hotair", 92, 0, W * 0.42, H * 0.08, 9, 0);
  add("cluster", 70, 0, W * 0.24, H * 0.22, 14, -4);
  add("cluster", 58, 140, W * 0.86, H * 0.3, 11, -3);
  add("kite", 64, 0, W * 0.55, H * 0.2, 18, 0);
  add("kite", 52, 200, W * 0.12, H * 0.45, 16, 0);
  const hues = [0, 60, 130, 200, 260, 310, 30, 170];
  hues.forEach((h, i) => add("balloon", 30 + (i % 3) * 6, h, W * (0.08 + i * 0.12), H * (0.35 + ((i * 37) % 50) / 100), 8 + (i % 4) * 4, -(14 + (i % 3) * 6)));
  return list;
}

type Burst = { id: number; x: number; y: number; hue: number };

function Sky() {
  const floaters = useRef<Floater[]>([]);
  const els = useRef<Map<number, HTMLDivElement>>(new Map());
  const [, setVersion] = useState(0);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const drag = useRef<{ id: number; ox: number; oy: number; lx: number; ly: number; lt: number; moved: number } | null>(null);

  useEffect(() => {
    floaters.current = makeFloaters(window.innerWidth, window.innerHeight);
    setVersion(v => v + 1);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const k = Math.max(0.6, Math.min(1.4, W / 1440));
      for (const f of floaters.current) {
        const el = els.current.get(f.id);
        if (!el) continue;
        if (f.popped) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          continue;
        }
        const w = f.w * k;
        if (!f.dragging) {
          // Ease back toward the resting wind after a throw.
          f.vx += (f.drift - f.vx) * Math.min(1, dt * 0.8);
          f.vy += (f.lift - f.vy) * Math.min(1, dt * 0.8);
          f.x += f.vx * dt;
          f.y += f.vy * dt;
          // Wrap around the screen.
          if (f.x > W + w) f.x = -w * 1.5;
          if (f.x < -w * 2) f.x = W + w;
          if (f.y < -w * 2.5) {
            f.y = H + w;
            f.x = Math.random() * W * 0.9;
          }
          if (f.y > H + w * 2) f.y = -w;
        }
        f.phase += dt;
        const bob = f.dragging ? 0 : Math.sin(f.phase * (f.kind === "kite" ? 1.6 : 0.9)) * (f.kind === "kite" ? 6 : 4);
        const tilt =
          f.kind === "kite"
            ? Math.sin(f.phase * 1.3) * 10 + Math.max(-25, Math.min(25, f.vx * 0.15))
            : Math.max(-18, Math.min(18, (f.vx - f.drift) * 0.05)) + Math.sin(f.phase * 0.7) * 3;
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
        el.style.width = `${w}px`;
        el.style.transform = `translate(${f.x - w / 2}px, ${f.y + bob}px) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pop = (f: Floater) => {
    f.popped = true;
    const el = els.current.get(f.id);
    const r = el?.getBoundingClientRect();
    if (r) {
      const b = { id: Date.now() + f.id, x: r.left + r.width / 2, y: r.top + r.width / 2, hue: f.hue };
      setBursts(list => [...list, b]);
      setTimeout(() => setBursts(list => list.filter(x => x.id !== b.id)), 900);
    }
    // A new balloon floats up from below a few seconds later.
    setTimeout(() => {
      f.popped = false;
      f.x = Math.random() * window.innerWidth;
      f.y = window.innerHeight + 60;
      f.vx = f.drift;
      f.vy = f.lift;
      f.hue = (f.hue + 70) % 360;
      const el2 = els.current.get(f.id);
      if (el2) (el2.firstChild as HTMLImageElement).style.filter = `hue-rotate(${f.hue}deg)`;
    }, 3500);
  };

  const onDown = (f: Floater) => (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    f.dragging = true;
    drag.current = { id: f.id, ox: e.clientX - f.x, oy: e.clientY - f.y, lx: e.clientX, ly: e.clientY, lt: performance.now(), moved: 0 };
    e.currentTarget.classList.add("is-grabbed");
  };
  const onMove = (f: Floater) => (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== f.id) return;
    const now = performance.now();
    const dt = Math.max(1, now - d.lt) / 1000;
    f.vx = f.vx * 0.5 + ((e.clientX - d.lx) / dt) * 0.5;
    f.vy = f.vy * 0.5 + ((e.clientY - d.ly) / dt) * 0.5;
    d.moved += Math.abs(e.clientX - d.lx) + Math.abs(e.clientY - d.ly);
    d.lx = e.clientX;
    d.ly = e.clientY;
    d.lt = now;
    f.x = e.clientX - d.ox;
    f.y = e.clientY - d.oy;
  };
  const onUp = (f: Floater) => (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== f.id) return;
    e.stopPropagation();
    f.dragging = false;
    drag.current = null;
    e.currentTarget.classList.remove("is-grabbed");
    // A tap (no real movement) pops a party balloon; otherwise it's a throw.
    if (d.moved < 6) {
      f.vx = f.drift;
      f.vy = f.lift;
      if (f.kind === "balloon") pop(f);
      return;
    }
    f.vx = Math.max(-900, Math.min(900, f.vx));
    f.vy = Math.max(-900, Math.min(900, f.vy));
  };

  return (
    <div className="jc-sky absolute inset-0 pointer-events-none" style={{ zIndex: 45 }}>
      {floaters.current.map(f => (
        <div
          key={f.id}
          ref={el => {
            if (el) els.current.set(f.id, el);
            else els.current.delete(f.id);
          }}
          className={`jc-floater kind-${f.kind}`}
          role="button"
          aria-label={f.kind === "balloon" ? "Balloon: drag it, or tap to pop" : `${f.kind}: drag it`}
          onPointerDown={onDown(f)}
          onPointerMove={onMove(f)}
          onPointerUp={onUp(f)}
          onPointerCancel={onUp(f)}
          onClick={e => e.stopPropagation()}
          style={{ width: f.w, transform: `translate(${f.x}px, ${f.y}px)` }}
        >
          <img src={f.src} alt="" draggable={false} style={{ filter: f.hue ? `hue-rotate(${f.hue}deg)` : undefined }} />
        </div>
      ))}
      {bursts.map(b => (
        <div key={b.id} className="jc-burst" style={{ left: b.x, top: b.y }}>
          {Array.from({ length: 12 }, (_, i) => (
            <i
              key={i}
              style={
                {
                  "--a": `${i * 30}deg`,
                  "--c": `hsl(${(b.hue + 340 + i * 47) % 360} 75% 62%)`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const CSS = `
.joycon {
  --jc-ink: #2b2320;
  --jc-paper: #fbf3df;
  --jc-coral: #e9806a;
  --jc-teal: #4fb3a9;
  --jc-sky: #ffdeb0;
  --jc-sea: #68aeb8;
  --jc-hand: 'Patrick Hand', 'Comic Sans MS', system-ui, sans-serif;
  --jc-caps: 'Patrick Hand SC', 'Patrick Hand', system-ui, sans-serif;
  background: linear-gradient(180deg, var(--jc-sky) 0%, var(--jc-sky) 30%, #c9d8b8 42%, var(--jc-sea) 60%, var(--jc-sea) 100%);
  color: var(--jc-ink);
  font-family: var(--jc-hand);
}
.joycon button { background: none; border: 0; padding: 0; cursor: pointer; font: inherit; color: inherit; }

.jc-island { animation: jc-fade 700ms ease both; }
@keyframes jc-fade { from { opacity: 0; } to { opacity: 1; } }
.jc-ride { outline: none; animation: jc-drop 650ms cubic-bezier(.3,1.5,.5,1) both; }
.jc-ride:focus-visible img { filter: ${OUTLINE_HOVER} !important; }
@keyframes jc-drop { from { opacity: 0; translate: 0 -22px; } to { opacity: 1; translate: 0 0; } }


/* Ride art wrapper carries the highlight so multi-part rides light up as one. */
.jc-art { transition: opacity 250ms, transform 250ms cubic-bezier(.3,1.5,.5,1); }

/* Clouds roll across the sky, left to right, and come back around. */
.jc-cloud { left: -60%; animation: jc-cloud linear infinite; will-change: transform; }
@keyframes jc-cloud { from { transform: translateX(0); } to { transform: translateX(3600px); } }

/* Flowers lean left and right from the stem. */
.jc-flower { background-repeat: no-repeat; transform-origin: 50% 100%; animation: jc-sway ease-in-out infinite alternate; }
@keyframes jc-sway { from { transform: translateX(-1.5px) skewX(7deg); } to { transform: translateX(1.5px) skewX(-7deg); } }

/* Parade: everyone steps in place; the flag flutters from its pole. */
.jc-walker { transform-origin: 50% 100%; animation: jc-walk 0.9s linear infinite; }
@keyframes jc-walk {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  25% { transform: translateY(-3.5%) rotate(0deg); }
  50% { transform: translateY(0) rotate(3deg); }
  75% { transform: translateY(-3.5%) rotate(0deg); }
}
.jc-flag { transform-origin: 0 50%; animation: jc-flag 0.55s ease-in-out infinite alternate; }
@keyframes jc-flag { from { transform: skewY(-12deg) scaleX(1); } to { transform: skewY(12deg) scaleX(.84); } }

/* Theater: performers jiggle, notes float off the guitar. */
.jc-performer { transform-origin: 50% 100%; }
.jc-performer-1 { animation: jc-jig 0.7s ease-in-out infinite alternate; }
.jc-performer-2 { animation: jc-float 1.3s ease-in-out infinite alternate; }
.jc-performer-3 { animation: jc-jig 0.5s ease-in-out infinite alternate-reverse; }
@keyframes jc-jig { from { transform: rotate(-7deg) translateY(0) scaleY(1); } 50% { transform: rotate(0deg) translateY(-6%) scaleY(1.04); } to { transform: rotate(7deg) translateY(0) scaleY(1); } }
@keyframes jc-float { from { transform: translate(-6%, 0) rotate(-5deg); } to { transform: translate(6%, -10%) rotate(5deg); } }
.jc-note { font-family: system-ui, sans-serif; font-size: 20px; font-weight: 700; line-height: 1; opacity: 0; pointer-events: none;
  text-shadow: 1px 0 0 var(--jc-paper), -1px 0 0 var(--jc-paper), 0 1px 0 var(--jc-paper), 0 -1px 0 var(--jc-paper);
  animation: jc-note 3.1s ease-out infinite; }
@keyframes jc-note {
  0% { opacity: 0; transform: translate(0, 0) scale(.5) rotate(-10deg); }
  12% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), -70px) scale(1.15) rotate(14deg); }
}

/* Speech bubble: paper, ink border, flat offset shadow — comic-panel style. */
.jc-bubble { pointer-events: auto; transform: translate(-50%, -100%); width: 330px; animation: jc-bubble 300ms cubic-bezier(.3,1.6,.5,1) both; transform-origin: 50% 100%; }
@keyframes jc-bubble { from { opacity: 0; scale: .7; } to { opacity: 1; scale: 1; } }
.jc-bubble-body {
  position: relative; background: var(--jc-paper); border: 2.5px solid var(--jc-ink); border-radius: 18px;
  padding: 14px 20px 16px; box-shadow: 5px 5px 0 var(--jc-ink);
}
.jc-tail {
  position: absolute; bottom: -18px; width: 0; height: 0; transform: translateX(-50%);
  border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 20px solid var(--jc-ink);
}
.jc-tail::after {
  content: ""; position: absolute; left: -8px; top: -24px;
  border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 14px solid var(--jc-paper);
}
.jc-bubble.is-below { transform: translate(-50%, 18px); transform-origin: 50% 0; }
.jc-bubble.is-below .jc-tail { bottom: auto; top: -18px; border-top: 0; border-bottom: 20px solid var(--jc-ink); }
.jc-bubble.is-below .jc-tail::after { top: 7px; border-top: 0; border-bottom: 14px solid var(--jc-paper); }
.jc-num { font-family: var(--jc-caps); font-size: 15px; letter-spacing: .12em; color: var(--jc-coral); margin: 0; }
.jc-title { font-family: var(--jc-caps); font-weight: 400; font-size: 30px; line-height: 1; margin: 2px 26px 8px 0; letter-spacing: .02em; }
.jc-blurb { font-size: 19px; line-height: 1.28; margin: 0; }
.jc-close { position: absolute; top: 4px; right: 12px; font-size: 28px !important; line-height: 1; }
.jc-close:hover { color: var(--jc-coral) !important; }

/* Title block */
.jc-head { top: clamp(12px, 2.6vh, 28px); left: clamp(14px, 2.6vh, 32px); gap: 4px; }
.jc-head::before {
  content: ""; position: absolute; z-index: -1; inset: -10px -14px; background: var(--jc-paper);
  border: 2.5px solid var(--jc-ink); border-radius: 16px; box-shadow: 4px 4px 0 var(--jc-ink);
}
.jc-banner { font-family: var(--jc-caps); font-weight: 400; font-size: clamp(30px, 5.4vh, 56px); line-height: .9; margin: 0; letter-spacing: .04em; }
.jc-sub { font-size: clamp(13px, 1.9vh, 18px); margin: 0 0 6px; }
.jc-chip {
  font-family: var(--jc-caps); font-size: clamp(13px, 1.8vh, 17px); letter-spacing: .04em; color: var(--jc-ink) !important;
  text-decoration: none; background: var(--jc-coral) !important; border: 2px solid var(--jc-ink) !important; border-radius: 999px;
  padding: 3px 14px 2px !important; box-shadow: 0 3px 0 var(--jc-ink); transition: translate 100ms, box-shadow 100ms;
}
.jc-chip:hover { translate: 0 2px; box-shadow: 0 1px 0 var(--jc-ink); }
.jc-icon { top: clamp(12px, 2.6vh, 28px); right: clamp(14px, 2.6vh, 32px); padding: 8px !important; display: grid; place-items: center; background: var(--jc-paper) !important; }

/* Ride bar */
.jc-bar { bottom: clamp(10px, 2vh, 22px); gap: clamp(5px, 1vh, 12px); }
.jc-slot {
  position: relative; display: flex; flex-direction: column; align-items: center;
  width: clamp(66px, 10.5vh, 104px); height: clamp(72px, 11.5vh, 112px); padding: 5px 4px 6px !important;
  background: var(--jc-paper) !important; border: 2px solid var(--jc-ink) !important; border-radius: 12px;
  box-shadow: 0 4px 0 var(--jc-ink); transition: translate 120ms, box-shadow 120ms, background 120ms;
}
.jc-slot-art { flex: none; height: 64%; width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.jc-slot-art img { width: 92%; height: 100%; object-fit: contain; pointer-events: none; }
.jc-slot-name { font-family: var(--jc-caps); font-size: clamp(10px, 1.45vh, 14px); line-height: 1; text-align: center; margin-top: auto; }
.jc-slot:hover { translate: 0 -2px; box-shadow: 0 6px 0 var(--jc-ink); }
.jc-slot.is-active { background: #ffd98a !important; translate: 0 2px; box-shadow: 0 2px 0 var(--jc-ink); }

/* Sky */
.jc-floater { position: absolute; left: 0; top: 0; pointer-events: auto; cursor: grab; touch-action: none; will-change: transform; transition: opacity 200ms; }
.jc-floater img { width: 100%; height: auto; display: block; pointer-events: none; }
.jc-floater:hover img { filter: drop-shadow(2px 0 0 #fbf3df) drop-shadow(-2px 0 0 #fbf3df) drop-shadow(0 2px 0 #fbf3df) drop-shadow(0 -2px 0 #fbf3df); }
.jc-floater.is-grabbed { cursor: grabbing; }
.jc-floater.is-grabbed img { scale: 1.08; }
.jc-burst { position: fixed; width: 0; height: 0; pointer-events: none; z-index: 46; }
.jc-burst i {
  position: absolute; left: -5px; top: -5px; width: 10px; height: 10px; background: var(--c); border: 2px solid var(--jc-ink);
  rotate: var(--a); animation: jc-burst 800ms cubic-bezier(.2,.8,.3,1) forwards;
}
.jc-burst i:nth-child(odd) { border-radius: 50%; }
@keyframes jc-burst { 0% { transform: translateX(0) scale(1); opacity: 1; } 100% { transform: translateX(70px) scale(.4); opacity: 0; } }

@media (max-width: 640px) {
  .jc-bubble { width: 260px; }
  .jc-title { font-size: 24px; }
  .jc-blurb { font-size: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .jc-island, .jc-ride, .jc-bubble, .jc-cloud, .jc-flower, .jc-walker, .jc-flag, .jc-performer, .jc-note { animation: none !important; }
}
`;
