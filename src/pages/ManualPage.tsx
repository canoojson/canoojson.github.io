import { Marked } from 'marked'
import { useParams } from 'react-router'
import { BackLink } from '../components/Layout'
import { findProject } from '../data/projects'
import { useScrollTop } from '../hooks/useScrollTop'
import { useLang } from '../i18n/useLang'
import reparatic from '../manuals/reparatic.md?raw'
import { NotFound } from './NotFound'

const manuales: Record<string, string> = { reparatic }

// ids como los de GitHub, para que funcionen los enlaces del índice (#1-puesta-en-marcha)
const ancla = (texto: string) =>
  texto
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')

const markdown = new Marked({
  renderer: {
    heading({ tokens, depth, text }) {
      return `<h${depth} id="${ancla(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`
    },
    link({ href, tokens }) {
      const externo = /^https?:/.test(href) ? ' target="_blank" rel="noreferrer"' : ''
      return `<a href="${href}"${externo}>${this.parser.parseInline(tokens)}</a>`
    },
  },
})

/** Manual de un proyecto, escrito en Markdown en src/manuals/<slug>.md */
export function ManualPage() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  useScrollTop()
  const project = findProject(slug)
  const texto = slug ? manuales[slug] : undefined
  if (!project || !texto) return <NotFound />

  return (
    <article className="page">
      <BackLink to={`/projects/${project.slug}`}>{project.name}</BackLink>
      {lang !== 'es' && <p className="muted manual-aviso">{t('manual.onlySpanish')}</p>}
      {/* el Markdown es nuestro (src/manuals), no viene de fuera */}
      <div className="manual" lang="es" dangerouslySetInnerHTML={{ __html: markdown.parse(texto) as string }} />
    </article>
  )
}
