import {
  buildOverviewPayload,
  fetchAdminAnalytics,
  getFiltersFromRequest,
  json,
} from './_shared.js'

export default async function handler(request, response) {
  try {
    const filters = getFiltersFromRequest(request)
    const analytics = await fetchAdminAnalytics(filters)
    json(response, 200, buildOverviewPayload(analytics))
  } catch (error) {
    json(response, 500, {
      error: 'overview_fetch_failed',
      message: String(error?.message || error),
    })
  }
}
