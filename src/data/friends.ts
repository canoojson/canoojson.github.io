import type { Lang } from '../i18n/ui'

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

/** Redes con icono en el portfolio */
export type SocialNetwork = 'github' | 'linkedin' | 'instagram' | 'bluesky' | 'artstation'

export interface Social {
  network: SocialNetwork
  url: string
}

/** Contenido de la tarjeta de amigos */
export interface Friend {
  slug: string
  name: Localized
  url: string
  summary: Localized
  longSummary?: Localized
  images: string[]
  /** 'contain' para iconos y logos que no deben recortarse */
  imageFit?: 'cover' | 'contain'
  socials: Social[]
}

/** Dominio sin www, para mostrar la web junto al nombre */
export const domain = (url: string) => new URL(url).hostname.replace(/^www\./, '')

export const friends: Friend[] = [
  {
    slug: 'Vulkaj',
    name: {
      es: 'Blog de Vulkaj',
      val: 'Blog de Vulkaj',
      en: "Vulkaj's Blog",
    },
    url: 'https://vulkaj.es/',
    summary: {
      es: 'Blog de Vulkaj (Néstor Masó Pérez), con artículos sobre videojuegos, películas e increíbles dibujos.',
      val: 'Blog de Vulkaj (Néstor Masó Pérez), amb articles sobre videojocs, pel·lícules i dibuixos increïbles.',
      en: "Vulkaj's blog (Néstor Masó Pérez), with articles about video games, movies and amazing drawings.",
    },
    longSummary: {
      es: 'Vulkaj (Néstor Masó Pérez) es un compañero de trabajo sólido, agradable y una persona interesante con la que hablar. En el ámbito profesional es un gran desarrollador, un gran compañero de trabajo y una persona muy resolutiva.',
      val: "Vulkaj (Néstor Masó Pérez) és un company de treball sòlid, agradable i una persona interessant amb qui parlar. En l'àmbit professional és un gran desenvolupador, un gran company de treball i una persona molt resolutiva.",
      en: 'Vulkaj (Néstor Masó Pérez) is a solid, pleasant co-worker and an interesting person to talk to. In the professional field he is a great developer, a great co-worker and a very resourceful person.',
    },
    images: ['/friends/vulkaj.webp'],
    socials: [
      { network: 'github', url: 'https://github.com/vulkaj' },
      { network: 'instagram', url: 'https://instagram.com/vulkajbrutalbeard' },
      { network: 'bluesky', url: 'https://bsky.app/profile/vulkaj.es' },
      { network: 'artstation', url: 'https://artstation.com/vulkaj' },
    ],
  },
  {
    slug: 'Pasofe',
    name: {
      es: 'Portafolio de Pasofe',
      val: 'Portfoli de Pasofe',
      en: "Pasofe's Portfolio",
    },
    url: 'https://dev-pasofe.com/',
    summary: {
      es: 'Portafolio de Pasofe (Pablo Soria Ferrer), donde comparte sus proyectos e ideas.',
      val: 'Portfoli de Pasofe (Pablo Soria Ferrer), on comparteix els seus projectes i idees.',
      en: "Pasofe's portfolio (Pablo Soria Ferrer), where he shares his projects and ideas.",
    },
    longSummary: {
      es: 'Pasofe (Pablo Soria Ferrer) es un compañero de trabajo divertido, amable y muy habilidoso. En el ámbito profesional sabe desenvolverse con soltura, es un gran compañero de trabajo y una persona muy valiosa.',
      val: "Pasofe (Pablo Soria Ferrer) és un company de treball divertit, amable i molt hàbil. En l'àmbit professional sap desenvolupar-se amb soltesa, és un gran company de treball i una persona molt valuosa.",
      en: 'Pasofe (Pablo Soria Ferrer) is a fun, friendly and very skilled co-worker. In the professional field he handles himself with ease, he is a great team member and a very valuable person.',
    },
    images: ['/friends/pasofe.webp'],
    socials: [
      { network: 'github', url: 'https://github.com/PabloSoriaFerrer11' },
      { network: 'linkedin', url: 'https://linkedin.com/in/pablo-soria-ferrer-529738225' },
    ],
  },
]
