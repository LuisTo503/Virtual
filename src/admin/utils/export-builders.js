export function csvEscape(value) {
  const text = value == null ? '' : String(value)
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

function buildSectionRows(sectionName, rows) {
  return rows.map((row) => ({
    section: sectionName,
    ...row,
  }))
}

export function buildConsolidatedRows(filters, bundle) {
  const summaryRows = buildSectionRows('resumen_kpi', (bundle.overviewMetrics || []).map((item) => ({
    label: item.label,
    value: item.value,
    delta: item.delta,
  })))

  const dailyRows = buildSectionRows('sesiones_diarias', (bundle.sessionsDaily || []).map((item) => ({
    label: item.day,
    value: item.sessions,
    extra: item.users,
  })))

  const sceneRows = buildSectionRows('top_escenas', (bundle.topScenes || []).map((item) => ({
    label: item.scene,
    value: item.views,
  })))

  const routeRows = buildSectionRows('top_rutas', (bundle.topRoutes || []).map((item) => ({
    label: item.route,
    value: item.sessions,
  })))

  const hotspotRows = buildSectionRows('top_hotspots', (bundle.topHotspots || []).map((item) => ({
    label: item.label,
    value: item.clicks,
    scene: item.scene,
  })))

  const transitionRows = buildSectionRows('transiciones', (bundle.transitions || []).map((item) => ({
    label: `${item.from} -> ${item.to}`,
    value: item.clicks,
  })))

  const quizRows = buildSectionRows('precision_quiz', (bundle.quizAccuracy || []).map((item) => ({
    label: item.label,
    value: item.accuracy,
  })))

  const learningRows = buildSectionRows('learning_scene_summary', (bundle.sceneLearningRows || []).map((item) => ({
    label: item.scene,
    value: item.attempts,
    extra: item.accuracy,
  })))

  const trafficRows = buildSectionRows('canales_trafico', (bundle.trafficChannels || []).map((item) => ({
    label: item.channel,
    value: item.sessions,
  })))

  const sessionRows = buildSectionRows('sesiones_detalle', (bundle.sessionsTableRows || []).map((item) => ({
    label: item.id,
    value: item.views,
    extra: item.interactions,
    device: item.device,
    route: item.route,
    scene: item.entry,
    timestamp: item.lastActivity,
  })))

  const filterRows = buildSectionRows('filtros_aplicados', Object.entries(filters || {}).map(([key, value]) => ({
    label: key,
    value,
  })))

  return [
    ...filterRows,
    ...summaryRows,
    ...dailyRows,
    ...sceneRows,
    ...routeRows,
    ...hotspotRows,
    ...transitionRows,
    ...quizRows,
    ...learningRows,
    ...trafficRows,
    ...sessionRows,
  ]
}

export function buildConsolidatedCsv(filters, bundle) {
  const rows = buildConsolidatedRows(filters, bundle)
  const headers = ['section', 'label', 'value', 'delta', 'extra', 'device', 'route', 'scene', 'timestamp']

  return [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n')
}
