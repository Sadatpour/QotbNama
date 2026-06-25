import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { share, nativeShare, copyToClipboard } from '@/services/share'
import type { SharePlatform } from '@/services/share'

const PLATFORMS: Array<{ id: SharePlatform; icon: IconName; label: string; color: string }> = [
  { id: 'x', icon: 'x', label: 'X', color: 'hover:bg-black hover:text-white' },
  { id: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp', color: 'hover:bg-[#25d366] hover:text-white' },
  { id: 'telegram', icon: 'telegram', label: 'Telegram', color: 'hover:bg-[#229ed9] hover:text-white' },
  { id: 'facebook', icon: 'facebook', label: 'Facebook', color: 'hover:bg-[#1877f2] hover:text-white' },
  { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', color: 'hover:bg-[#0a66c2] hover:text-white' },
  { id: 'reddit', icon: 'share', label: 'Reddit', color: 'hover:bg-[#ff4500] hover:text-white' },
  { id: 'email', icon: 'mail', label: 'Email', color: 'hover:bg-brand-indigo hover:text-white' },
]

export function SharePage() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  // The canonical site URL (without the hash route) so recipients land on home.
  // Dynamic: on a published deployment this is the real domain automatically.
  const url =
    typeof window !== 'undefined'
      ? (window.location.origin + window.location.pathname).replace(/index\.html$/, '')
      : ''

  const content = {
    url,
    title: t('shareSite.ogTitle'),
    text: t('shareSite.shareMessage'),
  }

  async function handleCopy() {
    if (await copyToClipboard(url)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <SectionHeading
        eyebrow={
          <>
            <Icon name="share" size={15} />
            {t('shareSite.eyebrow')}
          </>
        }
        title={t('shareSite.title')}
        subtitle={t('shareSite.subtitle')}
      />

      {/* Preview / description card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-10 overflow-hidden rounded-3xl border border-base"
      >
        <div className="bg-brand-gradient p-6 text-white">
          <Logo size={44} showTagline />
        </div>
        <div className="surface p-6">
          <p className="text-balance leading-relaxed text-muted">{t('shareSite.description')}</p>
        </div>
      </motion.div>

      {/* Copyable link */}
      <div className="mt-6 flex flex-col gap-2">
        <label className="text-sm font-semibold text-muted">{t('shareSite.linkTitle')}</label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={url}
            dir="ltr"
            aria-label={t('shareSite.linkTitle')}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full truncate rounded-2xl border border-base surface px-4 py-3 text-sm outline-none focus:border-brand-indigo"
          />
          <button type="button" onClick={handleCopy} className="btn-primary shrink-0">
            <Icon name={copied ? 'check' : 'copy'} size={18} />
            <span className="hidden sm:inline">{copied ? t('share.copied') : t('share.copyLink')}</span>
          </button>
        </div>
      </div>

      {/* Platforms */}
      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-muted">{t('shareSite.platformsHint')}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => void share(p.id, content)}
              className={`flex items-center justify-center gap-2 rounded-2xl surface-3 px-4 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 ${p.color}`}
            >
              <Icon name={p.icon} size={20} />
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => void nativeShare(content)}
            className="flex items-center justify-center gap-2 rounded-2xl surface-3 px-4 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white"
          >
            <Icon name="share" size={20} />
            {t('share.native')}
          </button>
        </div>
      </div>
    </div>
  )
}
