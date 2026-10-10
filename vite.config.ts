import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

/**
 * Última release de cada repositorio de la lista de proyectos, consultada en GitHub al compilar.
 * Así el botón «Última versión» no se queda desfasado. Sin conexión, la web se compila sin él.
 */
async function ultimasReleases(): Promise<Record<string, string>> {
  const repos = [...readFileSync('src/data/projects.ts', 'utf8').matchAll(/repo: '([^']+)'/g)].map((m) => m[1])
  const cabeceras: Record<string, string> = { Accept: 'application/vnd.github+json' }
  // en GitHub Actions hay token: evita el límite de peticiones anónimas
  if (process.env.GITHUB_TOKEN) cabeceras.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const releases: Record<string, string> = {}
  await Promise.all(
    repos.map(async (repo) => {
      try {
        const r = await fetch(`https://api.github.com/repos/canoojson/${repo}/releases/latest`, { headers: cabeceras })
        if (r.ok) releases[repo] = ((await r.json()) as { tag_name: string }).tag_name
      } catch {
        console.warn(`[releases] sin conexión: ${repo} sale sin «Última versión»`)
      }
    }),
  )
  console.log('[releases]', releases)
  return releases
}

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  define: { __RELEASES__: JSON.stringify(await ultimasReleases()) },
}))
