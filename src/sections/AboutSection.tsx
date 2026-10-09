import { useCallback, useEffect } from 'react'
import { Games } from '../components/Games'
import { Timeline } from '../components/Timeline'
import { experience, volunteering } from '../data/experience'
import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'
import { setAccentFromCover } from '../music/accent'
import { NowPlaying } from '../music/NowPlaying'
import { TopTracks } from '../music/TopTracks'

/**
 * La luz de color sale del banner de la canción: se le pasa al CSS el centro del banner,
 * en x respecto a la pantalla y en y respecto al inicio de la sección.
 */
function placeLight() {
  const section = document.getElementById('about')
  const banner = section?.querySelector('.now-playing')
  if (!section || !banner) return
  const s = section.getBoundingClientRect()
  const b = banner.getBoundingClientRect()
  section.style.setProperty('--light-x', `${b.left + b.width / 2}px`)
  section.style.setProperty('--light-y', `${b.top - s.top + b.height / 2}px`)
}

export function AboutSection() {
  const { t } = useLang()
  const setTint = useCallback((color: string | null) => {
    const section = document.getElementById('about')
    if (!section) return
    if (color) section.style.setProperty('--music-tint', color)
    section.classList.toggle('tinted', Boolean(color))
    setAccentFromCover(color)
    placeLight()
  }, [])

  // la luz se recoloca si cambia la maquetación (ancho de pantalla, banner que aparece, idioma…)
  useEffect(() => {
    const section = document.getElementById('about')
    if (!section) return
    const observer = new ResizeObserver(placeLight)
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <h2 className="section-title reveal">{t('about.title')}</h2>
      <div className="about">
        <div className="reveal">
          <p>{t('about.body1')}</p>
          <p>{t('about.body2')}</p>
          <p>{t('about.body3')}</p>
        </div>
        <div className="reveal">
          <h3 className="label">{t('about.stack')}</h3>
          <ul className="tags">
            {profile.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
      <h3 className="subsection-title reveal">{t('experience.title')}</h3>
      <div className="reveal">
        <Timeline items={experience} />
      </div>

      <h3 className="subsection-title reveal">{t('volunteering.title')}</h3>
      <div className="reveal">
        <Timeline items={volunteering} />
      </div>

      <h3 className="subsection-title reveal">{t('offwork.title')}</h3>
      <div className="offwork">
        <div className="reveal">
          <Games />
        </div>
        <div className="reveal music">
          <h4 className="label">{t('music.title')}</h4>
          <NowPlaying onTint={setTint} />
          <TopTracks />
        </div>
      </div>
    </>
  )
}
