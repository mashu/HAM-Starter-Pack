/** @type {import('next').NextConfig} */

const repoBase = "/HAM-Starter-Pack";
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  // Produces a fully static site in ./out (run `npm run build`).
  output: "export",

  // Remote images are served as-is (no Next image optimizer in a static export).
  images: { unoptimized: true },

  // Cosmetic: emit /page/index.html style folders so it works on any static host.
  trailingSlash: true,

  // GitHub Pages only — skip in dev so http://localhost:3000/ works directly.
  ...(isDev ? {} : { basePath: repoBase, assetPrefix: `${repoBase}/` }),

  // Allow HMR when opening the dev server from another device on the LAN.
  allowedDevOrigins: ["192.168.0.35"],
};

export default nextConfig;
