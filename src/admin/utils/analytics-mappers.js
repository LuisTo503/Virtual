function byCountDesc(a, b) {
  return b.value - a.value
}

function formatDay(value) {
  const date = new Date(value)
  return date.toLocaleDateString('es-SV', {
    day: '2-digit',
    month: 'short',
  })
}

function groupCount(items, keySelector) {
  const map = new Map()

  items.forEach((item) => {
    const key = keySelector(item)
    map.set(key, (map.get(key) || 0) + 1)
  })

  return map
}

function roundPct(value, total) {
  return total ? Math.round((value / total) * 100) : 0
}

export function mapOverviewFromAnalytics(analytics) {
  const { sessions, sceneViews, hotspotEvents, quizAttempts, interactionEvents } = analytics

  const uniqueUsers = new Set(sessions.map((item) => item.anonymous_id || item.id)).size
  const mobileSessions = sessions.filter((item) => item.device_type === 'mobile').length
  const correctAnswers = quizAttempts.filter((item) => item.is_correct).length
  const audioEvents = interactionEvents.filter((item) => item.event_name === 'audio_play').length
  const videoEvents = interactionEvents.filter((item) => item.event_name === 'video_open').length
  const accuracy = quizAttempts.length
    ? ((correctAnswers / quizAttempts.length) * 100).toFixed(1)
    : '0.0'

  const metrics = [
    { label: 'Usuarios activos', value: String(uniqueUsers), delta: `${sessions.length} sesiones`, tone: 'success' },
    { label: 'Sesiones del tour', value: String(sessions.length), delta: `${sceneViews.length} escenas`, tone: 'default' },
    { label: 'Escenas vistas', value: String(sceneViews.length), delta: `${hotspotEvents.length} hotspots`, tone: 'success' },
    { label: 'Uso movil', value: `${sessions.length ? Math.round((mobileSessions / sessions.length) * 100) : 0}%`, delta: `${mobileSessions} sesiones`, tone: 'default' },
    { label: 'Eventos de audio', value: String(audioEvents), delta: `${videoEvents} videos`, tone: 'default' },
    { label: 'Acierto global', value: `${accuracy}%`, delta: `${quizAttempts.length} quizzes`, tone: 'success' },
  ]

  const sessionsByDayMap = new Map()
  const usersByDayMap = new Map()

  sessions.forEach((item) => {
    const dayKey = formatDay(item.created_at)
    sessionsByDayMap.set(dayKey, (sessionsByDayMap.get(dayKey) || 0) + 1)

    const users = usersByDayMap.get(dayKey) || new Set()
    users.add(item.anonymous_id || item.id)
    usersByDayMap.set(dayKey, users)
  })

  const sessionsDaily = [...sessionsByDayMap.entries()].map(([day, totalSessions]) => ({
    day,
    sessions: totalSessions,
    users: (usersByDayMap.get(day) || new Set()).size,
  }))

  const topScenes = [...groupCount(sceneViews, (item) => item.scene_id || 'sin_escena').entries()]
    .map(([scene, value]) => ({ scene, views: value, value }))
    .sort(byCountDesc)
    .slice(0, 6)

  const topRoutes = [...groupCount(sceneViews, (item) => item.route_id || 'sin_ruta').entries()]
    .map(([route, value]) => ({ route, sessions: value, value }))
    .sort(byCountDesc)
    .slice(0, 6)

  return {
    metrics,
    sessionsDaily,
    topScenes,
    topRoutes,
  }
}

export function mapLearningFromAnalytics(analytics) {
  const { quizAttempts, interactionEvents, sceneViews } = analytics

  const groupedQuiz = [...groupCount(quizAttempts, (item) => item.quiz_kind || 'sin_tipo').entries()]
  const quizAccuracy = groupedQuiz.map(([label]) => {
    const scoped = quizAttempts.filter((item) => (item.quiz_kind || 'sin_tipo') === label)
    const correct = scoped.filter((item) => item.is_correct).length
    return {
      label,
      accuracy: scoped.length ? Math.round((correct / scoped.length) * 100) : 0,
    }
  })

  const educationalSceneMap = new Map()
  sceneViews.forEach((item) => {
    educationalSceneMap.set(item.scene_id, (educationalSceneMap.get(item.scene_id) || 0) + 1)
  })
  interactionEvents
    .filter((item) => ['audio_play', 'video_open', 'info_panel_open'].includes(item.event_name))
    .forEach((item) => {
      const key = item.scene_id || 'sin_escena'
      educationalSceneMap.set(key, (educationalSceneMap.get(key) || 0) + 1)
    })

  const topScenes = [...educationalSceneMap.entries()]
    .map(([scene, value]) => ({ scene, views: value, value }))
    .sort(byCountDesc)
    .slice(0, 6)

  const audioCount = interactionEvents.filter((item) => item.event_name === 'audio_play').length
  const videoCount = interactionEvents.filter((item) => item.event_name === 'video_open').length
  const infoCount = interactionEvents.filter((item) => item.event_name === 'info_panel_open').length
  const correctAnswers = quizAttempts.filter((item) => item.is_correct).length

  const learningMetrics = [
    { label: 'Intentos de quiz', value: String(quizAttempts.length), delta: `${correctAnswers} correctos`, tone: 'success' },
    { label: 'Audio', value: String(audioCount), delta: 'reproducciones', tone: 'default' },
    { label: 'Video', value: String(videoCount), delta: 'aperturas', tone: 'default' },
    { label: 'Info', value: String(infoCount), delta: 'paneles abiertos', tone: 'default' },
  ]

  const sceneLearningMap = new Map()
  quizAttempts.forEach((item) => {
    const key = item.scene_id || 'sin_escena'
    const current = sceneLearningMap.get(key) || { scene: key, attempts: 0, correct: 0 }
    current.attempts += 1
    if (item.is_correct) current.correct += 1
    sceneLearningMap.set(key, current)
  })

  const sceneLearningRows = [...sceneLearningMap.values()]
    .map((item) => ({
      scene: item.scene,
      attempts: item.attempts,
      correct: item.correct,
      accuracy: `${roundPct(item.correct, item.attempts)}%`,
    }))
    .sort((a, b) => b.attempts - a.attempts)

  return {
    learningMetrics,
    quizAccuracy,
    topScenes,
    sceneLearningRows,
  }
}

