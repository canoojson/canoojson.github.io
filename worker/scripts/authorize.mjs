// Autoriza la cuenta de Spotify y guarda las credenciales en Cloudflare sin mostrarlas.
// Ejecútalo tú en tu terminal (no pegues los valores en ningún chat):
//   cd worker
//   fish: read -sx -P "Client ID: " SPOTIFY_CLIENT_ID; read -sx -P "Client Secret: " SPOTIFY_CLIENT_SECRET
//   bash: read -rsp "Client ID: " SPOTIFY_CLIENT_ID; read -rsp "Client Secret: " SPOTIFY_CLIENT_SECRET; export SPOTIFY_CLIENT_ID SPOTIFY_CLIENT_SECRET
//   npm run authorize
// Spotify caduca el refresh token a los 6 meses: entonces basta con repetir esto.
import { execFileSync, spawn } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env
if (!id || !secret) {
  console.error('Faltan SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET en el entorno (ver cabecera del script).')
  process.exit(1)
}

const port = 8888
const redirectUri = `http://127.0.0.1:${port}/callback`
const state = randomBytes(16).toString('hex')
const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: id,
    scope: 'user-read-currently-playing user-read-recently-played user-top-read',
    redirect_uri: redirectUri,
    state,
  })

const wrangler = (args, input) => execFileSync('npx', ['wrangler', ...args], { input, stdio: [input ? 'pipe' : 'inherit', 'inherit', 'inherit'] })

const server = createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri)
  if (url.pathname !== '/callback') return res.writeHead(404).end()
  if (url.searchParams.get('state') !== state || !url.searchParams.get('code')) {
    res.writeHead(400).end('Autorización cancelada o no válida.')
    return
  }
  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({ grant_type: 'authorization_code', code: url.searchParams.get('code'), redirect_uri: redirectUri }),
    })
    if (!tokenRes.ok) throw new Error(`Spotify respondió ${tokenRes.status}: ${await tokenRes.text()}`)
    const { refresh_token } = await tokenRes.json()

    // el token va por un fichero temporal privado, nunca por la línea de comandos ni la pantalla
    const dir = mkdtempSync(join(tmpdir(), 'spotify-'))
    const file = join(dir, 'token')
    writeFileSync(file, refresh_token, { mode: 0o600 })
    try {
      wrangler(['kv', 'key', 'put', 'refresh_token', '--binding', 'MUSIC', '--path', file, '--remote'])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
    wrangler(['secret', 'put', 'SPOTIFY_CLIENT_ID'], id)
    wrangler(['secret', 'put', 'SPOTIFY_CLIENT_SECRET'], secret)

    const renew = new Date(Date.now() + 182 * 864e5).toISOString().slice(0, 10)
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Listo. Puedes cerrar esta pestaña.')
    console.log(`\n✔ Spotify autorizado y credenciales guardadas en Cloudflare.\n  Renueva la autorización antes del ${renew} (npm run authorize).`)
  } catch (error) {
    res.writeHead(500).end('Error, mira la terminal.')
    console.error('\n✘', error.message)
    process.exitCode = 1
  } finally {
    server.close()
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log('Abriendo Spotify para autorizar. Si no se abre, visita:\n' + authUrl)
  spawn('xdg-open', [authUrl], { stdio: 'ignore', detached: true }).on('error', () => {})
})
