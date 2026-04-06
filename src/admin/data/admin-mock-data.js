export const overviewMetrics = [
  { label: 'Usuarios activos', value: '184', delta: '+12%', tone: 'success' },
  { label: 'Sesiones web', value: '246', delta: '+8%', tone: 'default' },
  { label: 'Sesiones del tour', value: '198', delta: '+15%', tone: 'success' },
  { label: 'Escenas vistas', value: '1,482', delta: '+22%', tone: 'success' },
  { label: 'Hotspots clickeados', value: '864', delta: '+11%', tone: 'default' },
  { label: 'Acierto global', value: '78.4%', delta: '+4.2 pts', tone: 'success' },
]

export const sessionsDaily = [
  { day: '01 Abr', sessions: 24, users: 18 },
  { day: '02 Abr', sessions: 32, users: 25 },
  { day: '03 Abr', sessions: 41, users: 30 },
  { day: '04 Abr', sessions: 36, users: 29 },
  { day: '05 Abr', sessions: 49, users: 35 },
]

export const topScenes = [
  { scene: 'exterior', views: 212 },
  { scene: 'lobby', views: 184 },
  { scene: 'patio_ninos', views: 163 },
  { scene: 'sky_lounge', views: 146 },
  { scene: 'terraza_d3', views: 119 },
]

export const topRoutes = [
  { route: 'libre', sessions: 81 },
  { route: 'areas_comunes', sessions: 52 },
  { route: 'amenidades', sessions: 41 },
  { route: 'suite_d3', sessions: 24 },
]

export const quizAccuracy = [
  { label: 'Multiple choice', accuracy: 74 },
  { label: 'Drag and drop', accuracy: 83 },
  { label: 'Por escena', accuracy: 79 },
]

export const sessionsTableRows = [
  {
    id: '355eb14c',
    device: 'mobile',
    route: 'libre',
    entry: 'exterior',
    views: 12,
    interactions: 34,
    lastActivity: '2026-04-05 15:51',
  },
  {
    id: '8910c517',
    device: 'mobile',
    route: 'areas_comunes',
    entry: 'patio_ninos',
    views: 9,
    interactions: 21,
    lastActivity: '2026-04-05 14:43',
  },
  {
    id: '2a93f4b2',
    device: 'desktop',
    route: 'amenidades',
    entry: 'sky_lounge',
    views: 7,
    interactions: 17,
    lastActivity: '2026-04-05 13:19',
  },
]

export const trafficChannels = [
  { channel: 'Organic Search', sessions: 92 },
  { channel: 'Direct', sessions: 64 },
  { channel: 'Referral', sessions: 38 },
  { channel: 'Social', sessions: 24 },
]

export const exportModules = [
  { key: 'sessions', label: 'Sesiones' },
  { key: 'scene_views', label: 'Escenas vistas' },
  { key: 'hotspots', label: 'Hotspots' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'interactions', label: 'Interacciones' },
]
