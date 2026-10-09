import { useParams } from 'react-router'
import { BackLink } from '../components/Layout'
import { useScrollTop } from '../hooks/useScrollTop'
import { ProjectImage } from '../components/ProjectImage'
import { findProject } from '../data/projects'
import { useLang } from '../i18n/useLang'
import { NotFound } from './NotFound'

export function ProjectPage() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  useScrollTop()
  const project = findProject(slug)
  if (!project) return <NotFound />

  return (
    <article className="page project-page">
      <BackLink to="/projects">{t('project.back')}</BackLink>
      <header className="project-header">
        <h1>{project.name}</h1>
        <p className="lead">{project.summary[lang]}</p>
        <ul className="tags">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <a href={`https://github.com/canoojson/${project.repo}`} target="_blank" rel="noreferrer" className="button button-primary">
          {t('project.repo')}
        </a>
      </header>

      <ProjectImage project={project} />

      {project.images.length > 1 && (
        <section className="section">
          <h2>{t('project.gallery')}</h2>
          <div className="gallery">
            {project.images.slice(1).map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2>{t('project.manual')}</h2>
        <p className="muted">{t('project.manualPending')}</p>
      </section>
    </article>
  )
}
