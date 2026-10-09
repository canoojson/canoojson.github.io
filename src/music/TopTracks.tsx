import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'
import type { Track } from './useNowPlaying'

/** Las 5 canciones más escuchadas en Spotify las últimas ~4 semanas (se cargan una vez). */
export function TopTracks() {
  const { t } = useLang()
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    const controller = new AbortController()
    fetch(profile.music.topEndpoint, { signal: controller.signal, cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { tracks: [] }))
      .then((data: { tracks: Track[] }) => setTracks(data.tracks))
      .catch(() => {})
    return () => controller.abort()
  }, [])

  if (!tracks.length) return null

  return (
    <div className="top-tracks">
      <h5 className="label">{t('music.top')}</h5>
      <ol>
        {tracks.map((track, i) => (
          <li key={track.url}>
            <a href={track.url} target="_blank" rel="noreferrer">
              <span className="top-rank">{i + 1}</span>
              {track.image && <img src={track.image} alt="" width={44} height={44} loading="lazy" />}
              <span className="top-body">
                <span className="top-title">{track.title}</span>
                <span className="top-artist">{track.artist}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
