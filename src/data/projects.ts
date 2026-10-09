import type { Lang } from '../i18n/ui'

type Localized = Record<Lang, string>

export interface Project {
  slug: string
  name: string
  repo: string
  tech: string[]
  summary: Localized
  images: string[]
  /** 'contain' para iconos y logos que no deben recortarse */
  imageFit?: 'cover' | 'contain'
}

const raw = (repo: string, branch: string, path: string) =>
  `https://raw.githubusercontent.com/canoojson/${repo}/${branch}/${encodeURI(path)}`

// Contenido provisional: se completa en la fase de contenido.
export const projects: Project[] = [
  {
    slug: 'airpods-linux',
    name: 'AirPods PopUp on Arch Linux',
    repo: 'airpodsPopUpOnArchLinux',
    tech: ['Shell', 'Python', 'Luau', 'BLE', 'BlueZ'],
    summary: {
      es: 'Batería de los AirPods en Linux, incluso con la caja cerrada, y popup al estilo iOS al abrir la caja.',
      val: "Bateria dels AirPods en Linux, fins i tot amb la caixa tancada, i finestra emergent a l'estil d'iOS en obrir la caixa.",
      en: 'AirPods battery on Linux, even with the case closed, plus an iOS-style popup when the case opens.',
    },
    images: [],
  },
  {
    slug: 'reparatic',
    name: 'ReparaTIC',
    repo: 'ReparaTIC',
    tech: ['Kotlin', 'Jetpack Compose', 'Spring Boot', 'MySQL'],
    summary: {
      es: 'App Android y API REST para gestionar incidencias informáticas en centros educativos.',
      val: 'Aplicació Android i API REST per a gestionar incidències informàtiques en centres educatius.',
      en: 'Android app and REST API to manage IT incidents in schools.',
    },
    images: [raw('ReparaTIC', 'master', 'app/src/main/ic_launcher-playstore.png')],
    imageFit: 'contain',
  },
  {
    slug: 'web-scouts',
    name: 'Web Scouts Impeesa 243',
    repo: 'Web-Scouts',
    tech: ['HTML', 'CSS', 'JavaScript'],
    summary: {
      es: 'Web del grupo scout Impeesa 243 de Burjassot: galería, inscripciones, login con roles y calendario.',
      val: "Web del grup scout Impeesa 243 de Burjassot: galeria, inscripcions, inici de sessió amb rols i calendari.",
      en: 'Website for the Impeesa 243 scout group in Burjassot: gallery, sign-ups, role-based login and calendar.',
    },
    images: [raw('Web-Scouts', 'main', 'img/imagenEncabezado.png')],
    imageFit: 'contain',
  },
  {
    slug: 'administracion-baloncesto',
    name: 'Administración de Baloncesto',
    repo: 'Administracion-Baloncesto',
    tech: ['C#', 'WPF', '.NET 8', 'Entity Framework', 'MySQL'],
    summary: {
      es: 'App de escritorio para gestionar equipos de baloncesto y jugadores: fichas de jugador y plantillas.',
      val: "Aplicació d'escriptori per a gestionar equips de bàsquet i jugadors: fitxes de jugador i plantilles.",
      en: 'Desktop app to manage basketball teams and players: player profiles and team rosters.',
    },
    images: [raw('Administracion-Baloncesto', 'master', 'di.repaso.2024/Recursos/Imagenes/login.jpg')],
  },
  {
    slug: 'gestion-material-escolar',
    name: 'Gestión de Material Escolar',
    repo: 'Gestion-Material-Escolar',
    tech: ['C#', 'WPF', '.NET 6', 'Entity Framework', 'MySQL'],
    summary: {
      es: 'App de escritorio para controlar el material escolar de un centro.',
      val: "Aplicació d'escriptori per a controlar el material escolar d'un centre.",
      en: "Desktop app to keep track of a school's equipment.",
    },
    images: [raw('Gestion-Material-Escolar', 'master', 'di.proyecto.clase.2023/Resources/Imagenes/escudologin5.png')],
    imageFit: 'contain',
  },
]

export const findProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
