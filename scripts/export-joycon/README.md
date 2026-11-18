# JoyCon SF 2027 — interactive island map

This folder is a **finished, self-contained static web page**. It needs no build step, no
framework, no server code and no npm install. Upload the folder as-is and open `index.html`.

> **Instructions for an AI agent / developer installing this page:** read the whole file
> first, then follow "How to install". Do not rebuild, reformat, minify, rename or edit the
> files in `assets/` or `images/`; they are already production-built.

## What's in the folder

```
joycon2027/
├── index.html          ← the page (entry point)
├── assets/
│   ├── index-*.js      ← the whole app (React is bundled in; no other scripts needed)
│   └── index-*.css     ← styles
├── images/             ← 24 .webp artwork files the page loads
└── README.md           ← this file (optional on the server; safe to delete)
```

The page is a full-screen interactive map: clickable rides with speech bubbles, a ride bar
along the bottom, animated clouds, fireworks and parades, and balloons/kites you can drag
or pop. It fills the whole browser window and is designed to be its **own page**, not a
widget inside another page's layout.

## How to install

Pick the option that matches the website. In every case keep `index.html`, `assets/` and
`images/` together in one folder, with the same relative layout.

### A. Static hosting / any web server (Netlify, Vercel, GitHub Pages, Apache, Nginx, cPanel, S3…)

1. Copy the whole `joycon2027` folder into the site's public/web root, e.g. `public/joycon2027/`.
2. Deploy. The page is then live at `https://<site>/joycon2027/`.
3. Optional: link to it from the site's navigation.

Rename the folder if a different URL is wanted (e.g. `joycon/` → `/joycon/`). Nothing inside
needs changing; all paths are relative.

### B. Framework sites (Next.js, Astro, Vite/React, SvelteKit, Nuxt, Gatsby, Hugo, Jekyll, Eleventy…)

Put the folder in the framework's **static/public directory** so it is served untouched:

| Framework | Put the folder at | URL |
|---|---|---|
| Next.js | `public/joycon2027/` | `/joycon2027/index.html` (see note) |
| Astro, Vite, Nuxt 3, Remix | `public/joycon2027/` | `/joycon2027/` |
| SvelteKit, Hugo | `static/joycon2027/` | `/joycon2027/` |
| Gatsby | `static/joycon2027/` | `/joycon2027/` |
| Jekyll, Eleventy | site root, and make sure the folder is passthrough-copied | `/joycon2027/` |

Do **not** convert it into a framework component or route; serve the static files.

*Next.js note:* Next serves `public/joycon2027/index.html` but not `/joycon2027/` automatically.
Link to `/joycon2027/index.html`, or add a rewrite in `next.config.js`:

```js
async rewrites() {
  return [{ source: "/joycon2027", destination: "/joycon2027/index.html" }];
}
```

### C. Website builders (Webflow, Squarespace, Wix, WordPress.com, Framer…)

These usually can't host a folder of files. Two options:

1. **Preferred:** host the folder somewhere static (Netlify Drop at https://app.netlify.com/drop
   accepts the folder by drag-and-drop; or GitHub Pages / Vercel / Cloudflare Pages), then
   link to it from the website, or point a subdomain at it (e.g. `joycon.example.com`).
2. **Embed:** once hosted (step 1), create a page on the site and add a full-page embed / iframe:

   ```html
   <iframe src="https://<where-it-is-hosted>/joycon2027/" title="JoyCon SF 2027"
     style="position:fixed;inset:0;width:100vw;height:100vh;border:0;z-index:9999"
     allow="fullscreen" allowfullscreen></iframe>
   ```

   On self-hosted WordPress you can instead upload the folder via SFTP into the site root
   (next to `wp-content/`) and use option A.

## Check that it works

Open the page URL and confirm:

- An illustrated island fills the screen, with a "JoyCon" title card at top left.
- Six ride buttons appear along the bottom; clicking one shows a speech bubble.
- Clouds drift and balloons float; tapping a balloon pops it.
- The browser dev-tools console shows no 404 errors for `assets/` or `images/`.

**Don't test by double-clicking `index.html`** from your computer's file browser: browsers block
the app's script on `file://` URLs. To preview locally, run a tiny server in this folder, e.g.
`npx serve .` or `python3 -m http.server 8000`, and open http://localhost:8000.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Blank page, console shows 404 for `assets/index-*.js` | The `assets/` folder wasn't uploaded next to `index.html`, or the server rewrote the URL. Keep the layout exactly as shipped. |
| Page loads but artwork is missing | `images/` wasn't uploaded, or was renamed. It must sit next to `assets/`. |
| Page shows inside the site's header/footer and looks squashed | It was injected into a template. Serve it as a standalone page (option A/B) or as a full-window iframe (option C). |
| Font looks like a generic handwriting/Comic font | The site's Content-Security-Policy blocks Google Fonts. Allow `https://fonts.googleapis.com` (style-src) and `https://fonts.gstatic.com` (font-src). |
| Server returns the wrong type for `.webp` or `.js` | Make sure `.js` is served as `text/javascript` and `.webp` as `image/webp` (the default on all modern hosts). |

## External requests

The only things loaded from outside this folder are the **Patrick Hand** fonts from Google
Fonts, and the "Save a seat" button links to `https://joyconsf.netlify.app/weekend.html`.
There is no tracking, analytics, cookies or backend.

## Credits

Artwork, design and build by Nico Shi (syntonikka.xyz). Please keep the files unmodified;
for changes to text, rides or artwork, ask the designer for an updated export.
