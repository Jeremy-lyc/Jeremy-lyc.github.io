export interface Env {
  VISITS: KVNamespace;
  ALLOWED_ORIGIN: string;
}

const POINT_PREFIX = 'point:';
const SEEN_PREFIX = 'seen:';
// Coarse grid for both privacy and dot-clustering (~55km).
const GRID_STEP = 0.5;

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function roundToGrid(value: number): number {
  return Math.round(value / GRID_STEP) * GRID_STEP;
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${ip}:${salt}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function handleTrack(request: Request, env: Env, headers: HeadersInit): Promise<Response> {
  const cf = request.cf as { latitude?: string; longitude?: string } | undefined;
  const lat = cf?.latitude ? parseFloat(cf.latitude) : null;
  const lon = cf?.longitude ? parseFloat(cf.longitude) : null;

  if (lat === null || lon === null || Number.isNaN(lat) || Number.isNaN(lon)) {
    return new Response(null, { status: 204, headers });
  }

  // Dedupe per visitor per day. IP is only ever hashed, never stored raw.
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const day = new Date().toISOString().slice(0, 10);
  const seenKey = `${SEEN_PREFIX}${await hashIp(ip, day)}`;

  if (await env.VISITS.get(seenKey)) {
    return new Response(null, { status: 204, headers });
  }
  await env.VISITS.put(seenKey, '1', { expirationTtl: 60 * 60 * 24 });

  const pointKey = `${POINT_PREFIX}${roundToGrid(lat)},${roundToGrid(lon)}`;
  const current = parseInt((await env.VISITS.get(pointKey)) || '0', 10);
  await env.VISITS.put(pointKey, String(current + 1));

  return new Response(null, { status: 204, headers });
}

async function handlePoints(env: Env, headers: HeadersInit): Promise<Response> {
  const list = await env.VISITS.list({ prefix: POINT_PREFIX });
  const points = await Promise.all(
    list.keys.map(async (key) => {
      const [lat, lon] = key.name.slice(POINT_PREFIX.length).split(',').map(Number);
      const count = parseInt((await env.VISITS.get(key.name)) || '0', 10);
      return { lat, lon, count };
    })
  );

  return new Response(JSON.stringify({ points }), {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const headers = corsHeaders(env.ALLOWED_ORIGIN || '*');

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (url.pathname === '/track' && request.method === 'POST') {
      return handleTrack(request, env, headers);
    }

    if (url.pathname === '/points' && request.method === 'GET') {
      return handlePoints(env, headers);
    }

    return new Response('Not found', { status: 404, headers });
  },
};