export function mapSessionsRowsFromAnalytics(analytics) {
  const { sessions, sceneViews, hotspotEvents, quizAttempts, interactionEvents } = analytics

  return sessions.map((session) => {
    const sessionId = session.id
    const viewCount = sceneViews.filter((item) => item.session_id === sessionId).length
    const interactionCount =
      hotspotEvents.filter((item) => item.session_id === sessionId).length +
      quizAttempts.filter((item) => item.session_id === sessionId).length +
      interactionEvents.filter((item) => item.session_id === sessionId).length

    const lastActivityCandidates = [
      session.created_at,
      ...sceneViews.filter((item) => item.session_id === sessionId).map((item) => item.created_at || item.entered_at),
      ...hotspotEvents.filter((item) => item.session_id === sessionId).map((item) => item.created_at || item.clicked_at),
      ...quizAttempts.filter((item) => item.session_id === sessionId).map((item) => item.created_at || item.answered_at),
      ...interactionEvents.filter((item) => item.session_id === sessionId).map((item) => item.created_at),
    ].filter(Boolean)

    const lastActivity = lastActivityCandidates.sort().at(-1)

    return {
      id: session.id.slice(0, 8),
      device: session.device_type || 'unknown',
      route: session.route_initial || 'sin_ruta',
      entry: session.entry_scene || 'sin_escena',
      views: viewCount,
      interactions: interactionCount,
      lastActivity: lastActivity
        ? new Date(lastActivity).toLocaleString('es-SV', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '-',
    }
  })
}

export function mapNavigationFromAnalytics(analytics) {
  const { hotspotEvents } = analytics
  const overview = mapOverviewFromAnalytics(analytics)

  const topHotspots = [...groupCount(hotspotEvents, (item) => {
    const scene = item.scene_id || 'sin_escena'
    const type = item.hotspot_type || 'sin_tipo'
    const target = item.target_scene_id || 'sin_destino'
    return `${scene}|${type}|${target}`
  }).entries()]
    .map(([composed, clicks]) => {
      const [scene, type, target] = composed.split('|')
      return {
        scene,
        type,
        target,
        clicks,
        label: `${scene} / ${type} / ${target}`,
      }
    })
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 8)

  const transitions = [...groupCount(
    hotspotEvents.filter((item) => item.target_scene_id),
    (item) => `${item.scene_id || 'sin_escena'}|${item.target_scene_id || 'sin_destino'}`,
  ).entries()]
    .map(([composed, clicks]) => {
      const [from, to] = composed.split('|')
      return { from, to, clicks }
    })
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 8)

  return {
    topScenes: overview.topScenes,
    topRoutes: overview.topRoutes,
    topHotspots,
    transitions,
  }
}

export function buildExportBundleFromAnalytics(analytics, filters) {
  const overview = mapOverviewFromAnalytics(analytics)
  const learning = mapLearningFromAnalytics(analytics)
  const navigation = mapNavigationFromAnalytics(analytics)

  const trafficChannels = []
  const exportModules = [
    { key: 'dashboard', label: 'Dashboard consolidado' },
  ]

  return {
    overviewMetrics: overview.metrics,
    sessionsDaily: overview.sessionsDaily,
    topScenes: overview.topScenes,
    topRoutes: overview.topRoutes,
    topHotspots: navigation.topHotspots,
    transitions: navigation.transitions,
    learningMetrics: learning.learningMetrics,
    quizAccuracy: learning.quizAccuracy,
    sceneLearningRows: learning.sceneLearningRows,
    sessionsTableRows: mapSessionsRowsFromAnalytics(analytics),
    trafficChannels,
    exportModules,
    filtersApplied: filters,
  }
}
