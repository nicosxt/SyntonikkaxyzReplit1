import { defineConfig } from "vite";
import { generateGallery } from "./scripts/generate-gallery.mjs";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig(async () => {
  await generateGallery();
  return {
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  };
});
