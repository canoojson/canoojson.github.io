import { useState } from 'react'
import { useLang } from '../../i18n/useLang'

/**
 * Vídeo de YouTube que no carga nada de YouTube hasta que se pulsa: primero un poster local
 * y, al pulsar, el reproductor sin cookies (youtube-nocookie.com) ya reproduciéndose.
 */
export function YouTubeVideo({ id, poster, title }: { id: string; poster: string; title: string }) {
  const { t } = useLang()
  const [playing, setPlaying] = useState(false)

  return (
    <div className="youtube">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`${t('project.play')}: ${title}`}>
          <img src={poster} alt="" width={1280} height={720} />
          <span className="youtube-play" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
