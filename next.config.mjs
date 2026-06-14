/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a fully static site in ./out (run `npm run build`).
  output: "export",

  // Remote images are served as-is (no Next image optimizer in a static export).
  images: { unoptimized: true },

  // Cosmetic: emit /page/index.html style folders so it works on any static host.
  trailingSlash: true,

  // Fonts are loaded with a plain <link> in app/layout.tsx, so we don't want
  // Next to try to inline them from fonts.googleapis.com at build time.
  optimizeFonts: false,

  // ── Deploying to GitHub Pages under https://<user>.github.io/<repo>/ ? ──
  // Uncomment and set to your repo name, then rebuild:
  // basePath: "/ham-starter-pack",
  // assetPrefix: "/ham-starter-pack/",
};

export default nextConfig;
