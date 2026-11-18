// Standalone build of the /joycon2027 page for handing to a client.
// Run: npm run export:joycon  (scripts/export-joycon/build.mjs) → exports/joycon2027/ and exports/joycon2027.zip
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";

const here = path.dirname(new URL(import.meta.url).pathname);
const repo = path.resolve(here, "../..");
const page = path.resolve(repo, "client/src/pages/JoyCon2026.tsx");

export default defineConfig({
  root: here,
  base: "./",
  plugins: [
    react(),
    {
      // The site serves artwork from /images/joycon2026. In the export, resolve it next to the
      // bundle instead, so the folder works at any URL (subfolder, CMS route, with or without slash).
      name: "joycon-relative-images",
      enforce: "pre",
      transform(code, id) {
        if (id !== page) return;
        const out = code.replace(
          'const BASE = "/images/joycon2026";',
          'const BASE = new URL(/* @vite-ignore */ "../images", import.meta.url).href.replace(/\\/$/, "");',
        );
        if (out === code) throw new Error("JoyCon export: BASE constant not found; update scripts/export-joycon");
        return out;
      },
    },
  ],
  publicDir: false, // artwork is copied into images/ by build.mjs
  css: {
    postcss: {
      plugins: [
        tailwind({
          content: [path.join(here, "index.html"), path.join(here, "main.tsx"), page],
          corePlugins: {},
        }),
        autoprefixer(),
      ],
    },
  },
  build: {
    outDir: path.resolve(repo, "exports/joycon2027"),
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
