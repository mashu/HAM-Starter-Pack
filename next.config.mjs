/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a fully static site in ./out (run `npm run build`).
  output: "export",

  // Remote images are served as-is (no Next image optimizer in a static export).
  images: { unoptimized: true },

  // Cosmetic: emit /page/index.html style folders so it works on any static host.
  trailingSlash: true,

  basePath: "/HAM-Starter-Pack",
  assetPrefix: "/HAM-Starter-Pack/",
};

export default nextConfig;
