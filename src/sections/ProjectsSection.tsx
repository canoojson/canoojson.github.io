import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { useLang } from '../i18n/useLang'

export function ProjectsSection() {
  const { t } = useLang()
  return (
    <>
      <h2 className="section-title reveal">{t('projects.title')}</h2>
      <p className="section-subtitle reveal">{t('projects.subtitle')}</p>
      <div className="grid">
        {projects.map((p) => (
          <div key={p.slug} className="reveal">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </>
  )
}
