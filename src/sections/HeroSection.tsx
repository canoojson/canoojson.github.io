import { Link } from 'react-router'
import { NavIcon } from '../components/NavIcon'
import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'

const actions = [
  { id: 'about', primary: false },
  { id: 'projects', primary: true },
  { id: 'contact', primary: false },
] as const

export function HeroSection() {
  const { lang, t } = useLang()

  return (
    <div className="hero">
      <div>
        <p className="eyebrow reveal">{t('hero.role')}</p>
        <h1 className="reveal">{t('hero.greeting')}</h1>
        <p className="hero-stack reveal">
          <span className="hero-stack-text">{profile.languages.map((l) => l.name).join(' · ')}</span>
          <span className="hero-stack-icons">
            {profile.languages.map((l) => (
              <svg key={l.name} viewBox="0 0 128 128" role="img" aria-label={l.name} className="tile">
                <title>{l.name}</title>
                <path d={l.icon} />
              </svg>
            ))}
          </span>
        </p>
        <nav className="hero-actions reveal">
          {actions.map(({ id, primary }) => (
            <Link
              key={id}
              to={`/${lang}/${id}`}
              className={primary ? 'button button-primary hero-action' : 'button hero-action'}
              title={t(`hero.cta.${id}`)}
            >
              <NavIcon section={id} />
              <span className="hero-action-label">{t(`hero.cta.${id}`)}</span>
            </Link>
          ))}
        </nav>
      </div>
      <img className="avatar reveal" src={profile.avatar} alt={profile.name} width={200} height={200} />
    </div>
  )
}
