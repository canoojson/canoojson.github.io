export const languages = ['es', 'val', 'en'] as const
export type Lang = (typeof languages)[number]
export const defaultLang: Lang = 'es'
/** Idioma para visitantes cuyo navegador usa un idioma sin soporte */
export const fallbackLang: Lang = 'en'

/** Etiqueta BCP 47 de cada idioma, para el atributo lang y las fechas */
export const locales: Record<Lang, string> = { es: 'es', val: 'ca-ES-valencia', en: 'en' }

/** Idioma soportado que corresponde a una etiqueta del navegador; el catalán va al valenciano */
export function langFromTag(tag: string): Lang | undefined {
  const base = tag.slice(0, 2).toLowerCase()
  if (base === 'ca') return 'val'
  return isLang(base) ? base : undefined
}

export function isLang(value: string | undefined): value is Lang {
  return languages.includes(value as Lang)
}

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'hero.greeting': 'Hola, soy Sergio Cano',
    'hero.role': 'Desarrollador fullstack · Valencia',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.about': 'Sobre mí',
    'hero.cta.contact': 'Contactar',
    'about.title': 'Sobre mí',
    'about.body1': 'Soy técnico superior en Desarrollo de Aplicaciones Multiplataforma (DAM). Actualmente trabajo en AHORA, empresa española de software ERP y de gestión empresarial, donde me dedico a la implantación de software y a la elaboración de proyectos a medida: me reúno con los clientes para entender qué necesitan, desarrollo la solución y les atiendo también una vez terminado el proyecto, resolviendo dudas, incidencias y peticiones de mejora personalizadas de la herramienta.',
    'about.body2': 'Trabajo a diario con SQL Server, del que tengo un conocimiento amplio, y diseño informes con DevExpress y Crystal Reports. También tengo conocimientos de desarrollo de aplicaciones en Qlik Sense.',
    'about.body3': 'Fuera del trabajo me gusta el desarrollo Android con Kotlin y Jetpack Compose, el backend con Spring Boot y las APIs REST, y cuidar el diseño de interfaces. También mantengo la web de mi grupo scout.',
    'about.stack': 'Tecnologías',
    'experience.title': 'Experiencia',
    'experience.present': 'actualidad',
    'projects.title': 'Proyectos destacados',
    'projects.subtitle': 'Una selección de lo que he construido: apps Android, escritorio, web y Linux.',
    'project.repo': 'Ver repositorio',
    'project.back': 'Volver a proyectos',
    'project.gallery': 'Capturas',
    'project.manual': 'Manual',
    'project.manualPending': 'Manual en preparación.',
    'contact.title': 'Contacto',
    'contact.body': '¿Hablamos? Puedes encontrarme en:',
    'settings.open': 'Ajustes',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'notFound.title': 'Página no encontrada',
  },
  val: {
    'nav.home': 'Inici',
    'nav.projects': 'Projectes',
    'nav.about': 'Sobre mi',
    'nav.contact': 'Contacte',
    'hero.greeting': 'Hola, soc Sergio Cano',
    'hero.role': 'Desenvolupador fullstack · València',
    'hero.cta.projects': 'Vore projectes',
    'hero.cta.about': 'Sobre mi',
    'hero.cta.contact': 'Contactar',
    'about.title': 'Sobre mi',
    'about.body1': "Soc tècnic superior en Desenvolupament d'Aplicacions Multiplataforma (DAM). Actualment treballe en AHORA, empresa espanyola de programari ERP i de gestió empresarial, on em dedique a la implantació de programari i a l'elaboració de projectes a mida: em reunisc amb els clients per a entendre què necessiten, desenvolupe la solució i els atenc també una vegada acabat el projecte, resolent dubtes, incidències i peticions de millora personalitzades de l'eina.",
    'about.body2': "Treballe cada dia amb SQL Server, del qual tinc un coneixement ampli, i dissenye informes amb DevExpress i Crystal Reports. També tinc coneixements de desenvolupament d'aplicacions en Qlik Sense.",
    'about.body3': "Fora de la faena m'agrada el desenvolupament Android amb Kotlin i Jetpack Compose, el backend amb Spring Boot i les API REST, i cuidar el disseny d'interfícies. També mantinc la web del meu grup scout.",
    'about.stack': 'Tecnologies',
    'experience.title': 'Experiència',
    'experience.present': 'actualitat',
    'projects.title': 'Projectes destacats',
    'projects.subtitle': "Una selecció del que he construït: aplicacions Android, d'escriptori, web i Linux.",
    'project.repo': 'Vore repositori',
    'project.back': 'Tornar a projectes',
    'project.gallery': 'Captures',
    'project.manual': 'Manual',
    'project.manualPending': 'Manual en preparació.',
    'contact.title': 'Contacte',
    'contact.body': 'Parlem? Em pots trobar en:',
    'settings.open': 'Ajustos',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'theme.light': 'Clar',
    'theme.dark': 'Fosc',
    'notFound.title': 'Pàgina no trobada',
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.greeting': "Hi, I'm Sergio Cano",
    'hero.role': 'Full-stack developer · Valencia, Spain',
    'hero.cta.projects': 'See projects',
    'hero.cta.about': 'About me',
    'hero.cta.contact': 'Get in touch',
    'about.title': 'About me',
    'about.body1': 'I hold a Higher Degree in Multiplatform App Development. I currently work at AHORA, a Spanish company building ERP and business management software, where I handle software implementation and custom projects: I meet with clients to understand their needs, build the solution and keep supporting them after delivery, solving questions, incidents and custom improvement requests for the tool.',
    'about.body2': 'I work with SQL Server every day and know it in depth, and I design reports with DevExpress and Crystal Reports. I also have experience building Qlik Sense applications.',
    'about.body3': 'Outside work I enjoy Android development with Kotlin and Jetpack Compose, backend work with Spring Boot and REST APIs, and caring about UI design. I also maintain the website of my scout group.',
    'about.stack': 'Tech stack',
    'experience.title': 'Experience',
    'experience.present': 'present',
    'projects.title': 'Featured projects',
    'projects.subtitle': "A selection of what I've built: Android, desktop, web and Linux apps.",
    'project.repo': 'View repository',
    'project.back': 'Back to projects',
    'project.gallery': 'Screenshots',
    'project.manual': 'Manual',
    'project.manualPending': 'Manual coming soon.',
    'contact.title': 'Contact',
    'contact.body': "Let's talk. You can find me on:",
    'settings.open': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'notFound.title': 'Page not found',
  },
} as const

export type UiKey = keyof (typeof ui)['es']
