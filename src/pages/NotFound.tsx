import { Link } from 'react-router'
import { useScrollTop } from '../hooks/useScrollTop'
import { useLang } from '../i18n/useLang'

export function NotFound() {
  const { lang, t } = useLang()
  useScrollTop()
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>{t('notFound.title')}</h1>
      <Link to={`/${lang}`} className="button button-primary">
        {t('nav.home')}
      </Link>
    </section>
  )
}
