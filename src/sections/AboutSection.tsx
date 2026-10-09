import { Timeline } from '../components/Timeline'
import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'

export function AboutSection() {
  const { t } = useLang()
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
        <Timeline />
      </div>
    </>
  )
}
