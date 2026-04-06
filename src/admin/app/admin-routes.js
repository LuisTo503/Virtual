export const ADMIN_ROUTES = [
  {
    key: 'overview',
    path: '/admin/overview',
    label: 'Resumen',
    description: 'KPIs ejecutivos, escenas, rutas y engagement general.',
  },
  {
    key: 'navigation',
    path: '/admin/navigation',
    label: 'Navegacion',
    description: 'Flujos del tour, hotspots, rutas y escenas mas visitadas.',
  },
  {
    key: 'learning',
    path: '/admin/learning',
    label: 'Aprendizaje',
    description: 'Quizzes, audio, video e indicadores educativos.',
  },
  {
    key: 'sessions',
    path: '/admin/sessions',
    label: 'Sesiones',
    description: 'Tabla operativa de sesiones y actividad detallada.',
  },
  {
    key: 'traffic',
    path: '/admin/traffic',
    label: 'Trafico',
    description: 'Usuarios, sesiones web, canales y paginas desde GA Data API.',
  },
  {
    key: 'exports',
    path: '/admin/exports',
    label: 'Exportaciones',
    description: 'Descarga de CSV por rango de fechas y filtros activos.',
  },
]

export const ADMIN_ROUTE_REDIRECT = '/admin/overview'
