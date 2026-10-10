import { useState } from 'react'
import { useLang } from '../../i18n/useLang'

export function CopyCommand({ command }: { command: string }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="command">
      <code>{command}</code>
      <button type="button" className="button" onClick={copy}>
        {copied ? t('project.copied') : t('project.copy')}
      </button>
    </div>
  )
}
