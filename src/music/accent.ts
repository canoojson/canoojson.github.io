/**
 * Color de acento de la web a partir de la portada de la canción.
 * Conserva el tono de la portada y ajusta la luminosidad hasta tener un contraste
 * mínimo de 4,5:1 (WCAG AA) con el fondo y con el texto del botón principal.
 * Si la portada es casi gris, o no hay canción, se vuelve al rojo de siempre (el CSS).
 */

const MIN_CONTRAST = 4.5
const MIN_SATURATION = 0.25
const PROPS = ['--accent', '--accent-hover', '--accent-soft'] as const

// mismos fondos que index.css
const BG = { light: [255, 255, 255], dark: [11, 11, 13] } as const

type RGB = readonly [number, number, number]

const luminance = ([r, g, b]: RGB) => {
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const contrast = (a: RGB, b: RGB) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

function rgbToHsl([r, g, b]: RGB): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [h * 60, s, l]
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))))
  return [f(0), f(8), f(4)]
}

const css = ([r, g, b]: RGB) => `rgb(${r} ${g} ${b})`

let lastCover: RGB | null = null

function apply() {
  const root = document.documentElement
  const theme = root.dataset.theme === 'dark' ? 'dark' : 'light'
  const hsl = lastCover && rgbToHsl(lastCover)
  if (!hsl || hsl[1] < MIN_SATURATION) {
    PROPS.forEach((p) => root.style.removeProperty(p))
    return
  }
  const [h, s0] = hsl
  // algo más de saturación para que el acento no quede apagado
  const s = Math.min(0.9, Math.max(0.6, s0))
  const bg = BG[theme]

  // claro: se oscurece hasta contrastar con el fondo blanco (y con el texto blanco del botón);
  // oscuro: se aclara hasta contrastar con el fondo casi negro (y con el texto oscuro del botón)
  let l = theme === 'light' ? 0.5 : 0.6
  const step = theme === 'light' ? -0.01 : 0.01
  let rgb = hslToRgb(h, s, l)
  while (contrast(rgb, bg) < MIN_CONTRAST && l > 0.15 && l < 0.92) {
    l += step
    rgb = hslToRgb(h, s, l)
  }

  root.style.setProperty('--accent', css(rgb))
  root.style.setProperty('--accent-hover', css(hslToRgb(h, s, l + step * 8)))
  root.style.setProperty('--accent-soft', css(theme === 'light' ? hslToRgb(h, s, 0.96) : hslToRgb(h, s * 0.6, 0.12)))
}

/** Recibe el color de la portada ("rgb(r g b)") o null para volver al rojo. */
export function setAccentFromCover(color: string | null) {
  const m = color?.match(/\d+/g)
  lastCover = m && m.length >= 3 ? [Number(m[0]), Number(m[1]), Number(m[2])] : null
  apply()
}

// al cambiar de tema, el mismo tono necesita otra luminosidad
new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
