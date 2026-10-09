import type { ReactNode } from 'react'
import { Link, Outlet } from 'react-router'
import { useLang } from '../i18n/useLang'
import { DotNav } from './DotNav'
import { Settings } from './Settings'

export function Layout() {
  return (
    <>
      <Settings />
      <DotNav />
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}

/** Enlace de vuelta que encabeza las páginas interiores. */
export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  const { lang } = useLang()
  return (
    <Link to={`/${lang}${to}`} className="back-link">
      ← {children}
    </Link>
  )
}
