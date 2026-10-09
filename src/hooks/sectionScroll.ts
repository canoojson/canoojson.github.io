import { useEffect } from 'react'

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

let animating = false

/** Scroll animado propio: más lento y suave que el nativo, y bloquea la rueda mientras dura. */
export function animateScrollTo(target: number) {
  const start = window.scrollY
  const distance = target - start
  if (Math.abs(distance) < 1) return
  if (reducedMotion()) {
    window.scrollTo({ top: target, behavior: 'instant' })
    return
  }
  // ~0,85 s por pantalla, con tope para saltos largos
  const duration = Math.min(1400, 700 + (Math.abs(distance) / window.innerHeight) * 150)
  const t0 = performance.now()
  animating = true
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration)
    window.scrollTo({ top: start + distance * easeInOutCubic(p), behavior: 'instant' })
    if (p < 1) requestAnimationFrame(step)
    // margen extra: absorbe la inercia del trackpad para que no encadene otro salto
    else setTimeout(() => (animating = false), 400)
  }
  requestAnimationFrame(step)
}

const top = (el: Element) => el.getBoundingClientRect().top + window.scrollY

export function scrollToSection(id: string, instant = false) {
  const el = document.getElementById(id)
  if (!el) return
  if (instant) window.scrollTo({ top: top(el), behavior: 'instant' })
  else animateScrollTo(top(el))
}

type Target = { top: number } | null

/**
 * Destino al moverse en una dirección desde la sección que ocupa el centro de la pantalla,
 * o null si toca scroll normal (la sección es más alta que la pantalla y aún queda contenido).
 */
function sectionTarget(selector: string, down: boolean): Target {
  const els = [...document.querySelectorAll(selector)]
  const middle = window.innerHeight / 2
  const i = els.findIndex((el) => {
    const r = el.getBoundingClientRect()
    return r.top <= middle && r.bottom > middle
  })
  if (i === -1) return null
  const rect = els[i].getBoundingClientRect()
  if (down) {
    if (rect.bottom > window.innerHeight + 2) return null
    const next = els[i + 1]
    return next ? { top: top(next) } : null
  }
  if (rect.top < -2) return null
  const prev = els[i - 1]
  if (!prev) return null
  // si la anterior es alta, se llega a su final, no a su principio
  return { top: top(prev) + Math.max(0, prev.getBoundingClientRect().height - window.innerHeight) }
}

/**
 * Navegación por secciones con rueda y con el dedo: cada gesto pasa a la sección
 * siguiente o anterior con animación. Si la sección es más alta que la pantalla,
 * primero se recorre con scroll normal.
 */
export function useSectionNavigation(selector: string) {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // zoom
      if (animating) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < 2) return
      const target = sectionTarget(selector, e.deltaY > 0)
      if (!target) return
      e.preventDefault()
      animateScrollTo(target.top)
    }

    // Táctil: se decide en el primer movimiento si el gesto salta de sección o hace scroll normal
    let startY = 0
    let mode: 'pending' | 'jump' | 'native' = 'native'
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        mode = 'native'
        return
      }
      startY = e.touches[0].clientY
      mode = animating ? 'jump' : 'pending'
    }
    const onTouchMove = (e: TouchEvent) => {
      if (mode === 'native') return
      const dy = startY - e.touches[0].clientY // > 0: el dedo sube, la página baja
      if (mode === 'pending') {
        if (Math.abs(dy) < 6) return
        const target = sectionTarget(selector, dy > 0)
        if (!target) {
          mode = 'native'
          return
        }
        mode = 'jump'
        animateScrollTo(target.top)
      }
      e.preventDefault()
    }

    // Si la inercia deja a medias una sección que cabe en pantalla, se termina de encajar
    const onScrollEnd = () => {
      if (animating) return
      const middle = window.innerHeight / 2
      for (const el of document.querySelectorAll(selector)) {
        const r = el.getBoundingClientRect()
        if (r.top <= middle && r.bottom > middle && r.height <= window.innerHeight + 2 && Math.abs(r.top) > 2) {
          animateScrollTo(top(el))
        }
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('scrollend', onScrollEnd)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scrollend', onScrollEnd)
    }
  }, [selector])
}
