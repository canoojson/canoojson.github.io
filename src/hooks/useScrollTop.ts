import { useEffect } from 'react'

/** Para páginas sueltas (proyecto, 404): empiezan arriba del todo. */
export function useScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}
