import { useRef, useState } from 'react'
import type { Media } from '../../data/projects'
import { useLang } from '../../i18n/useLang'

/** Capturas con pie de foto; al pulsarlas se abren a tamaño completo en un diálogo. */
export function Gallery({ items }: { items: Media[] }) {
  const { lang, t } = useLang()
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<Media | null>(null)

  const show = (item: Media) => {
    setOpen(item)
    dialog.current?.showModal()
  }

  return (
    <>
      <ul className="shots">
        {items.map((item) => (
          // las capturas muy apaisadas (terminal, barra) ocupan toda la fila
          <li key={item.src} className={item.width / item.height > 2 ? 'shot-wide' : undefined}>
            <button type="button" onClick={() => show(item)} aria-label={`${t('project.enlarge')}: ${item.caption[lang]}`}>
              <img
                src={item.src}
                alt={item.caption[lang]}
                width={item.width}
                height={item.height}
                loading="lazy"
                style={{ maxWidth: item.width }}
              />
            </button>
            <span>{item.caption[lang]}</span>
          </li>
        ))}
      </ul>
      {/* clic fuera de la imagen (en el fondo del diálogo) o Escape: cierra */}
      <dialog ref={dialog} className="lightbox" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
        {open && (
          <figure>
            <img src={open.src} alt={open.caption[lang]} width={open.width} height={open.height} />
            <figcaption>{open.caption[lang]}</figcaption>
          </figure>
        )}
        <button type="button" className="icon-button lightbox-close" onClick={() => dialog.current?.close()} aria-label={t('project.close')}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </dialog>
    </>
  )
}
