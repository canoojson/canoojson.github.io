import { languageIcons } from './languageIcons'

export const profile = {
  name: 'Sergio Cano',
  avatar: 'https://avatars.githubusercontent.com/u/114495493?v=4',
  languages: [
    { name: 'Java', icon: languageIcons.java },
    { name: 'Kotlin', icon: languageIcons.kotlin },
    { name: 'C#', icon: languageIcons.csharp },
    { name: 'Python', icon: languageIcons.python },
  ],
  stack: ['SQL Server', 'T-SQL', 'DevExpress', 'Crystal Reports', 'Qlik Sense', 'Kotlin', 'Java', 'C#', 'Python', 'JavaScript', 'Spring Boot', 'Jetpack Compose', 'MySQL', 'SQLite', 'Git'],
  /** Banner de música de Sobre mí: Worker de Cloudflare que consulta Spotify (carpeta worker/) */
  music: {
    endpoint: 'https://music.canoojson.dev/now-playing',
    topEndpoint: 'https://music.canoojson.dev/top-tracks',
    source: 'Spotify',
  },
  /** perfil de Steam para el bloque de juegos (vacío: no se muestra el enlace) */
  steam: 'https://steamcommunity.com/id/EvilStorms/',
  links: [
    { label: 'GitHub', href: 'https://github.com/canoojson' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sergio-cano-pomer-a51440259/' },
    { label: 'Instagram', href: 'https://www.instagram.com/canoojson/' },
    { label: 'Bluesky', href: 'https://bsky.app/profile/canoojson.dev' },
    { label: 'Malt', href: 'https://www.malt.es/profile/canoojson' },
  ],
}
