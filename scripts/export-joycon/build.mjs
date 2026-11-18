// Builds the client hand-off package for /joycon2027.
// Output: exports/joycon2027/ (static site folder) and exports/joycon2027.zip
import { build } from "vite";
import { cp, copyFile, rm } from "fs/promises";
import { execFileSync } from "child_process";
import path from "path";

const here = path.dirname(new URL(import.meta.url).pathname);
const repo = path.resolve(here, "../..");
const out = path.join(repo, "exports/joycon2027");
const zip = path.join(repo, "exports/joycon2027.zip");

await build({ configFile: path.join(here, "vite.config.mjs") });
await cp(path.join(repo, "client/public/images/joycon2026"), path.join(out, "images"), {
  recursive: true,
  filter: src => !src.endsWith(".DS_Store"),
});
await copyFile(path.join(here, "README.md"), path.join(out, "README.md"));

await rm(zip, { force: true });
execFileSync("zip", ["-rqX", zip, "joycon2027", "-x", "*.DS_Store"], { cwd: path.dirname(out) });
console.log(`\nJoyCon export ready:\n  ${out}\n  ${zip}`);
