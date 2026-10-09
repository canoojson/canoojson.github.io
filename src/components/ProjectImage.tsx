import type { Project } from '../data/projects'

/** Primera imagen del proyecto o, si no tiene, un marcador con sus iniciales. */
export function ProjectImage({ project }: { project: Project }) {
  const src = project.images[0]
  const fit = project.imageFit ?? 'cover'
  return (
    <div className={`media media-${fit}`}>
      {src ? (
        <img src={src} alt="" loading="lazy" />
      ) : (
        <span className="media-placeholder" aria-hidden="true">
          {project.name
            .split(/\s+/)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')}
        </span>
      )}
    </div>
  )
}
