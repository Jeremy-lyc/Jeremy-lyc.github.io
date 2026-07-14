# Visitor Map Worker

A tiny Cloudflare Worker that powers the "Visitor Map" section on the About
page. It records each visitor's approximate location (rounded to a coarse
grid, IP hashed and never stored) and serves the aggregated points as JSON.
It replaces third-party badge services like ClustrMaps, which can go down
without notice.

## Endpoints

- `POST /track` — records one visit (deduped per hashed-IP per day)
- `GET /points` — returns `{ points: [{ lat, lon, count }] }`

## Deploy

1. `npm install` (inside this `worker/` directory)
2. `npx wrangler login`
3. `npx wrangler kv namespace create VISITS`, then paste the returned `id`
   into `wrangler.toml`
4. Set `ALLOWED_ORIGIN` in `wrangler.toml` to your deployed site's origin
   (e.g. `https://yourusername.github.io`)
5. `npm run deploy`
6. Copy the deployed Worker URL (e.g. `https://prism-visitor-map.<you>.workers.dev`)
   into the main project's `.env` as `NEXT_PUBLIC_VISITOR_MAP_API`

All of this runs on Cloudflare's free tier for a personal site's traffic.
