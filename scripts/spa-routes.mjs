// GitHub Pages solo conoce los ficheros que existen: copia index.html en cada ruta
// de la SPA para que respondan 200 (buscadores, vistas previas de enlaces).
// 404.html cubre el resto de URLs.
import { copyFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { projects } from '../src/data/projects.ts'
import { languages } from '../src/i18n/ui.ts'
import { sections } from '../src/sections/sections.ts'

const dist = 'dist'
const index = join(dist, 'index.html')
const routes = languages.flatMap((lang) => [
  ...sections.map((s) => (s === 'home' ? lang : `${lang}/${s}`)),
  ...projects.map((p) => `${lang}/projects/${p.slug}`),
  ...projects.filter((p) => p.detail?.manualPage).map((p) => `${lang}/projects/${p.slug}/manual`),
])

for (const route of routes) {
  mkdirSync(join(dist, route), { recursive: true })
  copyFileSync(index, join(dist, route, 'index.html'))
}
copyFileSync(index, join(dist, '404.html'))
console.log(`spa-routes: ${routes.length} rutas + 404.html`)
