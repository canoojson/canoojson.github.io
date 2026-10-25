import type { Lang } from '../i18n/ui'
import { airpodsDetail } from './projects/airpods.ts'
import { reparaticDetail } from './projects/reparatic.ts'

export type Localized = Record<Lang, string>

export interface Media {
  src: string
  width: number
  height: number
  caption: Localized
}

export interface Demo {
  src: string
  poster: string
  width: number
  height: number
  title: Localized
  text: Localized
}

/** Contenido de la ficha del proyecto; todo es opcional */
export interface ProjectDetail {
  /** vídeo de presentación en YouTube; poster local para no cargar nada de YouTube hasta pulsar */
  youtube?: { id: string; poster: string }
  license?: string
  demos?: Demo[]
  features?: { title: Localized; text: Localized }[]
  screenshots?: Media[]
  options?: { title: Localized; items: { label: Localized; text: Localized }[] }
  commands?: { title: Localized; lines: { code: string; text: Localized }[] }
  /** command: una sola orden para copiar; steps: pasos numerados cuando la instalación no es un comando */
  install?: { command?: string; steps?: Localized[]; note: Localized; compat: { label: Localized; value: Localized }[] }
  manualUrl?: string
  /** manual publicado en el portfolio (src/manuals/<slug>.md), en /<idioma>/projects/<slug>/manual */
  manualPage?: boolean
}

export interface Project {
  slug: string
  name: string
  repo: string
  tech: string[]
  summary: Localized
  images: string[]
  /** 'contain' para iconos y logos que no deben recortarse */
  imageFit?: 'cover' | 'contain'
  /** repositorio privado: la ficha no enlaza al código */
  privateRepo?: boolean
  detail?: ProjectDetail
}

const raw = (repo: string, branch: string, path: string) =>
  `https://raw.githubusercontent.com/canoojson/${repo}/${branch}/${encodeURI(path)}`

export const projects: Project[] = [
  {
    slug: 'airpods-linux',
    name: 'AirPods PopUp on Arch Linux',
    repo: 'airpodsPopUpOnArchLinux',
    tech: ['Python', 'BlueZ', 'BLE', 'D-Bus', 'PipeWire', 'Luau', 'Shell'],
    summary: {
      es: 'Los AirPods en Linux como en el iPhone: batería incluso con la caja cerrada, popup al abrir la caja, cancelación de ruido, ecualizador y el sonido del iPhone y del PC a la vez.',
      val: "Els AirPods en Linux com a l'iPhone: bateria fins i tot amb la caixa tancada, finestra emergent en obrir la caixa, cancel·lació de soroll, equalitzador i el so de l'iPhone i del PC alhora.",
      en: 'AirPods on Linux like on the iPhone: battery even with the case closed, a popup when the case opens, noise cancellation, an equalizer and iPhone and PC audio at once.',
    },
    images: ['/projects/airpods/youtube.webp'],
    detail: airpodsDetail,
  },
  {
    slug: 'reparatic',
    name: 'ReparaTIC',
    repo: 'ReparaTIC',
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Spring Boot', 'Java', 'MySQL', 'Docker'],
    summary: {
      es: 'App Android y API REST para gestionar incidencias informáticas en centros educativos.',
      val: 'Aplicació Android i API REST per a gestionar incidències informàtiques en centres educatius.',
      en: 'Android app and REST API to manage IT incidents in schools.',
    },
    images: ['/projects/reparatic/portada.webp'],
    privateRepo: true,
    detail: reparaticDetail,
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
