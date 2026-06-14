# HAM Starter Pack

A static, bilingual (PL/EN) website presenting a budget QRP/HF field kit for a new
amateur radio operator. Built with Next.js (App Router, static export) + Recharts.

## Features

- Items grouped: **Operation · Antenna · Connectivity · Measurements · Power**
- Each item: cropped photo, price, weight, plain-language purpose, link to buy
- Interactive charts: donut (price/weight share by group, live centre readout) and
  a price-vs-weight bubble scatter
- One-tap **PL / EN** language switch
- Instrument-panel theme (Chakra Petch / IBM Plex Sans / IBM Plex Mono)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site exported to ./out
```

`npm run build` writes a fully static site to `out/` — drop it on any static host
(GitHub Pages, Netlify, Cloudflare Pages, S3, …).

## Edit the data

Everything lives in **`data/gear.ts`**. Replace `pricePln` and `weightG` with real
numbers — totals, charts and per-group sums all recompute automatically. UI strings
are in `data/content.ts`.

To change currency, edit `CURRENCY` in `data/gear.ts` and convert the `pricePln`
values.

## Deploy to GitHub Pages

In `next.config.mjs`, uncomment and set `basePath` / `assetPrefix` to your repo
name (e.g. `/ham-starter-pack`), then `npm run build` and publish the `out/`
folder (e.g. via a GitHub Action or the `gh-pages` branch).

73!
