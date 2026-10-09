import { useParams } from 'react-router'
import { defaultLang, isLang, ui, type Lang, type UiKey } from './ui'

export function useLang() {
  const { lang } = useParams()
  const current: Lang = isLang(lang) ? lang : defaultLang
  const t = (key: UiKey) => ui[current][key]
  return { lang: current, t }
}
