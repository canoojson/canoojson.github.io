import { useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { Layout } from './components/Layout'
import { fallbackLang, isLang, langFromTag, locales } from './i18n/ui'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectPage } from './pages/ProjectPage'

/** Idioma elegido a mano o, si no hay, el primero soportado de los preferidos del navegador. */
function preferredLang() {
  const stored = localStorage.getItem('lang') ?? undefined
  if (isLang(stored)) return stored
  for (const tag of navigator.languages) {
    const lang = langFromTag(tag)
    if (lang) return lang
  }
  return fallbackLang
}

function LangGuard() {
  const { lang } = useParams()
  useEffect(() => {
    if (isLang(lang)) document.documentElement.lang = locales[lang]
  }, [lang])
  if (!isLang(lang)) return <Navigate to={`/${preferredLang()}`} replace />
  return <Layout />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${preferredLang()}`} replace />} />
      <Route path=":lang" element={<LangGuard />}>
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path=":section?" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
