import { useEffect, useState } from 'react'

export interface Track {
  title: string
  artist: string
  album: string
  url: string
  image?: string
  nowPlaying: boolean
  /** segundos epoch; solo si ya terminó */
  playedAt?: number
}

const POLL_MS = 20_000

// Solo en `npm run dev`, si el Worker no responde: canción de ejemplo para ver el diseño.
// En el build de producción esta rama desaparece.
const demoTrack: Track = {
  title: 'Canción de ejemplo',
  artist: 'Modo desarrollo',
  album: 'El Worker de Spotify no responde',
  url: 'https://open.spotify.com/',
  image:
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#0f766e"/><stop offset="1" stop-color="#5eead4"/></linearGradient></defs><rect width="10" height="10" fill="url(#g)"/></svg>',
    ),
  nowPlaying: true,
}

/** Canción que suena ahora en Spotify o la última escuchada; se refresca cada 20 s con la pestaña visible. */
export function useNowPlaying(endpoint: string) {
  const [track, setTrack] = useState<Track | null>(null)

  useEffect(() => {
    if (!endpoint) return
    const controller = new AbortController()

    const load = async () => {
      if (document.visibilityState === 'hidden') return
      try {
        const res = await fetch(endpoint, { signal: controller.signal, cache: 'no-store' })
        if (!res.ok) throw new Error(String(res.status))
        const data: { track: Track | null } = await res.json()
        setTrack(data.track)
      } catch {
        // sin red o Worker caído: se mantiene lo último que había
        if (import.meta.env.DEV && !controller.signal.aborted) setTrack((t) => t ?? demoTrack)
      }
    }
    load()
    const timer = window.setInterval(load, POLL_MS)
    document.addEventListener('visibilitychange', load)
    return () => {
      controller.abort()
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', load)
    }
  }, [endpoint])

  return track
}
