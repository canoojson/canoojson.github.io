import { Link, useLocation } from 'react-router'
import { useLang } from '../i18n/useLang'
import { sectionFromPath, sectionPath, sections } from '../sections/sections'

/** Línea vertical con un punto por sección; el activo se marca en rojo. */
export function DotNav() {
  const { lang, t } = useLang()
  const { pathname } = useLocation()
  const active = sectionFromPath(pathname)

  return (
    <nav className="dot-nav">
      <ol>
        {sections.map((id) => (
          <li key={id}>
            <Link to={sectionPath(lang, id)} aria-current={id === active ? 'location' : undefined}>
              <span className="dot-nav-label">{t(`nav.${id}`)}</span>
              <span className="dot-nav-dot" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
