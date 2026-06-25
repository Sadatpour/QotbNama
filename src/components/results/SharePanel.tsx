import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'
import { copyToClipboard, share, nativeShare } from '@/services/share'
import type { SharePlatform } from '@/services/share'

interface SharePanelProps {
  shareText: string
  url: string
  onDownloadImage: () => Promise<void>
  onDownloadPdf: () => Promise<void>
}

const PLATFORMS: Array<{ id: SharePlatform; icon: IconName; color: string; label: string }> = [
  { id: 'x', icon: 'x', color: 'hover:bg-black hover:text-white', label: 'X' },
  { id: 'facebook', icon: 'facebook', color: 'hover:bg-[#1877f2] hover:text-white', label: 'Facebook' },
  { id: 'linkedin', icon: 'linkedin', color: 'hover:bg-[#0a66c2] hover:text-white', label: 'LinkedIn' },
  { id: 'telegram', icon: 'telegram', color: 'hover:bg-[#229ed9] hover:text-white', label: 'Telegram' },
  { id: 'whatsapp', icon: 'whatsapp', color: 'hover:bg-[#25d366] hover:text-white', label: 'WhatsApp' },
]

export function SharePanel({ shareText, url, onDownloadImage, onDownloadPdf }: SharePanelProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [busyImage, setBusyImage] = useState(false)
  const [busyPdf, setBusyPdf] = useState(false)

  const content = { url, title: t('share.cardTitle'), text: shareText }

  async function handleCopy() {
    const ok = await copyToClipboard(url)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  async function handleShare(platform: SharePlatform) {
    await share(platform, content)
  }

  async function runImage() {
    setBusyImage(true)
    try {
      await onDownloadImage()
    } finally {
      setBusyImage(false)
    }
  }

  async function runPdf() {
    setBusyPdf(true)
    try {
      await onDownloadPdf()
    } finally {
      setBusyPdf(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold">{t('share.title')}</h3>
        <p className="mt-1 text-sm text-muted">{t('share.desc')}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleShare(p.id)}
            aria-label={p.label}
            title={p.label}
            className={`grid h-12 w-12 place-items-center rounded-2xl surface-3 transition-all duration-200 hover:-translate-y-0.5 ${p.color}`}
          >
            <Icon name={p.icon} size={20} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => void nativeShare(content)}
          aria-label={t('share.native')}
          title={t('share.native')}
          className="grid h-12 w-12 place-items-center rounded-2xl surface-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-indigo hover:text-white"
        >
          <Icon name="share" size={20} />
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={handleCopy}
          className="btn-ghost justify-start"
        >
          <Icon name={copied ? 'check' : 'copy'} size={18} />
          {copied ? t('share.copied') : t('share.copyLink')}
        </button>
        <button
          type="button"
          onClick={runImage}
          disabled={busyImage}
          className="btn-ghost justify-start"
        >
          <Icon name="download" size={18} />
          {busyImage ? t('share.generating') : t('share.downloadImage')}
        </button>
        <button
          type="button"
          onClick={runPdf}
          disabled={busyPdf}
          className="btn-ghost justify-start"
        >
          <Icon name="file-text" size={18} />
          {busyPdf ? t('share.generating') : t('share.downloadPdf')}
        </button>
      </div>
    </div>
  )
}
