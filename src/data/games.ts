// Juegos favoritos: portadas y fichas de la tienda de Steam
const header = (appId: number) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`

export interface Game {
  name: string
  appId: number
  image: string
}

export const games: Game[] = [
  { name: 'Death Stranding', appId: 1850570, image: header(1850570) },
  {
    name: 'Death Stranding 2: On the Beach',
    appId: 3280350,
    // juego reciente: Steam lo sirve desde otra ruta
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3280350/6270c77b0729e2df0a17d660286eeddfd9169386/header.jpg',
  },
  { name: 'Subnautica', appId: 264710, image: header(264710) },
  { name: 'Hollow Knight', appId: 367520, image: header(367520) },
  { name: 'Hollow Knight: Silksong', appId: 1030300, image: header(1030300) },
  { name: 'Euro Truck Simulator 2', appId: 227300, image: header(227300) },
]

export const steamStore = (appId: number) => `https://store.steampowered.com/app/${appId}/`
