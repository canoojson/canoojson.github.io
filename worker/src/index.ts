/**
 * music.canoojson.dev
 *   /now-playing → { track }: la canción que suena en Spotify o, si no suena nada, la última escuchada.
 *   /top-tracks  → { tracks }: las 5 más escuchadas de las últimas ~4 semanas.
 * Guarda las respuestas en la caché de Cloudflare (15 s y 1 h) para no gastar cuota de la API
 * aunque haya muchas visitas.
 *
 * Secretos: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET. KV MUSIC: refresh_token.
 */

interface Env {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  MUSIC: KVNamespace
}

interface Track {
  title: string
  artist: string
  album: string
  url: string
  image?: string
  nowPlaying: boolean
  playedAt?: number
}

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: { name: string; images: { url: string; width: number | null }[] }
  external_urls: { spotify: string }
}

const NO_STORE = { 'Cache-Control': 'no-store' }
const API = 'https://api.spotify.com/v1/me/player'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...cors, ...headers } })

let cached: { token: string; expires: number } | null = null

async function accessToken(env: Env): Promise<string> {
  if (cached && Date.now() < cached.expires) return cached.token
  const refresh = await env.MUSIC.get('refresh_token')
  if (!refresh) throw new Error('falta refresh_token: ejecuta npm run authorize')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
  })
  // 400 invalid_grant: el refresh token caducó (6 meses) → volver a autorizar
  if (!res.ok) throw new Error(`token ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as { access_token: string; expires_in: number; refresh_token?: string }
  if (data.refresh_token && data.refresh_token !== refresh) await env.MUSIC.put('refresh_token', data.refresh_token)
  cached = { token: data.access_token, expires: Date.now() + (data.expires_in - 60) * 1000 }
  return cached.token
}

function toTrack(item: SpotifyTrack, nowPlaying: boolean, playedAt?: number): Track {
  const images = item.album.images
  // ~300 px basta para el banner; las imágenes vienen de mayor a menor
  const image = images.find((i) => (i.width ?? 0) <= 320)?.url ?? images[0]?.url
  return {
    title: item.name,
    artist: item.artists.map((a) => a.name).join(', '),
    album: item.album.name,
    url: item.external_urls.spotify,
    image,
    nowPlaying,
    playedAt,
  }
}

async function nowPlaying(env: Env): Promise<Track | null> {
  const headers = { Authorization: `Bearer ${await accessToken(env)}` }

  const current = await fetch(`${API}/currently-playing`, { headers })
  if (current.status === 401) cached = null
  if (current.status === 200) {
    const data = (await current.json()) as { is_playing: boolean; currently_playing_type: string; item: SpotifyTrack | null }
    if (data.is_playing && data.currently_playing_type === 'track' && data.item) return toTrack(data.item, true)
  }

  const recent = await fetch(`${API}/recently-played?limit=1`, { headers })
  if (!recent.ok) throw new Error(`recently-played ${recent.status}`)
  const last = ((await recent.json()) as { items: { track: SpotifyTrack; played_at: string }[] }).items[0]
  return last ? toTrack(last.track, false, Math.floor(Date.parse(last.played_at) / 1000)) : null
}

async function topTracks(env: Env): Promise<Track[]> {
  const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`, {
    headers: { Authorization: `Bearer ${await accessToken(env)}` },
  })
  // 403: falta el permiso user-top-read → volver a ejecutar npm run authorize
  if (!res.ok) throw new Error(`top-tracks ${res.status}`)
  const data = (await res.json()) as { items: SpotifyTrack[] }
  return data.items.map((item) => toTrack(item, false))
}

const routes: Record<string, { seconds: number; load: (env: Env) => Promise<object>; empty: object }> = {
  '/now-playing': { seconds: 15, load: async (env) => ({ track: await nowPlaying(env) }), empty: { track: null } },
  '/top-tracks': { seconds: 3600, load: async (env) => ({ tracks: await topTracks(env) }), empty: { tracks: [] } },
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors })
    const url = new URL(request.url)
    const route = routes[url.pathname]
    if (!route) return json({ error: 'not found' }, 404)

    // La copia en la caché de Cloudflare dura route.seconds; al navegador se le dice que no guarde nada,
    // porque Cloudflare reescribe el max-age con el "Browser Cache TTL" de la zona (4 h por defecto).
    const cache = caches.default
    const key = new Request(`${url.origin}${url.pathname}`)
    const hit = await cache.match(key)
    if (hit) return json(await hit.json(), 200, NO_STORE)

    try {
      const body = await route.load(env)
      ctx.waitUntil(cache.put(key, json(body, 200, { 'Cache-Control': `public, max-age=${route.seconds}` })))
      return json(body, 200, NO_STORE)
    } catch (error) {
      console.error(error)
      return json({ ...route.empty, error: 'unavailable' }, 503, NO_STORE)
    }
  },
} satisfies ExportedHandler<Env>
