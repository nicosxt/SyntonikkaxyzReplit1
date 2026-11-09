/**
 * Particle stage for the landing hero.
 *
 * One pool of grey dots is shared by three scenes. Each scene contributes a
 * force, and the scene weights are eased in and out, so the dots are never
 * teleported: they glide from one arrangement to the next.
 *
 *   0  ring     – a noisy, diffused circle            ("Divine")
 *   1  chladni  – sand settling on a vibrating plate  ("Transmission")
 *   2  flock    – boids steering together             ("Life")
 *
 * The Chladni field is adapted from the supplied chladni-background lab
 * (lattice 3 × 4, 318 Hz), slowly morphed over time so the pattern breathes.
 */

const SCENE_COUNT = 3;
const GREY = '#8A8A8A';
const GRID = 96;

// ── Chladni plate ────────────────────────────────────────────────────────────
const PLATE = { m: 9.3, n: 11.7 };
// The screen shows only the inner part of the plate, so its (always-quiet)
// boundary sits off-screen and the pattern is strong right up to every edge.
const PLATE_EDGE = 0.1;
const PLATE_SPAN = 1 - 2 * PLATE_EDGE;
const FIELD_INTERVAL = 0.1; // seconds between field rebuilds (morph is slow)

// ── Ring ─────────────────────────────────────────────────────────────────────
const RING_RADIUS = 0.36; // × min(width, height)

// ── Flock ────────────────────────────────────────────────────────────────────
const PERCEPTION = 72;
const SEPARATION = 26;
const FLOCK_SPEED = 208; // px / s
const FLOCK_MAX_ACCEL = 1000;

const FRAME_MS = 1000 / 58;

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

export class CreationParticles {
  private ctx: CanvasRenderingContext2D;
  private w = 1;
  private h = 1;
  private dpr = 1;

  private n = 0; // total dots
  private nb = 0; // dots that act as boids
  private px = new Float32Array(0);
  private py = new Float32Array(0);
  private vx = new Float32Array(0);
  private vy = new Float32Array(0);
  private rad = new Float32Array(0);
  private vis = new Float32Array(0); // 0..1, dots dissolve instead of popping
  private visRate = new Float32Array(0);
  private ringOff = new Float32Array(0);
  private phase = new Float32Array(0);
  private homeU = new Float32Array(0); // each dot's share of the screen in the Chladni scene
  private homeV = new Float32Array(0);
  private heading = new Float32Array(0);
  private bax = new Float32Array(0);
  private bay = new Float32Array(0);

  private scene = 0;
  private weights = [1, 0, 0];
  private triMix = 0;
  private visDirty = true; // dot visibilities are still easing toward their targets
  private extrasHidden = false; // flock scene fully settled: non-boid dots are invisible and skipped
  private time = 0;
  private fieldClock = 0;

  private values = new Float32Array(GRID * GRID);
  private gx = new Float32Array(GRID * GRID);
  private gy = new Float32Array(GRID * GRID);

  private cellHead = new Int32Array(0);
  private cellNext = new Int32Array(0);
  private cols = 1;
  private rows = 1;

