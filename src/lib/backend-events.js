import { supabase, hasSupabaseEnv } from './supabase.js'

const SESSION_KEY = 'tour-verde-session-id'
let sessionId = null
let sessionBootstrapped = false

const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown'
  return window.innerWidth <= 900 ? 'mobile' : 'desktop'
}

const getViewport = () => {
  if (typeof window === 'undefined') return null
  return `${window.innerWidth}x${window.innerHeight}`
}

const makeAnonymousId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export const getSessionId = () => sessionId

export const ensureBackendSession = async ({ routeInitial, entryScene } = {}) => {
  if (typeof window === 'undefined') return null
  if (sessionBootstrapped && sessionId) return sessionId

  sessionBootstrapped = true
  sessionId = window.localStorage.getItem(SESSION_KEY) || makeAnonymousId()
  window.localStorage.setItem(SESSION_KEY, sessionId)

  if (!hasSupabaseEnv || !supabase) return sessionId

  await supabase.from('sessions').upsert({
    id: sessionId,
    anonymous_id: sessionId,
    device_type: getDeviceType(),
    viewport: getViewport(),
    route_initial: routeInitial ?? null,
    entry_scene: entryScene ?? null,
    referrer: document.referrer || null,
  })

  return sessionId
}

export const saveInteractionEvent = async ({ sceneId, eventName, payload = {} }) => {
  if (!hasSupabaseEnv || !supabase) return

  const activeSessionId = await ensureBackendSession()
  if (!activeSessionId) return

  await supabase.from('interaction_events').insert({
    session_id: activeSessionId,
    scene_id: sceneId ?? null,
    event_name: eventName,
    payload_json: payload,
  })
}

export const saveSceneView = async ({ sceneId, routeId }) => {
  if (!hasSupabaseEnv || !supabase) return

  const activeSessionId = await ensureBackendSession()
  if (!activeSessionId) return

  await supabase.from('scene_views').insert({
    session_id: activeSessionId,
    scene_id: sceneId,
    route_id: routeId ?? null,
  })
}

export const saveHotspotEvent = async ({ sceneId, hotspotType, targetSceneId }) => {
  if (!hasSupabaseEnv || !supabase) return

  const activeSessionId = await ensureBackendSession()
  if (!activeSessionId) return

  await supabase.from('hotspot_events').insert({
    session_id: activeSessionId,
    scene_id: sceneId ?? null,
    hotspot_type: hotspotType ?? null,
    target_scene_id: targetSceneId ?? null,
  })
}

export const saveQuizAttempt = async ({
  sceneId,
  quizKind,
  quizIndex,
  selectedAnswer,
  isCorrect,
}) => {
  if (!hasSupabaseEnv || !supabase) return

  const activeSessionId = await ensureBackendSession()
  if (!activeSessionId) return

  await supabase.from('quiz_attempts').insert({
    session_id: activeSessionId,
    scene_id: sceneId ?? null,
    quiz_kind: quizKind ?? null,
    quiz_index: typeof quizIndex === 'number' ? quizIndex : null,
    selected_answer: selectedAnswer ?? null,
    is_correct: typeof isCorrect === 'boolean' ? isCorrect : null,
  })
}
