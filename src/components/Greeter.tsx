import { useEffect, useState } from 'react'
import { domain, friends } from '../data/friends'
import { useLang } from '../i18n/useLang'

// El Caballero (Hollow Knight) y Sherma (Silksong): se turnan en cada visita
const characters = [
  { src: '/greeter/knight.webp', width: 284, height: 360 },
  { src: '/greeter/sherma.webp', width: 323, height: 360 },
]

const storageKey = 'greeter'
/** Píxeles de scroll a partir de los que se esconde */
const threshold = 24

/** Cada visita toca el siguiente personaje al de la anterior; sin almacenamiento, uno al azar. */
function nextCharacter() {
  try {
    const last = localStorage.getItem(storageKey)
    return last === null ? 0 : (Number(last) + 1) % characters.length || 0
  } catch {
    return Math.floor(Math.random() * characters.length)
  }
}

/**
 * Personaje de Hollow Knight o Silksong que saluda en la portada e invita a visitar las webs amigas.
 * Se esconde al desplazar la página y vuelve al subir; el saludo solo se hace la primera vez.
 */
export function Greeter() {
  const { lang, t } = useLang()
  const [index] = useState(nextCharacter)
  // empieza oculto: si la URL es otra sección, Home baja hasta ella justo después de montar
  const [atTop, setAtTop] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const character = characters[index]

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(index))
    } catch {
      // sin almacenamiento: la próxima visita vuelve a ser al azar
    }
  }, [index])

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY < threshold
      setAtTop(top)
      if (top) setGreeted(true)
    }
    // primera comprobación en el siguiente frame, cuando Home ya ha hecho su scroll inicial
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const classes = ['greeter', atTop ? '' : 'greeter-hidden', greeted ? 'greeter-greeted' : ''].filter(Boolean).join(' ')

  return (
    <aside className={classes} aria-label={t('friends.title')} inert={!atTop}>
      <img className="greeter-character" src={character.src} alt="" width={character.width} height={character.height} />
      <div className="greeter-bubble">
        <p className="greeter-message">{t('greeter.message')}</p>
        <ul>
          {friends.map((f) => (
            <li key={f.slug}>
              <a href={f.url} target="_blank" rel="noreferrer">
                <span className="greeter-name">{f.name[lang]}</span>
                <span className="greeter-domain">{domain(f.url)}</span>
                <span className="greeter-summary">{f.summary[lang]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
