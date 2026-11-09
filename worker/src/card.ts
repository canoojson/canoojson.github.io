/**
 * Tarjeta SVG «sonando ahora» para el README del perfil de GitHub (estética synthwave roja).
 * GitHub sirve las imágenes a través de su proxy (camo), que no deja que un SVG cargue recursos
 * externos: la portada va incrustada en base64.
 */

export interface CardTrack {
  title: string
  artist: string
  album: string
  image?: string
  nowPlaying: boolean
}

const text = {
  es: { playing: 'SONANDO AHORA', last: 'LO ÚLTIMO QUE ESCUCHÉ', none: 'Nada sonando ahora mismo' },
  en: { playing: 'NOW PLAYING', last: 'LAST PLAYED', none: 'Nothing playing right now' },
}

export type Lang = keyof typeof text

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

// el SVG no recorta texto: se corta a mano por caracteres
const cut = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s)

async function coverDataUri(url?: string): Promise<string | null> {
  if (!url) return null
  try {
    const res = await fetch(url, { cf: { cacheTtl: 86400, cacheEverything: true } })
    if (!res.ok) return null
    const bytes = new Uint8Array(await res.arrayBuffer())
    let binary = ''
    for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
    return `data:${res.headers.get('Content-Type') ?? 'image/jpeg'};base64,${btoa(binary)}`
  } catch {
    return null
  }
}

export async function renderCard(track: CardTrack | null, lang: Lang): Promise<string> {
  const t = text[lang]
  const W = 480
  const H = 132
  const cover = await coverDataUri(track?.image)

  const label = track ? (track.nowPlaying ? t.playing : t.last) : t.none
  const title = track ? escape(cut(track.title, 30)) : '— — —'
  const artist = track ? escape(cut(track.artist, 38)) : 'Spotify'
  const album = track ? escape(cut(track.album, 42)) : ''

  // ecualizador: solo se anima si suena de verdad
  const bars = Array.from({ length: 5 }, (_, i) => {
    const x = 418 + i * 9
    const anim = track?.nowPlaying
      ? `<animate attributeName="height" values="6;22;10;18;6" dur="${0.9 + i * 0.17}s" repeatCount="indefinite"/>
         <animate attributeName="y" values="102;86;98;90;102" dur="${0.9 + i * 0.17}s" repeatCount="indefinite"/>`
      : ''
    return `<rect x="${x}" y="102" width="5" height="6" rx="1.5" fill="url(#neon)">${anim}</rect>`
  }).join('')

  const art = cover
    ? `<image href="${cover}" x="20" y="20" width="92" height="92" clip-path="url(#round)" preserveAspectRatio="xMidYMid slice"/>`
    : `<rect x="20" y="20" width="92" height="92" rx="10" fill="#1a0a12"/><text x="66" y="74" text-anchor="middle" font-size="34" fill="#ff2a4d">♪</text>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escape(label)}: ${title} · ${artist}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#14060c"/><stop offset="1" stop-color="#07030a"/>
    </linearGradient>
    <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ff2a4d"/><stop offset="1" stop-color="#ff6b3d"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="round"><rect x="20" y="20" width="92" height="92" rx="10"/></clipPath>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0H0V24" fill="none" stroke="#ff2a4d" stroke-opacity=".07"/>
    </pattern>
  </defs>
  <style>
    text { font-family: 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif; }
    .label { font-size: 11px; font-weight: 700; letter-spacing: 2.4px; fill: #ff2a4d; }
    .title { font-size: 19px; font-weight: 700; fill: #fff1f3; }
    .artist { font-size: 14px; fill: #ff9aa9; }
    .album { font-size: 12px; fill: #9a6a74; }
    ${track?.nowPlaying ? '.dot { animation: pulse 1.4s ease-in-out infinite; } @keyframes pulse { 50% { opacity: .25; } }' : ''}
  </style>
  <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="16" fill="url(#bg)"/>
  <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="16" fill="url(#grid)"/>
  <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="16" fill="none" stroke="url(#neon)" stroke-width="2" filter="url(#glow)"/>
  ${art}
  <rect x="20" y="20" width="92" height="92" rx="10" fill="none" stroke="#ff2a4d" stroke-opacity=".6"/>
  <circle class="dot" cx="134" cy="33" r="4" fill="${track?.nowPlaying ? '#ff2a4d' : '#6b3a44'}"/>
  <text class="label" x="146" y="37">${escape(label)}</text>
  <text class="title" x="130" y="66" filter="url(#glow)">${title}</text>
  <text class="artist" x="130" y="89">${artist}</text>
  <text class="album" x="130" y="108">${album}</text>
  ${bars}
</svg>`
}
