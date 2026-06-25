import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * PDF generation
 * ==============
 *
 * jsPDF's built-in fonts cannot shape Persian/Arabic (RTL, joined glyphs) and
 * do not include the German umlauts in every weight. Rather than embedding and
 * shaping fonts manually, we render the already-correct DOM report to a canvas
 * with html2canvas and paginate that image into an A4 document. This makes the
 * export pixel-identical to what the user sees and correct for fa / en / de.
 */

interface PdfOptions {
  fileName?: string
  /** Background color painted behind the report (matches the app surface). */
  background?: string
}

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const MARGIN_MM = 10

export async function generatePdfFromElement(
  element: HTMLElement,
  { fileName = 'qotbnama-report.pdf', background = '#ffffff' }: PdfOptions = {},
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: background,
    logging: false,
    windowWidth: element.scrollWidth,
  })

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

  const contentWidthMm = A4_WIDTH_MM - MARGIN_MM * 2
  const contentHeightMm = A4_HEIGHT_MM - MARGIN_MM * 2

  // Pixels-per-mm based on fitting the canvas width into the content width.
  const pxPerMm = canvas.width / contentWidthMm
  const pageHeightPx = Math.floor(contentHeightMm * pxPerMm)

  const totalPages = Math.max(1, Math.ceil(canvas.height / pageHeightPx))

  for (let page = 0; page < totalPages; page++) {
    if (page > 0) pdf.addPage()

    const sliceHeightPx = Math.min(pageHeightPx, canvas.height - page * pageHeightPx)

    // Draw this slice onto a temporary canvas.
    const slice = document.createElement('canvas')
    slice.width = canvas.width
    slice.height = sliceHeightPx
    const ctx = slice.getContext('2d')
    if (!ctx) continue
    ctx.fillStyle = background
    ctx.fillRect(0, 0, slice.width, slice.height)
    ctx.drawImage(
      canvas,
      0,
      page * pageHeightPx,
      canvas.width,
      sliceHeightPx,
      0,
      0,
      canvas.width,
      sliceHeightPx,
    )

    const imgData = slice.toDataURL('image/png')
    const sliceHeightMm = sliceHeightPx / pxPerMm
    pdf.addImage(imgData, 'PNG', MARGIN_MM, MARGIN_MM, contentWidthMm, sliceHeightMm)
  }

  pdf.save(fileName)
}
