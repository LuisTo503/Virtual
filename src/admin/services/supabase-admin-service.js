import { hasSupabaseEnv, supabase } from '../../lib/supabase.js'

function toIsoEndOfDay(dateString) {
  return `${dateString}T23:59:59.999Z`
}

function toIsoStartOfDay(dateString) {
  return `${dateString}T00:00:00.000Z`
}

function inDateRangeQuery(query, column, filters) {
  let next = query

  if (filters?.dateFrom) {
    next = next.gte(column, toIsoStartOfDay(filters.dateFrom))
  }

  if (filters?.dateTo) {
    next = next.lte(column, toIsoEndOfDay(filters.dateTo))
  }

  return next
}

async function safeSelect(builder) {
  try {
    const { data, error } = await builder
    if (error) return { data: null, error }
    return { data: data || [], error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function fetchAdminAnalytics(filters = {}) {
  if (!hasSupabaseEnv || !supabase) {
    return {
      ok: false,
      reason: 'missing_env',
    }
  }

  const [sessionsResult, sceneViewsResult, hotspotResult, quizResult, interactionsResult] = await Promise.all([
    safeSelect(inDateRangeQuery(
      supabase
        .from('sessions')
        .select('id, created_at, anonymous_id, device_type, route_initial, entry_scene, viewport, referrer')
        .order('created_at', { ascending: false }),
      'created_at',
      filters,
    )),
    safeSelect(inDateRangeQuery(
      supabase
        .from('scene_views')
        .select('id, created_at, session_id, scene_id, route_id, entered_at, duration_ms'),
      'created_at',
      filters,
    )),
    safeSelect(inDateRangeQuery(
      supabase
        .from('hotspot_events')
        .select('id, created_at, session_id, scene_id, hotspot_type, target_scene_id, clicked_at'),
      'created_at',
      filters,
    )),
    safeSelect(inDateRangeQuery(
      supabase
        .from('quiz_attempts')
        .select('id, created_at, session_id, scene_id, quiz_kind, quiz_index, selected_answer, is_correct, answered_at'),
      'created_at',
      filters,
    )),
    safeSelect(inDateRangeQuery(
      supabase
        .from('interaction_events')
        .select('id, created_at, session_id, scene_id, event_name, payload_json'),
      'created_at',
      filters,
    )),
  ])

  const error = sessionsResult.error || sceneViewsResult.error || hotspotResult.error || quizResult.error || interactionsResult.error

  if (error) {
    return {
      ok: false,
      reason: 'query_error',
      error,
    }
  }

  return {
    ok: true,
    data: {
      sessions: sessionsResult.data,
      sceneViews: sceneViewsResult.data,
      hotspotEvents: hotspotResult.data,
      quizAttempts: quizResult.data,
      interactionEvents: interactionsResult.data,
    },
  }
}
