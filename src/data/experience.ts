import type { Lang } from '../i18n/ui'

type Localized = Record<Lang, string>

export interface Role {
  title: Localized
  contract?: Localized
  /** 'YYYY-MM' o solo 'YYYY'; sin `end` es el puesto actual */
  start: string
  end?: string
  mode?: Localized
}

export interface Experience {
  company: string
  url?: string
  location: Localized
  description?: Localized
  roles: Role[]
}

const onSite: Localized = { es: 'Presencial', val: 'Presencial', en: 'On-site' }
const hybrid: Localized = { es: 'Híbrido', val: 'Híbrid', en: 'Hybrid' }
const fullTime: Localized = { es: 'Jornada completa', val: 'Jornada completa', en: 'Full-time' }
const developer: Localized = { es: 'Desarrollador de software', val: 'Desenvolupador de programari', en: 'Software developer' }

// Fuente: LinkedIn (consultado el 2026-10-09)
export const experience: Experience[] = [
  {
    company: 'AHORA',
    url: 'https://www.ahora.es/',
    location: { es: 'Alboraya, Valencia', val: 'Alboraia, València', en: 'Alboraya, Valencia' },
    description: {
      es: 'Implantación de software ERP y proyectos a medida: reuniones con clientes, desarrollo y soporte posterior (dudas, incidencias y mejoras). SQL Server, informes DevExpress y Crystal Reports, y aplicaciones Qlik Sense.',
      val: 'Implantació de programari ERP i projectes a mida: reunions amb clients, desenvolupament i suport posterior (dubtes, incidències i millores). SQL Server, informes DevExpress i Crystal Reports, i aplicacions Qlik Sense.',
      en: 'ERP software implementation and custom projects: client meetings, development and ongoing support (questions, incidents and improvements). SQL Server, DevExpress and Crystal Reports reporting, and Qlik Sense apps.',
    },
    roles: [
      { title: developer, contract: fullTime, start: '2026-07', mode: hybrid },
      { title: developer, contract: { es: 'Contrato temporal', val: 'Contracte temporal', en: 'Temporary contract' }, start: '2025-05', end: '2026-07', mode: hybrid },
      { title: developer, contract: { es: 'Prácticas', val: 'Pràctiques', en: 'Internship' }, start: '2025-03', end: '2025-05', mode: onSite },
    ],
  },
]

export const volunteering: Experience[] = [
  {
    company: 'Grupo Scout Impeesa 243',
    location: { es: 'Burjassot, Valencia', val: 'Burjassot, València', en: 'Burjassot, Valencia' },
    description: {
      es: 'Scout desde los 9 años: entré como lobato y he pasado por todas las secciones del grupo hasta convertirme en scouter.',
      val: "Scout des dels 9 anys: vaig entrar com a llobató i he passat per totes les seccions del grup fins a convertir-me en scouter.",
      en: 'A scout since I was 9: I joined as a cub and went through every section of the group until becoming a scout leader.',
    },
    roles: [{ title: { es: 'Scouter de tropa', val: 'Scouter de tropa', en: 'Troop scout leader' }, start: '2025' }],
  },
]
