import { jsPDF } from 'jspdf'
import { toJpeg, toPng } from 'html-to-image'
import { buildConsolidatedCsv } from '../utils/export-builders.js'

function sanitizeFilenamePart(value) {
  return String(value || 'reporte')
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.click()
}

function downloadTextFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

export function exportConsolidatedCsv({ filters, bundle }) {
  const csv = buildConsolidatedCsv(filters, bundle)
  const suffix = `${sanitizeFilenamePart(filters.dateFrom)}_${sanitizeFilenamePart(filters.dateTo)}`
  downloadTextFile(csv, `tour-verde-dashboard-${suffix}.csv`, 'text/csv;charset=utf-8;')
}

export async function exportConsolidatedCsvFromBackend(filters) {
  const params = new URLSearchParams()

  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value != null && value !== '') {
      params.set(key, value)
    }
  })

  const response = await fetch(`/api/admin/export-csv?${params.toString()}`)

  if (!response.ok) {
    throw new Error('No se pudo generar el CSV desde backend')
  }

  const csv = await response.text()
  const suffix = `${sanitizeFilenamePart(filters.dateFrom)}_${sanitizeFilenamePart(filters.dateTo)}`
  downloadTextFile(csv, `tour-verde-dashboard-${suffix}.csv`, 'text/csv;charset=utf-8;')
}

export async function exportElementAsPng(element, filename) {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#fffaf5',
  })
  downloadDataUrl(dataUrl, filename)
}

export async function exportElementAsJpg(element, filename) {
  const dataUrl = await toJpeg(element, {
    cacheBust: true,
    pixelRatio: 2,
    quality: 0.96,
    backgroundColor: '#fffaf5',
  })
  downloadDataUrl(dataUrl, filename)
}

export async function exportElementAsPdf(element, filename, title = 'Grafica exportada') {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#fffaf5',
  })

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  })

  pdf.setFontSize(16)
  pdf.text(title, 40, 34)
  pdf.addImage(dataUrl, 'PNG', 40, 54, 760, 420, undefined, 'FAST')
  pdf.save(filename)
}

function addSectionTitle(pdf, title, y) {
  pdf.setFontSize(13)
  pdf.setTextColor(23, 33, 27)
  pdf.text(title, 40, y)
}

function addLines(pdf, lines, yStart) {
  let y = yStart

  pdf.setFontSize(10)
  pdf.setTextColor(70, 80, 74)

  lines.forEach((line) => {
    if (y > 780) {
      pdf.addPage()
      y = 48
    }
    pdf.text(line, 52, y)
    y += 16
  })

  return y
}

export function exportGeneralReportPdf({ filters, bundle }) {
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' })

  pdf.setFontSize(20)
  pdf.setTextColor(23, 33, 27)
  pdf.text('Reporte general del dashboard admin', 40, 42)

  pdf.setFontSize(11)
  pdf.setTextColor(15, 110, 86)
  pdf.text('Tour Verde Virtual', 40, 24)

  pdf.setFontSize(11)
  pdf.setTextColor(70, 80, 74)
  pdf.text(`Rango: ${filters.dateFrom} a ${filters.dateTo}`, 40, 64)
  pdf.text(`Dispositivo: ${filters.device}`, 40, 80)

  let y = 112

  addSectionTitle(pdf, 'KPIs principales', y)
  y = addLines(pdf, bundle.overviewMetrics.map((item) => `${item.label}: ${item.value} (${item.delta})`), y + 18)

  y += 8
  addSectionTitle(pdf, 'Sesiones diarias', y)
  y = addLines(pdf, bundle.sessionsDaily.map((item) => `${item.day}: sesiones ${item.sessions}, usuarios ${item.users}`), y + 18)

  y += 8
  addSectionTitle(pdf, 'Top escenas y rutas', y)
  y = addLines(pdf, [
    ...bundle.topScenes.map((item) => `Escena ${item.scene}: ${item.views} vistas`),
    ...bundle.topRoutes.map((item) => `Ruta ${item.route}: ${item.sessions} sesiones`),
  ], y + 18)

  y += 8
  addSectionTitle(pdf, 'Aprendizaje y trafico', y)
  y = addLines(pdf, [
    ...bundle.quizAccuracy.map((item) => `Quiz ${item.label}: ${item.accuracy}% de precision`),
    ...bundle.trafficChannels.map((item) => `Canal ${item.channel}: ${item.sessions} sesiones`),
  ], y + 18)

  y += 8
  addSectionTitle(pdf, 'Sesiones destacadas', y)
  addLines(pdf, bundle.sessionsTableRows.map((item) => (
    `Sesion ${item.id} | ${item.device} | ruta ${item.route} | entrada ${item.entry} | escenas ${item.views} | interacciones ${item.interactions}`
  )), y + 18)

  const suffix = `${sanitizeFilenamePart(filters.dateFrom)}_${sanitizeFilenamePart(filters.dateTo)}`
  pdf.save(`reporte-general-dashboard-${suffix}.pdf`)
}
