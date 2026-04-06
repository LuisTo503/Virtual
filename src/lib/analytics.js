import posthog from 'posthog-js'
import {
  ensureBackendSession,
  saveHotspotEvent,
  saveInteractionEvent,
  saveQuizAttempt,
  saveSceneView,
} from './backend-events.js'

let analyticsReady = false

const getEnv = () => ({
  posthogKey: import.meta.env.VITE_POSTHOG_KEY,
  posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
  gtmId: import.meta.env.VITE_GTM_ID,
  ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID,
})

const ensureDataLayer = () => {
  window.dataLayer = window.dataLayer || []
  return window.dataLayer
}

const injectGtm = (gtmId) => {
  if (!gtmId || document.getElementById('gtm-script')) return

  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  })

  const script = document.createElement('script')
  script.id = 'gtm-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
  document.head.appendChild(script)
}

export const initAnalytics = () => {
  if (analyticsReady || typeof window === 'undefined') return

  const { posthogKey, posthogHost, gtmId, ga4MeasurementId } = getEnv()
  ensureDataLayer()

  if (gtmId) {
    window.dataLayer.push({
      event: 'gtm_init',
      gtmId,
      ga4_measurement_id: ga4MeasurementId,
    })
    injectGtm(gtmId)
  }

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only',
      capture_pageview: false,
      autocapture: false,
      persistence: 'localStorage+cookie',
    })
  }

  analyticsReady = true

  trackEvent('analytics_ready', {
    gtm_enabled: Boolean(gtmId),
    ga4_enabled: Boolean(ga4MeasurementId),
    posthog_enabled: Boolean(posthogKey),
  })
}

export const trackEvent = (eventName, payload = {}) => {
  if (typeof window === 'undefined') return

  ensureDataLayer().push({
    event: eventName,
    ...payload,
  })

  if (posthog.__loaded) {
    posthog.capture(eventName, payload)
  }

  if (eventName === 'scene_view') {
    ensureBackendSession({
      routeInitial: payload.route_id,
      entryScene: payload.scene_id,
    }).then(() => saveSceneView({
      sceneId: payload.scene_id,
      routeId: payload.route_id,
    }))
  } else if (eventName === 'hotspot_click') {
    saveHotspotEvent({
      sceneId: payload.scene_id,
      hotspotType: payload.hotspot_type,
      targetSceneId: payload.target_scene_id,
    })
    saveInteractionEvent({
      sceneId: payload.scene_id,
      eventName,
      payload,
    })
  } else if (eventName === 'quiz_answer') {
    saveQuizAttempt({
      sceneId: payload.scene_id,
      quizKind: payload.quiz_kind,
      quizIndex: payload.quiz_index,
      selectedAnswer: String(payload.selected_answer),
      isCorrect: payload.is_correct,
    })
    saveInteractionEvent({
      sceneId: payload.scene_id,
      eventName,
      payload,
    })
  } else if (eventName === 'dragdrop_complete') {
    saveQuizAttempt({
      sceneId: payload.scene_id,
      quizKind: 'dragdrop',
      quizIndex: payload.quiz_index,
      selectedAnswer: `${payload.dragged_value}=>${payload.category}`,
      isCorrect: payload.is_correct,
    })
    saveInteractionEvent({
      sceneId: payload.scene_id,
      eventName,
      payload,
    })
  } else {
    saveInteractionEvent({
      sceneId: payload.scene_id,
      eventName,
      payload,
    })
  }
}
