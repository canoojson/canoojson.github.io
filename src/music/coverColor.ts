/**
 * Color representativo de una portada: media de los píxeles ponderada por saturación,
 * para que los tonos vivos pesen más que los grises y blancos.
 */
export function coverColor(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const size = 24
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = size
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return resolve(null)
      ctx.drawImage(img, 0, 0, size, size)
      let r = 0, g = 0, b = 0, total = 0
      const { data } = ctx.getImageData(0, 0, size, size)
      for (let i = 0; i < data.length; i += 4) {
        const max = Math.max(data[i], data[i + 1], data[i + 2])
        const min = Math.min(data[i], data[i + 1], data[i + 2])
        const weight = 0.05 + (max - min) / 255
        r += data[i] * weight
        g += data[i + 1] * weight
        b += data[i + 2] * weight
        total += weight
      }
      resolve(`rgb(${Math.round(r / total)} ${Math.round(g / total)} ${Math.round(b / total)})`)
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}
