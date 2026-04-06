import { useEffect, useState } from 'react'
import RoutesChart from '../components/charts/RoutesChart.jsx'
import TopScenesChart from '../components/charts/TopScenesChart.jsx'
import SimpleTableCard from '../components/tables/SimpleTableCard.jsx'
import { useAdminFilters } from '../hooks/useAdminFilters.jsx'
import { getNavigationMetrics } from '../services/admin-api.js'

export default function NavigationPage() {
  const { filters } = useAdminFilters()
  const [data, setData] = useState({ topScenes: [], topRoutes: [], topHotspots: [], transitions: [] })

  useEffect(() => {
    getNavigationMetrics(filters).then(setData)
  }, [filters])

  return (
    <div className="admin-page">
      <section className="admin-intro-card">
        <h2>Como navegan los usuarios dentro del tour</h2>
        <p>Esta vista concentrara escenas mas visitadas, rutas activas y flujos entre panoramas usando datos propios de Supabase.</p>
      </section>

      <section className="admin-chart-grid admin-chart-grid--hero">
        <TopScenesChart data={data.topScenes} />
        <RoutesChart data={data.topRoutes} />
      </section>

      <section className="admin-chart-grid">
        <SimpleTableCard
          title="Hotspots mas usados"
          columns={[
            { key: 'scene', label: 'Escena' },
            { key: 'type', label: 'Tipo' },
            { key: 'target', label: 'Destino' },
            { key: 'clicks', label: 'Clicks' },
          ]}
          rows={data.topHotspots}
        />

        <SimpleTableCard
          title="Transiciones entre escenas"
          columns={[
            { key: 'from', label: 'Origen' },
            { key: 'to', label: 'Destino' },
            { key: 'clicks', label: 'Clicks' },
          ]}
          rows={data.transitions}
        />
      </section>
    </div>
  )
}
