import { createClient } from '@supabase/supabase-js'
import {
  buildExportBundleFromAnalytics,
  mapLearningFromAnalytics,
  mapNavigationFromAnalytics,
  mapOverviewFromAnalytics,
  mapSessionsRowsFromAnalytics,
} from '../../src/admin/utils/analytics-mappers.js'

function getServiceClient() {
  const url = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    return null
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

function toIsoStartOfDay(dateString) {
  return `${dateString}T00:00:00.000Z`
}

function toIsoEndOfDay(dateString) {
  return `${dateString}T23:59:59.999Z`
}

function inDateRangeQuery(query, column, filters) {
  let next = query

  if (filters.dateFrom) {
    next = next.gte(column, toIsoStartOfDay(filters.dateFrom))
  }

  if (filters.dateTo) {
    next = next.lte(column, toIsoEndOfDay(filters.dateTo))
  }

  return next
}

export function getFiltersFromRequest(request) {
  const url = new URL(request.url, 'http://localhost')

  return {
    dateFrom: url.searchParams.get('dateFrom') || '',
    dateTo: url.searchParams.get('dateTo') || '',
    device: url.searchParams.get('device') || 'all',
    route: url.searchParams.get('route') || 'all',
    scene: url.searchParams.get('scene') || 'all',
    channel: url.searchParams.get('channel') || 'all',
    page: url.searchParams.get('page') || 'all',
    country: url.searchParams.get('country') || 'all',
  }
}

async function safeSelect(builder) {
  const { data, error } = await builder

  if (error) {
    throw error
  }

  return data || []
}

export async function fetchAdminAnalytics(filters = {}) {
  const supabase = getServiceClient()

  if (!supabase) {
    throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in server env')
  }

  const sessions = await safeSelect(inDateRangeQuery(
    supabase
      .from('sessions')
      .select('id, created_at, anonymous_id, device_type, route_initial, entry_scene, viewport, referrer')
      .order('created_at', { ascending: false }),
    'created_at',
    filters,
  ))

  const sceneViews = await safeSelect(inDateRangeQuery(
    supabase
      .from('scene_views')
      .select('id, created_at, session_id, scene_id, route_id, entered_at, duration_ms'),
    'created_at',
    filters,
  ))

  const hotspotEvents = await safeSelect(inDateRangeQuery(
    supabase
      .from('hotspot_events')
      .select('id, created_at, session_id, scene_id, hotspot_type, target_scene_id, clicked_at'),
    'created_at',
    filters,
  ))

  const quizAttempts = await safeSelect(inDateRangeQuery(
    supabase
      .from('quiz_attempts')
      .select('id, created_at, session_id, scene_id, quiz_kind, quiz_index, selected_answer, is_correct, answered_at'),
    'created_at',
    filters,
  ))

  const interactionEvents = await safeSelect(inDateRangeQuery(
    supabase
      .from('interaction_events')
      .select('id, created_at, session_id, scene_id, event_name, payload_json'),
    'created_at',
    filters,
  ))

  return {
    sessions,
    sceneViews,
    hotspotEvents,
    quizAttempts,
    interactionEvents,
  }
}

export function json(response, statusCode, payload) {
  response.status(statusCode).setHeader('Content-Type', 'application/json; charset=utf-8')
  response.status(statusCode).send(JSON.stringify(payload))
}

export function buildOverviewPayload(analytics) {
  return mapOverviewFromAnalytics(analytics)
}

export function buildNavigationPayload(analytics) {
  return mapNavigationFromAnalytics(analytics)
}

export function buildLearningPayload(analytics) {
  return mapLearningFromAnalytics(analytics)
}

export function buildSessionsPayload(analytics) {
  return mapSessionsRowsFromAnalytics(analytics)
}

export function buildExportPayload(analytics, filters) {
  return buildExportBundleFromAnalytics(analytics, filters)
}
