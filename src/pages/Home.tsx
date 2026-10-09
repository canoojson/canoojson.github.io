import { useEffect, useRef, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router'
import { scrollToSection, useSectionNavigation } from '../hooks/sectionScroll'
import { useLang } from '../i18n/useLang'
import { AboutSection } from '../sections/AboutSection'
import { ContactSection } from '../sections/ContactSection'
import { HeroSection } from '../sections/HeroSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { isSection, sectionPath, sections, type SectionId } from '../sections/sections'
import { NotFound } from './NotFound'

const content: Record<SectionId, ReactNode> = {
  home: <HeroSection />,
  about: <AboutSection />,
  projects: <ProjectsSection />,
  contact: <ContactSection />,
}

/**
 * Página única con todas las secciones. La URL sigue a la sección visible
 * y, al revés, cambiar la URL (puntos laterales, botones) hace scroll animado hasta ella.
 */
export function Home() {
  const { section } = useParams()
  const { lang } = useLang()
  const navigate = useNavigate()
  const current: SectionId | undefined = section === undefined ? 'home' : isSection(section) ? section : undefined

  const currentRef = useRef(current)
  const fromScroll = useRef<SectionId | null>(null)
  const firstScroll = useRef(true)
  const langRef = useRef(lang)
  useEffect(() => {
    langRef.current = lang
  }, [lang])

  // URL → scroll
  useEffect(() => {
    currentRef.current = current
    if (!current) return
    if (fromScroll.current === current) {
      fromScroll.current = null
      return
    }
    scrollToSection(current, firstScroll.current)
    firstScroll.current = false
  }, [current])

  // Scroll → URL: la sección que cruza el centro de la pantalla es la activa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId
          if (!entry.isIntersecting || id === currentRef.current) continue
          fromScroll.current = id
          navigate(sectionPath(langRef.current, id), { replace: true })
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sections.forEach((id) => observer.observe(document.getElementById(id)!))
    return () => observer.disconnect()
  }, [navigate])

  useSectionNavigation('.snap-section')

  // Animación de entrada: se repite cada vez que la sección vuelve a la pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting)),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.snap-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!current) return <NotFound />

  return (
    <>
      {sections.map((id) => (
        <section key={id} id={id} className={`snap-section snap-${id}`}>
          {content[id]}
        </section>
      ))}
    </>
  )
}
