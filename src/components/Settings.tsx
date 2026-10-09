import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { languages, type Lang } from '../i18n/ui'
import { useLang } from '../i18n/useLang'

type Theme = 'light' | 'dark'

/** Engranaje flotante con el idioma y el tema. */
export function Settings() {
  const { lang, t } = useLang()
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  // index.html ya fijó data-theme antes del primer render
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme as Theme)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const changeTheme = (next: Theme) => {
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  const changeLang = (next: Lang) => {
    localStorage.setItem('lang', next)
    navigate(pathname.replace(/^\/[^/]+/, `/${next}`) + hash)
  }

  return (
    <div className="settings" ref={ref}>
      <button
        type="button"
        className="icon-button settings-trigger"
        aria-label={t('settings.open')}
        aria-expanded={open}
        aria-controls="settings-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {open && (
        <div id="settings-panel" className="settings-panel" role="group" aria-label={t('settings.open')}>
          <span className="label">{t('settings.language')}</span>
          <div className="segmented">
            {languages.map((l) => (
              <button key={l} type="button" aria-pressed={l === lang} onClick={() => changeLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="label">{t('settings.theme')}</span>
          <div className="segmented">
            {(['light', 'dark'] as const).map((th) => (
              <button key={th} type="button" aria-pressed={th === theme} onClick={() => changeTheme(th)}>
                {t(`theme.${th}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
