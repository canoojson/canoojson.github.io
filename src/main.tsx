import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import '@fontsource-variable/inter'
import './index.css'

// ancho de la barra de scroll, para los fondos que ocupan toda la pantalla (100vw la incluye)
const updateScrollbar = () =>
  document.documentElement.style.setProperty('--scrollbar', `${window.innerWidth - document.documentElement.clientWidth}px`)
// la barra aparece cuando hay contenido: se recalcula cada vez que cambia el ancho útil
new ResizeObserver(updateScrollbar).observe(document.documentElement)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
