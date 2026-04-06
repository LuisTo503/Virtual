import { buildExportPayload, fetchAdminAnalytics, getFiltersFromRequest } from './_shared.js'
import { buildConsolidatedCsv } from '../../src/admin/utils/export-builders.js'

export default async function handler(request, response) {
  try {
    const filters = getFiltersFromRequest(request)
    const analytics = await fetchAdminAnalytics(filters)
    const bundle = buildExportPayload(analytics, filters)
    const csv = buildConsolidatedCsv(filters, bundle)

    response.status(200).setHeader('Content-Type', 'text/csv; charset=utf-8')
    response.status(200).setHeader(
      'Content-Disposition',
      `attachment; filename="tour-verde-dashboard-${filters.dateFrom || 'desde'}_${filters.dateTo || 'hasta'}.csv"`,
    )
    response.status(200).send(csv)
  } catch (error) {
    response.status(500).json({
      error: 'export_csv_failed',
      message: String(error?.message || error),
    })
  }
}
