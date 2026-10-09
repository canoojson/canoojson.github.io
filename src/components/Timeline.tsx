import type { Experience, Role } from '../data/experience'
import { locales, type Lang } from '../i18n/ui'
import { useLang } from '../i18n/useLang'

/** 'YYYY-MM' → "jul 2026"; 'YYYY' → "2025" */
function formatDate(date: string, lang: Lang) {
  const [y, m] = date.split('-').map(Number)
  if (!m) return String(y)
  return new Intl.DateTimeFormat(locales[lang], { month: 'short', year: 'numeric' }).format(new Date(y, m - 1))
}

function period(role: Role, lang: Lang, present: string) {
  return `${formatDate(role.start, lang)} – ${role.end ? formatDate(role.end, lang) : present}`
}

export function Timeline({ items }: { items: Experience[] }) {
  const { lang, t } = useLang()

  return (
    <ol className="timeline">
      {items.map((job) => (
        <li key={job.company} className={job.roles.some((r) => !r.end) ? 'timeline-item current' : 'timeline-item'}>
          <h3>{job.url ? <a href={job.url} target="_blank" rel="noreferrer">{job.company}</a> : job.company}</h3>
          <p className="timeline-meta">{job.location[lang]}</p>
          {job.description && <p className="timeline-description">{job.description[lang]}</p>}
          <ul className="timeline-roles">
            {job.roles.map((role) => (
              <li key={role.start}>
                <span className="timeline-role">{role.title[lang]}</span>
                <span className="timeline-meta">
                  {[period(role, lang, t('experience.present')), role.contract?.[lang], role.mode?.[lang]].filter(Boolean).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
