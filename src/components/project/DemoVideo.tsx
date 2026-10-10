import { useEffect, useRef, useState } from 'react'
import type { Demo } from '../../data/projects'
import { useLang } from '../../i18n/useLang'

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Vídeo corto en bucle y sin sonido: solo se reproduce mientras se ve en pantalla.
 * Con "reducir movimiento" no arranca solo y muestra los controles.
 */
export function DemoVideo({ demo }: { demo: Demo }) {
  const { lang } = useLang()
  const ref = useRef<HTMLVideoElement>(null)
  const [still] = useState(reducedMotion)

  useEffect(() => {
    const video = ref.current
    if (!video || still) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [still])

  return (
    <figure className="demo">
      <video
        ref={ref}
        src={demo.src}
        poster={demo.poster}
        width={demo.width}
        height={demo.height}
        muted
        loop
        playsInline
        preload="none"
        controls={still}
        aria-label={demo.title[lang]}
      />
      <figcaption>
        <strong>{demo.title[lang]}</strong>
        <span>{demo.text[lang]}</span>
      </figcaption>
    </figure>
  )
}
