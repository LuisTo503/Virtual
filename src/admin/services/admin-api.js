import {
  exportModules,
  overviewMetrics,
  quizAccuracy,
  sessionsDaily,
  sessionsTableRows,
  topRoutes,
  topScenes,
  trafficChannels,
} from '../data/admin-mock-data.js'
import { buildExportBundleFromAnalytics, mapLearningFromAnalytics, mapNavigationFromAnalytics, mapOverviewFromAnalytics, mapSessionsRowsFromAnalytics } from '../utils/analytics-mappers.js'
import { fetchAdminAnalytics } from './supabase-admin-service.js'

const wait = (ms = 120) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

function getMockOverview() {
  return {
    metrics: overviewMetrics,
    sessionsDaily,
    topScenes,
    topRoutes,
  }
}

function getMockLearning() {
  return {
    quizAccuracy,
    topScenes,
  }
}

async function getAnalyticsOrNull(filters) {
  const result = await fetchAdminAnalytics(filters)
  if (!result.ok) return null
  return result.data
}

function buildQueryString(filters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value != null && value !== '') {
      params.set(key, value)
    }
  })

  const serialized = params.toString()
  return serialized ? `?${serialized}` : ''
}

async function fetchBackendJson(path, filters = {}) {
  try {
    const response = await fetch(`${path}${buildQueryString(filters)}`)

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch {
    return null
  }
}

export async function getOverviewMetrics(filters = {}) {
  const backendPayload = await fetchBackendJson('/api/admin/overview', filters)
  if (backendPayload) return backendPayload

  const analytics = await getAnalyticsOrNull(filters)
  if (analytics) return mapOverviewFromAnalytics(analytics)

  await wait()
  return getMockOverview()
}

export async function getNavigationMetrics(filters = {}) {
  const backendPayload = await fetchBackendJson('/api/admin/navigation', filters)
  if (backendPayload) return backendPayload

  const analytics = await getAnalyticsOrNull(filters)
  if (analytics) return mapNavigationFromAnalytics(analytics)

  await wait()
  return {
    topScenes,
    topRoutes,
  }
}

export async function getLearningMetrics(filters = {}) {
  const backendPayload = await fetchBackendJson('/api/admin/learning', filters)
  if (backendPayload) return backendPayload

  const analytics = await getAnalyticsOrNull(filters)
  if (analytics) return mapLearningFromAnalytics(analytics)

  await wait()
  return getMockLearning()
}

export async function getSessionsTable(filters = {}) {
  const backendPayload = await fetchBackendJson('/api/admin/sessions', filters)
  if (backendPayload) return backendPayload

  const analytics = await getAnalyticsOrNull(filters)
  if (analytics) return mapSessionsRowsFromAnalytics(analytics)

  await wait()
  return sessionsTableRows
}

export async function getTrafficMetrics() {
  await wait()
  return {
    sessionsDaily,
    trafficChannels,
  }
}

export async function getExportModules() {
  await wait()
  return exportModules
}

export async function getExportBundle(filters = {}) {
  const backendPayload = await fetchBackendJson('/api/admin/exports', filters)
  if (backendPayload) return backendPayload

  const analytics = await getAnalyticsOrNull(filters)
  if (analytics) return buildExportBundleFromAnalytics(analytics, filters)

  await wait()
  return {
    overviewMetrics,
    sessionsDaily,
    topScenes,
    topRoutes,
    quizAccuracy,
    sessionsTableRows,
    trafficChannels,
    exportModules,
    filtersApplied: filters,
  }
}
