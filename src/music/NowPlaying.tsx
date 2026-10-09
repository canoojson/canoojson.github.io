import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { locales, type Lang } from '../i18n/ui'
import { useLang } from '../i18n/useLang'
import { spotifyPath } from './spotifyIcon'
import { coverColor } from './coverColor'
import { useNowPlaying } from './useNowPlaying'

function timeAgo(uts: number, lang: Lang) {
  const seconds = uts - Date.now() / 1000
  const rtf = new Intl.RelativeTimeFormat(locales[lang], { numeric: 'auto' })
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, size] of steps) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return rtf.format(0, 'minute')
}

/**
 * Banner con la canción que suena (o la última) y el color de su portada,
 * que tiñe la sección Sobre mí a través de onTint.
 */
export function NowPlaying({ onTint }: { onTint: (color: string | null) => void }) {
  const { lang, t } = useLang()
  const { endpoint, source } = profile.music
  const track = useNowPlaying(endpoint)
  const [, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    if (!track?.image) onTint(null)
    else coverColor(track.image).then((c) => !cancelled && onTint(c))
    return () => {
      cancelled = true
    }
  }, [track?.image, onTint])

  // refresca el "hace X min" aunque no cambie la canción
  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60_000)
    return () => window.clearInterval(id)
  }, [])

  if (!track) return null

  return (
    <a className="now-playing reveal" href={track.url} target="_blank" rel="noreferrer">
      <span className="now-playing-cover">
        {track.image ? (
          <img src={track.image} alt="" width={72} height={72} />
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={spotifyPath} />
          </svg>
        )}
      </span>
      <span className="now-playing-body">
        <span className="now-playing-status">
          {track.nowPlaying && (
            <span className="equalizer" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
          {track.nowPlaying ? t('music.now') : t('music.last')}
          {!track.nowPlaying && track.playedAt && ` · ${timeAgo(track.playedAt, lang)}`}
        </span>
        <span className="now-playing-title">{track.title}</span>
        <span className="now-playing-artist">
          {track.artist}
          {track.album && ` · ${track.album}`}
        </span>
      </span>
      <span className="now-playing-source" title={`${t('music.on')} ${source}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={spotifyPath} />
        </svg>
        <span>{source}</span>
      </span>
    </a>
  )
}
