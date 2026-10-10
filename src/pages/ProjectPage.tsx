import { useParams } from 'react-router'
import { BackLink } from '../components/Layout'
import { CopyCommand } from '../components/project/CopyCommand'
import { DemoVideo } from '../components/project/DemoVideo'
import { Gallery } from '../components/project/Gallery'
import { YouTubeVideo } from '../components/project/YouTubeVideo'
import { ProjectImage } from '../components/ProjectImage'
import { findProject } from '../data/projects'
import { useScrollTop } from '../hooks/useScrollTop'
import { useLang } from '../i18n/useLang'
import { NotFound } from './NotFound'

export function ProjectPage() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  useScrollTop()
  const project = findProject(slug)
  if (!project) return <NotFound />
  const d = project.detail

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
        <div className="hero-actions">
          <a href={`https://github.com/canoojson/${project.repo}`} target="_blank" rel="noreferrer" className="button button-primary">
            {t('project.repo')}
          </a>
          {d?.release && (
            <a href={d.release.url} target="_blank" rel="noreferrer" className="button">
              {t('project.release')} · {d.release.version}
            </a>
          )}
        </div>
        {d?.license && (
          <p className="project-meta">
            {t('project.license')}: {d.license}
          </p>
        )}
      </header>

      {d?.youtube && (
        <section className="section">
          <h2>{t('project.video')}</h2>
          <YouTubeVideo id={d.youtube.id} poster={d.youtube.poster} title={project.name} />
          <a href={`https://youtu.be/${d.youtube.id}`} target="_blank" rel="noreferrer" className="youtube-link">
            {t('project.youtube')} →
          </a>
        </section>
      )}

      {d?.demos?.length ? (
        <section className="section">
          <h2>{t('project.demos')}</h2>
          <div className="demos">
            {d.demos.map((demo) => (
              <DemoVideo key={demo.src} demo={demo} />
            ))}
          </div>
        </section>
      ) : (
        <ProjectImage project={project} />
      )}

      {d?.features && (
        <section className="section">
          <h2>{t('project.features')}</h2>
          <ul className="features">
            {d.features.map((f) => (
              <li key={f.title.es}>
                <h3>{f.title[lang]}</h3>
                <p>{f.text[lang]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {d?.screenshots && (
        <section className="section">
          <h2>{t('project.gallery')}</h2>
          <Gallery items={d.screenshots} />
        </section>
      )}

      {(d?.options || d?.commands) && (
        <section className="section">
          <h2>{t('project.options')}</h2>
          <div className="options">
            {d.options && (
              <div>
                <h3 className="label">{d.options.title[lang]}</h3>
                <dl className="option-list">
                  {d.options.items.map((o) => (
                    <div key={o.label.es}>
                      <dt>{o.label[lang]}</dt>
                      <dd>{o.text[lang]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {d.commands && (
              <div>
                <h3 className="label">{d.commands.title[lang]}</h3>
                <dl className="option-list commands">
                  {d.commands.lines.map((c) => (
                    <div key={c.code}>
                      <dt>
                        <code>{c.code}</code>
                      </dt>
                      <dd>{c.text[lang]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>
      )}

      {d?.install && (
        <section className="section">
          <h2>{t('project.install')}</h2>
          {d.install.command && <CopyCommand command={d.install.command} />}
          {d.install.steps && (
            <ol className="install-steps">
              {d.install.steps.map((step) => (
                <li key={step.es}>{step[lang]}</li>
              ))}
            </ol>
          )}
          <p className="muted install-note">{d.install.note[lang]}</p>
          <h3 className="label">{t('project.compat')}</h3>
          <dl className="option-list compat">
            {d.install.compat.map((c) => (
              <div key={c.label.es}>
                <dt>{c.label[lang]}</dt>
                <dd>{c.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="section">
        <h2>{t('project.manual')}</h2>
        {d?.manualUrl ? (
          <a href={d.manualUrl} target="_blank" rel="noreferrer" className="button">
            {t('project.manualFull')} →
          </a>
        ) : (
          <p className="muted">{t('project.manualPending')}</p>
        )}
      </section>
    </article>
  )
}
