export const sections = ['home', 'about', 'projects', 'friends', 'contact'] as const
export type SectionId = (typeof sections)[number]

export function isSection(value: string | undefined): value is SectionId {
  return sections.includes(value as SectionId)
}

/** Ruta de cada sección: la portada es la raíz del idioma */
export const sectionPath = (lang: string, id: SectionId) => (id === 'home' ? `/${lang}` : `/${lang}/${id}`)

/** Sección activa según la URL; dentro de un proyecto cuenta como "projects" */
export function sectionFromPath(pathname: string): SectionId | undefined {
  const segment = pathname.split('/')[2]
  if (!segment) return 'home'
  return isSection(segment) ? segment : undefined
}