  private raf = 0;
  private last = 0;
  private running = false;
  private seed = 726173;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d', { alpha: false })!;
  }

  private random() {
    this.seed = (this.seed * 1664525 + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }

  private gaussian() {
    return (this.random() + this.random() + this.random() - 1.5) * 1.6;
  }

  // ── sizing ─────────────────────────────────────────────────────────────────
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);

    const first = this.n === 0;
    const sx = w / this.w;
    const sy = h / this.h;
    this.w = w;
    this.h = h;

    const count = Math.round(clamp((w * h) / 55, 8000, 18000));
    if (first || count !== this.n) this.allocate(count, first ? null : { sx, sy });
    else for (let i = 0; i < this.n; i++) { this.px[i] *= sx; this.py[i] *= sy; }

    this.nb = Math.round(clamp((w * h) / 1300, 300, 1000));
    this.cols = Math.ceil(w / PERCEPTION) + 1;
    this.rows = Math.ceil(h / PERCEPTION) + 1;
    this.cellHead = new Int32Array(this.cols * this.rows);
    this.cellNext = new Int32Array(this.n);
    this.buildField();
    this.draw();
  }

  private allocate(count: number, scale: { sx: number; sy: number } | null) {
    const prev = { n: this.n, px: this.px, py: this.py, vx: this.vx, vy: this.vy, vis: this.vis, heading: this.heading };
    this.n = count;
    this.px = new Float32Array(count);
    this.py = new Float32Array(count);
    this.vx = new Float32Array(count);
    this.vy = new Float32Array(count);
    this.rad = new Float32Array(count);
    this.vis = new Float32Array(count);
    this.visRate = new Float32Array(count);
    this.ringOff = new Float32Array(count);
    this.phase = new Float32Array(count);
    this.homeU = new Float32Array(count);
    this.homeV = new Float32Array(count);
    this.heading = new Float32Array(count);
    this.bax = new Float32Array(count);
    this.bay = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const keep = scale && i < prev.n;
      this.px[i] = keep ? prev.px[i] * scale!.sx : this.random() * this.w;
      this.py[i] = keep ? prev.py[i] * scale!.sy : this.random() * this.h;
      this.vx[i] = keep ? prev.vx[i] : 0;
      this.vy[i] = keep ? prev.vy[i] : 0;
      this.vis[i] = keep ? prev.vis[i] : 1;
      this.heading[i] = keep ? prev.heading[i] : this.random() * Math.PI * 2;
      this.rad[i] = 0.5 + this.random() * 0.8;
      this.visRate[i] = 1 / (0.35 + this.random() * 1.3);
      this.phase[i] = this.random() * Math.PI * 2;
      this.homeU[i] = this.random();
      this.homeV[i] = this.random();
      // Diffused ring: most dots hug the edge, a soft halo drifts outward.
      const halo = this.random() < 0.34;
      this.ringOff[i] = halo ? Math.abs(this.gaussian()) * 24 : this.gaussian() * 4.5;
    }
  }

  // ── scenes ─────────────────────────────────────────────────────────────────
  setScene(scene: number) {
    this.scene = ((scene % SCENE_COUNT) + SCENE_COUNT) % SCENE_COUNT;
    this.visDirty = true;
    this.extrasHidden = false;
  }

  /** Jump straight to the settled look of the current scene (reduced motion). */
  settle() {
    for (let s = 0; s < SCENE_COUNT; s++) this.weights[s] = s === this.scene ? 1 : 0;
    this.triMix = this.scene === 2 ? 1 : 0;
    for (let i = 0; i < this.n; i++) this.vis[i] = this.scene === 2 && i >= this.nb ? 0 : 1;
    this.visDirty = false;
    this.extrasHidden = this.scene === 2;
    for (let i = 0; i < 240; i++) this.step(1 / 30);
    this.draw();
  }

  // ── Chladni field ──────────────────────────────────────────────────────────
  private buildField() {
    const t = this.time;
    // The drive point and frequency wander slowly, so the plate keeps evolving.
    const driveX = 0.55 * Math.sin(t * 0.11 + 0.8);
    const driveY = clamp(0.59 + 0.3 * Math.sin(t * 0.083 + 1.3), -1, 1);
    const freq = 1 + 0.13 * Math.sin(t * 0.052);
    const u0 = (driveX + 1) * 0.5;
    const v0 = (driveY + 1) * 0.5;

    const m = PLATE.m * freq;
    const n = PLATE.n * freq;
    const a = Math.sin(m * Math.PI * u0) * Math.sin(n * Math.PI * v0);
    const b = Math.sin(n * Math.PI * u0) * Math.sin(m * Math.PI * v0);
    const sum = Math.abs(a) + Math.abs(b);
    const influence = sum > 1e-4 ? Math.abs(b) / sum : 0.5;
    const mix = 0.5 * (0.65 + 0.7 * influence);

    const values = this.values;
    for (let y = 0; y < GRID; y++) {
      const v = y / (GRID - 1);
      const sn = Math.sin(n * Math.PI * v);
      const sm = Math.sin(m * Math.PI * v);
      for (let x = 0; x < GRID; x++) {
        const u = x / (GRID - 1);
        values[y * GRID + x] = Math.sin(m * Math.PI * u) * sn + mix * Math.sin(n * Math.PI * u) * sm;
      }
    }
    for (let y = 1; y < GRID - 1; y++) {
      for (let x = 1; x < GRID - 1; x++) {
        const i = y * GRID + x;
        this.gx[i] = (values[i + 1] - values[i - 1]) * (GRID - 1) * 0.5;
        this.gy[i] = (values[i + GRID] - values[i - GRID]) * (GRID - 1) * 0.5;
      }
    }
  }

  // ── simulation ─────────────────────────────────────────────────────────────
  private step(dt: number) {
    this.time += dt;
    this.fieldClock += dt;
    if (this.fieldClock > FIELD_INTERVAL) {
      this.fieldClock = 0;
      this.buildField();
    }

    // Ease scene weights, dot visibility and the dot→triangle shape.
    const wk = 1 - Math.exp(-dt / 0.75);
    for (let s = 0; s < SCENE_COUNT; s++) this.weights[s] += ((s === this.scene ? 1 : 0) - this.weights[s]) * wk;
    this.triMix += ((this.scene === 2 ? 1 : 0) - this.triMix) * (1 - Math.exp(-dt / 1.1));
    const flockOnly = this.scene === 2;
    if (this.visDirty) {
      let moving = false;
      for (let i = 0; i < this.n; i++) {
        const target = flockOnly && i >= this.nb ? 0 : 1;
        const v = this.vis[i] + (target - this.vis[i]) * (1 - Math.exp(-dt * this.visRate[i]));
        if (Math.abs(target - v) > 0.004) { this.vis[i] = v; moving = true; } else this.vis[i] = target;
      }
      if (!moving) { this.visDirty = false; this.extrasHidden = flockOnly; }
    }
    // Dots the flock scene has fully dissolved cost nothing until they return.
    const simEnd = this.extrasHidden ? this.nb : this.n;

    const wRing = this.weights[0], wChladni = this.weights[1], wFlock = this.weights[2];
    const w = this.w, h = this.h, t = this.time;
    const S = Math.min(w, h);
    const drag = Math.exp(-1.15 * dt);
    const vmax = S * 0.9;

    if (wFlock > 0.002) this.flock();

    const cx = w / 2, cy = h / 2;
    const ringR = S * RING_RADIUS;
    const chladniAccel = S * 0.55 * wChladni;
    const shake = 560 * wChladni;
    const homeSlack = S * 0.1;
    const homeMax = S * 0.3;
    const px = this.px, py = this.py, vx = this.vx, vy = this.vy;
    const values = this.values, gxs = this.gx, gys = this.gy;
    const G1 = GRID - 1;

    for (let i = 0; i < simEnd; i++) {
      const x = px[i], y = py[i];
      const ph = this.phase[i];
      // Soft ambient current keeps everything drifting a little.
      let ax = 9 * Math.sin(y * 0.0065 + t * 0.33 + ph * 0.15);
      let ay = 9 * Math.cos(x * 0.0065 + t * 0.29 + ph * 0.15);

      if (wChladni > 0.002) {
        // Spread across the whole plate: dots far from their home are drawn
        // toward it, then the nodal force settles them on the nearest line.
        const hx = this.homeU[i] * w - x, hy = this.homeV[i] * h - y;
        const hd = Math.sqrt(hx * hx + hy * hy);
        if (hd > homeSlack) {
          const pull = Math.min((hd - homeSlack) * 1.6, homeMax) * wChladni / hd;
          ax += hx * pull; ay += hy * pull;
        }
        const fx = clamp((PLATE_EDGE + (x / w) * PLATE_SPAN) * G1, 1, GRID - 2);
        const fy = clamp((PLATE_EDGE + (y / h) * PLATE_SPAN) * G1, 1, GRID - 2);
        const x0 = fx | 0, y0 = fy | 0, tx = fx - x0, ty = fy - y0, k = y0 * GRID + x0;
        const v = (values[k] * (1 - tx) + values[k + 1] * tx) * (1 - ty) + (values[k + GRID] * (1 - tx) + values[k + GRID + 1] * tx) * ty;
        const gx = ((gxs[k] * (1 - tx) + gxs[k + 1] * tx) * (1 - ty) + (gxs[k + GRID] * (1 - tx) + gxs[k + GRID + 1] * tx) * ty) / (w * PLATE_SPAN);
        const gy = ((gys[k] * (1 - tx) + gys[k + 1] * tx) * (1 - ty) + (gys[k + GRID] * (1 - tx) + gys[k + GRID + 1] * tx) * ty) / (h * PLATE_SPAN);
        const len = Math.sqrt(gx * gx + gy * gy) + 1e-6;
        // v / |∇v| is the distance (px) to the nearest nodal line, so the pull
        // is independent of local amplitude and equally strong across the screen.
        const amount = clamp(v / (len * 22), -1, 1);
        ax -= (amount * gx / len) * chladniAccel + (this.random() - 0.5) * shake;
        ay -= (amount * gy / len) * chladniAccel + (this.random() - 0.5) * shake;
      }

      if (wRing > 0.002) {
        const dx = x - cx, dy = y - cy;
        const r = Math.sqrt(dx * dx + dy * dy) + 1e-3;
        const nx = dx / r, ny = dy / r;
        const vr = vx[i] * nx + vy[i] * ny;
        const vtan = -vx[i] * ny + vy[i] * nx;
        const ar = -(r - (ringR + this.ringOff[i])) * 6 - vr * 4.2;
        const at = (16 - vtan) * 0.8; // slow shared rotation
        ax += wRing * (ar * nx - at * ny + (this.random() - 0.5) * 380);
        ay += wRing * (ar * ny + at * nx + (this.random() - 0.5) * 380);
      }

      if (wFlock > 0.002 && i < this.nb) {
        ax += this.bax[i] * wFlock;
        ay += this.bay[i] * wFlock;
      }

      let nvx = (vx[i] + ax * dt) * drag;
      let nvy = (vy[i] + ay * dt) * drag;
      const sp = Math.sqrt(nvx * nvx + nvy * nvy);
      if (sp > vmax) { nvx *= vmax / sp; nvy *= vmax / sp; }
      let nx = x + nvx * dt;
      let ny = y + nvy * dt;
      if (nx < 0 || nx > w) { nx = clamp(nx, 0, w); nvx *= -0.5; }
      if (ny < 0 || ny > h) { ny = clamp(ny, 0, h); nvy *= -0.5; }
      vx[i] = nvx; vy[i] = nvy; px[i] = nx; py[i] = ny;
    }
  }

  /** Boid steering for the first `nb` dots: separation, alignment, cohesion. */
  private flock() {
    const { nb, px, py, vx, vy, cols, rows, cellHead, cellNext, w, h, time } = this;
    cellHead.fill(-1);
    for (let i = 0; i < nb; i++) {
      const c = clamp((px[i] / PERCEPTION) | 0, 0, cols - 1) + clamp((py[i] / PERCEPTION) | 0, 0, rows - 1) * cols;
      cellNext[i] = cellHead[c];
      cellHead[c] = i;
    }
    const per2 = PERCEPTION * PERCEPTION;
    const margin = Math.min(w, h) * 0.12 + 40;

    for (let i = 0; i < nb; i++) {
      const x = px[i], y = py[i], ux = vx[i], uy = vy[i];
      const cc = clamp((x / PERCEPTION) | 0, 0, cols - 1);
      const cr = clamp((y / PERCEPTION) | 0, 0, rows - 1);
      let count = 0, avx = 0, avy = 0, cxs = 0, cys = 0, sx = 0, sy = 0;
      for (let r = Math.max(0, cr - 1); r <= Math.min(rows - 1, cr + 1); r++) {
        for (let c = Math.max(0, cc - 1); c <= Math.min(cols - 1, cc + 1); c++) {
          for (let j = cellHead[c + r * cols]; j !== -1; j = cellNext[j]) {
            if (j === i) continue;
            const dx = px[j] - x, dy = py[j] - y;
            const d2 = dx * dx + dy * dy;
            if (d2 > per2) continue;
            count++;
            avx += vx[j]; avy += vy[j]; cxs += px[j]; cys += py[j];
            if (d2 < SEPARATION * SEPARATION) {
              const d = Math.sqrt(d2) + 1e-3;
              const push = 1 - d / SEPARATION;
              sx -= (dx / d) * push; sy -= (dy / d) * push;
            }
          }
        }
      }
      let ax = sx * 1800, ay = sy * 1800;
      if (count) {
        ax += (avx / count - ux) * 4.5 + (cxs / count - x) * 2.2;
        ay += (avy / count - uy) * 4.5 + (cys / count - y) * 2.2;
      }
      // Hold a gentle cruising speed (random heading if nearly at rest).
      let sp = Math.sqrt(ux * ux + uy * uy);
      let hx = ux / (sp + 1e-6), hy = uy / (sp + 1e-6);
      if (sp < 1) { const a = this.phase[i] * 3; hx = Math.cos(a); hy = Math.sin(a); sp = 0; }
      const keep = (FLOCK_SPEED - sp) * 2.6;
      ax += hx * keep; ay += hy * keep;
      // Lazy wander so flocks curve instead of running straight.
      const wob = Math.sin(time * 0.6 + this.phase[i] * 5) * 110;
      ax += -hy * wob; ay += hx * wob;
      // Soft edges: turn back, never wrap.
      if (x < margin) ax += ((margin - x) / margin) * 900;
      else if (x > w - margin) ax -= ((x - (w - margin)) / margin) * 900;
      if (y < margin) ay += ((margin - y) / margin) * 900;
      else if (y > h - margin) ay -= ((y - (h - margin)) / margin) * 900;

      const mag = Math.sqrt(ax * ax + ay * ay);
      if (mag > FLOCK_MAX_ACCEL) { ax *= FLOCK_MAX_ACCEL / mag; ay *= FLOCK_MAX_ACCEL / mag; }
      this.bax[i] = ax; this.bay[i] = ay;
    }
  }

  // ── drawing ────────────────────────────────────────────────────────────────
  private draw() {
    const { ctx, dpr, px, py, vx, vy, rad, vis, heading, nb, triMix } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = GREY;

    const triangles = triMix > 0.02;
    const dotEnd = triangles ? nb : 0;
    ctx.beginPath();
    const dotStop = this.extrasHidden ? this.nb : this.n;
    for (let i = dotEnd; i < dotStop; i++) {
      const s = rad[i] * 2 * vis[i];
      if (s < 0.08) continue;
      ctx.rect(px[i] - s / 2, py[i] - s / 2, s, s);
    }
    ctx.fill();

    if (triangles) {
      ctx.beginPath();
      for (let i = 0; i < nb; i++) {
        const speed = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        if (speed > 4) {
          // Ease the heading so triangles turn smoothly rather than snap.
          let diff = Math.atan2(vy[i], vx[i]) - heading[i];
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          heading[i] += diff * 0.18;
        }
        const dot = rad[i] * 2;
        const len = (dot + (6 + rad[i] * 3.2 - dot) * triMix) * vis[i];
        if (len < 0.08) continue;
        const a = heading[i], c = Math.cos(a), s = Math.sin(a);
        const half = len * (0.5 - 0.2 * triMix);
        const x = px[i], y = py[i];
        ctx.moveTo(x + c * len * 0.6, y + s * len * 0.6);
        ctx.lineTo(x - c * len * 0.4 - s * half, y - s * len * 0.4 + c * half);
        ctx.lineTo(x - c * len * 0.4 + s * half, y - s * len * 0.4 - c * half);
        ctx.closePath();
      }
      ctx.fill();
    }
  }

  // ── loop ───────────────────────────────────────────────────────────────────
  private tick = (now: number) => {
    if (!this.running) return;
    // High-refresh displays: render at ~60 fps, which is plenty for slow-drifting dots.
    if (now - this.last < FRAME_MS) { this.raf = requestAnimationFrame(this.tick); return; }
    const dt = Math.min((now - this.last) / 1000 || 1 / 60, 1 / 20);
    this.last = now;
    this.step(dt);
    this.draw();
    this.raf = requestAnimationFrame(this.tick);
  };

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  render() {
    this.draw();
  }

  destroy() {
    this.stop();
  }
}
