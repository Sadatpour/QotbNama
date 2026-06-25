import html2canvas from 'html2canvas'

export type SharePlatform =
  | 'x'
  | 'facebook'
  | 'linkedin'
  | 'telegram'
  | 'whatsapp'
  | 'reddit'
  | 'email'

interface ShareContent {
  url: string
  title: string
  text: string
}

/** Build a platform-specific share URL. */
export function shareUrl(platform: SharePlatform, { url, title, text }: ShareContent): string {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const txt = encodeURIComponent(text)

  switch (platform) {
    case 'x':
      return `https://twitter.com/intent/tweet?text=${txt}&url=${u}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${txt}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`
    case 'telegram':
      return `https://t.me/share/url?url=${u}&text=${txt}`
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${txt}%20${u}`
    case 'reddit':
      return `https://www.reddit.com/submit?url=${u}&title=${t}`
    case 'email':
      return `mailto:?subject=${t}&body=${txt}%0A%0A${u}`
    default:
      return url
  }
}

/** Open a share window, falling back to the native share sheet when available. */
export async function share(platform: SharePlatform, content: ShareContent): Promise<void> {
  const href = shareUrl(platform, content)
  window.open(href, '_blank', 'noopener,noreferrer,width=640,height=560')
}

/** Try the Web Share API; returns false if unsupported/cancelled. */
export async function nativeShare(content: ShareContent): Promise<boolean> {
  if (typeof navigator !== 'undefined' && 'share' in navigator) {
    try {
      await navigator.share({ title: content.title, text: content.text, url: content.url })
      return true
    } catch {
      return false
    }
  }
  return false
}

/** Copy text to clipboard with a legacy fallback. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

/** Render a DOM node to a high-resolution PNG and download it. */
export async function downloadElementAsImage(
  element: HTMLElement,
  fileName = 'qotbnama-result.png',
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  })
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/** Produce a PNG data URL of a node (used by the share-card preview/PDF). */
export async function elementToPngDataUrl(element: HTMLElement, scale = 2): Promise<string> {
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  })
  return canvas.toDataURL('image/png')
}
