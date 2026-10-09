import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'

export function ContactSection() {
  const { t } = useLang()
  return (
    <>
      <h2 className="section-title reveal">{t('contact.title')}</h2>
      <p className="section-subtitle reveal">{t('contact.body')}</p>
      <div className="hero-actions reveal">
        {profile.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="button">
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}
