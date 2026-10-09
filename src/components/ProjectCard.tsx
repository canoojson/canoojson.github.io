import { Link } from 'react-router'
import type { Project } from '../data/projects'
import { useLang } from '../i18n/useLang'
import { ProjectImage } from './ProjectImage'

export function ProjectCard({ project }: { project: Project }) {
  const { lang } = useLang()
  return (
    <Link to={`/${lang}/projects/${project.slug}`} className="card">
      <ProjectImage project={project} />
      <div className="card-body">
        <h3>{project.name}</h3>
        <p>{project.summary[lang]}</p>
        <ul className="tags">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
